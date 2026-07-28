# HTTP Server & Testing

> Go | Module 15

## Learning Objectives

- Create HTTP handlers and ServeMux
- Apply the middleware pattern
- Write tests with the testing package
- Create table-driven tests
- Use httptest for HTTP testing

---

## Program: Task API

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

## Explanation

`net/http`: `HandleFunc` registers handlers, `ListenAndServe` starts the server. Middleware: functions wrapping http.Handler. Testing: `go test`, `_test.go` files. Table-driven tests: struct arrays with input/expectations. `httptest` for HTTP tests without a real server.

---

## Experiments

- Change variable values and observe the changes
- Add a new function with different return types
- Replace for loops with range
- Try data types you haven't used yet

---

## Challenge

Build a program applying this week's concepts in a real case study. Use proper error handling. Ensure the code runs with `go run`.

---

## Summary

Module 15 of 16: **HTTP Server & Testing**. Go delivers high performance with simple syntax. Next week: **Final Project: CLI + API**.
