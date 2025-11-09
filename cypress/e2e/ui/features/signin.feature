@e2e @signin
Feature: User Sign In Functionality
  As a registered user
  I want to sign in to LearnAQA platform
  So that I can access my learning materials and dashboard

  Background:
    Given I open the LearnAQA homepage

  @valid
  Scenario Outline: Successful sign in with valid credentials
    When I click on the "Sign In" button
    And I enter email "<email>" and password "<password>"
    And I submit the sign in form
    Then I should be redirected to the dashboard

    Examples:
      | email               | password          |
      | ghazi@gmail.com     | Learnaqa.info1    |

@invalid
  Scenario Outline: Failed sign in with invalid credentials
    When I click on the "Sign In" button
    And I enter email "<email>" and password "<password>"  
    And I submit the sign in form
    And I should remain on the sign in page

    Examples:
      | email                   | password          |
      | wrong@email.com         | wrongpass123      |
      | ghazi@gmail.com         | incorrectPassword |
      | invalidformat           | pass123           |
      |                         | somepassword      |
      | ghazi@gmail.com         |                   |
      | nonexistent@domain.com  | anypassword       |
      | test@                   | password123       |