# SEO & Meta Tags

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 13:** SEO & Meta Tags

## Learning Objectives

- SEO meta tags: title, description, keywords, robots
- Open Graph tags for social media sharing
- Twitter Card tags for Twitter preview
- Canonical URL to avoid duplicate content
- JSON-LD structured data for rich snippets

---

## Program: SEO-Optimized Page

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>Belajar HTML5 Panduan Lengkap | Blog Kursus</title>
    <meta name="description" content="Panduan lengkap belajar HTML5 dari nol hingga mahir. 14 minggu interaktif dengan contoh kode.">
    <meta name="keywords" content="belajar HTML, HTML5, web development, tutorial">
    <meta name="author" content="Nama Penulis">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Social Media -->
    <meta property="og:title" content="Belajar HTML5 Panduan Lengkap">
    <meta property="og:description" content="Panduan lengkap belajar HTML5 dari nol hingga mahir.">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://example.com/belajar-html5">
    <meta property="og:image" content="https://example.com/images/html5-cover.jpg">
    <meta property="og:locale" content="id_ID">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Belajar HTML5 Panduan Lengkap">
    <meta name="twitter:description" content="Panduan lengkap belajar HTML5 dari nol hingga mahir.">
    <meta name="twitter:image" content="https://example.com/images/html5-cover.jpg">

    <!-- Canonical -->
    <link rel="canonical" href="https://example.com/belajar-html5">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Belajar HTML5 Panduan Lengkap",
        "author": { "@type": "Person", "name": "Nama Penulis" },
        "datePublished": "2026-08-06",
        "description": "Panduan lengkap belajar HTML5 dari nol hingga mahir."
    }
    </script>
</head>
<body>
    <header>
        <h1>Belajar HTML5 Panduan Lengkap</h1>
    </header>
    <main>
        <article>
            <h2>Apa itu HTML5?</h2>
            <p>HTML5 adalah versi terstandarisasi dari HTML...</p>
        </article>
    </main>
    <footer>
        <p>&copy; 2026 Blog Kursus</p>
    </footer>
</body>
</html>
```

---

## Key Concepts

### SEO Meta
`<title>` 50-60 chars. `<meta name="description">` 150-160 chars. `robots` index/follow.

### Open Graph
`og:title`, `og:description`, `og:image`, `og:url` — control display when shared on Facebook/LinkedIn.

### Twitter Card
`twitter:card` summary or summary_large_image.

### Canonical
`<link rel="canonical">` avoid duplicate content from different URLs.

### JSON-LD
Structured data for Google rich snippets.

---

## Experiments

- Create page with all OG tags
- Add JSON-LD for FAQ schema
- Try robots noindex on certain page
- Create multiple pages with different canonical
- Add hreflang for multi-language

---

## Challenge

Build a complete article page with all SEO meta, OG tags, Twitter Card, and JSON-LD.

---

## Summary

Week 13 of 14: **SEO & Meta Tags** (Level: Complete HTML5). Search engine visibility. Next week: **Final Project**!
