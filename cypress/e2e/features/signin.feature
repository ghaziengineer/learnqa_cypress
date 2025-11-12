@e2e @signin
Feature: User Sign In Functionality
  As a registered user
  I want to sign in to LearnAQA platform
  So that I can access my learning materials and dashboard

  Background:
    Given I open the homepage

  @valid
  Scenario: Successful sign in using Top Sign In button
    When I click on the "Top Sign In" button
    And I enter credentials for a valid user
    And I submit the sign in form
    Then I should be redirected to the dashboard

  @invalid
  Scenario: Failed sign in using Top Sign In button
    When I click on the "Top Sign In" button
    And I enter credentials for an invalid user
    And I submit the sign in form
    And I should remain on the sign in page

  @valid
  Scenario: Successful sign in using Middle Sign In button
    When I click on the "Middle Sign In" button
    And I enter credentials for a valid user
    And I submit the sign in form
    Then I should be redirected to the dashboard

  @invalid
  Scenario: Failed sign in using Middle Sign In button
    When I click on the "Middle Sign In" button
    And I enter credentials for an invalid user
    And I submit the sign in form
    And I should remain on the sign in page

  @valid
  Scenario: Access platform using Try Without Account button
    When I click on the "Try Without Account" button
    Then I should be redirected to the dashboard