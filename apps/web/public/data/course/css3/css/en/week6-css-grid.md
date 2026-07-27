# CSS Grid

> CSS | Module 6

## Learning Objectives

- Understand CSS Grid for two-dimensional layouts (rows + columns)
- Master grid-template-columns, grid-template-rows, and the fr unit
- Apply grid-column and grid-row for spanning and placement
- Use minmax(), repeat(), auto-fit, and auto-fill
- Create complex layouts with grid-template-areas

---

## Program: Grid Layout

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>CSS Grid</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .grid { display: grid; gap: 0.8rem; background: #e3f0fa; padding: 1rem; border-radius: 8px; margin: 0.8rem 0; }
    .item { background: #1572B6; color: #fff; padding: 1.2rem; border-radius: 6px; text-align: center; font-weight: 600; }
    .item-alt { background: #e74c3c; }
    .item-green { background: #2ecc71; }
    .item-orange { background: #f39c12; }
    .item-purple { background: #9b59b6; }
    .col-3 { grid-template-columns: 1fr 1fr 1fr; }
    .col-mixed { grid-template-columns: 2fr 1fr 1fr; }
    .col-repeat { grid-template-columns: repeat(3, 1fr); }
    .col-auto { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
    .span-demo { grid-template-columns: repeat(4, 1fr); }
    .span-2 { grid-column: span 2; }
    .span-3 { grid-column: span 3; }
    .span-full { grid-column: 1 / -1; }
    .row-span-2 { grid-row: span 2; }
    .layout { grid-template-columns: 1fr 3fr 1fr; grid-template-rows: auto 1fr auto; min-height: 250px; }
    .layout header { grid-column: 1 / -1; background: #1572B6; padding: 1rem; color: #fff; text-align: center; border-radius: 6px 6px 0 0; }
    .layout nav { background: #9b59b6; padding: 1rem; color: #fff; }
    .layout main { background: #2ecc71; padding: 1rem; color: #fff; }
    .layout aside { background: #f39c12; padding: 1rem; color: #fff; }
    .layout footer { grid-column: 1 / -1; background: #e74c3c; padding: 1rem; color: #fff; text-align: center; border-radius: 0 0 6px 6px; }
  </style>
</head>
<body>
  <h1>CSS Grid</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">3 Kolom Sama (1fr 1fr 1fr)</h2>
    <div class="grid col-3"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Proporsi Berbeda (2fr 1fr 1fr)</h2>
    <div class="grid col-mixed"><div class="item">2fr</div><div class="item item-alt">1fr</div><div class="item item-green">1fr</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">repeat() &amp; auto-fill minmax()</h2>
    <div class="grid col-auto"><div class="item">A</div><div class="item item-alt">B</div><div class="item item-green">C</div><div class="item item-orange">D</div><div class="item item-purple">E</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grid Span</h2>
    <div class="grid span-demo">
      <div class="item span-full">span full width</div>
      <div class="item span-2">span 2</div>
      <div class="item item-alt">1</div>
      <div class="item item-green">1</div>
      <div class="item item-orange">1</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Layout dengan Grid Areas</h2>
    <div class="grid layout">
      <header>Header</header>
      <nav>Sidebar Kiri</nav>
      <main>Konten Utama</main>
      <aside>Sidebar Kanan</aside>
      <footer>Footer</footer>
    </div>
  </div>
</body>
</html>
```

---

## Explanation

### CSS Grid Fundamentals

CSS Grid is a **two-dimensional** layout model — rows AND columns simultaneously. Ideal for complex page layouts.

### Grid Container Properties

- `display: grid` — defines a grid container
- `grid-template-columns` & `grid-template-rows` — track sizes (columns/rows)
- `gap` (or `row-gap` / `column-gap`) — space between tracks

### The fr Unit

`fr` = **fraction** — distributes available space proportionally. `grid-template-columns: 2fr 1fr` means the first column is twice as wide as the second.

### repeat() & minmax()

- `repeat(3, 1fr)` — 3 equal-width columns
- `repeat(auto-fill, minmax(200px, 1fr))` — responsive auto-columns, minimum 200px
- `minmax(100px, 300px)` — track minimum 100px, maximum 300px

### Grid Item Placement

- `grid-column: span 2` — item spans 2 columns
- `grid-column: 1 / -1` — item from column 1 to the end
- `grid-row: span 2` — item spans 2 rows

### grid-template-areas

A declarative way to name grid areas:

```css
grid-template-areas:
  "header header header"
  "nav    main   aside"
  "footer footer footer";
```

Items are then placed with `grid-area: header`.

---

## Experiments

1. **Change column count** — change `1fr 1fr 1fr` to `1fr 2fr 1fr` in the 3-column grid
2. **Add grid items** — add a 4th item to see auto-placement behavior
3. **Try auto-fill vs auto-fit** — switch `auto-fill` to `auto-fit` and see the difference
4. **Modify grid areas** — add a new row in the layout and place items

---

## Challenge

Build a "Photo Gallery" page using CSS Grid:
- Grid with auto-fill and minmax for automatic responsiveness
- One featured photo spanning 2 columns and 2 rows
- Portrait photos spanning 2 rows
- Landscape photos spanning 2 columns
- Use consistent gap
- Add hover effects with overlay on each photo

---

## Summary

CSS Grid gives you two-dimensional layout power. With grid-template, the fr unit, spanning, and grid areas, you can easily create complex layouts. Next module: **Responsive Design** — making beautiful pages at every screen size.
