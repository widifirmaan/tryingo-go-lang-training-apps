# Arsitektur Package Go: main, Variabel, Zero Values & Multiple Returns

> **Kategori:** Go | **Level:** Pondasi Go & Sistem Tipe Statis | **Minggu 1:** Arsitektur Package Go: main, Variabel, Zero Values & Multiple Returns
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi desain Go: bahasa terkompilasi murni (*compiled*), statically typed, tanpa class, dan dirancang untuk skalabilitas cloud
- Menguasai struktur dasar program Go: package main, import deklaratif, dan titik masuk fungsi main()
- Memahami konsep Zero Values bawaan Go (tanpa null/undefined bug pada inisialisasi variabel)
- Menggunakan operator deklarasi singkat (:=) vs kata kunci var dan const
- Menulis fungsi idiomatik Go yang mengembalikan banyak nilai sekaligus (Multiple Return Values)

---

## Program: Pemeriksa Kesehatan Server (Server Health Probe) & Kalkulator Metrik

```go
package main

import (
	"fmt"
	"time"
)

// 1. Deklarasi Konstanta & Tipe Data Baku
const (
	NamaGateway   = "Nusa Edge Gateway"
	VersiMesin    = "v2.4.0"
	MaksimalKoneksi = 10000
)

// 2. Fungsi dengan Multiple Return Values (Nilai Utama & Status/Error)
func periksaStatusServer(host string, port int) (string, int, bool) {
	alamatPenuh := fmt.Sprintf("%s:%d", host, port)
	
	// Simulasi pengecekan latensi
	latensiMs := 42
	isSehat := true

	return alamatPenuh, latensiMs, isSehat
}

func main() {
	// 3. Deklarasi Singkat (Short Variable Declaration :=)
	// Zero values: int=0, string="", bool=false
	var hitungKegagalan int
	namaKluster := "ap-southeast-1a"

	fmt.Println("=== " + NamaGateway + " (" + VersiMesin + ") ===")
	fmt.Printf("Kluster: %s | Kapasitas: %d koneksi\n\n", namaKluster, MaksimalKoneksi)

	alamat, latensi, aktif := periksaStatusServer("api.internal.nusa.net", 8080)

	if aktif {
		fmt.Printf("[OK] Target: %s\n", alamat)
		fmt.Printf("     Latensi: %d ms | Status: SEHAT\n", latensi)
	} else {
		hitungKegagalan++
		fmt.Printf("[FAIL] Target: %s tidak merespons! (Gagal: %d)\n", alamat, hitungKegagalan)
	}

	fmt.Println("Waktu Pengecekan:", time.Now().Format(time.RFC3339))
}
```

---

## Konsep Kunci

### Mengapa Google Menciptakan Go (Golang)?
Go diciptakan oleh legenda ilmu komputer (Ken Thompson pencipta UNIX/C, Rob Pike pencipta UTF-8) untuk memecahkan masalah kompilasi lambat C++ dan overhead memori Java di data center Google.
Go memiliki karakteristik unik:
1. **Kompilasi Super Cepat ke Binary Tunggal**: Menghasilkan satu file binary mesin mandiri tanpa perlu menginstal runtime (seperti JVM atau Node.js) di server target.
2. **Tidak Ada Inheritance / Hirarki Class Rumit**: Go sengaja membuang konsep class inheritance yang sering menjadi perangkap kompleksitas di OOP tradisional.
3. **Konkurensi Kelas Satu**: Mendukung jutaan thread ringan (*goroutines*) langsung di tingkat bahasa.

### Zero Values (Tanpa Nilai Sampah)
Di bahasa seperti C, mendeklarasikan variabel tanpa inisialisasi berisi nilai acak di memori (*garbage*). Di JavaScript, nilainya adalah `undefined`.
Di Go, setiap variabel yang dideklarasikan **dijamin 100% memiliki nilai awal baku (Zero Value)**:
- `int`, `float`: `0`
- `bool`: `false`
- `string`: `""` (string kosong)
- `pointer`, `slice`, `map`, `channel`: `nil`

### Multiple Return Values
Idiom paling terkenal di Go adalah fungsi mengembalikan hasil utama bersama status atau eror:
`func Bagi(a, b float64) (float64, error)`
Ini memaksa pengembang menangani kemungkinan kegagalan secara eksplisit di tempat.

---

---

## Penjelasan untuk Pemula

### Analogi: Mobil Balap Minimalis Tanpa Dasbor Hiburan
Bahasa pemrograman lain seperti mobil sedan mewah yang penuh dengan tombol TV, pemanas kursi, dan lampu disko (*fitur rumit yang jarang terpakai*).
Go seperti mobil balap F1: tidak ada tombol hiburan, tidak ada jok kulit mewah, yang ada hanya setir, pedal gas, dan mesin turbo jet. Sangat sederhana, tidak bisa mogok karena tombol rusak, dan melaju 500 km/jam di server cloud.

## Eksperimen

- Deklarasikan variabel var cekStatus bool tanpa nilai dan print nilainya untuk membuktikan Zero Value bernilai false.
- Ubah fungsi periksaStatusServer agar mengembalikan string status tambahan ("ONLINE", "OFFLINE").
- Kompilasi program dengan perintah go build dan amati ukuran file binary mandiri yang dihasilkan.
- Coba deklarasikan variabel dengan := lalu tidak menggunakannya sama sekali; amati compiler Go menolak kompilasi.

---

## Tantangan

Buat fungsi `KalkulasiThroughput(totalRequest int, durasiDetik float64) (float64, bool)` yang menghitung Request Per Second (RPS) dan mengembalikan flag boolean `apakahMelebihiKapasitas` jika RPS di atas 5000.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Nil Pointer Dereference (Panic)
- **Gejala / Masalah:** Aplikasi panic dan crash seketika saat mengakses field struct pada pointer bernilai `nil`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu validasi `if ptr != nil { ... }` sebelum memanggil method atau membaca field.

### 2. Goroutine Leak (Macet Selamanya)
- **Gejala / Masalah:** Goroutine menunggu baca/tulis pada channel tanpa pernah dihentikan, menguras memori server.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `context.WithCancel` atau buffered channel untuk memastikan goroutine memiliki titik keluar pasti.

### 3. Shadowing Variabel dengan Operator :=
- **Gejala / Masalah:** Variabel luar tidak terisi karena variabel baru dengan nama yang sama dibuat di dalam blok `if/err`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Periksa kembali deklarasi pendek `:=` vs assignment biasa `=` saat menangani error.

---

## Ringkasan

Kamu telah menguasai arsitektur package Go, zero values, dan multiple return values. Minggu depan kita mempelajari Error Handling eksplisit dan alur kontrol idiomatik.
