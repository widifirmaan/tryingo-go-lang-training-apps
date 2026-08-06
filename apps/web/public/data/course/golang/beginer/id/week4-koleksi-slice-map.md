# Koleksi: Slice, Map & String

> **Kategori:** Go | **Level:** Pemula | **Minggu 4:** Koleksi: Slice, Map & String

## Tujuan Pembelajaran

- Membedakan array fixed-size [N]T vs slice dinamis []T
- Menggunakan append, make, len, cap untuk manipulasi slice
- Map: map[string]int dengan ok idiom untuk cek keberadaan
- Manipulasi string: TrimSpace, ReplaceAll, Fields, Split
- Iterasi dengan range pada slice, map, dan string

---

## Program: Manajemen Data

```go
package main

import "fmt"

func main() {
    fruits := []string{"apel", "mangga", "pisang"}
    fruits = append(fruits, "jeruk")
    fmt.Println("Slice:", fruits)
    fmt.Printf("Len: %d, Cap: %d\n", len(fruits), cap(fruits))

    angka := []int{10, 20, 30, 40, 50}
    sub := angka[1:4]
    fmt.Println("Sub-slice [1:4]:", sub)

    ages := make(map[string]int)
    ages["Budi"] = 25
    ages["Siti"] = 23

    val, ok := ages["Budi"]
    if ok {
        fmt.Printf("Umur Budi: %d\n", val)
    }

    delete(ages, "Siti")

    text := "  Go Programming Language  "
    fmt.Println("Trimmed:", len(text), "->", len(text))
    fmt.Println("Fields:", len(text))

    fmt.Println("\n=== Range ===")
    for i, v := range fruits {
        fmt.Printf("%d: %s\n", i, v)
    }
    for key, val := range ages {
        fmt.Printf("%s -> %d\n", key, val)
    }
}
```

---

## Konsep Kunci

### Slice vs Array
Array fixed-size, slice dynamic (backbone Go). `append`, `make`, `len`, `cap`.

### Map
`map[string]int` dengan ok idiom: `val, ok := m["key"]`.

### String & Range
`TrimSpace`, `ReplaceAll`, `Fields`, `Split`. `for i, v := range slice`.

---

## Eksperimen

- Buat slice 2D (matrix) dan iterasi dengan nested range
- Tambah dan hapus multiple key di map
- Coba strings.HasPrefix, HasSuffix, Contains
- Urutkan slice dengan sort.Strings

---

## Tantangan

Buat program inventory: tambah/hapus produk (map), daftar produk (slice), cari produk (range + if).

---

## Ringkasan

Minggu 4 dari 13: **Koleksi: Slice, Map & String** (Level: Pemula). Struktur data harian Go. Minggu depan: **Struct & Method**.
