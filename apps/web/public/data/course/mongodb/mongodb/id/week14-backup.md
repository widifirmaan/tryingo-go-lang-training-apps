# Backup & Restore

> MongoDB | Modul 14

## Tujuan Pembelajaran

- Melakukan mongodump untuk backup
- Menggunakan mongorestore untuk restore
- Memahami point-in-time backup
- Mengatur automated backup

---

## Program: Data Protection

```javascript
// Backup
mongodump --uri="mongodb://localhost:27017/mydb" --out=./backup

// Restore
mongorestore --uri="mongodb://localhost:27017" ./backup/mydb

// Backup with compression
mongodump --uri="mongodb://localhost:27017/mydb" --gzip --out=./backup
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

Modul 14 dari 16: **Backup & Restore**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **15. Node.js Driver & Integration**.
