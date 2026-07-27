# CLI Tools & HTTP Server

> Category: Go, Programming Language | Level: Advanced | Week 11

## Learning Objectives

- Build CLI tools with flag
- Create HTTP servers with net/http
- Understand handlers and ServeMux
- Combine CLI and HTTP modes
- Read environment variables

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
    for _, arg := range os.Args[1:] { if arg == "serve" { isServer = true; break } }
    if isServer { startServer() } else { runCLI() }
}

func runCLI() {
    name := flag.String("name", "World", "name to greet")
    count := flag.Int("count", 1, "repeat count")
    flag.Parse()
    for i := 0; i < *count; i++ { fmt.Printf("Hello, %s!\n", *name) }
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

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### CLI with flag

`flag.String("name", "default", "desc")` -- pointer value accessed with `*name`. `flag.Parse()` reads args.

### HTTP Server

`http.NewServeMux()` -- router. `HandleFunc("/path", handler)`. Handler: `http.ResponseWriter` + `*http.Request`.

### Combined Mode

One binary = CLI + HTTP server. `os.Args[1]` checks first argument.

---

## Experiments

Try modifying the code:

1. **Change flag default** -- replace "World" with "Go Developer"
2. **Add route** -- add `/about` handler returning JSON
3. **Change port** -- set `PORT=9090` and see log change

---

## Challenge

Build dual-mode program: `go run main.go greet -name=Alice` (greeting) and `go run main.go serve` (HTTP server port 8080 with /hello and /time).

---

## Summary

Flag for CLI, net/http for server. One binary = CLI + server. Environment variables for config. Next week: REST API and middleware.
