# Variables, Types & Control Flow

> **Kategori:** Go | **Level:** Beginner | **Minggu 2:** Variables, Types & Control Flow

## Learning Objectives

- Declare variables with var and := (short declaration)
- Learn basic types: int, float64, string, bool, rune
- Understand zero values and type inference (Go Tour: Zero Values)
- Apply if/else with short statement and for loop 3 forms
- Use switch without break — cases stop automatically (Effective Go)

---

## Program: Numbers & Grades

```go
package main

import "fmt"

func main() {
    var name string = "Budi"
    age := 25
    height := 175.5
    fmt.Printf("Nama: %s, Umur: %d, Tinggi: %.1f\n", name, age, height)

    var zeroInt int
    var zeroStr string
    var zeroBool bool
    fmt.Printf("Zero: int=%d, str=%q, bool=%t\n", zeroInt, zeroStr, zeroBool)

    score := 85
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    fmt.Print("For: ")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    n := 1
    fmt.Print("While: ")
    for n <= 3 {
        fmt.Printf("%d ", n)
        n++
    }
    fmt.Println()

    day := 3
    switch day {
    case 1: fmt.Println("Senin")
    case 2: fmt.Println("Selasa")
    case 3: fmt.Println("Rabu")
    default: fmt.Println("Hari lain")
    }

    x := 10
    switch {
    case x < 10: fmt.Println("Kecil")
    case x == 10: fmt.Println("Tepat 10")
    default: fmt.Println("Besar")
    }
}
```

---

## Key Concepts

### Variables & Types
`var` explicit, `:=` short declaration. Zero values: 0, "", false.

### Control Flow
if short statement, for 3 forms, switch no-break, tagless switch.

---

## Experiments

- Change score values and observe grade changes
- Add nested if for validation
- Create for loop with break on condition
- Replace switch with if/else — which is more readable?

---

## Challenge

Build a temperature converter (Celsius ↔ Fahrenheit ↔ Kelvin) with menu using switch. Validate input with if.

---

## Summary

Week 2 of 13: **Variables, Types & Control Flow** (Level: Beginner). Essential foundations. Next week: **Functions & Error Handling**.
