# Custom Errors

## Struct-Based Errors
Create custom error types with additional fields for rich error context.

```go
type ValidationError struct {
    Field   string
    Value   any
    Message string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("validation failed on %s (%v): %s",
        e.Field, e.Value, e.Message)
}

func ValidateAge(age int) error {
    if age < 0 {
        return ValidationError{
            Field:   "age",
            Value:   age,
            Message: "age cannot be negative",
        }
    }
    return nil
}
```

## Adding Behavior to Errors

```go
type HTTPError struct {
    StatusCode int
    Message    string
}

func (e HTTPError) Error() string {
    return fmt.Sprintf("HTTP %d: %s", e.StatusCode, e.Message)
}

func (e HTTPError) IsClientError() bool {
    return e.StatusCode >= 400 && e.StatusCode < 500
}

func (e HTTPError) IsServerError() bool {
    return e.StatusCode >= 500 && e.StatusCode < 600
}
```

## Custom Error with Unwrap

```go
type WrappedError struct {
    Msg   string
    Cause error
}

func (e WrappedError) Error() string {
    if e.Cause != nil {
        return e.Msg + ": " + e.Cause.Error()
    }
    return e.Msg
}

func (e WrappedError) Unwrap() error {
    return e.Cause
}
```

## Error with Temporary/Fatal Semantics

```go
type NetworkError struct {
    Err       error
    Temporary bool
}

func (e NetworkError) Error() string {
    return e.Err.Error()
}

func (e NetworkError) Unwrap() error {
    return e.Err
}

func retryOperation() error {
    err := makeRequest()
    if err != nil {
        var netErr NetworkError
        if errors.As(err, &netErr) && netErr.Temporary {
            // retry logic
        }
    }
    return err
}
```

## When to Use Custom Errors

| Use Case | Example |
|----------|---------|
| Need extra context | ParseError with line/column |
| Multiple error conditions | ValidationError with field name |
| Error classification | NetworkError with Temporary flag |
| Rich error reporting | APIError with status code |

## Exercises

1. **ParseError**: Create a `ParseError` with `Line`, `Column`, and `Message` fields.

2. **MultiError**: Build an error type that holds multiple errors (useful for batch operations).

3. **RateLimitError**: Implement an error with `RetryAfter` duration field and a `RetryAfter()` method.

4. **DatabaseError**: Create a `DBError` with `Operation`, `Table`, `Constraint` fields for database operation failures.
