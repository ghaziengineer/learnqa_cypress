export class KeyboardMousePage {

     
  /**
   * Search input field (pre-filled)
   */
  searchField() {
    return cy.get('#search-field');
  }


ClickToStartScenarioClearFieldButton() {
    return cy.get('#start-clear-scenario');
}

ClickToStartScenarioOpenDialogButton() {
    return cy.get('#start-dialog-scenario');
}

  /**
   * Clears the search field using BACKSPACE until empty
   */
  clearFieldUsingBackspace() {
    this.searchField().then(($input) => {
      const text = $input.val();

      if (text.length > 0) {
        cy.wrap($input).click().type('{backspace}'.repeat(text.length + 1 ));
      }
    });
  }

  /**
   * Verifies that field is empty
   */
  verifyFieldIsEmpty() {
    this.searchField().should('have.value', '');
  }

clearFieldStatus() {
  return cy.contains(".p-2.rounded.text-center.text-xs", "Clear Field");
}

dialogConfirmationStatus() {
  return cy.contains(".p-2.rounded.text-center.text-xs", "Dialog Flow");
}

doubleClickStatus() {
  return cy.contains(".p-2.rounded.text-center.text-xs", "Double-click");
}

assertDialogIsVisible() {
  cy.contains('h3', 'Delete Confirmation')
    .should('be.visible')
    .parents('.p-6')
    .should('be.visible');
}
assertSuccessMessageVisible() {
  cy.contains('h3', 'Success')
    .should('be.visible')
    .parents('.p-6') // top dialog container
    .within(() => {
      cy.get('span').contains('✓').should('be.visible');
      cy.contains('Item has been successfully deleted').should('be.visible');
    });
}


  editableText() {
    return cy.get('#editable-text');
  }


}
export const keyboardMousePage = new KeyboardMousePage();
