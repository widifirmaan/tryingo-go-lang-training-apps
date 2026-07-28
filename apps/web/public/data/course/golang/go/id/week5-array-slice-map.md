# Array, Slice & Map

> Go | Modul 5

## Tujuan Pembelajaran

- Membedakan array fixed vs slice dinamis
- Menggunakan append, make, len, cap
- Memanipulasi map dengan ok idiom
- Mengiterasi dengan range
- Melakukan slicing dan copy

---

## Program: Manajemen Data

```go
package main

import "fmt"

func main() {
    // Array (fixed size)
    var arr [3]int = [3]int{1, 2, 3}
    fmt.Println("Array:", arr)

    // Slice (dynamic)
    fruits := []string{"apel", "mangga", "pisang"}
    fruits = append(fruits, "jeruk")
    fmt.Println("Slice:", fruits)
    fmt.Printf("Len: %d, Cap: %d\n", len(fruits), cap(fruits))

    // Make slice
    scores := make([]int, 3, 5)
    scores[0] = 85
    scores[1] = 90
    scores[2] = 78
    fmt.Println("Scores:", scores)

    // Slicing
    angka := []int{10, 20, 30, 40, 50}
    sub := angka[1:4]
    fmt.Println("Sub-slice [1:4]:", sub)

    // Map
    ages := make(map[string]int)
    ages["Budi"] = 25
    ages["Siti"] = 23

    // ok idiom
    val, ok := ages["Budi"]
    if ok {
        fmt.Printf("Umur Budi: %d\n", val)
    }

    // Delete
    delete(ages, "Siti")

    // Range
    fmt.Println("\n=== Range ===")
    for i, v := range fruits {
        fmt.Printf("%d: %s\n", i, v)
    }

    for key, val := range ages {
        fmt.Printf("%s -> %d\n", key, val)
    }
}
```

---

## Penjelasan

Array: `[3]int` — fixed size, jarang langsung dipakai. Slice: `[]int` — dynamic, backbone Go. `append` untuk menambah, `make` untuk alokasi. Map: `map[string]int` — key-value, dengan ok idiom untuk cek keberadaan. `range` untuk iterasi slice, map, channel.

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

Modul 5 dari 16: **Array, Slice & Map**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **6. Struct & Method**.
