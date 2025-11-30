// Export a class that contains methods for testing dynamic web elements
export class DynamicElementsPage {

  /**
   * Locates and returns the "Click to Show Delayed Element" button with visibility validation
   * Supports the actual button class and id from the DOM
   * @returns {Cypress.Chainable} - Chainable Cypress object for the Click to Show Delayed Element button
   */
  ClickToShowDelayedElementButton() {
    // Returns the button element that triggers delayed element display
    return cy.get('#trigger-delayed');
  }

  /**
   * Checks that the delayed element appears after a delay
   * Waits for a delayed element to appear fully visible.
   * Handles both CSS animations and JS-based opacity changes.
   * @param {number} [timeout=7000] - Max time to wait in milliseconds
   */
  verifyDelayedElementAppears(timeout = 7000) {
    // Get the delayed element with custom timeout and wait for it to become fully opaque
    cy.get('#delayed-element', { timeout })
      .should('have.css', 'opacity', '1') // Wait until fully visible by checking CSS opacity
      .find('.text-green-600') // Find the green text element inside the delayed element
      .should('be.visible'); // Verify the text element is visible
  }

  // Returns the button that triggers AJAX data loading
  ClickToLoadAJAXElementButton() {
    return cy.get('#load-ajax-data');
  }

  /**
   * Verifies the loading indicator is visible
   */
  verifyLoadingIndicator() {
    // Check the button is in loading state (disabled)
    cy.get('#load-ajax-data[disabled]') // Select disabled button with specific ID
      .should('be.visible') // Verify button is visible
      .and('contain', 'Loading Data...'); // Verify button contains loading text

    // Verify the loading spinner is visible with animation
    cy.get('#load-ajax-data[disabled] .loading-spinner') // Select spinner inside disabled button
      .should('be.visible') // Verify spinner is visible
      .and('have.class', 'animate-spin'); // Verify spinner has spinning animation class
  }

  /**
   * Waits for AJAX data to load successfully
   */
  waitForAJAXDataToLoad() {
    // Wait for loading state to disappear and normal button to reappear
    cy.get('#load-ajax-data:not([disabled])', { timeout: 10000 }) // Select enabled button with 10s timeout
      .should('be.visible') // Verify button is visible
      .and('contain', 'Load AJAX Data'); // Verify button text changed back
  }

  /**
   * Verifies the loaded AJAX content
   */
  verifyAJAXContent() {
    // Check that AJAX content container is visible and has items
    cy.get('.space-y-2.max-h-60.overflow-y-auto', { timeout: 10000 }) // Select AJAX container with 10s timeout
      .should('be.visible') // Verify container is visible
      .find('.ajax-item') // Find individual AJAX items inside container
      .should('have.length.at.least', 1) // Verify at least one item loaded
      .and('be.visible'); // Verify items are visible
  }

  /**
   * Scrolls to the lazy loading images section
   */
  scrollToLazyLoadingSection() {
    // Scroll to the lazy loading images container and verify it's visible
    cy.get('.space-y-4 .max-h-96.overflow-y-auto') // Select lazy loading container
      .scrollIntoView() // Scroll element into viewport
      .should('be.visible'); // Verify container is visible after scrolling
  }

  /**
   * Verifies initial state with mixed loaded images and placeholders
   */
  verifyInitialLazyLoadState() {
    // Check container is visible
    cy.get('.space-y-4 .max-h-96.overflow-y-auto') // Select lazy loading container
      .should('be.visible'); // Verify container is visible

    // Wait a bit for any initial images to load
    cy.wait(2000); // Wait 2 seconds for initial image loading

    // Just verify we have placeholders (images may be 0 initially)
    cy.get('.lazy-image-placeholder').should('have.length.at.least', 8); // Verify at least 8 placeholders exist
  }

  /**
   * Scrolls down to trigger loading of more images
   */
  scrollToLoadMoreImages() {
    // Define container selector for lazy loading images
    const container = '.space-y-4 .max-h-96.overflow-y-auto';
    
    // Scroll to bottom to trigger image loading with smooth scrolling
    cy.get(container).scrollTo('bottom', { duration: 2000 }); // Scroll to bottom over 2 seconds
    cy.wait(2000); // Wait 2 seconds for images to load after scrolling
  }

  /**
   * Verifies more images loaded after scrolling
   */
  verifyMoreImagesLoaded() {
    // Check we have loaded images after scrolling by looking for actual image sources
    cy.get('.lazy-image-placeholder img[src*="picsum.photos"]') // Select images with actual src containing "picsum.photos"
      .should('have.length.at.least', 1); // Verify at least one real image loaded
  }

  /**
   * Scrolls to the infinite scroll section
   */
  scrollToInfiniteScrollSection() {
    // Scroll to infinite scroll container and verify it's visible
    cy.get('#infinite-scroll-container') // Select infinite scroll container by ID
      .scrollIntoView() // Scroll element into viewport
      .should('be.visible'); // Verify container is visible
  }

  /**
   * Verifies the first 10 items are loaded
   */
  verifyInitialItemsLoaded() {
    // Check exactly 10 items are loaded initially
    cy.get('.scroll-item') // Select scroll items
      .should('have.length', 10) // Verify exactly 10 items
      .first() // Get first item
      .should('contain', 'Item 1') // Verify first item contains "Item 1"
      .and('contain', 'Page 1'); // Verify first item contains "Page 1"
    
    // Verify last of initial items
    cy.get('.scroll-item') // Select scroll items again
      .last() // Get last item
      .should('contain', 'Item 10') // Verify last item contains "Item 10"
      .and('contain', 'Page 1'); // Verify last item contains "Page 1"
  }

  /**
   * Scrolls to the bottom of the infinite scroll container (single scroll)
   */
  scrollToBottomOfInfiniteScroll() {
    // Scroll to bottom of infinite scroll container
    cy.get('#infinite-scroll-container') // Select infinite scroll container
      .scrollTo('bottom', { duration: 1000 }); // Scroll to bottom over 1 second

    cy.wait(2500); // Allow 2.5 seconds for new items to load after scrolling
  }

  /**
   * Verifies more items loaded after the first scroll
   */
  verifyMoreItemsLoaded() {
    // Check that more items loaded after scrolling
    cy.get('.scroll-item', { timeout: 8000 }) // Select scroll items with 8s timeout
      .should('have.length.at.least', 20); // Verify at least 20 items now (10 initial + 10 new)

    // Verify items from page 2 are present
    cy.get('.scroll-item') // Select scroll items
      .filter(':contains("Page 2")') // Filter to only items containing "Page 2"
      .its('length') // Get the count of filtered items
      .should('be.gte', 1); // Verify at least one item from page 2 exists
  }

  /**
   * Recursively scrolls until all items (50) are loaded
   */
  scrollToLoadAllPages() {
    // Define container selector for infinite scroll
    const container = '#infinite-scroll-container';

    // Define recursive function to keep scrolling until all items are loaded
    function loadMore() {
      cy.get('.scroll-item').then($items => {
        // Check if we've reached the target of 50 items
        if ($items.length >= 50) {
          return; // STOP scrolling when all items loaded
        }

        // Keep scrolling if not all items loaded yet
        cy.get(container).scrollTo('bottom', { duration: 800 }); // Scroll to bottom

        cy.wait(2000); // Wait 2 seconds for new items to load

        loadMore(); // Recursive call to check again and scroll if needed
      });
    }

    loadMore(); // Start the recursive scrolling process
  }

  /**
   * Verifies all 50 items are loaded
   */
  verifyAllItemsLoaded() {
    // Verify exactly 50 items are loaded with extended timeout
    cy.get('.scroll-item', { timeout: 15000 }) // Select scroll items with 15s timeout
      .should('have.length', 50) // Verify exactly 50 items
      .then($items => {
        // Page 5 should be present (since 50 items = 5 pages of 10 items each)
        const page5 = $items.filter(':contains("Page 5")'); // Filter items containing "Page 5"
        expect(page5.length).to.be.at.least(1); // Verify at least one item from page 5

        // Validate last item content
        cy.wrap($items.last()) // Wrap the last item to chain Cypress commands
          .should('contain', 'Item 50'); // Verify last item contains "Item 50"
      });
  }

  /**
   * Verifies the "No more items to load" message
   */
  verifyNoMoreItemsMessage() {
    // Define container selector
    const container = '#infinite-scroll-container';

    // Scroll to very bottom to reveal the "no more items" message
    cy.get(container).scrollTo('bottom', { duration: 1000 }); // Scroll to bottom

    // Now assert visibility of the end message
    cy.contains('.text-center', 'No more items to load', { timeout: 8000 }) // Find element with text and center alignment
      .scrollIntoView() // Scroll message into view to ensure it's visible
      .should('be.visible'); // Verify the message is visible
  }

}

// Create and export a singleton instance for easy import and use in test files
export const dynamicElementsPage = new DynamicElementsPage();