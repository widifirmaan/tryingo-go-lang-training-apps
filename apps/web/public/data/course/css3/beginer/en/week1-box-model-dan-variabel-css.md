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

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Live Server** (`ritwickdey.liveserver`): Realtime styling preview in browser
- **HTML CSS Support** (`ecmel.vscode-html-css`): CSS class name autocomplete in HTML

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ritwickdey.liveserver --install-extension ecmel.vscode-html-css
```

---

### 2. Runtime & Dependency Installation (Web Browser & VS Code)
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
code --version
```

**macOS (Terminal / Homebrew):**
```bash
code --version
```

**Linux (Ubuntu/Debian / bash):**
```bash
code --version
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
code --version
```

Expected output:
```output
1.9x.x
```

> 💡 **Prerequisite Note:** CSS is executed directly by the browser rendering engine.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-css-project && cd my-css-project
touch index.html styles.css
```
- **Details:** Create an HTML file and link an external styles.css stylesheet.
- **Navigate to the project directory:**
```bash
cd my-css-project
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
Klik Kanan index.html -> "Open with Live Server"
```
Open in browser or terminal: `http://127.0.0.1:5500`

> ℹ️ Browser immediately renders the Flexbox layout and theme colors.

**Initial Entry File (`styles.css`):**
```css
:root {
  --primary-color: #2E5B44;
  --bg-color: #F8FAF9;
  --text-color: #1A202C;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  max-width: 400px;
  border: 1px solid #E2E8F0;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
}
```
Modern styling showcasing CSS Custom Properties, Flexbox, and hover transitions.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-css-project/
├── index.html       # Markup halaman
└── styles.css       # Aturan tata letak & warna
```
Separation of markup structure (HTML) and visual styling (CSS).

---

### 6. Beginner Tips & Best Practices
- Use CSS Variables (`--var-name`) for frictionless dark mode switching and consistent palettes.
- Adopt a mobile-first approach using `@media (min-width: 768px)` breakpoints.

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
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }
    .box { width: 100%; padding: 20px; border: 4px solid #10b981; background: #1e293b; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="box">Total lebar pas 100% termasuk padding & border</div>
</body>
</html>
```
- **Expected Execution Output:**
```output
Element sized accurately presisi tanpa kalkulasi manual
```

### 2. `display: flex; justify-content: space-between; align-items: center;`
- **Core Functionality:** Arrangement of tata letak satu dimensi.
- **Parameters / Attributes:** `flex-direction, justify-content, align-items`.
- **System Behavior & Return:** Configures perataan dan distribusi ruang kosong antar item anak secara fleksibel..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .navbar { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 16px 24px; border-radius: 12px; }
    .brand { font-weight: bold; color: #10b981; font-size: 18px; }
    .menu { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <nav class="navbar">
    <span class="brand">Tryngo</span>
    <ul class="menu"><li>Beranda</li><li>Kursus</li><li>Profil</li></ul>
  </nav>
</body>
</html>
```
- **Expected Execution Output:**
```output
Item navbar terdistribusi rapi di ujung kiri & kanan
```

### 3. `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));`
- **Core Functionality:** Sistem kisi dua dimensi responsif.
- **Parameters / Attributes:** `grid-template-columns, gap`.
- **System Behavior & Return:** Menyusun grid adaptif yang otomatis menyesuaikan jumlah kolom tanpa media query..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
    .card { background: #1e293b; padding: 20px; border-radius: 10px; border: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="grid-container">
    <div class="card">Kartu Responsif 1</div>
    <div class="card">Kartu Responsif 2</div>
    <div class="card">Kartu Responsif 3</div>
  </div>
</body>
</html>
```
- **Expected Execution Output:**
```output
Kolom grid otomatis menyusun sesuai lebar layar
```

### 4. `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- **Core Functionality:** Animasi transisi status interaktif.
- **Parameters / Attributes:** `property, duration, timing-function`.
- **System Behavior & Return:** Memberikan efek perubahan visual yang mulus saat elemen mengalami perubahan status..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; background: #0f172a; text-align: center; }
    .btn { display: inline-block; padding: 12px 28px; background: #10b981; color: #022c22; font-weight: bold; border-radius: 8px; border: none; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .btn:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3); }
  </style>
</head>
<body>
  <button class="btn">Arahkan Kursor ke Sini</button>
</body>
</html>
```
- **Expected Execution Output:**
```output
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

You have mastered the modern browser box model, layout shift elimination, and CSS variable architectures. Next week, we dive into one-dimensional Flexbox layout choreography.
