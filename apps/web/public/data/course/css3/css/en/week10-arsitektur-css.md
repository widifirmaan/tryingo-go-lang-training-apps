# CSS Architecture — Neat BEM Wardrobe

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 10:** Arsitektur CSS

## Learning Objectives

- Understand BEM `block__element--modifier` (source: CSS-Tricks BEM 101, Yandex) — `.card`, `.card__title`, `.card--promo`
- Distinguish `block` (standalone component), `element` (`__` block part), `modifier` (`--` variation) — flat specificity
- Avoid `tag + class` and deep `nested` — use 1 class per element

---

## Why This Matters (Non-IT)

Without BEM, `.title` in `card` clashes with `.title` in `header` — change 1, break everything. With BEM `.card__title` vs `.header__title` no clash, fast search, no team fights.

---

## Program: Shop BEM Wardrobe (CSS-Tricks)

```html
<div class="card card--promo">
  <h3 class="card__title">Rice 5kg</h3>
  <p class="card__price">Rp 62,000</p>
  <button class="card__btn card__btn--buy">Buy</button>
</div>

<style>
  .card { border: 1px solid #ddd; padding: 16px; border-radius: 12px; }
  .card--promo { border-color: #2E5B44; } /* modifier variation */
  .card__title { font-weight: bold; font-size: 18px; } /* element part of card */
  .card__price { color: #2E5B44; }
  .card__btn { padding: 8px; border-radius: 8px; }
  .card__btn--buy { background: #2E5B44; color: white; }
</style>
```

**BEM rules (Yandex):** `block__element--modifier` — `block` standalone, `element` uses `__`, `modifier` uses `--`, all 1 class, no nesting.

---

## Key Concepts

### `block` vs `element` vs `modifier`
- `card` block — standalone component
- `card__title` element — block part, meaningless without `card`
- `card--promo` modifier — block variation

### Flat Specificity
All 1 class → no `tag + class` wars (MDN).

---

## Beginner Friendly Explanation

### Analogy: Labeled Shop Wardrobe

- **BEM = wardrobe labels**: `card` wardrobe, `card__title` drawer inside `card` wardrobe, `card--promo` promo-version `card` wardrobe (green border).
- **Without BEM = label `title` only**: `title` drawers in `card` and `header` clash.

### Step 0 — Prepare Device

VS Code + browser, create `bem.html`, open, change `card--promo` to `card` → green border gone? Add modifier.

### How the Computer Reads It

1. `<div class="card card--promo">` → 2 classes: `card` border, `card--promo` green border overrides.
2. `.card__title` → finds elements with that class, tag irrelevant.

### 3 Must-Know Terms

1. **Block**: standalone component
2. **Element `__`**: block part
3. **Modifier `--`**: variation

---

## Experiments

- **Green:** Change `card--promo` to `card` → green border gone?
- **Yellow:** `card__title--big` element modifier → `.card__title--big { font-size: 24px }`?
- **Red:** Write `div.card` (tag+class) → high specificity, `card--promo` can't override. Use `.card--promo` alone.

---

## Challenge

**Complete BEM Shop:** `header`, `header__logo`, `header__nav`, `header__nav--active` + `card`, `card__price--discount` (strike + red) — BEM 1 class per element, no nesting.

---

## Mini Glossary

- **BEM/block/element/modifier**: methodology

---

## Summary

Week 10 of 12: **Neat BEM Wardrobe** (Level: Complete). Clash-free components. Next: **Modern CSS** — `clamp`.
