# Semantic HTML

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 9:** Semantic HTML

## Learning Objectives

- Semantic elements: header, nav, main, article, section, aside, footer
- Difference between div (non-semantic) and semantic elements
- Correct semantic element hierarchy
- Semantic benefits: SEO, accessibility, maintainability
- Details and summary elements for collapsible content

---

## Program: Semantic Page Structure

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Blog Semantic</title>
</head>
<body>
    <header>
        <h1>Blog Saya</h1>
        <nav>
            <ul>
                <li><a href="#home">Beranda</a></li>
                <li><a href="#artikel">Artikel</a></li>
                <li><a href="#tentang">Tentang</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h2>Belajar Semantic HTML</h2>
                <p>Ditulis <time datetime="2026-08-06">6 Agustus 2026</time></p>
            </header>
            <p>Semantic HTML memberikan makna pada struktur halaman...</p>
            <section>
                <h3>Mengapa Semantic?</h3>
                <p>SEO, aksesibilitas, dan maintainability lebih baik.</p>
            </section>
            <section>
                <h3>Elemen Semantic Utama</h3>
                <p>header, nav, main, article, section, aside, footer.</p>
            </section>
            <footer>
                <p>Kategori: <a href="#html">HTML</a></p>
            </footer>
        </article>

        <aside>
            <h3>Artikel Terkait</h3>
            <ul>
                <li><a href="#">Pengantar CSS</a></li>
                <li><a href="#">Dasar JavaScript</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 Blog Saya. Semua hak dilindungi.</p>
        <address>Email: <a href="mailto:info@blog.com">info@blog.com</a></address>
    </footer>
</body>
</html>
```

---

## Key Concepts

### Semantic Elements
`<header>` intro/nav, `<nav>` menu, `<main>` main content (1x), `<article>` independent content, `<section>` thematic section, `<aside>` sidebar, `<footer>` closing.

### Div vs Semantic
`<div>` has no meaning. Semantic elements tell browsers and screen readers about content role.

### Benefits
- SEO: search engines understand structure
- A11y: screen reader navigation improved
- Maintain: more readable code

---

## Experiments

- Create page with multiple articles in main
- Add details + summary for FAQ
- Try nested section inside article
- Create layout with aside on right
- Experiment address in footer

---

## Challenge

Build a complete blog page: header with nav, main with 2 articles, aside with widgets, footer with address.

---

## Summary

Week 9 of 14: **Semantic HTML** (Level: Complete HTML5). Meaning and structure. Next week: **Multimedia: Audio & Video**.
