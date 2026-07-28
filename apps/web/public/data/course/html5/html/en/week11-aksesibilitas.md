# Web Accessibility

> HTML5 | Module 11

## Learning Objectives

- Understand WCAG principles: Perceivable, Operable, Understandable, Robust
- Use ARIA roles and properties correctly
- Ensure logical keyboard navigation
- Apply skip links and focus management
- Write descriptive alt text for images

---

## Program: Inclusive Page

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Inklusif - Aksesibilitas Web</title>
</head>
<body>
  <a href="#main" class="skip-link">Langsung ke konten utama</a>

  <header role="banner">
    <h1>Web Untuk Semua</h1>
    <nav role="navigation" aria-label="Navigasi utama">
      <ul>
        <li><a href="#about" aria-current="page">Tentang</a></li>
        <li><a href="#form">Form</a></li>
        <li><a href="#table">Data</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" role="main">
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">Aksesibilitas Web (A11y)</h2>
      <p>Aksesibilitas memastikan website dapat digunakan oleh <strong>semua orang</strong>, termasuk penyandang disabilitas.</p>

      <article aria-labelledby="wcag-heading">
        <h3 id="wcag-heading">4 Prinsip WCAG</h3>
        <ul>
          <li><strong>Perceivable</strong> — Informasi harus dapat diterima oleh setidaknya satu indra</li>
          <li><strong>Operable</strong> — Komponen UI harus dapat dioperasikan</li>
          <li><strong>Understandable</strong> — Informasi dan UI harus dapat dipahami</li>
          <li><strong>Robust</strong> — Konten harus kompatibel dengan berbagai alat bantu</li>
        </ul>
      </article>

      <article aria-labelledby="aria-heading">
        <h3 id="aria-heading">ARIA Roles & Properties</h3>
        <p>ARIA melengkapi semantic HTML untuk alat bantu seperti <em>screen reader</em>.</p>
        <div role="alert" aria-live="polite">
          <p>💡 Tip: Gunakan elemen semantic HTML dulu sebelum menambahkan ARIA.</p>
        </div>
      </article>
    </section>

    <section id="form" aria-labelledby="form-heading">
      <h2 id="form-heading">Form Aksesibel</h2>
      <form>
        <p>
          <label for="nama">Nama Lengkap <span aria-label="wajib">*</span>:</label>
          <input type="text" id="nama" name="nama" required aria-required="true" autocomplete="name">
        </p>
        <p>
          <label for="pesan">Pesan:</label>
          <textarea id="pesan" name="pesan" aria-describedby="pesan-hint"></textarea>
          <small id="pesan-hint">Tulis pesan Anda di sini.</small>
        </p>
        <p>
          <label for="negara">Negara:</label>
          <input type="text" id="negara" name="negara" list="negara-list" autocomplete="country-name">
          <datalist id="negara-list">
            <option value="Indonesia">
            <option value="Malaysia">
            <option value="Singapura">
          </datalist>
        </p>
        <button type="submit" aria-label="Kirim form">Kirim</button>
      </form>
    </section>

    <section id="table" aria-labelledby="table-heading">
      <h2 id="table-heading">Data dengan Aksesibilitas</h2>
      <table>
        <caption>Nilai Siswa - Semester 1</caption>
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">HTML</th>
            <th scope="col">CSS</th>
            <th scope="col">JS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Budi</th>
            <td>85</td>
            <td>90</td>
            <td>78</td>
          </tr>
          <tr>
            <th scope="row">Siti</th>
            <td>92</td>
            <td>88</td>
            <td>95</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer role="contentinfo">
    <p>&copy; 2026 Tryngo — Web untuk Semua</p>
  </footer>
</body>
</html>
```

---

## Explanation

Here is a detailed explanation of the material:

### WCAG 4 Principles
**Perceivable** — information must be receivable by at least one sense. **Operable** — UI must be operable. **Understandable** — information and UI must be understandable. **Robust** — content must be compatible with assistive technologies.

### ARIA
`role` — element role (banner, navigation, main, contentinfo). `aria-label` — element label. `aria-labelledby` — connect with another element. `aria-describedby` — additional description. `aria-live` — dynamic region.

### Skip Link
Hidden link that appears on focus for keyboard users. Allows jumping to main content directly.

### Focus Management
Ensure all interactive elements are keyboard accessible. Logical tab order. Visible focus styles.

### Alt Text
Descriptive and contextual. Decorative images: `alt=""` (empty). Informative images: describe function, not appearance.

---

## Experiments

Add a skip link that appears on tab focus,Use aria-expanded on toggleable elements,Implement role="tablist" for a tab panel,Test the page with a screen reader (NVDA or VoiceOver)

---

## Challenge

Create a fully accessible form page with: skip link, ARIA roles on all sections, aria-required on mandatory fields, aria-describedby for hints, role="alert" for error messages, focus management (auto-focus to error field), and keyboard navigation testing.

---

## Summary

Web accessibility is not optional — it is a right. WCAG, ARIA, keyboard navigation, skip links, and alt text ensure your website can be used by everyone, including people with disabilities. Next module: **HTML5 APIs** — modern browser features for more powerful web applications.
