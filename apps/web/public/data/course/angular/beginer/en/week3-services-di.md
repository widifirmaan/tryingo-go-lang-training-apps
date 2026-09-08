# Services & DI — Shared Angular Shop Warehouse

> **Kategori:** Angular | **Level:** Beginner | **Minggu 3:** Services & DI

## Learning Objectives

- `@Injectable({ providedIn: 'root' })` 1 warehouse for all (source: angular.dev/guide/di)
- `constructor(private productService: ProductService)` inject, `ngOnInit` fetches on open

---

## Why This Matters (Non-IT)

10 components needing the product `list` — write the array in 10 files? Price change → edit 10x, forget 1 = divergent. With `ProductService` 1 warehouse, all inject the same.

---

## Program: Angular Product Warehouse

```typescript
// product.service.ts — warehouse (1 for all)
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' }) // root = 1 across the app
export class ProductService {
  private list = [
    { name: "Rice", price: 62000 },
    { name: "Spinach", price: 5000 },
  ];
  getAll() { return this.list; }
  add(p: any) { this.list.push(p); }
}
```

```typescript
// card.component.ts — inject warehouse
import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";

@Component({ selector: "app-card", template: `<ul><li *ngFor="let p of list">{{ p.name }}</li></ul>` })
export class CardComponent implements OnInit {
  list: any[] = [];
  constructor(private productService: ProductService) {} // inject!
  ngOnInit() { this.list = this.productService.getAll(); }
}
```

---

## Key Concepts

### `@Injectable({ providedIn: 'root' })` = Central Warehouse
Angular creates 1 instance for all injectors.

### Constructor Inject = Auto Injection
`constructor(private s: ProductService)` → Angular fills automatically. Don't `new ProductService()` manually (becomes 2 different warehouses!).

### `ngOnInit` = On Open
Runs once after the component is ready — place for initial data.

---

## Beginner Friendly Explanation

### Analogy: Mall Central Warehouse
- **Service = warehouse**: 10 shops take the same stock.
- **Inject = pipe**: each shop pipes into the warehouse.
- **Manual `new` = fake warehouse**: each shop has its own (misleading!).

### Step 0 — Prepare Device
- Same as W1: `ng generate service product` (CLI creates file + test!).

### How the Computer Reads It
1. Start → reads `providedIn: 'root'` → creates 1 `ProductService`.
2. `CardComponent` asks for `ProductService` → gets the same one.

### 3 Must-Know Terms
1. **Service/Injectable**: warehouse/card
2. **Inject/DI**: auto-inject
3. **ngOnInit**: on open

---

## Experiments

- **Green:** 2 components inject service + 1 `add` → both see it?
- **Yellow:** Manual `new ProductService()` in 2 components → add in 1, other doesn't follow? (That's why inject!)
- **Red:** Remove `providedIn` → `No provider` error? Reattach.

---

## Challenge

**2-Shop Mall:** `ProductService` + `CardComponent` (display) + `AddComponent` (add form) → add in 1, shows in 2 without refresh.

---

## Mini Glossary

- **Service/Inject/OnInit**: warehouse/inject/open

---

## Summary

Week 3 of 5: **Shared Warehouse** (Level: Beginner). 1 data for all. Next: **Communication** — branch envelopes.
