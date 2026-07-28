# Metadata & SEO

> HTML5 | Module 10

## Learning Objectives

- Master meta tags for charset, viewport, description
- Apply Open Graph for social media sharing
- Use Twitter Cards for engagement
- Understand canonical URLs and structured data JSON-LD
- Optimize title tags for SEO

---

## Program: SEO Optimization

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>Tryngo - Belajar Coding Online | Kursus Pemrograman</title>
  <meta name="description" content="Tryngo adalah platform belajar coding online dari nol hingga mahir. Kursus HTML, CSS, JavaScript, Go, dan Rust.">
  <meta name="keywords" content="belajar coding, kursus online, pemrograman, html, css, javascript">
  <meta name="author" content="Tryngo Academy">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://tryngo.com">

  <!-- Open Graph -->
  <meta property="og:title" content="Tryngo - Belajar Coding Online">
  <meta property="og:description" content="Platform belajar coding online dari nol hingga mahir.">
  <meta property="og:image" content="https://placehold.co/1200x630/E34F26/fff?text=Tryngo">
  <meta property="og:url" content="https://tryngo.com">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="id_ID">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Tryngo - Belajar Coding Online">
  <meta name="twitter:description" content="Platform belajar coding online dari nol hingga mahir.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/E34F26/fff?text=Tryngo">

  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23E34F26'/><text x='16' y='23' font-size='20' text-anchor='middle' fill='white'>T</text></svg>">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Tryngo Academy",
    "url": "https://tryngo.com",
    "description": "Platform belajar coding online.",
    "foundingDate": "2026"
  }
  </script>
</head>
<body>
  <h1>Tryngo Academy</h1>
  <p>Platform belajar coding online #1 di Indonesia.</p>

  <h2>Mengapa Meta Tag Penting?</h2>
  <ul>
    <li><strong>SEO:</strong> Membantu mesin pencari memahami halaman Anda</li>
    <li><strong>Social Media:</strong> Mengontrol tampilan saat dibagikan di Facebook, Twitter, LinkedIn</li>
    <li><strong>Aksesibilitas:</strong> Viewport dan charset untuk pengalaman yang lebih baik</li>
    <li><strong>Structured Data:</strong> Rich snippets di hasil pencarian Google</li>
  </ul>

  <p>Lihat source code halaman ini untuk melihat contoh meta tag lengkap!</p>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Meta Tags
`<meta charset="UTF-8">` — encoding. `<meta name="viewport">` — responsive. `<meta name="description">` — search result description. `<meta name="robots">` — indexing control.

### Open Graph
`og:title` — title when shared. `og:description` — description. `og:image` — thumbnail. `og:url` — canonical URL. Used by Facebook, LinkedIn, WhatsApp.

### Twitter Cards
`twitter:card` — card type (summary, summary_large_image, app, player). `twitter:site` — Twitter account.

### Canonical URL
`<link rel="canonical">` — main URL for duplicate content. Important for SEO.

### Structured Data
JSON-LD format for Schema.org. Helps Google display rich snippets (review, event, FAQ).

---

## Experiments

Replace og:image with your own image,Add theme-color meta tag for mobile browsers,Create structured data for a recipe or event,Implement a favicon in PNG format

---

## Challenge

Create an SEO-optimized blog article page with: compelling meta description, complete Open Graph tags (title, description, image, url, type), Twitter Cards, canonical URL, structured data JSON-LD for article (Article schema), and favicon. Validate with Facebook Sharing Debugger.

---

## Summary

Meta tags, Open Graph, Twitter Cards, and structured data are essential tools for SEO and social media optimization. They control how your page appears in search results and when shared. Next module: **Web Accessibility** — how to create pages usable by everyone.
