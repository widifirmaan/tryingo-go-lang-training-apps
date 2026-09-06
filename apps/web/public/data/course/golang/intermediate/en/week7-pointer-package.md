# Pointers & Packages — Warehouse Addresses and Buildings in Go

> **Kategori:** Go | **Level:** Intermediate | **Minggu 7:** Pointer, Memory & Package

## Learning Objectives

- `&x` box address, `*p` open content, `*p = 21` change original via address (source: go.dev/tour/moretypes/1)
- When to use pointers: change big data without expensive copy + `package warung` split files per shelf
- `go mod init warung` + `import "warung/produk"` connect buildings

---

## Why This Matters (Non-IT)

Sending a 1MB struct to a function without pointer = photocopy 1MB each call (slow). With `*Produk`, send 8-byte address. Changing stock in a function without pointer = copy changes, original stays (silent bug!).

---

## Program: Stock Address & Shop Building

```go
package main

import "fmt"

// Receive ADDRESS (*int) → change ORIGINAL
func tambah(p *int) {
  *p += 10
}

func main() {
  stok := 10
  fmt.Println("Address:", &stok)
  tambah(&stok)
  fmt.Println("After tambah:", stok) // 20 (original changed!)

  s2 := 10
  tambahSalinan(s2)
  fmt.Println("Copy stays:", s2) // 10 (unchanged)
}

func tambahSalinan(s int) { s += 10 }
```

```bash
go mod init warung
mkdir produk
# produk/produk.go → package produk, func Harga() int { return 62000 }
# main.go → import "warung/produk" → produk.Harga()
go run .
```

---

## Key Concepts

### `&` / `*` = Address/Open
- `&stok` box address, `*p` open content, `*p = 21` change original.

### Pointer vs Copy
- Pointer: cheap + changes original. Copy: safe but expensive for big data.

### `package` + `go.mod` = Building
`package produk` per shelf file, `go mod init warung` building ID.

---

## Beginner Friendly Explanation

### Analogy: Home Address & Mall Building
- **Pointer = home address**: send address (small), worker comes and changes original.
- **Package = mall shop**: `produk` rice shop, `main` front cashier.

### Step 0 — Prepare Device
- Same as W1: `go version`, `warung` folder, `go mod init warung`.

### How the Computer Reads It
1. `tambah(&stok)` → `p` = address → `*p += 10` → writes there → `stok` becomes 20.

### 3 Must-Know Terms
1. **Pointer `&/*`**: address/open
2. **Package/import**: building/connect
3. **go.mod**: building ID

---

## Experiments

- **Green:** `tambah(&stok)` 2x → 30?
- **Yellow:** Send without `&` → error `cannot use stok as *int`? (Go strict, good!)
- **Red:** `var p *int` empty → `nil`. `*p` → panic? Check `if p != nil` first.

---

## Challenge

**Address Warehouse:** `type Gudang struct{ Stok int }` + `func (g *Gudang) Isi(n int)` (pointer receiver!) + split `main.go`/`gudang/gudang.go` → `go run .`.

---

## Mini Glossary

- **Pointer/nil**: address/empty
- **Package/go.mod**: building/ID

---

## Summary

Week 7 of 13: **Address & Building** (Level: Intermediate). Can change originals + split files. Next: **Goroutine** — parallel cashiers.
