@e2e @signin
Feature: User Sign In Functionality
  As a registered user
  I want to sign in to LearnAQA platform
  So that I can access my learning materials and dashboard

  Background:
    Given I open the LearnAQA homepage

  @valid
  Scenario: Successful sign in with all valid credentials
    When I click on the "Sign In" button
    And I enter credentials for a valid user
    And I submit the sign in form
    Then I should be redirected to the dashboard

  @invalid
  Scenario: Failed sign in with invalid credentials
    When I click on the "Sign In" button
    And I enter credentials for an invalid user
    And I submit the sign in form
    And I should remain on the sign in page