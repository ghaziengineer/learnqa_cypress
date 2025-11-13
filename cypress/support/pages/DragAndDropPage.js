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

import '@4tw/cypress-drag-drop';

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
    const itemIdMap = {
      "Item 1": "item-1",
      "Item 2": "item-2",
      "Item 3": "item-3",
      "Item 4": "item-4"
    };
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
    return cy.get(`#${id}`);
  }

  /**
   * Gets the source area container where draggable items originate
   * Includes visibility validation to ensure UI readiness
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the source area
   */
  sourceArea() {
    return cy.get('.card-content .space-y-3').should('exist').should('be.visible');
  }

  /**
   * Gets the drop zone target area where items can be dragged
   * Includes visibility validation to ensure UI readiness
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the drop zone
   */
  dropZone() {
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
    this.defaultItem(name).should('exist').should('be.visible')
      .drag('#drop-zone');
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
    this.specialItem(id).should('exist').should('be.visible')
      .drag('#drop-zone');
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
    cy.document().then(doc => {
      const invalid = doc.createElement('div');
      invalid.id = 'invalid-drop-zone';
      invalid.style.width = '1px';
      invalid.style.height = '1px';
      invalid.style.position = 'absolute';
      invalid.style.top = '0';
      invalid.style.left = '0';
      doc.body.appendChild(invalid);
    });

    cy.get('#invalid-drop-zone').should('exist').should('be.visible');
    this.defaultItem(name).drag('#invalid-drop-zone');
    cy.get('#invalid-drop-zone').then(el => el.remove());
  }

  /**
   * Locates and returns the "Add Item" button with visibility validation
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the add item button
   */
  addItemButton() {
    return cy.get('button.btn').contains('Add Item').should('exist').should('be.visible');
  }

  /**
   * Locates and returns the "Reset" button using regex for exact text matching
   * Includes visibility validation to ensure UI readiness
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the reset button
   */
  resetButton() {
    return cy.contains('button', /^Reset$/).should('exist').should('be.visible');
  }

  /**
   * Waits for reset operation to complete by checking both drop zone and source area states
   * Validates that drop zone is empty and source area has at least 4 items restored
   * Uses extended timeout to accommodate DOM updates
   * 
   * @example
   * // Ensures reset operation is complete before proceeding
   * waitForResetComplete()
   */
  waitForResetComplete() {
    // Wait for drop zone to be empty of draggable items
    cy.get('#drop-zone', { timeout: 10000 })
      .should(($zone) => {
        // Check that no draggable items exist in drop zone
        const draggableItems = $zone.find('.draggable-item, [draggable="true"]');
        expect(draggableItems.length).to.equal(0);
      });
    
    // Also wait for source area to have expected items
    this.sourceArea().children().should('have.length.at.least', 4);
  }

  /**
   * Gets the progress text element that displays operation status
   * 
   * @returns {Cypress.Chainable} - Chainable Cypress object for the progress text
   */
  progressText() {
    return cy.get('#progress');
  }
}

/**
 * Pre-initialized instance of DragAndDropPage for immediate use in step definitions
 * 
 * @type {DragAndDropPage}
 */
export const dragAndDropPage = new DragAndDropPage();