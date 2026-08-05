# Projections & Sorting

> MongoDB | Modul 4

## Tujuan Pembelajaran

- Menggunakan projection untuk efisiensi
- Menggunakan sort() untuk ordering
- Menggunakan limit() dan skip() untuk pagination
- Memahami query optimization dasar

---

## Program: Data Selection

```javascript
// Projection - select specific fields
db.users.find(
  { active: true },
  { name: 1, email: 1, _id: 0 }
)

// Sort and paginate
db.users.find()
  .sort({ createdAt: -1 })
  .skip(10)
  .limit(10)
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

Modul 4 dari 16: **Projections & Sorting**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **5. Query Operators**.
