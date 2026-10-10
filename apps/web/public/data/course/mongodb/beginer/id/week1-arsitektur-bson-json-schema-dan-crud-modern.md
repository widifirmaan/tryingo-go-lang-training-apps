# Arsitektur BSON, JSON Schema Validation & CRUD Modern

> **Kategori:** MongoDB | **Level:** Fondasi Dokumen BSON & CRUD Operasional | **Minggu 1:** Arsitektur BSON, JSON Schema Validation & CRUD Modern
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan arsitektural antara dokumen JSON dan representasi biner BSON
- Menggunakan tipe data presisi BSON: ObjectId, Date, NumberInt, NumberLong, dan Decimal128
- Menerapkan skema validasi server-side menggunakan validator $jsonSchema
- Menguasai operasi modifikasi atomic: $set, $inc, $push, $pull, dan $currentDate

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **MongoDB for VS Code** (`mongodb.mongodb-vscode`): Jelajahi database, koleksi, dokumen, dan jalankan MongoDB playground langsung

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension mongodb.mongodb-vscode
```

---

### 2. Instalasi Runtime & Dependency (MongoDB 7.0 (via Docker))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
docker run -d --name mongo-dev -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret -v mongodata:/data/db mongo:7.0
```

**macOS (Terminal / Homebrew):**
```bash
brew tap mongodb/brew && brew install mongodb-community@7.0 && brew services start mongodb-community@7.0
```

**Linux (Ubuntu/Debian / bash):**
```bash
docker run -d --name mongo-dev -p 27017:27017 mongo:7.0
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
docker exec -it mongo-dev mongosh --version
```

Output yang diharapkan:
```output
2.x.x
```

> 💡 **Tips Prasyarat:** Docker container MongoDB sudah menyertakan `mongosh` modern.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
docker exec -it mongo-dev mongosh -u root -p secret
```
- **Keterangan:** Membuka shell interaktif mongosh untuk manipulasi koleksi dan dokumen BSON.
- **Pindah ke direktori project:**
```bash
# Terhubung ke mongosh
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
db.users.find().pretty()
```
Akses di browser atau terminal: `mongodb://localhost:27017`

> ℹ️ Mencetak dokumen JSON/BSON tersimpan.

**File Titik Masuk Utama (`playground.mongodb.js`):**
```js
use('shopdb');

// Insert dokumen dengan array dan subdokumen bersarang
db.orders.insertOne({
  orderId: "ORD-9912",
  customer: { name: "Budi Santoso", email: "budi@example.com" },
  items: [
    { product: "Laptop Stand", qty: 1, price: 35.00 },
    { product: "USB-C Cable", qty: 2, price: 12.50 }
  ],
  status: "PAID",
  createdAt: new Date()
});

// Aggregation Pipeline untuk menghitung total penjualan
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$status", totalRevenue: { $sum: { $multiply: ["$items.qty", "$items.price"] } } } }
]);
```
Operasi dokumen dan aggregation pipeline MongoDB.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
mongo-app/
├── scripts/
│   ├── seed.js          # Skrip populasi dokumen awal
│   └── indexes.js       # Pembuatan index koleksi
└── docker-compose.yml
```
Struktur project NoSQL berbasis MongoDB.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `db.collection.createIndex({ field: 1 })` untuk mencegah full-collection scan pada koleksi besar.
- Gunakan MongoDB Compass sebagai GUI desktop resmi untuk visualisasi data interaktif.

---

## Program: Pembuatan Koleksi Terstruktur dengan $jsonSchema Validation dan Operasi CRUD Bersyarat

```javascript
// MongoDB Shell (mongosh) script
use telemetry_db;

// 1. Drop collection if exists for clean reproducible setup
db.devices.drop();

// 2. Create collection with strict JSON Schema Validation
db.createCollection("devices", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["serialNumber", "deviceType", "status", "firmwareVersion", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        serialNumber: {
          bsonType: "string",
          pattern: "^DEV-[0-9]{4}-[A-Z]{2}$",
          description: "Must match format DEV-YYYY-XX"
        },
        deviceType: {
          enum: ["TEMPERATURE_SENSOR", "PRESSURE_GAUGE", "FLOW_METER", "GATEWAY"],
          description: "Must be a predefined device type"
        },
        status: {
          enum: ["ACTIVE", "MAINTENANCE", "DECOMMISSIONED"],
          description: "Operational status"
        },
        firmwareVersion: {
          bsonType: "string",
          description: "Semver version string"
        },
        batteryLevel: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
          description: "Battery percentage (0-100)"
        },
        location: {
          bsonType: "object",
          required: ["facilityId", "zone"],
          properties: {
            facilityId: { bsonType: "string" },
            zone: { bsonType: "string" }
          }
        },
        createdAt: { bsonType: "date" }
      }
    }
  },
  validationAction: "error", // Reject invalid documents
  validationLevel: "strict"
});

// 3. Insert valid documents
db.devices.insertMany([
  {
    serialNumber: "DEV-2026-TX",
    deviceType: "TEMPERATURE_SENSOR",
    status: "ACTIVE",
    firmwareVersion: "2.4.1",
    batteryLevel: NumberInt(88),
    location: { facilityId: "FAC-JKT-01", zone: "Cleanroom Alpha" },
    createdAt: new Date()
  },
  {
    serialNumber: "DEV-2026-PX",
    deviceType: "PRESSURE_GAUGE",
    status: "ACTIVE",
    firmwareVersion: "1.9.0",
    batteryLevel: NumberInt(94),
    location: { facilityId: "FAC-JKT-01", zone: "Compressor Room" },
    createdAt: new Date()
  }
]);

// 4. Atomic conditional update using operators ($set, $inc, $currentDate)
db.devices.updateOne(
  { serialNumber: "DEV-2026-TX", status: "ACTIVE" },
  {
    $set: { firmwareVersion: "2.5.0" },
    $inc: { batteryLevel: NumberInt(-3) },
    $currentDate: { lastInspectedAt: true }
  }
);

// 5. Query matching documents with field projection
const activeDevices = db.devices.find(
  { "location.facilityId": "FAC-JKT-01", batteryLevel: { $gt: 50 } },
  { serialNumber: 1, deviceType: 1, batteryLevel: 1, _id: 0 }
).toArray();

printjson(activeDevices);
```

---

## Konsep Kunci

### Mengapa BSON, Bukan Sekadar JSON?
Meskipun MongoDB dikenal sebagai database dokumen berformat JSON, di balik layar data disimpan dan ditransmisikan dalam format **BSON** (*Binary JSON*). JSON teks standar memiliki keterbatasan fatal: tidak dapat membedakan integer vs floating point (semuanya adalah `number`), tidak memiliki tipe data tanggal native (hanya string), dan memerlukan parsing teks yang lambat. BSON menyematkan panjang byte dan penanda tipe data, memungkinkan mesin MongoDB melewati (*skip*) pembacaan field yang tidak diperlukan secara instan.

### Anatomi ObjectId (12-Byte)
Primary key default `_id` adalah **ObjectId** 12-byte yang terdiri dari:
1. **4-byte Timestamp**: Waktu pembuatan dokumen dalam detik Unix (membuat dokumen otomatis terurut waktu).
2. **5-byte Random Value**: Unik untuk setiap mesin server dan proses.
3. **3-byte Counter**: Penghitung sekuensial yang selalu bertambah, direset pada angka awal acak.
Kombinasi ini menjamin keunikan global tanpa perlu penguncian terpusat.

### Integritas Skema dengan $jsonSchema
Kelemahan mitos bahwa "NoSQL tidak punya skema" diselesaikan oleh **$jsonSchema**. MongoDB mengizinkan kita menetapkan batasan tipe data, regex format, enum nilai, dan field wajib langsung di tingkat koleksi. Jika aplikasi mencoba menyisipkan dokumen yang melanggar aturan, MongoDB melempar error dan menolak dokumen tersebut.

### Modifikasi Atomic dengan Operator Pembaruan
Di MongoDB, Anda tidak boleh membaca dokumen ke memori, mengubah nilai, lalu menimpanya (*read-modify-write anti-pattern*), karena ini memicu race condition. Operator seperti `$inc: { batteryLevel: -3 }` atau `$set: { status: "ACTIVE" }` dieksekusi secara atomic langsung di server engine tanpa mengunci seluruh dokumen.

---

---

## Penjelasan untuk Pemula

Bayangkan dokumen JSON seperti surat kertas biasa yang ditulis tangan. Jika Anda ingin mencari paragraf ketiga, Anda harus membaca dari atas ke bawah. 

BSON seperti map berkas dengan tab indeks plastik berwarna: map itu langsung memberi tahu di mana letak halaman tanggal, halaman angka, dan tanda tangan tanpa harus membaca seluruh lembaran. Sedangkan `$jsonSchema` seperti petugas keamanan di depan loket yang memastikan formulir pendaftaran Anda sudah diisi lengkap sebelum dimasukkan ke dalam arsip.

## Eksperimen

- Coba masukkan dokumen dengan serialNumber yang tidak sesuai format regex dan perhatikan pesan error Document failed validation
- Ekstrak timestamp pembuatan dokumen dari ObjectId menggunakan fungsi doc._id.getTimestamp()
- Gunakan operator $push dan $pull untuk memanipulasi array riwayat inspeksi perangkat
- Uji operasi findOneAndUpdate() dengan opsi returnDocument: "after" untuk mendapatkan nilai dokumen pasca update

---

## Tantangan

Tambahkan aturan validasi $jsonSchema baru: pastikan setiap perangkat wajib memiliki array `sensors` bertipe objek dengan properti `sensorType` dan `calibrationDate`, dengan minimal memiliki 1 elemen array (`minItems: 1`).

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
```output
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
```output
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
```output
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
```output
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

Anda telah menguasai arsitektur penyimpanan BSON, anatomi ObjectId, tata kelola data dengan $jsonSchema validation, dan mutasi atomic dokumen dengan operator update.
