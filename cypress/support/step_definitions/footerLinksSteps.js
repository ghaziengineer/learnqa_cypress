/**
 * Footer Step Definitions
 * 
 * Ce fichier contient les définitions de steps Cucumber pour tester la fonctionnalité du footer.
 * Il gère la navigation, les interactions avec les liens et les assertions pour les scénarios
 * liés au footer de l'application.
 * 
 * @module footerSteps
 * @requires @badeball/cypress-cucumber-preprocessor
 * @requires ../pages/FooterPage
 */

// Import Cucumber step definition functions from the preprocessor package
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Import the footer page object model for footer-specific interactions
import { footerPage } from "../pages/FooterPage.js";

/**
 * Fait défiler la page jusqu'à la section footer pour rendre les éléments interactibles
 * 
 * @example
 * Given I scroll down to the footer section
 */
// Define a Cucumber Given step to scroll to the footer section
Given("I scroll down to the footer section", () => {
  // Call page object method to scroll to footer with smooth animation
  footerPage.scrollToFooter();
});

/**
 * Clique sur un lien spécifique dans le footer
 * 
 * @param {string} linkName - Le nom du lien à cliquer (ex: "Privacy Policy", "Terms of Service", "LinkedIn")
 * 
 * @example
 * When I click on the "Privacy Policy" link
 * When I click on the "LinkedIn" link
 */
// Define a Cucumber When step to click on specific footer links
When("I click on the {string} link", (linkName) => {
  // Call page object method to click the specified footer link
  // Handles Privacy Policy, Terms of Service, and LinkedIn links
  footerPage.clickLink(linkName);
});

/**
 * Vérifie qu'un texte spécifique est visible sur la page courante
 * Utilisé pour confirmer le contenu des pages légales ou d'information
 * 
 * @param {string} expectedText - Le texte attendu qui doit être visible sur la page
 * 
 * @example
 * Then the page should contain the text "Privacy Policy"
 * Then the page should contain the text "Terms and Conditions"
 */
// Define a Cucumber Then step to verify specific text is visible on the page
Then("the page should contain the text {string}", (expectedText) => {
  // Call page object method to verify text visibility with case-insensitive matching
  footerPage.verifyTextVisible(expectedText);
});

/**
 * Vérifie qu'un nouvel onglet s'ouvre avec le profil LinkedIn du fournisseur
 * Spécifique aux liens de réseaux sociaux externes qui s'ouvrent dans de nouveaux onglets
 * 
 * @example
 * Then a new tab should open with the provider's LinkedIn profile
 */
// Define a Cucumber Then step to verify LinkedIn profile opens in new tab
Then("a new tab should open with the provider's LinkedIn profile", () => {
  // Call page object method to click LinkedIn link and verify profile URL
  // Note: This step both performs the action and verifies the result
  footerPage.clickLink("LinkedIn");
  // Additional verification for new tab behavior would typically be handled here
  // but is implemented within the clickLink method for LinkedIn specifically
});