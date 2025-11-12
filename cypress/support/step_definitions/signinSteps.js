import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/HomePage.js";
import { signInPage } from "../pages/SignInPage.js";

/**
 * Generic click step for any button
 * Supports: Top Sign In, Middle Sign In, Try Without Account, Logout
 */
When("I click on the {string} button", (buttonText) => {
  switch(buttonText) {
    case "Top Sign In":
      homePage.elements.topSignInButton().should("be.visible").click();
      break;
    case "Middle Sign In":
      homePage.elements.middleSignInButton().should("be.visible").click();
      break;
    case "Try Without Account":
      homePage.elements.tryWithoutAccountButton().should("be.visible").click();
      break;
    case "Logout":
      signInPage.elements.LogoutButton().should("be.visible").click();
      break;
    default:
      throw new Error(`Button "${buttonText}" not mapped in HomePage or SignInPage`);
  }
});

/**
 * Enter credentials for valid users
 */
When("I enter credentials for a valid user", () => {
  cy.fixture("testData.json").then((data) => {
    const user = data.validUsers[0];
    cy.log(`Valid user: ${user.description} (${user.email})`);
    signInPage.enterCredentials(user.email, user.password);
  });
});

/**
 * Enter credentials for invalid users
 */
When("I enter credentials for an invalid user", () => {
  cy.fixture("testData.json").then((data) => {
    const user = data.invalidUsers[0];
    cy.log(`Invalid user: ${user.description}`);
    signInPage.enterCredentials(user.email, user.password);
  });
});

/**
 * Submit sign in form
 */
When("I submit the sign in form", () => {
  signInPage.submit();
});

/**
 * Dashboard assertions
 */
Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/dashboard");
  signInPage.elements.dashboard().should("be.visible");
});

/**
 * Remain on login page assertion
 */
Then("I should remain on the sign in page", () => {
  cy.url().should("include", "/login");
});

/**
 * Redirect to home page (for logout scenario)
 */
Then("I should be redirected to the home page", () => {
  cy.url().should("include", "/");
  // Optional: verify dashboard or other homepage elements
  homePage.elements.title().should("be.visible");
});
