# Indexes & Performance

> MongoDB | Modul 7

## Tujuan Pembelajaran

- Memahami B-tree indexes di MongoDB
- Membuat index pada fields frequently queried
- Memahami compound indexes
- Menganalisis query dengan explain()

---

## Program: Query Optimization

```javascript
// Create index
db.users.createIndex({ email: 1 }, { unique: true })

// Compound index
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Analyze query
db.users.find({ email: "alice@example.com" }).explain("executionStats")
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

Modul 7 dari 16: **Indexes & Performance**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **8. Data Modeling Patterns**.
