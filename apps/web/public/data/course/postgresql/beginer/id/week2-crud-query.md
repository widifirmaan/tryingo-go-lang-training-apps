# CRUD & Query — Isi, Lihat, Ubah, Hapus

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 2:** CRUD & Query

## Tujuan Pembelajaran

- **C**reate `INSERT`, **R**ead `SELECT`, **U**pdate `UPDATE`, **D**elete `DELETE` — 4 gerakan gudang
- `WHERE` saring, `ORDER BY` urut, `LIMIT` batasi
- `LIKE '%ber%'` cari mirip, `BETWEEN` rentang
- `IS NULL` cek kosong

---

## Kenapa Ini Penting Buat Kamu?

Gudang tanpa CRUD = hanya pajangan. Kasir perlu **ubah harga** (UPDATE), **hapus barang kadaluarsa** (DELETE), **cari beras** (LIKE).

---

## Program: CRUD Warung

```sql
-- Lihat semua
SELECT * FROM produk;

-- Saring + urut
SELECT nama, harga FROM produk WHERE stok > 5 ORDER BY harga DESC LIMIT 2;

-- Cari mirip
SELECT * FROM produk WHERE nama LIKE '%ber%'; -- beras, ber-...

-- Rentang
SELECT * FROM produk WHERE harga BETWEEN 10000 AND 50000;

-- Ubah (UPDATE) — naikkan harga Bayam
UPDATE produk SET harga = 6000 WHERE nama = 'Bayam';
SELECT * FROM produk WHERE nama = 'Bayam';

-- Hapus (DELETE) — hapus yang stok 0 (hati-hati!)
DELETE FROM produk WHERE stok = 0;
-- Aman: cek dulu dengan SELECT sebelum DELETE

-- Tambah kolom jika lupa
ALTER TABLE produk ADD COLUMN diskon INTEGER DEFAULT 0;
UPDATE produk SET diskon = 10 WHERE kategori = 'Sayur';
SELECT nama, harga, diskon FROM produk;
```

**Aturan emas:** `UPDATE`/`DELETE` tanpa `WHERE` = ubah/hapus **semua**! Selalu `SELECT` dulu.

---

## Konsep Kunci

### CRUD
- `INSERT` tambah, `SELECT` baca, `UPDATE` ubah, `DELETE` hapus

### `WHERE` + `LIKE` + `BETWEEN`
`WHERE harga > 10000`, `WHERE nama LIKE 'B%'`, `WHERE harga BETWEEN 10000 AND 50000`

### `ORDER BY` + `LIMIT`
`ORDER BY harga DESC` mahal dulu, `LIMIT 5` 5 teratas.

---

## Penjelasan untuk Pemula

### Analogi: Gudang

- **SELECT = ambil kardus lihat**, **UPDATE = ganti label harga**, **DELETE = buang kardus**.
- **`WHERE` = filter**: "ambil yang kategori Sayur saja".
- **Tanpa `WHERE` = sapu semua**: `DELETE FROM produk` → gudang kosong!

---

## Eksperimen

- **Hijau:** `SELECT * FROM produk WHERE kategori='Sayur' ORDER BY harga`
- **Kuning:** `UPDATE produk SET stok=99 WHERE id=1` → cek?
- **Merah:** Coba `DELETE FROM produk` tanpa WHERE di Supabase (jangan di prod!) → semua hilang, `SELECT` kosong.

---

## Tantangan

**Buku:** `UPDATE buku SET stok = stok -1 WHERE id=1` (pinjam), `DELETE FROM anggota WHERE kota IS NULL`, `SELECT * FROM buku WHERE judul LIKE '%Java%' LIMIT 3`.

---

## Glosarium Mini

- **CRUD**: 4 gerakan
- **WHERE/LIKE/BETWEEN**: saring
- **ORDER/LIMIT**: urut/batasi

---

## Ringkasan

Minggu 2: **CRUD** — bisa isi, lihat, ubah, hapus aman. Minggu depan: **JOIN** — gabung 2 rak.
