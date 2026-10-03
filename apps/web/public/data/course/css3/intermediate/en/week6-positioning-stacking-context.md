# Positioning, Z-Index Coordinates & Stacking Context

> **Kategori:** CSS3 | **Level:** CSS Grid & Modern Responsive Systems | **Minggu 6:** Positioning, Z-Index Coordinates & Stacking Context

## Learning Objectives

- Distinguish the five position paradigms: static, relative, absolute, fixed, and sticky
- Master the anchoring mechanic: position: absolute references the nearest non-static positioned ancestor
- Deconstruct the Stacking Context: why z-index: 99999 yields to z-index: 2 across disparate stacking contexts
- Architect a centralized z-index layer token system to eliminate arbitrary z-index bidding wars
- Apply frosted-glass aesthetics with backdrop-filter: blur() on fixed navigation components

---

## Program: Modal Dialog & Toast Notification System with Proper Stacking

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Positioning & Stacking Context</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F4F2ED;
      --surface: #FFFFFF;
      --text: #1E293B;
      /* Stacking Layers System */
      --z-base: 1;
      --z-sticky: 10;
      --z-dropdown: 50;
      --z-backdrop: 100;
      --z-modal: 110;
      --z-toast: 200;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 200vh; /* Memberi ruang scroll */
      padding-top: 80px;
    }

    /* 1. Fixed App Navigation Bar */
    .fixed-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: var(--z-sticky);
    }

    /* 2. Kartu dengan Badge Terposisikan Absolute */
    .card-container {
      max-width: 480px;
      margin: 40px auto;
      background: var(--surface);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      position: relative; /* Anchor wajib bagi absolute children */
    }

    .badge-corner {
      position: absolute;
      top: -12px;
      right: 24px;
      background: var(--primary);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(46,91,68,0.3);
      z-index: var(--z-base);
    }

    /* 3. Toast Notifikasi Mengambang */
    .toast-notification {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: var(--z-toast);
      display: flex;
      align-items: center;
      gap: 12px;
    }
  </style>
</head>
<body>
  <nav class="fixed-navbar">
    <strong>Tryngo Platform</strong>
    <button style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 6px;">Buka Menu</button>
  </nav>

  <div class="card-container">
    <span class="badge-corner">Populer 2026</span>
    <h2>Modul Rekayasa Sistem Go & Rust</h2>
    <p style="margin-top: 12px; color: #64748B; line-height: 1.6;">Pelajari manajemen memori, goroutines, concurrency terdistribusi, dan kompilasi binary langsung di playground interaktif kami.</p>
  </div>

  <div class="toast-notification">
    <span>Progres belajar Minggu 5 tersimpan otomatis ke cloud.</span>
  </div>
</body>
</html>
```

---

## Key Concepts

### The Five Positioning Archetypes
1. **static**: Standard natural document flow. Directional offsets and `z-index` have zero effect.
2. **relative**: Preserves natural footprint, permits visual coordinate offsets, and establishes a **positioning coordinate anchor** for absolute descendants.
3. **absolute**: Removes the item from document flow (consuming zero flow dimensions), anchoring against the **nearest non-static positioned ancestor**.
4. **fixed**: Locks coordinates directly to the screen viewport boundary, remaining stationary across page scroll events.
5. **sticky**: Dynamic hybrid toggling between relative and fixed states based on scroll thresholds.

### The Stacking Context Mystery
Developers frequently encounter scenarios where an element with `z-index: 9999` remains hidden beneath an element with `z-index: 1`. The root cause is the **Stacking Context**.
Child nodes are bound to their parent's localized stacking tree. If Parent A possesses a stacking plane of 1 while Parent B possesses a stacking plane of 2, no child inside Parent A can ever visually layer over Parent B, regardless of how astronomical the child's `z-index` is!

Stacking contexts are instantiated by positioned items with integer `z-index`, `opacity` < 1, active CSS `transform`, or `isolation: isolate`.

---

---

## Beginner Friendly Explanation

### Analogy: A Drafting Desk and Stacked Suitcases
1. **`relative`** is placing a sheet of blueprint paper on your drafting desk.
2. **`absolute`** is sticking a postage stamp onto the top-right corner of that blueprint: wherever the paper slides, the stamp tracks the paper's edge.
3. **`fixed`** is a smudge on your eyeglasses: wherever you walk or turn your head (scroll), the smudge remains permanently locked in your line of sight.
4. **Stacking Context** is like stacked luggage trunks: Trunk B sits physically atop Trunk A. Even if Trunk A contains the tallest gold trophy in history, it remains inside Trunk A and can never project above Trunk B.

## Experiments

- Remove position: relative from .card-container and watch the badge fly to the top-right corner of the whole browser window.
- Set z-index: -1 on the toast notification and watch it vanish behind the body background layer.
- Apply opacity: 0.99 to the card container and inspect the establishment of a brand-new stacking context.
- Scroll the viewport vertically to confirm that the fixed navbar and toast stay anchored in screen coordinates.

---

## Challenge

Construct an overlay modal dialog: build a darkened backdrop (`position: fixed; inset: 0; z-index: 100`) and a centered dialog card (`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 110`).

---

## Summary

You have mastered CSS positioning mechanics and conquered stacking context bugs. Next week we enter Level 3: micro-interactive transitions and high-performance keyframe animations.
