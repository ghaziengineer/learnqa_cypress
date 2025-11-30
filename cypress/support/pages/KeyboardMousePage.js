// Export a class that contains methods for testing keyboard and mouse interactions
export class KeyboardMousePage {

  /**
   * Search input field (pre-filled)
   */
  searchField() {
    // Returns the search input field element by its ID
    return cy.get('#search-field');
  }

  // Returns the button that starts the clear field scenario
  ClickToStartScenarioClearFieldButton() {
    return cy.get('#start-clear-scenario');
  }

  // Returns the button that starts the dialog scenario  
  ClickToStartScenarioOpenDialogButton() {
    return cy.get('#start-dialog-scenario');
  }

  /**
   * Clears the search field using BACKSPACE until empty
   */
  clearFieldUsingBackspace() {
    // Get the search field and access its current value
    this.searchField().then(($input) => {
      // Get the current text value from the input field
      const text = $input.val();

      // Check if there is any text to clear
      if (text.length > 0) {
        // Click on the field to focus it, then type backspace key for each character
        // Add +1 to ensure any remaining characters are cleared
        cy.wrap($input).click().type('{backspace}'.repeat(text.length + 1 ));
      }
    });
  }

  /**
   * Verifies that field is empty
   */
  verifyFieldIsEmpty() {
    // Check that the search field has an empty value
    this.searchField().should('have.value', '');
  }

  // Returns the status element indicating clear field scenario completion
  clearFieldStatus() {
    // Find element with specific classes containing "Clear Field" text
    return cy.contains(".p-2.rounded.text-center.text-xs", "Clear Field");
  }

  // Returns the status element indicating dialog flow scenario completion
  dialogConfirmationStatus() {
    // Find element with specific classes containing "Dialog Flow" text
    return cy.contains(".p-2.rounded.text-center.text-xs", "Dialog Flow");
  }

  // Returns the status element indicating double-click scenario completion
  doubleClickStatus() {
    // Find element with specific classes containing "Double-click" text
    return cy.contains(".p-2.rounded.text-center.text-xs", "Double-click");
  }

  // Returns the status element indicating hover scenario completion
  hoverStatus() {
    // Find element with specific classes containing "Hover" text
    return cy.contains(".p-2.rounded.text-center.text-xs", "Hover");
  }

  // Asserts that the confirmation dialog is visible
  assertDialogIsVisible() {
    // Find and verify the dialog title "Delete Confirmation" is visible
    cy.contains('h3', 'Delete Confirmation')
      .should('be.visible')
      // Navigate to parent dialog container and verify it's also visible
      .parents('.p-6')
      .should('be.visible');
  }

  // Asserts that the success message dialog is visible with all its components
  assertSuccessMessageVisible() {
    // Find and verify the success dialog title is visible
    cy.contains('h3', 'Success')
      .should('be.visible')
      // Navigate to parent dialog container
      .parents('.p-6') // top dialog container
      .within(() => {
        // Within the dialog, verify the checkmark icon is visible
        cy.get('span').contains('✓').should('be.visible');
        // Verify the success message text is visible
        cy.contains('Item has been successfully deleted').should('be.visible');
      });
  }

  // Returns the editable text element
  editableText() {
    return cy.get('#editable-text');
  }

  /**
   * Hovers over an element and waits for specified time
   * @param {string} selector - CSS selector of the element to hover over
   * @param {number} seconds - Number of seconds to wait after hovering (default: 2)
   */
  hoverElement(selector, seconds = 2) {
    // Get the element, trigger mouseover event, then wait specified seconds
    cy.get(selector)
      .trigger('mouseover') // Simulate mouse hover event
      .wait(seconds * 1000); // Convert seconds to milliseconds and wait
  }

  /**
   * Verifies that content with given selector is visible
   * @param {string} selector - CSS selector of the element to check
   */
  verifyContentVisible(selector) {
    // Check that the element with given selector is visible
    cy.get(selector).should('be.visible');
  }
}

// Create and export a singleton instance for easy import and use in test files
export const keyboardMousePage = new KeyboardMousePage();