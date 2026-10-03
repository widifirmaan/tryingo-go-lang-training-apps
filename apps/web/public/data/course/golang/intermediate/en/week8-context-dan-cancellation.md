# context.Context: Timeout Propagation (WithTimeout), Cancellation & Metadata

> **Kategori:** Go | **Level:** Interface, Concurrency & Channel Pipes | **Minggu 8:** context.Context: Timeout Propagation (WithTimeout), Cancellation & Metadata

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

## Summary

You have mastered context.Context, WithTimeout, WithValue, and cancellation cascades. Next week, we enter Level 3: net/http and Middleware Pipelines.
