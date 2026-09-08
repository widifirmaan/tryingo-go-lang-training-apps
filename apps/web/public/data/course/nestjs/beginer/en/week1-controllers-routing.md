# Controllers & Routing — Structured Shop Waiters

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 1:** Controllers & Routing

## Learning Objectives

- Understand NestJS = **structured Node.js** like a shop with SOP: `controller` waiters, `service` kitchen, `module` building
- `npm i -g @nestjs/cli`, `nest new shop-nest`, `npm run start:dev` on `3000`
- `@Controller('products')` + `@Get()` doors, `return` auto-JSON

---

## Why This Matters (Non-IT)

Express is free but messy at scale. NestJS uses **SOP** — every waiter has clear duties, perfect for shop teams growing into minimarkets.

---

## Program: Product Waiters

```bash
npm i -g @nestjs/cli
nest new shop-nest
cd shop-nest
npm run start:dev
# Open http://localhost:3000
```

```typescript
// src/products/products.controller.ts
import { Controller, Get, Param } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  private list = [
    { id: 1, name: "Rice 5kg", price: 62000 },
    { id: 2, name: "Spinach", price: 5000 },
  ];

  @Get()
  all() { return this.list; } // GET /products

  @Get(':id')
  one(@Param('id') id: string) {
    return this.list.find(p => p.id === Number(id)) || { error: "Missing" };
  }
}
```

Open `http://localhost:3000/products` → JSON, `/products/1` → 1 product.

---

## Key Concepts

### `@Controller('products')` = Waiter Station
`@Get()` = GET door, `@Param('id')` = takes URL variable.

### NestJS SOP
`controller` (waiter) → `service` (kitchen) → `module` (building). Next week: services.

---

## Beginner Friendly Explanation

### Analogy: SOP Restaurant
- **Controller = waiter**: takes orders, serves. **Service = kitchen** (next week). **Module = building**.

### Step 0 — Prepare Device
- Node 20+ + Nest CLI (`npm i -g @nestjs/cli`), `nest new`, `npm run start:dev` on 3000.

### How the Computer Reads It
1. `GET /products` → `ProductsController.all()` → JSON array.
2. `GET /products/1` → `:id` → `Param('id')` → finds item.

### 3 Must-Know Terms
1. **Controller/Get/Param**: waiter/door/variable

---

## Experiments

- **Green:** `GET /products` → 2 items JSON?
- **Yellow:** `GET /products/99` → `{ error }`?
- **Red:** Wrong `@Controller('product')` singular → 404? Fix plural.

---

## Challenge

**Waiter Shop:** `ProductsController` with `GET /` + `GET /:id` + second controller `OrdersController`, both serving JSON.

---

## Mini Glossary

- **Controller/Module**: waiter/building

---

## Summary

Week 1: **Structured Waiters** — NestJS SOP. Next: **Providers & Services**.
