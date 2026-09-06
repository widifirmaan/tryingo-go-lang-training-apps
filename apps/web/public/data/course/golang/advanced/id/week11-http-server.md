# HTTP Server — Buka Warung Online Go

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 11:** HTTP Server & Middleware

## Tujuan Pembelajaran

- `http.NewServeMux()` rak pintu + `HandleFunc("/produk", handler)` pelayan + `ListenAndServe(":8080", ...)` buka toko (sumber: go.dev/doc/articles/wiki + net/http)
- `w http.ResponseWriter` amplop balas + `r *http.Request` pesanan masuk
- Middleware `log(next)` satpam catat tiap tamu (pola bungkus handler)

---

## Kenapa Ini Penting Buat Kamu?

Warung online = program yang dengar `localhost:8080/produk` 24 jam. Go stdlib cukup (tanpa Express!) — 1 file jadi API JSON untuk HP. Middleware log tahu produk apa laris dari jejak `GET`.

---

## Program: Warung API JSON Go

```go
package main

import (
  "encoding/json"
  "fmt"
  "net/http"
)

type Produk struct {
  ID    int    `json:"id"`
  Nama  string `json:"nama"`
  Harga int    `json:"harga"`
}

var daftar = []Produk{{ID: 1, Nama: "Beras", Harga: 62000}}

// Pelayan: baca pesanan (r), tulis balasan (w)
func daftarHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != "GET" {
    http.Error(w, "Hanya GET", http.StatusMethodNotAllowed)
    return
  }
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(daftar)
}

// Satpam: bungkus handler, catat, teruskan
func log(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    fmt.Printf("[%s] %s\n", r.Method, r.URL.Path)
    next.ServeHTTP(w, r)
  })
}

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/produk", daftarHandler)
  fmt.Println("Buka http://localhost:8080/produk")
  // Kegagalan dengar (port dipakai) harus ditangani!
  if err := http.ListenAndServe(":8080", log(mux)); err != nil {
    fmt.Println("Gagal buka:", err)
  }
}
```

Test: `go run server.go` → browser `http://localhost:8080/produk` → JSON. `curl -X POST` → `405 Hanya GET`.

---

## Konsep Kunci

### `ServeMux` + `HandleFunc` = Rak Pintu + Pelayan
`mux.HandleFunc("/produk", daftarHandler)` — pola `/produk` → fungsi.

### `w` / `r` = Balas/Pesan
`w.Header().Set(...)` + `Encode(...)` balas JSON. `r.Method`/`r.URL.Path` baca pesanan.

### Middleware = Bungkus Satpam
`func log(next http.Handler) http.Handler` — catat lalu `next.ServeHTTP`.

---

## Penjelasan untuk Pemula

### Analogi: Warung dengan Satpam & Pelayan
- **ServeMux = papan pintu**, **handler = pelayan**, **middleware = satpam** catat tamu.

### Langkah 0 — Siapkan Device
- Sama W1 + browser/`curl`. Port 8080 bebas (`lsof -i :8080` kosong).

### Cara Komputer Membaca
1. `ListenAndServe(":8080", ...)` → dengar.
2. Browser `GET /produk` → mux cocok → `log` catat → `daftarHandler` → JSON.

### 3 Istilah Wajib
1. **Handler/mux**: pelayan/papan
2. **Middleware**: satpam bungkus
3. **JSON tag**: label kirim

---

## Eksperimen

- **Hijau:** Tambah `/sehat` handler "Warung sehat!" → buka?
- **Kuning:** `curl -X POST http://localhost:8080/produk` → 405?
- **Merah:** Jalankan 2x (port dipakai) → "Gagal buka: address in use"? Matikan 1.

---

## Tantangan

**Warung API Lengkap:** `GET /produk` + `POST /produk` (baca `json.NewDecoder(r.Body).Decode(&p)`, `w.WriteHeader(201)`) + `log` middleware + `curl` 2 perintah lulus.

---

## Glosarium Mini

- **ServeMux/Handler**: papan/pelayan
- **ResponseWriter/Request**: balas/pesan
- **Middleware**: satpam

---

## Ringkasan

Minggu 11 dari 13: **Warung Online** (Level: Lanjutan). API JSON stdlib. Minggu depan: **Testing & CLI**.
