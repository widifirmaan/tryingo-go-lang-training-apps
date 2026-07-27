# Introduction to Go & Toolchain

> Category: Go, Programming Language | Level: Beginner | Week 1

## Learning Objectives

- Understand compiled vs interpreted languages
- Install Go and write your first program
- Learn the toolchain: go run, build, fmt, test
- Understand .go file structure and func main
- Distinguish exported vs unexported names

---

## Program: Halo Dunia

```go
package main

import "fmt"

func main() {
    fmt.Println("Welcome to Go!")
    fmt.Println("Your first Go program.")

    var name string = "Gopher"
    var version float64 = 1.24
    var active bool = true

    year := 2009
    message := "Go is an open-source language"

    fmt.Println("Name:", name)
    fmt.Println("Version:", version)
    fmt.Println("Active:", active)
    fmt.Println("Release year:", year)
    fmt.Println("Message:", message)
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Go Program Structure

Every .go file starts with `package main`. The `main()` function is the entry point.

`import "fmt"` brings the fmt package for formatted I/O. `fmt.Println()` prints text with a newline.

### Variables

Two declaration styles: **explicit** (`var name string = "Gopher"`) and **short declaration** (`year := 2009`). Go infers the type.

### Exported vs Unexported

**Capital letter = public (exported)**, lowercase = private. `fmt.Println` works because `Println` starts with a capital letter.

---

## Experiments

Try modifying the code:

1. **Change `name`** -- replace "Gopher" with your name
2. **Add a variable** -- declare `city := "Jakarta"` and print it
3. **Change `active`** -- set to `false` and see the difference

---

## Challenge

Create a program that prints a short bio: name, age, city, and hobby. Use different variable types (`string`, `int`, `bool`).

---

## Summary

Go combines ease of use with high performance. Toolchain: `go run` for dev, `go build` for production, `go fmt` for consistency. Next week: variables, data types, control flow.
