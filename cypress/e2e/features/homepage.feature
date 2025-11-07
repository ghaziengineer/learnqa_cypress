Feature: Homepage

  Scenario: Verify homepage main UI elements
    Given I open the homepage
    Then I should see the main title "Free QA Automation Practice Platform"
    And I should see the buttons "Sign In" and "Sign Up"
    When I click "Try Without Account"
    Then I should be redirected to the dashboard
    #And I should see the Dashboard main title "QA Platform Practice & Learn"
