# CLI Tool & HTTP Server

> Kategori: Go, Bahasa Pemrograman | Level: Lanjutan | Week 11

## Tujuan Pembelajaran

- Membangun CLI tool dengan flag
- Membuat HTTP server dengan net/http
- Memahami handler dan ServeMux
- Menggabungkan mode CLI dan HTTP
- Membaca environment variable

---

## Program: Server CLI

```go
package main

import (
    "flag"
    "fmt"
    "log"
    "net/http"
    "os"
)

func main() {
    isServer := false
    for _, arg := range os.Args[1:] {
        if arg == "serve" { isServer = true; break }
    }
    if isServer { startServer() } else { runCLI() }
}

func runCLI() {
    nama := flag.String("name", "World", "nama untuk disapa")
    count := flag.Int("count", 1, "jumlah pengulangan")
    flag.Parse()
    for i := 0; i < *count; i++ {
        fmt.Printf("Hello, %s!\n", *nama)
    }
}

func startServer() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path[1:])
    })
    mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Write([]byte(`{"status":"ok"}`))
    })
    port := os.Getenv("PORT")
    if port == "" { port = "8080" }
    log.Printf("Server running on :%s", port)
    log.Fatal(http.ListenAndServe(":"+port, mux))
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### CLI dengan flag

`flag.String("name", "default", "desc")` -- nilai pointer diakses dengan `*name`. `flag.Parse()` untuk membaca argumen.

### HTTP Server

`http.NewServeMux()` -- router. `HandleFunc("/path", handler)`. Handler menerima `http.ResponseWriter` dan `*http.Request`.

### Mode Gabungan

Satu binary bisa CLI dan HTTP server. `os.Args[1]` memeriksa argumen pertama.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Ubah default flag** -- ganti `"World"` jadi `"Go Developer"`
2. **Tambah route** -- tambahkan `/about` handler yang mengembalikan JSON
3. **Ganti port** -- set `PORT=9090` dan lihat log berubah

---

## Tantangan

Buat program dual-mode: `go run main.go greet -name=Alice` (sapaan) dan `go run main.go serve` (HTTP server port 8080 dengan /hello dan /time).

---

## Ringkasan

Flag untuk CLI, net/http untuk server. Satu binary = CLI + server. Environment variable untuk konfigurasi. Minggu depan: REST API dan middleware.
