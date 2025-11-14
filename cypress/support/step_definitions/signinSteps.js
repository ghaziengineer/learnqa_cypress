/**
 * Sign IN Step Definitions
 * 
 * This file contains Cucumber step definitions for testing authentication functionality,
 * including sign-in, logout, and credential management. It handles user interactions
 * across the home page and sign-in page, supporting both valid and invalid user scenarios.
 * 
 * @module authenticationSteps
 * @requires @badeball/cypress-cucumber-preprocessor
 * @requires ../pages/HomePage
 * @requires ../pages/SignInPage
 */

import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/HomePage.js";
import { signInPage } from "../pages/SignInPage.js";


/**
 * Enters credentials for a valid user using test data from fixtures
 * Automatically selects the first valid user from the test data file
 * Includes logging for test traceability
 * 
 * @example
 * When I enter credentials for a valid user
 */
When("I enter credentials for a valid user", () => {
  cy.fixture("testData.json").then((data) => {
    const user = data.validUsers[0];
    cy.log(`Valid user: ${user.description} (${user.email})`);
    signInPage.enterCredentials(user.email, user.password);
  });
});

/**
 * Enters credentials for an invalid user using test data from fixtures
 * Automatically selects the first invalid user from the test data file
 * Used for testing authentication failure scenarios
 * 
 * @example
 * When I enter credentials for an invalid user
 */
When("I enter credentials for an invalid user", () => {
  cy.fixture("testData.json").then((data) => {
    const user = data.invalidUsers[0];
    cy.log(`Invalid user: ${user.description}`);
    signInPage.enterCredentials(user.email, user.password);
  });
});

/**
 * Submits the sign-in form after credentials have been entered
 * Typically used after credential entry steps to complete the authentication flow
 * 
 * @example
 * When I submit the sign in form
 */
When("I submit the sign in form", () => {
  signInPage.submit();
});

/**
 * Verifies successful redirection to the dashboard after authentication
 * Checks both URL pattern and dashboard element visibility for comprehensive validation
 * 
 * @example
 * Then I should be redirected to the dashboard
 */
Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard");
  signInPage.elements.dashboard().should("be.visible");
});

/**
 * Verifies that the user remains on the sign-in page after failed authentication
 * Used to validate that invalid credentials do not cause navigation
 * 
 * @example
 * Then I should remain on the sign in page
 */
Then("I should remain on the sign in page", () => {
  cy.url().should("include", "/login");
});

/**
 * Verifies successful redirection to the home page after logout
 * Validates both URL pattern and home page element visibility
 * 
 * @example
 * Then I should be redirected to the home page
 */
Then("I should be redirected to the home page", () => {
  cy.url().should("include", "/");
  // Optional: verify dashboard or other homepage elements
  homePage.elements.title().should("be.visible");
});