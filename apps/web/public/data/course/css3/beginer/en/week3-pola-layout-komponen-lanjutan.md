# Component Layout Patterns: Sticky, Aspect-Ratio & Nested Flex

> **Kategori:** CSS3 | **Level:** Box Model & Flexbox Foundations | **Minggu 3:** Component Layout Patterns: Sticky, Aspect-Ratio & Nested Flex
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Implement position: sticky while fulfilling layout prerequisites (align-items: flex-start)
- Guarantee visual proportions without layout distortion using aspect-ratio
- Nest Flexbox hierarchies cleanly to model real-world application views
- Avoid overflow: hidden ancestors that break sticky positioning contexts
- Construct an e-commerce checkout sidebar that tracks scroll progression alongside long copy

---

## Program: E-Commerce Product Detail Page with Sticky Sidebar

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Detail Produk — Nusa Store</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F4F2ED;
      --surface: #FFFFFF;
      --border: #E5E5E5;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      padding: 32px 16px;
    }

    /* Layout 2 Kolom dengan Flexbox */
    .product-page-layout {
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      gap: 32px;
      align-items: flex-start; /* Syarat mutlak agar sticky berfungsi */
    }

    /* Kolom Utama Konten */
    .main-gallery {
      flex: 1 1 65%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .image-placeholder {
      width: 100%;
      aspect-ratio: 16 / 9; /* Menjaga proporsi visual modern */
      background: #D9D9D9;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #666;
    }

    .product-description {
      background: var(--surface);
      padding: 28px;
      border-radius: 16px;
      line-height: 1.6;
    }

    /* Kolom Sidebar Ringkasan Pembelian Sticky */
    .sticky-checkout-sidebar {
      flex: 1 1 35%;
      position: sticky;
      top: 24px; /* Menempel saat scroll mencapai 24px dari atas */
      background: var(--surface);
      padding: 28px;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }

    .sticky-checkout-sidebar h2 { font-size: 1.4rem; margin-bottom: 8px; }
    .price-tag { font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 20px; }

    .btn-buy {
      display: block;
      width: 100%;
      background: var(--primary);
      color: white;
      text-align: center;
      padding: 14px;
      font-weight: 700;
      border-radius: 10px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="product-page-layout">
    <div class="main-gallery">
      <div class="image-placeholder">Foto Produk Utama (16:9 Aspect Ratio)</div>
      <div class="product-description">
        <h1>Laptop Rekayasa Ultralight Pro 14"</h1>
        <p>Dirancang khusus untuk software developer: prosesor 12-core, RAM 32GB LPDDR5X, layar OLED kalibrasi warna 100% DCI-P3, dan bobot hanya 1.1 kilogram.</p>
        <p style="margin-top: 16px;">Sasis aluminium unibody dengan manajemen termal dua kipas mikro untuk pendinginan stabil saat kompilasi proyek besar berlangsung.</p>
      </div>
      <div class="image-placeholder">Foto Detail Port & Keyboard Ergonomis</div>
      <div class="product-description">
        <h3>Ulasan Benchmark</h3>
        <p>Waktu kompilasi Linux kernel 40% lebih kencang dibanding generasi sebelumnya dengan daya tahan baterai hingga 14 jam kerja aktif.</p>
      </div>
    </div>

    <aside class="sticky-checkout-sidebar">
      <h2>Ringkasan Pesanan</h2>
      <div class="price-tag">Rp 19.999.000</div>
      <p style="color: #666; margin-bottom: 24px;">Stok tersedia di gudang Jakarta. Garansi resmi 2 tahun servis dan penggantian suku cadang.</p>
      <a href="#" class="btn-buy">Beli Sekarang</a>
    </aside>
  </div>
</body>
</html>
```

---

## Key Concepts

### Mechanics of position: sticky
An element declared `position: sticky` behaves as `position: relative` within standard flow until the scroll boundary reaches a designated threshold (`top: 24px`), at which point it pins within its parent envelope.

### Mandatory Rules for Sticky Execution
1. A directional offset must be declared (at least `top`, `bottom`, `left`, or `right`).
2. The enclosing parent container must have remaining scrollable height beyond the sticky item.
3. In a flex context, default `align-items: stretch` equalizes column heights, preventing sticky travel. Specify `align-items: flex-start`.
4. No ancestor element may declare `overflow: hidden`, `auto`, or `scroll`.

### The Modern aspect-ratio Property
`aspect-ratio: 16 / 9` instructs the browser engine to compute heights from dynamic widths automatically, replacing legacy percentage padding hacks.

---

---

## Beginner Friendly Explanation

### Analogy: A Refrigerator Memo Magnet
1. **`position: sticky`** is like a memo magnet on a whiteboard: as you roll a long canvas upward, the magnet travels with the paper until hitting the top edge, where it pins and stays visible as long as the canvas continues underneath.
2. **`aspect-ratio: 16 / 9`** is a widescreen television: regardless of room dimensions, height calculates proportionally so actors never appear stretched or squashed.

## Experiments

- Delete align-items: flex-start and observe the sticky sidebar failing to pin because parent height equals item height.
- Modify top: 24px to top: 0 to observe the element pinning flush against the top edge of the viewport.
- Switch aspect-ratio: 16 / 9 to 1 / 1 and watch the placeholder transform into an exact square.
- Add overflow: hidden to body and verify that sticky scrolling ceases to function.

---

## Challenge

Build a blog reading view: left column contains long copy with imagery, right column hosts a "Table of Contents" navigation box pinned with `position: sticky; top: 32px` and a back-to-top button.

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

You have mastered advanced component patterns, modern aspect ratios, and sticky contexts. Next week we enter Level 2: two-dimensional layout orchestration with CSS Grid.
