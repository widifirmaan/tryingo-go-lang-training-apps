# Indexing B+Tree, Composite Index & EXPLAIN FORMAT=JSON

> **Kategori:** MySQL | **Level:** Fondasi Relasional & Engine InnoDB | **Minggu 3:** Indexing B+Tree, Composite Index & EXPLAIN FORMAT=JSON
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami struktur internal B+Tree InnoDB: Root, Internal Node, dan Leaf Pages
- Menguasai Covering Index untuk mengeliminasi disk lookups ke tabel utama (Clustered Index)
- Mendiagnosis query plan mendalam menggunakan EXPLAIN FORMAT=JSON (query_cost, attached_condition)
- Menghindari jebakan index invalidation (penggunaan fungsi pada kolom index, wildcard terdepan)

---

## Program: Covering Index Optimization dan Analisis EXPLAIN FORMAT=JSON di MySQL 8

```sql
-- 1. Create realistic e-commerce audit logs table
CREATE TABLE security_audit_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    risk_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    -- Composite index designed for: WHERE user_id = ? AND event_type = ? ORDER BY created_at DESC
    KEY idx_user_event_time (user_id, event_type, created_at DESC),
    -- Covering index: includes all columns requested by security monitoring queries
    KEY idx_covering_alert (risk_score, created_at, user_id, ip_address)
) ENGINE=InnoDB;

-- 2. Analyze Execution Plan with JSON Format to inspect internal costs
EXPLAIN FORMAT=JSON
SELECT user_id, ip_address, created_at
FROM security_audit_events
WHERE risk_score >= 80
ORDER BY created_at DESC
LIMIT 50;

-- 3. Demonstration of Covering Index (Using index in Extra column)
EXPLAIN
SELECT risk_score, created_at, user_id, ip_address
FROM security_audit_events
WHERE risk_score = 90
ORDER BY created_at DESC;

-- 4. Check index usage statistics and cardinality
SHOW INDEX FROM security_audit_events;
```

---

## Konsep Kunci

### Struktur Internal B+Tree dan Secondary Index
Di InnoDB, seluruh **Secondary Index** (indeks selain Primary Key) menyimpan nilai kolom indeks beserta nilai Primary Key dari baris tersebut. Ketika MySQL mencari baris menggunakan secondary index, ia menelusuri B+Tree indeks tersebut untuk menemukan Primary Key, lalu melakukan penelusuran kedua ke Clustered Index tabel utama untuk mengambil kolom lainnya (proses ini disebut *Bookmark Lookup*).

### Kekuatan Dahsyat Covering Index
Jika sebuah query `SELECT` hanya meminta kolom-kolom yang semuanya sudah tercakup di dalam satu Secondary Index, MySQL tidak perlu melakukan Bookmark Lookup ke Clustered Index disk. Di output `EXPLAIN`, ini ditandai dengan keterangan `Using index` di kolom `Extra`. **Covering Index** memberikan peningkatan performa hingga 10x - 100x lipat karena seluruh data dibaca langsung dari daun B+Tree indeks di RAM.

### Diagnostik Mendalam dengan EXPLAIN FORMAT=JSON
Output standar `EXPLAIN` berbentuk tabel terkadang menyembunyikan detail penting. Format `EXPLAIN FORMAT=JSON` menampilkan struktur hierarkis mesin pengoptimal:
- `query_cost`: Perkiraan kalkulasi biaya CPU dan I/O disk yang dibutuhkan.
- `used_columns`: Daftar kolom yang dibaca.
- `attached_condition`: Kondisi evaluasi filter pada baris data.
- `using_filesort`: Menandakan bahwa MySQL tidak dapat memanfaatkan urutan indeks untuk `ORDER BY` dan terpaksa melakukan pengurutan manual di memori/disk.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda berada di perpustakaan. Buku-buku ditata rapi di rak lemari utama (Clustered Index). Anda mencari buku lewat laci kartu katalog kartu indeks pengarang (Secondary Index).

Jika kartu katalog tersebut hanya berisi nomor rak, Anda harus berjalan ke rak utama untuk melihat tebal buku dan penerbitnya (Bookmark Lookup). Tetapi jika di kartu katalog sudah tertulis lengkap nomor rak, penerbit, dan tahun terbit (Covering Index), Anda mendapatkan seluruh informasi saat itu juga tanpa perlu melangkah ke rak lemari utama!

## Eksperimen

- Bandingkan output EXPLAIN query dengan Covering Index vs query yang menyertakan SELECT *
- Analisis nilai query_cost pada EXPLAIN FORMAT=JSON sebelum dan sesudah penambahan composite index
- Buktikan terjadinya using_filesort saat urutan ORDER BY tidak mengikuti aturan urutan kolom composite index
- Jalankan SHOW STATUS LIKE 'Handler_read_%' untuk melihat statistik pembacaan baris index internal

---

## Tantangan

Rancang composite index optimal untuk query e-commerce: `WHERE store_id = 42 AND status = 'ACTIVE' AND price BETWEEN 100000 AND 500000 ORDER BY created_at DESC LIMIT 20`, dan pastikan tidak memicu `using_filesort`.

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

Anda telah menguasai arsitektur B+Tree InnoDB, eliminasi bookmark lookup dengan Covering Index, dan profil eksekusi presisi dengan EXPLAIN FORMAT=JSON.
