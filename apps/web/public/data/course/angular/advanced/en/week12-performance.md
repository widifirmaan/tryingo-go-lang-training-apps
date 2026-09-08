# Performance — Enterprise Fast with OnPush (angular.dev)

> **Kategori:** Angular | **Level:** Advanced | **Minggu 12:** Performance

## Learning Objectives

- `ChangeDetectionStrategy.OnPush` — checks only when `Input` is new (new reference) or inner `event`, not every second (source: angular.dev/api/core/ChangeDetectionStrategy)
- `trackBy` for `*ngFor` so it doesn't re-render everything

---

## Why This Matters (Non-IT)

A 1000-product shop without `OnPush` → every click, Angular checks 1000 components (slow). With `OnPush`, only checks with new `Input` — 10x faster (angular.dev).

---

## Program: Fast OnPush Shop (angular.dev)

```typescript
import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-card",
  changeDetection: ChangeDetectionStrategy.OnPush, // checks only on new Input
  template: `<div>{{ name }} - Rp{{ price }}</div>`
})
export class CardComponent {
  @Input() name!: string;
  @Input() price!: number;
}

// List
@Component({
  selector: "app-list",
  template: `
    <div *ngFor="let p of list; trackBy: trackById">
      <app-card [name]="p.name" [price]="p.price"></app-card>
    </div>
  `
})
export class ListComponent {
  list = [{ id: 1, name: "Rice", price: 62000 }];
  trackById(index, item){ return item.id; }
}
```

**OnPush rules (angular.dev):** checks only when `Input` is a new reference (not `list[0].price = 0` mutation), or inner `event`. Direct mutation is undetected — make a new array `[...list]`.

**Source:** `angular.dev/api/core/ChangeDetectionStrategy` — `OnPush` `CheckOnce`.

---

## Key Concepts

### `OnPush` = Check Only When Needed
`Default` checks every second, `OnPush` checks on new `Input` or `event`.

### `trackBy` = `*ngFor` ID Card
`trackById` so `*ngFor` doesn't re-render all on 1 add.

---

## Beginner Friendly Explanation

### Analogy: Thrifty Guard

- **`Default` = guard checking 1000 rooms every second** — exhausting.
- **`OnPush` = guard checking only rooms with new guests** — thrifty.

### Step 0 — Prepare Device

`ng new` + `ng serve` on `4200` (done in W1).

### How the Computer Reads It

1. `list = [...list, fresh]` → new reference → `OnPush` checks.
2. `list[0].price = 0` → same reference → `OnPush` skips (wrong).

### 3 Must-Know Terms

1. **OnPush**: thrifty check
2. **trackBy**: list ID

---

## Experiments

- **Green:** `OnPush` + `list = [...list, fresh]` → checked? Yes.
- **Yellow:** `list[0].price = 0` mutation → not checked? Make new.
- **Red:** Forget `trackBy` → 1000-item `*ngFor` re-renders per add.

---

## Challenge

**Complete Fast Shop:** `CardComponent` `OnPush` + `List` `trackById` + `list = [...list, fresh]` (not `push` mutation), `ng serve` check that not everything is checked.

---

## Mini Glossary

- **OnPush/trackBy**: thrifty/ID

---

## Summary

Week 12 of 14: **Enterprise Fast** — `OnPush`. Next: **Capstone**.
