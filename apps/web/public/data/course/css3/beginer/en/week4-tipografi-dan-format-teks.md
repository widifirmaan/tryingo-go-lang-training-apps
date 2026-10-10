# Typography and Text Formatting

> **Category:** CSS3 | **Level:** CSS Basics & Box Model | **Week 4:** Typography and Text Formatting
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand font-family selection and system fallback font stacks
- Master typography sizing units: px vs rem (root em) vs em for accessibility
- Control vertical reading rhythm with line-height and letter-spacing
- Direct typographic weight (font-weight) and paragraph alignment (text-align)
- Build readable article hierarchy using consistent type scales

---

## 1. Font Family & Fallback Stacks

When assigning `font-family`, always specify a resilient fallback sequence concluding with a generic family:

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

- If San Francisco (Apple) is absent, the browser falls back to Segoe UI (Windows), Roboto (Android), and finally generic `sans-serif`.

---

## 2. Sizing Units: Why 'rem' Outperforms 'px' for Accessibility

- **`px` (Pixels)**: Static absolute units. If users scale their system browser font size for readability, `px` values remain rigid and inaccessible.
- **`rem` (Root EM)**: Relative to root (`<html>`) font size.
  - Standard browser baseline: `1rem = 16px`.
  - `1.25rem = 20px`
  - `2rem = 32px`
- **`em`**: Relative to immediate parent font size. Prone to cascading magnification when deeply nested.

---

## 3. Vertical Rhythm: line-height & letter-spacing

Reading comfort depends heavily on spacing ergonomics:

```css
p {
  font-size: 1rem;       /* 16px */
  line-height: 1.6;      /* Unitless multiplier based on font-size */
  letter-spacing: -0.01em;
  color: #374151;        /* Softer charcoal avoiding harsh pure black #000 */
}
```

- Always specify unitless values for `line-height` (e.g. `1.5` or `1.6`) so child elements inherit proportional scaling.

---

## Program: Editorial Typography Layout with Clear Modular Scale

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Spesimen Tipografi</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #FAFAFA;
      color: #1F2937;
      padding: 40px 20px;
    }

    .article-container {
      max-width: 640px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 40px;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
    }

    .category-tag {
      font-size: 0.75rem; /* 12px */
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #2E5B44;
      margin-bottom: 8px;
      display: inline-block;
    }

    h1 {
      font-size: 2rem; /* 32px */
      line-height: 1.25;
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.025em;
      margin-bottom: 16px;
    }

    .lead-paragraph {
      font-size: 1.125rem; /* 18px */
      line-height: 1.6;
      color: #4B5563;
      margin-bottom: 24px;
    }

    h2 {
      font-size: 1.375rem; /* 22px */
      line-height: 1.35;
      font-weight: 700;
      color: #1F2937;
      margin-top: 32px;
      margin-bottom: 12px;
      letter-spacing: -0.015em;
    }

    p {
      font-size: 1rem; /* 16px */
      line-height: 1.7;
      color: #374151;
      margin-bottom: 16px;
    }

    blockquote {
      border-left: 4px solid #2E5B44;
      padding-left: 16px;
      margin: 24px 0;
      font-style: italic;
      color: #4B5563;
    }
  </style>
</head>
<body>

  <article class="article-container">
    <span class="category-tag">Arsitektur Desain Web</span>
    <h1>Pondasi Tipografi yang Nyaman di Mata Pembaca</h1>
    
    <p class="lead-paragraph">
      Tipografi yang tertata rapi bukan sekadar memilih jenis huruf yang menarik, melainkan membangun hierarki ukuran dan jarak baca yang proporsional.
    </p>

    <h2>Mengapa Rasio Ukuran Penting?</h2>
    <p>
      Mata manusia membutuhkan pembeda visual yang tegas antara judul, subjudul, dan isi paragraf. Penggunaan rasio terukur menggunakan satuan rem membantu pembaca memindai konten dengan cepat.
    </p>

    <blockquote>
      "Desain yang baik membuat teks terasa tidak terlihat, pembaca hanya menikmati informasinya."
    </blockquote>

    <p>
      Hindari penggunaan warna hitam murni (#000000) pada latar belakang putih terang karena menimbulkan kontras berlebih yang melelahkan mata pembaca dalam durasi panjang.
    </p>
  </article>

</body>
</html>
```

---

## Detailed Code Breakdown

- `font-size: 2rem` vs `1.125rem` vs `1rem`: Modular scale creating crisp contrast hierarchy across title, lead, and body copy.
- `line-height: 1.7`: Comfortable reading line spacing preventing reader eye tracking strain across lengthy passages.
- `letter-spacing: -0.025em`: Subtle negative tracking on large headlines tightening visual cohesion.
- `.category-tag`: Employs uppercase transformation with expanded letter-spacing for refined badge typography.
- `blockquote`: Accentuated editorial pullquote featuring forest green left border and italic posture.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 4 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Too tight line-height: Setting line-height: 1.0 on multi-line text forces sentences to crash into each other.
- Static px sizing across all typography: Strips away browser assistive zoom scaling for low-vision accessibility.
- Poor contrast ratios: Light gray text on white backgrounds fails WCAG accessibility compliance standards.
- Font sprawl: Loading more than 2 distinct font families degrades visual hierarchy and bloats network performance.

---

## Summary

- Week 4 (Typography and Text Formatting) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
