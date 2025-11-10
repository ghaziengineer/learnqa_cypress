export class HomePage {
  elements = {
    title: () => cy.get('h1.text-4xl'),

    // Top buttons
    topSignInButton: () => cy.get('nav').contains('button', 'Sign In'),
    topSignUpButton: () => cy.get('nav').contains('button', 'Sign Up'),

    // Middle buttons
    middleSignUpButton: () => cy.get('section:nth-child(2)').contains('button', 'Sign Up'),
    middleSignInButton: () => cy.get('section:nth-child(2)').contains('button', 'Sign In'),
    tryWithoutAccountButton: () => cy.get('section:nth-child(2)').contains('button', 'Try Without Account'),
  }

  visit() {
    cy.visit("/");
  }
}

export const homePage = new HomePage();