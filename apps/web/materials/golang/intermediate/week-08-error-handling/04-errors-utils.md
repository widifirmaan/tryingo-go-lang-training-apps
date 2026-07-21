# Errors Utility Package

## Introduction
Go 1.13+ added `errors.Is`, `errors.As`, and `errors.Unwrap` for working with wrapped errors.

## Wrapping Errors with `%w`
```go
import "fmt"

func ReadConfig(path string) (Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return Config{}, fmt.Errorf("reading config %s: %w", path, err)
    }
    // parse config...
}
```

## `errors.Is` — Checking Sentinel Errors
```go
import "errors"

var ErrNotFound = errors.New("not found")

func getItem(id int) (Item, error) {
    return Item{}, fmt.Errorf("database: %w", ErrNotFound)
}

func main() {
    _, err := getItem(42)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("Item not found")
    }
}
```

## `errors.As` — Type-Based Matching
```go
type TimeoutError struct {
    Duration time.Duration
}

func (e TimeoutError) Error() string {
    return fmt.Sprintf("timeout after %v", e.Duration)
}

func fetchData() error {
    return fmt.Errorf("fetch failed: %w", TimeoutError{Duration: 5 * time.Second})
}

func main() {
    err := fetchData()
    var timeout TimeoutError
    if errors.As(err, &timeout) {
        fmt.Printf("Request timed out after %v\n", time.Duration)
    }
}
```

## `errors.Unwrap`
```go
err := fmt.Errorf("outer: %w", inner)
unwrapped := errors.Unwrap(err) // returns inner
```

## Joining Errors (Go 1.20+)
```go
err1 := errors.New("error 1")
err2 := errors.New("error 2")
joined := errors.Join(err1, err2)

fmt.Println(joined)
// error 1
// error 2
```

```go
func validateAll(items []Item) error {
    var errs []error
    for _, item := range items {
        if err := validate(item); err != nil {
            errs = append(errs, err)
        }
    }
    return errors.Join(errs...)
}
```

## Utility Comparison

| Function | Purpose | Example |
|----------|---------|---------|
| `errors.New` | Create sentinel error | `errors.New("EOF")` |
| `fmt.Errorf` | Format error with `%w` | `fmt.Errorf("at %s: %w", loc, err)` |
| `errors.Is` | Check error chain for target | `errors.Is(err, io.EOF)` |
| `errors.As` | Find first error of matching type | `errors.As(err, &pathErr)` |
| `errors.Unwrap` | Get next error in chain | `errors.Unwrap(err)` |
| `errors.Join` | Combine multiple errors | `errors.Join(errs...)` |

## Best Practices

```go
// DO: wrap errors to add context
if err != nil {
    return fmt.Errorf("process user %d: %w", id, err)
}

// DON'T: wrap with %s (loses error chain)
if err != nil {
    return fmt.Errorf("process user %d: %s", id, err)
}

// DO: use errors.Is for sentinel checks
if errors.Is(err, ErrNotFound) { /* handle */ }

// DON'T: use == on wrapped errors
if err == ErrNotFound { /* won't match wrapped errors */ }
```

## Exercises

1. **Error Chain**: Create a 3-level error chain and use `errors.Is` and `errors.As` to inspect it.

2. **Config Loader**: Write a config loader that wraps file, parse, and validation errors.

3. **Batch Validator**: Use `errors.Join` to collect and report all validation errors for a form submission.

4. **Middleware Chain**: Build HTTP middleware that wraps errors with request context (method, path, trace ID).
