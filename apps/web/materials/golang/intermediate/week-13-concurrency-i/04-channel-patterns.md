# Channel Patterns

## Worker Pool

```go
func worker(id int, jobs <-chan int, results chan<- int) {
    for job := range jobs {
        fmt.Printf("Worker %d processing job %d\n", id, job)
        time.Sleep(time.Second)
        results <- job * 2
    }
}

func main() {
    const numJobs = 10
    const numWorkers = 3

    jobs := make(chan int, numJobs)
    results := make(chan int, numJobs)

    // Start workers
    for w := 1; w <= numWorkers; w++ {
        go worker(w, jobs, results)
    }

    // Send jobs
    for j := 1; j <= numJobs; j++ {
        jobs <- j
    }
    close(jobs)

    // Collect results
    for r := 1; r <= numJobs; r++ {
        <-results
    }
}
```

## Fan-Out / Fan-In

```go
// Fan-Out: distribute work to multiple goroutines
func fanOut(input <-chan int, workers int) []<-chan int {
    channels := make([]<-chan int, workers)
    for i := 0; i < workers; i++ {
        ch := make(chan int)
        channels[i] = ch
        go func(out chan<- int) {
            for n := range input {
                out <- n * n
            }
            close(out)
        }(ch)
    }
    return channels
}

// Fan-In: merge multiple channels into one
func fanIn(channels ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for n := range c {
                out <- n
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

## Pipeline Pattern

```go
func generator(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    for result := range square(generator(1, 2, 3, 4)) {
        fmt.Println(result) // 1, 4, 9, 16
    }
}
```

## Generator Pattern

```go
func fibonacci(n int) <-chan int {
    out := make(chan int)
    go func() {
        a, b := 0, 1
        for i := 0; i < n; i++ {
            out <- a
            a, b = b, a+b
        }
        close(out)
    }()
    return out
}

func main() {
    for f := range fibonacci(10) {
        fmt.Println(f)
    }
}
```

## Channels as Counting Semaphore

```go
func main() {
    sem := make(chan struct{}, 3) // max 3 concurrent
    var wg sync.WaitGroup

    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            sem <- struct{}{} // acquire
            fmt.Printf("Worker %d starting\n", id)
            time.Sleep(time.Second)
            <-sem // release
        }(i)
    }

    wg.Wait()
}
```

## Pattern Comparison

| Pattern | Purpose | Key Characteristic |
|---------|---------|-------------------|
| Worker Pool | Fixed parallelism | Bounded goroutines |
| Pipeline | Sequential stages | Data flows through stages |
| Fan-Out | Distribute work | One input, many outputs |
| Fan-In | Collect results | Many inputs, one output |
| Generator | Produce values | Returns read-only channel |
| Semaphore | Rate limiting | Buffered channel as limit |

## Exercises

1. **Pipeline**: Build a 3-stage pipeline: generate numbers → filter even → print.

2. **URL Checker**: Create a worker pool that checks if URLs are reachable (fan-in results).

3. **Image Processor**: Fan-out image processing tasks to workers, then fan-in to collect.

4. **Rate-Limited Crawler**: Use a buffered channel semaphore to limit concurrent requests to 5.
