# Images & Figures

> HTML5 | Module 4

## Learning Objectives

- Display images with img tag and alt attribute
- Use figure and figcaption for context
- Understand web image formats: JPEG, PNG, WebP, SVG
- Apply responsive images with srcset and sizes
- Use picture element for art direction

---

## Program: Photo Gallery

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galeri Foto</title>
</head>
<body>
  <h1>Galeri Wisata Alam</h1>

  <figure>
    <img src="https://placehold.co/600x400/2E5B44/fff?text=Gunung" alt="Pemandangan gunung dengan latar langit biru" width="600" height="400" loading="lazy">
    <figcaption>Pemandangan Gunung Bromo saat matahari terbit</figcaption>
  </figure>

  <figure>
    <img src="https://placehold.co/600x400/1572B6/fff?text=Pantai" alt="Pantai dengan pasir putih dan air jernih" width="600" height="400" loading="lazy">
    <figcaption>Pantai Kuta, Bali</figcaption>
  </figure>

  <figure>
    <img src="https://placehold.co/600x400/E34F26/fff?text=Hutan" alt="Hutan tropis yang lebat" width="600" height="400" loading="lazy">
    <figcaption>Hutan Hujan Tropis Kalimantan</figcaption>
  </figure>

  <figure>
    <picture>
      <source srcset="https://placehold.co/800x400/333/fff?text=Desktop" media="(min-width: 800px)">
      <source srcset="https://placehold.co/400x400/666/fff?text=Mobile" media="(max-width: 799px)">
      <img src="https://placehold.co/600x400/999/fff?text=Default" alt="Contoh responsive image dengan picture element" style="max-width:100%;height:auto">
    </picture>
    <figcaption>Gambar ini menyesuaikan ukuran layar (responsive image)</figcaption>
  </figure>

  <p>Format gambar yang didukung: JPEG, PNG, WebP, dan SVG.</p>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### Img Tag
`<img src="url" alt="description">` — void element (no closing tag). `alt` is crucial for accessibility and SEO.

### Figure & Figcaption
`<figure>` groups media content. `<figcaption>` provides captions. More semantic than plain div.

### Image Formats
**JPEG** — photos, color gradients. **PNG** — transparency, diagrams. **WebP** — better compression than JPEG/PNG. **SVG** — vectors, responsive.

### Responsive Images
`srcset` — list of images with different widths. `sizes` — size rules based on viewport. `<picture>` — art direction (different images for different screens).

---

## Experiments

Replace placeholder image URLs with images from the internet,Add an SVG image using the img tag,Create a figure with multiple images in one figure,Implement picture element with 3 sources

---

## Challenge

Create a portfolio gallery with: 6 images in a 3x2 grid, each with figure and figcaption, one image using picture element with 3 screen sizes, and an inline SVG image. Use lazy loading for performance.

---

## Summary

Images make web pages more engaging and informative. With alt text, figures, responsive images, and the picture element, you can deliver optimal visuals across all devices. Next module: **Lists & Tables** — how to organize data in lists and tables.
