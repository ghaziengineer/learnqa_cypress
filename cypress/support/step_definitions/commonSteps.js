import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../pages/HomePage.js";
import { signInPage } from "../pages/SignInPage.js";
import { dragAndDropPage } from "../pages/DragAndDropPage.js";
import { footerPage } from "../pages/FooterPage.js";


/**
 * Clicks on various authentication-related buttons throughout the application
 * Supports multiple button locations and types with built-in visibility validation
 * 
 * @param {string} buttonText - The text identifier of the button to click
 * 
 * @example
 * When I click on the "Top Sign In" button
 * When I click on the "Middle Sign In" button
 * When I click on the "Try Without Account" button
 * When I click on the "Logout" button
 * When I click on the "Reset" button
 * When I click on the "Add Item" button
 * 
 * @throws {Error} When the button text is not mapped to a known element
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
    case "Add Item":
      dragAndDropPage.addItemButton().should("be.visible").click();
      break;
    case "Reset":
      dragAndDropPage.resetButton().should("be.visible").click();
      break;            
    default:
      throw new Error(`Button "${buttonText}" not mapped in HomePage or SignInPage or dragAndDropPage`);
  }
});


/**
 * Verifies redirection to various application pages after user actions
 * Validates both URL patterns and page-specific elements for comprehensive navigation testing
 * 
 * @param {string} type - The type of page to verify redirection to
 * 
 * @example
 * Then I should be redirected to the "Privacy Policy" page
 * Then I should be redirected to the "Terms of Service" page
 * Then I should be redirected to the "dashboard" page
 * Then I should be redirected to the "home" page
 * Then I should be redirected to the "sign in" page
 * 
 * @throws {Error} When the page type is not mapped for redirection verification
 */
Then("I should be redirected to the {string} page", (type) => {
  switch (type) {
    case "Privacy Policy":
      footerPage.verifyRedirection("/privacy/");
      break;

    case "Terms of Service":
      footerPage.verifyRedirection("/terms/");
      break;

    case "dashboard":
      cy.url().should("include", "/dashboard");
      signInPage.elements.dashboard().should("be.visible");
      break;

    case "home":
      cy.url().should("include", "/");
      homePage.elements.title().should("be.visible");
      break;
      
    case "sign in": 
      cy.url().should("include", "/login");
      break;

    default:
      throw new Error(`Unknown page type: ${type}`);
  }
});


/**
 * Verifies that the user remains on the current page without redirection
 * Validates that navigation away from the page did not occur after user actions
 * Useful for testing form validation errors, failed submissions, or cancel operations
 * 
 * @param {string} type - The type of page that should remain visible and active
 * 
 * @example
 * Then I should be remain on the "sign in" page
 * 
 * @throws {Error} When the page type is not mapped for persistence verification
 */
Then("I should be remain on to the {string} page", (type) => {
  switch (type) {

    case "sign in": 
      cy.url().should("include", "/login");
      break;

    default:
      throw new Error(`Unknown page type: ${type}`);
  }
});


/**
 * Navigation step to access various application pages from the main interface
 * Provides generic navigation capability to different sections of the application
 * Validates successful navigation by checking URL patterns after clicking navigation elements
 * 
 * @param {string} pageName - The name of the page to navigate to (case-sensitive)
 * 
 * @example
 * Given I navigate to "Drag and Drop" page
 * Given I navigate to "File Operations" page
 * Given I navigate to "Dynamic Elements" page
 * Given I navigate to "iFrames & Windows" page
 * Given I navigate to "Keyboard & Mouse Events" page
 * Given I navigate to "Shadow DOM" page
 * @throws {Error} When the page name is not mapped for navigation or URL validation fails
 */
Given("I navigate to {string} page", (pageName) => {
  switch (pageName) {
    case "Drag and Drop": 
      cy.contains('span', 'Drag and Drop').click();
      cy.url().should('include', '/drag-and-drop/');
      break;

    default:
      throw new Error(`Page "${pageName}" is not mapped for navigation. Add it to the switch statement in commonSteps.js`);
  }
});


/**
 * Explicit wait
 * Waits for a specified number of seconds
 * Useful for handling animations, loading states, or API delays
 * 
 * @param {string} seconds - The number of seconds to wait
 * 
 * @example
 * Then I wait for "2" seconds
 * Then I wait for "5" seconds
 */
Then("I wait for {string} seconds", (seconds) => {
  cy.wait(parseInt(seconds) * 1000);
});