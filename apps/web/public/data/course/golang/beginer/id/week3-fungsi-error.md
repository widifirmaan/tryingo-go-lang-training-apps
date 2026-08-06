# Fungsi & Error Handling

> **Kategori:** Go | **Level:** Pemula | **Minggu 3:** Fungsi & Error Handling

## Tujuan Pembelajaran

- Membuat fungsi dengan parameter dan return value
- Multiple return values dan named return (Go Tour: Functions)
- Mengenal tipe error dan idiom: if err != nil { return err }
- Membuat custom error dengan fmt.Errorf dan %w wrapping
- Defer untuk cleanup, variadic function func(nums ...int)

---

## Program: Kalkulator

```go
package main

import (
    "errors"
    "fmt"
)

func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa dibagi nol")
    }
    return a / b, nil
}

func hitung(a, b int) (jumlah int, kali int) {
    jumlah = a + b
    kali = a * b
    return
}

func rataRata(angka ...float64) float64 {
    total := 0.0
    for _, n := range angka {
        total += n
    }
    return total / float64(len(angka))
}

func main() {
    defer fmt.Println("Program selesai")

    hasil, err := bagi(10, 2)
    if err != nil {
        fmt.Println("Error:", err)
    } else {
        fmt.Printf("10 / 2 = %.1f\n", hasil)
    }

    _, err = bagi(5, 0)
    if err != nil {
        fmt.Println("Error:", err)
    }

    j, k := hitung(4, 5)
    fmt.Printf("Jumlah: %d, Kali: %d\n", j, k)

    r := rataRata(80, 90, 75, 85)
    fmt.Printf("Rata-rata: %.1f\n", r)
}
```

---

## Konsep Kunci

### Fungsi
Multiple return values, named return, variadic `func(nums ...int)`.

### Error Handling
Idiom: `if err != nil { return err }`. `fmt.Errorf` dengan `%w` untuk wrapping.

### Defer
Dijadwalkan setelah fungsi selesai (LIFO). Dipakai untuk cleanup.

---

## Eksperimen

- Tambah fungsi baru: pangkat(a, b float64)
- Buat custom error dengan struct sendiri
- Coba defer multiple — perhatikan urutan LIFO
- Ubah rataRata untuk handle slice kosong

---

## Tantangan

Buat program kalkulator scientific dengan fungsi: tambah, kurang, kali, bagi, pangkat, faktorial. Gunakan error handling untuk validasi.

---

## Ringkasan

Minggu 3 dari 13: **Fungsi & Error Handling** (Level: Pemula). Fondasi menulis kode modular. Minggu depan: **Koleksi: Slice, Map & String**.
