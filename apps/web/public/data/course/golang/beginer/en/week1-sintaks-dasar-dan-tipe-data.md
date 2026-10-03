# Go Package Architecture: main, Variables, Zero Values & Multiple Returns

> **Kategori:** Go | **Level:** Go Foundations & Static Type System | **Minggu 1:** Go Package Architecture: main, Variables, Zero Values & Multiple Returns
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Go foundational design philosophy: pure compilation, static typing, simplicity without classes, tailored for cloud scale
- Master core program anatomy: package main, declarative imports, and the main() execution entry point
- Internalize Go Zero Value semantics eliminating uninitialized null/undefined bugs
- Deploy the short declaration operator (:=) contrasted with explicit var and const bindings
- Author idiomatic Go functions returning multiple values simultaneously (Multiple Return Values)

---

## Program: Server Health Probe & System Metric Calculator in Pure Go

```go
package main

import (
	"fmt"
	"time"
)

// 1. Deklarasi Konstanta & Tipe Data Baku
const (
	NamaGateway   = "Nusa Edge Gateway"
	VersiMesin    = "v2.4.0"
	MaksimalKoneksi = 10000
)

// 2. Fungsi dengan Multiple Return Values (Nilai Utama & Status/Error)
func periksaStatusServer(host string, port int) (string, int, bool) {
	alamatPenuh := fmt.Sprintf("%s:%d", host, port)
	
	// Simulasi pengecekan latensi
	latensiMs := 42
	isSehat := true

	return alamatPenuh, latensiMs, isSehat
}

func main() {
	// 3. Deklarasi Singkat (Short Variable Declaration :=)
	// Zero values: int=0, string="", bool=false
	var hitungKegagalan int
	namaKluster := "ap-southeast-1a"

	fmt.Println("=== " + NamaGateway + " (" + VersiMesin + ") ===")
	fmt.Printf("Kluster: %s | Kapasitas: %d koneksi\n\n", namaKluster, MaksimalKoneksi)

	alamat, latensi, aktif := periksaStatusServer("api.internal.nusa.net", 8080)

	if aktif {
		fmt.Printf("[OK] Target: %s\n", alamat)
		fmt.Printf("     Latensi: %d ms | Status: SEHAT\n", latensi)
	} else {
		hitungKegagalan++
		fmt.Printf("[FAIL] Target: %s tidak merespons! (Gagal: %d)\n", alamat, hitungKegagalan)
	}

	fmt.Println("Waktu Pengecekan:", time.Now().Format(time.RFC3339))
}
```

---

## Key Concepts

### Why Google Engineered Go (Golang)
Created by computing luminaries Ken Thompson (UNIX/C co-creator) and Rob Pike (UTF-8 co-creator), Go was designed to eliminate slow C++ compilation and bloated JVM footprints across Google infrastructure.
Core tenets:
1. **Lightning Fast Single-Binary Compilation**: Yields an autonomous self-contained native binary operating without external runtimes (no JVM, no Python/Node interpretors).
2. **Zero Class Inheritance**: Go deliberately omitted complex OOP class hierarchies, favoring composition over inheritance.
3. **First-Class Concurrency**: Built-in primitives orchestrate millions of concurrent threads (*goroutines*) at negligible memory costs.

### Deterministic Zero Values
Unlike C where uninitialized memory contains random bytes, or JavaScript where uninitialized bindings resolve to `undefined`:
Every declared Go variable is **guaranteed to initialize with its deterministic Zero Value**:
- `numeric types`: `0`
- `bool`: `false`
- `string`: `""`
- `pointers, slices, maps, channels`: `nil`

### Multiple Return Values
Go idioms favor returning output models alongside error descriptors:
`func Divide(a, b float64) (float64, error)`
This enforces explicit compile-time accountability over failure states.

---

---

## Beginner Friendly Explanation

### Analogy: Stripped-Down Formula 1 Chassis
Other languages are luxury sedans overburdened with touchscreens, massaging chairs, and neon lighting (*bloated runtime features*).
Go is a stripped-down Formula 1 single-seater: no radio, no leather upholstery, purely raw chassis, racing pedals, and a twin-turbo engine. Zero mechanical clutter, incapable of breaking down over gadget faults, blistering through cloud networks at microsecond latencies.

## Experiments

- Declare var status bool without initialization and print to confirm the deterministic false Zero Value.
- Update periksaStatusServer to yield a fourth return argument ("ONLINE", "OFFLINE").
- Compile the program via go build observing the standalone native executable binary output.
- Declare a variable with := and omit references to witness Go's strict compiler error rejecting unused variables.

---

## Challenge

Author a `CalculateThroughput(totalRequests int, durationSec float64) (float64, bool)` function computing RPS and returning an overload flag when RPS surpasses 5,000.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered Go package architecture, zero values, and multiple return values. Next week, we examine explicit Error Handling and idiomatic control flow.
