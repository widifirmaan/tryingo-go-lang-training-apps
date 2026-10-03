# Interfaces & Duck Typing: Implicit Contracts, Type Assertions & any

> **Kategori:** Go | **Level:** Interface, Concurrency & Channel Pipes | **Minggu 5:** Interfaces & Duck Typing: Implicit Contracts, Type Assertions & any

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

## Summary

You have mastered implicit Interfaces, Duck Typing, and Type Assertions. Next week, we enter Go's greatest superpower: Goroutines and sync.WaitGroup Concurrency.
