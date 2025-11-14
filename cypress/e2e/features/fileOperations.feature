@fileoperations @e2e
Feature: File Operations Processing
  As a user
  I want to download, upload, and process Excel files
  So that I can validate data transformation functionality

  Background:
    Given I open the homepage
    When I click on the "Top Sign In" button
    And I enter credentials for a valid user
    And I submit the sign in form
    Then I should be redirected to the dashboard
    And I navigate to File Operations page

 