# Testing & CLI — Taste Test and Buttons for Go Shop

> **Kategori:** Go | **Level:** Advanced | **Minggu 12:** Testing & CLI Tools
> **Prerequisites:** Week 11 — **HTTP Server**.

## Learning Objectives

- `go test` + `func TestHitung(t *testing.T)` + `t.Errorf` auto taste (source: go.dev/doc/tutorial/add-a-test)
- `flag.String("nama", "Tamu", "...")` button `--nama Budi` + `flag.Parse()` + `*nama` open (source: pkg.go.dev/flag)

---

## Why This Matters (Non-IT)

Change discount formula without test → customers overpay, found 3 days later. With `go test`, change → `FAIL` instantly → fix before deploy. CLI `--nama` for terminal cashier without browser.

---

## Program: Taste + Button Shop

```go
// hitung.go
package main

func Hitung(a, b int) int { return a + b }

func Diskon(harga, persen int) int { return harga - harga*persen/100 }
```

```go
// hitung_test.go — NAME MUST BE *_test.go!
package main

import "testing"

func TestHitung(t *testing.T) {
  if Hitung(2, 3) != 5 {
    t.Errorf("Hitung(2,3) = %d, want 5", Hitung(2, 3))
  }
}

func TestDiskon(t *testing.T) {
  cases := []struct{ harga, persen, want int }{
    {62000, 10, 55800},
    {5000, 0, 5000},
  }
  for _, k := range cases {
    if got := Diskon(k.harga, k.persen); got != k.want {
      t.Errorf("Diskon(%d,%d) = %d, want %d", k.harga, k.persen, got, k.want)
    }
  }
}
```

```bash
go test -v
# === RUN TestHitung --- PASS
```

```go
// cli.go — terminal cashier
package main

import (
  "flag"
  "fmt"
)

func main() {
  nama := flag.String("nama", "Tamu", "customer name")
  qty := flag.Int("qty", 1, "sack count")
  flag.Parse() // required! read buttons
  fmt.Printf("Hello %s, %d sacks\n", *nama, *qty)
}
```

```bash
go run cli.go --nama Budi --qty 2
```

---

## Key Concepts

### `*_test.go` + `TestXxx(t *testing.T)` = Taste Kitchen
File ending `_test.go`, function `Test` + `t.Errorf` if wrong. `go test -v` tastes all.

### Table Test = Taste Many at Once
Slice of struct `{input, want}` + loop — add cases without new functions.

### `flag` = Terminal Button
`flag.String("nama", "Tamu", "desc")` → `--nama Budi`. `flag.Parse()` required. `*nama` opens value.

---

## Beginner Friendly Explanation

### Analogy: Taste Test & Machine Button
- **Test = taste**: cook `Diskon` → taste 2 cases → right? Serve.
- **flag = cashier machine button**: `--qty 2` presses button.

### Step 0 — Prepare Device
- Same as W1: `go test ./...` in folder (finds `*_test.go` automatically).

### 3 Must-Know Terms
1. **Test/table test**: taste/taste many
2. **flag/Parse**: button/read button

---

## Experiments

- **Green:** Change `Hitung` to `a-b` → `FAIL`? Fix it.
- **Yellow:** `go run cli.go` without buttons → "Tamu, 1 sack" (defaults)?
- **Red:** Forget `flag.Parse()` → always defaults? Add it.

---

## Challenge

**Tested Cashier:** `hitungTotal(cart, discount)` + table test 3 cases + `cli.go` `--nama --qty` → `go test` PASS + `go run` pass.
- **Link-up (Week 11 — HTTP Server):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Test/Errorf**: taste/report
- **flag/Parse/*nama**: button/read/open

---

## Summary

Week 12 of 13: **Taste & Button** (Level: Advanced). Change boldly with tests. Next: **Capstone**.
