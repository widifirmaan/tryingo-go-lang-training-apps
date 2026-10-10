# Box Model and Element Calculation

> **Category:** CSS3 | **Level:** CSS Basics & Box Model | **Week 3:** Box Model and Element Calculation
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand the 4 anatomical layers of CSS Box Model: Content, Padding, Border, Margin
- Distinguish box-sizing: content-box behavior from box-sizing: border-box
- Understand the mechanics of vertical margin collapsing
- Differentiate visual roles between border and outline
- Coordinate internal padding and external margins consistently across layouts

---

## 1. Anatomy of the CSS Box Model

Every rendered HTML element is evaluated as a rectangular bounding box consisting of 4 concentric layers:

```text
┌────────────────────────────────────────────────────────┐
│  MARGIN (External spacing separating sibling elements) │
│  ┌──────────────────────────────────────────────────┐  │
│  │  BORDER (Physical frame surrounding padding)    │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  PADDING (Internal breathing room)         │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │  CONTENT (Area holding text/media)   │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

1. **Content**: The core area containing text or nested children (`width` and `height`).
2. **Padding**: Transparent clearance between content and the border frame, displaying element background color.
3. **Border**: The frame wrapping padding and content.
4. **Margin**: Transparent external distance clearing space around the border.

---

## 2. Sizing Calculations: content-box vs border-box

By default, browsers calculate dimensions under `content-box`:

```text
content-box:
Total Rendered Width = width + padding-left + padding-right + border-left + border-right
Example: width: 300px, padding: 20px, border: 2px
-> Total Width = 300 + 40 + 4 = 344px!
```

The universal industry remedy is **`border-box`**:

```css
* {
  box-sizing: border-box;
}
```

Under `border-box`, assigning `width: 300px` ensures the computed total box width remains strictly 300px.

---

## 3. Vertical Margin Collapsing

When block elements stack vertically with adjoining margins:
- Element A has `margin-bottom: 20px`
- Element B has `margin-top: 30px`

The gap collapses to the single largest value: **30px** (not 50px). Margin collapsing only affects vertical margins.

---

## Program: Interactive Box Model Layer Visualizer

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Box Model Visualizer</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .wrapper {
      max-width: 520px;
      margin: 0 auto;
    }

    h2 {
      color: #2E5B44;
      margin-bottom: 16px;
      text-align: center;
    }

    /* Lapisan 1: Area Margin (Warna Kuning/Oranye) */
    .box-margin {
      background-color: #FEEBC8;
      border: 2px dashed #DD6B20;
      padding: 24px; /* Merepresentasikan margin 24px */
      border-radius: 12px;
      text-align: center;
    }

    .label-layer {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: block;
    }

    /* Lapisan 2: Area Border (Warna Hijau Zaitun) */
    .box-border {
      background-color: #FEFCBF;
      border: 4px solid #D69E2E;
      padding: 20px; /* Merepresentasikan padding 20px */
      border-radius: 8px;
    }

    /* Lapisan 3: Area Padding (Warna Hijau Mint) */
    .box-padding {
      background-color: #C6F6D5;
      border: 1px dashed #38A169;
      padding: 20px;
      border-radius: 6px;
    }

    /* Lapisan 4: Area Content (Warna Biru / Inti) */
    .box-content {
      background-color: #BEE3F8;
      border: 1px solid #3182CE;
      padding: 16px;
      border-radius: 4px;
      color: #2B6CB0;
      font-weight: 600;
      font-size: 14px;
    }
  </style>
</head>
<body>

  <div class="wrapper">
    <h2>Anatomi CSS Box Model</h2>

    <div class="box-margin">
      <span class="label-layer" style="color: #C05621;">Lapisan 1: Margin (Area Eksternal)</span>
      
      <div class="box-border">
        <span class="label-layer" style="color: #B7791F;">Lapisan 2: Border (Garis Batas)</span>
        
        <div class="box-padding">
          <span class="label-layer" style="color: #2F855A;">Lapisan 3: Padding (Jarak Internal)</span>
          
          <div class="box-content">
            Lapisan 4: Content (Teks & Data)
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>
```

---

## Detailed Code Breakdown

- `box-sizing: border-box`: Guarantees computed box boundaries encompass inner padding and borders without inflating width.
- `.box-margin`: Demonstrates external margin space isolating component boundaries from adjacent containers.
- `.box-border`: Demonstrates physical border perimeter framing internal content.
- `.box-padding`: Demonstrates inner padding buffer preventing text from colliding with borders.
- `.box-content`: Represents the core information payload rendered on screen.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 3 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Omitting box-sizing: border-box: Adding padding to a 100% width container without border-box causes horizontal scrollbar overflow.
- Confusing padding with margin: Using margin to expand clickable or colored background surface (background color only covers padding, never margin).
- Margin collapsing surprises: Expecting 20px + 20px vertical margins to produce 40px gap when browsers collapse it to 20px.
- Using outline for spacing: Outlines do not take up box layout space and visually overlap adjacent sibling elements.

---

## Summary

- Week 3 (Box Model and Element Calculation) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
