# Flexbox: Main Axis, Cross Axis & Precision Alignment

> **Kategori:** CSS3 | **Level:** Box Model & Flexbox Foundations | **Minggu 2:** Flexbox: Main Axis, Cross Axis & Precision Alignment

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

## Summary

You have mastered axis control, space distribution, and flex item alignment. Next week, we expand into two-dimensional layout orchestration with CSS Grid.
