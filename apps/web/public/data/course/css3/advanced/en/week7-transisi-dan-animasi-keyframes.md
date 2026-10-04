# Smooth Transitions, Cubic-Bezier Curves & 60fps Keyframes

> **Kategori:** CSS3 | **Level:** Design Systems, Animations & Modern Features | **Minggu 7:** Smooth Transitions, Cubic-Bezier Curves & 60fps Keyframes
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Adhere to the 60 FPS golden rule: animate only transform and opacity to guarantee GPU composite-thread acceleration
- Craft organic spring physics curves with custom cubic-bezier timing functions
- Author continuous looping and multi-step choreographies using @keyframes directives
- Govern end-state frame persistence via animation-fill-mode (forwards, backwards, both)
- Respect vestibular-sensitive users using @media (prefers-reduced-motion: reduce)

---

## Program: Interactive Button with Pulse Ripple & Loading Spinner

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>60fps CSS Transitions & Keyframes</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --primary-hover: #234735;
      --bg: #F8FAFC;
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 32px;
    }

    /* 1. Tombol Interaktif dengan Transform GPU & Spring Easing */
    .btn-action {
      background: var(--primary);
      color: white;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(46, 91, 68, 0.2);
      /* Hanya animasikan transform dan opacity untuk 60fps */
      transition: transform 0.25s var(--ease-spring), box-shadow 0.25s ease, background 0.2s ease;
      will-change: transform;
    }

    .btn-action:hover {
      background: var(--primary-hover);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 24px rgba(46, 91, 68, 0.3);
    }

    .btn-action:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 6px rgba(46, 91, 68, 0.2);
    }

    /* 2. Indikator Loading Spinner dengan Keyframes Murni */
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #E2E8F0;
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* 3. Badge Denyut (Pulse Ping) */
    .status-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #334155;
    }

    .dot-ping {
      width: 10px;
      height: 10px;
      background: #10B981;
      border-radius: 50%;
      position: relative;
    }

    .dot-ping::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: #10B981;
      opacity: 0.75;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      0%   { transform: scale(0.8); opacity: 0.8; }
      80%, 100% { transform: scale(2.4); opacity: 0; }
    }

    /* Aksesibilitas: Hormati Pengguna Sensitif Animasi */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <button class="btn-action">Jalankan Kompilasi</button>
  <div class="spinner" aria-label="Memuat data"></div>
  <div class="status-badge">
    <span class="dot-ping"></span>
    Cluster Server Aktif
  </div>
</body>
</html>
```

---

## Key Concepts

### The 60 FPS Imperative: Transform & Opacity
Browser rendering pipelines traverse three gates: **Layout** $
ightarrow$ **Paint** $
ightarrow$ **Composite**.
- Animating layout triggers (`width`, `height`, `margin`, `top`) forces CPU geometry recalculation across the DOM tree, causing dropped frames (jank).
- Animating paint properties (`color`, `background`) forces pixel rasterization.
- Animating `transform` and `opacity` bypasses layout and paint entirely, processing on the GPU **Composite thread**. Rendering locks to buttery 60-120 FPS.

### Custom Cubic-Bezier Physics
Standard presets like `linear` feel mechanical. Authoring custom functions like `cubic-bezier(0.34, 1.56, 0.64, 1)` introduces realistic spring dynamics with subtle overshoot before settling.

### Vestibular Inclusivity: prefers-reduced-motion
Users with vestibular motion sensitivity can experience nausea or vertigo from screen animations. Detecting OS accessibility flags via `@media (prefers-reduced-motion: reduce)` is a legal and ethical mandate to eliminate intrusive kinetic movements.

---

---

## Beginner Friendly Explanation

### Analogy: Repainting Canvases vs Shifting Projector Beams
1. **Animating `width` or `margin`** is ordering an artist to repaint an entire canvas from scratch 60 times a second: the artist drops brushes and frames stutter.
2. **Animating `transform: translate()`** is nudging a flashlight projector beam: the hardware GPU merely shifts the projection angle without re-plastering the wall.
3. **`cubic-bezier`** is bouncing a rubber ball: it compresses and rebounds organically before resting, unlike a dead concrete brick hitting the floor.

## Experiments

- Animate button width instead of transform, record a DevTools Performance trace, and inspect the costly Layout Reflow spikes.
- Swap the cubic-bezier curve for linear to feel the mechanical degradation in UI tactility.
- Change the spinner animation duration from 0.8s to 0.2s to witness rapid rotation velocity.
- Enable "Emulate CSS media feature prefers-reduced-motion" in DevTools Rendering panel to verify graceful animation disarmament.

---

## Challenge

Engineer an interactive product showcase card: on hover, the card floats upward (`transform: translateY(-8px)`), shadow diffuses softly, and an "Add to Cart" button reveals via a fade-in slide-up transition.

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

You have mastered 60 FPS GPU-accelerated motion engineering and cubic-bezier physics. Next week, we examine modern OKLCH color spaces and systemic Dark Mode architectures.
