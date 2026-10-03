# Locking InnoDB: Record Lock, Gap Lock & Deadlock Analysis

> **Kategori:** MySQL | **Level:** Konkurensi Transaksi, Replikasi & Skalabilitas Sharding | **Minggu 5:** Locking InnoDB: Record Lock, Gap Lock & Deadlock Analysis

## Tujuan Pembelajaran

- Memahami jenis-jenis lock internal InnoDB: Record Lock, Gap Lock, dan Next-Key Lock
- Mengetahui bagaimana Next-Key Lock mengeliminasi masalah Phantom Read pada level REPEATABLE READ
- Membaca dan menganalisis laporan LATEST DETECTED DEADLOCK di SHOW ENGINE INNODB STATUS
- Menerapkan pola pencegahan deadlock melalui standardisasi urutan penguncian sumber daya

---

## Program: Analisis Mekanisme Next-Key Locking dan Investigasi Deadlock Melalui ENGINE INNODB STATUS

```sql
-- Demonstrate InnoDB Row and Gap Locking mechanics under REPEATABLE READ
-- Setup dedicated account ledger
DROP TABLE IF EXISTS account_balances;
CREATE TABLE account_balances (
    account_id BIGINT UNSIGNED NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL,
    PRIMARY KEY (account_id)
) ENGINE=InnoDB;

INSERT INTO account_balances (account_id, owner_name, balance) VALUES
(10, 'Alice', 1000.00),
(20, 'Bob', 2500.00),
(30, 'Charlie', 5000.00);

-- Scenario A: Next-Key Lock (Record Lock + Gap Lock)
-- Under REPEATABLE READ, querying a range locks existing rows AND gaps between them
-- Session 1:
BEGIN;
SELECT * FROM account_balances 
WHERE account_id BETWEEN 15 AND 25 
FOR UPDATE;
-- Locks: Record 20, plus Gap (10, 20) and Gap (20, 30).
-- Concurrent INSERT of account_id 18 or 22 in Session 2 will be BLOCKED!

-- Scenario B: Deadlock Detection & Resolution
-- Session 1 locks account 10, then attempts to lock account 20
-- Session 2 locks account 20, then attempts to lock account 10
-- InnoDB background deadlock detector kills the smaller transaction automatically!

-- Inspect the latest deadlock details, locks, and buffer pool status
SHOW ENGINE INNODB STATUS;

-- Query active transaction locks from information_schema / performance_schema
SELECT 
    r.trx_id AS waiting_trx_id,
    r.trx_mysql_thread_id AS waiting_thread,
    b.trx_id AS blocking_trx_id,
    b.trx_mysql_thread_id AS blocking_thread
FROM performance_schema.data_lock_waits w
INNER JOIN information_schema.innodb_trx b ON b.trx_id = w.blocking_engine_transaction_id
INNER JOIN information_schema.innodb_trx r ON r.trx_id = w.requesting_engine_transaction_id;
```

---

## Konsep Kunci

### Anatomi Kunci InnoDB: Record, Gap, dan Next-Key Lock
Pada tingkat isolasi default MySQL (`REPEATABLE READ`), InnoDB menggunakan algoritma penguncian yang sangat canggih:
- **Record Lock**: Mengunci indeks record spesifik yang sudah ada di tabel.
- **Gap Lock**: Mengunci celah ruang kosong di antara nilai-nilai indeks (misalnya rentang antara ID 10 dan 20), mencegah transaksi lain menyisipkan data baru (*INSERT*) di dalam celah tersebut.
- **Next-Key Lock**: Kombinasi Record Lock pada baris tersebut ditambah Gap Lock pada celah tepat sebelum baris tersebut. Mekanisme inilah yang mencegah munculnya *Phantom Read* di MySQL.

### Mekanisme Pendeteksian Deadlock Otomatis
**Deadlock** terjadi ketika Transaksi A mengunci Baris 1 dan menunggu Baris 2, sementara Transaksi B mengunci Baris 2 dan menunggu Baris 1. Keduanya saling menunggu selamanya. InnoDB memiliki thread latar belakang pendeteksi deadlock (*wait-for graph*). Ketika siklus deadlock terdeteksi, InnoDB otomatis memilih transaksi yang memodifikasi data paling sedikit sebagai korban (*victim*), membatalkannya (`ROLLBACK`), dan melempar error `1213: Deadlock found when trying to get lock`.

### Mendiagnosis lewat SHOW ENGINE INNODB STATUS
Perintah `SHOW ENGINE INNODB STATUS` menghasilkan laporan diagnostik paling komprehensif di MySQL. Bagian `LATEST DETECTED DEADLOCK` mencatat secara presisi statement SQL dari kedua transaksi, lock mode yang diminta (`lock_mode X`), nomor page disk tempat kunci berada, dan transaksi mana yang diputus sebagai korban.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda dan teman Anda ingin menyusun puzzle dua keping terakhir. Keping A dipegang teman Anda, keping B dipegang Anda. 

Anda menolak menyerahkan keping B sebelum teman Anda memberikan keping A, dan teman Anda menolak menyerahkan keping A sebelum Anda memberikan keping B. Tanpa wasit (InnoDB Deadlock Detector), kalian berdua akan mematung selamanya. Wasit InnoDB akan meniup peluit, mengambil keping dari pemain yang paling santai, memintanya mengulang dari awal, sehingga pemain lainnya bisa menyelesaikan permainannya.

## Eksperimen

- Buka dua session mysql CLI, simulasikan gap lock: Session 1 mengunci rentang id, amati Session 2 terblokir saat INSERT id di dalam celah
- Simulasikan skenario saling kunci silang antara dua baris untuk memicu error 1213 Deadlock
- Jalankan SHOW ENGINE INNODB STATUS dan temukan bagian LATEST DETECTED DEADLOCK
- Inspeksi tabel performance_schema.data_locks untuk melihat daftar kunci yang aktif secara granular

---

## Tantangan

Tuliskan prosedur transfer saldo antar-rekening yang aman dari ancaman deadlock: terapkan algoritma pengurutan ID kunci (`LEAST(from_id, to_id)` dan `GREATEST(from_id, to_id)`) sebelum menjalankan `SELECT ... FOR UPDATE`.

---

## Ringkasan

Anda telah menguasai arsitektur locking internal InnoDB: Record Lock, Gap Lock, Next-Key Lock, pencegahan Phantom Read, dan diagnosis forensik deadlock dengan SHOW ENGINE INNODB STATUS.
