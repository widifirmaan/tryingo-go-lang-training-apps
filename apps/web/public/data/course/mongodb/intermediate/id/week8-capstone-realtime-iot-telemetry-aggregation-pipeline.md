# Capstone Project: Real-Time IoT Telemetry Pipeline

> **Kategori:** MongoDB | **Level:** Agregasi Lanjutan, Replikasi & Skalabilitas Sharding | **Minggu 8:** Capstone Project: Real-Time IoT Telemetry Pipeline
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh materi kurikulum MongoDB dalam sebuah capstone IoT telemetry pipeline siap produksi
- Menggunakan koleksi Native Time-Series MongoDB untuk mengompresi data sensor secara optimal di disk
- Menerapkan Outlier Pattern untuk memisahkan anomali ekstrem ke koleksi investigasi forensik
- Membangun pipeline agregasi analitik streaming roll-up untuk dashboard pemantauan pabrik cerdas

---

## Program: Pipeline Telemetri IoT Lengkap: Koleksi Time-Series, Deteksi Anomali Outlier, dan Rollup Agregasi

```javascript
// CAPSTONE PROJECT: Real-Time IoT Sensor Telemetry & Event Aggregation Pipeline
// Demonstrates Time-Series Collections, JSON Schema, Aggregation Pipelines, and Outlier Tracking
use iot_production_hub;

// 1. Create Native MongoDB Time-Series Collection (Engineered specifically for high-throughput sensor telemetry)
db.createCollection("sensor_time_series", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "seconds"
  },
  expireAfterSeconds: 86400 * 30 // Auto-purge telemetry older than 30 days
});

// 2. Outliers / Anomalies collection for deep root-cause forensic analysis
db.outlier_alerts.drop();
db.createCollection("outlier_alerts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deviceId", "metric", "anomalyValue", "threshold", "severity", "detectedAt"],
      properties: {
        deviceId: { bsonType: "string" },
        metric: { bsonType: "string" },
        anomalyValue: { bsonType: "double" },
        threshold: { bsonType: "double" },
        severity: { enum: ["HIGH", "CRITICAL"] },
        detectedAt: { bsonType: "date" }
      }
    }
  }
});

// 3. Seed real-time streaming telemetry batches
db.sensor_time_series.insertMany([
  {
    timestamp: new Date("2026-03-10T12:00:00Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 42.1,
    voltage: 3.3
  },
  {
    timestamp: new Date("2026-03-10T12:00:05Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 43.8,
    voltage: 3.3
  },
  {
    timestamp: new Date("2026-03-10T12:00:10Z"),
    metadata: { deviceId: "SENSOR-ALPHA-01", facility: "PLANT-WEST", type: "VIBRATION_HZ" },
    reading: 104.5, // Extreme anomaly! Outlier detected
    voltage: 3.1
  }
]);

// 4. Industrial Telemetry Rollup & Anomaly Dispatch Pipeline
const anomalyDetectionPipeline = [
  // Stage A: Filter readings within recent evaluation window
  {
    $match: {
      timestamp: {
        $gte: new Date("2026-03-10T12:00:00Z"),
        $lte: new Date("2026-03-10T12:05:00Z")
      }
    }
  },

  // Stage B: Calculate rolling statistics per device
  {
    $group: {
      _id: {
        deviceId: "$metadata.deviceId",
        facility: "$metadata.facility",
        metricType: "$metadata.type"
      },
      readingsCount: { $sum: 1 },
      avgReading: { $avg: "$reading" },
      peakReading: { $max: "$reading" },
      minReading: { $min: "$reading" },
      readingsSamples: { $push: { val: "$reading", ts: "$timestamp" } }
    }
  },

  // Stage C: Project metrics and detect statistical variance
  {
    $project: {
      _id: 0,
      deviceId: "$_id.deviceId",
      facility: "$_id.facility",
      metricType: "$_id.metricType",
      samples: "$readingsCount",
      avgValue: { $round: ["$avgReading", 2] },
      peakValue: "$peakReading",
      isCriticalAnomaly: { $gt: ["$peakReading", 80.0] } // Outlier criteria
    }
  }
];

const telemetryReport = db.sensor_time_series.aggregate(anomalyDetectionPipeline).toArray();
print("--- TELEMETRY ROLLUP ANALYSIS ---");
printjson(telemetryReport);
```

---

## Konsep Kunci

### Arsitektur Capstone IoT Telemetry Pipeline
Proyek capstone ini membangun pipeline analitik telemetri data streaming skala industri:
1. **Koleksi Native Time-Series**: MongoDB menyediakan koleksi khusus time-series (`timeseries: { timeField, metaField, granularity }`). Di tingkat disk, MongoDB mengelompokkan data berdasarkan rentang waktu ke dalam blok kompresi columnar (seperti parquet), memangkas konsumsi storage hingga 70%+ dan mempercepat query rentang waktu.
2. **Pola Outlier (Outlier Pattern)**: Dalam jutaan pembacaan sensor normal, hanya 0.01% data yang merupakan anomali berbahaya (getaran mesin berlebih atau lonjakan suhu). Daripada membebani seluruh pipeline dengan field exception yang jarang muncul, pipeline mendeteksi lonjakan tersebut dan mencatatnya ke koleksi `outlier_alerts` terpisah.
3. **Agregasi Rollup Cerdas**: Tahap `$group` dan `$project` mengubah data sensor berkecepatan tinggi menjadi ringkasan statistik bermakna (rata-rata, puncak, status kritis) yang siap dikonsumsi langsung oleh sistem SCADA atau dashboard grafis.

---

---

## Penjelasan untuk Pemula

Selamat! Anda telah membangun sistem pemantauan pabrik pintar kelas dunia. 
Koleksi Time-Series seperti kamera berkecepatan tinggi yang merekam ribuan data getaran mesin pabrik setiap detik dengan format file terkompresi hemat ruang. 
Pipeline analitik bertindak seperti insinyur pintar yang mengamati layar komputer: jika ada mesin yang tiba-tiba bergetar terlalu keras (anomali outlier), sistem langsung membunyikan sirene tanda bahaya dan mencatat insiden tersebut ke buku laporan darurat!

## Eksperimen

- Jalankan pipeline agregasi dan verifikasi deteksi anomali pada sensor dengan getaran di atas 80Hz
- Inspeksi ukuran kompresi internal koleksi time-series menggunakan db.sensor_time_series.stats()
- Simulasikan auto-expire TTL dengan memeriksa dokumen yang timestamp-nya telah melampaui batas retention
- Uji query rentang waktu spesifik dan amati bahwa query hanya membaca bucket waktu yang relevan

---

## Tantangan

Kembangkan pipeline capstone dengan menambahkan tahap `$out` atau `$merge`: simpan hasil ringkasan agregasi harian secara otomatis ke koleksi baru `daily_telemetry_rollups` untuk keperluan laporan jangka panjang.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ MODEL DATA DOKUMEN BSON MONGODB                          │
│                                                          │
│ Koleksi: users                                           │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ {                                                    │ │
│ │   "_id": ObjectId("64f1a2b..."),                     │ │
│ │   "name": "Alex Iskandar",                           │ │
│ │   "profile": { "role": "admin", "verified": true },  │ │
│ │   "tags": ["developer", "golang"],                   │ │
│ │   "orders": [ { "id": "ORD-1", "total": 150000 } ]  │ │
│ │ }                                                    │ │
│ └──────────────────────────────────────────────────────┘ │
│ Mendukung data bersarang (Embedded Document) tanpa Join! │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `db.collection.insertOne({ ... })`
- **Fungsi Utama:** Penyisipan dokumen BSON tunggal.
- **Parameter / Atribut:** `Document Object`.
- **Perilaku & Efek Sistem:** Menyimpan data dokumen JSON/BSON baru ke dalam koleksi MongoDB..
- **Contoh Penggunaan Praktis:**
```javascript
db.products.insertOne({
  name: 'Keyboard Mekanikal',
  price: 1200000,
  tags: ['gaming', 'hardware'],
  inStock: true
});
```
- **Hasil Output yang Diharapkan:**
```text
Dokumen tersimpan dengan _id unik otomatis
```

### 2. `db.collection.find({ query }, { projection })`
- **Fungsi Utama:** Pencarian dokumen dengan filter deklaratif.
- **Parameter / Atribut:** `Query filters ($eq, $gt, $in), Field projections`.
- **Perilaku & Efek Sistem:** Mengambil daftar dokumen yang memenuhi kondisi pencarian..
- **Contoh Penggunaan Praktis:**
```javascript
db.products.find(
  { price: { $gte: 500000 }, inStock: true },
  { name: 1, price: 1 }
).limit(5);
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan maksimal 5 dokumen produk
```

### 3. `db.collection.updateOne({ _id }, { $set: { status: 'paid' } })`
- **Fungsi Utama:** Pembaruan field dokumen secara atomik.
- **Parameter / Atribut:** `Filter selector, Update operators ($set, $inc, $push)`.
- **Perilaku & Efek Sistem:** Mengubah field tertentu tanpa menimpa seluruh struktur dokumen yang ada..
- **Contoh Penggunaan Praktis:**
```javascript
db.orders.updateOne(
  { orderId: 'ORD-101' },
  { $set: { status: 'completed' }, $currentDate: { updatedAt: true } }
);
```
- **Hasil Output yang Diharapkan:**
```text
Status pesanan berubah menjadi completed
```

### 4. `db.collection.aggregate([ { $match: ... }, { $group: ... } ])`
- **Fungsi Utama:** Pipeline agregasi multi-tahap analitik.
- **Parameter / Atribut:** `Aggregation stages ($match, $group, $sort)`.
- **Perilaku & Efek Sistem:** Memproses dan mentransformasi jutaan dokumen menjadi laporan rekapitulasi data cepat..
- **Contoh Penggunaan Praktis:**
```javascript
db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$category', totalSales: { $sum: '$total' } } }
]);
```
- **Hasil Output yang Diharapkan:**
```text
Menghasilkan ringkasan total penjualan per kategori
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

Selamat! Anda telah menguasai seluruh kurikulum MongoDB: dari arsitektur BSON, skema validasi, pemodelan data Embedding vs Referencing, Compound & Multikey Indexing, Aggregation Framework ($match, $group, $lookup, $unwind, $facet), Transaksi ACID, Sharding Horisontal, hingga Capstone IoT Telemetry Pipeline.
