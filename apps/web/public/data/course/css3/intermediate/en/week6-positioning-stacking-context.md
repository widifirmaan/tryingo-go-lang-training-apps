# Positioning, Z-Index Coordinates & Stacking Context

> **Kategori:** CSS3 | **Level:** CSS Grid & Modern Responsive Systems | **Minggu 6:** Positioning, Z-Index Coordinates & Stacking Context
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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

## Visual Mental Model & Architecture Flow

![Diagram CSS Box Model (Margin, Border, Padding, Content)](/diagrams/box-model.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Outer Space Transparan)                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Border & Bingkai)                    │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Padding Internal)        │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Width x Height Teks/UI) │   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `box-sizing: border-box;`
- **Core Functionality:** Calculation of Box Model presisi.
- **Parameters / Attributes:** `border-box | content-box`.
- **System Behavior & Return:** Includes padding dan border ke dalam total lebar elemen agar tidak merusak layout grid..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }
    .box { width: 100%; padding: 20px; border: 4px solid #10b981; background: #1e293b; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="box">Total lebar pas 100% termasuk padding & border</div>
</body>
</html>
```
- **Expected Execution Output:**
```output
Element sized accurately presisi tanpa kalkulasi manual
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Core Functionality:** Arrangement of tata letak satu dimensi.
- **Parameters / Attributes:** `flex-direction, justify-content, align-items`.
- **System Behavior & Return:** Configures perataan dan distribusi ruang kosong antar item anak secara fleksibel..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .navbar { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 16px 24px; border-radius: 12px; }
    .brand { font-weight: bold; color: #10b981; font-size: 18px; }
    .menu { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <nav class="navbar">
    <span class="brand">Tryngo</span>
    <ul class="menu"><li>Beranda</li><li>Kursus</li><li>Profil</li></ul>
  </nav>
</body>
</html>
```
- **Expected Execution Output:**
```output
Item navbar terdistribusi rapi di ujung kiri & kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`
- **Core Functionality:** Sistem kisi dua dimensi responsif.
- **Parameters / Attributes:** `grid-template-columns, gap`.
- **System Behavior & Return:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom tanpa media query..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .card { background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="grid-container">
    <div class="card">Kartu Responsif 1</div>
    <div class="card">Kartu Responsif 2</div>
    <div class="card">Kartu Responsif 3</div>
  </div>
</body>
</html>
```
- **Expected Execution Output:**
```output
Kolom grid otomatis menyusun sesuai lebar layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Core Functionality:** Animasi transisi status interaktif.
- **Parameters / Attributes:** `property, duration, timing-function`.
- **System Behavior & Return:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; background: #0f172a; text-align: center; }
    .btn { display: inline-block; padding: 12px 28px; background: #10b981; color: #022c22; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .btn:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }
  </style>
</head>
<body>
  <button class="btn">Arahkan Kursor ke Sini</button>
</body>
</html>
```
- **Expected Execution Output:**
```output
Tombol terangkat halus 2px saat kursor diarahkan
```

---

## Common Pitfalls & Debugging Tips

### 1. Box Model Padding Side-Effects
- **Symptom / Issue:** Padding and borders expand the element beyond its container width.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Set `box-sizing: border-box;` globally across all elements using the universal selector `*`.

### 2. Specificity Wars & !important Abuse
- **Symptom / Issue:** Styles become unmaintainable and impossible to override cleanly as codebase grows.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Rely on BEM naming or flat utility classes, avoiding deep nesting and `!important`.

### 3. Z-Index Not Applying
- **Symptom / Issue:** Element stays behind siblings despite high numeric z-index values.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Ensure the element establishes a Stacking Context via `position: relative`, `absolute`, or `fixed`.

---

## Summary

You have mastered CSS positioning mechanics and conquered stacking context bugs. Next week we enter Level 3: micro-interactive transitions and high-performance keyframe animations.
