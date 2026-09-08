# Final Project — Complete CSS Shop (Capstone)

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 12:** Proyek Akhir

## Learning Objectives

- Combine `Flex` (sliding racks) + `Grid` (boxes) + `Variables` (`--green`) + `Responsive` (`@media`) + `Animation` (`transition`) into 1-file `shop.css` + deploy via `Netlify` drag-drop — all from W2-W11

---

## Why This Matters (Non-IT)

A shop uncombined = 5 messy separate files. With 1 `shop.css` + `BEM` + `clamp` + `aspect-ratio`, the shop is neat, fast, `Lighthouse` 90+.

---

## Program: Complete CSS Shop (Capstone)

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Complete Shop</title>
<link rel="stylesheet" href="shop.css"></head>
<body>
  <header class="header"><h1 class="header__title">Siti's Shop</h1><nav class="header__nav"><a href="/">Home</a> | <a href="/products">Products</a></nav></header>
  <main class="grid"><div class="card"><h3 class="card__title">Rice 5kg</h3><p class="card__price">Rp 62,000</p><button class="btn">Buy</button></div><div class="card"><h3>Spinach</h3><p>Rp 5,000</p><button class="btn">Buy</button></div></main>
  <footer>© 2026 Shop</footer>
</body></html>
```

```css
/* shop.css — combined W2-W11 */
:root { --green: #2E5B44; --cream: #EFECE6; --radius: 12px; }
* { box-sizing: border-box; }
.header { background: var(--green); color: white; padding: 16px; display: flex; justify-content: space-between; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; padding: 16px; }
.card { border: 1px solid #ddd; padding: 16px; border-radius: var(--radius); transition: transform 0.2s; }
.card:hover { transform: translateY(-4px); }
.card__title { font-size: clamp(1rem, 2vw, 1.2rem); }
.btn { background: var(--green); color: white; padding: 10px; border-radius: var(--radius); border: none; transition: background 0.3s; }
.btn:hover { background: #1a3326; }
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } .header { flex-direction: column; } }
```

Deploy: `netlify.com` → drag `index.html` + `shop.css` → `shop.netlify.app`.

**Capstone task:** Deploy + `Lighthouse` (Chrome DevTools → Lighthouse) 90+ Performance, 100 Accessibility (use `alt`, `label` from W6-W9).

---

## Key Concepts

### Combine Everything
`Flex` racks + `Grid` boxes + `Variables` palette + `clamp` elastic + `transition` smooth + `@media` responsive.

---

## Beginner Friendly Explanation

### Analogy: Complete Shop
- **W2-W5 boxes + paint + racks** → **W6-W11 stickers + responsive + palette + animation** → **W12 combine** into 1-file `shop.css` shop.

### Step 0 — Prepare Device

VS Code + browser + `netlify.com` drag-drop.

### How the Computer Reads It

1. `shop.css` loads once → all pages share variables + layout.
2. Lighthouse audits → score the shop.

### 3 Must-Know Terms

1. **Capstone**: combine all
2. **Lighthouse**: shop score
3. **Deploy**: open online branch

---

## Experiments

- **Green:** Remove `transition` → shop feels harsh? Restore.
- **Yellow:** Remove `@media` → phone squished? Restore.
- **Red:** Skip `box-sizing` → grid overflows? Add.

---

## Challenge

**Deployed Complete CSS Shop:** 1-file `shop.css` with `Flex`, `Grid`, `Variables`, `clamp`, `transition`, `BEM`, `responsive` + complete shop `index.html` (header, 6-product grid, footer) → deploy `Netlify` → `Lighthouse` 90+ screenshot.

---

## Mini Glossary

- **Capstone/deploy/Lighthouse**: combine/open-branch/score

---

## Summary

Week 12 of 12: **CSS Capstone** — complete shop, **CSS3 0→Expert DONE!** 🎉
