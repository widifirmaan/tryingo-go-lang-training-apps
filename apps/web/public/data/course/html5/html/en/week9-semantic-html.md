# Semantic HTML — Shop with Clear Signboards

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 9:** Semantic HTML

## Learning Objectives

- `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` — clear signboards, not all `div` (MDN Semantics)

---

## Why This Matters (Non-IT)

`div`-only pages are blank rooms with no signs: screen readers and Google get lost. Semantic tags = labeled rooms.

---

## Program: Semantic Shop

```html
<body>
  <header><h1>Siti's Shop</h1><nav><a href="/">Home</a> | <a href="/products">Products</a></nav></header>
  <main>
    <section><h2>Products</h2><article><h3>Rice 5kg</h3><p>Rp 62,000</p></article></section>
    <aside><h2>Promo</h2><p>Free delivery &gt;100k</p></aside>
  </main>
  <footer>© 2026 Shop</footer>
</body>
```

**Don't:** `<div id="header">` → use `<header>`.

---

## Key Concepts

### `header` / `nav` / `main`
`header` top sign, `nav` roads, `main` core (only 1 per page).

### `section` / `article` / `aside` / `footer`
`section` theme room, `article` standalone card, `aside` side promo, `footer` bottom.

---

## Beginner Friendly Explanation

### Analogy: Shop Rooms with Signs
- **`<header>` = shop sign**, **`<nav>` = directory**, **`<main>` = sales floor**, **`<aside>` = promo corner**.

### Step 0 — Prepare Device
- VS Code + browser, rewrite a `div` page to semantic, compare screen-reader landmarks.

### How the Computer Reads It
1. `<main>` → "core content starts here" for screen reader jump.
2. `<article>` → independent card Google can index alone.

### 3 Must-Know Terms
1. **header/main/footer**: sign/floor/bottom

---

## Experiments

- **Green:** Replace `<div id="header">` with `<header>` → same look, better meaning?
- **Yellow:** Two `main` tags → validator complains (only 1)?
- **Red:** All-`div` page in screen reader → no landmarks? Restore semantic.

---

## Challenge

**Semantic Shop:** `header+nav`, `main` with `section>article` × 2, `aside` promo, `footer` — zero layout `div`.

---

## Mini Glossary

- **header/nav/main/section/article/aside/footer**: sign/roads/floor/room/card/side/bottom

---

## Summary

Week 9 of 14: **Clear Signboards** — `header/nav/main`. Next: **Multimedia**.
