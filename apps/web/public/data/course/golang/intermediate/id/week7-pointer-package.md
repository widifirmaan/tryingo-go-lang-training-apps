# Pointer, Memory & Package

> **Kategori:** Go | **Level:** Menengah | **Minggu 7:** Pointer, Memory & Package

## Tujuan Pembelajaran

- Memahami operator & (address-of) dan * (dereference)
- Pass by value vs pass by pointer — kapan pakai pointer
- Membuat package sendiri dan struktur folder proyek
- Visibility: huruf besar = exported, huruf kecil = unexported
- go.mod: module path, go mod init, go mod tidy

---

## Program: Struktur Proyek

```go
package main

import (
    "fmt"
    "math"
    "strings"
)

func Greet(name string) string {
    return "Hello, " + name + "!"
}

func formatNumber(n float64) string {
    return fmt.Sprintf("%.2f", n)
}

func main() {
    x := 42
    p := &x
    fmt.Printf("x=%d, *p=%d\n", x, *p)
    *p = 21
    fmt.Printf("After *p=21: x=%d\n", x)

    fmt.Println("Pi:", math.Pi)
    fmt.Println("Sqrt(16):", math.Sqrt(16))

    text := "Go Programming Language"
    fmt.Println("Upper:", strings.ToUpper(text))
    fmt.Println("Contains 'Go':", strings.Contains(text, "Go"))

    msg := Greet("Budi")
    fmt.Println(msg)
    fmt.Println("Formatted:", formatNumber(3.14159))

    fmt.Println("\nModule: contoh-module")
    fmt.Println("Go version: go 1.22")
}
```

---

## Konsep Kunci

### Pointer
`&` address-of, `*` dereference. Pass by value vs pointer.

### Package & Visibility
Huruf besar = exported, kecil = unexported.

### go.mod
`go mod init`, `go mod tidy` untuk dependency management.

---

## Eksperimen

- Buat fungsi swap dengan pointer — swap dua variabel
- Coba package dengan multiple files
- Buat internal package dan coba import dari luar
- Tambah dependency eksternal dengan go get

---

## Tantangan

Buat library geometri sebagai package terpisah: Circle, Rectangle dengan method Area dan Perimeter. Gunakan pointer receiver.

---

## Ringkasan

Minggu 7 dari 13: **Pointer, Memory & Package** (Level: Menengah). Organisasi kode profesional. Minggu depan: **Goroutine & Channel**.
