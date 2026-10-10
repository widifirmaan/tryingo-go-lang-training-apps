# Pseudo-Elements and Modern Features

> **Category:** CSS3 | **Level:** CSS Systems, Animation & Final Project | **Week 13:** Pseudo-Elements and Modern Features
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master decorative pseudo-elements ::before and ::after with mandatory content properties
- Customize user text selection via ::selection and form placeholders with ::placeholder
- Deploy native CSS Nesting (&) for structured hierarchical stylesheets
- Prevent Cumulative Layout Shift (CLS) on responsive media using aspect-ratio
- Direct image scaling and clipping with object-fit: cover and object-position

---

## 1. Pseudo-Elements ::before and ::after

Pseudo-elements insert synthetic virtual DOM nodes without cluttering HTML markup:

```css
.quote::before {
  content: "“";              /* MANDATORY property, even if empty string "" */
  font-size: 32px;
  color: #2E5B44;
  vertical-align: -8px;
}
```

- **`::before`**: Injects the very first child node inside the matched container.
- **`::after`**: Injects the final terminating child node.
- Ideal for decorative underline accents, notification counters, and icon ornaments.

---

## 2. Modern Standard: Native CSS Nesting (`&`)

Modern browsers execute CSS nesting natively without compile steps:

```css
.card {
  background: white;
  padding: 20px;

  h3 {
    color: #2E5B44;
  }

  /* Ampersand (&) represents parent selector */
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  & .badge {
    background: #E2F2E9;
  }
}
```

---

## 3. Media Ratios: `aspect-ratio` & `object-fit`

Prevent Cumulative Layout Shift (CLS) layout jumps while images load:

```css
.product-image {
  width: 100%;
  aspect-ratio: 16 / 9; /* Locks exact 16:9 geometric bounds */
  object-fit: cover;    /* Crops image naturally without anamorphic stretch */
  object-position: center;
}
```

---

## Program: Media Card Component with Pseudo-Elements and Native Nesting

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Pseudo-Elemen dan Fitur Modern</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 1. Seleksi Teks Kustom */
    ::selection {
      background-color: #2E5B44;
      color: #FFFFFF;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    /* 2. Komponen Kartu dengan Native Nesting */
    .media-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      overflow: hidden;
      max-width: 380px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);

      /* Gambar Responsif dengan aspect-ratio & object-fit */
      .card-media {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
        background-color: #E2E8F0;
      }

      .card-body {
        padding: 24px;
        position: relative;
      }

      /* Pseudo-Elemen ::before untuk Aksen Garis Atas */
      .card-body::before {
        content: "";
        position: absolute;
        top: 0;
        left: 24px;
        width: 48px;
        height: 3px;
        background-color: #2E5B44;
        border-radius: 2px;
      }

      h3 {
        font-size: 18px;
        color: #1A202C;
        margin-top: 6px;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        color: #4A5568;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      /* Tombol Link dengan Pseudo-Elemen ::after untuk Panah */
      .read-more {
        display: inline-flex;
        align-items: center;
        color: #2E5B44;
        font-weight: 700;
        font-size: 13px;
        text-decoration: none;
        transition: gap 0.2s ease;
        gap: 4px;

        &::after {
          content: "→";
          transition: transform 0.2s ease;
        }

        &:hover::after {
          transform: translateX(4px);
        }
      }
    }
  </style>
</head>
<body>

  <article class="media-card">
    <img 
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80" 
      alt="Meja Kerja Pemrogram" 
      class="card-media"
    >
    <div class="card-body">
      <h3>Standar Media Responsif</h3>
      <p>Blok teks ini dilengkapi aksen garis atas melalui ::before dan panah interaktif melalui ::after tanpa merusak semantik HTML.</p>
      <a href="#" class="read-more">Baca Ulasan Selengkapnya</a>
    </div>
  </article>

</body>
</html>
```

---

## Detailed Code Breakdown

- `::selection`: Replaces standard blue text selection highlighting with forest green #2E5B44 and white typography.
- `aspect-ratio: 16 / 9`: Preserves rigid 16:9 bounds eliminating Cumulative Layout Shift while external images download.
- `object-fit: cover`: Prevents aspect distortion by cropping media symmetrically across dimensions.
- `.card-body::before`: Crafts a clean decorative accent bar using synthetic virtual nodes without markup clutter.
- `Native Nesting (&)`: Synthesizes nested hierarchical declarations directly in browser standard engines.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 13 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Omitting the content property on ::before/::after: Synthetic pseudo-elements fail to instantiate without a content string.
- Neglecting inline display on pseudo-elements: Pseudo-nodes render inline by default; explicit block or absolute positioning is required for sizing.
- Legacy browser nesting limits: Modern nesting is ubiquitous across modern evergreen engines, but older legacy engines require bundler transpilers.
- Unanchored aspect-ratio: aspect-ratio requires at least one defined primary dimension (e.g. width: 100%) to calculate proportion.

---

## Summary

- Week 13 (Pseudo-Elements and Modern Features) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
