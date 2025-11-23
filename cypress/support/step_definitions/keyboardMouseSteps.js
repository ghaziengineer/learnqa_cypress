import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { keyboardMousePage } from "../pages/KeyboardMousePage.js";  


When('I clear the field using backspace', () => {
  keyboardMousePage.clearFieldUsingBackspace();
});

Then("the Clear Field indicator should switch to green", () => {
  keyboardMousePage.clearFieldStatus()
    .should("have.class", "bg-green-100");
});