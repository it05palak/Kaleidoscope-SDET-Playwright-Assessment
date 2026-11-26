import { test, expect } from '@playwright/test';

import { ScholarshipLandingPage } from '../pages/ScholarshipLandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ApplicationStartPage } from '../pages/ApplicationStartPage';
import { generateUser } from '../utils/testData';

test('Register applicant and start scholarship application', async ({ page }) => {

  test.setTimeout(180000);

  const user = generateUser();

  const landingPage = new ScholarshipLandingPage(page);
  const loginPage = new LoginPage(page);
  const registrationPage = new RegistrationPage(page);
  const applicationStartPage = new ApplicationStartPage(page);

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

  // Verify dashboard
  await expect(page).toHaveURL(
    /\/applicant\/applications/,
    { timeout: 30000 }
  );

  // Start application
  await applicationStartPage.startApplication();

  await expect(
    page.getByText("Let's get to know you!", {
      exact: false
    })
  ).toBeVisible({ timeout: 20000 });

});