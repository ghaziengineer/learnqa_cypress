export class SignInPage {
  elements = {
    // Form elements
    emailInput: () => cy.get('input[type="email"], input[name="email"], #email, input[placeholder*="email" i]'),
    passwordInput: () => cy.get('input[type="password"], input[name="password"], #password, input[placeholder*="password" i]'),
    submitButton: () => cy.get('button[type="submit"]'),
    
    // Messages
    errorMessage: () => cy.get('.error, .alert-danger, .text-red-500, [data-testid*="error"]'),
    successMessage: () => cy.get('.success, .alert-success'),
    
    // Dashboard elements
    dashboard: () => cy.get('.dashboard, [data-testid="dashboard"], main')
  }

  enterCredentials(email, password) {
    if (email && email.trim() !== '') {
      this.elements.emailInput().clear().type(email);
    }
    
    if (password && password.trim() !== '') {
      this.elements.passwordInput().clear().type(password);
    }
  }

  submit() {
    this.elements.submitButton().click();
  }
}

export const signInPage = new SignInPage();