# Variabel, Tipe Data & Control Flow

> Kategori: Go, Bahasa Pemrograman | Level: Pemula | Week 2

## Tujuan Pembelajaran

- Mendeklarasikan variabel dengan var dan :=
- Mengenal tipe dasar: int, float64, string, bool
- Menggunakan perulangan for
- Menerapkan if/else dan switch tanpa break
- Memahami zero values dan konstanta

---

## Program: Data Diri

```go
package main

import "fmt"

func main() {
    var namaDepan string = "Budi"
    var usia int = 25
    tinggi := 175.5
    var menikah bool

    fmt.Println("Nama:", namaDepan)
    fmt.Println("Usia:", usia)
    fmt.Println("Tinggi:", tinggi, "cm")
    fmt.Println("Menikah:", menikah)

    const phi = 3.14159
    fmt.Println("Phi:", phi)

    fmt.Print("Angka: ")
    for i := 1; i <= 5; i++ {
        fmt.Print(i, " ")
    }
    fmt.Println()

    nilai := 85
    if nilai >= 90 {
        fmt.Println("Grade: A")
    } else if nilai >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    hari := "Senin"
    switch hari {
    case "Sabtu", "Minggu":
        fmt.Println("Akhir pekan")
    default:
        fmt.Println("Hari kerja")
    }
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Variabel dan Tipe Data

Go **statically typed** -- tipe ditentukan di compile time. `string`, `int`, `float64`, `bool` adalah tipe dasar.

**Zero values**: variabel tanpa nilai awal punya default: `0` untuk int, `""` untuk string, `false` untuk bool.

### Konstanta dan Perulangan

`const phi = 3.14159` -- nilai tetap. Go hanya punya `for` -- format: `for init; kondisi; increment`.

### if/else dan switch

`if` dan `switch` tanpa kurung. `switch` di Go tidak perlu `break` -- hanya satu case yang dieksekusi.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah `nilai`** -- coba 92, 70, 45 dan lihat grade berbeda
2. **Tambah case switch** -- tambahkan "Jumat" sebagai akhir pekan
3. **Ganti `hari`** -- coba "Sabtu" dan lihat output berubah

---

## Tantangan

Buat program kalkulator suhu: input Celsius, output Fahrenheit, Reamur, dan Kelvin. Gunakan `const` untuk rumus konversi.

---

## Ringkasan

Go menggunakan tipe statis dengan type inference. Hanya `for` untuk perulangan. `switch` tanpa `break`. Zero values membuat kode lebih aman. Minggu depan: fungsi dan error handling.
