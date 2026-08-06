# Performa & Tuning

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 8:** Performa & Tuning

## Tujuan Pembelajaran

- Explain allPlansExecution
- Database profiler
- Server status monitoring
- Current operations
- Compact dan cache

---

## Program: Optimasi MongoDB

```javascript
async function main() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('toko_db');
    const produk = db.collection('produk');

    // Analisis query plan
    const plan = await produk.find({
        kategori: 'Elektronik',
        harga: { $gt: 1000000 }
    }).explain('allPlansExecution');

    console.log('Stage:', plan.queryPlanner.winningPlan.stage);
    console.log('Index used:', plan.queryPlanner.winningPlan.inputStage?.indexName);
    console.log('Docs examined:', plan.executionStats.totalDocsExamined);
    console.log('Execution time:', plan.executionStats.executionTimeMillis, 'ms');

    // Profiler
    db.setProfilingLevel(2);  // Profile semua query
    db.setProfilingLevel(1, { slowms: 100 });  // Query > 100ms

    const slowQueries = db.system.profile.find(
        { millis: { $gt: 100 } }
    ).sort({ millis: -1 }).limit(10).toArray();

    // Server status
    const serverStatus = await db.admin().serverStatus();
    console.log('Connections:', serverStatus.connections.current);
    console.log('Memory resident:', serverStatus.mem.resident, 'MB');
    console.log('Query executor:', serverStatus.metrics.queryExecutor.scanned);

    // Current operations
    const ops = await db.admin().command({ currentOp: 1 });
    const activeOps = ops.inprog.filter(op => op.secs_running > 1);
    console.log('Long running ops:', activeOps.length);

    // Compact collection
    await db.command({ compact: 'produk' });

    // Caching strategy
    // WiredTiger cache: 50% RAM - 1GB
    // wiredTigerCacheSizeGB: 4

    await client.close();
}
main().catch(console.error);
```

---

## Konsep Kunci

### Explain
Melihat query plan dan membandingkan index.

### Profiler
Catat query lambat untuk analisis.

### Server Status
Monitoring koneksi, memory, dan operasi.

### Current Op
Lihat operasi yang sedang berjalan.

### Compact
Defragmentasi storage WiredTiger.

---

## Eksperimen

- Index intersection
- Covered queries
- Projection optimization
- Batch operations

---

## Tantangan

Optimasi: identifikasi slow query, tambah index, setup profiler.

---

## Ringkasan

Minggu 8 dari 10: **Performa & Tuning** (Menengah).
