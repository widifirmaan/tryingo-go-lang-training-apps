# Struct & Method

> **Kategori:** Go | **Level:** Pemula | **Minggu 5:** Struct & Method

## Tujuan Pembelajaran

- Mendefinisikan struct dengan field dan named types
- Method: value receiver vs pointer receiver (Go Tour: Methods)
- Embedded fields untuk komposisi (Go tidak punya inheritance)
- Struct tags: `json:"name"` untuk metadata encoding
- Constructor function: NewT() *T pattern

---

## Program: Data Produk

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

## Konsep Kunci

### Struct
Mengelompokkan field. Value receiver vs pointer receiver.

### Embedding
Komposisi bukan inheritance. Struct otomatis punya method parent.

### Constructor & Tags
`NewT() *T` pattern. Tag: `json:"name"` untuk metadata.

---

## Eksperimen

- Tambah method Discount untuk Electronics
- Coba ubah value receiver ke pointer — apa efeknya?
- Buat struct baru dengan embedded Product
- Tambah struct tag `json:"price"` dan coba Marshal

---

## Tantangan

Buat sistem toko: struct Product, Cart, Customer. Method: AddToCart, Checkout, ApplyDiscount. Gunakan constructor.

---

## Ringkasan

Minggu 5 dari 13: **Struct & Method** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Interface & Generics** (Intermediate).
