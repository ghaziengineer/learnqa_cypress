// Import Cucumber step definition functions from the preprocessor package
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Import the keyboard and mouse page object model for interaction testing
import { keyboardMousePage } from "../pages/KeyboardMousePage.js";  

/**
 * Clears an input field using the backspace key
 * Simulates user behavior of manually clearing a field by pressing backspace repeatedly
 * Handles fields with pre-filled content that need to be cleared for testing
 * 
 * @example
 * When I clear the field using backspace
 */
// Define a Cucumber When step to clear a field using backspace key
When('I clear the field using backspace', () => {
  // Call page object method that clears the search field using backspace key
  // The method detects current field content and presses backspace for each character
  keyboardMousePage.clearFieldUsingBackspace();
});

/**
 * Verifies that a confirmation dialog is visible on the page
 * Used to confirm that dialog-triggering actions successfully open modal dialogs
 * Validates both the dialog container and its title for comprehensive visibility check
 * 
 * @example
 * Then the dialog should be visible
 */
// Define a Cucumber Then step to verify dialog visibility
Then("the dialog should be visible", () => {
  // Call page object method to verify confirmation dialog is visible
  // Checks for dialog title "Delete Confirmation" and parent container visibility
  keyboardMousePage.assertDialogIsVisible();
});

/**
 * Verifies that a success message is displayed after an operation
 * Confirms successful completion of actions like deletions, updates, or submissions
 * Validates both the success icon and message text for complete success state verification
 * 
 * @example
 * Then I should see the success message
 */
// Define a Cucumber Then step to verify success message visibility
Then("I should see the success message", () => {
  // Call page object method to verify success dialog is visible with all components
  // Checks for success title, checkmark icon, and success message text
  keyboardMousePage.assertSuccessMessageVisible();
});