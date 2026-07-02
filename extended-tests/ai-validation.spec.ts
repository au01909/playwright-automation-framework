import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { validateWebsite } from '../ai/websiteValidator';
import { validateVisual } from '../ai/visualValidator';
import { validateAccessibility } from '../accessibility/accessibilityValidator';
import { validateSeo } from '../seo/seoValidator';
import { checkPageLinks } from '../seo/brokenLinkDetector';

/**
 * EXTENDED / OPTIONAL SUITE
 * These tests are NOT part of the main `npm test` run (see
 * playwright.config.ts testMatch — this folder is excluded on purpose).
 *
 * Why separate: validateWebsite() and validateVisual() call an LLM
 * (OpenAI/Gemini). If your API key is missing, over quota, or the AI
 * gives a borderline answer, these can fail for reasons that have
 * nothing to do with the actual website being broken. Keeping them
 * separate means your 100 core tests stay stable and trustworthy.
 *
 * Run this suite explicitly with:
 *   npx playwright test extended-tests/ai-validation.spec.ts --project=chromium
 */
const BASE_URL = process.env.BASE_URL || 'https://yournearbestplumbingservices.com';

test.describe('Extended AI-Powered Checks (requires AI API key)', () => {
  test('AI review: does the homepage look professional and trustworthy?', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const result = await validateWebsite(page);
    expect(result.contactInfoPresent).toBeTruthy();
    expect(result.layoutBroken).toBeFalsy();
  });

  test('AI visual regression check on homepage', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const visual = await validateVisual(page, 'HomePage');
    expect(visual.status, visual.issues.join(', ')).toBe('PASS');
  });

  test('Accessibility audit on homepage (axe-core, no AI key needed)', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const a11y = await validateAccessibility(page);
    expect(a11y.criticalCount).toBe(0);
  });

  test('SEO score check on homepage (no AI key needed)', async () => {
    const seo = await validateSeo(BASE_URL);
    expect(seo.score).toBeGreaterThanOrEqual(60);
  });

  test('Broken link crawl on homepage (no AI key needed)', async () => {
    const linkReport = await checkPageLinks(BASE_URL);
    expect(linkReport.broken.length, JSON.stringify(linkReport.broken)).toBe(0);
  });
});
