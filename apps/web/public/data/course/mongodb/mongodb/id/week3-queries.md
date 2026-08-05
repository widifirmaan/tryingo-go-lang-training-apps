# Querying Documents

> MongoDB | Modul 3

## Tujuan Pembelajaran

- Menulis query dasar dengan find()
- Menggunakan filter operators
- Menggunakan projection untuk select fields
- Memahami query execution plan

---

## Program: Read Operations

```javascript
// Basic find
db.users.find({ active: true })

// Filter with operators
db.users.find({ age: { $gte: 21, $lte: 30 } })

// Regex search
db.users.find({ name: /^A/ })

// Text search
db.users.find({ $text: { $search: "Alice" } })
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

Modul 3 dari 16: **Querying Documents**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **4. Projections & Sorting**.
