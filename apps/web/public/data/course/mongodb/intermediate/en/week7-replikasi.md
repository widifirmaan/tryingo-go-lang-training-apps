# Replica Sets & Sharding

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 7:** Replica Sets & Sharding

## Learning Objectives

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

## Key Concepts

### Replica Set
Set of MongoDB servers with primary and secondaries.

### Read Preference
Choose node for reads: primary, secondary, nearest.

### Write Concern
Write acknowledgment: w=1, w=majority.

### Read Concern
Isolation level: local, majority, linearizable.

### Sharding
Distribute data across multiple servers.

---

## Experiments

- Automatic failover
- Sharding strategy
- Zone sharding
- Change streams

---

## Challenge

Setup replica set: 3 nodes + arbiter + monitoring.

---

## Summary

Week 7 of 10: **Replica Sets & Sharding** (Intermediate).
