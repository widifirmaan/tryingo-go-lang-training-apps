# HTTP Server — Buka Warung Online

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 11:** HTTP Server & Middleware

## Tujuan Pembelajaran

- `http.NewServeMux` rak pintu, `HandleFunc` pelayan, `ListenAndServe :8080` buka toko, `middleware` satpam log

---

## Program: Warung API

```go
package main
import ("encoding/json"; "fmt"; "net/http")

type Produk struct{ ID int `json:"id"`; Nama string `json:"nama"`; Harga int `json:"harga"` }

var daftar = []Produk{{ID:1, Nama:"Beras", Harga:62000}}

func daftarHandler(w http.ResponseWriter, r *http.Request){
  w.Header().Set("Content-Type","application/json")
  json.NewEncoder(w).Encode(daftar)
}

func log(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
    fmt.Printf("[%s] %s\n", r.Method, r.URL.Path)
    next.ServeHTTP(w,r)
  })
}

func main(){
  mux := http.NewServeMux()
  mux.HandleFunc("/produk", daftarHandler)
  fmt.Println("Buka http://localhost:8080/produk")
  http.ListenAndServe(":8080", log(mux))
}
```

`go run server.go` → buka `http://localhost:8080/produk` → JSON.

---

## Ringkasan

Minggu 11: **Warung Online** — HTTP JSON + middleware log.
