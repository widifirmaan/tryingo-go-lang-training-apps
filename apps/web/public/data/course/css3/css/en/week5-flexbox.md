# Flexbox

> CSS | Module 5

## Learning Objectives

- Understand main axis and cross axis in Flexbox
- Master flex container properties: flex-direction, justify-content, align-items, gap, flex-wrap
- Apply flex-grow, flex-shrink, and flex-basis on items
- Use align-self to override individual alignment
- Build navigation and card grid layouts with Flexbox

---

## Program: Flex Layout

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Flexbox</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .flex { display: flex; gap: 0.8rem; background: #e3f0fa; padding: 1rem; border-radius: 8px; margin: 0.8rem 0; }
    .item { background: #1572B6; color: #fff; padding: 1rem; border-radius: 6px; text-align: center; min-width: 60px; }
    .item-alt { background: #e74c3c; }
    .item-green { background: #2ecc71; }
    .flex-col { flex-direction: column; }
    .flex-wrap { flex-wrap: wrap; }
    .flex-center { justify-content: center; align-items: center; height: 120px; }
    .flex-between { justify-content: space-between; }
    .flex-around { justify-content: space-around; }
    .flex-end { justify-content: flex-end; }
    .grow-1 { flex-grow: 1; }
    .grow-2 { flex-grow: 2; }
    .grow-3 { flex-grow: 3; }
    .align-start { align-self: flex-start; }
    .align-center { align-self: center; }
    .align-end { align-self: flex-end; }
    .nav { display: flex; background: #1572B6; color: #fff; padding: 0.8rem 1.5rem; border-radius: 8px; align-items: center; gap: 1.5rem; }
    .nav .logo { font-weight: 700; font-size: 1.2rem; }
    .nav a { color: #fff; text-decoration: none; opacity: 0.85; }
    .nav a:hover { opacity: 1; }
    .nav .spacer { flex: 1; }
    .card-grid { display: flex; gap: 1rem; flex-wrap: wrap; }
    .card-grid .fc { flex: 1 1 200px; background: #1572B6; color: #fff; padding: 1.5rem; border-radius: 8px; text-align: center; }
    .card-grid .fc-alt { background: #e74c3c; }
    .card-grid .fc-green { background: #2ecc71; }
  </style>
</head>
<body>
  <h1>Flexbox</h1>
  <div class="nav">
    <span class="logo">FlexLogo</span>
    <a href="#">Beranda</a>
    <a href="#">Tentang</a>
    <a href="#">Layanan</a>
    <span class="spacer"></span>
    <a href="#">Login</a>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-direction: row</h2>
    <div class="flex"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-direction: column</h2>
    <div class="flex flex-col" style="width:150px"><div class="item">Atas</div><div class="item item-alt">Tengah</div><div class="item item-green">Bawah</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">justify-content</h2>
    <div class="flex flex-between"><div class="item">Kiri</div><div class="item item-alt">Tengah</div><div class="item item-green">Kanan</div></div>
    <div class="flex flex-around"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
    <div class="flex flex-end"><div class="item">1</div><div class="item item-alt">2</div><div class="item item-green">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">flex-grow</h2>
    <div class="flex"><div class="item grow-1">1</div><div class="item item-alt grow-2">2</div><div class="item item-green grow-3">3</div></div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">align-self</h2>
    <div class="flex" style="height:100px;align-items:flex-start">
      <div class="item align-start">start</div>
      <div class="item item-alt align-center">center</div>
      <div class="item item-green align-end">end</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Card Grid dengan flex-wrap</h2>
    <div class="card-grid">
      <div class="fc">Card 1</div>
      <div class="fc fc-alt">Card 2</div>
      <div class="fc fc-green">Card 3</div>
      <div class="fc">Card 4</div>
    </div>
  </div>
</body>
</html>
```

---

## Explanation

### Flexbox Fundamentals

Flexbox is a one-dimensional layout model (row OR column). Two main components:

1. **Flex Container** — element with `display: flex`. Controls its children.
2. **Flex Items** — direct children of the flex container.

### Main Axis & Cross Axis

- **Main axis**: Primary direction — set by `flex-direction` (`row` = horizontal, `column` = vertical)
- **Cross axis**: Perpendicular to main axis

### Container Properties

- `flex-direction`: row | column | row-reverse | column-reverse
- `justify-content`: Alignment on MAIN axis
- `align-items`: Alignment on CROSS axis
- `flex-wrap`: nowrap | wrap | wrap-reverse
- `gap`: Space between items

### Item Properties

- `flex-grow`: How much item grows relative to others (default 0)
- `flex-shrink`: How much item shrinks (default 1)
- `flex-basis**: Initial item size before space distribution
- `flex**: Shorthand: `flex: grow shrink basis`
- `align-self**: Override `align-items` for individual items
- `order**: Controls visual order (default 0)

---

## Experiments

1. **Change flex-direction** — switch `row` to `column` on the flex container and see the change
2. **Add items** — add 5th and 6th items, see how flex-wrap works
3. **Try different grow values** — change grow-1 to 5, grow-2 to 1
4. **Play with gap** — change gap from 0.8rem to 2rem

---

## Challenge

Build an "Admin Dashboard" page using Flexbox:
- Horizontal navigation with logo, links, and user avatar (use justify-content: space-between)
- Statistics card grid (4 cards) using flex-wrap
- Recent activity list with flex-direction: column
- Navigation sidebar with different align-items
- Ensure everything is responsive on narrow screens

---

## Summary

Flexbox simplifies one-dimensional layout. With justify-content, align-items, flex-grow, and gap, you can create flexible layouts without hacks. Next module: **CSS Grid** — a two-dimensional layout model for simultaneous row and column control.
