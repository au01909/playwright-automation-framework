import { Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page Object for https://yournearbestplumbingservices.com/index.html (Home page)
 * Locators were taken directly from the real live HTML, not guessed.
 */
export class HomePage extends BasePage {
  // Top navigation bar (same on every page)
  readonly navHome = 'nav >> text=Home';
  readonly navServices = 'nav >> text=Services';
  readonly navAbout = 'nav >> text=About';
  readonly navFaq = 'nav >> text=FAQ';
  readonly navBookNow = 'nav >> text=Book Now';

  // Hero section
  readonly heroHeading = 'h1:has-text("Trusted Plumber")';
  readonly bookAServiceButton = 'a:has-text("Book a Service")';
  readonly callNowButton = 'a[href^="tel:"]';

  // "What We Do" service preview cards (6 shown on homepage)
  readonly servicePreviewCards = 'a:has-text("Learn more")';

  // Footer
  readonly footerEmail = 'text=yournearbestplumbingservices@gmail.com';
  readonly footerPhone = 'footer a[href^="tel:"]';

  constructor(page: Page) {
    super(page, 'HomePage');
  }

  async open(): Promise<void> {
    await this.goto('/index.html');
  }
}
