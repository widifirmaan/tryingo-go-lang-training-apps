# Links & Navigation

> HTML5 | Module 3

## Learning Objectives

- Create links with a tag and href
- Distinguish absolute, relative, and internal URLs
- Use target to open links in new tabs
- Create navigation menus with semantic HTML
- Create email links and page bookmarks

---

## Program: Site Navigation

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigasi Situs</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="about.html">Tentang</a></li>
        <li><a href="services.html">Layanan</a></li>
        <li><a href="contact.html">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Selamat Datang</h1>
    <p>Pelajari berbagai jenis tautan di bawah ini:</p>

    <h2>Tautan Eksternal</h2>
    <p><a href="https://www.w3schools.com" target="_blank">W3Schools (buka tab baru)</a></p>
    <p><a href="https://developer.mozilla.org" target="_blank">MDN (buka tab baru)</a></p>

    <h2>Tautan Internal</h2>
    <p><a href="#services">Langsung ke Layanan</a></p>

    <h2>Tautan Email & Telepon</h2>
    <p><a href="mailto:info@tryngo.com">Kirim Email</a></p>
    <p><a href="tel:+628123456789">Hubungi: +62 812-3456-789</a></p>

    <h2>Tautan Download</h2>
    <p><a href="file.pdf" download>Download PDF</a></p>

    <h2 id="services">Layanan Kami</h2>
    <p>Kursus pemrograman online. Klik <a href="#">kembali ke atas</a>.</p>

    <h2>Tautan dengan Gambar</h2>
    <p><a href="https://tryngo.com"><img src="https://placehold.co/200x60/E34F26/fff?text=Tryngo" alt="Logo Tryngo"></a></p>
  </main>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Anchor Tag
`<a href="url">text</a>` — link element. `href` is the destination attribute.

### URL Types
**Absolute** — full URL: `https://example.com/page`. **Relative** — relative path: `/about` or `../page.html`. **Internal** — bookmark: `#section`.

### Target
`_self` — open in same tab (default). `_blank` — open in new tab. Always add `rel="noopener"` for security with `_blank`.

### Navigation
Use `<nav>` for navigation menus. Combine with `<ul>` and `<li>` for semantic structure.

---

## Experiments

Create a navigation menu with 5 links,Add a link to your favorite website with target _blank,Create an internal bookmark pointing to the footer,Create a download link with the download attribute

---

## Challenge

Create a "Learning Resources" page with complete navigation: main navigation menu with 5 items, links to 10 external learning resources (open in new tab), internal bookmarks for each category, email link for contact, and a download link for a PDF guide.

---

## Summary

Links are what make the web a "web". With anchor tags, navigation, email links, and bookmarks, you can connect information across the world. Next module: **Images & Figures** — how to display and optimize images.
