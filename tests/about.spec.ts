import { test, expect } from '@playwright/test';
import { AboutPage } from '../pages/aboutPage';

/**
 * ABOUT PAGE TESTS
 * Confirms the company story, founder name, and core values all display,
 * since this page is what builds visitor trust before they book.
 */
test.describe('About Page', () => {
  test('About page loads and shows the main heading', async ({ page }) => {
    const about = new AboutPage(page);
    await about.open();
    await expect(page.locator(about.pageHeading)).toBeVisible();
  });

  test('Founder name "Biswajit Bal" is mentioned on the page', async ({ page }) => {
    const about = new AboutPage(page);
    await about.open();
    await expect(page.locator(about.founderName).first()).toBeVisible();
  });

  test('All 4 "Core Values" are listed', async ({ page }) => {
    const about = new AboutPage(page);
    await about.open();
    for (const value of about.coreValueHeadings) {
      await expect(page.locator(`text=${value}`).first()).toBeVisible();
    }
  });

  test('"Book Plumbing Service" button links to the Book Now page', async ({ page }) => {
    const about = new AboutPage(page);
    await about.open();
    const button = page.locator(about.bookPlumbingServiceButton).first();
    await expect(button).toHaveAttribute('href', /contact\.html/);
  });
});
