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

## Model Mental & Diagram Alur Visual

![Diagram CSP Goroutine & Channel Communication Pipeline](/diagrams/goroutine-channel.svg)

```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Kirim Data ──►  │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan pendek.
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data otomatis dalam fungsi; `var` untuk nilai default..
- **Contoh Penggunaan Praktis:**
```go
package main

import "fmt"

func main() {
	age := 25
	name := "Alex"
	fmt.Printf("%s berusia %d tahun\n", name, age)
}
```
- **Hasil Output yang Diharapkan:**
```output
Alex berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa pewarisan..
- **Contoh Penggunaan Praktis:**
```go
package main

import "fmt"

type User struct {
	Name string
}

func (u User) Greet() string {
	return "Halo, " + u.Name
}

func main() {
	u := User{Name: "Budi"}
	fmt.Println(u.Greet())
}
```
- **Hasil Output yang Diharapkan:**
```output
Halo, Budi
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (~2KB memori awal)..
- **Contoh Penggunaan Praktis:**
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	go func() {
		fmt.Println("Berjalan di goroutine terpisah!")
	}()
	time.Sleep(50 * time.Millisecond)
	fmt.Println("Selesai alur utama")
}
```
- **Hasil Output yang Diharapkan:**
```output
Berjalan di goroutine terpisah!
Selesai alur utama
```

### 4. `ch := make(chan int); ch <- 42; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa lock manual..
- **Contoh Penggunaan Praktis:**
```go
package main

import "fmt"

func main() {
	ch := make(chan int)
	go func() {
		ch <- 100
	}()
	result := <-ch
	fmt.Println("Diterima:", result)
}
```
- **Hasil Output yang Diharapkan:**
```output
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

Kamu telah menguasai pprof profiling, escape analysis, dan optimasi memori stack vs heap. Minggu depan adalah Capstone Final: Distributed Rate Limiter & Gateway.
