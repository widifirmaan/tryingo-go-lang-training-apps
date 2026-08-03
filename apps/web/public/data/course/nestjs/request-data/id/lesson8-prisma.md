# Prisma: Type-Safe ORM Modern

> NestJS | Request & Data | Pelajaran 8

## Tujuan Pembelajaran

- Mendefinisikan model dengan Prisma schema (schema-first)
- Menjalankan migration dengan prisma migrate
- Menggunakan PrismaClient yang type-safe di NestJS
- Menulis query dengan relasi (include, where, orderBy)

---

## Program: Prisma: Type-Safe ORM Modern

```ts
// Prisma: schema-first. Database didesain DI SINI,
// Prisma Client yang type-safe di-generate dari schema.

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // atau "sqlite" / "mysql"
  url      = env("DATABASE_URL")
}

// Model = tabel + relasi, ditulis deklaratif
model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  nama    String
  catatan Catatan[]
  dibuat  DateTime @default(now())
}

model Catatan {
  id       Int      @id @default(autoincrement())
  judul    String   @db.VarChar(200)
  selesai  Boolean  @default(false)
  prioritas String  @default("sedang") // rendah | sedang | tinggi
  user     User     @relation(fields: [userId], references: [id])
  userId   Int
  dibuat   DateTime @default(now())

  @@index([userId])
}

// Perintah CLI:
//   npx prisma migrate dev --name init   -> buat migration + update DB
//   npx prisma studio                    -> browser GUI untuk data
//   npx prisma generate                  -> generate Prisma Client (type-safe)
```

---

## Penjelasan

## Schema-First: Database Didesain di Satu Tempat
Prisma berbeda dari TypeORM: Anda menulis DATABASE di schema.prisma (model, tipe, relasi, index), lalu CLI generate. Migration otomatis dari schema: npx prisma migrate dev - schema berubah, migration dibuat, database di-update. Satu sumber kebenaran, bisa di-review di git, bisa rollback. Ini alasan Prisma jadi favorit proyek baru 2026.
## Type-Safety: Error di Compile, Bukan di Produksi
PrismaClient di-generate DARI schema: this.prisma.user.findMany() sudah tahu field, tipe, dan relasi User. Typo 'emial' = error compile. Where dengan field yang salah = error compile. Ini beda kelas dari string query: sebagian besar bug database hilang SEBELUM kode dijalankan.
## PrismaService: Integrasi dengan Nest
PrismaService extends PrismaClient + implements OnModuleInit/OnModuleDestroy: koneksi dibuka saat module init, ditutup saat app mati. Didaftarkan sebagai provider dan di-export agar semua modul bisa inject - pola yang sama dengan AuditService di pelajaran 4.
## Query: Ringkas dan Ekspresif
create, findUnique, findMany dengan where/include/orderBy - satu kalimat untuk query yang di TypeORM butuh beberapa baris. include: { catatan: ... } memuat relasi (setara JOIN, satu query). Untuk agregasi & transaksi: prisma.catatan.groupBy, prisma.$transaction - tersedia, sama amannya.

---

## Eksperimen

1. **Schema-First: Database Didesain di Satu Tempat**
2. **Type-Safety: Error di Compile, Bukan di Produksi**
3. **PrismaService: Integrasi dengan Nest**
4. **Query: Ringkas dan Ekspresif**

---

## Tantangan

Perluas schema: (1) tambah model Label (id, nama, warna) dengan relasi @manyToMany ke Catatan, (2) buat migration baru dengan nama "add-label" (tuliskan perintahnya), (3) tambah endpoint GET /api/user/:id/statistik yang menghitung jumlah catatan per prioritas (groupBy), (4) tulis query untuk catatan yang dibuat 7 hari terakhir (where: dibuat > gte).

---

## Ringkasan

Schema-first + generate = type-safe total. Migration = versioned schema. PrismaService = koneksi lifecycle. Query ringkas dengan relasi. Lanjut: guards & authorization.
