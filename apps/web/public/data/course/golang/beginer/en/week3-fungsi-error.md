# Functions & Error Handling

> Category: Go, Programming Language | Level: Beginner | Week 3

## Learning Objectives

- Create functions with parameters and return values
- Use multiple return values and named returns
- Learn the error type and if err != nil pattern
- Create errors with fmt.Errorf
- Write variadic functions

---

## Program: Kalkulator

```go
package main

import (
    "fmt"
    "errors"
)

func greet(name string) string { return "Hello, " + name }

func divide(a, b float64) (float64, error) {
    if b == 0 { return 0, errors.New("cannot divide by zero") }
    return a / b, nil
}

func sum(numbers ...int) (total int) {
    for _, n := range numbers { total += n }
    return
}

func main() {
    fmt.Println(greet("John"))
    result, err := divide(10, 2)
    if err != nil { fmt.Println("Error:", err)
    } else { fmt.Println("10 / 2 =", result) }
    _, err = divide(5, 0)
    if err != nil { fmt.Println("Error:", err) }
    fmt.Println("1+2+3+4+5 =", sum(1, 2, 3, 4, 5))
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Functions

Declared with `func`. Parameters: `name type`. Return type at end.

**Multiple returns**: `func divide(a, b float64) (float64, error)` -- result + error pattern.

**Named returns**: `func sum(...) (total int)` -- auto-declared and returned.

### Error Handling

No exceptions. Errors returned as values. Idiom: `if err != nil`.

### Variadic

`func sum(numbers ...int)` -- variable number of arguments.

---

## Experiments

Try modifying the code:

1. **Change `sum` args** -- try Fibonacci: `1, 1, 2, 3, 5, 8`
2. **Divide by 0** -- try `divide(1, 0)` and see the error
3. **New function** -- `multiply(a, b int) int`

---

## Challenge

Create `calculateAverage(numbers ...float64) (float64, error)` returning the average. Error if slice is empty.

---

## Summary

Go functions with multiple returns -- result+error pattern. Named returns and variadic functions. Error handling: `if err != nil`. Next week: arrays, slices, maps.
