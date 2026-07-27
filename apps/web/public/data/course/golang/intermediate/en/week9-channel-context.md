# Channels, Select & Context

> Category: Go, Programming Language | Level: Intermediate | Week 9

## Learning Objectives

- Create unbuffered and buffered channels
- Send (ch <-) and receive (<-ch) data
- Use select for multiplexing
- Apply context.WithTimeout
- Use close() and range over channels

---

## Program: Komunikasi Goroutine

```go
package main

import (
    "fmt"
    "time"
    "context"
)

func main() {
    ch := make(chan string)
    go func() { ch <- "message from goroutine" }()
    msg := <-ch
    fmt.Println("Received:", msg)

    buf := make(chan int, 3)
    buf <- 10; buf <- 20; buf <- 30
    close(buf)
    fmt.Print("Buffered: ")
    for v := range buf { fmt.Print(v, " ") }
    fmt.Println()

    ch1 := make(chan string)
    ch2 := make(chan string)
    go func() { time.Sleep(20 * time.Millisecond); ch1 <- "data from ch1" }()
    go func() { time.Sleep(10 * time.Millisecond); ch2 <- "data from ch2" }()
    select {
    case v := <-ch1: fmt.Println("ch1:", v)
    case v := <-ch2: fmt.Println("ch2:", v)
    case <-time.After(100 * time.Millisecond): fmt.Println("timeout!")
    }

    ctx, cancel := context.WithTimeout(context.Background(), 15*time.Millisecond)
    defer cancel()
    select {
    case <-time.After(30 * time.Millisecond): fmt.Println("Finished on time")
    case <-ctx.Done(): fmt.Println("Context timeout:", ctx.Err())
    }
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Channels

Communication pipes between goroutines. `make(chan int)` = unbuffered, `make(chan int, 3)` = buffered.

`ch <- value` sends, `value := <-ch` receives. `close(ch)` = no more data.

### Select

Waits on multiple channels. First ready case executes. `time.After` for timeout.

### Context

`context.WithTimeout` creates deadlines. `ctx.Done()` fires on timeout.

---

## Experiments

Try modifying the code:

1. **Change buffer** -- change `make(chan int, 3)` to `make(chan int)`
2. **Add channel** -- create ch3 and add select case
3. **Change timeout** -- change `15ms` to larger/smaller than 30ms

---

## Challenge

Build 3-stage pipeline: (1) generate 1-10, (2) multiply by 2, (3) print. Each stage is a goroutine + channels. Context timeout 50ms.

---

## Summary

Channels for goroutine communication. Select for multiplexing. Context for timeouts. Pipeline: goroutine + channel = streaming. Next week: testing and standard library.
