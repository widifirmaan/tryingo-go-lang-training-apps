# SEO & Meta Tags

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 13:** SEO & Meta Tags

## Tujuan Pembelajaran

- Meta tags SEO: title, description, keywords, robots
- Open Graph tags untuk social media sharing
- Twitter Card tags untuk Twitter preview
- Canonical URL untuk hindari duplicate content
- Structured data JSON-LD untuk rich snippets

---

## Program: Halaman SEO-Optimized

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

## Konsep Kunci

### Meta SEO
`<title>` 50-60 karakter. `<meta name="description">` 150-160 karakter. `robots` index/follow.

### Open Graph
`og:title`, `og:description`, `og:image`, `og:url` — kontrol tampilan saat di-share di Facebook/LinkedIn.

### Twitter Card
`twitter:card` summary atau summary_large_image.

### Canonical
`<link rel="canonical">` hindari duplicate content dari URL berbeda.

### JSON-LD
Structured data untuk rich snippets di Google.

---

## Eksperimen

- Buat halaman dengan semua OG tags
- Tambah JSON-LD untuk FAQ schema
- Coba robots noindex pada halaman tertentu
- Buat multiple halaman dengan canonical berbeda
- Tambah hreflang untuk multi-bahasa

---

## Tantangan

Buat halaman artikel lengkap dengan semua SEO meta, OG tags, Twitter Card, dan JSON-LD.

---

## Ringkasan

Minggu 13 dari 14: **SEO & Meta Tags** (Level: HTML5 Lengkap). Visibility di search engine. Minggu depan: **Proyek Akhir**!
