import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the homepage", () => {
  cy.visit("/");
});

Then('I should see the main title {string}', (title) => {
  cy.contains(title).should("be.visible");
});

Then('I should see the buttons {string} and {string}', (btn1, btn2) => {
  cy.contains(btn1).should("be.visible");
  cy.contains(btn2).should("be.visible");
});

When('I click {string}', (button) => {
  cy.contains(button).click();
});

Then('I should be redirected to the dashboard', () => {
  cy.url().should("include", "/dashboard");
});

Then('I should see the Dashboard main title {string}', (title) => {
  cy.contains(title).should("be.visible");
});
