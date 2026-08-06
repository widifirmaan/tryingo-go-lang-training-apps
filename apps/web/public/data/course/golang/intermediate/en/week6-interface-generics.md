# Interfaces & Generics

> **Kategori:** Go | **Level:** Intermediate | **Minggu 6:** Interfaces & Generics

## Learning Objectives

- Implicit interfaces — structs implement without implements keyword
- Interfaces as polymorphic parameters (Go Tour: Interfaces)
- Type assertion x.(T) and type switch for concrete type checks
- Generics Go 1.18+: type parameters [T any], constraints
- Empty interface any / interface{} for any type

---

## Program: Polymorphism

```go
package main

import "fmt"

type Speaker interface {
    Speak() string
}

type Dog struct{ Name string }
func (d Dog) Speak() string { return "Woof! I'm " + d.Name }

type Cat struct{ Name string }
func (c Cat) Speak() string { return "Meow! I'm " + c.Name }

func MakeSound(s Speaker) {
    fmt.Println(s.Speak())
}

func PrintAny(v any) {
    switch val := v.(type) {
    case int: fmt.Printf("Integer: %d\n", val)
    case string: fmt.Printf("String: %s\n", val)
    default: fmt.Printf("Unknown: %T - %v\n", val, val)
    }
}

func First[T any](items []T) T {
    return items[0]
}

type Stack[T any] struct { items []T }
func (s *Stack[T]) Push(item T) { s.items = append(s.items, item) }

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

## Key Concepts

### Implicit Interfaces
No `implement` keyword needed.

### Type Assertion & Switch
`x.(T)` and type switch.

### Generics
`[T any]` type parameters with constraints.

---

## Experiments

- Create Shape interface with Area() — implement Circle, Rectangle
- Try type assertion with ok idiom: v, ok := x.(T)
- Create generic Min[T constraints.Ordered]
- Create generic Map function: Map[T, U]([]T, func(T) U) []U

---

## Challenge

Build a payment system: interface PaymentMethod (ProcessPayment), implement CreditCard, PayPal, BankTransfer. Use generics for repository.

---

## Summary

Week 6 of 13: **Interfaces & Generics** (Level: Intermediate). Go isn't classic OOP — this is its strength. Next week: **Pointers, Memory & Packages**.
