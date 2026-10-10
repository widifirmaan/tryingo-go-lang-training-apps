# Pico CSS: Classless CSS

> **Category:** HTML5 | **Level:** UI Frameworks | **Week 11:** Pico CSS: Classless CSS
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand "Classless CSS" architecture (styling native HTML elements without custom classes)
- Install Pico CSS via CDN link in <head>
- Observe standard tags (<header>, <main>, <article>, <button>, <table>) styled automatically out of the box
- Leverage Pico automated dark-mode switching powered by native prefers-color-scheme queries
- Recognize optimal use cases for Pico CSS (documentation, internal tools, and minimalist MVPs)

---

## 1. What is Classless CSS?

Traditional frameworks require memorizing dozens of class names (`.card`, `.btn`, `.row`).

**Pico CSS** takes the opposite approach: **Classless CSS**.
- You write **zero custom class names**.
- You write standard semantic HTML: `<header>`, `<main>`, `<article>`, `<button>`, `<table>`, and `<form>`.
- Pico CSS automatically styles these native elements with responsive typography, margins, and aesthetics out of the box!

### Installing via CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
```

---

## 2. Key Advantages of Pico CSS
1. **Automated Dark Mode:** Reads native system preferences (`prefers-color-scheme`) to toggle dark themes automatically.
2. **Instant Forms and Tables:** `<input>`, `<select>`, and `<table>` elements render as production-grade UI components without utility classes.
3. **When to Choose Pico:** Ideal for technical documentation, blogs, internal business dashboards, and rapid MVPs.

---

## Program: Native Semantic HTML Styled via Pico CSS (Classless)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dokumentasi Proyek — Pico CSS</title>
  <!-- Pico CSS CDN (Classless CSS) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
</head>
<body>

  <header class="container">
    <nav>
      <ul>
        <li><strong>Studio Alex</strong></li>
      </ul>
      <ul>
        <li><a href="#">Dokumentasi</a></li>
        <li><a href="#">Layanan</a></li>
      </ul>
    </nav>
  </header>

  <main class="container">
    <hgroup>
      <h1>Pencatatan Proyek HTML</h1>
      <p>Halaman ini tidak menggunakan class CSS kustom sama sekali.</p>
    </hgroup>

    <article>
      <h2>Data Evaluasi Dokumen</h2>
      <p>Seluruh elemen di dalam artikel ini tampil rapi secara otomatis berkat Pico CSS:</p>

      <table>
        <thead>
          <tr>
            <th>Elemen</th>
            <th>Peran Semantik</th>
            <th>Dukungan Layar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;header&gt;</code></td>
            <td>Pengantar Situs</td>
            <td>100% Responsif</td>
          </tr>
          <tr>
            <td><code>&lt;article&gt;</code></td>
            <td>Kotak Konten Mandiri</td>
            <td>Auto Dark Mode</td>
          </tr>
        </tbody>
      </table>

      <form>
        <label for="catatan">Catatan Tambahan:</label>
        <input type="text" id="catatan" placeholder="Ketik catatan evaluasi...">
        <button type="submit">Simpan Catatan</button>
      </form>
    </article>
  </main>

  <footer class="container">
    <small>&copy; 2026 Alex Pratama. Dirender dengan Pico CSS murni.</small>
  </footer>

</body>
</html>
```

---

## Detailed Code Breakdown

- Line 7: Imports the Pico CSS CDN stylesheet that automatically styles native tags.
- Line 12-21: Standard `<nav>`, `<ul>`, and `<li>` elements format into a horizontal navbar without Flexbox classes.
- Line 29-57: `<article>`, `<table>`, and `<form>` render with cohesive typography, borders, and shadows.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 11 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Attempting to attach Bootstrap utility classes inside Pico CSS (Pico relies on native tags).
- Neglecting semantic containers like `<article>` or `<hgroup>`, preventing Pico from applying contextual styles.
- Overriding Pico calculations with intrusive inline styles.

---

## Summary

- Week 11 (Pico CSS: Classless CSS) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
