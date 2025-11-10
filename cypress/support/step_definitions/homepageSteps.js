import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/HomePage.js";

/**
 * Open homepage 
 * especially for home page
 */
Given("I open the homepage", () => {
  homePage.visit();
});

/**
 * Assert homepage main title
 */
Then("I should see the homepage title {string}", (titleText) => {
  homePage.elements.title().should("contain.text", titleText);
});

/**
 * Assert top/bottom Sign In and Sign Up buttons are visible with correct text
 * Only for UI verification
 */
Then("I should see buttons {string} and {string}", (signIn, signUp) => {
  homePage.elements.topSignInButton().should("contain.text", signIn);
  homePage.elements.topSignUpButton().should("contain.text", signUp);

  // Middle buttons
  homePage.elements.middleSignInButton().should("contain.text", signIn);
  homePage.elements.middleSignUpButton().should("contain.text", signUp);
});

/**
 * Assert "Try Without Account" option is visible
 */
Then("I should see the {string} option", (option) => {
  homePage.elements.tryWithoutAccountButton().should("contain.text", option);
});