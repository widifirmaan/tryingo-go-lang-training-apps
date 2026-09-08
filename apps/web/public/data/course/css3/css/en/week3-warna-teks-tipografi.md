# Colors & Typography — Shop Paint and Letters

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 3:** Warna & Tipografi

## Learning Objectives

- `color` ink, `background` wall paint, `#2E5B44` hex vs `red` name vs `rgb()` (source: MDN color)
- `font-family`, `font-size: 16px` vs `1.2rem`, `line-height: 1.6` breathing, `text-align` alignment (source: MDN font)

---

## Why This Matters (Non-IT)

Light gray text on white → elderly customers can't read (contrast fails). `line-height: 1` → lines stick, hard to read. Right colors + letters = shop readable for all ages + looks professional.

---

## Program: Colorful Shop with Neat Letters

```html
<h1 class="title">Siti's Shop</h1>
<p class="desc">Fluffy rice, fresh vegetables every morning from local farmers.</p>
<p class="promo">Promo: Free delivery for orders &gt;Rp 100,000</p>
```

```css
.title {
  color: #2E5B44;              /* shop green hex */
  font-family: Georgia, serif; /* serif fallback if Georgia missing */
  font-size: 28px;
  text-align: center;
}
.desc {
  color: #333;        /* dark gray, not #999 (too light!) */
  line-height: 1.6;   /* breathing between lines */
  font-size: 16px;
}
.promo {
  background: #EFECE6;
  color: #1a3326;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}
```

---

## Key Concepts

### `color` / `background` + 3 Ways to Write Colors
- `red` name (limited), `#2E5B44` hex (popular), `rgb(46,91,68)` numbers.
- `hsl(150, 40%, 30%)` = hue/saturation/lightness (more human than rgb!). `hsl(150 40% 30% / 0.8)` with transparency.
- Gradients: `background: linear-gradient(#2E5B44, #EFECE6);` (top→bottom). `radial-gradient(circle, ...)` sun.

### `font-family` + Fallbacks
`Georgia, serif` — if Georgia missing, use any serif.

### `font-size` + `line-height` + `text-align`
`16px` fixed, `1.2rem` follows root, `line-height: 1.6` breathing, `center/left/justify` alignment.

---

## Beginner Friendly Explanation

### Analogy: Paint & Print
- **color/background = ink/paper**, **font-family = banner letter style**, **line-height = book line spacing**.

### Step 0 — Prepare Device
- Same as W1: `style.css` + reload.

### How the Computer Reads It
1. `.title { color: #2E5B44 }` → find class `title` → paint green.
2. `font-family: Georgia, serif` → Georgia there? Use it. Not? Serif.

### 3 Must-Know Terms
1. **Hex/rgb**: color codes
2. **line-height**: line breathing
3. **Serif/sans**: with-feet/plain

---

## Experiments

- **Green:** `color: #999` on paragraph → hard to read? Change to `#333`.
- **Yellow:** `line-height: 1` vs `2` → which is comfy?
- **Red:** `font-family: "WeirdFont"` (missing) → serif fallback? Add fallback.

---

## Challenge

**Complete Color Banner:** green title `28px center` + 2 paragraphs (`#333`, `1.6`) + promo box (`background` + `bold`) + 1 `rgb()` color.

---

## Mini Glossary

- **color/background**: ink/paper
- **line-height/align**: breathing/alignment

---

## Summary

Week 3 of 12: **Paint & Letters** (Level: Complete). Readable for all ages. Next: **Flexbox** — sliding racks.
