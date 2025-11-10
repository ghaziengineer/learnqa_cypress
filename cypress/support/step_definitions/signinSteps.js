import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/HomePage.js";
import { signInPage } from "../pages/SignInPage.js";

// Track current user for multiple test runs
let currentUserIndex = 0;

Given("I open the LearnAQA homepage", () => {
  homePage.visit();
});

When("I click on the {string} button", (buttonText) => {
  switch(buttonText) {
    case "Sign In":
      homePage.elements.signInButton().click();
      break;
    case "Logout":
      signInPage.elements.LogoutButton().click();
      break;

    default:
      throw new Error(`Button "${buttonText}" not implemented`);
  }
});

// Alternative approach - test all valid users in sequence
When("I enter credentials for a valid user", () => {
  cy.fixture('testData.json').then((data) => {
    // Get the test index from environment or use sequential
    const testIndex = Cypress.env('TEST_INDEX') || 0;
    const user = data.validUsers[testIndex % data.validUsers.length];
    cy.log(`Testing with valid user: ${user.description} (${user.email})`);
    signInPage.enterCredentials(user.email, user.password);
  });
});

// Alternative approach - test all invalid users
When("I enter credentials for an invalid user", () => {
  cy.fixture('testData.json').then((data) => {
    const testIndex = Cypress.env('TEST_INDEX') || 0;
    const user = data.invalidUsers[testIndex % data.invalidUsers.length];
    cy.log(`Testing with invalid user: ${user.description}`);
    signInPage.enterCredentials(user.email, user.password);
  });
});

When("I submit the sign in form", () => {
  signInPage.submit();
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should('include', '/dashboard');
  signInPage.elements.dashboard().should('be.visible');
});

Then("I should remain on the sign in page", () => {
  cy.url().should('include', '/login/');
});

Then("I should be redirected to the home page", () => {
  cy.url().should('include', '/');
  signInPage.elements.dashboard().should('be.visible');
});