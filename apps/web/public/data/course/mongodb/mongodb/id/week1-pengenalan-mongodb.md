# Pengenalan MongoDB & Setup

> MongoDB | Modul 1

## Tujuan Pembelajaran

- Mengenal MongoDB sebagai NoSQL document database
- Menginstall MongoDB dan MongoDB Compass
- Memahami konsep document dan collection
- Membuat database dan collection pertama

---

## Program: Hello MongoDB

```javascript
// Connect to MongoDB
mongosh "mongodb://localhost:27017"

// Create a database and collection
use mydb
 db.createCollection("users")

// Insert a document
db.users.insertOne({
  name: "Budi",
  email: "budi@example.com",
  createdAt: new Date()
})

// Query all
db.users.find().pretty()
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

Modul 1 dari 16: **Pengenalan MongoDB & Setup**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **2. Documents & CRUD Operations**.
