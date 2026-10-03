# Replica Sets, Sharded Clusters & Strategi Shard Key

> **Kategori:** MongoDB | **Level:** Agregasi Lanjutan, Replikasi & Skalabilitas Sharding | **Minggu 7:** Replica Sets, Sharded Clusters & Strategi Shard Key
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami topologi Sharded Cluster: mongos router, Config Server replica set, dan data shard nodes
- Membedakan strategi Ranged Sharding vs Hashed Sharding
- Mencegah Monotonic Write Hotspot pada key yang bertambah sekuensial (seperti Timestamp atau ObjectId)
- Menghindari anti-pattern Scatter-Gather Query dengan memastikan query menyertakan Shard Key

---

## Program: Arsitektur Sharding Horisontal: Pemilihan Hashed vs Ranged Shard Key dan Chunk Balancing

```javascript
// MongoDB Shell commands for Sharding Administration (admin database)
use admin;

// 1. Check current cluster sharding status
sh.status();

// 2. Enable sharding on database
sh.enableSharding("telemetry_db");

// 3. Strategy Comparison:
// Strategy A: Ranged Sharding on monotonically increasing keys (e.g. createdAt)
// WARNING: Leads to Monotonic Insert Hotspots! All new writes hit the highest chunk on a single shard!

// Strategy B: Hashed Sharding for even, uniform write distribution across all shards
// Hashes the deviceId to distribute incoming concurrent writes perfectly
sh.shardCollection(
  "telemetry_db.device_telemetries",
  { deviceId: "hashed" },
  false, // Unique constraint flag
  { numInitialChunks: 10 }
);

// Strategy C: Compound Shard Key (Targeted Queries + Even Distribution)
// Prefix with facilityId for targeted routing, suffix with hashed eventId to avoid hotspots
// sh.shardCollection("telemetry_db.facility_events", { facilityId: 1, eventId: "hashed" });

// 4. Inspect Shard Distribution and Data Placement
use telemetry_db;
db.device_telemetries.getShardDistribution();

// 5. Query execution targeting verification:
// A targeted query (specifying the shard key) routes to ONLY ONE shard!
const targetedExplain = db.device_telemetries.find({ deviceId: "DEV-2026-TX" }).explain();
print("Targeted Query Routing: Shards Contacted = 1");

// A scatter-gather query (omitting shard key) forces mongos to query ALL shards!
const scatterExplain = db.device_telemetries.find({ metric: "temperature" }).explain();
print("Scatter-Gather Query Routing: Contacted All Shards (Expensive!)");
```

---

## Konsep Kunci

### Komponen Arsitektur Sharded Cluster
Ketika ukuran data melampaui kapasitas satu server tunggal (puluhan terabyte), MongoDB melakukan partisi horizontal (**Sharding**):
1. **Shards**: Node-node (berupa Replica Set) yang menyimpan subset pecahan data aktual.
2. **Config Database**: Menyimpan metadata konfigurasi cluster dan pemetaan chunk ke masing-masing shard.
3. **mongos**: Router aplikasi tanpa status (*stateless router*). Aplikasi web hanya berbicara dengan `mongos`, dan `mongos` yang menentukan shard mana yang menyimpan data yang dicari.

### Bahaya Monotonic Insert Hotspot
Jika Anda memilih field tanggal `createdAt` sebagai Shard Key dalam Ranged Sharding, setiap dokumen baru akan selalu memiliki nilai tanggal paling mutakhir. Akibatnya, 100% operasi tulis baru akan membanjiri shard terakhir (*hotspot*), sementara shard lainnya menganggur. Skalabilitas horisontal menjadi gagal total.

### Hashed Sharding vs Compound Shard Key
- **Hashed Sharding**: Menggunakan fungsi hash MD5 internal pada key (misal: `{ deviceId: "hashed" }`). Nilai hash terdistribusi acak seragam, memastikan beban tulis terbagi rata ke seluruh node shard di dunia.
- **Targeted vs Scatter-Gather Query**: Jika query menyertakan shard key (`find({ deviceId: "..." })`), `mongos` langsung mengarahkan query ke 1 shard yang tepat (**Targeted Query**). Jika tidak, `mongos` terpaksa mengirim query ke seluruh shard (**Scatter-Gather Query**) lalu menggabungkan hasilnya di memori, membebani jaringan cluster secara drastis.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda memiliki 10 lemari arsip (10 Shard) dan seorang resepsionis di lobi (mongos).
Jika Anda menyusun arsip berdasarkan tanggal masuk (Ranged Sharding), lemari nomor 10 akan penuh sesak setiap hari sampai pintunya jebol, sementara lemari 1-9 kosong melompong.
Dengan Hashed Sharding, nama surat diacak dengan rumus matematika sehingga lemari 1 sampai 10 terisi secara merata. Saat mencari surat, jika Anda memberi tahu resepsionis kode suratnya, dia langsung menuju ke lemari nomor 3 (Targeted Query) tanpa harus membuka ke-10 lemari sekaligus (Scatter-Gather).

## Eksperimen

- Jalankan perintah sh.status() pada cluster sharded dan amati informasi chunk boundaries
- Bandingkan execution plan query bertarget (dengan shard key) vs query scatter-gather di explain()
- Amati proses chunk balancing otomatis saat data yang disisipkan melewati ambang batas chunk size
- Uji konfigurasi Compound Shard Key yang menggabungkan field kategori dan hashed UUID

---

## Tantangan

Rancang skema sharding untuk sistem perpesanan chat berskala 100 juta pengguna: pilih shard key optimal untuk koleksi `messages` agar query riwayat percakapan grup (`conversationId`) selalu tertarget pada 1 shard tunggal.

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

Anda telah menguasai arsitektur penskalaan horisontal MongoDB: topologi sharded cluster (mongos, config servers, shards), pencegahan hotspot dengan Hashed Sharding, dan optimasi Targeted vs Scatter-Gather queries.
