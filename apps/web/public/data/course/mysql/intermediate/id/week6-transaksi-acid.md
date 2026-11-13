# Transaksi & ACID

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 6:** Transaksi & ACID

## Tujuan Pembelajaran

- START TRANSACTION, COMMIT, ROLLBACK
- SAVEPOINT dan ROLLBACK TO
- ACID properties
- Isolation levels
- Locking dengan FOR UPDATE

---

## Program: Simulasi Transaksi Transfer

Program ini mensimulasikan transfer saldo antar rekening lengkap dengan pencatatan mutasi, seperti yang dijalankan aplikasi perbankan sungguhan.

```sql
-- Simulasi transfer antar rekening (prinsip ACID)
-- Playground menjalankan SQLite; di MySQL asli bungkus langkah ini
-- dengan START TRANSACTION ... COMMIT / ROLLBACK.

-- Pindahkan 10 juta dari Eko (id=5) ke Dewi (id=4)
UPDATE employees SET salary = salary - 10000000 WHERE id = 5;
UPDATE employees SET salary = salary + 10000000 WHERE id = 4;

-- Tabel mutasi untuk jejak audit
CREATE TABLE transfers (
  transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_id INTEGER NOT NULL,
  to_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  transfer_date TEXT NOT NULL
);
INSERT INTO transfers (from_id, to_id, amount, transfer_date)
VALUES (5, 4, 10000000, '2026-01-20');

-- Verifikasi: total payroll tidak boleh berubah
SELECT SUM(salary) AS total_payroll FROM employees;

-- Audit: gabungkan nama pengirim dan penerima
SELECT t.transfer_id,
       s.name AS pengirim,
       r.name AS penerima,
       t.amount, t.transfer_date
FROM transfers t
JOIN employees s ON s.id = t.from_id
JOIN employees r ON r.id = t.to_id;
```

---

## Konsep Kunci

### Atomicity (Atomicitas)

Semua langkah transfer adalah satu unit: jika satu UPDATE gagal, semuanya dibatalkan. Tanpa ini uang bisa "menghilang" di tengah proses.

### Consistency (Konsistensi)

Constraint (PRIMARY KEY, NOT NULL) menjaga data tetap valid sebelum dan sesudah transaksi. Total payroll yang tetap adalah sanity check-nya.

### Isolation (Isolasi)

Klien bersamaan tidak boleh melihat "setengah transfer". Default MySQL InnoDB = REPEATABLE READ: transaksi membaca snapshot data.

### Durability (Durabilitas)

Setelah COMMIT sukses, data aman walau server mati detik berikutnya - InnoDB menulis ke redo log sebelum mengakui COMMIT.

---

## Eksperimen

- Coba jumlah transfer 5.000.000 lalu bandingkan hasil SUM sebelum & sesudah.
- Tambah kolom `note TEXT` pada transfers dan isi alasan transfer.
- Tulis SELECT yang mendeteksi transfer bila saldo pengirim kurang dari amount.

---

## Tantangan

Buat potongan gaji 10% untuk seluruh karyawan dan catat setiap potongan ke tabel transfers sebagai iuran kas perusahaan.

---

## Ringkasan

Materi minggu ini telah dibahas: Simulasi Transaksi Transfer. Lanjut ke pekan berikutnya untuk memperdalam.
