# Flexbox

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 4:** Flexbox

## Tujuan Pembelajaran

- display: flex — mengaktifkan flexbox pada container
- flex-direction: row, column, row-reverse, column-reverse
- justify-content: alignment pada main axis
- align-items: alignment pada cross axis
- flex-wrap, flex-grow, flex-shrink, flex-basis

---

## Program: Layout Flexbox

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

## Konsep Kunci

### Flex Container
`display: flex` pada parent. Semua child menjadi flex item.

### Direction & Wrap
`flex-direction: row|column`, `flex-wrap: wrap|nowrap`.

### Justify & Align
`justify-content` main axis, `align-items` cross axis.

### Flex Item
`flex: 1` = grow 1, shrink 1, basis 0. `flex: none` = fixed size.

### Gap
`gap: 15px` — jarak antar item (tidak perlu margin).

---

## Eksperimen

- Buat layout sidebar + content dengan flex
- Coba align-self pada satu item
- Eksperimen order untuk urutan item
- Buat holy grail layout dengan flex
- Coba flex-basis vs width

---

## Tantangan

Buat layout dashboard: header, sidebar, main content, footer — semua dengan flexbox.

---

## Ringkasan

Minggu 4 dari 12: **Flexbox** (Level: CSS3 Lengkap). Layout 1-dimensional. Minggu depan: **CSS Grid**.
