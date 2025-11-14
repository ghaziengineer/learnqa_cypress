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

import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { footerPage } from "../pages/FooterPage.js";

/**
 * Fait défiler la page jusqu'à la section footer pour rendre les éléments interactibles
 * 
 * @example
 * Given I scroll down to the footer section
 */
Given("I scroll down to the footer section", () => {
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
When("I click on the {string} link", (linkName) => {
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
Then("the page should contain the text {string}", (expectedText) => {
  footerPage.verifyTextVisible(expectedText);
});

/**
 * Vérifie qu'un nouvel onglet s'ouvre avec le profil LinkedIn du fournisseur
 * Spécifique aux liens de réseaux sociaux externes qui s'ouvrent dans de nouveaux onglets
 * 
 * @example
 * Then a new tab should open with the provider's LinkedIn profile
 */
Then("a new tab should open with the provider's LinkedIn profile", () => {
  footerPage.clickLink("LinkedIn");
});