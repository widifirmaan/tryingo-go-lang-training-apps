# Variabel, Tipe & Konstanta

> Go | Modul 2

## Tujuan Pembelajaran

- Mendeklarasikan variabel dengan var dan :=
- Mengenal tipe dasar: int, float64, string, bool
- Memahami zero values dan type inference
- Membuat konstanta dengan const dan iota
- Menggunakan fmt.Print, Println, Printf

---

## Program: Data Diri

```go
package main

import "fmt"

func main() {
    // var declaration
    var name string = "Budi"
    var age int = 25
    var height float64 = 175.5

    // short declaration
    city := "Jakarta"
    isStudent := false

    // Zero values
    var zeroInt int
    var zeroStr string
    var zeroBool bool

    fmt.Println("=== Variabel ===")
    fmt.Printf("Nama: %s, Umur: %d, Tinggi: %.1f\n", name, age, height)
    fmt.Printf("Kota: %s, Pelajar: %t\n", city, isStudent)

    fmt.Println("\n=== Zero Values ===")
    fmt.Printf("int: %d, string: %q, bool: %t\n", zeroInt, zeroStr, zeroBool)

    // Constants
    const pi = 3.14159
    const greeting = "Halo Go!"

    // iota
    const (
        Red = iota
        Green
        Blue
    )
    fmt.Printf("\nKonstanta: %s, Pi = %.5f\n", greeting, pi)
    fmt.Printf("Warna: Red=%d, Green=%d, Blue=%d\n", Red, Green, Blue)
}
```

---

## Penjelasan

`var nama tipe = nilai` untuk deklarasi eksplisit. `:=` untuk short declaration dengan type inference. Tipe dasar: `int`, `float64`, `string`, `bool`. Zero values: 0 untuk numerik, "" untuk string, false untuk bool. `const` untuk konstanta. `iota` untuk increment otomatis dalam blok const.

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

Modul 2 dari 16: **Variabel, Tipe & Konstanta**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **3. Control Flow: if, for, switch**.
