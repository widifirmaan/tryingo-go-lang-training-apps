# Database — Gudang Node dengan Prisma

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 8:** Database

## Tujuan Pembelajaran

- Hubungkan Express ke **Postgres** via `Prisma` — `prisma.produk.findMany()` tanpa SQL

---

## Kenapa Ini Penting Buat Kamu?

Array hilang saat restart. Dengan Prisma + Postgres, data awet + jutaan baris. `schema.prisma` 1 cetak biru untuk semua.

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

## Penjelasan untuk Pemula

### Analogi: Gudang Prisma Node
- **Array = laci meja**: tutup laptop hilang. **Prisma + Postgres = gudang beneran**.
- **`schema.prisma` = gambar rak**: tulis model, `migrate` bangun, `findMany()` TANPA SQL!

### Langkah 0 — Siapkan Device
- Sama Node W1: `node -v` + `npm install express` (+ `jsonwebtoken`/`prisma` sesuai minggu).

### Cara Komputer Membaca
- `schema.prisma` gambar; `migrate` bangun; `prisma.produk.findMany()` ambil tanpa SQL.

### 3 Istilah Wajib
- 1. **Prisma/migrate**: tukang/bangun

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 8: **Gudang Prisma** — Node + DB tanpa SQL. Minggu depan: **Testing**.
