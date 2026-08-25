# Functions & Error — Kitchen Recipe with Failure Alarm

> **Kategori:** Go | **Level:** Beginner | **Minggu 3:** Fungsi & Error Handling

## Learning Objectives

- `func divide(a float64, b float64) (float64, error)` — Go must return error
- Pattern `if err != nil { return err }` — alarm if divide by 0
- `defer` to close door after done, `...float64` for bulk
- Difference `var` vs `:=` in functions

---

## Why This Matters (Non-IT)

Recipe `divideStock(10,0)` if no error check → negative stock, loss. Go forces you check `error` each divide, open file, API — safe for non-IT fearing forget.

---

## Program: Safe Kitchen Functions

```go
package main
import ("errors"; "fmt")

func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("cannot divide by 0 — check stock")
	}
	return a / b, nil
}

func calc(a, b int) (sum int, prod int) {
	sum = a + b
	prod = a * b
	return
}

func average(nums ...float64) float64 {
	total := 0.0
	for _, n := range nums {
		total += n
	}
	if len(nums) == 0 {
		return 0
	}
	return total / float64(len(nums))
}

func main() {
	defer fmt.Println("Done — defer runs last")
	result, err := divide(10, 2)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Printf("10/2 = %.1f\n", result)
	}
	_, err = divide(5, 0)
	if err != nil {
		fmt.Println("Divide 0 error:", err)
	}
	j, k := calc(4, 5)
	fmt.Printf("Sum %d, Prod %d\n", j, k)
	fmt.Printf("Average: %.1f\n", average(80, 90, 75))
}
```

---

## Key Concepts

### ` (float64, error)` — Twins
Go no `try/catch`. Everything fallible returns `(result, error)`. Must check `if err != nil`.

### Named Return & Variadic
- `func calc() (sum int, prod int)` → just `return`.
- `func average(nums ...float64)` → receive many.

### `defer` = Close Door Last
`defer fmt.Println("done")` runs when function ends, LIFO if many.

---

## Beginner Friendly Explanation

### Analogy: Stove Alarm

- **`error` = smoke alarm**: cook `divide(5,0)` alarm rings, you check `if err != nil` → turn off stove.
- **`defer` = turn off stove after cooking**: write at start, runs at end.

---

## Experiments

- **Green:** `divide(9,3)` → ?
- **Yellow:** `average()` with no args → 0 (check len).
- **Red:** Forget check `err` → result 0 used, wrong calc.

---

## Challenge

**Safe Cashier:** `func calcTotal(cart []int, discount float64) (int, error)` → if `discount <0 || >50` return error, else calc. `defer` log "Transaction done". Use `if err != nil`.

---

## Mini Glossary

- **error**: failure alarm
- **defer**: delay until done
- **...**: bulk

---

## Summary

Week 3: **Safe Functions** (Level: Beginner). Can make recipes that don't silently fail. Next: **Slice & Map** — dynamic shelves.
