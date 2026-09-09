# Capstone: GraphQL E-Commerce — Restaurant Grand Opening

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 10:** Capstone: E-Commerce GraphQL
> **Prerequisites:** Week 9 — **Testing & Errors**.

## Learning Objectives

- Combine W1-W9: `schema` + `resolvers` + `auth` + `DataLoader` + `subscription` + `test` into a production GraphQL store

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: data-saving phones (picked fields) + fast (DataLoader) + live (subscription) + safe (auth) + tested. Your "production-ready GraphQL" portfolio.

---

## Program: Complete Restaurant (Checklist)

```javascript
// server.js — combine all
// typeDefs: Product, Query (products + args), Mutation (add/edit/delete + login), Subscription (outOfStock)
// resolvers: Query + Mutation (auth check!) + Subscription + Product.category (DataLoader!)
// context: JWT → user
// test: 4 green
```

Required features:
- [ ] `query` picked fields + arguments + fragment
- [ ] `mutation` auth (rejected without token)
- [ ] `Product.category` via DataLoader (log 2 queries, not 101)
- [ ] `subscription outOfStock` 2 tabs ring
- [ ] 4 GREEN tests + deploy (`Railway`/`Vercel`)

**Capstone task:** Public URL + GraphiQL screenshot adding a product + 1-min video. **GraphQL 0→Expert DONE!** 🎉


```graphql
# Capstone = grand opening: read + write + report in 1 receipt
mutation {
  createOrder(customer: "Budi", items: [{product: "USB-C Hub", qty: 2}]) { id total status }
}
```
---

## Key Concepts

### Capstone = Combine 9 Weeks
Menu + kitchen + ID + cart + bell + taste = restaurant.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening
- **W1-W4 foundation** + **W6-W9 engine** = restaurant. **W10 = open**.

### Step 0 — Prepare Device
- Full server from W5-W9 + deploy target account.

### How the Computer Reads It
1. Checklist top-to-bottom → production GraphQL store.
2. Public URL + video → portfolio done.

### 3 Must-Know Terms
1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** Auth-less mutation → rejected?
- **Yellow:** 101 queries without DataLoader → 2 with? Log proof.
- **Red:** Subscription silent → `publish` missing? Add it.

---

## Challenge

**Grand Opening:** All checklist + URL + video. **GraphQL 0→Expert DONE!** 🎉

---
- **Integration checklist:** **Schema & Types** (Week 1) + **Queries** (Week 2) + **Mutations** (Week 3) + **Resolvers** (Week 4) + **Apollo Server** (Week 5) + **Authentication** (Week 6) + **DataLoader & N+1** (Week 7) + **Subscriptions** (Week 8) + **Testing & Errors** (Week 9) → all parts above run together at the grand opening.
## Mini Glossary

- **Capstone/deploy**: combine/open

---

## Summary

Week 10 of 10: **Grand Opening** (Level: Intermediate). **GraphQL 0→Expert from zero DONE!** 🎉
