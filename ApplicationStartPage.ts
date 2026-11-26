import { Page, expect } from '@playwright/test';

export class ApplicationStartPage {
  constructor(private page: Page) {}

  async startApplication() {
    await this.page.goto(
      'https://apply.mykaleidoscope.com/program/sdet-test-scholarship',
      { waitUntil: 'domcontentloaded' }
    );

    const beginButton = this.page.getByRole('button', {
      name: 'Begin',
      exact: true
    });

    await expect(beginButton).toBeVisible({
      timeout: 20000
    });

    await expect(beginButton).toBeEnabled();

    await beginButton.click();

    await expect(this.page).toHaveURL(
      /\/application\/start/,
      { timeout: 30000 }
    );

    await expect(
      this.page.getByRole('heading', {
        name: 'Lets get to know you!'
      })
    ).toBeVisible({ timeout: 30000 });
  }
}