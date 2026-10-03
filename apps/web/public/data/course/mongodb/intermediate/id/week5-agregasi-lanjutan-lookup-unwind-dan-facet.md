# Agregasi Lanjutan: $lookup, $unwind & $facet

> **Kategori:** MongoDB | **Level:** Agregasi Lanjutan, Replikasi & Skalabilitas Sharding | **Minggu 5:** Agregasi Lanjutan: $lookup, $unwind & $facet
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai penggabungan antar-koleksi menggunakan $lookup dengan sub-pipeline terfilter (klausa let & $expr)
- Membongkar elemen array menjadi aliran dokumen individual menggunakan $unwind
- Mengeksekusi multi-faceted analytics secara paralel dalam satu query tunggal dengan $facet
- Mengelompokkan data ke dalam rentang numerik otomatis menggunakan tahap $bucket

---

## Program: Multi-Collection Joins dengan $lookup Pipeline dan Pencarian Multi-Faceted dengan $facet

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

// Multi-Collection Join using modern $lookup with custom pipeline
const complexPipeline = [
  // Match active industrial facilities
  { $match: { _id: "FAC-JKT-01" } },

  // Stage: Correlated $lookup joining telemetry readings
  {
    $lookup: {
      from: "telemetries",
      let: { facility_id: "$_id" },
      pipeline: [
        // Sub-pipeline inside the joined collection
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$type", "TEMP"] },
                { $gte: ["$value", 25.0] } // Alerting threshold
              ]
            }
          }
        },
        { $sort: { timestamp: -1 } },
        { $limit: 3 }
      ],
      as: "criticalReadings"
    }
  },

  // Stage: $unwind array to process emergency contacts individually
  { $unwind: "$emergencyContacts" },

  // Stage: Multi-Faceted Analytics ($facet allows multiple independent pipelines in one pass!)
  {
    $facet: {
      // Facet A: Contact Distribution by Role
      "contactsByRole": [
        {
          $group: {
            _id: "$emergencyContacts.role",
            count: { $sum: 1 },
            contactNames: { $push: "$emergencyContacts.name" }
          }
        }
      ],
      // Facet B: Overall Facility Incident Summary
      "incidentOverview": [
        {
          $project: {
            facilityName: "$name",
            highTempAlertsCount: { $size: "$criticalReadings" },
            hasEmergencyLead: {
              $cond: {
                if: { $regexMatch: { input: "$emergencyContacts.role", regex: /Manager/i } },
                then: true,
                else: false
              }
            }
          }
        }
      ]
    }
  }
];

const facetedReport = db.facilities.aggregate(complexPipeline).toArray();
printjson(facetedReport);
```

---

## Konsep Kunci

### Kekuatan $lookup Modern dengan Sub-Pipeline
Di versi lawas, `$lookup` hanya melakukan join sederhana berdasarkan kesamaan nilai dua field (`localField` dan `foreignField`). Di MongoDB modern, `$lookup` mendukung sintaks ekspresif dengan `let` dan `pipeline`. Anda dapat menyaring, mengurutkan, dan membatasi data koleksi target *sebelum* data digabungkan ke dokumen utama, menghemat alokasi memori secara signifikan.

### Membongkar Array dengan $unwind
Jika dokumen memiliki array kontak `emergencyContacts: [A, B, C]`, tahap `$unwind: "$emergencyContacts"` akan menduplikasi dokumen tersebut menjadi 3 dokumen terpisah, di mana masing-masing dokumen memegang satu elemen kontak individual. Ini memungkinkan kita menjalankan operasi `$group` atau filter lanjutan pada field internal array tersebut.

### Analitik Multi-Faset dengan $facet
Dalam halaman e-commerce atau dashboard analitik, pengguna sering melihat beberapa widget analitik sekaligus: widget kategori produk, widget filter harga, dan widget rating bintang. Menjalankan 3 query agregasi terpisah akan membebani jaringan dan database. Tahap `$facet` memungkinkan Anda mendefinisikan beberapa sub-pipeline independen yang dieksekusi secara simultan dalam satu lintasan baca (*single pass*) data.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda membuka toko online sepatu. 
$lookup seperti memanggil asisten gudang untuk mengambilkan kotak sepatu yang cocok dengan pesanan pelanggan.
$unwind seperti membuka satu paket bingkisan berisi 3 pasang kaus kaki dan menjajarkannya satu per satu di atas meja.
$facet seperti sekali melihat etalase toko dan langsung menghitung 3 hal bersamaan: 'Ada berapa sepatu warna merah, berapa yang harganya di bawah 500 ribu, dan berapa yang bermerek Nike'.

## Eksperimen

- Tambahkan opsi preserveNullAndEmptyArrays: true pada $unwind dan amati perilaku saat dokumen memiliki array kosong
- Gunakan tahap $bucketAuto untuk membagi pembacaan temperatur ke dalam 4 ember persentil otomatis
- Gunakan operator $size pada hasil $lookup untuk menghitung jumlah relasi tanpa melakukan unwind
- Uji batas konsumsi memori 100MB pada agregasi dan tambahkan opsi allowDiskUse: true

---

## Tantangan

Bangun pipeline pencarian produk faset lengkap: terima teks pencarian, gunakan `$facet` untuk menghasilkan (1) daftar produk 10 teratas dengan paginasi, (2) daftar merek dan jumlah produknya, dan (3) rentang harga minimum-maksimum.

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

Anda telah menguasai agregasi lanjutan di MongoDB: join koleksi modern dengan $lookup sub-pipeline, pembongkaran array dengan $unwind, dan analitik multi-dimensi paralel dengan $facet.
