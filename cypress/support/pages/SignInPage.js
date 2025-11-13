/**
 * Sign In Page Object Model
 * 
 * This file defines the page object model for sign-in functionality testing.
 * It provides methods to interact with authentication forms, enter credentials,
 * handle form submission, and verify user states, encapsulating all sign-in related DOM interactions.
 * 
 * @module SignInPage
 */

export class SignInPage {
  /**
   * Element locators for sign-in page components
   * 
   * @returns {Object} Object containing sign-in page element selectors
   */
  elements = {
    /**
     * Gets the email input field using multiple selector strategies for robustness
     * @returns {Cypress.Chainable} - Chainable Cypress object for the email input
     */
    emailInput: () => cy.get('input[type="email"], input[name="email"], #email, input[placeholder*="email" i]'),

    /**
     * Gets the password input field using multiple selector strategies for robustness
     * @returns {Cypress.Chainable} - Chainable Cypress object for the password input
     */
    passwordInput: () => cy.get('input[type="password"], input[name="password"], #password, input[placeholder*="password" i]'),

    /**
     * Gets the form submit button
     * @returns {Cypress.Chainable} - Chainable Cypress object for the submit button
     */
    submitButton: () => cy.get('button[type="submit"]'),

    /**
     * Gets the logout button after successful authentication
     * @returns {Cypress.Chainable} - Chainable Cypress object for the logout button
     */
    LogoutButton: () => cy.contains("Logout"),

    /**
     * Gets error message elements using multiple class and attribute strategies
     * @returns {Cypress.Chainable} - Chainable Cypress object for error messages
     */
    errorMessage: () => cy.get('.error, .alert-danger, .text-red-500, [data-testid*="error"]'),

    /**
     * Gets success message elements
     * @returns {Cypress.Chainable} - Chainable Cypress object for success messages
     */
    successMessage: () => cy.get('.success, .alert-success'),

    /**
     * Gets dashboard container elements after successful login
     * @returns {Cypress.Chainable} - Chainable Cypress object for the dashboard
     */
    dashboard: () => cy.get('.dashboard, [data-testid="dashboard"], main'),

    /**
     * Gets user profile elements after successful authentication
     * @returns {Cypress.Chainable} - Chainable Cypress object for user profile
     */
    userProfile: () => cy.get('.user-profile, [data-testid="user-profile"], .profile')
  };

  /**
   * Enters credentials into the sign-in form with input validation
   * Clears existing values before typing to ensure clean state
   * 
   * @param {string} email - The email address to enter
   * @param {string} password - The password to enter
   * 
   * @example
   * // Enters valid user credentials
   * signInPage.enterCredentials("user@example.com", "password123");
   * 
   * // Enters empty credentials for negative testing
   * signInPage.enterCredentials("", "");
   */
  enterCredentials(email, password) {
    this.elements.emailInput().clear();
    this.elements.passwordInput().clear();
    if (email && email.trim() !== '') this.elements.emailInput().type(email);
    if (password && password.trim() !== '') this.elements.passwordInput().type(password);
  }

  /**
   * Submits the sign-in form
   * Typically used after entering credentials to complete authentication
   * 
   * @example
   * // Submits the sign-in form
   * signInPage.submit();
   */
  submit() {
    this.elements.submitButton().click();
  }

  /**
   * Retrieves user data from test fixtures for authentication testing
   * Supports both valid and invalid user types for positive and negative testing
   * 
   * @param {string} userType - The type of user data to retrieve ('validUsers' or 'invalidUsers')
   * @param {number} index - The index of the user in the fixture array (default: 0)
   * @returns {Cypress.Chainable} - Chainable Cypress object containing user data
   * 
   * @example
   * // Gets first valid user from fixtures
   * signInPage.getUserData('validUsers', 0);
   * 
   * // Gets first invalid user from fixtures
   * signInPage.getUserData('invalidUsers', 0);
   */
  getUserData(userType = 'validUsers', index = 0) {
    return cy.fixture('testData.json').then(data => data[userType][index]);
  }
}

/**
 * Pre-initialized instance of SignInPage for immediate use in step definitions
 * 
 * @type {SignInPage}
 */
export const signInPage = new SignInPage();