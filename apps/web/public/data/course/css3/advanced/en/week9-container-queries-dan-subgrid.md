# Modern Frontier: Container Queries (@container) & Subgrid

> **Kategori:** CSS3 | **Level:** Design Systems, Animations & Modern Features | **Minggu 9:** Modern Frontier: Container Queries (@container) & Subgrid

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

## Summary

You have mastered the most sophisticated CSS capabilities: Container Queries and Subgrid. Next week is the capstone project: crafting a world-class E-Commerce Design System and Responsive Storefront!
