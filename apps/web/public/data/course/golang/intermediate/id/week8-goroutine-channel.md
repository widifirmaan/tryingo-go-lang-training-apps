# Goroutine & Channel — Kasir Paralel Warung Go

> **Kategori:** Go | **Level:** Menengah | **Minggu 8:** Goroutine & Channel
> **Prasyarat:** Minggu 7 — **Pointer & Package**.

## Tujuan Pembelajaran

- `go kasir()` buka kasir baru (ringan, ribuan bisa), `ch := make(chan string)` ban berjalan (sumber: go.dev/tour/concurrency)
- `ch <- "selesai"` kirim, `<-ch` terima (tunggu jika kosong), `close(ch)` tutup + `range` sampai tutup

---

## Kenapa Ini Penting Buat Kamu?

3 pelanggan bayar berurutan = 3x tunggu. Dengan 3 kasir paralel (`go`), total = 1x waktu terlama. Channel = ban berjalan antar kasir-dapur, aman tanpa rebutan (beda `mutex` manual yang rawan deadlock).

---

## Program: 2 Kasir + Ban Berjalan

```go
package main

import (
  "fmt"
  "sync"
)

func kasir(nama string, ch chan string) {
  ch <- "Selesai " + nama // kirim ke ban (tunggu jika tidak ada penerima!)
}

func main() {
  ch := make(chan string) // ban TANPA penyangga (unbuffered): kirim tunggu terima
  go kasir("Budi", ch)    // kasir 1 jalan sendiri
  go kasir("Siti", ch)    // kasir 2 jalan sendiri
  fmt.Println(<-ch)       // terima 1 (urutan acak Budi/Siti!)
  fmt.Println(<-ch)       // terima 2

  // Ban BERPENYANGGA: kirim 2 tanpa tunggu
  pesanan := make(chan int, 2)
  pesanan <- 1
  pesanan <- 2
  close(pesanan) // tutup → range berhenti
  for p := range pesanan {
    fmt.Println("Proses pesanan", p)
  }

  // Mutex: brankas untuk variabel bersama (ala Tour of Go!)
  var mu sync.Mutex
  stok := 10
  selesai := make(chan bool, 2)
  jual := func() {
    mu.Lock()         // kunci! 1 kasir saja
    stok--
    mu.Unlock()       // lepas
    selesai <- true
  }
  go jual()
  go jual()
  <-selesai
  <-selesai
  fmt.Println("Sisa stok (tepat 8!):", stok)
}
```

---

## Konsep Kunci

### `go f()` = Buka Kasir Baru
Fungsi jalan sendiri (concurrent). Murah: ribuan goroutine normal.

### Channel = Ban Berjalan Aman
- `ch := make(chan string)` unbuffered: kirim **tunggu** terima (jabat tangan).
- `make(chan int, 2)` buffered: tampung 2 tanpa tunggu.

### `close` + `range` = Tutup + Habiskan
`close(ch)` tutup ban → `for v := range ch` berhenti saat habis.

### `sync.Mutex` + `go run -race` = Brankas + Satpam Balapan
2 kasir `stok--` bareng tanpa kunci = hasil acak (race!). `Lock/Unlock` kunci brankas. `go run -race main.go` deteksi balapan OTOMATIS — wajib sebelum deploy!

---

## Penjelasan untuk Pemula

### Analogi: Kasir & Ban Sushi
- **Goroutine = kasir baru**: `go kasir()` buka kasir 2 tanpa tutup kasir 1.
- **Channel = ban sushi**: koki taruh (`ch <-`), pelanggan ambil (`<-ch`). Ban penuh → koki tunggu.

### Langkah 0 — Siapkan Device
- Sama W1: `go run kasir.go`. Tambah `time.Sleep` jika perlu lihat urutan (`time` package).

### Cara Komputer Membaca
1. `go kasir("Budi", ch)` → jalan background.
2. `ch <- "Selesai Budi"` → tunggu sampai `main` `<-ch` terima → lanjut.

### 3 Istilah Wajib
1. **Goroutine/channel**: kasir/ban
2. **Unbuffered/buffered**: tunggu/tampung
3. **close/range**: tutup/habiskan

---

## Eksperimen

- **Hijau:** 3 `go kasir` + 3 `<-ch` → urutan acak tiap run?
- **Kuning:** Hapus 1 `<-ch` → program macet (deadlock `all goroutines asleep`)? Pasang lagi.
- **Merah:** `pesanan <- 3` ke-3 tanpa terima (buffer 2) → macet? `close` + `range` selamatkan.

---

## Tantangan

**Dapur Paralel:** 3 `go masak(nama, ch)` + kumpulkan 3 hasil + `close` → cetak urut terima. Tambah `buffered(3)` bandingkan.
- **Sambungan (Minggu 7 — Pointer & Package):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **go/chan/<-**: buka/ban/kirim-terima
- **close/range**: tutup/habiskan
- **Deadlock**: saling tunggu (macet)

---

## Ringkasan

Minggu 8 dari 13: **Kasir Paralel** (Level: Menengah). Cepat + aman tanpa rebutan. Minggu depan: **Context** — alarm batal.
