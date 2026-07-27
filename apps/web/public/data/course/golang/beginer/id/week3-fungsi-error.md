# Fungsi & Error Handling

> Kategori: Go, Bahasa Pemrograman | Level: Pemula | Week 3

## Tujuan Pembelajaran

- Membuat fungsi dengan parameter dan return value
- Menggunakan multiple return values dan named returns
- Mengenal tipe error dan pola if err != nil
- Membuat error dengan fmt.Errorf
- Menulis fungsi variadic

---

## Program: Kalkulator

```go
package main

import (
    "fmt"
    "errors"
)

func sapa(nama string) string {
    return "Halo, " + nama
}

func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa membagi dengan nol")
    }
    return a / b, nil
}

func jumlahkan(angka ...int) (total int) {
    for _, n := range angka {
        total += n
    }
    return
}

func main() {
    fmt.Println(sapa("Budi"))

    hasil, err := bagi(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Println("10 / 2 =", hasil)
    }

    _, err = bagi(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }

    fmt.Println("1+2+3+4+5 =", jumlahkan(1, 2, 3, 4, 5))
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Fungsi

Fungsi dengan `func`. Parameter: `nama tipe`. Return type di akhir.

**Multiple return**: `func bagi(a, b float64) (float64, error)` -- pola result + error.

**Named return**: `func jumlahkan(...) (total int)` -- variabel `total` otomatis di-return.

### Error Handling

Go tidak pakai exception. Error dikembalikan sebagai nilai. Pola idiomatis: `if err != nil { return err }`.

### Variadic

`func jumlahkan(angka ...int)` -- jumlah argumen tidak tetap.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah argumen `jumlahkan`** -- coba deret Fibonacci: `1, 1, 2, 3, 5, 8`
2. **Bagi dengan 0** -- coba `bagi(1, 0)` dan lihat error
3. **Buat fungsi baru** -- `kali(a, b int) int` yang mengalikan

---

## Tantangan

Buat fungsi `hitungRataRata(angka ...float64) (float64, error)` yang mengembalikan rata-rata. Error jika slice kosong.

---

## Ringkasan

Fungsi Go dengan multiple return values -- pola result+error. Named returns dan variadic function. Error handling: `if err != nil`. Minggu depan: array, slice, map.
