export const CSS_WEEKS_P3 = [
  // ── MINGGU 10: Variabel CSS dan Sistem Tema ──────────────────────────────────
  {
    week: 10,
    topicId: 'variabel-css-dan-tema',
    levelId: 'advanced',
    levelNameId: 'Sistem CSS, Animasi & Proyek Akhir',
    levelNameEn: 'CSS Systems, Animation & Final Project',
    category: 'CSS3',
    titleId: 'Variabel CSS dan Sistem Tema',
    titleEn: 'CSS Variables and Theming Systems',
    objectivesId: [
      'Memahami deklarasi CSS Custom Properties (Variabel CSS) di pseudo-class :root',
      'Mengambil dan menggunakan nilai variabel dengan fungsi var() serta nilai fallback',
      'Memahami cakupan (scope) variabel CSS: variabel global vs variabel lokal komponen',
      'Membangun sistem tema Light Mode dan Dark Mode berbasis atribut data-theme',
      'Menerapkan deteksi preferensi sistem operasi pengguna dengan @media (prefers-color-scheme)'
    ],
    objectivesEn: [
      'Understand CSS Custom Properties (Variables) declaration inside :root',
      'Retrieve and resolve variables using var() with fallback values',
      'Master variable scoping: global theme tokens vs local component overrides',
      'Construct Light and Dark Mode theming using data-theme attributes',
      'Deploy operating system preference detection with @media (prefers-color-scheme)'
    ],
    contentId: `## 1. Deklarasi dan Penggunaan Variabel CSS

CSS Custom Properties (Variabel CSS) memungkinkan penyimpanan nilai yang dapat digunakan ulang di seluruh stylesheet:

\`\`\`css
/* 1. Deklarasi Global di :root (Elemen Tertinggi Dokumen) */
:root {
  --primary: #2E5B44;
  --bg-page: #F8FAF9;
  --text-main: #1A202C;
  --radius-md: 8px;
}

/* 2. Penggunaan dengan var() */
.btn {
  background-color: var(--primary);
  border-radius: var(--radius-md);
  color: #FFFFFF;
}

/* 3. Fallback jika variabel tidak ditemukan */
.teks {
  color: var(--warna-khusus, #333333);
}
\`\`\`

---

## 2. Cakupan Global vs Lokal

- **Global Scope (\`:root\`)**: Variabel tersedia untuk seluruh elemen di halaman.
- **Local Scope (Selektor Komponen)**: Variabel hanya berlaku di dalam elemen tersebut dan anak-anaknya:

\`\`\`css
.kartu-peringatan {
  --primary: #C53030; /* Menimpa nilai --primary khusus untuk kartu ini */
  border-color: var(--primary);
}
\`\`\`

---

## 3. Sistem Tema: Light & Dark Mode

Dengan variabel CSS, beralih antara tema terang dan gelap menjadi sangat sederhana tanpa perlu menulis ulang ratusan selektor:

\`\`\`css
/* Tema Terang (Default) */
:root {
  --bg-body: #FFFFFF;
  --text-body: #1A202C;
  --card-bg: #F7FAFC;
}

/* Tema Gelap via Atribut */
[data-theme="dark"] {
  --bg-body: #121417;
  --text-body: #EDF2F7;
  --card-bg: #1A202C;
}

body {
  background-color: var(--bg-body);
  color: var(--text-body);
}
\`\`\``,
    contentEn: `## 1. CSS Custom Properties Declaration & Usage

CSS Variables store reusable values across stylesheets:

\`\`\`css
/* 1. Global Declaration in :root */
:root {
  --primary: #2E5B44;
  --bg-page: #F8FAF9;
  --text-main: #1A202C;
  --radius-md: 8px;
}

/* 2. Retrieval via var() */
.btn {
  background-color: var(--primary);
  border-radius: var(--radius-md);
  color: #FFFFFF;
}

/* 3. Fallbacks */
.text {
  color: var(--custom-color, #333333);
}
\`\`\`

---

## 2. Global vs Local Scope

- **Global Scope (\`:root\`)**: Accessible everywhere across the document tree.
- **Local Scope**: Scoped overrides isolated to a specific component subtree:

\`\`\`css
.alert-card {
  --primary: #C53030; /* Overrides --primary specifically for this container */
  border-color: var(--primary);
}
\`\`\`

---

## 3. Theming Systems: Light & Dark Mode

CSS variables make theme switching instantaneous by merely swapping variable values:

\`\`\`css
:root {
  --bg-body: #FFFFFF;
  --text-body: #1A202C;
  --card-bg: #F7FAFC;
}

[data-theme="dark"] {
  --bg-body: #121417;
  --text-body: #EDF2F7;
  --card-bg: #1A202C;
}

body {
  background-color: var(--bg-body);
  color: var(--text-body);
}
\`\`\``,
    programTitleId: 'Sistem Tema Terang dan Gelap Menggunakan Variabel CSS',
    programTitleEn: 'Light and Dark Theming System Powered by CSS Variables',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Variabel CSS dan Tema</title>
  <style>
    /* 1. Token Desain Tema Terang (Default) */
    :root {
      --bg-canvas: #F4F6F4;
      --bg-surface: #FFFFFF;
      --text-heading: #1A202C;
      --text-muted: #4A5568;
      --border-subtle: #E2E8F0;
      --brand-primary: #2E5B44;
      --brand-accent: #3D7A5B;
      --shadow-elevation: 0 4px 6px -1px rgba(0, 0, 0, 0.06);
    }

    /* 2. Token Desain Tema Gelap */
    [data-theme="dark"] {
      --bg-canvas: #121513;
      --bg-surface: #1E2320;
      --text-heading: #F7FAFC;
      --text-muted: #A0AEC0;
      --border-subtle: #2D3748;
      --brand-primary: #48BB78;
      --brand-accent: #68D391;
      --shadow-elevation: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-canvas);
      color: var(--text-heading);
      padding: 32px;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    /* 3. Kartu yang Mengonsumsi Variabel */
    .theme-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 28px;
      max-width: 440px;
      box-shadow: var(--shadow-elevation);
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .theme-card h2 {
      font-size: 20px;
      color: var(--text-heading);
      margin-bottom: 8px;
    }

    .theme-card p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    /* 4. Tombol Aksi */
    .btn-toggle {
      background-color: var(--brand-primary);
      color: #FFFFFF;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn-toggle:hover {
      background-color: var(--brand-accent);
    }
  </style>
</head>
<body>

  <div class="theme-card">
    <h2>Sistem Desain Token Mandiri</h2>
    <p>Seluruh warna antarmuka ini dikontrol oleh CSS Custom Properties. Klik tombol di bawah untuk menguji pergantian nilai token tema secara instan.</p>
    <button class="btn-toggle" onclick="toggleTheme()">Ganti Tema (Dark / Light)</button>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>

</body>
</html>`,
    breakdownId: [
      '`:root { --brand-primary: #2E5B44; ... }`: Menyimpan palet warna dasar dokumen sebagai token yang dapat dipakai ulang di setiap komponen.',
      '`[data-theme="dark"]`: Menimpa nilai token warna untuk mode gelap tanpa perlu mengubah selektor komponen `.theme-card` atau `.btn-toggle`.',
      '`var(--bg-canvas)` dan `var(--bg-surface)`: Mengonsumsi nilai variabel secara dinamis sehingga seluruh halaman langsung bereaksi saat tema berubah.',
      '`transition: background-color 0.25s ease`: Memberikan animasi peralihan warna yang halus saat pengguna mengklik tombol ganti tema.',
      '`onclick="toggleTheme()"`: Skrip sederhana untuk mendemonstrasikan perubahan atribut data-theme di elemen <html>.'
    ],
    breakdownEn: [
      '`:root`: Central design token registry declaring baseline variables for universal consumption.',
      '`[data-theme="dark"]`: Swaps variable color values across dark mode without mutating component class declarations.',
      '`var(--bg-canvas)` and `var(--bg-surface)`: Binds surface backgrounds dynamically to active token definitions.',
      '`transition: ... 0.25s ease`: Implements smooth visual color fades during theme transitions.',
      '`onclick="toggleTheme()"`: Minimal demonstration script toggling data-theme attribute on the document root.'
    ],
    pitfallsId: [
      'Lupa tanda dua strip (--): Setiap nama variabel CSS wajib diawali dengan tanda dua strip seperti --primary, bukan primary.',
      'Nama variabel bersifat Case-Sensitive: Variabel --WarnaUtama dan --warnautama dianggap sebagai dua variabel yang berbeda oleh browser.',
      'Lupa menyediakan fallback saat memanggil var(): Jika variabel belum dideklarasikan dan tidak ada fallback, properti akan diabaikan dan kembali ke nilai default browser.',
      'Mendeklarasikan variabel di selektor yang salah: Mendeklarasikan variabel di dalam kelas .card membuatnya tidak bisa diakses oleh elemen header di luarnya.'
    ],
    pitfallsEn: [
      'Omitting double dashes (--): CSS variables must begin with double hyphens (e.g. --primary).',
      'Case sensitivity pitfalls: --brandColor and --brandcolor represent two distinct, isolated variables.',
      'Omitting fallbacks inside var(): Unset variables without fallbacks revert properties to browser initial values.',
      'Scoping errors: Defining variables inside local containers renders them inaccessible to sibling or parent elements.'
    ]
  },

  // ── MINGGU 11: Transisi dan Transformasi ──────────────────────────────────────
  {
    week: 11,
    topicId: 'transisi-dan-transformasi',
    levelId: 'advanced',
    levelNameId: 'Sistem CSS, Animasi & Proyek Akhir',
    levelNameEn: 'CSS Systems, Animation & Final Project',
    category: 'CSS3',
    titleId: 'Transisi dan Transformasi',
    titleEn: 'Transitions and Transforms',
    objectivesId: [
      'Memahami 4 sub-properti transisi: property, duration, timing-function, dan delay',
      'Menguasai fungsi kurva waktu: ease, linear, ease-in, ease-out, dan cubic-bezier',
      'Menerapkan fungsi transformasi 2D: translate(), rotate(), scale(), dan skew()',
      'Mengombinasikan transisi dengan pseudo-class :hover dan :active untuk umpan balik taktil',
      'Memahami performa rendering: transform dan opacity vs reflow layout'
    ],
    objectivesEn: [
      'Master 4 transition sub-properties: property, duration, timing-function, delay',
      'Control acceleration curves: ease, linear, ease-out, cubic-bezier',
      'Deploy 2D transformations: translate(), rotate(), scale(), skew()',
      'Pair transitions with :hover and :active for tactile micro-interactions',
      'Master compositor performance: transform and opacity vs costly layout reflows'
    ],
    contentId: `## 1. Anatomi Properti Transition

Transisi memungkinkan perubahan nilai CSS terjadi secara halus selama durasi waktu tertentu alih-alih melompat secara instan:

\`\`\`css
/* Shorthand: transition: property duration timing-function delay; */
.tombol {
  background-color: #2E5B44;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.tombol:hover {
  background-color: #234634;
  transform: translateY(-2px);
}
\`\`\`

- **\`transition-property\`**: Properti mana yang dianimasikan (misal: \`transform\`, \`opacity\`). Hindari \`transition: all\` demi performa.
- **\`transition-duration\`**: Durasi waktu berlangsung (misal: \`0.2s\` atau \`200ms\`).
- **\`transition-timing-function\`**: Kurva akselerasi (\`ease\`, \`linear\`, \`cubic-bezier(0.4, 0, 0.2, 1)\`).

---

## 2. Fungsi Transformasi 2D

Properti \`transform\` mengubah bentuk atau posisi elemen secara visual tanpa mengganggu elemen lain di sekitarnya:

- **\`translate(x, y)\`**: Menggeser posisi elemen (contoh: \`translateY(-4px)\` untuk efek melayang).
- **\`scale(faktor)\`**: Memperbesar atau memperkecil ukuran elemen (contoh: \`scale(1.05)\` memperbesar 5%).
- **\`rotate(sudut)\`**: Memutar elemen (contoh: \`rotate(45deg)\`).
- **\`skew(sudut)\`**: Memiringkan sudut elemen.

---

## 3. Aturan Emas Performa Animasi 60 FPS

Untuk animasi yang mulus dan bebas lag (60 frame per detik), **hanya animasikan 2 properti**:
1. **\`transform\`** (translate, scale, rotate)
2. **\`opacity\`** (transparansi)

Mengapa? Kedua properti ini diproses langsung oleh kartu grafis (GPU) pada lapisan komposit (*Compositor layer*), tanpa memicu proses kalkulasi ulang tata letak (*Reflow / Layout*) yang lambat seperti saat mengubah \`width\`, \`height\`, atau \`margin\`.`,
    contentEn: `## 1. Anatomy of CSS Transitions

Transitions smooth value changes over a specified timeline instead of abrupt instantaneous snaps:

\`\`\`css
/* Shorthand: transition: property duration timing-function delay; */
.btn {
  background-color: #2E5B44;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.btn:hover {
  background-color: #234634;
  transform: translateY(-2px);
}
\`\`\`

- **\`transition-property\`**: Target CSS property. Avoid \`transition: all\` to eliminate performance overhead.
- **\`transition-duration\`**: Elapsed duration (e.g. \`0.2s\` or \`200ms\`).
- **\`transition-timing-function\`**: Velocity curve (\`ease\`, \`cubic-bezier(0.4, 0, 0.2, 1)\`).

---

## 2. 2D Transform Functions

The \`transform\` property alters visual projection without displacing neighbouring sibling nodes:

- **\`translate(x, y)\`**: Shifts spatial coordinates (e.g. \`translateY(-4px)\` for lift).
- **\`scale(factor)\`**: Magnifies or contracts bounding size (e.g. \`scale(1.05)\`).
- **\`rotate(angle)\`**: Rotates orientation (e.g. \`rotate(45deg)\`).
- **\`skew(angle)\`**: Shears angles along planes.

---

## 3. The 60 FPS Performance Rule

To maintain fluid 60 frames-per-second performance, **exclusively animate two properties**:
1. **\`transform\`**
2. **\`opacity\`**

These properties bypass browser layout reflow calculations, executing directly on the GPU compositor thread.`,
    programTitleId: 'Kartu Interaktif dengan Efek Melayang dan Tombol Taktil',
    programTitleEn: 'Interactive Cards with Float Elevation and Tactile Buttons',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Transisi dan Transformasi</title>
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
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      gap: 24px;
      flex-wrap: wrap;
    }

    /* 1. Kartu Interaktif */
    .interactive-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      width: 280px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.04);
      /* Menetapkan transisi pada properti transform dan box-shadow */
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
      cursor: pointer;
    }

    .interactive-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 20px -4px rgba(46, 91, 68, 0.15);
      border-color: #C6E6D5;
    }

    .icon-box {
      width: 44px;
      height: 44px;
      background-color: #E2F2E9;
      color: #2E5B44;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-bottom: 16px;
      transition: transform 0.3s ease;
    }

    .interactive-card:hover .icon-box {
      transform: rotate(15deg) scale(1.1);
    }

    .interactive-card h3 {
      font-size: 18px;
      color: #1A202C;
      margin-bottom: 8px;
    }

    .interactive-card p {
      font-size: 13px;
      color: #718096;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    /* 2. Tombol Aksi Taktil */
    .btn-tactile {
      display: inline-block;
      width: 100%;
      background-color: #2E5B44;
      color: #FFFFFF;
      text-align: center;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      text-decoration: none;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    .btn-tactile:hover {
      background-color: #234634;
    }

    .btn-tactile:active {
      transform: scale(0.97); /* Umpan balik klik seperti tombol fisik */
    }
  </style>
</head>
<body>

  <div class="interactive-card">
    <div class="icon-box">✦</div>
    <h3>Transformasi 2D</h3>
    <p>Arahkan kursor untuk melihat animasi pengangkatan kartu dan rotasi ikon secara mulus.</p>
    <a href="#" class="btn-tactile">Klik Tombol</a>
  </div>

  <div class="interactive-card">
    <div class="icon-box">⚡</div>
    <h3>Umpan Balik Taktil</h3>
    <p>Klik tombol di bawah untuk merasakan efek penekanan fisik menggunakan transform scale.</p>
    <a href="#" class="btn-tactile">Tekan Sekarang</a>
  </div>

</body>
</html>`,
    breakdownId: [
      '`transition: transform 0.2s cubic-bezier(...), box-shadow 0.2s ease`: Menentukan transisi spesifik dengan kurva percepatan responsif yang natural.',
      '`.interactive-card:hover`: Mengombinasikan `translateY(-6px)` (terangkat) dan `scale(1.02)` (membesar halus) saat kursor melayang.',
      '`.interactive-card:hover .icon-box`: Memicu transformasi ikon anak (`rotate(15deg)`) saat kontainer kartu induk di-hover.',
      '`.btn-tactile:active { transform: scale(0.97); }`: Memberikan sensasi taktil seperti menekan tombol fisik saat tombol diklik.',
      'Performa optimal: Menggunakan transform dan opacity menjamin pergerakan animasi berjalan mulus pada 60fps tanpa memicu reflow layout.'
    ],
    breakdownEn: [
      '`transition: transform 0.2s cubic-bezier(...)`: Configures physics-based responsive acceleration curves.',
      '`.interactive-card:hover`: Combines vertical elevation with fractional scaling on pointer hover.',
      '`.interactive-card:hover .icon-box`: Triggers playful child rotational transformations during parent card hover.',
      '`.btn-tactile:active { transform: scale(0.97); }`: Emulates real tactile physical button depression on click.',
      'Compositor optimization: Transforming transform and opacity preserves smooth 60fps rendering.'
    ],
    pitfallsId: [
      'Menggunakan transition: all: Menyebabkan browser mengamati semua properti sekaligus, memperlambat rendering jika ada banyak elemen.',
      'Menganimasikan properti layout seperti width atau margin: Memicu reflow layout di setiap frame yang menyebabkan lag atau gerakan tersendat.',
      'Durasi transisi terlalu lambat: Menyetel durasi lebih dari 0.4 detik untuk interaksi tombol membuat aplikasi terasa lambat dan tidak responsif.',
      'Lupa menentukan state awal: Jika elemen tidak memiliki state awal yang jelas, transisi bisa melompat secara tiba-tiba.'
    ],
    pitfallsEn: [
      'Indiscriminate transition: all: Forces layout thread to monitor dozens of properties concurrently, degrading framerates.',
      'Animating width, height, or margin: Triggers expensive CPU layout reflows per frame causing noticeable stutters.',
      'Excessive transition durations: Transitions exceeding 400ms for button clicks make interfaces feel sluggish.',
      'Missing initial state definitions: Undefined initial properties cause sudden visual snapping.'
    ]
  },

  // ── MINGGU 12: Animasi Keyframes ─────────────────────────────────────────────
  {
    week: 12,
    topicId: 'animasi-keyframes',
    levelId: 'advanced',
    levelNameId: 'Sistem CSS, Animasi & Proyek Akhir',
    levelNameEn: 'CSS Systems, Animation & Final Project',
    category: 'CSS3',
    titleId: 'Animasi Keyframes',
    titleEn: 'Keyframe Animations',
    objectivesId: [
      'Memahami aturan deklarasi @keyframes menggunakan persentase tahapan (0% hingga 100%)',
      'Menguasai sub-properti animation: name, duration, timing-function, delay, iteration-count, dan direction',
      'Menggunakan animation-iteration-count: infinite untuk animasi berulang terus-menerus',
      'Memahami peran animation-fill-mode: forwards untuk mempertahankan posisi akhir animasi',
      'Membangun komponen UI produksi: loading spinner, denyut sinyal (pulse), dan banner masuk'
    ],
    objectivesEn: [
      'Understand @keyframes declaration structure using milestone percentages (0% to 100%)',
      'Master animation rules: name, duration, timing-function, delay, iteration-count, direction',
      'Deploy animation-iteration-count: infinite for looping UI indicators',
      'Retain final state poses with animation-fill-mode: forwards',
      'Construct production UI components: circular spinner, pulse badge, and slide-in alert'
    ],
    contentId: `## 1. Anatomi Aturan @keyframes

Berbeda dari transisi yang membutuhkan pemicu interaksi pengguna (seperti \`:hover\`), animasi CSS dapat berjalan otomatis dan memiliki alur bertingkat banyak:

\`\`\`css
/* 1. Definisi Rangkaian Gerakan */
@keyframes putarPenuh {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 2. Pengikatan ke Elemen */
.spinner {
  animation: putarPenuh 1s linear infinite;
}
\`\`\`

---

## 2. Properti Kontrol Animasi

- **\`animation-name\`**: Nama dari aturan \`@keyframes\` yang dituju.
- **\`animation-duration\`**: Waktu yang dibutuhkan untuk menyelesaikan satu siklus animasi (misal: \`2s\`).
- **\`animation-timing-function\`**: Karakter akselerasi (\`ease\`, \`linear\`, \`ease-in-out\`).
- **\`animation-iteration-count\`**: Jumlah pengulangan (angka spesifik seperti \`3\` atau \`infinite\` untuk berputar terus).
- **\`animation-direction\`**: Arah alur (\`normal\`, \`reverse\`, \`alternate\` untuk bolak-balik).
- **\`animation-fill-mode\`**: Menentukan gaya elemen sebelum mulai atau setelah selesai:
  - \`forwards\`: Mempertahankan gaya frame 100% setelah animasi berakhir.

---

## 3. Shorthand Animasi

\`\`\`css
/* animation: name duration timing-function delay iteration-count direction fill-mode; */
.notifikasi {
  animation: meluncurMasuk 0.4s ease-out 0.2s 1 normal forwards;
}
\`\`\``,
    contentEn: `## 1. Anatomy of @keyframes

Unlike transitions requiring user event triggers (like \`:hover\`), CSS animations can auto-play continuously through multi-stage timelines:

\`\`\`css
/* 1. Keyframe Timeline Definition */
@keyframes fullSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 2. Binding to Target Element */
.spinner {
  animation: fullSpin 1s linear infinite;
}
\`\`\`

---

## 2. Animation Control Properties

- **\`animation-name\`**: References the \`@keyframes\` rule.
- **\`animation-duration\`**: Completion duration for a single cycle (e.g. \`2s\`).
- **\`animation-timing-function\`**: Velocity profile (\`ease\`, \`linear\`, \`ease-in-out\`).
- **\`animation-iteration-count\`**: Frequency counter (finite integer or \`infinite\`).
- **\`animation-direction\`**: Traversal direction (\`normal\`, \`reverse\`, \`alternate\`).
- **\`animation-fill-mode\`**: Governs styling posture before and after execution:
  - \`forwards\`: Persists 100% end-frame styles after termination.

---

## 3. Shorthand Syntax

\`\`\`css
/* animation: name duration timing-function delay iteration-count direction fill-mode; */
.toast-alert {
  animation: slideIn 0.4s ease-out 0.2s 1 normal forwards;
}
\`\`\``,
    programTitleId: 'Pustaka Animasi UI: Spinner Berputar, Denyut Sinyal, dan Notifikasi Masuk',
    programTitleEn: 'Production UI Animations: Circular Spinner, Signal Pulse, and Slide-In Toast',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Animasi Keyframes</title>
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
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      min-height: 100vh;
    }

    .demo-box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      width: 100%;
      max-width: 440px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* ── 1. ANIMASI SPINNER BERPUTAR ── */
    @keyframes spinCircle {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #E2E8F0;
      border-top-color: #2E5B44;
      border-radius: 50%;
      animation: spinCircle 0.8s linear infinite;
    }

    /* ── 2. ANIMASI DENYUT SINYAL (PULSE) ── */
    @keyframes pulseLive {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 91, 68, 0.7);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(46, 91, 68, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 91, 68, 0);
      }
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #2E5B44;
    }

    .pulse-dot {
      width: 12px;
      height: 12px;
      background-color: #2E5B44;
      border-radius: 50%;
      animation: pulseLive 1.8s infinite;
    }

    /* ── 3. ANIMASI MELUNCUR MASUK (SLIDE-IN) ── */
    @keyframes slideInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .toast-notification {
      background-color: #2E5B44;
      color: #FFFFFF;
      border-radius: 8px;
      padding: 14px 20px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 15px -3px rgba(46, 91, 68, 0.2);
      animation: slideInUp 0.5s ease-out forwards;
    }
  </style>
</head>
<body>

  <!-- Demo 1: Spinner -->
  <div class="demo-box">
    <div>
      <h4 style="margin-bottom: 4px;">Indikator Loading</h4>
      <p style="font-size: 13px; color: #718096;">Putaran linear berulang terus-menerus</p>
    </div>
    <div class="loading-spinner"></div>
  </div>

  <!-- Demo 2: Pulse Signal -->
  <div class="demo-box">
    <div>
      <h4 style="margin-bottom: 4px;">Status Koneksi Sistem</h4>
      <p style="font-size: 13px; color: #718096;">Efek denyut box-shadow dinamis</p>
    </div>
    <div class="status-badge">
      <span class="pulse-dot"></span>
      Online
    </div>
  </div>

  <!-- Demo 3: Slide-in Notification -->
  <div class="toast-notification">
    ✓ Data sinkronisasi berhasil disimpan ke server.
  </div>

</body>
</html>`,
    breakdownId: [
      '`@keyframes spinCircle`: Memutar elemen 360 derajat secara konstan menggunakan `transform: rotate(360deg)`.',
      '`.loading-spinner`: Memanfaatkan border lingkaran dengan satu sisi berwarna hijau `#2E5B44` yang diputar oleh animasi `infinite`.',
      '`@keyframes pulseLive`: Mengombinasikan `scale` dan penyebaran `box-shadow` dengan transparansi alpha untuk mensimulasikan gelombang denyut sinyal.',
      '`@keyframes slideInUp`: Menganimasikan opacity dari 0 ke 1 dan pergeseran `translateY(20px)` ke posisi netral `0`.',
      '`animation-fill-mode: forwards`: Memastikan notifikasi tetap tampil di posisi akhirnya setelah durasi 0.5 detik selesai tanpa kembali hilang.'
    ],
    breakdownEn: [
      '`@keyframes spinCircle`: Rotates the circular element 360 degrees steadily using GPU-accelerated rotation.',
      '`.loading-spinner`: Employs a circular 3-sided border with a distinct forest green leading edge.',
      '`@keyframes pulseLive`: Orchestrates micro-scaling with radiating alpha box-shadow rings emulating live telemetry.',
      '`@keyframes slideInUp`: Coordinates opacity fade with upward vertical translation from 20px.',
      '`animation-fill-mode: forwards`: Freezes final pose at 100% completion preventing sudden disappearance.'
    ],
    pitfallsId: [
      'Lupa menentukan animation-duration: Jika durasi tidak diatur (default 0s), animasi tidak akan pernah terlihat berjalan.',
      'Lupa animation-fill-mode: forwards: Tanpa forwards, elemen yang masuk akan melompat kembali ke kondisi sebelum animasi saat selesai.',
      'Terlalu banyak animasi bersamaan: Terlalu banyak elemen bergerak di satu halaman membingungkan fokus pengguna dan membebani baterai perangkat.',
      'Mengabaikan preferensi pengguna (prefers-reduced-motion): Pengguna dengan gangguan vestibular membutuhkan opsi mematikan animasi gerak berlebih.'
    ],
    pitfallsEn: [
      'Omitting animation-duration: With default 0s duration, animations never render.',
      'Missing animation-fill-mode: forwards: Completed animations abruptly revert to pre-animation frame 0 states.',
      'Animation fatigue: Excessive concurrent motion confuses users and drains mobile batteries.',
      'Ignoring prefers-reduced-motion: Users sensitive to motion sickness require media queries to damp visual translations.'
    ]
  },

  // ── MINGGU 13: Pseudo-Elemen dan Fitur Modern ────────────────────────────────
  {
    week: 13,
    topicId: 'pseudo-elemen-dan-fitur-modern',
    levelId: 'advanced',
    levelNameId: 'Sistem CSS, Animasi & Proyek Akhir',
    levelNameEn: 'CSS Systems, Animation & Final Project',
    category: 'CSS3',
    titleId: 'Pseudo-Elemen dan Fitur Modern',
    titleEn: 'Pseudo-Elements and Modern Features',
    objectivesId: [
      'Menguasai pseudo-elemen dekoratif ::before dan ::after serta properti wajib content',
      'Menerapkan seleksi teks kustom dengan ::selection dan placeholder form dengan ::placeholder',
      'Menggunakan native CSS Nesting (&) untuk hierarki aturan yang ringkas dan teratur',
      'Menerapkan aspect-ratio untuk mencegah Cumulative Layout Shift (CLS) pada media',
      'Mengontrol perilaku pemotongan gambar dengan object-fit: cover dan object-position'
    ],
    objectivesEn: [
      'Master decorative pseudo-elements ::before and ::after with mandatory content properties',
      'Customize user text selection via ::selection and form placeholders with ::placeholder',
      'Deploy native CSS Nesting (&) for structured hierarchical stylesheets',
      'Prevent Cumulative Layout Shift (CLS) on responsive media using aspect-ratio',
      'Direct image scaling and clipping with object-fit: cover and object-position'
    ],
    contentId: `## 1. Pseudo-Elemen ::before dan ::after

Pseudo-elemen menyisipkan elemen virtual ke dalam dokumen tanpa menambah tag HTML baru di file markup:

\`\`\`css
.kutipan::before {
  content: "“";              /* Properti WAJIB, meski nilainya string kosong "" */
  font-size: 32px;
  color: #2E5B44;
  vertical-align: -8px;
}
\`\`\`

- **\`::before\`**: Menyisipkan elemen anak pertama di dalam elemen target.
- **\`::after\`**: Menyisipkan elemen anak terakhir di dalam elemen target.
- Sangat ideal untuk dekorasi garis bawah tombol, ikon visual, atau latar belakang tambahan.

---

## 2. Fitur Modern: Native CSS Nesting (\`&\`)

CSS modern sekarang mendukung sarang aturan (*nesting*) secara native tanpa memerlukan preprocessor seperti SASS:

\`\`\`css
.card {
  background: white;
  padding: 20px;

  /* Menargetkan h3 yang berada di dalam .card */
  h3 {
    color: #2E5B44;
  }

  /* Menggunakan ampersand (&) untuk pseudo-class atau modifier */
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  & .badge {
    background: #E2F2E9;
  }
}
\`\`\`

---

## 3. Menjaga Proporsi Media: \`aspect-ratio\` & \`object-fit\`

Untuk mencegah halaman melompat (*Cumulative Layout Shift*) saat gambar sedang dimuat, gunakan \`aspect-ratio\`:

\`\`\`css
.foto-produk {
  width: 100%;
  aspect-ratio: 16 / 9; /* Mengunci rasio lebar berbanding tinggi 16:9 */
  object-fit: cover;    /* Gambar mengisi kotak tanpa mengalami distorsi gepeng */
  object-position: center;
}
\`\`\``,
    contentEn: `## 1. Pseudo-Elements ::before and ::after

Pseudo-elements insert synthetic virtual DOM nodes without cluttering HTML markup:

\`\`\`css
.quote::before {
  content: "“";              /* MANDATORY property, even if empty string "" */
  font-size: 32px;
  color: #2E5B44;
  vertical-align: -8px;
}
\`\`\`

- **\`::before\`**: Injects the very first child node inside the matched container.
- **\`::after\`**: Injects the final terminating child node.
- Ideal for decorative underline accents, notification counters, and icon ornaments.

---

## 2. Modern Standard: Native CSS Nesting (\`&\`)

Modern browsers execute CSS nesting natively without compile steps:

\`\`\`css
.card {
  background: white;
  padding: 20px;

  h3 {
    color: #2E5B44;
  }

  /* Ampersand (&) represents parent selector */
  &:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  & .badge {
    background: #E2F2E9;
  }
}
\`\`\`

---

## 3. Media Ratios: \`aspect-ratio\` & \`object-fit\`

Prevent Cumulative Layout Shift (CLS) layout jumps while images load:

\`\`\`css
.product-image {
  width: 100%;
  aspect-ratio: 16 / 9; /* Locks exact 16:9 geometric bounds */
  object-fit: cover;    /* Crops image naturally without anamorphic stretch */
  object-position: center;
}
\`\`\``,
    programTitleId: 'Komponen Media Card Modern dengan Pseudo-Elemen dan Native Nesting',
    programTitleEn: 'Media Card Component with Pseudo-Elements and Native Nesting',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Pseudo-Elemen dan Fitur Modern</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 1. Seleksi Teks Kustom */
    ::selection {
      background-color: #2E5B44;
      color: #FFFFFF;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    /* 2. Komponen Kartu dengan Native Nesting */
    .media-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      overflow: hidden;
      max-width: 380px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);

      /* Gambar Responsif dengan aspect-ratio & object-fit */
      .card-media {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
        background-color: #E2E8F0;
      }

      .card-body {
        padding: 24px;
        position: relative;
      }

      /* Pseudo-Elemen ::before untuk Aksen Garis Atas */
      .card-body::before {
        content: "";
        position: absolute;
        top: 0;
        left: 24px;
        width: 48px;
        height: 3px;
        background-color: #2E5B44;
        border-radius: 2px;
      }

      h3 {
        font-size: 18px;
        color: #1A202C;
        margin-top: 6px;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        color: #4A5568;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      /* Tombol Link dengan Pseudo-Elemen ::after untuk Panah */
      .read-more {
        display: inline-flex;
        align-items: center;
        color: #2E5B44;
        font-weight: 700;
        font-size: 13px;
        text-decoration: none;
        transition: gap 0.2s ease;
        gap: 4px;

        &::after {
          content: "→";
          transition: transform 0.2s ease;
        }

        &:hover::after {
          transform: translateX(4px);
        }
      }
    }
  </style>
</head>
<body>

  <article class="media-card">
    <img 
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80" 
      alt="Meja Kerja Pemrogram" 
      class="card-media"
    >
    <div class="card-body">
      <h3>Standar Media Responsif</h3>
      <p>Blok teks ini dilengkapi aksen garis atas melalui ::before dan panah interaktif melalui ::after tanpa merusak semantik HTML.</p>
      <a href="#" class="read-more">Baca Ulasan Selengkapnya</a>
    </div>
  </article>

</body>
</html>`,
    breakdownId: [
      '`::selection`: Mengkustomisasi warna highlight seleksi teks menjadi hijau botol `#2E5B44` dengan teks putih saat pengguna menyorot tulisan.',
      '`aspect-ratio: 16 / 9`: Mengunci proporsi dimensi gambar sehingga kontainer sudah memiliki tinggi pasti sebelum file gambar selesai diunduh.',
      '`object-fit: cover`: Memastikan gambar memenuhi bingkai kartu tanpa terdistorsi atau gepeng.',
      '`.card-body::before`: Menyisipkan aksen garis hijau dekoratif di atas judul murni lewat CSS tanpa tag <div> tambahan di HTML.',
      '`Native Nesting (&)`: Mengelompokkan aturan `.card-media`, `h3`, `p`, dan `.read-more` langsung di dalam blok `.media-card`.'
    ],
    breakdownEn: [
      '`::selection`: Replaces standard blue text selection highlighting with forest green #2E5B44 and white typography.',
      '`aspect-ratio: 16 / 9`: Preserves rigid 16:9 bounds eliminating Cumulative Layout Shift while external images download.',
      '`object-fit: cover`: Prevents aspect distortion by cropping media symmetrically across dimensions.',
      '`.card-body::before`: Crafts a clean decorative accent bar using synthetic virtual nodes without markup clutter.',
      '`Native Nesting (&)`: Synthesizes nested hierarchical declarations directly in browser standard engines.'
    ],
    pitfallsId: [
      'Lupa properti content pada ::before/::after: Jika properti content: "" tertinggal, pseudo-elemen tidak akan dirender oleh browser sama sekali.',
      'Lupa display pada ::before/::after: Pseudo-elemen berstatus inline secara default; jika ingin mengatur width dan height wajib diberi display: block/inline-block atau position: absolute.',
      'Mengabaikan dukungan nesting pada browser lama: Nesting native didukung penuh di semua browser evergreen terbaru (2023+), namun browser lawas memerlukan preprocessor.',
      'Menggunakan aspect-ratio tanpa width: 100%: aspect-ratio bekerja paling optimal saat salah satu dimensi (lebar atau tinggi) telah didefinisikan secara tegas.'
    ],
    pitfallsEn: [
      'Omitting the content property on ::before/::after: Synthetic pseudo-elements fail to instantiate without a content string.',
      'Neglecting inline display on pseudo-elements: Pseudo-nodes render inline by default; explicit block or absolute positioning is required for sizing.',
      'Legacy browser nesting limits: Modern nesting is ubiquitous across modern evergreen engines, but older legacy engines require bundler transpilers.',
      'Unanchored aspect-ratio: aspect-ratio requires at least one defined primary dimension (e.g. width: 100%) to calculate proportion.'
    ]
  },

  // ── MINGGU 14: Proyek Akhir: Website Lengkap Responsif ─────────────────────────
  {
    week: 14,
    topicId: 'proyek-akhir-website-responsif',
    levelId: 'advanced',
    levelNameId: 'Sistem CSS, Animasi & Proyek Akhir',
    levelNameEn: 'CSS Systems, Animation & Final Project',
    category: 'CSS3',
    titleId: 'Proyek Akhir: Website Lengkap Responsif',
    titleEn: 'Final Project: Complete Responsive Website',
    objectivesId: [
      'Menyusun arsitektur CSS multi-layer dari awal: Reset, Variabel Tema, Tipografi, dan Komponen',
      'Mengintegrasikan sistem tata letak Flexbox dan CSS Grid secara harmonis dalam 1 proyek utuh',
      'Menerapkan sistem tema Terang/Gelap (Light/Dark mode) yang berpindah secara instan',
      'Membangun komponen lengkap: navbar sticky, hero banner, grid layanan, kartu harga, dan formulir kontak',
      'Menyelesaikan proyek web portofolio/studio yang 100% responsif dan siap dideploy tanpa framework eksternal'
    ],
    objectivesEn: [
      'Structure a production multi-layer CSS architecture: Reset, Design Tokens, Typography, Components',
      'Harmonize Flexbox 1D and CSS Grid 2D across a complete unified project',
      'Implement reactive Light and Dark theme switching using CSS Custom Properties',
      'Build end-to-end components: sticky navbar, hero banner, services matrix, pricing cards, contact form',
      'Deploy a 100% responsive, production-ready studio website built purely with CSS3 without external dependencies'
    ],
    contentId: `## 1. Arsitektur Proyek Akhir CSS3

Dalam minggu penutup ini, seluruh kompetensi yang dipelajari selama 14 minggu disatukan untuk membangun website portal studio lengkap dari nol:

\`\`\`text
final-css-project/
├── index.html           # Struktur semantik lengkap (Header, Hero, Services, Pricing, Form, Footer)
└── css/
    ├── reset.css        # Box-sizing & reset bawaan browser
    ├── variables.css    # Token warna, spasi, dan sistem dark mode
    ├── layout.css       # Flexbox header & CSS Grid matrix
    └── components.css   # Kartu, tombol, badge, dan transisi halus
\`\`\`

---

## 2. Integrasi Seluruh Modul (Minggu 1-13)

Proyek akhir ini menyatukan:
1. **Pondasi Box Model & Tipografi (Minggu 1-5):** Reset rapi, \`border-box\`, skala teks \`rem\`, dan bayangan bertingkat.
2. **Tata Letak & Responsif (Minggu 6-9):** Navbar \`sticky\`, tombol \`fixed\`, kartu \`Flexbox\`, grid 2D \`repeat(auto-fit, minmax(...))\`, dan media query mobile-first.
3. **Sistem Lanjutan & Interaktivitas (Minggu 10-13):** Variabel CSS \`:root\`, toggle tema, transisi taktil 60fps, dan pseudo-elemen dekoratif.

---

## 3. Langkah Pengujian & Produksi
- Uji tampilan di resolusi ponsel (375px), tablet (768px), dan monitor lebar (1280px).
- Pastikan tidak ada scrollbar horizontal yang tidak disengaja.
- Periksa kontras warna di mode terang maupun mode gelap.`,
    contentEn: `## 1. Final CSS3 Capstone Architecture

In this concluding capstone week, all proficiencies mastered across 14 weeks synthesize into a complete, standalone responsive studio website:

\`\`\`text
final-css-project/
├── index.html           # Semantic architecture (Header, Hero, Services, Pricing, Form, Footer)
└── css/
    ├── reset.css        # Box-sizing reset
    ├── variables.css    # Color tokens and dark mode logic
    ├── layout.css       # Flexbox headers & Grid matrices
    └── components.css   # Cards, buttons, badges, tactile transitions
\`\`\`

---

## 2. End-to-End Module Synthesis (Weeks 1-13)

This capstone unites:
1. **Foundations (Weeks 1-5):** Clean reset, \`border-box\`, modular \`rem\` typography, and layered shadows.
2. **Layout & Media (Weeks 6-9):** \`sticky\` navigation, \`Flexbox\` nav rows, responsive 2D \`auto-fit\` Grid, and mobile-first media queries.
3. **Advanced Architecture (Weeks 10-13):** Dynamic \`:root\` design tokens, dark mode switching, 60fps tactile micro-interactions, and decorative pseudo-nodes.

---

## 3. Production Verification
- Test viewport behavior on mobile (375px), tablet (768px), and wide monitors (1280px).
- Verify zero unintentional horizontal overflow scrolling.
- Audit accessible contrast ratios across both light and dark themes.`,
    programTitleId: 'Portal Studio Lengkap Responsif dengan Dark Mode dan Grid',
    programTitleEn: 'Complete Responsive Studio Portal with Dark Mode and Grid',
    programCode: `<!DOCTYPE html>
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
</html>`,
    breakdownId: [
      'Token `:root` & `[data-theme="dark"]`: Menyatukan seluruh warna antarmuka dalam variabel terpusat yang bisa dialihkan seketika dengan transisi lembut.',
      '`.site-nav { position: sticky; top: 0; }`: Mengunci navigasi di bagian atas layar selama pengguna menelusuri halaman.',
      '`clamp(2rem, 5vw, 3rem)`: Tipografi lentur pada judul hero yang otomatis menyesuaikan ukuran layar tanpa media query tambahan.',
      '`.services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }`: Menyusun deretan kartu layanan dalam 1, 2, atau 3 kolom sesuai ruang yang tersedia secara mulus.',
      '`.service-card:hover`: Memberikan transisi pengangkatan taktil `translateY(-4px)` dengan bayangan lembut saat pengguna berinteraksi.'
    ],
    breakdownEn: [
      '`:root` and `[data-theme="dark"]`: Central token registry supporting instantaneous, smooth light/dark theme transitions.',
      '`.site-nav { position: sticky; top: 0; }`: Pinned persistent navigation header following user scroll path.',
      '`clamp(2rem, 5vw, 3rem)`: Fluid hero typography automatically scaling proportionally across viewport boundaries.',
      '`.services-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }`: Auto-responsive matrix seamlessly rearranging cards without media query breakpoints.',
      '`.service-card:hover`: Tactile micro-interaction lifting card 4px with ambient shadow falloff.'
    ],
    pitfallsId: [
      'Mencampuradukkan unit px kaku dengan unit fleksibel: Menggunakan width: 1000px pada kontainer tanpa max-width: 100% akan menyebabkan overflow horizontal di layar ponsel.',
      'Lupa menentukan transisi pada background-color: Mengubah tema gelap tanpa transisi membuat peralihan warna terasa silau dan mengejutkan mata.',
      'Lupa mengunci box-sizing: border-box: Menyebabkan elemen bertambah besar saat diberi padding atau border.',
      'Mengabaikan z-index pada navbar sticky: Konten lain yang memiliki posisi relative atau transform bisa menimpa navbar saat digulir.'
    ],
    pitfallsEn: [
      'Rigid fixed width on wrappers: Using width: 1000px instead of max-width: 1000px forces horizontal scroll overflow on mobile viewports.',
      'Abrupt theme snaps: Toggling dark mode without color transitions flashes harsh contrast transitions to user eyes.',
      'Omitting box-sizing: border-box: Causes components to bloat unexpectedly when borders and paddings are applied.',
      'Neglecting z-index on sticky bars: Positioned sibling items or transformed cards will render on top of the navigation bar during scroll.'
    ]
  }
];
