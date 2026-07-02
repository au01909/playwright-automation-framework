import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';

/**
 * HOME PAGE TESTS
 * Checks the things a real visitor would notice first: does the page
 * load, is the phone number clickable, do the main buttons work.
 */
test.describe('Home Page', () => {
  test('Home page loads and shows the main heading', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(page.locator(home.heroHeading)).toBeVisible();
  });

  test('Top navigation shows all 5 expected links', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await expect(page.locator(home.navHome)).toBeVisible();
    await expect(page.locator(home.navServices)).toBeVisible();
    await expect(page.locator(home.navAbout)).toBeVisible();
    await expect(page.locator(home.navFaq)).toBeVisible();
    await expect(page.locator(home.navBookNow)).toBeVisible();
  });

  test('"Book a Service" button is visible and links to the Book Now page', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const button = page.locator(home.bookAServiceButton).first();
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute('href', /contact\.html/);
  });

  test('"Call Now" button has a working phone number link', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const callButton = page.locator(home.callNowButton).first();
    await expect(callButton).toHaveAttribute('href', /^tel:\+?\d+/);
  });

  test('Homepage shows at least 6 service preview cards', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    const count = await page.locator(home.servicePreviewCards).count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});
