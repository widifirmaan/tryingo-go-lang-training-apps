# BSON Architecture, JSON Schema Validation & Modern CRUD

> **Kategori:** MongoDB | **Level:** BSON Document Foundations & Operational CRUD | **Minggu 1:** BSON Architecture, JSON Schema Validation & Modern CRUD
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand architectural distinctions between human-readable JSON and binary BSON serialization
- Work with native BSON data types: ObjectId, Date, NumberInt, NumberLong, and Decimal128
- Enforce strict server-side schema governance with $jsonSchema validation rules
- Master atomic document mutation operators: $set, $inc, $push, $pull, and $currentDate

---

## Program: Structured Collection Setup with $jsonSchema Validation and Conditional CRUD

```javascript
// MongoDB Shell (mongosh) script
use telemetry_db;

// 1. Drop collection if exists for clean reproducible setup
db.devices.drop();

// 2. Create collection with strict JSON Schema Validation
db.createCollection("devices", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["serialNumber", "deviceType", "status", "firmwareVersion", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        serialNumber: {
          bsonType: "string",
          pattern: "^DEV-[0-9]{4}-[A-Z]{2}$",
          description: "Must match format DEV-YYYY-XX"
        },
        deviceType: {
          enum: ["TEMPERATURE_SENSOR", "PRESSURE_GAUGE", "FLOW_METER", "GATEWAY"],
          description: "Must be a predefined device type"
        },
        status: {
          enum: ["ACTIVE", "MAINTENANCE", "DECOMMISSIONED"],
          description: "Operational status"
        },
        firmwareVersion: {
          bsonType: "string",
          description: "Semver version string"
        },
        batteryLevel: {
          bsonType: "int",
          minimum: 0,
          maximum: 100,
          description: "Battery percentage (0-100)"
        },
        location: {
          bsonType: "object",
          required: ["facilityId", "zone"],
          properties: {
            facilityId: { bsonType: "string" },
            zone: { bsonType: "string" }
          }
        },
        createdAt: { bsonType: "date" }
      }
    }
  },
  validationAction: "error", // Reject invalid documents
  validationLevel: "strict"
});

// 3. Insert valid documents
db.devices.insertMany([
  {
    serialNumber: "DEV-2026-TX",
    deviceType: "TEMPERATURE_SENSOR",
    status: "ACTIVE",
    firmwareVersion: "2.4.1",
    batteryLevel: NumberInt(88),
    location: { facilityId: "FAC-JKT-01", zone: "Cleanroom Alpha" },
    createdAt: new Date()
  },
  {
    serialNumber: "DEV-2026-PX",
    deviceType: "PRESSURE_GAUGE",
    status: "ACTIVE",
    firmwareVersion: "1.9.0",
    batteryLevel: NumberInt(94),
    location: { facilityId: "FAC-JKT-01", zone: "Compressor Room" },
    createdAt: new Date()
  }
]);

// 4. Atomic conditional update using operators ($set, $inc, $currentDate)
db.devices.updateOne(
  { serialNumber: "DEV-2026-TX", status: "ACTIVE" },
  {
    $set: { firmwareVersion: "2.5.0" },
    $inc: { batteryLevel: NumberInt(-3) },
    $currentDate: { lastInspectedAt: true }
  }
);

// 5. Query matching documents with field projection
const activeDevices = db.devices.find(
  { "location.facilityId": "FAC-JKT-01", batteryLevel: { $gt: 50 } },
  { serialNumber: 1, deviceType: 1, batteryLevel: 1, _id: 0 }
).toArray();

printjson(activeDevices);
```

---

## Key Concepts

### The Architecture of BSON vs JSON
While MongoDB is universally conceptualized as a JSON document database, data is internally stored and communicated using **BSON** (*Binary JSON*). Standard text-based JSON suffers from fundamental limitations: it cannot differentiate between 32-bit integers, 64-bit integers, and doubles (flattening them into IEEE-754 numbers), lacks native timestamp types, and incurs expensive text parsing overhead. BSON encodes field lengths and binary type headers, allowing the storage engine to seek across attributes at line rate.

### ObjectId Deconstructed (12-Byte Anatomy)
The standard `_id` is an autonomous 12-byte **ObjectId** composed of:
1. **4-byte Timestamp**: Seconds since the Unix epoch (rendering documents intrinsically time-sortable).
2. **5-byte Random Value**: Unique to the physical process instance and host.
3. **3-byte Incrementing Counter**: Sequential integer incremented per insertion.
This architecture guarantees collision-free global uniqueness without centralized coordination.

### Schema Governance via $jsonSchema Validation
The hazardous misconception that "NoSQL implies schema-free chaos" is dismantled by **$jsonSchema**. MongoDB enables robust collection-level validation rules enforcing types, regular expressions, enum constraints, and mandatory attributes. Documents violating structural invariants are rejected at the storage layer.

### Atomic Mutations with Update Operators
Developers must avoid the classical read-modify-write race condition anti-pattern. Update operators such as `$inc: { batteryLevel: -3 }` or `$set: { status: "ACTIVE" }` evaluate atomically directly inside the storage engine without requiring high-latency application-tier locking.

---

---

## Beginner Friendly Explanation

Think of a JSON document like a handwritten letter. To find a phone number midway down the page, you must read the text line by line.

BSON is like an indexed binder featuring color-coded tab dividers: it instantly reveals where the date, the numeric ledger, and the signature reside without scanning the entire page. Meanwhile, `$jsonSchema` acts like a stern security inspector at the door checking that every mandatory field on your paperwork is signed before accepting it into the archives.

## Experiments

- Attempt inserting a document with a malformed serialNumber and inspect the validation failure diagnostic
- Extract the intrinsic creation timestamp from an ObjectId using doc._id.getTimestamp()
- Apply $push and $pull operators to modify an array of device maintenance logs
- Experiment with findOneAndUpdate() specifying returnDocument: "after" to retrieve post-mutation states

---

## Challenge

Extend the $jsonSchema validation rules: mandate an embedded `sensors` array of objects containing `sensorType` and `calibrationDate`, requiring at least one element (`minItems: 1`).

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

You have mastered BSON storage mechanics, ObjectId anatomy, server-side data governance via $jsonSchema validation, and atomic document mutations using native operators.
