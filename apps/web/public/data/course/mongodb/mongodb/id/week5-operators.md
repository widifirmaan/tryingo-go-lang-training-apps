# Query Operators

> MongoDB | Modul 5

## Tujuan Pembelajaran

- Menggunakan $gt, $lt, $gte, $lte
- Menggunakan $in, $nin, $ne
- Menggunakan $and, $or, $not
- Menggunakan regex dan text search

---

## Program: Advanced Queries

```javascript
// Compound conditions
db.users.find({
  $and: [
    { age: { $gte: 21 } },
    { status: "active" }
  ]
})

// $in operator
db.users.find({ name: { $in: ["Alice", "Bob"] } })

// $or operator
db.users.find({
  $or: [
    { role: "admin" },
    { role: "moderator" }
  ]
})
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

Modul 5 dari 16: **Query Operators**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **6. Aggregation Pipeline**.
