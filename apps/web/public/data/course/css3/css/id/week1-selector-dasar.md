# Selector & Basic Styling

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 1:** Selector & Basic Styling

## Tujuan Pembelajaran

- Tiga cara menyisipkan CSS: inline, internal (style tag), external (link)
- Selector dasar: element, class (.), id (#)
- Selector kombinasi: descendant, child (>), adjacent (+)
- Pseudo-class: :hover, :focus, :first-child, :last-child
- Attribute selector: [attr], [attr=value], [attr^=value]

---

## Program: Halaman Styling Pertama

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

## Konsep Kunci

### Cara Menyisipkan CSS
Inline: `<p style="color:red">`. Internal: `<style>` di head. External: `<link rel="stylesheet" href="style.css">`.

### Selector Dasar
Element: `p {}`. Class: `.card {}`. Id: `#header {}`.

### Kombinasi
Descendant: `.card p {}`. Child: `.card > p {}`. Adjacent: `h2 + p {}`.

### Pseudo-class
`:hover` saat mouse over, `:focus` saat input aktif, `:first-child` elemen pertama.

### Attribute
`[href^="https"]` — href yang dimulai "https".

---

## Eksperimen

- Buat 5 class berbeda dengan styling berbeda
- Coba :nth-child(odd) untuk zebra stripe
- Eksperimen [attr*="value"] contains selector
- Buat selector dengan multiple pseudo-class
- Coba :not() selector untuk exclude

---

## Tantangan

Buat halaman dengan 3 card berbeda: gunakan element, class, id, descendant, dan pseudo-class selector.

---

## Ringkasan

Minggu 1 dari 12: **Selector & Basic Styling** (Level: CSS3 Lengkap). Dasar styling. Minggu depan: **Box Model**.
