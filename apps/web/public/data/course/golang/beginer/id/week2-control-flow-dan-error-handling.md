# Control Flow Idiomatik: if with Short Statement, switch & Error Handling Eksplisit

> **Kategori:** Go | **Level:** Pondasi Go & Sistem Tipe Statis | **Minggu 2:** Control Flow Idiomatik: if with Short Statement, switch & Error Handling Eksplisit
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi penanganan eror Go: Errors Are Values (Eror adalah nilai biasa, bukan Exception/try-catch)
- Menggunakan pola standar idiomatik Go: if err != nil { return nil, err }
- Membuat Sentinel Errors menggunakan errors.New() dan membungkus eror dengan fmt.Errorf("%w")
- Menguasai sintaks if with short statement (if x, err := fn(); err != nil)
- Mengetahui bahwa Go hanya memiliki satu kata kunci perulangan yaitu for loop yang dapat berperan sebagai while atau foreach

---

## Program: Parser Konfigurasi Gateway & Validasi Format Port Jaringan

```go
package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

// Definisi Kesalahan Baku (Sentinel Errors)
var (
	ErrPortTidakValid   = errors.New("port harus berada di antara 1 dan 65535")
	ErrHostKosong       = errors.New("host tujuan tidak boleh kosong")
	ErrProtokolDitolak = errors.New("protokol harus berupa http atau https")
)

// Fungsi Validasi Konfigurasi Target Gateway
func parseTargetURL(rawURL string) (string, int, error) {
	if strings.TrimSpace(rawURL) == "" {
		return "", 0, ErrHostKosong
	}

	parts := strings.Split(rawURL, ":")
	if len(parts) != 2 {
		return "", 0, fmt.Errorf("format URL salah: %s (harus host:port)", rawURL)
	}

	host := parts[0]
	portStr := parts[1]

	// strconv.Atoi mengembalikan (int, error)
	port, err := strconv.Atoi(portStr)
	if err != nil {
		return "", 0, fmt.Errorf("port bukan angka valid: %w", err)
	}

	if port < 1 || port > 65535 {
		return "", 0, ErrPortTidakValid
	}

	return host, port, nil
}

func main() {
	daftarTarget := []string{
		"auth-service.internal:8081",
		"payment-api.internal:99999", // Port invalid
		"billing-worker:invalid_port", // Bukan angka
		"analytics-service:443",
	}

	fmt.Println("=== Validasi Konfigurasi Gateway ===")

	// Go hanya memiliki 1 jenis perulangan: for loop!
	for _, target := range daftarTarget {
		// if with short statement: scope 'err' terisolasi hanya di dalam blok if
		if host, port, err := parseTargetURL(target); err != nil {
			fmt.Printf("[REJECT] Target '%s' GAGAL: %v\n", target, err)
		} else {
			fmt.Printf("[ACCEPT] Target '%s' -> Host: %s, Port: %d\n", target, host, port)
		}
	}
}
```

---

## Konsep Kunci

### Mengapa Go Tidak Memiliki `try-catch` / Exceptions?
Di bahasa seperti Java, Python, atau JavaScript, sebuah fungsi bisa melempar exception kapan saja secara tak terlihat (*invisible control flow*). Pengembang sering lupa membungkusnya dengan `try-catch`, menyebabkan aplikasi crash tiba-tiba di production.

**Prinsip Go: Eror adalah Nilai (*Errors are values*)**:
1. Eror adalah tipe interface bawaan biasa: `type error interface { Error() string }`.
2. Jika fungsi berisiko gagal, fungsi tersebut **wajib mengembalikan `error` sebagai nilai terakhir**.
3. Pemanggil fungsi wajib memeriksa `if err != nil`. Tidak ada keajaiban sembunyi-sembunyi!

### `if with short statement`
Go mengizinkan eksekusi satu instruksi sebelum evaluasi kondisi:
`if host, port, err := parseTargetURL(url); err != nil { ... }`
Variabel `host`, `port`, dan `err` **hanya hidup di dalam cakupan blok `if-else` tersebut**, menjaga namespace luar tetap bersih dan mencegah kebocoran variabel!

### Hanya Ada Satu Loop: `for`
Go membuang kata kunci `while` dan `do-while`.
- `for i := 0; i < 10; i++`: Loop standar.
- `for kondisi`: Berperan sebagai `while`.
- `for { ... }`: Loop tak terhingga (*infinite loop*).
- `for idx, val := range collection`: Berperan sebagai `foreach`.

---

---

## Penjelasan untuk Pemula

### Analogi: Pemeriksaan Bagasi Bandara & Resep Obat Dokter
1. **Try-Catch di bahasa lain** seperti granat tersembunyi di dalam koper: Anda tidak tahu koper mana yang meledak sampai Anda membukanya di tengah jalan (*aplikasi tiba-tiba crash*).
2. **Error di Go** seperti stempel bea cukai di paspor: setiap tas diperiksa satu per satu di loket meja (*if err != nil*). Jika tas membawa barang terlarang, petugas langsung mengembalikan tas ke pemiliknya di meja loket saat itu juga.

## Eksperimen

- Masukkan URL tanpa port (misal: "google.com") dan amati pesan eror kustom format URL salah.
- Gunakan errors.Is(err, ErrPortTidakValid) untuk memeriksa jenis sentinel error secara terprogram.
- Tulis for loop bergaya while dengan kondisi pencacah counter < 5.
- Uji pembungkusan eror menggunakan %w dan bongkar menggunakan errors.Unwrap(err).

---

## Tantangan

Buat fungsi `ValidasiHeaderAPI(headers map[string]string) error` yang memeriksa keberadaan header "Authorization" dan "X-Request-ID". Kembalikan error deskriptif jika salah satu header penting tersebut hilang.

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

Kamu telah menguasai error handling eksplisit, sentinel errors, dan loop for serbaguna. Minggu depan kita mempelajari Slices, Arrays, dan Maps mendalam.
