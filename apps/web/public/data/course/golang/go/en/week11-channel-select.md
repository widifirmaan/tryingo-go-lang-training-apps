# Channels & Select

> Go | Module 11

## Learning Objectives

- Create unbuffered and buffered channels
- Send (ch <-) and receive (<-ch) data
- Use select for multiplexing
- Apply the pipeline pattern
- Use close and range over channels

---

## Program: Data Pipeline

```go
package main

import (
    "fmt"
    "time"
)

func generate(nums ...int) <-chan int {
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
    // Unbuffered channel
    ch := make(chan string)
    go func() {
        ch <- "Halo dari goroutine"
    }()
    msg := <-ch
    fmt.Println("Channel:", msg)

    // Buffered channel
    buf := make(chan int, 3)
    buf <- 1
    buf <- 2
    buf <- 3
    fmt.Println("Buffered:", <-buf, <-buf, <-buf)

    // Pipeline pattern
    fmt.Println("\nPipeline:")
    nums := generate(1, 2, 3, 4, 5)
    squares := square(nums)
    for s := range squares {
        fmt.Printf("%d ", s)
    }
    fmt.Println()

    // Select
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
    case msg := <-ch1:
        fmt.Println("Dari ch1:", msg)
    case msg := <-ch2:
        fmt.Println("Dari ch2:", msg)
    case <-time.After(200 * time.Millisecond):
        fmt.Println("Timeout")
    }
}
```

---

## Explanation

Channels are communication pipes between goroutines. Unbuffered: synchronous (sender waits for receiver). Buffered: async until buffer is full. `select` waits on multiple channels. Pipeline pattern: generator → process → collector. `close(ch)` marks channel as done.

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

Module 11 of 16: **Channels & Select**. Go delivers high performance with simple syntax. Next week: **Context & Advanced Sync**.
