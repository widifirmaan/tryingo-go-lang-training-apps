# Interfaces & Generics

> Go | Module 7

## Learning Objectives

- Define interfaces with implicit satisfaction
- Use interfaces as parameters
- Apply empty interfaces (any)
- Perform type assertions and type switches
- Use generics with type parameters

---

## Program: Polymorphism

```go
package main

import "fmt"

// Interface definition — implemented implicitly
type Speaker interface {
    Speak() string
}

type Dog struct{ Name string }
func (d Dog) Speak() string { return "Woof! I'm " + d.Name }

type Cat struct{ Name string }
func (c Cat) Speak() string { return "Meow! I'm " + c.Name }

// Interface as parameter
func MakeSound(s Speaker) {
    fmt.Println(s.Speak())
}

// Empty interface (any)
func PrintAny(v any) {
    switch val := v.(type) {
    case int:
        fmt.Printf("Integer: %d\n", val)
    case string:
        fmt.Printf("String: %s\n", val)
    default:
        fmt.Printf("Unknown: %T - %v\n", val, val)
    }
}

// Generics
func First[T any](items []T) T {
    return items[0]
}

type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func main() {
    MakeSound(Dog{"Buddy"})
    MakeSound(Cat{"Kitty"})

    PrintAny(42)
    PrintAny("hello")
    PrintAny(3.14)

    fmt.Println("First int:", First([]int{10, 20, 30}))
    fmt.Println("First string:", First([]string{"a", "b"}))

    stack := Stack[string]{}
    stack.Push("Go")
    stack.Push("Rust")
    fmt.Println("Stack:", stack.items)
}
```

---

## Explanation

Go interfaces are implicit — a struct just needs to implement the methods without an `implements` keyword. Empty interface `any` can hold any type. Type assertion `x.(T)` and type switch check concrete types. Generics (Go 1.18+) make functions and types reusable with type parameters.

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

Module 7 of 16: **Interfaces & Generics**. Go delivers high performance with simple syntax. Next week: **Pointers & Memory Model**.
