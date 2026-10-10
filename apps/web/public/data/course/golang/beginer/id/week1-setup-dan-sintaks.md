# Setup, Toolchain & Sintaks Dasar

> **Kategori:** Go | **Level:** Pemula | **Minggu 1:** Setup, Toolchain & Sintaks Dasar

## Tujuan Pembelajaran

- Memahami peran Go sebagai bahasa compiled untuk backend (roadmap.sh phase 1)
- Menginstall Go dan menulis program pertama (Go Tour: Basics)
- Mengenal toolchain: go run, build, fmt, test, vet (Effective Go)
- Memahami struktur file .go: package, import, func main (Go Tour)
- Menggunakan fmt.Println, fmt.Printf dengan format verb %v, %s, %d, %T

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

### Peran Go\nGo adalah bahasa compiled, statically typed yang dikembangkan Google. Berbeda dengan Python/JS yang interpreted, Go dikompilasi langsung ke binary mesin — menghasilkan eksekusi cepat dan distribusi mudah (single binary).\n\n### Toolchain Utama\n- `go run`: jalankan file .go langsung\n- `go build`: kompilasi ke binary\n- `go fmt`: format kode otomatis\n- `go test`: jalankan test\n- `go vet`: analisis potensi bug\n\n### Struktur File Go\nSetiap file .go: `package` declaration, `import`, `func main()` sebagai entry point.\n\n### Format Verb\n`%s` string, `%d` integer, `%f` float, `%t` boolean, `%T` tipe data, `%v` default.

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
