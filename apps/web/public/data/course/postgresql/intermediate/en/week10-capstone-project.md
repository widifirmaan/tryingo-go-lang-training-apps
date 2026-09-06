# Capstone: Gudang Warung Lengkap

> **Kategori:** PostgreSQL | **Level:** Menengah | **Minggu 10:** Capstone Project

## Tujuan Pembelajaran

- Gabung `CREATE TABLE` + `JOIN` + `INDEX` + `JSONB` + `replikasi` jadi gudang warung 10rb baris + laporan `GROUP BY` + `Window`

---

## Kenapa Ini Penting Buat Kamu?

9 minggu terpisah — capstone buktikan gabung: gudang 10rb baris + laporan + backup/restore. Portfolio PostgreSQL.

---

## Program: Gudang Capstone

Buat `produk`, `pelanggan`, `pesanan` + `INDEX` + `JSONB` untuk `pesanan.data` + `replica` + `EXPLAIN ANALYZE`.

**Tugas:** Import 10rb baris `COPY FROM csv`, buat laporan `SELECT kategori, SUM(harga) OVER (PARTITION BY kategori)`.


---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Gudang
- Lihat Program: jalankan baris per baris di Supabase/`psql`, ubah 1 angka, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama W1 track ini (Supabase tanpa install / lokal).

### Cara Komputer Membaca
- CHECKLIST semua (index + view + backup) lalu `pg_dump` + restore + data sama.

### 3 Istilah Wajib
- 1. **Capstone/pg_dump**: gabung/cadangan

## Ringkasan

Minggu 10: **Capstone Gudang** — gudang lengkap, **Selesai PostgreSQL 0→Ahli!**
