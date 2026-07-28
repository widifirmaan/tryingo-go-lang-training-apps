# Fungsi & Error Handling

> Go | Modul 4

## Tujuan Pembelajaran

- Membuat fungsi dengan parameter dan return
- Menggunakan multiple return dan named return
- Mengenal tipe error dan error handling idiom
- Membuat custom error dengan fmt.Errorf
- Menulis fungsi variadic dan defer

---

## Program: Kalkulator

```go
package main

import (
    "errors"
    "fmt"
)

// Fungsi dengan multiple return
func bagi(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("tidak bisa dibagi nol")
    }
    return a / b, nil
}

// Named return
func hitung(a, b int) (jumlah int, kali int) {
    jumlah = a + b
    kali = a * b
    return // naked return
}

// Variadic function
func rataRata(angka ...float64) float64 {
    total := 0.0
    for _, n := range angka {
        total += n
    }
    return total / float64(len(angka))
}

// Defer
func main() {
    defer fmt.Println("Program selesai")

    // Error handling
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

    // Named return
    j, k := hitung(4, 5)
    fmt.Printf("Jumlah: %d, Kali: %d\n", j, k)

    // Variadic
    r := rataRata(80, 90, 75, 85)
    fmt.Printf("Rata-rata: %.1f\n", r)
}
```

---

## Penjelasan

Fungsi Go bisa multiple return values. Error handling idiomatis: `if err != nil { return err }`. `fmt.Errorf` dengan `%w` untuk wrapping error. `defer` dipakai untuk cleanup (tutup file, unlock mutex). Variadic function: `func sum(nums ...int)`. Named return memudahkan dokumentasi.

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

Modul 4 dari 16: **Fungsi & Error Handling**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **5. Array, Slice & Map**.
