# Idiomatic Control Flow: if with Short Statements, switch & Explicit Errors

> **Kategori:** Go | **Level:** Go Foundations & Static Type System | **Minggu 2:** Idiomatic Control Flow: if with Short Statements, switch & Explicit Errors
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Go's error philosophy: Errors Are Values (plain inspectable values, no try-catch exceptions)
- Deploy the canonical idiomatic Go guard: if err != nil { return nil, err }
- Define Sentinel Errors with errors.New() and wrap error chains via fmt.Errorf("%w")
- Master if with short statement scopes (if val, err := fn(); err != nil)
- Appreciate that Go features exclusively one loop keyword: the versatile for loop handling while and foreach patterns

---

## Program: Gateway Configuration Parser & Network Port Validator with Explicit Errors

```go
package main

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
)

// Definisi Kesalahan Baku (Sentinel Errors)
var (
	ErrPortTidakValid   = errors.New("port harus berada di antara 1 dan 65535")
	ErrHostKosong       = errors.New("host tujuan tidak boleh kosong")
	ErrProtokolDitolak = errors.New("protokol harus berupa http atau https")
)

// Fungsi Validasi Konfigurasi Target Gateway
func parseTargetURL(rawURL string) (string, int, error) {
	if strings.TrimSpace(rawURL) == "" {
		return "", 0, ErrHostKosong
	}

	parts := strings.Split(rawURL, ":")
	if len(parts) != 2 {
		return "", 0, fmt.Errorf("format URL salah: %s (harus host:port)", rawURL)
	}

	host := parts[0]
	portStr := parts[1]

	// strconv.Atoi mengembalikan (int, error)
	port, err := strconv.Atoi(portStr)
	if err != nil {
		return "", 0, fmt.Errorf("port bukan angka valid: %w", err)
	}

	if port < 1 || port > 65535 {
		return "", 0, ErrPortTidakValid
	}

	return host, port, nil
}

func main() {
	daftarTarget := []string{
		"auth-service.internal:8081",
		"payment-api.internal:99999", // Port invalid
		"billing-worker:invalid_port", // Bukan angka
		"analytics-service:443",
	}

	fmt.Println("=== Validasi Konfigurasi Gateway ===")

	// Go hanya memiliki 1 jenis perulangan: for loop!
	for _, target := range daftarTarget {
		// if with short statement: scope 'err' terisolasi hanya di dalam blok if
		if host, port, err := parseTargetURL(target); err != nil {
			fmt.Printf("[REJECT] Target '%s' GAGAL: %v\n", target, err)
		} else {
			fmt.Printf("[ACCEPT] Target '%s' -> Host: %s, Port: %d\n", target, host, port)
		}
	}
}
```

---

## Key Concepts

### Why Go Discarded `try-catch` Exceptions
In Java, Python, and JavaScript, functions can throw arbitrary exceptions out-of-band (*invisible control flow jumps*). Developers routinely omit try-catch blocks, triggering unhandled production crashes.

**The Go Principle: Errors Are Values**:
1. An error is a standard built-in interface contract: `type error interface { Error() string }`.
2. When operations might fail, they **must return an `error` as their terminal return value**.
3. Callers inspect `if err != nil` explicitly. Zero hidden surprises!

### The `if with short statement` Construct
Go permits pre-assigning variables before condition evaluation:
`if host, port, err := parseTargetURL(url); err != nil { ... }`
The identifiers `host`, `port`, and `err` **exist strictly within the lexical scope of the if-else branch**, preserving parent scopes from variable pollution!

### Only One Loop: The Universal `for`
Go eliminated `while` and `do-while`.
- `for i := 0; i < 10; i++`: Standard counting iteration.
- `for condition`: Acts as a `while` loop.
- `for { ... }`: Clean infinite execution loop.
- `for idx, val := range collection`: Iterates arrays, slices, and maps.

---

---

## Beginner Friendly Explanation

### Analogy: Customs Checkpoints vs Concealed Explosives
1. **Try-Catch in other languages** is a concealed trapdoor in an elevator: developers don't know which floor triggers the drop until the floor drops (*unhandled production panic*).
2. **Go Error Handling** is an airport customs inspection desk: every package is explicitly inspected by the officer (*if err != nil*). If an item fails inspection, the officer stamps a red rejection slip and hands it back immediately at the counter.

## Experiments

- Pass a URL omitting ports (e.g. "google.com") observing the custom formatting diagnostic.
- Deploy errors.Is(err, ErrPortTidakValid) to assert sentinel error types programmatically.
- Author a while-style for loop driven by counter < 5.
- Wrap errors using %w format verbs and inspect with errors.Unwrap(err).

---

## Challenge

Author a `ValidateAPIHeaders(headers map[string]string) error` function checking for "Authorization" and "X-Request-ID", returning descriptive errors upon absence.

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
age := 25
name := "Alex"
fmt.Printf("%s berusia %d tahun\n", name, age)
```
- **Expected Execution Output:**
```text
Alex berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Core Functionality:** Penerapan Method pada Struct (OOP ala Go).
- **Parameters / Attributes:** `Receiver (value/pointer), Parameters`.
- **System Behavior & Return:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa pewarisan..
- **Practical Code Example:**
```go
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Expected Execution Output:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Core Functionality:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameters / Attributes:** `Fungsi anonim / bernama`.
- **System Behavior & Return:** Menjalankan komputasi di thread runtime Go yang sangat ringan (~2KB memori awal)..
- **Practical Code Example:**
```go
go func() {
  fmt.Println("Berjalan di goroutine terpisah!")
}()
```
- **Expected Execution Output:**
```text
Dieksekusi asinkron tanpa memblokir alur utama
```

### 4. `ch := make(chan int); ch <- 42; val := <-ch`
- **Core Functionality:** Saluran komunikasi antar goroutine (Channel).
- **Parameters / Attributes:** `Type data channel, kapasitas buffer`.
- **System Behavior & Return:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa lock manual..
- **Practical Code Example:**
```go
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result)
```
- **Expected Execution Output:**
```text
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

You have mastered explicit error handling, sentinel errors, and the universal for loop. Next week, we examine Slices, Arrays, and Maps deeply.
