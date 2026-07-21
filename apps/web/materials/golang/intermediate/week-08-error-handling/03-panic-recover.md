# Panic & Recover

## Panic
`panic` stops the normal execution and begins unwinding the stack.

```go
func main() {
    fmt.Println("Starting")
    panic("something went wrong!")
    fmt.Println("This never runs")
}
```

## When to Panic
Panics are for **exceptional, unrecoverable** situations.

| Appropriate Panic | Inappropriate Panic |
|-------------------|-------------------|
| Impossible state | User input errors |
| Initialization failure | Network timeouts |
| Nil dependency in setup | File not found |
| Programming bug | Validation failures |

```go
// Appropriate: impossible state
switch color {
case "red", "blue", "green":
    // handle
default:
    panic(fmt.Sprintf("unknown color: %s", color))
}

// Inappropriate: should return error
func divide(a, b int) int {
    if b == 0 {
        panic("division by zero") // BAD
    }
    return a / b
}
```

## Recover
`recover` regains control of a panicking goroutine. Only useful inside a deferred function.

```go
func safeDivide(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic: %v", r)
        }
    }()
    return a / b, nil
}
```

## Full Recovery Pattern

```go
func HandleRequest() (err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("internal error: %v", r)
            log.Printf("Recovered from panic: %v", r)
        }
    }()

    processRequest()
    return nil
}
```

## Panic Propagation
When a function panics, deferred functions run, then the panic propagates upward.

```go
func A() {
    defer fmt.Println("A deferred")
    B()
}

func B() {
    defer fmt.Println("B deferred")
    panic("in B")
}

func main() {
    defer fmt.Println("main deferred")
    A()
}
// Output:
// B deferred
// A deferred
// main deferred
// panic: in B
```

## Recovering from Specific Panics

```go
type PanicError struct {
    Value any
    Stack []byte
}

func SafeCall(fn func()) (err error) {
    defer func() {
        if r := recover(); r != nil {
            stack := make([]byte, 4096)
            n := runtime.Stack(stack, false)
            err = PanicError{Value: r, Stack: stack[:n]}
        }
    }()
    fn()
    return nil
}
```

## Exercises

1. **Safe Array Access**: Write a function that safely accesses a slice index and recovers from out-of-range panic.

2. **Retry with Recovery**: Build a retry wrapper that catches panics and retries up to 3 times.

3. **JSON Safe Parse**: Create a JSON parsing function that recovers from panics in `json.Unmarshal`.

4. **Server Middleware**: Write HTTP middleware that recovers from panics and returns a 500 error.
