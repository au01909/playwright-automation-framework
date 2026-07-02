import { Page } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page Object for https://yournearbestplumbingservices.com/services.html
 * This page lists 9 individual services (Commercial, Contractor, Drain
 * Cleaning, Leak Repair, Pipe Installation, Water Heaters, Bathroom,
 * Kitchen, 24/7 Emergency), each with its own "Book Service" link.
 */
export class ServicesPage extends BasePage {
  readonly pageHeading = 'h1:has-text("Complete Plumbing")';

  // The 9 service section headings, exactly as they appear on the page
  readonly serviceHeadings = [
    'Commercial Plumbing',
    'Contractor Plumbing',
    'Drain Cleaning',
    'Leak Repair & Detection',
    'Pipe Installation & Repiping',
    'Water Heater Services',
    'Bathroom Plumbing',
    'Kitchen Plumbing',
    '24/7 Emergency Plumbing',
  ];

  readonly bookServiceLinks = 'a:has-text("Book Service")';
  readonly getFreeQuoteButton = 'a:has-text("Get a Free Quote")';

  constructor(page: Page) {
    super(page, 'ServicesPage');
  }

  async open(): Promise<void> {
    await this.goto('/services.html');
  }
}
