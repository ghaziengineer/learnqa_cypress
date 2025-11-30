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

// Import Cucumber step definition functions from the preprocessor package
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Import the drag and drop page object model for element interactions
import { dragAndDropPage } from "../pages/DragAndDropPage.js";

// Import the Cypress drag and drop plugin to enable drag functionality
import '@4tw/cypress-drag-drop';

/**
 * Drags a single item from the source area to the designated drop zone
 * 
 * @param {string} itemName - The name of the item to drag (e.g., "Item 1", "Item 2")
 * 
 * @example
 * When I drag "Item 1" from the source area to the drop zone
 */
// Define a Cucumber When step for dragging a single item to the drop zone
When('I drag {string} from the source area to the drop zone', (itemName) => {
  // Use the page object method to perform the drag operation
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
// Define a Cucumber When step for dragging to an invalid zone (negative testing)
When('I drag {string} from the source area to another zone', (itemName) => {
  // Use the page object method to perform drag to invalid zone
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
// Define a Cucumber When step for dragging multiple items using a data table
When("I drag the following items from the source area to the drop zone:", (dataTable) => {
  // Extract item names from the data table and flatten to a simple array
  const items = dataTable.rawTable.flat();
  // Use the page object method to drag all items sequentially
  dragAndDropPage.dragMultipleDefaultItems(items);
});

/**
 * Verifies that a specific item appears in the drop zone after drag operation
 * 
 * @param {string} itemName - The name of the item to verify
 * 
 * @example
 * Then "Item 1" should appear in the drop zone
 */
// Define a Cucumber Then step to verify an item is in the drop zone
Then('{string} should appear in the drop zone', (itemName) => {
  // Convert item name to DOM ID format (e.g., "Item 1" -> "item-1")
  const id = itemName.toLowerCase().replace(' ', '-');
  // Find the item in the drop zone and verify it exists and is visible
  dragAndDropPage.dropZone().find(`#${id}`).should('exist').should('be.visible');
});

/**
 * Verifies that all default items (Item 1-4) are present in the drop zone
 * Used for bulk drag operation validation
 * 
 * @example
 * Then all items should appear in the drop zone
 */
// Define a Cucumber Then step to verify all default items are in the drop zone
Then('all items should appear in the drop zone', () => {
  // Array of all default item IDs
  ['item-1','item-2','item-3','item-4'].forEach(id => {
    // For each item ID, verify it exists and is visible in the drop zone
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
// Define a Cucumber Then step to verify an item is visible in the source area
Then('I should see {string}', (itemName) => {
  // Map item names to their DOM IDs, handling special items differently
  const id = itemName === "Special item 1" ? "buggy-item-0" : 
             itemName === "Special item 2" ? "buggy-item-1" : 
             itemName.toLowerCase().replace(' ', '-'); // Default items: "Item 1" -> "item-1"
  
  // Find the item in the source area and verify it exists and is visible
  dragAndDropPage.sourceArea().find(`#${id}`).should('exist').should('be.visible');
});

/**
 * Validates that the source area contains exactly 4 draggable items
 * Used to verify initial state and reset functionality
 * 
 * @example
 * Then the source area should contain 4 draggable items
 */
// Define a Cucumber Then step to verify the source area has exactly 4 items
Then('the source area should contain 4 draggable items', () => {
  // Count the children of the source area and verify there are exactly 4
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
// Define a Cucumber Then step to verify an item is NOT in the drop zone
Then('the drop zone should not contain {string}', (itemName) => {
  // Mapping object to convert human-readable names to DOM IDs
  const idMap = {
    "Item 1": "item-1",
    "Item 2": "item-2", 
    "Item 3": "item-3",
    "Item 4": "item-4"
  };

  // Get the DOM ID for the specified item name
  const id = idMap[itemName];
  
  // More robust check that waits for element to be removed
  // Use within to scope the search to the drop zone only
  cy.get('#drop-zone').within(() => {
    // Verify the item with the specified ID does not exist in the drop zone
    cy.get(`#${id}`).should('not.exist');
  });
});