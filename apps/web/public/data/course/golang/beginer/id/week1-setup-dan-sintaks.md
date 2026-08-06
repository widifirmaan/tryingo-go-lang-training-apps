# Setup, Toolchain & Sintaks Dasar

> **Kategori:** Go | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Tujuan Pembelajaran

- Memahami peran Go sebagai bahasa compiled untuk backend (roadmap.sh phase 1)
- Menginstall Go dan menulis program pertama (Go Tour: Basics)
- Mengenal toolchain: go run, build, fmt, test, vet (Effective Go)
- Memahami struktur file .go: package, import, func main (Go Tour)
- Menggunakan fmt.Println, fmt.Printf dengan format verb %v, %s, %d, %T

---

## Program: Halo, Go!

```go
package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    fmt.Printf("Nama: %s\n", nama)
    fmt.Printf("Versi: %.2f\n", versi)
    fmt.Printf("Aktif: %t\n", aktif)
    fmt.Printf("Tipe: %T %T %T\n", nama, versi, aktif)
}
```

---

## Konsep Kunci

### Peran Go\nGo adalah bahasa compiled, statically typed yang dikembangkan Google. Berbeda dengan Python/JS yang interpreted, Go dikompilasi langsung ke binary mesin — menghasilkan eksekusi cepat dan distribusi mudah (single binary).\n\n### Toolchain Utama\n- `go run`: jalankan file .go langsung\n- `go build`: kompilasi ke binary\n- `go fmt`: format kode otomatis\n- `go test`: jalankan test\n- `go vet`: analisis potensi bug\n\n### Struktur File Go\nSetiap file .go: `package` declaration, `import`, `func main()` sebagai entry point.\n\n### Format Verb\n`%s` string, `%d` integer, `%f` float, `%t` boolean, `%T` tipe data, `%v` default.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah fungsi baru dengan tipe return berbeda
- Ganti for loop dengan range
- Coba tipe data yang belum dicoba
- Buat program kecil gabungan 2-3 konsep

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.

---

## Ringkasan

Minggu 1 dari 13: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **Variabel, Tipe & Control Flow**.
