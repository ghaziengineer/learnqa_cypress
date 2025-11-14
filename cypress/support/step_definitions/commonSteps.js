import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

import { homePage } from "../pages/HomePage.js";
import { signInPage } from "../pages/SignInPage.js";
import { dragAndDropPage } from "../pages/DragAndDropPage.js";


/**
 * Clicks on various authentication-related buttons throughout the application
 * Supports multiple button locations and types with built-in visibility validation
 * 
 * @param {string} buttonText - The text identifier of the button to click
 * 
 * @example
 * When I click on the "Top Sign In" button
 * When I click on the "Middle Sign In" button
 * When I click on the "Try Without Account" button
 * When I click on the "Logout" button
 * When I click on the "Reset" button
 * When I click on the "Add Item" button
 * 
 * @throws {Error} When the button text is not mapped to a known element
 */
When("I click on the {string} button", (buttonText) => {
  switch(buttonText) {
    case "Top Sign In":
      homePage.elements.topSignInButton().should("be.visible").click();
      break;
    case "Middle Sign In":
      homePage.elements.middleSignInButton().should("be.visible").click();
      break;
    case "Try Without Account":
      homePage.elements.tryWithoutAccountButton().should("be.visible").click();
      break;
    case "Logout":
      signInPage.elements.LogoutButton().should("be.visible").click();
      break;
    case "Add Item":
      dragAndDropPage.addItemButton().should("be.visible").click();
      break;
    case "Reset":
      dragAndDropPage.resetButton().should("be.visible").click();
      break;            
    default:
      throw new Error(`Button "${buttonText}" not mapped in HomePage or SignInPage or dragAndDropPage`);
  }
});
