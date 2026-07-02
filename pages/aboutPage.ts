import { Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page Object for https://yournearbestplumbingservices.com/about.html
 */
export class AboutPage extends BasePage {
  readonly pageHeading = 'h1:has-text("Trusted Plumber")';
  readonly founderName = 'text=Biswajit Bal';

  // The 4 "Core Values" cards
  readonly coreValueHeadings = [
    'Integrity First',
    'Speed & Reliability',
    'Quality Workmanship',
    'Community Focus',
  ];

  readonly bookPlumbingServiceButton = 'a:has-text("Book Plumbing Service")';

  constructor(page: Page) {
    super(page, 'AboutPage');
  }

  async open(): Promise<void> {
    await this.goto('/about.html');
  }
}
