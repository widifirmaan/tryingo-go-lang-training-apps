# Array, Slice & Map

> Kategori: Go, Bahasa Pemrograman | Level: Pemula | Week 4

## Tujuan Pembelajaran

- Membedakan array (fixed) dan slice (dinamis)
- Menggunakan append, make, len, cap pada slice
- Membuat dan memanipulasi map
- Melakukan iterasi dengan range
- Memahami operasi slice: slicing, copy, delete

---

## Program: Manajemen Koleksi

```go
package main

import "fmt"

func main() {
    var hari [5]string
    hari[0] = "Senin"
    hari[1] = "Selasa"
    fmt.Println("Array:", hari)

    buah := []string{"apel", "mangga", "pisang"}
    fmt.Println("Slice awal:", buah)

    buah = append(buah, "jeruk", "anggur")
    fmt.Println("Setelah append:", buah)
    fmt.Println("Panjang:", len(buah), "Kapasitas:", cap(buah))
    fmt.Println("Buah[1:3]:", buah[1:3])

    nilai := map[string]int{
        "Alice": 90,
        "Bob":   78,
        "Eve":   85,
    }
    fmt.Println("Nilai siswa:")
    for nama, n := range nilai {
        fmt.Printf("  %s: %d\n", nama, n)
    }

    if n, ok := nilai["Alice"]; ok {
        fmt.Println("Nilai Alice:", n)
    }
    delete(nilai, "Bob")

    fmt.Print("Daftar buah: ")
    for i, b := range buah {
        fmt.Printf("%d:%s ", i, b)
    }
    fmt.Println()
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Array vs Slice

**Array**: ukuran tetap. `var hari [5]string`.

**Slice**: dinamis, lebih sering digunakan. Bisa di-`append`. Fungsi penting: `len()`, `cap()`, `append()`.

**Slicing**: `buah[1:3]` -- elemen index 1 sampai 2.

### Map

Koleksi key-value. `map[string]int` = key string, value int. Cek key: `nilai, ok := map["key"]`.

### Range

`for i, v := range koleksi` -- iterasi array, slice, atau map.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah buah baru** -- `buah = append(buah, "durian")`
2. **Ubah slicing** -- coba `buah[2:]` atau `buah[:2]`
3. **Tambah data map** -- tambahkan "Charlie" dengan nilai 88

---

## Tantangan

Buat program menghitung frekuensi kata (gunakan map), lalu cetak kata yang paling sering muncul.

---

## Ringkasan

Slice dan map adalah tulang punggung koleksi data Go. `append`, `make`, `range` alat utama. Map untuk key-value lookup cepat. Minggu depan: struct, method, pointer.
