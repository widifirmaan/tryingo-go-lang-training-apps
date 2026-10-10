# Bootstrap: Grid System and Components

> **Category:** HTML5 | **Level:** UI Frameworks | **Week 9:** Bootstrap: Grid System and Components
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand how component UI frameworks accelerate frontend development
- Install Bootstrap 5 via CDN CSS links and JS bundle scripts
- Master the 12-column grid system: .container, .row, .col, and responsive breakpoints (col-md, col-lg)
- Apply pre-built UI components: Navbar (.navbar), Card (.card), and Buttons (.btn .btn-primary)
- Use data-bs-* attributes to trigger native interactive modals and collapsible toggles

---

## 1. UI Framework Overview and Bootstrap Installation

A UI framework provides pre-tested CSS classes and JavaScript plugins to build responsive interfaces by attaching standardized class names to HTML tags.

### Installing Bootstrap 5 via CDN:
Add the CSS link inside `<head>` and the JS script bundle before closing `</body>`:
```html
<head>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  ...
  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

---

## 2. Bootstrap 12-Column Grid System

Bootstrap partitions layout width into **12 proportional columns**:
- **`.container`**: Responsive layout boundary.
- **`.row`**: Horizontal column wrapper.
- **`.col-md-6`**: On medium screens and up, occupies 6/12 columns (50% width). On small mobile viewports, stacks automatically to 100%.

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">Left Column (50%)</div>
    <div class="col-md-6">Right Column (50%)</div>
  </div>
</div>
```

---

## 3. Core Components: Navbar, Card, and Modal
- **Navbar:** `<nav class="navbar navbar-expand-lg bg-dark navbar-dark">`
- **Card:** `<div class="card"><div class="card-body">...</div></div>`
- **Buttons:** `<button class="btn btn-primary">` (primary blue) or `<button class="btn btn-success">` (green)
- **Modals:** Trigger modal popups natively using `data-bs-toggle="modal" data-bs-target="#myModal"`.

---

## Program: 12-Column Grid, Navbar, and Cards Implementation in Bootstrap 5

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio Bootstrap 5 — Alex Pratama</title>
  <!-- Bootstrap 5 CSS CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

  <!-- 1. NAVBAR BOOTSTRAP -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Alex.dev</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link active" href="#">Beranda</a></li>
          <li class="nav-item"><a class="nav-link" href="#layanan">Layanan</a></li>
          <li class="nav-item"><a class="nav-link" href="#kontak">Kontak</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- 2. HERO HEADER -->
  <header class="py-5 bg-white border-bottom text-center">
    <div class="container">
      <h1 class="fw-bold">Studio Web Alex Pratama</h1>
      <p class="lead text-muted">Membangun website responsif dengan struktur HTML5 dan komponen Bootstrap 5.</p>
      <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#modalKontak">
        Konsultasi Sekarang
      </button>
    </div>
  </header>

  <!-- 3. GRID SYSTEM & CARDS -->
  <main class="container my-5" id="layanan">
    <h2 class="text-center mb-4">Layanan Kami</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">Struktur Semantik</h5>
            <p class="card-text">Penyusunan kode HTML berstandar resmi agar dokumen ramah SEO dan aksesibel.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">Desain Responsif</h5>
            <p class="card-text">Memastikan tata letak website pas dan nyaman dibuka di ponsel, tablet, maupun laptop.</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-primary">Formulir Terintegrasi</h5>
            <p class="card-text">Formulir kontak lengkap dengan validasi bawaan browser untuk pengumpulan data.</p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- 4. MODAL DIALOG BOOTSTRAP -->
  <div class="modal fade" id="modalKontak" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Hubungi Kami</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>Email: <strong>alex@example.com</strong></p>
          <p>Layanan konsultasi online tersedia setiap hari kerja.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
        </div>
      </div>
    </div>
  </div>

  <footer class="py-4 bg-dark text-white text-center">
    <div class="container">
      <small>&copy; 2026 Alex Pratama. Dibuat dengan Bootstrap 5.</small>
    </div>
  </footer>

  <!-- Bootstrap 5 Bundle JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

---

## Detailed Code Breakdown

- Line 7: Imports the official Bootstrap 5 CSS stylesheet from jsDelivr CDN.
- Line 12-25: Responsive navbar that collapses into a burger toggle on mobile screens.
- Line 39-65: Grid `.row` dividing 12 columns across three `.col-md-4` cards (4 + 4 + 4 = 12).
- Line 68-83: Interactive modal container triggered via declarative `data-bs-toggle="modal"`.
- Line 93: Imports the Bootstrap JavaScript bundle enabling modal and dropdown operations.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 9 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Omitting the Bootstrap JS bundle, causing modal triggers and responsive navbars to fail.
- Placing `.col-*` elements directly outside of a `.row` container.
- Exceeding 12 column units within a single breakpoint row, causing unexpected layout wrapping.

---

## Summary

- Week 9 (Bootstrap: Grid System and Components) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
