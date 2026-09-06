# Context & Sync — Cancel Alarm and Wait Together

> **Kategori:** Go | **Level:** Intermediate | **Minggu 9:** Context & Synchronization

## Learning Objectives

- `context.WithTimeout(ctx, 100ms)` auto-cancel alarm + `ctx.Done()` listen (source: go.dev/blog/context)
- `sync.WaitGroup` `Add/Done/Wait` wait for all cashiers before closing shop

---

## Why This Matters (Non-IT)

Supplier not answering for 10 seconds → cashier waits forever, queue angry. With `WithTimeout(2s)`, timeout → auto cancel + "try again". `WaitGroup` ensures shop closes AFTER all cashiers finish (don't turn off lights with customers inside).

---

## Program: Work with Alarm + Wait

```go
package main

import (
  "context"
  "fmt"
  "sync"
  "time"
)

func kerja(ctx context.Context, id int, wg *sync.WaitGroup) {
  defer wg.Done()
  select {
  case <-time.After(200 * time.Millisecond):
    fmt.Printf("Work %d done\n", id)
  case <-ctx.Done():
    fmt.Printf("Work %d cancelled: %v\n", id, ctx.Err())
  }
}

func main() {
  ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
  defer cancel()

  var wg sync.WaitGroup
  for i := 1; i <= 2; i++ {
    wg.Add(1)
    go kerja(ctx, i, &wg)
  }
  wg.Wait()
  fmt.Println("All done/cancelled — shop may close")
}
```

---

## Key Concepts

### `context` = Alarm + Cancel Message
`WithTimeout(100ms)` → `ctx.Done()` closes on timeout. `WithCancel()` for manual cancel.

### `cancel()` Must `defer`
Live alarm eats resources — `defer cancel()` turns it off.

### `WaitGroup` = Roll Call
`Add(1)` before `go`, `Done()` at work end (`defer`), `Wait()` waits all.

---

## Beginner Friendly Explanation

### Analogy: Kitchen Alarm & Roll Call
- **Context = oven alarm**: 100ms rings → lift (cancel).
- **WaitGroup = going-home roll**: 2 cashiers → `Add(2)`, each `Done()`, boss `Wait()` then locks door.

### Step 0 — Prepare Device
- Same as W1: `go run alarm.go`. Change `100ms` → `300ms` to see "done" (not cancelled).

### 3 Must-Know Terms
1. **Context/timeout**: alarm
2. **WaitGroup Add/Done/Wait**: roll/report/wait
3. **select**: listen many

---

## Experiments

- **Green:** Timeout `300ms` (> 200ms work) → "done" not "cancelled"?
- **Yellow:** Forget `wg.Add(1)` → `Wait` releases instantly (0)?
- **Red:** Forget `defer cancel()` → `go vet` complains? (`lostcancel` check)

---

## Challenge

**On-Time Shop:** 3 `go kerja` (150ms) + 100ms timeout → 3 "cancelled" + `Wait` → change to 200ms → 3 "done". **Intermediate Go done!**

---

## Mini Glossary

- **context/cancel**: alarm/off
- **WaitGroup**: roll call
- **select**: listen many

---

## Summary

Week 9 of 13: **Alarm & Wait** (Level: Intermediate). Never wait forever. **Intermediate Go done!** Next: **Stdlib** (Advanced).
