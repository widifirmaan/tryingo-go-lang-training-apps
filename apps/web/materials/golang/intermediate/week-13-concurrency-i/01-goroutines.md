# Goroutines

## What is a Goroutine?
A goroutine is a lightweight thread managed by the Go runtime. Start one with the `go` keyword.

```go
func sayHello() {
    fmt.Println("Hello from goroutine!")
}

func main() {
    go sayHello() // starts a new goroutine
    time.Sleep(100 * time.Millisecond) // wait for goroutine
}
```

## Anonymous Goroutines

```go
go func() {
    fmt.Println("Running in goroutine")
}()
```

## Multiple Goroutines

```go
func printNumbers(prefix string) {
    for i := 1; i <= 5; i++ {
        fmt.Printf("%s: %d\n", prefix, i)
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    go printNumbers("A")
    go printNumbers("B")
    time.Sleep(1 * time.Second)
}
```

## Goroutines Are Not Wasted
Goroutines are cheap (a few KB of stack) — you can have thousands.

```go
func main() {
    for i := 0; i < 1000; i++ {
        go func(id int) {
            fmt.Printf("Goroutine %d running\n", id)
        }(i)
    }
    time.Sleep(1 * time.Second)
}
```

## The Goroutine Closure Pitfall

```go
// WRONG: captures loop variable by reference
for i := 0; i < 5; i++ {
    go func() {
        fmt.Println(i) // likely prints 5,5,5,5,5
    }()
}

// CORRECT: pass as argument
for i := 0; i < 5; i++ {
    go func(n int) {
        fmt.Println(n)
    }(i)
}

// CORRECT: create local copy
for i := 0; i < 5; i++ {
    i := i // shadow
    go func() {
        fmt.Println(i)
    }()
}
```

## Goroutine Scheduling
Goroutines are multiplexed onto OS threads.

| Feature | Goroutine | OS Thread |
|---------|-----------|-----------|
| Stack size | ~4KB (grows/shrinks) | ~1MB (fixed) |
| Creation | ~1µs | ~1ms |
| Context switch | ~0.2µs | ~1µs |
| Number | Millions | Thousands |

## Early Exit
The program exits when `main` returns — unfinished goroutines are killed.

```go
func main() {
    go func() {
        fmt.Println("This may or may not print")
    }()
    // No wait — main returns immediately
}
```

## Exercises

1. **Concurrent Greeter**: Launch 10 goroutines that each print "Hello from N" where N is their number.

2. **Parallel Sum**: Split a large slice into chunks and sum each chunk in a separate goroutine.

3. **URL Fetcher**: Fetch 5 URLs concurrently using goroutines.

4. **Work Generator**: Start 5 worker goroutines that print "Worker N processed item M" with a short delay.
