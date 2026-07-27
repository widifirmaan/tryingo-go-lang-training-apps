# Box Model

> CSS | Module 2

## Learning Objectives

- Understand the Box Model: content, padding, border, and margin
- Master box-sizing difference: content-box vs border-box
- Control element sizing with width, height, and overflow
- Understand display: block vs inline and their effect on boxes
- Manage spacing between elements with margin collapsing

---

## Program: Box Visualization

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Box Model</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .box-viz { margin: 1.5rem auto; width: 300px; }
    .box-viz .margin { background: #ffd54f; padding: 1.5rem; border-radius: 8px; }
    .box-viz .border { background: #ff8a65; padding: 1.5rem; border-radius: 4px; }
    .box-viz .padding { background: #81c784; padding: 1.5rem; }
    .box-viz .content { background: #64b5f6; padding: 1.5rem; text-align: center; color: #fff; font-weight: bold; border-radius: 2px; }
    .box-viz .label { text-align: center; font-size: 0.75rem; margin-top: 0.3rem; color: #555; }
    .row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
    .box { width: 200px; padding: 1.5rem; border: 5px solid #1572B6; margin: 1rem; background: #e3f0fa; text-align: center; }
    .content-box { box-sizing: content-box; background: #ffebee; }
    .border-box { box-sizing: border-box; background: #e8f5e9; }
    .overflow-demo { width: 200px; height: 60px; border: 2px solid #1572B6; padding: 0.5rem; overflow: auto; background: #fff; }
  </style>
</head>
<body>
  <h1>Box Model</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">Anatomi Box Model</h2>
    <div class="box-viz">
      <div class="margin">
        <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Margin</div>
        <div class="border">
          <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Border</div>
          <div class="padding">
            <div style="font-size:0.8rem;text-align:center;margin-bottom:0.3rem">Padding</div>
            <div class="content">Content</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">content-box vs border-box</h2>
    <div class="row">
      <div><div class="box content-box">content-box<br>250px total</div><div class="label" style="text-align:center">width + padding + border</div></div>
      <div><div class="box border-box">border-box<br>200px total</div><div class="label" style="text-align:center">width = total termasuk border</div></div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.8rem">Overflow</h2>
    <div class="overflow-demo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</div>
    <div class="label" style="margin-top:0.3rem">Gulir untuk melihat konten yang meluap</div>
  </div>
</body>
</html>
```

---

## Explanation

### Box Model

Every HTML element is a **box** consisting of four layers:

1. **Content** — the area where text/images are displayed. Sized by `width` and `height`.
2. **Padding** — space between content and border. Clears the inner area.
3. **Border** — the line surrounding padding. Can be solid, dashed, dotted, etc.
4. **Margin** — space outside the border. Creates gaps between elements.

### box-sizing

- **content-box** (default): `width` only measures content. Total width = width + padding + border.
- **border-box**: `width` includes content + padding + border. Total width = width.

Use `box-sizing: border-box` on all elements for more predictable layouts.

### Overflow

When content exceeds the box size:
- `visible` (default) — content overflows outside
- `hidden` — content is clipped
- `scroll` — scrollbars always appear
- `auto` — scrollbars appear only when needed

### Margin Collapsing

Vertical margins between block elements don't add up — the larger margin wins.

---

## Experiments

1. **Change padding** — change box model padding from 1.5rem to 3rem, see how total size changes
2. **Change border** — switch solid border to `border: 5px dashed #e74c3c` on the content-box
3. **Try negative margin** — add `margin-top: -20px` to one of the boxes
4. **box-sizing toggle** — switch content-box to border-box and note the width difference

---

## Challenge

Build a "Pricing Cards" page with three cards in a row. Each card must have:
- Different padding for header, body, and footer
- Distinctive border for the featured card vs regular cards
- Margin between cards
- box-sizing: border-box on all elements
- Overflow handling for long descriptions

---

## Summary

The Box Model is the most important concept in CSS layout. Every element is a box with content, padding, border, and margin. Choose box-sizing: border-box for predictable layouts. Next module: **Text & Color** — how to beautify typography and use colors effectively.
