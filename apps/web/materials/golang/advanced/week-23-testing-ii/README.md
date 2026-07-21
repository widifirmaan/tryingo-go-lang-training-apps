# Week 23: Testing II

Building on basic testing knowledge, this week covers integration testing, HTTP testing, mocking, and fuzzing.

## Topics

- Integration testing with databases
- HTTP handler testing with `httptest`
- Mocking with interfaces and test doubles
- Fuzzing for finding edge cases

## Goals

- Write integration tests that interact with real databases
- Test HTTP handlers and middleware
- Create mock implementations for external dependencies
- Use Go's fuzzing to discover bugs

## Key Concepts

| Concept | Description |
|---------|-------------|
| Integration Test | Tests that verify multiple components together |
| httptest | Package for testing HTTP servers and clients |
| Mock | Test double that verifies interactions |
| Fuzzing | Automated testing with random inputs |

## Practice Exercises

1. Write an integration test for a database repository
2. Test HTTP handlers with httptest
3. Create mock interfaces for external services
4. Write fuzz tests for a JSON parser
