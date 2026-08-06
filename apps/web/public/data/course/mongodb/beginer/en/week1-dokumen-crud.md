# Documents & Basic CRUD

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 1:** Documents & Basic CRUD

## Learning Objectives

- Understand BSON documents
- Insert single/multiple documents
- Query with filters
- Operators $gt, $lt, $in, $regex
- Query nested documents

---

## Program: Document Operations

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

## Key Concepts

### BSON Documents
MongoDB stores data as BSON documents.

### Collections
Group of documents, like RDBMS tables.

### Insert
insertOne() for single, insertMany() for multiple.

### Queries
find() with filter object. Operators: $gt, $lt, $in, $regex.

### Nested Documents
Query with dot notation: specs.ram.

---

## Experiments

- Insert with custom _id
- Query with $or
- Query array elements
- Sort and limit

---

## Challenge

Books collection: insert 10 books, query by category and price.

---

## Summary

Week 1 of 10: **Documents & Basic CRUD** (Beginner).
