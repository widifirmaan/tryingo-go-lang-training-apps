# Change Streams & Events

> MongoDB | Modul 12

## Tujuan Pembelajaran

- Memahami change streams
- Menggunakan watch() untuk real-time updates
- Mengfilter change events
- Membangun real-time notification system

---

## Program: Real-time Data

```javascript
// Watch for changes
const changeStream = db.collection("users").watch([
  { $match: { "operationType": "insert" } }
])

changeStream.on("change", (change) => {
  console.log("New document:", change.fullDocument)
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

Modul 12 dari 16: **Change Streams & Events**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **13. Security & Authentication**.
