# Directives & Pipes — Angular Shop Switches and Strainers

> **Kategori:** Angular | **Level:** Beginner | **Minggu 2:** Directives & Pipes
> **Prerequisites:** Week 1 — **Components & Templates**.

## Learning Objectives

- `*ngIf` display switch, `*ngFor` list photocopy, `[ngClass]` dynamic outfit, `| currency:'IDR'` price strainer (source: angular.dev/guide/directives + pipes)

---

## Why This Matters (Non-IT)

Without `*ngIf`, the "Buy" button shows even at stock 0 → disappointed customers. Without `*ngFor`, hand-write 30 `<li>`s. Without `| currency`, `62000` shows raw (not `Rp62,000`).

---

## Program: Switch Showcase Shop

```typescript
// card.component.ts
import { Component } from "@angular/core";
@Component({
  selector: "app-card",
  templateUrl: "./card.component.html"
})
export class CardComponent {
  total = 75000;
  list = [
    { name: "Rice", price: 62000 },
    { name: "Spinach", price: 5000 },
  ];
}
```

```html
<!-- card.component.html -->
<p *ngIf="total > 50000; else payShipping" style="color: green;">Free delivery!</p>
<ng-template #payShipping><p>Shop more for free delivery</p></ng-template>

<ul>
  <li *ngFor="let p of list; let i = index">
    {{ i + 1 }}. {{ p.name }} - {{ p.price | currency:'IDR':'symbol':'1.0-0' }}
  </li>
</ul>

<div [ngClass]="{ expensive: total > 50000, cheap: total <= 50000 }">
  Total: {{ total | currency:'IDR' }}
</div>
```

---

## Key Concepts

### `*ngIf` + `else` = Switch
`*ngIf="total > 50000"` shows when true. `else payShipping` + `<ng-template #payShipping>` when false. (`*` = structural, changes DOM.)

> **Version note (researched 2026):** `*ngIf`/`*ngFor` still work fully, but since Angular 20 they are **deprecated** — the modern style is `@if (total > 50000) { ... } @else { ... }` and `@for (p of list; track p.id) { ... }`. Master `*ngIf` first (still in millions of legacy lines), then learn `@if` as your next step.

### `*ngFor` = Photocopy
`*ngFor="let p of list; let i = index"` → `p` item, `i` number 0,1,2.

### `| currency` = Money Strainer
`{{ 62000 | currency:'IDR':'symbol':'1.0-0' }}` → `Rp62,000`.

### `[ngClass]` = Dynamic Outfit
`[ngClass]="{ expensive: total > 50000 }"` → class `expensive` when true.

---

## Beginner Friendly Explanation

### Analogy: Light Switches & Photocopiers
- **`*ngIf` = switch**: total >50k → green lamp on.
- **`*ngFor` = photocopier**: 1 `<li>` template, photocopied per item.

### Step 0 — Prepare Device
- Same as W1: `ng serve` on `4200`.

### How the Computer Reads It
1. `*ngIf="total > 50000"` → true → `<p>` shows, `else` hidden (DOM comment).
2. `*ngFor` → loops `list`, each `p` makes an `<li>`.

### 3 Must-Know Terms
1. **Directive `*`/`[]`**: structural/attribute switch
2. **Pipe `|`**: display strainer
3. **ng-template**: spare mold

---

## Experiments

- **Green:** `total = 30000` → which shows?
- **Yellow:** `currency:'USD'` → `$62,000.00`?
- **Red:** Forget `*`, write bare `ngIf=` → `Can't bind` error? Add `*`.

---

## Challenge

**Complete Switch Showcase:** `*ngIf` free-delivery + `else`, `*ngFor` 5 products + `index`, `| currency:'IDR'`, `[ngClass]` expensive/cheap.
- **Link-up (Week 1 — Components & Templates):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **ngIf/ngFor/ngClass**: switch/photocopy/outfit
- **Pipe currency**: money strainer
- **ng-template**: spare

---

## Summary

Week 2 of 5: **Switches & Strainers** (Level: Beginner). Smart display + neat money. Next: **Services** — shared warehouse.
