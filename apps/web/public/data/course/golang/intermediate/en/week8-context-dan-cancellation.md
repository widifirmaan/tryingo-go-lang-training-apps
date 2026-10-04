# context.Context: Timeout Propagation (WithTimeout), Cancellation & Metadata

> **Kategori:** Go | **Level:** Interface, Concurrency & Channel Pipes | **Minggu 8:** context.Context: Timeout Propagation (WithTimeout), Cancellation & Metadata
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the pivotal role of `context.Context` as the definitive Go standard for request lifecycle management
- Deploy context.WithTimeout() and context.WithDeadline() enforcing Service Level Agreements (SLAs)
- Internalize the mandatory `defer cancel()` invocation preventing background timer memory leaks
- Subscribe to the `<-ctx.Done()` channel inside select branches pruning abandoned goroutines
- Propagate tracing metadata securely using context.WithValue() with private collision-proof key types

---

## Program: Gateway Upstream HTTP Client with Context Timeout & Tracing Propagation

```go
package main

import (
	"context"
	"fmt"
	"time"
)

// 1. Tipe Kustom untuk Kunci Context (Mencegah Benturan Paket Lain)
type contextKey string

const (
	KeyTraceID   contextKey = "trace_id"
	KeyUserRole  contextKey = "user_role"
)

// Simulasi Pemanggilan Mikroservis Hulu (Upstream Database/Auth)
func panggilMicroserviceHulu(ctx context.Context, namaLayanan string, latency time.Duration) (string, error) {
	// Ekstrak metadata trace ID dari context
	traceID := "UNKNOWN"
	if tid, ok := ctx.Value(KeyTraceID).(string); ok {
		traceID = tid
	}

	fmt.Printf("[Trace: %s] Menghubungi %s (Ekspektasi: %v)...\n", traceID, namaLayanan, latency)

	// Saluran penampung hasil
	hasilChan := make(chan string, 1)

	go func() {
		time.Sleep(latency) // Simulasi kerja lambat hulu
		hasilChan <- fmt.Sprintf("Respons Sukses dari %s", namaLayanan)
	}()

	// 2. Dengarkan sinyal ctx.Done() untuk pembatalan instan!
	select {
	case <-ctx.Done():
		// Timeout terlampaui atau dibatalkan oleh parent!
		return "", fmt.Errorf("layanan %s DIBATALKAN oleh Context: %w", namaLayanan, ctx.Err())
	case hasil := <-hasilChan:
		return hasil, nil
	}
}

func main() {
	// 3. context.Background(): Akar dari seluruh pohon context
	ctxRoot := context.Background()

	// 4. context.WithValue: Menyematkan metadata penelusuran (Distributed Tracing ID)
	ctxDenganTrace := context.WithValue(ctxRoot, KeyTraceID, "TRX-NUSA-8899")

	// 5. context.WithTimeout: Menetapkan tenggat waktu keras (SLA Maksimal 200ms)
	ctxTimeout, cancel := context.WithTimeout(ctxDenganTrace, 200*time.Millisecond)
	defer cancel() // Sangat penting: Selalu panggil cancel() untuk membersihkan timer di memori!

	fmt.Println("=== Gateway Context Deadline Enforcement ===")

	// Uji 1: Layanan Cepat (Selesai dalam 80ms < 200ms) -> SUKSES
	if res, err := panggilMicroserviceHulu(ctxTimeout, "AuthService", 80*time.Millisecond); err != nil {
		fmt.Println("Eror:", err)
	} else {
		fmt.Printf("--> HASIL 1: %s\n\n", res)
	}

	// Uji 2: Layanan Lambat (Membutuhkan 400ms > 200ms) -> OTOMATIS TIMEOUT
	// Buat timeout baru untuk pengujian kedua
	ctxTimeout2, cancel2 := context.WithTimeout(ctxDenganTrace, 150*time.Millisecond)
	defer cancel2()

	if res, err := panggilMicroserviceHulu(ctxTimeout2, "LegacyPaymentWorker", 400*time.Millisecond); err != nil {
		fmt.Printf("--> HASIL 2: %v\n", err)
	} else {
		fmt.Printf("--> HASIL 2: %s\n", res)
	}
}
```

---

## Key Concepts

### Why `context.Context` Is Inviolable in Enterprise Go
Imagine a mobile shopper browsing a catalog who closes the app after 1 second.
If the gateway is processing 5 heavy database queries slated to take 10 seconds:
**Without Context, servers burn database CPU cycles for 10 full seconds computing answers nobody will ever read!**

With **`context.Context`**:
1. Inbound HTTP requests bind to `req.Context()`.
2. If clients abort connections, the cancellation signal cascades down the entire call tree: database queries abort immediately, RPCs cancel, and memory cleans up instantly!

### The Triad of Context Primitives:
1. **`context.WithTimeout(parent, duration)`**: Enforces hard deadlines. When elapsed, `<-ctx.Done()` unblocks with `context.DeadlineExceeded`.
2. **`context.WithCancel(parent)`**: Manual programmatic cancellation triggered when parent routines finish early.
3. **`context.WithValue(parent, key, value)`**: Carries distributed trace IDs, correlation tokens, and authorization claims across boundaries.

### Inviolable Context Rules:
- Context must ALWAYS reside as the **first parameter** of a signature: `func DoWork(ctx context.Context, arg string)`.
- Never store Context inside struct fields! Contexts must flow ephemerally down call parameters.

---

---

## Beginner Friendly Explanation

### Analogy: Military Command Abort Protocols
Imagine a military command center deploying an expeditionary team into the field (*spawning goroutines*):
1. **WithTimeout** is an automated countdown timer on the squad lead's chronometer set for 2 hours: if goals are unachieved when the clock expires, teams abort immediately (*deadline exceeded*).
2. **ctx.Done()** is an encrypted flare gun radio signal: if headquarters detects a catastrophic hurricane approaching, command triggers the abort button (*cancel()*), field radios blare sirens, and operatives halt deployment instantly.

## Experiments

- Omit defer cancel() and run go vet ./... to observe the static analyzer flag uncalled cancel functions.
- Increase timeout SLA to 500ms observing both upstream services clear successfully.
- Print ctx.Err() following cancellations inspecting the native context.DeadlineExceeded error.
- Cascade two hierarchical contexts observing how parent cancellations propagate to all descendant branches.

---

## Challenge

Author a `QueryDatabaseWithTimeout(ctx context.Context, sql string) error` running 300ms queries constrained by 100ms context timeouts with rollback safety.

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

You have mastered context.Context, WithTimeout, WithValue, and cancellation cascades. Next week, we enter Level 3: net/http and Middleware Pipelines.
