# Structs, Memory Pointers (& and *) & Value vs Pointer Receivers

> **Kategori:** Go | **Level:** Go Foundations & Static Type System | **Minggu 4:** Structs, Memory Pointers (& and *) & Value vs Pointer Receivers

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

## Summary

You have mastered Structs, pointers, value/pointer receivers, and JSON tags. Next week, we enter Level 2: Interfaces and Goroutine Concurrency.
