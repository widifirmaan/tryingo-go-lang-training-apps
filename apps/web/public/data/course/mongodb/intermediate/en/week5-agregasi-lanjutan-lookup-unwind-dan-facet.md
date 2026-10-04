# Advanced Aggregation: $lookup, $unwind & $facet

> **Kategori:** MongoDB | **Level:** Advanced Aggregation, Replication & Sharding Scalability | **Minggu 5:** Advanced Aggregation: $lookup, $unwind & $facet
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master cross-collection joins utilizing $lookup with sub-pipelines (let clauses and $expr)
- Flatten and destructure embedded array elements into distinct documents with $unwind
- Execute parallel multi-faceted reporting in a single database pass using $facet
- Categorize numeric distributions into bucketed frequency histograms using $bucket

---

## Program: Multi-Collection Joins with $lookup Pipelines and Multi-Faceted Analytics via $facet

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

// Multi-Collection Join using modern $lookup with custom pipeline
const complexPipeline = [
  // Match active industrial facilities
  { $match: { _id: "FAC-JKT-01" } },

  // Stage: Correlated $lookup joining telemetry readings
  {
    $lookup: {
      from: "telemetries",
      let: { facility_id: "$_id" },
      pipeline: [
        // Sub-pipeline inside the joined collection
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$type", "TEMP"] },
                { $gte: ["$value", 25.0] } // Alerting threshold
              ]
            }
          }
        },
        { $sort: { timestamp: -1 } },
        { $limit: 3 }
      ],
      as: "criticalReadings"
    }
  },

  // Stage: $unwind array to process emergency contacts individually
  { $unwind: "$emergencyContacts" },

  // Stage: Multi-Faceted Analytics ($facet allows multiple independent pipelines in one pass!)
  {
    $facet: {
      // Facet A: Contact Distribution by Role
      "contactsByRole": [
        {
          $group: {
            _id: "$emergencyContacts.role",
            count: { $sum: 1 },
            contactNames: { $push: "$emergencyContacts.name" }
          }
        }
      ],
      // Facet B: Overall Facility Incident Summary
      "incidentOverview": [
        {
          $project: {
            facilityName: "$name",
            highTempAlertsCount: { $size: "$criticalReadings" },
            hasEmergencyLead: {
              $cond: {
                if: { $regexMatch: { input: "$emergencyContacts.role", regex: /Manager/i } },
                then: true,
                else: false
              }
            }
          }
        }
      ]
    }
  }
];

const facetedReport = db.facilities.aggregate(complexPipeline).toArray();
printjson(facetedReport);
```

---

## Key Concepts

### Expressive $lookup with Sub-Pipelines
In legacy MongoDB releases, `$lookup` merely executed basic equality matches between `localField` and `foreignField`. Modern MongoDB introduces expressive `$lookup` pipelines pairing `let` bindings with nested `pipeline` arrays. This allows filtering, sorting, and slicing foreign collection records *prior* to joining them to the root document, preventing in-memory memory bloat.

### Destructuring Arrays via $unwind
When a document contains an array `emergencyContacts: [A, B, C]`, executing `$unwind: "$emergencyContacts"` emits three distinct clone documents, each holding one isolated contact item. This unlocks the ability to perform deep `$group` aggregations and mathematical operations across array elements.

### Multi-Faceted Analysis with $facet
Modern search and analytics dashboards simultaneously render disparate faceted panels: category breakdowns, price distribution histograms, and customer rating distributions. Executing separate queries generates network churn and multiple disk scans. The `$facet` stage executes multiple parallel aggregation sub-pipelines within a single unified pass over the working dataset.

---

---

## Beginner Friendly Explanation

Imagine shopping at an online shoe store.
$lookup is like sending a stock clerk to the back warehouse to fetch matching shoeboxes.
$unwind is like taking a multi-pack bundle containing 3 pairs of socks and laying them out side-by-side on the table.
$facet is like glancing at the storefront window once and simultaneously counting three distinct metrics: 'How many red shoes exist, how many cost under $50, and how many are manufactured by Nike'.

## Experiments

- Incorporate preserveNullAndEmptyArrays: true inside $unwind and observe documents holding empty arrays
- Apply the $bucketAuto stage to partition temperature readings into 4 automatic percentile buckets
- Utilize the $size operator on $lookup results to count joined elements without requiring an unwind pass
- Trigger the 100MB aggregation memory ceiling and verify resolution using allowDiskUse: true

---

## Challenge

Build a production faceted product search pipeline: take a search query, and use `$facet` to output (1) the top 10 paginated products, (2) brand distribution with item counts, and (3) global min-max price ranges.

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

You have mastered advanced MongoDB aggregation: expressive cross-collection $lookup sub-pipelines, array destructuring with $unwind, and parallel multi-dimensional analytics via $facet.
