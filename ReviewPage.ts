import { Page, expect } from '@playwright/test';

export class ReviewPage {
  constructor(private page: Page) {}

  async reviewAndSubmit() {

    await expect(
      this.page.getByRole('heading', {
        name: 'Review Your Application'
      })
    ).toBeVisible({ timeout: 30000 });

    // Verify review sections
    for (const section of [
      'Lets get to know you!',
      'Extracurricular Activities',
      'High School Information',
      'Essay'
    ]) {
      await expect(
        this.page.getByText(section, {
          exact: true
        }).first()
      ).toBeVisible({ timeout: 15000 });
    }

    // Save URL before submission
    const applicationUrl = this.page.url();

    console.log('Application URL:', applicationUrl);

    // Submit
    const submitButton = this.page.getByRole('button', {
      name: 'Submit',
      exact: true
    });

    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Verify redirect
    await expect(this.page).toHaveURL(
      /\/applicant\/applications/,
      { timeout: 45000 }
    );

    console.log('Application submitted successfully');

    // Reopen submitted application
    await this.page.goto(applicationUrl, {
      waitUntil: 'domcontentloaded'
    });

    await expect(
      this.page.getByRole('heading', {
        name: 'Review Your Application'
      })
    ).toBeVisible({ timeout: 30000 });

    // Verify editing disabled
    await expect(
      this.page.getByRole('button', {
        name: 'Edit',
        exact: true
      })
    ).toHaveCount(0);

    await expect(
      this.page.getByRole('button', {
        name: 'Submit',
        exact: true
      })
    ).toBeDisabled();

    console.log('Editing disabled after submission');
  }
}