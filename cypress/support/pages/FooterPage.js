/**
 * Footer Page Object Model
 * 
 * This file defines the page object model for footer functionality testing.
 * It provides methods to interact with footer links, handle scrolling, and verify
 * redirections and content, encapsulating all footer-related DOM interactions.
 * 
 * @module FooterPage
 */

// Define a class that contains methods for testing footer functionality
class FooterPage {
  /**
   * Element locators for footer components
   * 
   * @returns {Object} Object containing footer element selectors
   */
  elements = {
    /**
     * Gets the main footer section element
     * @returns {Cypress.Chainable} - Chainable Cypress object for the footer section
     */
    footerSection: () => cy.get("footer"), // Selects the footer element using HTML footer tag

    /**
     * Gets the Privacy Policy link in the footer (case insensitive)
     * @returns {Cypress.Chainable} - Chainable Cypress object for the privacy policy link
     */
    privacyPolicyLink: () => cy.contains("footer a", "Privacy Policy", { matchCase: false }), 
    // Finds anchor tag within footer containing "Privacy Policy" text, case insensitive

    /**
     * Gets the Terms of Service link in the footer (case insensitive)
     * @returns {Cypress.Chainable} - Chainable Cypress object for the terms of service link
     */
    termsOfServiceLink: () => cy.contains("footer a", "Terms of Service", { matchCase: false }),
    // Finds anchor tag within footer containing "Terms of Service" text, case insensitive

    /**
     * Gets the LinkedIn profile link by href attribute
     * @returns {Cypress.Chainable} - Chainable Cypress object for the LinkedIn link
     */
    linkedInLink: () => cy.get("footer a[href*='linkedin.com']"),
    // Finds anchor tag within footer with href attribute containing 'linkedin.com'
  };

  /**
   * Scrolls to the footer section and verifies its visibility
   * Uses smooth scrolling animation for realistic user behavior simulation
   * 
   * @example
   * // Scrolls to footer with smooth animation
   * footerPage.scrollToFooter();
   */
  scrollToFooter() {
    // Scroll to the bottom of the page with smooth animation over 1 second
    cy.scrollTo("bottom", { duration: 1000 });
    // Verify the footer section is visible after scrolling
    this.elements.footerSection().should("be.visible");
  }

  /**
   * Clicks on a specific footer link with pre-click validation
   * Supports legal policy links and social media links with URL validation
   * 
   * @param {string} linkName - The name of the link to click (case insensitive)
   * 
   * @example
   * // Clicks Privacy Policy link
   * footerPage.clickLink("Privacy Policy");
   * 
   * // Clicks Terms of Service link  
   * footerPage.clickLink("Terms of Service");
   * 
   * // Clicks LinkedIn link and validates profile URL
   * footerPage.clickLink("LinkedIn");
   * 
   * @throws {Error} When the link name is not recognized
   */
  clickLink(linkName) {
    // Convert link name to lowercase for case-insensitive comparison
    switch (linkName.toLowerCase()) {
      case "privacy policy":
        // For Privacy Policy link: scroll into view, verify visibility, then click with force option
        this.elements.privacyPolicyLink().scrollIntoView().should("be.visible").click({ force: true });
        break;
      case "terms of service":
        // For Terms of Service link: scroll into view, verify visibility, then click with force option
        this.elements.termsOfServiceLink().scrollIntoView().should("be.visible").click({ force: true });
        break;
      case "linkedin":
        // For LinkedIn link: scroll into view, verify visibility, extract href attribute and validate
        this.elements.linkedInLink().scrollIntoView().should("be.visible").invoke("attr", "href").then((href) => {
          // Log the LinkedIn profile URL for debugging
          cy.log(`LinkedIn profile URL: ${href}`);
          // Assert that the href contains the expected LinkedIn profile path
          expect(href).to.include("linkedin.com/in/vadim-liavitski");
        });
        break;
      default:
        // Throw error if link name is not recognized
        throw new Error(`Unknown footer link: ${linkName}`);
    }
  }

  /**
   * Verifies that the current URL contains the expected URL fragment
   * Used to confirm successful redirection after clicking footer links
   * 
   * @param {string} expectedUrlFragment - The URL fragment expected in current URL
   * 
   * @example
   * // Verifies redirection to privacy policy page
   * footerPage.verifyRedirection("/privacy/");
   * 
   * // Verifies redirection to terms of service page
   * footerPage.verifyRedirection("/terms/");
   */
  verifyRedirection(expectedUrlFragment) {
    // Check that the current browser URL includes the expected fragment
    cy.url().should("include", expectedUrlFragment);
  }

  /**
   * Verifies that specific text is visible on the current page
   * Uses case-insensitive matching for robust text validation
   * 
   * @param {string} expectedText - The text expected to be visible
   * 
   * @example
   * // Verifies privacy policy title is visible
   * footerPage.verifyTextVisible("Privacy Policy");
   * 
   * // Verifies terms of service content is visible
   * footerPage.verifyTextVisible("Terms and Conditions");
   */
  verifyTextVisible(expectedText) {
    // Find element containing the expected text (case insensitive) and verify it's visible
    cy.contains(expectedText, { matchCase: false }).should("be.visible");
  }
}

/**
 * Pre-initialized instance of FooterPage for immediate use in step definitions
 * 
 * @type {FooterPage}
 */
// Create and export a singleton instance for easy import and use in test files
export const footerPage = new FooterPage();