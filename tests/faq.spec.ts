import { test, expect } from '@playwright/test';
import { FaqPage } from '../pages/faqPage';

/**
 * FAQ PAGE TESTS
 * Confirms every FAQ category is present and the page still funnels
 * visitors toward booking a service.
 */
test.describe('FAQ Page', () => {
  test('FAQ page loads and shows the main heading', async ({ page }) => {
    const faq = new FaqPage(page);
    await faq.open();
    await expect(page.locator(faq.pageHeading)).toBeVisible();
  });

  test('All 5 FAQ categories are listed', async ({ page }) => {
    const faq = new FaqPage(page);
    await faq.open();
    for (const category of faq.categoryHeadings) {
      await expect(page.locator(`text=${category}`).first()).toBeVisible();
    }
  });

  test('FAQ page has at least 15 question/answer pairs', async ({ page }) => {
    const faq = new FaqPage(page);
    await faq.open();
    // Each FAQ question is rendered as its own block of text ending in "?"
    const questionCount = await page.locator('text=/\\?\\s*$/').count();
    expect(questionCount).toBeGreaterThanOrEqual(15);
  });

  test('"Book Online" button links to the Book Now page', async ({ page }) => {
    const faq = new FaqPage(page);
    await faq.open();
    const button = page.locator(faq.bookOnlineButton).first();
    await expect(button).toHaveAttribute('href', /contact\.html/);
  });
});
