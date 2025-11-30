/**
 * Home Page Step Definitions
 * 
 * This file contains Cucumber step definitions for testing the home page functionality.
 * It handles navigation, UI element verification, and user interactions on the application's
 * landing page, including authentication options and main content validation.
 * 
 * @module homePageSteps
 * @requires @badeball/cypress-cucumber-preprocessor
 * @requires ../pages/HomePage
 */

// Import Cucumber step definition functions from the preprocessor package
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

// Import the home page object model for home page-specific interactions
import { homePage } from "../pages/HomePage.js";

/**
 * Navigates to the application's homepage
 * This is typically the first step in home page related scenarios
 * 
 * @example
 * Given I open the homepage
 */
// Define a Cucumber Given step to navigate to the application homepage
Given("I open the homepage", () => {
  // Call page object method to visit the root URL of the application
  homePage.visit();
});

/**
 * Verifies the main title text on the home page
 * Used to confirm the page has loaded correctly and displays expected content
 * 
 * @param {string} titleText - The expected title text to verify
 * 
 * @example
 * Then I should see the homepage title "Welcome to Our Application"
 */
// Define a Cucumber Then step to verify the home page title text
Then("I should see the homepage title {string}", (titleText) => {
  // Get the title element and verify it contains the expected text
  homePage.elements.title().should("contain.text", titleText);
});

/**
 * Verifies that both Sign In and Sign Up buttons are visible with correct text
 * Checks multiple button locations (top and middle sections) for comprehensive UI validation
 * 
 * @param {string} signIn - The expected text for Sign In buttons
 * @param {string} signUp - The expected text for Sign Up buttons
 * 
 * @example
 * Then I should see buttons "Sign In" and "Sign Up"
 */
// Define a Cucumber Then step to verify authentication buttons in multiple locations
Then("I should see buttons {string} and {string}", (signIn, signUp) => {
  // Verify top navigation bar buttons contain expected text
  homePage.elements.topSignInButton().should("contain.text", signIn);
  homePage.elements.topSignUpButton().should("contain.text", signUp);

  // Verify middle section buttons contain expected text
  homePage.elements.middleSignInButton().should("contain.text", signIn);
  homePage.elements.middleSignUpButton().should("contain.text", signUp);
});

/**
 * Verifies that the "Try Without Account" option is visible and displays correct text
 * Used to validate the guest access functionality on the home page
 * 
 * @param {string} option - The expected text for the try without account option
 * 
 * @example
 * Then I should see the "Try Without Account" option
 */
// Define a Cucumber Then step to verify the guest access option
Then("I should see the {string} option", (option) => {
  // Verify the "Try Without Account" button contains the expected text
  homePage.elements.tryWithoutAccountButton().should("contain.text", option);
});