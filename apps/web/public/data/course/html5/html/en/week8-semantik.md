# Semantic HTML

> HTML5 | Module 8

## Learning Objectives

- Use semantic elements: header, nav, main, footer
- Create page structure with section and article
- Add supporting content with aside
- Use time, figure, details, summary
- Understand semantic HTML benefits for SEO and accessibility

---

## Program: Page Layout

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layout Semantik</title>
</head>
<body>
  <header>
    <h1>Tryngo Academy</h1>
    <nav>
      <ul>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#kursus">Kursus</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>Belajar HTML5 Semantic</h2>
        <p><time datetime="2026-07-28">28 Juli 2026</time> oleh <strong>Tim Tryngo</strong></p>
      </header>

      <section id="tentang">
        <h3>Apa Itu Semantic HTML?</h3>
        <p>Semantic HTML menggunakan elemen yang memiliki makna, bukan sekadar <code>&lt;div&gt;</code>.</p>
        <aside>
          <h4>Tips</h4>
          <p>Gunakan <a href="https://validator.w3.org">W3C Validator</a> untuk cek semantic HTML.</p>
        </aside>
      </section>

      <section id="kursus">
        <h3>Daftar Kursus</h3>
        <ul>
          <li><del>HTML Dasar</del> <ins>Sekarang: HTML5 Complete</ins></li>
          <li>CSS3 Masterclass</li>
          <li>JavaScript Modern</li>
        </ul>
      </section>

      <figure>
        <img src="https://placehold.co/600x200/E34F26/fff?text=HTML5+Semantic" alt="Ilustrasi HTML5 semantic" style="max-width:100%">
        <figcaption>Struktur halaman dengan elemen semantic HTML5</figcaption>
      </figure>

      <details>
        <summary>Klik untuk melihat detail</summary>
        <p>Elemen <code>&lt;details&gt;</code> dan <code>&lt;summary&gt;</code> membuat accordion tanpa JavaScript!</p>
      </details>
    </article>
  </main>

  <aside>
    <h3>Artikel Terkait</h3>
    <ul>
      <li><a href="#">Panduan CSS Grid</a></li>
      <li><a href="#">Dasar JavaScript</a></li>
    </ul>
  </aside>

  <footer>
    <p>&copy; 2026 Tryngo Academy. All rights reserved.</p>
    <address>
      Email: <a href="mailto:info@tryngo.com">info@tryngo.com</a>
    </address>
  </footer>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Why Semantic?
Semantic elements give meaning to content. They help SEO (search engines understand structure), accessibility (screen readers navigate better), and maintainability (code is easier to read).

### Structural Elements
`<header>` — page/section head. `<nav>` — navigation. `<main>` — main content (only one per page). `<footer>` — page footer. `<section>` — thematic group. `<article>` — independent content. `<aside>` — supporting content.

### Inline Semantics
`<time>` — time. `<figure>` — media with caption. `<details>` / `<summary>` — accordion. `<mark>` — highlighted text.

### Non-semantic
`<div>` — division (no meaning). `<span>` — inline container. Use semantic elements FIRST before div/span.

---

## Experiments

Change page structure: reorder section and article,Add time elements with datetime for schedules,Use details for an FAQ section with 3 questions,Create a layout with 2 asides on left and right

---

## Challenge

Create a news website layout with: header (logo, navigation, search form), main content (2 articles with sections, figures, sidebar aside), and footer (secondary navigation, copyright, social media). Use complete semantic HTML without divs.

---

## Summary

Semantic HTML is a best practice for writing meaningful code. Elements like header, nav, main, article, and section make pages more SEO-friendly, accessible, and maintainable. Next module: **Multimedia & Embed** — how to add audio, video, and external content.
