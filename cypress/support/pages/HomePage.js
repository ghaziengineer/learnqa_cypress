export class HomePage {
  elements = {
    title: () => cy.get('h1.text-4xl'),
    signInButton: () => cy.contains("Sign In"),
    signUpButton: () => cy.contains("Sign Up"),
    tryWithoutAccountButton: () => cy.contains("Try Without Account")
  }

  visit() {
    cy.visit("/");
  }

  clickSignIn() {
    this.elements.signInButton().click();
  }
}
export const homePage = new HomePage();
