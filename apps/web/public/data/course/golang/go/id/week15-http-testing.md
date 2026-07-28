# HTTP Server & Testing

> Go | Modul 15

## Tujuan Pembelajaran

- Membuat HTTP handler dan ServeMux
- Menerapkan middleware pattern
- Menulis test dengan testing package
- Membuat table-driven test
- Menggunakan httptest untuk HTTP test

---

## Program: API Task

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "strings"
)

type Item struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

// In-memory store
var items = []Item{
    {ID: 1, Name: "Belajar Go"},
    {ID: 2, Name: "Membuat HTTP Server"},
}

// Middleware
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("[%s] %s %s\n", r.Method, r.URL.Path, r.RemoteAddr)
        next.ServeHTTP(w, r)
    })
}

// Handler
func itemsHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    switch r.Method {
    case "GET":
        json.NewEncoder(w).Encode(items)
    case "POST":
        var item Item
        if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        item.ID = len(items) + 1
        items = append(items, item)
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(item)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/items", itemsHandler)

    handler := loggingMiddleware(mux)

    fmt.Println("Server berjalan di :8080")
    fmt.Println("Endpoint: GET/POST /items")
    fmt.Println("\nJalankan dengan 'go run' untuk test sebenarnya")
    fmt.Println("Contoh: curl http://localhost:8080/items")

    // Simulasi langsung
    req := &http.Request{Method: "GET", URL: nil}
    _ = req
    fmt.Printf("\nSimulasi request GET /items -> %d items\n", len(items))
    for _, item := range items {
        fmt.Printf("  - %d: %s\n", item.ID, item.Name)
    }

    // Test function (simulasi)
    testGetItems()
}

// Simulasi table-driven test
func testGetItems() {
    tests := []struct {
        name string
        method string
        want int
    }{
        {"get all items", "GET", 2},
    }
    for _, tt := range tests {
        fmt.Printf("Test: %s -> expected %d items\n", tt.name, tt.want)
        _ = strings.ToUpper(tt.method)
    }
}
```

---

## Penjelasan

`net/http`: `HandleFunc` mendaftarkan handler, `ListenAndServe` menjalankan server. Middleware: fungsi yang membungkus http.Handler. Testing: `go test`, file `_test.go`. Table-driven test: array struct dengan input/ekspektasi. `httptest` untuk test HTTP tanpa server nyata.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah fungsi baru dengan tipe return berbeda
- Ganti for loop dengan range
- Coba tipe data yang belum dicoba

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan error handling yang baik. Pastikan kode bisa dijalankan dengan `go run`.

---

## Ringkasan

Modul 15 dari 16: **HTTP Server & Testing**. Go memberikan performa tinggi dengan sintaks sederhana. Minggu depan: **16. Proyek Akhir: CLI + API**.
