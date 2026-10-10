# Flexbox: One-Dimensional Layout

> **Category:** CSS3 | **Level:** Layout & Responsive Design | **Week 7:** Flexbox: One-Dimensional Layout
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand Main Axis and Cross Axis spatial dynamics in Flexbox
- Master Flex Container rules: flex-direction, justify-content, align-items, and gap
- Wrap fluid multi-line item flows using flex-wrap: wrap
- Master Flex Item distribution: flex-grow, flex-shrink, and flex-basis
- Construct a flexible navigation header and responsive product card row

---

## 1. The Flexbox Axis Mental Model

Flexbox distributes spatial allocations along **one single dimension** (either a horizontal row or a vertical column).

```text
                  MAIN AXIS (Direction: justify-content)
            ─────────────────────────────────────────────────────►
        ┌───┬─────────────────────────────────────────────────┐
        │   │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
CROSS   │   │  │  Flex Item 1  │ │  Flex Item 2  │ │  Flex Item 3  │  │
AXIS    │   │  └───────────────┘ └───────────────┘ └───────────────┘  │
        ▼   └─────────────────────────────────────────────────┘
(Cross Direction: align-items)
```

- **Main Axis**: Directed by `flex-direction` (`row` or `column`). Governed by **`justify-content`**.
- **Cross Axis**: Perpendicular to the main axis. Governed by **`align-items`**.

---

## 2. Flex Container Rules

### A. `justify-content` (Main Axis)
- `flex-start`: Aligned to line start.
- `center`: Clustered around the spatial center.
- `space-between`: First item pinned to start, last pinned to end, gaps equalized.
- `space-evenly`: Strict uniform spacing between and around all items.

### B. `align-items` (Cross Axis)
- `stretch` (default): Stretches all items to match tallest sibling height.
- `center`: Centers items vertically along cross axis.

### C. Gaps
Always utilize `gap: 16px` directly on the flex container instead of applying individual child margin calculations.

---

## 3. Flex Item Proportions: grow, shrink, basis

```css
.primary-column {
  flex: 1; /* Absorbs remaining unoccupied space */
}
.fixed-sidebar {
  flex: 0 0 260px; /* Fixed 260px width, neither expanding nor shrinking */
}
```

---

## Program: Complete Navigation and Responsive Card Row via Flexbox

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 24px;
    }

    /* 1. Header dengan Justify-Content: Space-Between */
    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFFFFF;
      padding: 16px 24px;
      border-radius: 12px;
      border: 1px solid #E2E8F0;
      margin-bottom: 32px;
    }

    .brand-logo {
      font-size: 18px;
      font-weight: 800;
      color: #2E5B44;
    }

    .menu-links {
      display: flex;
      gap: 20px;
      list-style: none;
    }

    .menu-links a {
      text-decoration: none;
      color: #4A5568;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.15s ease;
    }

    .menu-links a:hover {
      color: #2E5B44;
    }

    /* 2. Kontainer Kartu dengan Flex-Wrap */
    .cards-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap; /* Bungkus ke baris baru jika layar sempit */
    }

    /* 3. Item Kartu dengan Flex-Grow */
    .feature-card {
      flex: 1 1 240px; /* Minimal 240px, tumbuh seimbang jika ada ruang */
      background-color: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      flex-direction: column; /* Sumbu dalam kartu menjadi vertikal */
      justify-content: space-between;
      min-height: 180px;
    }

    .feature-card h4 {
      font-size: 18px;
      color: #2E5B44;
      margin-bottom: 8px;
    }

    .feature-card p {
      font-size: 14px;
      color: #718096;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .card-footer {
      font-size: 13px;
      font-weight: 700;
      color: #2E5B44;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <header class="header-nav">
    <div class="brand-logo">NusaDesign</div>
    <ul class="menu-links">
      <li><a href="#">Beranda</a></li>
      <li><a href="#">Fitur</a></li>
      <li><a href="#">Harga</a></li>
      <li><a href="#">Kontak</a></li>
    </ul>
  </header>

  <section class="cards-row">
    <div class="feature-card">
      <div>
        <h4>Flex Direction</h4>
        <p>Mengatur orientasi alur item apakah mendatar (row) atau menurun (column).</p>
      </div>
      <a href="#" class="card-footer">Pelajari Sumbu &rarr;</a>
    </div>

    <div class="feature-card">
      <div>
        <h4>Justify Content</h4>
        <p>Mendistribusikan sisa ruang kosong di sepanjang sumbu utama secara terukur.</p>
      </div>
      <a href="#" class="card-footer">Pelajari Penjajaran &rarr;</a>
    </div>

    <div class="feature-card">
      <div>
        <h4>Flex Wrap</h4>
        <p>Memungkinkan elemen turun ke baris berikutnya secara otomatis saat layar menyempit.</p>
      </div>
      <a href="#" class="card-footer">Pelajari Pembungkusan &rarr;</a>
    </div>
  </section>

</body>
</html>
```

---

## Detailed Code Breakdown

- `.header-nav { display: flex; justify-content: space-between; align-items: center; }`: Pushes logo left and navigation links right while vertical centering.
- `.menu-links { display: flex; gap: 20px; }`: Organizes horizontal nav links with consistent 20px gaps without margin hacks.
- `.cards-row { display: flex; gap: 24px; flex-wrap: wrap; }`: Enables multi-line wrapping preventing layout clipping on smaller screens.
- `.feature-card { flex: 1 1 240px; }`: Sets 240px base width; items expand equally across wider viewports and wrap gracefully when constrained.
- `.feature-card { display: flex; flex-direction: column; justify-content: space-between; }`: Nested vertical flexbox pinning card action link cleanly to the bottom.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 7 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Omitting flex-wrap: wrap: Without wrap, Flexbox forces all cards onto a single line, squishing contents or generating horizontal overflow.
- Inverting axes under flex-direction: column: Under column flow, justify-content directs vertical alignment while align-items controls horizontal alignment.
- Manual child margins instead of gap: Adding manual margins creates undesirable excess spacing on the outer perimeter cards.
- Hardcoding fixed width on flex items: Using static width overrides flex-basis and limits fluid responsiveness.

---

## Summary

- Week 7 (Flexbox: One-Dimensional Layout) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
