# Struct & Method

> Go | Modul 6

## Tujuan Pembelajaran

- Mendefinisikan struct dengan field
- Menambahkan method value dan pointer receiver
- Menggunakan embedded fields
- Menerapkan struct tags
- Membuat constructor function

---

## Program: Data Produk

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

## Penjelasan

Struct mengelompokkan field terkait. Method: fungsi dengan receiver — value receiver tidak mengubah struct, pointer receiver bisa. Embedded field untuk komposisi (Go tidak punya inheritance). Struct tags memberi metadata untuk encoding. Constructor function mengembalikan pointer.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah fungsi baru dengan tipe return berbeda
- Ganti for loop dengan range
- Coba tipe data yang belum dicoba

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.

---

## Ringkasan

Modul 6 dari 16: **Struct & Method**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **7. Interface & Generik**.
