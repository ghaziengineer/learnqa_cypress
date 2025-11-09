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
    dashboard: () => cy.get('.dashboard, [data-testid="dashboard"], main'),
    userProfile: () => cy.get('.user-profile, [data-testid="user-profile"], .profile')
  }

  enterCredentials(email, password) {
    // Clear fields first
    this.elements.emailInput().clear();
    this.elements.passwordInput().clear();
    
    // Only type if value is provided
    if (email && email.trim() !== '') {
      this.elements.emailInput().type(email);
    }
    
    if (password && password.trim() !== '') {
      this.elements.passwordInput().type(password);
    }
  }

  submit() {
    this.elements.submitButton().click();
  }

  // Helper method to get specific user data for programmatic tests
  getUserData(userType = 'validUsers', index = 0) {
    return cy.fixture('testData.json').then(data => data[userType][index]);
  }
}

export const signInPage = new SignInPage();