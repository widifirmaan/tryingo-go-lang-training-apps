# REST API & Middleware

> Category: Go, Programming Language | Level: Advanced | Week 12

## Learning Objectives

- Build REST APIs with method routing
- Apply JSON request/response
- Create middleware patterns
- Add structured logging (slog)
- Write structured APIs

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

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### REST API

Method-based routing (Go 1.22+): `mux.HandleFunc("GET /api/tasks", handler)`. Struct with JSON tags.

### Middleware

Function taking and returning `http.Handler`. Can be chained: `logging(auth(mux))`.

### Structured Logging

`log/slog` (Go 1.21+): `slog.Info("msg", "key", value)` -- JSON output.

---

## Experiments

Try modifying the code:

1. **Add Task field** -- add `Priority int` to Task struct
2. **Add middleware** -- create a CORS middleware
3. **Change log format** -- replace `NewJSONHandler` with `NewTextHandler`

---

## Challenge

Develop REST API todo: GET/POST/PUT/DELETE /api/todos. Add logging and validation middleware.

---

## Summary

REST APIs with method routing. Middleware for cross-cutting concerns. Structured logging. JSON format. Next week: database and deployment.
