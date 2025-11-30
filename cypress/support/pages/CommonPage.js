// Export a class that contains common page utility methods
export class CommonPage {

  // Method to simulate pressing keyboard keys
  pressKey(keyName) {
    // Define a mapping object that converts human-readable key names to Cypress key codes
    const keyMap = {
      Enter: '{enter}',
      Escape: '{esc}',
      Tab: '{tab}',
      Backspace: '{backspace}',
      Space: '{space}',
      ArrowUp: '{uparrow}',
      ArrowDown: '{downarrow}',
      ArrowLeft: '{leftarrow}',
      ArrowRight: '{rightarrow}'
    };

    // Look up the Cypress key code for the provided key name
    const cypressKey = keyMap[keyName];

    // Check if the provided key name exists in the mapping
    if (!cypressKey) {
      // Throw an error if the key is not found in the mapping
      throw new Error(`Key "${keyName}" is not mapped in pressKey()`);
    }

    // Type key directly on the body, works anywhere
    // cy.get('body') - Selects the body element of the page
    // .type(cypressKey, { force: true }) - Types the key with force option
    // { force: true } - Forces the action even if the element is not visible or interactable
    cy.get('body').type(cypressKey, { force: true });
  }

}

// Create an instance of the CommonPage class and export it
// This allows importing and using the methods directly without instantiating the class
export const commonPage = new CommonPage();