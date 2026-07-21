# The Error Interface

## Built-in Interface
The `error` type is a built-in interface with a single method:

```go
type error interface {
    Error() string
}
```

## Basic Error Creation

### Using `errors.New`
```go
import "errors"

var ErrNotFound = errors.New("item not found")
var ErrPermission = errors.New("permission denied")

func FindItem(id int) (Item, error) {
    if id <= 0 {
        return Item{}, ErrNotFound
    }
    // ...
}
```

### Using `fmt.Errorf`
```go
import "fmt"

func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide %v by zero", a)
    }
    return a / b, nil
}
```

## Checking Errors

```go
result, err := Divide(10, 0)
if err != nil {
    fmt.Println("Error:", err)
    return
}
fmt.Println("Result:", result)
```

## Sentinel Errors
Pre-defined errors that signal specific conditions.

```go
var (
    ErrInvalidInput = errors.New("invalid input")
    ErrTimeout      = errors.New("operation timed out")
    ErrNotConnected = errors.New("not connected to server")
)

func Connect() error {
    return ErrNotConnected
}

func main() {
    err := Connect()
    if err == ErrNotConnected {
        fmt.Println("Please connect first")
    }
}
```

## Error Handling Best Practices

| Practice | Description |
|----------|-------------|
| Check errors immediately | Handle errors right after the call |
| Return errors to caller | Don't swallow errors with `_` |
| Add context | Use `fmt.Errorf("context: %w", err)` |
| Use sentinel errors | Define package-level errors |

## Common Mistakes

```go
// BAD: ignoring errors
result, _ := doSomething()

// BAD: vague error messages
return errors.New("error occurred")

// BAD: printing instead of returning
func process() {
    err := validate()
    if err != nil {
        fmt.Println(err) // caller can't handle it
    }
}
```

## Exercises

1. **Validation Function**: Write a `ValidateAge(age int) error` that returns specific errors for negative, zero, and under-18 values.

2. **File Opener**: Write a function that opens a file and returns proper errors for missing file and permission denied.

3. **Calculator**: Build a simple calculator that returns errors for division by zero, invalid operators, and overflow.

4. **Login System**: Write a login function that returns `ErrInvalidCredentials`, `ErrAccountLocked`, `ErrExpiredPassword` as sentinel errors.
