# Display and Positioning

> **Category:** CSS3 | **Level:** Layout & Responsive Design | **Week 6:** Display and Positioning
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand 4 foundational display values: block, inline, inline-block, none
- Master 5 CSS positioning modes: static, relative, absolute, fixed, sticky
- Direct precision placement with top, right, bottom, left offsets
- Master z-index layering mechanics and Stacking Context creation
- Construct a sticky navigation bar and fixed floating action button

---

## 1. Core Display Modes

The `display` property governs how elements behave inside the document flow:

- **`block`**: Occupies 100% parent width, breaking onto a new line. Honors `width`, `height`, margins, and paddings (`div`, `p`, `section`).
- **`inline`**: Occupies only its content width, flowing inside sentence lines. Does **not** honor `width`, `height`, or vertical margins (`span`, `a`).
- **`inline-block`**: Flows horizontally alongside inline peers while **honoring** custom `width`, `height`, padding, and margin definitions.
- **`none`**: Completely unmounts the element from rendering, freeing layout space. Unlike `visibility: hidden` which keeps empty bounding box space.

---

## 2. Position Value Behaviors

```text
┌───────────┬──────────────────────────────────────────────────────────────┐
│ Position  │ Characteristics & Flow Behavior                              │
├───────────┼──────────────────────────────────────────────────────────────┤
│ static    │ Natural default. Follows sequential document flow.           │
│ relative  │ Offsets relative to own original slot; retains space.        │
│ absolute  │ Removed from flow; positioned relative to positioned parent. │
│ fixed     │ Removed from flow; locked relative to the browser viewport.  │
│ sticky    │ Flows naturally until reaching scroll threshold, then locks. │
└───────────┴──────────────────────────────────────────────────────────────┘
```

### The Parent-Child Anchor Pattern
The gold standard positioning pattern sets `relative` on the parent to anchor `absolute` child elements:

```css
.parent {
  position: relative; /* Coordinate anchor */
}
.badge-corner {
  position: absolute;
  top: 8px;
  right: 8px;         /* Anchored precisely to parent corner */
}
```

---

## 3. z-index and Stacking Context

`z-index` controls stacking order along the Z-axis (front-to-back):
- `z-index` **only activates** on positioned elements (`relative`, `absolute`, `fixed`, `sticky`).
- Higher numerical integers render in front of lower values.

---

## Program: Sticky Navigation, Absolute Corner Badge, and Fixed Button

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Display dan Positioning</title>
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
      min-height: 140vh; /* Memberi ruang scroll untuk mendemonstrasikan sticky & fixed */
    }

    /* 1. Header dengan Posisi Sticky */
    .navbar-sticky {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navbar-sticky .brand {
      font-weight: 700;
      font-size: 18px;
    }

    .main-content {
      max-width: 600px;
      margin: 32px auto;
      padding: 0 20px;
    }

    /* 2. Kartu dengan Posisi Relative sebagai Jangkar */
    .card-relative {
      position: relative;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    /* 3. Badge dengan Posisi Absolute */
    .badge-absolute {
      position: absolute;
      top: 16px;
      right: 16px;
      background-color: #E2F2E9;
      color: #2E5B44;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid #C6E6D5;
    }

    .card-relative h3 {
      font-size: 20px;
      color: #1A202C;
      margin-bottom: 12px;
    }

    .card-relative p {
      font-size: 15px;
      line-height: 1.6;
      color: #4A5568;
    }

    /* 4. Tombol Aksi Mengambang (Fixed) */
    .btn-fixed-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99;
      background-color: #2E5B44;
      color: #FFFFFF;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      box-shadow: 0 8px 16px rgba(46, 91, 68, 0.3);
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .btn-fixed-fab:hover {
      background-color: #234634;
      transform: scale(1.08);
    }
  </style>
</head>
<body>

  <!-- Navigasi Sticky -->
  <header class="navbar-sticky">
    <div class="brand">Tryngo Portal</div>
    <span>Menu Navigasi</span>
  </header>

  <main class="main-content">
    <div class="card-relative">
      <span class="badge-absolute">Aktif</span>
      <h3>Materi Positioning Terstruktur</h3>
      <p>Gulir halaman ke bawah untuk melihat bagaimana navbar di atas tetap mengunci posisinya (sticky) dan tombol aksi bundar di pojok kanan bawah tetap menempel pada layar (fixed).</p>
    </div>

    <div class="card-relative">
      <h3>Pengujian Scroll Layar</h3>
      <p>Elemen berposisi sticky menyatu secara alami di dalam dokumen hingga batas viewport atas tercapai, lalu beralih fungsi menjadi semacam posisi fixed.</p>
    </div>
  </main>

  <!-- Tombol Mengambang (Floating Action Button) -->
  <a href="#" class="btn-fixed-fab" title="Pesan Baru">+</a>

</body>
</html>
```

---

## Detailed Code Breakdown

- `position: sticky; top: 0; z-index: 100`: Locks navigation to top viewport ceiling once scrolled past.
- `.card-relative { position: relative; }`: Establishes the coordinate origin bounding box for nested absolute children.
- `.badge-absolute { position: absolute; top: 16px; right: 16px; }`: Pins status pill directly to top-right card perimeter.
- `.btn-fixed-fab { position: fixed; bottom: 24px; right: 24px; }`: Pins circular floating action button to viewport bottom-right persistently.
- `z-index: 100` vs `z-index: 99`: Guarantees navigation header remains above content and buttons during scroll.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 6 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Omitting position: relative on the parent container: An absolute child will escape its container and attach directly to the document root <html>.
- Sticky broken by parent overflow: hidden: Any ancestor carrying overflow: hidden/auto disrupts sticky scroll thresholds.
- Missing threshold offset on sticky: Position sticky requires an explicit trigger such as top: 0 to activate lock behavior.
- Applying z-index to static elements: Assigning z-index on non-positioned elements has zero effect on rendering order.

---

## Summary

- Week 6 (Display and Positioning) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
