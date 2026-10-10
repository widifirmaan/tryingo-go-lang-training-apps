# Variabel, Tipe & Control Flow

> **Kategori:** Go | **Level:** Pemula | **Minggu 2:** Variabel, Tipe & Control Flow

## Tujuan Pembelajaran

- Mendeklarasikan variabel dengan var dan := (short declaration)
- Mengenal tipe dasar: int, float64, string, bool, rune
- Memahami zero values dan type inference (Go Tour: Zero Values)
- Menerapkan if/else dengan short statement dan for loop 3 bentuk
- Menggunakan switch tanpa break — case berhenti otomatis (Effective Go)

---

## Program: Bilangan & Grade

```go
package main

import "fmt"

func main() {
    var name string = "Budi"
    age := 25
    height := 175.5
    fmt.Printf("Nama: %s, Umur: %d, Tinggi: %.1f\n", name, age, height)

    var zeroInt int
    var zeroStr string
    var zeroBool bool
    fmt.Printf("Zero: int=%d, str=%q, bool=%t\n", zeroInt, zeroStr, zeroBool)

    score := 85
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    fmt.Print("For: ")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    n := 1
    fmt.Print("While: ")
    for n <= 3 {
        fmt.Printf("%d ", n)
        n++
    }
    fmt.Println()

    day := 3
    switch day {
    case 1: fmt.Println("Senin")
    case 2: fmt.Println("Selasa")
    case 3: fmt.Println("Rabu")
    default: fmt.Println("Hari lain")
    }

    x := 10
    switch {
    case x < 10: fmt.Println("Kecil")
    case x == 10: fmt.Println("Tepat 10")
    default: fmt.Println("Besar")
    }
}
```

---

## Konsep Kunci

### Variabel & Tipe
`var` eksplisit, `:=` short declaration dengan inference. Zero values: 0, "", false.

### Control Flow
- if dengan short statement: `if x := 10; x > 5 {}`
- for 3 bentuk: classic, while-style, infinite
- switch tanpa break — case otomatis berhenti
- tagless switch untuk kondisi kompleks

---

## Eksperimen

- Ubah nilai score dan lihat grade berubah
- Tambah nested if untuk validasi
- Buat for loop dengan break pada kondisi tertentu
- Ganti switch dengan if/else — mana yang lebih readable?

---

## Tantangan

Buat program konversi suhu (Celsius ↔ Fahrenheit ↔ Kelvin) dengan menu pilihan menggunakan switch. Validasi input dengan if.

---

## Ringkasan

Minggu 2 dari 13: **Variabel, Tipe & Control Flow** (Level: Pemula). Dasar yang harus dikuasai sebelum lanjut. Minggu depan: **Fungsi & Error Handling**.
