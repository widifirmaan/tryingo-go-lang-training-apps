# Multi-Document ACID Transactions & Write Concern

> **Kategori:** MongoDB | **Level:** Advanced Aggregation, Replication & Sharding Scalability | **Minggu 6:** Multi-Document ACID Transactions & Write Concern
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master multi-document ACID transaction lifecycles (startTransaction, commitTransaction, abortTransaction)
- Differentiate Write Concern durability guarantees: w: 1, w: "majority", and wtimeout parameters
- Configure Read Concern levels (local, majority, linearizable, snapshot) and Read Preferences (primary, secondaryPreferred)
- Assess multi-document transaction performance costs and understand when to favor embedded document paradigms

---

## Program: Cross-Facility Device Ownership Transfer Using Multi-Document Session Transactions

```javascript
// MongoDB Client Session & Multi-Document ACID Transaction
// Note: Requires Replica Set or Sharded Cluster topology
const session = db.getMongo().startSession();

// Configure strict transaction options
const transactionOptions = {
  readPreference: 'primary',
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority', wtimeout: 5000 } // Majority quorum durability
};

try {
  session.startTransaction(transactionOptions);

  const devicesColl = session.getDatabase("telemetry_db").devices;
  const facilitiesColl = session.getDatabase("telemetry_db").facilities;
  const auditColl = session.getDatabase("telemetry_db").device_transfers_audit;

  const targetDeviceId = "DEV-2026-TX";
  const sourceFacilityId = "FAC-JKT-01";
  const destFacilityId = "FAC-BDG-02";

  // Step 1: Verify device belongs to source facility and deduct count
  const sourceUpdate = facilitiesColl.updateOne(
    { _id: sourceFacilityId, activeDevicesCount: { $gt: 0 } },
    { $inc: { activeDevicesCount: -1 } },
    { session }
  );

  if (sourceUpdate.matchedCount === 0) {
    throw new Error("Source facility has no active devices or does not exist.");
  }

  // Step 2: Reassign device location
  const deviceUpdate = devicesColl.updateOne(
    { serialNumber: targetDeviceId, "location.facilityId": sourceFacilityId },
    { 
      $set: { 
        "location.facilityId": destFacilityId,
        "location.zone": "Staging Area" 
      } 
    },
    { session }
  );

  if (deviceUpdate.matchedCount === 0) {
    throw new Error("Device not found at designated source facility.");
  }

  // Step 3: Increment destination facility count
  facilitiesColl.updateOne(
    { _id: destFacilityId },
    { $inc: { activeDevicesCount: 1 } },
    { session }
  );

  // Step 4: Write audit journal
  auditColl.insertOne(
    {
      deviceId: targetDeviceId,
      fromFacility: sourceFacilityId,
      toFacility: destFacilityId,
      transferredAt: new Date(),
      status: "COMPLETED"
    },
    { session }
  );

  // Commit all mutations atomically across collections
  session.commitTransaction();
  print("Transaction successfully committed with majority quorum.");
} catch (error) {
  print("Transaction aborted due to error: " + error.message);
  session.abortTransaction();
} finally {
  session.endSession();
}
```

---

## Key Concepts

### Multi-Document ACID Transactions
Since MongoDB 4.0 (Replica Sets) and 4.2 (Sharded Clusters), MongoDB provides full **multi-document ACID transactions**. Historically, atomicity was constrained to individual document boundaries. Leveraging a `ClientSession`, distinct operations spanning disparate collections evaluate atomically: either every modification succeeds, or the entire batch rolls back via `abortTransaction`.

### Durability Guarantees with Write Concern
**Write Concern** governs acknowledgment semantics required before MongoDB acknowledges a write operation as successful:
- `w: 1`: Confirmed once written to the Primary node in-memory journal. Fast, but primary crashes prior to replication risk rollbacks.
- `w: "majority"`: Requires verification that the write has been durably recorded across a strict quorum majority of replica set nodes (e.g. 2 of 3 nodes). Guarantees failover survival.
- `wtimeout`: Timeout safeguard preventing threads from blocking indefinitely during network partitioning.

### Read Concern and Read Preference Dynamics
- **Read Preference**: Dictates cluster routing destinations (`primary` for strict read-your-writes consistency, `secondaryPreferred` to offload analytical workloads to read replicas).
- **Read Concern**:
  - `local`: Returns node-local data without validating replica quorum consensus.
  - `majority`: Guarantees inspected records have achieved quorum durability and cannot be rolled back.
  - `snapshot`: Enforces isolated point-in-time snapshot visibility throughout multi-document transactions.

---

---

## Beginner Friendly Explanation

Think of a multi-document transaction like a courier delivering three linked legal agreements to three distinct offices. The courier follows a strict protocol: if any office rejects their document, the courier immediately retrieves the other two agreements, voiding the entire transaction without leaving a trace.

Write Concern `w: majority` is like requiring physical counter-signatures from a majority of boardroom members before authorizing an asset transfer, rather than trusting the word of a single security guard.

## Experiments

- Intentionally throw an exception at stage 3 and verify that stages 1 and 2 roll back cleanly
- Benchmark write operations with Write Concern w: "majority" against local replica nodes to observe confirmation latencies
- Simulate network timeouts by enforcing wtimeout: 10 and observe the resulting WriteConcernError
- Perform queries directed to secondary replica members utilizing Read Preference secondaryPreferred

---

## Challenge

Build a peer-to-peer loyalty points transfer engine: enforce multi-document transactions, validate non-negative balance checks, and implement automated transient error retry handling.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered multi-document ACID transactions, quorum durability with Write Concern, and consistency tuning via Read Concern and Read Preferences in MongoDB.
