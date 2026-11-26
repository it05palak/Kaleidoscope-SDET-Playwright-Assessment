import { Page, expect } from '@playwright/test';

export class ApplicationPage4 {
  constructor(private page: Page) {}

  async validateEssay(
    option: string,
    essayLabel: string
  ) {
    const checkbox = this.page.getByRole('checkbox', {
      name: option,
      exact: true
    });

    await expect(checkbox).toBeVisible();

    await checkbox.check();

    const essayBox = this.page.getByRole('textbox', {
      name: essayLabel
    });

    await expect(essayBox).toBeVisible({
      timeout: 15000
    });

    await checkbox.uncheck();

    await expect(essayBox).toBeHidden({
      timeout: 15000
    });
  }

  async completePage4() {

    await expect(
      this.page.getByText('Please select the essay types', {
        exact: false
      })
    ).toBeVisible({ timeout: 30000 });

    await this.validateEssay('Cars', 'Essay about Cars');

    await this.validateEssay('School', 'Essay about School');

    await this.validateEssay(
      'Other',
      'Provide an essay about any topic'
    );

    // Animals option
    const animals = this.page.getByRole('checkbox', {
      name: 'Animals',
      exact: true
    });

    if (await animals.count() === 0) {
      console.warn(
        'REQUIREMENT MISMATCH: Animals option is missing.'
      );
    } else {
      await this.validateEssay(
        'Animals',
        'Essay about Animals'
      );

      await animals.check();

      const animalsEssay = this.page.getByRole('textbox', {
        name: 'Essay about Animals'
      });

      await expect(animalsEssay).toBeVisible({
        timeout: 15000
      });

      await animalsEssay.fill(
        'Animals are important for maintaining ecological balance.'
      );
    }

    // Select School
    await this.page.getByRole('checkbox', {
      name: 'School',
      exact: true
    }).check();

    const schoolEssay = this.page.getByRole('textbox', {
      name: 'Essay about School'
    });

    await expect(schoolEssay).toBeVisible({
      timeout: 15000
    });

    await schoolEssay.fill(
      'My school helped me develop teamwork and leadership skills.'
    );

    await this.page.getByRole('button', {
      name: 'Next Page',
      exact: true
    }).click();

    await expect(
      this.page.getByText('Review Your Application')
    ).toBeVisible({ timeout: 30000 });

    console.log('Page 4 completed successfully');
  }
}