# Positioning — Shop Stickers

> **Kategori:** CSS3 | **Level:** Beginner | **Minggu 6:** Positioning
> **Prerequisites:** Week 5 — **CSS Grid**.

## Learning Objectives

- `relative` anchor, `absolute` stick to anchor (`top/right`), `fixed` stick to screen, `sticky` stick on scroll, `z-index` stacking (source: MDN position)

---

## Why This Matters (Non-IT)

A "Promo" badge must sit on the card corner (not shift layout), WA button sticks bottom-right while scrolling. Without positioning, badges push text messily. `z-index` stops popups hiding under headers.

---

## Program: Badge + Sticky WA Button

```html
<div class="card">
  Rice 5kg — Rp 62,000
  <span class="badge">Promo</span>
</div>

<a class="wa" href="https://wa.me/62812">WA</a>

<nav class="menu">Home | Products | Contact</nav>
<p>Scroll... (long content)</p>
```

```css
.card { position: relative; border: 1px solid #ddd; padding: 16px; border-radius: 12px; }
.badge {
  position: absolute; top: 8px; right: 8px; /* sticks to .card (relative!) */
  background: #C53030; color: white; padding: 2px 8px; border-radius: 8px; font-size: 12px;
}
.wa {
  position: fixed; bottom: 16px; right: 16px; /* sticks to SCREEN */
  background: #2E5B44; color: white; padding: 12px 16px; border-radius: 50px; z-index: 100;
}
.menu { position: sticky; top: 0; background: white; z-index: 50; } /* sticks when scrolled past */
```

**Golden rule:** `absolute` finds the nearest `relative` parent — without it, sticks to body (lost)!

---

## Key Concepts

### `static` / `relative` / `absolute` / `fixed` / `sticky` = 5 Positions
- `static` default (no `top`).
- `relative` anchor (stays in place).
- `absolute` sticks to anchor.
- `fixed` sticks to screen (scrolls along).
- `sticky` mix: normal until scrolled → sticks.

### `z-index` = Stack
Bigger number on top. `WA z:100` above `menu z:50`.

---

## Beginner Friendly Explanation

### Analogy: Stickers & Boards
- **relative = board**: place to stick.
- **absolute = sticker**: stuck on board corner.
- **fixed = tattoo on glasses**: follows everywhere.
- **z-index = paper stack**: top/bottom.

### Step 0 — Prepare Device
- Same as W1.

### How the Computer Reads It
1. `.badge absolute` → finds `relative` parent (`.card`) → `top:8px right:8px` from card.
2. No `relative` on card → sticks to body!

### 3 Must-Know Terms
1. **relative/absolute**: anchor/stick
2. **fixed/sticky**: screen/scroll
3. **z-index**: stack

---

## Experiments

- **Green:** Remove `relative` from `.card` → badge lost to body? Reattach.
- **Yellow:** badge `z-index` 1 vs WA 100 → WA on top?
- **Red:** `position: fixed` without `bottom/right` → sticks at origin (weird)? Add coordinates.

---

## Challenge

**Complete Sticky Shop:** Card + `Promo` badge absolute + `WA` button fixed + `nav` sticky + correct `z-index` (WA > nav > badge).
- **Link-up (Week 5 — CSS Grid):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **relative/absolute/fixed/sticky**: anchor/stick/screen/scroll

---

## Summary

Week 6 of 12: **Stickers** (Level: Beginner). Badges, sticky buttons, sticky nav. Next: **Responsive** — fits all screens.
