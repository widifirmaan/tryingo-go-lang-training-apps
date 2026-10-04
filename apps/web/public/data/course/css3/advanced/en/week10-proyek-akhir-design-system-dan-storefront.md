# Capstone Project: Responsive E-Commerce Storefront & Design System

> **Kategori:** CSS3 | **Level:** Design Systems, Animations & Modern Features | **Minggu 10:** Capstone Project: Responsive E-Commerce Storefront & Design System
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize the full CSS3 curriculum: Box Model, Flexbox, Grid, Clamp, Positioning, and Motion
- Architect an integrated Design Token system via OKLCH color science and instant Dark Mode theming
- Deploy a sticky glassmorphic header using backdrop-filter and an isolated z-index layer
- Orchestrate a fully responsive product grid free of brittle media queries (auto-fit + minmax)
- Deliver tactile 60 FPS micro-interactions on cards and buttons via GPU-accelerated transitions

---

## Program: Responsive Online Storefront App with Dark Mode & Design Tokens

```html
<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tryngo Artisan Storefront</title>
  <style>
    /* 1. Global Reset & Box Model */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* 2. Comprehensive Design Tokens (OKLCH Color Palette) */
    :root {
      --brand: oklch(0.45 0.12 155);
      --brand-hover: oklch(0.38 0.12 155);
      --bg: oklch(0.97 0.01 95);
      --surface: oklch(1 0 0);
      --text: oklch(0.2 0.02 95);
      --text-muted: oklch(0.55 0.02 95);
      --border: oklch(0.9 0.01 95);
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-full: 9999px;
      --shadow: 0 4px 20px rgba(0,0,0,0.06);
      --shadow-hover: 0 12px 32px rgba(0,0,0,0.12);
      --ease: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    [data-theme="dark"] {
      --brand: oklch(0.68 0.14 155);
      --brand-hover: oklch(0.75 0.14 155);
      --bg: oklch(0.13 0.01 260);
      --surface: oklch(0.18 0.01 260);
      --text: oklch(0.96 0.01 95);
      --text-muted: oklch(0.68 0.02 95);
      --border: oklch(0.28 0.01 260);
      --shadow: 0 4px 20px rgba(0,0,0,0.3);
      --shadow-hover: 0 12px 32px rgba(0,0,0,0.5);
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* 3. Sticky Glassmorphic Header */
    .site-header {
      position: sticky;
      top: 0;
      background: color-mix(in srgb, var(--surface) 85%, transparent);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      z-index: 50;
      padding: 16px 0;
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand-logo { font-size: 1.3rem; font-weight: 800; color: var(--brand); text-decoration: none; }

    .theme-btn {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 16px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s var(--ease);
    }
    .theme-btn:active { transform: scale(0.95); }

    /* 4. Hero Section dengan Fluid Typography */
    .hero-banner {
      padding: clamp(40px, 8vw, 96px) 0;
      text-align: center;
    }
    .hero-banner h1 {
      font-size: clamp(2.2rem, 1.5rem + 3.5vw, 4.2rem);
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
    }

    /* 5. Responsive Product Grid (Auto-Fit & Minmax) */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
      margin-bottom: 64px;
    }

    .product-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s var(--ease), box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
    }

    .product-thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      background: #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #475569;
    }

    .product-info {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .product-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
    .product-price { font-size: 1.4rem; font-weight: 800; color: var(--brand); margin-bottom: 16px; }

    .btn-cart {
      margin-top: auto;
      background: var(--brand);
      color: white;
      border: none;
      padding: 12px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease;
    }
    .btn-cart:hover { background: var(--brand-hover); }
    .btn-cart:active { transform: scale(0.98); }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container nav-inner">
      <a href="#" class="brand-logo">Nusa Storefront</a>
      <button class="theme-btn" onclick="toggleTheme()">Alihkan Mode Gelap</button>
    </div>
  </header>

  <main class="container">
    <section class="hero-banner">
      <h1>Koleksi Hardware Dev Terpilih</h1>
      <p style="color: var(--text-muted); font-size: 1.15rem; max-width: 600px; margin: 0 auto;">Peralatan komputasi ergonomis berkinerja tinggi untuk para software architect dan developer profesional.</p>
    </section>

    <section class="product-grid">
      <article class="product-card">
        <div class="product-thumb">Display 4K 144Hz</div>
        <div class="product-info">
          <h3 class="product-title">Monitor OLED Kalibrasi Pro</h3>
          <p class="product-price">Rp 12.499.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>

      <article class="product-card">
        <div class="product-thumb">Keyboard 75% Custom</div>
        <div class="product-info">
          <h3 class="product-title">Mechanical Keyboard Gasket</h3>
          <p class="product-price">Rp 2.899.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>

      <article class="product-card">
        <div class="product-thumb">Ergonomic Chair Pro</div>
        <div class="product-info">
          <h3 class="product-title">Kursi Kerja Lumbar Support</h3>
          <p class="product-price">Rp 6.250.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>
    </section>
  </main>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>
```

---

## Key Concepts

### Production Design System Anatomy
This capstone demonstrates how all modern CSS tenets fuse into a resilient, high-velocity digital storefront:
1. **Unified Design Tokens**: Colors, radii, elevation shadows, and physics easing curves are centrally authored at `:root`.
2. **Color Science Rigor**: OKLCH declarations ensure typographic luminance contrast remains WCAG-compliant across light and dark permutations.
3. **Elastic Layout Grid**: `repeat(auto-fit, minmax(280px, 1fr))` effortlessly accommodates viewports from compact 360px devices up to expansive 4K displays with zero brittle breakpoint forks.
4. **Pristine Motion Performance**: Card hover elevations (`translateY` & `box-shadow`) operate on the GPU Composite layer without triggering CPU layout reflows.

---

---

## Beginner Friendly Explanation

### Analogy: A World-Class Flagship Boutique
This capstone storefront is like walking into an architectural luxury boutique:
- The foundation is laser-level and structural beams are true (**Box Model**).
- Display shelves organize products cleanly within arm's reach (**Flexbox & CSS Grid**).
- Signage scales proportionally whether viewed from the curb or up close (**Fluid Typography**).
- Lighting dims smoothly at twilight without rearranging physical furniture (**OKLCH Dark Mode**).
- Heavy glass doors glide silently on hydraulic dampers when pushed (**60 FPS Animations**).

## Experiments

- Load the storefront in browser, toggle to Dark Mode, and evaluate the subdued, eye-friendly night palette.
- Resize the screen from mobile to desktop width to watch cards redistribute from 1, to 2, to 3, to 4 columns automatically.
- Hover over product cards to test the tactile elevation lift and subtle shadow expansion.
- Adjust the --brand OKLCH token at :root to observe all brand accents re-theming synchronously.

---

## Challenge

Add a sliding Shopping Bag Drawer to this storefront: implement `position: fixed; right: 0; top: 0; bottom: 0; width: min(400px, 100%); z-index: 100` with a smooth `transform: translateX(100%)` closed state and `translateX(0)` open state.

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

Congratulations! You have completed the entire CSS3 curriculum from foundational box models to a production-grade e-commerce design system. You are now prepared to advance to Tailwind CSS or JavaScript for dynamic programming logic!
