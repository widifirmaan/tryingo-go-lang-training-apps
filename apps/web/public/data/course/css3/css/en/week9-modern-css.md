# Modern CSS

> CSS | Module 9

## Learning Objectives

- Declare and use Custom Properties (CSS variables)
- Use calc() for dynamic calculations in CSS
- Apply native CSS nesting for cleaner stylesheets
- Control stylesheet priority with @layer
- Use modern selectors: :has(), :not(), :is(), :where()

---

## Program: Modern Features

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CSS Modern</title>
  <style>
    @layer base, theme, components;
    @layer base {
      *, *::before, *::after { box-sizing: border-box; margin: 0; }
      body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
      h1 { text-align: center; margin-bottom: 1.5rem; }
      .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    }
    @layer theme {
      :root { --primary: #1572B6; --primary-light: #4a9de0; --primary-dark: #0d4f82; --success: #2ecc71; --warning: #f39c12; --danger: #e74c3c; --radius: 8px; --shadow: 0 2px 8px rgba(0,0,0,0.1); --gap: 1rem; }
      h1 { color: var(--primary); }
    }
    @layer components {
      .btn { padding: 0.6rem 1.5rem; border: none; border-radius: var(--radius); cursor: pointer; font-weight: 600; transition: transform 0.2s, opacity 0.2s; }
      .btn:hover { transform: scale(1.05); }
      .btn-primary { background: var(--primary); color: #fff; }
      .btn-danger { background: var(--danger); color: #fff; }
      .btn-success { background: var(--success); color: #fff; }
      .calc-box { width: calc(100% - var(--gap) * 2); background: var(--primary); color: #fff; padding: 1rem; border-radius: var(--radius); text-align: center; margin: 0.8rem auto; }
      .row { display: flex; gap: var(--gap); flex-wrap: wrap; }
      .sidebar { width: calc(30% - var(--gap) / 2); background: var(--primary-dark); color: #fff; padding: 1rem; border-radius: var(--radius); }
      .main { width: calc(70% - var(--gap) / 2); background: var(--primary-light); color: #fff; padding: 1rem; border-radius: var(--radius); }
      .clamp-text { font-size: clamp(1rem, 3vw, 2rem); background: #e3f0fa; padding: 1rem; border-radius: var(--radius); text-align: center; margin: 0.8rem 0; }
      .has-demo:has(.special) { background: #e3f0fa; border-left: 4px solid var(--primary); }
      .nesting-demo { background: #f5f5f5; padding: 1rem; border-radius: var(--radius); }
      .nesting-demo h3 { color: var(--primary); }
      .nesting-demo p { color: #555; margin-top: 0.5rem; }
      .nesting-demo p strong { color: var(--danger); }
      .scroll-snap { display: flex; gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; padding: 1rem 0; }
      .scroll-snap > div { scroll-snap-align: start; min-width: 200px; background: var(--primary); color: #fff; padding: 2rem; border-radius: var(--radius); text-align: center; flex-shrink: 0; }
      .scroll-snap > div:nth-child(2) { background: var(--danger); }
      .scroll-snap > div:nth-child(3) { background: var(--success); }
      .scroll-snap > div:nth-child(4) { background: var(--warning); }
    }
  </style>
</head>
<body>
  <h1>CSS Modern</h1>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Custom Properties</h2>
    <p>Warna, radius, shadow dikontrol oleh <code>--var</code> di <code>:root</code>.</p>
    <div style="display:flex;gap:0.5rem;margin-top:0.8rem">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-danger">Danger</button>
      <button class="btn btn-success">Success</button>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">calc()</h2>
    <div class="calc-box">100% - 2rem (calc(100% - var(--gap) * 2))</div>
    <div class="row">
      <div class="sidebar">30%</div>
      <div class="main">70%</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">clamp()</h2>
    <div class="clamp-text">Teks ini clamp(1rem, 3vw, 2rem)</div>
  </div>
  <div class="card has-demo">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">:has() Selector</h2>
    <p>Card ini memiliki border biru karena mengandung elemen dengan class <code>.special</code>.</p>
    <p class="special" style="color:var(--primary);font-weight:600;margin-top:0.5rem">&rarr; Elemen .special di dalam card</p>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Nesting CSS</h2>
    <div class="nesting-demo">
      <h3>Contoh Nesting</h3>
      <p>CSS modern memungkinkan <strong>nesting</strong> selector seperti preprocessor.</p>
    </div>
  </div>
  <div class="card">
    <h2 style="color:var(--primary);margin-bottom:0.5rem">Scroll Snap</h2>
    <div class="scroll-snap">
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
      <div>Slide 4</div>
    </div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.5rem">Gulir horizontal — setiap slide men-snap ke posisi start.</p>
  </div>
</body>
</html>
```

---

## Explanation

### Custom Properties (CSS Variables)

CSS variables are declared with `--name` and read with `var(--name)`.

```css
:root {
  --primary: #1572B6;
  --spacing: 1rem;
}
.element {
  color: var(--primary);
  margin: var(--spacing);
}
```

Benefits: **reusable**, **follows cascade**, changeable via JavaScript, overridable per component.

### calc()

Math function: `width: calc(100% - 40px)`. Supports +, -, *, /. Can combine different units.

### CSS Nesting

Native CSS (2024+) supports nesting like preprocessors:

```css
.parent {
  color: #333;
  & .child { color: blue; }
  & > .direct { font-weight: bold; }
  &:hover { color: red; }
}
```

### @layer

Controls cascade order by defining **layers**:

```css
@layer base, theme, components;
@layer base { body { ... } }
@layer components { .btn { ... } }
```

Layers declared later have higher priority.

### Modern Selectors

- **:has()** — "parent selector": `.card:has(img)` — cards that contain an img
- **:not()** — negation: `input:not([disabled])`
- **:is()** — grouping: `:is(h1, h2, h3) { font-weight: bold; }`
- **:where()** — like :is() but specificity = 0

### Scroll Snap

Makes scroll containers "snap" to positions:
- `scroll-snap-type: x mandatory` on container
- `scroll-snap-align: start` on children

---

## Experiments

1. **Add new variables** — add `--secondary: #e74c3c` in :root and use it
2. **Try complex calc()** — create `width: calc((100% - var(--gap) * 3) / 4)` for 4 columns
3. **Test :has()** — add a new element inside the card and see the :has() effect change
4. **Experiment with nesting** — rewrite the .nesting-demo selectors using CSS nesting syntax

---

## Challenge

Build a "Theme Switcher" page using modern CSS:
- Use Custom Properties for light and dark color schemes
- Add a toggle button that switches a class on body for theme change
- Use @layer to separate base, theme, and components
- Use :has() to detect toggle state
- Use calc() for consistent spacing
- Use scroll-snap for a section slider

---

## Summary

Modern CSS brings powerful tools like custom properties, calc(), native nesting, @layer, :has(), and scroll-snap. These features make CSS more powerful and maintainable. Next module: **Final Project** — combining ALL concepts in a responsive portfolio.
