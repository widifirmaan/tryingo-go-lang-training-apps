# Control Flow: if, for, switch

> Go | Modul 3

## Tujuan Pembelajaran

- Menerapkan if/else dengan short statement
- Menguasai for loop (classic, while, infinite)
- Menggunakan switch tanpa break
- Memahami scope dan block
- Menggunakan label dan break/continue

---

## Program: Bilangan Prima

```go
package main

import "fmt"

func main() {
    // if/else dengan short statement
    score := 85
    if score >= 90 {
        fmt.Println("Grade: A")
    } else if score >= 75 {
        fmt.Println("Grade: B")
    } else {
        fmt.Println("Grade: C")
    }

    // for classic
    fmt.Println("\n=== For Classic ===")
    for i := 1; i <= 5; i++ {
        fmt.Printf("%d ", i)
    }
    fmt.Println()

    // for while-style
    fmt.Println("\n=== For While ===")
    n := 1
    for n <= 3 {
        fmt.Printf("%d ", n)
        n++
    }
    fmt.Println()

    // for infinite + break
    fmt.Println("\n=== Break ===")
    sum := 0
    for {
        sum++
        if sum > 5 {
            break
        }
        fmt.Printf("%d ", sum)
    }
    fmt.Println()

    // switch
    day := 3
    switch day {
    case 1:
        fmt.Println("Senin")
    case 2:
        fmt.Println("Selasa")
    case 3:
        fmt.Println("Rabu")
    default:
        fmt.Println("Hari lain")
    }

    // tagless switch
    x := 10
    switch {
    case x < 10:
        fmt.Println("Kecil")
    case x == 10:
        fmt.Println("Tepat 10")
    default:
        fmt.Println("Besar")
    }
}
```

---

## Penjelasan

`if` bisa punya short statement: `if x := 10; x > 5 {}`. `for` adalah satu-satunya loop di Go — bisa classic, while-style, atau infinite. `switch` tidak perlu `break`; setiap case berhenti otomatis. Tagless switch bisa untuk kondisi kompleks. `defer` menjadwalkan eksekusi fungsi setelah fungsi sekitarnya selesai.

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

Modul 3 dari 16: **Control Flow: if, for, switch**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **4. Fungsi & Error Handling**.
