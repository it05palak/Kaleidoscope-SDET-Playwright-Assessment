import { test, expect } from '@playwright/test';

import { ScholarshipLandingPage } from '../pages/ScholarshipLandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ApplicationStartPage } from '../pages/ApplicationStartPage';

import { ApplicationPage1 } from '../pages/ApplicationPage1';
import { ApplicationPage2 } from '../pages/ApplicationPage2';
import { ApplicationPage3 } from '../pages/ApplicationPage3';
import { ApplicationPage4 } from '../pages/ApplicationPage4';
import { ReviewPage } from '../pages/ReviewPage';

import { generateUser } from '../utils/testData';
import { saveTestUser } from '../utils/saveTestUser';

test('Complete Kaleidoscope Scholarship Application End-to-End',
  async ({ page }) => {

    test.setTimeout(600000);

    const user = generateUser();
    saveTestUser(user);

    const landingPage = new ScholarshipLandingPage(page);
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);
    const applicationStartPage = new ApplicationStartPage(page);

    const applicationPage1 = new ApplicationPage1(page);
    const applicationPage2 = new ApplicationPage2(page);
    const applicationPage3 = new ApplicationPage3(page);
    const applicationPage4 = new ApplicationPage4(page);
    const reviewPage = new ReviewPage(page);

    // Registration
    await landingPage.navigate();
    await landingPage.openLogin();
    await loginPage.enterEmailAndContinue(user.email);

    await registrationPage.fillRegistrationForm(
      user.firstName,
      user.lastName,
      user.phone,
      user.password,
      user.email
    );

    await registrationPage.submitRegistration();

    await expect(page).toHaveURL(
      /\/applicant\/applications/,
      { timeout: 30000 }
    );

    // Begin
    await applicationStartPage.startApplication();

    // Page 1
    const contributorEmail =
      `contributor.${Date.now()}@example.com`;

    await applicationPage1.completePage1(contributorEmail);

    // Page 2
    await applicationPage2.completePage2();

    // Page 3
    await applicationPage3.completePage3();

    // Page 4
    await applicationPage4.completePage4();

    // Review and Submit
    await reviewPage.reviewAndSubmit();

    console.log('Complete E2E test passed');
  }
);
