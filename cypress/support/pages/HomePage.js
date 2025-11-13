/**
 * Home Page Object Model
 * 
 * This file defines the page object model for home page functionality testing.
 * It provides methods to interact with home page elements, including navigation buttons,
 * authentication options, and main content, encapsulating all home-related DOM interactions.
 * 
 * @module HomePage
 */

export class HomePage {
  /**
   * Element locators for home page components
   * 
   * @returns {Object} Object containing home page element selectors
   */
  elements = {
    /**
     * Gets the main title element of the home page
     * @returns {Cypress.Chainable} - Chainable Cypress object for the title element
     */
    title: () => cy.get('h1.text-4xl'),

    /**
     * Gets the Sign In button in the top navigation bar
     * @returns {Cypress.Chainable} - Chainable Cypress object for the top sign in button
     */
    topSignInButton: () => cy.get('nav').contains('button', 'Sign In'),

    /**
     * Gets the Sign Up button in the top navigation bar
     * @returns {Cypress.Chainable} - Chainable Cypress object for the top sign up button
     */
    topSignUpButton: () => cy.get('nav').contains('button', 'Sign Up'),

    /**
     * Gets the Sign Up button in the middle section of the page
     * @returns {Cypress.Chainable} - Chainable Cypress object for the middle sign up button
     */
    middleSignUpButton: () => cy.get('section:nth-child(2)').contains('button', 'Sign Up'),

    /**
     * Gets the Sign In button in the middle section of the page
     * @returns {Cypress.Chainable} - Chainable Cypress object for the middle sign in button
     */
    middleSignInButton: () => cy.get('section:nth-child(2)').contains('button', 'Sign In'),

    /**
     * Gets the Try Without Account button for guest access
     * @returns {Cypress.Chainable} - Chainable Cypress object for the try without account button
     */
    tryWithoutAccountButton: () => cy.get('section:nth-child(2)').contains('button', 'Try Without Account'),
  }

  /**
   * Navigates to the application homepage
   * This is typically the entry point for home page related test scenarios
   * 
   * @example
   * // Visits the application root URL
   * homePage.visit();
   */
  visit() {
    cy.visit("/");
  }
}

/**
 * Pre-initialized instance of HomePage for immediate use in step definitions
 * 
 * @type {HomePage}
 */
export const homePage = new HomePage();