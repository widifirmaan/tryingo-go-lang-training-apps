# Pointer & Memory Model

> Go | Modul 8

## Tujuan Pembelajaran

- Memahami operator & dan *
- Membedakan pass by value vs pointer
- Menggunakan pointer ke struct
- Memahami stack vs heap
- Menerapkan nil safety

---

## Program: Manipulasi Nilai

```go
package main

import "fmt"

func zeroVal(val int) {
    val = 0
}

func zeroPtr(ptr *int) {
    *ptr = 0
}

type Person struct {
    Name string
    Age  int
}

func updatePerson(p *Person) {
    p.Age = 30
}

func main() {
    x := 42
    fmt.Printf("Nilai x: %d\n", x)
    fmt.Printf("Alamat x: %p\n", &x)

    // Pass by value
    zeroVal(x)
    fmt.Println("Setelah zeroVal:", x) // masih 42

    // Pass by pointer
    zeroPtr(&x)
    fmt.Println("Setelah zeroPtr:", x) // 0

    // Pointer ke struct
    p := Person{Name: "Budi", Age: 25}
    updatePerson(&p)
    fmt.Printf("%s berumur %d\n", p.Name, p.Age)

    // new function
    num := new(int)
    *num = 100
    fmt.Println("Melalui new:", *num)

    // Nil safety
    var ptr *int
    if ptr != nil {
        fmt.Println(*ptr)
    } else {
        fmt.Println("Pointer nil, aman")
    }
}
```

---

## Penjelasan

`&` mengambil alamat memori, `*` mengakses nilai di alamat. Go pass by value — fungsi mendapat salinan. Pointer memungkinkan modifikasi original. Stack untuk lokal kecil, heap untuk data yang di-share. Nil pointer harus dicek sebelum dereference.

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

Modul 8 dari 16: **Pointer & Memory Model**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **9. Package & Module**.
