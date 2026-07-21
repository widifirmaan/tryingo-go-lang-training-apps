# Defer

`defer` schedules a function call to run **after** the surrounding function returns. It's Go's primary mechanism for cleanup, resource release, and ensuring code runs no matter how a function exits.

## Basic defer

```go
func main() {
    defer fmt.Println("world")
    fmt.Println("hello")
}
// Output:
// hello
// world
```

- The deferred call runs when the enclosing function **returns**
- Arguments are **evaluated immediately**, not deferred

```go
func main() {
    x := 10
    defer fmt.Println(x) // prints 10 (x is captured now)
    x = 20
}
// Output: 10
```

## Multiple defers — LIFO Stack

Multiple `defer` calls stack in **last-in, first-out** (LIFO) order:

```go
func main() {
    defer fmt.Println("first")
    defer fmt.Println("second")
    defer fmt.Println("third")
}
// Output:
// third
// second
// first
```

## Common Use Cases

### Closing a file

```go
f, err := os.Open("file.txt")
if err != nil {
    log.Fatal(err)
}
defer f.Close()  // runs when the function ends

// use f...
```

### Unlocking a mutex

```go
mu.Lock()
defer mu.Unlock()
// critical section...
```

### Closing a database connection

```go
conn, err := db.Connect("...")
if err != nil {
    log.Fatal(err)
}
defer conn.Close()
```

### Measuring function execution time

```go
func timed() {
    defer fmt.Println("Time:", time.Since(time.Now()))
    // or more commonly:
    defer func(start time.Time) {
        fmt.Println("Elapsed:", time.Since(start))
    }(time.Now())

    // do work...
    time.Sleep(100 * time.Millisecond)
}
```

### Tracking function entry/exit

```go
func logEnterExit(name string) func() {
    fmt.Printf("Entering %s\n", name)
    return func() {
        fmt.Printf("Exiting %s\n", name)
    }
}

func someFunc() {
    defer logEnterExit("someFunc")()
    // do work...
}
```

## defer with Anonymous Functions

Since arguments are evaluated immediately, use a closure to capture variables by reference:

```go
func main() {
    x := 10
    defer func() {
        fmt.Println(x) // captures x by reference
    }()
    x = 20
}
// Output: 20
```

## defer and return — Order of Execution

1. Return value is set (if any)
2. Deferred functions run
3. Caller receives the value

```go
func count() int {
    defer fmt.Println("deferred")
    fmt.Println("returning")
    return 42
}

func main() {
    fmt.Println(count())
}
// Output:
// returning
// deferred
// 42
```

## Named Return Values and defer

Deferred functions can modify named return values:

```go
func double(x int) (result int) {
    defer func() {
        result *= 2
    }()
    return x
}

func main() {
    fmt.Println(double(5)) // 10
}
```

This works because the deferred closure can access and modify `result` before the function actually returns to the caller.

## When NOT to Use defer

- Inside tight loops (slight overhead)
- When the cleanup depends on success/failure conditions
- When you need the resource released immediately (use manual close)

```go
// ❌ Avoid: defer inside a tight loop
for i := 0; i < 100000; i++ {
    f, _ := os.Open("file.txt")
    defer f.Close()  // won't close until function returns
}

// ✅ Better: close explicitly
for i := 0; i < 100000; i++ {
    f, _ := os.Open("file.txt")
    // use f...
    f.Close()
}
```

## Best Practices

| Do | Don't |
|----|-------|
| Defer right after acquiring a resource | Defer far from where the resource is acquired |
| Use defer for cleanup (close, unlock) | Use defer in performance-critical hot paths |
| Use anonymous functions when you need current variable values | Rely on deferred functions for logic ordering |
| Use defer to recover from panics | Use defer for things that should run immediately |

## defer and panic

`defer` runs even if the function panics, making it essential for cleanup:

```go
func main() {
    defer fmt.Println("This always runs")
    panic("something went wrong")
}
// Output:
// This always runs
// panic: something went wrong
```

## Practice

1. Write a program that opens a file and uses `defer` to close it.
2. Use multiple `defer` statements to print numbers 1 through 5 in reverse order.
3. Write a function that measures and prints its own execution time using `defer`.
4. Write a function with a named return value and use `defer` to modify it.
5. Create a program that demonstrates `defer` runs even when `panic` is called.
6. Write a function that logs entry and exit using `defer` with a closure.
