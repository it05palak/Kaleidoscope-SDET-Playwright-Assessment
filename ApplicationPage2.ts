import { Page, expect } from '@playwright/test';

export class ApplicationPage2 {
  constructor(private page: Page) {}

  async addActivity(
    name: string,
    years: string,
    role: string,
    description: string
  ) {
    // STEP 1: Open Add Entry popup
    const addEntryButton = this.page.getByRole('button', {
      name: 'Add Entry',
      exact: true
    });

    await expect(addEntryButton).toBeVisible();
    await expect(addEntryButton).toBeEnabled();

    await addEntryButton.click();

    // STEP 2: Wait for popup
    const dialog = this.page.getByRole('dialog', {
      name: 'Add Entry'
    });

    await expect(dialog).toBeVisible({
      timeout: 20000
    });

    // STEP 3: Fill Activity Name
    const activityName = dialog.getByRole('textbox', {
      name: 'Extracurricular Activity Name',
      exact: true
    });

    await activityName.fill(name);

    // STEP 4: Fill Years Involved
    const yearsInput = dialog.getByRole('textbox', {
      name: 'Total Number of Years Involved',
      exact: true
    });

    await yearsInput.fill(years);

    // STEP 5: Fill Leadership Roles
    const leadershipField = dialog.getByRole('textbox', {
      name: /List any leadership roles, offices, honors and recognitions/
    });

    await leadershipField.fill(role);

    // STEP 6: Fill Description
    const descriptionField = dialog.getByRole('textbox', {
      name: 'Description of Involvement',
      exact: true
    });

    await descriptionField.fill(description);

    // STEP 7: Verify values before Add
    await expect(activityName).toHaveValue(name);
    await expect(yearsInput).toHaveValue(years);
    await expect(leadershipField).toHaveValue(role);
    await expect(descriptionField).toHaveValue(description);

    // STEP 8: Click Add
    const addButton = dialog.getByRole('button', {
      name: 'Add',
      exact: true
    });

    await expect(addButton).toBeEnabled();
    await addButton.click();

    // STEP 9: Wait for popup to close
    await expect(dialog).toBeHidden({
      timeout: 30000
    });

    // STEP 10: Verify activity added
    await expect(
      this.page.getByText(name, { exact: true })
    ).toBeVisible({ timeout: 30000 });

    console.log(`${name} added successfully`);
  }

  async completePage2() {
    // Verify Page 2
    await expect(
      this.page.getByRole('heading', {
        name: 'Extracurricular Activities'
      })
    ).toBeVisible({ timeout: 30000 });

    // STEP 1: Add first activity
    await this.addActivity(
      'Coding Club',
      '2',
      'Team Leader',
      'Participated in coding competitions.'
    );

    // STEP 2: Negative validation
    const nextButton = this.page.getByRole('button', {
      name: 'Next Page',
      exact: true
    });

    await nextButton.click();

    await expect(
      this.page.getByText('Please add at least 2 entries')
    ).toBeVisible({ timeout: 15000 });

    // STEP 3: Add remaining activities
    await this.addActivity(
      'Sports Club',
      '3',
      'Team Captain',
      'Participated in sports events.'
    );

    await this.addActivity(
      'Debate Competition',
      '2',
      'Coordinator',
      'Participated in debate competitions.'
    );

    await this.addActivity(
      'Community Service',
      '1',
      'Volunteer',
      'Participated in community service.'
    );

    // STEP 4: Verify four activities
    for (const activity of [
      'Coding Club',
      'Sports Club',
      'Debate Competition',
      'Community Service'
    ]) {
      await expect(
        this.page.getByText(activity, { exact: true })
      ).toBeVisible();
    }

    // STEP 5: Navigate to Page 3
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    // STEP 6: Verify Page 3
    await expect(
      this.page.getByRole('heading', {
        name: 'High School Information'
      })
    ).toBeVisible({ timeout: 30000 });

    console.log('Page 2 completed successfully');
  }
}
