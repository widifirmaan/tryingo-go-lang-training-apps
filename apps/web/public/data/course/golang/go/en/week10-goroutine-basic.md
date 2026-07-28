# Goroutines & WaitGroups

> Go | Module 10

## Learning Objectives

- Run goroutines with the go keyword
- Synchronize with sync.WaitGroup
- Protect access with sync.Mutex
- Detect race conditions with -race
- Understand Go concurrency model

---

## Program: Parallel Downloads

```go
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done()
    fmt.Printf("Worker %d mulai\n", id)
    time.Sleep(100 * time.Millisecond)
    fmt.Printf("Worker %d selesai\n", id)
}

type Counter struct {
    mu    sync.Mutex
    value int
}

func (c *Counter) Increment() {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.value++
}

func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.value
}

func main() {
    // WaitGroup
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {
        wg.Add(1)
        go worker(i, &wg)
    }
    wg.Wait()
    fmt.Println("Semua worker selesai")

    // Mutex
    counter := Counter{}
    var wg2 sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg2.Add(1)
        go func() {
            defer wg2.Done()
            counter.Increment()
        }()
    }
    wg2.Wait()
    fmt.Printf("Counter: %d (seharusnya 1000)\n", counter.Value())
}
```

---

## Explanation

Goroutines: functions running concurrently with `go f()`. `sync.WaitGroup` waits for goroutines to finish. `sync.Mutex` prevents data races. Race detector `go run -race` detects dangerous concurrent access. Go's concurrency model: "Do not communicate by sharing memory; share memory by communicating."

---

## Experiments

- Change variable values and observe the changes
- Add a new function with different return types
- Replace for loops with range
- Try data types you haven't used yet

---

## Challenge

Build a program applying this week's concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.
Jalankan dengan: go run -race untuk deteksi race condition.

---

## Summary

Module 10 of 16: **Goroutines & WaitGroups**. Go delivers high performance with simple syntax. Next week: **Channels & Select**.
