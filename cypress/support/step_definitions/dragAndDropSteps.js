import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { dragAndDropPage } from "../pages/DragAndDropPage.js";
import '@4tw/cypress-drag-drop';

// Navigate to Drag and Drop page
Given("I navigate to Drag and Drop page", () => {
  cy.contains('span', 'Drag and Drop').click();
  cy.url().should('include', '/drag-and-drop/');
});

// Drag single or special items to drop zone
When('I drag {string} from the source area to the drop zone', (itemName) => {
  if(itemName.startsWith("Special item")) {
    const id = itemName === "Special item 1" ? "buggy-item-0" : "buggy-item-1";
    dragAndDropPage.dragSpecialItemToDropZone(id);
  } else {
    dragAndDropPage.dragDefaultItemToDropZone(itemName);
  }
});

// Drag item to an invalid zone
When('I drag {string} from the source area to another zone', (itemName) => {
  dragAndDropPage.dragDefaultItemToInvalidZone(itemName);
});

// Drag multiple items
When("I drag the following items from the source area to the drop zone:", (dataTable) => {
  const items = dataTable.rawTable.flat();
  dragAndDropPage.dragMultipleDefaultItems(items);
});

// Click buttons
When('I click the {string} button', (buttonText) => {
  if (buttonText === "Reset") {
    dragAndDropPage.resetButton().click();
        // Wait for reset to complete
    dragAndDropPage.waitForResetComplete();
  } else if (buttonText === "Add Item") {
    dragAndDropPage.addItemButton().click();
  } else {
    throw new Error(`Unknown button: ${buttonText}`);
  }
});

// Assertions
Then('{string} should appear in the drop zone', (itemName) => {
  if(itemName.startsWith("Special item")) {
    const id = itemName === "Special item 1" ? "buggy-item-0" : "buggy-item-1";
    dragAndDropPage.dropZone().find(`#${id}`).should('exist').should('be.visible');
  } else {
    const id = itemName.toLowerCase().replace(' ', '-');
    dragAndDropPage.dropZone().find(`#${id}`).should('exist').should('be.visible');
  }
});

Then('all items should appear in the drop zone', () => {
  ['item-1','item-2','item-3','item-4'].forEach(id => {
    dragAndDropPage.dropZone().find(`#${id}`).should('exist').should('be.visible');
  });
});

Then('I should see {string}', (itemName) => {
  const id = itemName === "Special item 1" ? "buggy-item-0" : itemName === "Special item 2" ? "buggy-item-1" : itemName.toLowerCase().replace(' ', '-');
  dragAndDropPage.sourceArea().find(`#${id}`).should('exist').should('be.visible');
});

Then('the source area should contain 4 draggable items', () => {
  dragAndDropPage.sourceArea().children().should('have.length', 4);
});


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
