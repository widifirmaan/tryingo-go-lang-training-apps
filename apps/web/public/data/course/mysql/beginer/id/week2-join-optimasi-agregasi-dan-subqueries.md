# Multi-Table Joins, Agregasi & Subquery Lanjutan

> **Kategori:** MySQL | **Level:** Fondasi Relasional & Engine InnoDB | **Minggu 2:** Multi-Table Joins, Agregasi & Subquery Lanjutan
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai penggabungan relasi multi-tabel dengan INNER JOIN dan LEFT JOIN
- Menggunakan conditional aggregation (SUM dengan ekspresi CASE WHEN)
- Mencegah duplikasi kalkulasi agregasi melalui derived tables / subqueries
- Memahami peran indeks foreign key dalam mempercepat eksekusi Join pada InnoDB

---

## Program: Laporan Rekonsiliasi Dompet Pengguna dengan Multi-Table Joins dan Agregasi

```sql
-- Create transactions ledger table for reconciliation
CREATE TABLE wallet_ledgers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    wallet_id BIGINT UNSIGNED NOT NULL,
    transaction_code VARCHAR(64) NOT NULL,
    direction ENUM('CREDIT', 'DEBIT') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    fee DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    status ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_tx_code (transaction_code),
    KEY idx_wallet_status_created (wallet_id, status, created_at),
    CONSTRAINT fk_ledger_wallet FOREIGN KEY (wallet_id) REFERENCES user_wallets(id)
) ENGINE=InnoDB;

-- Insert sample transactional entries
INSERT INTO wallet_ledgers (wallet_id, transaction_code, direction, amount, fee, status, created_at) VALUES
(1, 'TX-1001', 'CREDIT', 1000000.00, 0.00, 'SUCCESS', '2026-03-01 10:00:00'),
(1, 'TX-1002', 'DEBIT', 250000.00, 2500.00, 'SUCCESS', '2026-03-02 11:30:00'),
(1, 'TX-1003', 'DEBIT', 150000.00, 2500.00, 'SUCCESS', '2026-03-05 14:15:00'),
(2, 'TX-2001', 'CREDIT', 5000000.00, 0.00, 'SUCCESS', '2026-03-03 09:00:00'),
(2, 'TX-2002', 'CREDIT', 2000000.00, 0.00, 'FAILED', '2026-03-04 16:00:00');

-- Comprehensive user financial balance reconciliation query
SELECT 
    u.id AS user_id,
    u.full_name,
    u.email,
    w.currency,
    w.balance AS current_wallet_balance,
    COALESCE(ledger_summary.total_credit, 0.00) AS total_inflow,
    COALESCE(ledger_summary.total_debit, 0.00) AS total_outflow,
    COALESCE(ledger_summary.total_fees_paid, 0.00) AS total_fees,
    (COALESCE(ledger_summary.total_credit, 0.00) - COALESCE(ledger_summary.total_debit, 0.00) - COALESCE(ledger_summary.total_fees_paid, 0.00)) AS computed_net_flow
FROM app_users u
INNER JOIN user_wallets w ON u.id = w.user_id
LEFT JOIN (
    -- Subquery aggregate per wallet
    SELECT 
        l.wallet_id,
        SUM(CASE WHEN l.direction = 'CREDIT' THEN l.amount ELSE 0 END) AS total_credit,
        SUM(CASE WHEN l.direction = 'DEBIT' THEN l.amount ELSE 0 END) AS total_debit,
        SUM(l.fee) AS total_fees_paid,
        COUNT(l.id) AS successful_transactions_count
    FROM wallet_ledgers l
    WHERE l.status = 'SUCCESS'
    GROUP BY l.wallet_id
) AS ledger_summary ON w.id = ledger_summary.wallet_id
ORDER BY current_wallet_balance DESC;
```

---

## Konsep Kunci

### Optimasi Multi-Table Join pada Mesin InnoDB
Saat mengeksekusi perintah `JOIN`, pengoptimal query MySQL mengevaluasi urutan penggabungan tabel (*join order*). MySQL umumnya memilih tabel yang menghasilkan baris hasil saring terkecil sebagai pengemudi (*driving table*). Sangat krusial memastikan setiap kolom `FOREIGN KEY` memiliki index; jika tidak, MySQL terpaksa melakukan algoritma Block Nested-Loop (BNL) atau Hash Join yang membebani memori server.

### Agregasi Bersyarat (Conditional Aggregation)
Dalam pembukuan finansial, kita sering perlu memisahkan total dana masuk (`CREDIT`) dan dana keluar (`DEBIT`) dari satu kolom nilai transaksi yang sama. Pola `SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)` memungkinkan kalkulasi multi-dimensi dilakukan dalam satu kali pembacaan data tabel (*single pass*), menghemat I/O secara drastis.

### Derived Tables vs JOIN Cartesian Product
Jika Anda langsung menggabungkan tabel `app_users` ke `user_wallets` lalu langsung ke `wallet_ledgers` dengan `GROUP BY u.id`, Anda berisiko memicu ledakan perkalian baris (*Cartesian product*) jika pengguna memiliki banyak dompet dan transaksi. Pola membungkus agregasi ke dalam subquery turunan (*derived table*) terlebih dahulu sebelum di-join ke tabel pengguna menjamin integritas perhitungan angka.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda seorang akuntan yang memeriksa buku kasir. Jika Anda menghitung pemasukan dan pengeluaran dengan dua kali membaca buku dari awal sampai akhir, Anda membuang waktu dua kali lipat. 

Dengan conditional aggregation (`CASE WHEN`), Anda membuka halaman buku kasir sekali saja: tangan kiri mencatat uang masuk, tangan kanan mencatat uang keluar secara serempak.

## Eksperimen

- Ganti LEFT JOIN dengan INNER JOIN dan amati hilangnya user yang belum pernah memiliki riwayat transaksi
- Tambahkan filter HAVING total_inflow > 2000000 pada derived table dan lihat pengaruhnya pada laporan akhir
- Analisis perbedaan performa query dengan menambahkan 10.000 data dummy ke tabel wallet_ledgers
- Gunakan fungsi DATE_SUB(NOW(), INTERVAL 30 DAY) untuk membatasi transaksi hanya dalam 30 hari terakhir

---

## Tantangan

Tuliskan query untuk mendeteksi anomali selisih saldo (*balance drift*): bandingkan nilai `user_wallets.balance` dengan akumulasi `SUM(CREDIT) - SUM(DEBIT) - SUM(fee)` di `wallet_ledgers`, dan tampilkan hanya akun yang saldonya tidak klop.

---

## Model Mental & Diagram Alur Visual

![Diagram Relasi Relasional & Eksekusi Query Joins](/diagrams/sql-joins.svg)

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Fungsi Utama:** Mendefinisikan skema tabel relasional.
- **Parameter / Atribut:** `Nama tabel, definisi kolom, batasan (PK, FK, NOT NULL)`.
- **Perilaku & Efek Sistem:** Menyiapkan tabel database dengan validasi tipe data presisi dan integritas data.
- **Contoh Penggunaan Praktis:**
```javascript
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
- **Hasil Output yang Diharapkan:**
```text
Tabel users siap menerima baris data
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Fungsi Utama:** Query pembacaan dan penyaringan data.
- **Parameter / Atribut:** `Daftar kolom, kondisi WHERE, klausa urutan dan limit`.
- **Perilaku & Efek Sistem:** Mengambil rekaman data yang memenuhi kriteria pengujian secara efisien.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT id, email FROM users WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 10;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan 10 baris pengguna terbaru
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Fungsi Utama:** Penyisipan baris baru dengan pengembalian nilai instan.
- **Parameter / Atribut:** `Kolom target, data masukan, klausa RETURNING`.
- **Perilaku & Efek Sistem:** Menyimpan data baru dan langsung mengembalikan nilai kolom yang digenerasi otomatis (seperti ID atau timestamp).
- **Contoh Penggunaan Praktis:**
```javascript
INSERT INTO users (email) VALUES ('alex@example.com') RETURNING id, created_at;
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan ID UUID yang baru dibuat
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Fungsi Utama:** Penggabungan relasi antar tabel (Join).
- **Parameter / Atribut:** `Nama tabel, kondisi pencocokan kunci relasi ON`.
- **Perilaku & Efek Sistem:** Menggabungkan baris dari dua tabel berdasarkan relasi foreign key.
- **Contoh Penggunaan Praktis:**
```javascript
SELECT u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;
```
- **Hasil Output yang Diharapkan:**
```text
Daftar transaksi pesanan beserta email pemilik akun
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

Anda telah menguasai optimasi multi-table joins, derived subquery aggregation, conditional aggregation dengan CASE WHEN, dan pencegahan Cartesian product pada MySQL.
