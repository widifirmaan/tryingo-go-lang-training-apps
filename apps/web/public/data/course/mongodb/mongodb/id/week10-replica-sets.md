# Replica Sets & HA

> MongoDB | Modul 10

## Tujuan Pembelajaran

- Memahami replica sets
- Mengatur primary dan secondary nodes
- Memahami read preferences
- Mengkonfigurasi automatic failover

---

## Program: Replication

```javascript
// Replica set configuration
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "node1:27017", priority: 2 },
    { _id: 1, host: "node2:27017", priority: 1 },
    { _id: 2, host: "node3:27017", priority: 1, arbiterOnly: true }
  ]
})

// Read from secondary
 db.users.find().readPref("secondaryPreferred")
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

Modul 10 dari 16: **Replica Sets & HA**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **11. Sharding & Scaling**.
