# Documents & CRUD — Flexible Cards

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 1:** Dokumen & CRUD

## Learning Objectives

- Understand MongoDB = **flexible card boxes** (JSON), not rigid SQL racks — each card can have different fields
- `db.products.insertOne({ name: "Rice", price: 62000 })` inserts a card
- `find()`, `findOne()`, `find({ category: "Staples" })` filters, `countDocuments()`
- Auto `_id` like a card ID

---

## Why This Matters (Non-IT)

Shop product cards sometimes have `stock`, sometimes not. SQL must fill every column, Mongo is **free** — card 1 has `color`, card 2 doesn't, no error. Perfect for ever-changing catalogs.

---

## Program: Mongo Cards

Run in **MongoDB Compass** or `mongosh` (or `onecompiler.com/mongodb`).

```javascript
// Create products collection (auto if missing)
db.products.insertOne({ name: "Rice 5kg", price: 62000, stock: 10, category: "Staples" })
db.products.insertMany([
  { name: "Spinach", price: 5000, stock: 20, category: "Veggies" },
  { name: "Eggs", price: 28000, stock: 15 },
  { name: "Sugar", price: 15000, category: "Staples" } // no stock, allowed!
])

// View
db.products.find() // all cards
db.products.find({ category: "Staples" }) // filter
db.products.findOne({ name: "Spinach" }) // 1 card
db.products.countDocuments() // count
db.products.find({}, { name: 1, price: 1, _id: 0 }) // only 2 columns

// Fuzzy find
db.products.find({ name: /ric/i }) // regex: contains "ric"
```

**No install:** `mongodb.com` → Atlas Free → Connect → Compass, or `onecompiler.com`.

---

## Key Concepts

### Document = JSON Card
`{ name: "Rice", price: 62000 }` — each card free fields.

### Collection = Card Box
`db.products` box holding many cards. `insertOne/Many`, `find()`.

### `_id` = Auto ID
Mongo creates `_id: ObjectId("...")` when unfilled.

---

## Beginner Friendly Explanation

### Analogy: Shop Card Box

- **SQL = rigid rack**: every row must fill all columns.
- **Mongo = card box**: card 1 has `stock`, card 2 doesn't — fine.

### Step 0 — Prepare Device
- Atlas Free account + Compass (or `mongosh`), paste commands one by one.

### How the Computer Reads It
1. `insertOne({...})` → Mongo stamps `_id` → card stored.
2. `find({ category: "Staples" })` → scans box, returns matches.

### 3 Must-Know Terms
1. **Document/collection/_id**: card/box/ID

---

## Experiments

- **Green:** `insertOne({ name: "Coffee", price: 12000 })` → `find({ name: "Coffee" })`?
- **Yellow:** `find({ price: { $gt: 10000 } })` → prices >10k?
- **Red:** `find({}, { name: 1 })` without `_id:0` → `_id` joins?

---

## Challenge

**Customer Cards:** `db.customers.insertMany([{ name:"Budi", phone:"081", city:"Jakarta"}, {name:"Siti"}])` → `find({ city: { $exists: false }})` finds city-less.

---

## Mini Glossary

- **Document/Collection**: card/box
- **insert/find**: in/search
- **_id**: ID

---

## Summary

Week 1: **Flexible Cards** — insert & find cards. Next: **Update & Delete**.
