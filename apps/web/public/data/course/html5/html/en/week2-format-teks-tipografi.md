# Text Formatting & Typography

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 2:** Text Formatting & Typography

## Learning Objectives

- Inline formatting elements: strong, em, u, s, mark, code
- Semantic text elements: blockquote, q, cite, abbr, time
- Subscript and superscript: sub, sup for formulas
- Preformatted element: pre for code and formatted text
- Quotation elements: blockquote, q, cite for references

---

## Program: News Article

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Artikel Berita</title>
</head>
<body>
    <article>
        <h1><strong>Pentingnya</strong> <em>Belajar HTML</em></h1>
        <p>Ditulis oleh <mark>Redaksi</mark> | <time datetime="2026-08-06">6 Agustus 2026</time></p>
        <hr>
        <p>HTML adalah <abbr title="HyperText Markup Language">HTML</abbr> — fondasi web.</p>
        <p>Ini teks <strong>tebal</strong>, <em>miring</em>, <u>garis bawah</u>, dan <s>coret</s>.</p>
        <p>Rumus air: H<sub>2</sub>O. Pangkat: x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup></p>
        <blockquote>
            <p>"Web adalah untuk semua orang, bukan untuk sebagian orang."</p>
            <footer>— Tim Berners-Lee</footer>
        </blockquote>
        <pre>
function halo() {
    console.log("Halo, Dunia!");
}
        </pre>
        <code>const x = 42;</code>
    </article>
</body>
</html>
```

---

## Key Concepts

### Inline Formatting
`<strong>` important (bold), `<em>` emphasis (italic), `<mark>` highlight, `<code>` inline code.

### Quotations
`<blockquote>` block quote, `<q>` inline quote, `<cite>` source.

### Pre & Code
`<pre>` preserves whitespace. `<code>` for inline code.

---

## Experiments

- Create paragraph with all different inline formats
- Add blockquote with cite for an article
- Try pre with longer code
- Experiment sub and sup with math formulas
- Create table of contents with abbr for technical terms

---

## Challenge

Build a complete blog article page: title, author, date, formatted paragraphs, blockquote, code, and footer.

---

## Summary

Week 2 of 14: **Text Formatting & Typography** (Level: Complete HTML5). Rich expression in text. Next week: **Links & Navigation**.
