# Profiling Produksi: net/http/pprof, Heap Allocation & Escape Analysis

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Capstone Gateway | **Minggu 11:** Profiling Produksi: net/http/pprof, Heap Allocation & Escape Analysis
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami cara mengaktifkan endpoint diagnostik industri bawaan Go menggunakan `import _ "net/http/pprof"`
- Menganalisis profil memori (Heap Profile) untuk menemukan fungsi yang menyebabkan kebocoran memori (Memory Leak)
- Menganalisis profil CPU untuk menemukan fungsi terpanas (*hot spots*) yang memakan siklus prosesor tertinggi
- Memahami Escape Analysis (`go build -gcflags="-m"`): bagaimana compiler menentukan variabel hidup di Stack vs Heap
- Mengurangi tekanan Garbage Collector (GC) untuk mencapai latensi p99 sub-milidetik pada server gateway

---

## Program: Server Diagnostik Profiling Memori & Pendeteksi Kebocoran Alokasi

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	// Import blank identifier (_) otomatis mendaftarkan endpoint /debug/pprof ke default ServeMux!
	_ "net/http/pprof"
	"time"
)

// Simulasi Fungsi yang Memiliki Efisiensi Alokasi Memori Berbeda
func alokasiBorosHeap() []byte {
	// Variabel lolos (escapes) ke Heap karena dikembalikan sebagai pointer/slice besar
	data := make([]byte, 1024*1024) // 1 Megabyte
	data[0] = 42
	return data
}

func alokasiHematStack() int {
	// Tetap berada di Stack: Sangat cepat, nol beban Garbage Collector (GC)!
	var buffer [64]byte
	buffer[0] = 7
	return int(buffer[0])
}

func simulasiBebanTrafik() {
	for {
		_ = alokasiBorosHeap()
		_ = alokasiHematStack()
		time.Sleep(10 * time.Millisecond)
	}
}

func main() {
	// Menjalankan simulasi beban di latar belakang
	go simulasiBebanTrafik()

	fmt.Println("=== Nusa Performance Diagnostic Node (pprof) ===")
	fmt.Println("Server pprof aktif di: http://localhost:6060/debug/pprof/")
	fmt.Println("Gunakan perintah analisis profil CPU / Memori:")
	fmt.Println("  1. go tool pprof http://localhost:6060/debug/pprof/heap")
	fmt.Println("  2. go tool pprof http://localhost:6060/debug/pprof/profile?seconds=5")

	// Server khusus diagnostik pprof internal (Port terpisah dari traffic publik)
	serverPprof := &http.Server{
		Addr: ":6060",
	}

	log.Printf("[PPROF] Server diagnostik mendengarkan di port :6060...")
	_ = serverPprof // Runnable mock
}
```

---

## Konsep Kunci

### Mengapa Go Menjadi Raja Server Berlatensi Rendah?
Bahasa dengan Garbage Collector seperti Java sering menderita jeda *Stop-The-World (STW)* yang membekukan transaksi perbankan selama ratusan milidetik.
Go mendesain Garbage Collector modern yang memiliki jeda STW **kurang dari 1 milidetik**!
Namun untuk aplikasi bernilai tinggi (seperti API Gateway yang melayani 100.000 RPS), kunci utamanya adalah **menghindari alokasi di Heap sebisa mungkin**.

### Stack vs Heap & Escape Analysis
1. **Stack Memory**: Sangat cepat! Variabel dialokasikan dan dibersihkan seketika saat fungsi selesai tanpa campur tangan Garbage Collector.
2. **Heap Memory**: Lebih lambat. Objek yang dialokasikan di Heap harus dipindai dan dibersihkan oleh Garbage Collector.
Compiler Go memiliki fitur **Escape Analysis**:
Compiler secara otomatis memeriksa: *"Apakah variabel ini masih dibaca setelah fungsi keluar?"*. Jika ya (misalnya mengembalikan pointer struct keluar), variabel tersebut **"lolos (*escapes*)" ke Heap**.

### Keajaiban `pprof` di Production
Cukup tambahkan satu baris: `import _ "net/http/pprof"`.
Server Anda langsung memiliki rute `/debug/pprof/heap` dan `/debug/pprof/profile`.
Anda dapat menghubungkan alat `go tool pprof` dari laptop Anda untuk melihat visualisasi grafik alur panggilan fungsi (*flamegraph*) secara real-time langsung dari server produksi yang sedang melayani jutaan pengguna!

---

---

## Penjelasan untuk Pemula

### Analogi: Meja Tulis Pribadi (Stack) vs Gudang Arsip Bersama (Heap)
1. **Stack Memory** seperti secarik kertas coretan di meja tulis Anda: saat Anda selesai menghitung, Anda langsung meremas kertas dan membuangnya ke tong sampah meja dalam 0.1 detik (*bersih instan tanpa petugas kebersihan*).
2. **Heap Memory** seperti lemari arsip umum di lantai bawah: Anda harus mencatat nomor registrasi, meletakkan berkas di rak bersama, dan memanggil petugas kebersihan (*Garbage Collector*) untuk memeriksa berkas mana yang sudah kedaluwarsa.
3. **pprof** seperti kamera sinar-X yang menunjukkan tumpukan map mana di lemari arsip yang paling tebal dan membuat ruangan berdebu.

## Eksperimen

- Jalankan go build -gcflags="-m" main.go di terminal dan amati pesan compiler: "data escapes to heap" vs "buffer does not escape".
- Buka URL http://localhost:6060/debug/pprof/ di browser Anda untuk melihat dashboard metrik profil memori mentah.
- Gunakan sync.Pool untuk mendaur ulang objek byte buffer yang sering dipakai ulang guna menurunkan alokasi heap ke angka 0.
- Buat grafik visual SVG flamegraph menggunakan perintah go tool pprof -http=:8081 profile.pb.gz.

---

## Tantangan

Optimalkan fungsi pembentuk string yang boros heap dengan mengganti operasi `fmt.Sprintf` menggunakan `strings.Builder` dengan alokasi awal `builder.Grow(128)`, lalu buktikan alokasi heap berkurang drastis dengan benchmark.

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

Kamu telah menguasai pprof profiling, escape analysis, dan optimasi memori stack vs heap. Minggu depan adalah Capstone Final: Distributed Rate Limiter & Gateway.
