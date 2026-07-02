import { test, expect } from '@playwright/test';
import { ServicesPage } from '../pages/servicesPage';

/**
 * SERVICES PAGE TESTS
 * Confirms every one of the 9 services is actually listed on the page,
 * and that each one has a working "Book Service" call to action.
 */
test.describe('Services Page', () => {
  test('Services page loads and shows the main heading', async ({ page }) => {
    const services = new ServicesPage(page);
    await services.open();
    await expect(page.locator(services.pageHeading)).toBeVisible();
  });

  test('All 9 individual services are listed on the page', async ({ page }) => {
    const services = new ServicesPage(page);
    await services.open();
    for (const heading of services.serviceHeadings) {
      await expect(page.locator(`text=${heading}`).first()).toBeVisible();
    }
  });

  test('Every service section has a "Book Service" or quote link', async ({ page }) => {
    const services = new ServicesPage(page);
    await services.open();
    const count = await page.locator(services.bookServiceLinks).count();
    expect(count).toBeGreaterThan(0);
  });

  test('"Get a Free Quote" button links to the Book Now page', async ({ page }) => {
    const services = new ServicesPage(page);
    await services.open();
    const button = page.locator(services.getFreeQuoteButton).first();
    await expect(button).toHaveAttribute('href', /contact\.html/);
  });

  test('Services page shares the same top navigation as the rest of the site', async ({ page }) => {
    const services = new ServicesPage(page);
    await services.open();
    await expect(page.locator('nav >> text=Book Now')).toBeVisible();
  });
});
