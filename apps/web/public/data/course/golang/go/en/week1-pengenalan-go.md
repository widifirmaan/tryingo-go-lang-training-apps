# Introduction to Go & Toolchain

> Go | Module 1

## Learning Objectives

- Understand Go as a compiled backend language
- Install Go and write your first program
- Learn the toolchain: go run, build, fmt, test
- Understand .go file structure and func main
- Use fmt.Println and fmt.Printf

---

## Program: Hello Go

```go
package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    // Deklarasi variabel
    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    // fmt.Printf dengan verb
    fmt.Printf("Nama: %s\n", nama)
    fmt.Printf("Versi: %.2f\n", versi)
    fmt.Printf("Aktif: %t\n", aktif)
    fmt.Printf("Tipe: %T %T %T\n", nama, versi, aktif)
}
```

---

## Explanation

Go is a compiled, statically typed language developed by Google. Main toolchain: `go run` (run directly), `go build` (compile to binary), `go fmt` (format code), `go test` (run tests). Go file structure: `package main`, `import`, `func main()`. `fmt.Println` prints with newline, `fmt.Printf` uses format verbs.

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

Module 1 of 16: **Introduction to Go & Toolchain**. Go delivers high performance with simple syntax. Next week: **Variables, Types & Constants**.
