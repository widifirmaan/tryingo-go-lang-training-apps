# JOIN & Relasi — Gabung 2 Rak Jadi 1 Laporan

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 3:** JOIN & Relasi

## Tujuan Pembelajaran

- `FOREIGN KEY` — tali pengikat: `pesanan.pelanggan_id → pelanggan.id`
- `INNER JOIN` hanya yang ada pasangan, `LEFT JOIN` semua kiri + pasangan jika ada
- `GROUP BY` + `COUNT/SUM` untuk laporan: total belanja per pelanggan

---

## Kenapa Ini Penting Buat Kamu?

Warung punya rak `pelanggan` dan `pesanan` terpisah. Bos tanya "Budi belanja berapa total?" — harus **gabung** 2 rak. Tanpa JOIN, jawab manual.

---

## Program: Pesanan Gabung Pelanggan

```sql
-- Rak pesanan pakai tali ke pelanggan
CREATE TABLE pesanan (
    id SERIAL PRIMARY KEY,
    pelanggan_id INTEGER REFERENCES pelanggan(id), -- tali
    total DECIMAL(10,2) NOT NULL,
    tanggal TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
SELECT pelanggan.nama, COUNT(pesanan.id) AS jml_pesanan, SUM(pesanan.total) AS total_belanja
FROM pelanggan
LEFT JOIN pesanan ON pelanggan.id = pesanan.pelanggan_id
GROUP BY pelanggan.nama
ORDER BY total_belanja DESC;
```

---

## Konsep Kunci

### Foreign Key = Tali
`pelanggan_id INTEGER REFERENCES pelanggan(id)` — tidak bisa isi `999` jika tidak ada pelanggan 999.

### JOIN = Gabung Rak
- `INNER JOIN` → hanya yang nyambung
- `LEFT JOIN` → semua kiri, kanan `NULL` jika tidak ada

### `GROUP BY` = Kelompokkan
`GROUP BY pelanggan.nama` → hitung per nama.

---

## Penjelasan untuk Pemula

### Analogi: Buku Tamu & Nota

- **pelanggan = buku tamu**, **pesanan = tumpukan nota** dengan `pelanggan_id` tulisan tangan.
- **JOIN = stapler**: stapler nota ke baris buku tamu yang `id` sama.

---

## Eksperimen

- **Hijau:** `INSERT pesanan` tanpa `pelanggan_id` → boleh? (boleh NULL jika tidak `NOT NULL`)
- **Kuning:** `LEFT JOIN` pelanggan yang belum pesan → `total` NULL?
- **Merah:** `DELETE FROM pelanggan WHERE id=1` yang punya pesanan → error foreign key.

---

## Tantangan

**Perpustakaan:** `peminjaman(id, buku_id FK, anggota_id FK, tgl)` → `SELECT anggota.nama, buku.judul FROM peminjaman JOIN anggota ON ... JOIN buku ON ...` + `GROUP BY anggota.nama` hitung pinjam.

---

## Glosarium Mini

- **Foreign Key**: tali
- **JOIN**: gabung
- **GROUP BY**: kelompok

---

## Ringkasan

Minggu 3: **JOIN** — bisa gabung 2 rak jadi laporan. Minggu depan: **Index** — biar cari cepat.
