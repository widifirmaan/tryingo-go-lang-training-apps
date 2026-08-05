# Aggregation Pipeline

> MongoDB | Modul 6

## Tujuan Pembelajaran

- Memahami aggregation pipeline
- Menggunakan $match, $group, $project
- Menggunakan $lookup untuk joins
- Membuat pipeline yang kompleks

---

## Program: Data Pipelines

```javascript
// Aggregation pipeline
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$userId",
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 }
    }
  },
  { $sort: { totalSpent: -1 } }
])
```

---

## Penjelasan

MongoDB adalah NoSQL document database yang menyimpan data dalam format JSON-like documents.
MongoDB mendukung aggregasi pipeline, indexing lanjutan, transaksi multi-document, dan sharding.
Gunakan mongosh atau MongoDB Compass untuk berinteraksi dengan database.

---

## Eksperimen

- Ubah query di atas dan lihat hasilnya
- Tambah document baru dan coba agregasi
- Coba buat index dan analisis performa query

---

## Tantangan

Buat skema database untuk aplikasi sederhana menggunakan konsep minggu ini.
Jalankan query dan verifikasi hasilnya di mongosh atau MongoDB Compass.

---

## Ringkasan

Modul 6 dari 16: **Aggregation Pipeline**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **7. Indexes & Performance**.
