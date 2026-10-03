# Aggregation Framework: $match, $group, $project & $sort

> **Kategori:** MongoDB | **Level:** BSON Document Foundations & Operational CRUD | **Minggu 4:** Aggregation Framework: $match, $group, $project & $sort
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand stream-based data transformation in the MongoDB Aggregation Framework
- Construct foundational aggregation stages: $match, $group, $project, $sort, and $limit
- Perform accumulator computations: $sum, $avg, $max, $min, $round, and $subtract
- Apply conditional expression operators like $cond for dynamic document branching

---

## Program: Device Metric Aggregation Pipeline: Averages, Maximum Temperature, and Health Status

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

// Clean and seed realistic telemetry stream
db.telemetries.drop();

db.telemetries.insertMany([
  { deviceId: "DEV-01", type: "TEMP", value: 24.5, battery: 80, timestamp: new Date("2026-03-10T08:00:00Z") },
  { deviceId: "DEV-01", type: "TEMP", value: 28.2, battery: 78, timestamp: new Date("2026-03-10T09:00:00Z") },
  { deviceId: "DEV-01", type: "TEMP", value: 31.0, battery: 75, timestamp: new Date("2026-03-10T10:00:00Z") },
  { deviceId: "DEV-02", type: "TEMP", value: 19.8, battery: 95, timestamp: new Date("2026-03-10T08:30:00Z") },
  { deviceId: "DEV-02", type: "TEMP", value: 20.4, battery: 93, timestamp: new Date("2026-03-10T09:30:00Z") },
  { deviceId: "DEV-03", type: "VIBRATION", value: 0.05, battery: 40, timestamp: new Date("2026-03-10T08:00:00Z") }
]);

// Analytical Aggregation Pipeline
const pipeline = [
  // Stage 1: Filter temperature readings strictly ($match utilizes indexes!)
  {
    $match: {
      type: "TEMP",
      timestamp: {
        $gte: new Date("2026-03-10T00:00:00Z"),
        $lte: new Date("2026-03-10T23:59:59Z")
      }
    }
  },

  // Stage 2: Group by deviceId and calculate mathematical aggregates
  {
    $group: {
      _id: "$deviceId",
      readingsCount: { $sum: 1 },
      avgTemperature: { $avg: "$value" },
      maxTemperature: { $max: "$value" },
      minTemperature: { $min: "$value" },
      latestBatteryLevel: { $last: "$battery" }
    }
  },

  // Stage 3: Project transformed output fields and conditional health evaluation
  {
    $project: {
      _id: 0,
      deviceId: "$_id",
      totalSamples: "$readingsCount",
      avgTempCelsius: { $round: ["$avgTemperature", 2] },
      peakTempCelsius: "$maxTemperature",
      tempSpread: { $round: [{ $subtract: ["$maxTemperature", "$minTemperature"] }, 2] },
      batteryRemaining: "$latestBatteryLevel",
      operationalStatus: {
        $cond: {
          if: { $gte: ["$maxTemperature", 30.0] },
          then: "WARNING_OVERHEAT",
          else: "OPTIMAL"
        }
      }
    }
  },

  // Stage 4: Sort descending by peak temperature
  {
    $sort: { peakTempCelsius: -1 }
  }
];

const results = db.telemetries.aggregate(pipeline).toArray();
printjson(results);
```

---

## Key Concepts

### The Aggregation Assembly Pipeline Paradigm
The **Aggregation Framework** models an industrial assembly line. Collections flow sequentially through successive pipeline *stages*. Each stage consumes an incoming document stream, executes specific filters or geometric transformations, and yields a mutated stream to the succeeding stage.

### Early Filtering with $match
The `$match` stage selects documents satisfying explicit query predicates. Placing `$match` as the **first stage** in any pipeline is a mandatory optimization axiom: it enables the query planner to leverage B-Tree indexes (IXSCAN) at the collection boundary, discarding millions of irrelevant records before memory-heavy stages like `$group` execute.

### The $group Stage and Accumulators
The `$group` stage groups incoming documents by an expression specified in `_id` (e.g. `_id: "$deviceId"`). Inside `$group`, accumulators calculate aggregate dimensions:
- `$sum: 1`: Counts matching instances (equivalent to SQL `COUNT(*)`).
- `$avg: "$value"`: Computes exact arithmetic averages.
- `$first` and `$last`: Preserves initial or final state values.

### Projections and Conditional Expressions with $cond
The `$project` stage reshapes the output envelope: suppressing unwanted attributes (`_id: 0`), computing mathematical derivatives (`$subtract`, `$round`), and applying conditional ternary branching using `$cond: { if: ..., then: ..., else: ... }` to generate contextual business alerts.

---

---

## Beginner Friendly Explanation

Imagine an automated apple packaging plant.
Stage 1 ($match): Sorters reject anything that isn't an apple (only apples proceed down the conveyor).
Stage 2 ($group): Apples are sorted into crates by orchard origin, weighed for average size ($avg), and inspected for the heaviest specimen ($max).
Stage 3 ($project): Crates receive printed labels: if an apple exceeds 300 grams, stamp a 'Grade A Luxury' badge on the crate ($cond).
Stage 4 ($sort): Crates are stacked into delivery trucks ordered from heaviest to lightest.

## Experiments

- Relocate $project prior to $group and observe how field shedding affects accumulator calculations
- Apply the $round operator to constrain average temperature calculations to one decimal precision
- Experiment with the $push accumulator inside $group to aggregate raw readings into an embedded array
- Run explain() on the pipeline to verify that the initial $match stage is satisfied via an Index Scan

---

## Challenge

Craft an aggregation pipeline measuring battery depletion rate: calculate the delta between the earliest recorded battery level (`$first`) and latest recorded level (`$last`) per device over a 24-hour window.

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

You have mastered foundational Aggregation Framework concepts: pipeline stage sequencing, early $match index utilization, $group accumulator arithmetic, $project reshaping, and $cond branching.
