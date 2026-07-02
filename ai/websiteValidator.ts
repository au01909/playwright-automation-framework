import { Page } from '@playwright/test';
import { askAIJson } from '../utils/aiClient';
import { logger } from '../utils/logger';

export interface WebsiteValidationResult {
  status: 'PASS' | 'FAIL';
  brandingClear: boolean;
  ctaVisible: boolean;
  servicesUnderstandable: boolean;
  contactInfoPresent: boolean;
  layoutBroken: boolean;
  looksProfessional: boolean;
  grammarIssues: string[];
  trustIndicatorsFound: string[];
  localSeoQuality: 'good' | 'average' | 'poor';
  suggestions: string[];
}

const SYSTEM_PROMPT = `
You are an expert website QA + local-business marketing reviewer.
Evaluate the given page content of a local plumbing services business website
and answer every question below based only on the provided text/structure.

Return STRICT JSON only in this exact shape:
{
  "status": "PASS" | "FAIL",
  "brandingClear": true|false,
  "ctaVisible": true|false,
  "servicesUnderstandable": true|false,
  "contactInfoPresent": true|false,
  "layoutBroken": true|false,
  "looksProfessional": true|false,
  "grammarIssues": ["..."],
  "trustIndicatorsFound": ["e.g. reviews, licenses, years in business"],
  "localSeoQuality": "good" | "average" | "poor",
  "suggestions": ["..."]
}
"status" is "FAIL" if layoutBroken is true OR contactInfoPresent is false OR ctaVisible is false.
`;

/**
 * Module 6: AI Website Validation.
 * Runs against yournearbestplumbingservices.com (or BASE_URL) after page load.
 */
export async function validateWebsite(page: Page): Promise<WebsiteValidationResult> {
  const bodyText = await page.evaluate(() => document.body.innerText.slice(0, 6000));
  const headingCount = await page.evaluate(() => document.querySelectorAll('h1,h2,h3').length);
  const imageCount = await page.evaluate(() => document.querySelectorAll('img').length);
  const hasPhoneLink = await page.evaluate(() => !!document.querySelector('a[href^="tel:"]'));

  const userPrompt = `
Page URL: ${page.url()}
Visible text content:
${bodyText}

Structural signals:
- Heading elements found: ${headingCount}
- Images found: ${imageCount}
- Click-to-call phone link present: ${hasPhoneLink}
`;

  const result = await askAIJson<WebsiteValidationResult>(SYSTEM_PROMPT, userPrompt);
  logger.info(`Website validation status: ${result.status} (Local SEO: ${result.localSeoQuality})`);
  return result;
}
