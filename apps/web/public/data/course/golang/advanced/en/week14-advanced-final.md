# Advanced Patterns & Final Project

> Category: Go, Programming Language | Level: Advanced | Week 14

## Learning Objectives

- Apply worker pool pattern
- Use fan-in/fan-out
- Profile with pprof
- Integrate all components
- Write production-ready Go code

---

## Program: Proyek Akhir

```go
package main

import (
    "fmt"
    "sync"
)

func workerPool(numWorkers int, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for job := range jobs { results <- job * 2 }
        }(i)
    }
    wg.Wait()
    close(results)
}

func fanIn(channels ...<-chan string) <-chan string {
    out := make(chan string)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan string) {
            defer wg.Done()
            for msg := range c { out <- msg }
        }(ch)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}

func main() {
    fmt.Println("-- Worker Pool --")
    jobs := make(chan int, 10)
    results := make(chan int, 10)
    for i := 1; i <= 5; i++ { jobs <- i }
    close(jobs)
    go workerPool(3, jobs, results)
    for r := range results { fmt.Printf("Result: %d\n", r) }

    fmt.Println("\n-- Fan-in --")
    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() { ch1 <- "data A1"; ch1 <- "data A2"; close(ch1) }()
    go func() { ch2 <- "data B1"; ch2 <- "data B2"; close(ch2) }()
    merged := fanIn(ch1, ch2)
    for msg := range merged { fmt.Println(msg) }

    fmt.Println("\nFinal project ready to be built!")
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Worker Pool

Process many jobs with fixed number of workers. Jobs via channels, results via other channels.

### Fan-in

Merge multiple channels into one. Useful for data from multiple sources.

### Final Project

Integrates: CLI, REST API, middleware, database, Docker, testing -- entire Go production stack.

---

## Experiments

Try modifying the code:

1. **Change worker count** -- replace `3` with `5` or `1`
2. **Add fan-in data** -- create ch3 with your own data
3. **Change operation** -- replace `job * 2` with `job * job` (square)

---

## Challenge

Build micro-blog: CLI `add "title" "content"` to create, `serve` for API. Use logging middleware and graceful shutdown with context.

---

## Summary

Worker pool, fan-in, pipeline -- essential concurrency patterns. Final project: CLI + API + database + Docker + testing. Congratulations completing Go!
