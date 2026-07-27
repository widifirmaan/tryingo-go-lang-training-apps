# Variables, Data Types & Control Flow

> Category: Go, Programming Language | Level: Beginner | Week 2

## Learning Objectives

- Declare variables with var and :=
- Learn basic types: int, float64, string, bool
- Use for loops
- Apply if/else and switch without break
- Understand zero values and constants

---

## Program: Data Diri

```go
package main

import "fmt"

func main() {
    var firstName string = "John"
    var age int = 25
    height := 175.5
    var married bool

    fmt.Println("Name:", firstName)
    fmt.Println("Age:", age)
    fmt.Println("Height:", height, "cm")
    fmt.Println("Married:", married)

    const pi = 3.14159
    fmt.Println("Pi:", pi)

    fmt.Print("Numbers: ")
    for i := 1; i <= 5; i++ {
        fmt.Print(i, " ")
    }
    fmt.Println()

    score := 85
    if score >= 90 { fmt.Println("Grade: A")
    } else if score >= 75 { fmt.Println("Grade: B")
    } else { fmt.Println("Grade: C") }

    day := "Monday"
    switch day {
    case "Saturday", "Sunday": fmt.Println("Weekend")
    default: fmt.Println("Weekday")
    }
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Variables and Data Types

Go is **statically typed**. `string`, `int`, `float64`, `bool` are basic types.

**Zero values**: `0` for int, `""` for string, `false` for bool.

### Constants and Loops

`const pi = 3.14159` -- fixed values. Go only has `for`.

### if/else and switch

No parentheses around conditions. `switch` doesn't need `break`.

---

## Experiments

Try modifying the code:

1. **Change `score`** -- try 92, 70, 45 and see different grades
2. **Add switch case** -- add "Friday" as weekend
3. **Change `day`** -- try "Saturday" and see output change

---

## Challenge

Create a temperature converter: Celsius input, Fahrenheit/Reamur/Kelvin output. Use `const` for conversion formulas.

---

## Summary

Go uses static typing with inference. Only `for` for loops. `switch` without `break`. Zero values make code safer. Next week: functions and error handling.
