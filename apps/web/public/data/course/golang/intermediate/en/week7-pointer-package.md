# Pointers, Memory & Packages

> **Kategori:** Go | **Level:** Intermediate | **Minggu 7:** Pointers, Memory & Packages

## Learning Objectives

- Understand & (address-of) and * (dereference) operators
- Pass by value vs pass by pointer — when to use pointers
- Create your own packages and project folder structure
- Visibility: uppercase = exported, lowercase = unexported
- go.mod: module path, go mod init, go mod tidy

---

## Program: Project Structure

```go
package main

import (
    "fmt"
    "math"
    "strings"
)

func Greet(name string) string {
    return "Hello, " + name + "!"
}

func formatNumber(n float64) string {
    return fmt.Sprintf("%.2f", n)
}

func main() {
    x := 42
    p := &x
    fmt.Printf("x=%d, *p=%d\n", x, *p)
    *p = 21
    fmt.Printf("After *p=21: x=%d\n", x)

    fmt.Println("Pi:", math.Pi)
    fmt.Println("Sqrt(16):", math.Sqrt(16))

    text := "Go Programming Language"
    fmt.Println("Upper:", strings.ToUpper(text))
    fmt.Println("Contains 'Go':", strings.Contains(text, "Go"))

    msg := Greet("Budi")
    fmt.Println(msg)
    fmt.Println("Formatted:", formatNumber(3.14159))

    fmt.Println("\nModule: contoh-module")
    fmt.Println("Go version: go 1.22")
}
```

---

## Key Concepts

### Pointers
`&` address-of, `*` dereference.

### Packages & Visibility
Uppercase = exported, lowercase = unexported.

### go.mod
Module management with `go mod init`, `go mod tidy`.

---

## Experiments

- Create swap function with pointers — swap two variables
- Try package with multiple files
- Create internal package and try importing from outside
- Add external dependency with go get

---

## Challenge

Build a geometry library as separate package: Circle, Rectangle with Area and Perimeter methods. Use pointer receivers.

---

## Summary

Week 7 of 13: **Pointers, Memory & Packages** (Level: Intermediate). Professional code organization. Next week: **Goroutines & Channels**.
