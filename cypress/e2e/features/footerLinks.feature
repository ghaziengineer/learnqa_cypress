@ui @footer @links
Feature: Footer Links Verification
  As a visitor
  I want to verify the footer links on the LearnAQA homepage
  So that I can ensure all external and internal links work properly

  Background:
    Given I open the homepage
    And I scroll down to the footer section

  @privacy
  Scenario: Verify Privacy Policy link redirects correctly
    When I click on the "Privacy Policy" link
    Then I should be redirected to the "Privacy Policy" page
    And the page should contain the text "Privacy Policy"

  @terms
  Scenario: Verify Terms of Service link redirects correctly
    When I click on the "Terms of Service" link
    Then I should be redirected to the "Terms of Service" page
    And the page should contain the text "Terms of Service"

  @linkedin
  Scenario: Verify LinkedIn link opens provider's profile
    When I click on the "LinkedIn" link
    Then a new tab should open with the provider's LinkedIn profile
