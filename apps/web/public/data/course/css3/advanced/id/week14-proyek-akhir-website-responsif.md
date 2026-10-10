# Proyek Akhir: Website Lengkap Responsif

> **Kategori:** CSS3 | **Level:** Sistem CSS, Animasi & Proyek Akhir | **Minggu 14:** Proyek Akhir: Website Lengkap Responsif
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menyusun arsitektur CSS multi-layer dari awal: Reset, Variabel Tema, Tipografi, dan Komponen
- Mengintegrasikan sistem tata letak Flexbox dan CSS Grid secara harmonis dalam 1 proyek utuh
- Menerapkan sistem tema Terang/Gelap (Light/Dark mode) yang berpindah secara instan
- Membangun komponen lengkap: navbar sticky, hero banner, grid layanan, kartu harga, dan formulir kontak
- Menyelesaikan proyek web portofolio/studio yang 100% responsif dan siap dideploy tanpa framework eksternal

---

## 1. Arsitektur Proyek Akhir CSS3

Dalam minggu penutup ini, seluruh kompetensi yang dipelajari selama 14 minggu disatukan untuk membangun website portal studio lengkap dari nol:

```text
final-css-project/
├── index.html           # Struktur semantik lengkap (Header, Hero, Services, Pricing, Form, Footer)
└── css/
    ├── reset.css        # Box-sizing & reset bawaan browser
    ├── variables.css    # Token warna, spasi, dan sistem dark mode
    ├── layout.css       # Flexbox header & CSS Grid matrix
    └── components.css   # Kartu, tombol, badge, dan transisi halus
```

---

## 2. Integrasi Seluruh Modul (Minggu 1-13)

Proyek akhir ini menyatukan:
1. **Pondasi Box Model & Tipografi (Minggu 1-5):** Reset rapi, `border-box`, skala teks `rem`, dan bayangan bertingkat.
2. **Tata Letak & Responsif (Minggu 6-9):** Navbar `sticky`, tombol `fixed`, kartu `Flexbox`, grid 2D `repeat(auto-fit, minmax(...))`, dan media query mobile-first.
3. **Sistem Lanjutan & Interaktivitas (Minggu 10-13):** Variabel CSS `:root`, toggle tema, transisi taktil 60fps, dan pseudo-elemen dekoratif.

---

## 3. Langkah Pengujian & Produksi
- Uji tampilan di resolusi ponsel (375px), tablet (768px), dan monitor lebar (1280px).
- Pastikan tidak ada scrollbar horizontal yang tidak disengaja.
- Periksa kontras warna di mode terang maupun mode gelap.

---

## Program: Portal Studio Lengkap Responsif dengan Dark Mode dan Grid

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

## Bedah Detail Kode Program

- Token `:root` & `[data-theme="dark"]`: Menyatukan seluruh warna antarmuka dalam variabel terpusat yang bisa dialihkan seketika dengan transisi lembut.
- `.site-nav { position: sticky; top: 0; }`: Mengunci navigasi di bagian atas layar selama pengguna menelusuri halaman.
- `clamp(2rem, 5vw, 3rem)`: Tipografi lentur pada judul hero yang otomatis menyesuaikan ukuran layar tanpa media query tambahan.
- `.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }`: Menyusun deretan kartu layanan dalam 1, 2, atau 3 kolom sesuai ruang yang tersedia secara mulus.
- `.service-card:hover`: Memberikan transisi pengangkatan taktil `translateY(-4px)` dengan bayangan lembut saat pengguna berinteraksi.

---

## Eksperimen di Playground

1. Ubah nilai warna, padding, atau margin pada kode program di Playground dan perhatikan perubahan tata letaknya secara langsung.
2. Coba tambahkan aturan gaya baru sesuai kebutuhan komponen halaman Anda.
3. Kecilkan dan perlebar jendela preview untuk memeriksa respon layout terhadap ukuran layar yang bervariasi.

---

## Tantangan Praktik

Terapkan konsep Minggu 14 ini pada file styles.css proyek Anda. Pastikan selektor tidak menggunakan !important, perhatikan spesifisitas, dan gunakan satuan rem untuk konsistensi hierarki.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Mencampuradukkan unit px kaku dengan unit fleksibel: Menggunakan width: 1000px pada kontainer tanpa max-width: 100% akan menyebabkan overflow horizontal di layar ponsel.
- Lupa menentukan transisi pada background-color: Mengubah tema gelap tanpa transisi membuat peralihan warna terasa silau dan mengejutkan mata.
- Lupa mengunci box-sizing: border-box: Menyebabkan elemen bertambah besar saat diberi padding atau border.
- Mengabaikan z-index pada navbar sticky: Konten lain yang memiliki posisi relative atau transform bisa menimpa navbar saat digulir.

---

## Ringkasan

- Modul Minggu 14 (Proyek Akhir: Website Lengkap Responsif) melatih pemahaman konsep dan penataan gaya visual secara terstruktur.
- Kode CSS mematuhi standar W3C dan langsung dapat diuji serta dimodifikasi di browser dan CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan fitur dan komponen visual hingga proyek website utuh terselesaikan.
