# Concurrency: Millions of Goroutines, sync.WaitGroup, Mutex & Race Detector

> **Kategori:** Go | **Level:** Interface, Concurrency & Channel Pipes | **Minggu 6:** Concurrency: Millions of Goroutines, sync.WaitGroup, Mutex & Race Detector
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Contrast Concurrency (dealing with lots of things at once) with Parallelism (doing lots of things simultaneously on multi-cores)
- Spawn lightweight threads (*goroutines*) deploying the native `go` keyword (~2KB initial stack allocation)
- Orchestrate completion barriers deploying sync.WaitGroup primitives (Add, Done, Wait)
- Eliminate Data Race conditions using sync.Mutex mutual exclusion locks (Lock, Unlock, defer Unlock)
- Execute compilation with the integrated Race Detector active (go run -race main.go) catching race bugs

---

## Program: Concurrent Multi-Endpoint Health Checker with Mutex Protection

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// Struktur Data Hasil Pengecekan Aman-Thread (Thread-Safe)
type LaporanKluster struct {
	mu            sync.Mutex // Mutex mencegah Data Race saat banyak goroutine menulis bersamaan
	hasilPengecekan map[string]bool
	totalSukses   int
}

func (l *LaporanKluster) CatatHasil(endpoint string, sukses bool) {
	// Kunci akses memori eksklusif
	l.mu.Lock()
	defer l.mu.Unlock() // Otomatis lepas kunci saat fungsi selesai dieksekusi

	l.hasilPengecekan[endpoint] = sukses
	if sukses {
		l.totalSukses++
	}
}

func cekEndpoint(endpoint string, laporan *LaporanKluster, wg *sync.WaitGroup) {
	// Beri tahu WaitGroup bahwa goroutine ini telah selesai saat fungsi keluar
	defer wg.Done()

	// Simulasi request jaringan I/O
	time.Sleep(100 * time.Millisecond)
	isUp := len(endpoint)%2 == 0 // Simulasi acak kesehatan

	laporan.CatatHasil(endpoint, isUp)
	fmt.Printf("[Goroutine] Selesai memeriksa: %-30s | Status: %v\n", endpoint, isUp)
}

func main() {
	daftarEndpoint := []string{
		"http://auth-service.prod:8080/health",
		"http://payment-gateway.prod:8081/health",
		"http://notification-hub.prod:8082/health",
		"http://inventory-engine.prod:8083/health",
		"http://reporting-worker.prod:8084/health",
	}

	laporan := &LaporanKluster{
		hasilPengecekan: make(map[string]bool),
	}

	// sync.WaitGroup: Penghitung sinkronisasi untuk menunggu seluruh goroutine selesai
	var wg sync.WaitGroup

	waktuMulai := time.Now()
	fmt.Println("=== Memulai Pengecekan 5 Endpoint Secara Konkuren ===")

	for _, ep := range daftarEndpoint {
		wg.Add(1) // Tambah penghitung tugas
		
		// KATA KUNCI 'go': Meluncurkan fungsi sebagai Goroutine ringan independen!
		go cekEndpoint(ep, laporan, &wg)
	}

	// Tunggu sampai seluruh goroutine memanggil wg.Done() (penghitung kembali ke 0)
	wg.Wait()

	durasi := time.Since(waktuMulai)
	fmt.Printf("\nSeluruh pengecekan selesai dalam %v (Bukan 500ms, tapi paralel ~100ms!)\n", durasi)
	fmt.Printf("Total Layanan Sehat: %d / %d\n", laporan.totalSukses, len(daftarEndpoint))
}
```

---

## Key Concepts

### Why Goroutines Obliterate OS Threads
In traditional environments (Java, C++, Python):
A single Operating System Thread (*OS Thread*) consumes **1 to 2 Megabytes** of stack memory. Spawning 10,000 threads consumes 16GB of RAM, provoking fatal Out Of Memory (OOM) crashes.

In **Go**:
1. A **Goroutine** begins with a minuscule **~2 Kilobyte** stack footprint!
2. The Go runtime multiplexes goroutines across a lean pool of OS cores via its high-performance **M:N Work-Stealing Scheduler**.
3. You can effortlessly spawn **1,000,000 concurrent goroutines** on an everyday developer laptop without breaking a sweat!

### Data Races & The Mutex Shield
When concurrent goroutines write to identical memory buffers (like shared maps) simultaneously, a **Data Race** occurs, terminating the runtime: `fatal error: concurrent map writes`.
**`sync.Mutex`** guarantees mutual exclusion:
Invoking `mu.Lock()` ensures sole access; competing goroutines queue politely until `mu.Unlock()` releases the lock.

### The Automated Race Detector (`-race`)
Go ships with an integrated runtime data race analyzer:
Execute: `go run -race main.go`.
The compiler instruments memory access boundaries, flagging unsynchronized concurrent read/write collisions down to exact line numbers!

---

---

## Beginner Friendly Explanation

### Analogy: Semi-Truck Fleets vs One Million Courier Ants
1. **Traditional OS Threads** are 18-wheel freight tractor-trailers: dispatching a single paper letter requires turning on a 5000cc diesel engine, commanding highway lanes (*2MB RAM per thread*).
2. **Goroutines** are a swarm of micro-courier ants: each ant weighs nothing (*2KB stack*); you dispatch one million ants in parallel across narrow conduits without causing traffic jams.
3. **Mutex** is a public restroom bolt lock: when an occupant locks the latch (*mu.Lock()*), others wait in an orderly queue until the latch disengages (*mu.Unlock()*).

## Experiments

- Omit mu.Lock() and mu.Unlock(), run go run -race main.go, and observe the race detector flag WARNING: DATA RACE!
- Scale endpoints to 100 observing total duration remains ~100ms thanks to concurrent scheduling.
- Omit wg.Done() and observe the runtime panic: fatal error: all goroutines are asleep - deadlock!
- Explore sync.RWMutex permitting multiple concurrent readers (RLock) while reserving exclusive write locks.

---

## Challenge

Build a concurrent worker pool: instantiate 3 worker goroutines consuming URLs from a task queue, processing checks in parallel until exhausted.

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

You have mastered Goroutines, sync.WaitGroup, Mutex, and the -race detector. Next week, we examine Channels and select multiplexing.
