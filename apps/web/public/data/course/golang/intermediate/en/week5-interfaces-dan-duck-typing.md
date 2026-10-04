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
│  ch <- 42      │ ─── Pass Data ──►  │  val := <-ch   │
└────────────────┘   [ CHANNEL: chan ] └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `var x int / x := 42`
- **Core Functionality:** Declaration of variabel statis dan pendek.
- **Parameters / Attributes:** `Identifier, Type / Value`.
- **System Behavior & Return:** `:=` menginferensi tipe data otomatis dalam fungsi; `var` untuk nilai default..
- **Practical Code Example:**
```go
package main

import "fmt"

func main() {
	age := 25
	name := "Alex"
	fmt.Printf("%s berusia %d tahun\n", name, age)
}
```
- **Expected Execution Output:**
```output
Alex berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Core Functionality:** Penerapan Method pada Struct (OOP ala Go).
- **Parameters / Attributes:** `Receiver (value/pointer), Parameters`.
- **System Behavior & Return:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa pewarisan..
- **Practical Code Example:**
```go
package main

import "fmt"

type User struct {
	Name string
}

func (u User) Greet() string {
	return "Halo, " + u.Name
}

func main() {
	u := User{Name: "Budi"}
	fmt.Println(u.Greet())
}
```
- **Expected Execution Output:**
```output
Halo, Budi
```

### 3. `go func() { ... }()`
- **Core Functionality:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameters / Attributes:** `Fungsi anonim / bernama`.
- **System Behavior & Return:** Menjalankan komputasi di thread runtime Go yang sangat ringan (~2KB memori awal)..
- **Practical Code Example:**
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	go func() {
		fmt.Println("Berjalan di goroutine terpisah!")
	}()
	time.Sleep(50 * time.Millisecond)
	fmt.Println("Selesai alur utama")
}
```
- **Expected Execution Output:**
```output
Berjalan di goroutine terpisah!
Selesai alur utama
```

### 4. `ch := make(chan int); ch <- 42; val := <-ch`
- **Core Functionality:** Saluran komunikasi antar goroutine (Channel).
- **Parameters / Attributes:** `Type data channel, kapasitas buffer`.
- **System Behavior & Return:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa lock manual..
- **Practical Code Example:**
```go
package main

import "fmt"

func main() {
	ch := make(chan int)
	go func() {
		ch <- 100
	}()
	result := <-ch
	fmt.Println("Diterima:", result)
}
```
- **Expected Execution Output:**
```output
Diterima: 100
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
