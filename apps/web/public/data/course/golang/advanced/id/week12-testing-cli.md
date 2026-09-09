# Testing & CLI — Uji Rasa dan Tombol Warung Go

> **Kategori:** Go | **Level:** Lanjutan | **Minggu 12:** Testing & CLI Tools
> **Prasyarat:** Minggu 11 — **HTTP Server**.

## Tujuan Pembelajaran

- `go test` + `func TestHitung(t *testing.T)` + `t.Errorf` cicip otomatis (sumber: go.dev/doc/tutorial/add-a-test)
- `flag.String("nama", "Tamu", "...")` tombol `--nama Budi` + `flag.Parse()` + `*nama` buka (sumber: pkg.go.dev/flag)

---

## Kenapa Ini Penting Buat Kamu?

Ubah rumus diskon tanpa uji → pelanggan bayar salah, ketahuan 3 hari kemudian. Dengan `go test`, ubah → `FAIL` langsung → perbaiki sebelum deploy. CLI `--nama` untuk kasir terminal tanpa browser.

---

## Program: Cicip + Tombol Warung

```go
// hitung.go
package main

func Hitung(a, b int) int { return a + b }

func Diskon(harga, persen int) int { return harga - harga*persen/100 }
```

```go
// hitung_test.go — NAMA HARUS *_test.go!
package main

import "testing"

func TestHitung(t *testing.T) {
  if Hitung(2, 3) != 5 {
    t.Errorf("Hitung(2,3) = %d, mau 5", Hitung(2, 3))
  }
}

func TestDiskon(t *testing.T) {
  kasus := []struct{ harga, persen, mau int }{
    {62000, 10, 55800},
    {5000, 0, 5000},
  }
  for _, k := range kasus {
    if hasil := Diskon(k.harga, k.persen); hasil != k.mau {
      t.Errorf("Diskon(%d,%d) = %d, mau %d", k.harga, k.persen, hasil, k.mau)
    }
  }
}
```

```bash
go test -v
# === RUN TestHitung --- PASS
```

```go
// cli.go — kasir terminal
package main

import (
  "flag"
  "fmt"
)

func main() {
  nama := flag.String("nama", "Tamu", "nama pelanggan")
  qty := flag.Int("qty", 1, "jumlah karung")
  flag.Parse() // wajib! baca tombol
  fmt.Printf("Halo %s, %d karung\n", *nama, *qty)
}
```

```bash
go run cli.go --nama Budi --qty 2
```

---

## Konsep Kunci

### `*_test.go` + `TestXxx(t *testing.T)` = Dapur Uji
File akhiran `_test.go`, fungsi `Test` + `t.Errorf` jika salah. `go test -v` cicip semua.

### Table Test = Cicip Banyak Sekaligus
Slice struct `{input, mau}` + loop — tambah kasus tanpa fungsi baru.

### `flag` = Tombol Terminal
`flag.String("nama", "Tamu", "ket")` → `--nama Budi`. `flag.Parse()` wajib. `*nama` buka nilai.

---

## Penjelasan untuk Pemula

### Analogi: Cicip Masakan & Tombol Mesin
- **Test = cicip**: masak `Diskon` → cicip 2 kasus → pas? Saji.
- **flag = tombol mesin kasir**: `--qty 2` tekan tombol.

### Langkah 0 — Siapkan Device
- Sama W1: `go test ./...` di folder (cari `*_test.go` otomatis).

### Cara Komputer Membaca
1. `go test` → compile tiap `*_test.go` → jalankan `TestXxx` → `FAIL` jika `t.Errorf` dipanggil.
2. `--nama Budi` → `flag.Parse` → `*nama` = "Budi".

### 3 Istilah Wajib
1. **Test/table test**: cicip/cicip banyak
2. **flag/Parse**: tombol/baca tombol

---

## Eksperimen

- **Hijau:** Ubah `Hitung` jadi `a-b` → `FAIL`? Betulkan.
- **Kuning:** `go run cli.go` tanpa tombol → "Tamu, 1 karung" (default)?
- **Merah:** Lupa `flag.Parse()` → selalu default? Pasang.

---

## Tantangan

**Kasir Teruji:** `hitungTotal(keranjang, diskon)` + table test 3 kasus + `cli.go` `--nama --qty` → `go test` PASS + `go run` lulus.

---

## Glosarium Mini

- **Test/Errorf**: cicip/lapor
- **flag/Parse/*nama**: tombol/baca/buka

---

## Ringkasan

Minggu 12 dari 13: **Cicip & Tombol** (Level: Lanjutan). Ubah berani karena ada uji. Minggu depan: **Capstone**.
