# Core Data Structures: Slices (Pointer, Len, Cap), make, append & Maps

> **Kategori:** Go | **Level:** Go Foundations & Static Type System | **Minggu 3:** Core Data Structures: Slices (Pointer, Len, Cap), make, append & Maps
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand structural memory distinctions between Fixed-Size Arrays and Dynamic Slices
- Master the internal Slice Header: Pointer to underlying backing array, Length (len), and Capacity (cap)
- Deploy make() for proactive capacity pre-allocation eliminating repetitive runtime re-allocations
- Utilize native append() and understand memory doubling heuristics when slice capacity saturates
- Construct hash tables with map and enforce the idiomatic Comma-Ok idiom (val, ok := map[key])

---

## Program: IP Access Frequency Table & Quota Tracker with Slices and Maps

```go
package main

import "fmt"

func main() {
	// 1. Array Statis (Panjang kaku, jarang dipakai langsung)
	var subnetMask [4]byte = [4]byte{255, 255, 255, 0}
	fmt.Println("Subnet Mask Statis:", subnetMask)

	// 2. Slice Dinamis (Struktur data paling populer di Go!)
	// Anatomi Slice: Pointer ke backing array, Length (len), Capacity (cap)
	daftarIP := make([]string, 0, 5) // Panjang awal 0, Kapasitas memori 5
	fmt.Printf("Awal: len=%d, cap=%d, isi=%v\n", len(daftarIP), cap(daftarIP), daftarIP)

	// append(): Menambahkan elemen secara dinamis (otomatis memperbesar kapasitas)
	daftarIP = append(daftarIP, "192.168.1.1", "10.0.0.1", "172.16.0.5")
	fmt.Printf("Setelah Append: len=%d, cap=%d, isi=%v\n", len(daftarIP), cap(daftarIP), daftarIP)

	// Slice Slicing [start:end]
	subDaftar := daftarIP[1:3]
	fmt.Println("Sub-slice [1:3]:", subDaftar)

	// 3. Map (Hash Table bawaan Go: map[KeyType]ValueType)
	tabelHitRate := make(map[string]int)

	// Simulasi pencatatan kunjungan IP
	tabelHitRate["192.168.1.1"] = 15
	tabelHitRate["10.0.0.1"] = 82
	tabelHitRate["203.0.113.42"] = 140

	// 4. Pola Idiomatik "Comma Ok" untuk Memeriksa Keberadaan Kunci di Map
	ipUji := "172.16.0.5"
	if hit, ok := tabelHitRate[ipUji]; ok {
		fmt.Printf("IP %s tercatat: %d request\n", ipUji, hit)
	} else {
		fmt.Printf("IP %s belum pernah mengakses server (Aman).\n", ipUji)
	}

	// Iterasi Map menggunakan for-range
	fmt.Println("\n=== Rekapitulasi Trafik per IP ===")
	for ip, hit := range tabelHitRate {
		status := "NORMAL"
		if hit > 100 {
			status = "OVER_LIMIT (Blokir!)"
		}
		fmt.Printf("-> IP: %-15s | Hit: %3d | Status: %s\n", ip, hit, status)
	}
}
```

---

## Key Concepts

### Deep Anatomy of Go Slices
In Go, **Arrays** feature fixed compile-time lengths (`[4]int`). Array dimensions form part of the type signature: `[4]int` and `[5]int` are incompatible types.
Consequently, enterprise Go code relies universally upon **Slices** (`[]int`).

A Slice is a 24-byte header comprising:
1. **Data Pointer**: Memory address targeting the underlying contiguous backing array.
2. **Length (`len`)**: Active element count.
3. **Capacity (`cap`)**: Maximum element capacity before resizing must trigger.

### The Mechanics of `append()`
When invoking `append(slice, item)` where `len == cap`:
The Go runtime allocates a fresh backing array typically **double the size**, copies legacy elements, appends the target value, and repoints the slice pointer.
**High-Throughput Best Practice**: When handling known collections, pre-allocate: `make([]int, 0, 1000)` to eliminate redundant heap re-allocations!

### The "Comma Ok" Idiom for Maps
Querying an absent key `val := myMap["nonexistent"]` **never throws an exception**; it yields the type's Zero Value (`0`, `""`).
To discern between an intentional zero value versus key absence, employ the **Comma Ok idiom**:
`val, exists := myMap[key]`
If `exists == true`, the key definitively resides within the hash bucket.

---

---

## Beginner Friendly Explanation

### Analogy: Egg Cartons & Labeled Gym Lockers
1. **Array** is a rigid 6-slot egg carton: fixed physical geometry, incapable of accepting a 7th egg without shattering.
2. **Slice** is an expandable leather belt: as waistlines expand (*append item*), the elastic adjusts capacity automatically.
3. **Comma-Ok Map idiom** is inspecting a post office locker: opening the locker door, you consult registry logs: "Is this locker unassigned (*ok = false*), or did the occupant simply leave an empty mailbox (*val = 0*)?

## Experiments

- Append 10 elements sequentially in a loop printing len and cap to witness capacity doubling milestones (1, 2, 4, 8, 16).
- Mutate subDaftar[0] = "MODIFIED" to verify the parent slice mutates (confirming shared backing array pointers!).
- Prune a map key using native delete(tabelHitRate, "10.0.0.1").
- Deploy copy(dest, src) generating completely decoupled slice replicas with distinct backing arrays.

---

## Challenge

Author a `FilterBlacklistedIPs(ipList []string, blacklist map[string]bool) []string` returning clean IP slices efficiently pre-allocated.

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

You have mastered Slices, backing arrays, capacity doubling, and map comma-ok. Next week, we examine Structs, Pointers, and Methods.
