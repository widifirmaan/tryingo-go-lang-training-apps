# Fan-In / Fan-Out

Fan-out distributes work across multiple goroutines; fan-in merges multiple channels into one.

## Fan-Out

```go
func fanOut(in <-chan int, workers int) []<-chan int {
    channels := make([]<-chan int, workers)

    for i := 0; i < workers; i++ {
        channels[i] = worker(in, i)
    }

    return channels
}

func worker(in <-chan int, id int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            result := n * n // expensive computation
            out <- result
        }
    }()
    return out
}
```

## Fan-In

```go
func fanIn(channels ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    wg.Add(len(channels))

    for _, ch := range channels {
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                out <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}
```

## Complete Fan-Out/Fan-In Example

```go
func main() {
    // Generate numbers
    nums := make(chan int)
    go func() {
        for i := 1; i <= 100; i++ {
            nums <- i
        }
        close(nums)
    }()

    // Fan-out to 4 workers
    workers := make([]<-chan int, 4)
    for i := 0; i < 4; i++ {
        workers[i] = expensiveOp(nums)
    }

    // Fan-in results
    results := fanIn(workers...)

    // Collect results
    for r := range results {
        fmt.Println(r)
    }
}

func expensiveOp(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            // Simulate expensive computation
            time.Sleep(10 * time.Millisecond)
            out <- n * n
        }
    }()
    return out
}
```

## Fan-In with Context Cancellation

```go
func fanInWithCancel(ctx context.Context, channels ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    wg.Add(len(channels))

    for _, ch := range channels {
        go func(c <-chan int) {
            defer wg.Done()
            for {
                select {
                case v, ok := <-c:
                    if !ok {
                        return
                    }
                    out <- v
                case <-ctx.Done():
                    return
                }
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(out)
    }()

    return out
}
```

## Practice

1. Implement fan-out for image processing (thumbnails)
2. Build a fan-in aggregator for API responses
3. Add rate limiting to a fan-out pattern
4. Measure performance improvement with different worker counts
