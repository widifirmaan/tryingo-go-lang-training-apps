# Colors, Backgrounds, and Borders

> **Category:** CSS3 | **Level:** CSS Basics & Box Model | **Week 5:** Colors, Backgrounds, and Borders
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master color representations: Hex, RGB, RGBA (alpha transparency), and HSL
- Implement linear and radial gradient backgrounds
- Configure background imagery with background-size: cover and background-position
- Master border-radius curvature (including pill and circle shapes)
- Construct realistic visual depth using layered box-shadow elevations (Level 1 Capstone)

---

## 1. CSS Color Formats

CSS supports multiple color models:

- **Hexadecimal (`#RRGGBB`)**: Standard format, e.g. `#2E5B44`.
- **RGB / RGBA**: `rgb(46, 91, 68)` or with alpha opacity `rgba(46, 91, 68, 0.8)`.
- **HSL**: `hsl(147, 33%, 27%)` (Hue, Saturation, Lightness). Intuitive for programming lighter or darker shades.

---

## 2. Backgrounds: Colors, Imagery, and Gradients

### A. Linear Gradients
```css
.banner {
  background: linear-gradient(135deg, #2E5B44 0%, #1A3427 100%);
}
```

### B. Background Images
```css
.hero {
  background-image: url('landscape.jpg');
  background-size: cover;      /* Covers entire viewport container without distortion */
  background-position: center; /* Centers visual focal point */
  background-repeat: no-repeat;
}
```

---

## 3. Curvature (`border-radius`) and Depth (`box-shadow`)

### A. Border Radius Patterns
- Card corners: `border-radius: 12px;`
- Pill shape badges: `border-radius: 9999px;`
- Circle avatar: `border-radius: 50%;` (when width equals height).

### B. Layered Box Shadows
```css
.card {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 20px -5px rgba(0, 0, 0, 0.08);
}
```

---

## Program: Interactive Product Card with Gradients and Multi-Layer Elevation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Warna dan Bayangan</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F0F4F2;
      color: #1F2937;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    /* Kartu Produk Utama */
    .product-card {
      background: #FFFFFF;
      width: 100%;
      max-width: 340px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.05),
        0 10px 15px -3px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 10px 20px -3px rgba(46, 91, 68, 0.12),
        0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    /* Header Banner dengan Gradasi Linier */
    .card-banner {
      background: linear-gradient(135deg, #2E5B44 0%, #1C3829 100%);
      color: #FFFFFF;
      padding: 32px 24px;
      text-align: center;
      position: relative;
    }

    /* Badge Bentuk Kapsul/Pil */
    .badge-status {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      color: #E2F2E9;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 8px;
    }

    .card-banner h3 {
      font-size: 20px;
      font-weight: 700;
    }

    /* Konten Body Kartu */
    .card-body {
      padding: 24px;
    }

    .card-body p {
      font-size: 14px;
      color: #4B5563;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .price-tag {
      font-size: 24px;
      font-weight: 800;
      color: #2E5B44;
      margin-bottom: 20px;
      display: block;
    }

    /* Tombol Pembelian */
    .btn-buy {
      display: block;
      width: 100%;
      background-color: #2E5B44;
      color: #FFFFFF;
      text-align: center;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      transition: background-color 0.15s ease;
    }

    .btn-buy:hover {
      background-color: #234634;
    }
  </style>
</head>
<body>

  <div class="product-card">
    <div class="card-banner">
      <span class="badge-status">Edisi Terbatas</span>
      <h3>Paket Pelatihan Web</h3>
    </div>
    
    <div class="card-body">
      <p>Kuasai teknik penyusunan antarmuka web mulai dari sintaks dasar hingga tata letak profesional tanpa framework.</p>
      <span class="price-tag">Rp 249.000</span>
      <a href="#" class="btn-buy">Daftar Sekarang</a>
    </div>
  </div>

</body>
</html>
```

---

## Detailed Code Breakdown

- `background: linear-gradient(...)`: Renders a 135-degree diagonal dual-stop color transition across the card header.
- `border-radius: 9999px`: Standard CSS technique for perfect capsule pill shapes on `.badge-status`.
- `box-shadow`: Layered elevation shadow pairing subtle ambient spread with directional falloff.
- `.product-card:hover`: Subtle tactile lift via `translateY(-4px)` responding to pointer hover.
- `overflow: hidden`: Ensures upper header gradient adheres strictly to the parent container corner curvature.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 5 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Harsh over-saturated shadows: Pure black high-opacity shadows look muddy and unnatural.
- Omitting overflow: hidden on rounded parents: Unclipped child backgrounds spill out beyond curved parent borders.
- Poor text contrast over gradients: Ensure typography remains legible across all stops of the gradient spectrum.
- Insufficient shadow blur: Produces an abrupt rigid silhouette rather than natural diffused ambient light.

---

## Summary

- Week 5 (Colors, Backgrounds, and Borders) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
