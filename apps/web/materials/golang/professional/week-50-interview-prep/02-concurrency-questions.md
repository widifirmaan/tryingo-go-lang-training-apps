# Concurrency Questions

Common Go concurrency interview questions and patterns.

## Goroutine Lifecycle

```go
// Question: What happens when a goroutine panics?
// Answer: The entire program crashes unless recovered

func safeGoroutine(fn func()) {
    go func() {
        defer func() {
            if r := recover(); r != nil {
                log.Printf("goroutine panicked: %v", r)
            }
        }()
        fn()
    }()
}
```

## Fan-Out Pattern

```go
// Question: Process multiple tasks concurrently
func processTasks(tasks []Task) []Result {
    results := make(chan Result, len(tasks))
    var wg sync.WaitGroup

    for _, task := range tasks {
        wg.Add(1)
        go func(t Task) {
            defer wg.Done()
            results <- process(t)
        }(task)
    }

    wg.Wait()
    close(results)

    var resultList []Result
    for r := range results {
        resultList = append(resultList, r)
    }
    return resultList
}
```

## Rate Limiter

```go
// Question: Implement a rate limiter
type RateLimiter struct {
    tokens chan struct{}
    ticker *time.Ticker
}

func NewRateLimiter(rate int, burst int) *RateLimiter {
    rl := &RateLimiter{
        tokens: make(chan struct{}, burst),
        ticker: time.NewTicker(time.Second / time.Duration(rate)),
    }
    go rl.refill()
    return rl
}

func (rl *RateLimiter) refill() {
    for range rl.ticker.C {
        select {
        case rl.tokens <- struct{}{}:
        default:
        }
    }
}

func (rl *RateLimiter) Allow() bool {
    select {
    case <-rl.tokens:
        return true
    default:
        return false
    }
}
```

## Context Cancellation

```go
// Question: Handle graceful cancellation
func longRunningOperation(ctx context.Context) error {
    select {
    case result := <-doWork():
        return result
    case <-ctx.Done():
        return ctx.Err()
    }
}

// Question: Prevent goroutine leak
func leakProof() {
    done := make(chan struct{})
    go func() {
        defer close(done)
        // work
    }()
    select {
    case <-done:
    case <-time.After(5 * time.Second):
        // timeout, goroutine will clean up
    }
}
```

## Practice
1. Implement a concurrent web crawler
2. Build a worker pool with context cancellation
3. Design a pub/sub system with channels
