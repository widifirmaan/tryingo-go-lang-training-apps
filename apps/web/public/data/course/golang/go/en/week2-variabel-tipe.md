# Variables, Types & Constants

> Go | Module 2

## Learning Objectives

- Declare variables with var and :=
- Learn basic types: int, float64, string, bool
- Understand zero values and type inference
- Create constants with const and iota
- Use fmt.Print, Println, Printf

---

## Program: Personal Data

```go
package main

import "fmt"

func main() {
    // var declaration
    var name string = "Budi"
    var age int = 25
    var height float64 = 175.5

    // short declaration
    city := "Jakarta"
    isStudent := false

    // Zero values
    var zeroInt int
    var zeroStr string
    var zeroBool bool

    fmt.Println("=== Variabel ===")
    fmt.Printf("Nama: %s, Umur: %d, Tinggi: %.1f\n", name, age, height)
    fmt.Printf("Kota: %s, Pelajar: %t\n", city, isStudent)

    fmt.Println("\n=== Zero Values ===")
    fmt.Printf("int: %d, string: %q, bool: %t\n", zeroInt, zeroStr, zeroBool)

    // Constants
    const pi = 3.14159
    const greeting = "Halo Go!"

    // iota
    const (
        Red = iota
        Green
        Blue
    )
    fmt.Printf("\nKonstanta: %s, Pi = %.5f\n", greeting, pi)
    fmt.Printf("Warna: Red=%d, Green=%d, Blue=%d\n", Red, Green, Blue)
}
```

---

## Explanation

`var name type = value` for explicit declaration. `:=` for short declaration with type inference. Basic types: `int`, `float64`, `string`, `bool`. Zero values: 0 for numeric, "" for string, false for bool. `const` for constants. `iota` for auto-increment in const blocks.

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

Module 2 of 16: **Variables, Types & Constants**. Go delivers high performance with simple syntax. Next week: **Control Flow: if, for, switch**.
