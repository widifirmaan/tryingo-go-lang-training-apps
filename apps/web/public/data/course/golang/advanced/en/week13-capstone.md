# Capstone — Full Go Shop: CLI + API + Test

> **Kategori:** Go | **Level:** Advanced | **Minggu 13:** Capstone: REST API + CLI

## Learning Objectives

- Combine W1-W12: `struct` card + `json` save + `http` API + `flag` CLI + `test` into 1 `warung` binary shop

---

## Why This Matters (Non-IT)

13 separate weeks — capstone proves you can combine into a real product: terminal cashier (`--tambah`) + phone API (`/produk`) + lasting data (`produk.json`) + passing tests. This is a "production-ready Go" portfolio.

---

## Program: Full Go Shop

```go
// main.go — combine all weeks
package main

import (
  "encoding/json"
  "flag"
  "fmt"
  "net/http"
  "os"
)

type Produk struct {
  ID    int    `json:"id"`
  Nama  string `json:"nama"`
  Harga int    `json:"harga"`
}

var file = "produk.json"

func muat() []Produk {
  var daftar []Produk
  data, err := os.ReadFile(file) // W10: I/O
  if err != nil {
    return []Produk{}
  }
  json.Unmarshal(data, &daftar) // W10: encoding
  return daftar
}

func simpan(daftar []Produk) {
  data, _ := json.MarshalIndent(daftar, "", "  ")
  os.WriteFile(file, data, 0644)
}

func main() {
  tambah := flag.String("tambah", "", "add: Name:Price") // W12: CLI
  layani := flag.Bool("serve", false, "run API")
  flag.Parse()

  if *tambah != "" {
    var nama string
    var harga int
    fmt.Sscanf(*tambah, "%[^:]:%d", &nama, &harga)
    daftar := muat()
    daftar = append(daftar, Produk{ID: len(daftar) + 1, Nama: nama, Harga: harga}) // W4: slice
    simpan(daftar)
    fmt.Println("Added:", nama)
    return
  }

  if *layani { // W11: HTTP
    http.HandleFunc("/produk", func(w http.ResponseWriter, r *http.Request) {
      w.Header().Set("Content-Type", "application/json")
      json.NewEncoder(w).Encode(muat())
    })
    fmt.Println("Open http://localhost:8080/produk")
    http.ListenAndServe(":8080", nil)
    return
  }

  for _, p := range muat() { // W2: for + W5: struct
    fmt.Printf("%d. %s Rp%d\n", p.ID, p.Nama, p.Harga)
  }
}
```

```bash
go run . --tambah "Bayam:5000"
go run .
go run . --serve
go test ./...
go build -o warung .  # 1 binary! (W1)
```

---

## Key Concepts

### Capstone = Combine W1-W12
`flag` CLI + `http` API + `json` file + `slice` + `struct` — 1 `warung` binary.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening Shop
- **W1-W5 foundation** (syntax, function, struct) = building.
- **W6-W9 engine** (interface, channel) = electricity.
- **W10-W12 finishing** (json, http, test) = shelves + taste.
- **W13 = grand opening**: all in 1 shop.

### 3 Must-Know Terms
1. **Capstone/binary**: combine/become 1 file

---

## Challenge

**Go Shop Grand Opening:** `go run` 3 commands pass (`--tambah`, list, `--serve` + browser JSON) + `go test` PASS + `go build -o warung` + `./warung` runs. Screenshot 4 + 1-min video. **Go 0→Expert done!** 🎉

---

## Mini Glossary

- **Capstone/binary/deploy**: combine/become/open

---

## Summary

Week 13 of 13: **Grand Opening** (Level: Advanced). **Go 0→Expert from zero done!** 🎉
