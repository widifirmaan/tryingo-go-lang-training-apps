# Data Modeling Patterns

> MongoDB | Modul 8

## Tujuan Pembelajaran

- Memahami embedded documents pattern
- Memahami referencing pattern
- Memilih antara embedded dan referencing
- Merancang schema untuk aplikasi nyata

---

## Program: Schema Design

```javascript
// Embedded document pattern
{
  _id: ObjectId("..."),
  name: "Alice",
  address: {
    street: "Jl. Merdeka No. 1",
    city: "Jakarta",
    country: "Indonesia"
  }
}

// Referencing pattern
{
  _id: ObjectId("..."),
  name: "Order #1",
  userId: ObjectId("..."),
  items: [
    { productId: ObjectId("..."), qty: 2 }
  ]
}
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

Modul 8 dari 16: **Data Modeling Patterns**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **9. Multi-Document Transactions**.
