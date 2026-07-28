# Context & Advanced Sync

> Go | Module 12

## Learning Objectives

- Use context for cancellation
- Apply context.WithTimeout
- Use errgroup for error propagation
- Create the worker pool pattern
- Apply fan-in/fan-out

---

## Program: Worker Pool

```go
package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

func doWork(ctx context.Context, id int, wg *sync.WaitGroup) {
    defer wg.Done()
    select {
    case <-time.After(200 * time.Millisecond):
        fmt.Printf("Worker %d selesai\n", id)
    case <-ctx.Done():
        fmt.Printf("Worker %d dibatalkan: %v\n", id, ctx.Err())
    }
}

// Worker pool
type Pool struct {
    jobs    chan int
    results chan int
    wg      sync.WaitGroup
}

func NewPool(numWorkers int) *Pool {
    p := &Pool{
        jobs:    make(chan int, 100),
        results: make(chan int, 100),
    }
    for i := 0; i < numWorkers; i++ {
        p.wg.Add(1)
        go p.worker(i)
    }
    return p
}

func (p *Pool) worker(id int) {
    defer p.wg.Done()
    for job := range p.jobs {
        p.results <- job * job
    }
}

func main() {
    // Context timeout
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go doWork(ctx, i, &wg)
    }
    wg.Wait()

    // Worker pool
    fmt.Println("\nWorker Pool:")
    pool := NewPool(3)
    go func() {
        for i := 1; i <= 5; i++ {
            pool.jobs <- i
        }
        close(pool.jobs)
    }()

    go func() {
        pool.wg.Wait()
        close(pool.results)
    }()

    for r := range pool.results {
        fmt.Printf("Hasil: %d\n", r)
    }
}
```

---

## Explanation

`context.Context` carries cancellation, timeout, and values. `WithCancel`, `WithTimeout`, `WithDeadline` for control. `errgroup` combines errors from multiple goroutines. Worker pool limits concurrency. Fan-in merges channels, fan-out distributes.

---

## Experiments

- Change variable values and observe the changes
- Add a new function with different return types
- Replace for loops with range
- Try data types you haven't used yet

---

## Challenge

Build a program applying this week's concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.

---

## Summary

Module 12 of 16: **Context & Advanced Sync**. Go delivers high performance with simple syntax. Next week: **Standard Library: I/O & Time**.
