@feature-tag
Feature: The Facebook

  I want to open a social network page

  @tag-to-include
  Scenario: Opening a social network page
    Given I open Google page
    Then I see "Google" in the title


  @another-tag-to-include @some-other-tag
  Scenario: Different kind of opening
    Given I kinda open cypress page
    Then I see "Cypress" in the title
