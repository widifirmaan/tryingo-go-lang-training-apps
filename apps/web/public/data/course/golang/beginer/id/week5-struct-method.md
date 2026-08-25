# Struct & Method — Kartu Produk dan Stempelnya

> **Kategori:** Go | **Level:** Pemula | **Minggu 5:** Struct & Method

## Tujuan Pembelajaran

- `type Produk struct { Nama string; Harga int }` — kartu produk
- Method `func (p Produk) Info() string` vs `func (p *Produk) Diskon()` — kapan pakai `*`
- Embedding `type Elektronik struct { Produk; Garansi int }` — warisan tanpa ribet
- `NewProduk()` constructor dan tag `json:"nama"`

---

## Kenapa Ini Penting Buat Kamu?

50 produk jika pakai `map[string]int` terpisah — berantakan. **Struct = kartu terpadu** (nama+hrga+stok 1 kartu). Method = stempel di kartu (`Info()`, `Diskon(10)`). Embedding = kartu Elektronik warisi kartu Produk.

---

## Program: Kartu Produk Warung

```go
package main

import "fmt"

type Produk struct {
	Nama  string
	Harga int
	Stok  int
}

func (p Produk) Info() string {
	return fmt.Sprintf("%s: Rp%d (stok %d)", p.Nama, p.Harga, p.Stok)
}

func (p *Produk) Diskon(persen int) {
	p.Harga = p.Harga - p.Harga*persen/100 // * = ubah asli
}

type Elektronik struct {
	Produk        // warisi semua field Produk
	Garansi int // tahun
}

func NewProduk(nama string, harga int) *Produk {
	return &Produk{Nama: nama, Harga: harga, Stok: 0}
}

func main() {
	p1 := Produk{Nama: "Beras", Harga: 62000, Stok: 10}
	fmt.Println(p1.Info())
	p1.Diskon(10)
	fmt.Println("Setelah diskon:", p1.Info())

	laptop := Elektronik{Produk: Produk{Nama: "Laptop", Harga: 15000000, Stok: 5}, Garansi: 3}
	fmt.Println(laptop.Info()) // punya Info() warisan!
	fmt.Printf("Garansi: %d tahun\n", laptop.Garansi)

	p2 := NewProduk("Gula", 15000)
	fmt.Println(p2.Info())
}
```

---

## Konsep Kunci

### Struct = Kartu
`type Produk struct { Nama string; Harga int }` → `Produk{Nama:"Beras", Harga:62000}`

### Method ` (p Produk)` vs ` (p *Produk)`
- ` (p Produk)` **salinan** — ubah tidak ngefek asli (untuk baca `Info`)
- ` (p *Produk)` **asli** — ubah `Harga` permanen (untuk `Diskon`)

### Embedding = Warisan
`Elektronik struct { Produk; Garansi int }` → `laptop.Info()` otomatis ada.

### Constructor `NewProduk`
Go tidak ada `new` class, pakai fungsi `NewProduk(...) *Produk` yang return pointer.

---

## Penjelasan untuk Pemula

### Analogi: Kartu & Stempel

- **Struct = kartu anggota**: 1 kartu isi 3 baris.
- **Method = stempel di kartu**: `Info()` stempel tulis, `Diskon()` stempel potong harga.
- **`*` = kartu asli vs fotokopi**: `*Produk` ubah asli, `Produk` ubah fotokopi.

---

## Eksperimen

- **Hijau:** `p1.Diskon(20)` → harga?
- **Kuning:** Ubah `Info()` jadi `*Produk` → tetap jalan? Bedanya jika `Info` ubah field?
- **Merah:** `Elektronik` tanpa `Produk` → `laptop.Info()` error?

---

## Tantangan

**Toko Mini:** `type Keranjang struct { Items []Produk }` + method `Tambah(p Produk)`, `Total() int`, `Bayar(diskon int)`. Pakai `*Keranjang` untuk ubah.

---

## Glosarium Mini

- **Struct**: kartu
- **Method**: stempel
- **Pointer `*`**: asli vs salinan
- **Embedding**: warisan

---

## Ringkasan

Minggu 5: **Struct** (Level: Pemula). **Selesai Beginner Go!** Minggu depan: **Interface & Generics** (Menengah).
