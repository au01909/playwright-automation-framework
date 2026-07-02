import { Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page Object for https://yournearbestplumbingservices.com/faq.html
 */
export class FaqPage extends BasePage {
  readonly pageHeading = 'h1:has-text("Frequently Asked")';

  // The 5 FAQ category groupings on the page
  readonly categoryHeadings = [
    'Pricing & Estimates',
    'Emergency & Response Time',
    'Services & Guarantees',
    'Common Plumbing Issues',
    'Maintenance & Prevention',
  ];

  readonly bookOnlineButton = 'a:has-text("Book Online")';

  constructor(page: Page) {
    super(page, 'FaqPage');
  }

  async open(): Promise<void> {
    await this.goto('/faq.html');
  }
}
