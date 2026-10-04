# Modern Color Spaces (OKLCH, P3) & Systemic Dark Mode

> **Kategori:** CSS3 | **Level:** Design Systems, Animations & Modern Features | **Minggu 8:** Modern Color Spaces (OKLCH, P3) & Systemic Dark Mode
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Appreciate the superiority of OKLCH: human perceptual lightness uniformity across spectrums
- Master the three OKLCH parameters: L (Lightness 0-1), C (Chroma saturation), and H (Hue angle 0-360)
- Engineer clean Dark Mode theme toggling leveraging CSS tokens and data-theme selectors
- Synchronize application themes with OS system defaults via @media (prefers-color-scheme: dark)
- Maintain strict WCAG AA contrast thresholds (4.5:1) consistently across both themes

---

## Program: Perceptual OKLCH Color Space & Adaptive Dark Theme

```html
<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern OKLCH Colors & Dark Mode</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* 1. Design Tokens Berbasis OKLCH (Light Mode Default) */
    :root {
      /* oklch(Luminance Chroma Hue) */
      --color-brand: oklch(0.45 0.12 155);       /* Hijau Hutan Khas Tryngo */
      --color-brand-light: oklch(0.92 0.04 155);
      --color-accent: oklch(0.62 0.22 35);       /* Terracotta Oranye */
      --color-bg: oklch(0.97 0.01 95);           /* Warm Cream Off-White */
      --color-surface: oklch(1 0 0);             /* Pure White */
      --color-text-main: oklch(0.2 0.02 95);     /* Deep Charcoal */
      --color-text-muted: oklch(0.5 0.02 95);
      --color-border: oklch(0.88 0.01 95);
    }

    /* 2. Semantic Dark Mode Override via Data Attribute & OS Preference */
    [data-theme="dark"] {
      --color-brand: oklch(0.65 0.14 155);       /* Disesuaikan agar kontras tinggi di layar gelap */
      --color-brand-light: oklch(0.25 0.05 155);
      --color-bg: oklch(0.14 0.01 260);          /* Deep Obsidian */
      --color-surface: oklch(0.2 0.01 260);      /* Dark Slate Card */
      --color-text-main: oklch(0.96 0.01 95);    /* Crisp Light Gray */
      --color-text-muted: oklch(0.7 0.02 95);
      --color-border: oklch(0.3 0.01 260);
    }

    body {
      background-color: var(--color-bg);
      color: var(--color-text-main);
      font-family: system-ui, sans-serif;
      padding: 32px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .theme-card {
      max-width: 520px;
      margin: 0 auto;
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }

    .theme-badge {
      display: inline-block;
      background: var(--color-brand-light);
      color: var(--color-brand);
      font-weight: 700;
      font-size: 0.8rem;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 16px;
    }

    .theme-toggle-btn {
      background: var(--color-brand);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="theme-card">
    <span class="theme-badge">Sistem Warna OKLCH</span>
    <h1>Arsitektur Desain Adaptif</h1>
    <p style="color: var(--color-text-muted); margin-top: 12px; line-height: 1.6;">
      Ruang warna OKLCH memisahkan tingkat terang (Luminance), kejenuhan (Chroma), dan rona (Hue) secara perseptual. Mengubah warna tidak lagi merusak rasio kontras aksesibilitas.
    </p>
    <button class="theme-toggle-btn" onclick="toggleTheme()">Alihkan Mode Gelap / Terang</button>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>
```

---

## Key Concepts

### Why OKLCH Supersedes HEX and HSL
Legacy color formats (`rgb`, `hsl`) fail human perceptual biology: human eyes perceive pure yellow as drastically brighter than pure blue at identical HSL lightness values.
In **OKLCH (`Lightness`, `Chroma`, `Hue`)**:
- A **Lightness of 0.7** guarantees identical perceptual luminance to human retinas whether the hue is emerald green, sapphire blue, or amber!
- Developers construct accessible color ramps passing WCAG contrast math deterministically.
- Unlocks the wider Display-P3 color gamut available on modern displays.

### Structured Dark Mode Architecture
Rather than authoring hundreds of inverted color overrides across component classes, declare **Semantic Design Tokens** at `:root` and re-map tokens under `[data-theme="dark"]`. All cards, typography, and borders re-skin synchronously.

---

---

## Beginner Friendly Explanation

### Analogy: Calibrated Studio Lighting
1. **Legacy HSL** is a faulty dimmer switch: at 70% lightness, yellow blinds your eyes while blue is almost completely black.
2. **OKLCH** is a digitally calibrated optical illuminator: 70% Lightness guarantees identical optical energy to the human retina regardless of hue.
3. **Dark Mode Tokens** are like day/night uniform changes: daytime shifts to breathable light fabric, nighttime switches to dark warm jackets, without changing the individual wearing them.

## Experiments

- Click the theme toggle button to witness the smooth color transition across all cards and text.
- Adjust the Lightness parameter of the brand token from 0.45 to 0.75 to observe precise perceptual luminance changes.
- Inspect contrast ratios using the DevTools Color Picker to verify green checkmarks on WCAG AA compliance across both modes.
- Remove the manual data-theme attribute and test @media (prefers-color-scheme: dark) against your operating system theme settings.

---

## Challenge

Build a 5-step OKLCH design token palette for an enterprise UI (Primary, Surface, Background, Danger, Success) complete with Dark Mode overrides passing minimum 4.5:1 text contrast ratios.

---

## Visual Mental Model & Architecture Flow

![Diagram CSS Box Model (Margin, Border, Padding, Content)](/diagrams/box-model.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ MARGIN (Outer Space Transparan)                           │
│   ┌──────────────────────────────────────────────────┐   │
│   │ BORDER (Border & Bingkai)                    │   │
│   │   ┌──────────────────────────────────────────┐   │   │
│   │   │ PADDING (Padding Internal)        │   │   │
│   │   │   ┌──────────────────────────────────┐   │   │   │
│   │   │   │ CONTENT (Width x Height Teks/UI) │   │   │   │
│   │   │   └──────────────────────────────────┘   │   │   │
│   │   └──────────────────────────────────────────┘   │   │
│   └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `box-sizing: border-box;`
- **Core Functionality:** Calculation of Box Model presisi.
- **Parameters / Attributes:** `border-box | content-box`.
- **System Behavior & Return:** Includes padding dan border ke dalam total lebar elemen agar tidak merusak layout grid..
- **Practical Code Example:**
```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- **Expected Execution Output:**
```text
Element sized accurately presisi tanpa kalkulasi manual
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Core Functionality:** Arrangement of tata letak satu dimensi.
- **Parameters / Attributes:** `flex-direction, justify-content, align-items`.
- **System Behavior & Return:** Configures perataan dan distribusi ruang kosong antar item anak secara fleksibel..
- **Practical Code Example:**
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
- **Expected Execution Output:**
```text
Item navbar terdistribusi rapi di ujung kiri & kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`
- **Core Functionality:** Sistem kisi dua dimensi responsif.
- **Parameters / Attributes:** `grid-template-columns, gap`.
- **System Behavior & Return:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom tanpa media query..
- **Practical Code Example:**
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```
- **Expected Execution Output:**
```text
Kolom grid otomatis menyusun sesuai lebar layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Core Functionality:** Animasi transisi status interaktif.
- **Parameters / Attributes:** `property, duration, timing-function`.
- **System Behavior & Return:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status..
- **Practical Code Example:**
```css
.btn {
  transition: transform 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
}
```
- **Expected Execution Output:**
```text
Tombol terangkat halus 2px saat kursor diarahkan
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

You have mastered modern OKLCH color science and systemic Dark Mode token architectures. Next week, we examine CSS cutting-edge capabilities: Container Queries and Subgrid!
