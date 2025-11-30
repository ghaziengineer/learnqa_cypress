// Import Cucumber step definition functions from the preprocessor package
import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

// Import all page object model instances for use in step definitions
import { homePage } from "../pages/HomePage.js";
import { signInPage } from "../pages/SignInPage.js";
import { dragAndDropPage } from "../pages/DragAndDropPage.js";
import { footerPage } from "../pages/FooterPage.js";
import { fileOperationsPage } from "../pages/FileOperationsPage.js";
import { dynamicElementsPage } from "../pages/DynamicElementsPage.js";  
import { keyboardMousePage } from "../pages/KeyboardMousePage.js";  
import { commonPage } from "../pages/CommonPage.js";

/**
 * Page object imports for Cypress Cucumber step definitions
 * Centralizes all page object dependencies for maintainable test automation
 * 
 * @namespace pageObjects
 * @property {Object} homePage - Page object for home page interactions and elements
 * @property {Object} signInPage - Page object for authentication flows and user session management
 * @property {Object} dragAndDropPage - Page object for drag and drop interaction testing
 * @property {Object} footerPage - Page object for footer navigation and link verification
 * @property {Object} fileOperationsPage - Page object for file upload, download, and manipulation operations
 */

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
 * When I click on the "Download Template Excel" button
 * When I click on the "Click to Show Delayed Element" button

 * 
 * @throws {Error} When the button text is not mapped to a known element
 */
// Define a Cucumber When step for clicking various buttons throughout the application
When("I click on the {string} button", (buttonText) => {
  // Use switch statement to handle different button types based on the parameter
  switch(buttonText) {
    case "Top Sign In":
      // Click the sign-in button located in the top navigation bar
      homePage.elements.topSignInButton().should("be.visible").click();
      break;
    case "Middle Sign In":
      // Click the sign-in button located in the middle section of the page
      homePage.elements.middleSignInButton().should("be.visible").click();
      break;
    case "Try Without Account":
      // Click the button to access the application without authentication
      homePage.elements.tryWithoutAccountButton().should("be.visible").click();
      break;
    case "Logout":
      // Click the logout button to end the user session
      signInPage.elements.LogoutButton().should("be.visible").click();
      break;
    case "Add Item":
      // Click the button to add a new draggable item
      dragAndDropPage.addItemButton().should("be.visible").click();
      break;
    case "Reset":
      // Click the reset button to restore initial state in drag and drop
      dragAndDropPage.resetButton().should("be.visible").click();
      break;  
    case "Download Template Excel":
      // Click the button to download Excel template file
      fileOperationsPage.DownloadTemplateExcel().should("be.visible").click();
      break;   
    case "Browse Files":
      // Do not click hidden file input, just skip this case
      // File upload should be handled in the step definition using attachFile
      // This case exists to handle the step in feature files without throwing errors
      break;   
    case "Click to Show Delayed Element":
      // Click the button that triggers delayed element appearance
      dynamicElementsPage.ClickToShowDelayedElementButton().should("be.visible").click(); 
      break;  
    case "Load AJAX Data":
      // Click the button that loads data via AJAX request
      dynamicElementsPage.ClickToLoadAJAXElementButton().should("be.visible").click(); 
      break;  
    case "Start Scenario: Use Backspace to clear field":
      // Click the button that starts the backspace clearing scenario
      keyboardMousePage.ClickToStartScenarioClearFieldButton().should("be.visible").click(); 
      break;  
    case "Start Scenario: Click to open dialog":
      // Click the button that opens a confirmation dialog
      keyboardMousePage.ClickToStartScenarioOpenDialogButton().should("be.visible").click(); 
      break;  
    default:
      // Throw error if button text is not recognized in the switch cases
      throw new Error(`Button "${buttonText}" not mapped in pages `);
  }
});

// Define a Cucumber When step for double-clicking on specific elements
When("I double-click on the {string} button", (buttonText) => {
  switch(buttonText) {
    case "Double-click to edit this text":
      // Double-click on the editable text element to enable editing
      keyboardMousePage.editableText().should("be.visible").dblclick();
      break;
    default:
      // Throw error if element for double-click is not recognized
      throw new Error(`Button for double click "${buttonText}" not mapped in pages `);
  }
});

// Define a Cucumber When step for hovering over elements with configurable duration
When('I hover over the {string} element for {int} seconds', (elementName, seconds) => {
  let selector;

  // Determine which element to hover over based on the parameter
  switch(elementName) {
    case 'Hover over this card':
      // Set selector for the hover card element
      selector = '#hover-card'; 
      break;
    default:
      // Throw error if element name is not recognized
      throw new Error(`Element "${elementName}" not found for hover`);
  }

  // Execute the hover action with specified duration
  keyboardMousePage.hoverElement(selector, seconds);
});

// Define a Cucumber Then step to verify content visibility after interactions
Then('the {string} content should be visible', (elementName) => {
  let selector;

  // Determine which content to verify based on the parameter
  switch(elementName) {
    case 'Hover over this card':
      // Set selector for the content that appears when hovering over the card
      selector = '#hover-card .font-semibold'; 
      break;
    default:
      // Throw error if content name is not recognized
      throw new Error(`Content for "${elementName}" not found`);
  }
  
  // Verify the specified content is visible
  keyboardMousePage.verifyContentVisible(selector);
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
// Define a Cucumber Then step to verify page redirection after actions
Then("I should be redirected to the {string} page", (type) => {
  switch (type) {
    case "Privacy Policy":
      // Verify URL contains privacy policy path and page content is loaded
      footerPage.verifyRedirection("/privacy/");
      break;
    case "Terms of Service":
      // Verify URL contains terms of service path and page content is loaded
      footerPage.verifyRedirection("/terms/");
      break;
    case "dashboard":
      // Verify URL contains dashboard path and dashboard element is visible
      cy.url().should("include", "/dashboard");
      signInPage.elements.dashboard().should("be.visible");
      break;
    case "home":
      // Verify URL is at root path and home page title is visible
      cy.url().should("include", "/");
      homePage.elements.title().should("be.visible");
      break;
    case "sign in": 
      // Verify URL contains login path
      cy.url().should("include", "/login");
      break;
    default:
      // Throw error if page type is not recognized
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
// Define a Cucumber Then step to verify user remains on current page (no redirection)
Then("I should be remain on to the {string} page", (type) => {
  switch (type) {
    case "sign in": 
      // Verify URL still contains login path (user was not redirected away)
      cy.url().should("include", "/login");
      break;
    default:
      // Throw error if page type is not recognized
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
// Define a Cucumber Given step for navigating to different application pages
Given("I navigate to {string} page", (pageName) => {
  switch (pageName) {
    case "Drag and Drop": 
      // Click on drag and drop navigation link and verify URL
      cy.contains('span', 'Drag and Drop').click();
      cy.url().should('include', '/drag-and-drop/');
      break;
    case "File Operations": 
      // Click on file operations navigation link and verify URL
      cy.contains('span', 'File Operations').click();
      cy.url().should("include", "/file-operations/");
      break;
    case "Dynamic Elements": 
      // Click on dynamic elements navigation link and verify URL
      cy.contains('span', 'Dynamic Elements').click();
      cy.url().should("include", "/dynamic-elements/");
      break;
    case "Keyboard and Mouse Events": 
      // Click on keyboard & mouse events navigation link and verify URL
      cy.contains('span', 'Keyboard & Mouse Events').click();
      cy.url().should("include", "/keyboard-mouse-events/");
      break;
    default:
      // Throw error with helpful message for unmapped page names
      throw new Error(`Page "${pageName}" is not mapped for navigation. Add it to the switch statement in commonSteps.js`);
  }
});

// Define a Cucumber Given step to verify status indicators turn green (success state)
Given("the {string} should switch to green", (indicator) => {
  switch (indicator) {
    case "Clear Field indicator": 
      // Verify clear field status indicator has green background class
      keyboardMousePage.clearFieldStatus()
        .should("have.class", "bg-green-100");
      break;
    case "Dialog Confirmation": 
      // Verify dialog confirmation status indicator has green background class
      keyboardMousePage.dialogConfirmationStatus()
        .should("have.class", "bg-green-100");
      break;
    case "Double click": 
      // Verify double click status indicator has green background class
      keyboardMousePage.doubleClickStatus()
        .should("have.class", "bg-green-100");
      break;
    case "Hover": 
      // Verify hover status indicator has green background class
      keyboardMousePage.hoverStatus()
        .should("have.class", "bg-green-100");
      break;
    default:
      // Throw error if indicator name is not recognized
      throw new Error(`indicator "${indicator}" is not mapped `);
  }
});

// Define a Cucumber Then step to verify form fields are empty
Then("the {string} field should be empty", (fieldName) => {
  switch (fieldName) {
    case "Backspace Input":
    case "Search Field":
      // Verify the search/input field has empty value
      keyboardMousePage.searchField()
        .should("have.value", "");
      break;
    default:
      // Throw error if field name is not recognized
      throw new Error(`Unknown field name: ${fieldName}`);
  }
});

// Define a Cucumber When step for pressing keyboard keys
When('I press {string}', (keyName) => {
  // Use common page method to simulate keyboard key press
  commonPage.pressKey(keyName);
});

/**
 * Explicit wait
 * Waits for a specified number of seconds
 * Useful for handling animations, loading states, or API delays
 * @param {string} seconds - The number of seconds to wait
 * @example
 * Then I wait for "2" seconds
 * Then I wait for "5" seconds
 */
// Define a Cucumber Then step for explicit waiting (use sparingly - prefer conditional waits)
Then("I wait for {string} seconds", (seconds) => {
  // Convert seconds to milliseconds and wait
  cy.wait(parseInt(seconds) * 1000);
});