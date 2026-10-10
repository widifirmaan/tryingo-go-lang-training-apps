# Final Project with UI Framework

> **Category:** HTML5 | **Level:** UI Frameworks | **Week 14:** Final Project with UI Framework
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Refactor the Week 8 website project using an industry-standard UI framework (Bootstrap 5)
- Integrate 12-column grids, responsive navbars, tabular pricing, and inquiry forms using framework components
- Audit viewport responsiveness across mobile (360px), tablet (768px), and desktop (1200px) displays
- Preserve strict WCAG accessibility compliance and HTML5 semantic document architecture
- Conclude the 14-week HTML curriculum with a production-ready portfolio project

---

## 1. Final UI Framework Project Architecture

In this concluding capstone week, you re-engineer your studio portfolio website built since Week 1 using the production components of **Bootstrap 5**:

```text
final-project/
├── index.html        # Complete Web Portal (Hero, Services Grid, Pricing Table, Form, Modal)
├── css/
│   └── custom.css    # Supplemental styling overrides
└── images/
    └── logo.png      # Assets
```

---

## 2. Comprehensive Component Integration
This final project synthesizes all competencies mastered over 14 weeks:
1. **HTML Foundations (Weeks 1-4):** Valid `<head>` metadata, heading structures, semantic landmarks, and tabular pricing.
2. **Forms and Interaction (Weeks 5-8):** Accessible inquiry forms with client-side validation constraints.
3. **UI Frameworks (Weeks 9-14):** 12-column grid responsiveness, `.card` components, collapsible navbars, and interactive modals.

---

## 3. Deployment Steps
Once `index.html` passes local validation:
1. Deploy directly to GitHub Pages or Cloudflare Pages for free global hosting.
2. With framework dependencies sourced via CDNs, zero compilation steps are required.

---

## Program: Production Web Portal Powered by Semantic HTML5 and Bootstrap 5

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Studio — Alex Pratama</title>
  <!-- Bootstrap 5 CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    /* Styling pelengkap identitas visual */
    .hero-banner { background: #0f172a; color: #f8fafc; padding: 60px 0; }
    .table-responsive { margin: 20px 0; }
  </style>
</head>
<body>

  <!-- NAVBAR BOOTSTRAP -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Alex.dev</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" href="#beranda">Beranda</a></li>
          <li class="nav-item"><a class="nav-link" href="#layanan">Layanan</a></li>
          <li class="nav-item"><a class="nav-link" href="#harga">Harga</a></li>
          <li class="nav-item"><a class="nav-link" href="#kontak">Kontak</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <header class="hero-banner text-center" id="beranda">
    <div class="container">
      <h1 class="display-5 fw-bold">Studio Rekayasa Web</h1>
      <p class="lead text-light mb-4">Pengembangan antarmuka website berbasis HTML5 semantik dan framework UI modern.</p>
      <a href="#kontak" class="btn btn-primary btn-lg">Hubungi Kami</a>
    </div>
  </header>

  <main class="container my-5">
    <!-- SEKSI LAYANAN (GRID CARDS) -->
    <section id="layanan" class="mb-5">
      <h2 class="text-center fw-bold mb-4">Layanan Unggulan</h2>
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <div class="card-body">
              <h5 class="card-title text-primary fw-bold">Arsitektur Semantik</h5>
              <p class="card-text">Penyusunan kode dokumen mematuhi standar W3C resmi untuk kemudahan indeks mesin pencari.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <div class="card-body">
              <h5 class="card-title text-primary fw-bold">Komponen Framework</h5>
              <p class="card-text">Integrasi antarmuka responsif menggunakan Bootstrap 5 dan Bulma untuk kecepatan rendering.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 bg-light">
            <div class="card-body">
              <h5 class="card-title text-primary fw-bold">Audit Aksesibilitas</h5>
              <p class="card-text">Penyesuaian label ARIA dan navigasi ramah pembaca layar sesuai standar WCAG 2.1 AA.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEKSI TABEL HARGA -->
    <section id="harga" class="mb-5">
      <h2 class="text-center fw-bold mb-4">Daftar Paket Layanan</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
          <caption class="text-muted">Tabel Rincian Paket Layanan dan Waktu Pengerjaan</caption>
          <thead class="table-dark">
            <tr>
              <th scope="col">Paket</th>
              <th scope="col">Halaman</th>
              <th scope="col">Framework</th>
              <th scope="col">Durasi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Starter</th>
              <td>1 - 3 Halaman</td>
              <td>HTML Murni</td>
              <td>3 Hari Kerja</td>
            </tr>
            <tr>
              <th scope="row">Bisnis</th>
              <td>4 - 8 Halaman</td>
              <td>Bootstrap 5</td>
              <td>7 Hari Kerja</td>
            </tr>
            <tr>
              <th scope="row">Enterprise</th>
              <td>Kustom</td>
              <td>Web Components</td>
              <td>14 Hari Kerja</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SEKSI FORMULIR KONTAK -->
    <section id="kontak" class="card shadow-sm p-4 p-md-5 bg-white">
      <h2 class="fw-bold mb-3">Konsultasi Proyek</h2>
      <p class="text-muted mb-4">Kirimkan rincian kebutuhan proyek website Anda:</p>
      <form action="#" method="POST">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="nama" class="form-label fw-bold">Nama:</label>
            <input type="text" class="form-control" id="nama" name="nama" required>
          </div>
          <div class="col-md-6">
            <label for="email" class="form-label fw-bold">Email:</label>
            <input type="email" class="form-control" id="email" name="email" required>
          </div>
          <div class="col-12">
            <label for="pesan" class="form-label fw-bold">Pesan Kebutuhan:</label>
            <textarea class="form-control" id="pesan" name="pesan" rows="4" required></textarea>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary px-4 py-2 fw-bold">Kirim Permintaan</button>
          </div>
        </div>
      </form>
    </section>
  </main>

  <!-- FOOTER -->
  <footer class="py-4 bg-dark text-white text-center">
    <div class="container">
      <p class="mb-0">&copy; 2026 Alex Pratama. Proyek Akhir HTML5 & Bootstrap 5 Selesai.</p>
    </div>
  </footer>

  <!-- Bootstrap 5 Bundle JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 16-30: Sticky responsive navbar fixed to the viewport during vertical scrolling.
- Line 33-39: Hero banner section featuring a lead call-to-action button.
- Line 42-69: 12-column grid partitioning 3 service cards evenly via `.col-md-4`.
- Line 72-108: Bootstrap `.table` rendering structured pricing data with hover feedback.
- Line 111-135: Inquiry form with Bootstrap input classes (`.form-label`, `.form-control`).

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 14 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Omitting the `.table-responsive` wrapper, causing wide tables to clip on narrow mobile screens.
- Missing target `id` attributes on sections linked from the navbar (#layanan, #harga, #kontak).
- Over-relying on redundant utility classes that degrade code readability.

---

## Summary

- Week 14 (Final Project with UI Framework) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
