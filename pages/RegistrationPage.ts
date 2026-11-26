import { Page, expect } from '@playwright/test';

export class RegistrationPage {
  constructor(private page: Page) {}

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    phone: string,
    password: string,
    email: string
  ) {
    const emailField = this.page.getByRole('textbox', {
      name: 'Email Address'
    });

    await expect(emailField).toHaveValue(email);
    await expect(emailField).toBeDisabled();

    await this.page.getByRole('textbox', {
      name: 'First Name'
    }).fill(firstName);

    await this.page.getByRole('textbox', {
      name: 'Last Name'
    }).fill(lastName);

    await this.page.getByRole('button', {
      name: 'United States: +'
    }).click();

    await this.page.getByRole('option', {
      name: 'India+'
    }).click();

    await this.page.getByRole('textbox', {
      name: '1 (702) 123-'
    }).fill(phone);

    await this.page.getByRole('textbox', {
      name: 'Create a Password'
    }).fill(password);

    await this.page.getByRole('checkbox', {
      name: 'I confirm that I am at least'
    }).check();
  }

  async submitRegistration() {
    const submitButton = this.page.getByRole('button', {
      name: 'Submit',
      exact: true
    });

    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Verify successful registration through dashboard navigation
    await expect(this.page).toHaveURL(
      /\/applicant\/applications/,
      { timeout: 30000 }
    );

    console.log('Registration successful');
  }
}
