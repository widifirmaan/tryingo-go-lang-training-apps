# Links & Navigation

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 3:** Links & Navigation

## Learning Objectives

- Anchor element: a with href attribute for hyperlinks
- Link types: absolute URL, relative URL, fragment (#id)
- Navigation: nav, ul, li for menus
- Special links: mailto:, tel:, target="_blank"
- Rel attribute: noopener, noreferer for security

---

## Program: Navigation Menu

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Link & Navigasi</title>
</head>
<body>
    <nav>
        <ul>
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#tentang">Tentang</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>

    <main>
        <section id="beranda">
            <h1>Beranda</h1>
            <p>Selamat datang di halaman utama.</p>
            <p><a href="https://developer.mozilla.org" target="_blank" rel="noopener">Buka MDN (tab baru)</a></p>
        </section>

        <section id="tentang">
            <h2>Tentang Kami</h2>
            <p>Ini halaman tentang. <a href="#beranda">Kembali ke beranda</a></p>
        </section>

        <section id="kontak">
            <h2>Kontak</h2>
            <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
            <p>Telepon: <a href="tel:+628123456789">+62 812-3456-789</a></p>
        </section>
    </main>
</body>
</html>
```

---

## Key Concepts

### Anchor Element
`<a href="url">text</a>` — hyperlink. `href` can be absolute, relative, or fragment.

### Navigation
`<nav>` wrapper for menus. `<ul><li>` for link lists.

### Special Links
`mailto:` opens email client, `tel:` dials number on mobile.

### Security
`rel="noopener noreferer"` for external links with target="_blank".

---

## Experiments

- Create navigation menu with 5 links to different sections
- Add external links to 3 different websites
- Try mailto with subject and body
- Create breadcrumb navigation
- Add skip-to-content link for accessibility

---

## Challenge

Build a complete multi-section page with sticky navigation, smooth scrolling, and all link types.

---

## Summary

Week 3 of 14: **Links & Navigation** (Level: Complete HTML5). Connecting pages. Next week: **Images & Media**.
