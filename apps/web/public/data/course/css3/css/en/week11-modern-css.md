# Modern CSS — Trendy Shop with Clamp & Aspect-Ratio (MDN)

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 11:** Modern CSS
> **Prerequisites:** Week 10 — **CSS Architecture**.

## Learning Objectives

- `clamp(1rem, 2.5vw, 2rem)` letters follow screen but never too small/big (source: MDN clamp - 1.8rem, 2.5vw, 2.8rem)
- `aspect-ratio: 16/9` photos stay 16:9 proportional without manual `height`, `object-fit: cover` (source: MDN aspect-ratio)

---

## Why This Matters (Non-IT)

Shop title `font-size: 2.5vw` becomes 10px tiny on phones, 60px huge on TVs. With `clamp(1.8rem, 2.5vw, 2.8rem)` phones get 1.8rem, laptops 2.5vw, TVs max 2.8rem — perfect everywhere. Photos without `aspect-ratio` jump on load (layout shift).

---

## Program: Trendy Shop (MDN)

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Trendy Shop</title>
<style>
  h1 { font-size: clamp(1.8rem, 2.5vw, 2.8rem); } /* MDN example */
  .photo { width: 100%; aspect-ratio: 16/9; object-fit: cover; background: #EFECE6; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px,1fr)); gap: 12px; }
  .card { aspect-ratio: 1; /* square */ display: grid; place-items: center; border: 1px solid #ddd; border-radius: 12px; }
</style></head>
<body>
  <h1>Siti's Shop</h1>
  <img class="photo" src="https://placehold.co/640x360" alt="Shop" width="640" height="360">
  <div class="grid"><div class="card">Rice</div><div class="card">Spinach</div><div class="card">Eggs</div></div>
</body></html>
```

**Source:** MDN `clamp(min, val, max)` and `aspect-ratio: 16/9` + `object-fit`.

---

## Key Concepts

### `clamp(min, val, max)` = Limits
`clamp(1.8rem, 2.5vw, 2.8rem)` → `2.5vw` but never <1.8rem and never >2.8rem.

### `aspect-ratio: 16/9` + `object-fit`
`width:100%` + `aspect-ratio:16/9` → height auto 56% of width, `cover` crops neatly.

---

## Beginner Friendly Explanation

### Analogy: Trendy Shop

- **`clamp` = elastic clothes**: `2.5vw` elastic, but never smaller than `1.8rem` nor bigger than `2.8rem`.
- **`aspect-ratio` = photo frame**: 16:9 frame, photo `cover` fills fully without squish.

### Step 0 — Prepare Device

VS Code + browser, create `modern.html`, open, shrink browser → letters shrink but don't vanish, photo stays 16:9.

### How the Computer Reads It

1. `font-size: clamp(1.8rem, 2.5vw, 2.8rem)` → compute `2.5vw`, if <1.8rem use 1.8rem, if >2.8rem use 2.8rem.
2. `aspect-ratio:16/9` → if `width` 320px, `height` auto 180px.

### 3 Must-Know Terms

1. **clamp**: min-val-max limit
2. **aspect-ratio**: width-height proportion
3. **object-fit**: frame fill way

---

## Experiments

- **Green:** Change to `clamp(1rem, 5vw, 3rem)` → more elastic?
- **Yellow:** `aspect-ratio: 1` → square?
- **Red:** Remove `aspect-ratio` → photo jumps on load (layout shift).

---

## Challenge

**Complete Trendy Shop:** `h1` `clamp(1.8rem, 4vw, 2.8rem)`, `photo` `aspect-ratio:16/9` + `object-fit:cover`, `grid` `auto-fill` + square `aspect-ratio:1` cards, open on phone & laptop → `Lighthouse` check `CLS` 0.
- **Link-up (Week 10 — CSS Architecture):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **clamp/aspect-ratio/object-fit**: elastic/proportion/fill

---

## Summary

Week 11 of 12: **Trendy** (Level: Complete). Elastic letters & proportional photos. Next: **Capstone** — complete CSS shop.
