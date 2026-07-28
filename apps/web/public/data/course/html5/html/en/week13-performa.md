# Performance & Best Practices

> HTML5 | Module 13

## Learning Objectives

- Apply lazy loading on images and iframes
- Use resource hints: preload, prefetch, preconnect
- Optimize images with modern formats and responsive attributes
- Validate HTML with W3C Validator
- Audit page accessibility and performance

---

## Program: Page Audit

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Performa HTML</title>
  <link rel="preconnect" href="https://placehold.co">
  <link rel="dns-prefetch" href="//placehold.co">
</head>
<body>
  <h1>Performa & Best Practices HTML</h1>

  <section>
    <h2>1. Resource Hints</h2>
    <p>Gunakan <code>&lt;link rel="preconnect"&gt;</code> untuk mempercepat koneksi ke server eksternal.</p>
    <p>Lihat di <code>&lt;head&gt;</code> halaman ini untuk contoh preconnect dan dns-prefetch.</p>
  </section>

  <section>
    <h2>2. Lazy Loading</h2>
    <p>Gambar di bawah ini menggunakan <code>loading="lazy"</code>:</p>
    <img src="https://placehold.co/300x200/2E5B44/fff?text=Gambar+Lazy" alt="Contoh lazy loading" loading="lazy" width="300" height="200">
    <img src="https://placehold.co/300x200/1572B6/fff?text=Lazy+2" alt="Contoh lazy loading kedua" loading="lazy" width="300" height="200">
  </section>

  <section>
    <h2>3. Responsive Images</h2>
    <img src="https://placehold.co/800x200/E34F26/fff?text=Responsive" alt="Contoh responsive image"
         srcset="https://placehold.co/400x200/E34F26/fff?text=400w 400w,
                 https://placehold.co/800x200/E34F26/fff?text=800w 800w"
         sizes="(max-width: 600px) 400px, 800px"
         style="max-width:100%;height:auto">

    <h2>4. Dekoding Async</h2>
    <img src="https://placehold.co/300x200/666/fff?text=Async+Decode" alt="Async decoding" decoding="async" width="300" height="200">

    <h2>5. Elemen Semantic</h2>
    <p>Gunakan <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code> untuk struktur yang jelas.</p>

    <h2>6. Validasi W3C</h2>
    <p>Selalu validasi HTML Anda di <a href="https://validator.w3.org" target="_blank">W3C Validator</a>.</p>

    <h2>7. Aksesibilitas</h2>
    <p>Tambahkan <code>alt</code> pada semua gambar, gunakan <code>label</code> untuk form.</p>

    <h2>8. Minimalisir HTTP Request</h2>
    <p>Gabungkan file CSS/JS, gunakan sprite untuk ikon kecil, dan manfaatkan cache browser.</p>
  </section>

  <footer>
    <p><small>&copy; 2026 Tryngo — Best Practices HTML5</small></p>
  </footer>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Lazy Loading
`loading="lazy"` — image loads when near viewport. Saves bandwidth and speeds up initial load. `loading="eager"` — load immediately.

### Resource Hints
`preconnect` — open early connection to origin. `dns-prefetch` — resolve DNS early. `preload` — load critical resources earlier. `prefetch` — load resources for next page.

### Responsive Images
Use `srcset` + `sizes` to send images matching screen size. `picture` element for art direction. WebP format with JPEG/PNG fallback.

### Decoding
`decoding="async"` — async image decoding, does not block rendering. `decoding="sync"` — default.

### Validation
W3C Validator — check HTML errors. Lighthouse — audit performance, accessibility, SEO. axe DevTools — in-depth accessibility audit.

---

## Experiments

Measure page performance with Lighthouse in DevTools,Add preload for a font or hero image,Create a WebP format image (convert online),Implement lazy loading on an iframe

---

## Challenge

Audit your HTML page using Lighthouse and W3C Validator. Record scores and fix at least 3 issues. Implement: lazy loading on 3 images, preconnect to Google Fonts, responsive images with srcset, and at least 2 resource hints. Report before and after score improvements.

---

## Summary

Performance and best practices distinguish ordinary developers from professionals. Lazy loading, resource hints, responsive images, and validation ensure your website is fast, efficient, and high-quality. Next module: **Final Project** — combine all concepts in a complete portfolio.
