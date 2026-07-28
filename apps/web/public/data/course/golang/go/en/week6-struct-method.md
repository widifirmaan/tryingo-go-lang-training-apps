# Structs & Methods

> Go | Module 6

## Learning Objectives

- Define structs with fields
- Add value and pointer receiver methods
- Use embedded fields
- Apply struct tags
- Create constructor functions

---

## Program: Product Data

```go
package main

import "fmt"

// Struct definition
type Product struct {
    ID    int
    Name  string
    Price float64
    Stock int
}

// Value receiver method
func (p Product) Info() string {
    return fmt.Sprintf("%s: Rp%.0f (stok: %d)", p.Name, p.Price, p.Stock)
}

// Pointer receiver method
func (p *Product) ApplyDiscount(percent float64) {
    p.Price -= p.Price * (percent / 100)
}

// Embedded struct
type Electronics struct {
    Product
    WarrantyYears int
}

// Constructor
func NewProduct(id int, name string, price float64) *Product {
    return &Product{ID: id, Name: name, Price: price, Stock: 0}
}

func main() {
    p1 := Product{ID: 1, Name: "Laptop", Price: 15000000, Stock: 10}
    fmt.Println(p1.Info())

    p1.ApplyDiscount(10)
    fmt.Println("Setelah diskon:", p1.Info())

    laptop := Electronics{
        Product:       Product{ID: 2, Name: "Laptop Pro", Price: 20000000, Stock: 5},
        WarrantyYears: 3,
    }
    fmt.Println(laptop.Info())
    fmt.Printf("Garansi: %d tahun\n", laptop.WarrantyYears)

    p2 := NewProduct(3, "Mouse", 250000)
    fmt.Println(p2.Info())
}
```

---

## Explanation

Structs group related fields. Methods: functions with receivers — value receivers don't modify the struct, pointer receivers can. Embedded fields for composition (Go has no inheritance). Struct tags provide metadata for encoding. Constructor functions return pointers.

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

Module 6 of 16: **Structs & Methods**. Go delivers high performance with simple syntax. Next week: **Interfaces & Generics**.
