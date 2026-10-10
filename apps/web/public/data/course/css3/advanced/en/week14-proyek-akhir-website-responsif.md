# Final Project: Complete Responsive Website

> **Category:** CSS3 | **Level:** CSS Systems, Animation & Final Project | **Week 14:** Final Project: Complete Responsive Website
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Structure a production multi-layer CSS architecture: Reset, Design Tokens, Typography, Components
- Harmonize Flexbox 1D and CSS Grid 2D across a complete unified project
- Implement reactive Light and Dark theme switching using CSS Custom Properties
- Build end-to-end components: sticky navbar, hero banner, services matrix, pricing cards, contact form
- Deploy a 100% responsive, production-ready studio website built purely with CSS3 without external dependencies

---

## 1. Final CSS3 Capstone Architecture

In this concluding capstone week, all proficiencies mastered across 14 weeks synthesize into a complete, standalone responsive studio website:

```text
final-css-project/
├── index.html           # Semantic architecture (Header, Hero, Services, Pricing, Form, Footer)
└── css/
    ├── reset.css        # Box-sizing reset
    ├── variables.css    # Color tokens and dark mode logic
    ├── layout.css       # Flexbox headers & Grid matrices
    └── components.css   # Cards, buttons, badges, tactile transitions
```

---

## 2. End-to-End Module Synthesis (Weeks 1-13)

This capstone unites:
1. **Foundations (Weeks 1-5):** Clean reset, `border-box`, modular `rem` typography, and layered shadows.
2. **Layout & Media (Weeks 6-9):** `sticky` navigation, `Flexbox` nav rows, responsive 2D `auto-fit` Grid, and mobile-first media queries.
3. **Advanced Architecture (Weeks 10-13):** Dynamic `:root` design tokens, dark mode switching, 60fps tactile micro-interactions, and decorative pseudo-nodes.

---

## 3. Production Verification
- Test viewport behavior on mobile (375px), tablet (768px), and wide monitors (1280px).
- Verify zero unintentional horizontal overflow scrolling.
- Audit accessible contrast ratios across both light and dark themes.

---

## Program: Complete Responsive Studio Portal with Dark Mode and Grid

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Studio Mandiri — Portofolio & Layanan</title>
  <style>
    /* ── 1. VARIABEL TEMA & TOKEN DESAIN ── */
    :root {
      --bg-page: #F8FAF9;
      --bg-surface: #FFFFFF;
      --text-main: #1A202C;
      --text-muted: #4A5568;
      --border-color: #E2E8F0;
      --brand: #2E5B44;
      --brand-hover: #234634;
      --brand-light: #E2F2E9;
      --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }

    [data-theme="dark"] {
      --bg-page: #121513;
      --bg-surface: #1E2320;
      --text-main: #F7FAFC;
      --text-muted: #A0AEC0;
      --border-color: #2D3748;
      --brand: #48BB78;
      --brand-hover: #38A169;
      --brand-light: rgba(72, 187, 120, 0.15);
      --shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }

    /* ── 2. CSS RESET ── */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.6;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    /* ── 3. NAVBAR STICKY (FLEXBOX) ── */
    .site-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--bg-surface);
      border-bottom: 1px solid var(--border-color);
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      font-size: 18px;
      font-weight: 800;
      color: var(--brand);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .theme-toggle-btn {
      background: var(--brand-light);
      color: var(--brand);
      border: 1px solid var(--brand);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .theme-toggle-btn:hover {
      background: var(--brand);
      color: #FFFFFF;
    }

    /* ── 4. HERO SECTION ── */
    .hero {
      text-align: center;
      padding: clamp(40px, 8vw, 80px) 20px;
      max-width: 720px;
      margin: 0 auto;
    }

    .badge-pill {
      display: inline-block;
      background: var(--brand-light);
      color: var(--brand);
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 16px;
    }

    .hero h1 {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 16px;
    }

    .hero p {
      font-size: clamp(1rem, 2.5vw, 1.2rem);
      color: var(--text-muted);
      margin-bottom: 24px;
    }

    /* ── 5. SERVICES GRID (CSS GRID AUTO-FIT) ── */
    .main-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 20px 60px 20px;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    .service-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 24px;
      box-shadow: var(--shadow-card);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .service-card:hover {
      transform: translateY(-4px);
      border-color: var(--brand);
    }

    .service-card h3 {
      font-size: 18px;
      color: var(--brand);
      margin-bottom: 8px;
    }

    .service-card p {
      font-size: 14px;
      color: var(--text-muted);
    }

    /* ── 6. PRICING & CONTACT ── */
    .contact-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }

    .btn-cta {
      display: inline-block;
      background: var(--brand);
      color: #FFFFFF;
      padding: 12px 28px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      font-size: 14px;
      transition: background-color 0.15s ease, transform 0.1s ease;
      margin-top: 16px;
    }

    .btn-cta:hover {
      background: var(--brand-hover);
    }

    .btn-cta:active {
      transform: scale(0.98);
    }

    /* ── 7. FOOTER ── */
    footer {
      border-top: 1px solid var(--border-color);
      padding: 24px;
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
      background: var(--bg-surface);
    }
  </style>
</head>
<body>

  <!-- Navigasi Sticky -->
  <nav class="site-nav">
    <div class="brand">StudioMandiri</div>
    <div class="nav-actions">
      <button class="theme-toggle-btn" onclick="toggleTheme()">Tema Gelap / Terang</button>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero">
    <span class="badge-pill">Proyek Akhir CSS3 Mandiri</span>
    <h1>Desain Web Responsif Tanpa Framework</h1>
    <p>Penguasaan menyeluruh atas Box Model, Flexbox, Grid 2D, Animasi Taktil, dan Variabel Desain.</p>
  </header>

  <!-- Main Content Services Grid -->
  <main class="main-container">
    <section class="services-grid">
      <div class="service-card">
        <h3>Arsitektur Semantik</h3>
        <p>Struktur dokumen bersih yang memisahkan konten, tata letak, dan presentasi visual secara disiplin.</p>
      </div>

      <div class="service-card">
        <h3>CSS Grid 2 Dimensi</h3>
        <p>Pengaturan tata letak matriks responsif otomatis menggunakan repeat(auto-fit, minmax(280px, 1fr)).</p>
      </div>

      <div class="service-card">
        <h3>Sistem Token Tema</h3>
        <p>Dukungan pergantian mode terang dan gelap seketika menggunakan CSS Custom Properties.</p>
      </div>
    </section>

    <!-- Kontak & CTA -->
    <div class="contact-box">
      <h2>Siap Meluncurkan Proyek Web Anda?</h2>
      <p style="color: var(--text-muted); font-size: 14px; margin-top: 8px;">
        Seluruh antarmuka ini dibangun menggunakan CSS3 standar murni tanpa library eksternal.
      </p>
      <a href="#" class="btn-cta">Mulai Konsultasi</a>
    </div>
  </main>

  <footer>
    &copy; 2026 StudioMandiri. Dibuat dengan Standar CSS3 Murni.
  </footer>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `:root` and `[data-theme="dark"]`: Central token registry supporting instantaneous, smooth light/dark theme transitions.
- `.site-nav { position: sticky; top: 0; }`: Pinned persistent navigation header following user scroll path.
- `clamp(2rem, 5vw, 3rem)`: Fluid hero typography automatically scaling proportionally across viewport boundaries.
- `.services-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }`: Auto-responsive matrix seamlessly rearranging cards without media query breakpoints.
- `.service-card:hover`: Tactile micro-interaction lifting card 4px with ambient shadow falloff.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 14 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Rigid fixed width on wrappers: Using width: 1000px instead of max-width: 1000px forces horizontal scroll overflow on mobile viewports.
- Abrupt theme snaps: Toggling dark mode without color transitions flashes harsh contrast transitions to user eyes.
- Omitting box-sizing: border-box: Causes components to bloat unexpectedly when borders and paddings are applied.
- Neglecting z-index on sticky bars: Positioned sibling items or transformed cards will render on top of the navigation bar during scroll.

---

## Summary

- Week 14 (Final Project: Complete Responsive Website) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
