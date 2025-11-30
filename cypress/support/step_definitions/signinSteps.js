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

// Import Cucumber step definition functions from the preprocessor package
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

// Import page object models for home page and sign-in page interactions
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
// Define a Cucumber When step to enter valid user credentials
When("I enter credentials for a valid user", () => {
  // Load test data from fixtures file
  cy.fixture("testData.json").then((data) => {
    // Extract the first valid user from the test data
    const user = data.validUsers[0];
    // Log user details for test traceability and debugging
    cy.log(`Valid user: ${user.description} (${user.email})`);
    // Call page object method to enter the credentials into the form
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
// Define a Cucumber When step to enter invalid user credentials
When("I enter credentials for an invalid user", () => {
  // Load test data from fixtures file
  cy.fixture("testData.json").then((data) => {
    // Extract the first invalid user from the test data
    const user = data.invalidUsers[0];
    // Log user description for test traceability
    cy.log(`Invalid user: ${user.description}`);
    // Call page object method to enter the invalid credentials into the form
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
// Define a Cucumber When step to submit the sign-in form
When("I submit the sign in form", () => {
  // Call page object method to click the form submit button
  signInPage.submit();
});