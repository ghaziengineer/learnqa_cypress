@dragdrop @e2e
Feature: Drag and Drop Functionality
  As a user
  I want to drag items from the source area to the drop zone
  So that I can test drag-and-drop functionality

  Background:
    Given I open the homepage
    When I click on the "Try Without Account" button
    Then I should be redirected to the "dashboard" page
    And I navigate to "Drag and Drop" page

  @single
  Scenario: Drag a single item to the drop zone
    When I drag "Item 1" from the source area to the drop zone
    Then "Item 1" should appear in the drop zone

  @multiple
  Scenario: Drag multiple items to the drop zone
    When I drag the following items from the source area to the drop zone:
      | Item 1 |
      | Item 2 |
      | Item 3 |
      | Item 4 |
    Then all items should appear in the drop zone

  @invalid
  Scenario: Drag an item to an invalid zone
    When I drag "Item 1" from the source area to another zone
    Then the drop zone should not contain "Item 1"

  @addSpecial
  Scenario: Add special items to source area
    When I click on the "Add Item" button
    Then I should see "Special item 1"
    When I click on the "Add Item" button
    Then I should see "Special item 2"

  @reset
  Scenario: Reset after dragging all items
    When I drag the following items from the source area to the drop zone:
      | Item 1 |
      | Item 2 |
      | Item 3 |
      | Item 4 |
    Then all items should appear in the drop zone
    When I click on the "Reset" button
    Then the source area should contain 4 draggable items
    Then the drop zone should not contain "Item 1"
    Then the drop zone should not contain "Item 2"
    Then the drop zone should not contain "Item 3"
    Then the drop zone should not contain "Item 4"