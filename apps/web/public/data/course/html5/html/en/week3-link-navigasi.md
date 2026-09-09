# Links & Navigation — Roads Between Shops

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 3:** Link & Navigasi
> **Prerequisites:** Week 2 — **Text Formatting & Typography**.

## Learning Objectives

- `href` roads: `href="/products"` inside, `href="https://..."` outside, `href="#promo"` jump inside page
- `target="_blank"` opens new tab + `rel="noopener"` safely
- `nav`, `ul>li>a` menu, download `download` and `mailto:` links

---

## Why This Matters (Non-IT)

A shop without roads = homepage customers can't reach products. Links = **roads**. `nav` = signpost.

---

## Program: 3-Page Shop Menu

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/products.html">Products</a></li>
    <li><a href="/contact.html">Contact</a></li>
    <li><a href="https://wa.me/62812" target="_blank" rel="noopener">WA</a></li>
  </ul>
</nav>

<main>
  <h1 id="promo">Today's Promo</h1>
  <p><a href="#promo">Jump to promo</a></p>
  <p><a href="catalog.pdf" download>Download Catalog</a></p>
  <p><a href="mailto:shop@email.com">Email</a></p>
</main>
```

---

## Key Concepts

### `href` 3 Roads
- `/products.html` inside, `https://` outside, `#promo` jump, `mailto:` email

### `nav` + `ul`
`nav` wraps menu, `ul>li>a` road list.

---

## Beginner Friendly Explanation

### Analogy: Roads & Signposts
- **`<a href="/products">` = road to next shop**, **`nav` = signpost** in front.

### Step 0 — Prepare Device
- VS Code + browser, 3 files in one folder.

### How the Computer Reads It
1. Click `<a href="/products.html">` → browser loads that file.
2. Click `#promo` → scrolls to `id="promo"` (no reload).

### 3 Must-Know Terms
1. **href/nav**: road/signpost
2. **target/rel**: new-tab/safe

---

## Experiments

- **Green:** Change `/products.html` to a wrong name → 404? Fix it.
- **Yellow:** Remove `target="_blank"` → WA opens in same tab?
- **Red:** `href="#promo"` without `id="promo"` → nothing happens? Add the id.

---

## Challenge

**3-Page Shop:** `index.html` (Home), `products.html` (list), `contact.html` (WA+email) + same `nav` in 3 files + `#promo` link.

---

## Mini Glossary

- **a/nav/ul**: link/signpost/list

---

## Summary

Week 3 of 14: **Links** — roads between shops. Next: **Images & Media**.
