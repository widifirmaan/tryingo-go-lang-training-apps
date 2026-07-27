# Pengenalan Go & Toolchain

> Kategori: Go, Bahasa Pemrograman | Level: Pemula | Week 1

## Tujuan Pembelajaran

- Memahami konsep bahasa compiled vs interpreted
- Menginstal Go dan menulis program pertama
- Mengenal toolchain: go run, build, fmt, test
- Memahami struktur file .go dan func main
- Membedakan export vs unexport (huruf besar/kecil)

---

## Program: Halo Dunia

```go
package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Program pertama Anda.")

    var nama string = "Gopher"
    var versi float64 = 1.24
    var aktif bool = true

    tahun := 2009
    pesan := "Go adalah bahasa open-source"

    fmt.Println("Nama:", nama)
    fmt.Println("Versi:", versi)
    fmt.Println("Aktif:", aktif)
    fmt.Println("Tahun rilis:", tahun)
    fmt.Println("Pesan:", pesan)
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Struktur Program Go

Setiap file .go dimulai dengan `package main`. Fungsi `main()` adalah entry point -- eksekusi dimulai dari sini.

`import "fmt"` membawa package fmt untuk format input/output. `fmt.Println()` mencetak teks dengan baris baru.

### Variabel

Dua cara deklarasi: **eksplisit** (`var nama string = "Gopher"`) dan **short declaration** (`tahun := 2009`). Go menebak tipe dari nilai.

### Ekspor vs Unekospor

**Huruf besar = publik (diekspor)**, huruf kecil = privat. `fmt.Println` bisa dipanggil karena `Println` huruf besar.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah `nama`** -- ganti "Gopher" dengan nama Anda
2. **Tambah variabel baru** -- deklarasikan `kota := "Jakarta"` dan cetak
3. **Ubah `aktif`** -- set ke `false` dan lihat perbedaannya

---

## Tantangan

Buat program yang mencetak biodata singkat: nama, umur, kota, dan hobi. Gunakan variabel dengan tipe berbeda (`string`, `int`, `bool`).

---

## Ringkasan

Go adalah bahasa modern yang menggabungkan kemudahan dengan performa. Toolchain: `go run` untuk develop, `go build` untuk produksi, `go fmt` untuk konsistensi. Minggu depan: variabel, tipe data, control flow.
