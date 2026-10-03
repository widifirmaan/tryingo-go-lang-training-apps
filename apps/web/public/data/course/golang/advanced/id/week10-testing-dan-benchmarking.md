# Testing Idiomatik & Benchmarking: Table-Driven Tests, Subtests & testing.B

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Capstone Gateway | **Minggu 10:** Testing Idiomatik & Benchmarking: Table-Driven Tests, Subtests & testing.B
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

![Diagram CSP Goroutine & Channel Communication Pipeline](/diagrams/goroutine-channel.svg)

```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Kirim Data ──► │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan deklarasi pendek (Short Declaration).
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.
- **Contoh Penggunaan Praktis:**
```javascript
age := 25
name := "Alex Iskandar"
fmt.Printf("%s berusia %d tahun
", name, age);
```
- **Hasil Output yang Diharapkan:**
```text
Alex Iskandar berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.
- **Contoh Penggunaan Praktis:**
```javascript
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / fungsi bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).
- **Contoh Penggunaan Praktis:**
```javascript
go func() {
  fmt.Println("Berjalan konkuren di goroutine terpisah!")
}()
```
- **Hasil Output yang Diharapkan:**
```text
Dieksekusi asinkron tanpa memblokir alur utama program
```

### 4. `ch := make(chan string); ch <- val; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.
- **Contoh Penggunaan Praktis:**
```javascript
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result);
```
- **Hasil Output yang Diharapkan:**
```text
Diterima: 100
```


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

Kamu telah menguasai Table-Driven Tests, subtests, dan benchmarking testing.B. Minggu depan kita mempelajari Profiling pprof dan optimasi memori.
