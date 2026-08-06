# Final Project: Portfolio Website

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 14:** Final Project: Portfolio Website

## Learning Objectives

- Combine all concepts: semantic, forms, multimedia, a11y, SEO
- Professional multi-section website structure
- Complete navigation with skip link and ARIA
- Contact form with HTML5 validation
- SEO meta tags and Open Graph

---

## Program: Complete Portfolio Website

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio John Doe | Web Developer</title>
    <meta name="description" content="Portfolio John Doe - Web Developer spesialis HTML5, CSS3, dan JavaScript.">
    <meta property="og:title" content="Portfolio John Doe">
    <meta property="og:description" content="Web Developer Portfolio">
    <meta property="og:type" content="website">
</head>
<body>
    <a href="#main" class="skip-link">Skip ke konten</a>

    <header>
        <h1>John Doe</h1>
        <p>Web Developer &amp; Designer</p>
        <nav aria-label="Navigasi utama">
            <ul>
                <li><a href="#tentang" aria-current="page">Tentang</a></li>
                <li><a href="#proyek">Proyek</a></li>
                <li><a href="#kemampuan">Kemampuan</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <main id="main">
        <section id="tentang">
            <h2>Tentang Saya</h2>
            <figure>
                <img src="https://picsum.photos/200/200" alt="Foto John Doe" loading="lazy">
                <figcaption>John Doe, Web Developer</figcaption>
            </figure>
            <p>Saya adalah web developer dengan pengalaman 3 tahun...</p>
        </section>

        <section id="proyek">
            <h2>Proyek</h2>
            <article>
                <h3>E-Commerce App</h3>
                <p>Platform jual beli online dengan HTML5 semantic.</p>
                <a href="#">Lihat detail</a>
            </article>
            <article>
                <h3>Blog Platform</h3>
                <p>Platform blog dengan aksesibilitas tinggi.</p>
                <a href="#">Lihat detail</a>
            </article>
        </section>

        <section id="kemampuan">
            <h2>Kemampuan</h2>
            <ul>
                <li>HTML5 Semantic</li>
                <li>CSS3 &amp; Responsive</li>
                <li>JavaScript ES6+</li>
                <li>Accessibility (a11y)</li>
                <li>SEO Optimization</li>
            </ul>
        </section>

        <section id="kontak">
            <h2>Kontak</h2>
            <form action="#" method="POST">
                <fieldset>
                    <legend>Formulir Kontak</legend>
                    <p>
                        <label for="nama-kontak">Nama:</label><br>
                        <input type="text" id="nama-kontak" name="nama" required>
                    </p>
                    <p>
                        <label for="email-kontak">Email:</label><br>
                        <input type="email" id="email-kontak" name="email" required>
                    </p>
                    <p>
                        <label for="pesan">Pesan:</label><br>
                        <textarea id="pesan" name="pesan" rows="5" required></textarea>
                    </p>
                    <button type="submit">Kirim Pesan</button>
                </fieldset>
            </form>
            <p>Email: <a href="mailto:john@example.com">john@example.com</a></p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 John Doe. <a href="#top" aria-label="Kembali ke atas">Kembali ke atas</a></p>
        <address>Email: <a href="mailto:john@example.com">john@example.com</a></address>
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

### Final Project
Combines all 13 previous weeks in one portfolio website.

### Components
- Header with nav
- About, projects, skills, contact sections
- Form with validation
- Footer with address
- Skip link, ARIA, semantic
- SEO meta & OG tags

---

## Experiments

- Add testimonial section with blockquote
- Create additional page: blog or project detail
- Add video introduction
- Create multi-page website
- Add dark mode toggle

---

## Challenge

Build a complete portfolio website: 4+ pages, consistent navigation, contact form, SEO optimized, fully accessible.

---

## Summary

Week 14 of 14: **Final Project: Portfolio Website** (Level: Complete HTML5). Complete! 🎉 You've mastered HTML5 from scratch to expert.
