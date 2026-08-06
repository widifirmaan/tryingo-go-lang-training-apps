# Selectors & Basic Styling

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 1:** Selectors & Basic Styling

## Learning Objectives

- Three ways to include CSS: inline, internal (style tag), external (link)
- Basic selectors: element, class (.), id (#)
- Combination selectors: descendant, child (>), adjacent (+)
- Pseudo-classes: :hover, :focus, :first-child, :last-child
- Attribute selectors: [attr], [attr=value], [attr^=value]

---

## Program: First Styled Page

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Selectors</title>
    <style>
        /* Element Selector */
        body {
            font-family: 'Segoe UI', sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }

        /* Class Selector */
        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin: 10px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* ID Selector */
        #header {
            background: #2E5B44;
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px;
        }

        /* Descendant Selector */
        .card p {
            color: #555;
        }

        /* Pseudo-class */
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }

        /* Multiple Selector */
        h1, h2, h3 {
            margin-top: 0;
        }

        /* Attribute Selector */
        a[href^="https"] {
            color: #2E5B44;
        }
    </style>
</head>
<body>
    <div id="header">
        <h1>Belajar CSS Selectors</h1>
        <p>Styling halaman web dengan CSS3</p>
    </div>

    <div class="card">
        <h2>Card Pertama</h2>
        <p>Ini adalah paragraf di dalam card.</p>
        <a href="https://developer.mozilla.org">Link ke MDN</a>
    </div>

    <div class="card">
        <h2>Card Kedua</h2>
        <p>Card ini juga terkena styling yang sama.</p>
        <a href="#internal">Link internal</a>
    </div>
</body>
</html>
```

---

## Key Concepts

### Including CSS
Inline: `<p style="color:red">`. Internal: `<style>` in head. External: `<link rel="stylesheet" href="style.css">`.

### Basic Selectors
Element: `p {}`. Class: `.card {}`. Id: `#header {}`.

### Combinations
Descendant: `.card p {}`. Child: `.card > p {}`. Adjacent: `h2 + p {}`.

### Pseudo-classes
`:hover` on mouse over, `:focus` on input active, `:first-child` first element.

### Attributes
`[href^="https"]` — href starting with "https".

---

## Experiments

- Create 5 different classes with different styling
- Try :nth-child(odd) for zebra stripes
- Experiment [attr*="value"] contains selector
- Create selector with multiple pseudo-classes
- Try :not() selector for exclusion

---

## Challenge

Create a page with 3 different cards: use element, class, id, descendant, and pseudo-class selectors.

---

## Summary

Week 1 of 12: **Selectors & Basic Styling** (Level: Complete CSS3). Styling foundation. Next week: **Box Model**.
