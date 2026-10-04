# Arsitektur net/http Murni: Custom Handlers, Chaining Middleware & REST Routing

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Capstone Gateway | **Minggu 9:** Arsitektur net/http Murni: Custom Handlers, Chaining Middleware & REST Routing
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur paket net/http bawaan Go yang menjadi fondasi web backend tanpa perlu framework berat
- Menguasai antarmuka inti http.Handler dan adapter fungsi http.HandlerFunc
- Membangun pola rantai Middleware idiomatik (Logger, Auth, Panic Recovery) menggunakan fungsi pembungkus
- Menggunakan fitur routing modern Go 1.22+ pada http.NewServeMux ("GET /path", "POST /path/{id}")
- Menerapkan konfigurasi batas waktu server produksi (ReadTimeout, WriteTimeout, IdleTimeout)

---

## Program: Pipeline Middleware API Gateway (Logger, Auth Token & Recovery Panics)

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// 1. Tipe Middleware Idiomatik Go: func(http.Handler) http.Handler
type Middleware func(http.Handler) http.Handler

// Middleware 1: Logging Catatan Akses & Pengukuran Latensi
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mulai := time.Now()
		
		// Lanjutkan ke handler berikutnya di dalam rantai
		next.ServeHTTP(w, r)
		
		latensi := time.Since(mulai)
		log.Printf("[HTTP] %s %s | Durasi: %v | IP: %s", r.Method, r.URL.Path, latensi, r.RemoteAddr)
	})
}

// Middleware 2: Panic Recovery (Mencegah Server Crash jika terjadi runtime error fatal)
func RecoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("[PANIC RECOVERED] Terjadi panic fatal: %v", rec)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{
					"error": "Internal Server Error (Recovered by Gateway)",
				})
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// Helper: Merangkai Banyak Middleware Secara Elegan
func RangkaiMiddleware(handler http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		handler = middlewares[i](handler)
	}
	return handler
}

// Handler Inti Bisnis
func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]any{
		"status":    "HEALTHY",
		"engine":    "Go net/http Pure Core",
		"timestamp": time.Now().Unix(),
	})
}

func main() {
	// Di Go 1.22+, ServeMux mendukung pola method dan path: "GET /health"
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", HealthCheckHandler)

	// Terapkan rantai middleware ke seluruh rute mux
	handlerUtama := RangkaiMiddleware(mux, RecoveryMiddleware, LoggingMiddleware)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      handlerUtama,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	fmt.Println("=== Nusa Edge Gateway Berjalan di Port :8080 ===")
	fmt.Println("Tekan Ctrl+C untuk menghentikan server.")
	
	// Jalankan server HTTP (akan me-listen request masuk)
	// log.Fatal(server.ListenAndServe())
	_ = server // Mock deklarasi agar runnable di playground
}
```

---

## Konsep Kunci

### Mengapa Kebanyakan Perusahaan Besar Menggunakan `net/http` Murni?
Berbeda dengan Node.js (Express) atau Python (Flask) di mana library eksternal wajib digunakan, **standard library `net/http` bawaan Go sudah merupakan web server tingkat produksi berkecepatan sangat tinggi**.
Server `net/http` secara otomatis meluncurkan satu **goroutine independen per request HTTP masuk**, memungkinkan satu server Go melayani ratusan ribu request secara konkuren tanpa konfigurasi rumit!

### Pola Middleware Idiomatik di Go
Sebuah middleware di Go didefinisikan sebagai fungsi yang menerima `http.Handler` dan mengembalikan `http.Handler` baru:
`func MyMiddleware(next http.Handler) http.Handler`
Di dalamnya, Anda mengeksekusi kode pra-request (misal: cek token otentikasi), memanggil `next.ServeHTTP(w, r)`, lalu mengeksekusi kode pasca-request (misal: catat durasi latensi).

### Mencegah Crash dengan Panic Recovery
Jika salah satu endpoint kode programmer mengalami dereferensi pointer `nil`, Go akan melempar `panic`.
Tanpa middleware recovery, seluruh proses server web bisa mati!
Dengan menyematkan `recover()` di dalam `defer` fungsi middleware terluar, server Anda dapat menangkap kepanikan tersebut, mencatat lognya, dan mengembalikan status HTTP 500 ke klien sambil **membiarkan server utama tetap hidup melayani jutaan pengguna lainnya!**

---

---

## Penjelasan untuk Pemula

### Analogi: Gerbang Pemeriksaan Stasiun Kereta Api Cepat
1. **`net/http` Server** seperti stasiun kereta api berkecepatan tinggi: setiap kali ada 1 penumpang datang (*1 request masuk*), stasiun langsung menugaskan 1 petugas robot pribadi (*goroutine*) untuk mendampingi penumpang tersebut.
2. **Rantai Middleware** seperti lorong pintu masuk stasiun: sebelum sampai ke peron kereta (*handler inti*), penumpang harus melewati detektor logam (*Panic Recovery*), memindai tiket barcode (*Auth Middleware*), dan difoto oleh kamera pengawas (*Logging Middleware*).

## Eksperimen

- Tambahkan handler baru yang dengan sengaja memicu panic("database meledak!") dan buktikan server tidak crash berkat RecoveryMiddleware.
- Tambahkan header respons kustom w.Header().Set("X-Powered-By", "Go-1.24-Enterprise") di dalam logging middleware.
- Pelajari cara membaca path parameters dinamis di Go 1.22 menggunakan r.PathValue("id").
- Uji kinerja server menggunakan load testing tool seperti autocannon atau hey.

---

## Tantangan

Buat middleware `AuthBearerMiddleware` yang memeriksa header "Authorization". Jika header tidak diawali dengan "Bearer nusa-token-valid", langsung kembalikan status HTTP 401 Unauthorized tanpa memanggil next handler.

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

Kamu telah menguasai arsitektur net/http murni, rantai middleware, dan recovery panic. Minggu depan kita mempelajari Table-Driven Tests dan Benchmarking.
