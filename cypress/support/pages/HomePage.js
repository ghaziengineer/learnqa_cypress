export class HomePage {
  elements = {
    title: () => cy.get('h1.text-4xl'),
    signInButton: () => cy.contains("Sign In"),
    signUpButton: () => cy.contains("Sign Up"),
    tryWithoutEmailButton: () => cy.contains("Try Without Email")
  }

  visit() {
    cy.visit("/");
  }

  clickSignIn() {
    this.elements.signInButton().click();
  }
}
export const homePage = new HomePage();
