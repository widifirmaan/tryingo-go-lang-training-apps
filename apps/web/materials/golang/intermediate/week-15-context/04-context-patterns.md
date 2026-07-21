# Context Patterns

## Pattern: Context in a Worker Pool

```go
func workerPool(ctx context.Context, num int, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup

    for i := 0; i < num; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for {
                select {
                case <-ctx.Done():
                    fmt.Printf("Worker %d stopping\n", id)
                    return
                case job, ok := <-jobs:
                    if !ok {
                        return
                    }
                    results <- process(job)
                }
            }
        }(i)
    }

    wg.Wait()
    close(results)
}
```

## Pattern: Context with Retry

```go
func retryWithContext(ctx context.Context, maxRetries int, fn func() error) error {
    for i := 0; i < maxRetries; i++ {
        if err := fn(); err != nil {
            if i == maxRetries-1 {
                return fmt.Errorf("max retries exceeded: %w", err)
            }
            select {
            case <-ctx.Done():
                return ctx.Err()
            case <-time.After(time.Duration(1<<i) * time.Second):
                // exponential backoff
            }
            continue
        }
        return nil
    }
    return nil
}
```

## Pattern: Context-Aware Database Query

```go
func queryWithContext(ctx context.Context, db *sql.DB, query string) (*sql.Rows, error) {
    conn, err := db.Conn(ctx)
    if err != nil {
        return nil, err
    }
    defer conn.Close()

    // The query honours context cancellation
    rows, err := conn.QueryContext(ctx, query)
    if err != nil {
        return nil, err
    }
    return rows, nil
}
```

## Pattern: Fan-Out with Timeout

```go
func fanOutTimeout(ctx context.Context, urls []string, timeout time.Duration) []*http.Response {
    results := make([]*http.Response, len(urls))
    ctx, cancel := context.WithTimeout(ctx, timeout)
    defer cancel()

    var wg sync.WaitGroup
    for i, url := range urls {
        wg.Add(1)
        go func(idx int, u string) {
            defer wg.Done()
            req, _ := http.NewRequestWithContext(ctx, "GET", u, nil)
            resp, err := http.DefaultClient.Do(req)
            if err == nil {
                results[idx] = resp
            }
        }(i, url)
    }

    wg.Wait()
    return results
}
```

## Pattern: Context Values for Request Scope

```go
type contextKey string

func (c contextKey) String() string { return "app:" + string(c) }

var (
    UserKey    = contextKey("user")
    TraceKey   = contextKey("trace")
    RequestKey = contextKey("request")
)

type RequestInfo struct {
    Method   string
    Path     string
    RemoteIP string
    StartAt  time.Time
}

func Middleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := r.Context()
        ctx = context.WithValue(ctx, RequestKey, RequestInfo{
            Method:   r.Method,
            Path:     r.URL.Path,
            RemoteIP: r.RemoteAddr,
            StartAt:  time.Now(),
        })
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}

func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        next.ServeHTTP(w, r)
        info := r.Context().Value(RequestKey).(RequestInfo)
        elapsed := time.Since(info.StartAt)
        fmt.Printf("%s %s from %s took %v\n",
            info.Method, info.Path, info.RemoteIP, elapsed)
    })
}
```

## Pitfalls to Avoid

```go
// BAD: storing mutable values in context
ctx := context.WithValue(ctx, key, &counter)
// Goroutines can mutate counter concurrently — no protection

// BAD: storing large data in context
ctx := context.WithValue(ctx, key, hugeData)

// BAD: deriving context with no deadline or cancel
backgroundCtx := context.Background()
// use context.TODO() if you plan to add one later

// BAD: not calling cancel
ctx, cancel := context.WithCancel(parent)
// never calls cancel() — leaks resources
```

## Exercises

1. **Request Logger**: Build middleware that logs method, path, duration for each request using context values.

2. **Circuit Breaker**: Implement a circuit breaker pattern using context deadlines.

3. **Bulk API Client**: Write a client that makes multiple concurrent requests with a shared context timeout.

4. **Context-Aware Cache**: Build a cache that evicts entries when their associated context is cancelled.
