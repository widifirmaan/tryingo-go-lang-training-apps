# Interfaces & Packages

> Category: Go, Programming Language | Level: Beginner | Week 6

## Learning Objectives

- Define interfaces with implicit satisfaction
- Use interfaces as function parameters
- Apply empty interfaces (any)
- Perform type assertions and type switches
- Understand composition with embedding

---

## Program: Polimorfisme

```go
package main

import "fmt"

type Greeter interface { Greet() string }

type Indonesian struct{ Name string }
func (i Indonesian) Greet() string { return "Halo, " + i.Name }

type English struct{ Name string }
func (e English) Greet() string { return "Hello, " + e.Name }

func greet(g Greeter) { fmt.Println(g.Greet()) }

func printAnything(v any) { fmt.Printf("Value: %v, Type: %T\n", v, v) }

func identify(v any) {
    switch t := v.(type) {
    case int: fmt.Println("This is an int:", t*2)
    case string: fmt.Println("This is a string:", len(t), "chars")
    default: fmt.Println("Other type:", t)
    }
}

func main() {
    greet(Indonesian{Name: "Budi"})
    greet(English{Name: "John"})
    printAnything(42)
    printAnything("Hello")
    printAnything(3.14)
    identify(10)
    identify("Go")
    identify(true)
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Interfaces

Interfaces = **behavioral contracts**. Go implements **implicitly** -- struct just needs matching methods.

`type Greeter interface { Greet() string }` -- any struct with `Greet() string` is a Greeter.

### Empty Interface (`any`)

`any` holds any type. Useful for generic functions.

### Type Switch

`v.(type)` inside `switch` checks actual type of an interface value.

---

## Experiments

Try modifying the code:

1. **Add new language** -- create `French` struct with Greet()
2. **Print anything** -- call `printAnything` with `[]int{1,2,3}`
3. **Type assertion** -- call `identify` with `3.14`

---

## Challenge

Create `Shape` interface with `Area() float64`. Implement for `Circle` (Radius) and `Rectangle` (Width, Height). Function accepts slice of Shape.

---

## Summary

Go interfaces are implicit without `implements`. Flexible polymorphism. `any` and type switches. Embedding for composition. Next week: defer, panic, file I/O.
