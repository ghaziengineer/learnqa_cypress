export class KeyboardMousePage {

     
  /**
   * Search input field (pre-filled)
   */
  searchField() {
    return cy.get('#search-field');
  }


ClickToStartScenarioButton() {
    return cy.get('#start-clear-scenario');
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



}
export const keyboardMousePage = new KeyboardMousePage();
