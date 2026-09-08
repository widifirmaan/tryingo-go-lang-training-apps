# Database — Node Warehouse with Prisma

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 8:** Database

## Learning Objectives

- Connect Express to **Postgres** via `Prisma` — `prisma.products.findMany()` without SQL

---

## Why This Matters (Non-IT)

Arrays vanish on restart. With Prisma + Postgres, data lasts + millions of rows. 1 `schema.prisma` blueprint for all.

---

## Program

```bash
npm install prisma @prisma/client
npx prisma init
# Set DATABASE_URL in .env
```

```prisma
// prisma/schema.prisma
model Product {
  id    Int    @id @default(autoincrement())
  name  String
  price Int
}
```

```bash
npx prisma migrate dev --name init
```

```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.get("/products", async (req,res)=>res.json(await prisma.product.findMany()));
app.post("/products", async (req,res)=>res.json(await prisma.product.create({ data: req.body })));
```


---

## Beginner Friendly Explanation

### Analogy: Node Prisma Warehouse
- See Program: run (`node server.js`), `curl` each door, change 1 thing.

### Step 0 — Prepare Device
- Same as Node W1: `node -v` + `npm install express` (+ `jsonwebtoken`/`prisma` per week).

### How the Computer Reads It
- `schema.prisma` draws; `migrate` builds; `prisma.product.findMany()` fetches without SQL.

### 3 Must-Know Terms
- 1. **Prisma/migrate**: mover/builder

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 8: **Prisma Warehouse** — Node + DB without SQL. Next: **Testing**.
