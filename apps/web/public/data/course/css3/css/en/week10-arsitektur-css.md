# CSS Architecture

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 10:** CSS Architecture

## Learning Objectives

- BEM naming: Block__Element--Modifier
- Block: standalone component (card, btn, nav)
- Element: part of block (card__title, card__body)
- Modifier: block/element variant (card--featured, btn--primary)
- Utility classes for spacing and text alignment

---

## Program: BEM & Organization

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Architecture — BEM</title>
    <style>
        /* ─── BEM: Block__Element──Modifier ─── */

        /* Block: standalone component */
        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        /* Element: part of block */
        .card__header {
            padding: 20px;
            background: #2E5B44;
            color: white;
        }

        .card__title {
            margin: 0;
            font-size: 1.25rem;
        }

        .card__body {
            padding: 20px;
        }

        .card__footer {
            padding: 15px 20px;
            background: #f5f5f5;
            border-top: 1px solid #eee;
        }

        /* Modifier: variant */
        .card--featured {
            border: 2px solid #4CAF50;
        }

        .card--featured .card__header {
            background: #4CAF50;
        }

        .card--dark {
            background: #1e1e1e;
            color: #e0e0e0;
        }

        /* Button Block */
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }

        .btn--primary { background: #2E5B44; color: white; }
        .btn--danger { background: #e74c3c; color: white; }
        .btn--large { padding: 15px 30px; font-size: 16px; }
        .btn--small { padding: 6px 12px; font-size: 12px; }

        /* Utility classes */
        .text-center { text-align: center; }
        .mt-1 { margin-top: 8px; }
        .mt-2 { margin-top: 16px; }
        .mt-3 { margin-top: 24px; }
        .p-1 { padding: 8px; }
        .p-2 { padding: 16px; }
    </style>
</head>
<body>
    <h1>CSS Architecture — BEM</h1>

    <!-- Standard Card -->
    <div class="card">
        <div class="card__header">
            <h2 class="card__title">Card Standard</h2>
        </div>
        <div class="card__body">
            <p>Ini adalah card dengan BEM naming convention.</p>
        </div>
        <div class="card__footer">
            <button class="btn btn--primary">Action</button>
        </div>
    </div>

    <!-- Featured Card -->
    <div class="card card--featured mt-2">
        <div class="card__header">
            <h2 class="card__title">Card Featured</h2>
        </div>
        <div class="card__body">
            <p>Modifier --featured menambahkan border hijau.</p>
        </div>
        <div class="card__footer">
            <button class="btn btn--danger btn--large">Delete</button>
        </div>
    </div>

    <!-- Dark Card -->
    <div class="card card--dark mt-2">
        <div class="card__header">
            <h2 class="card__title">Card Dark</h2>
        </div>
        <div class="card__body">
            <p>Modifier --dark untuk tema gelap.</p>
        </div>
    </div>
</body>
</html>
```

---

## Key Concepts

### BEM Convention
`Block__Element--Modifier` — clear and predictable naming.

### Block
Standalone component: `.card`, `.btn`, `.nav`.

### Element
Part of block: `.card__title`, `.card__body` (double underscore).

### Modifier
Variant: `.card--featured`, `.btn--primary` (double dash).

### Utility Classes
`.text-center`, `.mt-2` — small reusable classes.

### Benefits
- Clear, consistent naming
- No naming collisions
- Easy for team to understand

---

## Experiments

- Create new component with BEM: navbar or modal
- Add modifier for different sizes
- Experiment with nested elements
- Create utility classes for colors
- Try BEM with responsive suffix

---

## Challenge

Create a component library: card, button, navbar, form input — all with BEM naming and modifiers.

---

## Summary

Week 10 of 12: **CSS Architecture** (Level: Complete CSS3). Scalable styling. Next week: **Modern CSS**.
