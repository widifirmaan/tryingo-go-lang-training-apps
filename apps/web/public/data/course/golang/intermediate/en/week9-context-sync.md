# Context & Synchronization

> **Kategori:** Go | **Level:** Intermediate | **Minggu 9:** Context & Synchronization

## Learning Objectives

- context.Context for cancellation and timeouts
- context.WithCancel, WithTimeout, WithDeadline
- sync.WaitGroup to wait for goroutines to finish
- sync.Mutex to protect against data races
- Worker pool pattern and fan-in/fan-out

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
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go doWork(ctx, i, &wg)
    }
    wg.Wait()

    fmt.Println("\nWorker Pool:")
    pool := NewPool(3)
    go func() {
        for i := 1; i <= 5; i++ { pool.jobs <- i }
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

## Key Concepts

### context.Context
Cancellation and timeouts.

### sync Package
WaitGroup and Mutex.

### Worker Pool
Bounded concurrency with worker pools.

---

## Experiments

- Create context with value: ctx = context.WithValue(ctx, "key", val)
- Try race condition: remove Mutex, run with -race
- Create fan-out: distribute jobs to multiple workers
- Implement graceful shutdown with signal handling

---

## Challenge

Build an HTTP server with graceful shutdown: handle SIGINT, cancel context, wait for active requests to complete.

---

## Summary

Week 9 of 13: **Context & Synchronization** (Level: Intermediate). Intermediate phase complete! Next week: **Stdlib: I/O, Time & Encoding** (Advanced).
