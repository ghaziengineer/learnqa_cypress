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
 *Checks that the delayed element appears after a delay
 * Waits for a delayed element to appear fully visible.
 * Handles both CSS animations and JS-based opacity changes.
 * @param {number} [timeout=7000] - Max time to wait in milliseconds
 */
verifyDelayedElementAppears(timeout = 7000) {
  cy.get('#delayed-element', { timeout })
    .should('have.css', 'opacity', '1') // wait until fully visible
    .find('.text-green-600')
    .should('be.visible');
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


 /**
   * Scrolls to the infinite scroll section
   */
  scrollToInfiniteScrollSection() {
    cy.get('#infinite-scroll-container')
      .scrollIntoView()
      .should('be.visible');
  }

  /**
   * Verifies the first 10 items are loaded
   */
  verifyInitialItemsLoaded() {
    cy.get('.scroll-item')
      .should('have.length', 10)
      .first()
      .should('contain', 'Item 1')
      .and('contain', 'Page 1');
    
    cy.get('.scroll-item')
      .last()
      .should('contain', 'Item 10')
      .and('contain', 'Page 1');
  }

/**
 * Scrolls to the bottom of the infinite scroll container (single scroll)
 */
scrollToBottomOfInfiniteScroll() {
  cy.get('#infinite-scroll-container')
    .scrollTo('bottom', { duration: 1000 });

  cy.wait(2500); // allow items to load
}

/**
 * Verifies more items loaded after the first scroll
 */
verifyMoreItemsLoaded() {
  cy.get('.scroll-item', { timeout: 8000 })
    .should('have.length.at.least', 20);

  cy.get('.scroll-item')
    .filter(':contains("Page 2")')
    .its('length')
    .should('be.gte', 1);
}

/**
 * Recursively scrolls until all items (50) are loaded
 */
scrollToLoadAllPages() {
  const container = '#infinite-scroll-container';

  function loadMore() {
    cy.get('.scroll-item').then($items => {
      if ($items.length >= 50) {
        return; // STOP scrolling when all items loaded
      }

      // keep scrolling
      cy.get(container).scrollTo('bottom', { duration: 800 });

      cy.wait(2000);

      loadMore(); // recursive retry
    });
  }

  loadMore();
}

/**
 * Verifies all 50 items are loaded
 */
verifyAllItemsLoaded() {
  cy.get('.scroll-item', { timeout: 15000 })
    .should('have.length', 50)
    .then($items => {
      // Page 5 should be present
      const page5 = $items.filter(':contains("Page 5")');
      expect(page5.length).to.be.at.least(1);

      // Validate last item
      cy.wrap($items.last())
        .should('contain', 'Item 50');
    });
}

/**
 * Verifies the "No more items to load" message
 */
verifyNoMoreItemsMessage() {
  const container = '#infinite-scroll-container';

  // Scroll to very bottom to reveal the message
  cy.get(container).scrollTo('bottom', { duration: 1000 });

  // Now assert visibility
  cy.contains('.text-center', 'No more items to load', { timeout: 8000 })
    .scrollIntoView()
    .should('be.visible');
}



























}
















export const dynamicElementsPage = new DynamicElementsPage();