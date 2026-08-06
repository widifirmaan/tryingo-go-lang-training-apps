# Lists

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 5:** Lists

## Learning Objectives

- Ordered list: ol for sequential lists
- Unordered list: ul for non-sequential lists
- Description list: dl, dt, dd for term-description pairs
- Nested lists: lists inside lists for hierarchy
- Styling lists with CSS list-style-type

---

## Program: Shopping List

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Belanja</title>
</head>
<body>
    <h1>Daftar Belanja Mingguan</h1>

    <h2>Yang Harus Dibeli (Ordered)</h2>
    <ol>
        <li>Susu segar 1 liter</li>
        <li>Roti tawar</li>
        <li>Telur 1 lusin</li>
        <li>Buah-buahan</li>
    </ol>

    <h2>Kategori Belanja (Unordered)</h2>
    <ul>
        <li>Sayuran
            <ul>
                <li>Bayam</li>
                <li>Brokoli</li>
                <li>Wortel</li>
            </ul>
        </li>
        <li>Protein
            <ul>
                <li>Ayam</li>
                <li>Ikan</li>
                <li>Tahu & Tempe</li>
            </ul>
        </li>
        <li>Bumbu Dapur</li>
    </ul>

    <h2>Deskripsi Produk (Description List)</h2>
    <dl>
        <dt>Susu</dt>
        <dd>Minuman dari sapi, kaya kalsium dan protein</dd>
        <dt>Roti</dt>
        <dd>Makanan dari tepung terigu yang dipanggang</dd>
        <dt>Telur</dt>
        <dd>Sumber protein hewani yang murah dan bergizi</dd>
    </dl>
</body>
</html>
```

---

## Key Concepts

### Ordered List
`<ol><li>...</li></ol>` — auto-numbered list.

### Unordered List
`<ul><li>...</li></ul>` — bulleted list.

### Description List
`<dl><dt>term</dt><dd>description</dd></dl>` — term pairs.

### Nested Lists
Lists inside lists for sub-items.

---

## Experiments

- Create nested list 3 levels deep
- Try description list for FAQ
- Create ordered list with start="5"
- Experiment reversed on ol
- Create sidebar navigation with nested ul

---

## Challenge

Build a food recipe page: ingredients (ul), steps (ol), and nutrition (dl).

---

## Summary

Week 5 of 14: **Lists** (Level: Complete HTML5). Simple data structures. Next week: **Tables**.
