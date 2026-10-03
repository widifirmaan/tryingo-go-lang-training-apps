# Modern Frontier: Container Queries (@container) & Subgrid

> **Kategori:** CSS3 | **Level:** Design Systems, Animations & Modern Features | **Minggu 9:** Modern Frontier: Container Queries (@container) & Subgrid
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Appreciate the architectural paradigm shift from viewport-based media queries to parent-bound Container Queries
- Register container contexts using container-type: inline-size and container-name
- Author modular component-responsive styles using @container (min-width: ...) rules
- Understand subgrid mechanics (grid-template-rows: subgrid) to synchronize row heights across card siblings
- Build truly portable UI components that adapt autonomously to any placement slot (sidebar, modal, main grid)

---

## Program: Container-Responsive Card Component via @container

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Container Queries & Subgrid</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: system-ui, sans-serif;
      background: #F1F5F9;
      padding: 24px;
    }

    /* Layout Induk: Kolom Sempit & Kolom Lebar */
    .showcase-layout {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 32px;
      max-width: 1100px;
      margin: 0 auto;
    }

    /* 1. Mendaftarkan Elemen sebagai Container */
    .card-wrapper {
      container-type: inline-size;
      container-name: product-card;
    }

    /* 2. Komponen Kartu yang Merespon Ukuran Kontainernya Sendiri */
    .product-widget {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 20px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .widget-image {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #CBD5E1;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #475569;
    }

    /* 3. Container Query: Jika lebar kontainer > 450px, ubah jadi horizontal! */
    @container product-card (min-width: 450px) {
      .product-widget {
        flex-direction: row;
        align-items: center;
      }
      .widget-image {
        width: 180px;
        aspect-ratio: 1 / 1;
      }
    }
  </style>
</head>
<body>
  <h1 style="text-align: center; margin-bottom: 24px;">Komponen Identik di Dua Ukuran Kontainer Berbeda</h1>

  <div class="showcase-layout">
    <!-- Slot 1: Di sidebar sempit (320px) -> Merender vertikal otomatis -->
    <div>
      <h3 style="margin-bottom: 12px;">Di Kolom Sempit (Sidebar 320px)</h3>
      <div class="card-wrapper">
        <div class="product-widget">
          <div class="widget-image">Foto Produk</div>
          <div>
            <h4>Paket Mini Cloud</h4>
            <p style="color: #64748B; font-size: 0.9rem;">Cocok untuk proyek uji coba.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Slot 2: Di area utama lebar -> Otomatis beradaptasi horizontal! -->
    <div>
      <h3 style="margin-bottom: 12px;">Di Kolom Lebar (Main Area)</h3>
      <div class="card-wrapper">
        <div class="product-widget">
          <div class="widget-image">Foto Produk</div>
          <div>
            <h4>Paket Mini Cloud</h4>
            <p style="color: #64748B; font-size: 0.9rem;">Komponen yang sama persis secara otomatis beralih menjadi tata letak horizontal karena lebar kontainernya melebihi 450px.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Key Concepts

### The Container Query (@container) Paradigm
For 15 years, responsive design was constrained to global viewport dimensions (`@media (min-width: 768px)`). The fatal limitation: placing a card inside a narrow sidebar on a 4K desktop display caused the card to rupture because the browser only inspected the screen width.

With **Container Queries (`@container`)**:
- Components query **their immediate container footprint**, indifferent to viewport geometry.
- The exact same component markup adapts vertically in a sidebar and horizontally in a hero container without custom class overrides!

### The container-type Property
- `container-type: inline-size`: Designates the container as a queryable boundary along its horizontal inline axis.

### The Subgrid Advantage
In standard nested grids, child elements cannot align with children of neighboring cards when title lengths vary. With `grid-template-rows: subgrid`, cards inherit parent row track coordinates, guaranteeing that action buttons and titles align along a laser-straight horizontal axis.

---

---

## Beginner Friendly Explanation

### Analogy: Water Conforming to its Glass
1. **Legacy Media Queries** are like commanding water to assume shapes based on outdoor weather: "If the city is sunny, the water must freeze into a square". Even if the water is poured into a round cup!
2. **Container Queries** embody the true physics of water: water poured into a slender glass turns tall and narrow; poured into a wide bowl, it expands horizontally.
3. Your components become truly self-aware and autonomous wherever they are mounted.

## Experiments

- Widen the sidebar column from 320px to 500px and watch the sidebar card seamlessly snap to horizontal orientation.
- Remove container-type: inline-size and verify that the @container conditional halts functioning.
- Mount a third instance into an arbitrary 600px wrapper to confirm true component portability.
- Inspect the container query pill badge in the DevTools Elements panel.

---

## Challenge

Engineer an adaptive User Profile Card with Container Queries: < 350px stacks avatar above text, 350px-600px renders avatar beside text, and > 600px exposes a full action toolbar aligned to the far right.

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

You have mastered the most sophisticated CSS capabilities: Container Queries and Subgrid. Next week is the capstone project: crafting a world-class E-Commerce Design System and Responsive Storefront!
