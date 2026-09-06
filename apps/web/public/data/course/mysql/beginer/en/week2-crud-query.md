# CRUD & Query — Isi, Lihat, Ubah, Hapus Gudang MySQL

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 2:** CRUD & Query

## Tujuan Pembelajaran

- **C**reate `INSERT` tambah kardus, **R**ead `SELECT` lihat, **U**pdate `UPDATE` ganti label, **D**elete `DELETE` buang — 4 gerakan gudang (sumber: MySQL 8.0 docs)
- Saring `WHERE`, urut `ORDER BY ... DESC`, batasi `LIMIT 2`, cari mirip `LIKE '%ber%'`, rentang `BETWEEN 10000 AND 50000`
- Aturan emas: `UPDATE`/`DELETE` tanpa `WHERE` = kena semua baris

---

## Kenapa Ini Penting Buat Kamu?

Gudang tanpa CRUD = pajangan. Kasir warung tiap hari **ubah harga** (`UPDATE produk SET harga = 6000 WHERE nama = 'Bayam'`), **buang barang kadaluarsa** (`DELETE WHERE stok = 0`), **cari beras** (`LIKE '%ber%'`). Tanpa `WHERE`, 1 klik hapus 10.000 baris — tidak bisa undo.

---

## Program: CRUD Warung

Jalankan di `db-fiddle.com` (MySQL 8) atau `mysql -u root -p toko_db`.

```sql
-- R: Lihat semua + saring + urut + batasi
SELECT * FROM produk;
SELECT nama, harga FROM produk WHERE stok > 5 ORDER BY harga DESC LIMIT 2;

-- R: Cari mirip (LIKE, % = apa saja) + rentang
SELECT * FROM produk WHERE nama LIKE '%ber%';
SELECT * FROM produk WHERE harga BETWEEN 10000 AND 50000;

-- U: Ubah harga Bayam (cek dulu dengan SELECT di atas!)
UPDATE produk SET harga = 6000 WHERE nama = 'Bayam';
SELECT * FROM produk WHERE nama = 'Bayam';

-- D: Hapus yang stok 0 (cek dulu!)
DELETE FROM produk WHERE stok = 0;

-- Tambah kolom jika lupa (ALTER)
ALTER TABLE produk ADD COLUMN diskon INT DEFAULT 0;
UPDATE produk SET diskon = 10 WHERE kategori = 'Sayur';
SELECT nama, harga, diskon FROM produk;
```

**Aturan emas (MySQL docs):** `UPDATE`/`DELETE` tanpa `WHERE` = ubah/hapus **semua**. Selalu `SELECT ... WHERE ...` dulu untuk cek.

---

## Konsep Kunci

### CRUD = 4 Gerakan Gudang
- `INSERT` tambah, `SELECT` baca, `UPDATE` ubah, `DELETE` hapus.

### `WHERE` + `LIKE` + `BETWEEN` = Saringan
`WHERE harga > 10000`, `WHERE nama LIKE 'B%'` (`%` = bebas), `WHERE harga BETWEEN 10000 AND 50000`.

### `ORDER BY` + `LIMIT` = Urut + Potong
`ORDER BY harga DESC` mahal dulu, `LIMIT 5` ambil 5 teratas.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Warung
- **SELECT = ambil kardus lihat**, **UPDATE = ganti label harga**, **DELETE = buang kardus ke tempat sampah**.
- **WHERE = filter**: "ambil yang kategori Sayur saja".
- **Tanpa WHERE = sapu semua**: `DELETE FROM produk` → gudang kosong seketika!

### Langkah 0 — Siapkan Device
- Sama W1: `db-fiddle.com` pilih MySQL 8 (tanpa install) atau lokal `mysql -u root -p` → `USE toko_db;` → `SHOW TABLES;` pastikan `produk` ada.

### Cara Komputer Membaca
1. `UPDATE produk SET harga = 6000 WHERE nama = 'Bayam'` → cari baris `nama='Bayam'` → ganti `harga` → lapor `Rows matched: 1`.
2. `SELECT * FROM produk WHERE harga BETWEEN 10000 AND 50000` → cek tiap baris, tampilkan yang lolos.

### 3 Istilah Wajib
1. **CRUD**: tambah/baca/ubah/hapus
2. **WHERE**: saringan baris
3. **LIMIT**: batasi jumlah

---

## Eksperimen

- **Hijau:** `SELECT * FROM produk WHERE kategori='Sayur' ORDER BY harga` → apa?
- **Kuning:** `UPDATE produk SET stok=99 WHERE id=1` → `SELECT` cek?
- **Merah:** Sengaja `DELETE FROM produk WHERE 1=0` (tidak ada yang cocok) → `0 rows affected`, aman. Jangan coba tanpa `WHERE` di data asli!

---

## Tantangan

**Buku Warung:** `UPDATE buku SET stok = stok - 1 WHERE id = 1` (pinjam 1) → `DELETE FROM anggota WHERE kota IS NULL` → `SELECT * FROM buku WHERE judul LIKE '%Java%' LIMIT 3` → screenshot 3 hasil.

---

## Glosarium Mini

- **CRUD**: 4 gerakan gudang
- **WHERE/LIKE/BETWEEN**: saring
- **ORDER BY/LIMIT**: urut/batasi

---

## Ringkasan

Minggu 2 dari 5: **CRUD** (Level: Pemula). Bisa isi, lihat, ubah, hapus dengan aman. Minggu depan: **JOIN** — gabung 2 rak.
