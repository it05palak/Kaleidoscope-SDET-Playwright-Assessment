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

    const page1Heading = this.page.getByRole('heading', {
      name: 'Lets get to know you!'
    });

    await expect(beginButton).toBeVisible({
      timeout: 30000
    });

    for (let attempt = 1; attempt <= 3; attempt++) {

      if (await page1Heading.isVisible()) {
        break;
      }

      await expect(beginButton).toBeEnabled();

      await beginButton.click();

      try {
        await expect(page1Heading).toBeVisible({
          timeout: 15000
        });

        break;

      } catch {
        if (attempt === 3) {
          throw new Error(
            'Application Page 1 did not open after 3 Begin attempts.'
          );
        }

        console.log(
          `Begin attempt ${attempt} did not navigate. Retrying...`
        );
      }
    }

    await expect(page1Heading).toBeVisible({
      timeout: 30000
    });

    console.log('Application Page 1 opened successfully');
  }
}
