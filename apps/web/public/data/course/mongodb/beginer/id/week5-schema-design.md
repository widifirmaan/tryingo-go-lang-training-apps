# Schema Design Patterns

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 5:** Schema Design Patterns

## Tujuan Pembelajaran

- Embedding vs Referencing
- Pola embedding 1-to-Few
- Pola referencing 1-to-Many
- $lookup untuk join
- Pola bucket dan outlier

---

## Program: Pola Desain Schema

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

## Konsep Kunci

### Embedding
Simpan data terkait dalam satu dokumen. Bagus untuk 1-to-Few.

### Referencing
Simpan reference (_id) ke dokumen lain. Bagus untuk 1-to-Many.

### $lookup
Left outer join antar collection.

### Bucket Pattern
Kelompokkan data time-series per waktu.

### Outlier Pattern
Field yang jarang dipakai di dokumen terpisah.

---

## Eksperimen

- Subdocument vs reference
- Array of references
- Computed pattern
- Schema versioning

---

## Tantangan

Desain schema e-commerce: pelanggan, pesanan, produk dengan pola tepat.

---

## Ringkasan

Minggu 5 dari 10: **Schema Design Patterns** (Pemula).
