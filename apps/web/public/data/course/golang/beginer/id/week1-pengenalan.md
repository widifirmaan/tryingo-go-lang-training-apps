# Golang Concurrent Microservices

> **Kategori:** Backend & Systems  
> **Level:** Pemula  
> **Minggu 1:** Pengenalan Go & Persiapan Lingkungan

---

## 📋 Tujuan Pembelajaran

Setelah menyelesaikan modul ini, Anda akan mampu:

1. **Memahami apa itu Go (Golang)** dan mengapa banyak digunakan di industri
2. **Menginstal Go** dan mengkonfigurasi workspace
3. **Menulis program Go pertama** — "Hello, World!"
4. **Memahami struktur dasar** program Go (package, import, func, main)
5. **Menggunakan Go modules** untuk manajemen dependensi

---

## 🖥️ Sebelum Mulai: Alat yang Dibutuhkan

### 1. Install Go

**Langkah-langkah:**
1. Buka [go.dev/dl](https://go.dev/dl)
2. Download installer sesuai OS Anda (Windows/Mac/Linux)
3. **Windows**: Jalankan installer, ikuti wizard
4. **Mac**: Buka .pkg dan ikuti petunjuk
5. **Linux**: `sudo tar -C /usr/local -xzf go1.22.*.linux-amd64.tar.gz`

**Verifikasi instalasi:**
Buka terminal/command prompt, ketik:
```bash
go version
```
Jika muncul `go version go1.22.x ...`, berarti instalasi berhasil! ✅

### 2. Code Editor: VS Code

Download di [code.visualstudio.com](https://code.visualstudio.com)

**WAJIB install ekstensi:**
- **Go** oleh Go Team at Google (yang resmi)

Cara install: VS Code > Extensions (Ctrl+Shift+X) > cari "Go" > Install

### 3. Git (Opsional sekarang)
```bash
# Cek apakah sudah terinstall
git --version

# Download: https://git-scm.com
```

### 4. Tryngo Playground
Bisa coba Go langsung di browser tanpa install. Klik "Coba Sendiri" di setiap contoh kode.

---

## 🎯 Kenapa Go?

Go (Golang) dibuat oleh Google pada 2009. Go dirancang untuk:

| Masalah | Solusi Go |
|---------|-----------|
| Kompilasi lambat | Kompilasi sangat cepat (detik) |
| Syntax kompleks | Sintaks sederhana, mudah dipelajari |
| Concurrency sulit | Goroutine + channel = concurrency mudah |
| Dependency management ribet | Go Modules built-in |

**Perusahaan yang pakai Go:** Google, Uber, Twitch, Dropbox, Cloudflare, Docker, Kubernetes

---

## 📝 Program Go Pertama

### 1. Buat Folder Proyek
```bash
mkdir hello-tryngo
cd hello-tryngo
```

### 2. Inisialisasi Module
```bash
go mod init hello-tryngo
```
Ini akan membuat file `go.mod`. File ini seperti `package.json` di Node.js.

### 3. Buat File main.go
Buat file `main.go` dengan isi:

```go
package main

import "fmt"

func main() {
    fmt.Println("Halo, Tryngo! Saya belajar Go!")
    fmt.Println("Saya bisa coding!")
}
```

### 4. Jalankan!
```bash
go run main.go
```

Output:
```
Halo, Tryngo! Saya belajar Go!
Saya bisa coding!
```

### Penjelasan Setiap Baris:

| Baris Kode | Artinya |
|------------|---------|
| `package main` | Program ini adalah executable (bisa dijalankan langsung) |
| `import "fmt"` | Mengambil package fmt (format) untuk input/output |
| `func main()` | Fungsi utama — dieksekusi pertama kali saat program dijalankan |
| `fmt.Println(...)` | Fungsi untuk mencetak teks ke layar |

### 📌 Aturan Penting Go:
- **Setiap program Go butuh `package main`** dan `func main()`
- **Tidak boleh ada spasi** sebelum kurung fungsi (`func main() {` bukan `func main () {`)
- **Setiap import yang tidak dipakai = error** (Go memaksa kode bersih)
- **Titik koma tidak wajib** (Go otomatis menambahkannya)

---

## 🏗️ Struktur Program Go

```go
package main  // 1. Package declaration

import (      // 2. Import packages
    "fmt"
    "os"
)

// 3. Fungsi main — entry point
func main() {
    // 4. Kode yang dieksekusi
    nama := "Tryingo"
    fmt.Printf("Halo, %s!\n", nama)
    
    // 5. Exit dengan kode 0 (sukses)
    os.Exit(0)
}
```

### Go Modules (go.mod)

File `go.mod` adalah jantung manajemen dependensi Go:
```
module hello-tryngo

go 1.22.0
```

- `module`: Nama modul (biasanya URL repo GitHub)
- `go`: Versi Go yang digunakan

### Menambah Dependensi Eksternal:
```bash
go get github.com/gin-gonic/gin
```
Go otomatis mendownload dan menambahkan ke `go.mod` + membuat `go.sum`.

---

## 💻 Latihan Praktik

### Latihan 1: Modify Hello World
Ubah program Hello World untuk:
1. Mencetak nama Anda
2. Mencetak umur Anda
3. Mencetak "Saya belajar Go di Tryngo!"

### Latihan 2: Multiple Print
Gunakan fmt.Println untuk mencetak:
```go
fmt.Println("Baris 1")
fmt.Println("Baris 2")
fmt.Println("Baris 3")
```
Apa yang terjadi? Coba juga dengan fmt.Print (tanpa ln).

### Latihan 3: Go Module Explorer
1. Buat folder baru `explore-go`
2. Inisialisasi module
3. Buat main.go yang mencetak 3 kalimat berbeda
4. Jalankan dengan `go run`

---

## 🏗️ Proyek: CLI Greeter

Buat program Command Line Interface (CLI) sederhana:

### Spesifikasi:
1. Program mencetak pesan selamat datang
2. Mencetak instruksi penggunaan
3. Mencetak 3 motivasi belajar coding
4. Format output rapi dengan garis pemisah

### Contoh Output:
```
========================================
  SELAMAT DATANG DI TRYNGO GO COURSE
========================================

Halo! Selamat memulai perjalanan belajar Go!

🔥 Motivasi Hari Ini:
1. Setiap expert dulunya adalah pemula
2. Kode yang baik ditulis sedikit demi sedikit
3. Error adalah guru terbaik

========================================
  Terus belajar, jangan menyerah!
========================================
```

### Kode Dasar (Lengkapi sendiri):
```go
package main

import "fmt"

func main() {
    fmt.Println("========================================")
    fmt.Println("  SELAMAT DATANG DI TRYNGO GO COURSE")
    fmt.Println("========================================")
    fmt.Println()
    fmt.Println("Halo! Selamat memulai perjalanan belajar Go!")
    // TODO: Tambahkan 3 motivasi
    // TODO: Tambahkan footer
}
```

---

## 📖 Ringkasan

### Apa yang Sudah Dipelajari:
1. **Apa itu Go** — Bahasa pemrograman modern buatan Google
2. **Instalasi** — Go compiler, VS Code, ekstensi Go
3. **Program pertama** — package main, import, func main, fmt.Println
4. **Go Modules** — go mod init, go.mod, dependensi
5. **Cara menjalankan** — go run, go build

### 🔑 Istilah Penting:
| Istilah | Arti |
|---------|------|
| Package | Kumpulan file Go dalam satu folder |
| Module | Kumpulan package dengan versi |
| func | Keyword untuk mendeklarasikan fungsi |
| import | Memasukkan package lain |
| Entry point | Titik mulai program (func main) |

### 🚀 Minggu Depan:
Minggu 2: **Variabel, Tipe Data, dan Control Flow**

Kita akan belajar:
- Variabel dan konstanta
- Tipe data (int, string, bool, float)
- If/else, switch
- Looping dengan for

> **💡 Tips untuk Pemula Absolut:**
> 1. **Go adalah bahasa yang ramah untuk pemula** — sintaksnya bersih dan eksplisit
> 2. **Jangan takut error** — Error Go sangat deskriptif dan mudah dipahami
> 3. **go run vs go build**: `go run` untuk testing, `go build` untuk produksi
> 4. **Manfaatkan go doc** — `go doc fmt.Println` untuk dokumentasi
> 5. **Latihan setiap hari** — Minimal 30 menit sehari

---

**Selamat!** Anda sudah menyelesaikan minggu pertama Go. Sekarang Anda sudah bisa menulis dan menjalankan program Go! 🎉
