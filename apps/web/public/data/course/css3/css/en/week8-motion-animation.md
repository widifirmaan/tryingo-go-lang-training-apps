# Motion & Animation

> CSS | Module 8

## Learning Objectives

- Create smooth transitions with transition-property, duration, timing, delay
- Master transform: translate, rotate, scale, skew, transform-origin
- Define complex animations with @keyframes
- Control animation: name, duration, timing, delay, iteration, direction, fill-mode
- Understand animation performance: only animate transform and opacity

---

## Program: CSS Animation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Gerak & Animasi</title>
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; background: #f0f4f8; padding: 2rem; }
    h1 { color: #1572B6; text-align: center; margin-bottom: 1.5rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .row { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin: 1rem 0; }
    .box { width: 90px; height: 90px; background: #1572B6; color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; font-size: 0.75rem; font-weight: 600; text-align: center; }
    .trans-bg { transition: background 0.3s ease; }
    .trans-bg:hover { background: #e74c3c; }
    .trans-all { transition: all 0.4s ease-in-out; }
    .trans-all:hover { background: #2ecc71; border-radius: 50%; transform: scale(1.2) rotate(180deg); }
    .trans-delay { transition: transform 0.3s ease, background 0.3s ease 0.15s; }
    .trans-delay:hover { transform: rotate(45deg); background: #f39c12; }
    .trans-bounce { transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
    .trans-bounce:hover { transform: translateX(30px); background: #9b59b6; }
    .t-translate:hover { transform: translate(15px, 10px); }
    .t-rotate:hover { transform: rotate(45deg); }
    .t-scale:hover { transform: scale(1.3); }
    .t-skew:hover { transform: skew(10deg, 5deg); }
    .t-multi:hover { transform: translateX(15px) rotate(15deg) scale(1.1); }
    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
    @keyframes slide { from { transform: translateX(0); opacity: 0; } to { transform: translateX(80px); opacity: 1; } }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-40px); } 60% { transform: translateY(-20px); } }
    @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
    @keyframes colorCycle { 0% { background: #1572B6; } 25% { background: #e74c3c; } 50% { background: #2ecc71; } 75% { background: #f39c12; } 100% { background: #1572B6; } }
    .anim-pulse { animation: pulse 1.5s ease-in-out infinite; }
    .anim-bounce { animation: bounce 1s ease infinite; }
    .anim-spin { animation: spin 2s linear infinite; }
    .anim-color { animation: colorCycle 4s ease infinite; }
    .anim-slide { animation: slide 1s ease forwards; }
  </style>
</head>
<body>
  <h1>Gerak &amp; Animasi</h1>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Transition — Arahkan kursor</h2>
    <div class="row">
      <div class="box trans-bg">Background</div>
      <div class="box trans-all">All + Rotate</div>
      <div class="box trans-delay">Delay 0.15s</div>
      <div class="box trans-bounce">Bounce</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Transform — Arahkan kursor</h2>
    <div class="row">
      <div class="box t-translate" style="transition:transform 0.3s">Translate</div>
      <div class="box t-rotate" style="transition:transform 0.3s">Rotate</div>
      <div class="box t-scale" style="transition:transform 0.3s">Scale</div>
      <div class="box t-skew" style="transition:transform 0.3s">Skew</div>
      <div class="box t-multi" style="transition:transform 0.3s">Multi</div>
    </div>
  </div>
  <div class="card">
    <h2 style="color:#1572B6;margin-bottom:0.5rem">Keyframe Animation</h2>
    <div class="row">
      <div class="box anim-pulse">Pulse</div>
      <div class="box anim-bounce" style="background:#e74c3c">Bounce</div>
      <div class="box anim-spin" style="background:#2ecc71">Spin</div>
      <div class="box anim-color">Color</div>
      <div class="box anim-slide" style="background:#9b59b6">Slide</div>
    </div>
  </div>
</body>
</html>
```

---

## Explanation

### CSS Transitions

Transitions make property changes **smooth** over time.

```css
.element {
  transition: property duration timing-function delay;
}
```

- **transition-property**: The property to transition
- **transition-duration**: Duration in seconds (`0.3s`) or milliseconds (`300ms`)
- **transition-timing-function**: Acceleration curve — `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(n, n, n, n)`
- **transition-delay**: Delay before transition starts

### Transform

Changes element appearance without affecting layout:

- `translate(x, y)` — moves element
- `rotate(angle)` — rotates (degrees, grad, rad, turn)
- `scale(factor)` — scales up/down
- `skew(x, y)` — skews
- `transform-origin` — sets transform pivot point

**Performance**: Only `transform` and `opacity` can be animated without triggering layout/reflow. GPU-accelerated.

### Keyframe Animation

```css
@keyframes name {
  0% { property: value; }
  100% { property: value; }
}
```

### Animation Properties

- `animation-name` — @keyframes name
- `animation-duration` — duration per cycle
- `animation-timing-function` — acceleration curve
- `animation-delay` — delay before start
- `animation-iteration-count` — cycle count (`infinite`)
- `animation-direction` — `normal`, `reverse`, `alternate`, `alternate-reverse`
- `animation-fill-mode` — before/after animation styles (`none`, `forwards`, `backwards`, `both`)

---

## Experiments

1. **Change transition duration** — change `0.3s` to `1s` and see the speed difference
2. **Try different timing functions** — change `ease` to `cubic-bezier(0, 1, 1, 0)`
3. **Modify keyframes** — add new keyframes with different properties like `opacity` and `border-radius`
4. **Combine multiple animations** — apply two animations to one element

---

## Challenge

Create an attractive "Loading Screen" page with animations:
- Spinning spinner with keyframes
- Progress bar that fills with animation
- Pulsing logo
- Alternating text with fade-in
- Smooth transition when loading completes and content appears
- Use different timing functions for each animation

---

## Summary

Transitions, transforms, and animations make web pages feel alive. Remember: only animate transform and opacity for GPU-accelerated performance. Next module: **Modern CSS** — custom properties, calc(), nesting, @layer, and modern selectors.
