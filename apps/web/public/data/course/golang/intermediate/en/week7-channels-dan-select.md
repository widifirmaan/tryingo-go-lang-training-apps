# Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts

> **Kategori:** Go | **Level:** Interface, Concurrency & Channel Pipes | **Minggu 7:** Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts

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

## Summary

You have mastered Channels, buffers, select multiplexing, and timeouts. Next week, we examine context.Context and distributed cancellation pipelines.
