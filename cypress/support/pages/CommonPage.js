export class CommonPage {


pressKey(keyName) {
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

  const cypressKey = keyMap[keyName];

  if (!cypressKey) {
    throw new Error(`Key "${keyName}" is not mapped in pressKey()`);
  }

  // Type key directly on the body, works anywhere
  cy.get('body').type(cypressKey, { force: true });
}


}

export const commonPage = new CommonPage();