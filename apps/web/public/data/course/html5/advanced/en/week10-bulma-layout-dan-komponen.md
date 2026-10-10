# Bulma: Column Layout and Components

> **Category:** HTML5 | **Level:** UI Frameworks | **Week 10:** Bulma: Column Layout and Components
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand Bulma as a 100% pure CSS framework built entirely on Flexbox without JavaScript dependencies
- Install Bulma via CDN link in the <head>
- Master the Flexbox columns system: .columns and .column (is-half, is-one-third, is-centered)
- Deploy human-readable class naming: .is-primary, .has-text-centered, and .is-rounded
- Implement core Bulma components: .hero, .box, .button, and .navbar

---

## 1. Bulma Architecture (Pure CSS Without JavaScript)

Bulma is a modern UI framework built **100% on pure CSS without JavaScript**:
- **Lightweight Performance:** Zero external JS dependencies slowing down render cycles.
- **Readable Class Names:** Written in intuitive English modifiers (`.is-primary`, `.has-text-centered`, `.is-large`).

### Installing via CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
```

---

## 2. Bulma Flexbox Columns System
Rather than calculating column integers, Bulma leverages native Flexbox:
- **Auto-sizing:** Child `.column` divs automatically divide available horizontal width equally.
- **Explicit Fractions:**
  - `.is-half`: 50% width
  - `.is-one-third`: 33.3% width
  - `.is-one-quarter`: 25% width

```html
<div class="columns">
  <div class="column is-half">50% Column</div>
  <div class="column">Auto-sized Remaining Width</div>
</div>
```

---

## 3. Core Bulma Components
- **Hero Header:** `<section class="hero is-primary is-medium">`
- **Box Card:** `<div class="box">`
- **Button:** `<button class="button is-primary is-rounded">`.

---

## Program: Bulma Hero Banner, Flexbox Columns, and Card Boxes

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Portofolio Bulma — Alex Pratama</title>
  <!-- Bulma CSS CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
</head>
<body>

  <!-- HERO SECTION BULMA -->
  <section class="hero is-dark is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Studio Web Alex Pratama</h1>
        <p class="subtitle">Antarmuka Bersih Menggunakan Framework CSS Bulma</p>
      </div>
    </div>
  </section>

  <!-- KOLOM FLEXBOX & BOX -->
  <main class="section">
    <div class="container">
      <h2 class="title is-4 has-text-centered mb-5">Spesialisasi Teknis</h2>

      <div class="columns is-multiline">
        <div class="column is-one-third">
          <div class="box">
            <h3 class="title is-5 has-text-primary">HTML5 Semantik</h3>
            <p>Struktur dokumen yang mematuhi standar web resmi, mudah diindeks Google, dan ramah pembaca layar.</p>
          </div>
        </div>

        <div class="column is-one-third">
          <div class="box">
            <h3 class="title is-5 has-text-primary">Flexbox Layout</h3>
            <p>Tata letak kolom modern berbasis CSS murni yang fleksibel menyesuaikan berbagai resolusi layar.</p>
          </div>
        </div>

        <div class="column is-one-third">
          <div class="box">
            <h3 class="title is-5 has-text-primary">Performa Cepat</h3>
            <p>Tanpa pustaka JavaScript eksternal yang membebani kecepatan rendering awal dokumen.</p>
          </div>
        </div>
      </div>

      <div class="has-text-centered mt-4">
        <button class="button is-primary is-medium is-rounded">Mulai Diskusi Proyek</button>
      </div>
    </div>
  </main>

  <!-- FOOTER BULMA -->
  <footer class="footer">
    <div class="content has-text-centered">
      <p>&copy; 2026 Alex Pratama. Dibangun dengan HTML5 dan Bulma CSS.</p>
    </div>
  </footer>

</body>
</html>
```

---

## Detailed Code Breakdown

- Line 7: Imports pure Bulma CSS without requiring script runtimes.
- Line 11-19: `.hero` component styled with `.is-dark` and `.is-bold` renders a clean banner.
- Line 26-48: `.columns` wrapper partitions three `.box` containers via `.column .is-one-third`.
- Line 51: `.button` modified with `.is-primary`, `.is-medium`, and `.is-rounded`.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 10 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Searching for Bulma JavaScript libraries (Bulma is 100% pure CSS with zero JS runtime).
- Declaring individual `.column` elements without wrapping them inside `.columns`.
- Omitting the `is-` prefix on Bulma modifier classes (e.g. `primary` instead of `is-primary`).

---

## Summary

- Week 10 (Bulma: Column Layout and Components) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
