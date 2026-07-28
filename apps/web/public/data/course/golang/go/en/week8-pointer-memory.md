# Pointers & Memory Model

> Go | Module 8

## Learning Objectives

- Understand & and * operators
- Distinguish pass by value vs pointer
- Use pointers to structs
- Understand stack vs heap
- Apply nil safety

---

## Program: Value Manipulation

```go
package main

import "fmt"

func zeroVal(val int) {
    val = 0
}

func zeroPtr(ptr *int) {
    *ptr = 0
}

type Person struct {
    Name string
    Age  int
}

func updatePerson(p *Person) {
    p.Age = 30
}

func main() {
    x := 42
    fmt.Printf("Nilai x: %d\n", x)
    fmt.Printf("Alamat x: %p\n", &x)

    // Pass by value
    zeroVal(x)
    fmt.Println("Setelah zeroVal:", x) // masih 42

    // Pass by pointer
    zeroPtr(&x)
    fmt.Println("Setelah zeroPtr:", x) // 0

    // Pointer ke struct
    p := Person{Name: "Budi", Age: 25}
    updatePerson(&p)
    fmt.Printf("%s berumur %d\n", p.Name, p.Age)

    // new function
    num := new(int)
    *num = 100
    fmt.Println("Melalui new:", *num)

    // Nil safety
    var ptr *int
    if ptr != nil {
        fmt.Println(*ptr)
    } else {
        fmt.Println("Pointer nil, aman")
    }
}
```

---

## Explanation

`&` takes the memory address, `*` accesses the value at an address. Go is pass by value — functions get a copy. Pointers allow modifying the original. Stack for small locals, heap for shared data. Nil pointers must be checked before dereferencing.

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

Module 8 of 16: **Pointers & Memory Model**. Go delivers high performance with simple syntax. Next week: **Packages & Modules**.
