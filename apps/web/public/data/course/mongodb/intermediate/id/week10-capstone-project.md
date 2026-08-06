# Capstone: E-Commerce MongoDB

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 10:** Capstone: E-Commerce MongoDB

## Tujuan Pembelajaran

- Schema validation
- Indexes optimal
- Aggregation pipeline kompleks
- View dari pipeline
- Change streams

---

## Program: Database Production-Ready

```javascript
// CAPSTONE: E-Commerce MongoDB Production-Ready

// 1. Schema Validation
const produkValidator = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['nama', 'harga', 'kategori'],
        properties: {
            nama: { bsonType: 'string', description: 'Nama produk wajib' },
            harga: { bsonType: 'double', minimum: 0 },
            stok: { bsonType: 'int', minimum: 0 },
            kategori: { enum: ['Elektronik','Aksesoris','Audio','Storage'] },
            tags: { bsonType: 'array', items: { bsonType: 'string' } },
            created_at: { bsonType: 'date' }
        }
    }
};

await db.createCollection('produk', { validator: produkValidator });

// 2. Indexes
await produk.createIndex({ kategori: 1, harga: -1 });
await produk.createIndex({ nama: 'text' });
await produk.createIndex({ tags: 1 });
await produk.createIndex({ sku: 1 }, { unique: true });

// 3. Aggregation pipeline laporan
const laporan = await db.collection('order_items').aggregate([
    { $lookup: {
        from: 'produk',
        localField: 'produk_id',
        foreignField: '_id',
        as: 'produk'
    }},
    { $unwind: '$produk' },
    { $group: {
        _id: '$produk.kategori',
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: { $multiply: ['$qty', '$harga'] } },
        avgOrderValue: { $avg: { $multiply: ['$qty', '$harga'] } }
    }},
    { $sort: { totalRevenue: -1 } },
    { $merge: { into: 'laporan_kategori', whenMatched: 'replace' } }
]).toArray();

// 4. View
await db.createView('v_top_produk', 'order_items', [
    { $group: { _id: '$produk_id', totalSold: { $sum: '$qty' } } },
    { $sort: { totalSold: -1 } },
    { $limit: 10 }
]);

// 5. Change stream untuk notifikasi
const stream = db.collection('pesanan').watch([
    { $match: { operationType: 'insert' } }
]);
stream.on('change', (doc) => console.log('New order:', doc.fullDocument));
```

---

## Konsep Kunci

### Schema Validation
Validasi dokumen dengan JSON Schema.

### Indexes
Compound, text, unique, multikey indexes.

### Aggregation
Pipeline kompleks dengan lookup, group, merge.

### View
Read-only view dari aggregation pipeline.

### Change Streams
Realtime monitoring untuk notifikasi.

---

## Eksperimen

- Time series collection
- Atlas search
- Data lake
- Custom roles

---

## Tantangan

Deploy MongoDB e-commerce: schema, indexes, aggregation, views, change streams.

---

## Ringkasan

Minggu 10 dari 10: **Capstone: E-Commerce MongoDB** (Menengah). Selesai!
