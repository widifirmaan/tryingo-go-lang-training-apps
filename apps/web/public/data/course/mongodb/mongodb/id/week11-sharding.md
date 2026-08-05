# Sharding & Scaling

> MongoDB | Modul 11

## Tujuan Pembelajaran

- Memahami sharding concepts
- Mengatur shard keys
- Menggunakan mongos router
- Memahami chunk migration

---

## Program: Scale Out

```javascript
// Enable sharding
sh.enableSharding("mydb")

// Shard a collection
sh.shardCollection(
  "mydb.users",
  { userId: "hashed" }
)

// Add shards
sh.addShard("replicaSet1/host1:27017")
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

Modul 11 dari 16: **Sharding & Scaling**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **12. Change Streams & Events**.
