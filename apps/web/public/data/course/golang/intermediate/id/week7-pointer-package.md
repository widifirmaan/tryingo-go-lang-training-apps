# Pointer & Package — Alamat Gudang dan Gedung Warung Go

> **Kategori:** Go | **Level:** Menengah | **Minggu 7:** Pointer, Memory & Package

## Tujuan Pembelajaran

- `&x` alamat kotak, `*p` buka isi, `*p = 21` ubah asli lewat alamat (sumber: go.dev/tour/moretypes/1)
- Kapan pointer: ubah besar tanpa fotokopi mahal + `package warung` bagi file per rak
- `go mod init warung` + `import "warung/produk"` hubungkan gedung

---

## Kenapa Ini Penting Buat Kamu?

Kirim struct 1MB ke fungsi tanpa pointer = fotokopi 1MB tiap panggil (lambat). Dengan `*Produk`, kirim alamat 8 byte. Ubah stok di fungsi tanpa pointer = salinan berubah, asli tetap (bug diam-diam!).

---

## Program: Alamat Stok & Gedung Warung

```go
package main

import "fmt"

// Terima ALAMAT (*int) → ubah ASLI
func tambah(p *int) {
  *p += 10
}

func main() {
  stok := 10
  fmt.Println("Alamat stok:", &stok) // 0xc000... (alamat memori)
  tambah(&stok)                      // kirim alamat, bukan salinan
  fmt.Println("Stok setelah tambah:", stok) // 20 (asli berubah!)

  // Tanpa pointer (bandingkan!)
  s2 := 10
  tambahSalinan(s2)
  fmt.Println("Salinan tetap:", s2) // 10 (tidak berubah)
}

func tambahSalinan(s int) { s += 10 } // ubah fotokopi, asli aman
```

```bash
# Gedung: bagi per rak (package)
go mod init warung
mkdir produk
# produk/produk.go → package produk, func Harga() int { return 62000 }
# main.go → import "warung/produk" → produk.Harga()
go run .
```

---

## Konsep Kunci

### `&` / `*` = Alamat/Buka
- `&stok` alamat kotak, `*p` buka isi, `*p = 21` ubah asli.
- `func tambah(p *int)` terima alamat.

### Pointer vs Salinan
- Pointer: murah + ubah asli. Salinan: aman tapi mahal untuk besar.

### `package` + `go.mod` = Gedung
`package produk` per file rak, `go mod init warung` KTP gedung, `import "warung/produk"` hubungkan.

---

## Penjelasan untuk Pemula

### Analogi: Alamat Rumah & Gedung Mal
- **Pointer = alamat rumah**: kirim alamat (kecil), tukang datang ubah asli. Kirim salinan rumah = fotokopi mahal.
- **Package = toko di mal**: `produk` toko beras, `main` kasir depan.

### Langkah 0 — Siapkan Device
- Sama W1: `go version`, folder `warung`, `go mod init warung`.

### Cara Komputer Membaca
1. `tambah(&stok)` → `p` = alamat → `*p += 10` → tulis di alamat itu → `stok` asli 20.
2. `import "warung/produk"` → cari folder `produk/` → `package produk`.

### 3 Istilah Wajib
1. **Pointer `&/*`**: alamat/buka
2. **Package/import**: gedung/hubungkan
3. **go.mod**: KTP gedung

---

## Eksperimen

- **Hijau:** `tambah(&stok)` 2x → 30?
- **Kuning:** Kirim tanpa `&` (`tambah(stok)`) → error `cannot use stok as *int`? (Go ketat, bagus!)
- **Merah:** `var p *int` tanpa isi → `nil`. `*p` → panic? Cek `if p != nil` dulu.

---

## Tantangan

**Gudang Alamat:** `type Gudang struct{ Stok int }` + `func (g *Gudang) Isi(n int){ g.Stok += n }` (pointer receiver!) + `package` pisah `main.go`/`gudang/gudang.go` → `go run .`.

---

## Glosarium Mini

- **Pointer/nil**: alamat/kosong
- **Package/go.mod**: gedung/KTP
- **Receiver (p *T)**: stempel ubah-asli

---

## Ringkasan

Minggu 7 dari 13: **Alamat & Gedung** (Level: Menengah). Bisa ubah asli + bagi file. Minggu depan: **Goroutine** — kasir paralel.
