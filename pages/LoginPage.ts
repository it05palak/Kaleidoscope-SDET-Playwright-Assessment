import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async enterEmailAndContinue(email: string) {

    await expect(this.page).toHaveURL(/\/login/, {
      timeout: 20000
    });

    const emailField = this.page.getByRole('textbox', {
      name: 'Email Address'
    });

    try {
      await expect(emailField).toBeVisible({
        timeout: 30000
      });
    } catch {
      console.log('Current URL:', this.page.url());
      console.log('Page title:', await this.page.title());
      console.log(
        'Visible page content:',
        (await this.page.locator('body').innerText()).slice(0, 1000)
      );

      throw new Error(
        'Login form did not render. Check application loading or authentication redirect.'
      );
    }

    await emailField.fill(email);

    const nextButton = this.page.getByRole('button', {
      name: 'Next',
      exact: true
    });

    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    await expect(this.page).toHaveURL(/\/signup/, {
      timeout: 20000
    });
  }
}
