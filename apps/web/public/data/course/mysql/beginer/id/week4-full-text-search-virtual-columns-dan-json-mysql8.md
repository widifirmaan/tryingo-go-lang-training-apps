# Full-Text Search, Virtual Columns & JSON di MySQL 8+

> **Kategori:** MySQL | **Level:** Fondasi Relasional & Engine InnoDB | **Minggu 4:** Full-Text Search, Virtual Columns & JSON di MySQL 8+
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengimplementasikan Full-Text Search (MATCH ... AGAINST) dalam Natural Language dan Boolean Mode
- Memahami perbedaan Generated Column tipe VIRTUAL vs STORED pada MySQL 8+
- Mengindeks atribut di dalam dokumen JSON melalui Virtual Columns
- Menggunakan operator fungsi JSON: ->, ->>, JSON_EXTRACT, dan JSON_CONTAINS

---

## Program: Katalog Produk dengan Pencarian Full-Text Boolean dan Index Kolom Virtual JSON

```sql
-- 1. Create modern catalog table with JSON attributes and Full-Text index
CREATE TABLE catalog_products (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    sku VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    specifications JSON NOT NULL,
    -- Generated Virtual Column extracting brand from JSON without consuming disk space
    brand VARCHAR(100) GENERATED ALWAYS AS (specifications->>'$.brand') VIRTUAL,
    -- Generated Stored Column extracting weight for physical range filtering
    weight_kg DECIMAL(6, 2) GENERATED ALWAYS AS (CAST(specifications->>'$.weight_kg' AS DECIMAL(6,2))) STORED,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_catalog_sku (sku),
    -- Index on virtual generated column!
    KEY idx_product_brand (brand),
    -- Full-Text search index covering title and description
    FULLTEXT KEY ft_catalog_search (title, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample product data with nested JSON payloads
INSERT INTO catalog_products (sku, title, description, specifications) VALUES
('LAP-PRO-16', 'MacBook Pro 16 M3 Max', 'Powerful laptop for software developers and machine learning engineering with extreme battery life.', 
 '{"brand": "Apple", "weight_kg": 2.14, "specs": {"ram": "64GB", "storage": "1TB SSD"}}'),
('LAP-AIR-15', 'MacBook Air 15 M3', 'Ultra-thin lightweight laptop ideal for digital nomads and daily productivity.', 
 '{"brand": "Apple", "weight_kg": 1.51, "specs": {"ram": "16GB", "storage": "512GB SSD"}}'),
('LAP-THINK-X1', 'Lenovo ThinkPad X1 Carbon', 'Rugged business flagship ultrabook with military grade carbon fiber durability.', 
 '{"brand": "Lenovo", "weight_kg": 1.12, "specs": {"ram": "32GB", "storage": "1TB SSD"}}');

-- 2. Boolean Mode Full-Text Search with Relevance Scoring
SELECT 
    id, title, brand, weight_kg,
    MATCH(title, description) AGAINST('+laptop +developer -gaming' IN BOOLEAN MODE) AS relevance_score
FROM catalog_products
WHERE MATCH(title, description) AGAINST('+laptop +developer -gaming' IN BOOLEAN MODE)
ORDER BY relevance_score DESC;

-- 3. Query JSON directly using JSON operators and virtual index
EXPLAIN
SELECT id, title, brand, specifications->'$.specs.ram' AS ram_size
FROM catalog_products
WHERE brand = 'Apple';
```

---

## Konsep Kunci

### Full-Text Search InnoDB: Boolean Mode
Pencarian teks menggunakan klausa `LIKE '%keyword%'` memicu *Full Table Scan* yang sangat lambat karena tidak dapat memanfaatkan B+Tree. **Full-Text Index** InnoDB memecah teks menjadi token kata (*inverted index*). Dengan **Boolean Mode**, Anda dapat mengekspresikan logika pencarian canggih:
- `+kata`: Kata wajib muncul.
- `-kata`: Kata dilarang muncul.
- `kata*`: Pencarian prefiks wildcard kata.
- Operator ini juga menghitung skor relevansi matematis (*TF-IDF*).

### Generated Columns: VIRTUAL vs STORED
MySQL 8+ memungkinkan pembuatan kolom yang nilainya diturunkan dari ekspresi kolom lain:
- **VIRTUAL**: Nilai dihitung secara on-the-fly saat baris dibaca. Tidak mengonsumsi ruang disk penyimpanan tabel. Menariknya, MySQL mengizinkan pembuatan Secondary Index pada kolom Virtual!
- **STORED**: Nilai dihitung saat insert/update dan disimpan secara fisik di disk. Berguna jika kolom tersebut sering dijadikan bagian dari partisi tabel.

### Mengindeks Dokumen JSON Tanpa Migrasi Skema
Sebelum adanya Generated Column, data di dalam kolom `JSON` tidak dapat diindeks B+Tree. Dengan membuat Virtual Column `brand GENERATED ALWAYS AS (specifications->>'$.brand') VIRTUAL` lalu membuat index `KEY (brand)`, MySQL mampu mengeksekusi pencarian B+Tree ultra-cepat pada atribut JSON dinamis.

---

---

## Penjelasan untuk Pemula

Bayangkan kolom JSON seperti kotak kardus tertutup berisi berbagai barang acak. Mencari merek laptop di dalam kotak kardus membutuhkan Anda membongkar kardus setiap saat. 

Virtual Column seperti menempelkan stiker label nama merek di luar kardus. Stiker itu tidak menambah berat kardus (hemat disk), dan petugas gudang bisa langsung membaca stiker tersebut dari jauh dengan cepat!

## Eksperimen

- Uji pencarian Boolean Full-Text dengan variasi operator + dan - dan amati relevansi hasil
- Jalankan EXPLAIN pada query WHERE brand = 'Apple' untuk memverifikasi pemanfaatan index virtual
- Gunakan fungsi JSON_SEARCH() untuk mencari lokasi path suatu string di dalam dokumen JSON
- Coba buat index multi-valued pada array JSON menggunakan CAST(... AS UNSIGNED ARRAY)

---

## Tantangan

Buat fitur autocomplete tag produk: simpan daftar tag dalam JSON array, buat Multi-Valued Index pada array tersebut, dan tulis query pencarian produk dengan `MEMBER OF()` atau `JSON_CONTAINS()`.

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

Anda telah menguasai Full-Text Search Boolean mode di InnoDB, Generated Columns (VIRTUAL vs STORED), dan strategi indexing atribut dokumen JSON di MySQL 8+.
