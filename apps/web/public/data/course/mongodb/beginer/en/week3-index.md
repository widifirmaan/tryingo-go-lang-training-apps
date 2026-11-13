# Indexes & Performance

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 3:** Indexes & Performance

## Why This Matters

MongoDB stores data as flexible documents - perfect for catalogs, logs, and data whose shape keeps changing. Learning to think in documents expands how you model data, not just how you use tables.

Practice program: *"Query Optimization"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Single field index
- Compound index
- Multikey index for arrays
- Text index for search
- Explain and partial indexes

---

## Program: Query Optimization

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

## Key Concepts

### Single Field Index
Index on one field. 1 = ascending, -1 = descending.

### Compound Index
Multi-field index. Field order matters.

### Multikey Index
Auto-created for array fields.

### Text Index
Full-text search on string fields.

### Explain
View query plan and execution stats.

---

## Experiments

- Covered query
- Index intersection
- Wildcard index
- Hashed index

---

## Challenge

Large collection: create appropriate indexes, measure performance improvement.

---

## Summary

Week 3 of 10: **Indexes & Performance** (Beginner).
