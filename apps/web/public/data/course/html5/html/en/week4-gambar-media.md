# Images & Media

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 4:** Images & Media

## Learning Objectives

- Image element: src, alt, width, height, loading
- Importance of alt text for accessibility and SEO
- Figure and figcaption elements for image captions
- Picture element for responsive images
- loading="lazy" attribute for performance

---

## Program: Photo Gallery

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Galeri Foto</title>
</head>
<body>
    <h1>Galeri Foto</h1>

    <figure>
        <img src="https://picsum.photos/400/300?random=1"
             alt="Pemandangan gunung saat sunrise"
             width="400" height="300"
             loading="lazy">
        <figcaption>Pemandangan gunung saat sunrise</figcaption>
    </figure>

    <figure>
        <img src="https://picsum.photos/400/300?random=2"
             alt="Pantai tropis dengan pasir putih"
             width="400" height="300"
             loading="lazy">
        <figcaption>Pantai tropis dengan pasir putih</figcaption>
    </figure>

    <h2>Responsive Picture</h2>
    <picture>
        <source media="(min-width: 800px)" srcset="https://picsum.photos/800/400?random=3">
        <source media="(min-width: 400px)" srcset="https://picsum.photos/400/300?random=4">
        <img src="https://picsum.photos/300/200?random=5" alt="Gambar responsive">
    </picture>
</body>
</html>
```

---

## Key Concepts

### Image Element
`<img src="url" alt="description">` — alt required for accessibility.

### Figure & Figcaption
`<figure>` wrapper, `<figcaption>` caption. More semantic.

### Picture Element
`<picture>` with `<source>` for responsive images — browser picks the right one.

### Performance
`loading="lazy"` defers loading until image is in viewport.

---

## Experiments

- Add 3 images with different alt text
- Try picture with 3 different sources
- Experiment with different width and height
- Create gallery with figure and figcaption
- Try loading="eager" vs "lazy"

---

## Challenge

Build a portfolio page with responsive photo gallery, figure + figcaption, and lazy loading.

---

## Summary

Week 4 of 14: **Images & Media** (Level: Complete HTML5). Powerful visuals. Next week: **Lists**.
