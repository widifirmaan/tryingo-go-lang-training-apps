# State Management — Big Angular Warehouse (ngrx.io)

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 10:** State Management
> **Prerequisites:** Week 9 — **RxJS**.

## Learning Objectives

- `@ngrx/component-store` component warehouse — `store` + `updater` + `selector` + `dispatch` (source: ngrx.io/guide/component-store)

---

## Why This Matters (Non-IT)

10 shop components needing `cart` — 5-level `props` relay exhausts. `ComponentStore` = warehouse in the middle, everyone takes.

---

## Program: NgRx Shop Warehouse (ngrx.io)

```bash
npm install @ngrx/component-store
```

```typescript
// cart.store.ts
import { ComponentStore } from "@ngrx/component-store";
import { Injectable } from "@angular/core";

interface CartState { items: { name: string }[]; }

@Injectable({ providedIn: "root" })
export class CartStore extends ComponentStore<CartState> {
  constructor(){ super({ items: [] }); }

  readonly items$ = this.select(state => state.items);
  readonly add = this.updater((state, item: { name: string }) => ({
    items: [...state.items, item]
  }));
}

// component.ts
constructor(private store: CartStore) {}
add(){ this.store.add({ name: "Rice" }); }

// template.html
<button (click)="add()">Add Rice</button>
<div *ngFor="let i of store.items$ | async">{{ i.name }}</div>
```

**Source:** `ngrx.io/guide/component-store` — `ComponentStore` + `select`/`updater`.

---

## Key Concepts

### `ComponentStore` = Component Warehouse
`select` reads, `updater` mutates, `| async` in template.

---

## Beginner Friendly Explanation

### Analogy: Big Warehouse

- **`ComponentStore` = warehouse**: `add` inserts, `items$` views.

### Step 0 — Prepare Device

`ng new` + `npm install @ngrx/component-store` + `ng serve` on `4200`.

### 3 Must-Know Terms

1. **Store/select/updater**: warehouse/read/mutate

---

### Bonus: Signals — Modern Angular Reactivity (core angular.dev v16+!)

`ComponentStore` is strong, but modern Angular uses **signals**: `signal()` reactive box, `computed()` auto-calc, `effect()` watcher. No RxJS!

```typescript
import { signal, computed, effect } from "@angular/core";

export class CartComponent {
  items = signal<{ name: string; price: number }[]>([]);
  total = computed(() => this.items().reduce((s, i) => s + i.price, 0));

  constructor() {
    effect(() => console.log("Total now:", this.total())); // runs every total change!
  }

  add(name: string, price: number) {
    this.items.update(list => [...list, { name, price }]); // update() mandatory (not push!)
  }
}
```
```html
<p>Items: {{ items().length }} | Total: {{ total() }}</p>
<!-- templates READ with ()! items WITHOUT () = raw function -->
```
- `signal()` read-write, `computed()` auto read-only, `effect()` side effects. Golden rule: mutate via `set/update`, NOT direct `push` (undetected)!

---

## Challenge

**Complete Warehouse Shop:** `CartStore` `items: {name, price}[]` + `add` + `remove` `updater`, `items$ | async` display, `ng serve` check.

---

## Mini Glossary

- **ComponentStore**: component warehouse

---

## Summary

Week 10 of 12: **Big Warehouse** — `ComponentStore`. Next: **Testing**.
