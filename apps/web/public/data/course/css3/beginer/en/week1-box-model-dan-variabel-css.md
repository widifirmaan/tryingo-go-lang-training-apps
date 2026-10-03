# Modern Box Model, Specificity & CSS Custom Properties

> **Kategori:** CSS3 | **Level:** Box Model & Flexbox Foundations | **Minggu 1:** Modern Box Model, Specificity & CSS Custom Properties
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Enforce the universal box-sizing: border-box reset to eliminate unexpected layout expansions
- Master the four Box Model boundaries: Content, Padding, Border, and Margin (including margin collapse)
- Declare and consume reusable CSS Custom Properties at the :root scope
- Compute responsive dimensions dynamically using CSS calc() functions
- Understand CSS selector specificity hierarchy (Inline > ID > Class/Attr/Pseudo > Tag)

---

## Program: UI Component Card with Precision Box Sizing

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pondasi Box Model & Variabel CSS</title>
  <style>
    /* 1. Global Reset & Box Sizing */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* 2. Design Tokens via Custom Properties (:root) */
    :root {
      --color-brand-primary: #2E5B44;
      --color-brand-accent: #E34F26;
      --color-surface-bg: #F4F2ED;
      --color-surface-card: #FFFFFF;
      --color-text-main: #1A1A1A;
      --color-text-muted: #666666;
      --radius-md: 16px;
      --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.08);
      --space-unit: 8px;
    }

    body {
      background-color: var(--color-surface-bg);
      color: var(--color-text-main);
      font-family: system-ui, -apple-system, sans-serif;
      padding: calc(var(--space-unit) * 4);
    }

    /* 3. Komponen Card dengan Box Model Terkendali */
    .pricing-card {
      background-color: var(--color-surface-card);
      border: 2px solid var(--color-brand-primary);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      max-width: 360px;
      padding: calc(var(--space-unit) * 3); /* 24px */
    }

    .pricing-badge {
      display: inline-block;
      background-color: var(--color-brand-primary);
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: calc(var(--space-unit) * 2);
    }

    .pricing-card h2 {
      font-size: 1.5rem;
      margin-bottom: var(--space-unit);
    }

    .pricing-price {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      margin-bottom: calc(var(--space-unit) * 2);
    }

    .pricing-btn {
      display: block;
      width: 100%;
      background-color: var(--color-brand-primary);
      color: #FFFFFF;
      border: none;
      padding: 12px 20px;
      font-weight: 600;
      border-radius: calc(var(--radius-md) / 2);
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="pricing-card">
    <span class="pricing-badge">Paket Pro</span>
    <h2>Pengembangan Web</h2>
    <p class="pricing-price">Rp 499.000<small>/bln</small></p>
    <p style="color: var(--color-text-muted); margin-bottom: 24px;">Akses penuh ke seluruh 28 kurikulum teknologi dan lingkungan playground interaktif.</p>
    <button class="pricing-btn">Mulai Belajar Sekarang</button>
  </div>
</body>
</html>
```

---

## Key Concepts

### The box-sizing: border-box Paradigm
Under the default `content-box` model, padding and borders expand beyond the stated width (a 100px element with 20px padding and 2px border renders at 144px). The universal `box-sizing: border-box` rule locks outer boundaries to stated dimensions, calculating padding and borders inward.

### The Four Box Model Boundaries
1. **Content**: The core bounding rectangle where text and children reside.
2. **Padding**: Transparent inner breathing room separating content from borders.
3. **Border**: The visual frame enclosing content and padding.
4. **Margin**: External clearance separating the element from sibling nodes. Note that adjacent vertical margins collapse into a single shared gap.

### CSS Custom Properties (:root)
Variables are declared with two dashes (e.g. `--color-brand-primary: #2E5B44`). Declaring them on the `:root` pseudo-class grants global cascade availability through the `var()` consumption function.

---

---

## Beginner Friendly Explanation

### Analogy: A Framed Canvas Painting
Think of an HTML element as a framed wall portrait:
1. **Content** is the actual painted artwork canvas.
2. **Padding** is the decorative white matting border between the canvas and the frame.
3. **Border** is the physical wooden frame encasing the artwork.
4. **Margin** is the blank wall space between your painting and the clock hanging next to it.
5. **`border-box`** guarantees that when you purchase a 30x30 cm frame, it fits the designated 30x30 cm shelf space without expanding outward.

## Experiments

- Remove the universal border-box reset and observe elements unexpectedly overflowing their parent containers.
- Change the --color-brand-primary hex value at :root and witness all dependent components re-skin instantly.
- Place two sibling paragraphs with margin-bottom: 30px and margin-top: 20px to observe vertical margin collapsing into 30px.
- Supply fallback parameters to variables like var(--undefined-token, #333333) and verify fallback resolution.

---

## Challenge

Architect a dashboard analytics metric card: declare tokens for text, background, and borders at `:root`. Enforce `box-sizing: border-box`, 20px padding, 12px border-radius, and utilize `calc()` to compute dynamic spacing.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered the modern browser box model, layout shift elimination, and CSS variable architectures. Next week, we dive into one-dimensional Flexbox layout choreography.
