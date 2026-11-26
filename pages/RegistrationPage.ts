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
    // Verify prefilled email
    const emailField = this.page.getByRole('textbox', {
      name: 'Email Address',
      exact: true
    });

    await expect(emailField).toHaveValue(email);
    await expect(emailField).toBeDisabled();

    // Fill name
    await this.page.getByRole('textbox', {
      name: 'First Name',
      exact: true
    }).fill(firstName);

    await this.page.getByRole('textbox', {
      name: 'Last Name',
      exact: true
    }).fill(lastName);

    // Phone field
    const phoneField = this.page.getByRole('textbox', {
      name: '1 (702) 123-'
    });

    await expect(phoneField).toBeVisible();

    // Clear existing value
    await phoneField.fill('');

    // Open country dropdown
    const countryButton = this.page.getByRole('button', {
      name: /United States:|India:|Russia:/
    });

    await countryButton.click();

    // Select India (+91)
    const indiaOption = this.page.getByRole('option', {
      name: /India.*91/
    });

    await expect(indiaOption).toBeVisible({
      timeout: 15000
    });

    await indiaOption.click();

    // Fill explicit international number
    await phoneField.fill(`+91${phone}`);

    // Verify India remains selected
    await expect(
      this.page.getByRole('button', {
        name: /India:.*91/
      })
    ).toBeVisible({ timeout: 10000 });

    // Password
    await this.page.getByRole('textbox', {
      name: 'Create a Password'
    }).fill(password);

    // Age confirmation
    await this.page.getByRole('checkbox', {
      name: 'I confirm that I am at least'
    }).check();

    console.log('Registration form completed');
  }

  async submitRegistration() {
    const submitButton = this.page.getByRole('button', {
      name: 'Submit',
      exact: true
    });

    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    await expect(this.page).toHaveURL(
      /\/applicant\/applications/,
      { timeout: 30000 }
    );

    console.log('Registration successful');
  }
}
