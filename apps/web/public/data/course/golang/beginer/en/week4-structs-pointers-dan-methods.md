# Structs, Memory Pointers (& and *) & Value vs Pointer Receivers

> **Kategori:** Go | **Level:** Go Foundations & Static Type System | **Minggu 4:** Structs, Memory Pointers (& and *) & Value vs Pointer Receivers
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Structs as the primary composable data modeling construct in Go replacing classes
- Understand memory Pointers: address-of (&) and dereference (*) operators
- Differentiate Value Receivers (read-only copies) from Pointer Receivers (state mutations and zero-copy performance)
- Deploy Struct Field Tags (`json:"..."`) for bi-directional JSON serialization and deserialization
- Understand Escape Analysis: how the Go compiler determines Stack versus Heap allocation

---

## Program: Gateway Route Model & Health State Machine with Pointer Receivers

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

// 1. Struct: Komposisi Tipe Data Domain (Lengkap dengan JSON Tags)
type RuteGateway struct {
	ID            string    `json:"id"`
	Path          string    `json:"path"`
	TargetHost    string    `json:"target_host"`
	BebanKoneksi  int       `json:"beban_koneksi"`
	IsAktif       bool      `json:"is_aktif"`
	TerakhirDicek time.Time `json:"terakhir_dicek"`
}

// 2. Value Receiver: Menerima SALINAN objek (Tidak bisa memutasi struct asli)
func (r RuteGateway) FormatDisplay() string {
	status := "NONAKTIF"
	if r.IsAktif {
		status = "AKTIF"
	}
	return fmt.Sprintf("[%s] %s -> %s (Beban: %d koneksi)", status, r.Path, r.TargetHost, r.BebanKoneksi)
}

// 3. Pointer Receiver (*RuteGateway): Menerima ALAMAT MEMORI ASLI (Dapat memutasi data struct!)
func (r *RuteGateway) TambahBeban(tambahan int) {
	r.BebanKoneksi += tambahan
	r.TerakhirDicek = time.Now()
}

func (r *RuteGateway) Nonaktifkan() {
	r.IsAktif = false
	r.BebanKoneksi = 0
	r.TerakhirDicek = time.Now()
}

func main() {
	// 4. Inisialisasi Struct dengan Pointer (&)
	rute1 := &RuteGateway{
		ID:            "RT-001",
		Path:          "/api/v1/auth",
		TargetHost:    "http://auth-cluster.internal:8000",
		BebanKoneksi:  120,
		IsAktif:       true,
		TerakhirDicek: time.Now(),
	}

	fmt.Println("=== Status Rute Awal ===")
	fmt.Println(rute1.FormatDisplay())

	// Mutasi via Pointer Receiver
	rute1.TambahBeban(45)
	fmt.Println("\nSetelah Tambah Beban (Pointer Receiver Mutates State):")
	fmt.Println(rute1.FormatDisplay())

	// Serialisasi ke JSON standar
	jsonBytes, _ := json.MarshalIndent(rute1, "", "  ")
	fmt.Println("\nPayload JSON Rute:")
	fmt.Println(string(jsonBytes))

	// Bukti Alamat Pointer Memori
	fmt.Printf("\nAlamat Memori Rute di Heap/Stack: %p\n", rute1)
}
```

---

## Key Concepts

### Structs Replace Classes
Go omits the `class` keyword. You model state containers through **`struct`**:
`type User struct { Name string; Age int }`
You bind methods onto structs using **Receiver functions**:
`func (u *User) Greet() string`

### Pointer Receivers (*T) vs Value Receivers (T)
A foundational design decision across all Go codebases:
1. **Enforce Pointer Receivers (`*T`) when**:
   - The method must **mutate** struct fields (`r.ActiveConnections += delta`).
   - The struct encapsulates large payloads. Passing pointers duplicates a lean 8-byte memory address, avoiding deep copies of kilobytes of struct memory.
2. **Deploy Value Receivers (`T`) when**:
   - The struct represents lightweight primitives (such as coordinates `Point{X, Y}`) and operations remain strictly read-only.

### Export Visibility & JSON Struct Tags
In Go, identifiers starting with an **Uppercase Letter are Exported (Public)** across packages. Lowercase identifiers remain private.
To reconcile public PascalCase struct fields (`TargetHost`) with web standard JSON schemas, attach struct tags: \`json:"target_host"\`.

---

---

## Beginner Friendly Explanation

### Analogy: Photocopy Slips vs Master Document Modifications
1. **Value Receivers (`func (r Route)`)** are photocopied documents: scribbling notes on a photocopy slip alters only the temporary duplicate sheet; the master original in the vault remains untouched.
2. **Pointer Receivers (`func (r *Route)`)** are handing the physical master original directly to the notary: ink applied by the notary permanently mutates the master legal deed in memory.

## Experiments

- Change TambahBeban to a Value Receiver func (r RuteGateway) and verify load metrics FAIL to persist outside the method!
- Remove the dereference asterisk observing pointer address representations via %p.
- Switch field ID to lowercase id and observe the field vanishes from JSON output (unexported visibility!).
- Deploy json.Unmarshal decoding stringified JSON back into a typed RuteGateway struct.

---

## Challenge

Author a `ClusterNode` struct with Host, Port, LatencyMs, and IsHealthy fields. Write a pointer receiver `CheckHealth()` setting IsHealthy to false when LatencyMs breaches 500ms.

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

You have mastered Structs, pointers, value/pointer receivers, and JSON tags. Next week, we enter Level 2: Interfaces and Goroutine Concurrency.
