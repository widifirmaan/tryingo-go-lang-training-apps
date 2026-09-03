# Database — Gudang Node dengan Prisma

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 8:** Database

## Tujuan Pembelajaran

- Hubungkan Express ke **Postgres** via `Prisma` — `prisma.produk.findMany()` tanpa SQL

---

## Program

```bash
npm install prisma @prisma/client
npx prisma init
# Atur DATABASE_URL di .env
```

```prisma
// prisma/schema.prisma
model Produk {
  id    Int    @id @default(autoincrement())
  nama  String
  harga Int
}
```

```bash
npx prisma migrate dev --name init
```

```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.get("/produk", async (req,res)=>res.json(await prisma.produk.findMany()));
app.post("/produk", async (req,res)=>res.json(await prisma.produk.create({ data: req.body })));
```

---

## Ringkasan

Minggu 8: **Gudang Prisma** — Node + DB tanpa SQL.
