# Variables, Types & Control — Labeled Shelf and Shop Guard

> **Kategori:** Go | **Level:** Beginner | **Minggu 2:** Variabel, Tipe & Control Flow

## Learning Objectives

- `var`, `:=`, `int/float64/string/bool` and zero `0 "" false`
- `if` with `else if`, `for` 3 forms (classic, while-style, infinite), `switch` without `break`

---

## Why This Matters (Non-IT)

Score 85 → B, stock 0 → "Out", count 1-5 for 5 receipts. Without `if/for`, write manually 100x. Go `switch` without `break` = safer for beginners.

---

## Program: Grades & Stock

```go
package main
import "fmt"

func main() {
	var name string = "Budi"
	age := 25
	var emptyInt int
	fmt.Printf("Name: %s, Age: %d, Empty: %d\n", name, age, emptyInt)

	score := 85
	if score >= 90 {
		fmt.Println("Grade: A")
	} else if score >= 80 {
		fmt.Println("Grade: B")
	} else {
		fmt.Println("Grade: C")
	}

	if s := 75; s >= 70 {
		fmt.Println("Pass, score:", s)
	}

	fmt.Print("Count 1-5: ")
	for i := 1; i <= 5; i++ {
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	n := 1
	fmt.Print("While 1-3: ")
	for n <= 3 {
		fmt.Printf("%d ", n)
		n++
	}
	fmt.Println()

	day := 3
	switch day {
	case 1:
		fmt.Println("Monday")
	case 2:
		fmt.Println("Tuesday")
	case 3:
		fmt.Println("Wednesday")
	default:
		fmt.Println("Other")
	}

	x := 10
	switch {
	case x < 10:
		fmt.Println("Small")
	case x == 10:
		fmt.Println("Exactly 10")
	default:
		fmt.Println("Big")
	}
}
```

---

## Key Concepts

### Zero Value
`int→0`, `string→""`, `bool→false`. Safe, no `null`.

### `if` + Short Statement
`if score := 75; score >=70 { }` → variable only for `if`.

### `for` 3 Faces
- `for i:=1; i<=5; i++` classic
- `for n <= 3 { }` like `while`
- `for { }` infinite (with `break`)

### `switch` Go
No `break` needed, auto stops. `switch { case x<10: }` replaces long `if-else`.

---

## Beginner Friendly Explanation

### Analogy

- **Zero value = empty shelf**: not filled, already labeled `0`.
- **`switch` = counter**: counter 3 serves, not leaking to 4 (JS leaks if forget break).

---

## Experiments

- **Green:** `score=95` → grade?
- **Yellow:** `for i:=5; i>=1; i--` backward?
- **Red:** Forget `i++` in while → infinite, `Ctrl+C`.

---

## Challenge

**Delivery Switch:** `weight=2.5, distance=8`, `switch { case distance<=5: delivery=10000; case distance<=10: delivery=15000; default: 20000 }`, total `weight*5000+delivery`. Validate `if weight<=0 { fmt.Println("Wrong weight") }`.

---

## Mini Glossary

- **Zero value**: default empty
- **Short statement**: `if x:=...;`
- **Switch**: choose counter

---

## Summary

Week 2: **Variables & Control** (Level: Beginner). Can branch and repeat. Next: **Functions & Error**.
