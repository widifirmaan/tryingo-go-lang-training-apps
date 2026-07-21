# Test Basics

## Test File Convention
Test files end with `_test.go` and are in the same package (or `_test` for black-box tests).

```
calculator/
├── calculator.go
└── calculator_test.go
```

## Writing a Simple Test

```go
// calculator.go
package calculator

func Add(a, b int) int {
    return a + b
}

// calculator_test.go
package calculator

import "testing"

func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5
    if result != expected {
        t.Errorf("Add(2, 3) = %d; want %d", result, expected)
    }
}
```

## Running Tests

```bash
# Run all tests
go test

# Verbose output
go test -v

# Run specific test
go test -v -run TestAdd

# Run all tests in package
go test ./...
```

## Test Functions

```go
func TestFunction(t *testing.T) {
    // Test logic
}
```

## Fatal vs Error

| Method | Behavior |
|--------|----------|
| `t.Error(args...)` | Log error, continue test |
| `t.Errorf(format, args...)` | Formatted error, continue test |
| `t.Fatal(args...)` | Log error, stop test |
| `t.Fatalf(format, args...)` | Formatted error, stop test |

## Test Helper

```go
func TestMultiply(t *testing.T) {
    result := Multiply(4, 3)
    assertEqual(t, 12, result)
}

func assertEqual(t testing.TB, expected, actual int) {
    t.Helper() // marks as helper for better error messages
    if expected != actual {
        t.Fatalf("expected %d, got %d", expected, actual)
    }
}
```

## Subtests

```go
func TestMath(t *testing.T) {
    t.Run("Add", func(t *testing.T) {
        if Add(2, 3) != 5 {
            t.Error("Add failed")
        }
    })

    t.Run("Multiply", func(t *testing.T) {
        if Multiply(4, 3) != 12 {
            t.Error("Multiply failed")
        }
    })
}

// Run specific subtest:
// go test -run TestMath/Add
```

## Setup and Teardown

```go
func TestWithSetup(t *testing.T) {
    // Setup
    db := setupDatabase()
    t.Cleanup(func() {
        db.Close() // runs after test completes
    })

    // Test body
    result := db.Query("SELECT 1")
    if result != 1 {
        t.Error("unexpected result")
    }
}
```

## Test Package Modes

| Mode | Package | Access |
|------|---------|--------|
| White-box | `package calculator` | Internal symbols |
| Black-box | `package calculator_test` | Only exported symbols |

## Exercises

1. **Simple Tests**: Write tests for a `Divide(a, b float64) (float64, error)` function including edge cases.

2. **Subtests**: Test a `ParseInt(s string) (int, error)` function using subtests for valid and invalid inputs.

3. **Helper Functions**: Create assert helpers for `assertNil`, `assertNotNil`, `assertEqual` for strings.

4. **T.Cleanup**: Write a test that creates a temp file, tests file operations, and cleans up with `t.Cleanup`.
