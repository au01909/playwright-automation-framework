import { test, expect } from '@playwright/test';
import { BookNowPage } from '../pages/bookNowPage';

/**
 * BOOK NOW / CONTACT PAGE TESTS
 * This is the money page — if this breaks, the business loses leads.
 * Includes the embedded Google Form check.
 */
test.describe('Book Now Page', () => {
  test('Book Now page loads and shows the main heading', async ({ page }) => {
    const bookNow = new BookNowPage(page);
    await bookNow.open();
    await expect(page.locator(bookNow.pageHeading)).toBeVisible();
  });

  test('Phone number is visible and click-to-call works', async ({ page }) => {
    const bookNow = new BookNowPage(page);
    await bookNow.open();
    const phone = page.locator(bookNow.phoneLink).first();
    await expect(phone).toHaveAttribute('href', /^tel:\+?\d+/);
  });

  test('Business email address is visible', async ({ page }) => {
    const bookNow = new BookNowPage(page);
    await bookNow.open();
    await expect(page.locator(bookNow.emailText).first()).toBeVisible();
  });

  test('Google Map showing the office location is embedded and visible', async ({ page }) => {
    const bookNow = new BookNowPage(page);
    await bookNow.open();
    await expect(page.locator(bookNow.mapIframe)).toBeVisible();
  });

  // ---- THE GOOGLE FORM CHECK YOU ASKED FOR ----

  test('Embedded Google Form iframe is present and points to the correct form', async ({ page }) => {
    const bookNow = new BookNowPage(page);
    await bookNow.open();
    const formIframe = page.locator(bookNow.googleFormIframe);
    await expect(formIframe).toBeVisible();
    await expect(formIframe).toHaveAttribute('src', new RegExp(bookNow.expectedFormUrlFragment));
  });

  test('Embedded Google Form actually loads and shows a Submit button', async ({ page }) => {
    const bookNow = new BookNowPage(page);
    await bookNow.open();
    // frameLocator() reaches INSIDE the iframe, even though it's a
    // different domain (docs.google.com) than the plumbing site.
    const formFrame = bookNow.formFrame();
    await expect(formFrame.getByRole('button', { name: /submit/i })).toBeVisible({ timeout: 15000 });
  });

  test('Embedded Google Form has at least one visible input field', async ({ page }) => {
    const bookNow = new BookNowPage(page);
    await bookNow.open();
    const formFrame = bookNow.formFrame();
    // Google Forms renders text questions as textbox/listbox roles
    const fieldCount = await formFrame.getByRole('textbox').count();
    expect(fieldCount).toBeGreaterThan(0);
  });
});
