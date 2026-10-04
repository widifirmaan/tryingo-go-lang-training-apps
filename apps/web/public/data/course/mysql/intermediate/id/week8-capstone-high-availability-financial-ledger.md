# Capstone Project: High-Availability Financial Ledger

> **Kategori:** MySQL | **Level:** Konkurensi Transaksi, Replikasi & Skalabilitas Sharding | **Minggu 8:** Capstone Project: High-Availability Financial Ledger
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh materi kurikulum MySQL dalam sebuah capstone ledger finansial enterprise
- Menerapkan prinsip akuntansi double-entry: total mutasi Debit harus selalu seimbang dengan Credit
- Mengimplementasikan jaminan Idempotensi menggunakan kueri unik idempotency_key
- Mencegah deadlock secara matematis melalui pengurutan lock ID akun terstandarisasi

---

## Program: Sistem Pembukuan Berpasangan (Double-Entry) dengan Kunci Idempotensi dan Audit Mutasi

```sql
-- CAPSTONE: High-Availability Financial Ledger & Sharded Transaction Store
-- Incorporates InnoDB Clustered Indexes, Double-Entry Bookkeeping, Idempotency, and Audit Trails

CREATE DATABASE IF NOT EXISTS core_ledger CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE core_ledger;

-- 1. Accounts Master Table (Assets, Liabilities, Equity, Revenue, Expense)
CREATE TABLE chart_of_accounts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_number VARCHAR(32) NOT NULL,
    account_type ENUM('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE') NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    current_balance DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_account_no (account_number)
) ENGINE=InnoDB;

-- 2. Journal Entries Header (Guarantees Idempotency from API Gateways)
CREATE TABLE journal_entries (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idempotency_key VARCHAR(64) NOT NULL,
    reference_id VARCHAR(64) NOT NULL,
    description VARCHAR(255) NOT NULL,
    posted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_idempotency (idempotency_key),
    KEY idx_journal_posted (posted_at)
) ENGINE=InnoDB;

-- 3. Journal Lines (Double-Entry: Sum of Debits MUST EQUAL Sum of Credits)
CREATE TABLE journal_lines (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    journal_entry_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,
    direction ENUM('DEBIT', 'CREDIT') NOT NULL,
    amount DECIMAL(18, 4) NOT NULL CHECK (amount > 0.0000),
    PRIMARY KEY (id),
    KEY idx_entry_account (journal_entry_id, account_id),
    CONSTRAINT fk_lines_entry FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id) ON DELETE RESTRICT,
    CONSTRAINT fk_lines_account FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 4. Stored Procedure for Atomic Double-Entry Financial Posting
DELIMITER $$
CREATE PROCEDURE post_double_entry_transaction(
    IN p_idempotency_key VARCHAR(64),
    IN p_reference_id VARCHAR(64),
    IN p_description VARCHAR(255),
    IN p_debit_account_id BIGINT UNSIGNED,
    IN p_credit_account_id BIGINT UNSIGNED,
    IN p_amount DECIMAL(18, 4),
    OUT p_journal_id BIGINT UNSIGNED,
    OUT p_status_code VARCHAR(30)
)
proc_body: BEGIN
    DECLARE v_existing_id BIGINT UNSIGNED;

    -- Exit on any SQL error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_code = 'SYSTEM_ERROR';
    END;

    -- Check idempotency key first to prevent duplicate charges
    SELECT id INTO v_existing_id
    FROM journal_entries
    WHERE idempotency_key = p_idempotency_key;

    IF v_existing_id IS NOT NULL THEN
        SET p_journal_id = v_existing_id;
        SET p_status_code = 'IDEMPOTENT_DUPLICATE_ACCEPTED';
        LEAVE proc_body;
    END IF;

    IF p_debit_account_id = p_credit_account_id THEN
        SET p_status_code = 'IDENTICAL_ACCOUNTS_FORBIDDEN';
        LEAVE proc_body;
    END IF;

    START TRANSACTION;

    -- Insert Journal Header
    INSERT INTO journal_entries (idempotency_key, reference_id, description)
    VALUES (p_idempotency_key, p_reference_id, p_description);

    SET p_journal_id = LAST_INSERT_ID();

    -- Insert Debit Line
    INSERT INTO journal_lines (journal_entry_id, account_id, direction, amount)
    VALUES (p_journal_id, p_debit_account_id, 'DEBIT', p_amount);

    -- Insert Credit Line
    INSERT INTO journal_lines (journal_entry_id, account_id, direction, amount)
    VALUES (p_journal_id, p_credit_account_id, 'CREDIT', p_amount);

    -- Mutate Account Balances atomically with lock ordering (lower ID locked first to prevent deadlock)
    IF p_debit_account_id < p_credit_account_id THEN
        UPDATE chart_of_accounts SET current_balance = current_balance + p_amount WHERE id = p_debit_account_id;
        UPDATE chart_of_accounts SET current_balance = current_balance - p_amount WHERE id = p_credit_account_id;
    ELSE
        UPDATE chart_of_accounts SET current_balance = current_balance - p_amount WHERE id = p_credit_account_id;
        UPDATE chart_of_accounts SET current_balance = current_balance + p_amount WHERE id = p_debit_account_id;
    END IF;

    COMMIT;
    SET p_status_code = 'SUCCESS';
END$$
DELIMITER ;
```

---

## Konsep Kunci

### Arsitektur Capstone Financial Ledger
Proyek capstone ini membangun fondasi sistem finansial perbankan modern di atas mesin MySQL InnoDB:
1. **Prinsip Pembukuan Berpasangan (Double-Entry Bookkeeping)**: Setiap pergerakan uang selalu dicatat sebagai dua sisi berpasangan (`DEBIT` dan `CREDIT`). Uang tidak pernah tercipta atau lenyap begitu saja; ia hanya berpindah dari satu akun aset/liabilitas ke akun lainnya.
2. **Kunci Idempotensi (Idempotency Keys)**: Pada sistem pembayaran, jika koneksi internet terputus tepat saat tombol bayar ditekan, aplikasi klien akan mengirimkan permintaan ulang (*retry*). Kolom `idempotency_key UNIQUE` memastikan transaksi dengan kunci yang sama tidak pernah memotong saldo nasabah dua kali.
3. **Pencegahan Deadlock Melalui Pengurutan Kunci**: Dengan memastikan akun dengan ID lebih kecil selalu dikunci terlebih dahulu sebelum akun dengan ID lebih besar (`IF debit_id < credit_id`), siklus melingkar (*circular wait*) dieliminasi secara matematis.

---

---

## Penjelasan untuk Pemula

Selamat! Anda telah membangun sistem perbankan nyata. Sistem pembukuan berpasangan ini adalah fondasi yang digunakan oleh seluruh bank di dunia sejak ratusan tahun lalu: setiap uang yang masuk ke dompet Anda, pasti berasal dari suatu sumber lain. 

Kunci idempotensi melindungi nasabah Anda agar uangnya tidak terpotong dua kali saat sinyal HP putus-nyambung, dan pengurutan kunci memastikan server database Anda tidak pernah macet (*deadlock*)!

## Eksperimen

- Panggil sp_transfer_funds dua kali berturut-turut dengan idempotency_key yang sama dan amati kode IDEMPOTENT_DUPLICATE_ACCEPTED
- Coba transfer dengan debit_account_id yang sama dengan credit_account_id untuk melihat proteksi constraint
- Buat query verifikasi integritas pembukuan: periksa apakah SUM(Debit) == SUM(Credit) di tabel journal_lines
- Simulasikan transaksi konkuren 100 thread untuk membuktikan sistem bebas dari deadlock

---

## Tantangan

Kembangkan sistem sharding horizontal untuk tabel `journal_lines`: gunakan declarative partitioning berdasarkan range bulan `posted_at`, dan tambahkan foreign key constraint terintegrasi.

---

## Model Mental & Diagram Alur Visual

![Diagram Relasi Relasional & Eksekusi Query Joins](/diagrams/sql-joins.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MESIN PENYIMPANAN INNODB MYSQL                           │
│                                                          │
│ SQL Parser & Optimizer ──► Buffer Pool (RAM Cache)       │
│                                  │                       │
│                 ┌────────────────┴────────────────┐      │
│                 ▼                                 ▼      │
│     Clustered Index (B+ Tree)              Redo Log WAL  │
│     (Data tersimpan berurut PK)            (Crash Safe)  │
│                 │                                 │      │
│                 ▼                                 ▼      │
│            Tabel .ibd Disk               Binlog (Replika)│
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `CREATE TABLE name ( id INT AUTO_INCREMENT PRIMARY KEY, ... )`
- **Fungsi Utama:** Definisi tabel mesin penyimpanan InnoDB.
- **Parameter / Atribut:** `Column types (INT, VARCHAR, DECIMAL), Constraints`.
- **Perilaku & Efek Sistem:** Menyusun skema tabel MySQL berkinerja tinggi dengan indeks kunci utama berurut otomatis..
- **Contoh Penggunaan Praktis:**
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  price DECIMAL(12, 2) NOT NULL,
  in_stock BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;
```
- **Hasil Output yang Diharapkan:**
```text
Tabel products InnoDB siap digunakan
```

### 2. `SELECT * FROM tbl WHERE cond LIMIT offset, count`
- **Fungsi Utama:** Paginasi data efisien MySQL.
- **Parameter / Atribut:** `LIMIT offset, row_count`.
- **Perilaku & Efek Sistem:** Mengambil potongan data per halaman untuk optimasi waktu muat aplikasi..
- **Contoh Penggunaan Praktis:**
```sql
SELECT id, sku, price FROM products WHERE in_stock = 1 ORDER BY id DESC LIMIT 0, 10;
```
- **Hasil Output yang Diharapkan:**
```text
10 produk pertama untuk halaman 1
```

### 3. `START TRANSACTION; ... COMMIT; / ROLLBACK;`
- **Fungsi Utama:** Kontrol transaksi ACID multi-tahap.
- **Parameter / Atribut:** `ACID guarantees`.
- **Perilaku & Efek Sistem:** Memastikan serangkaian operasi query berhasil seluruhnya atau dibatalkan saat ada kesalahan..
- **Contoh Penggunaan Praktis:**
```sql
START TRANSACTION;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
```
- **Hasil Output yang Diharapkan:**
```text
Saldo berhasil dipindahkan secara atomik
```

### 4. `EXPLAIN SELECT ...`
- **Fungsi Utama:** Analisis rencana eksekusi query (Query Plan).
- **Parameter / Atribut:** `Query SELECT`.
- **Perilaku & Efek Sistem:** Memeriksa apakah query memanfaatkan indeks (Using index) atau mengalami Full Table Scan lambat..
- **Contoh Penggunaan Praktis:**
```sql
EXPLAIN SELECT * FROM products WHERE sku = 'LAP-001';
```
- **Hasil Output yang Diharapkan:**
```text
Menampilkan estimasi baris dan indeks yang digunakan
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Menggunakan Charset Lawas `utf8` alih-alih `utf8mb4`
- **Gejala / Masalah:** Karakter emoji atau aksara non-Latin memicu error `Incorrect string value`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu setel charset ke `utf8mb4` dan collation ke `utf8mb4_unicode_ci` pada tabel dan database.

### 2. Tipe Penyimpanan Tanggal (`TIMESTAMP` vs `DATETIME`)
- **Gejala / Masalah:** Tahun 2038 bug pada kolom TIMESTAMP atau inkonsistensi zona waktu server.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `DATETIME` untuk tanggal independen zona waktu atau simpan dalam format UTC eksplisit.

### 3. Lupa Mematikan Autocommit pada Operasi Batch Besar
- **Gejala / Masalah:** Proses batch insert ribuan data memakan waktu sangat lama karena commit per baris.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Jalankan dalam transaksi tunggal `START TRANSACTION; ... COMMIT;` untuk kecepatan maksimal.

---

## Ringkasan

Selamat! Anda telah menguasai seluruh spektrum teknologi MySQL: dari arsitektur InnoDB, Clustered Index, Covering Index, Full-Text & JSON, Gap Locks & Deadlocks, Stored Procedures, GTID Replication, hingga Capstone Double-Entry Financial Ledger.
