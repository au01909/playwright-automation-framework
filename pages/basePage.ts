import { Page } from '@playwright/test';
import { healingClick, healingFill } from '../ai/locatorHealer';

/**
 * Every Page Object extends this so locator self-healing is available
 * automatically via this.click()/this.fill() instead of raw page methods.
 */
export class BasePage {
  constructor(protected page: Page, protected pageName: string) {}

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async click(selector: string): Promise<void> {
    await healingClick(this.page, this.pageName, selector);
  }

  async fill(selector: string, value: string): Promise<void> {
    await healingFill(this.page, this.pageName, selector, value);
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible().catch(() => false);
  }
}
