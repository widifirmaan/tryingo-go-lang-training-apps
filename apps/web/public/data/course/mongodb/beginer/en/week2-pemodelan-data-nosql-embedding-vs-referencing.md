# NoSQL Data Modeling: Embedding vs Referencing

> **Kategori:** MongoDB | **Level:** BSON Document Foundations & Operational CRUD | **Minggu 2:** NoSQL Data Modeling: Embedding vs Referencing
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master architectural decision frameworks: When to Embed vs When to Reference
- Prevent the catastrophic Unbounded Array Growth anti-pattern (16MB BSON document limit)
- Implement the Subset Pattern combining $push modifiers with $slice and $sort
- Leverage selective denormalization to eliminate high-frequency join round trips

---

## Program: Implementation of the Subset Design Pattern and Selective Denormalization

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

db.facilities.drop();
db.sensor_readings.drop();

// Pattern 1: Embedded Pattern (One-to-Few relationship, bounded growth)
// Facility contains its core configuration and contact details directly
db.facilities.insertOne({
  _id: "FAC-JKT-01",
  name: "Jakarta Datacenter Tier-3",
  address: {
    street: "Jl. TB Simatupang No. 18",
    city: "Jakarta Selatan",
    country: "ID"
  },
  // Embedded contacts (bounded array: rarely exceeds 3-5 contacts)
  emergencyContacts: [
    { name: "Bambang Wijaya", role: "Facility Manager", phone: "+62811223344" },
    { name: "Ratna Sari", role: "Chief Security Officer", phone: "+62811556677" }
  ],
  // Subset Pattern: Keep only the 5 most recent alerts for instant UI rendering
  recentAlerts: [
    { code: "OVERHEAT", severity: "CRITICAL", timestamp: new Date("2026-03-10T08:30:00Z") },
    { code: "VOLT_DROP", severity: "WARNING", timestamp: new Date("2026-03-10T09:15:00Z") }
  ],
  totalAlertsCount: 1420 // Denormalized counter
});

// Pattern 2: Referenced Pattern (One-to-Many / One-to-Millions unbounded relationship)
// Massive stream of sensor readings stored in a separate collection referencing facility
db.sensor_readings.insertMany([
  {
    facilityId: "FAC-JKT-01", // Reference link
    deviceId: "DEV-2026-TX",
    metric: "temperature",
    value: 23.8,
    unit: "CELSIUS",
    timestamp: new Date("2026-03-10T10:00:00Z")
  },
  {
    facilityId: "FAC-JKT-01",
    deviceId: "DEV-2026-TX",
    metric: "temperature",
    value: 24.1,
    unit: "CELSIUS",
    timestamp: new Date("2026-03-10T10:01:00Z")
  }
]);

// Atomic append to recentAlerts while keeping the subset array capped at 5 items using $slice
db.facilities.updateOne(
  { _id: "FAC-JKT-01" },
  {
    $push: {
      recentAlerts: {
        $each: [{ code: "DOOR_OPEN", severity: "INFO", timestamp: new Date() }],
        $sort: { timestamp: -1 },
        $slice: 5 // Retain only latest 5 entries!
      }
    },
    $inc: { totalAlertsCount: 1 }
  }
);

// Inspect facility document
printjson(db.facilities.findOne({ _id: "FAC-JKT-01" }));
```

---

## Key Concepts

### The Golden Rule: Embedding vs Referencing
The foundational axiom of document data modeling is: **Data that is accessed together should be stored together**.
- **Embedding (Denormalized)**: Best suited for *One-to-One* or *One-to-Few* bounded relationships (e.g. shipping addresses, emergency contacts). Guarantees single-seek read performance without multi-collection joins.
- **Referencing (Normalized)**: Essential for *One-to-Squillions* unbounded relationships (e.g. streaming sensor telemetries). Storing unbounded arrays within a single document quickly breaches MongoDB's hard **16MB BSON document limit**.

### The Subset Pattern and $slice Modifiers
While historical events can scale into millions, operational dashboards exclusively present the most recent 5 to 10 alerts. The **Subset Pattern** embeds the top 5 recent events directly into the parent document while persisting full telemetry in a dedicated collection. Utilizing `$push: { $each: [...], $sort: { timestamp: -1 }, $slice: 5 }` guarantees the embedded array remains strictly capped at 5 elements.

### Selective Denormalization
Instead of triggering an expensive `count()` scan across millions of child documents on every dashboard load, applications selectively denormalize a counter `totalAlertsCount` in the parent document, updating it atomically using `$inc: { totalAlertsCount: 1 }`.

---

---

## Beginner Friendly Explanation

Imagine a hospital patient's physical chart. Blood type, home address, and emergency contact numbers belong directly on the binder cover (Embedding) because they are compact and needed instantly during emergencies.

However, 10 years of daily laboratory blood test results cannot be crammed into that same folder cover; the physical binder would burst its seams (the 16MB limit). Daily logs are filed in dedicated archives referenced by the patient's ID number (Referencing).

## Experiments

- Execute the update statement repeatedly and confirm recentAlerts strictly caps at 5 entries
- Utilize Object.bsonsize(db.facilities.findOne()) to inspect the actual byte footprint of the BSON document
- Simulate a payload exceeding the 16MB threshold to observe the BSON size limit exception
- Benchmark response latency of a single embedded document read versus two sequential relational lookups

---

## Challenge

Architect an e-commerce schema using the Extended Reference Pattern: an `orders` collection referencing `customerId` while embedding a static snapshot of customer name, email, and loyalty tier at order creation time.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Core Functionality:** Relational schema definition.
- **Parameters / Attributes:** `Column names, Data types, Constraints (PK/FK/NOT NULL)`.
- **System Behavior & Return:** Constructs strongly typed database tables with guaranteed relational integrity.
- **Practical Code Example:**
```javascript
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  balance NUMERIC(10, 2) DEFAULT 0.00
);
```
- **Expected Execution Output:**
```text
Initializes accounts table ready for ACID transactions
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Core Functionality:** Declarative relational data retrieval.
- **Parameters / Attributes:** `Column list, Filter predicates, Ordering, Paging limit`.
- **System Behavior & Return:** Fetches matching database records with predictable execution plan optimization.
- **Practical Code Example:**
```javascript
SELECT id, email, balance FROM accounts WHERE balance > 0 ORDER BY balance DESC LIMIT 5;
```
- **Expected Execution Output:**
```text
Returns top 5 funded customer accounts
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Core Functionality:** Atomic record insertion with immediate return.
- **Parameters / Attributes:** `Columns, Insert values, RETURNING clause`.
- **System Behavior & Return:** Persists new row data and returns computed primary keys or defaults without an extra query.
- **Practical Code Example:**
```javascript
INSERT INTO accounts (email) VALUES ('dev@tryngo.com') RETURNING id;
```
- **Expected Execution Output:**
```text
Returns newly allocated UUID primary key
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Core Functionality:** Multi-table relational join.
- **Parameters / Attributes:** `Table identifiers, ON match predicate`.
- **System Behavior & Return:** Correlates rows across related tables matching foreign key references.
- **Practical Code Example:**
```javascript
SELECT a.email, t.amount FROM accounts a INNER JOIN transactions t ON a.id = t.account_id;
```
- **Expected Execution Output:**
```text
Consolidates account holders with their transaction history
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

You have mastered NoSQL data modeling: Embedding vs Referencing trade-offs, 16MB BSON limit defense, Subset Pattern via $slice, and selective denormalization.
