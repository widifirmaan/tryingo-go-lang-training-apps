# Indexing B+Tree, Composite Index & EXPLAIN FORMAT=JSON

> **Kategori:** MySQL | **Level:** Fondasi Relasional & Engine InnoDB | **Minggu 3:** Indexing B+Tree, Composite Index & EXPLAIN FORMAT=JSON

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

## Ringkasan

Anda telah menguasai arsitektur B+Tree InnoDB, eliminasi bookmark lookup dengan Covering Index, dan profil eksekusi presisi dengan EXPLAIN FORMAT=JSON.
