# RxJS — Shop Data Streams (angular.io)

> **Kategori:** Angular | **Level:** Intermediate | **Minggu 9:** RxJS
> **Prerequisites:** Week 8 — **HttpClient**.

## Learning Objectives

- `Observable` streams, `of(1,2,3).pipe(map(x=>x*x)).subscribe(v=>...)` filters, `async` pipe `| async` in template (source: angular.io/guide/rx-library, rxjs.dev)

---

## Why This Matters (Non-IT)

100 shop prices — hand-write `for` 100x. With `Observable` + `pipe(map)`, 1 line filters all `price < 20000` without `for`.

---

## Program: Shop Price Stream (angular.io)

```typescript
import { of } from "rxjs";
import { map, filter } from "rxjs/operators";

// Price stream
const prices$ = of(62000, 5000, 28000, 15000);

prices$.pipe(
  filter(h => h < 20000), // filter cheap
  map(h => `Rp ${h}`)     // turn into text
).subscribe(teks => console.log(teks));
// Rp 5000
// Rp 15000

// In Angular template: {{ prices$ | async }}
import { Component } from "@angular/core";
import { Observable, of } from "rxjs";

@Component({
  selector: "app-shop",
  template: `<div *ngFor="let h of prices$ | async">{{ h }}</div>`
})
export class ShopComponent {
  prices$ = of([62000, 5000]).pipe(map(arr => arr.filter(h => h < 20000)));
}
```

**Source:** `angular.io/guide/rx-library` — `Observable` + `pipe` + `subscribe`, `rxjs.dev/guide/operators` — `map`, `filter`.

---

## Key Concepts

### `Observable` + `pipe` + `subscribe` = Stream + Filter + Listen
`of(1,2,3).pipe(map(x=>x*x)).subscribe(v=> console.log(v))` → `1,4,9`.

### `async` pipe = Template Subscription
`{{ prices$ | async }}` auto `subscribe` + `unsubscribe`.

---

## Beginner Friendly Explanation

### Analogy: Shop Water Flow

- **`Observable` = water pipe**: `of(62000,5000)` pipe with 2 drops.
- **`pipe(map)` = strainer**: `filter(h=>h<20000)` strains cheap.
- **`subscribe` = bucket**: catches drops that pass.

### Step 0 — Prepare Device

`ng new` + `ng serve` on `4200` (done in W1) + `npm install rxjs` (already in Angular).

### How the Computer Reads It

1. `of(62000,5000).pipe(filter(h=>h<20000))` → creates a new stream with only `5000`.
2. `.subscribe(v=> console.log(v))` → bucket catches `5000`.

### 3 Must-Know Terms

1. **Observable**: flow pipe
2. **pipe/map/filter**: strainers
3. **subscribe/async**: bucket/template subscription

---

## Experiments

- **Green:** `of(1,2,3).pipe(map(x=>x*2)).subscribe(console.log)` → `2,4,6`?
- **Yellow:** change `filter(h=>h<20000)` to `>50000` → only `62000`?
- **Red:** Forget `subscribe` → no log? Add `subscribe`.

---

## Challenge

**Complete Stream Shop:** `of([62000,5000,28000]).pipe(map(arr=>arr.filter(h=>h<20000)), map(arr=>arr.map(h=>`Rp ${h}`))).subscribe(console.log)` → `["Rp 5000"]`.
- **Link-up (Week 8 — HttpClient):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Observable/pipe/subscribe**: pipe/strainer/bucket

---

## Summary

Week 9 of 12: **Streams** — `Observable` + `pipe`. Next: **State Management**.
