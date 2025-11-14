@e2e @logout
Feature: User log out Functionality
  As a registered user
  I want to sign in to LearnAQA platform
  So that I can access my learning materials and dashboard
  Then I want to logout to remain on the homepage

  Background:
    Given I open the homepage

  Scenario: Successful sign in with a valid credential then logout
    When I click on the "Top Sign In" button
    And I enter credentials for a valid user
    And I submit the sign in form
    Then I should be redirected to the "dashboard" page
    When I click on the "Logout" button
    Then I should be redirected to the "home" page
