# Flexbox — Sliding Shop Racks

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 4:** Flexbox
> **Prerequisites:** Week 3 — **Colors & Typography**.

## Learning Objectives

- `display: flex` activates sliding rack, `justify-content` left-center-right, `align-items` top-center-bottom, `gap` spacing, `flex-wrap` next row (source: MDN CSS flexbox)

---

## Why This Matters (Non-IT)

3 product cards without flex = stacked 1 column (narrow on wide laptop). With `display: flex; gap: 12px`, 3 side-by-side + neat gaps. `flex-wrap: wrap` auto drops on narrow phones — 1 rule for all screens.

---

## Program: 3-Card Sliding Rack

```html
<div class="rack">
  <div class="card"><h3>Rice</h3><p>Rp 62,000</p></div>
  <div class="card"><h3>Spinach</h3><p>Rp 5,000</p></div>
  <div class="card"><h3>Eggs</h3><p>Rp 28,000</p></div>
</div>
```

```css
.rack {
  display: flex;          /* ACTIVATE sliding rack */
  gap: 12px;              /* gap between cards */
  flex-wrap: wrap;        /* next row when narrow */
  justify-content: center; /* center: flex-start | center | space-between */
  align-items: stretch;   /* equal height */
}
.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 12px;
  width: 180px;
}
```

Shrink browser → cards drop automatically (`wrap`). Remove `wrap` → cards squished!

---

## Key Concepts

### `display: flex` = Activate Rack
Children (`.card`) line up horizontal (default `row`).

### `justify-content` vs `align-items` = Left-Right vs Top-Bottom
- `justify-content`: main axis (horizontal): `flex-start`, `center`, `space-between`.
- `align-items`: cross axis (vertical): `stretch`, `center`.

### `gap` + `flex-wrap` = Gap + Fold
`gap: 12px` replaces manual `margin`. `wrap` responsive without `@media`.

---

## Beginner Friendly Explanation

### Analogy: Store Sliding Rack
- **flex = rack**: goods lined up. **justify = slide left/right**, **wrap = folding rack** when aisle narrows.

### Step 0 — Prepare Device
- Same as W1: `index.html` + `style.css`.

### How the Computer Reads It
1. `display: flex` → children become flex items in a row.
2. `justify-content: center` → leftover space split left-right.

### 3 Must-Know Terms
1. **Flex container/item**: rack/goods
2. **Main/cross axis**: horizontal/vertical
3. **gap/wrap**: gap/fold

---

## Experiments

- **Green:** `justify-content: space-between` → cards to edges?
- **Yellow:** Remove `flex-wrap` + shrink browser → squished?
- **Red:** `flex-direction: column` → stacked vertical? (Rack becomes tower)

---

## Challenge

**Complete Shop Rack:** 6 cards `flex` + `gap` + `wrap` + `justify-content: center` + 1 `header` `display: flex; justify-content: space-between` (logo left, nav right).
- **Link-up (Week 3 — Colors & Typography):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **flex/justify/align**: rack/line-up/even
- **gap/wrap**: gap/fold

---

## Summary

Week 4 of 12: **Sliding Rack** (Level: Complete). Lined up + responsive in 1 rule. Next: **Grid** — boxes.
