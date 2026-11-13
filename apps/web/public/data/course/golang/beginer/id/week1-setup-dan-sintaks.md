# Setup, Toolchain & Sintaks Dasar

> **Kategori:** Go | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Kenapa Materi Ini Penting

Go dipakai Docker, Kubernetes, dan banyak backend high-traffic (Gojek, Tokopedia punya service Go). Bahasanya kecil dan jujur: sedikit keyword, penekanan pada konkurensi, dan hasilnya program cepat yang mudah di-deploy.

Program latihan: *"Halo, Go!"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- Memahami peran Go sebagai bahasa compiled untuk backend (roadmap.sh phase 1)
- Menginstall Go dan menulis program pertama (Go Tour: Basics)
- Mengenal toolchain: go run, build, fmt, test, vet (Effective Go)
- Memahami struktur file .go: package, import, func main (Go Tour)
- Menggunakan fmt.Println, fmt.Printf dengan format verb %v, %s, %d, %T


## Fondasi: Sebelum Menulis Kode

Panduan dasar berikut merangkum konsep pemrograman inti yang berlaku universal.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan - cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung - cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis - error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan - lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis - itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung - inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan - tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

> **Coba langsung di browser tanpa instalasi.** Semua blok kode dapat dijalankan langsung di Playground.

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (Go Toolchain (1.23+))
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

> **Tips Prasyarat:** Setelah install, buka terminal baru agar path sistem `go` terdeteksi otomatis.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
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

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
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
	fmt.Printf("Server Go aktif di http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error server: %v\n", err)
	}
}
```
HTTP API server native Go tanpa dependensi pihak ketiga.

---

### 4. Struktur Direktori Proyek Baru
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

### 5. Tips & Best Practice untuk Pemula
- Gunakan `go build -o app.exe` untuk menghasilkan file binary mandiri yang siap dideploy tanpa instalasi runtime di server tujuan.
- Gunakan `go fmt ./...` sebelum commit untuk memastikan gaya penulisan kode selalu standar.

---

## Program: Halo, Go!

```go
package main

import "fmt"

func main() {
    fmt.Println("Selamat datang di Go!")
    fmt.Println("Go adalah bahasa compiled, statically typed.")

    var nama string = "Gopher"
    versi := 1.24
    aktif := true

    fmt.Printf("Nama: %s\n", nama)
    fmt.Printf("Versi: %.2f\n", versi)
    fmt.Printf("Aktif: %t\n", aktif)
    fmt.Printf("Tipe: %T %T %T\n", nama, versi, aktif)
}
```

---

## Konsep Kunci

### Peran Go\nGo adalah bahasa compiled, statically typed yang dikembangkan Google. Berbeda dengan Python/JS yang interpreted, Go dikompilasi langsung ke binary mesin - menghasilkan eksekusi cepat dan distribusi mudah (single binary).\n\n### Toolchain Utama\n- `go run`: jalankan file .go langsung\n- `go build`: kompilasi ke binary\n- `go fmt`: format kode otomatis\n- `go test`: jalankan test\n- `go vet`: analisis potensi bug\n\n### Struktur File Go\nSetiap file .go: `package` declaration, `import`, `func main()` sebagai entry point.\n\n### Format Verb\n`%s` string, `%d` integer, `%f` float, `%t` boolean, `%T` tipe data, `%v` default.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah fungsi baru dengan tipe return berbeda
- Ganti for loop dengan range
- Coba tipe data yang belum dicoba
- Buat program kecil gabungan 2-3 konsep

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.

---

## Ringkasan

Minggu 1 dari 13: **Setup, Toolchain & Sintaks Dasar** (Level: Pemula). Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **Variabel, Tipe & Control Flow**.
