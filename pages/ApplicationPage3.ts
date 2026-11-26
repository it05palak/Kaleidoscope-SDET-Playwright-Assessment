import { Page, expect } from '@playwright/test';
import path from 'node:path';

export class ApplicationPage3 {
  constructor(private page: Page) {}

  async completePage3() {

    // STEP 1: Verify Page 3
    await expect(
      this.page.getByRole('heading', {
        name: 'High School Information',
        exact: true
      })
    ).toBeVisible({ timeout: 30000 });

    // STEP 2: School Address
    await this.page.getByRole('textbox', {
      name: 'High School Street Address',
      exact: true
    }).fill('123 School Street');

    // STEP 3: City
    await this.page.getByRole('textbox', {
      name: 'High School City',
      exact: true
    }).fill('Los Angeles');

    // STEP 4: State
    const state = this.page.getByRole('textbox', {
      name: 'High School State (Full)',
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

    // STEP 5: ZIP
    await this.page.getByRole('textbox', {
      name: 'High School Zip Code',
      exact: true
    }).fill('90001');

    // STEP 6: GPA
    await this.page.getByRole('textbox', {
      name: 'GPA',
      exact: true
    }).fill('3.5');

    // STEP 7: Graduation Date
    const graduationDate = this.page.getByRole('textbox', {
      name: 'Year of High School Graduation',
      exact: true
    });

    await graduationDate.click();

    const dateOption = this.page.getByRole('button', {
      name: '15 November 2026',
      exact: true
    });

    await expect(dateOption).toBeVisible({
      timeout: 15000
    });

    await dateOption.click();

    await expect(graduationDate).not.toHaveValue('');

    console.log('Graduation date selected');

    // STEP 8: Transcript Upload
    const transcriptPath = path.resolve(
      'test-data',
      'My School Transcript.pdf'
    );

    const uploadButton = this.page.getByRole('button', {
      name: 'Upload File',
      exact: true
    });

    await expect(uploadButton).toBeVisible();

    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      uploadButton.click()
    ]);

    await fileChooser.setFiles(transcriptPath);

    // STEP 9: Verify transcript uploaded
    await expect(
      this.page.getByRole('button', {
        name: 'My School Transcript.pdf',
        exact: true
      })
    ).toBeVisible({ timeout: 30000 });

    console.log('Transcript uploaded successfully');

    // STEP 10: Save
    const saveButton = this.page.getByRole('button', {
      name: 'Save',
      exact: true
    });

    if (await saveButton.isEnabled()) {
      await saveButton.click();
    }

    // STEP 11: Next Page
    const nextButton = this.page.getByRole('button', {
      name: 'Next Page',
      exact: true
    });

    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();

    await nextButton.click();

    // STEP 12: Verify Page 4
    await expect(
      this.page.getByRole('heading', {
        name: 'Essay',
        exact: true
      })
    ).toBeVisible({ timeout: 45000 });

    console.log('Page 3 completed successfully');
  }
}
