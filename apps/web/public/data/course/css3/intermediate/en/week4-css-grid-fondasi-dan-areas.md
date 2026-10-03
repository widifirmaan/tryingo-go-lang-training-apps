# CSS Grid: 2D Layouts, Fr Units & Grid Template Areas

> **Kategori:** CSS3 | **Level:** CSS Grid & Modern Responsive Systems | **Minggu 4:** CSS Grid: 2D Layouts, Fr Units & Grid Template Areas
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Contrast one-dimensional Flexbox with two-dimensional simultaneous row-and-column CSS Grid
- Harness fractional units (fr) for fluid, proportional free-space apportionment
- Declare visual layout architecture mapped intuitively using grid-template-areas
- Generate auto-responsive component matrices without media queries via repeat(auto-fit, minmax(200px, 1fr))
- Position elements explicitly using directional grid track lines (grid-column: 1 / -1)

---

## Program: Complex Application Dashboard with Grid Template Areas

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid Master Dashboard</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F0F2F5;
      --surface: #FFFFFF;
      --text: #1E293B;
      --border: #E2E8F0;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 16px;
    }

    /* Layout Dashboard 2D dengan CSS Grid */
    .dashboard-grid {
      display: grid;
      min-height: calc(100vh - 32px);
      gap: 16px;
      grid-template-columns: 240px 1fr 300px;
      grid-template-rows: 64px 1fr 48px;
      grid-template-areas:
        "header  header  header"
        "sidebar content stats"
        "footer  footer  footer";
    }

    .grid-header  { grid-area: header;  background: var(--surface); border-radius: 12px; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border); }
    .grid-sidebar { grid-area: sidebar; background: var(--surface); border-radius: 12px; padding: 20px; border: 1px solid var(--border); }
    .grid-content { grid-area: content; background: var(--surface); border-radius: 12px; padding: 24px; border: 1px solid var(--border); overflow-y: auto; }
    .grid-stats   { grid-area: stats;   background: var(--surface); border-radius: 12px; padding: 20px; border: 1px solid var(--border); }
    .grid-footer  { grid-area: footer;  background: var(--surface); border-radius: 12px; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #64748B; border: 1px solid var(--border); }

    /* Nested Grid Responsif untuk Metrik */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .metric-card {
      background: var(--bg);
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid var(--primary);
    }
  </style>
</head>
<body>
  <div class="dashboard-grid">
    <header class="grid-header">
      <h2>Tryngo Cloud Admin</h2>
      <span>Status: Operasional 99.9%</span>
    </header>

    <nav class="grid-sidebar">
      <h3>Navigasi</h3>
      <ul style="list-style: none; margin-top: 12px; line-height: 2;">
        <li><a href="#" style="color: var(--primary); font-weight: 600;">Ringkasan</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Pengguna Aktif</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Database Cluster</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Pengaturan</a></li>
      </ul>
    </nav>

    <main class="grid-content">
      <h1>Kinerja Sistem & Analisis Beban</h1>
      <p style="color: #64748B; margin-top: 4px;">Metrik performa real-time seluruh node server di wilayah Asia Tenggara.</p>

      <div class="metrics-grid">
        <div class="metric-card">
          <small>Total Request / Detik</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px;">42.850</h3>
        </div>
        <div class="metric-card">
          <small>Latensi Rata-rata</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px; color: var(--primary);">8.2 ms</h3>
        </div>
        <div class="metric-card">
          <small>Utilisasi CPU</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px;">34.2%</h3>
        </div>
      </div>
    </main>

    <aside class="grid-stats">
      <h3>Aktivitas Terbaru</h3>
      <p style="margin-top: 12px; font-size: 0.9rem; color: #64748B;">Autoscaling berhasil menambahkan 2 pod baru di zona ap-southeast-1.</p>
    </aside>

    <footer class="grid-footer">
      <span>&copy; 2026 Tryngo Enterprise. Hak cipta dilindungi.</span>
      <span>Versi 3.8.4-prod</span>
    </footer>
  </div>
</body>
</html>
```

---

## Key Concepts

### Two-Dimensional Grid Philosophy
Flexbox manages layout strictly per row or per column in isolation. CSS Grid governs **both rows and columns concurrently**, orchestrating synchronized horizontal and vertical coordinate tracks.

### The Fractional Unit (fr)
The `fr` unit represents a fraction of remaining free space within the grid envelope:
- `grid-template-columns: 1fr 2fr 1fr;` allocates 4 equal fractional units: the center column receives 2fr (50%), while flank columns receive 1fr each (25%).

### Semantic Grid Template Areas
`grid-template-areas` enables developers to author visual layout blueprints using declarative ASCII mappings:
```css
grid-template-areas:
  "header  header"
  "sidebar content";
```
Children assign themselves to zones via `grid-area: header`, effortlessly docking into coordinates.

### The Holy Grail auto-fit & minmax Formula
The expression `repeat(auto-fit, minmax(180px, 1fr))` produces autonomously responsive grids: columns populate dynamically when screen space allows and collapse gracefully on mobile screens without a single `@media` rule!

---

---

## Beginner Friendly Explanation

### Analogy: An IKEA Modular Grid Shelf
1. **Flexbox** is a clothes drying rack: items align along a single line, but cannot lock into synchronized 2D coordinates across dimensions.
2. **CSS Grid** is an IKEA shelving unit with rigid, perfectly aligned row-and-column cube dividers.
3. **`grid-template-areas`** is labeling each cubby with chalk: "Top shelf = Hats, Center = Books, Bottom = Shoes".
4. **`repeat(auto-fit, minmax(...))`** is an elastic display shelf that expands slots automatically when space permits and contracts when boundaries tighten.

## Experiments

- Resize your browser window to observe metric cards automatically shifting from 3 columns down to 1 column without media queries.
- Swap "sidebar" and "stats" tokens inside grid-template-areas to witness layout sections instantaneously switch positions.
- Modify grid-template-columns: 240px 1fr 300px to 1fr 3fr 1fr to turn fixed sidebars into proportional fluid columns.
- Apply grid-column: span 2 to a metric card and observe it occupying twice the horizontal width of its peers.

---

## Challenge

Build an editorial magazine photo mosaic grid: create a 6-photo gallery where the first hero image spans 2 rows and 2 columns via `grid-column: span 2; grid-row: span 2`, with the remaining 5 photos filling the remaining grid spaces.

---

## Visual Mental Model & Architecture Flow

![Diagram CSS Box Model (Margin, Border, Padding, Content)](/diagrams/box-model.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Outer Transparent Space)                         │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Decorative Outline / Frame)              │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Inner Breathing Room)           │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Rendered Width x Height)│   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `box-sizing: border-box;`
- **Core Functionality:** Universal Box Model recalculation.
- **Parameters / Attributes:** `border-box | content-box`.
- **System Behavior & Return:** Includes padding and borders within calculated element width and height, preventing layout breakage and overflows.
- **Practical Code Example:**
```javascript
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- **Expected Execution Output:**
```text
Elements respect exact specified dimensions without expanding
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Core Functionality:** One-dimensional Flexbox layout system.
- **Parameters / Attributes:** `flex-direction, justify-content, align-items`.
- **System Behavior & Return:** Distributes empty space and aligns child items along primary and cross axes flexibly.
- **Practical Code Example:**
```javascript
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
```
- **Expected Execution Output:**
```text
Navbar brand and links pinned cleanly to opposite edges
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`
- **Core Functionality:** Two-dimensional responsive grid layout.
- **Parameters / Attributes:** `grid-template-columns, gap`.
- **System Behavior & Return:** Constructs responsive card grids that automatically calculate column counts without manual media queries.
- **Practical Code Example:**
```javascript
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```
- **Expected Execution Output:**
```text
Items rearrange smoothly into 1, 2, or 3 columns
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Core Functionality:** Interactive state change animation.
- **Parameters / Attributes:** `property, duration, timing-function`.
- **System Behavior & Return:** Interpolates CSS property changes smoothly when hover, focus, or active states trigger.
- **Practical Code Example:**
```javascript
.btn {
  background-color: #2E5B44;
  transition: transform 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
}
```
- **Expected Execution Output:**
```text
Button glides up 2px smoothly when hovered
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

You have mastered precision two-dimensional layout orchestration with CSS Grid and fractional units. Next week, we dive into modern responsive systems and fluid typography with clamp().
