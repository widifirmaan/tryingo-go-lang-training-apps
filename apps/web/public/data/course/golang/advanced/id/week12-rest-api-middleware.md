# REST API & Middleware

> Kategori: Go, Bahasa Pemrograman | Level: Lanjutan | Week 12

## Tujuan Pembelajaran

- Membangun REST API dengan method routing
- Menerapkan JSON request/response
- Membuat middleware pattern
- Menambahkan structured logging (slog)
- Menulis API yang terstruktur

---

## Program: API Task

```go
package main

import (
    "encoding/json"
    "log"
    "log/slog"
    "net/http"
    "os"
    "sync"
    "time"
)

type Task struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
    Done bool   `json:"done"`
}

var (
    tasks  []Task
    nextID = 1
    mu     sync.Mutex
)

func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        slog.Info("request", "method", r.Method, "path", r.URL.Path, "duration", time.Since(start))
    })
}

func auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.Header.Get("Authorization") == "" {
            http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func getTasks(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    defer mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(tasks)
}

func createTask(w http.ResponseWriter, r *http.Request) {
    var task Task
    if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
        http.Error(w, `{"error":"invalid json"}`, http.StatusBadRequest)
        return
    }
    mu.Lock()
    task.ID = nextID; nextID++
    tasks = append(tasks, task)
    mu.Unlock()
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}

func main() {
    slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
    mux := http.NewServeMux()
    mux.HandleFunc("GET /api/tasks", getTasks)
    mux.HandleFunc("POST /api/tasks", createTask)
    app := logging(auth(mux))
    port := os.Getenv("PORT")
    if port == "" { port = "8080" }
    slog.Info("server starting", "port", port)
    log.Fatal(http.ListenAndServe(":"+port, app))
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### REST API

Method-based routing (Go 1.22+): `mux.HandleFunc("GET /api/tasks", handler)`. Struct dengan JSON tags.

### Middleware

Fungsi yang menerima dan mengembalikan `http.Handler`. Bisa dirantai: `logging(auth(mux))`.

### Structured Logging

`log/slog` (Go 1.21+): `slog.Info("msg", "key", value)` -- output JSON.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah field Task** -- tambahkan `Priority int` ke Task
2. **Tambah middleware** -- buat middleware CORS
3. **Ubah format log** -- ganti `NewJSONHandler` jadi `NewTextHandler`

---

## Tantangan

Kembangkan REST API todo: GET/POST/PUT/DELETE /api/todos. Tambahkan middleware logging dan validasi.

---

## Ringkasan

REST API dengan method routing. Middleware untuk cross-cutting concerns. Structured logging. JSON format. Minggu depan: database dan deployment.
