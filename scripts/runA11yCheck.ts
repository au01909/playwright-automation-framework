import * as dotenv from 'dotenv';
import { chromium } from '@playwright/test';
import { validateAccessibility } from '../accessibility/accessibilityValidator';

dotenv.config();

async function main() {
  const url = process.env.BASE_URL || 'https://yournearbestplumbingservices.com';
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const report = await validateAccessibility(page);
  console.log(JSON.stringify(report, null, 2));

  await browser.close();
}

main().catch((err) => {
  console.error('Accessibility check failed:', err);
  process.exit(1);
});
