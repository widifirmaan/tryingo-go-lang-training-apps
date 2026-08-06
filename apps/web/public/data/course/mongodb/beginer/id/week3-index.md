# Index & Performa

> **Kategori:** MongoDB | **Level:** Pemula | **Minggu 3:** Index & Performa

## Tujuan Pembelajaran

- Single field index
- Compound index
- Multikey index untuk array
- Text index untuk search
- Explain dan partial index

---

## Program: Optimasi Query

```javascript
async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const produk = client.db('toko_db').collection('produk');

    // Single field index
    await produk.createIndex({ kategori: 1 });
    await produk.createIndex({ harga: -1 });

    // Compound index
    await produk.createIndex({ kategori: 1, harga: -1 });

    // Multikey index (untuk array)
    await produk.createIndex({ tags: 1 });

    // Text index (untuk full-text search)
    await produk.createIndex({ nama: 'text' });

    // Unique index
    await produk.createIndex({ sku: 1 }, { unique: true });

    // Partial index
    await produk.createIndex(
        { harga: 1 },
        { partialFilterExpression: { stok: { $gt: 0 } } }
    );

    // TTL index (auto-delete setelah waktu)
    await produk.createIndex(
        { created_at: 1 },
        { expireAfterSeconds: 2592000 }  // 30 hari
    );

    // Lihat index
    const indexes = await produk.indexes();
    console.log('Indexes:', indexes.length);

    // Explain query plan
n    const plan = await produk.find({ kategori: 'Elektronik' }).explain('executionStats');
    console.log('Stage:', plan.queryPlanner.winningPlan.stage);
    console.log('Docs examined:', plan.executionStats.totalDocsExamined);
    console.log('Docs returned:', plan.executionStats.nReturned);

    // Cek index usage
    const stats = await produk.stats();
    console.log('Total docs:', stats.count);
    console.log('Index size:', stats.totalIndexSize);

    await client.close();
}
main().catch(console.error);
```

---

## Konsep Kunci

### Single Field Index
Index pada satu field. 1 = ascending, -1 = descending.

### Compound Index
Index multi-field. Field order matters.

### Multikey Index
Otomatis dibuat untuk field array.

### Text Index
Full-text search pada field string.

### Explain
Melihat query plan dan statistik eksekusi.

---

## Eksperimen

- Covered query
- Index intersection
- Wildcard index
- Hashed index

---

## Tantangan

Koleksi besar: buat index yang tepat, ukur perbaikan performa.

---

## Ringkasan

Minggu 3 dari 10: **Index & Performa** (Pemula).
