# Positioning

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 6:** Positioning

## Learning Objectives

- position: static, relative, absolute, fixed, sticky
- When to use relative vs absolute
- z-index for layering control
- Sticky positioning for scroll-following headers
- Fixed positioning for always-visible elements

---

## Program: Positioning Layout

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Positioning</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        .position-demo {
            position: relative;
            height: 200px;
            background: #f5f5f5;
            border: 2px dashed #ccc;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .box {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            border-radius: 6px;
        }

        /* Static (default) */
        .static { background: #9e9e9e; }

        /* Relative */
        .relative {
            position: relative;
            background: #4CAF50;
            top: 20px;
            left: 20px;
        }

        /* Absolute */
        .absolute {
            position: absolute;
            background: #e74c3c;
            top: 10px;
            right: 10px;
        }

        /* Fixed */
        .fixed-note {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2196F3;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 1000;
        }

        /* Sticky */
        .sticky-header {
            position: sticky;
            top: 0;
            background: #2E5B44;
            color: white;
            padding: 15px;
            z-index: 100;
            border-radius: 8px 8px 0 0;
        }

        .sticky-container {
            height: 300px;
            overflow-y: auto;
            background: #e8f5e9;
            border-radius: 0 0 8px 8px;
        }

        .sticky-container p {
            padding: 10px 20px;
        }

        /* Z-index */
        .z-container { position: relative; height: 150px; }
        .z1 { position: absolute; top: 0; left: 0; background: #e74c3c; z-index: 1; }
        .z2 { position: absolute; top: 20px; left: 20px; background: #4CAF50; z-index: 2; }
        .z3 { position: absolute; top: 40px; left: 40px; background: #2196F3; z-index: 3; }
    </style>
</head>
<body>
    <h1>CSS Positioning</h1>

    <h2>Relative + Absolute</h2>
    <div class="position-demo">
        <div class="box static">Static</div>
        <div class="box relative">Relative</div>
        <div class="box absolute">Absolute</div>
    </div>

    <h2>Z-Index Layering</h2>
    <div class="z-container">
        <div class="box z1">z:1</div>
        <div class="box z2">z:2</div>
        <div class="box z3">z:3</div>
    </div>

    <h2>Sticky Header</h2>
    <div class="sticky-container">
        <div class="sticky-header">Sticky Header (scroll down)</div>
        <p>Paragraf 1 — scroll ke bawah...</p>
        <p>Paragraf 2 — scroll ke bawah...</p>
        <p>Paragraf 3 — scroll ke bawah...</p>
        <p>Paragraf 4 — scroll ke bawah...</p>
        <p>Paragraf 5 — scroll ke bawah...</p>
        <p>Paragraf 6 — scroll ke bawah...</p>
        <p>Paragraf 7 — scroll ke bawah...</p>
        <p>Paragraf 8 — scroll ke bawah...</p>
    </div>

    <div class="fixed-note">Fixed: Selalu terlihat!</div>
</body>
</html>
```

---

## Key Concepts

### Position Values
`static` default, `relative` offset from normal position, `absolute` relative to nearest positioned ancestor, `fixed` relative to viewport, `sticky` hybrid relative+fixed.

### Relative + Absolute
Parent `relative`, child `absolute` — child relative to parent, not viewport.

### Z-Index
Higher value = more front. Only works on positioned elements.

### Sticky
`position: sticky; top: 0` — relative until scroll reaches top:0, then fixed.

### Fixed
Always in viewport — unaffected by scroll.

---

## Experiments

- Create tooltip with relative + absolute
- Try z-index with stacking context
- Experiment sticky sidebar
- Create modal overlay with fixed
- Try position absolute without relative parent

---

## Challenge

Create a page with: fixed navbar, sticky section header, absolute positioned badge, and modal overlay.

---

## Summary

Week 6 of 12: **Positioning** (Level: Complete CSS3). Position control. Next week: **Responsive Design**.
