# Goroutines & WaitGroups

> Category: Go, Programming Language | Level: Intermediate | Week 8

## Learning Objectives

- Run goroutines with the go keyword
- Use sync.WaitGroup
- Apply sync.Mutex
- Detect race conditions
- Understand Go concurrency model

---

## Program: Eksekusi Paralel

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func main() {
    go func() { fmt.Println("Hello from goroutine!") }()
    time.Sleep(10 * time.Millisecond)

    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            fmt.Printf("Worker %d starting\n", id)
            time.Sleep(50 * time.Millisecond)
            fmt.Printf("Worker %d done\n", id)
        }(i)
    }
    wg.Wait()
    fmt.Println("All workers done!")

    type Account struct {
        mu      sync.Mutex
        Balance int
    }
    acc := &Account{}
    var wg2 sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            acc.mu.Lock()
            acc.Balance += 100
            acc.mu.Unlock()
        }()
    }
    wg2.Wait()
    fmt.Println("Final balance:", acc.Balance)
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Goroutines

`go func()` runs a function as a lightweight thread. Much lighter than OS threads.

### WaitGroup

`sync.WaitGroup`: `Add(1)` before launch, `Done()` at end, `Wait()` to block.

### Mutex

`sync.Mutex` prevents race conditions. `Lock()` before access, `Unlock()` after. Pattern: `defer mu.Unlock()`.

---

## Experiments

Try modifying the code:

1. **Add workers** -- change loop from 3 to 5 goroutines
2. **Remove Mutex** -- comment out Lock/Unlock, see unexpected results
3. **Change delay** -- replace `50ms` with `100ms`

---

## Challenge

Build a worker pool: 5 workers, 20 jobs (numbers), workers calculate squares. Use WaitGroup and channels.

---

## Summary

Goroutines = lightweight concurrent programming. WaitGroup for sync. Mutex for safe access. `go run -race` detects races. Next week: channels, select, context.
