# The `net/http` Package

The standard library's `net/http` package provides HTTP client and server implementations.

## Server Basics

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %s!", r.URL.Path)
    })

    http.ListenAndServe(":8080", nil)
}
```

## The Handler Interface

Every HTTP handler in Go implements this interface:

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

## Request and Response

```go
func handler(w http.ResponseWriter, r *http.Request) {
    // Reading request
    method := r.Method
    path := r.URL.Path
    query := r.URL.Query()
    body := r.Body
    headers := r.Header

    // Writing response
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write([]byte(`{"status":"ok"}`))
}
```

## Structuring a Server

```go
type Server struct {
    addr string
    mux  *http.ServeMux
}

func NewServer(addr string) *Server {
    s := &Server{addr: addr, mux: http.NewServeMux()}
    s.routes()
    return s
}

func (s *Server) routes() {
    s.mux.HandleFunc("GET /api/users", s.handleUsersList)
    s.mux.HandleFunc("POST /api/users", s.handleUsersCreate)
}

func (s *Server) Start() error {
    return http.ListenAndServe(s.addr, s.mux)
}
```

## Practice

1. Create a server with multiple route handlers
2. Parse query parameters and request body
3. Set custom response headers and status codes
4. Handle different HTTP methods on the same path
