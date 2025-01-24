Feature: Dropdown selection

  Scenario: Selecting an option in the dropdown
    Given I am on the dropdown page
    When I select "Option 1" from the dropdown
    Then the selected value should be "option1"