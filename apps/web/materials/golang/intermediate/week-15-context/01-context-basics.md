# Context Basics

## What is Context?
Context carries deadlines, cancellation signals, and request-scoped values across API boundaries.

```go
import "context"
```

## Creating Contexts

```go
// Empty context (root)
ctx := context.Background()

// TODO context (for uncertain uses)
ctx := context.TODO()
```

## Context with Deadline

```go
ctx, cancel := context.WithDeadline(
    context.Background(),
    time.Now().Add(2*time.Second),
)
defer cancel()
```

## Context with Timeout

```go
ctx, cancel := context.WithTimeout(
    context.Background(),
    2*time.Second,
)
defer cancel()
```

## Context with Cancellation

```go
ctx, cancel := context.WithCancel(context.Background())
defer cancel() // always call to avoid leaks
```

## Checking Context State

```go
func doWork(ctx context.Context) error {
    select {
    case <-ctx.Done():
        return ctx.Err() // DeadlineExceeded or Canceled
    default:
        // continue working
    }
    return nil
}
```

## Context Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `ctx.Done()` | `<-chan struct{}` | Closed when context is cancelled |
| `ctx.Err()` | `error` | Why context was cancelled |
| `ctx.Deadline()` | `(time.Time, bool)` | Deadline if set |
| `ctx.Value(key)` | `any` | Value for key |

## Context in HTTP Servers

```go
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    result, err := doWork(ctx)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    fmt.Fprintf(w, result)
}
```

## Context in HTTP Clients

```go
func fetchWithContext(ctx context.Context, url string) (*http.Response, error) {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }
    return http.DefaultClient.Do(req)
}
```

## Exercises

1. **Timeout Handler**: Write an HTTP handler that uses a 3-second context timeout.

2. **Context Propagation**: Pass a context from `main()` through two function calls.

3. **Parallel Workers**: Create workers that check `ctx.Done()` between tasks.

4. **Deadline Check**: Write a function that checks remaining time in context before doing work.
