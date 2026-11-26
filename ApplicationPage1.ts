import { Page, expect } from '@playwright/test';

export class ApplicationPage1 {
  constructor(private page: Page) {}

  async completePage1(contributorEmail: string) {

    // STEP 1: Verify Page 1
    await expect(
      this.page.getByRole('heading', {
        name: 'Lets get to know you!',
        exact: true
      })
    ).toBeVisible({ timeout: 30000 });

    // STEP 2: Verify prefilled fields
    await expect(
      this.page.getByRole('textbox', {
        name: 'First Name',
        exact: true
      })
    ).toBeDisabled();

    await expect(
      this.page.getByRole('textbox', {
        name: 'Last Name',
        exact: true
      })
    ).toBeDisabled();

    await expect(
      this.page.getByRole('textbox', {
        name: 'Email Address',
        exact: true
      })
    ).toBeDisabled();

    // STEP 3: Fill Street Address
    await this.page.getByRole('textbox', {
      name: 'Street Address',
      exact: true
    }).fill('123 Test Street');

    // STEP 4: Select State
    const state = this.page.getByRole('textbox', {
      name: 'State (Full)',
      exact: true
    });

    await state.click();
    await state.fill('California');

    const californiaOption = this.page.getByRole('option', {
      name: 'California',
      exact: true
    });

    await expect(californiaOption).toBeVisible({
      timeout: 15000
    });

    await californiaOption.click();

    await expect(state).toHaveValue('California');

    // STEP 5: Fill City
    await this.page.getByRole('textbox', {
      name: 'City',
      exact: true
    }).fill('Los Angeles');

    // STEP 6: Fill ZIP Code
    await this.page.getByRole('textbox', {
      name: 'Zip Code',
      exact: true
    }).fill('90001');

    // STEP 7: Select Country
    const country = this.page.getByRole('textbox', {
      name: 'Country',
      exact: true
    });

    await country.click();
    await country.fill('United States');

    const usaOption = this.page.getByRole('option', {
      name: 'United States of America',
      exact: true
    });

    await expect(usaOption).toBeVisible({
      timeout: 15000
    });

    await usaOption.click();

    await expect(country).toHaveValue(
      'United States of America'
    );

    console.log('Address completed successfully');

    // STEP 8: Open Add Contributor Popup
    const addContributorButton = this.page.getByRole(
      'button',
      {
        name: 'Add Contributor',
        exact: true
      }
    );

    await expect(addContributorButton).toBeVisible();
    await expect(addContributorButton).toBeEnabled();

    await addContributorButton.click();

    // STEP 9: Wait for Contributor Popup
    const contributorFirstName = this.page.getByRole(
      'textbox',
      {
        name: 'Contributor First Name',
        exact: true
      }
    );

    await expect(contributorFirstName).toBeVisible({
      timeout: 20000
    });

    // STEP 10: Fill Contributor Details
    await contributorFirstName.fill('Test');

    await this.page.getByRole('textbox', {
      name: 'Contributor Last Name',
      exact: true
    }).fill('Contributor');

    // Contributor Email
    await this.page.getByRole('textbox', {
      name: 'Contributor Email Address',
      exact: true
    }).fill(contributorEmail);

    // Confirm Contributor Email
    await this.page.getByRole('textbox', {
      name: 'Confirm Contributor Email Address',
      exact: true
    }).fill(contributorEmail);

    // Message
    await this.page.getByRole('textbox', {
      name: 'Message',
      exact: true
    }).fill(
      'Please provide your contribution for my scholarship application.'
    );

    // STEP 11: Click Add
    const addButton = this.page.getByRole('button', {
      name: 'Add',
      exact: true
    });

    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    await addButton.click();

 // STEP 12: Verify Contributor Added
await expect(
  this.page.getByText('Test', {
    exact: true
  })
).toBeVisible({ timeout: 30000 });

console.log('Contributor added successfully');

// STEP 13: Click Next Page
const nextButton = this.page.getByRole('button', {
  name: 'Next Page',
  exact: true
});

await expect(nextButton).toBeVisible();
await expect(nextButton).toBeEnabled();

await nextButton.click();

// STEP 14: Verify Page 2
await expect(
  this.page.getByRole('heading', {
    name: 'Extracurricular Activities'
  })
).toBeVisible({ timeout: 30000 });

console.log('Page 1 completed successfully');
  }}