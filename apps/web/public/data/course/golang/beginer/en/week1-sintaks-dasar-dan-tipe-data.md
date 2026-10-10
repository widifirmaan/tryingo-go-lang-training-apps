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

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Go for Visual Studio Code** (`golang.go`): Official Go extension: gopls intellisense, delve debugger, and gofmt

Or install all recommended extensions at once via terminal:
```bash
code --install-extension golang.go
```

---

### 2. Runtime & Dependency Installation (Go Toolchain (1.23+))
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install GoLang.Go
```

**macOS (Terminal / Homebrew):**
```bash
brew install go
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install golang-go
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
go version
```

Expected output:
```output
go version go1.23.x ...
```

> 💡 **Prerequisite Note:** Open a fresh terminal window after installation so the Go binary path is recognized.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-go-app && cd my-go-app
go mod init my-go-app
touch main.go
```
- **Details:** Generates go.mod for official dependency tracking and module declaration.
- **Navigate to the project directory:**
```bash
cd my-go-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
go run main.go
```
Open in browser or terminal: `Terminal / http://localhost:8080 (jika HTTP server)`

> ℹ️ `go run` compiles and runs your program in memory instantly.

**Initial Entry File (`main.go`):**
```go
package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/api/status", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintf(w, `{"status":"active","time":"%s","runtime":"Go 1.23"}`, time.Now().Format(time.RFC3339))
	})

	port := ":8080"
	fmt.Printf("🚀 Server Go aktif di http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Printf("Error server: %v\n", err)
	}
}
```
Native Go HTTP server with zero third-party dependencies.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-go-app/
├── cmd/
│   └── api/
│       └── main.go      # Titik masuk aplikasi
├── internal/            # Kode internal privat yang aman
│   ├── handler/         # HTTP handlers
│   └── service/         # Logika domain
├── go.mod               # Definisi modul & versi Go
└── go.sum               # Hash checksum dependensi
```
Standard Go Project Layout recommended by the ecosystem.

---

### 6. Beginner Tips & Best Practices
- Use `go build` to generate a single self-contained binary ready for zero-dependency deployment.
- Run `go fmt ./...` before committing to adhere to official Go formatting standards.

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

You have mastered Go package architecture, zero values, and multiple return values. Next week, we examine explicit Error Handling and idiomatic control flow.
