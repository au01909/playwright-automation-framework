import { Page } from '@playwright/test';
import { askAIJson } from '../utils/aiClient';
import { saveHealedLocator, getLatestHealedLocator } from '../utils/db';
import { HealingSuggestion, isAutoApplicable, formatConfidence } from '../healing/confidence';
import { logger } from '../utils/logger';

const SYSTEM_PROMPT = `
You are a Playwright locator repair engine.
Given the previous (now broken) locator and the current page's HTML,
find the element that most likely corresponds to the original intent
and return a NEW, robust Playwright locator string for it.

Prefer, in order of preference:
1. role-based locators (getByRole)
2. text-based locators (getByText / has-text)
3. stable attributes (data-testid, name, aria-label)
Avoid brittle auto-generated ids/classes.

Return STRICT JSON only, in this exact shape:
{
  "locator": "button:has-text(\\"Book Service\\")",
  "confidence": 0.98,
  "reason": "Text matches previous locator"
}
`;

/**
 * Module 3: Self-Healing Locator Engine
 * Flow: DOM snapshot -> extract HTML -> send old locator + HTML to LLM
 *       -> LLM suggests replacement -> retry -> store new locator.
 */
export async function healLocator(
  page: Page,
  pageName: string,
  brokenLocator: string
): Promise<HealingSuggestion> {
  logger.info(`Locator not found: "${brokenLocator}" on page "${pageName}". Attempting self-heal...`);

  // 1. Check if we've already healed this exact locator before (fast path, no AI call)
  const cached = await getLatestHealedLocator(pageName, brokenLocator);
  if (cached && cached.confidence >= 0.9) {
    logger.info(`Using cached healed locator: ${cached.newLocator}`);
    return { locator: cached.newLocator, confidence: cached.confidence, reason: 'Cached from previous healing' };
  }

  // 2. Take a DOM snapshot of the current page
  const html = await page.content();
  // Trim to keep prompt size reasonable — focus on body content
  const trimmedHtml = html.slice(0, 15_000);

  // 3. Ask the LLM to suggest a replacement locator
  const userPrompt = `
Broken locator: ${brokenLocator}
Current page HTML (truncated):
${trimmedHtml}
`;

  const suggestion = await askAIJson<HealingSuggestion>(SYSTEM_PROMPT, userPrompt);

  logger.info(`AI suggested: ${suggestion.locator} (${formatConfidence(suggestion)})`);

  // 4. Persist the suggestion for the Locator Learning module (Module 4)
  await saveHealedLocator({
    page: pageName,
    oldLocator: brokenLocator,
    newLocator: suggestion.locator,
    confidence: suggestion.confidence,
    reason: suggestion.reason,
  });

  return suggestion;
}

/**
 * Wraps a Playwright locate-and-act call with self-healing.
 * Usage: await healingClick(page, 'HomePage', '#book-service')
 */
export async function healingClick(page: Page, pageName: string, selector: string): Promise<void> {
  try {
    await page.locator(selector).click({ timeout: 5000 });
  } catch {
    const suggestion = await healLocator(page, pageName, selector);
    if (!isAutoApplicable(suggestion)) {
      throw new Error(
        `Healing confidence too low (${formatConfidence(suggestion)}) for locator "${selector}". Manual review required.`
      );
    }
    await page.locator(suggestion.locator).click({ timeout: 5000 });
  }
}

/** Same self-healing wrapper but for fill() actions. */
export async function healingFill(page: Page, pageName: string, selector: string, value: string): Promise<void> {
  try {
    await page.locator(selector).fill(value, { timeout: 5000 });
  } catch {
    const suggestion = await healLocator(page, pageName, selector);
    if (!isAutoApplicable(suggestion)) {
      throw new Error(
        `Healing confidence too low (${formatConfidence(suggestion)}) for locator "${selector}". Manual review required.`
      );
    }
    await page.locator(suggestion.locator).fill(value, { timeout: 5000 });
  }
}
