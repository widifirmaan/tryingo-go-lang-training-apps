# Update & Delete — Edit and Discard Cards

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 2:** Update & Delete
> **Prerequisites:** Week 1 — **Documents & CRUD**.

## Learning Objectives

- `updateOne({name:"Rice"}, {$set:{price:65000}})` edits 1, `updateMany` edits many
- `$inc: { stock: -1 }` add/subtract, `$push` appends to array
- `deleteOne`, `deleteMany`, `findOneAndUpdate` grabs & edits at once
- `upsert: true` creates when missing

---

## Why This Matters (Non-IT)

Prices rise, stock drops 1 per sale — must edit cards, not create new ones.

---

## Program

```javascript
// Change Spinach price
db.products.updateOne({ name: "Spinach" }, { $set: { price: 6000 } })

// Add +5 stock to all Staples
db.products.updateMany({ category: "Staples" }, { $inc: { stock: 5 } })

// Append tag array
db.products.updateOne({ name: "Rice 5kg" }, { $push: { tag: "promo" } })

// Delete zero-stock
db.products.deleteMany({ stock: 0 })

// Upsert: update when present, insert when missing
db.products.updateOne({ name: "Coffee" }, { $set: { price: 12000 } }, { upsert: true })

// Grab & edit
db.products.findOneAndUpdate({ name: "Sugar" }, { $inc: { stock: -1 } }, { returnDocument: "after" })
```

---

## Key Concepts

### `$set`/`$inc`/`$push`
`$set` replaces, `$inc` adds, `$push` appends into arrays.

### `upsert` = Update or Insert
When `name:"Coffee"` is missing, creates new.

---

## Beginner Friendly Explanation

### Analogy: Eraser & Pen on Cards
- **$set = eraser + pen**: erase price, write new. **$inc = tally counter**: click -1 per sale.

### Step 0 — Prepare Device
- Same as W1: Compass/`mongosh` + `products` collection from W1.

### How the Computer Reads It
1. `updateOne({name}, {$set})` → finds first match → edits fields.
2. `upsert: true` + no match → inserts combined document.

### 3 Must-Know Terms
1. **update/delete/upsert**: edit/discard/create-if-missing

---

## Experiments

- **Green:** `$inc: { stock: -1 }` twice → stock drops 2?
- **Yellow:** `upsert` on existing → updates (no duplicate)?
- **Red:** `deleteMany({})` empty filter → deletes ALL? Never on real data!

---

## Challenge

**Stock Opname:** Sell 3 items (`$inc: -1` each) + 1 price change (`$set`) + delete empties (`deleteMany stock 0`).
- **Link-up (Week 1 — Documents & CRUD):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **update/$set/$inc**: edit/replace/tally

---

## Summary

Week 2: **Edit & Delete** — cards editable, stock decrements. Next: **Index**.
