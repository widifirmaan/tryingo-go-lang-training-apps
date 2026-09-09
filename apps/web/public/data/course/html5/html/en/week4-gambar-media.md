# Images & Media — Photo Showcase

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 4:** Gambar & Media
> **Prerequisites:** Week 3 — **Links & Navigation**.

## Learning Objectives

- `img src alt width height` photos, mandatory `alt` for blind users, `figure+figcaption` frame + caption
- `srcset`/`sizes` responsive images for phones vs laptops (still HTML: `srcset="small.jpg 480w, big.jpg 800w"`)

---

## Why This Matters (Non-IT)

A shop without photos = customers don't trust. `alt` = description when photo fails to load / read by screen reader.

---

## Program: Photo Showcase

```html
<figure>
  <img src="rice.jpg" alt="5kg rice sack" width="300" height="200">
  <figcaption>Rice 5kg — Rp 62,000</figcaption>
</figure>
<img src="https://placehold.co/300" alt="Product placeholder" width="300" height="200">
<p>If the photo fails, <code>alt</code> shows: "5kg rice sack"</p>
```

**Mandatory `alt`**: empty `alt=""` for decoration, filled for products.

---

## Key Concepts

### `img` + `alt` + `figure`
`src` photo file, `alt` text replacement, `figure/figcaption` frame + caption.

### `width`/`height` Prevent Jumping
Reserve space so page doesn't jump when photo loads.

---

## Beginner Friendly Explanation

### Analogy: Shop Window + Label
- **`img` = window display**, **`alt` = braille label** under it, **`figure` = frame**.

### Step 0 — Prepare Device
- VS Code + browser + 1 photo file beside HTML (or placeholder link).

### How the Computer Reads It
1. `<img src="rice.jpg">` → download photo → show 300×200.
2. Fails → show `alt` text instead.

### 3 Must-Know Terms
1. **src/alt/figure**: file/label/frame

---

## Experiments

- **Green:** Wrong `src` name → `alt` text shows?
- **Yellow:** Remove `width/height` → page jumps on load?
- **Red:** Empty `alt=""` on product → screen reader skips (bad for products, ok for decoration)?

---

## Challenge

**Showcase 3 Photos:** `figure` + `img` + `figcaption` each (name + price) + meaningful `alt` + `width/height`.
- **Link-up (Week 3 — Links & Navigation):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **img/alt/figure**: photo/label/frame

---

## Summary

Week 4 of 14: **Photos** — `img` + `alt` + `figure`. Next: **Lists**.
