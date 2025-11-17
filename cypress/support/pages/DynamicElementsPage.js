export class DynamicElementsPage {

  /**
   * Locates and returns the "Click to Show Delayed Element" button with visibility validation
   * Supports the actual button class and id from the DOM
   * @returns {Cypress.Chainable} - Chainable Cypress object for the Click to Show Delayed Element button
   */
  ClickToShowDelayedElementButton() {
    return cy.get('#trigger-delayed').should('exist').should('be.visible');
  }

  /**
   * Checks that the delayed element appears after a delay
   * @param {number} [timeout=5000] - Optional timeout in ms to wait for the element
   */
  verifyDelayedElementAppears(timeout = 5000) {
    // Wait for the delayed element to appear (adjust selector as needed)
    cy.get('.text-green-600', { timeout }).should('be.visible');
  }
}

export const dynamicElementsPage = new DynamicElementsPage();