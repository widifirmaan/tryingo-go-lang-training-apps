# Pengenalan Go & Toolchain

> Go | Modul 1

## Tujuan Pembelajaran

- Memahami peran Go sebagai bahasa compiled untuk backend
- Menginstall Go dan menulis program pertama
- Mengenal toolchain: go run, build, fmt, test
- Memahami struktur file .go dan func main
- Menggunakan fmt.Println dan fmt.Printf

---

## Program: Halo Go

```go
package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    // Deklarasi variabel
    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    // fmt.Printf dengan verb
    fmt.Printf("Nama: %s\n", nama)
    fmt.Printf("Versi: %.2f\n", versi)
    fmt.Printf("Aktif: %t\n", aktif)
    fmt.Printf("Tipe: %T %T %T\n", nama, versi, aktif)
}
```

---

## Penjelasan

Go adalah bahasa compiled, statically typed yang dikembangkan Google. Toolchain utama: `go run` (jalankan langsung), `go build` (kompilasi ke binary), `go fmt` (format kode), `go test` (jalankan test). Struktur file Go: `package main`, `import`, `func main()`. `fmt.Println` mencetak dengan newline, `fmt.Printf` dengan format verb.

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

Modul 1 dari 16: **Pengenalan Go & Toolchain**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **2. Variabel, Tipe & Konstanta**.
