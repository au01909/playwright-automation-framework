import { Page, FrameLocator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Page Object for https://yournearbestplumbingservices.com/contact.html
 *
 * IMPORTANT: this page does NOT have a native HTML <form> with name/email/
 * message fields. The booking form is an embedded Google Form (an <iframe>
 * pointing at docs.google.com/forms). Playwright can still inspect and
 * interact with it via frameLocator() even though it's a different origin.
 */
export class BookNowPage extends BasePage {
  readonly pageHeading = 'h1:has-text("Book a Service")';
  readonly phoneLink = 'a[href^="tel:"]';
  readonly emailText = 'text=yournearbestplumbingservices@gmail.com';
  readonly mapIframe = 'iframe[src*="google.com/maps/embed"]';

  // The embedded Google Form
  readonly googleFormIframe = 'iframe[src*="docs.google.com/forms"]';
  readonly expectedFormUrlFragment = '1FAIpQLSdnHTlLUapki2caHg8PIg7g34K6C5bsvFPi_vDmRgVK00_pXA';

  constructor(page: Page) {
    super(page, 'BookNowPage');
  }

  async open(): Promise<void> {
    await this.goto('/contact.html');
  }

  /** Returns a locator scoped INSIDE the embedded Google Form iframe. */
  formFrame(): FrameLocator {
    return this.page.frameLocator(this.googleFormIframe);
  }
}
