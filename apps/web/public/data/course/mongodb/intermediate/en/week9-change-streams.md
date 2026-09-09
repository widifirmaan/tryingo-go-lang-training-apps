# Change Streams & Transactions — MongoDB Live Eyes & Safe Packages

> **Kategori:** MongoDB | **Level:** Intermediate | **Minggu 9:** Change Streams & Transactions
> **Prerequisites:** Week 8 — **Performance & Tuning**.

## Learning Objectives

- `watch()` hears every write (for live/notifications) — needs a replica set! (source: mongodb.com/docs/manual/changeStreams)
- `session.withTransaction()` all-or-nothing package for multi-documents

---

## Why This Matters (Non-IT)

Stock decrement + order add must go together (1 fails = all cancelled). Without transactions, stock drops but the order fails → mismatch! Change streams power live dashboards without per-second polling.

---

## Program: Listen & Safe Packages

```javascript
// 1. Listen (needs a replica set, W7!)
const stream = db.products.watch([{ $match: { operationType: "update" } }]);
// (in Node driver: stream.on("change", c => console.log(c.fullDocument)))

// Test: update 1 product in another shell → stream receives!

// 2. Safe package (multi-document transaction)
const session = db.getMongo().startSession();
session.startTransaction();
try {
  db.products.updateOne({ name: "Rice" }, { $inc: { stock: -2 } }, { session });
  db.orders.insertOne({ product: "Rice", qty: 2 }, { session });
  session.commitTransaction(); // validate both
} catch (e) {
  session.abortTransaction();  // cancel both!
}
session.endSession();
```

---

## Key Concepts

### `watch()` = Live Eyes
Hears insert/update/delete in real time. Needs a replica set (oplog).

### Transaction = Cancel-Together Package
`startTransaction` → write 2 places → `commit` (validate) / `abort` (cancel all).

---

## Beginner Friendly Explanation

### Analogy: CCTV & Bank Package
- **Change stream = CCTV**: movement → sound.
- **Transaction = bank transfer**: debit+credit 1 package.

### Step 0 — Prepare Device
- Replica set from W7 running + `mongosh` second shell for the trigger write.

### How the Computer Reads It
1. Write happens → oplog entry → `watch()` cursor emits change doc.
2. `abortTransaction()` → both writes vanish as if never happened.

### 3 Must-Know Terms
1. **watch/oplog**: eyes/log
2. **commit/abort**: validate/cancel

---

## Experiments

- **Green:** `watch()` + manual update → received?
- **Yellow:** Deliberately fail transaction → both places cancelled?
- **Red:** `watch` on standalone (no replica) → error? (Needs W7!)

---

## Challenge

**Safe Live Shop:** `watch()` dashboard counter + transaction sell (decrement + order) + failed-transaction proof.

---

## Mini Glossary

- **watch/transaction**: eyes/package

---

## Summary

Week 9 of 10: **Live Eyes** (Level: Intermediate). Real-time + safe. Next: **Capstone**.
