# Component Layout Patterns: Sticky, Aspect-Ratio & Nested Flex

> **Kategori:** CSS3 | **Level:** Box Model & Flexbox Foundations | **Minggu 3:** Component Layout Patterns: Sticky, Aspect-Ratio & Nested Flex

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

## Summary

You have mastered advanced component patterns, modern aspect ratios, and sticky contexts. Next week we enter Level 2: two-dimensional layout orchestration with CSS Grid.
