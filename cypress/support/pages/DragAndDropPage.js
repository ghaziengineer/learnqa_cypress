/**
 * Drag and Drop Page Object Model
 * 
 * This file defines the page object model for drag-and-drop functionality testing.
 * It provides methods to interact with draggable elements, drop zones, and control
 * buttons, encapsulating the DOM interactions and drag operations.
 * 
 * @module DragAndDropPage
 * @requires @4tw/cypress-drag-drop
 */

// Import the Cypress drag and drop plugin to enable drag functionality in tests
import '@4tw/cypress-drag-drop';

// Export a class that encapsulates all drag and drop page interactions
export class DragAndDropPage {

  /**
   * Locates a default draggable item by its display name
   * 
   * @param {string} name - The display name of the item (e.g., "Item 1", "Item 2")
   * @returns {Cypress.Chainable} - Chainable Cypress object for the item element
   * 
   * @example
   * // Returns element with ID 'item-1'
   * defaultItem("Item 1")
   */
  defaultItem(name) {
    // Mapping object that converts human-readable names to DOM element IDs
    const itemIdMap = {
      "Item 1": "item-1",  // Maps "Item 1" to element with ID 'item-1'
      "Item 2": "item-2",  // Maps "Item 2" to element with ID 'item-2'
      "Item 3": "item-3",  // Maps "Item 3" to element with ID 'item-3'
      "Item 4": "item-4"   // Maps "Item 4" to element with ID 'item-4'
    };
    // Return Cypress chainable object for the element with the mapped ID
    return cy.get(`#${itemIdMap[name]}`);
  }

  /**
   * Locates a special dynamically added draggable item by its ID
   * 
   * @param {string} id - The DOM ID of the special item (e.g., "buggy-item-0")
   * @returns {Cypress.Chainable} - Chainable Cypress object for the special item element
   * 
   * @example
   * // Returns element with ID 'buggy-item-0'
   * specialItem("buggy-item-0")
   */
  specialItem(id) {
    // Return Cypress chainable object for the element with the specified ID
    return cy.get(`#${id}`);
  }

  /**
   * Gets the source area container where draggable items originate
   * Includes visibility validation to ensure UI readiness
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the source area
   */
  sourceArea() {
    // Get the source area element and verify it exists and is visible
    return cy.get('.card-content .space-y-3').should('exist').should('be.visible');
  }

  /**
   * Gets the drop zone target area where items can be dragged
   * Includes visibility validation to ensure UI readiness
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the drop zone
   */
  dropZone() {
    // Get the drop zone element by ID and verify it exists and is visible
    return cy.get('#drop-zone').should('exist').should('be.visible');
  }

  /**
   * Performs drag operation of a default item to the drop zone
   * Validates item visibility before initiating drag
   * 
   * @param {string} name - The display name of the item to drag
   * 
   * @example
   * // Drags "Item 1" to the drop zone
   * dragDefaultItemToDropZone("Item 1")
   */
  dragDefaultItemToDropZone(name) {
    // Get the default item, verify it exists and is visible, then drag to drop zone
    this.defaultItem(name).should('exist').should('be.visible')
      .drag('#drop-zone');  // Use drag-drop plugin to perform drag operation
  }

  /**
   * Performs drag operation of a special item to the drop zone
   * Validates item visibility before initiating drag
   * 
   * @param {string} id - The DOM ID of the special item to drag
   * 
   * @example
   * // Drags special item with ID 'buggy-item-0' to drop zone
   * dragSpecialItemToDropZone("buggy-item-0")
   */
  dragSpecialItemToDropZone(id) {
    // Get the special item, verify it exists and is visible, then drag to drop zone
    this.specialItem(id).should('exist').should('be.visible')
      .drag('#drop-zone');  // Use drag-drop plugin to perform drag operation
  }

  /**
   * Performs sequential drag operations for multiple default items
   * 
   * @param {string[]} names - Array of item names to drag sequentially
   * 
   * @example
   * // Drags all four items to the drop zone
   * dragMultipleDefaultItems(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
   */
  dragMultipleDefaultItems(names) {
    // Loop through each name in the array and drag each item to drop zone
    names.forEach(name => this.dragDefaultItemToDropZone(name));
  }

  /**
   * Performs drag operation to an invalid/non-target zone for negative testing
   * Dynamically creates and removes an invalid drop zone to test error conditions
   * 
   * @param {string} name - The display name of the item to drag
   * 
   * @example
   * // Drags "Item 1" to an invalid zone
   * dragDefaultItemToInvalidZone("Item 1")
   */
  dragDefaultItemToInvalidZone(name) {
    // Access the document to create a temporary invalid drop zone element
    cy.document().then(doc => {
      // Create a new div element for invalid drop zone
      const invalid = doc.createElement('div');
      // Set ID for targeting
      invalid.id = 'invalid-drop-zone';
      // Set minimal dimensions
      invalid.style.width = '1px';
      invalid.style.height = '1px';
      // Position absolutely at top-left corner
      invalid.style.position = 'absolute';
      invalid.style.top = '0';
      invalid.style.left = '0';
      // Append the element to the document body
      doc.body.appendChild(invalid);
    });

    // Verify the invalid zone exists and is visible
    cy.get('#invalid-drop-zone').should('exist').should('be.visible');
    // Drag the specified item to the invalid zone
    this.defaultItem(name).drag('#invalid-drop-zone');
    // Remove the temporary invalid zone after the drag operation
    cy.get('#invalid-drop-zone').then(el => el.remove());
  }

  /**
   * Locates and returns the "Add Item" button with visibility validation
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the add item button
   */
  addItemButton() {
    // Find button with class 'btn' containing exact text "Add Item" and verify visibility
    return cy.get('button.btn').contains('Add Item').should('exist').should('be.visible');
  }

  /**
   * Locates and returns the "Reset" button using regex for exact text matching
   * Includes visibility validation to ensure UI readiness
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the reset button
   */
  resetButton() {
    // Find button containing exact text "Reset" (using regex ^Reset$) and verify visibility
    return cy.contains('button', /^Reset$/).should('exist').should('be.visible');
  }
}

/**
 * Pre-initialized instance of DragAndDropPage for immediate use in step definitions
 * 
 * @type {DragAndDropPage}
 */
// Create and export a singleton instance for easy import and use in test files
export const dragAndDropPage = new DragAndDropPage();