# Dokumen & CRUD Dasar

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 1:** Dokumen & CRUD Dasar

## Tujuan Pembelajaran

- Memahami dokumen BSON
- Insert satu/banyak dokumen
- Query dengan filter
- Operator $gt, $lt, $in, $regex
- Query nested document

---

## Program: Operasi Dokumen

```javascript
// Koneksi ke MongoDB
const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db('toko_db');
    const produk = db.collection('produk');

    // CREATE: Insert dokumen
    await produk.insertMany([
        { nama: 'Laptop ASUS', harga: 12500000, stok: 15, kategori: 'Elektronik',
          tags: ['laptop', 'asus'], spesifikasi: { ram: '16GB', cpu: 'i7' } },
        { nama: 'Mouse Logitech', harga: 350000, stok: 50, kategori: 'Aksesoris',
          tags: ['mouse', 'logitech'], spesifikasi: { dpi: 1600 } },
        { nama: 'Keyboard Mechanical', harga: 850000, stok: 30, kategori: 'Aksesoris',
          tags: ['keyboard', 'mechanical'], spesifikasi: { switch: 'blue' } },
        { nama: 'Monitor LG 24', harga: 2800000, stok: 20, kategori: 'Elektronik',
          tags: ['monitor', 'lg'], spesifikasi: { resolusi: '1080p' } },
    ]);

    // READ: Query dokumen
    const all = await produk.find().toArray();
    console.log('Semua produk:', all.length);

    const elektronik = await produk.find({ kategori: 'Elektronik' }).toArray();
    console.log('Elektronik:', elektronik.length);

    const mahal = await produk.find({ harga: { $gt: 1000000 } }).toArray();
    console.log('Harga > 1jt:', mahal.length);

    // READ: Query nested
    const ram16 = await produk.find({ 'spesifikasi.ram': '16GB' }).toArray();
    console.log('RAM 16GB:', ram16.length);

    await client.close();
}
main().catch(console.error);
```

---

## Konsep Kunci

### Dokumen BSON
MongoDB menyimpan data sebagai dokumen BSON (Binary JSON).

### Collection
Grup dokumen, seperti tabel di RDBMS.

### Insert
insertOne() untuk satu, insertMany() untuk banyak.

### Query
find() dengan filter object. Operator: $gt, $lt, $in, $regex.

### Nested Document
Query dengan dot notation: spesifikasi.ram.

---

## Eksperimen

- Insert dengan custom _id
- Query dengan $or
- Query array elements
- Sort dan limit

---

## Tantangan

Koleksi buku: insert 10 buku, query berdasarkan kategori dan harga.

---

## Ringkasan

Minggu 1 dari 10: **Dokumen & CRUD Dasar** (Pemula).
