import { Page, expect } from '@playwright/test';

export class ScholarshipLandingPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto(
      'https://apply.mykaleidoscope.com/program/sdet-test-scholarship',
      { waitUntil: 'domcontentloaded' }
    );

    await expect(
      this.page.getByRole('heading', {
        name: 'SDET Scholarship'
      })
    ).toBeVisible({ timeout: 20000 });
  }

  async openLogin() {
    await this.page.getByRole('link', {
      name: 'Sign in / Sign up'
    }).click();

    await expect(this.page).toHaveURL(/\/login/, {
      timeout: 20000
    });
  }
}
