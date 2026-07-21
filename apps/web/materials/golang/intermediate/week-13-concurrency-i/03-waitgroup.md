# WaitGroup

## What is a WaitGroup?
`sync.WaitGroup` waits for a collection of goroutines to finish.

```go
import "sync"

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 5; i++ {
        wg.Add(1) // increment counter
        go func(n int) {
            defer wg.Done() // decrement counter
            fmt.Printf("Worker %d done\n", n)
        }(i)
    }

    wg.Wait() // blocks until counter is 0
    fmt.Println("All workers done")
}
```

## Basic Pattern

```go
func processItems(items []string) {
    var wg sync.WaitGroup

    for _, item := range items {
        wg.Add(1)
        go func(it string) {
            defer wg.Done()
            fmt.Println("Processing:", it)
            time.Sleep(100 * time.Millisecond)
        }(item)
    }

    wg.Wait()
}
```

## WaitGroup Methods

| Method | Description |
|--------|-------------|
| `Add(delta int)` | Increment counter by delta |
| `Done()` | Decrement counter by 1 |
| `Wait()` | Block until counter is 0 |

## Common Pitfalls

```go
// WRONG: Add inside goroutine
for _, item := range items {
    go func(it string) {
        wg.Add(1) // race condition — may finish before wg.Wait()
        defer wg.Done()
        // ...
    }(item)
}
wg.Wait() // may return before all goroutines are tracked

// CORRECT: Add before goroutine starts
for _, item := range items {
    wg.Add(1)
    go func(it string) {
        defer wg.Done()
        // ...
    }(item)
}
wg.Wait()
```

## With Error Collection

```go
func processWithErrors(items []string) []error {
    var (
        wg    sync.WaitGroup
        errs  []error
        mutex sync.Mutex
    )

    for _, item := range items {
        wg.Add(1)
        go func(it string) {
            defer wg.Done()

            if err := process(it); err != nil {
                mutex.Lock()
                errs = append(errs, err)
                mutex.Unlock()
            }
        }(item)
    }

    wg.Wait()
    return errs
}
```

## WaitGroup vs Channels

| Feature | WaitGroup | Channels |
|---------|-----------|----------|
| Wait for completion | Yes | Indirect |
| Communicate results | No | Yes |
| Synchronization | Yes | Yes |
| Values | Counter | Typed data |

## Exercises

1. **Parallel Downloader**: Use WaitGroup to download 5 URLs concurrently and wait for all.

2. **Batch Processor**: Process a list of 100 items in batches of 10 concurrent goroutines using WaitGroup.

3. **Progress Reporter**: Combine WaitGroup with a channel to report progress as each goroutine completes.

4. **Graceful Worker Pool**: Create a pool of workers that run until all jobs are done, using WaitGroup.
