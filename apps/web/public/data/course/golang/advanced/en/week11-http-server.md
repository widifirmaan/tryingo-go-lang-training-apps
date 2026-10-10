# HTTP Server & Middleware

> **Kategori:** Go | **Level:** Advanced | **Minggu 11:** HTTP Server & Middleware

## Learning Objectives

- net/http: ServeMux, HandleFunc, ListenAndServe
- http.Handler interface and handler chaining
- Middleware pattern: logging, recovery, CORS
- JSON API endpoints: encode/decode request body
- Routing: path params, query string, method dispatch

---

## Program: REST API

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type Item struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

var items = []Item{
    {ID: 1, Name: "Belajar Go"},
    {ID: 2, Name: "Membuat HTTP Server"},
}

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        fmt.Printf("[%s] %s %s\n", r.Method, r.URL.Path, r.RemoteAddr)
        next.ServeHTTP(w, r)
    })
}

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

    req := &http.Request{Method: "GET", URL: nil}
    _ = req
    fmt.Printf("\nSimulasi GET /items -> %d items\n", len(items))
    for _, item := range items {
        fmt.Printf("  - %d: %s\n", item.ID, item.Name)
    }
}
```

---

## Key Concepts

### net/http
HandleFunc, ListenAndServe.

### Middleware
Handler wrapping pattern.

### JSON API
Encode/decode JSON requests and responses.

---

## Experiments

- Add DELETE /items/:id endpoint
- Create CORS middleware: set Access-Control-Allow-Origin
- Add query string filter: /items?limit=10
- Implement graceful shutdown with Shutdown()

---

## Challenge

Build a complete REST API for Task Manager: CRUD endpoints, middleware (logging, auth), JSON responses, proper HTTP status codes.

---

## Summary

Week 11 of 13: **HTTP Server & Middleware** (Level: Advanced). Backend development with Go. Next week: **Testing & CLI Tools**.
