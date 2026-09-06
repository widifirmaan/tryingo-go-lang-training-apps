# Index & Optimasi — Daftar Isi Biar 100rb Baris Tetap Cepat

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 4:** Index & Optimasi

## Tujuan Pembelajaran

- `CREATE INDEX idx_email ON pelanggan(email)` daftar isi — cari `WHERE email = '...'` dari baca semua jadi loncat (sumber: MySQL 8.0 docs)
- `EXPLAIN SELECT ...` lihat rencana: `type: ALL` (baca semua) vs `ref/range` (pakai index)
- Kapan index: kolom sering `WHERE/JOIN/ORDER BY`; jangan semua kolom (tiap `INSERT` jadi lambat)

---

## Kenapa Ini Penting Buat Kamu?

Gudang 10 baris tidak terasa. 100 ribu pelanggan, cari `email` tanpa index = baca 100rb kardus satu per satu. Dengan index = buka daftar isi abjad langsung ke rak. Tanpa `EXPLAIN`, kamu tidak tahu query-mu baca semua atau loncat.

---

## Program: Index Warung

```sql
-- Lihat rencana SEBELUM index (type: ALL = baca semua, lambat)
EXPLAIN SELECT * FROM pelanggan WHERE email = 'siti@email.com';

-- Bikin daftar isi
CREATE INDEX idx_email ON pelanggan(email);
CREATE INDEX idx_kategori ON produk(kategori);

-- Lihat lagi → type: ref (pakai index, cepat)
EXPLAIN SELECT * FROM pelanggan WHERE email = 'siti@email.com';

-- Index untuk JOIN cepat (kolom FK)
CREATE INDEX idx_pesanan_pelanggan ON pesanan(pelanggan_id);

-- Lihat index yang ada
SHOW INDEX FROM pelanggan;

-- Hapus jika tidak perlu (tiap INSERT harus update daftar isi)
DROP INDEX idx_kategori ON produk;
```

---

## Konsep Kunci

### Index = Daftar Isi Buku Telepon
Tanpa index: baca tiap halaman. Dengan index `email`: cari "Siti" → S → halaman 200.

### `EXPLAIN` = Rencana Kerja
`EXPLAIN SELECT ...` tampilkan `type`: `ALL` (baca semua, waspada), `ref`/`range` (pakai index, bagus), `key` (index yang dipakai).

### Kapan Index vs Tidak
- Sering `WHERE email`, `JOIN pelanggan_id`, `ORDER BY harga` → index.
- Kolom `kota` jarang saring → tidak perlu (hemat waktu `INSERT`).

---

## Penjelasan untuk Pemula

### Analogi: Buku Telepon vs Tumpukan Kertas
- **Tanpa index = tumpukan kertas**: cari "Siti" baca 1 per 1.
- **Dengan index = buku telepon abjad**: langsung ke S.

### Langkah 0 — Siapkan Device
- Sama W1. `EXPLAIN` jalan di `db-fiddle` maupun lokal tanpa install tambahan.

### Cara Komputer Membaca
1. `CREATE INDEX idx_email ON pelanggan(email)` → MySQL buat struktur B-Tree (daftar isi abjad) di samping tabel.
2. `SELECT ... WHERE email = '...'` → MySQL cek: ada index? Ya → loncat (`ref`), tidak → baca semua (`ALL`).

### 3 Istilah Wajib
1. **Index**: daftar isi
2. **EXPLAIN**: rencana kerja query
3. **ALL vs ref**: baca semua vs loncat

---

## Eksperimen

- **Hijau:** `EXPLAIN` sebelum & sesudah `CREATE INDEX` → kolom `type` berubah `ALL` → `ref`?
- **Kuning:** `DROP INDEX idx_email ON pelanggan` → `EXPLAIN` balik `ALL`?
- **Merah:** Bikin index di `stok` yang jarang di-`WHERE` lalu `INSERT` 100 baris → rasakan lebih lambat? (daftar isi harus ditulis tiap insert)

---

## Tantangan

**Perpustakaan Cepat:** `CREATE INDEX idx_judul ON buku(judul)` → `EXPLAIN SELECT * FROM buku WHERE judul LIKE 'Java%'` → `type` apa? Tambah `idx_email` di `anggota` → bandingkan `rows` sebelum/sesudah.

---

## Glosarium Mini

- **Index**: daftar isi (B-Tree)
- **EXPLAIN/SHOW INDEX**: rencana/daftar index
- **ALL/ref**: baca semua/loncat

---

## Ringkasan

Minggu 4 dari 5: **Index** (Level: Pemula). Gudang besar tetap cepat. Minggu depan: **Stored Procedure** — resep di gudang.
