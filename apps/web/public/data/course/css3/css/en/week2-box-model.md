# Box Model

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 2:** Box Model

## Learning Objectives

- Understand box model: content, padding, border, margin
- box-sizing: content-box vs border-box
- Margin collapse: vertical margins overlap, not add up
- Shorthand properties: margin, padding, border
- Overflow: visible, hidden, scroll, auto

---

## Program: Box Model Layout

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Box Model</title>
    <style>
        body {
            font-family: sans-serif;
            padding: 20px;
            background: #f0f0f0;
        }

        /* Content → Padding → Border → Margin */
        .box {
            /* Content */
            width: 200px;
            height: 100px;

            /* Padding (inner space) */
            padding: 20px;

            /* Border */
            border: 3px solid #2E5B44;

            /* Margin (outer space) */
            margin: 15px;

            background: #e8f5e9;
        }

        /* Box-sizing comparison */
        .content-box {
            box-sizing: content-box;
            width: 200px;
            padding: 20px;
            border: 5px solid #e74c3c;
            margin: 10px 0;
            background: #ffebee;
        }

        .border-box {
            box-sizing: border-box;
            width: 200px;
            padding: 20px;
            border: 5px solid #2E5B44;
            margin: 10px 0;
            background: #e8f5e9;
        }

        /* Margin collapse demo */
        .collapse-a {
            margin-bottom: 30px;
            background: #bbdefb;
            padding: 10px;
        }

        .collapse-b {
            margin-top: 20px;
            background: #c8e6c9;
            padding: 10px;
        }

        /* Shorthand */
        .shorthand {
            /* top right bottom left */
            margin: 10px 20px 30px 40px;
            /* vertical horizontal */
            padding: 15px 25px;
            /* width style color */
            border: 2px dashed #9c27b0;
            background: #f3e5f5;
        }
    </style>
</head>
<body>
    <h1>CSS Box Model</h1>

    <h2>Standard Box</h2>
    <div class="box">Content 200x100 + padding 20 + border 3 + margin 15</div>

    <h2>Box-Sizing Comparison</h2>
    <p>content-box (default): total width = 200 + 40 + 10 = 250px</p>
    <div class="content-box">content-box</div>
    <p>border-box: total width = 200px (padding & border included)</p>
    <div class="border-box">border-box</div>

    <h2>Margin Collapse</h2>
    <p>Margin 30px + 20px = 30px (yang terbesar), bukan 50px!</p>
    <div class="collapse-A">Collapse A (margin-bottom: 30px)</div>
    <div class="collapse-B">Collapse B (margin-top: 20px)</div>

    <h2>Shorthand Properties</h2>
    <div class="shorthand">margin: 10px 20px 30px 40px (TRBL)</div>
</body>
</html>
```

---

## Key Concepts

### Box Model
Every element is a box: content → padding → border → margin.

### Box-Sizing
`content-box` (default): width = content only. `border-box`: width = content + padding + border.

### Margin Collapse
Two vertical margins overlap — the largest is used, not the sum.

### Shorthand
`margin: 10px 20px 30px 40px` = top right bottom left.

### Overflow
`overflow: hidden` hides excess, `scroll` adds scrollbar.

---

## Experiments

- Change box-sizing and observe width difference
- Try margin collapse with 3 elements
- Experiment overflow: auto on short div
- Create shorthand border with 3 properties
- Try negative margins

---

## Challenge

Create 3 cards with box-sizing: border-box, consistent padding, and non-collapsing margins.

---

## Summary

Week 2 of 12: **Box Model** (Level: Complete CSS3). Layout foundation. Next week: **Colors, Text & Typography**.
