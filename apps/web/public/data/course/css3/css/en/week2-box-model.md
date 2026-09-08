# Box Model — Shop Boxes

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 2:** Box Model

## Learning Objectives

- `content` contents, `padding` inner foam, `border` box, `margin` gap between boxes, `box-sizing: border-box` so sizes don't explode

---

## Why This Matters (Non-IT)

Without box model, product boxes stick together, no gaps — messy.

---

## Program: CSS Boxes

```html
<div style="width: 200px; padding: 16px; border: 2px solid #2E5B44; margin: 12px; background: #EFECE6;">
  Rice 5kg — Rp 62,000
</div>
<style>
  * { box-sizing: border-box; } /* mandatory */
  .box { width: 200px; padding: 16px; border: 2px solid #2E5B44; margin: 12px; }
</style>
```

**Mandatory `box-sizing: border-box`**: `width` includes `padding+border`, doesn't grow.

---

## Key Concepts

### Box Order (Inside → Out)
`content` → `padding` → `border` → `margin`. Memorize: **goods-foam-box-gap**.

### Block vs Inline (The Odin Project Core!)
- `div/p/h1` = **block**: parent-wide + new line (stacked down).
- `span/a/strong` = **inline**: content-wide, no new line (side by side).
- `display: inline-block` = mix (side-by-side boxes, accepts `width`). `display: none` = fully gone (unlike `visibility: hidden` which keeps space!).

```css
.menu a { display: inline-block; padding: 8px 12px; } /* links become side-by-side buttons */
.promo-off { display: none; } /* gone + space gone too */
```

---

## Beginner Friendly Explanation

### Analogy: Boxes & Queues
- **`div` = stacked boxes** (block), **`span` = queued people** (inline, side by side).
- **`margin` = gap between boxes**, **`padding` = foam inside box**.

### Step 0 — Prepare Device
- Same as W1 + open DevTools (`F12` → Elements tab) → point at a box → see the colorful `margin/border/padding` diagram (the Odin way: inspect!).

### How the Computer Reads It
1. `width: 200px` + `border-box` → total stays 200 (content shrinks).
2. Without `border-box` → 200 + 32 (`padding`) + 4 (`border`) = 236 (explodes!).

### 3 Must-Know Terms
1. **content/padding/border/margin**: goods/foam/box/gap
2. **block/inline**: stack/side-by-side
3. **border-box**: size lock

---

## Experiments

- **Green:** Give `span` `width: 200px` → ignored? Switch to `inline-block` → works!
- **Yellow:** `display: none` vs `visibility: hidden` → which keeps empty space?
- **Red:** Remove `box-sizing` → measure total width (200+32+4)? Reattach.

---

## Challenge

**Complete Box Rack:** 3 `.box`es (block, stacked) + 1 row of 3 `span.badge` (`inline-block`) + 1 promo `display: none` + toggle via DevTools (manual `display: block`!).

---

## Mini Glossary

- **box-model**: goods/foam/box/gap
- **block/inline/none**: stack/side-by-side/gone

---

## Summary

Week 2 of 12: **Boxes + Layout** (Level: Complete). Gaps + block/inline mastered. Next: **Colors & Letters**.

---

## Key Concepts

### content / padding / border / margin
Inside-out: content → foam → box → gap.

### `box-sizing: border-box`
`width: 200px` stays 200px including foam+box.

---

## Beginner Friendly Explanation

### Analogy: Packing Box
- **content = goods**, **padding = bubble wrap**, **border = cardboard**, **margin = gap** to next box.

### Step 0 — Prepare Device
- VS Code + browser, DevTools → hover element → see the box diagram.

### How the Computer Reads It
1. `width: 200px` + `border-box` → total stays 200.
2. Without it → 200 + 32 + 4 = 236 (explodes!).

### 3 Must-Know Terms
1. **padding/margin/border**: inside/outside/edge

---

## Experiments

- **Green:** Increase `padding` → box grows inward (with border-box)?
- **Yellow:** Remove `box-sizing` → width explodes?
- **Red:** `margin` vs `padding` swapped → gap moves inside? Fix.

---

## Challenge

**3 Product Boxes:** same `width`, different `padding/margin`, `border-box` on, DevTools box diagram screenshot.

---

## Mini Glossary

- **box-model**: goods/wrap/box/gap

---

## Summary

Week 2 of 12: **Boxes** — content, padding, border, margin. Next: **Colors & Typography**.
