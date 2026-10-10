export const CSS_WEEKS_P2 = [
  // ── MINGGU 6: Display dan Positioning ───────────────────────────────────────
  {
    week: 6,
    topicId: 'display-dan-positioning',
    levelId: 'intermediate',
    levelNameId: 'Tata Letak & Desain Responsif',
    levelNameEn: 'Layout & Responsive Design',
    category: 'CSS3',
    titleId: 'Display dan Positioning',
    titleEn: 'Display and Positioning',
    objectivesId: [
      'Memahami 4 nilai display dasar: block, inline, inline-block, dan none',
      'Menguasai 5 skema posisi CSS: static, relative, absolute, fixed, dan sticky',
      'Menggunakan koordinat top, right, bottom, left untuk penempatan presisi',
      'Memahami mekanisme z-index dan cara terbentuknya Stacking Context',
      'Membangun komponen navigasi sticky dan tombol mengambang (floating action button)'
    ],
    objectivesEn: [
      'Understand 4 foundational display values: block, inline, inline-block, none',
      'Master 5 CSS positioning modes: static, relative, absolute, fixed, sticky',
      'Direct precision placement with top, right, bottom, left offsets',
      'Master z-index layering mechanics and Stacking Context creation',
      'Construct a sticky navigation bar and fixed floating action button'
    ],
    contentId: `## 1. Tipe-Tipe Display

Properti \`display\` menentukan perilaku kotak elemen dalam alur dokumen:

- **\`block\`**: Menempati lebar penuh kontainer (100%), memaksa elemen berikutnya turun ke baris baru. Menerima aturan \`width\`, \`height\`, \`margin\`, \`padding\` (contoh: \`div\`, \`p\`, \`section\`).
- **\`inline\`**: Hanya memakan lebar sebesar kontennya, mengalir bersama teks dalam baris yang sama. **Tidak** menerima \`width\`, \`height\`, maupun margin/padding vertikal (contoh: \`span\`, \`a\`).
- **\`inline-block\`**: Mengalir horizontal berdampingan seperti inline, namun **menerima** pengaturan \`width\`, \`height\`, padding, dan margin seperti elemen block.
- **\`none\`**: Menghilangkan elemen sepenuhnya dari dokumen (tidak memakan ruang apa pun). Berbeda dengan \`visibility: hidden\` yang menyembunyikan elemen tetapi tetap menyisakan ruang kosongnya.

---

## 2. Skema Nilai Properti 'position'

\`\`\`text
┌───────────┬──────────────────────────────────────────────────────────────┐
│ Position  │ Karakteristik & Perilaku Alur Dokumen                        │
├───────────┼──────────────────────────────────────────────────────────────┤
│ static    │ Bawaan normal. Mengikuti alur dokumen alami (top/left mati). │
│ relative  │ Bergeser relatif dari posisi aslinya, menyisakan ruang asal. │
│ absolute  │ Keluar dari alur dokumen, menempel pada leluhur non-static. │
│ fixed     │ Keluar dari alur dokumen, menempel absolut pada viewport.    │
│ sticky    │ Mengalir normal, lalu mengunci posisi saat di-scroll.        │
└───────────┴──────────────────────────────────────────────────────────────┘
\`\`\`

### Hubungan Erat: relative & absolute
Pola paling umum dalam antarmuka adalah menetapkan \`position: relative\` pada elemen induk, dan \`position: absolute\` pada elemen anak:

\`\`\`css
.induk {
  position: relative; /* Menjadi jangkar koordinat untuk anak */
}
.anak {
  position: absolute;
  top: 10px;
  right: 10px;        /* Berada di pojok kanan atas elemen induk */
}
\`\`\`

---

## 3. z-index dan Stacking Context

\`z-index\` mengontrol tumpukan kedalaman elemen pada sumbu Z (depan-belakang).
- \`z-index\` **hanya berfungsi** pada elemen yang memiliki posisi selain \`static\` (\`relative\`, \`absolute\`, \`fixed\`, \`sticky\`).
- Nilai yang lebih tinggi akan tampil di depan elemen dengan nilai lebih rendah.`,
    contentEn: `## 1. Core Display Modes

The \`display\` property governs how elements behave inside the document flow:

- **\`block\`**: Occupies 100% parent width, breaking onto a new line. Honors \`width\`, \`height\`, margins, and paddings (\`div\`, \`p\`, \`section\`).
- **\`inline\`**: Occupies only its content width, flowing inside sentence lines. Does **not** honor \`width\`, \`height\`, or vertical margins (\`span\`, \`a\`).
- **\`inline-block\`**: Flows horizontally alongside inline peers while **honoring** custom \`width\`, \`height\`, padding, and margin definitions.
- **\`none\`**: Completely unmounts the element from rendering, freeing layout space. Unlike \`visibility: hidden\` which keeps empty bounding box space.

---

## 2. Position Value Behaviors

\`\`\`text
┌───────────┬──────────────────────────────────────────────────────────────┐
│ Position  │ Characteristics & Flow Behavior                              │
├───────────┼──────────────────────────────────────────────────────────────┤
│ static    │ Natural default. Follows sequential document flow.           │
│ relative  │ Offsets relative to own original slot; retains space.        │
│ absolute  │ Removed from flow; positioned relative to positioned parent. │
│ fixed     │ Removed from flow; locked relative to the browser viewport.  │
│ sticky    │ Flows naturally until reaching scroll threshold, then locks. │
└───────────┴──────────────────────────────────────────────────────────────┘
\`\`\`

### The Parent-Child Anchor Pattern
The gold standard positioning pattern sets \`relative\` on the parent to anchor \`absolute\` child elements:

\`\`\`css
.parent {
  position: relative; /* Coordinate anchor */
}
.badge-corner {
  position: absolute;
  top: 8px;
  right: 8px;         /* Anchored precisely to parent corner */
}
\`\`\`

---

## 3. z-index and Stacking Context

\`z-index\` controls stacking order along the Z-axis (front-to-back):
- \`z-index\` **only activates** on positioned elements (\`relative\`, \`absolute\`, \`fixed\`, \`sticky\`).
- Higher numerical integers render in front of lower values.`,
    programTitleId: 'Navigasi Sticky, Badge Pojok Absolute, dan Tombol Fixed',
    programTitleEn: 'Sticky Navigation, Absolute Corner Badge, and Fixed Button',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Display dan Positioning</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      min-height: 140vh; /* Memberi ruang scroll untuk mendemonstrasikan sticky & fixed */
    }

    /* 1. Header dengan Posisi Sticky */
    .navbar-sticky {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navbar-sticky .brand {
      font-weight: 700;
      font-size: 18px;
    }

    .main-content {
      max-width: 600px;
      margin: 32px auto;
      padding: 0 20px;
    }

    /* 2. Kartu dengan Posisi Relative sebagai Jangkar */
    .card-relative {
      position: relative;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    /* 3. Badge dengan Posisi Absolute */
    .badge-absolute {
      position: absolute;
      top: 16px;
      right: 16px;
      background-color: #E2F2E9;
      color: #2E5B44;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid #C6E6D5;
    }

    .card-relative h3 {
      font-size: 20px;
      color: #1A202C;
      margin-bottom: 12px;
    }

    .card-relative p {
      font-size: 15px;
      line-height: 1.6;
      color: #4A5568;
    }

    /* 4. Tombol Aksi Mengambang (Fixed) */
    .btn-fixed-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99;
      background-color: #2E5B44;
      color: #FFFFFF;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
      box-shadow: 0 8px 16px rgba(46, 91, 68, 0.3);
      transition: transform 0.2s ease, background-color 0.2s ease;
    }

    .btn-fixed-fab:hover {
      background-color: #234634;
      transform: scale(1.08);
    }
  </style>
</head>
<body>

  <!-- Navigasi Sticky -->
  <header class="navbar-sticky">
    <div class="brand">Tryngo Portal</div>
    <span>Menu Navigasi</span>
  </header>

  <main class="main-content">
    <div class="card-relative">
      <span class="badge-absolute">Aktif</span>
      <h3>Materi Positioning Terstruktur</h3>
      <p>Gulir halaman ke bawah untuk melihat bagaimana navbar di atas tetap mengunci posisinya (sticky) dan tombol aksi bundar di pojok kanan bawah tetap menempel pada layar (fixed).</p>
    </div>

    <div class="card-relative">
      <h3>Pengujian Scroll Layar</h3>
      <p>Elemen berposisi sticky menyatu secara alami di dalam dokumen hingga batas viewport atas tercapai, lalu beralih fungsi menjadi semacam posisi fixed.</p>
    </div>
  </main>

  <!-- Tombol Mengambang (Floating Action Button) -->
  <a href="#" class="btn-fixed-fab" title="Pesan Baru">+</a>

</body>
</html>`,
    breakdownId: [
      '`position: sticky; top: 0; z-index: 100`: Mengunci navbar pada posisi paling atas layar saat halaman digulir.',
      '`.card-relative { position: relative; }`: Menetapkan kontainer kartu sebagai titik acuan koordinat (0,0) bagi elemen anak berposisi absolute.',
      '`.badge-absolute { position: absolute; top: 16px; right: 16px; }`: Menempatkan badge status secara presisi di sudut kanan atas kartu.',
      '`.btn-fixed-fab { position: fixed; bottom: 24px; right: 24px; }`: Mengunci tombol mengambang pada sudut kanan bawah viewport browser tanpa terpengaruh pergerakan scroll.',
      '`z-index: 100` vs `z-index: 99`: Memastikan navbar selalu bertengger di lapisan paling atas melintasi elemen-elemen di bawahnya.'
    ],
    breakdownEn: [
      '`position: sticky; top: 0; z-index: 100`: Locks navigation to top viewport ceiling once scrolled past.',
      '`.card-relative { position: relative; }`: Establishes the coordinate origin bounding box for nested absolute children.',
      '`.badge-absolute { position: absolute; top: 16px; right: 16px; }`: Pins status pill directly to top-right card perimeter.',
      '`.btn-fixed-fab { position: fixed; bottom: 24px; right: 24px; }`: Pins circular floating action button to viewport bottom-right persistently.',
      '`z-index: 100` vs `z-index: 99`: Guarantees navigation header remains above content and buttons during scroll.'
    ],
    pitfallsId: [
      'Lupa memberikan position: relative pada elemen induk: Elemen anak dengan position: absolute akan melompat keluar dan menempel ke elemen <html> atau <body>.',
      'Sticky tidak berfungsi karena overflow: hidden pada elemen induk: Jika ada elemen pembungkus yang memiliki overflow: hidden/auto, posisi sticky tidak akan pernah aktif.',
      'Lupa menentukan nilai top pada position: sticky: Properti sticky wajib memiliki nilai ambang batas (seperti top: 0), jika tidak ia hanya bertindak sebagai static.',
      'Menggunakan z-index pada elemen static: Menulis z-index: 999 pada elemen tanpa position tidak akan memberikan efek tumpukan apa pun.'
    ],
    pitfallsEn: [
      'Omitting position: relative on the parent container: An absolute child will escape its container and attach directly to the document root <html>.',
      'Sticky broken by parent overflow: hidden: Any ancestor carrying overflow: hidden/auto disrupts sticky scroll thresholds.',
      'Missing threshold offset on sticky: Position sticky requires an explicit trigger such as top: 0 to activate lock behavior.',
      'Applying z-index to static elements: Assigning z-index on non-positioned elements has zero effect on rendering order.'
    ]
  },

  // ── MINGGU 7: Flexbox: Tata Letak Satu Dimensi ───────────────────────────────
  {
    week: 7,
    topicId: 'flexbox-tata-letak',
    levelId: 'intermediate',
    levelNameId: 'Tata Letak & Desain Responsif',
    levelNameEn: 'Layout & Responsive Design',
    category: 'CSS3',
    titleId: 'Flexbox: Tata Letak Satu Dimensi',
    titleEn: 'Flexbox: One-Dimensional Layout',
    objectivesId: [
      'Memahami konsep sumbu utama (Main Axis) dan sumbu silang (Cross Axis) pada Flexbox',
      'Menguasai properti Flex Container: flex-direction, justify-content, align-items, dan gap',
      'Mengatur pembungkusan elemen baris dengan flex-wrap: wrap',
      'Menguasai properti Flex Item: flex-grow, flex-shrink, dan flex-basis',
      'Membangun tata letak navigasi bar dan deretan kartu produk yang fleksibel'
    ],
    objectivesEn: [
      'Understand Main Axis and Cross Axis spatial dynamics in Flexbox',
      'Master Flex Container rules: flex-direction, justify-content, align-items, and gap',
      'Wrap fluid multi-line item flows using flex-wrap: wrap',
      'Master Flex Item distribution: flex-grow, flex-shrink, and flex-basis',
      'Construct a flexible navigation header and responsive product card row'
    ],
    contentId: `## 1. Konsep Dasar Sumbu Flexbox

Flexbox dirancang untuk mendistribusikan ruang dan menyejajarkan item di sepanjang **satu dimensi** (baik berupa baris horizontal maupun kolom vertikal).

\`\`\`text
                  MAIN AXIS (Sumbu Utama: justify-content)
            ─────────────────────────────────────────────────────►
        ┌───┬─────────────────────────────────────────────────┐
        │   │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
CROSS   │   │  │  Flex Item 1  │ │  Flex Item 2  │ │  Flex Item 3  │  │
AXIS    │   │  └───────────────┘ └───────────────┘ └───────────────┘  │
        ▼   └─────────────────────────────────────────────────┘
(Sumbu Silang: align-items)
\`\`\`

- **Main Axis**: Arah default ditentukan oleh \`flex-direction\` (\`row\` horizontal atau \`column\` vertikal). Penjajaran diatur dengan **\`justify-content\`**.
- **Cross Axis**: Arah yang tegak lurus dengan Main Axis. Penjajaran diatur dengan **\`align-items\`**.

---

## 2. Properti Penjajaran Flex Container

### A. \`justify-content\` (Sumbu Utama)
- \`flex-start\`: Menempel di awal (kiri pada row).
- \`center\`: Berada persis di tengah.
- \`space-between\`: Item pertama dan terakhir menempel di ujung tepi, sisa ruang dibagi rata di antaranya.
- \`space-around\` & \`space-evenly\`: Memberikan ruang pemisah yang proporsional di sekeliling item.

### B. \`align-items\` (Sumbu Silang)
- \`stretch\` (default): Menyamakan tinggi seluruh item sesuai item tertinggi.
- \`center\`: Meratakan elemen secara vertikal di tengah.
- \`flex-start\` / \`flex-end\`: Meratakan elemen ke atas atau ke bawah.

### C. Jarak dengan \`gap\`
Gunakan \`gap: 16px\` langsung pada kontainer flex untuk memberikan jarak antar elemen tanpa perlu mengatur \`margin\` manual pada setiap anak.

---

## 3. Kontrol Perilaku Item: flex-grow, flex-shrink, flex-basis

Shorthand praktis untuk mengatur item adalah \`flex: grow shrink basis\`:

\`\`\`css
.kolom-utama {
  flex: 1 1 0%; /* atau flex: 1; -> Tumbuh mengisi sisa ruang kosong */
}
.kolom-tetap {
  flex: 0 0 250px; /* Lebar tetap 250px, tidak membesar dan tidak mengecil */
}
\`\`\``,
    contentEn: `## 1. The Flexbox Axis Mental Model

Flexbox distributes spatial allocations along **one single dimension** (either a horizontal row or a vertical column).

\`\`\`text
                  MAIN AXIS (Direction: justify-content)
            ─────────────────────────────────────────────────────►
        ┌───┬─────────────────────────────────────────────────┐
        │   │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐  │
CROSS   │   │  │  Flex Item 1  │ │  Flex Item 2  │ │  Flex Item 3  │  │
AXIS    │   │  └───────────────┘ └───────────────┘ └───────────────┘  │
        ▼   └─────────────────────────────────────────────────┘
(Cross Direction: align-items)
\`\`\`

- **Main Axis**: Directed by \`flex-direction\` (\`row\` or \`column\`). Governed by **\`justify-content\`**.
- **Cross Axis**: Perpendicular to the main axis. Governed by **\`align-items\`**.

---

## 2. Flex Container Rules

### A. \`justify-content\` (Main Axis)
- \`flex-start\`: Aligned to line start.
- \`center\`: Clustered around the spatial center.
- \`space-between\`: First item pinned to start, last pinned to end, gaps equalized.
- \`space-evenly\`: Strict uniform spacing between and around all items.

### B. \`align-items\` (Cross Axis)
- \`stretch\` (default): Stretches all items to match tallest sibling height.
- \`center\`: Centers items vertically along cross axis.

### C. Gaps
Always utilize \`gap: 16px\` directly on the flex container instead of applying individual child margin calculations.

---

## 3. Flex Item Proportions: grow, shrink, basis

\`\`\`css
.primary-column {
  flex: 1; /* Absorbs remaining unoccupied space */
}
.fixed-sidebar {
  flex: 0 0 260px; /* Fixed 260px width, neither expanding nor shrinking */
}
\`\`\``,
    programTitleId: 'Navigasi Lengkap dan Deretan Kartu Responsif dengan Flexbox',
    programTitleEn: 'Complete Navigation and Responsive Card Row via Flexbox',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Flexbox Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 24px;
    }

    /* 1. Header dengan Justify-Content: Space-Between */
    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #FFFFFF;
      padding: 16px 24px;
      border-radius: 12px;
      border: 1px solid #E2E8F0;
      margin-bottom: 32px;
    }

    .brand-logo {
      font-size: 18px;
      font-weight: 800;
      color: #2E5B44;
    }

    .menu-links {
      display: flex;
      gap: 20px;
      list-style: none;
    }

    .menu-links a {
      text-decoration: none;
      color: #4A5568;
      font-size: 14px;
      font-weight: 600;
      transition: color 0.15s ease;
    }

    .menu-links a:hover {
      color: #2E5B44;
    }

    /* 2. Kontainer Kartu dengan Flex-Wrap */
    .cards-row {
      display: flex;
      gap: 24px;
      flex-wrap: wrap; /* Bungkus ke baris baru jika layar sempit */
    }

    /* 3. Item Kartu dengan Flex-Grow */
    .feature-card {
      flex: 1 1 240px; /* Minimal 240px, tumbuh seimbang jika ada ruang */
      background-color: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      flex-direction: column; /* Sumbu dalam kartu menjadi vertikal */
      justify-content: space-between;
      min-height: 180px;
    }

    .feature-card h4 {
      font-size: 18px;
      color: #2E5B44;
      margin-bottom: 8px;
    }

    .feature-card p {
      font-size: 14px;
      color: #718096;
      line-height: 1.5;
      margin-bottom: 16px;
    }

    .card-footer {
      font-size: 13px;
      font-weight: 700;
      color: #2E5B44;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <header class="header-nav">
    <div class="brand-logo">NusaDesign</div>
    <ul class="menu-links">
      <li><a href="#">Beranda</a></li>
      <li><a href="#">Fitur</a></li>
      <li><a href="#">Harga</a></li>
      <li><a href="#">Kontak</a></li>
    </ul>
  </header>

  <section class="cards-row">
    <div class="feature-card">
      <div>
        <h4>Flex Direction</h4>
        <p>Mengatur orientasi alur item apakah mendatar (row) atau menurun (column).</p>
      </div>
      <a href="#" class="card-footer">Pelajari Sumbu &rarr;</a>
    </div>

    <div class="feature-card">
      <div>
        <h4>Justify Content</h4>
        <p>Mendistribusikan sisa ruang kosong di sepanjang sumbu utama secara terukur.</p>
      </div>
      <a href="#" class="card-footer">Pelajari Penjajaran &rarr;</a>
    </div>

    <div class="feature-card">
      <div>
        <h4>Flex Wrap</h4>
        <p>Memungkinkan elemen turun ke baris berikutnya secara otomatis saat layar menyempit.</p>
      </div>
      <a href="#" class="card-footer">Pelajari Pembungkusan &rarr;</a>
    </div>
  </section>

</body>
</html>`,
    breakdownId: [
      '`.header-nav { display: flex; justify-content: space-between; align-items: center; }`: Menempatkan logo di tepi kiri dan menu navigasi di tepi kanan, sejajar rapi secara vertikal.',
      '`.menu-links { display: flex; gap: 20px; }`: Mengatur link menu mendatar sejajar dengan jarak seragam 20px tanpa margin individual.',
      '`.cards-row { display: flex; gap: 24px; flex-wrap: wrap; }`: Mengaktifkan pembungkusan kartu sehingga layout tidak pernah overflow di layar kecil.',
      '`.feature-card { flex: 1 1 240px; }`: Menetapkan dasar lebar 240px; jika ruang lebih luas ketiga kartu membesar seimbang, jika sempit kartu otomatis turun ke baris baru.',
      '`.feature-card { display: flex; flex-direction: column; justify-content: space-between; }`: Menerapkan flexbox vertikal di dalam kartu agar link footer selalu menempel di dasar kartu.'
    ],
    breakdownEn: [
      '`.header-nav { display: flex; justify-content: space-between; align-items: center; }`: Pushes logo left and navigation links right while vertical centering.',
      '`.menu-links { display: flex; gap: 20px; }`: Organizes horizontal nav links with consistent 20px gaps without margin hacks.',
      '`.cards-row { display: flex; gap: 24px; flex-wrap: wrap; }`: Enables multi-line wrapping preventing layout clipping on smaller screens.',
      '`.feature-card { flex: 1 1 240px; }`: Sets 240px base width; items expand equally across wider viewports and wrap gracefully when constrained.',
      '`.feature-card { display: flex; flex-direction: column; justify-content: space-between; }`: Nested vertical flexbox pinning card action link cleanly to the bottom.'
    ],
    pitfallsId: [
      'Lupa mengaktifkan flex-wrap: wrap: Tanpa flex-wrap, Flexbox akan memaksakan semua elemen tetap dalam 1 baris, menyebabkan kartu gepeng atau melebar keluar layar.',
      'Salah sumbu saat mengganti flex-direction: column: Saat arah menjadi column, justify-content mengatur posisi vertikal dan align-items mengatur posisi horizontal.',
      'Menggunakan margin kiri/kanan manual alih-alih gap: Menggunakan margin anak sering menyebabkan jarak berlebih di kartu paling tepi.',
      'Menetapkan width kaku pada flex item: Menggunakan width: 300px alih-alih flex-basis dapat menghambat kemampuan elastis Flexbox saat beradaptasi.'
    ],
    pitfallsEn: [
      'Omitting flex-wrap: wrap: Without wrap, Flexbox forces all cards onto a single line, squishing contents or generating horizontal overflow.',
      'Inverting axes under flex-direction: column: Under column flow, justify-content directs vertical alignment while align-items controls horizontal alignment.',
      'Manual child margins instead of gap: Adding manual margins creates undesirable excess spacing on the outer perimeter cards.',
      'Hardcoding fixed width on flex items: Using static width overrides flex-basis and limits fluid responsiveness.'
    ]
  },

  // ── MINGGU 8: CSS Grid: Tata Letak Dua Dimensi ───────────────────────────────
  {
    week: 8,
    topicId: 'css-grid-tata-letak',
    levelId: 'intermediate',
    levelNameId: 'Tata Letak & Desain Responsif',
    levelNameEn: 'Layout & Responsive Design',
    category: 'CSS3',
    titleId: 'CSS Grid: Tata Letak Dua Dimensi',
    titleEn: 'CSS Grid: Two-Dimensional Layout',
    objectivesId: [
      'Memahami arsitektur dua dimensi CSS Grid (baris dan kolom simultan)',
      'Menguasai unit pecahan fr (fractional unit) dan fungsi repeat()',
      'Menggunakan minmax() bersama auto-fit untuk grid responsif otomatis tanpa media query',
      'Menguasai grid-column dan grid-row untuk penggabungan sel (spanning)',
      'Menerapkan grid-template-areas untuk rancangan tata letak halaman yang mudah dipahami'
    ],
    objectivesEn: [
      'Understand two-dimensional grid layouts coordinating rows and columns simultaneously',
      'Master fractional fr units and repeat() helpers',
      'Deploy minmax() with auto-fit for auto-responsive grids without media queries',
      'Master grid-column and grid-row cell spanning techniques',
      'Implement named grid-template-areas for semantic layout blueprints'
    ],
    contentId: `## 1. Flexbox vs CSS Grid

- **Flexbox**: Spesialis tata letak **satu dimensi** (baris *atau* kolom). Sangat ideal untuk komponen kecil seperti navbar, form input dengan tombol, atau deretan tag.
- **CSS Grid**: Spesialis tata letak **dua dimensi** (baris *dan* kolom sekaligus). Sangat ideal untuk struktur halaman menyeluruh (*macro layout*) seperti dashboard atau galeri kartu.

---

## 2. Unit Pecahan 'fr' dan Pengulangan 'repeat()'

CSS Grid memperkenalkan unit \`fr\` (*fractional unit*) yang merepresentasikan bagian dari sisa ruang yang tersedia di kontainer:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Kolom tengah 2x lebih lebar dari kolom samping */
  gap: 20px;
}
\`\`\`

Fungsi \`repeat()\` mempermudah pendefinisian kolom seragam:
\`\`\`css
/* Membuat 4 kolom dengan lebar sama persis */
grid-template-columns: repeat(4, 1fr);
\`\`\`

---

## 3. Pola Grid Responsif Otomatis: \`auto-fit\` & \`minmax()\`

Anda dapat menciptakan grid kartu yang otomatis menyesuaikan jumlah kolom di setiap ukuran layar tanpa menulis satu baris pun media query:

\`\`\`css
.kartu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
\`\`\`

- **\`auto-fit\`**: Browser menghitung berapa banyak kolom selebar minimal 260px yang muat di kontainer.
- **\`minmax(260px, 1fr)\`**: Setiap kolom lebarnya minimal 260px, dan jika ada ruang sisa, kolom akan membesar seimbang mengisi layar.

---

## 4. Tata Letak Semantik dengan \`grid-template-areas\`

\`\`\`css
.layout-dashboard {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  grid-template-columns: 240px 1fr;
}
\`\`\``,
    contentEn: `## 1. Flexbox vs CSS Grid

- **Flexbox**: One-dimensional (row *or* column). Optimized for component-level interfaces like navigation bars and button groups.
- **CSS Grid**: Two-dimensional (rows *and* columns simultaneously). Optimized for macro layouts like dashboards and content matrices.

---

## 2. Fractional Units 'fr' and 'repeat()'

CSS Grid introduces \`fr\` representing a fraction of available container space:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Middle column is 2x wider */
  gap: 20px;
}
\`\`\`

\`repeat()\` streamlines uniform column declarations:
\`\`\`css
/* 4 equal-width columns */
grid-template-columns: repeat(4, 1fr);
\`\`\`

---

## 3. Auto-Responsive Grid Pattern: \`auto-fit\` & \`minmax()\`

Generate self-adapting responsive column layouts without media queries:

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
\`\`\`

- **\`auto-fit\`**: Automatically packs as many columns as fit.
- **\`minmax(260px, 1fr)\`**: Columns never shrink below 260px; expands dynamically to consume remaining space.

---

## 4. Visual Layout Blueprints with \`grid-template-areas\`

\`\`\`css
.dashboard-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main  "
    "footer  footer";
  grid-template-columns: 240px 1fr;
}
\`\`\``,
    programTitleId: 'Dashboard Analitik Lengkap dengan CSS Grid Blueprint',
    programTitleEn: 'Complete Analytics Dashboard with CSS Grid Blueprint',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>CSS Grid Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 24px;
    }

    /* 1. Tata Letak Makro Grid dengan Template Areas */
    .dashboard-container {
      display: grid;
      grid-template-areas:
        "nav    nav    nav"
        "side   stat1  stat2"
        "side   main   main";
      grid-template-columns: 200px 1fr 1fr;
      grid-template-rows: auto auto 1fr;
      gap: 16px;
      max-width: 840px;
      margin: 0 auto;
      min-height: 480px;
    }

    .box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 20px;
    }

    /* 2. Menghubungkan Area Grid */
    .grid-nav {
      grid-area: nav;
      background-color: #2E5B44;
      color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
    }

    .grid-sidebar {
      grid-area: side;
      background-color: #F0F4F2;
      border-color: #DDE5E1;
    }

    .grid-sidebar ul {
      list-style: none;
      margin-top: 12px;
    }

    .grid-sidebar li {
      padding: 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: #2E5B44;
      border-bottom: 1px solid #E2E8F0;
    }

    .grid-stat {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .grid-stat1 { grid-area: stat1; }
    .grid-stat2 { grid-area: stat2; }

    .stat-label {
      font-size: 12px;
      color: #718096;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 800;
      color: #2E5B44;
    }

    .grid-main {
      grid-area: main;
    }

    .grid-main h3 {
      font-size: 18px;
      color: #1A202C;
      margin-bottom: 10px;
    }

    .grid-main p {
      font-size: 14px;
      line-height: 1.6;
      color: #4A5568;
    }
  </style>
</head>
<body>

  <div class="dashboard-container">
    <header class="box grid-nav">
      <strong>Panel Statistik Studio</strong>
      <span style="font-size: 13px;">Online: 48 Pengguna</span>
    </header>

    <aside class="box grid-sidebar">
      <strong>Navigasi</strong>
      <ul>
        <li>Ringkasan</li>
        <li>Laporan Proyek</li>
        <li>Pengaturan</li>
      </ul>
    </aside>

    <div class="box grid-stat grid-stat1">
      <span class="stat-label">Total Kunjungan</span>
      <span class="stat-value">12.480</span>
    </div>

    <div class="box grid-stat grid-stat2">
      <span class="stat-label">Tingkat Retensi</span>
      <span class="stat-value">84,6%</span>
    </div>

    <main class="box grid-main">
      <h3>Analisis Performa Kuartal</h3>
      <p>CSS Grid memberikan kendali presisi atas baris dan kolom sekaligus. Dalam layout ini, sidebar membentang di samping widget metrik dan panel utama secara bersamaan tanpa perlu pembungkus bertingkat.</p>
    </main>
  </div>

</body>
</html>`,
    breakdownId: [
      '`grid-template-areas`: Membuat peta cetak biru dua dimensi yang memetakan posisi header, sidebar, statistik, dan main secara visual langsung di kode CSS.',
      '`grid-template-columns: 200px 1fr 1fr`: Membagi kolom menjadi lebar tetap 200px untuk sidebar, dan dua kolom fleksibel dengan lebar terbagi sama rata (`1fr`).',
      '`.grid-sidebar { grid-area: side; }`: Mengaitkan elemen sidebar ke area `side` yang membentang di 2 baris vertikal sekaligus.',
      '`.grid-main { grid-area: main; }`: Menempatkan panel konten utama membentang di bawah kedua widget statistik (`stat1` dan `stat2`).',
      '`gap: 16px`: Mengatur jarak pemisah seragam antar seluruh sel grid secara simultan.'
    ],
    breakdownEn: [
      '`grid-template-areas`: Establishes visual 2D layout map anchoring navigation, sidebar, statistics, and main panels cleanly.',
      '`grid-template-columns: 200px 1fr 1fr`: Allocates 200px fixed width to the sidebar and splits remaining space across two equal 1fr data tracks.',
      '`.grid-sidebar { grid-area: side; }`: Spans the sidebar across two consecutive vertical row slots without wrapper divs.',
      '`.grid-main { grid-area: main; }`: Spans the main reporting card horizontally across the lower quadrant under both stat widgets.',
      '`gap: 16px`: Enforces uniform grid gutter spacing across all cells simultaneously.'
    ],
    pitfallsId: [
      'Menulis nama area tidak konsisten di grid-template-areas: Jika jumlah kolom pada salah satu baris string tidak sama persis dengan baris lain, seluruh grid akan gagal dirender.',
      'Membuat pembungkus div berlebihan: Sering kali pemula membungkus sidebar dan main ke dalam div lain, padahal CSS Grid bekerja paling baik saat anak langsung diletakkan di grid induk.',
      'Lupa memberikan display: grid pada kontainer: Mendefinisikan grid-template-columns tanpa display: grid tidak akan berpengaruh apa pun.',
      'Kebingungan antara auto-fit dan auto-fill: auto-fit merentangkan kartu yang ada untuk memenuhi baris, sedangkan auto-fill menyisakan kolom kosong di ujung kanan.'
    ],
    pitfallsEn: [
      'Mismatched grid-template-areas string counts: Every quoted row string must contain the exact same number of column tokens or the declaration invalidates.',
      'Excessive structural wrapper divs: CSS Grid excels with direct flat children; wrapping siblings unnecessarily limits spanning agility.',
      'Omitting display: grid: Defining grid-template-columns on a standard block element does nothing.',
      'Confusing auto-fit with auto-fill: auto-fit expands existing items to consume remaining space while auto-fill reserves empty ghost tracks.'
    ]
  },

  // ── MINGGU 9: Desain Responsif dan Media Queries ─────────────────────────────
  {
    week: 9,
    topicId: 'desain-responsif-media-queries',
    levelId: 'intermediate',
    levelNameId: 'Tata Letak & Desain Responsif',
    levelNameEn: 'Layout & Responsive Design',
    category: 'CSS3',
    titleId: 'Desain Responsif dan Media Queries',
    titleEn: 'Responsive Design and Media Queries',
    objectivesId: [
      'Memahami filosofi pendekatan Mobile-First dalam arsitektur CSS',
      'Memverifikasi peran tag <meta name="viewport"> untuk rendering mobile',
      'Menguasai sintaks media query @media (min-width: ...) dan breakpoint standar',
      'Menerapkan fungsi tipografi lentur: clamp(), min(), dan max()',
      'Membangun halaman responsif multi-kolom yang beradaptasi halus dari layar ponsel ke desktop (Level 2 Capstone)'
    ],
    objectivesEn: [
      'Understand the Mobile-First architectural philosophy in CSS',
      'Verify the role of <meta name="viewport"> in mobile rendering',
      'Master media query syntax @media (min-width: ...) and standard device breakpoints',
      'Implement fluid responsive scaling via clamp(), min(), and max()',
      'Construct a multi-column responsive layout adapting smoothly from mobile to desktop (Level 2 Capstone)'
    ],
    contentId: `## 1. Filosofi Mobile-First

Pendekatan **Mobile-First** berarti menulis CSS dasar di luar media query untuk tampilan layar ponsel yang sempit (1 kolom sederhana), kemudian menambahkan \`@media (min-width: ...)\` untuk memperkaya tata letak saat layar semakin lebar.

\`\`\`text
Alur Mobile-First:
┌─────────────────┐       ┌───────────────────────┐       ┌────────────────────────────────┐
│ Layar Ponsel    │  ──►  │ Tablet (@media 768px) │  ──►  │ Layar Desktop (@media 1024px) │
│ 1 Kolom Ringkas │       │ 2 Kolom Berdampingan  │       │ 3-4 Kolom Penuh                │
└─────────────────┘       └───────────────────────┘       └────────────────────────────────┘
\`\`\`

Mengapa Mobile-First unggul?
1. Ponsel memproses CSS lebih cepat karena tidak perlu membaca aturan desktop yang tidak terpakai.
2. Desain mobile lebih minimalis, menjamin prioritas konten utama tampil terlebih dahulu.

---

## 2. Sintaks Media Query dan Breakpoint Standar

\`\`\`css
/* 1. Aturan Dasar untuk Mobile (< 768px) */
.layout {
  display: block;
}

/* 2. Tablet (>= 768px) */
@media (min-width: 768px) {
  .layout {
    display: flex;
    gap: 20px;
  }
}

/* 3. Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
\`\`\`

---

## 3. Tipografi Lentur dengan \`clamp()\`

Hindari mengubah \`font-size\` berulang-ulang di setiap media query. Gunakan fungsi \`clamp(min, preferred, max)\`:

\`\`\`css
h1 {
  /* Ukuran font minimal 1.5rem, idealnya 4vw (skala lebar layar), maksimal 2.5rem */
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}
\`\`\``,
    contentEn: `## 1. The Mobile-First Philosophy

The **Mobile-First** approach dictates defining baseline CSS outside media queries for compact mobile screens (clean 1-column stack), incrementally adding \`@media (min-width: ...)\` enhancements as viewport widths expand.

\`\`\`text
Mobile-First Flow:
┌─────────────────┐       ┌───────────────────────┐       ┌────────────────────────────────┐
│ Mobile Screen   │  ──►  │ Tablet (@media 768px) │  ──►  │ Desktop Viewport (@media 1024px│
│ 1-Column Stack  │       │ 2-Column Split        │       │ 3-4 Column Matrix              │
└─────────────────┘       └───────────────────────┘       └────────────────────────────────┘
\`\`\`

Why Mobile-First dominates:
1. Mobile devices evaluate leaner stylesheets without overhead from unused desktop overrides.
2. Forces disciplined prioritization of primary content hierarchy.

---

## 2. Media Query Syntax and Breakpoints

\`\`\`css
/* 1. Mobile Default (< 768px) */
.layout {
  display: block;
}

/* 2. Tablet (>= 768px) */
@media (min-width: 768px) {
  .layout {
    display: flex;
    gap: 20px;
  }
}

/* 3. Desktop (>= 1024px) */
@media (min-width: 1024px) {
  .layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
\`\`\`

---

## 3. Fluid Scaling with \`clamp()\`

Eliminate redundant font overrides across breakpoints using \`clamp(min, preferred, max)\`:

\`\`\`css
h1 {
  /* Min 1.5rem, fluid 4vw proportional to viewport width, max 2.5rem */
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}
\`\`\``,
    programTitleId: 'Halaman Responsif Adaptif Mobile ke Desktop',
    programTitleEn: 'Adaptive Responsive Page from Mobile to Desktop',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desain Responsif</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 20px;
      line-height: 1.6;
    }

    .container {
      max-width: 960px;
      margin: 0 auto;
    }

    /* 1. Header Responsif dengan clamp() */
    .hero-banner {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: clamp(24px, 5vw, 48px);
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
    }

    .hero-banner h1 {
      font-size: clamp(1.5rem, 4vw, 2.25rem);
      font-weight: 800;
      margin-bottom: 8px;
    }

    .hero-banner p {
      font-size: clamp(0.875rem, 2vw, 1.125rem);
      opacity: 0.9;
    }

    /* 2. Grid Responsif: Default Mobile 1 Kolom */
    .responsive-grid {
      display: grid;
      grid-template-columns: 1fr; /* 1 kolom penuh di layar ponsel */
      gap: 16px;
    }

    .card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 10px;
      padding: 20px;
    }

    .card h3 {
      color: #2E5B44;
      font-size: 18px;
      margin-bottom: 8px;
    }

    .card p {
      color: #4A5568;
      font-size: 14px;
    }

    /* 3. Media Query Tablet (>= 640px): Beralih ke 2 Kolom */
    @media (min-width: 640px) {
      .responsive-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }

    /* 4. Media Query Desktop (>= 1024px): Beralih ke 3 Kolom */
    @media (min-width: 1024px) {
      .responsive-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      body {
        padding: 40px;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <header class="hero-banner">
      <h1>Tata Letak Responsif Mandiri</h1>
      <p>Ubah ukuran lebar jendela browser untuk melihat perubahan kolom secara langsung.</p>
    </header>

    <main class="responsive-grid">
      <div class="card">
        <h3>Layar Ponsel (< 640px)</h3>
        <p>Tampilan mengalir dalam 1 kolom vertikal yang ramah ibu jari dan mudah digulir.</p>
      </div>

      <div class="card">
        <h3>Layar Tablet (>= 640px)</h3>
        <p>Media query mengaktifkan 2 kolom sejajar untuk memanfaatkan lebar layar tablet.</p>
      </div>

      <div class="card">
        <h3>Layar Desktop (>= 1024px)</h3>
        <p>Di layar monitor lebar, tata letak otomatis berkembang menjadi 3 kolom yang lapang.</p>
      </div>
    </main>
  </div>

</body>
</html>`,
    breakdownId: [
      '`<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Deklarasi wajib di bagian head HTML yang memberitahu browser mobile untuk merender halaman sesuai lebar fisik layar perangkat.',
      '`font-size: clamp(1.5rem, 4vw, 2.25rem)`: Tipografi lentur yang membesar dan mengecil secara proporsional dengan lebar layar tanpa perlu breakpoint terpisah.',
      '`grid-template-columns: 1fr`: Aturan mobile-first dasar yang menyusun kartu dalam 1 kolom bertumpuk di ponsel.',
      '`@media (min-width: 640px)`: Breakpoint tablet yang mengubah layout menjadi 2 kolom saat lebar layar minimal 640px.',
      '`@media (min-width: 1024px)`: Breakpoint desktop yang memperluas layout menjadi 3 kolom saat lebar layar minimal 1024px.'
    ],
    breakdownEn: [
      '`<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Essential HTML tag directing mobile devices to align viewport scale with hardware display width.',
      '`font-size: clamp(1.5rem, 4vw, 2.25rem)`: Fluid typography smoothly scaling between minimum and maximum bounds based on live viewport width.',
      '`grid-template-columns: 1fr`: Mobile-first baseline stacking all cards into a single column.',
      '`@media (min-width: 640px)`: Tablet breakpoint splitting grid into 2 columns at 640px and wider.',
      '`@media (min-width: 1024px)`: Desktop breakpoint expanding matrix into 3 columns at 1024px and wider.'
    ],
    pitfallsId: [
      'Lupa tag meta viewport: Tanpa tag ini di <head>, browser ponsel akan merender halaman seolah-olah di layar desktop 980px lalu mengecilkannya hingga teks tidak terbaca.',
      'Menggunakan max-width untuk media query saat menulis mobile-first: Mencampur max-width dan min-width menyebabkan aturan saling bertabrakan dan sulit dilacak.',
      'Terlalu banyak breakpoint yang tidak perlu: Menyetel breakpoint untuk setiap tipe ponsel (iPhone, Samsung, Pixel) membuat kode berantakan. Cukup gunakan 3 breakpoint standar (640px, 768px, 1024px).',
      'Mengabaikan overflow horizontal: Menggunakan lebar statis seperti width: 800px di dalam elemen anak akan merusak layout responsif di layar ponsel.'
    ],
    pitfallsEn: [
      'Omitting the meta viewport tag: Without viewport meta, mobile browsers emulate a 980px desktop screen and zoom out, rendering text illegible.',
      'Mixing max-width with min-width: Writing mobile-first requires strict min-width queries to maintain logical upward cascade.',
      'Device-specific breakpoint proliferation: Avoid targeting specific phone models; adhere to content-driven standard breakpoints (640px, 768px, 1024px).',
      'Hardcoded child widths causing horizontal overflow: Assigning fixed pixel widths (width: 800px) breaks responsive scaling and forces horizontal scrolling.'
    ]
  }
];
