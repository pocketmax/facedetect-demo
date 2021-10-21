Feature: Identifies certain people

  Scenario: A familiar face is in view
    When A face is detected
    Then the identified person is indicated
