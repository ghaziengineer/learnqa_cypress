import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/HomePage.js";
import { signInPage } from "../pages/SignInPage.js";

Given("I open the LearnAQA homepage", () => {
  homePage.visit();
});

When("I click on the {string} button", (buttonText) => {
  switch(buttonText) {
    case "Sign In":
      homePage.elements.signInButton().click();
      break;
    default:
      throw new Error(`Button "${buttonText}" not implemented`);
  }
});

When("I enter email {string} and password {string}", (email, password) => {
  signInPage.enterCredentials(email, password);
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