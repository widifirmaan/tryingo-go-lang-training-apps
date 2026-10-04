# Flexbox: Main Axis, Cross Axis & Precision Alignment

> **Kategori:** CSS3 | **Level:** Box Model & Flexbox Foundations | **Minggu 2:** Flexbox: Main Axis, Cross Axis & Precision Alignment
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Differentiate between Main Axis and Cross Axis dynamics across flex-direction variations
- Distribute free space along the main axis using justify-content (center, space-between, space-around)
- Govern cross-axis alignment using align-items and individual align-self overrides
- Enable responsive item wrapping using flex-wrap: wrap paired with the gap property
- Master the shorthand flex triplet: flex-grow, flex-shrink, and flex-basis

---

## Program: Responsive Navbar & Feature Card Row with Flexbox

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flexbox Alignment Mastery</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F8F9FA;
      --card-bg: #FFFFFF;
      --text: #212529;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
    }

    /* 1. Header dengan Flexbox Auto-Margin Spacing */
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--card-bg);
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      margin-bottom: 32px;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 24px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--text);
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .btn-login {
      background: var(--primary);
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    /* 2. Flexbox Grid Pembungkus Kartu */
    .features-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
    }

    .feature-card {
      background: var(--card-bg);
      flex: 1 1 calc(33.333% - 20px);
      min-width: 260px;
      padding: 24px;
      border-radius: 12px;
      border-top: 4px solid var(--primary);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .feature-card h3 { margin-bottom: 8px; font-size: 1.25rem; }
    .feature-card p { color: #6C757D; margin-bottom: 16px; flex-grow: 1; }
    .feature-card a { color: var(--primary); font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <header class="app-header">
    <div class="logo"><strong>Tryngo</strong> Platform</div>
    <ul class="nav-links">
      <li><a href="#">Katalog</a></li>
      <li><a href="#">Kurikulum</a></li>
      <li><a href="#">Roadmap</a></li>
    </ul>
    <button class="btn-login">Masuk Akun</button>
  </header>

  <main>
    <section class="features-container">
      <article class="feature-card">
        <h3>Eksekusi Kode WASM</h3>
        <p>Jalankan kode Go dan compiler modern langsung di dalam browser pengguna tanpa ketergantungan server.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
      <article class="feature-card">
        <h3>Kurikulum Berbasis Produk</h3>
        <p>Setiap modul dirancang dari fundamental hingga menghasilkan produk perangkat lunak kelas produksi.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
      <article class="feature-card">
        <h3>Kuis Interaktif Otomatis</h3>
        <p>Evaluasi pemahaman konsep dengan ribuan bank soal pilihan ganda dan validasi sintaks instan.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
    </section>
  </main>
</body>
</html>
```

---

## Key Concepts

### Main Axis vs Cross Axis Mechanics
Activating `display: flex` establishes two perpendicular axes:
- The default `flex-direction: row` runs the Main Axis horizontally and the Cross Axis vertically.
- Flipping to `flex-direction: column` transposes them: Main Axis becomes vertical, Cross Axis horizontal.

### Alignment Properties
- `justify-content`: Dictates spatial distribution along the **main axis** (e.g. `space-between` pushes first/last items to extreme perimeters).
- `align-items`: Dictates alignment across the **cross axis** (e.g. `center` locks items at mid-height).
- `align-self`: Grants individual children permission to override parent cross-axis alignment.

### The Flex Sizing Triplet: Grow, Shrink, Basis
- `flex-grow`: Proportion of available remaining space absorbed by this item (default 0).
- `flex-shrink`: Willingness to contract when container geometry contracts (default 1).
- `flex-basis`: Initial size threshold prior to free-space allocation.

---

---

## Beginner Friendly Explanation

### Analogy: Supermarket Conveyor Belt
1. **`display: flex`** transforms a container into an automated supermarket conveyor belt.
2. **`flex-direction: row`** arranges items side by side; `column` stacks items vertically.
3. **`justify-content: space-between`** pushes the frontmost cereal box to the cashier and the rearmost carton to the shopper.
4. **`align-items: center`** aligns items of disparate heights (tall soda bottles and flat butter tins) along their exact horizontal centerlines.
5. **`gap: 20px`** is the cushioned gap ensuring eggs do not collide with heavy canned goods.

## Experiments

- Change justify-content: space-between to center on the header to see all items collapse into the middle.
- Remove flex-wrap: wrap and resize browser to mobile width to watch items compress unnaturally.
- Switch align-items: center to stretch and observe how items automatically match the tallest sibling.
- Apply margin-left: auto to a navigation item to observe the classic Flexbox right-push behavior.

---

## Challenge

Construct an audio player bar with Flexbox: left side houses album art and song title, center houses playback controls precisely centered, and right side holds volume controls.

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

You have mastered axis control, space distribution, and flex item alignment. Next week, we expand into two-dimensional layout orchestration with CSS Grid.
