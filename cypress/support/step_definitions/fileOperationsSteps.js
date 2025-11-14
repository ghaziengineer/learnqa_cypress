import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { fileOperationsPage } from "../pages/FileOperationsPage";

/**
 * Navigation step to access the File Operations page from the application dashboard
 * 
 * @example
 * Given I navigate to File Operations page
 * 
 * @throws {Error} If navigation fails or URL doesn't include '/file-operations/'
 */
Given("I navigate to File Operations page", () => {
  cy.contains('span', 'File Operations').click();
  cy.url().should('include', '/file-operations/');
});



