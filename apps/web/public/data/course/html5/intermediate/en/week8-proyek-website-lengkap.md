# Full Website Project

> **Category:** HTML5 | **Level:** Forms and Interaction | **Week 8:** Full Website Project
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Synthesize all HTML concepts from Weeks 1 through 7 into a coherent multi-page website project
- Organize a production project directory: HTML documents, css/ styles, images/ assets
- Interlink 3 core pages: index.html (Home), layanan.html (Services & Tables), and kontak.html (Forms & FAQ)
- Validate HTML markup compliance using the official W3C Validator standard
- Prepare project deliverables for deployment on static hosting platforms

---

## 1. Multi-Page Website Project Architecture

By the conclusion of Level 2, all HTML competencies coalesce into a unified 3-page website project:

```text
my-website/
├── index.html        # 1. Home: Branding, Nav, Hero, Semantics, and Media
├── layanan.html      # 2. Services: Service Catalog and Structured Pricing Table
├── kontak.html       # 3. Contact: Inquiry Form, Native FAQ Accordions, and Modal
├── css/
│   └── style.css     # Shared stylesheet
└── images/
    └── studio.jpg    # Media assets
```

---

## 2. Production HTML Quality Checklist
Verify this standard checklist before project deployment:
1. **Standard Declarations:** Every file begins with `<!DOCTYPE html>` and `<html lang="en">`.
2. **Head Metadata:** Each document defines `<meta charset="UTF-8">`, `<meta name="viewport">`, and unique `<title>` text.
3. **Semantic Landmarks:** Strictly one `<main>` per page, alongside proper `<header>`, `<section>`, `<article>`, and `<footer>` boundaries.
4. **Accessibility Checks:** All `<img>` tags contain descriptive `alt` text, form controls are paired with `<label for="...">`, and tables feature `<caption>`.
5. **Navigational Integrity:** Relative anchor links (`<a href="...">`) accurately resolve between all documents.

---

## 3. Capstone Deliverable
This project stands as a complete portfolio demonstration of native HTML mastery, ready for deployment on static platforms such as Cloudflare Pages.

---

## Program: Complete Multi-Page Production Website Architecture

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Studio — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 16px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    .hero { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; margin-bottom: 20px; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 13px; text-align: left; }
    th { background: #0f172a; color: white; }
    details { margin-top: 12px; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Studio Web Alex Pratama</h1>
  </header>

  <main>
    <section class="hero">
      <h2>Ringkasan Proyek Website</h2>
      <p>Proyek portal website ini dibangun murni menggunakan <strong>HTML5 semantik</strong> yang terbagi menjadi tiga halaman:</p>
      <ul>
        <li><strong>Halaman Beranda (<code>index.html</code>):</strong> Memuat profil studio, navigasi, dan gambar terstruktur.</li>
        <li><strong>Halaman Layanan (<code>layanan.html</code>):</strong> Memuat rincian paket dan tabel perbandingan spesifikasi.</li>
        <li><strong>Halaman Kontak (<code>kontak.html</code>):</strong> Memuat formulir permintaan proyek dan akordeon FAQ.</li>
      </ul>
    </section>

    <section class="card">
      <h3>Status Validasi Dokumen</h3>
      <table>
        <caption>Tabel Status Dokumen Proyek</caption>
        <thead>
          <tr>
            <th scope="col">Nama Berkas</th>
            <th scope="col">Komponen Utama</th>
            <th scope="col">Status Standar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>index.html</code></td>
            <td>Header, Navigasi, Hero, Gambar</td>
            <td>Valid W3C</td>
          </tr>
          <tr>
            <td><code>layanan.html</code></td>
            <td>Tipografi Teks, Tabel Layanan</td>
            <td>Valid W3C</td>
          </tr>
          <tr>
            <td><code>kontak.html</code></td>
            <td>Formulir Input, Details FAQ, Dialog</td>
            <td>Valid W3C</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Proyek Website Selesai.</p>
  </footer>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 19-25: Header and navigation provide global inter-page navigation.
- Line 28-38: Hero section summarizes the 3-page site architecture.
- Line 40-69: Semantic table displays audit status and components per project document.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 8 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Copying files without updating `<title>` metadata per document.
- Broken relative links caused by mismatched target filenames.
- Failing to test responsive layout on mobile viewports prior to publishing.

---

## Summary

- Week 8 (Full Website Project) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
