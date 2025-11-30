/**
 * Sign In Page Object Model
 * 
 * This file defines the page object model for sign-in functionality testing.
 * It provides methods to interact with authentication forms, enter credentials,
 * handle form submission, and verify user states, encapsulating all sign-in related DOM interactions.
 * 
 * @module SignInPage
 */

// Export a class that contains methods for testing sign-in functionality
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
    // Uses multiple CSS selectors as fallbacks to find email input field:
    // - input[type="email"]: Input with type email
    // - input[name="email"]: Input with name attribute "email"
    // - #email: Input with ID "email"
    // - input[placeholder*="email" i]: Input with placeholder containing "email" (case insensitive)

    /**
     * Gets the password input field using multiple selector strategies for robustness
     * @returns {Cypress.Chainable} - Chainable Cypress object for the password input
     */
    passwordInput: () => cy.get('input[type="password"], input[name="password"], #password, input[placeholder*="password" i]'),
    // Uses multiple CSS selectors as fallbacks to find password input field:
    // - input[type="password"]: Input with type password
    // - input[name="password"]: Input with name attribute "password"
    // - #password: Input with ID "password"
    // - input[placeholder*="password" i]: Input with placeholder containing "password" (case insensitive)

    /**
     * Gets the form submit button
     * @returns {Cypress.Chainable} - Chainable Cypress object for the submit button
     */
    submitButton: () => cy.get('button[type="submit"]'),
    // Finds button element with type "submit" - typically the sign-in form submission button

    /**
     * Gets the logout button after successful authentication
     * @returns {Cypress.Chainable} - Chainable Cypress object for the logout button
     */
    LogoutButton: () => cy.contains("Logout"),
    // Finds any element containing the exact text "Logout" - appears after successful login

    /**
     * Gets error message elements using multiple class and attribute strategies
     * @returns {Cypress.Chainable} - Chainable Cypress object for error messages
     */
    errorMessage: () => cy.get('.error, .alert-danger, .text-red-500, [data-testid*="error"]'),
    // Uses multiple CSS selectors to find error message elements:
    // - .error: Element with class "error"
    // - .alert-danger: Element with class "alert-danger" (Bootstrap style)
    // - .text-red-500: Element with class "text-red-500" (Tailwind red text)
    // - [data-testid*="error"]: Element with data-testid attribute containing "error"

    /**
     * Gets success message elements
     * @returns {Cypress.Chainable} - Chainable Cypress object for success messages
     */
    successMessage: () => cy.get('.success, .alert-success'),
    // Uses multiple CSS selectors to find success message elements:
    // - .success: Element with class "success"
    // - .alert-success: Element with class "alert-success" (Bootstrap style)

    /**
     * Gets dashboard container elements after successful login
     * @returns {Cypress.Chainable} - Chainable Cypress object for the dashboard
     */
    dashboard: () => cy.get('.dashboard, [data-testid="dashboard"], main'),
    // Uses multiple CSS selectors to find dashboard/main content area:
    // - .dashboard: Element with class "dashboard"
    // - [data-testid="dashboard"]: Element with data-testid "dashboard"
    // - main: HTML main element

    /**
     * Gets user profile elements after successful authentication
     * @returns {Cypress.Chainable} - Chainable Cypress object for user profile
     */
    userProfile: () => cy.get('.user-profile, [data-testid="user-profile"], .profile')
    // Uses multiple CSS selectors to find user profile elements:
    // - .user-profile: Element with class "user-profile"
    // - [data-testid="user-profile"]: Element with data-testid "user-profile"
    // - .profile: Element with class "profile"
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
    // Clear any existing values from email input field
    this.elements.emailInput().clear();
    // Clear any existing values from password input field
    this.elements.passwordInput().clear();
    // Type email only if it's not empty or whitespace-only
    if (email && email.trim() !== '') this.elements.emailInput().type(email);
    // Type password only if it's not empty or whitespace-only
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
    // Click the form submit button to attempt authentication
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
    // Load test data from fixtures file and return specific user data
    return cy.fixture('testData.json').then(data => data[userType][index]);
    // Structure expected in testData.json:
    // {
    //   "validUsers": [{email: "...", password: "..."}, ...],
    //   "invalidUsers": [{email: "...", password: "..."}, ...]
    // }
  }
}

/**
 * Pre-initialized instance of SignInPage for immediate use in step definitions
 * 
 * @type {SignInPage}
 */
// Create and export a singleton instance for easy import and use in test files
export const signInPage = new SignInPage();