# Stored Procedure — Resep Tersimpan di Gudang MySQL

> **Kategori:** MySQL | **Level:** Pemula | **Minggu 5:** Stored Procedure
> **Prasyarat:** Minggu 4 — **Index & Optimasi**.

## Tujuan Pembelajaran

- `DELIMITER //` ganti titik-koma sementara, `CREATE PROCEDURE hitungTotal()` simpan resep di server, `CALL hitungTotal()` panggil, `DROP PROCEDURE` hapus (sumber: MySQL 8.0 docs)
- Parameter `IN kategori VARCHAR(50)` untuk resep fleksibel

---

## Kenapa Ini Penting Buat Kamu?

Laporan "total Sembako" dihitung tiap pagi dengan query 5 baris — copy-paste rawan salah. Dengan procedure, simpan sekali di gudang → pagi cukup `CALL hitungTotal('Sembako')` 1 baris. Resep baku, semua kasir sama.

---

## Program: Resep di Gudang

```sql
-- Ganti pembatas dulu (karena resep berisi ; di dalam)
DELIMITER //

CREATE PROCEDURE hitungTotal(IN kat VARCHAR(50))
BEGIN
  SELECT kategori, SUM(harga * stok) AS total_nilai
  FROM produk
  WHERE kategori = kat
  GROUP BY kategori;
END //

-- Kembalikan pembatas
DELIMITER ;

-- Panggil resep (1 baris!)
CALL hitungTotal('Sembako');
CALL hitungTotal('Sayur');

-- Lihat & hapus resep
SHOW PROCEDURE STATUS WHERE Db = 'toko_db';
DROP PROCEDURE IF EXISTS hitungTotal;
```

---

## Konsep Kunci

### `DELIMITER //` = Ganti Titik
MySQL baca `;` sebagai "jalankan". Resep berisi banyak `;` → ganti pembatas jadi `//` dulu, kembalikan setelahnya.

### `CREATE PROCEDURE` + `CALL` = Simpan & Panggil
`CREATE PROCEDURE nama(IN param TIPE)` simpan, `CALL nama('isi')` jalankan.

### `IN` = Bahan Masuk
`IN kat VARCHAR(50)` = resep terima 1 bahan `kat`.

---

## Penjelasan untuk Pemula

### Analogi: Resep Ditempel di Dinding Gudang
- **Query biasa = resep di kertas lepas**: tiap pagi tulis ulang, bisa salah.
- **Procedure = resep ditempel di dinding**: `CALL` = tunjuk resep, gudang kerjakan.

### Langkah 0 — Siapkan Device
- Sama W1. `DELIMITER` hanya di client (`mysql`, `db-fiddle` console) — bukan bagian SQL server.

### Cara Komputer Membaca
1. `CREATE PROCEDURE ...` → MySQL simpan teks resep + cek syntax sekali.
2. `CALL hitungTotal('Sembako')` → MySQL ambil resep, isi `kat='Sembako'`, jalankan `SELECT ... WHERE kategori = 'Sembako'`.

### 3 Istilah Wajib
1. **Procedure**: resep tersimpan
2. **DELIMITER**: pembatas perintah
3. **CALL**: panggil resep

---

## Eksperimen

- **Hijau:** `CALL hitungTotal('Protein')` → total kategori Protein?
- **Kuning:** Buat `stokRendah()` tanpa parameter: `SELECT * FROM produk WHERE stok < 5` → `CALL stokRendah()`?
- **Merah:** Lupa `DELIMITER //` → error `syntax` di `;` pertama? Tambah delimiter.

---

### Bonus: TRIGGER — Alarm Otomatis (dipakai capstone W10!)

Procedure dipanggil manual (`CALL`). Trigger JALAN SENDIRI tiap ada INSERT/UPDATE/DELETE:

```sql
-- Tabel log dulu (catatan otomatis tiap pesanan!)
CREATE TABLE IF NOT EXISTS log_pesanan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  catatan VARCHAR(100)
);

DELIMITER //
CREATE TRIGGER catat_jual AFTER INSERT ON pesanan
FOR EACH ROW
BEGIN
  INSERT INTO log_pesanan (catatan)
  VALUES (CONCAT('Pesanan ', NEW.id, ' total ', NEW.total));
END //
DELIMITER ;
-- Coba: INSERT INTO pesanan (pelanggan_id, total) VALUES (1, 9000);
-- → SELECT * FROM log_pesanan; (catatan muncul OTOMATIS!)
-- NEW. = baris baru, OLD. = baris lama (untuk UPDATE/DELETE).
SHOW TRIGGERS;
DROP TRIGGER IF EXISTS catat_jual;
```

---

## Tantangan

**Resep Warung Lengkap:** Buat `diskonKategori(IN kat VARCHAR(50), IN persen INT)` yang `UPDATE produk SET harga = harga * (1 - persen/100) WHERE kategori = kat` → `CALL diskonKategori('Sayur', 10)` → `SELECT` cek harga turun 10%.
- **Sambungan (Minggu 4 — Index & Optimasi):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **PROCEDURE/CALL/DROP**: simpan/panggil/hapus resep
- **DELIMITER/IN**: pembatas/bahan

---

## Ringkasan

Minggu 5 dari 5: **Resep Gudang** (Level: Pemula). **Selesai Beginner MySQL!** Minggu depan: **Advanced Query** (Menengah).
