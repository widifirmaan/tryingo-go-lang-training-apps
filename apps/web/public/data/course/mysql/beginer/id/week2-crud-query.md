# CRUD & Query Lanjutan

## Kenapa Materi Ini Penting

MySQL adalah database relasional open source yang dijalankan oleh jutaan website - WordPress sampai aplikasi fintech. SQL yang Anda tulis di sini adalah bahasa yang sama dipakai untuk mewawancarai data di hampir semua perusahaan.

Program latihan: *"Operasi Data Lengkap"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- INSERT data
- UPDATE dengan WHERE
- DELETE dengan WHERE
- Subquery
- GROUP BY HAVING

---

## Program: Operasi Data Lengkap

```sql
INSERT INTO produk (nama, harga, stok, kategori) VALUES
    ('Webcam HD', 650000, 40, 'Aksesoris'),
    ('SSD 512GB', 950000, 35, 'Storage');

SELECT nama, harga FROM produk
    WHERE harga BETWEEN 500000 AND 3000000
    ORDER BY harga DESC;

SELECT kategori, COUNT(*) AS jumlah, AVG(harga) AS rata
    FROM produk GROUP BY kategori HAVING COUNT(*) >= 2;

UPDATE produk SET harga = harga * 0.9
    WHERE kategori = 'Aksesoris';

UPDATE produk SET stok = stok - 5 WHERE nama = 'Laptop ASUS';

DELETE FROM produk WHERE stok = 0;

SELECT nama, harga FROM produk
    WHERE harga > (SELECT AVG(harga) FROM produk);

SELECT * FROM produk WHERE nama LIKE '%Logitech%';
SELECT * FROM pelanggan WHERE kota LIKE 'Jakarta%';
```

---

## Konsep Kunci

### INSERT
Menambah baris baru ke tabel.

### UPDATE
Ubah data dengan WHERE clause.

### DELETE
Hapus data dengan WHERE.

### Subquery
Query di dalam query.

### GROUP BY & HAVING
GROUP BY mengelompokkan, HAVING filter kelompok.

---

## Eksperimen

- INSERT IGNORE
- UPDATE dengan subquery
- LIKE wildcard
- Multiple GROUP BY

---

## Tantangan

Sistem inventory: update stok, hapus expired, laporan per kategori.

---

## Ringkasan

Minggu 2 dari 10: **CRUD & Query Lanjutan** (Pemula).
