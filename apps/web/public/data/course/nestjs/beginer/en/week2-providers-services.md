# Providers & Services — Separate NestJS Kitchen

> **Kategori:** NestJS | **Level:** Beginner | **Minggu 2:** Providers & Services

## Learning Objectives

- `@Injectable()` marks the kitchen, `constructor(private productService: ProductService)` auto-injects (source: docs.nestjs.com/providers)
- Thin controllers (deliver), fat services (cook + store)

---

## Why This Matters (Non-IT)

Counting totals in controllers → formula change edits 5 controllers. In 1 service → 1 edit. Auto-injection = no manual `new ProductService()` per controller (forget 1 = divergent data).

---

## Program: Kitchen Injected into Waiters

```typescript
// products.service.ts — kitchen (cooks + stores)
import { Injectable } from '@nestjs/common';

@Injectable() // mandatory! without it Nest doesn't know
export class ProductService {
  private list = [{ id: 1, name: "Rice", price: 62000 }];

  all() { return this.list; }

  add(p: any) {
    const fresh = { id: Date.now(), ...p };
    this.list.push(fresh);
    return fresh;
  }
}
```

```typescript
// products.controller.ts — waiter (delivers only)
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  // Auto-inject: Nest builds 1 ProductService for all
  constructor(private productService: ProductService) {}

  @Get()
  all() { return this.productService.all(); }

  @Post()
  add(@Body() body: any) { return this.productService.add(body); }
}
```

```typescript
// products.module.ts — register (don't forget!)
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';

@Module({ controllers: [ProductsController], providers: [ProductService] })
export class ProductsModule {}
```

Test: `curl http://localhost:3000/products` → list. `curl -X POST -H "Content-Type: application/json" -d '{"name":"Sugar","price":15000}' http://localhost:3000/products` → added.

---

## Key Concepts

### `@Injectable()` = Kitchen Card
Without `@Injectable()`, Nest refuses injection (`Nest can't resolve dependencies`).

### Constructor Inject = Auto Injection
`constructor(private x: Y)` → Nest builds 1 `Y` (singleton) for all users.

### Register in Module
`providers: [ProductService]` mandatory — forgotten = resolve error.

---

## Beginner Friendly Explanation

### Analogy: Central Restaurant Kitchen
- **Service = central kitchen**: 1 kitchen cooks for 5 waiters.
- **Controller = waiter**: delivers, doesn't cook.
- **Module = building**: registers who works where.

### Step 0 — Prepare Device
- Same as W1: `nest new` + `npm run start:dev` on `3000`.

### How the Computer Reads It
1. Start → reads `providers` → builds 1 `ProductService`.
2. `GET /products` → `ProductsController` (injected with the same service) → `all()`.

### 3 Must-Know Terms
1. **Service/Injectable**: kitchen/card
2. **Inject/constructor**: inject
3. **Module/providers**: building/list

---

## Experiments

- **Green:** `POST` Sugar → `GET` shows 2?
- **Yellow:** Remove `@Injectable()` → `can't resolve` error? Reattach.
- **Red:** Remove from `providers` → same error? Register it.

---

## Challenge

**Complete Kitchen:** `ProductService` + `add/remove/find` + `ProductsController` `GET/POST/DELETE` + 3 passing `curl` commands.

---

## Mini Glossary

- **Service/Controller/Module**: kitchen/waiter/building
- **Injectable/providers**: card/list

---

## Summary

Week 2 of 4: **Separate Kitchen** (Level: Beginner). Thin controllers, fat service. Next: **Modules & DI** — buildings.
