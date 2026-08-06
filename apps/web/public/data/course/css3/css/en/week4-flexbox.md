# Flexbox

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 4:** Flexbox

## Learning Objectives

- display: flex — activate flexbox on container
- flex-direction: row, column, row-reverse, column-reverse
- justify-content: main axis alignment
- align-items: cross axis alignment
- flex-wrap, flex-grow, flex-shrink, flex-basis

---

## Program: Flexbox Layout

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Flexbox</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* Flex Container */
        .flex-container {
            display: flex;
            gap: 15px;
            padding: 15px;
            background: #e3f2fd;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        /* Flex Items */
        .flex-item {
            background: #2E5B44;
            color: white;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
            flex: 1;
        }

        /* Direction */
        .row { flex-direction: row; }
        .column { flex-direction: column; }
        .row-reverse { flex-direction: row-reverse; }

        /* Justify (main axis) */
        .justify-between { justify-content: space-between; }
        .justify-around { justify-content: space-around; }
        .justify-center { justify-content: center; }

        /* Align (cross axis) */
        .align-center {
            align-items: center;
            min-height: 120px;
        }

        /* Wrap */
        .wrap { flex-wrap: wrap; }
        .wrap .flex-item { min-width: 100px; }

        /* Navbar example */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #2E5B44;
            padding: 15px 30px;
            border-radius: 8px;
            color: white;
        }

        .nav-links {
            display: flex;
            gap: 20px;
            list-style: none;
            margin: 0;
            padding: 0;
        }

        /* Centering */
        .center-demo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 150px;
            background: #f3e5f5;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>CSS Flexbox</h1>

    <h2>Basic Flex (flex: 1)</h2>
    <div class="flex-container">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
    </div>

    <h2>Justify Content</h2>
    <div class="flex-container justify-between align-center">
        <div class="flex-item" style="flex: none;">Left</div>
        <div class="flex-item" style="flex: none;">Center</div>
        <div class="flex-item" style="flex: none;">Right</div>
    </div>

    <h2>Flex Wrap</h2>
    <div class="flex-container wrap">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
        <div class="flex-item">Item 4</div>
        <div class="flex-item">Item 5</div>
    </div>

    <h2>Navbar Example</h2>
    <nav class="navbar">
        <div class="logo">Brand</div>
        <ul class="nav-links">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </nav>

    <h2>Perfect Centering</h2>
    <div class="center-demo">
        <div class="flex-item" style="flex: none;">Centered!</div>
    </div>
</body>
</html>
```

---

## Key Concepts

### Flex Container
`display: flex` on parent. All children become flex items.

### Direction & Wrap
`flex-direction: row|column`, `flex-wrap: wrap|nowrap`.

### Justify & Align
`justify-content` main axis, `align-items` cross axis.

### Flex Items
`flex: 1` = grow 1, shrink 1, basis 0. `flex: none` = fixed size.

### Gap
`gap: 15px` — space between items (no margin needed).

---

## Experiments

- Create sidebar + content layout with flex
- Try align-self on single item
- Experiment order for item sequence
- Create holy grail layout with flex
- Try flex-basis vs width

---

## Challenge

Create a dashboard layout: header, sidebar, main content, footer — all with flexbox.

---

## Summary

Week 4 of 12: **Flexbox** (Level: Complete CSS3). 1-dimensional layout. Next week: **CSS Grid**.
