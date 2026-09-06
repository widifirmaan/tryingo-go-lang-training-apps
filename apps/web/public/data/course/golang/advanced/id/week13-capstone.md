# Capstone — Warung Go Lengkap: CLI + API + Uji

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 13:** Capstone: REST API + CLI

## Tujuan Pembelajaran

- Gabung W1-W12: `struct` kartu + `json` simpan + `http` API + `flag` CLI + `test` uji jadi 1 warung `warung` binary

---

## Kenapa Ini Penting Buat Kamu?

13 minggu terpisah — capstone buktikan bisa gabung jadi produk nyata: kasir terminal (`--tambah`) + API HP (`/produk`) + data awet (`produk.json`) + uji lulus. Ini portfolio "Go production-ready".

---

## Program: Warung Lengkap Go

```go
// main.go — gabung semua minggu
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
  tambah := flag.String("tambah", "", "tambah: Nama:Harga") // W12: CLI
  layani := flag.Bool("serve", false, "jalankan API")
  flag.Parse()

  if *tambah != "" {
    var nama string
    var harga int
    fmt.Sscanf(*tambah, "%[^:]:%d", &nama, &harga)
    daftar := muat()
    daftar = append(daftar, Produk{ID: len(daftar) + 1, Nama: nama, Harga: harga}) // W4: slice
    simpan(daftar)
    fmt.Println("Tambah:", nama)
    return
  }

  if *layani { // W11: HTTP
    http.HandleFunc("/produk", func(w http.ResponseWriter, r *http.Request) {
      w.Header().Set("Content-Type", "application/json")
      json.NewEncoder(w).Encode(muat())
    })
    fmt.Println("Buka http://localhost:8080/produk")
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
# + hitung_test.go dari W12 untuk fungsi total (W3: error, W6: interface opsional)
go test ./...
go build -o warung .  # 1 binary! (W1)
```

---

## Konsep Kunci

### Capstone = Gabung W1-W12
`flag` CLI + `http` API + `json` file + `slice` + `struct` — 1 binary `warung`.

---

## Penjelasan untuk Pemula

### Analogi: Warung Grand Opening
- **W1-W5 fondasi** (sintaks, fungsi, struct) = bangunan.
- **W6-W9 mesin** (interface, channel) = listrik.
- **W10-W12 finishing** (json, http, test) = etalase + uji.
- **W13 = grand opening**: semua jadi 1 toko.

### Langkah 0 — Siapkan Device
- Sama W1 + `curl`/browser + port 8080 bebas.

### 3 Istilah Wajib
1. **Capstone/binary**: gabung/1 file jadi

---

## Tantangan

**Grand Opening Warung Go:** `go run` 3 perintah lulus (`--tambah`, list, `--serve` + browser JSON) + `go test` PASS + `go build -o warung` + `./warung` jalan. Screenshot 4 + video 1 menit. **Selesai Go 0→Ahli!** 🎉

---

## Glosarium Mini

- **Capstone/binary/deploy**: gabung/jadi/buka

---

## Ringkasan

Minggu 13 dari 13: **Grand Opening** (Level: Lanjutan). **Selesai Go 0→Ahli dari nol!** 🎉 Lanjut: **HTTP production** (middleware, DB).
