# Packages & Modules

> Go | Module 9

## Learning Objectives

- Create your own packages and modules
- Manage visibility (exported/unexported)
- Use go.mod and go.sum
- Import external packages
- Manage dependencies

---

## Program: Project Structure

```go
package main

import (
    "fmt"
    "math"
    "strings"
)

// Exported function (huruf besar)
func Greet(name string) string {
    return "Hello, " + name + "!"
}

// Unexported function (huruf kecil)
func formatNumber(n float64) string {
    return fmt.Sprintf("%.2f", n)
}

func main() {
    // Menggunakan package math
    fmt.Println("Pi:", math.Pi)
    fmt.Println("Sin(0):", math.Sin(0))
    fmt.Println("Sqrt(16):", math.Sqrt(16))

    // Menggunakan package strings
    text := "Go Programming Language"
    fmt.Println("Upper:", strings.ToUpper(text))
    fmt.Println("Contains 'Go':", strings.Contains(text, "Go"))
    fmt.Println("Split:", strings.Split(text, " "))

    // Package sendiri
    msg := Greet("Budi")
    fmt.Println(msg)

    // Unexported — hanya bisa dipakai dalam package yang sama
    fmt.Println("Formatted:", formatNumber(3.14159))

    // go.mod example (simulated)
    fmt.Println("\nModule: contoh-module")
    fmt.Println("Go version: go 1.22")
}
```

---

## Explanation

Every Go file belongs to a package. Uppercase = exported (public), lowercase = unexported (private). `go mod init module-name` starts a module. `go mod tidy` cleans up dependencies. Standard packages like `fmt`, `strings`, `math`, `time` are built-in.

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

Module 9 of 16: **Packages & Modules**. Go delivers high performance with simple syntax. Next week: **Goroutines & WaitGroups**.
