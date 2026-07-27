# How CSS Works

> CSS | Module 1

## Learning Objectives

- Understand CSS syntax: selector, property, and value
- Learn 3 ways to add CSS: inline, internal, and external
- Master various selectors: element, class, ID, universal, and grouping
- Understand the cascade and basic specificity concepts
- Know how to connect CSS to HTML via <link> and <style>

---

## Program: CSS Fundamentals

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Cara CSS Bekerja</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; font-size: 2rem; }
    .card { background: #fff; border-radius: 12px; padding: 2rem; max-width: 700px; margin: 0 auto 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .highlight { background: #e3f0fa; border-left: 4px solid #1572B6; }
    #main-title { border-bottom: 3px solid #1572B6; padding-bottom: 0.5rem; }
    .btn { display: inline-block; background: #1572B6; color: #fff; padding: 0.7rem 1.8rem; border-radius: 6px; text-decoration: none; font-weight: 600; border: none; cursor: pointer; }
    .btn:hover { background: #115a8f; }
    p { line-height: 1.7; margin-bottom: 0.8rem; }
    code { background: #e8e8e8; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.9em; }
    .selector-demo { margin: 0.8rem 0; padding: 0.8rem; border-radius: 6px; }
    .universal-demo * { border: 1px solid #ddd; padding: 0.3rem; margin: 0.2rem 0; }
  </style>
</head>
<body>
  <h1 id="main-title">Cara CSS Bekerja</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Element</h2>
    <p>Semua elemen <code>h1</code> dan <code>p</code> mendapat style dari selector elemen.</p>
  </div>
  <div class="card highlight">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Class</h2>
    <p>Kartu ini menggunakan class <code>.highlight</code> untuk border biru dan background.</p>
  </div>
  <div class="card universal-demo">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Selector Universal</h2>
    <span>Item A</span><span>Item B</span><div>Item C</div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Grouping & Inline</h2>
    <p>CSS internal di <code>&lt;style&gt;</code> mengatur halaman ini.</p>
    <p style="color:#1572B6;font-weight:bold">Paragraf ini pakai inline CSS.</p>
    <button class="btn">Tombol dengan CSS</button>
  </div>
</body>
</html>
```

---

## Explanation

### CSS Syntax

CSS uses the syntax `selector { property: value; }`. **Selector** targets elements, **property** is the aspect being changed, and **value** is the assigned value. Semicolons (`;`) separate declarations.

### Selectors

- **Element selector** (`h1`, `p`) — targets all elements with a specific tag
- **Class selector** (`.card`) — targets elements with `class="card"`. Can be reused on multiple elements
- **ID selector** (`#main-title`) — targets one unique element with `id="main-title"`
- **Universal selector** (`*`) — targets ALL elements. Use carefully as it impacts performance
- **Grouping** (`h1, h2, p`) — applies the same style to multiple selectors at once

### Adding CSS

1. **Inline** — via the `style` attribute on HTML elements. Highest specificity, hard to maintain.
2. **Internal** — inside a `<style>` tag in `<head>`. Good for single pages.
3. **External** — a separate .css file linked with `<link rel="stylesheet" href="style.css">`. Recommended for production.

### Cascade & Specificity

CSS is **Cascading** Style Sheets — a priority hierarchy exists:

1. **Specificity**: ID (100) > Class (10) > Element (1)
2. **Order**: If specificity is equal, the last declaration wins
3. **Inline style**: Overrides internal/external selectors
4. **!important**: Overrides everything (avoid using it)

---

## Experiments

1. **Change colors** — replace `color: #1572B6` with `#e74c3c` (red) and see the difference
2. **Add new selector** — create a `.shadow` class with `box-shadow` and apply it to a card
3. **Try inline style** — add `style="background: #ffeb3b"` to one of the cards
4. **External CSS** — move the styles to a `style.css` file and use `<link>`

---

## Challenge

Create a short profile page about yourself that uses EVERY CSS selector type you've learned:
- Use **element selectors** for body and headings
- Use **class selectors** for repeating components (cards, buttons)
- Use **ID selectors** for unique elements (profile photo, main title)
- Use **universal selector** for box-sizing
- Use **grouping** for shared styles across multiple elements

Include all three CSS methods: inline (at least one), internal (in <style>), and external (separate .css file).

---

## Summary

CSS is the foundation of web presentation. You've learned basic syntax, various selector types, three ways to add CSS, and the cascade concept. The next module covers the **Box Model** — the core of CSS layout.
