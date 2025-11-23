@e2e @keyboardAndMouse

Feature: Keyboard and Mouse Events

  Background:
    Given I open the homepage
    When I click on the "Top Sign In" button
    And I enter credentials for a valid user
    And I submit the sign in form
    Then I should be redirected to the "dashboard" page
    And I navigate to "Keyboard and Mouse Events" page

  @clearinput
  Scenario: Verify that backspace clears a pre-filled input field
    When I click on the "Start Scenario: Use Backspace to clear field" button
    And I clear the field using backspace
    Then the "Backspace Input" field should be empty
    And the "Clear Field indicator" should switch to green

  @dialogConfirmationFlow
Scenario: Verify dialog confirmation via Enter and closing via Escape
    When I click on the "Start Scenario: Click to open dialog" button
    Then the dialog should be visible
    When I press "Enter"
    Then I should see the success message
    When I press "Escape"
    And the "Dialog Confirmation" should switch to green
