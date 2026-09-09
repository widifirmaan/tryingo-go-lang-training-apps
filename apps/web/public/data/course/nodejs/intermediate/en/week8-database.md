# Database — Node Warehouse with Prisma

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 8:** Database
> **Prerequisites:** Week 7 — **Auth**.

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
- **Array = desk drawer**: close laptop, gone. **Prisma + Postgres = real warehouse**.
- **`schema.prisma` = rack drawing**: write model, `migrate` builds, `findMany()` with NO SQL!

### Step 0 — Prepare Device
- Same as Node W1: `node -v` + `npm install express` (+ `jsonwebtoken`/`prisma` per week).

### How the Computer Reads It
- `schema.prisma` draws; `migrate` builds; `prisma.product.findMany()` fetches without SQL.

### 3 Must-Know Terms
- 1. **Prisma/migrate**: mover/builder

---

## Experiments

- **Green:** Open `/products` → what shows? Try another ID → what differs?
- **Yellow:** Change the case of `prisma` → still runs or error?
- **Red:** Mistype 1 letter in `prisma` → what error message? Fix it.

## Challenge

**Database in Your Shop:** use `/products` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/products`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Auth** (Week 7): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 8: **Prisma Warehouse** — Node + DB without SQL. Next: **Testing**.
