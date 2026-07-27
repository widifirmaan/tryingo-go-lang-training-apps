# Flow & Positioning

> CSS | Module 4

## Learning Objectives

- Understand normal flow and how elements flow on the page
- Master display: block, inline, inline-block, and none
- Apply position: static, relative, absolute, fixed, and sticky
- Use z-index to control element stacking
- Understand stacking context and when it forms

---

## Program: Positioning Demo

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Alur & Posisi</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; padding-top: 4rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .demo-box { display: inline-block; width: 80px; height: 50px; color: #fff; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    .container { position: relative; height: 180px; background: #f5f5f5; border: 2px dashed #ccc; border-radius: 8px; margin: 1rem 0; }
    .static { position: static; background: #999; }
    .relative { position: relative; top: 15px; left: 20px; background: #1572B6; }
    .absolute { position: absolute; bottom: 10px; right: 10px; background: #e74c3c; }
    .sticky-header { position: sticky; top: 0; background: #1572B6; color: #fff; padding: 0.8rem; text-align: center; border-radius: 8px; z-index: 10; font-weight: 600; margin-bottom: 1rem; }
    .inline-demo span { background: #e3f0fa; border: 1px solid #1572B6; padding: 5px; margin: 3px; }
    .block-demo div { background: #e3f0fa; border: 1px solid #1572B6; padding: 5px; margin: 3px 0; }
    .inline-block-demo div { display: inline-block; background: #e3f0fa; border: 1px solid #1572B6; padding: 10px; margin: 3px; width: 100px; text-align: center; }
    .z-container { position: relative; height: 90px; margin: 1rem 0; }
    .z-box { position: absolute; width: 100px; height: 60px; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 6px; font-size: 0.75rem; font-weight: 600; }
    .z-1 { background: #1572B6; top: 10px; left: 10px; z-index: 1; }
    .z-2 { background: #e74c3c; top: 25px; left: 50px; z-index: 2; }
    .z-3 { background: #2ecc71; top: 40px; left: 90px; z-index: 3; }
  </style>
</head>
<body>
  <div class="sticky-header">Sticky Header — tetap di atas saat scroll</div>
  <h1>Alur &amp; Posisi</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Display: Inline</h2>
    <div class="inline-demo"><span>inline 1</span><span>inline 2</span><span>inline 3</span></div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.3rem">Elemen inline sejajar horizontal, padding/margin vertikal tidak memengaruhi flow.</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Display: Block</h2>
    <div class="block-demo"><div>block 1</div><div>block 2</div><div>block 3</div></div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.3rem">Setiap elemen block mengambil lebar penuh dan turun ke baris baru.</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Display: Inline-Block</h2>
    <div class="inline-block-demo"><div>item 1</div><div>item 2</div><div>item 3</div></div>
    <p style="font-size:0.85rem;color:#666;margin-top:0.3rem">Inline-block sejajar horizontal tapi bisa diberi lebar dan tinggi.</p>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Position</h2>
    <div class="container">
      <div class="demo-box static">static</div>
      <div class="demo-box relative">relative<br>top:15 left:20</div>
      <div class="demo-box absolute">absolute<br>bottom:10 right:10</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Z-Index</h2>
    <div class="z-container">
      <div class="z-box z-1">z:1</div>
      <div class="z-box z-2">z:2</div>
      <div class="z-box z-3">z:3</div>
    </div>
  </div>
</body>
</html>
```

---

## Explanation

### Display

- **block**: Element takes full width, starts on a new line. Can have width/height. (`<div>`, `<p>`, `<h1>`)
- **inline**: Elements sit horizontally, width/height don't apply. (`<span>`, `<a>`, `<strong>`)
- **inline-block**: Horizontal layout BUT can have width/height. Best of both.
- **none**: Element hidden, takes no space. Different from `visibility: hidden` which still occupies space.

### Position

- **static** (default): Follows normal flow. Cannot be offset.
- **relative**: Offset from normal position. Original space is preserved.
- **absolute**: Removed from flow. Positioned relative to nearest non-static ancestor.
- **fixed**: Removed from flow. Positioned relative to viewport. Stays on scroll.
- **sticky**: Hybrid of relative and fixed. Normal until scroll threshold, then "sticks".

### Z-Index & Stacking Context

`z-index` controls the stacking order of positioned elements. Higher values appear on top. New **stacking contexts** form when an element has `position` + `z-index`, `opacity < 1`, `transform`, `filter`, or `isolation: isolate`.

---

## Experiments

1. **Change absolute position** — switch `bottom: 10px; right: 10px` to `top: 10px; left: 10px`
2. **Add z-index** — create a new element in the z-index container with a higher z-index
3. **Try sticky** — change one card to `position: sticky; top: 20px`
4. **Toggle display** — switch inline-block to block and inline, see the layout difference

---

## Challenge

Build a simple "Magazine Layout" page with:
- Fixed/sticky header at the top
- Left sidebar with sticky position
- Main content with lots of text
- "New" badge positioned absolutely on article corners
- z-index overlay for a simple modal/popup
- "Back to top" button fixed at the bottom-right

---

## Summary

Display and position give you precise layout control. Inline, block, inline-block, static through sticky, and z-index — each property has a unique role. Next module: **Flexbox** — the revolutionary one-dimensional layout model.
