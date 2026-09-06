# Context & Sync — Alarm Batal dan Tunggu Bareng

> **Kategori:** Go | **Level:** Menengah | **Minggu 9:** Context & Sinkronisasi

## Tujuan Pembelajaran

- `context.WithTimeout(ctx, 100ms)` alarm batal otomatis + `ctx.Done()` dengar (sumber: go.dev/blog/context)
- `sync.WaitGroup` `Add/Done/Wait` tunggu semua kasir selesai sebelum tutup toko

---

## Kenapa Ini Penting Buat Kamu?

Supplier tidak balas 10 detik → kasir tunggu selamanya, pelanggan antre marah. Dengan `WithTimeout(2 detik)`, lewat → batal otomatis + pesan "coba lagi". `WaitGroup` pastikan tutup toko SETELAH semua kasir selesai (tidak matikan lampu saat masih ada pembeli).

---

## Program: Kerja dengan Alarm + Tunggu

```go
package main

import (
  "context"
  "fmt"
  "sync"
  "time"
)

func kerja(ctx context.Context, id int, wg *sync.WaitGroup) {
  defer wg.Done() // wajib! lapor selesai (meski batal)
  select {
  case <-time.After(200 * time.Millisecond):
    fmt.Printf("Kerja %d selesai\n", id)
  case <-ctx.Done(): // alarm bunyi → batal
    fmt.Printf("Kerja %d batal: %v\n", id, ctx.Err())
  }
}

func main() {
  // Alarm 100ms, kerja butuh 200ms → pasti batal (demo!)
  ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
  defer cancel() // wajib! matikan alarm (hemat resource)

  var wg sync.WaitGroup
  for i := 1; i <= 2; i++ {
    wg.Add(1) // daftar 1 sebelum go!
    go kerja(ctx, i, &wg)
  }
  wg.Wait() // tunggu keduanya lapor Done
  fmt.Println("Semua selesai/batal — toko boleh tutup")
}
```

---

## Konsep Kunci

### `context` = Alarm + Pesan Batal
`WithTimeout(100ms)` → `ctx.Done()` tertutup saat waktu habis. `WithCancel()` untuk batal manual.

### `cancel()` Wajib `defer`
Alarm hidup makan resource — `defer cancel()` matikan.

### `WaitGroup` = Daftar Tunggu
`Add(1)` sebelum `go`, `Done()` di akhir kerja (`defer`), `Wait()` tunggu semua.

---

## Penjelasan untuk Pemula

### Analogi: Alarm Dapur & Daftar Pulang
- **Context = alarm oven**: 100ms bunyi → angkat (batal).
- **WaitGroup = absen pulang**: 2 kasir → `Add(2)`, tiap selesai `Done()`, bos `Wait()` baru kunci pintu.

### Langkah 0 — Siapkan Device
- Sama W1: `go run alarm.go`. Ubah `100ms` → `300ms` untuk lihat "selesai" (bukan batal).

### Cara Komputer Membaca
1. `WithTimeout(100ms)` → timer jalan.
2. `kerja` tunggu `200ms` vs alarm `100ms` → alarm dulu → `ctx.Done()` → cabang batal.
3. `defer wg.Done()` → counter 2→0 → `Wait()` lepas.

### 3 Istilah Wajib
1. **Context/timeout**: alarm
2. **WaitGroup Add/Done/Wait**: daftar/lapor/tunggu
3. **select**: dengar banyak channel

---

## Eksperimen

- **Hijau:** Timeout `300ms` (> 200ms kerja) → "selesai" bukan "batal"?
- **Kuning:** Lupa `wg.Add(1)` → `Wait` langsung lepas (0)? Program selesai sebelum kerja?
- **Merah:** Lupa `defer cancel()` → `go vet` protes? (`lostcancel` check)

---

## Tantangan

**Toko Tepat Waktu:** 3 `go kerja` (150ms) + timeout 100ms → 3 "batal" + `Wait` → ubah timeout 200ms → 3 "selesai". **Selesai Menengah Go!**

---

## Glosarium Mini

- **context/cancel**: alarm/matikan
- **WaitGroup**: absen pulang
- **select**: dengar banyak

---

## Ringkasan

Minggu 9 dari 13: **Alarm & Tunggu** (Level: Menengah). Tidak tunggu selamanya. **Selesai Menengah Go!** Lanjut: **Stdlib** (Lanjutan).
