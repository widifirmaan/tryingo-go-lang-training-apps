# Performa Tuning — Gudang Tetap Cepat 1 Juta Baris

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 8:** Performa Tuning
> **Prasyarat:** Minggu 7 — **JSONB Semi-Struktural**.

## Tujuan Pembelajaran

- `EXPLAIN ANALYZE` waktu nyata, `VACUUM`, `ANALYZE`, `pg_stat_statements` cari query lambat

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `EXPLAIN ANALYZE`, query lambat ketahuan dari komplain (bukan data). Dengan rontgen waktu-nyata + `VACUUM`, buktikan 100x sebelum deploy.

---

## Program

```sql
EXPLAIN ANALYZE SELECT * FROM produk WHERE kategori = 'Sembako';
-- Seq Scan cost=... time=1.2ms → Index Scan time=0.1ms

VACUUM ANALYZE produk;
-- WAJIB dulu (tanpa ini: relation does not exist!):
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 5;
```


---

## Penjelasan untuk Pemula

### Analogi: Dokter Gudang
- **Query lambat tanpa EXPLAIN = sakit tanpa rontgen**: tebak-tebak (tambah RAM?) mahal dan sering salah.
- **`EXPLAIN ANALYZE` = rontgen beneran**: tunjuk baris lambat + waktu ms-nya. `VACUUM` = sapu data mati, `pg_stat_statements` = rekam medis semua query!

### Langkah 0 — Siapkan Device
- Sama W1 track ini (Supabase tanpa install / lokal).

### Cara Komputer Membaca
- EXPLAIN ANALYZE tunjukkan waktu nyata tiap tahap; VACUUM sapu data mati.

### 3 Istilah Wajib
- 1. **EXPLAIN ANALYZE/VACUUM**: rontgen-waktu/sapu

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Performa Tuning di Warungmu:** pakai `produk`, `pg_stat_statements` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `produk`, `pg_stat_statements`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **JSONB Semi-Struktural** (Minggu 7): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 8: **Gudang Cepat** — `EXPLAIN ANALYZE` + `VACUUM`. Minggu depan: **Replikasi & HA**.
