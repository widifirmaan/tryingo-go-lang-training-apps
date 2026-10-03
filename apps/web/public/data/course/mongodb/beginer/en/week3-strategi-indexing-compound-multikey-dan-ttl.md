# Indexing: Compound, Multikey, TTL & explain("executionStats")

> **Kategori:** MongoDB | **Level:** BSON Document Foundations & Operational CRUD | **Minggu 3:** Indexing: Compound, Multikey, TTL & explain("executionStats")
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the fundamental ESR Rule (Equality, Sort, Range) for compound index ordering
- Understand Multikey Index mechanics when indexing array values in BSON documents
- Automate data lifecycle retention using TTL (Time-To-Live) auto-expiring indexes
- Interpret explain("executionStats") telemetry: IXSCAN vs COLLSCAN and nReturned to totalDocsExamined ratios

---

## Program: Compound ESR Indexing, TTL Auto-Expire, and ExecutionStats Profiling

```javascript
// MongoDB Shell (mongosh)
use telemetry_db;

db.device_events.drop();

// 1. Create realistic events collection
db.device_events.insertMany([
  {
    facilityId: "FAC-JKT-01",
    severity: "CRITICAL",
    tags: ["network", "hardware", "firmware"],
    eventCode: "DISCONNECT",
    createdAt: new Date(),
    expireAt: new Date(Date.now() + 3600 * 1000) // 1 hour from now
  },
  {
    facilityId: "FAC-JKT-01",
    severity: "INFO",
    tags: ["heartbeat"],
    eventCode: "PING",
    createdAt: new Date(),
    expireAt: new Date(Date.now() + 3600 * 1000)
  }
]);

// 2. Compound Index adhering strictly to the ESR Rule:
// Equality: facilityId
// Sort: createdAt (-1)
// Range: severity
db.device_events.createIndex(
  { facilityId: 1, createdAt: -1, severity: 1 },
  { name: "idx_facility_created_severity" }
);

// 3. Multikey Index: Indexing array fields (tags)
db.device_events.createIndex(
  { tags: 1 },
  { name: "idx_event_tags_multikey" }
);

// 4. TTL Index (Time-To-Live): MongoDB background thread automatically purges expired documents
db.device_events.createIndex(
  { expireAt: 1 },
  { expireAfterSeconds: 0, name: "idx_auto_purge_ttl" }
);

// 5. Query execution profiling using executionStats
const explainStats = db.device_events.find({
  facilityId: "FAC-JKT-01",
  severity: "CRITICAL"
})
.sort({ createdAt: -1 })
.explain("executionStats");

print("--- EXPLAIN EXECUTION METRICS ---");
print("Execution Stage: " + explainStats.executionStats.executionStages.stage);
print("Total Documents Examined: " + explainStats.executionStats.totalDocsExamined);
print("Total Keys Examined: " + explainStats.executionStats.totalKeysExamined);
print("nReturned: " + explainStats.executionStats.nReturned);
```

---

## Key Concepts

### The Golden Standard: The ESR Rule
When designing compound indexes in MongoDB, key ordering dictates performance. Follow the **ESR Rule (Equality, Sort, Range)**:
1. **Equality (E)**: Position attributes matched via exact equality predicates (`facilityId: "FAC-JKT-01"`) at the forefront.
2. **Sort (S)**: Place fields governing the sort ordering (`sort({ createdAt: -1 })`) in the middle, allowing the engine to traverse index leaf nodes in pre-sorted order, eliminating expensive in-memory sort stages.
3. **Range (R)**: Append range operators (`$gt`, `$lt`, `$in`) at the final position.

### Multikey Indexes on BSON Arrays
Indexing an array attribute (e.g. `tags: ["network", "hardware"]`) causes MongoDB to instantiate a **Multikey Index**. The engine creates distinct B-Tree leaf entries for every element in the array, making array queries like `{ tags: "hardware" }` instantaneous. *Constraint*: Compound indexes cannot contain more than one array field.

### TTL (Time-To-Live) Lifecycle Automation
Telemetries and session tokens often outlive operational utility within days. Executing application-driven `deleteMany()` jobs consumes high write locks and CPU. A **TTL Index** (`expireAfterSeconds: 0`) delegates deletion to an internal background thread waking every 60 seconds to automatically prune documents whose date attributes have expired.

### Interpreting explain("executionStats")
- `COLLSCAN`: Full collection scan reading every block from disk. Detrimental at scale.
- `IXSCAN`: Index scan traversing the B-Tree keys.
- `Selectivity Ratio`: If `totalDocsExamined == nReturned`, your index achieves ideal selectivity. If `totalDocsExamined` hits 10,000 while `nReturned` is 2, index coverage is broken.

---

---

## Beginner Friendly Explanation

Imagine searching for a contact in a phone book. The book is sorted alphabetically (a B-Tree Index).

If the phone book had no alphabetical sorting (COLLSCAN), you would have to read every single name from page 1 to the end. A TTL Index is like a self-destructing secret memo in a spy movie: a miniature hourglass counts down, and when time expires, the page quietly disintegrates on its own without manual shredding!

## Experiments

- Compare executionStats before and after index creation and inspect the variance in totalDocsExamined
- Insert a document with an expireAt timestamp set 10 seconds ahead and witness automated TTL purge
- Violate the ESR rule by swapping Sort and Range positions, observing whether an in-memory SORT stage appears
- Construct a partial index leveraging partialFilterExpression to index strictly severity: "CRITICAL" events

---

## Challenge

Construct a Text Index across `title` and `description` with weighted scoring (`weights`), executing a `$text` query ordered by relevance score via `$meta: "textScore"`.

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

You have mastered the ESR compound indexing framework, Multikey array indexes, automated data retention with TTL indexes, and query execution diagnostics via explain("executionStats").
