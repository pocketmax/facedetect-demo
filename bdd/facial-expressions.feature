Feature: Recognizes facial expressions

  Scenario: A face is in view
    When A face is detected
    Then the expression on the face is indicated
