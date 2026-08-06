# Accessibility (a11y)

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 12:** Accessibility (a11y)

## Learning Objectives

- Skip navigation link for keyboard users
- ARIA roles: banner, main, contentinfo, navigation, alert
- ARIA attributes: aria-label, aria-current, aria-describedby, aria-live
- Descriptive alt text for all images
- Correct heading structure and form labels

---

## Program: Accessible Page

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Halaman Aksesibel</title>
</head>
<body>
    <a href="#main-content" class="skip-link">Skip ke konten utama</a>

    <header role="banner">
        <h1>Website Aksesibel</h1>
        <nav aria-label="Navigasi utama">
            <ul>
                <li><a href="#beranda" aria-current="page">Beranda</a></li>
                <li><a href="#artikel">Artikel</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <main id="main-content" role="main">
        <article>
            <h2>Tips Aksesibilitas Web</h2>

            <img src="https://picsum.photos/400/200"
                 alt="Ilustrasi: orang menggunakan screen reader di laptop"
                 loading="lazy">

            <h3>1. Gunakan Alt Text</h3>
            <p>Setiap gambar harus memiliki alt text yang deskriptif.</p>

            <h3>2. Struktur Heading yang Benar</h3>
            <p>Jangan skip level heading (h1 ke h3).</p>

            <h3>3. Label untuk Form</h3>
            <form>
                <label for="email-input">Email:</label>
                <input type="email" id="email-input"
                       aria-describedby="email-hint"
                       aria-required="true">
                <p id="email-hint">Kami tidak akan membagikan email Anda.</p>

                <button type="submit" aria-label="Kirim formulir">Kirim</button>
            </form>

            <h3>4. ARIA Attributes</h3>
            <div role="alert" aria-live="polite">
                Ini pesan alert untuk screen reader.
            </div>

            <details>
                <summary>Apa itu ARIA?</summary>
                <p>Accessible Rich Internet Applications — atribut tambahan untuk aksesibilitas.</p>
            </details>
        </article>
    </main>

    <footer role="contentinfo">
        <p>&copy; 2026. <a href="#top" aria-label="Kembali ke atas">Kembali ke atas</a></p>
    </footer>

    <style>
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 100;
    }
    .skip-link:focus { top: 0; }
    </style>
</body>
</html>
```

---

## Key Concepts

### Skip Link
Hidden link that appears on keyboard focus — jumps to main content.

### ARIA Roles
`role="banner"`, `role="main"`, `role="navigation"`, `role="alert"` — define element roles.

### ARIA Attributes
`aria-label` screen reader label, `aria-current="page"`, `aria-describedby` hint, `aria-live` for dynamic content.

### Alt Text & Headings
Descriptive alt text. Headings h1→h2→h3 without skipping.

---

## Experiments

- Add skip links for navigation and content
- Create form with aria-invalid for errors
- Try aria-expanded on dropdown
- Add role="search" on search form
- Experiment aria-live with dynamic content

---

## Challenge

Build a fully accessible login page: skip link, ARIA roles, labels, error announcement, keyboard navigable.

---

## Summary

Week 12 of 14: **Accessibility (a11y)** (Level: Complete HTML5). Web for everyone. Next week: **SEO & Meta Tags**.
