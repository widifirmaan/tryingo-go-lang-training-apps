# Database TypeORM — Permanent NestJS Racks

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 4:** Database & TypeORM
> **Prerequisites:** Week 3 — **Modules & DI**.

## Learning Objectives

- `@Entity()` + `@Column()` + `@PrimaryGeneratedColumn()` rack blueprints (source: typeorm.io/entities)
- `TypeOrmModule.forRoot({...})` + `forFeature([Product])` connects DB, `@InjectRepository(Product)` injects rack
- `synchronize: true` for learning (never in production!)

---

## Why This Matters (Non-IT)

Service arrays vanish on restart — shop closes/opens with zero stock again. With TypeORM + Postgres, data lasts. `synchronize: true` auto-creates tables from entities (no manual `CREATE TABLE`) — perfect for learning.

---

## Program: Shop TypeORM Rack

```bash
npm install @nestjs/typeorm typeorm pg
```

```typescript
// product.entity.ts — blueprint (not manual SQL tables!)
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  stock: number;
}
```

```typescript
// app.module.ts — connect DB
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'secret',
      database: 'shop',
      entities: [Product],
      synchronize: true, // learning only! production uses migrations
    }),
    TypeOrmModule.forFeature([Product]),
  ],
})
export class AppModule {}
```

```typescript
// products.service.ts — inject rack
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  all() { return this.repo.find(); }
  add(p: Partial<Product>) { return this.repo.save(p); }
  find(name: string) { return this.repo.find({ where: { name } }); }
}
```

---

## Key Concepts

### `@Entity` / `@Column` / Repository
Entity draws tables, `forRoot` connects, `forFeature` + `@InjectRepository` uses.

### `synchronize: true` = Auto Build (Dev Only)
Creates tables from entities — never in production (use migrations!).

---

## Beginner Friendly Explanation

### Analogy: Warehouse with Blueprints
- **Entity = rack blueprint**, **repository = forklift** fetching/storing, **synchronize = auto-builder**.

### Step 0 — Prepare Device
- Postgres running (`docker run -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres`) + `shop` DB created.

### How the Computer Reads It
1. Start → `forRoot` connects → `synchronize` creates `products` table when missing.
2. `repo.save({name:"Rice"})` → `INSERT INTO products ...`.

### 3 Must-Know Terms
1. **Entity/Repository**: blueprint/forklift
2. **synchronize**: auto-build (dev only)

---

## Experiments

- **Green:** `POST` 2 products → restart → `GET` still 2? (durable!)
- **Yellow:** Add `category` to entity → restart → column auto-appears?
- **Red:** `synchronize: false` + new entity → table not created? (That's why dev uses true)

---

## Challenge

**Complete Rack:** `Product` + `Customer` entities + 2 `Repository` services + `GET/POST` both + restart durability check. **Beginner NestJS DONE!**
- **Link-up (Week 3 — Modules & DI):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Entity/Column/Repository**: blueprint/column/forklift
- **forRoot/forFeature**: connect/register
- **synchronize**: automatic (dev)

---

## Summary

Week 4 of 4: **Permanent Racks** (Level: Beginner). **Beginner NestJS DONE!** Next: **Auth/JWT** (Intermediate).
