# Responsive Design — Shop Fits Phones & Laptops

> **Kategori:** CSS3 | **Level:** Beginner | **Minggu 7:** Responsive Design

## Learning Objectives

- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` mandatory (without it phones zoom out!) (source: MDN viewport)
- `@media (max-width: 600px) { ... }` phone-only rules, mobile-first vs desktop-first

---

## Why This Matters (Non-IT)

80% of buyers open on phones. Without `viewport`, phones render like a shrunken laptop (ant text). Without `@media`, a 3-column grid on a 360px phone = squished unreadable.

---

## Program: Responsive Phone-Laptop Shop

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .menu { display: flex; gap: 16px; }

    /* Phones ≤600px: 1 column + stacked menu */
    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
      .menu { flex-direction: column; gap: 8px; }
      h1 { font-size: 22px; }
    }
  </style>
</head>
<body>
  <h1>Siti's Shop</h1>
  <nav class="menu"><a>Home</a><a>Products</a><a>Contact</a></nav>
  <div class="grid"><div>Rice</div><div>Spinach</div><div>Eggs</div></div>
</body>
```

Test: Chrome `F12` → `Toggle device toolbar` (`Ctrl+Shift+M`) → pick `iPhone SE` vs `Desktop`.

---

## Key Concepts

### `viewport` = Phone Glasses
`width=device-width` = "screen as wide as the phone". Without it, phones assume 980px → zoom-out.

### `@media (max-width: 600px)` = Phone-Only Rules
Inside only runs when screen ≤600px. `min-width` the opposite (big-only).

### Mobile-First vs Desktop-First
- Write phones first + `@media (min-width: 600px)` for laptops (modern, recommended).
- Or laptops first + `max-width` (above, easier to grasp).

---

## Beginner Friendly Explanation

### Analogy: S-M-L Clothes
- **Desktop = L**, **phone = S**: 1 outfit (`grid`) fits all with `media` tailor.

### Step 0 — Prepare Device
- Chrome DevTools `F12` → device toolbar. Test 360px & 1280px.

### How the Computer Reads It
1. 360px phone → `@media (max-width: 600px)` matches → `grid 1fr`.
2. Laptop → no match → stays 3 columns.

### 3 Must-Know Terms
1. **Viewport/media query**: glasses/screen-rules
2. **max/min-width**: small-only/big-only

---

## Experiments

- **Green:** Remove `viewport` meta → open in phone mode → ants? Reattach.
- **Yellow:** `600px` → `900px` → tablets join 1 column?
- **Red:** Write `@media (max-width: 600px)` without closing brace → all CSS below breaks? Close it.

---

## Challenge

**Complete Responsive Shop:** Grid 3→1 columns + menu row→column + `h1` 28→22px + side-by-side phone & laptop screenshots.

---

## Mini Glossary

- **viewport/media/max-width**: glasses/rules/small

---

## Summary

Week 7 of 12: **Fits All Screens** (Level: Beginner). Phones & laptops neat. Next: **Animation** — smooth motion.
