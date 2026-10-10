# Schema Design Patterns

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 5:** Schema Design Patterns

## Learning Objectives

- Embedding vs Referencing
- Embedding pattern 1-to-Few
- Referencing pattern 1-to-Many
- $lookup for joins
- Bucket and outlier patterns

---

## Program: Schema Design Patterns

```javascript
// Pola Schema Design MongoDB

// 1. Embedding (1-to-Few)
const pelangganEmbedded = {
    _id: ObjectId('...'),
    nama: 'Budi Santoso',
    email: 'budi@email.com',
    alamat: [
        { jalan: 'Jl. Sudirman', kota: 'Jakarta', utama: true },
        { jalan: 'Jl. Thamrin', kota: 'Jakarta', utama: false }
    ]
};

// 2. Referencing (1-to-Many)
const pesananRef = {
    _id: ObjectId('...'),
    pelanggan_id: ObjectId('...'),  // Reference ke pelanggan
    tanggal: new Date(),
    items: [
        { produk_id: ObjectId('...'), nama: 'Laptop', qty: 1, harga: 12500000 },
        { produk_id: ObjectId('...'), nama: 'Mouse', qty: 2, harga: 350000 }
    ],
    total: 13200000
};

// 3. Lookup (join)
async function getPesananWithPelanggan() {
    const pesanan = client.db('toko_db').collection('pesanan');
    return await pesanan.aggregate([
        { $lookup: {
            from: 'pelanggan',
            localField: 'pelanggan_id',
            foreignField: '_id',
            as: 'pelanggan'
        }},
        { $unwind: '$pelanggan' },
        { $project: {
            'pelanggan.nama': 1,
            'pelanggan.email': 1,
            total: 1,
            tanggal: 1
        }}
    ]).toArray();
}

// 4. Pola Bucket (time-series)
const sensorReading = {
    sensor_id: 'temp-01',
    timestamp: new Date(),
    value: 25.5
};

// 5. Pola Outlier (pola subscription)
const userWithOutlier = {
    _id: ObjectId('...'),
    nama: 'Budi',
    subscription: 'premium'  // Outlier field
};
```

---

## Key Concepts

### Embedding
Store related data in one document. Good for 1-to-Few.

### Referencing
Store reference (_id) to another document. Good for 1-to-Many.

### $lookup
Left outer join between collections.

### Bucket Pattern
Group time-series data by time.

### Outlier Pattern
Rarely used fields in separate document.

---

## Experiments

- Subdocument vs reference
- Array of references
- Computed pattern
- Schema versioning

---

## Challenge

Design e-commerce schema: customers, orders, products with appropriate patterns.

---

## Summary

Week 5 of 10: **Schema Design Patterns** (Beginner).
