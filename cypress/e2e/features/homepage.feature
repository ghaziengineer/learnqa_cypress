@ui @homepage
Feature: Homepage UI Verification
  As a visitor
  I want to view the homepage
  So like that I can sign in, sign up, or try the platform without an account

  Background:
    Given I open the homepage

  Scenario: Verify homepage main title
    Then I should see the homepage title "Free QA Automation Practice Platform"

  Scenario: Verify Sign In and Sign Up buttons are visible
    Then I should see buttons "Sign In" and "Sign Up"

  Scenario: Verify "Try Without Account" option is available
    Then I should see the "Try Without Account" option
