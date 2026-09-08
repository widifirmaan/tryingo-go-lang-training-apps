# JOIN & Relasi — Gabung 2 Rak MySQL Jadi 1 Laporan

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 3:** JOIN & Relasi

## Tujuan Pembelajaran

- `FOREIGN KEY` tali pengikat: `pesanan.pelanggan_id → pelanggan.id` (sumber: MySQL 8.0 docs, `ENGINE=InnoDB` wajib untuk FK)
- `INNER JOIN` hanya yang ada pasangan, `LEFT JOIN` semua kiri + pasangan jika ada
- `GROUP BY` + `COUNT/SUM` untuk laporan: total belanja per pelanggan

---

## Kenapa Ini Penting Buat Kamu?

Warung punya rak `pelanggan` dan `pesanan` terpisah. Bos tanya "Budi belanja berapa total?" — harus **gabung** 2 rak. Tanpa JOIN, hitung manual 100 nota. `FOREIGN KEY` cegah nota nyasar ke pelanggan yang tidak ada (`id 999`).

---

## Program: Pesanan Gabung Pelanggan

```sql
-- Rak pesanan pakai tali ke pelanggan (InnoDB wajib untuk FK!)
CREATE TABLE pesanan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pelanggan_id INT,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id)
) ENGINE=InnoDB;

INSERT INTO pesanan (pelanggan_id, total) VALUES
(1, 75000), (1, 32000), (2, 55000); -- Budi 2x, Siti 1x

-- INNER JOIN — hanya yang punya pasangan
SELECT pelanggan.nama, pesanan.total
FROM pelanggan
INNER JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id;

-- LEFT JOIN — semua pelanggan, meski belum pesan (NULL)
SELECT pelanggan.nama, pesanan.total
FROM pelanggan
LEFT JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id;

-- Laporan: total per pelanggan
SELECT pelanggan.nama,
       COUNT(pesanan.id) AS jml_pesanan,
       SUM(pesanan.total) AS total_belanja
FROM pelanggan
LEFT JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id
GROUP BY pelanggan.nama
ORDER BY total_belanja DESC;
```

---

## Konsep Kunci

### Foreign Key = Tali (Butuh InnoDB)
`pelanggan_id INT, FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id)` — MyISAM tidak bisa, pakai `ENGINE=InnoDB`. Tidak bisa isi `999` jika pelanggan 999 tidak ada.

### JOIN = Gabung Rak
- `INNER JOIN` → hanya yang nyambung kedua sisi.
- `LEFT JOIN` → semua kiri, kanan `NULL` jika tidak ada pasangan.

### `GROUP BY` = Kelompokkan
`GROUP BY pelanggan.nama` → `COUNT`/`SUM` dihitung per nama.

---

## Penjelasan untuk Pemula

### Analogi: Buku Tamu & Tumpukan Nota
- **pelanggan = buku tamu**, **pesanan = tumpukan nota** dengan `pelanggan_id` tulisan tangan.
- **JOIN = stapler**: stapler tiap nota ke baris buku tamu yang `id`-nya sama.
- **LEFT JOIN = stapler semua halaman buku tamu**, meski ada halaman tanpa nota (tampil `NULL`).

### Langkah 0 — Siapkan Device
- Sama W1: `db-fiddle.com` MySQL 8 atau lokal. Pastikan tabel `pelanggan` sudah ada dari W1 (atau buat cepat 2 baris).

### Cara Komputer Membaca
1. `INNER JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id` → untuk tiap pelanggan, cari pesanan dengan id sama → gabung jadi 1 baris.
2. `GROUP BY pelanggan.nama` → kumpulkan baris per nama → `SUM(total)` per kelompok.

### 3 Istilah Wajib
1. **Foreign Key**: tali antar rak
2. **JOIN**: gabung rak
3. **GROUP BY**: kelompokkan untuk hitung

---

## Eksperimen

- **Hijau:** `INSERT INTO pesanan (pelanggan_id, total) VALUES (999, 10000)` → error `foreign key`? (pelanggan 999 tidak ada)
- **Kuning:** `LEFT JOIN` pelanggan yang belum pesan → kolom `total` tampil `NULL`?
- **Merah:** `DELETE FROM pelanggan WHERE id = 1` yang punya pesanan → error FK (tidak bisa hapus induk yang masih punya anak).

---

### Bonus: VIEW + Subquery (laporan tanpa tulis ulang!)

```sql
-- VIEW = simpan query jadi "tabel maya" (dipakai capstone W10!)
CREATE VIEW laporan AS
SELECT pelanggan.nama, COUNT(pesanan.id) AS jml, SUM(pesanan.total) AS belanja
FROM pelanggan LEFT JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id
GROUP BY pelanggan.nama;

SELECT * FROM laporan WHERE belanja > 100000; -- pakai seperti tabel!
DROP VIEW IF EXISTS laporan; -- hapus jika salah

-- Subquery = query dalam query (saring pakai hasil lain)
SELECT nama FROM produk
WHERE harga > (SELECT AVG(harga) FROM produk); -- di atas rata-rata
```

---

## Tantangan

**Perpustakaan JOIN:** Buat `peminjaman(id AUTO_INCREMENT PK, buku_id INT, anggota_id INT, tgl DATE)` + FK ke `buku` & `anggota` → `SELECT anggota.nama, buku.judul FROM peminjaman JOIN anggota ON ... JOIN buku ON ...` → `GROUP BY anggota.nama` hitung pinjam per anggota.

---

## Glosarium Mini

- **Foreign Key**: tali (butuh InnoDB)
- **INNER/LEFT JOIN**: gabung pas / gabung semua-kiri
- **GROUP BY**: kelompok + hitung

---

## Ringkasan

Minggu 3 dari 5: **JOIN** (Level: Pemula). Bisa gabung 2 rak jadi laporan. Minggu depan: **Index** — biar 100rb baris tetap cepat.
