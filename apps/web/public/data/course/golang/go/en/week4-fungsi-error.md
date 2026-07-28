# Functions & Error Handling

> Go | Module 4

## Learning Objectives

- Create functions with parameters and returns
- Use multiple returns and named returns
- Learn the error type and error handling idiom
- Create custom errors with fmt.Errorf
- Write variadic functions and defer

---

## Program: Calculator

```go
package main

import (
    "errors"
    "fmt"
)

// Fungsi dengan multiple return
func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa dibagi nol")
    }
    return a / b, nil
}

// Named return
func hitung(a, b int) (jumlah int, kali int) {
    jumlah = a + b
    kali = a * b
    return // naked return
}

// Variadic function
func rataRata(angka ...float64) float64 {
    total := 0.0
    for _, n := range angka {
        total += n
    }
    return total / float64(len(angka))
}

// Defer
func main() {
    defer fmt.Println("Program selesai")

    // Error handling
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

    // Named return
    j, k := hitung(4, 5)
    fmt.Printf("Jumlah: %d, Kali: %d\n", j, k)

    // Variadic
    r := rataRata(80, 90, 75, 85)
    fmt.Printf("Rata-rata: %.1f\n", r)
}
```

---

## Explanation

Go functions can return multiple values. Idiomatic error handling: `if err != nil { return err }`. `fmt.Errorf` with `%w` for error wrapping. `defer` is used for cleanup (close files, unlock mutex). Variadic functions: `func sum(nums ...int)`. Named returns improve documentation.

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

Module 4 of 16: **Functions & Error Handling**. Go delivers high performance with simple syntax. Next week: **Arrays, Slices & Maps**.
