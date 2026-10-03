# Testing Idiomatik & Benchmarking: Table-Driven Tests, Subtests & testing.B

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Capstone Gateway | **Minggu 10:** Testing Idiomatik & Benchmarking: Table-Driven Tests, Subtests & testing.B

## Tujuan Pembelajaran

- Memahami filosofi pengujian bawaan Go tanpa perlu framework test pihak ketiga (cukup paket `testing`)
- Menguasai pola pengujian Table-Driven Tests yang diakui sebagai standar emas pengujian industri Go
- Menggunakan subtests t.Run() untuk mengisolasi kegagalan spesifik per baris pengujian
- Menulis fungsi tolak ukur kecepatan (Benchmark) menggunakan parameter *testing.B dan loop b.N
- Menganalisis alokasi memori pengujian menggunakan flag `go test -bench=. -benchmem`

---

## Program: Uji Otomatis Mesin Token Bucket & Pengukuran Kecepatan Operasi

```go
package main

import (
	"fmt"
	"strings"
	"testing"
)

// Unit yang Akan Diuji: Pembersih & Sanitasi Jalur URL Gateway
func SanitasiPathGateway(path string) string {
	if path == "" {
		return "/"
	}
	bersih := strings.TrimSpace(path)
	if !strings.HasPrefix(bersih, "/") {
		bersih = "/" + bersih
	}
	// Hapus trailing slash jika bukan root
	if len(bersih) > 1 && strings.HasSuffix(bersih, "/") {
		bersih = strings.TrimSuffix(bersih, "/")
	}
	return bersih
}

// 1. Table-Driven Test Idiomatik (Standar Emas Pengujian di Go)
func TestSanitasiPathGateway(t *testing.T) {
	// Definisi tabel kasus uji
	testCases := []struct {
		namaKasus      string
		inputPath      string
		ekspektasiPath string
	}{
		{namaKasus: "Path Kosong", inputPath: "", ekspektasiPath: "/"},
		{namaKasus: "Path Normal", inputPath: "/api/v1/users", ekspektasiPath: "/api/v1/users"},
		{namaKasus: "Tanpa Leading Slash", inputPath: "api/v1/products", ekspektasiPath: "/api/v1/products"},
		{namaKasus: "Dengan Trailing Slash", inputPath: "/api/v1/orders/", ekspektasiPath: "/api/v1/orders"},
		{namaKasus: "Spasi Ekstra", inputPath: "  /auth/login   ", ekspektasiPath: "/auth/login"},
	}

	for _, tc := range testCases {
		// t.Run(): Menjalankan subtest terisolasi untuk setiap baris kasus
		t.Run(tc.namaKasus, func(t *testing.T) {
			hasil := SanitasiPathGateway(tc.inputPath)
			if hasil != tc.ekspektasiPath {
				t.Errorf("GAGAL [%s]: input='%s', dapat='%s', ekspektasi='%s'",
					tc.namaKasus, tc.inputPath, hasil, tc.ekspektasiPath)
			}
		})
	}
}

// 2. Benchmark Pengukuran Kecepatan Operasi (testing.B)
func BenchmarkSanitasiPathGateway(b *testing.B) {
	samplePath := "   api/v1/distributed/gateway/routes/search/   "

	// b.ResetTimer(): Reset pencatat waktu setelah inisialisasi awal
	b.ResetTimer()

	// Loop b.N diatur otomatis oleh runtime Go hingga sampel statistik valid (biasanya ribuan/jutaan kali)
	for i := 0; i < b.N; i++ {
		_ = SanitasiPathGateway(samplePath)
	}
}

func main() {
	fmt.Println("=== Demo Pengujian Mandiri ===")
	input := "api/v1/status/"
	fmt.Printf("Input: '%s' -> Hasil Sanitasi: '%s'\n", input, SanitasiPathGateway(input))
	fmt.Println("Jalankan di terminal: 'go test -v -bench=.' untuk melihat pengujian dan benchmark resmi.")
}
```

---

## Konsep Kunci

### Standard Emas: Table-Driven Tests
Di bahasa lain, pengembang sering menulis 10 fungsi tes terpisah untuk menguji fungsi yang sama dengan input berbeda (`testEmpty()`, `testSlash()`, `testSpaces()`).
Di **Go**, komunitas menyepakati satu pola terbaik: **Table-Driven Tests**:
1. Anda mendefinisikan slice anonim struct berisi nama kasus, input, dan hasil yang diharapkan.
2. Anda melakukan perulangan `for _, tc := range testCases` dan mengeksekusi `t.Run(tc.name, ...)`.
Menambah 50 skenario uji baru cukup dengan menambahkan 50 baris data ke dalam tabel, tanpa menambah satupun baris fungsi baru!

### Tolak Ukur Kecepatan Otomatis: `testing.B`
Go adalah satu-satunya bahasa populer yang memiliki **mesin benchmarking terintegrasi langsung di standard library**:
Fungsi diawali dengan kata `BenchmarkNamaFungsi(b *testing.B)`.
Runtime Go akan mengeksekusi fungsi Anda berulang kali (misal 10 juta kali) untuk mengukur:
- Berapa **nanodetik per operasi (ns/op)** yang dihabiskan.
- Berapa **byte memori yang dialokasikan (B/op)**.
- Berapa kali alokasi heap terjadi (**allocs/op**).

---

---

## Penjelasan untuk Pemula

### Analogi: Meja Uji Tabrak Kendaraan & Stopwatch Lab
1. **Table-Driven Test** seperti meja daftar uji coba sabuk pengaman mobil: ada kolom pengujian kecepatan 20 km/jam, 50 km/jam, dan 100 km/jam. Boneka uji tabrak dipasang dan ditarik berurutan sesuai tabel satu per satu.
2. **Benchmark (`testing.B`)** seperti stopwatch laboratorium pabrik jam Swiss: mekanik menguji keausan roda gigi dengan memutarnya 1.000.000 kali putaran dalam 1 detik untuk menghitung seberapa presisi jam tersebut bekerja.

## Eksperimen

- Jalankan perintah go test -v di terminal untuk melihat output hijau PASS pada setiap subtest.
- Jalankan go test -bench=. -benchmem dan amati metrik ns/op serta jumlah alokasi memori B/op.
- Tambahkan kasus uji baru dengan input "//ganda//slash//" dan periksa apakah fungsi lolos pengujian.
- Sengajakan salah satu ekspektasi salah untuk melihat format pelaporan eror t.Errorf yang jelas.

---

## Tantangan

Tulis benchmark untuk membandingkan performa penggabungan string menggunakan operator `+` biasa versus `strings.Builder` pada perulangan 1.000 kata.

---

## Ringkasan

Kamu telah menguasai Table-Driven Tests, subtests, dan benchmarking testing.B. Minggu depan kita mempelajari Profiling pprof dan optimasi memori.
