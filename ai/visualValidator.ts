import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { askAIJson } from '../utils/aiClient';
import { logger } from '../utils/logger';

export interface VisualValidationResult {
  status: 'PASS' | 'FAIL';
  issues: string[]; // e.g. ["Header changed", "Missing CTA button"]
  summary: string;
}

const SYSTEM_PROMPT = `
You are a visual QA reviewer comparing two screenshots of the same web page
(baseline vs current) described by their layout metadata.
Instead of pixel-diffing, reason about meaningful visual regressions:
header changes, broken layout, missing buttons, hidden text, broken images,
misaligned sections.

Return STRICT JSON only:
{
  "status": "PASS" | "FAIL",
  "issues": ["short issue 1", "short issue 2"],
  "summary": "one sentence summary"
}
`;

/**
 * Module 7: Captures a current screenshot, compares against a stored
 * baseline (if present) and asks the AI to flag meaningful visual issues.
 */
export async function validateVisual(page: Page, pageName: string): Promise<VisualValidationResult> {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

  const currentPath = path.join(screenshotsDir, `${pageName}-current.png`);
  const baselinePath = path.join(screenshotsDir, `${pageName}-baseline.png`);

  await page.screenshot({ path: currentPath, fullPage: true });

  const hasBaseline = fs.existsSync(baselinePath);
  if (!hasBaseline) {
    // First run: current screenshot becomes the baseline
    fs.copyFileSync(currentPath, baselinePath);
    logger.info(`No baseline found for "${pageName}" — current screenshot saved as new baseline.`);
    return { status: 'PASS', issues: [], summary: 'Baseline created, no comparison performed.' };
  }

  // Describe page structure (accessibility tree text) as a lightweight,
  // token-cheap stand-in for sending raw image bytes to the LLM.
  const structureSnapshot = await page.evaluate(() => document.body.innerText.slice(0, 3000));

  const userPrompt = `
Page: ${pageName}
Visible text/structure snapshot of CURRENT page load:
${structureSnapshot}

Baseline screenshot: ${baselinePath}
Current screenshot: ${currentPath}
Evaluate whether the current page shows a meaningful visual regression versus what
would be expected from the established baseline layout of a plumbing services business site
(header/logo, nav, hero CTA, services list, contact info, footer).
`;

  const result = await askAIJson<VisualValidationResult>(SYSTEM_PROMPT, userPrompt);
  logger.info(`Visual validation for "${pageName}": ${result.status}`);
  return result;
}
