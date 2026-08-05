# Documents & CRUD Operations

> MongoDB | Modul 2

## Tujuan Pembelajaran

- Memahami struktur document MongoDB
- Melakukan insert, find, update, delete
- MemahamiObjectId dan data types
- Menggunakan batch operations

---

## Program: Basic Operations

```javascript
// Insert multiple documents
db.users.insertMany([
  { name: "Alice", email: "alice@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 30 }
])

// Find with filter
db.users.find({ age: { $gte: 25 } })

// Update
db.users.updateOne(
  { name: "Alice" },
  { $set: { age: 26 } }
)

// Delete
db.users.deleteOne({ name: "Bob" })
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

Modul 2 dari 16: **Documents & CRUD Operations**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **3. Querying Documents**.
