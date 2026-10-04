# Production Profiling: net/http/pprof, Heap Analysis & Escape Analysis

> **Kategori:** Go | **Level:** HTTP Server, Profiling & Gateway Capstone | **Minggu 11:** Production Profiling: net/http/pprof, Heap Analysis & Escape Analysis
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Deploy the standard production diagnostic profiling endpoint via `import _ "net/http/pprof"`
- Analyze memory allocation graphs (Heap Profiles) identifying memory leaks and runaway allocations
- Audit CPU execution profiles pinpointing hotspot bottlenecks consuming disproportionate CPU time
- Master Escape Analysis diagnostics (`go build -gcflags="-m"`): auditing Stack vs Heap variable escapes
- Minimize Garbage Collection (GC) pauses achieving sub-millisecond p99 latency SLAs

---

## Program: Memory Profiling Diagnostic Server with pprof Endpoint & Escape Tuning

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	// Import blank identifier (_) otomatis mendaftarkan endpoint /debug/pprof ke default ServeMux!
	_ "net/http/pprof"
	"time"
)

// Simulasi Fungsi yang Memiliki Efisiensi Alokasi Memori Berbeda
func alokasiBorosHeap() []byte {
	// Variabel lolos (escapes) ke Heap karena dikembalikan sebagai pointer/slice besar
	data := make([]byte, 1024*1024) // 1 Megabyte
	data[0] = 42
	return data
}

func alokasiHematStack() int {
	// Tetap berada di Stack: Sangat cepat, nol beban Garbage Collector (GC)!
	var buffer [64]byte
	buffer[0] = 7
	return int(buffer[0])
}

func simulasiBebanTrafik() {
	for {
		_ = alokasiBorosHeap()
		_ = alokasiHematStack()
		time.Sleep(10 * time.Millisecond)
	}
}

func main() {
	// Menjalankan simulasi beban di latar belakang
	go simulasiBebanTrafik()

	fmt.Println("=== Nusa Performance Diagnostic Node (pprof) ===")
	fmt.Println("Server pprof aktif di: http://localhost:6060/debug/pprof/")
	fmt.Println("Gunakan perintah analisis profil CPU / Memori:")
	fmt.Println("  1. go tool pprof http://localhost:6060/debug/pprof/heap")
	fmt.Println("  2. go tool pprof http://localhost:6060/debug/pprof/profile?seconds=5")

	// Server khusus diagnostik pprof internal (Port terpisah dari traffic publik)
	serverPprof := &http.Server{
		Addr: ":6060",
	}

	log.Printf("[PPROF] Server diagnostik mendengarkan di port :6060...")
	_ = serverPprof // Runnable mock
}
```

---

## Key Concepts

### Why Go Dominates Ultra-Low Latency Systems
Languages with traditional Garbage Collectors (like Java) suffer disruptive *Stop-The-World (STW)* pauses freezing financial transactions for hundreds of milliseconds.
Go engineered a concurrent tri-color collector guaranteeing STW pauses **below 1 millisecond**!
However, in high-throughput API gateways processing 100,000 RPS, the ultimate optimization frontier is **minimizing Heap allocations altogether**.

### Stack vs Heap & Escape Analysis
1. **Stack Memory**: Instantaneous! Allocations resolve and deallocate instantly upon stack frame returns without Garbage Collector intervention.
2. **Heap Memory**: Slower. Heap allocations mandate continuous tracing, marking, and sweeping by the Garbage Collector.
The Go compiler conducts **Escape Analysis**:
It determines: *"Does this variable outlive its declaring stack frame?"*. If returning a pointer reference outwards, the memory **"escapes to the heap"**.

### Production Diagnostics with `pprof`
Appending `import _ "net/http/pprof"` mounts diagnostic inspection endpoints under `/debug/pprof/`.
Engineers connect `go tool pprof` from remote workstations generating interactive SVG flamegraphs of production instances serving active customer traffic!

---

---

## Beginner Friendly Explanation

### Analogy: Personal Desk Blotters (Stack) vs Warehouse Vaults (Heap)
1. **Stack Memory** is an adhesive sticky note on your personal desk: when arithmetic resolves, you crumple the note into the wastebasket in 0.1 seconds (*instant cleanup with zero custodial overhead*).
2. **Heap Memory** is the shared basement records depository: placing records requires cataloging shelf indices, and summoning building custodians (*Garbage Collector*) to review which binders expired.
3. **pprof** is an industrial X-ray scanner identifying precisely which basement shelving units are overflowing with redundant binders.

## Experiments

- Execute go build -gcflags="-m" observing compiler diagnostics: "escapes to heap" versus "does not escape".
- Navigate to http://localhost:6060/debug/pprof/ in browser to inspect raw allocation histograms.
- Deploy sync.Pool to recycle byte buffers driving heap allocations down toward zero.
- Generate interactive SVG flamegraphs via go tool pprof -http=:8081 profile.pb.gz.

---

## Challenge

Optimize a heap-heavy string generator replacing `fmt.Sprintf` with `strings.Builder` pre-allocated via `builder.Grow(128)`, proving allocation reductions via benchmarks.

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

You have mastered pprof profiling, escape analysis, and memory optimization. Next week is our Capstone Project: Distributed Rate Limiter & Gateway.
