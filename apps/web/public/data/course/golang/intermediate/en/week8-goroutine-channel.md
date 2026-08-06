# Goroutines & Channels

> **Kategori:** Go | **Level:** Intermediate | **Minggu 8:** Goroutines & Channels

## Learning Objectives

- Run goroutines with the go keyword (Go Tour: Concurrency)
- Unbuffered channels: synchronous, sender waits for receiver
- Buffered channels: async until buffer is full
- select for multiplexing multiple channels
- Pipeline pattern: generator → processor → collector

---

## Program: Parallel Downloads

```go
package main

import (
    "fmt"
    "time"
)

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums { out <- n }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in { out <- n * n }
        close(out)
    }()
    return out
}

func main() {
    ch := make(chan string)
    go func() { ch <- "Halo dari goroutine" }()
    msg := <-ch
    fmt.Println("Channel:", msg)

    buf := make(chan int, 3)
    buf <- 1; buf <- 2; buf <- 3
    fmt.Println("Buffered:", <-buf, <-buf, <-buf)

    fmt.Print("Pipeline: ")
    nums := generate(1, 2, 3, 4, 5)
    squares := square(nums)
    for s := range squares { fmt.Printf("%d ", s) }
    fmt.Println()

    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() {
        time.Sleep(50 * time.Millisecond)
        ch1 <- "satu"
    }()
    go func() {
        time.Sleep(100 * time.Millisecond)
        ch2 <- "dua"
    }()

    select {
    case msg := <-ch1: fmt.Println("Dari ch1:", msg)
    case msg := <-ch2: fmt.Println("Dari ch2:", msg)
    case <-time.After(200 * time.Millisecond): fmt.Println("Timeout")
    }
}
```

---

## Key Concepts

### Goroutines
`go f()` — lightweight concurrent functions.

### Channels
Unbuffered (sync) vs buffered (async).

### Select & Pipeline
Multiplexing with select. Pipeline pattern.

---

## Experiments

- Create 3-stage pipeline: generate → double → print
- Try select with default case (non-blocking)
- Create fan-in: merge 2 channels into 1
- Implement worker pool with WaitGroup

---

## Challenge

Build a concurrent web crawler: fetch multiple URLs in parallel with goroutines + channels. Limit concurrency with worker pool.

---

## Summary

Week 8 of 13: **Goroutines & Channels** (Level: Intermediate). This is what makes Go unique. Next week: **Context & Synchronization**.
