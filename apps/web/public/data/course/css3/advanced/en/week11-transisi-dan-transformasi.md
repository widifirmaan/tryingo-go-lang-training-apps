# Transitions and Transforms

> **Category:** CSS3 | **Level:** CSS Systems, Animation & Final Project | **Week 11:** Transitions and Transforms
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master 4 transition sub-properties: property, duration, timing-function, delay
- Control acceleration curves: ease, linear, ease-out, cubic-bezier
- Deploy 2D transformations: translate(), rotate(), scale(), skew()
- Pair transitions with :hover and :active for tactile micro-interactions
- Master compositor performance: transform and opacity vs costly layout reflows

---

## 1. Anatomy of CSS Transitions

Transitions smooth value changes over a specified timeline instead of abrupt instantaneous snaps:

```css
/* Shorthand: transition: property duration timing-function delay; */
.btn {
  background-color: #2E5B44;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.btn:hover {
  background-color: #234634;
  transform: translateY(-2px);
}
```

- **`transition-property`**: Target CSS property. Avoid `transition: all` to eliminate performance overhead.
- **`transition-duration`**: Elapsed duration (e.g. `0.2s` or `200ms`).
- **`transition-timing-function`**: Velocity curve (`ease`, `cubic-bezier(0.4, 0, 0.2, 1)`).

---

## 2. 2D Transform Functions

The `transform` property alters visual projection without displacing neighbouring sibling nodes:

- **`translate(x, y)`**: Shifts spatial coordinates (e.g. `translateY(-4px)` for lift).
- **`scale(factor)`**: Magnifies or contracts bounding size (e.g. `scale(1.05)`).
- **`rotate(angle)`**: Rotates orientation (e.g. `rotate(45deg)`).
- **`skew(angle)`**: Shears angles along planes.

---

## 3. The 60 FPS Performance Rule

To maintain fluid 60 frames-per-second performance, **exclusively animate two properties**:
1. **`transform`**
2. **`opacity`**

These properties bypass browser layout reflow calculations, executing directly on the GPU compositor thread.

---

## Program: Interactive Cards with Float Elevation and Tactile Buttons

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Transisi dan Transformasi</title>
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
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      gap: 24px;
      flex-wrap: wrap;
    }

    /* 1. Kartu Interaktif */
    .interactive-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      width: 280px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
      /* Menetapkan transisi pada properti transform dan box-shadow */
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
      cursor: pointer;
    }

    .interactive-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 20px -4px rgba(46, 91, 68, 0.15);
      border-color: #C6E6D5;
    }

    .icon-box {
      width: 44px;
      height: 44px;
      background-color: #E2F2E9;
      color: #2E5B44;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-bottom: 16px;
      transition: transform 0.3s ease;
    }

    .interactive-card:hover .icon-box {
      transform: rotate(15deg) scale(1.1);
    }

    .interactive-card h3 {
      font-size: 18px;
      color: #1A202C;
      margin-bottom: 8px;
    }

    .interactive-card p {
      font-size: 13px;
      color: #718096;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    /* 2. Tombol Aksi Taktil */
    .btn-tactile {
      display: inline-block;
      width: 100%;
      background-color: #2E5B44;
      color: #FFFFFF;
      text-align: center;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    .btn-tactile:hover {
      background-color: #234634;
    }

    .btn-tactile:active {
      transform: scale(0.97); /* Umpan balik klik seperti tombol fisik */
    }
  </style>
</head>
<body>

  <div class="interactive-card">
    <div class="icon-box">✦</div>
    <h3>Transformasi 2D</h3>
    <p>Arahkan kursor untuk melihat animasi pengangkatan kartu dan rotasi ikon secara mulus.</p>
    <a href="#" class="btn-tactile">Klik Tombol</a>
  </div>

  <div class="interactive-card">
    <div class="icon-box">⚡</div>
    <h3>Umpan Balik Taktil</h3>
    <p>Klik tombol di bawah untuk merasakan efek penekanan fisik menggunakan transform scale.</p>
    <a href="#" class="btn-tactile">Tekan Sekarang</a>
  </div>

</body>
</html>
```

---

## Detailed Code Breakdown

- `transition: transform 0.2s cubic-bezier(...)`: Configures physics-based responsive acceleration curves.
- `.interactive-card:hover`: Combines vertical elevation with fractional scaling on pointer hover.
- `.interactive-card:hover .icon-box`: Triggers playful child rotational transformations during parent card hover.
- `.btn-tactile:active { transform: scale(0.97); }`: Emulates real tactile physical button depression on click.
- Compositor optimization: Transforming transform and opacity preserves smooth 60fps rendering.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 11 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Indiscriminate transition: all: Forces layout thread to monitor dozens of properties concurrently, degrading framerates.
- Animating width, height, or margin: Triggers expensive CPU layout reflows per frame causing noticeable stutters.
- Excessive transition durations: Transitions exceeding 400ms for button clicks make interfaces feel sluggish.
- Missing initial state definitions: Undefined initial properties cause sudden visual snapping.

---

## Summary

- Week 11 (Transitions and Transforms) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
