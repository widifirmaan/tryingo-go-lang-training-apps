# Replica Sets, Sharded Clusters & Shard Key Strategy

> **Kategori:** MongoDB | **Level:** Advanced Aggregation, Replication & Sharding Scalability | **Minggu 7:** Replica Sets, Sharded Clusters & Shard Key Strategy
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Sharded Cluster topology: mongos routers, Config Server replica sets, and data shard nodes
- Differentiate Ranged Sharding versus Hashed Sharding strategies
- Prevent Monotonic Write Hotspots on sequential keys (e.g. Timestamps or ObjectIds)
- Eliminate expensive Scatter-Gather queries by mandating Shard Key predicates in application queries

---

## Program: Horizontal Sharding Architecture: Hashed vs Ranged Shard Key Selection and Chunk Balancing

```javascript
// MongoDB Shell commands for Sharding Administration (admin database)
use admin;

// 1. Check current cluster sharding status
sh.status();

// 2. Enable sharding on database
sh.enableSharding("telemetry_db");

// 3. Strategy Comparison:
// Strategy A: Ranged Sharding on monotonically increasing keys (e.g. createdAt)
// WARNING: Leads to Monotonic Insert Hotspots! All new writes hit the highest chunk on a single shard!

// Strategy B: Hashed Sharding for even, uniform write distribution across all shards
// Hashes the deviceId to distribute incoming concurrent writes perfectly
sh.shardCollection(
  "telemetry_db.device_telemetries",
  { deviceId: "hashed" },
  false, // Unique constraint flag
  { numInitialChunks: 10 }
);

// Strategy C: Compound Shard Key (Targeted Queries + Even Distribution)
// Prefix with facilityId for targeted routing, suffix with hashed eventId to avoid hotspots
// sh.shardCollection("telemetry_db.facility_events", { facilityId: 1, eventId: "hashed" });

// 4. Inspect Shard Distribution and Data Placement
use telemetry_db;
db.device_telemetries.getShardDistribution();

// 5. Query execution targeting verification:
// A targeted query (specifying the shard key) routes to ONLY ONE shard!
const targetedExplain = db.device_telemetries.find({ deviceId: "DEV-2026-TX" }).explain();
print("Targeted Query Routing: Shards Contacted = 1");

// A scatter-gather query (omitting shard key) forces mongos to query ALL shards!
const scatterExplain = db.device_telemetries.find({ metric: "temperature" }).explain();
print("Scatter-Gather Query Routing: Contacted All Shards (Expensive!)");
```

---

## Key Concepts

### Sharded Cluster Topology Deconstructed
When datasets exceed single-node disk or RAM boundaries (multi-terabyte scale), MongoDB partitions data horizontally (**Sharding**):
1. **Shards**: Physical Replica Sets holding isolated chunks of the overall collection.
2. **Config Servers**: Specialized replica set maintaining cluster topology metadata and routing tables mapping chunks to shards.
3. **mongos**: Stateless query routing layer. Application drivers connect exclusively to `mongos`, which transparently directs queries to target shards.

### The Monotonic Insert Hotspot Hazard
Selecting a monotonically increasing attribute (such as `createdAt` or standard sequential integers) as a ranged shard key guarantees that 100% of incoming write throughput floods the highest chunk on a single shard. The cluster collapses into a single-node bottleneck while other shards remain idle.

### Hashed Sharding and Query Routing Patterns
- **Hashed Sharding**: Computes an internal hash over the shard key (`{ deviceId: "hashed" }`). Hash distributions guarantee pseudo-random uniformity, dispersing high-throughput writes across all cluster nodes.
- **Targeted vs Scatter-Gather Queries**: Supplying the shard key in the query predicate (`find({ deviceId: "..." })`) enables `mongos` to route requests exclusively to the hosting shard (**Targeted Query**). Omitting the shard key forces `mongos` to broadcast the request to every shard in the cluster (**Scatter-Gather Query**), generating massive network amplification.

---

---

## Beginner Friendly Explanation

Imagine managing 10 massive filing cabinets (10 Shards) with a concierge at the front desk (mongos).
If you file folders strictly by today's date (Ranged Sharding), Cabinet #10 will overflow every single day while Cabinets #1 through #9 sit completely empty.
With Hashed Sharding, folder IDs pass through a mathematical scrambler, distributing incoming files evenly across all 10 cabinets. When looking up a file, if you provide the exact ID, the concierge walks directly to Cabinet #3 (Targeted Query) rather than searching through all 10 cabinets simultaneously (Scatter-Gather).

## Experiments

- Execute sh.status() across a sharded cluster and inspect physical chunk range partitions
- Compare execution plans between a targeted shard key lookup versus a scatter-gather query in explain()
- Observe the automated chunk migration balancer as inserted volumes cross chunk thresholds
- Design and evaluate a Compound Shard Key merging a regional tenant identifier and hashed UUID

---

## Challenge

Architect a sharded collection schema for a messaging system supporting 100M users: select the optimal shard key for `messages` guaranteeing group conversation lookups (`conversationId`) execute as targeted queries.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ MODEL DATA DOKUMEN BSON MONGODB                          │
│                                                          │
│ Koleksi: users                                           │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ {                                                    │ │
│ │   "_id": ObjectId("64f1a2b..."),                     │ │
│ │   "name": "Alex Iskandar",                           │ │
│ │   "profile": { "role": "admin", "verified": true },  │ │
│ │   "tags": ["developer", "golang"],                   │ │
│ │   "orders": [ { "id": "ORD-1", "total": 150000 } ]  │ │
│ │ }                                                    │ │
│ └──────────────────────────────────────────────────────┘ │
│ Mendukung data bersarang (Embedded Document) tanpa Join! │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `db.collection.insertOne({ ... })`
- **Core Functionality:** Insertion of dokumen BSON tunggal.
- **Parameters / Attributes:** `Document Object`.
- **System Behavior & Return:** Persists data dokumen JSON/BSON baru ke dalam koleksi MongoDB..
- **Practical Code Example:**
```javascript
db.products.insertOne({
  name: 'Keyboard Mekanikal',
  price: 1200000,
  tags: ['gaming', 'hardware'],
  inStock: true
});
```
- **Expected Execution Output:**
```text
Dokumen tersimpan dengan _id unik otomatis
```

### 2. `db.collection.find({ query }, { projection })`
- **Core Functionality:** Pencarian dokumen dengan filter deklaratif.
- **Parameters / Attributes:** `Query filters ($eq, $gt, $in), Field projections`.
- **System Behavior & Return:** Retrieves daftar dokumen yang memenuhi kondisi pencarian..
- **Practical Code Example:**
```javascript
db.products.find(
  { price: { $gte: 500000 }, inStock: true },
  { name: 1, price: 1 }
).limit(5);
```
- **Expected Execution Output:**
```text
Mengembalikan maksimal 5 dokumen produk
```

### 3. `db.collection.updateOne({ _id }, { $set: { status: 'paid' } })`
- **Core Functionality:** Update of field dokumen secara atomik.
- **Parameters / Attributes:** `Filter selector, Update operators ($set, $inc, $push)`.
- **System Behavior & Return:** Mengubah field tertentu tanpa menimpa seluruh struktur dokumen yang ada..
- **Practical Code Example:**
```javascript
db.orders.updateOne(
  { orderId: 'ORD-101' },
  { $set: { status: 'completed' }, $currentDate: { updatedAt: true } }
);
```
- **Expected Execution Output:**
```text
Status pesanan berubah menjadi completed
```

### 4. `db.collection.aggregate([ { $match: ... }, { $group: ... } ])`
- **Core Functionality:** Pipeline agregasi multi-tahap analitik.
- **Parameters / Attributes:** `Aggregation stages ($match, $group, $sort)`.
- **System Behavior & Return:** Memproses dan mentransformasi jutaan dokumen menjadi laporan rekapitulasi data cepat..
- **Practical Code Example:**
```javascript
db.orders.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$category', totalSales: { $sum: '$total' } } }
]);
```
- **Expected Execution Output:**
```text
Menghasilkan ringkasan total penjualan per kategori
```

---

## Common Pitfalls & Debugging Tips

### 1. Unbounded Array Document Growth
- **Symptom / Issue:** Document exceeds MongoDB strict 16MB limit as nested arrays grow indefinitely.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Adopt bucketing or reference child documents in separate collections.

### 2. Missing Indexes on High-Frequency Filters
- **Symptom / Issue:** Forces expensive full collection scans (COLLSCAN) burning memory IOPS.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Create compound indexes with `db.collection.createIndex({ field: 1, created: -1 })`.

### 3. Mismatched String vs ObjectId Queries
- **Symptom / Issue:** Queries return zero results because searching string IDs against ObjectId fields.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Convert search input to `new ObjectId(id)` before querying.

---

## Summary

You have mastered MongoDB horizontal scaling: sharded cluster topology (mongos, config servers, shards), write distribution with Hashed Sharding, and Targeted vs Scatter-Gather query mechanics.
