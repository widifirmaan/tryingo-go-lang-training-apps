# CSS Grid — Checkered Shop Racks

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 5:** CSS Grid
> **Prerequisites:** Week 4 — **Flexbox**.

## Learning Objectives

- `display: grid` + `grid-template-columns: repeat(3, 1fr)` 3 equal columns, `gap`, `auto-fill minmax(180px, 1fr)` auto responsive (source: MDN CSS grid)

---

## Why This Matters (Non-IT)

Flexbox = 1 direction (rows). Grid = 2 directions (rows + columns) — neat 3×2 catalog. `auto-fill minmax(180px, 1fr)` = phone 1 column, laptop 4 columns AUTOMATICALLY without a single `@media`.

---

## Program: Auto Box Catalog

```html
<div class="catalog">
  <div class="card">Rice<br>Rp 62,000</div>
  <div class="card">Spinach<br>Rp 5,000</div>
  <div class="card">Eggs<br>Rp 28,000</div>
  <div class="card">Sugar<br>Rp 15,000</div>
  <div class="card">Oil<br>Rp 34,000</div>
  <div class="card">Coffee<br>Rp 12,000</div>
</div>
```

```css
.catalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}
.card { border: 1px solid #ddd; padding: 16px; border-radius: 12px; }
```

Shrink browser → 4→2→1 columns automatically. Change `auto-fill` to `3` → always 3 (squished on phones!).

---

## Key Concepts

### `grid-template-columns` = Draw Squares
`repeat(3, 1fr)` 3 equal columns (`fr` = free share). `auto-fill minmax(180px, 1fr)` = fill as many as fit, min 180px.

### Flex vs Grid = 1D vs 2D
- Flex: 1 direction (nav, racks).
- Grid: 2 directions (catalog, gallery).

---

## Beginner Friendly Explanation

### Analogy: Rice Paddy Plots
- **Grid = paddy plots**: `repeat(3, 1fr)` 3 equal plots. `auto-fill` = add plots while they fit.

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `auto-fill minmax(180px, 1fr)` → 800px wide → 4 columns 180px+ (leftover split by `1fr`).

### 3 Must-Know Terms
1. **Grid/fr**: plots/share
2. **auto-fill/minmax**: auto-fill/min-max

---

## Experiments

- **Green:** `minmax(180px, 1fr)` → `250px` → fewer columns?
- **Yellow:** Fixed `repeat(3, 1fr)` + phone → squished? (That's why auto-fill!)
- **Red:** Remove `gap` → cards stick? Reattach.

---

## Challenge

**6-Product Catalog:** `auto-fill minmax(200px,1fr)` + `gap: 16px` + shrink browser, screenshot 4→1 columns.
- **Link-up (Week 4 — Flexbox):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **grid/fr/gap**: plots/share/gap
- **auto-fill**: auto fill

---

## Summary

Week 5 of 12: **Box Rack** (Level: Complete). Responsive without media queries. Next: **Positioning** — stick.
