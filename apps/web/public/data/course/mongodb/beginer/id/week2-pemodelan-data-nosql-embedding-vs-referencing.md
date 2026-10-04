# Pemodelan Data NoSQL: Embedding vs Referencing

> **Kategori:** MongoDB | **Level:** Fondasi Dokumen BSON & CRUD Operasional | **Minggu 2:** Pemodelan Data NoSQL: Embedding vs Referencing
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami panduan keputusan arsitektur: Kapan harus Embed vs Kapan harus Reference
- Mencegah fenomena anti-pattern Unbounded Array Growth (batas ukuran 16MB per dokumen BSON)
- Menerapkan Subset Pattern menggunakan modifier $push dengan $slice dan $sort
- Menggunakan denormalisasi selektif untuk mengeliminasi operasi join yang sering dipanggil

---

## Program: Penerapan Pola Desain Subset Pattern dan Denormalisasi Selektif

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

db.facilities.drop();
db.sensor_readings.drop();

// Pattern 1: Embedded Pattern (One-to-Few relationship, bounded growth)
// Facility contains its core configuration and contact details directly
db.facilities.insertOne({
  _id: "FAC-JKT-01",
  name: "Jakarta Datacenter Tier-3",
  address: {
    street: "Jl. TB Simatupang No. 18",
    city: "Jakarta Selatan",
    country: "ID"
  },
  // Embedded contacts (bounded array: rarely exceeds 3-5 contacts)
  emergencyContacts: [
    { name: "Bambang Wijaya", role: "Facility Manager", phone: "+62811223344" },
    { name: "Ratna Sari", role: "Chief Security Officer", phone: "+62811556677" }
  ],
  // Subset Pattern: Keep only the 5 most recent alerts for instant UI rendering
  recentAlerts: [
    { code: "OVERHEAT", severity: "CRITICAL", timestamp: new Date("2026-03-10T08:30:00Z") },
    { code: "VOLT_DROP", severity: "WARNING", timestamp: new Date("2026-03-10T09:15:00Z") }
  ],
  totalAlertsCount: 1420 // Denormalized counter
});

// Pattern 2: Referenced Pattern (One-to-Many / One-to-Millions unbounded relationship)
// Massive stream of sensor readings stored in a separate collection referencing facility
db.sensor_readings.insertMany([
  {
    facilityId: "FAC-JKT-01", // Reference link
    deviceId: "DEV-2026-TX",
    metric: "temperature",
    value: 23.8,
    unit: "CELSIUS",
    timestamp: new Date("2026-03-10T10:00:00Z")
  },
  {
    facilityId: "FAC-JKT-01",
    deviceId: "DEV-2026-TX",
    metric: "temperature",
    value: 24.1,
    unit: "CELSIUS",
    timestamp: new Date("2026-03-10T10:01:00Z")
  }
]);

// Atomic append to recentAlerts while keeping the subset array capped at 5 items using $slice
db.facilities.updateOne(
  { _id: "FAC-JKT-01" },
  {
    $push: {
      recentAlerts: {
        $each: [{ code: "DOOR_OPEN", severity: "INFO", timestamp: new Date() }],
        $sort: { timestamp: -1 },
        $slice: 5 // Retain only latest 5 entries!
      }
    },
    $inc: { totalAlertsCount: 1 }
  }
);

// Inspect facility document
printjson(db.facilities.findOne({ _id: "FAC-JKT-01" }));
```

---

## Konsep Kunci

### Kaidah Emas: Embedding vs Referencing
Aturan mendasar pemodelan data di MongoDB: **Data yang diakses bersamaan harus disimpan bersamaan**.
- **Embedding (Denormalized)**: Ideal untuk relasi *One-to-One* atau *One-to-Few* yang bersifat terbatas (bounded), seperti alamat dan kontak darurat. Keunggulannya adalah performa baca sekali akses (*single disk seek*) tanpa perlu join.
- **Referencing (Normalized)**: Wajib digunakan untuk relasi *One-to-Many* yang tidak terbatas (*unbounded*), seperti riwayat sensor jutaan baris. Menyimpan jutaan array di satu dokumen akan menabrak **batas ukuran maksimal 16MB dokumen BSON**.

### Subset Pattern dan Modifier $slice
Bila sebuah entitas memiliki ribuan riwayat transaksi atau peringatan (*alerts*), aplikasi pengguna biasanya hanya membutuhkan 5 atau 10 peringatan terkini untuk ditampilkan di dashboard. **Subset Pattern** menyimpan 5 peringatan terakhir langsung di dalam dokumen fasilitas utama, sementara riwayat lengkap disimpan di koleksi terpisah. Operator `$push: { $each: [...], $sort: { timestamp: -1 }, $slice: 5 }` secara otomatis memotong array agar tidak pernah melebihi 5 elemen.

### Denormalisasi Selektif
Alih-alih menjalankan query agregasi `count()` yang mahal setiap kali halaman dimuat, kita menduplikasi nilai agregat sederhana seperti `totalAlertsCount` langsung di dokumen induk dan memperbaruinya secara atomic dengan `$inc: { totalAlertsCount: 1 }`.

---

---

## Penjelasan untuk Pemula

Bayangkan dokumen pasien rumah sakit. Golongan darah, alamat rumah, dan nomor telepon wali sebaiknya ditulis langsung di sampul map pasien (Embedding) karena tidak akan berubah banyak dan selalu dibaca dokter saat darurat.

Tetapi, hasil tes darah dan rekam medis harian selama 10 tahun tidak boleh diselipkan di sampul map yang sama, karena map tersebut akan robek dan terlalu tebal (batas 16MB). Rekam medis harian disimpan di lemari arsip tersendiri dengan kode referensi nomor pasien (Referencing).

## Eksperimen

- Jalankan skrip update berulang kali dan amati bahwa array recentAlerts tidak pernah bertambah melebihi 5 item
- Gunakan fungsi Object.bsonsize(db.facilities.findOne()) untuk melihat ukuran byte dokumen BSON aktual
- Simulasikan dokumen yang melebihi batas 16MB untuk melihat pesan error Document exceeds maximum allowed BSON size
- Bandingkan waktu respon membaca 1 dokumen embedded vs membaca referensi dengan query kedua

---

## Tantangan

Rancang skema e-commerce dengan Extended Reference Pattern: tabel `orders` yang menyimpan referensi `customerId`, namun menyalin nama, email, dan tier customer pada saat transaksi dibuat agar riwayat invoice tidak berubah jika profil customer diupdate di masa depan.

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

Anda telah menguasai pemodelan data NoSQL: trade-off Embedding vs Referencing, pencegahan batas 16MB BSON, Subset Pattern dengan $slice, dan denormalisasi selektif.
