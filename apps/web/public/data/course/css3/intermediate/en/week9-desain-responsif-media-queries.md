# Responsive Design and Media Queries

> **Category:** CSS3 | **Level:** Layout & Responsive Design | **Week 9:** Responsive Design and Media Queries
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand the Mobile-First architectural philosophy in CSS
- Verify the role of <meta name="viewport"> in mobile rendering
- Master media query syntax @media (min-width: ...) and standard device breakpoints
- Implement fluid responsive scaling via clamp(), min(), and max()
- Construct a multi-column responsive layout adapting smoothly from mobile to desktop (Level 2 Capstone)

---

## 1. The Mobile-First Philosophy

The **Mobile-First** approach dictates defining baseline CSS outside media queries for compact mobile screens (clean 1-column stack), incrementally adding `@media (min-width: ...)` enhancements as viewport widths expand.

```text
Mobile-First Flow:
┌─────────────────┐       ┌───────────────────────┐       ┌────────────────────────────────┐
│ Mobile Screen   │  ──►  │ Tablet (@media 768px) │  ──►  │ Desktop Viewport (@media 1024px│
│ 1-Column Stack  │       │ 2-Column Split        │       │ 3-4 Column Matrix              │
└─────────────────┘       └───────────────────────┘       └────────────────────────────────┘
```

Why Mobile-First dominates:
1. Mobile devices evaluate leaner stylesheets without overhead from unused desktop overrides.
2. Forces disciplined prioritization of primary content hierarchy.

---

## 2. Media Query Syntax and Breakpoints

```css
/* 1. Mobile Default (< 768px) */
.layout {
  display: block;
}

/* 2. Tablet (>= 768px) */
@media (min-width: 768px) {
  .layout {
    display: flex;
    gap: 20px;
  }
}

/* 3. Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

---

## 3. Fluid Scaling with `clamp()`

Eliminate redundant font overrides across breakpoints using `clamp(min, preferred, max)`:

```css
h1 {
  /* Min 1.5rem, fluid 4vw proportional to viewport width, max 2.5rem */
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}
```

---

## Program: Adaptive Responsive Page from Mobile to Desktop

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desain Responsif</title>
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
      padding: 20px;
      line-height: 1.6;
    }

    .container {
      max-width: 960px;
      margin: 0 auto;
    }

    /* 1. Header Responsif dengan clamp() */
    .hero-banner {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: clamp(24px, 5vw, 48px);
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
    }

    .hero-banner h1 {
      font-size: clamp(1.5rem, 4vw, 2.25rem);
      font-weight: 800;
      margin-bottom: 8px;
    }

    .hero-banner p {
      font-size: clamp(0.875rem, 2vw, 1.125rem);
      opacity: 0.9;
    }

    /* 2. Grid Responsif: Default Mobile 1 Kolom */
    .responsive-grid {
      display: grid;
      grid-template-columns: 1fr; /* 1 kolom penuh di layar ponsel */
      gap: 16px;
    }

    .card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 20px;
    }

    .card h3 {
      color: #2E5B44;
      font-size: 18px;
      margin-bottom: 8px;
    }

    .card p {
      color: #4A5568;
      font-size: 14px;
    }

    /* 3. Media Query Tablet (>= 640px): Beralih ke 2 Kolom */
    @media (min-width: 640px) {
      .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    /* 4. Media Query Desktop (>= 1024px): Beralih ke 3 Kolom */
    @media (min-width: 1024px) {
      .responsive-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      body {
        padding: 40px;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <header class="hero-banner">
      <h1>Tata Letak Responsif Mandiri</h1>
      <p>Ubah ukuran lebar jendela browser untuk melihat perubahan kolom secara langsung.</p>
    </header>

    <main class="responsive-grid">
      <div class="card">
        <h3>Layar Ponsel (< 640px)</h3>
        <p>Tampilan mengalir dalam 1 kolom vertikal yang ramah ibu jari dan mudah digulir.</p>
      </div>

      <div class="card">
        <h3>Layar Tablet (>= 640px)</h3>
        <p>Media query mengaktifkan 2 kolom sejajar untuk memanfaatkan lebar layar tablet.</p>
      </div>

      <div class="card">
        <h3>Layar Desktop (>= 1024px)</h3>
        <p>Di layar monitor lebar, tata letak otomatis berkembang menjadi 3 kolom yang lapang.</p>
      </div>
    </main>
  </div>

</body>
</html>
```

---

## Detailed Code Breakdown

- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Essential HTML tag directing mobile devices to align viewport scale with hardware display width.
- `font-size: clamp(1.5rem, 4vw, 2.25rem)`: Fluid typography smoothly scaling between minimum and maximum bounds based on live viewport width.
- `grid-template-columns: 1fr`: Mobile-first baseline stacking all cards into a single column.
- `@media (min-width: 640px)`: Tablet breakpoint splitting grid into 2 columns at 640px and wider.
- `@media (min-width: 1024px)`: Desktop breakpoint expanding matrix into 3 columns at 1024px and wider.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 9 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Omitting the meta viewport tag: Without viewport meta, mobile browsers emulate a 980px desktop screen and zoom out, rendering text illegible.
- Mixing max-width with min-width: Writing mobile-first requires strict min-width queries to maintain logical upward cascade.
- Device-specific breakpoint proliferation: Avoid targeting specific phone models; adhere to content-driven standard breakpoints (640px, 768px, 1024px).
- Hardcoded child widths causing horizontal overflow: Assigning fixed pixel widths (width: 800px) breaks responsive scaling and forces horizontal scrolling.

---

## Summary

- Week 9 (Responsive Design and Media Queries) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
