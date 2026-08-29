# Database & ORM — Gudang dengan Penerjemah

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 9:** Database & ORM

## Tujuan Pembelajaran

- Hubungkan Next.js ke **Postgres** via `Prisma` — penerjemah: tulis `prisma.produk.findMany()` bukan SQL
- `npx prisma init`, `schema.prisma` cetak biru rak, `npx prisma migrate dev` bangun rak
- `await prisma.produk.create({ data: { nama, harga } })` di Server Action

---

## Kenapa Ini Penting Buat Kamu?

Tanpa DB, produk hilang saat restart. Dengan Prisma + Postgres (Supabase), data awet.

---

## Program: Gudang Prisma

```bash
npm install prisma @prisma/client
npx prisma init
# Atur DATABASE_URL di .env = "postgresql://..."
```

```prisma
// prisma/schema.prisma
model Produk {
  id        Int      @id @default(autoincrement())
  nama      String
  harga     Int
  stok      Int      @default(0)
  createdAt DateTime @default(now())
}
```

```bash
npx prisma migrate dev --name init
npx prisma generate
```

```javascript
// app/produk/actions.js
"use server";
import { prisma } from "@/lib/prisma";

export async function tambah(formData){
  await prisma.produk.create({
    data: { nama: formData.get("nama"), harga: Number(formData.get("harga")) }
  });
}

// app/produk/page.js
import { prisma } from "@/lib/prisma";
export default async function Page(){
  const produk = await prisma.produk.findMany();
  return <ul>{produk.map(p=><li key={p.id}>{p.nama} - Rp{p.harga}</li>)}</ul>;
}
```

---

## Ringkasan

Minggu 9: **Gudang Prisma** — `schema` + `migrate` + `findMany`.
