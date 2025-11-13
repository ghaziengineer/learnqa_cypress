/**
 * Drag and Drop Step Definitions
 * 
 * This file contains Cucumber step definitions for testing drag-and-drop functionality.
 * It handles navigation, drag operations, button interactions, and assertions for
 * the drag-and-drop feature scenarios.
 * 
 * @module dragAndDropSteps
 * @requires @badeball/cypress-cucumber-preprocessor
 * @requires ../pages/DragAndDropPage
 * @requires @4tw/cypress-drag-drop
 */

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { dragAndDropPage } from "../pages/DragAndDropPage.js";
import '@4tw/cypress-drag-drop';

/**
 * Navigation step to access the Drag and Drop page from the application dashboard
 * 
 * @example
 * Given I navigate to Drag and Drop page
 * 
 * @throws {Error} If navigation fails or URL doesn't include '/drag-and-drop/'
 */
Given("I navigate to Drag and Drop page", () => {
  cy.contains('span', 'Drag and Drop').click();
  cy.url().should('include', '/drag-and-drop/');
});

/**
 * Drags a single item from the source area to the designated drop zone
 * 
 * @param {string} itemName - The name of the item to drag (e.g., "Item 1", "Item 2")
 * 
 * @example
 * When I drag "Item 1" from the source area to the drop zone
 */
When('I drag {string} from the source area to the drop zone', (itemName) => {
  dragAndDropPage.dragDefaultItemToDropZone(itemName);
});

/**
 * Drags an item from the source area to an invalid/non-target zone
 * Used to test error handling and boundary conditions
 * 
 * @param {string} itemName - The name of the item to drag
 * 
 * @example
 * When I drag "Item 1" from the source area to another zone
 */
When('I drag {string} from the source area to another zone', (itemName) => {
  dragAndDropPage.dragDefaultItemToInvalidZone(itemName);
});

/**
 * Drags multiple items sequentially from the source area to the drop zone
 * Accepts a data table of item names from the feature file
 * 
 * @param {DataTable} dataTable - Cucumber data table containing item names
 * 
 * @example
 * When I drag the following items from the source area to the drop zone:
 *   | Item 1 |
 *   | Item 2 |
 *   | Item 3 |
 *   | Item 4 |
 */
When("I drag the following items from the source area to the drop zone:", (dataTable) => {
  const items = dataTable.rawTable.flat();
  dragAndDropPage.dragMultipleDefaultItems(items);
});

/**
 * Handles button click interactions for the drag-and-drop interface
 * Supports "Reset" and "Add Item" buttons with appropriate timing considerations
 * 
 * @param {string} buttonText - The text displayed on the button to click
 * 
 * @example
 * When I click the "Reset" button
 * When I click the "Add Item" button
 * 
 * @throws {Error} When an unknown button text is provided
 */
When('I click the {string} button', (buttonText) => {
  if (buttonText === "Reset") {
    dragAndDropPage.resetButton().click();
    // Wait for reset to complete to ensure DOM stability
    dragAndDropPage.waitForResetComplete();
  } else if (buttonText === "Add Item") {
    dragAndDropPage.addItemButton().click();
  } else {
    throw new Error(`Unknown button: ${buttonText}`);
  }
});

/**
 * Verifies that a specific item appears in the drop zone after drag operation
 * 
 * @param {string} itemName - The name of the item to verify
 * 
 * @example
 * Then "Item 1" should appear in the drop zone
 */
Then('{string} should appear in the drop zone', (itemName) => {
  const id = itemName.toLowerCase().replace(' ', '-');
  dragAndDropPage.dropZone().find(`#${id}`).should('exist').should('be.visible');
});

/**
 * Verifies that all default items (Item 1-4) are present in the drop zone
 * Used for bulk drag operation validation
 * 
 * @example
 * Then all items should appear in the drop zone
 */
Then('all items should appear in the drop zone', () => {
  ['item-1','item-2','item-3','item-4'].forEach(id => {
    dragAndDropPage.dropZone().find(`#${id}`).should('exist').should('be.visible');
  });
});

/**
 * Verifies that an item is visible in the source area
 * Supports both default items and special dynamically added items
 * 
 * @param {string} itemName - The name of the item to verify
 * 
 * @example
 * Then I should see "Item 1"
 * Then I should see "Special item 1"
 */
Then('I should see {string}', (itemName) => {
  const id = itemName === "Special item 1" ? "buggy-item-0" : itemName === "Special item 2" ? "buggy-item-1" : itemName.toLowerCase().replace(' ', '-');
  dragAndDropPage.sourceArea().find(`#${id}`).should('exist').should('be.visible');
});

/**
 * Validates that the source area contains exactly 4 draggable items
 * Used to verify initial state and reset functionality
 * 
 * @example
 * Then the source area should contain 4 draggable items
 */
Then('the source area should contain 4 draggable items', () => {
  dragAndDropPage.sourceArea().children().should('have.length', 4);
});

/**
 * Verifies that a specific item is not present in the drop zone
 * Particularly useful for testing reset functionality and invalid operations
 * 
 * @param {string} itemName - The name of the item that should not be present
 * 
 * @example
 * Then the drop zone should not contain "Item 1"
 */
Then('the drop zone should not contain {string}', (itemName) => {
  const idMap = {
    "Item 1": "item-1",
    "Item 2": "item-2", 
    "Item 3": "item-3",
    "Item 4": "item-4"
  };

  const id = idMap[itemName];
  
  // More robust check that waits for element to be removed
  cy.get('#drop-zone').within(() => {
    cy.get(`#${id}`).should('not.exist');
  });
});