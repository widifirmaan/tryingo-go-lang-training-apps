# Transaksi & ACID — Bayar Aman Anti-Setengah

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 6:** Transaksi & ACID
> **Prasyarat:** Minggu 5 — **Stored Procedure**.

## Tujuan Pembelajaran

- `START TRANSACTION` + `COMMIT` sahkan + `ROLLBACK` batalkan — paket all-or-nothing (sumber: dev.mysql.com/doc/refman/8.0/en/commit)
- ACID: Atomicity, Consistency, Isolation, Durability + `InnoDB` wajib (MyISAM tidak bisa!)

---

## Kenapa Ini Penting Buat Kamu?

Transfer stok gudang A→B tanpa transaksi: A kurang (sukses), B tambah (gagal, listrik mati) → stok hilang 10 karung! Dengan transaksi, gagal 1 = batal semua (seperti tidak terjadi).

---

## Program: Pindah Stok Aman

```sql
-- Tanpa transaksi (BAHAYA): jika baris 2 gagal, baris 1 sudah jalan!
-- UPDATE gudang_a SET stok = stok - 10 WHERE id = 1;
-- UPDATE gudang_b SET stok = stok + 10 WHERE id = 1;

-- Dengan transaksi (AMAN):
START TRANSACTION;

UPDATE produk SET stok = stok - 10 WHERE id = 1 AND stok >= 10;
-- Cek: jika stok kurang, batalkan manual:
-- (di app: cek ROW_COUNT(), jika 0 → ROLLBACK)

UPDATE produk SET stok = stok + 10 WHERE id = 2;

COMMIT;  -- sahkan keduanya (atau ROLLBACK untuk batalkan semua!)

-- Coba batal:
START TRANSACTION;
UPDATE produk SET harga = 1 WHERE id = 1;  -- salah! harga 1 rupiah
ROLLBACK;  -- batal! harga kembali
SELECT harga FROM produk WHERE id = 1;  -- tetap semula
```

---

## Konsep Kunci

### `START TRANSACTION` / `COMMIT` / `ROLLBACK` = Mulai/Sahkan/Batalkan
Semua di antara = 1 paket. `COMMIT` tulis permanen, `ROLLBACK` buang semua.

### ACID = 4 Janji InnoDB
- **A**tomic: semua atau tidak sama sekali.
- **C**onsistent: aturan (FK, CHECK) selalu benar.
- **I**solated: transaksi lain tidak lihat setengah jalan.
- **D**urable: sudah COMMIT = selamat meski listrik mati.

### InnoDB Wajib
`ENGINE=InnoDB` mendukung transaksi. `MyISAM` TIDAK — cek `SHOW TABLE STATUS`.

---

## Penjelasan untuk Pemula

### Analogi: Transfer Uang Bank
- **Transaksi = transfer bank**: debit A + kredit B 1 paket. Gagal 1 = batal semua (uang tidak hilang di jalan).

### Langkah 0 — Siapkan Device
- Sama MySQL W1: `mysql -u root -p`, tabel `produk` InnoDB.

### Cara Komputer Membaca
1. `START TRANSACTION` → catat titik awal.
2. `UPDATE...` → tulis sementara (belum permanen).
3. `COMMIT` → permanen. `ROLLBACK` → buang semua sejak titik.

### 3 Istilah Wajib
1. **Transaction/commit/rollback**: paket/sah/batal
2. **ACID/InnoDB**: 4-janji/mesin-aman

---

## Eksperimen

- **Hijau:** `START; UPDATE harga=1; ROLLBACK; SELECT` → harga tetap?
- **Kuning:** `START; UPDATE; COMMIT;` → permanen? (Tutup-buka koneksi, cek!)
- **Merah:** Tabel `MyISAM` + `ROLLBACK` → tetap berubah? (MyISAM tidak bisa! Ganti InnoDB.)

---

## Tantangan

**Pindah Stok Aman:** `START` → kurang A 5 (cek `stok>=5` di WHERE!) → tambah B 5 → `COMMIT` → total A+B tetap sama. Coba gagalkan 1 → `ROLLBACK` total tetap.

---

## Glosarium Mini

- **START/COMMIT/ROLLBACK**: mulai/sah/batal
- **ACID/InnoDB**: janji/mesin

---

## Ringkasan

Minggu 6 dari 10: **Bayar Aman** (Level: Menengah). All-or-nothing. Minggu depan: **Performa** — cepat.
