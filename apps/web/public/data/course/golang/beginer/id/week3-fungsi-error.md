# Fungsi & Error — Resep Dapur dengan Alarm Gagal

> **Kategori:** Go | **Level:** Pemula | **Minggu 3:** Fungsi & Error Handling

## Tujuan Pembelajaran

- `func bagi(a float64, b float64) (float64, error)` — Go wajib kembalikan error
- Pola `if err != nil { return err }` — alarm jika bagi 0
- `defer` untuk tutup pintu setelah selesai, `...float64` untuk borong
- Bedakan `var` vs `:=` di fungsi

---

## Kenapa Ini Penting Buat Kamu?

Resep warung `bagiStok(10,0)` jika tidak cek error → stok minus, rugi. Go paksa kamu cek `error` tiap bagi, buka file, panggil API — aman untuk non-IT yang takut lupa cek.

---

## Program: Dapur Fungsi Aman

```go
package main

import (
	"errors"
	"fmt"
)

func bagi(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("tidak bisa bagi 0 — cek stok")
	}
	return a / b, nil
}

func hitung(a, b int) (jumlah int, kali int) { // named return
	jumlah = a + b
	kali = a * b
	return // otomatis return jumlah, kali
}

func rataRata(angka ...float64) float64 { // borong
	total := 0.0
	for _, n := range angka {
		total += n
	}
	if len(angka) == 0 {
		return 0
	}
	return total / float64(len(angka))
}

func main() {
	defer fmt.Println("Selesai — defer jalan terakhir")

	hasil, err := bagi(10, 2)
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Printf("10/2 = %.1f\n", hasil)
	}

	_, err = bagi(5, 0)
	if err != nil {
		fmt.Println("Bagi 0 error:", err)
	}

	j, k := hitung(4, 5)
	fmt.Printf("Jumlah %d, Kali %d\n", j, k)
	fmt.Printf("Rata-rata: %.1f\n", rataRata(80, 90, 75))
}
```

---

## Konsep Kunci

### ` (float64, error)` — Dua Kembar
Go tidak pakai `try/catch`. Tiap yang bisa gagal return `(hasil, error)`. Wajib cek `if err != nil`.

### Named Return & Variadic
- `func hitung() (jumlah int, kali int)` → `return` saja.
- `func rataRata(angka ...float64)` → terima banyak.

### `defer` = Tutup Pintu Terakhir
`defer fmt.Println("selesai")` jalan saat fungsi selesai, LIFO jika banyak.

---

## Penjelasan untuk Pemula

### Analogi: Alarm Kompor

- **`error` = alarm asap**: masak `bagi(5,0)` alarm bunyi, kamu cek `if err != nil` → matikan kompor.
- **`defer` = matikan kompor setelah masak**: tulis di awal, jalan di akhir.

---

## Eksperimen

- **Hijau:** `bagi(9,3)` → ?
- **Kuning:** `rataRata()` tanpa isi → 0 (cek len).
- **Merah:** Lupa cek `err` → hasil 0 dipakai, salah hitung.

---

## Tantangan

**Kasir Aman:** `func hitungTotal(belanja []int, diskon float64) (int, error)` → jika `diskon <0 || >50` return error, else hitung. `defer` log "Transaksi selesai". Pakai `if err != nil`.

---

## Glosarium Mini

- **error**: alarm gagal
- **defer**: tunda sampai selesai
- **...**: borong

---

## Ringkasan

Minggu 3: **Fungsi Aman** (Level: Pemula). Bisa resep yang tidak diam-diam gagal. Minggu depan: **Slice & Map** — rak dinamis.
