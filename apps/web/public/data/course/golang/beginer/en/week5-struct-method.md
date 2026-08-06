# Structs & Methods

> **Kategori:** Go | **Level:** Beginner | **Minggu 5:** Structs & Methods

## Learning Objectives

- Define structs with fields and named types
- Methods: value receiver vs pointer receiver (Go Tour: Methods)
- Embedded fields for composition (Go has no inheritance)
- Struct tags: `json:"name"` for encoding metadata
- Constructor functions: NewT() *T pattern

---

## Program: Product Data

```go
package main

import "fmt"

type Product struct {
    ID    int
    Name  string
    Price float64
    Stock int
}

func (p Product) Info() string {
    return fmt.Sprintf("%s: Rp%.0f (stok: %d)", p.Name, p.Price, p.Stock)
}

func (p *Product) ApplyDiscount(percent float64) {
    p.Price -= p.Price * (percent / 100)
}

type Electronics struct {
    Product
    WarrantyYears int
}

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

## Key Concepts

### Structs
Group fields. Value vs pointer receiver.

### Embedding
Composition over inheritance.

### Constructors & Tags
`NewT() *T`. Tags: `json:"name"`.

---

## Experiments

- Add Discount method for Electronics
- Try changing value receiver to pointer — what's the effect?
- Create new struct with embedded Product
- Add struct tag `json:"price"` and try Marshal

---

## Challenge

Build a store system: struct Product, Cart, Customer. Methods: AddToCart, Checkout, ApplyDiscount. Use constructors.

---

## Summary

Week 5 of 13: **Structs & Methods** (Level: Beginner). Beginner phase complete! Next week: **Interfaces & Generics** (Intermediate).
