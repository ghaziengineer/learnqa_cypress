@e2e @dynamicElements
Feature: Dynamic Elements Practice
  This feature covers testing of delayed elements, AJAX loading,
  lazy loading images, infinite scroll content, hidden elements,
  and dynamically generated content on the QA Practice Platform.

  Background:
    Given I open the homepage
    When I click on the "Top Sign In" button
    And I enter credentials for a valid user
    And I submit the sign in form
    Then I should be redirected to the "dashboard" page
    And I navigate to "Dynamic Elements" page


  @delayedelement
  Scenario: Verify delayed element appears after clicking the button
    When I click on the "Click to Show Delayed Element" button
    Then I should see the delayed element appear
