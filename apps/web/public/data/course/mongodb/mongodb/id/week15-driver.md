# Node.js Driver & Integration

> MongoDB | Modul 15

## Tujuan Pembelajaran

- Menginstall MongoDB Node.js driver
- Menghubungkan ke MongoDB
- Melakukan CRUD operations via driver
- Menggunakan connection pooling

---

## Program: App Integration

```javascript
const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

async function main() {
  await client.connect();
  const db = client.db("mydb");
  const users = db.collection("users");
  
  // Insert
  await users.insertOne({ name: "Alice", email: "alice@example.com" });
  
  // Find
  const user = await users.findOne({ name: "Alice" });
  console.log(user);
  
  await client.close();
}

main();
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

Modul 15 dari 16: **Node.js Driver & Integration**. MongoDB adalah NoSQL document database yang fleksibel dan scalable. Minggu depan: **16. Capstone: Blog API with MongoDB**.
