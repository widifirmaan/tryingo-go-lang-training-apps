# Index — Daftar Isi Kardus MongoDB

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 3:** Index
> **Prasyarat:** Minggu 2 — **Update & Delete**.

## Tujuan Pembelajaran

- `createIndex({ email: 1 })` daftar isi naik (`1`) / turun (`-1`), `{ unique: true }` anti kembar (sumber: mongodb.com/docs/manual/indexes)
- `explain("executionStats")` bedakan `COLLSCAN` (baca semua) vs `IXSCAN` (loncat index)
- `getIndexes()` / `dropIndex()` kelola

---

## Kenapa Ini Penting Buat Kamu?

100rb kartu pelanggan, cari `email` tanpa index = baca 100rb kartu. Dengan index = loncat langsung. Tanpa `explain`, tidak tahu query-mu baca semua atau loncat.

---

## Program: Daftar Isi Warung

```javascript
// di mongosh atau Compass
db.pelanggan.createIndex({ email: 1 }, { unique: true })
db.produk.createIndex({ kategori: 1 })
db.produk.createIndex({ harga: -1 }) // turun untukurut mahal dulu

// Bandingkan rencana
db.pelanggan.find({ email: "siti@email.com" }).explain("executionStats")
// Cari: "stage": "IXSCAN" (bagus) vs "COLLSCAN" (baca semua)

db.produk.getIndexes()
db.produk.dropIndex("kategori_1")
```

---

## Konsep Kunci

### `createIndex({ field: 1 })` = Daftar Isi
`1` naik, `-1` turun, `unique: true` tolak kembar (email ganda).

### `COLLSCAN` vs `IXSCAN` = Baca Semua vs Loncat
`explain("executionStats")` → `stage` + `totalDocsExamined` (semakin kecil semakin bagus).

---

## Penjelasan untuk Pemula

### Analogi: Buku Telepon
- **Tanpa index = tumpukan kartu**: baca 1 per 1.
- **Dengan index = buku telepon abjad**: langsung ke S.

### Langkah 0 — Siapkan Device
- Sama W1: `mongosh` atau Compass Atlas Free.

### Cara Komputer Membaca
1. `createIndex({ email: 1 })` → Mongo buat B-Tree abjad di samping koleksi.
2. `find({ email: "..." })` → cek ada index? Ya → `IXSCAN` loncat.

### 3 Istilah Wajib
1. **Index/unique**: daftar isi/anti kembar
2. **COLLSCAN/IXSCAN**: baca semua/loncat

---

## Eksperimen

- **Hijau:** `explain` sebelum/sesudah index → `stage` berubah?
- **Kuning:** `insertOne` email kembar → error `duplicate key`?
- **Merah:** `dropIndex` → `explain` balik `COLLSCAN`?

---

## Tantangan

**Warung Cepat:** `createIndex({ nama: 1 })` + `unique` di `email` + `explain` 2 query → screenshot `IXSCAN` 2x.
- **Sambungan (Minggu 2 — Update & Delete):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Index/unique/explain**: daftar/anti-kembar/rencana

---

## Ringkasan

Minggu 3 dari 5: **Daftar Isi** (Level: Pemula). 100rb kartu tetap cepat. Minggu depan: **Aggregation** — laporan.
