# Goroutines & Channels — Parallel Cashiers in Go

> **Kategori:** Go | **Level:** Intermediate | **Minggu 8:** Goroutine & Channel

## Learning Objectives

- `go kasir()` open new cashier (lightweight, thousands OK), `ch := make(chan string)` conveyor belt (source: go.dev/tour/concurrency)
- `ch <- "done"` send, `<-ch` receive (waits if empty), `close(ch)` close + `range` until closed

---

## Why This Matters (Non-IT)

3 customers paying in sequence = 3x waiting. With 3 parallel cashiers (`go`), total = 1x slowest. Channel = conveyor belt between cashier-kitchen, safe without fighting (unlike manual `mutex` prone to deadlock).

---

## Program: 2 Cashiers + Conveyor

```go
package main

import "fmt"

func kasir(nama string, ch chan string) {
  ch <- "Done " + nama
}

func main() {
  ch := make(chan string)
  go kasir("Budi", ch)
  go kasir("Siti", ch)
  fmt.Println(<-ch)
  fmt.Println(<-ch)

  pesanan := make(chan int, 2)
  pesanan <- 1
  pesanan <- 2
  close(pesanan)
  for p := range pesanan {
    fmt.Println("Process order", p)
  }
}
```

---

## Key Concepts

### `go f()` = Open New Cashier
Function runs alone (concurrent). Cheap: thousands of goroutines normal.

### Channel = Safe Conveyor
- Unbuffered: send **waits** for receive (handshake).
- `make(chan int, 2)` buffered: holds 2 without waiting.

### `close` + `range` = Close + Finish
`close(ch)` closes belt → `for v := range ch` stops when empty.

---

## Beginner Friendly Explanation

### Analogy: Cashiers & Sushi Belt
- **Goroutine = new cashier**, **channel = sushi belt**: chef puts (`ch <-`), customer takes (`<-ch`).

### Step 0 — Prepare Device
- Same as W1: `go run kasir.go`.

### 3 Must-Know Terms
1. **Goroutine/channel**: cashier/belt
2. **Unbuffered/buffered**: wait/hold
3. **close/range**: close/finish

---

## Experiments

- **Green:** 3 `go kasir` + 3 `<-ch` → random order each run?
- **Yellow:** Remove 1 `<-ch` → stuck (deadlock)? Put back.
- **Red:** Send 3rd to buffer-2 without receive → stuck?

---

## Challenge

**Parallel Kitchen:** 3 `go masak` + collect 3 + `close` → print receive order. Add `buffered(3)`, compare.

---

## Mini Glossary

- **go/chan/<-**: open/belt/send-receive
- **Deadlock**: mutual waiting (stuck)

---

## Summary

Week 8 of 13: **Parallel Cashiers** (Level: Intermediate). Fast + safe. Next: **Context** — cancel alarm.
