# Selectors & Basic Styling — First Shop Paint

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 1:** Selector & Basic Styling

## Learning Objectives

- 3 ways to apply paint: `style=""` (direct brush), `<style>` (can in head), `style.css` + `<link>` (paint store) (source: MDN CSS first steps)
- Target: `p` (all), `.card` (class, dot), `#header` (one, hash), `.card p` (inside), `:hover` (on touch)

---

## Why This Matters (Non-IT)

HTML without CSS = naked brick shop. CSS = paint + decor. Without selectors, changing 1 paragraph means editing 30 places. With `.card`, 30 cards 1 rule.

---

## Program: First Painted Shop

`index.html` + `style.css` (2 files, professional way):

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Siti's Shop</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="header">
    <h1>Siti's Shop</h1>
    <p>Fresh vegetables every morning</p>
  </div>

  <div class="card">
    <h2>Rice 5kg</h2>
    <p>Rp 62,000 — <a href="https://wa.me/62812">Order WA</a></p>
  </div>

  <div class="card">
    <h2>Spinach</h2>
    <p>Rp 5,000 — <a href="/products">View</a></p>
  </div>
</body>
</html>
```

```css
/* style.css — separate paint store */
body { font-family: sans-serif; background: #FBF9F5; margin: 0; padding: 20px; }

#header { /* hash = ONLY one */
  background: #2E5B44; color: white; padding: 24px;
  text-align: center; border-radius: 12px;
}

.card { /* dot = CLASS, can be many */
  background: white; border-radius: 12px; padding: 16px; margin: 12px 0;
}

.card p { color: #555; } /* inside .card */
.card:hover { transform: translateY(-2px); } /* when mouse touches */

a[href^="https"] { color: #2E5B44; font-weight: bold; } /* outside links */
```

---

## Key Concepts

### 3 Ways to Apply
- `style=""` direct brush (emergency only).
- `<style>` can in head (practice).
- `<link href="style.css">` paint store (production, reusable by 10 pages).

### Target: Element / `.class` / `#one`
- `p {}` all paragraphs, `.card {}` class, `#header {}` the only one.

### `.card p` / `:hover` / `[href^="https"]`
Inside / on touch / attribute starts-with.

---

## Beginner Friendly Explanation

### Analogy: Paint Store & Stencils
- **CSS = paint**, **selector = stencil**: `.card` card stencil, stamp onto 30 cards.
- **`#header` = shop signboard**: only 1.

### Step 0 — Prepare Device
- VS Code + browser. Create folder `shop-css/` → `index.html` + `style.css` → open `index.html` (`Ctrl+O`).

### How the Computer Reads It
1. `<link href="style.css">` → load the paint store.
2. `<div class="card">` → find `.card` → paste rules.

### 3 Must-Know Terms
1. **Selector/declaration**: target/rule (`color: red`)
2. **Class/id**: dot/hash
3. **External/internal/inline**: store/can/brush

---

## Experiments

- **Green:** Change `.card` background `yellow` → both cards follow?
- **Yellow:** Use `#header` twice → still works but wrong (id must be 1)! Change 1 to class.
- **Red:** Delete `<link>` → plain? Reattach.

---

## Challenge

**Complete Painted Shop:** `index.html` (header + 3 `.card` + outside/inside links) + `style.css` (body, `#header`, `.card`, `.card:hover`, `a[href^="https"]`). Screenshot plain vs painted.

---

## Mini Glossary

- **Selector/class/id**: target/dot/hash
- **link/style**: store/can

---

## Summary

Week 1 of 12: **First Paint** (Level: Complete). Can target & paint. Next: **Box Model** — boxes.
