# Component Communication — Envelopes Between Angular Branches

> **Kategori:** Angular | **Level:** Beginner | **Minggu 4:** Component Communication
> **Prerequisites:** Week 3 — **Services & DI**.

## Learning Objectives

- `@Input()` incoming envelope (`name="Rice"`, `[price]="62000"`), `@Output() EventEmitter` outgoing bell, `(buy)` parent ears (source: angular.dev/guide/components/inputs-outputs)

---

## Why This Matters (Non-IT)

50 product cards all in `App` → 500 lines. With `CardComponent` bricks + `@Input`/`@Output`, `App` is only a 3-line `*ngFor`. Without `@Output`, child buttons can't add to the parent cart.

---

## Program: Bell-Equipped Card

```typescript
// card.component.ts — brick
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-card",
  template: `
    <div style="border: 1px solid #ddd; padding: 12px; border-radius: 8px;">
      <h3>{{ name }}</h3>
      <p>Rp {{ price }}</p>
      <button (click)="buy.emit(name)">Buy</button>
      <ng-content></ng-content>
    </div>`
})
export class CardComponent {
  @Input() name!: string;   // envelope: name="Rice"
  @Input() price!: number;  // envelope: [price]="62000"
  @Output() buy = new EventEmitter<string>(); // bell
}
```

```html
<!-- app.component.html — assemble -->
<app-card *ngFor="let p of list"
  [name]="p.name" [price]="p.price"
  (buy)="add($event)">
  <small>Free delivery &gt;Rp 100,000</small>
</app-card>
<p>Cart: {{ cart.join(", ") }}</p>
```

```typescript
// app.component.ts
list = [{ name: "Rice", price: 62000 }];
cart: string[] = [];
add(name: string) { this.cart.push(name); }
```

---

## Key Concepts

### `@Input()` = Incoming Envelope
`name="Rice"` (text) vs `[price]="62000"` (expression — without `[]` becomes string `"62000"`!).

### `@Output()` + `EventEmitter` = Outgoing Bell
`buy.emit(name)` pressed → parent `(buy)="add($event)"` hears, `$event` = name.

### `<ng-content>` = Hole
Content inside `<app-card>...</app-card>` shows at `<ng-content>`.

---

## Beginner Friendly Explanation

### Analogy: Labeled Bricks & Bells
- **@Input = writing on bricks**, **@Output = doorbell**, **ng-content = empty box**.

### Step 0 — Prepare Device
- Same as W1: `ng generate component card` (CLI creates 4 files!).

### How the Computer Reads It
1. `[name]="p.name"` → fills `@Input() name`.
2. Click → `buy.emit("Rice")` → `add("Rice")`.

### 3 Must-Know Terms
1. **Input/Output**: in/out
2. **EventEmitter/$event**: bell/bell-content
3. **ng-content**: hole

---

## Experiments

- **Green:** `name="Rice"` vs `[name]="'Rice'"` → same? `price="62000"` (no []) → string?
- **Yellow:** `buy.emit({ name, price })` object → `$event.name`?
- **Red:** Child setting `this.name = "X"` directly → works but misleads (dual truth)! Send events only.

---

## Challenge

**Complete Brick Shop:** `Card` (`@Input` + `@Output` + `ng-content`) + `App` (`*ngFor` 4 + `cart`).

---

## Mini Glossary

- **Input/Output/ng-content**: in/out/hole
- **EventEmitter/$event**: bell/content

---

## Summary

Week 4 of 5: **Branch Envelopes** (Level: Beginner). Split & report. Next: **Forms** — two-way forms.
