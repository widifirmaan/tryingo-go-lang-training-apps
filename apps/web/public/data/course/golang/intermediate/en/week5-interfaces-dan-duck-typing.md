# Interfaces & Duck Typing: Implicit Contracts, Type Assertions & any

> **Kategori:** Go | **Level:** Interface, Concurrency & Channel Pipes | **Minggu 5:** Interfaces & Duck Typing: Implicit Contracts, Type Assertions & any
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Internalize Go Duck Typing: "If it walks like a duck and quacks like a duck, it is a duck"
- Recognize that Go omits the `implements` keyword entirely (interfaces satisfy 100% implicitly)
- Enforce Interface Segregation: authoring atomic 1-3 method interfaces (e.g. io.Reader, io.Writer)
- Deploy Type Assertions (val.(ConcreteType)) and Type Switches for dynamic runtime introspection
- Evaluate the `any` type alias (interface{}) and its architectural safety boundaries

---

## Program: Gateway Cache Storage Adapter with Implicit Duck-Typed Interfaces

```go
package main

import (
	"fmt"
	"time"
)

// 1. Interface: Kontrak Perilaku Murni (Tanpa Implementasi)
// Aturan Go: "Interfaces should be small and discovered, not designed up-front."
type PenyimpanCache interface {
	Simpan(kunci string, nilai string, ttl time.Duration) error
	Ambil(kunci string) (string, bool)
	Hapus(kunci string) error
}

// 2. Implementasi 1: In-Memory Map Cache
type MemoryCache struct {
	storage map[string]string
}

func NewMemoryCache() *MemoryCache {
	return &MemoryCache{storage: make(map[string]string)}
}

// Implementasi implisit (Tidak ada kata kunci 'implements' di Go!)
func (m *MemoryCache) Simpan(kunci string, nilai string, ttl time.Duration) error {
	m.storage[kunci] = nilai
	return nil
}

func (m *MemoryCache) Ambil(kunci string) (string, bool) {
	val, ok := m.storage[kunci]
	return val, ok
}

func (m *MemoryCache) Hapus(kunci string) error {
	delete(m.storage, kunci)
	return nil
}

// 3. Fungsi Konsumen: Bergantung pada Interface, Bukan Implementasi Konkret
func daftarkanSesiUser(cache PenyimpanCache, token string, userId string) {
	err := cache.Simpan(token, userId, 15*time.Minute)
	if err != nil {
		fmt.Println("Gagal menyimpan sesi:", err)
		return
	}
	fmt.Printf("[Cache Engine] Sesi token '%s' tersimpan untuk user '%s'\n", token, userId)
}

func main() {
	// Membuktikan Duck Typing: MemoryCache otomatis dianggap sebagai PenyimpanCache
	cacheEngine := NewMemoryCache()
	daftarkanSesiUser(cacheEngine, "sess_abc123", "USR-9988")

	if val, ok := cacheEngine.Ambil("sess_abc123"); ok {
		fmt.Printf("Verifikasi Cache Hit: User ID = %s\n", val)
	}

	// 4. Type Switch & Type Assertion
	var objekBebas any = "Teks String Bebas"
	switch v := objekBebas.(type) {
	case string:
		fmt.Println("Tipe data terdeteksi: string, panjang =", len(v))
	case int:
		fmt.Println("Tipe data terdeteksi: integer =", v)
	default:
		fmt.Println("Tipe data tidak diketahui")
	}
}
```

---

## Key Concepts

### Why Go Interfaces Are Revolutionary
In Java, C#, or TypeScript, classes explicitly pledge allegiance to interfaces:
`class MemoryCache implements CacheStorage`.
This creates tight coupling: third-party packages must declare vendor interfaces directly.

**In Go, Interfaces are SATISFIED IMPLICITLY**:
If your struct exposes `Save`, `Get`, and `Delete` methods with matching signatures, your struct **automatically satisfies `CacheStorage` without writing a single line of boilerplate**!
The author of the concrete struct does not even need to know the consumer interface exists.

### The Go Proverb: "The Bigger the Interface, the Weaker the Abstraction"
Go standard libraries are legendary for single-method interfaces:
- `io.Reader`: `Read(p []byte) (n int, err error)`
- `io.Writer`: `Write(p []byte) (n int, err error)`
- `fmt.Stringer`: `String() string`
Avoid monolithic 20-method interfaces. Author atomic micro-interfaces and compose them cleanly.

---

---

## Beginner Friendly Explanation

### Analogy: Universal Electrical Wall Outlets
In your residence, there is a two-prong wall outlet (*the CacheStorage Interface*).
Manufacturers of desk fans, refrigerators, and laptop chargers (*MemoryCache / RedisCache structs*) operate independently. As long as their physical plugs feature two prongs at matching dimensions (*matching method signatures*), any appliance inserts into the outlet without negotiating contractual agreements (*zero implements keyword*).

## Experiments

- Author a RedisCache struct implementing all 3 methods; pass it into daftarkanSesiUser verifying instant polymorphism.
- Prune the Hapus method from MemoryCache to observe the compiler diagnostic: "missing method Hapus".
- Deploy the safe Type Assertion syntax val, ok := objekBebas.(string) verifying conversion checks.
- Compose two micro-interfaces into a unified composite interface using Interface Embedding.

---

## Challenge

Design a `TrafficFilter` interface with `Allow(ip string) bool`. Implement two structs: `WhiteListFilter` and `RateLimitFilter` satisfying the interface implicitly.

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

You have mastered implicit Interfaces, Duck Typing, and Type Assertions. Next week, we enter Go's greatest superpower: Goroutines and sync.WaitGroup Concurrency.
