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

  @ajaxloading
   Scenario: Verify AJAX data loads successfully
    When I click on the "Load AJAX Data" button
    Then I should see the loading indicator
  And I should wait for AJAX data to load successfully
  And I should verify the loaded AJAX content











@lazyloading
Scenario: Verify lazy loading images load when scrolled into view
  When I scroll down to the lazy loading images section
  Then I should see some images are loaded and some are placeholders
  When I scroll down to load more images
  Then I should see more images loaded