# Database & ORM — Warehouse with Translator

> **Kategori:** Next.js | **Level:** Advanced | **Minggu 9:** Database & ORM

## Learning Objectives

- Connect Next.js to **Postgres** via `Prisma` — translator: write `prisma.products.findMany()` not SQL
- `npx prisma init`, `schema.prisma` rack blueprint, `npx prisma migrate dev` builds racks
- `await prisma.products.create({ data: { name, price } })` in Server Actions

---

## Why This Matters (Non-IT)

Without a DB, products vanish on restart. With Prisma + Postgres (Supabase), data lasts.

---

## Program: Prisma Warehouse

```bash
npm install prisma @prisma/client
npx prisma init
# Set DATABASE_URL in .env = "postgresql://..."
```

```prisma
// prisma/schema.prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Int
  stock     Int      @default(0)
  createdAt DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name init
npx prisma generate
```

```javascript
// app/products/actions.js
"use server";
import { prisma } from "@/lib/prisma";

export async function add(formData){
  await prisma.product.create({
    data: { name: formData.get("name"), price: Number(formData.get("price")) }
  });
}

// app/products/page.js
import { prisma } from "@/lib/prisma";
export default async function Page(){
  const products = await prisma.product.findMany();
  return <ul>{products.map(p=><li key={p.id}>{p.name} - Rp{p.price}</li>)}</ul>;
}
```

---

## Key Concepts

### `schema.prisma` = Rack Blueprint
`model Product` draws tables; `migrate dev` builds them in Postgres.

### Server Action + Prisma = Kitchen to Warehouse
`add(formData)` runs on server → writes straight to DB → `revalidatePath` refreshes.

---

## Beginner Friendly Explanation

### Analogy: Warehouse with Translator
- **SQL = warehouse native tongue**, **Prisma = translator**: you speak JS objects, it speaks SQL.

### Step 0 — Prepare Device
- Supabase project (free) + `DATABASE_URL` in `.env` + `npx prisma migrate dev`.

### How the Computer Reads It
1. `prisma.product.create({data})` → SQL INSERT → row saved.
2. `findMany()` → SQL SELECT → array of products.

### 3 Must-Know Terms
1. **Prisma/migrate/schema**: translator/build/blueprint

---

## Experiments

- **Green:** Prisma Studio (`npx prisma studio`) → see rows visually?
- **Yellow:** Wrong `DATABASE_URL` → connection error? Fix env.
- **Red:** Skip `migrate` → table missing error? Run migrate.

---

## Challenge

**Prisma Warehouse:** `Product` model + migrate + seed 5 products + Server Action add + list page.

---

## Mini Glossary

- **Prisma/ORM**: translator

---

### Bonus: `route.js` Route Handler — Raw API (Routing chapter, nextjs.org!)

Server Actions for forms. But webhooks/payment gateways need raw API URLs → `route.js` (GET/POST/PUT/DELETE):

```javascript
// app/api/products/route.js — NO page.js!
import { prisma } from "@/lib/prisma";

export async function GET() {
  const all = await prisma.product.findMany();
  return Response.json(all); // raw JSON!
}

export async function POST(req) {
  const body = await req.json(); // open JSON envelope
  const fresh = await prisma.product.create({ data: body });
  return Response.json(fresh, { status: 201 });
}
```

- `GET/POST/...` = function name = HTTP method. `Response.json(data, { status })` replies + code.
- When route.js vs Server Actions? Webhooks/public APIs/non-React phones → `route.js`. React forms → Actions.

---

## Summary

Week 9: **Prisma Warehouse** — `schema` + `migrate` + `findMany`. Next: **Auth**.
