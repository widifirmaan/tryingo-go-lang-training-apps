# Setup & Syntax — Tidy Shop Ledger in Go

> **Kategori:** Go | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Learning Objectives

- Install Go, check `go version`, init `go mod init shop`, run `go run main.go`
- Write first program: `package main` + `import "fmt"` + `func main()`
- Store: `var name string = "Budi"` (labeled box) and `version := 1.24` (infer)
- Print `fmt.Println` and `fmt.Printf` (`%s` text, `%d` number, `%v` any)
- Tidy `go fmt`

---

## Why This Matters (Non-IT)

Shop needs tidy, fast ledger. Go = office ledger: each box **must be labeled** (`string`/`int`), wrong fill red. Compiled to single binary → fast on low-spec cashier laptop.

---

## Program: First Receipt in Go

Save as `main.go` in folder `shop`

```go
package main
import "fmt"

func main() {
	fmt.Println("Siti's Shop — Go Ledger")
	fmt.Println("Go = fast, tidy, 1 binary")

	var name string = "Budi"
	version := 1.24
	active := true
	var empty string

	fmt.Printf("Name: %s (type %T)\n", name, name)
	fmt.Printf("Version: %.2f (type %T)\n", version, version)
	fmt.Printf("Active: %t, Empty: %q\n", active, empty)

	riceKg := 2
	pricePerKg := 12500
	total := riceKg * pricePerKg
	fmt.Printf("\nRice %dkg x Rp %d = Rp %d\n", riceKg, pricePerKg, total)

	fmt.Println("\nToolchain: go run (run), go fmt (tidy), go build (binary)")
}
```

**Run (5 min):**
1. Install from `go.dev` → `go version` → `go1.22.x`
2. `mkdir shop; cd shop; go mod init shop` → `go.mod`
3. Create `main.go` → `go run main.go`
4. Mess spaces → `go fmt ./...` → tidy

---

## Key Concepts

### `package main` + `func main()` = Cover + Door
Every Go program has cover `package main` and door `main()` — Go enters there.

### `var` vs `:=` — Labeled vs Guess
- `var name string = "Budi"` → labeled `string`
- `name := "Budi"` → Go guesses `string` (shorter, use inside `main`)

### Zero Value — Built-in Empty
`var s string` → `""`, `var n int` → `0`, `var b bool` → `false`. No `null`.

### `fmt` — Printer
- `Println` new line
- `Printf("Name: %s\n", name)` `%s` string, `%d` int, `%f` float, `%t` bool, `%T` type, `%q` quoted, `%v` default

### `go fmt` — Ruler
`go fmt ./...` tidies spaces.

---

## Beginner Friendly Explanation

### Analogy: Office Ledger

- **Go = official ledger**: each column has header (`string`/`int`), wrong fill rejected. JS/Python column free.
- **`var name string`** = column `Name` header `String`, fill "Budi".
- **`:=` = guess stamp**: write "Budi", stamp auto `string`.
- **`go fmt` = ruler**: straightens all pages.

---

## Experiments

- **Green:** Change `riceKg := 5` → total?
- **Yellow:** `fmt.Printf("Total: %d type %T\n", total, total)` → type?
- **Red:** `var name string = 123` → error `cannot use 123 as string`. Fix.

---

## Challenge

**Delivery Receipt Go:** `weight := 2.5` (`float64`), `distance := 8` int, `delivery := int(weight*5000) + distance*2000` (convert `float→int`), print `fmt.Printf("Weight %.1fkg distance %dkm → Rp %d\n", weight, distance, delivery)` + `fmt.Printf("Types: %T %T\n", weight, delivery)`.

Bonus: `go fmt` then `go build` → check `shop.exe` appears.

---

## Mini Glossary

- **Go**: fast compiled language
- **go run/fmt/build**: run/tidy/build
- **var/:=**: declare
- **fmt.Printf**: formatted print

---

## Summary

Week 1 of 13: **Setup Go** (Level: Beginner). Ledger on, first receipt done. Next: **Variables, Types & Control** — `if` stock and `for` count.
