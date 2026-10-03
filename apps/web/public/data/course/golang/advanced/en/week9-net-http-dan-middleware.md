# Pure net/http Architecture: Custom Handlers, Middleware Chaining & REST

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Gateway Capstone | **Minggu 9:** Pure net/http Architecture: Custom Handlers, Middleware Chaining & REST
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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

## Visual Mental Model & Architecture Flow

![Diagram CSP Goroutine & Channel Communication Pipeline](/diagrams/goroutine-channel.svg)

```diagram
┌────────────────┐                     ┌────────────────┐
│  GOROUTINE A   │                     │  GOROUTINE B   │
│  (Worker Thread)                     │  (Consumer)    │
│  ch <- 42      │ ─── Pass Data ───►  │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `var x int / x := 42`
- **Core Functionality:** Type-safe variable declaration and short assignment.
- **Parameters / Attributes:** `Identifier, Type / Value`.
- **System Behavior & Return:** `:=` infers concrete types dynamically in function bodies; `var` sets deterministic zero values.
- **Practical Code Example:**
```javascript
counter := 10
fmt.Println("Counter:", counter)
```
- **Expected Execution Output:**
```text
Counter: 10
```

### 2. `func (r Receiver) Method() ReturnType`
- **Core Functionality:** Struct receiver method binding.
- **Parameters / Attributes:** `Receiver instance, Parameters`.
- **System Behavior & Return:** Associates behaviors directly with struct types without classical inheritance hierarchies.
- **Practical Code Example:**
```javascript
type Point struct { X, Y int }
func (p Point) Sum() int {
  return p.X + p.Y
}
```
- **Expected Execution Output:**
```text
Evaluates method computation over struct fields
```

### 3. `go func() { ... }()`
- **Core Functionality:** Lightweight concurrent Goroutine dispatch.
- **Parameters / Attributes:** `Anonymous / Named function`.
- **System Behavior & Return:** Launches asynchronous task execution scheduled cooperatively by the Go runtime (~2KB stack footprint).
- **Practical Code Example:**
```javascript
go func() {
  fmt.Println("Running asynchronously!")
}()
```
- **Expected Execution Output:**
```text
Executes concurrently without blocking the main OS thread
```

### 4. `ch := make(chan int); ch <- 1; v := <-ch`
- **Core Functionality:** Thread-safe CSP Channel pipeline.
- **Parameters / Attributes:** `Element Type, Buffer capacity`.
- **System Behavior & Return:** Transmits values synchronously between Goroutines with zero manual mutex or lock synchronization.
- **Practical Code Example:**
```javascript
ch := make(chan int)
go func() { ch <- 42 }()
fmt.Println(<-ch)
```
- **Expected Execution Output:**
```text
42
```


---

## Common Pitfalls & Debugging Tips

### 1. Nil Pointer Dereference Panic
- **Symptom / Issue:** Accessing struct fields on an uninitialized pointer panics and crashes the binary.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always check `if ptr != nil` before invoking methods or dereferencing pointers.

### 2. Goroutine Leaks
- **Symptom / Issue:** Spawning background goroutines blocked on unbuffered channels with no termination signal.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `context.WithCancel` or buffered channels to guarantee deterministic exit paths.

### 3. Accidental Variable Shadowing with :=
- **Symptom / Issue:** Inner scope re-creates an existing variable instead of assigning to the outer one.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Double check `:=` versus `=` when handling errors inside `if` or `for` blocks.

---

## Summary

You have mastered pure net/http, middleware chaining, and panic recovery. Next week, we examine Table-Driven Testing and Benchmarking.
