import '@4tw/cypress-drag-drop';

export class DragAndDropPage {

  // Default draggable items
  defaultItem(name) {
    const itemIdMap = {
      "Item 1": "item-1",
      "Item 2": "item-2",
      "Item 3": "item-3",
      "Item 4": "item-4"
    };
    return cy.get(`#${itemIdMap[name]}`);
  }

  // Special items added dynamically
  specialItem(id) {
    return cy.get(`#${id}`, { timeout: 5000 }).should('exist').and('be.visible');
  }

  // Source area
  sourceArea() {
    return cy.get('.card-content .space-y-3', { timeout: 5000 }).should('be.visible');
  }

  // Drop zone
  dropZone() {
    return cy.get('#drop-zone', { timeout: 5000 }).should('be.visible');
  }

  // Drag default item to drop zone
  dragDefaultItemToDropZone(name) {
    this.defaultItem(name).drag('#drop-zone');
  }

  // Drag special item to drop zone
  dragSpecialItemToDropZone(id) {
    this.specialItem(id).drag('#drop-zone');
  }

  // Drag multiple default items
  dragMultipleDefaultItems(names) {
    names.forEach(name => this.dragDefaultItemToDropZone(name));
  }

  // Drag default item to an invalid drop zone
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

      cy.get(`#${invalid.id}`, { timeout: 5000 }).then(() => {
        this.defaultItem(name).drag(`#${invalid.id}`);
      });

      cy.get(`#${invalid.id}`).then(() => invalid.remove());
    });
  }

  // Add item button
  addItemButton() {
    return cy.get('button.btn')
      .contains('Add Item')
      .should('be.visible');
  }

  // Reset button
  resetButton() {
    return cy.contains('button', /^Reset$/).should('be.visible');
  }

  // Progress text at bottom
  progressText() {
    return cy.get('#progress');
  }
}

export const dragAndDropPage = new DragAndDropPage();
