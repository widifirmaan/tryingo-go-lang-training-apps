# Setup, Toolchain & Basic Syntax

> **Kategori:** Go | **Level:** Beginner | **Minggu 1:** Setup, Toolchain & Basic Syntax

## Learning Objectives

- Understand Go as a compiled backend language (roadmap.sh phase 1)
- Install Go and write your first program (Go Tour: Basics)
- Learn the toolchain: go run, build, fmt, test, vet (Effective Go)
- Understand .go file structure: package, import, func main (Go Tour)
- Use fmt.Println, fmt.Printf with format verbs %v, %s, %d, %T

---

## Program: Hello, Go!

```go
package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    fmt.Printf("Nama: %s\n", nama)
    fmt.Printf("Versi: %.2f\n", versi)
    fmt.Printf("Aktif: %t\n", aktif)
    fmt.Printf("Tipe: %T %T %T\n", nama, versi, aktif)
}
```

---

## Key Concepts

### Go's Role\nGo is a compiled, statically typed language by Google. Compiles directly to machine binary — fast execution, easy distribution.\n\n### Main Toolchain\n`go run`, `go build`, `go fmt`, `go test`, `go vet`\n\n### File Structure\n`package`, `import`, `func main()` entry point.\n\n### Format Verbs\n`%s` string, `%d` int, `%f` float, `%t` bool, `%T` type, `%v` default.

---

## Experiments

- Change variable values and observe
- Add a new function with different return types
- Replace for loops with range
- Try data types you haven't used
- Build a small program combining 2-3 concepts

---

## Challenge

Build a program applying this week's concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.

---

## Summary

Week 1 of 13: **Setup, Toolchain & Basic Syntax** (Level: Beginner). Go delivers high performance with simple syntax. Next week: **Variables, Types & Control Flow**.
