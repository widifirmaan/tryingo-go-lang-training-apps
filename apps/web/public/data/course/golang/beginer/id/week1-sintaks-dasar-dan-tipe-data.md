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

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Go for Visual Studio Code** (`golang.go`): Dukungan resmi Go: intellisense (gopls), debug (delve), format (gofmt)

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension golang.go
```

---

### 2. Instalasi Runtime & Dependency (Go Toolchain (1.23+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install GoLang.Go
```

**macOS (Terminal / Homebrew):**
```bash
brew install go
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install golang-go
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
go version
```

Output yang diharapkan:
```output
go version go1.23.x ...
```

> 💡 **Tips Prasyarat:** Setelah install, buka terminal baru agar path sistem `go` terdeteksi otomatis.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-go-app && cd my-go-app
go mod init my-go-app
touch main.go
```
- **Keterangan:** Membuat file go.mod untuk manajemen dependensi dan deklarasi modul Go resmi.
- **Pindah ke direktori project:**
```bash
cd my-go-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
go run main.go
```
Akses di browser atau terminal: `Terminal / http://localhost:8080 (jika HTTP server)`

> ℹ️ Perintah `go run` mengompilasi dan mengeksekusi program dalam memori seketika.

**File Titik Masuk Utama (`main.go`):**
```go
package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"active","time":"%s","runtime":"Go 1.23"}`, time.Now().Format(time.RFC3339))
	})

	port := ":8080"
	fmt.Printf("🚀 Server Go aktif di http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error server: %v\n", err)
	}
}
```
HTTP API server native Go tanpa dependensi pihak ketiga.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-go-app/
├── cmd/
│   └── api/
│       └── main.go      # Titik masuk aplikasi
├── internal/            # Kode internal privat yang aman
│   ├── handler/         # HTTP handlers
│   └── service/         # Logika domain
├── go.mod               # Definisi modul & versi Go
└── go.sum               # Hash checksum dependensi
```
Standar Standard Go Project Layout yang direkomendasikan komunitas.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `go build -o app.exe` untuk menghasilkan file binary mandiri yang siap dideploy tanpa instalasi runtime di server tujuan.
- Gunakan `go fmt ./...` sebelum commit untuk memastikan gaya penulisan kode selalu standar.

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

Kamu telah menguasai arsitektur package Go, zero values, dan multiple return values. Minggu depan kita mempelajari Error Handling eksplisit dan alur kontrol idiomatik.
