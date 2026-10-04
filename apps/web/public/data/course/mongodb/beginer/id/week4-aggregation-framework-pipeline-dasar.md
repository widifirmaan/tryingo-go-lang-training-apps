# Aggregation Framework: $match, $group, $project & $sort

> **Kategori:** MongoDB | **Level:** Fondasi Dokumen BSON & CRUD Operasional | **Minggu 4:** Aggregation Framework: $match, $group, $project & $sort
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep pipeline perakitan data pada MongoDB Aggregation Framework
- Menggunakan tahapan pemrosesan dasar: $match, $group, $project, $sort, dan $limit
- Melakukan kalkulasi matematika akumulatif: $sum, $avg, $max, $min, $round, dan $subtract
- Menggunakan operator logika kondisional $cond untuk evaluasi percabangan dinamis

---

## Program: Pipeline Agregasi Metrik Perangkat: Rata-Rata, Suhu Maksimum, dan Status Kesehatan

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

// Clean and seed realistic telemetry stream
db.telemetries.drop();

db.telemetries.insertMany([
  { deviceId: "DEV-01", type: "TEMP", value: 24.5, battery: 80, timestamp: new Date("2026-03-10T08:00:00Z") },
  { deviceId: "DEV-01", type: "TEMP", value: 28.2, battery: 78, timestamp: new Date("2026-03-10T09:00:00Z") },
  { deviceId: "DEV-01", type: "TEMP", value: 31.0, battery: 75, timestamp: new Date("2026-03-10T10:00:00Z") },
  { deviceId: "DEV-02", type: "TEMP", value: 19.8, battery: 95, timestamp: new Date("2026-03-10T08:30:00Z") },
  { deviceId: "DEV-02", type: "TEMP", value: 20.4, battery: 93, timestamp: new Date("2026-03-10T09:30:00Z") },
  { deviceId: "DEV-03", type: "VIBRATION", value: 0.05, battery: 40, timestamp: new Date("2026-03-10T08:00:00Z") }
]);

// Analytical Aggregation Pipeline
const pipeline = [
  // Stage 1: Filter temperature readings strictly ($match utilizes indexes!)
  {
    $match: {
      type: "TEMP",
      timestamp: {
        $gte: new Date("2026-03-10T00:00:00Z"),
        $lte: new Date("2026-03-10T23:59:59Z")
      }
    }
  },

  // Stage 2: Group by deviceId and calculate mathematical aggregates
  {
    $group: {
      _id: "$deviceId",
      readingsCount: { $sum: 1 },
      avgTemperature: { $avg: "$value" },
      maxTemperature: { $max: "$value" },
      minTemperature: { $min: "$value" },
      latestBatteryLevel: { $last: "$battery" }
    }
  },

  // Stage 3: Project transformed output fields and conditional health evaluation
  {
    $project: {
      _id: 0,
      deviceId: "$_id",
      totalSamples: "$readingsCount",
      avgTempCelsius: { $round: ["$avgTemperature", 2] },
      peakTempCelsius: "$maxTemperature",
      tempSpread: { $round: [{ $subtract: ["$maxTemperature", "$minTemperature"] }, 2] },
      batteryRemaining: "$latestBatteryLevel",
      operationalStatus: {
        $cond: {
          if: { $gte: ["$maxTemperature", 30.0] },
          then: "WARNING_OVERHEAT",
          else: "OPTIMAL"
        }
      }
    }
  },

  // Stage 4: Sort descending by peak temperature
  {
    $sort: { peakTempCelsius: -1 }
  }
];

const results = db.telemetries.aggregate(pipeline).toArray();
printjson(results);
```

---

## Konsep Kunci

### Paradigma Aggregation Framework
**Aggregation Framework** di MongoDB bekerja seperti ban berjalan di pabrik perakitan (*assembly line*). Dokumen mengalir dari satu tahap (*stage*) ke tahap berikutnya. Setiap tahap menerima sekumpulan dokumen sebagai masukan, melakukan transformasi atau penyaringan, lalu meneruskan hasilnya ke tahap berikutnya.

### Tahap $match: Posisi Menentukan Performa
Tahap `$match` memfilter dokumen berdasarkan kondisi tertentu. Sangat esensial untuk selalu meletakkan `$match` di posisi **paling awal** dalam pipeline. Ketika `$match` berada di tahap pertama, MongoDB dapat memanfaatkan index B-Tree yang ada (IXSCAN) untuk memangkas jutaan dokumen sejak awal, sehingga tahap berikutnya seperti `$group` hanya memproses sedikit dokumen di memori.

### Tahap $group dan Akumulator
Tahap `$group` mengelompokkan dokumen berdasarkan kunci `_id` tertentu (misalnya `_id: "$deviceId"`). Di dalam `$group`, Anda dapat menggunakan ekspresi akumulator:
- `$sum: 1`: Menghitung frekuensi dokumen (seperti `COUNT(*)` di SQL).
- `$avg: "$value"`: Menghitung nilai rata-rata numerik.
- `$first` dan `$last`: Mengambil nilai dari dokumen pertama atau terakhir dalam urutan.

### Transformasi dengan $project dan $cond
Tahap `$project` memungkinkan Anda membentuk ulang struktur dokumen: menyembunyikan field yang tidak perlu (`_id: 0`), membuat field hasil kalkulasi baru, dan menggunakan operator kondisional `$cond: { if: ..., then: ..., else: ... }` untuk menyematkan status peringatan bisnis secara otomatis.

---

---

## Penjelasan untuk Pemula

Bayangkan pabrik pemilah buah apel. 
Tahap 1 ($match): Petugas menyingkirkan semua buah yang bukan apel (hanya apel yang boleh masuk ban berjalan).
Tahap 2 ($group): Apel dikelompokkan ke dalam keranjang berdasarkan kebun asalnya, lalu ditimbang berat rata-ratanya ($avg) dan dicari apel yang paling besar ($max).
Tahap 3 ($project): Keranjang diberi label rapi: jika berat apel di atas 300 gram, tempel stiker 'Grade A Super' ($cond).
Tahap 4 ($sort): Keranjang ditata di truk dari yang paling berat ke yang paling ringan.

## Eksperimen

- Pindahkan tahap $project sebelum $group dan amati bagaimana ketiadaan field mempengaruhi kalkulasi
- Tambahkan operator $round untuk membulatkan rata-rata temperatur menjadi 1 angka di belakang koma
- Uji operator akumulator $push di dalam $group untuk mengumpulkan seluruh nilai pembacaan ke dalam satu array
- Jalankan explain() pada agregasi untuk melihat apakah tahap $match menggunakan Index Scan

---

## Tantangan

Tuliskan pipeline agregasi yang menghitung metrik konsumsi baterai: hitung selisih antara nilai baterai pertama kali tercatat (`$first`) dan nilai baterai terakhir (`$last`) untuk setiap perangkat dalam kurun waktu 24 jam.

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

Anda telah menguasai dasar Aggregation Framework: alur perakitan pipeline, pengoptimalan $match di awal, kalkulasi akumulator $group, transformasi $project, dan evaluasi kondisi dengan $cond.
