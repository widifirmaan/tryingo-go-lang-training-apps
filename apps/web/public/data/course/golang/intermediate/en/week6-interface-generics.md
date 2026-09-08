# Interfaces & Generics — Shop Contracts

> **Kategori:** Go | **Level:** Intermediate | **Minggu 6:** Interface & Generics

## Learning Objectives

- `type Cashier interface { Calc() int }` — contract: anyone who can `Calc()` may guard the cashier
- Structs `Rice`, `Oil` implicitly implement — no `implements` needed
- `any` for anything, `generics [T any]` rack for any type

---

## Why This Matters (Non-IT)

Shops have rice cashiers, staple cashiers — all must be able to `Calc()`. Interface = **contract**: if you can `Calc`, you may guard the cashier.

---

## Program: Cashier Contract

```go
package main
import "fmt"

type Cashier interface { Calc() int }

type Rice struct{ Kg, Price int }
func (b Rice) Calc() int { return b.Kg * b.Price }

type Oil struct{ Liter, Price int }
func (m Oil) Calc() int { return m.Liter * m.Price }

func Pay(k Cashier){ fmt.Printf("Pay: Rp %d\n", k.Calc()) }

func First[T any](list []T) T { return list[0] }

func main(){
  Pay(Rice{Kg:2, Price:12500})
  Pay(Oil{Liter:2, Price:17000})
  fmt.Println("First:", First([]string{"Rice","Oil"}))
}
```

---

## Key Concepts

### Interface = Contract
`Cashier` demands `Calc() int` — `Rice` and `Oil` both qualify, no registration.

### Generics `[T any]` = Any-Type Rack
`First([]string{...})` → T is `string`.

---

## Beginner Friendly Explanation

### Analogy: Guard Contract
- **Interface = job contract**: "must be able to Calc". Rice qualifies, Oil qualifies.

### Step 0 — Prepare Device
- Go installed (`go version`), `contract.go`, `go run contract.go`.

### How the Computer Reads It
1. `Pay(Rice{...})` → Rice has `Calc()` → accepted as `Cashier`.
2. Missing `Calc()` → compile error, rejected.

### 3 Must-Know Terms
1. **interface/generics**: contract/any-rack

---

## Experiments

- **Green:** Add `Sugar` struct with `Calc()` → `Pay` accepts?
- **Yellow:** `First([]int{1,2})` → T is `int`?
- **Red:** Struct without `Calc()` to `Pay` → compile error? Add method.

---

## Challenge

**Contract Shop:** `Priced` interface `{ Price() int }` + 3 structs + `Checkout(items []Priced)` totals all.

---

## Mini Glossary

- **interface/any**: contract/anything

---

## Summary

Week 6: **Contracts** — implicit interfaces. Next: **Pointers**.
