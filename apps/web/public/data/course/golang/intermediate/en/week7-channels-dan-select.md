# Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts

> **Kategori:** Go | **Level:** Interface, Concurrency & Channel Pipes | **Minggu 7:** Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Internalize CSP concurrency philosophy: Do not communicate by sharing memory; share memory by communicating
- Contrast Unbuffered Channels (synchronous rendezvous handshakes) with Buffered Channels (queued buffers)
- Deploy directional channels (send-only chan<-, receive-only <-chan) enforcing API boundaries
- Master the select statement to multiplex across multiple channel streams non-blockingly
- Implement resilient Timeouts via time.After() inside select blocks preventing deadlocks

---

## Program: Token-Bucket Rate Limiter & Request Queue Multiplexer with select

```go
package main

import (
	"fmt"
	"time"
)

// Pepatah Go: "Do not communicate by sharing memory; instead, share memory by communicating."

func produserTrafik(antreanReq chan<- string) {
	// Channel berarah kirim-saja (send-only: chan<-)
	for i := 1; i <= 6; i++ {
		reqID := fmt.Sprintf("REQ-HTTP-%03d", i)
		antreanReq <- reqID // Kirim ke channel (akan terblokir jika buffer penuh)
		fmt.Printf("[Client] Mengirimkan %s ke gateway...\n", reqID)
		time.Sleep(50 * time.Millisecond)
	}
	close(antreanReq) // Tutup channel setelah semua data dikirim
}

func main() {
	// 1. Buffered Channel dengan kapasitas penampung 3 request
	antreanReq := make(chan string, 3)

	// 2. Token Bucket Rate Limiter: Ticker menghasilkan token setiap 120 milidetik
	tokenBucket := time.NewTicker(120 * time.Millisecond)
	defer tokenBucket.Stop()

	// Jalankan produser di goroutine terpisah
	go produserTrafik(antreanReq)

	fmt.Println("=== Gateway Rate Limiter (Token Bucket Engine) ===")

	// 3. Loop Konsumsi Channel
	for req := range antreanReq {
		// 4. select Statement: Multiplexing saluran asinkron dengan batas waktu (Timeout)
		select {
		case <-tokenBucket.C:
			// Token tersedia: Izinkan request diproses
			fmt.Printf("  --> [GATEWAY 200 OK] Token diperoleh! Memproses %s\n", req)
		case <-time.After(150 * time.Millisecond):
			// Timeout: Token terlalu lama tidak tersedia (Overload)
			fmt.Printf("  --> [GATEWAY 429 TOO MANY REQUESTS] %s DITOLAK (Antrean Penuh)\n", req)
		}
	}

	fmt.Println("\nSeluruh antrean request berhasil diproses.")
}
```

---

## Key Concepts

### The Golden Go Proverb: Share Memory by Communicating
Rather than micromanaging Mutex locks across shared heap memory, Go introduces **Channels (`chan`)**: typed conduits piping messages between concurrent goroutines.
*"Do not communicate by sharing memory; instead, share memory by communicating."*

### Unbuffered vs Buffered Channels
1. **Unbuffered (`make(chan int)`)**:
   The sender **blocks** until a receiving goroutine consumes the payload at the opposite end of the pipe. This acts as a synchronous rendezvous handshake.
2. **Buffered (`make(chan int, 100)`)**:
   Provides an internal queue holding 100 items. Senders deposit values without blocking until buffer capacity saturates.

### The Power of the `select` Statement
The `select` construct functions like a `switch`, tailored **exclusively for channel multiplexing**.
`select` executes the first case whose communication channel resolves ready.
Combining select branches with `case <-time.After(duration)` delivers timeout protection against frozen network calls!

---

---

## Beginner Friendly Explanation

### Analogy: Direct Hand-Offs vs Tennis Ball Tubes
1. **Unbuffered Channels** are direct hand-to-hand passings of a tennis ball: the sender cannot release their grip until the receiver's fingers clamp around the ball (*synchronous rendezvous*).
2. **Buffered Channels** are plastic sleeves holding 3 tennis balls: you drop 3 balls into the cylinder without waiting; you pause only when the cylinder fills to capacity.
3. **select Statements** are toll plaza operators monitoring 3 lanes: the operator services whichever vehicle trips the sensor wire first.

## Experiments

- Zero out the buffer capacity make(chan string, 0) observing synchronous handshake logging patterns.
- Throttle time.After timeouts to 20ms watching 429 TOO MANY REQUESTS drop logs spike.
- Omit close(antreanReq) inside the producer to observe the consumer loop deadlock.
- Attach a default case to the select block to execute immediate non-blocking channel polling.

---

## Challenge

Author a cancellation broadcast channel `cancelChan := make(chan struct{})` integrated inside select to halt queue consumption immediately on signal.

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

You have mastered Channels, buffers, select multiplexing, and timeouts. Next week, we examine context.Context and distributed cancellation pipelines.
