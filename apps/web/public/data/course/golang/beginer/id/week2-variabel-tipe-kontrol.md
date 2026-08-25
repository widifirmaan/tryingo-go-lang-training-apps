# Variabel, Tipe & Kontrol — Rak Berlabel dan Satpam Toko

> **Kategori:** Go | **Level:** Pemula | **Minggu 2:** Variabel, Tipe & Control Flow

## Tujuan Pembelajaran

- `var`, `:=`, `int/float64/string/bool` dan zero value `0 "" false`
- `if` dengan `else if`, `for` 3 bentuk (classic, while-style, infinite), `switch` tanpa `break`
- Paham `switch` Go otomatis berhenti (tidak bocor)

---

## Kenapa Ini Penting Buat Kamu?

Nilai 85 → B, stok 0 → "Habis", hitung 1-5 untuk cetak struk 5x. Tanpa `if/for`, tulis manual 100x. Go `switch` tanpa `break` = tidak perlu ingat `break` seperti JS — lebih aman untuk pemula.

---

## Program: Nilai & Stok

```go
package main

import "fmt"

func main() {
	// Variabel
	var nama string = "Budi"
	umur := 25
	var kosongInt int // 0
	fmt.Printf("Nama: %s, Umur: %d, Kosong: %d\n", nama, umur, kosongInt)

	// If
	nilai := 85
	if nilai >= 90 {
		fmt.Println("Grade: A")
	} else if nilai >= 80 {
		fmt.Println("Grade: B")
	} else {
		fmt.Println("Grade: C")
	}

	// If dengan short statement (khas Go)
	if skor := 75; skor >= 70 {
		fmt.Println("Lulus, skor:", skor)
	}

	// For classic
	fmt.Print("Hitung 1-5: ")
	for i := 1; i <= 5; i++ {
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	// For while-style
	n := 1
	fmt.Print("While 1-3: ")
	for n <= 3 {
		fmt.Printf("%d ", n)
		n++
	}
	fmt.Println()

	// Switch tanpa break (otomatis stop)
	hari := 3
	switch hari {
	case 1:
		fmt.Println("Senin")
	case 2:
		fmt.Println("Selasa")
	case 3:
		fmt.Println("Rabu")
	default:
		fmt.Println("Lain")
	}

	// Switch tanpa tag (if-else rapi)
	x := 10
	switch {
	case x < 10:
		fmt.Println("Kecil")
	case x == 10:
		fmt.Println("Tepat 10")
	default:
		fmt.Println("Besar")
	}
}
```

---

## Konsep Kunci

### Zero Value
`int→0`, `string→""`, `bool→false`. Aman, tidak `null`.

### `if` + Short Statement
`if skor := 75; skor >=70 { }` → buat variabel khusus untuk `if` saja.

### `for` 3 Wajah
- `for i:=1; i<=5; i++` klasik
- `for n <= 3 { }` seperti `while`
- `for { }` infinite (pakai `break`)

### `switch` Go
Tidak perlu `break`, otomatis berhenti. `switch { case x<10: }` untuk ganti `if-else` panjang.

---

## Penjelasan untuk Pemula

### Analogi

- **Zero value = rak kosong**: belum isi, sudah ada label `0`.
- **`switch` = loket**: loket 3 layani, tidak bocor ke loket 4 (JS bocor jika lupa break).

---

## Eksperimen

- **Hijau:** `nilai=95` → grade?
- **Kuning:** `for i:=5; i>=1; i--` mundur?
- **Merah:** Lupa `i++` di while → loop selamanya, `Ctrl+C`.

---

## Tantangan

**Kalkulator Ongkir Switch:** `berat=2.5, jarak=8`, `switch { case jarak<=5: ongkir=10000; case jarak<=10: ongkir=15000; default: 20000 }`, total `berat*5000+ongkir`. Validasi `if berat<=0 { fmt.Println("Berat salah") }`.

---

## Glosarium Mini

- **Zero value**: default kosong
- **Short statement**: `if x:=...;`
- **Switch**: pilih loket

---

## Ringkasan

Minggu 2: **Variabel & Kontrol** (Level: Pemula). Bisa cabang dan ulang. Minggu depan: **Fungsi & Error**.
