# Modules & DI — NestJS Shop Buildings

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 3:** Modules & DI

## Learning Objectives

- `@Module({ controllers, providers, imports, exports })` building: gathers + connects (source: docs.nestjs.com/modules)
- `imports: [ProductsModule]` in `AppModule`, `exports: [ProductService]` shares with other buildings

---

## Why This Matters (Non-IT)

Without modules, 20 controllers + 20 services in 1 building — `ProductService` drowns. With `ProductsModule` (products building) + `OrdersModule` (cashier building), neat per store. `exports` shares kitchens across buildings without duplicates.

---

## Program: 2 Connected Buildings

```typescript
// products/products.module.ts — products building
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductService],
  exports: [ProductService], // share kitchen with other buildings
})
export class ProductsModule {}

// orders/orders.module.ts — orders building uses products kitchen
import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrdersService } from './orders.service';

@Module({
  imports: [ProductsModule], // connect buildings
  providers: [OrdersService],
})
export class OrdersModule {}
```

```typescript
// orders.service.ts — inject another building's kitchen (works via exports!)
import { Injectable } from '@nestjs/common';
import { ProductService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(private productService: ProductService) {}
  total() {
    return this.productService.all().reduce((s: any, p: any) => s + p.price, 0);
  }
}
```

```typescript
// app.module.ts — main building
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({ imports: [ProductsModule, OrdersModule] })
export class AppModule {}
```

---

## Key Concepts

### `controllers` / `providers` / `imports` / `exports` = 4 Building Lists
- `controllers`: this building's waiters.
- `providers`: this building's kitchens.
- `imports`: connects other buildings.
- `exports`: shares kitchens outward.

### Without `exports` = Locked Kitchen
`OrdersService` injecting `ProductService` without `exports` → resolve error.

---

## Beginner Friendly Explanation

### Analogy: Mall with 2 Stores
- **Module = mall store**: `ProductsModule` rice store, `OrdersModule` cashier store.
- **imports = connecting doors**, **exports = share kitchen**.

### Step 0 — Prepare Device
- Same as W1: `nest generate module orders` + `nest generate service orders` (CLI creates files!).

### How the Computer Reads It
1. Start → `AppModule` → `imports` → builds `ProductsModule` (+ records `exports`).
2. `OrdersModule` asks for `ProductService` → checks `exports` → allowed → inject.

### 3 Must-Know Terms
1. **Module/imports**: building/connect
2. **exports/providers**: share/kitchen-list

---

## Experiments

- **Green:** `nest generate resource orders` → 4 files created?
- **Yellow:** Remove `exports` → `OrdersService` errors? Reattach.
- **Red:** Forget `imports: [ProductsModule]` in `OrdersModule` → error? Add it.

---

## Challenge

**Connected Mall:** `ProductsModule` + `OrdersModule` (imports + injects service) + `GET /orders/total` proving shared kitchen.

---

## Mini Glossary

- **Module/imports/exports**: building/connect/share

---

## Summary

Week 3 of 4: **Connected Buildings** (Level: Beginner). Can share kitchens across stores. Next: **Database** — permanent racks.
