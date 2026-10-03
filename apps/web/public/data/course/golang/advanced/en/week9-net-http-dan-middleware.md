# Pure net/http Architecture: Custom Handlers, Middleware Chaining & REST

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Gateway Capstone | **Minggu 9:** Pure net/http Architecture: Custom Handlers, Middleware Chaining & REST

## Learning Objectives

- Master the standard library net/http package powering cloud microservices without third-party frameworks
- Internalize the canonical http.Handler interface alongside the http.HandlerFunc adapter
- Construct idiomatic Middleware Chaining pipelines (Logging, Auth, Panic Recovery) via decorator wrappers
- Deploy modern Go 1.22+ HTTP path patterns on http.NewServeMux ("GET /path", "POST /path/{id}")
- Configure production-grade server timeouts (ReadTimeout, WriteTimeout, IdleTimeout) hardening against Slowloris attacks

---

## Program: Production API Gateway Middleware Pipeline with Panic Recovery

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// 1. Tipe Middleware Idiomatik Go: func(http.Handler) http.Handler
type Middleware func(http.Handler) http.Handler

// Middleware 1: Logging Catatan Akses & Pengukuran Latensi
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		mulai := time.Now()
		
		// Lanjutkan ke handler berikutnya di dalam rantai
		next.ServeHTTP(w, r)
		
		latensi := time.Since(mulai)
		log.Printf("[HTTP] %s %s | Durasi: %v | IP: %s", r.Method, r.URL.Path, latensi, r.RemoteAddr)
	})
}

// Middleware 2: Panic Recovery (Mencegah Server Crash jika terjadi runtime error fatal)
func RecoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				log.Printf("[PANIC RECOVERED] Terjadi panic fatal: %v", rec)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(map[string]string{
					"error": "Internal Server Error (Recovered by Gateway)",
				})
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// Helper: Merangkai Banyak Middleware Secara Elegan
func RangkaiMiddleware(handler http.Handler, middlewares ...Middleware) http.Handler {
	for i := len(middlewares) - 1; i >= 0; i-- {
		handler = middlewares[i](handler)
	}
	return handler
}

// Handler Inti Bisnis
func HealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]any{
		"status":    "HEALTHY",
		"engine":    "Go net/http Pure Core",
		"timestamp": time.Now().Unix(),
	})
}

func main() {
	// Di Go 1.22+, ServeMux mendukung pola method dan path: "GET /health"
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", HealthCheckHandler)

	// Terapkan rantai middleware ke seluruh rute mux
	handlerUtama := RangkaiMiddleware(mux, RecoveryMiddleware, LoggingMiddleware)

	server := &http.Server{
		Addr:         ":8080",
		Handler:      handlerUtama,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	fmt.Println("=== Nusa Edge Gateway Berjalan di Port :8080 ===")
	fmt.Println("Tekan Ctrl+C untuk menghentikan server.")
	
	// Jalankan server HTTP (akan me-listen request masuk)
	// log.Fatal(server.ListenAndServe())
	_ = server // Mock deklarasi agar runnable di playground
}
```

---

## Key Concepts

### Why Production Teams Prefer Standard `net/http`
Unlike Node.js or Python requiring external frameworks to achieve baseline routing, **Go's native `net/http` is an industrial-grade, hyper-performant production web engine**.
The engine automatically spawns an **isolated goroutine per incoming HTTP connection**, natively scaling to hundreds of thousands of concurrent clients out of the box!

### The Idiomatic Go Middleware Pattern
A standard Go middleware is an architectural decorator:
`func Middleware(next http.Handler) http.Handler`
It intercepts requests, executes pre-computation (validating tokens), delegates down the chain `next.ServeHTTP(w, r)`, and benchmarks post-computation metrics (recording latency timers).

### The Panic Recovery Safety Net
If a route dereferences a `nil` pointer, the runtime triggers a `panic`.
Without recovery middleware, unhandled panics terminate the server process!
Invoking `recover()` inside an outer deferred middleware boundary intercepts panics gracefully, logging stack traces and emitting HTTP 500 responses while **keeping the global server instance humming safely for all other clients!**

---

---

## Beginner Friendly Explanation

### Analogy: Automated High-Speed Transit Turnstiles
1. **`net/http` Servers** are high-speed rail terminals: whenever a traveler steps onto the concourse (*incoming HTTP connection*), management instantly assigns an individual robotic guide (*dedicated goroutine*) attending exclusively to that passenger.
2. **Middleware Pipelines** are station security turnstiles: before boarding the platform (*core business handler*), travelers walk through thermal scanners (*Panic Recovery*), tap biometric fare cards (*Auth Middleware*), and smile for the CCTV camera (*Logging Middleware*).

## Experiments

- Author a route deliberately invoking panic("fatal crash!") verifying the server survives thanks to RecoveryMiddleware.
- Inject a custom response header w.Header().Set("X-Powered-By", "Go-Engine") inside logging middleware.
- Explore extracting dynamic path parameters via Go 1.22 r.PathValue("id").
- Benchmark server request throughput using load testing tools such as autocannon or hey.

---

## Challenge

Author an `AuthBearerMiddleware` checking "Authorization" headers, rejecting non-conforming requests with HTTP 401 Unauthorized before touching downstream handlers.

---

## Summary

You have mastered pure net/http, middleware chaining, and panic recovery. Next week, we examine Table-Driven Testing and Benchmarking.
