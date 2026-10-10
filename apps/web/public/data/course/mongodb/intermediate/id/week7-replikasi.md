# Replica Set & Sharding

> **Kategori:** MongoDB | **Level:** Menengah | **Minggu 7:** Replica Set & Sharding

## Tujuan Pembelajaran

- Replica set setup
- Read preference
- Write concern
- Read concern
- Sharding basics

---

## Program: High Availability

```javascript
// Replica Set Configuration
// mongod --replSet rs0 --port 27017

// Inisialisasi replica set
rs.initiate({
    _id: 'rs0',
    members: [
        { _id: 0, host: 'mongo1:27017', priority: 2 },
        { _id: 1, host: 'mongo2:27017', priority: 1 },
        { _id: 2, host: 'mongo3:27017', priority: 1 },
        { _id: 3, host: 'mongo4:27017', arbiterOnly: true }
    ]
});

// Cek status replica set
rs.status();

// Read preference
const client = new MongoClient('mongodb://mongo1:27017,mongo2:27017/?replicaSet=rs0', {
    readPreference: 'secondaryPreferred',
    readConcern: { level: 'majority' },
    writeConcern: { w: 'majority', j: true, wtimeout: 5000 }
});

// Write concern
await db.collection('pesanan').insertOne(
    { nama: 'Order #1', total: 1000000 },
    { writeConcern: { w: 'majority', j: true } }
);

// Read concern
const data = await db.collection('produk')
    .find()
    .readConcern('majority')
    .readPreference('secondary')
    .toArray();

// Sharding (mongos router)
// sh.enableSharding('toko_db')
// sh.shardCollection('toko_db.produk', { kategori: 1 })
// sh.addShardTag('shard0000', 'elektronik')
```

---

## Konsep Kunci

### Replica Set
Set server MongoDB dengan primary dan secondaries.

### Read Preference
Pilih node untuk read: primary, secondary, nearest.

### Write Concern
Konfirmasi write: w=1 (primary), w=majority.

### Read Concern
Level isolasi: local, majority, linearizable.

### Sharding
Distribusi data ke multiple server.

---

## Eksperimen

- Automatic failover
- Sharding strategy
- Zone sharding
- Change streams

---

## Tantangan

Setup replica set: 3 nodes + arbiter + monitoring.

---

## Ringkasan

Minggu 7 dari 10: **Replica Set & Sharding** (Menengah).
