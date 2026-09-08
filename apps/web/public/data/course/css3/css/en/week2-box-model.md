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
