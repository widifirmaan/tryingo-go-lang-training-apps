# Interface & Package

> Kategori: Go, Bahasa Pemrograman | Level: Pemula | Week 6

## Tujuan Pembelajaran

- Mendefinisikan interface implisit
- Menggunakan interface sebagai parameter fungsi
- Menerapkan empty interface (any)
- Melakukan type assertion dan type switch
- Memahami composition dengan embedding

---

## Program: Polimorfisme

```go
package main

import "fmt"

type Greeter interface {
    Greet() string
}

type Indonesia struct {
    Nama string
}

func (i Indonesia) Greet() string {
    return "Halo, " + i.Nama
}

type Inggris struct {
    Nama string
}

func (i Inggris) Greet() string {
    return "Hello, " + i.Nama
}

func sambut(g Greeter) {
    fmt.Println(g.Greet())
}

func cetakApapun(v any) {
    fmt.Printf("Nilai: %v, Tipe: %T\n", v, v)
}

func identifikasi(v any) {
    switch t := v.(type) {
    case int:
        fmt.Println("Ini integer:", t*2)
    case string:
        fmt.Println("Ini string:", len(t), "karakter")
    default:
        fmt.Println("Tipe lain:", t)
    }
}

func main() {
    sambut(Indonesia{Nama: "Budi"})
    sambut(Inggris{Nama: "John"})

    cetakApapun(42)
    cetakApapun("Halo")
    cetakApapun(3.14)

    identifikasi(10)
    identifikasi("Go")
    identifikasi(true)
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Interface

Interface = **kontrak perilaku**. Di Go, implementasi **implisit** -- struct cukup memiliki method yang sesuai.

`type Greeter interface { Greet() string }` -- struct dengan method `Greet() string` otomatis menjadi Greeter.

### Empty Interface (`any`)

`any` bisa menampung tipe apapun. Berguna untuk fungsi generik.

### Type Switch

`v.(type)` di dalam `switch` memeriksa tipe asli dari nilai interface.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah bahasa baru** -- buat struct `Sunda` dengan Greet() sendiri
2. **Cetak apapun** -- panggil `cetakApapun` dengan `[]int{1,2,3}`
3. **Type assertion** -- panggil `identifikasi` dengan `3.14`

---

## Tantangan

Buat interface `Shape` dengan `Area() float64`. Implementasi untuk `Circle` (Radius) dan `Rectangle` (Width, Height). Fungsi menerima slice of Shape.

---

## Ringkasan

Interface Go bersifat implisit tanpa `implements`. Polimorfisme fleksibel. `any` dan type switch. Embedding untuk komposisi. Minggu depan: defer, panic, file I/O.
