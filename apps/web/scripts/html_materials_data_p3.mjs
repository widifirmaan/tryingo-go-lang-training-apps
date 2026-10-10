// HTML Weeks 9 to 14 (Level 3: UI Frameworks - Bootstrap, Bulma, Pico CSS, DaisyUI, Web Components, and Final Capstone)
// Clean, professional, zero gimmick words.

export const HTML_WEEKS_P3 = [
  // ─── WEEK 9 ───
  {
    week: 9,
    levelId: 'advanced',
    topicId: 'bootstrap-grid-dan-komponen',
    titleId: 'Bootstrap: Grid System dan Komponen',
    titleEn: 'Bootstrap: Grid System and Components',
    category: 'HTML5',
    levelNameId: 'Framework UI',
    levelNameEn: 'UI Frameworks',
    objectivesId: [
      'Memahami fungsi framework UI berbasis komponen untuk mempercepat penataan antarmuka web',
      'Memasang Bootstrap 5 ke dalam dokumen HTML menggunakan CDN link CSS dan script JS',
      'Menguasai sistem Grid 12 kolom: .container, .row, .col, dan breakpoint responsif (col-sm, col-md, col-lg)',
      'Menerapkan komponen antarmuka siap pakai: Navbar (.navbar), Card (.card), dan Tombol (.btn .btn-primary)',
      'Menggunakan atribut data-bs-* untuk mengontrol komponen interaktif modal dan collapse'
    ],
    objectivesEn: [
      'Understand how component UI frameworks accelerate frontend development',
      'Install Bootstrap 5 via CDN CSS links and JS bundle scripts',
      'Master the 12-column grid system: .container, .row, .col, and responsive breakpoints (col-md, col-lg)',
      'Apply pre-built UI components: Navbar (.navbar), Card (.card), and Buttons (.btn .btn-primary)',
      'Use data-bs-* attributes to trigger native interactive modals and collapsible toggles'
    ],
    contentId: `## 1. Pengenalan Framework UI dan Pemasangan Bootstrap

Framework UI adalah kumpulan kode CSS dan JavaScript siap pakai yang memungkinkan kita menata tampilan web dengan cepat hanya dengan menambahkan nama class tertentu pada tag HTML.

### Cara Memasang Bootstrap 5 via CDN:
Cukup sertakan link CSS di dalam \`<head>\` dan script JS sebelum penutup \`</body>\`:
\`\`\`html
<head>
  <!-- CSS Bootstrap 5 -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  ...
  <!-- JS Bootstrap 5 (untuk modal, dropdown, dan collapse) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
\`\`\`

---

## 2. Sistem Grid 12 Kolom Bootstrap

Bootstrap membagi lebar halaman menjadi **12 kolom imajiner**:
- **\`.container\`**: Wadah pembungkus yang memberi margin kiri dan kanan secara rapi.
- **\`.row\`**: Baris pembungkus kolom.
- **\`.col-md-6\`**: Di layar komputer (\`md\`), elemen mengambil 6 dari 12 kolom (artinya lebar 50%). Di layar ponsel, otomatis menjadi lebar penuh 100%.

\`\`\`html
<div class="container">
  <div class="row">
    <div class="col-md-6">Kolom Kiri (50%)</div>
    <div class="col-md-6">Kolom Kanan (50%)</div>
  </div>
</div>
\`\`\`

---

## 3. Komponen Bawaan: Navbar, Card, dan Modal
- **Navbar:** \`<nav class="navbar navbar-expand-lg bg-dark navbar-dark">\`
- **Card:** \`<div class="card"><div class="card-body">...</div></div>\`
- **Tombol:** \`<button class="btn btn-primary">\` (warna biru) atau \`<button class="btn btn-success">\` (warna hijau)
- **Modal Popup:** Membuka jendela pop-up cukup dengan atribut \`data-bs-toggle="modal" data-bs-target="#idModal"\`.`,

    contentEn: `## 1. UI Framework Overview and Bootstrap Installation

A UI framework provides pre-tested CSS classes and JavaScript plugins to build responsive interfaces by attaching standardized class names to HTML tags.

### Installing Bootstrap 5 via CDN:
Add the CSS link inside \`<head>\` and the JS script bundle before closing \`</body>\`:
\`\`\`html
<head>
  <!-- Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  ...
  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
\`\`\`

---

## 2. Bootstrap 12-Column Grid System

Bootstrap partitions layout width into **12 proportional columns**:
- **\`.container\`**: Responsive layout boundary.
- **\`.row\`**: Horizontal column wrapper.
- **\`.col-md-6\`**: On medium screens and up, occupies 6/12 columns (50% width). On small mobile viewports, stacks automatically to 100%.

\`\`\`html
<div class="container">
  <div class="row">
    <div class="col-md-6">Left Column (50%)</div>
    <div class="col-md-6">Right Column (50%)</div>
  </div>
</div>
\`\`\`

---

## 3. Core Components: Navbar, Card, and Modal
- **Navbar:** \`<nav class="navbar navbar-expand-lg bg-dark navbar-dark">\`
- **Card:** \`<div class="card"><div class="card-body">...</div></div>\`
- **Buttons:** \`<button class="btn btn-primary">\` (primary blue) or \`<button class="btn btn-success">\` (green)
- **Modals:** Trigger modal popups natively using \`data-bs-toggle="modal" data-bs-target="#myModal"\`.`,

    programCode: `<!DOCTYPE html>
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
</html>`,
    programTitleId: 'Penerapan Grid 12 Kolom, Navbar, dan Card Bootstrap 5',
    programTitleEn: '12-Column Grid, Navbar, and Cards Implementation in Bootstrap 5',
    breakdownId: [
      'Line 7: Memuat file CSS Bootstrap 5 langsung dari CDN resmi.',
      'Line 12-25: Navbar responsif dengan toggle menu otomatis di layar seluler.',
      'Line 39-65: Grid `.row` dengan 3 kolom `.col-md-4` yang membagi lebar 12 kolom secara rata (4 + 4 + 4).',
      'Line 68-83: Komponen Modal interaktif yang dipicu oleh atribut `data-bs-toggle="modal"`.',
      'Line 93: Memuat file JavaScript bundle Bootstrap untuk mengaktifkan interaksi modal dan menu.'
    ],
    breakdownEn: [
      'Line 7: Imports the official Bootstrap 5 CSS stylesheet from jsDelivr CDN.',
      'Line 12-25: Responsive navbar that collapses into a burger toggle on mobile screens.',
      'Line 39-65: Grid `.row` dividing 12 columns across three `.col-md-4` cards (4 + 4 + 4 = 12).',
      'Line 68-83: Interactive modal container triggered via declarative `data-bs-toggle="modal"`.',
      'Line 93: Imports the Bootstrap JavaScript bundle enabling modal and dropdown operations.'
    ],
    pitfallsId: [
      'Lupa memuat script JS Bootstrap sehingga tombol navbar atau modal tidak merespons klik.',
      'Menulis class `.col` langsung di luar pembungkus `.row`.',
      'Penjumlahan kolom pada baris yang melebihi 12 di ukuran layar yang sama sehingga kolom patah ke bawah.'
    ],
    pitfallsEn: [
      'Omitting the Bootstrap JS bundle, causing modal triggers and responsive navbars to fail.',
      'Placing `.col-*` elements directly outside of a `.row` container.',
      'Exceeding 12 column units within a single breakpoint row, causing unexpected layout wrapping.'
    ]
  },

  // ─── WEEK 10 ───
  {
    week: 10,
    levelId: 'advanced',
    topicId: 'bulma-layout-dan-komponen',
    titleId: 'Bulma: Layout Kolom dan Komponen',
    titleEn: 'Bulma: Column Layout and Components',
    category: 'HTML5',
    levelNameId: 'Framework UI',
    levelNameEn: 'UI Frameworks',
    objectivesId: [
      'Memahami filosofi Bulma sebagai framework CSS murni berbasis Flexbox tanpa JavaScript',
      'Memasang Bulma via CDN link CSS di dalam <head>',
      'Menguasai sistem kolom Flexbox: .columns dan .column (is-half, is-one-third, is-centered)',
      'Menggunakan sintaks class ramah manusia: .is-primary, .has-text-centered, dan .is-rounded',
      'Menerapkan komponen Bulma: .hero, .box, .button, dan .navbar'
    ],
    objectivesEn: [
      'Understand Bulma as a 100% pure CSS framework built entirely on Flexbox without JavaScript dependencies',
      'Install Bulma via CDN link in the <head>',
      'Master the Flexbox columns system: .columns and .column (is-half, is-one-third, is-centered)',
      'Deploy human-readable class naming: .is-primary, .has-text-centered, and .is-rounded',
      'Implement core Bulma components: .hero, .box, .button, and .navbar'
    ],
    contentId: `## 1. Filosofi Bulma (CSS Murni Tanpa JavaScript)

Bulma adalah framework CSS modern yang **100% tidak memerlukan JavaScript**. Keunggulannya:
- **Sangat Ringan:** Tidak ada file JS pihak ketiga yang memperlambat browser.
- **Sintaks Ramah Manusia:** Nama class ditulis seperti kalimat bahasa Inggris alami (\`.is-primary\`, \`.has-text-centered\`, \`.is-large\`).

### Pemasangan via CDN:
\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
\`\`\`

---

## 2. Sistem Kolom Flexbox Bulma
Tidak perlu menghitung angka 12 seperti Bootstrap. Cukup gunakan \`.columns\` dan \`.column\`:
- **Ukuran Otomatis:** Setiap \`.column\` di dalam \`.columns\` akan otomatis berbagi lebar secara rata!
- **Ukuran Tertentu:**
  - \`.is-half\`: Lebar 50%
  - \`.is-one-third\`: Lebar 33.3%
  - \`.is-one-quarter\`: Lebar 25%

\`\`\`html
<div class="columns">
  <div class="column is-half">Kolom 50%</div>
  <div class="column">Kolom Otomatis</div>
</div>
\`\`\`

---

## 3. Komponen Utama Bulma
- **Hero Banner:** \`<section class="hero is-primary is-medium">\` untuk header besar.
- **Box Kontainer:** \`<div class="box">\` untuk kotak berbayang halus.
- **Tombol:** \`<button class="button is-primary is-rounded">\`.`,

    contentEn: `## 1. Bulma Architecture (Pure CSS Without JavaScript)

Bulma is a modern UI framework built **100% on pure CSS without JavaScript**:
- **Lightweight Performance:** Zero external JS dependencies slowing down render cycles.
- **Readable Class Names:** Written in intuitive English modifiers (\`.is-primary\`, \`.has-text-centered\`, \`.is-large\`).

### Installing via CDN:
\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.0/css/bulma.min.css">
\`\`\`

---

## 2. Bulma Flexbox Columns System
Rather than calculating column integers, Bulma leverages native Flexbox:
- **Auto-sizing:** Child \`.column\` divs automatically divide available horizontal width equally.
- **Explicit Fractions:**
  - \`.is-half\`: 50% width
  - \`.is-one-third\`: 33.3% width
  - \`.is-one-quarter\`: 25% width

\`\`\`html
<div class="columns">
  <div class="column is-half">50% Column</div>
  <div class="column">Auto-sized Remaining Width</div>
</div>
\`\`\`

---

## 3. Core Bulma Components
- **Hero Header:** \`<section class="hero is-primary is-medium">\`
- **Box Card:** \`<div class="box">\`
- **Button:** \`<button class="button is-primary is-rounded">\`.`,

    programCode: `<!DOCTYPE html>
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
</html>`,
    programTitleId: 'Penerapan Hero, Flexbox Columns, dan Box Komponen Bulma',
    programTitleEn: 'Bulma Hero Banner, Flexbox Columns, and Card Boxes',
    breakdownId: [
      'Line 7: Memuat stylesheet Bulma murni dari CDN tanpa memerlukan file JavaScript pendukung.',
      'Line 11-19: Komponen `.hero` dengan modifier `.is-dark` dan `.is-bold` menyajikan banner pembuka.',
      'Line 26-48: Komponen `.columns` membagi 3 kotak `.column .is-one-third` secara fleksibel.',
      'Line 51: Komponen tombol `.button` dengan modifier `.is-primary`, `.is-medium`, dan `.is-rounded`.'
    ],
    breakdownEn: [
      'Line 7: Imports pure Bulma CSS without requiring script runtimes.',
      'Line 11-19: `.hero` component styled with `.is-dark` and `.is-bold` renders a clean banner.',
      'Line 26-48: `.columns` wrapper partitions three `.box` containers via `.column .is-one-third`.',
      'Line 51: `.button` modified with `.is-primary`, `.is-medium`, and `.is-rounded`.'
    ],
    pitfallsId: [
      'Mencari file JavaScript Bulma (Bulma adalah 100% CSS murni tanpa file JS bawaan).',
      'Lupa menulis tag pembungkus `.columns` sebelum mendeklarasikan elemen `.column`.',
      'Salah eja modifier Bulma (misal: menulis `primary` alih-alih `is-primary`).'
    ],
    pitfallsEn: [
      'Searching for Bulma JavaScript libraries (Bulma is 100% pure CSS with zero JS runtime).',
      'Declaring individual `.column` elements without wrapping them inside `.columns`.',
      'Omitting the `is-` prefix on Bulma modifier classes (e.g. `primary` instead of `is-primary`).'
    ]
  },

  // ─── WEEK 11 ───
  {
    week: 11,
    levelId: 'advanced',
    topicId: 'pico-css-classless',
    titleId: 'Pico CSS: Classless CSS',
    titleEn: 'Pico CSS: Classless CSS',
    category: 'HTML5',
    levelNameId: 'Framework UI',
    levelNameEn: 'UI Frameworks',
    objectivesId: [
      'Memahami konsep "Classless CSS" (menghias tag native HTML tanpa perlu menulis class kustom)',
      'Memasang Pico CSS via CDN link CSS di dalam <head>',
      'Melihat bagaimana tag standar (<header>, <main>, <article>, <button>, <table>) otomatis tampil rapi dan elegan',
      'Memanfaatkan fitur dark mode otomatis bawaan Pico CSS berdasarkan prefers-color-scheme sistem',
      'Mengetahui kasus penggunaan terbaik Pico CSS (web dokumentasi, dashboard internal, dan MVP)'
    ],
    objectivesEn: [
      'Understand "Classless CSS" architecture (styling native HTML elements without custom classes)',
      'Install Pico CSS via CDN link in <head>',
      'Observe standard tags (<header>, <main>, <article>, <button>, <table>) styled automatically out of the box',
      'Leverage Pico automated dark-mode switching powered by native prefers-color-scheme queries',
      'Recognize optimal use cases for Pico CSS (documentation, internal tools, and minimalist MVPs)'
    ],
    contentId: `## 1. Apa Itu Classless CSS?

Di framework seperti Bootstrap atau Bulma, Anda harus menghafal puluhan nama class seperti \`.card\`, \`.btn\`, \`.row\`.

**Pico CSS** menggunakan pendekatan yang berbeda: **Classless CSS**.
- Anda **tidak perlu menulis class apa pun**.
- Anda cukup menulis tag HTML standar: \`<header>\`, \`<main>\`, \`<article>\`, \`<button>\`, \`<table>\`, dan \`<form>\`.
- Pico CSS secara otomatis memberikan tata letak modern, font yang proporsional, jarak margin yang pas, dan palet warna yang elegan pada tag native tersebut!

### Pemasangan via CDN:
\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
\`\`\`

---

## 2. Fitur Unggulan Pico CSS
1. **Mode Terang dan Gelap Otomatis:** Pico CSS otomatis membaca pengaturan sistem operasi pengguna (\`prefers-color-scheme\`). Jika laptop pengguna disetel dark mode, website otomatis berubah menjadi gelap!
2. **Formulir dan Tabel Otomatis Rapi:** Tag \`<input>\`, \`<select>\`, dan \`<table>\` langsung tampil seperti aplikasi profesional.
3. **Kapan Memilih Pico CSS:** Sangat ideal untuk halaman dokumentasi, blog tulisan, dashboard data internal, atau prototipe cepat.`,

    contentEn: `## 1. What is Classless CSS?

Traditional frameworks require memorizing dozens of class names (\`.card\`, \`.btn\`, \`.row\`).

**Pico CSS** takes the opposite approach: **Classless CSS**.
- You write **zero custom class names**.
- You write standard semantic HTML: \`<header>\`, \`<main>\`, \`<article>\`, \`<button>\`, \`<table>\`, and \`<form>\`.
- Pico CSS automatically styles these native elements with responsive typography, margins, and aesthetics out of the box!

### Installing via CDN:
\`\`\`html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
\`\`\`

---

## 2. Key Advantages of Pico CSS
1. **Automated Dark Mode:** Reads native system preferences (\`prefers-color-scheme\`) to toggle dark themes automatically.
2. **Instant Forms and Tables:** \`<input>\`, \`<select>\`, and \`<table>\` elements render as production-grade UI components without utility classes.
3. **When to Choose Pico:** Ideal for technical documentation, blogs, internal business dashboards, and rapid MVPs.`,

    programCode: `<!DOCTYPE html>
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
</html>`,
    programTitleId: 'Penerapan Semantic HTML Murni dengan Pico CSS (Classless)',
    programTitleEn: 'Native Semantic HTML Styled via Pico CSS (Classless)',
    breakdownId: [
      'Line 7: Memuat satu file stylesheet Pico CSS CDN yang langsung menghias seluruh tag dokumen.',
      'Line 12-21: `<nav>`, `<ul>`, dan `<li>` otomatis menjadi navigasi horizontal tanpa menulis class flexbox.',
      'Line 29-57: `<article>`, `<table>`, dan `<form>` langsung tampil elegan dengan padding dan shadow otomatis.'
    ],
    breakdownEn: [
      'Line 7: Imports the Pico CSS CDN stylesheet that automatically styles native tags.',
      'Line 12-21: Standard `<nav>`, `<ul>`, and `<li>` elements format into a horizontal navbar without Flexbox classes.',
      'Line 29-57: `<article>`, `<table>`, and `<form>` render with cohesive typography, borders, and shadows.'
    ],
    pitfallsId: [
      'Mencoba menambahkan class Bootstrap di dalam Pico CSS (Pico dirancang untuk tag HTML murni tanpa nama class berlebih).',
      'Lupa menggunakan tag semantik seperti `<article>` atau `<hgroup>` sehingga Pico tidak dapat menerapkan styling optimal.',
      'Menulis inline style berlebihan yang menimpa kalkulasi font otomatis Pico.'
    ],
    pitfallsEn: [
      'Attempting to attach Bootstrap utility classes inside Pico CSS (Pico relies on native tags).',
      'Neglecting semantic containers like `<article>` or `<hgroup>`, preventing Pico from applying contextual styles.',
      'Overriding Pico calculations with intrusive inline styles.'
    ]
  },

  // ─── WEEK 12 ───
  {
    week: 12,
    levelId: 'advanced',
    topicId: 'daisyui-dan-utility',
    titleId: 'DaisyUI: Komponen Utility',
    titleEn: 'DaisyUI: Utility Components',
    category: 'HTML5',
    levelNameId: 'Framework UI',
    levelNameEn: 'UI Frameworks',
    objectivesId: [
      'Memahami konsep framework komponen berbasis utility (DaisyUI dan ekosistem Tailwind CSS)',
      'Memasang DaisyUI via CDN link di dalam dokumen HTML',
      'Menggunakan class komponen semantik: .btn, .card, .badge, dan .navbar',
      'Memanfaatkan sistem tema warna bawaan (theme="dark", theme="light", theme="emerald")',
      'Membandingkan kapan memilih Bootstrap, Bulma, Pico CSS, atau DaisyUI dalam proyek nyata'
    ],
    objectivesEn: [
      'Understand utility-driven component architectures (DaisyUI and the Tailwind ecosystem)',
      'Install DaisyUI via CDN script inside an HTML document',
      'Deploy semantic component classes: .btn, .card, .badge, and .navbar',
      'Leverage built-in themes (data-theme="dark", data-theme="emerald")',
      'Compare when to choose Bootstrap, Bulma, Pico CSS, or DaisyUI for production projects'
    ],
    contentId: `## 1. Konsep Utility dan DaisyUI

Dalam dunia pengembangan web, ada perdebatan antara:
1. **Component Classes (seperti Bootstrap):** Menulis class \`.btn .btn-primary\`. Sangat cepat, tetapi tampilannya mirip dengan website orang lain.
2. **Utility Classes (seperti Tailwind):** Menulis class \`px-4 py-2 bg-blue-500 rounded\`. Sangat fleksibel, tetapi kode HTML menjadi sangat panjang.

**DaisyUI** menjembatani keduanya:
- DaisyUI menambahkan **nama class komponen yang bersih dan semantik** (\`.btn\`, \`.card\`, \`.badge\`) di atas mesin Tailwind CSS.
- Anda mendapatkan komponen siap pakai tanpa membuat HTML menjadi berantakan.

### Pemasangan via CDN:
\`\`\`html
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
\`\`\`

---

## 2. Sistem Tema (Theme) Bawaan
DaisyUI memiliki puluhan tema warna bawaan yang dapat diaktifkan hanya dengan atribut \`data-theme\` pada tag \`<html>\`:
\`\`\`html
<html data-theme="emerald">
\`\`\`
Pilihan tema populer: \`light\`, \`dark\`, \`cupcake\`, \`emerald\`, \`synthwave\`, \`forest\`.

---

## 3. Matriks Pemilihan Framework HTML/UI:
| Kebutuhan Proyek | Pilihan Framework Terbaik |
|---|---|
| Cepat, enterprise, butuh banyak komponen interaktif | **Bootstrap 5** |
| Ringan, CSS murni, tanpa file JavaScript | **Bulma** |
| Minimalis, tulisan/dokumentasi, tanpa nulis class | **Pico CSS** |
| Modern, tema warna beragam, integrasi Tailwind | **DaisyUI** |`,

    contentEn: `## 1. Utility Architecture and DaisyUI

Web UI development often balances two paradigms:
1. **Component Classes (Bootstrap):** Using \`.btn .btn-primary\`. Fast prototyping, but visually homogeneous.
2. **Utility Classes (Tailwind):** Using \`px-4 py-2 bg-blue-500 rounded\`. Highly customizable, but litters HTML markup with lengthy utility tokens.

**DaisyUI** merges both paradigms:
- Delivers **clean, semantic component class names** (\`.btn\`, \`.card\`, \`.badge\`) powered by Tailwind CSS.
- Supplies pre-styled components without cluttered markup.

### Installing via CDN:
\`\`\`html
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
\`\`\`

---

## 2. Built-in Theming Engine
DaisyUI includes dozens of production themes activated via the \`data-theme\` attribute on the root \`<html>\` element:
\`\`\`html
<html data-theme="emerald">
\`\`\`
Popular themes: \`light\`, \`dark\`, \`emerald\`, \`synthwave\`, \`forest\`.

---

## 3. UI Framework Selection Matrix:
| Project Requirements | Ideal Framework Choice |
|---|---|
| Enterprise, extensive pre-built interactive JS widgets | **Bootstrap 5** |
| Pure CSS Flexbox without JavaScript dependencies | **Bulma** |
| Minimalist documents, blogs, zero class tokens | **Pico CSS** |
| Modern styling, extensible theme switching, Tailwind engine | **DaisyUI** |`,

    programCode: `<!DOCTYPE html>
<html lang="id" data-theme="forest">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio DaisyUI — Alex Pratama</title>
  <!-- DaisyUI CSS & Tailwind CDN -->
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen p-4 max-w-2xl mx-auto">

  <!-- NAVBAR DAISYUI -->
  <div class="navbar bg-base-200 rounded-box mb-6">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Alex.dev</a>
    </div>
    <div class="flex-none">
      <span class="badge badge-primary">Tema: Forest</span>
    </div>
  </div>

  <!-- HERO CARD -->
  <div class="card bg-base-200 shadow-xl mb-6">
    <div class="card-body">
      <h1 class="card-title text-2xl">Studio Web Alex Pratama</h1>
      <p class="text-base-content/80">
        Menggabungkan kekuatan HTML semantik dengan komponen antarmuka DaisyUI.
      </p>
      <div class="card-actions justify-end mt-4">
        <button class="btn btn-primary">Konsultasi</button>
      </div>
    </div>
  </div>

  <!-- BADGES & LIST -->
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-lg">Keahlian Teknologi</h2>
      <div class="flex flex-wrap gap-2 mt-2">
        <div class="badge badge-outline">HTML5 Semantik</div>
        <div class="badge badge-outline">CSS Flexbox</div>
        <div class="badge badge-outline">Bootstrap 5</div>
        <div class="badge badge-outline">DaisyUI</div>
      </div>
    </div>
  </div>

  <footer class="footer footer-center p-4 text-base-content mt-8">
    <aside>
      <p>&copy; 2026 Alex Pratama. Ditenagai oleh DaisyUI.</p>
    </aside>
  </footer>

</body>
</html>`,
    programTitleId: 'Penerapan Navbar, Card, dan Badge dengan DaisyUI Theme',
    programTitleEn: 'DaisyUI Navbar, Cards, and Badges with Theme Engine',
    breakdownId: [
      'Line 2: Atribut `data-theme="forest"` mengaktifkan tema gelap kehijauan secara instan.',
      'Line 7-8: Memuat stylesheet DaisyUI dan runtime script Tailwind CSS.',
      'Line 13-20: Komponen `.navbar` dengan wadah `.bg-base-200` dan tombol `.btn .btn-ghost`.',
      'Line 23-33: Komponen `.card` dengan `.card-body` dan `.card-actions`.'
    ],
    breakdownEn: [
      'Line 2: `data-theme="forest"` instantly applies an emerald forest palette across all children.',
      'Line 7-8: Imports DaisyUI styles and the Tailwind CDN runtime.',
      'Line 13-20: `.navbar` component styled with `.bg-base-200` background tokens.',
      'Line 23-33: `.card` component paired with `.card-body` and `.card-actions`.'
    ],
    pitfallsId: [
      'Lupa memuat runtime Tailwind CSS CDN saat menggunakan DaisyUI via CDN.',
      'Salah menuliskan nilai pada atribut `data-theme` sehingga tema warna kembali ke default.',
      'Menggunakan class DaisyUI yang bertabrakan dengan CSS kustom tanpa spesifisitas yang benar.'
    ],
    pitfallsEn: [
      'Omitting the Tailwind CSS CDN runtime when importing DaisyUI via CDN.',
      'Misspelling the `data-theme` attribute value, falling back to the default palette.',
      'Overriding DaisyUI styles with conflicting custom CSS rules without proper specificity.'
    ]
  },

  // ─── WEEK 13 ───
  {
    week: 13,
    levelId: 'advanced',
    topicId: 'web-components',
    titleId: 'Web Components: Custom Elements dan Template',
    titleEn: 'Web Components: Custom Elements and Template',
    category: 'HTML5',
    levelNameId: 'Framework UI',
    levelNameEn: 'UI Frameworks',
    objectivesId: [
      'Memahami standar Web Components sebagai masa depan HTML native tanpa ketergantungan framework besar',
      'Membuat Custom Elements (<user-card>, <site-header>) menggunakan JavaScript class dan customElements.define()',
      'Mengisolasi gaya visual dan DOM menggunakan Shadow DOM (attachShadow)',
      'Memanfaatkan tag <template> dan <slot> untuk menyusun komponen yang dapat digunakan berulang kali',
      'Menggunakan library Web Components siap pakai seperti Shoelace (<sl-button>, <sl-dialog>)'
    ],
    objectivesEn: [
      'Understand the Web Components standard as the future of native HTML markup without heavy frameworks',
      'Define Custom Elements (<user-card>, <site-header>) using ES6 classes and customElements.define()',
      'Encapsulate styling and markup using the Shadow DOM (attachShadow)',
      'Leverage <template> and <slot> elements to build reusable component architectures',
      'Integrate production Web Component libraries such as Shoelace (<sl-button>, <sl-dialog>)'
    ],
    contentId: `## 1. Apa Itu Web Components?

Web Components adalah teknologi native browser yang memungkinkan pengembang **membuat tag HTML kustom sendiri**.
Contoh: Daripada menulis \`<div class="kartu-profil">\`, Anda dapat membuat tag sendiri bernama \`<kartu-profil>\`!

### Tiga Pilar Web Components:
1. **Custom Elements:** Standar untuk mendaftarkan nama tag HTML baru (wajib memiliki tanda hubung, contoh: \`<info-box>\`).
2. **Shadow DOM:** Mengisolasi CSS di dalam komponen agar tidak bocor dan tidak merusak styling halaman utama.
3. **HTML Templates (\`<template>\` & \`<slot>\`):** Kerangka kode yang dapat diisi konten dinamis.

---

## 2. Cara Membuat Custom Element Sederhana
\`\`\`javascript
class KartuInfo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = \`
      <div style="border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
        <h3>\${this.getAttribute('judul') || 'Judul Default'}</h3>
        <p>\${this.textContent}</p>
      </div>
    \`;
  }
}
customElements.define('kartu-info', KartuInfo);
\`\`\`
Setelah didaftarkan, Anda dapat menggunakan tag tersebut langsung di file HTML:
\`\`\`html
<kartu-info judul="Pengumuman Penting">Ini adalah teks pengumuman kustom.</kartu-info>
\`\`\`

---

## 3. Web Components Siap Pakai: Shoelace
Anda tidak selalu harus menulis Web Components dari nol. Ada pustaka Web Components siap pakai bernama **Shoelace**:
\`\`\`html
<sl-button variant="primary">Tombol Shoelace</sl-button>
<sl-dialog label="Dialog Kustom">...</sl-dialog>
\`\`\``,

    contentEn: `## 1. What are Web Components?

Web Components represent the native web platform standard allowing developers to **author custom reusable HTML tags**.
Example: Rather than writing \`<div class="profile-card">\`, you create a bespoke \`<profile-card>\` tag!

### The Three Pillars of Web Components:
1. **Custom Elements:** Set of JavaScript APIs defining new HTML tag names (must contain a hyphen, e.g. \`<info-box>\`).
2. **Shadow DOM:** Encapsulates CSS and DOM trees, preventing style leakage into global document scopes.
3. **HTML Templates (\`<template>\` & \`<slot>\`):** Non-rendered markup fragments reused dynamically.

---

## 2. Creating a Native Custom Element
\`\`\`javascript
class InfoCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = \`
      <div style="border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px;">
        <h3>\${this.getAttribute('title') || 'Default Title'}</h3>
        <p>\${this.textContent}</p>
      </div>
    \`;
  }
}
customElements.define('info-card', InfoCard);
\`\`\`
Use your custom tag directly inside HTML markup:
\`\`\`html
<info-card title="Notice">This is encapsulated custom text.</info-card>
\`\`\`

---

## 3. Production Web Component Libraries: Shoelace
Developers can leverage ready-made Web Components such as **Shoelace**:
\`\`\`html
<sl-button variant="primary">Shoelace Button</sl-button>
<sl-dialog label="Custom Modal">...</sl-dialog>
\`\`\``,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Web Components Native — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
  </style>
</head>
<body>

  <header>
    <h1>Web Components Native</h1>
    <p>Membuat tag HTML kustom sendiri menggunakan standar resmi Custom Elements.</p>
  </header>

  <main>
    <h2>Komponen Kartu Kustom</h2>
    
    <!-- MENGGUNAKAN TAG KUSTOM KITA SENDIRI -->
    <kartu-layanan judul="Pembuatan Website" paket="Dasar">
      Membangun struktur dokumen HTML5 semantik dan terstruktur.
    </kartu-layanan>

    <kartu-layanan judul="Integrasi Framework" paket="Bisnis">
      Penyusunan antarmuka responsif menggunakan Bootstrap atau Bulma.
    </kartu-layanan>
  </main>

  <!-- DEFINISI JAVASCRIPT CUSTOM ELEMENT -->
  <script>
    class KartuLayanan extends HTMLElement {
      connectedCallback() {
        const judul = this.getAttribute('judul') || 'Layanan';
        const paket = this.getAttribute('paket') || 'Standar';
        const deskripsi = this.innerHTML;

        this.innerHTML = \`
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h3 style="margin: 0; color: #0284c7; font-size: 16px;">\${judul}</h3>
              <span style="background: #0284c7; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">\${paket}</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #475569;">\${deskripsi}</p>
          </div>
        \`;
      }
    }

    // Daftarkan nama tag kustom ke browser
    customElements.define('kartu-layanan', KartuLayanan);
  </script>

  <footer>
    <p>&copy; 2026 Alex Pratama. Custom Elements HTML Standar.</p>
  </footer>

</body>
</html>`,
    programTitleId: 'Pembuatan dan Penggunaan Custom Element <kartu-layanan>',
    programTitleEn: 'Authoring and Deploying the <kartu-layanan> Custom Element',
    breakdownId: [
      'Line 20-26: Penggunaan tag kustom `<kartu-layanan>` langsung di dalam dokumen HTML.',
      'Line 30-49: Definisi kelas JavaScript turunan `HTMLElement` yang mengatur isi komponen.',
      'Line 52: `customElements.define(\'kartu-layanan\', KartuLayanan)` mendaftarkan tag ke sistem browser.'
    ],
    breakdownEn: [
      'Line 20-26: Direct deployment of the custom `<kartu-layanan>` element inside standard HTML markup.',
      'Line 30-49: ES6 class extending `HTMLElement` managing inner layout rendering.',
      'Line 52: `customElements.define(\'kartu-layanan\', KartuLayanan)` binds the tag to the browser engine.'
    ],
    pitfallsId: [
      'Menamai tag kustom tanpa tanda hubung (nama tag kustom WAJIB memiliki setidaknya satu tanda minus/hubung, misal: `<my-card>`, bukan `<mycard>`).',
      'Lupa memanggil method `customElements.define()` sebelum atau setelah tag ditulis.',
      'Mengubah struktur DOM di dalam constructor alih-alih di dalam lifecycle `connectedCallback()`.'
    ],
    pitfallsEn: [
      'Naming custom elements without a hyphen (custom elements REQUIRE at least one hyphen, e.g. `<my-card>`, not `<mycard>`).',
      'Forgetting to register the class with `customElements.define()`.',
      'Manipulating the DOM inside the class constructor rather than the `connectedCallback()` lifecycle.'
    ]
  },

  // ─── WEEK 14 ───
  {
    week: 14,
    levelId: 'advanced',
    topicId: 'proyek-akhir-framework',
    titleId: 'Proyek Akhir dengan Framework UI',
    titleEn: 'Final Project with UI Framework',
    category: 'HTML5',
    levelNameId: 'Framework UI',
    levelNameEn: 'UI Frameworks',
    objectivesId: [
      'Merancang ulang proyek website dari Minggu 8 menggunakan framework UI profesional (Bootstrap 5)',
      'Mengintegrasikan grid 12 kolom, navbar responsif, tabel data, dan formulir dengan komponen framework',
      'Menguji tampilan di berbagai ukuran layar: smartphone (360px), tablet (768px), dan desktop (1200px)',
      'Memastikan seluruh kode tetap mematuhi standar aksesibilitas WCAG dan semantik HTML5',
      'Menyelesaikan kurikulum HTML 14 minggu dengan satu proyek akhir portofolio yang siap dipublikasikan'
    ],
    objectivesEn: [
      'Refactor the Week 8 website project using an industry-standard UI framework (Bootstrap 5)',
      'Integrate 12-column grids, responsive navbars, tabular pricing, and inquiry forms using framework components',
      'Audit viewport responsiveness across mobile (360px), tablet (768px), and desktop (1200px) displays',
      'Preserve strict WCAG accessibility compliance and HTML5 semantic document architecture',
      'Conclude the 14-week HTML curriculum with a production-ready portfolio project'
    ],
    contentId: `## 1. Arsitektur Proyek Akhir Framework UI

Di minggu penutup ini, Anda merancang ulang portal website profil studio yang telah dibangun sejak Minggu 1, namun kini dipersenjatai dengan sistem grid dan komponen **Bootstrap 5**:

\`\`\`text
final-project/
├── index.html        # Portal Beranda Lengkap (Hero, Layanan Grid, Tabel Harga, Form Kontak, Modal)
├── css/
│   └── custom.css    # Penyesuaian warna identitas tambahan
└── images/
    └── logo.png      # Aset grafis
\`\`\`

---

## 2. Integrasi Komponen Menyeluruh
Proyek akhir ini menyatukan seluruh materi yang dipelajari selama 14 minggu:
1. **Dasar HTML (Minggu 1-4):** Metadata \`<head>\`, hierarki heading, semantik landmark, dan tabel perbandingan paket.
2. **Form dan Interaksi (Minggu 5-8):** Formulir kontak berlabel aksesibel dengan validasi bawaan.
3. **Framework UI (Minggu 9-14):** Grid responsif 12 kolom, komponen kartu (\`.card\`), navbar menu kolaps, dan modal popup.

---

## 3. Langkah Publikasi Proyek
Setelah file \`index.html\` selesai diuji di browser lokal:
1. Proyek dapat langsung di-upload ke GitHub Pages, Vercel, atau Cloudflare Pages secara gratis.
2. Karena seluruh dependensi framework dimuat melalui CDN resmi, proyek tidak memerlukan proses build yang rumit.`,

    contentEn: `## 1. Final UI Framework Project Architecture

In this concluding capstone week, you re-engineer your studio portfolio website built since Week 1 using the production components of **Bootstrap 5**:

\`\`\`text
final-project/
├── index.html        # Complete Web Portal (Hero, Services Grid, Pricing Table, Form, Modal)
├── css/
│   └── custom.css    # Supplemental styling overrides
└── images/
    └── logo.png      # Assets
\`\`\`

---

## 2. Comprehensive Component Integration
This final project synthesizes all competencies mastered over 14 weeks:
1. **HTML Foundations (Weeks 1-4):** Valid \`<head>\` metadata, heading structures, semantic landmarks, and tabular pricing.
2. **Forms and Interaction (Weeks 5-8):** Accessible inquiry forms with client-side validation constraints.
3. **UI Frameworks (Weeks 9-14):** 12-column grid responsiveness, \`.card\` components, collapsible navbars, and interactive modals.

---

## 3. Deployment Steps
Once \`index.html\` passes local validation:
1. Deploy directly to GitHub Pages or Cloudflare Pages for free global hosting.
2. With framework dependencies sourced via CDNs, zero compilation steps are required.`,

    programCode: `<!DOCTYPE html>
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
</html>`,
    programTitleId: 'Portal Website Lengkap Berbasis HTML5 dan Bootstrap 5',
    programTitleEn: 'Production Web Portal Powered by Semantic HTML5 and Bootstrap 5',
    breakdownId: [
      'Line 16-30: Navbar sticky responsif yang terkunci di bagian atas saat halaman digulir.',
      'Line 33-39: Banner hero dengan judul display tebal dan tombol aksi utama.',
      'Line 42-69: Grid 12 kolom membagi 3 kartu layanan `.col-md-4` secara proporsional.',
      'Line 72-108: Tabel Bootstrap `.table .table-bordered .table-hover` untuk data paket harga terstruktur.',
      'Line 111-135: Formulir kontak terintegrasi dengan class form Bootstrap (`.form-label`, `.form-control`).'
    ],
    breakdownEn: [
      'Line 16-30: Sticky responsive navbar fixed to the viewport during vertical scrolling.',
      'Line 33-39: Hero banner section featuring a lead call-to-action button.',
      'Line 42-69: 12-column grid partitioning 3 service cards evenly via `.col-md-4`.',
      'Line 72-108: Bootstrap `.table` rendering structured pricing data with hover feedback.',
      'Line 111-135: Inquiry form with Bootstrap input classes (`.form-label`, `.form-control`).'
    ],
    pitfallsId: [
      'Lupa membungkus tabel dengan class `.table-responsive` sehingga tabel terpotong di layar ponsel sempit.',
      'Lupa menulis atribut `id` pada section yang menjadi target tautan navbar (#layanan, #harga, #kontak).',
      'Menggunakan class utilitas yang berlebihan sehingga kode sulit dirawat.'
    ],
    pitfallsEn: [
      'Omitting the `.table-responsive` wrapper, causing wide tables to clip on narrow mobile screens.',
      'Missing target `id` attributes on sections linked from the navbar (#layanan, #harga, #kontak).',
      'Over-relying on redundant utility classes that degrade code readability.'
    ]
  }
];
