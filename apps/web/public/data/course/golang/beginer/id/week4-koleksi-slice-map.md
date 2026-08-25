# Koleksi: Slice, Map & String — Rak Dinamis dan Buku Alamat

> **Kategori:** Go | **Level:** Pemula | **Minggu 4:** Koleksi: Slice, Map & String

## Tujuan Pembelajaran

- `array [3]int` vs `slice []int` dinamis — pakai slice untuk warung
- `append`, `make`, `len`, `cap`, slicing `angka[1:4]`
- `map[string]int` buku alamat, cek `val, ok := m["Budi"]`
- Olah teks `strings` dan `range` untuk daftar

---

## Kenapa Ini Penting Buat Kamu?

Daftar harga 30 produk tidak muat di `var a,b,c` manual. **Slice = rak geser**, **Map = buku alamat harga**. Warung butuh keduanya.

---

## Program: Rak dan Buku Harga

```go
package main

import (
	"fmt"
	"strings"
)

func main() {
	// Slice dinamis
	buah := []string{"apel", "mangga", "pisang"}
	buah = append(buah, "jeruk") // tambah
	fmt.Println("Buah:", buah, "len:", len(buah), "cap:", cap(buah))

	angka := []int{10, 20, 30, 40, 50}
	fmt.Println("Potong [1:4]:", angka[1:4]) // 20,30,40

	// Map
	stok := make(map[string]int)
	stok["Beras"] = 10
	stok["Gula"] = 5
	stok["Beras"] = 12 // update

	harga, ada := stok["Beras"]
	if ada {
		fmt.Printf("Stok Beras: %d\n", harga)
	}

	// Cek tidak ada
	if _, ada := stok["Kopi"]; !ada {
		fmt.Println("Kopi belum ada")
	}

	delete(stok, "Gula")
	fmt.Println("Setelah hapus Gula:", stok)

	// String + range
	teks := "Warung Bu Siti"
	fmt.Println("Upper:", strings.ToUpper(teks))
	fmt.Println("Contains 'Bu':", strings.Contains(teks, "Bu"))

	fmt.Println("\nDaftar buah:")
	for i, v := range buah {
		fmt.Printf("%d: %s\n", i, v)
	}
	for k, v := range stok {
		fmt.Printf("%s → %d\n", k, v)
	}
}
```

---

## Konsep Kunci

### Slice vs Array
`[3]int` tetap 3, `[]int` geser. Pakai `[]int` 99% waktu. `append`, `make([]int,0,10)`, `len`, `cap`.

### Map + `ok`
`val, ok := m["kunci"]` → `ok` true jika ada. Jangan `m["kunci"]` langsung untuk cek ada (bisa 0).

### `strings` & `range`
`strings.ToUpper`, `Contains`, `TrimSpace`. `for i, v := range buah` loop rak dan buku.

---

## Penjelasan untuk Pemula

### Analogi

- **Slice = rak geser IKEA**: bisa tambah `append` tanpa beli rak baru. `cap` kapasitas rak, `len` isi terpakai.
- **Map = buku alamat**: cari "Budi" → `081`, tidak ada → tidak ketemu (`ok==false`).
- **`range` = cek rak satu per satu**.

---

## Eksperimen

- **Hijau:** `buah = append(buah, "durian","manggis")` → len?
- **Kuning:** `stok["Kopi"]=7; delete(stok,"Kopi")`
- **Merah:** `angka[1:4]` ubah `angka[1]=99` → `angka` asli ikut berubah? Ya, slice share memori.

---

## Tantangan

**Inventaris Warung:** `map[string]int` stok, `slice` daftar belanja, `range` cari yang stok <3 → tampil "Mau habis". Pakai `ok` cek ada.

---

## Glosarium Mini

- **Slice/Map**: rak/buku
- **append/make**: tambah/buat
- **ok**: cek ada

---

## Ringkasan

Minggu 4: **Slice & Map** (Level: Pemula). Bisa rak geser & buku alamat. Minggu depan: **Struct** — kartu produk.
