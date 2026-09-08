# Components & Templates — Enterprise Shop Branch

> **Kategori:** Angular | **Level:** Beginner | **Minggu 1:** Components & Templates

## Learning Objectives

- Install `npm install -g @angular/cli`, `ng new shop-angular`, `ng serve` on `4200`
- Understand Angular = **enterprise shop**: many rules, but neat for 100 branches — needs `TypeScript` first
- `component` = store, `template` = showcase `{{ name }}`, `selector: 'app-card'`

---

## Why This Matters (Non-IT)

Angular is for big companies: if the shop wants to become a 100-branch minimarket, it needs strict rules (TypeScript, DI) — not for 1-branch shops (use Vue/React instead). If you still want it, this is the gate — **needs 3 months of JS+TS first**.

---

## Program: Angular Card

```bash
npx @angular/cli new shop-angular --style=css --routing
# VERSION NOTE (researched 2026): Angular 20+ scaffolds standalone projects with NO NgModules.
# This course uses the NgModule style (still fully working). To follow along exactly:
#   npx @angular/cli new shop-angular --style=css --routing --no-standalone
cd shop-angular
ng serve
# Open http://localhost:4200
```

```typescript
// src/app/card/card.component.ts
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-card',
  template: `<div style="border: 1px solid #ddd; padding: 12px;">
    <h3>{{ name }}</h3><p>Rp {{ price }}</p>
    <button (click)="buy.emit(name)">Buy</button>
  </div>`
})
export class CardComponent {
  @Input() name!: string;
  @Input() price!: number;
}
```

Use in `app.component.html`: `<app-card name="Rice" [price]="62000"></app-card>`

---

## Key Concepts

### `ng new` + `ng serve`
Builds the enterprise building, runs on `4200`.

### `@Component` + `{{ }}`
`selector` tag name, `template` HTML with `{{ name }}`.

---

## Beginner Friendly Explanation

### Analogy: Franchise Blueprint
- **Component = branch blueprint**: `selector` branch name, `template` storefront design, `{{ }}` live price stickers.

### Step 0 — Prepare Device
- Node + Angular CLI (`npm install -g @angular/cli`), `ng serve`, open `4200`.

### How the Computer Reads It
1. `<app-card name="Rice">` → `@Input() name` = "Rice".
2. `(click)` → `buy.emit("Rice")` → parent hears.

### 3 Must-Know Terms
1. **Component/selector/template**: store/sign/showcase

---

## Experiments

- **Green:** Change `name="Rice"` → showcase updates?
- **Yellow:** Remove `[price]` binding → `undefined` shown? Add it.
- **Red:** `ng serve` fails on TS error → red before browser? Fix type.

---

## Challenge

**First Branch:** `CardComponent` (`@Input` name + price + Buy button) + used twice in `App` with different products.

---

## Mini Glossary

- **Component/Input**: store/envelope

---

## Summary

Week 1: **Enterprise Component** — needs TS, for big scale. Next: **Directives & Pipes**.
