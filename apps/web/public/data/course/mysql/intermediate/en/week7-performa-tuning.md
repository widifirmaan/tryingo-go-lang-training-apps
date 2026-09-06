# Performa & Tuning — Gudang MySQL Tetap Cepat 1 Juta Baris

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 7:** Performa & Tuning

## Tujuan Pembelajaran

- `EXPLAIN SELECT ...` baca `type: ALL` (baca semua) vs `ref/range` (loncat) + `rows` + `Extra` (sumber: dev.mysql.com/doc/refman/8.0/en/explain)
- `ANALYZE TABLE` segarkan statistik, `OPTIMIZE TABLE` rapikan, `SHOW INDEX` cek

---

## Kenapa Ini Penting Buat Kamu?

100rb baris tanpa index = 2 detik per cari → pelanggan tunggu. Dengan `EXPLAIN`, tahu query mana baca semua → tambah index → 0.01 detik (200x!). Tanpa tuning, server upgrade (mahal) padahal index gratis.

---

## Program: Bedah Query Lambat

```sql
-- 1. Cari lambat
EXPLAIN SELECT * FROM produk WHERE kategori = 'Sembako';
-- type: ALL, rows: 100000 → BAHAYA (baca semua!)

-- 2. Tambah index
CREATE INDEX idx_kategori ON produk(kategori);

-- 3. Cek lagi
EXPLAIN SELECT * FROM produk WHERE kategori = 'Sembako';
-- type: ref, key: idx_kategori, rows: 12000 → BAGUS

-- 4. Rawat
ANALYZE TABLE produk;   -- segarkan statistik perencana
OPTIMIZE TABLE produk;  -- rapikan fragmentasi
SHOW INDEX FROM produk; -- daftar index

-- 5. Perangkap: SELECT * + LIKE '%x%' (depan %) tidak pakai index!
EXPLAIN SELECT * FROM produk WHERE nama LIKE '%ber%'; -- ALL (wajar, depan %)
EXPLAIN SELECT * FROM produk WHERE nama LIKE 'ber%';  -- range (belakang % OK!)
```

---

## Konsep Kunci

### `EXPLAIN` Kolom Penting
- `type`: `ALL` (buruk) → `index` → `range` → `ref` → `const` (bagus).
- `key`: index dipakai (NULL = tidak ada!).
- `rows`: perkiraan baca (semakin kecil bagus).
- `Extra`: `Using filesort` (urut manual, lambat) / `Using index` (hanya index, cepat!).

### `LIKE '%x'` vs `'x%'`
Depan `%` = tidak bisa index. Belakang saja = bisa.

---

## Penjelasan untuk Pemula

### Analogi: Dokter Query
- **EXPLAIN = rontgen**: lihat dalam tanpa bedah.
- **Index = obat**, **ANALYZE = cek lab berkala**.

### Langkah 0 — Siapkan Device
- Sama W1 + tabel `produk` isi agak banyak (loop `INSERT` 1000x via script/CLI).

### Cara Komputer Membaca
1. `EXPLAIN` → perencana MySQL tampilkan rencana (tanpa jalankan).
2. `CREATE INDEX` → B-Tree baru → rencana berubah.

### 3 Istilah Wajib
1. **EXPLAIN/type/rows**: rontgen/jenis/baris
2. **ANALYZE/OPTIMIZE**: segarkan/rapikan

---

## Eksperimen

- **Hijau:** `EXPLAIN` 2 query (dengan/tanpa index) → `rows` beda?
- **Kuning:** `LIKE '%ber'` vs `'ber%'` → `type` beda?
- **Merah:** Index di kolom `UPDATE`-sering → `INSERT` melambat? (Timbang!)

---

## Tantangan

**Dokter Warung:** 3 query lambat → `EXPLAIN` catat `type+rows` → tambah index → `EXPLAIN` lagi → buktikan `rows` turun 10x+. Screenshot sebelum/sesudah.

---

## Glosarium Mini

- **EXPLAIN/ANALYZE/OPTIMIZE**: rontgen/segar/rapi
- **ALL/ref**: semua/loncat

---

## Ringkasan

Minggu 7 dari 10: **Dokter Query** (Level: Menengah). Gratis 200x cepat. Minggu depan: **Replikasi** — cabang gudang.
