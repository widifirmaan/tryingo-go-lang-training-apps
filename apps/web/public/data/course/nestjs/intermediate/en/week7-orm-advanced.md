# ORM Relations — Ropes Between NestJS Racks

> **Kategori:** NestJS | **Level:** Intermediate | **Minggu 7:** ORM Advanced & Relations

## Learning Objectives

- `@OneToMany` + `@ManyToOne` ropes (1 customer - many orders) (source: typeorm.io/relations)
- `relations: ["orders"]` fetches along (manual eager) vs slow N+1

---

## Why This Matters (Non-IT)

Without relations, fetching a customer + their orders = 2 manual queries + JS-side merge. With `@OneToMany`, 1 line fetches along. Unaware of N+1, 100 customers = 101 queries (slow!).

---

## Program: NestJS Shop Ropes

```typescript
// customer.entity.ts — 1 owns many
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;

  @OneToMany(() => Order, (o) => o.customer)
  orders: Order[];
}
```

```typescript
// order.entity.ts — many belong to 1
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Customer } from "./customer.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;
  @Column() total: number;

  @ManyToOne(() => Customer, (c) => c.orders)
  customer: Customer;
}
```

```typescript
// service — fetch along (avoids N+1!)
all() {
  return this.repo.find({ relations: ["orders"] });
}
```

---

## Key Concepts

### `@OneToMany` / `@ManyToOne` = Owns / Belongs
1 customer owns many orders; each order belongs to 1 customer.

### `relations: [...]` = Fetch Along
Without it, `customer.orders` is empty! With it, 2 queries (not 101).

---

## Beginner Friendly Explanation

### Analogy: Guest Book & Stitched Receipts
- **Relation = stitching**: receipts stitched to their owner's guest-book page.

### Step 0 — Prepare Device
- Same as beginner W4: TypeORM + Postgres running.

### How the Computer Reads It
1. `find({ relations: ["orders"] })` → `SELECT` customers + `SELECT ... WHERE customerId IN (...)`.
2. Attaches results to each customer.

### 3 Must-Know Terms
1. **OneToMany/ManyToOne**: owns/belongs
2. **relations**: fetch-along

---

## Experiments

- **Green:** Without `relations` → `orders` empty?
- **Yellow:** Query log: 101 queries without relations? 2 with?
- **Red:** `@OneToMany` without paired `@ManyToOne` → FK not created? Pair them.

---

## Challenge

**Roped Store:** `Customer 1-N Order N-1 Product` + 2-level `relations` + prove 3 queries (not 1+N+M).

---

## Mini Glossary

- **OneToMany/ManyToOne/relations**: owns/belongs/along

---

## Summary

Week 7 of 12: **Rack Ropes** (Level: Intermediate). No N+1. Next: **Error & Log**.
