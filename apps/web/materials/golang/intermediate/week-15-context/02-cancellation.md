# Cancellation

## WithCancel

```go
func main() {
    ctx, cancel := context.WithCancel(context.Background())

    go func() {
        time.Sleep(2 * time.Second)
        cancel() // signal cancellation
    }()

    <-ctx.Done()
    fmt.Println("Cancelled:", ctx.Err()) // context canceled
}
```

## Graceful Shutdown

```go
func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    go worker(ctx)
    go worker(ctx)

    // Wait for interrupt
    sig := make(chan os.Signal, 1)
    signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
    <-sig

    fmt.Println("Shutting down...")
    cancel() // propagate cancellation to workers
    time.Sleep(1 * time.Second) // give time to cleanup
}

func worker(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            fmt.Println("Worker stopping")
            return
        default:
            fmt.Println("Working...")
            time.Sleep(500 * time.Millisecond)
        }
    }
}
```

## Checking Cancellation

```go
func longRunningTask(ctx context.Context) error {
    for i := 0; i < 10; i++ {
        select {
        case <-ctx.Done():
            return ctx.Err()
        default:
            // perform step i
            fmt.Printf("Step %d\n", i)
            time.Sleep(500 * time.Millisecond)
        }
    }
    return nil
}
```

## WithTimeout

```go
func fetchUser(ctx context.Context, id int) (User, error) {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    result := make(chan User, 1)
    go func() {
        result <- queryDatabase(id)
    }()

    select {
    case user := <-result:
        return user, nil
    case <-ctx.Done():
        return User{}, fmt.Errorf("fetch timeout: %w", ctx.Err())
    }
}
```

## WithDeadline

```go
deadline := time.Now().Add(10 * time.Second)
ctx, cancel := context.WithDeadline(context.Background(), deadline)
defer cancel()

// Check deadline
if deadline, ok := ctx.Deadline(); ok {
    remaining := time.Until(deadline)
    fmt.Printf("Remaining time: %v\n", remaining)
}
```

## Cancellation Propagation

```go
func parentOperation(ctx context.Context) error {
    ctx, cancel := context.WithCancel(ctx)
    defer cancel()

    go childOperation(ctx, "child1")
    go childOperation(ctx, "child2")

    // If parent fails, both children are cancelled
    err := doSomething()
    if err != nil {
        return err // cancel() is called via defer
    }
    return nil
}

func childOperation(ctx context.Context, name string) {
    select {
    case <-ctx.Done():
        fmt.Printf("%s: parent cancelled\n", name)
    case <-time.After(5 * time.Second):
        fmt.Printf("%s: completed\n", name)
    }
}
```

## Exercises

1. **Cancellable Search**: Implement a search function that cancels when context is done.

2. **Graceful HTTP Server**: Build an HTTP server that shuts down gracefully on SIGINT using context cancellation.

3. **Timeout Pipeline**: Create a pipeline stage that respects context cancellation mid-processing.

4. **Context Tree**: Create a parent context with two derived contexts that cancel independently.
