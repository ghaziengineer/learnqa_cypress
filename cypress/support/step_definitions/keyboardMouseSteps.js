import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { keyboardMousePage } from "../pages/KeyboardMousePage.js";  


When('I clear the field using backspace', () => {
  keyboardMousePage.clearFieldUsingBackspace();
});

Then("the dialog should be visible", () => {
  keyboardMousePage.assertDialogIsVisible();
});


Then("I should see the success message", () => {
  keyboardMousePage.assertSuccessMessageVisible();
});