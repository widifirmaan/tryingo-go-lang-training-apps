# Test Coverage

## What is Coverage?
Coverage measures how much of your code is executed during tests.

## Running Coverage

```bash
# Run tests with coverage
go test -cover

# Coverage percentage
go test -coverprofile=coverage.out

# View coverage in browser
go tool cover -html=coverage.out

# Coverage per function
go tool cover -func=coverage.out
```

## Understanding Coverage Output

```
ok      calculator      0.123s  coverage: 85.2% of statements

calculator/calculator.go:20:     Add              100.0%
calculator/calculator.go:25:     Subtract         100.0%
calculator/calculator.go:30:     Multiply         100.0%
calculator/calculator.go:35:     Divide           66.7%
calculator/calculator.go:40:     SquareRoot       0.0%
----------------------------------------------------------
total:                          (statements)      85.2%
```

## Writing for Coverage

```go
// Function with branches
func Grade(score int) string {
    switch {
    case score >= 90:
        return "A"
    case score >= 80:
        return "B"
    case score >= 70:
        return "C"
    case score >= 60:
        return "D"
    default:
        return "F"
    }
}

// Test that covers all branches
func TestGrade(t *testing.T) {
    tests := []struct {
        score    int
        expected string
    }{
        {95, "A"},
        {85, "B"},
        {75, "C"},
        {65, "D"},
        {50, "F"},
        {100, "A"},
        {0, "F"},
        {-5, "F"},
    }
    // ... test body
}
```

## Covering Error Paths

```go
func ParseConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("read: %w", err)
    }

    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, fmt.Errorf("parse: %w", err)
    }

    return &cfg, nil
}

func TestParseConfig(t *testing.T) {
    // Test success path
    // Test file not found error
    // Test invalid JSON error
}
```

## Coverage Strategies

| Strategy | Description |
|----------|-------------|
| Line coverage | Which lines execute |
| Branch coverage | Which branches execute |
| Path coverage | Which code paths execute |
| Function coverage | Which functions execute |

## Coverage for HTTP Handlers

```go
func TestHandler(t *testing.T) {
    handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "OK")
    })

    req := httptest.NewRequest("GET", "/", nil)
    rec := httptest.NewRecorder()
    handler.ServeHTTP(rec, req)

    if rec.Code != http.StatusOK {
        t.Errorf("got %d, want %d", rec.Code, http.StatusOK)
    }
}
```

## Exercises

1. **Increase Coverage**: Write a function with multiple branches and achieve 100% coverage.

2. **Error Coverage**: Write tests that cover both success and error paths in a file reader function.

3. **Coverage Report**: Run coverage, generate HTML report, and identify uncovered code.

4. **HTTP Handler Coverage**: Write tests that cover all response status codes in an HTTP handler.
