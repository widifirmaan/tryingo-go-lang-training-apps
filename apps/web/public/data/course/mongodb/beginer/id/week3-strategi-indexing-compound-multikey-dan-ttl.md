# Indexing: Compound, Multikey, TTL & explain("executionStats")

> **Kategori:** MongoDB | **Level:** Fondasi Dokumen BSON & CRUD Operasional | **Minggu 3:** Indexing: Compound, Multikey, TTL & explain("executionStats")
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai aturan emas ESR Rule (Equality, Sort, Range) dalam merancang Compound Index
- Memahami cara kerja Multikey Index saat mengindeks elemen di dalam Array BSON
- Mengotomatisasi penghapusan log sementara menggunakan TTL (Time-To-Live) Index
- Mendiagnosis metrik explain("executionStats"): IXSCAN vs COLLSCAN dan rasio nReturned vs totalDocsExamined

---

## Program: Implementasi Indeks Compound ESM, TTL Auto-Expire, dan Profiling ExecutionStats

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

db.device_events.drop();

// 1. Create realistic events collection
db.device_events.insertMany([
  {
    facilityId: "FAC-JKT-01",
    severity: "CRITICAL",
    tags: ["network", "hardware", "firmware"],
    eventCode: "DISCONNECT",
    createdAt: new Date(),
    expireAt: new Date(Date.now() + 3600 * 1000) // 1 hour from now
  },
  {
    facilityId: "FAC-JKT-01",
    severity: "INFO",
    tags: ["heartbeat"],
    eventCode: "PING",
    createdAt: new Date(),
    expireAt: new Date(Date.now() + 3600 * 1000)
  }
]);

// 2. Compound Index adhering strictly to the ESR Rule:
// Equality: facilityId
// Sort: createdAt (-1)
// Range: severity
db.device_events.createIndex(
  { facilityId: 1, createdAt: -1, severity: 1 },
  { name: "idx_facility_created_severity" }
);

// 3. Multikey Index: Indexing array fields (tags)
db.device_events.createIndex(
  { tags: 1 },
  { name: "idx_event_tags_multikey" }
);

// 4. TTL Index (Time-To-Live): MongoDB background thread automatically purges expired documents
db.device_events.createIndex(
  { expireAt: 1 },
  { expireAfterSeconds: 0, name: "idx_auto_purge_ttl" }
);

// 5. Query execution profiling using executionStats
const explainStats = db.device_events.find({
  facilityId: "FAC-JKT-01",
  severity: "CRITICAL"
})
.sort({ createdAt: -1 })
.explain("executionStats");

print("--- EXPLAIN EXECUTION METRICS ---");
print("Execution Stage: " + explainStats.executionStats.executionStages.stage);
print("Total Documents Examined: " + explainStats.executionStats.totalDocsExamined);
print("Total Keys Examined: " + explainStats.executionStats.totalKeysExamined);
print("nReturned: " + explainStats.executionStats.nReturned);
```

---

## Konsep Kunci

### Aturan Emas Indeks: ESR Rule
Saat merancang Compound Index di MongoDB, urutan kolom menentukan segalanya. Gunakan aturan **ESR (Equality, Sort, Range)**:
1. **Equality (E)**: Letakkan field yang dicari dengan pencocokan exact (`facilityId: "FAC-JKT-01"`) di urutan paling awal.
2. **Sort (S)**: Letakkan field yang digunakan untuk pengurutan (`sort({ createdAt: -1 })`) di posisi kedua, agar dokumen dapat dibaca secara sekuensial dari index tanpa memicu in-memory sort yang boros RAM.
3. **Range (R)**: Letakkan filter rentang (`$gt`, `$lt`, `$in`) di posisi terakhir.

### Multikey Index untuk Array
Ketika Anda mengindeks field yang berisi array (seperti `tags: ["network", "hardware"]`), MongoDB secara otomatis membuat **Multikey Index**. Mesin database membuat entri terpisah di pohon B-Tree untuk setiap elemen di dalam array tersebut. Ini memungkinkan pencarian seperti `{ tags: "hardware" }` berjalan ultra-cepat. *Catatan*: MongoDB melarang pembuatan compound index di mana lebih dari satu field berupa array.

### TTL Index untuk Siklus Hidup Data
Data log telemetri dan sesi otentikasi seringkali hanya relevan selama beberapa jam atau hari. Menghapus log lama dengan cron job query `deleteMany()` membebani CPU database. **TTL Index** (`expireAfterSeconds: 0`) memanfaatkan thread latar belakang MongoDB yang bangun setiap 60 detik untuk menghapus dokumen yang nilai tanggalnya di kolom `expireAt` telah terlewati secara otomatis tanpa membebani performa aplikasi.

### Membaca explain("executionStats")
- `COLLSCAN`: Full Collection Scan. MongoDB membaca seluruh dokumen dari disk (sangat buruk di skala besar).
- `IXSCAN`: Index Scan. MongoDB menelusuri pohon B-Tree index.
- `Rasio Sehat`: Jika `totalDocsExamined == nReturned`, index Anda sempurna (100% selektif). Jika `totalDocsExamined` mencapai 10.000 sementara `nReturned` hanya 2, berarti index Anda tidak efisien.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda mencari nama teman di buku kontak telepon. Buku kontak diurutkan berdasarkan Abjad Nama (Indeks B-Tree). 

Jika buku kontak Anda tidak memiliki urutan abjad (COLLSCAN), Anda harus membaca setiap nama dari halaman pertama sampai halaman terakhir. TTL Index seperti kertas catatan rahasia di film mata-mata: ada jam pasir kecil di sampingnya, dan saat waktu habis, kertas itu terbakar sendiri tanpa Anda perlu repot merobeknya!

## Eksperimen

- Bandingkan executionStats query sebelum dan sesudah dibuatkan index dan perhatikan perbedaan totalDocsExamined
- Buat dokumen dengan expireAt 10 detik ke depan dan perhatikan dokumen terhapus otomatis oleh TTL thread
- Uji aturan ESR dengan menukar posisi Sort dan Range, lalu amati apakah muncul stage SORT di executionStages
- Buat index parsial menggunakan partialFilterExpression untuk mengindeks dokumen yang memiliki severity: "CRITICAL" saja

---

## Tantangan

Bangun Text Index pada field `title` dan `description` untuk pencarian full-text bahasa Inggris dengan bobot relevansi (`weights`), dan jalankan query `$text` dengan evaluasi skor teks meta `$meta: "textScore"`.

---

## Model Mental & Diagram Alur Visual

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

### 1. Desain Dokumen Tanpa Batas (Unbounded Array Anti-Pattern)
- **Gejala / Masalah:** Ukuran dokumen melebihi batas keras 16MB MongoDB saat array anak terus membesar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan teknik referensi ID (`bucketing` atau koleksi terpisah) jika data relasi diproyeksikan tumbuh tanpa batas.

### 2. Tidak Menggunakan Indeks pada Query Sering
- **Gejala / Masalah:** Operasi pencarian melakukan pemeriksaan seluruh koleksi (*COLLSCAN*) yang boros IOPS memori.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Buat compound index via `db.collection.createIndex({ status: 1, createdAt: -1 })`.

### 3. Tipe Data Object ID vs String pada Pencarian
- **Gejala / Masalah:** Query tidak mengembalikan data apa pun karena mencari ID dengan tipe string mentah.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Konversikan string input ke objek `new ObjectId(id)` sebelum melakukan query.

---

## Ringkasan

Anda telah menguasai aturan ESR Compound Index, Multikey Index pada array, pembersihan otomatis dokumen dengan TTL Index, dan evaluasi profil query dengan explain("executionStats").
