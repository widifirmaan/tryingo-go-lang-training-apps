# Control Flow: if, for, switch

> Go | Module 3

## Learning Objectives

- Apply if/else with short statement
- Master for loops (classic, while, infinite)
- Use switch without break
- Understand scope and blocks
- Use labels and break/continue

---

## Program: Prime Numbers

```go
package main

import "fmt"

func main() {
    // if/else dengan short statement
    score := 85
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    // for classic
    fmt.Println("\n=== For Classic ===")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    // for while-style
    fmt.Println("\n=== For While ===")
    n := 1
    for n <= 3 {
        fmt.Printf("%d ", n)
        n++
    }
    fmt.Println()

    // for infinite + break
    fmt.Println("\n=== Break ===")
    sum := 0
    for {
        sum++
        if sum > 5 {
            break
        }
        fmt.Printf("%d ", sum)
    }
    fmt.Println()

    // switch
    day := 3
    switch day {
    case 1:
        fmt.Println("Senin")
    case 2:
        fmt.Println("Selasa")
    case 3:
        fmt.Println("Rabu")
    default:
        fmt.Println("Hari lain")
    }

    // tagless switch
    x := 10
    switch {
    case x < 10:
        fmt.Println("Kecil")
    case x == 10:
        fmt.Println("Tepat 10")
    default:
        fmt.Println("Besar")
    }
}
```

---

## Explanation

`if` can have a short statement: `if x := 10; x > 5 {}`. `for` is the only loop in Go — classic, while-style, or infinite. `switch` doesn't need `break`; each case stops automatically. Tagless switch works for complex conditions. `defer` schedules function execution after the surrounding function returns.

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

Module 3 of 16: **Control Flow: if, for, switch**. Go delivers high performance with simple syntax. Next week: **Functions & Error Handling**.
