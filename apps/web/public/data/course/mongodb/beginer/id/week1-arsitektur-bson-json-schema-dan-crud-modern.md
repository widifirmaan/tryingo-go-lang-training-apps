# Arsitektur BSON, JSON Schema Validation & CRUD Modern

> **Kategori:** MongoDB | **Level:** Fondasi Dokumen BSON & CRUD Operasional | **Minggu 1:** Arsitektur BSON, JSON Schema Validation & CRUD Modern
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan arsitektural antara dokumen JSON dan representasi biner BSON
- Menggunakan tipe data presisi BSON: ObjectId, Date, NumberInt, NumberLong, dan Decimal128
- Menerapkan skema validasi server-side menggunakan validator $jsonSchema
- Menguasai operasi modifikasi atomic: $set, $inc, $push, $pull, dan $currentDate

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

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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
