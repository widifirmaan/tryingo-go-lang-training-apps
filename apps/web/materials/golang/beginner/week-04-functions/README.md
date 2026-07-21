# Week 4: Functions

Functions are the building blocks of Go programs. This week you'll learn how to define, call, and compose functions in increasingly powerful ways.

## Learning Objectives

- Define functions with parameters and return values
- Return multiple values from a function
- Use named return values for clarity
- Write variadic functions that accept variable arguments
- Create and use anonymous functions and closures
- Understand recursion and implement recursive solutions

## Lessons

| Lesson | Topic | Key Concepts |
|--------|-------|--------------|
| 01 | Function Basics | func keyword, parameters, return types, calling functions |
| 02 | Multiple Returns | Multiple return values, named returns, naked returns |
| 03 | Variadic Functions | Variadic parameters, spreading slices, optional arguments |
| 04 | Closures | Anonymous functions, capturing variables, IIFE, function literals |
| 05 | Recursion | Recursive functions, base cases, factorial, fibonacci |

## Weekly Project: Calculator with History

Build a calculator that supports basic operations and keeps a history of calculations:

- `add(a, b int) int` — basic function
- `divide(a, b int) (int, error)` — multiple returns (result + error)
- `sum(nums ...int) int` — variadic sum
- Use a closure to create an operation counter
- Use recursion to implement factorial

```go
package main

import (
    "errors"
    "fmt"
)

func add(a, b int) int {
    return a + b
}

func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

func factorial(n int) int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n-1)
}

func main() {
    fmt.Println(add(10, 5))
    fmt.Println(divide(10, 2))
    fmt.Println(sum(1, 2, 3, 4, 5))
    fmt.Println(factorial(5))
}
```

## Prerequisites

- Week 3: Control flow (if, for, switch, defer)
