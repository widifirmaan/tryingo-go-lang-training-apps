# Functions & Error Handling

> **Kategori:** Go | **Level:** Beginner | **Minggu 3:** Functions & Error Handling

## Learning Objectives

- Create functions with parameters and return values
- Multiple returns and named returns (Go Tour: Functions)
- Learn the error type and idiom: if err != nil { return err }
- Create custom errors with fmt.Errorf and %w wrapping
- Defer for cleanup, variadic functions func(nums ...int)

---

## Program: Calculator

```go
package main

import (
    "errors"
    "fmt"
)

func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa dibagi nol")
    }
    return a / b, nil
}

func hitung(a, b int) (jumlah int, kali int) {
    jumlah = a + b
    kali = a * b
    return
}

func rataRata(angka ...float64) float64 {
    total := 0.0
    for _, n := range angka {
        total += n
    }
    return total / float64(len(angka))
}

func main() {
    defer fmt.Println("Program selesai")

    hasil, err := bagi(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("10 / 2 = %.1f\n", hasil)
    }

    _, err = bagi(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }

    j, k := hitung(4, 5)
    fmt.Printf("Jumlah: %d, Kali: %d\n", j, k)

    r := rataRata(80, 90, 75, 85)
    fmt.Printf("Rata-rata: %.1f\n", r)
}
```

---

## Key Concepts

### Functions
Multiple returns, named returns, variadic.

### Error Handling
`if err != nil { return err }`. `fmt.Errorf` with `%w`.

### Defer
Scheduled after function returns (LIFO). Used for cleanup.

---

## Experiments

- Add new function: power(a, b float64)
- Create custom error with your own struct
- Try multiple defers — observe LIFO order
- Modify rataRata to handle empty slice

---

## Challenge

Build a scientific calculator with functions: add, subtract, multiply, divide, power, factorial. Use error handling for validation.

---

## Summary

Week 3 of 13: **Functions & Error Handling** (Level: Beginner). Foundation for modular code. Next week: **Collections: Slices, Maps & Strings**.
