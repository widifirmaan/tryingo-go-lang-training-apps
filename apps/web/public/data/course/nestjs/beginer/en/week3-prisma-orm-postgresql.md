# Relational Persistence: Prisma ORM, PostgreSQL Schema & PrismaService

> **Kategori:** NestJS Enterprise Architecture | **Level:** Beginner | **Minggu 3:** Relational Persistence: Prisma ORM, PostgreSQL Schema & PrismaService

## Learning Objectives

- Understand Prisma ORM role: declarative modeling (`schema.prisma`) and zero-boilerplate migrations.
- Build a robust `PrismaService` implementing lifecycle hooks `OnModuleInit` and `OnModuleDestroy`.
- Master type-safe relational queries with auto-generated TypeScript types via Prisma Client.
- Implement multi-table atomic database transactions using `prisma.$transaction`.

---

## Program: PrismaService Database Layer & E-Commerce Transactions in NestJS

```typescript
// Demonstrasi PrismaService di NestJS (Prisma ORM v5 / v6)
// schema.prisma:
// model Product {
//   id        String   @id @default(uuid())
//   sku       String   @unique
//   name      String
//   price     Decimal  @db.Decimal(12, 2)
//   stock     Int
//   createdAt DateTime @default(now())
// }

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

// 1. PrismaService: Mengelola Koneksi Database Lifecycle
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  // Simulasi klien database internal PrismaClient
  async onModuleInit() {
    console.log('[PRISMA CONNECTED] Berhasil membuka connection pool ke PostgreSQL.');
  }

  async onModuleDestroy() {
    console.log('[PRISMA DISCONNECTED] Connection pool PostgreSQL ditutup dengan bersih.');
  }

  // Simulasi Kueri Type-Safe Prisma
  async createProductWithInventory(data: { sku: string; name: string; price: number; stock: number }) {
    console.log(`[PRISMA TRANSACTION] Menyimpan produk ${data.sku} dan mengunci alokasi stok...`);
    return {
      id: 'prod-uuid-2026',
      sku: data.sku,
      name: data.name,
      price: data.price,
      stock: data.stock,
      createdAt: new Date().toISOString()
    };
  }

  async findAvailableProducts() {
    return [
      { id: '1', sku: 'SKU-MAC-M3', name: 'MacBook Pro M3', price: 42000000, stock: 10 },
      { id: '2', sku: 'SKU-IPH-16', name: 'iPhone 16 Pro', price: 21500000, stock: 25 }
    ];
  }
}

// 2. Injeksi PrismaService ke dalam Domain Repository
@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getInStockItems() {
    return this.prisma.findAvailableProducts();
  }
}

console.log('=== PRISMA ORM SERVICE SIAP DIINTEGRASIKAN KE NESTJS ===');
```

---

## Key Concepts

In contemporary TypeScript backend engineering, **Prisma ORM** stands as the industry benchmark, providing seamless end-to-end type safety spanning the SQL schema to application controllers without redundant manual interface declarations.

### Prisma Integration in NestJS
The underlying `PrismaClient` is wrapped inside a dedicated `@Injectable()` provider named `PrismaService`. Implementing `OnModuleInit` and `OnModuleDestroy` hooks ensures connection pools initialize during application boot and drain gracefully during teardowns.

### Zero-Drift Type Safety
Running `prisma generate` parses `schema.prisma` to synthesize native TypeScript definitions dynamically. If an entity column changes in the schema, TypeScript immediately highlights impacted controller and service calls across the entire codebase.

### Atomic Transactions via $transaction
E-commerce checkout flows require inserting orders, decrementing inventory units, and logging transaction audits within a unified transaction. Prisma provides `prisma.$transaction(async (tx) => ...)` guaranteeing strict ACID compliance.


---

---

## Beginner Friendly Explanation

Think of Prisma as a certified simultaneous language interpreter. Your database schema speaks PostgreSQL, while your backend code speaks TypeScript. Prisma ensures every database column translates into your TypeScript code with zero grammatical errors or lost definitions.

## Experiments

- Define a One-to-Many relation (Category -> Products) in schema.prisma and query with `include: { category: true }`.
- Test Prisma Interactive Transactions verifying automated rollbacks when inventory is depleted.
- Launch `npx prisma studio` to inspect relational tables visually in the browser.

---

## Challenge

Build a Prisma soft-delete client extension converting `delete` operations into `update` with `deletedAt = new Date()`, filtering soft-deleted entities on `findMany`.

---

## Summary

You have mastered Prisma ORM, PrismaService, and atomic transactions. Next week we explore Exception Filters and Response Interceptors.
