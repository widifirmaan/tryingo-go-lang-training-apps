# Setup & Sintaks Go — Buku Kas Kantor yang Rapi

> **Kategori:** Go | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Tujuan Pembelajaran

- Instal Go, cek `go version`, buat proyek `go mod init warung`, jalankan `go run main.go`
- Tulis program pertama: `package main` + `import "fmt"` + `func main()`
- Simpan data: `var nama string = "Budi"` (kotak berlabel jelas) dan `versi := 1.24` (tebak otomatis)
- Cetak dengan `fmt.Println` dan `fmt.Printf` (`%s` teks, `%d` angka, `%v` apa saja)
- Rapikan otomatis `go fmt`

---

## Kenapa Ini Penting Buat Kamu?

Warung butuh buku kas yang **rapi, cepat, tidak salah ketik**. Go = buku kas kantor: tiap kotak **harus jelas labelnya** (`string`/`int`), salah isi langsung merah. Dicetak jadi 1 file binary → jalan cepat di laptop kasir kentang.

Hari ini kamu nyalakan buku kas, tulis struk pertama, dan rapikan instan.

---

## Program: Struk Go Pertama

Simpan sebagai `main.go` di folder `warung`

```go
package main // Wajib: semua file Go punya package

import "fmt" // Ambil alat cetak

func main() { // Pintu masuk — Go cari main() dulu
	fmt.Println("Warung Bu Siti — Buku Kas Go")
	fmt.Println("Go = cepat, rapi, 1 file jadi")

	// 1. Kotak berlabel jelas (var) vs tebak otomatis (:=)
	var nama string = "Budi" // kotak label string, isi "Budi"
	versi := 1.24            // := tebak float64
	aktif := true
	var kosong string        // "" (zero value, bukan null)

	fmt.Printf("Nama: %s (tipe %T)\n", nama, nama)
	fmt.Printf("Versi: %.2f (tipe %T)\n", versi, versi)
	fmt.Printf("Aktif: %t, Kosong: %q\n", aktif, kosong)

	// 2. Hitung
	berasKg := 2
	hargaPerKg := 12500
	total := berasKg * hargaPerKg
	fmt.Printf("\nBeras %dkg x Rp %d = Rp %d\n", berasKg, hargaPerKg, total)

	// 3. Toolchain demo
	fmt.Println("\nToolchain: go run (jalan), go fmt (rapikan), go build (cetak binary)")
}
```

**Cara jalankan (5 menit):**
1. Install Go dari `go.dev` → Download → Next → cek `go version` di PowerShell → `go version go1.22.x`
2. `mkdir warung; cd warung; go mod init warung` → buat `go.mod`
3. Buat `main.go` tempel kode → `go run main.go` → lihat struk
4. Coba acak spasi → `go fmt ./...` → rapi otomatis

---

## Konsep Kunci

### `package main` + `func main()` = Sampul + Pintu
Tiap program Go punya sampul `package main` dan pintu `main()` — Go masuk dari situ.

### `var` vs `:=` — Label Jelas vs Tebak
- `var nama string = "Budi"` → kotak label `string` jelas
- `nama := "Budi"` → Go tebak `string` (lebih pendek, pakai di `main` saja)

### Zero Value — Kotak Kosong Bawaan
`var s string` → `""`, `var n int` → `0`, `var b bool` → `false`. Tidak ada `null`.

### `fmt` — Mesin Cetak
- `Println` baris baru
- `Printf("Nama: %s\n", nama)` `%s` string, `%d` int, `%f` float, `%t` bool, `%T` tipe, `%q` kutip, `%v` default

### `go fmt` — Tukang Rapi
`go fmt ./...` rapikan spasi/tab se-proyek. `go run` jalan, `go build` cetak `warung.exe` (1 file).

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Kantor

- **Go = buku kas resmi**: tiap kolom ada header (`string`/`int`), salah isi ditolak. JS/Python kolom bebas.
- **`var nama string`** = kolom `Nama` header `String`, isi "Budi".
- **`:=` = stempel tebak**: tulis "Budi", stempel otomatis `string`.
- **`go fmt` = penggaris**: tarik garis rapi semua halaman.

### Langkah Instal (Sekali)

`go.dev` → Download MSI → Next → PowerShell `go version` → `go1.22`

### 3 Istilah Wajib

1. **package**: sampul berkas
2. **import**: pinjam alat
3. **func main**: pintu masuk

---

## Eksperimen

- **Hijau:** Ganti `berasKg := 5` → total?
- **Kuning:** `fmt.Printf("Total: %d tipe %T\n", total, total)` → tipe apa?
- **Merah:** `var nama string = 123` → error `cannot use 123 as string`. Betulkan.

---

## Tantangan

**Struk Ongkir Go:** `berat := 2.5` (`float64`), `jarak := 8` (int), `ongkir := int(berat*5000) + jarak*2000` (konversi `float→int`), cetak `fmt.Printf("Berat %.1fkg jarak %dkm → Rp %d\n", berat, jarak, ongkir)` + `fmt.Printf("Tipe: %T %T\n", berat, ongkir)`.

Bonus: `go fmt` lalu `go build` → cek `warung.exe` muncul.

---

## Glosarium Mini

- **Go**: bahasa kompilasi cepat
- **go run/fmt/build**: jalan/rapikan/cetak
- **var/:=**: deklarasi
- **fmt.Printf**: cetak format

---

## Ringkasan

Minggu 1 dari 13: **Setup Go** (Level: Pemula). Buku kas menyala, struk pertama jadi. Minggu depan: **Variabel, Tipe & Kontrol** — `if` stok dan `for` hitung.
