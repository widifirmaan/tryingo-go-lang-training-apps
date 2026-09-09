# Capstone: Gudang Warung Lengkap

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 10:** Capstone Project
> **Prasyarat:** Minggu 9 — **Replikasi & HA**.

## Tujuan Pembelajaran

- Gabung `CREATE TABLE` + `JOIN` + `INDEX` + `JSONB` + `replikasi` jadi gudang warung 10rb baris + laporan `GROUP BY` + `Window`

---

## Kenapa Ini Penting Buat Kamu?

9 minggu terpisah — capstone buktikan gabung: gudang 10rb baris + laporan + backup/restore. Portfolio PostgreSQL.

---

## Program: Gudang Capstone

Buat `produk`, `pelanggan`, `pesanan` + `INDEX` + `JSONB` untuk `pesanan.data` + `replica` + `EXPLAIN ANALYZE`.

**Tugas:** Import 10rb baris `COPY FROM csv`, buat laporan `SELECT kategori, SUM(harga) OVER (PARTITION BY kategori)`.



```sql
-- Capstone Gudang: JOIN SQLite (aksi nyata di playground; di Postgres
-- produksi pola sama + JSONB + replikasi + pg_dump, lihat Tugas)
CREATE TABLE produk(id INTEGER PRIMARY KEY, nama TEXT, kategori TEXT, harga INTEGER, stok INTEGER);
CREATE TABLE pelanggan(id INTEGER PRIMARY KEY, nama TEXT, kota TEXT);
CREATE TABLE pesanan(id INTEGER PRIMARY KEY, pelanggan_id INTEGER, produk_id INTEGER, qty INTEGER, tanggal TEXT);
INSERT INTO produk VALUES (1,'Beras 5kg','Sembako',62000,40),(2,'Minyak 2L','Sembako',48000,25),(3,'Sabun','Rumah',12000,100);
INSERT INTO pelanggan VALUES (1,'Budi','Bandung'),(2,'Siti','Jakarta');
INSERT INTO pesanan VALUES (1,1,1,2,'2026-09-01'),(2,1,3,5,'2026-09-02'),(3,2,2,1,'2026-09-03');
CREATE INDEX idx_pesanan_produk ON pesanan(produk_id);
-- Laporan omzet per kategori (JOIN + GROUP BY, W3)
SELECT pr.kategori, SUM(pr.harga * ps.qty) AS omzet
FROM pesanan ps JOIN produk pr ON pr.id = ps.produk_id
GROUP BY pr.kategori;
-- Peringkat produk terlaris per kategori (Window, W6)
SELECT nama, kategori,
  SUM(stok) OVER (PARTITION BY kategori) AS stok_kategori
FROM produk;
EXPLAIN QUERY PLAN SELECT * FROM pesanan WHERE produk_id = 1;
```

*Tempel di playground → Run per statement, lihat omzet + peringkat + QUERY PLAN.*

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Gudang
- **9 minggu = bangun gudang**: rak (tabel), tali (FK), daftar isi (index), resep (function), alarm (trigger).
- **Capstone = grand opening**: gudang 10rb baris + laporan + backup/restore TERBUKTI (`pg_dump` + restore + data sama!). Tanpa backup = gudang tanpa asuransi!

### Langkah 0 — Siapkan Device
- Sama W1 track ini (Supabase tanpa install / lokal).

### Cara Komputer Membaca
- CHECKLIST semua (index + view + backup) lalu `pg_dump` + restore + data sama.

### 3 Istilah Wajib
- 1. **Capstone/pg_dump**: gabung/cadangan

## Eksperimen

- **Hijau:** `SELECT * FROM produk` → 3 baris? `WHERE stok < 30` → apa?
- **Kuning:** Tambah pesanan Siti 3 Minyak → omzet Sembako berubah?
- **Merah:** Hapus `INDEX` → `EXPLAIN` berubah jadi SCAN? Buat lagi.

## Tantangan

****Gudang Grand Opening:** gabungkan `CREATE TABLE` + `JOIN` + `Window` + `EXPLAIN`: tambah tabel `stok_masuk`, view `v_omzet_harian`, dan uji `EXPLAIN` tetap pakai index.**

Hijau: view jalan. Kuning: INSERT 1 baris → view ikut berubah. Merah: `pg_dump` + restore (Tugas) → data sama.

## Ringkasan

Minggu 10: **Capstone Gudang** — gudang lengkap, **Selesai PostgreSQL 0→Ahli!**
