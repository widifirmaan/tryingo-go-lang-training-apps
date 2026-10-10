# Body, Semantic Layout, and Images

> **Category:** HTML5 | **Level:** HTML Basics | **Week 3:** Body, Semantic Layout, and Images
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand semantic layout architecture: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
- Distinguish Block elements (<div>, <p>, <section>) from Inline elements (<span>, <a>, <strong>)
- Embed images with essential attributes: <img> (src, alt, width, height)
- Group images with captions using <figure> and <figcaption>
- Build unordered (<ul>) and ordered (<ol>) lists using list items (<li>)

---

## 1. Semantic Layout Architecture Inside <body>

HTML5 provides **semantic landmark elements** that give structural meaning to web documents:

- **`<header>`**: Top introductory bar containing site branding and navigation.
- **`<nav>`**: Dedicated container for primary navigation links.
- **`<main>`**: Central, unique content of the page (strictly one `<main>` per document).
- **`<section>`**: Thematic grouping of content (e.g., about section, portfolio section).
- **`<article>`**: Self-contained piece of content (e.g., blog card, product card).
- **`<aside>`**: Secondary sidebar content (e.g., author bio, related notes).
- **`<footer>`**: Document footer containing copyright, contact info, and legal notes.

---

## 2. Block Elements vs Inline Elements

Every HTML element features a default display model:

| Category | Behavior | Examples |
|---|---|---|
| **Block Elements** | Always begins on a new line and spans 100% width | `<div>`, `<p>`, `<h1>`-`<h6>`, `<section>`, `<header>`, `<ul>` |
| **Inline Elements** | Stays within the text flow and takes only content width | `<span>`, `<a>`, `<strong>`, `<em>`, `<code>`, `<time>` |

- **`<div>`**: Generic block wrapper used for structural CSS styling.
- **`<span>`**: Generic inline wrapper used to isolate a phrase within a paragraph.

---

## 3. Embedding Images: <img> and <figure>

Use the void tag `<img>` to embed images:
```html
<img src="images/profile.jpg" alt="Alex Pratama portrait" width="300" height="200">
```
- **`src`**: Path to the image file (*Source*).
- **`alt`**: Alternative text fallback for screen readers and broken image scenarios.
- **`width` & `height`**: Explicit dimensions preventing Cumulative Layout Shift (CLS).

### Using <figure> and <figcaption>:
When an image includes an accompanying caption, wrap both inside `<figure>`:
```html
<figure>
  <img src="images/office.jpg" alt="Studio desk setup">
  <figcaption>Figure 1: Our creative workspace studio.</figcaption>
</figure>
```

---

## Program: Semantic Home Layout with Embedded Media and Captions

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beranda Portofolio — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 12px; }
    .layout-wrapper { display: flex; gap: 20px; flex-direction: column; }
    section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
    figure { margin: 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; text-align: center; }
    figcaption { color: #64748b; font-size: 13px; margin-top: 6px; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
    </nav>
    <h1>Studio Web Alex Pratama</h1>
  </header>

  <main class="layout-wrapper">
    <section>
      <h2>Profil Studio</h2>
      <p>Kami menyusun dokumen web menggunakan tag semantik HTML5 yang rapi, aksesibel, dan terstruktur.</p>

      <figure>
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60" 
          alt="Laptop menampilkan baris kode pemrograman di atas meja kerja" 
          width="480" 
          style="max-width: 100%; height: auto; border-radius: 4px;"
        >
        <figcaption>Dokumentasi: Lingkungan kerja perancangan struktur website.</figcaption>
      </figure>
    </section>

    <section>
      <h2>Daftar Keahlian Dasar</h2>
      <ul>
        <li>Struktur Dokumen Semantik (HTML5)</li>
        <li>Format Teks dan Hierarki Heading</li>
        <li>Navigasi Antar Berkas dan Bookmark</li>
        <li>Media Gambar Terstruktur (<figure>)</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Studio Web Alex Pratama. Berkas: <code>index.html</code></p>
  </footer>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 18-24: `<header>` groups top navigation `<nav>` and branding heading `<h1>`.
- Line 26-49: `<main>` houses two thematic `<section>` blocks: studio profile and skills.
- Line 31-38: `<figure>` and `<figcaption>` semantically pair an image with its accompanying text.
- Line 41-47: `<ul>` and `<li>` structure skills into an accessible bulleted list.
- Line 51-53: `<footer>` houses copyright and file attribution at the bottom of the page.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 3 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Omitting the `alt` attribute on an `<img>` tag.
- Over-relying on generic `<div>` tags without semantic elements like `<section>` or `<header>`.
- Nesting block-level elements inside inline elements (e.g. putting a `<p>` inside a `<span>`).

---

## Summary

- Week 3 (Body, Semantic Layout, and Images) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
