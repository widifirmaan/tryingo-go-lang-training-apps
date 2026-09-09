# Database & ORM — Gudang dengan Penerjemah

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 9:** Database & ORM
> **Prasyarat:** Minggu 8 — **Middleware & Auth Dasar**.

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

### Bonus: Route Handler `route.js` — API Mentah (bab Routing nextjs.org!)

Server Actions untuk form. Tapi webhook/payment-gateway butuh URL API mentah → `route.js` (GET/POST/PUT/DELETE):

```javascript
// app/api/produk/route.js — TANPA page.js!
import { prisma } from "@/lib/prisma";

export async function GET() {
  const semua = await prisma.produk.findMany();
  return Response.json(semua); // JSON mentah!
}

export async function POST(req) {
  const body = await req.json(); // baca amplop JSON
  const baru = await prisma.produk.create({ data: body });
  return Response.json(baru, { status: 201 });
}
```

- `GET/POST/...` = nama fungsi = method HTTP. `Response.json(data, { status })` balas + kode.
- Kapan route.js vs Server Actions? Webhook/API publik/HP non-React → `route.js`. Form React → Actions.

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `produk` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `produk` → masih jalan atau error?
- **Merah:** Hapus baris `import { prisma } from "@/lib/prisma";` → error apa? Pasang lagi.

## Tantangan

**Database & ORM di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Middleware & Auth Dasar** (Minggu 8): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 9: **Gudang Prisma** — `schema` + `migrate` + `findMany`. Minggu depan: **Advanced Auth**.
