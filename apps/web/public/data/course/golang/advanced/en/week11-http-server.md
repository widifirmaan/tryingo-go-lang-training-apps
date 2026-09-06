# HTTP Server — Open Go Shop Online

> **Kategori:** Go | **Level:** Advanced | **Minggu 11:** HTTP Server & Middleware

## Learning Objectives

- `http.NewServeMux()` door rack + `HandleFunc("/produk", handler)` waiter + `ListenAndServe(":8080", ...)` open shop (source: go.dev + net/http)
- `w http.ResponseWriter` reply envelope + `r *http.Request` incoming order
- Middleware `log(next)` guard logging each guest

---

## Why This Matters (Non-IT)

Online shop = program listening on `localhost:8080/produk` 24 hours. Go stdlib is enough (no Express!) — 1 file becomes JSON API for phones. Log middleware shows which products sell from `GET` traces.

---

## Program: Go JSON Shop API

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

func daftarHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != "GET" {
    http.Error(w, "GET only", http.StatusMethodNotAllowed)
    return
  }
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(daftar)
}

func log(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    fmt.Printf("[%s] %s\n", r.Method, r.URL.Path)
    next.ServeHTTP(w, r)
  })
}

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/produk", daftarHandler)
  fmt.Println("Open http://localhost:8080/produk")
  if err := http.ListenAndServe(":8080", log(mux)); err != nil {
    fmt.Println("Failed:", err)
  }
}
```

Test: `go run server.go` → browser `http://localhost:8080/produk` → JSON.

---

## Key Concepts

### `ServeMux` + `HandleFunc` = Door Rack + Waiter
`mux.HandleFunc("/produk", daftarHandler)` — pattern `/produk` → function.

### `w` / `r` = Reply/Order
`w.Header().Set(...)` + `Encode(...)` reply JSON. `r.Method`/`r.URL.Path` read order.

### Middleware = Guard Wrapper
`func log(next http.Handler) http.Handler` — log then `next.ServeHTTP`.

---

## Beginner Friendly Explanation

### Analogy: Shop with Guard & Waiter
- **ServeMux = door sign**, **handler = waiter**, **middleware = guard** logging guests.

### Step 0 — Prepare Device
- Same as W1 + browser/`curl`. Port 8080 free.

### 3 Must-Know Terms
1. **Handler/mux**: waiter/sign
2. **Middleware**: wrapper guard
3. **JSON tag**: send label

---

## Experiments

- **Green:** Add `/health` handler "Shop healthy!" → open?
- **Yellow:** `curl -X POST http://localhost:8080/produk` → 405?
- **Red:** Run 2x (port used) → "Failed: address in use"? Kill one.

---

## Challenge

**Full Shop API:** `GET /produk` + `POST /produk` (read `json.NewDecoder(r.Body).Decode(&p)`, `w.WriteHeader(201)`) + `log` middleware + 2 `curl` commands pass.

---

## Mini Glossary

- **ServeMux/Handler**: sign/waiter
- **ResponseWriter/Request**: reply/order

---

## Summary

Week 11 of 13: **Online Shop** (Level: Advanced). Stdlib JSON API. Next: **Testing & CLI**.
