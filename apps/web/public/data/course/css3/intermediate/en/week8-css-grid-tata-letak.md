# CSS Grid: Two-Dimensional Layout

> **Category:** CSS3 | **Level:** Layout & Responsive Design | **Week 8:** CSS Grid: Two-Dimensional Layout
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand two-dimensional grid layouts coordinating rows and columns simultaneously
- Master fractional fr units and repeat() helpers
- Deploy minmax() with auto-fit for auto-responsive grids without media queries
- Master grid-column and grid-row cell spanning techniques
- Implement named grid-template-areas for semantic layout blueprints

---

## 1. Flexbox vs CSS Grid

- **Flexbox**: One-dimensional (row *or* column). Optimized for component-level interfaces like navigation bars and button groups.
- **CSS Grid**: Two-dimensional (rows *and* columns simultaneously). Optimized for macro layouts like dashboards and content matrices.

---

## 2. Fractional Units 'fr' and 'repeat()'

CSS Grid introduces `fr` representing a fraction of available container space:

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Middle column is 2x wider */
  gap: 20px;
}
```

`repeat()` streamlines uniform column declarations:
```css
/* 4 equal-width columns */
grid-template-columns: repeat(4, 1fr);
```

---

## 3. Auto-Responsive Grid Pattern: `auto-fit` & `minmax()`

Generate self-adapting responsive column layouts without media queries:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
```

- **`auto-fit`**: Automatically packs as many columns as fit.
- **`minmax(260px, 1fr)`**: Columns never shrink below 260px; expands dynamically to consume remaining space.

---

## 4. Visual Layout Blueprints with `grid-template-areas`

```css
.dashboard-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  grid-template-columns: 240px 1fr;
}
```

---

## Program: Complete Analytics Dashboard with CSS Grid Blueprint

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>CSS Grid Layout</title>
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

    /* 1. Tata Letak Makro Grid dengan Template Areas */
    .dashboard-container {
      display: grid;
      grid-template-areas:
        "nav    nav    nav"
        "side   stat1  stat2"
        "side   main   main";
      grid-template-columns: 200px 1fr 1fr;
      grid-template-rows: auto auto 1fr;
      gap: 16px;
      max-width: 840px;
      margin: 0 auto;
      min-height: 480px;
    }

    .box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 20px;
    }

    /* 2. Menghubungkan Area Grid */
    .grid-nav {
      grid-area: nav;
      background-color: #2E5B44;
      color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
    }

    .grid-sidebar {
      grid-area: side;
      background-color: #F0F4F2;
      border-color: #DDE5E1;
    }

    .grid-sidebar ul {
      list-style: none;
      margin-top: 12px;
    }

    .grid-sidebar li {
      padding: 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: #2E5B44;
      border-bottom: 1px solid #E2E8F0;
    }

    .grid-stat {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .grid-stat1 { grid-area: stat1; }
    .grid-stat2 { grid-area: stat2; }

    .stat-label {
      font-size: 12px;
      color: #718096;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 800;
      color: #2E5B44;
    }

    .grid-main {
      grid-area: main;
    }

    .grid-main h3 {
      font-size: 18px;
      color: #1A202C;
      margin-bottom: 10px;
    }

    .grid-main p {
      font-size: 14px;
      line-height: 1.6;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="dashboard-container">
    <header class="box grid-nav">
      <strong>Panel Statistik Studio</strong>
      <span style="font-size: 13px;">Online: 48 Pengguna</span>
    </header>

    <aside class="box grid-sidebar">
      <strong>Navigasi</strong>
      <ul>
        <li>Ringkasan</li>
        <li>Laporan Proyek</li>
        <li>Pengaturan</li>
      </ul>
    </aside>

    <div class="box grid-stat grid-stat1">
      <span class="stat-label">Total Kunjungan</span>
      <span class="stat-value">12.480</span>
    </div>

    <div class="box grid-stat grid-stat2">
      <span class="stat-label">Tingkat Retensi</span>
      <span class="stat-value">84,6%</span>
    </div>

    <main class="box grid-main">
      <h3>Analisis Performa Kuartal</h3>
      <p>CSS Grid memberikan kendali presisi atas baris dan kolom sekaligus. Dalam layout ini, sidebar membentang di samping widget metrik dan panel utama secara bersamaan tanpa perlu pembungkus bertingkat.</p>
    </main>
  </div>

</body>
</html>
```

---

## Detailed Code Breakdown

- `grid-template-areas`: Establishes visual 2D layout map anchoring navigation, sidebar, statistics, and main panels cleanly.
- `grid-template-columns: 200px 1fr 1fr`: Allocates 200px fixed width to the sidebar and splits remaining space across two equal 1fr data tracks.
- `.grid-sidebar { grid-area: side; }`: Spans the sidebar across two consecutive vertical row slots without wrapper divs.
- `.grid-main { grid-area: main; }`: Spans the main reporting card horizontally across the lower quadrant under both stat widgets.
- `gap: 16px`: Enforces uniform grid gutter spacing across all cells simultaneously.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 8 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Mismatched grid-template-areas string counts: Every quoted row string must contain the exact same number of column tokens or the declaration invalidates.
- Excessive structural wrapper divs: CSS Grid excels with direct flat children; wrapping siblings unnecessarily limits spanning agility.
- Omitting display: grid: Defining grid-template-columns on a standard block element does nothing.
- Confusing auto-fit with auto-fill: auto-fit expands existing items to consume remaining space while auto-fill reserves empty ghost tracks.

---

## Summary

- Week 8 (CSS Grid: Two-Dimensional Layout) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
