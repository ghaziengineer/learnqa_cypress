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
    When I click on the "Start scenario" button
    And I clear the field using backspace
    Then the "Backspace Input" field should be empty
    And the Clear Field indicator should switch to green
