# Package & Module

> Go | Modul 9

## Tujuan Pembelajaran

- Membuat package dan module sendiri
- Mengatur visibility (exported/unexported)
- Menggunakan go.mod dan go.sum
- Mengimpor package eksternal
- Mengelola dependencies

---

## Program: Struktur Proyek

```go
package main

import (
    "fmt"
    "math"
    "strings"
)

// Exported function (huruf besar)
func Greet(name string) string {
    return "Hello, " + name + "!"
}

// Unexported function (huruf kecil)
func formatNumber(n float64) string {
    return fmt.Sprintf("%.2f", n)
}

func main() {
    // Menggunakan package math
    fmt.Println("Pi:", math.Pi)
    fmt.Println("Sin(0):", math.Sin(0))
    fmt.Println("Sqrt(16):", math.Sqrt(16))

    // Menggunakan package strings
    text := "Go Programming Language"
    fmt.Println("Upper:", strings.ToUpper(text))
    fmt.Println("Contains 'Go':", strings.Contains(text, "Go"))
    fmt.Println("Split:", strings.Split(text, " "))

    // Package sendiri
    msg := Greet("Budi")
    fmt.Println(msg)

    // Unexported — hanya bisa dipakai dalam package yang sama
    fmt.Println("Formatted:", formatNumber(3.14159))

    // go.mod example (simulated)
    fmt.Println("\nModule: contoh-module")
    fmt.Println("Go version: go 1.22")
}
```

---

## Penjelasan

Setiap file Go milik sebuah package. Huruf besar = exported (public), huruf kecil = unexported (private). `go mod init nama-module` memulai module. `go mod tidy` membersihkan dependencies. Package standard seperti `fmt`, `strings`, `math`, `time` sudah built-in.

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

Modul 9 dari 16: **Package & Module**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **10. Goroutine & WaitGroup**.
