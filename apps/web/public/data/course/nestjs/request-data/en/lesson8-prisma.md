# Prisma: The Modern Type-Safe ORM

> NestJS | Request & Data | Lesson 8

## Learning Objectives

- Define models with the Prisma schema (schema-first)
- Run migrations with prisma migrate
- Use the type-safe PrismaClient in NestJS
- Write queries with relations (include, where, orderBy)

---

## Program: Prisma: The Modern Type-Safe ORM

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

## Explanation

## Schema-First: The Database Designed in One Place
Prisma differs from TypeORM: you write the DATABASE in schema.prisma (models, types, relations, indexes), then the CLI generates the rest. Migrations are auto-derived from the schema: npx prisma migrate dev - schema changes, migration created, database updated. One source of truth, reviewable in git, rollbackable. This is why Prisma is the favorite for new 2026 projects.
## Type-Safety: Errors at Compile, Not in Production
PrismaClient is generated FROM the schema: this.prisma.user.findMany() already knows User's fields, types, and relations. A typo 'emial' = compile error. Where with a wrong field = compile error. This is a class above string queries: most database bugs disappear before the code even runs.
## PrismaService: Integration with Nest
PrismaService extends PrismaClient + implements OnModuleInit/OnModuleDestroy: the connection opens at module init and closes when the app shuts down. Registered as a provider and exported so every module can inject it - the same pattern as AuditService in lesson 4.
## Queries: Concise and Expressive
create, findUnique, findMany with where/include/orderBy - one sentence for queries that take several lines in TypeORM. include: { catatan: ... } loads relations (like a JOIN, one query). For aggregation & transactions: prisma.catatan.groupBy, prisma.$transaction - available, just as safe.

---

## Experiments

1. **Schema-First: The Database Designed in One Place**
2. **Type-Safety: Errors at Compile, Not in Production**
3. **PrismaService: Integration with Nest**
4. **Queries: Concise and Expressive**

---

## Challenge

Extend the schema: (1) add a Label model (id, nama, warna) with a @manyToMany relation to Catatan, (2) create a new migration named "add-label" (write the command), (3) add GET /api/user/:id/statistik counting notes per prioritas (groupBy), (4) write a query for notes created in the last 7 days (where: dibuat > gte).

---

## Summary

Schema-first + generate = total type-safety. Migrations = versioned schema. PrismaService = connection lifecycle. Concise queries with relations. Next: guards & authorization.
