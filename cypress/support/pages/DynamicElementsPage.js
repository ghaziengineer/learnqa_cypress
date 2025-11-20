export class DynamicElementsPage {

  /**
   * Locates and returns the "Click to Show Delayed Element" button with visibility validation
   * Supports the actual button class and id from the DOM
   * @returns {Cypress.Chainable} - Chainable Cypress object for the Click to Show Delayed Element button
   */
  ClickToShowDelayedElementButton() {
    return cy.get('#trigger-delayed');
  }

  /**
   * Checks that the delayed element appears after a delay
   * @param {number} [timeout=5000] - Optional timeout in ms to wait for the element
   */
  verifyDelayedElementAppears(timeout = 5000) {
    // Wait for the delayed element to appear (adjust selector as needed)
    cy.get('.text-green-600', { timeout }).should('be.visible');
  }


ClickToLoadAJAXElementButton() {
    return cy.get('#load-ajax-data');
}


 /**
   * Verifies the loading indicator is visible
   */
verifyLoadingIndicator() {
  // Check the button is in loading state (disabled)
  cy.get('#load-ajax-data[disabled]')
    .should('be.visible')
    .and('contain', 'Loading Data...');

  // Verify the loading spinner is visible with animation
  cy.get('#load-ajax-data[disabled] .loading-spinner')
    .should('be.visible')
    .and('have.class', 'animate-spin');
}

/**
 * Waits for AJAX data to load successfully
 */
waitForAJAXDataToLoad() {
  // Wait for loading state to disappear and normal button to reappear
  cy.get('#load-ajax-data:not([disabled])', { timeout: 10000 })
    .should('be.visible')
    .and('contain', 'Load AJAX Data');
}


/**
 * Verifies the loaded AJAX content
 */
verifyAJAXContent() {
  // Check that AJAX content container is visible and has items
  cy.get('.space-y-2.max-h-60.overflow-y-auto', { timeout: 10000 })
    .should('be.visible')
    .find('.ajax-item')
    .should('have.length.at.least', 1)
    .and('be.visible');
}

 /**
   * Scrolls to the lazy loading images section
   */
  scrollToLazyLoadingSection() {
    cy.get('.space-y-4 .max-h-96.overflow-y-auto')
      .scrollIntoView()
      .should('be.visible');
  }

  /**
   * Verifies initial state with mixed loaded images and placeholders
   */
  verifyInitialLazyLoadState() {
    // Check container is visible
    cy.get('.space-y-4 .max-h-96.overflow-y-auto')
      .should('be.visible');

    // Wait a bit for any initial images to load
    cy.wait(2000);

    // Just verify we have placeholders (images may be 0 initially)
    cy.get('.lazy-image-placeholder').should('have.length.at.least', 8);
  }

  /**
   * Scrolls down to trigger loading of more images
   */
  scrollToLoadMoreImages() {
    const container = '.space-y-4 .max-h-96.overflow-y-auto';
    
    // Scroll to bottom to trigger image loading
    cy.get(container).scrollTo('bottom', { duration: 2000 });
    cy.wait(2000);
  }

  /**
   * Verifies more images loaded after scrolling
   */
  verifyMoreImagesLoaded() {
    // Check we have loaded images after scrolling
    cy.get('.lazy-image-placeholder img[src*="picsum.photos"]')
      .should('have.length.at.least', 1);
  }
}
















export const dynamicElementsPage = new DynamicElementsPage();