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
  cy.contains('button', buttonText).click();
});

// Assertions
Then('{string} should appear in the drop zone', (itemName) => {
  if(itemName.startsWith("Special item")) {
    const id = itemName === "Special item 1" ? "buggy-item-0" : "buggy-item-1";
    cy.get(`#${id}`, { timeout: 5000 }).should('exist').and('be.visible').and('contain.text', itemName);
  } else {
    dragAndDropPage.dropZone()
      .find(`#${itemName.toLowerCase().replace(' ', '-')}`, { timeout: 5000 })
      .should('exist')
      .and('be.visible');
  }
});

Then('all items should appear in the drop zone', () => {
  ['item-1','item-2','item-3','item-4'].forEach(id => {
    cy.get(`#${id}`, { timeout: 5000 }).should('exist').and('be.visible');
  });
});

Then('I should see {string} in the source area', (itemName) => {
  const id = itemName === "Special item 1" ? "buggy-item-0" : 
             itemName === "Special item 2" ? "buggy-item-1" : 
             itemName.toLowerCase().replace(' ', '-');

  dragAndDropPage.sourceArea()
    .find(`#${id}`, { timeout: 10000 }) // wait up to 10s
    .should('exist')
    .and('be.visible');
});

Then('the source area should contain 4 draggable items', () => {
  dragAndDropPage.sourceArea()
    .children({ timeout: 5000 })
    .should('have.length', 4);
});

Then('the drop zone should not contain {string}', (itemName) => {
  const id = itemName.startsWith("Special item")
    ? (itemName === "Special item 1" ? "buggy-item-0" : "buggy-item-1")
    : itemName.toLowerCase().replace(' ', '-');

  cy.get(`#${id}`, { timeout: 5000 }).should('not.exist');
});
