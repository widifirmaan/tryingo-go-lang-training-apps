# Animation & Transitions — Smooth-Moving Shop (MDN)

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 8:** Animasi & Transisi
> **Prerequisites:** Week 7 — **Responsive Design**.

## Learning Objectives

- `transition: property duration timing-function delay` — smooth `background` change in 0.3s (source: MDN Using transitions)
- `@keyframes` + `animation: name duration timing` — `slide-in` `translate` and `scale` (source: MDN Using animations)
- `transform` doesn't disturb layout — use `translate/scale` not `font-size` for performance

---

## Why This Matters (Non-IT)

A `Buy` button that instantly changes color feels harsh. With `transition: all 0.3s`, colors change smoothly in 0.3 seconds — customers feel the shop is smooth. `animation` for blinking promos without JS.

---

## Program: Smooth Button & Blinking Promo (MDN)

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Shop Animation</title>
<style>
  .btn {
    background: #2E5B44; color: white; padding: 12px 24px; border: none; border-radius: 8px;
    transition: background 0.3s ease, transform 0.3s ease; /* MDN shorthand */
  }
  .btn:hover { background: #1a3326; transform: scale(1.05); }

  .promo {
    background: #EFECE6; padding: 8px; border-radius: 8px;
    animation: blink 1s infinite alternate; /* name duration iteration direction */
  }
  @keyframes blink {
    from { opacity: 1; }
    to { opacity: 0.6; }
  }

  /* Slide-in from MDN */
  @keyframes slide-in {
    from { translate: 100vw 0; scale: 120% 1; }
    to { translate: 0 0; scale: 100% 1; }
  }
  h1 { animation: slide-in 1s ease; }
</style></head>
<body>
  <h1>Siti's Shop</h1>
  <button class="btn">Buy Now</button>
  <div class="promo">Free delivery today!</div>
</body></html>
```

**Source:** MDN `transition: <property> <duration> <timing-function> <delay>` and `@keyframes slide-in`.

---

## Key Concepts

### `transition` vs `animation`
- `transition` for **changes** (hover) — `transition: background 0.3s`
- `animation` for **repeats** (blink) — `animation: blink 1s infinite`

### `transform` Performance
`transform: translate/scale` doesn't disturb box model, faster than `width`/`font-size` (MDN).

### Full Transform Moves (à la freeCodeCamp Penguin)
- `rotate(15deg)` spins, `skewX(10deg)` slants, `scale(1.2)` grows, `translateX(20px)` slides.
- `transform-origin: bottom center` = pivot point (penguin feet, not middle!).
- Combine: `transform: translateX(10px) rotate(15deg) scale(1.1);` (order reads right-to-left in effect!).

```css
.btn:hover { transform: rotate(-2deg) scale(1.05); transform-origin: center; }
.slant-sticker { transform: skewX(-8deg); } /* groovy slanted banner */

---

## Beginner Friendly Explanation

### Analogy: Smooth Shop

- **`transition` = smooth sliding door**: no slamming, slides 0.3 seconds.
- **`@keyframes` = flipbook**: draw 0% and 100%, browser fills the middle.

### Step 0 — Prepare Device

VS Code + browser, create `animation.html`, open, hover button.

### How the Computer Reads It

1. `transition: background 0.3s` → browser notes "if background changes, animate 0.3s".
2. `hover` → `background` changes → browser animates 0.3 seconds.

### 3 Must-Know Terms

1. **transition**: smooth change
2. **keyframes**: flipbook
3. **transform**: slide/scale

---

## Experiments

- **Green:** Change `0.3s` to `1s` → slower?
- **Yellow:** Change `alternate` to `normal` in `blink 1s infinite alternate` → blink jumps back?
- **Red:** Use `font-size` in `transition` vs `transform: scale` → `scale` smoother (MDN).

---

## Challenge

**Complete Smooth Shop:** Button `transition: all 0.3s` + `hover scale`, promo `animation: blink 1s infinite`, `h1` `slide-in 1s`, open in browser → `Lighthouse` performance check.

---

## Mini Glossary

- **transition/animation**: smooth/repeat
- **keyframes/transform**: flipbook/slide

---

## Summary

Week 8 of 12: **Smooth Motion** (Level: Complete). Smooth buttons & blinking promos. Next: **Variables** — one-change palette.
