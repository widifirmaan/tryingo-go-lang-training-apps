# Schema Design — Neat Cards: Embed or Split?

> **Kategori:** MongoDB | **Level:** Beginner | **Minggu 5:** Schema Design Patterns
> **Prerequisites:** Week 4 — **Basic Aggregation**.

## Learning Objectives

- **Embed** (stick in card, 1-to-Few: addresses in customer) vs **Reference** (split + `_id`, 1-to-Many: orders → customer) (source: mongodb.com/docs/manual/data-modeling)
- `$lookup` joins (Mongo's JOIN)

---

## Why This Matters (Non-IT)

Wrong design: 10,000 orders stuck on the customer card → giant 16MB-limit card, slow. Right: addresses (few) embedded, orders (many) split + `$lookup` when needed.

---

## Program: Stick vs Split

```javascript
// 1. EMBED — few & often read together (customer addresses)
db.customers.insertOne({
  name: "Budi",
  email: "budi@email.com",
  addresses: [
    { street: "Jl. Melati 12", city: "Jakarta", primary: true },
    { street: "Jl. Mawar 3", city: "Bekasi", primary: false }
  ]
})
// 1 read gets all: db.customers.findOne({ email: "budi@email.com" })

// 2. REFERENCE — many & ever-growing (orders)
db.orders.insertOne({ customer_email: "budi@email.com", total: 75000 })
db.orders.insertOne({ customer_email: "budi@email.com", total: 32000 })

// 3. $lookup — join when needed (like JOIN)
db.customers.aggregate([
  { $match: { email: "budi@email.com" } },
  { $lookup: {
      from: "orders",
      localField: "email",
      foreignField: "customer_email",
      as: "history"
  }}
])
// → { name: "Budi", ..., history: [{total:75000}, {total:32000}] }
```

---

## Key Concepts

### Embed = Stick on Card
Fits: few (1-3 addresses), read together, rarely changing alone.

### Reference + `$lookup` = Split + Join When Needed
Fits: many (thousands of orders), ever-growing. `$lookup` = Mongo JOIN.

### Rule of Thumb (MongoDB Docs)
- 1-to-Few → embed. 1-to-Many → reference. Often read together → embed.

---

## Beginner Friendly Explanation

### Analogy: Envelopes & Archives
- **Embed = staple receipts in the customer envelope**: few, open envelope and see.
- **Reference = separate archive + number**: 10,000 receipts don't fit one envelope → store in cabinet, note the number.

### Step 0 — Prepare Device
- Same as W1: `mongosh` + `customers` + `orders`.

### How the Computer Reads It
1. `findOne` customer → 1 document already includes `addresses` (no second query).
2. `$lookup` → matches `email` = `customer_email` → attaches `history` array.

### 3 Must-Know Terms
1. **Embed/reference**: stick/split
2. **$lookup**: join

---

## Experiments

- **Green:** `findOne` Budi → `addresses.length` 2?
- **Yellow:** Without `$lookup`, `orders` don't join customer `findOne`? (correct, split)
- **Red:** Stick 1000 orders on 1 customer → >16MB document error? (That's why split!)

---

### Bonus: Schema Validation — Collection Guard (mongodb.com/docs/manual/schema-validation!)

Flexible ≠ garbage allowed! Lock rules in the DB (not just apps — apps forget!):

```javascript
db.createCollection("products_neat", {
  validator: {
    $jsonSchema: {
      required: ["name", "price"],
      properties: {
        name: { bsonType: "string", minLength: 3 },
        price: { bsonType: ["int", "double"], minimum: 0 }
      }
    }
  },
  validationAction: "error" // reject (not warn!)
})

db.products_neat.insertOne({ name: "X", price: -5 }) // FAILS: short name + negative price!
db.products_neat.insertOne({ name: "Rice", price: 62000 }) // passes
```

---

## Challenge

**Correctly Designed Shop:** `products` embeds `reviews` (few, max 5) + `orders` references `customer_email` + `$lookup` Budi report. Write 1-sentence reasons per choice. **Beginner MongoDB DONE!**
- **Link-up (Week 4 — Basic Aggregation):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Embed/reference/$lookup**: stick/split/join
- **16MB**: card limit

---

## Summary

Week 5 of 5: **Card Design** (Level: Beginner). **Beginner MongoDB DONE!** Next: **Advanced Aggregation** (Intermediate).
