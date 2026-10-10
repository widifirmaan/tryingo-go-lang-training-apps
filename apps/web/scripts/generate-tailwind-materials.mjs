import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// TAILWIND CSS CURRICULUM — Step-by-Step Developer Journey (Zero Gimmicks)
// ─────────────────────────────────────────────────────────────────────────────
// 3 levels, 9 weeks total:
//   Beginner (3w): Utility-first philosophy, spacing & box model, colors & borders
//   Intermediate (3w): Flexbox, CSS Grid, responsive design & dark mode
//   Advanced (3w): State modifiers & transitions, component composition, final dashboard
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('tailwind', 'Tailwind CSS');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Dasar Utility-First & Tipografi',
    nameEn: 'Utility-First Basics & Typography',
    descId: 'Filosofi utility-first, sistem skala spasi, tipografi, warna, dan border.',
    descEn: 'Utility-first philosophy, spacing scales, typography, colors, and borders.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Tata Letak & Responsivitas',
    nameEn: 'Layout & Responsiveness',
    descId: 'Flexbox, CSS Grid, breakpoint responsif mobile-first, dan dark mode.',
    descEn: 'Flexbox, CSS Grid, mobile-first responsive breakpoints, and dark mode.',
  },
  {
    levelId: 'advanced',
    nameId: 'Komponen & Proyek Antarmuka',
    nameEn: 'Components & Interface Project',
    descId: 'State modifiers, transisi animasi, pola komponen UI, dan proyek dashboard.',
    descEn: 'State modifiers, animated transitions, UI component patterns, and dashboard project.',
  },
];

const MODULES = [
  // ── MINGGU 1: Filosofi Utility-First & Tipografi ───────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'filosofi-utility-first-dan-tipografi',
    titleId: 'Filosofi Utility-First, Setup & Tipografi', titleEn: 'Utility-First Philosophy, Setup & Typography',
    programId: 'Pengenalan Utility-First & Tipografi', programEn: 'Utility-First & Typography Introduction',
    levelNameId: 'Dasar Utility-First & Tipografi', levelNameEn: 'Utility-First Basics & Typography',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-6 text-slate-800 font-sans">
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow border border-slate-200">
    <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full mb-3">
      Minggu 1: Fondasi
    </span>
    <h1 class="text-2xl font-bold text-slate-900 tracking-tight mb-2">
      Pengenalan Tailwind CSS
    </h1>
    <p class="text-slate-600 text-sm leading-relaxed mb-4">
      Tailwind CSS adalah utility-first CSS framework yang menyediakan ribuan class kecil untuk menyusun tampilan langsung pada markup HTML.
    </p>
    <div class="flex gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
      <span>Font: text-sm</span>
      <span>•</span>
      <span>Weight: font-bold</span>
      <span>•</span>
      <span>Leading: leading-relaxed</span>
    </div>
  </div>
</body>
</html>`,
    objectivesId: [
      'Memahami konsep utility-first vs class berbasis komponen (BEM)',
      'Menghubungkan Tailwind via CDN untuk prototipe cepat',
      'Menguasai utilitas tipografi: ukuran (text-sm, text-lg, text-2xl), ketebalan (font-medium, font-bold)',
      'Mengatur jarak antar baris teks (leading-relaxed) dan warna teks (text-slate-700)',
      'Menyusun dokumen HTML sederhana dengan styling langsung pada class atribut'
    ],
    objectivesEn: [
      'Understand utility-first concept vs component-based classes (BEM)',
      'Connect Tailwind via CDN for rapid prototyping',
      'Master typography utilities: size (text-sm, text-lg, text-2xl), weight (font-medium, font-bold)',
      'Control line heights (leading-relaxed) and font colors (text-slate-700)',
      'Structure HTML documents with styling applied directly to class attributes'
    ],
    explanationId: `### Filosofi Utility-First
Berbeda dari CSS tradisional yang membuat class bernama khusus seperti \`.card\` atau \`.btn\`, Tailwind menyediakan ribuan class utilitas tunggal seperti \`text-center\`, \`p-4\`, dan \`rounded\`. Pendekatan ini menghilangkan kebutuhan menulis file CSS kustom untuk setiap elemen baru.

### Skala Tipografi
- Ukuran: \`text-xs\` (12px), \`text-sm\` (14px), \`text-base\` (16px), \`text-lg\` (18px), \`text-xl\` (20px), \`text-2xl\` (24px)
- Ketebalan: \`font-normal\` (400), \`font-medium\` (500), \`font-semibold\` (600), \`font-bold\` (700)
- Spasi Baris: \`leading-tight\`, \`leading-normal\`, \`leading-relaxed\`, \`leading-loose\``,
    explanationEn: `### Utility-First Philosophy
Unlike traditional CSS where custom class names like \`.card\` or \`.btn\` are authored in external sheets, Tailwind provides single-purpose utility classes like \`text-center\`, \`p-4\`, and \`rounded\`. This removes the need for naming abstract classes and speeds up interface design.

### Typography Scales
- Sizing: \`text-xs\`, \`text-sm\`, \`text-base\`, \`text-lg\`, \`text-xl\`, \`text-2xl\`
- Weight: \`font-normal\`, \`font-medium\`, \`font-semibold\`, \`font-bold\`
- Line Height: \`leading-tight\`, \`leading-normal\`, \`leading-relaxed\`, \`leading-loose\``,
    experimentsId: [
      'Ubah ukuran heading dari text-2xl menjadi text-4xl dan perhatikan perubahannya',
      'Ganti warna teks dari text-slate-900 ke text-indigo-700',
      'Ubah font-bold menjadi font-light atau font-extrabold',
      'Coba tambahkan class tracking-wide untuk menambah jarak antar huruf'
    ],
    experimentsEn: [
      'Change heading size from text-2xl to text-4xl and observe size shift',
      'Change font color from text-slate-900 to text-indigo-700',
      'Switch font-bold to font-light or font-extrabold',
      'Add tracking-wide to increase letter spacing'
    ],
    challengeId: 'Buat kartu pengumuman dengan judul tebal, tanggal publikasi kecil berwarna abu-abu, dan paragraf isi dengan jarak baris renggang.',
    challengeEn: 'Build an announcement card with bold title, small grey publication date, and relaxed paragraph text.',
    summaryId: 'Minggu 1 dari 9: **Filosofi Utility-First, Setup & Tipografi**. Anda telah memahami konsep dasar utility-first dan styling teks. Minggu depan: **Sistem Spasi, Ukuran, dan Box Model**.',
    summaryEn: 'Week 1 of 9: **Utility-First Philosophy, Setup & Typography**. You have learned basic utility-first principles and text styling. Next week: **Spacing Scales, Sizing, and Box Model**.'
  },

  // ── MINGGU 2: Sistem Spasi, Ukuran, dan Box Model ──────────────────────────
  {
    week: 2, level: 'beginer', topicId: 'sistem-spasi-dan-box-model',
    titleId: 'Sistem Spasi, Ukuran, dan Box Model', titleEn: 'Spacing Scales, Sizing, and Box Model',
    programId: 'Penerapan Padding, Margin, Width, dan Height', programEn: 'Applying Padding, Margin, Width, and Height',
    levelNameId: 'Dasar Utility-First & Tipografi', levelNameEn: 'Utility-First Basics & Typography',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8">
  <div class="max-w-lg mx-auto bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold text-slate-800 mb-4">Demonstrasi Box Model</h2>
    
    <!-- Outer Container (Margin & Padding) -->
    <div class="bg-amber-50 border-2 border-dashed border-amber-300 p-4 mb-4">
      <p class="text-xs font-mono text-amber-700 mb-2">Padding: p-4 (1rem / 16px)</p>
      
      <!-- Inner Element (Width & Height) -->
      <div class="w-full h-16 bg-amber-500 rounded flex items-center justify-center text-white font-medium text-sm">
        Width: w-full | Height: h-16
      </div>
    </div>

    <!-- Sizing Comparison -->
    <div class="grid grid-cols-3 gap-2 text-center text-xs">
      <div class="w-20 h-12 bg-slate-200 rounded flex items-center justify-center mx-auto">w-20</div>
      <div class="w-28 h-12 bg-slate-300 rounded flex items-center justify-center mx-auto">w-28</div>
      <div class="w-36 h-12 bg-slate-400 text-white rounded flex items-center justify-center mx-auto">w-36</div>
    </div>
  </div>
</body>
</html>`,
    objectivesId: [
      'Memahami sistem skala angka 4 pada Tailwind (1 unit = 0.25rem = 4px)',
      'Menguasai utilitas padding (p, px, py, pt, pb, pl, pr)',
      'Menguasai utilitas margin (m, mx, my, mt, mb, ml, mr)',
      'Mengatur lebar (w-full, w-1/2, max-w-md) dan tinggi (h-12, h-screen)',
      'Menerapkan mx-auto untuk menengahkan kontainer blok secara horizontal'
    ],
    objectivesEn: [
      'Understand Tailwind scale system (1 unit = 0.25rem = 4px)',
      'Master padding utilities (p, px, py, pt, pb, pl, pr)',
      'Master margin utilities (m, mx, my, mt, mb, ml, mr)',
      'Configure widths (w-full, w-1/2, max-w-md) and heights (h-12, h-screen)',
      'Use mx-auto for horizontal centering of block containers'
    ],
    explanationId: `### Skala Spasi Tailwind
Setiap angka pada utilitas Tailwind dikalikan 4px:
- \`p-1\` = 0.25rem (4px)
- \`p-2\` = 0.5rem (8px)
- \`p-4\` = 1rem (16px)
- \`p-6\` = 1.5rem (24px)
- \`p-8\` = 2rem (32px)

### Sumbu Spasi
- \`px-*\`: Horizontal (kiri dan kanan)
- \`py-*\`: Vertikal (atas dan bawah)
- \`pt-*\`, \`pb-*\`, \`pl-*\`, \`pr-*\`: Sisi individual`,
    explanationEn: `### Tailwind Spacing Scale
Each numeric step corresponds to 4px:
- \`p-1\` = 4px, \`p-2\` = 8px, \`p-4\` = 16px, \`p-6\` = 24px, \`p-8\` = 32px

### Directional Spacing
- \`px-*\`: Horizontal (left and right)
- \`py-*\`: Vertical (top and bottom)
- \`pt-*\`, \`pb-*\`, \`pl-*\`, \`pr-*\`: Individual sides`,
    experimentsId: [
      'Ganti padding p-6 menjadi p-10 dan amati ruang dalam kontainer',
      'Ganti lebar max-w-lg menjadi max-w-xs untuk melihat kontainer mengecil',
      'Coba hilangkan mx-auto untuk melihat posisi kontainer bergeser ke kiri',
      'Tambahkan space-y-4 pada parent untuk memberi jarak vertikal otomatis'
    ],
    experimentsEn: [
      'Change padding from p-6 to p-10 and inspect internal spacing',
      'Change max-w-lg to max-w-xs to see container shrink',
      'Remove mx-auto to see container snap to left',
      'Add space-y-4 to parent to enforce uniform vertical gaps'
    ],
    challengeId: 'Buat kotak profil pengguna dengan foto profil persegi berukuran w-24 h-24 di tengah kontainer dengan padding seragam.',
    challengeEn: 'Build a user profile card with a centered w-24 h-24 square avatar inside uniform padding.',
    summaryId: 'Minggu 2 dari 9: **Sistem Spasi, Ukuran, dan Box Model**. Anda telah memahami rumus skala spasi 4px. Minggu depan: **Warna, Latar Belakang, Border, dan Shadow**.',
    summaryEn: 'Week 2 of 9: **Spacing Scales, Sizing, and Box Model**. You learned the 4px scaling system. Next week: **Colors, Backgrounds, Borders, and Shadows**.'
  },

  // ── MINGGU 3: Warna, Background, Border, dan Shadow ────────────────────────
  {
    week: 3, level: 'beginer', topicId: 'warna-background-border-dan-shadow',
    titleId: 'Warna, Latar Belakang, Border, dan Shadow', titleEn: 'Colors, Backgrounds, Borders, and Shadows',
    programId: 'Kartu Produk dengan Visual Tokens', programEn: 'Product Card with Visual Tokens',
    levelNameId: 'Dasar Utility-First & Tipografi', levelNameEn: 'Utility-First Basics & Typography',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 flex justify-center">
  <div class="w-80 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
    <!-- Header Badge Visual -->
    <div class="bg-indigo-600 px-4 py-3 text-white flex justify-between items-center">
      <span class="text-xs uppercase tracking-wider font-semibold">Toko Elektronik</span>
      <span class="bg-indigo-700 text-xs px-2 py-0.5 rounded-full">Stok 12</span>
    </div>

    <!-- Body Info -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-slate-800 mb-1">Keyboard Mekanikal TKL</h3>
      <p class="text-xs text-slate-500 mb-4">Switch red, koneksi USB-C kabel braided.</p>
      
      <!-- Price & Button -->
      <div class="flex items-center justify-between pt-3 border-t border-slate-100">
        <div>
          <span class="text-xs text-slate-400 block">Harga</span>
          <span class="text-lg font-extrabold text-slate-900">Rp 450.000</span>
        </div>
        <button class="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm">
          Beli Sekarang
        </button>
      </div>
    </div>
  </div>
</body>
</html>`,
    objectivesId: [
      'Memahami palet warna Tailwind (50 hingga 950 untuk setiap rona warna)',
      'Mengatur warna latar belakang (bg-white, bg-indigo-600, bg-slate-100)',
      'Mengatur radius sudut (rounded, rounded-lg, rounded-xl, rounded-full)',
      'Menambahkan border ketebalan dan warna (border, border-2, border-slate-200)',
      'Menerapkan bayangan elevasi (shadow-sm, shadow, shadow-md, shadow-lg)'
    ],
    objectivesEn: [
      'Understand Tailwind color palette scales (50 to 950 for each hue)',
      'Configure background colors (bg-white, bg-indigo-600, bg-slate-100)',
      'Apply corner radius (rounded, rounded-lg, rounded-xl, rounded-full)',
      'Set border widths and colors (border, border-2, border-slate-200)',
      'Apply elevation shadows (shadow-sm, shadow, shadow-md, shadow-lg)'
    ],
    explanationId: `### Sistem Palet Warna
Tailwind menyertakan rona seperti \`slate\`, \`gray\`, \`red\`, \`amber\`, \`emerald\`, \`indigo\`, dll. Setiap rona memiliki tingkat kegelapan dari 50 (sangat terang) sampai 950 (sangat gelap).

### Border & Radius
- Ketebalan: \`border\` (1px), \`border-2\` (2px), \`border-4\` (4px)
- Radius: \`rounded-sm\` (2px), \`rounded\` (4px), \`rounded-lg\` (8px), \`rounded-full\` (lingkaran penuh)

### Box Shadow
- \`shadow-sm\`: elevasi subtle untuk tombol
- \`shadow-md\`: elevasi kartu standar
- \`shadow-lg\` / \`shadow-xl\`: modal popup atau dropdown`,
    explanationEn: `### Color Palette System
Tailwind color hues range from 50 (lightest) to 950 (deepest).

### Borders & Radius
- Width: \`border\` (1px), \`border-2\` (2px), \`border-4\` (4px)
- Radius: \`rounded-sm\`, \`rounded\`, \`rounded-lg\`, \`rounded-full\`

### Elevation Shadows
- \`shadow-sm\`: subtle elevation for inputs and buttons
- \`shadow-md\`: standard card elevation
- \`shadow-lg\` / \`shadow-xl\`: elevated modals and dialogs`,
    experimentsId: [
      'Ganti bg-indigo-600 menjadi bg-rose-600 pada banner atas',
      'Ubah shadow-md menjadi shadow-xl untuk efek mengambang lebih tinggi',
      'Ganti rounded-xl menjadi rounded-none untuk gaya sudut siku tajam',
      'Ubah warna tombol beli dari emerald-600 ke sky-500'
    ],
    experimentsEn: [
      'Change bg-indigo-600 to bg-rose-600 on top banner',
      'Switch shadow-md to shadow-xl for deeper floating appearance',
      'Change rounded-xl to rounded-none for sharp angular corners',
      'Switch button color from emerald-600 to sky-500'
    ],
    challengeId: 'Buat kartu kupon diskon dengan border putus-putus (border-dashed), background kuning lembut (bg-amber-50), dan tombol klaim berwarna oranye.',
    challengeEn: 'Build a coupon voucher card with dashed border (border-dashed), soft yellow background (bg-amber-50), and orange claim button.',
    summaryId: 'Minggu 3 dari 9: **Warna, Latar Belakang, Border, dan Shadow**. Anda menguasai token visual dasar. Minggu depan: **Tata Letak Flexbox dengan Tailwind**.',
    summaryEn: 'Week 3 of 9: **Colors, Backgrounds, Borders, and Shadows**. You mastered visual design tokens. Next week: **Flexbox Layout with Tailwind**.'
  },

  // ── MINGGU 4: Tata Letak Flexbox dengan Tailwind ───────────────────────────
  {
    week: 4, level: 'intermediate', topicId: 'flexbox-layout-utilities',
    titleId: 'Tata Letak Flexbox dengan Tailwind', titleEn: 'Flexbox Layout with Tailwind',
    programId: 'Navbar dan Susunan Elemen dengan Flexbox', programEn: 'Navbar and Element Layout with Flexbox',
    levelNameId: 'Tata Letak & Responsivitas', levelNameEn: 'Layout & Responsiveness',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-6">
  <!-- Navigasi Bar Flexbox -->
  <nav class="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between mb-6">
    <!-- Brand Logo -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
        T
      </div>
      <span class="font-bold text-slate-800 text-lg">Tryngo App</span>
    </div>

    <!-- Nav Links (Center / Right) -->
    <div class="flex items-center gap-6 text-sm text-slate-600 font-medium">
      <a href="#" class="text-indigo-600 font-semibold">Beranda</a>
      <a href="#">Kursus</a>
      <a href="#">Komunitas</a>
    </div>

    <!-- Action Button -->
    <button class="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg font-medium">
      Masuk
    </button>
  </nav>

  <!-- Baris Status dengan Gap -->
  <div class="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-around text-center">
    <div class="flex-1 border-r border-slate-100">
      <div class="text-2xl font-bold text-slate-800">28</div>
      <div class="text-xs text-slate-400">Total Modul</div>
    </div>
    <div class="flex-1 border-r border-slate-100">
      <div class="text-2xl font-bold text-indigo-600">100%</div>
      <div class="text-xs text-slate-400">Dukungan Web</div>
    </div>
    <div class="flex-1">
      <div class="text-2xl font-bold text-emerald-600">Aktif</div>
      <div class="text-xs text-slate-400">Status Server</div>
    </div>
  </div>
</body>
</html>`,
    objectivesId: [
      'Mengaktifkan display flex dengan class flex',
      'Mengatur arah tata letak: flex-row vs flex-col',
      'Mengatur perataan sumbu utama: justify-start, justify-center, justify-between, justify-around',
      'Mengatur perataan sumbu silang: items-center, items-start, items-end',
      'Menggunakan gap-* untuk jarak otomatis antar elemen anak tanpa margin manual'
    ],
    objectivesEn: [
      'Enable flexbox display with the flex class',
      'Control direction: flex-row vs flex-col',
      'Align along main axis: justify-start, justify-center, justify-between, justify-around',
      'Align along cross axis: items-center, items-start, items-end',
      'Use gap-* for clean gaps between child items without manual margin rules'
    ],
    explanationId: `### Utilitas Flexbox Tailwind
- Display: \`flex\`, \`inline-flex\`
- Arah: \`flex-row\` (default), \`flex-col\` (vertikal)
- Sumbu Utama (Justify): \`justify-between\` (meratakan ke tepi), \`justify-center\` (tengah)
- Sumbu Silang (Items): \`items-center\` (tengah secara vertikal)
- Jarak (Gap): \`gap-2\`, \`gap-4\`, \`gap-6\` menggantikan margin pada elemen anak`,
    explanationEn: `### Tailwind Flexbox Utilities
- Display: \`flex\`, \`inline-flex\`
- Direction: \`flex-row\`, \`flex-col\`
- Main Axis: \`justify-between\`, \`justify-center\`, \`justify-start\`
- Cross Axis: \`items-center\`, \`items-start\`, \`items-end\`
- Spacing: \`gap-2\`, \`gap-4\`, \`gap-6\``,
    experimentsId: [
      'Ganti justify-between pada nav menjadi justify-center dan lihat hasilnya',
      'Ubah items-center menjadi items-start',
      'Ganti flex-1 pada kotak metrik menjadi w-1/3',
      'Coba ubah flex-row pada navbar menjadi flex-col untuk simulasi menu mobile'
    ],
    experimentsEn: [
      'Change justify-between on nav to justify-center',
      'Switch items-center to items-start',
      'Change flex-1 on metric cards to w-1/3',
      'Switch flex-row to flex-col on nav for mobile menu simulation'
    ],
    challengeId: 'Buat kotak komentar yang memiliki avatar di kiri (flex), teks nama dan isi komentar di tengah (flex-1), serta tombol opsi di kanan.',
    challengeEn: 'Build a comment box with left avatar, middle name and text (flex-1), and right options button.',
    summaryId: 'Minggu 4 dari 9: **Tata Letak Flexbox dengan Tailwind**. Anda menguasai perataan sumbu horizontal dan vertikal. Minggu depan: **Tata Letak CSS Grid dengan Tailwind**.',
    summaryEn: 'Week 4 of 9: **Flexbox Layout with Tailwind**. You mastered horizontal and vertical alignment. Next week: **CSS Grid Layout with Tailwind**.'
  },

  // ── MINGGU 5: Tata Letak CSS Grid dengan Tailwind ──────────────────────────
  {
    week: 5, level: 'intermediate', topicId: 'css-grid-layout-utilities',
    titleId: 'Tata Letak CSS Grid dengan Tailwind', titleEn: 'CSS Grid Layout with Tailwind',
    programId: 'Katalog Grid Produk Multi-Kolom', programEn: 'Multi-Column Product Grid Catalog',
    levelNameId: 'Tata Letak & Responsivitas', levelNameEn: 'Layout & Responsiveness',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-bold text-slate-900 mb-6">Galeri Modul Kursus (CSS Grid)</h2>

    <!-- Grid 3 Kolom dengan Gap -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Item 1: Span 2 Kolom -->
      <div class="col-span-2 bg-indigo-600 text-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <span class="text-xs bg-indigo-700 px-2.5 py-1 rounded-full font-semibold">Spesial</span>
          <h3 class="text-2xl font-bold mt-3 mb-2">Jalur Fullstack Web</h3>
          <p class="text-indigo-100 text-sm">Pelajari kurikulum terpadu dari HTML5, CSS3, hingga backend database.</p>
        </div>
        <div class="text-xs text-indigo-200 mt-4 font-mono">col-span-2</div>
      </div>

      <!-- Item 2 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Dasar</span>
          <h4 class="font-bold text-slate-800 mt-2">HTML5 Semantik</h4>
          <p class="text-xs text-slate-500 mt-1">Struktur dokumen dan aksesibilitas.</p>
        </div>
        <div class="text-xs text-slate-400 mt-4 font-mono">grid item</div>
      </div>

      <!-- Item 3 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Gaya</span>
        <h4 class="font-bold text-slate-800 mt-2">CSS3 Layouts</h4>
        <p class="text-xs text-slate-500 mt-1">Flexbox dan Modern Grid.</p>
      </div>

      <!-- Item 4 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Logika</span>
        <h4 class="font-bold text-slate-800 mt-2">JavaScript Murni</h4>
        <p class="text-xs text-slate-500 mt-1">Algoritma dan DOM manipulation.</p>
      </div>

      <!-- Item 5 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Utilitas</span>
        <h4 class="font-bold text-slate-800 mt-2">Tailwind CSS</h4>
        <p class="text-xs text-slate-500 mt-1">Desain responsif cepat.</p>
      </div>
    </div>
  </div>
</body>
</html>`,
    objectivesId: [
      'Mengaktifkan CSS Grid dengan class grid',
      'Menentukan jumlah kolom dengan grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-12',
      'Mengatur jarak antar sel grid dengan gap-4, gap-6, gap-x-*, gap-y-*',
      'Menggabungkan kolom dengan col-span-2 atau col-span-full',
      'Memahami kapan harus memilih Flexbox (1 dimensi) vs CSS Grid (2 dimensi)'
    ],
    objectivesEn: [
      'Activate CSS Grid with the grid class',
      'Define columns with grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-12',
      'Configure cell spacing with gap-4, gap-6, gap-x-*, gap-y-*',
      'Span items across columns with col-span-2 or col-span-full',
      'Know when to choose Flexbox (1D) vs CSS Grid (2D)'
    ],
    explanationId: `### CSS Grid di Tailwind
- Definisi Kolom: \`grid-cols-2\`, \`grid-cols-3\`, \`grid-cols-4\`, dst.
- Penyatuan Sel: \`col-span-2\` (memanjang 2 kolom), \`col-span-full\` (sepanjang baris)
- Gap Antar Baris & Kolom: \`gap-6\` (kedua sumbu), \`gap-x-4\` (horizontal), \`gap-y-8\` (vertikal)`,
    explanationEn: `### CSS Grid in Tailwind
- Column Counts: \`grid-cols-2\`, \`grid-cols-3\`, \`grid-cols-4\`, etc.
- Column Spanning: \`col-span-2\`, \`col-span-full\`
- Gap Management: \`gap-6\` (both axes), \`gap-x-4\` (columns), \`gap-y-8\` (rows)`,
    experimentsId: [
      'Ubah grid-cols-3 menjadi grid-cols-4 dan amati penataan item',
      'Ganti col-span-2 pada kartu pertama menjadi col-span-1',
      'Ubah gap-6 menjadi gap-2 untuk melihat tampilan yang lebih rapat',
      'Coba tambahkan row-span-2 pada salah satu kartu'
    ],
    experimentsEn: [
      'Change grid-cols-3 to grid-cols-4 and observe redistribution',
      'Switch col-span-2 on first card to col-span-1',
      'Change gap-6 to gap-2 for compact layout',
      'Add row-span-2 to create vertical span'
    ],
    challengeId: 'Buat galeri foto dengan grid 4 kolom, di mana foto pertama memiliki ukuran besar dengan col-span-2 dan row-span-2.',
    challengeEn: 'Build a photo gallery with 4-column grid where the first photo spans 2 columns and 2 rows.',
    summaryId: 'Minggu 5 dari 9: **Tata Letak CSS Grid dengan Tailwind**. Anda telah menguasai pengaturan grid 2 dimensi. Minggu depan: **Desain Responsif & Arsitektur Dark Mode**.',
    summaryEn: 'Week 5 of 9: **CSS Grid Layout with Tailwind**. You mastered 2D grid setups. Next week: **Responsive Design & Dark Mode Architecture**.'
  },

  // ── MINGGU 6: Desain Responsif & Dark Mode ─────────────────────────────────
  {
    week: 6, level: 'intermediate', topicId: 'desain-responsif-dan-dark-mode',
    titleId: 'Desain Responsif & Arsitektur Dark Mode', titleEn: 'Responsive Design & Dark Mode Architecture',
    programId: 'Komponen Responsif Mobile-First dengan Dukungan Dark Mode', programEn: 'Mobile-First Responsive Component with Dark Mode',
    levelNameId: 'Tata Letak & Responsivitas', levelNameEn: 'Layout & Responsiveness',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
    }
  </script>
</head>
<body class="bg-slate-100 dark:bg-slate-900 p-6 min-h-screen transition-colors duration-200">
  <div class="max-w-2xl mx-auto">
    <!-- Toggle Button Simulator -->
    <div class="flex justify-end mb-4">
      <button onclick="document.documentElement.classList.toggle('dark')" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
        Beralih Mode (Terang / Gelap)
      </button>
    </div>

    <!-- Responsive Card (1 col on mobile, 2 cols on md+) -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">
      <!-- Image / Icon side -->
      <div class="w-full md:w-1/3 bg-indigo-600 dark:bg-indigo-700 p-6 flex flex-col justify-center items-center text-white text-center">
        <div class="text-3xl font-extrabold mb-1">PRO</div>
        <div class="text-xs uppercase tracking-wider text-indigo-200">Paket Langganan</div>
      </div>

      <!-- Content side -->
      <div class="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Akses Penuh Semua Modul
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            Layout ini otomatis berubah: 1 kolom tumpuk pada layar HP, dan 2 kolom horizontal berdampingan pada layar tablet/desktop (md:).
          </p>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">md:flex-row dark:bg-slate-800</span>
          <button class="bg-indigo-600 dark:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg font-medium">
            Mulai
          </button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`,
    objectivesId: [
      'Memahami filosofi mobile-first (gaya default tanpa prefix berlaku untuk HP)',
      'Menguasai breakpoint bawaan: sm (640px), md (768px), lg (1024px), xl (1280px)',
      'Menerapkan tata letak responsif: flex-col md:flex-row, grid-cols-1 md:grid-cols-3',
      'Mengonfigurasi dan menerapkan prefix dark: untuk warna teks, latar, dan border',
      'Menguji pergantian tema terang dan gelap secara dinamis'
    ],
    objectivesEn: [
      'Understand mobile-first design philosophy (unprefixed styles target mobile viewports)',
      'Master built-in breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)',
      'Apply responsive transformations: flex-col md:flex-row, grid-cols-1 md:grid-cols-3',
      'Apply dark: modifier for backgrounds, texts, and borders',
      'Test light and dark mode toggling dynamically'
    ],
    explanationId: `### Breakpoint Mobile-First
Di Tailwind, tidak ada prefix untuk mobile. Aturan dasar ditulis langsung, lalu prefix breakpoint menimpa aturan pada layar yang lebih lebar:
- \`sm:\` >= 640px (ponsel lanskap / tablet kecil)
- \`md:\` >= 768px (tablet portrait / laptop kecil)
- \`lg:\` >= 1024px (desktop)
- \`xl:\` >= 1280px (layar lebar)

### Dark Mode
Prefix \`dark:\` hanya aktif ketika mode gelap dinyalakan (baik melalui class \`dark\` pada elemen \`<html>\` atau preferensi sistem operasi).
Contoh: \`bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100\``,
    explanationEn: `### Mobile-First Breakpoints
Unprefixed classes apply to mobile devices. Breakpoint prefixes override them on wider screens:
- \`sm:\` >= 640px
- \`md:\` >= 768px
- \`lg:\` >= 1024px
- \`xl:\` >= 1280px

### Dark Mode
The \`dark:\` prefix activates when dark mode is enabled on the document root:
Example: \`bg-white dark:bg-slate-900 text-slate-900 dark:text-white\``,
    experimentsId: [
      'Ubah md:flex-row menjadi lg:flex-row dan amati perbedaannya',
      'Klik tombol "Beralih Mode" untuk melihat perubahan tema secara langsung',
      'Ubah dark:bg-slate-800 menjadi dark:bg-slate-950 untuk tema lebih gelap',
      'Tambahkan text-center md:text-left pada judul untuk melihat teks rata tengah di HP'
    ],
    experimentsEn: [
      'Switch md:flex-row to lg:flex-row',
      'Click toggle button to observe instant color theme transitions',
      'Change dark:bg-slate-800 to dark:bg-slate-950 for deeper contrast',
      'Add text-center md:text-left to title'
    ],
    challengeId: 'Buat navigasi yang menampilkan tombol hamburger di HP (block md:hidden) dan menampilkan link menu lengkap di desktop (hidden md:flex).',
    challengeEn: 'Build navigation displaying hamburger menu on mobile (block md:hidden) and horizontal menu links on desktop (hidden md:flex).',
    summaryId: 'Minggu 6 dari 9: **Desain Responsif & Arsitektur Dark Mode**. Anda menguasai breakpoint dan tema warna. Minggu depan: **State Modifiers, Pseudo-Classes & Transisi**.',
    summaryEn: 'Week 6 of 9: **Responsive Design & Dark Mode Architecture**. You mastered breakpoints and theme modes. Next week: **State Modifiers, Pseudo-Classes & Transitions**.'
  },

  // ── MINGGU 7: State Modifiers, Pseudo-Classes & Transisi ───────────────────
  {
    week: 7, level: 'advanced', topicId: 'pseudo-class-state-dan-transisi',
    titleId: 'State Modifiers, Pseudo-Classes & Transisi', titleEn: 'State Modifiers, Pseudo-Classes & Transitions',
    programId: 'Interaksi Tombol, Input Focus, dan Transisi Halus', programEn: 'Button Interactions, Input Focus, and Smooth Transitions',
    levelNameId: 'Komponen & Proyek Antarmuka', levelNameEn: 'Components & Interface Project',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 flex justify-center">
  <div class="w-96 bg-white p-6 rounded-xl shadow-md border border-slate-200">
    <h2 class="text-lg font-bold text-slate-800 mb-4">Interaksi & State Modifiers</h2>

    <!-- Form Input with Focus Ring -->
    <div class="mb-4">
      <label class="block text-xs font-semibold text-slate-700 mb-1">Email Pengguna</label>
      <input 
        type="email" 
        placeholder="nama@email.com"
        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 transition duration-150 ease-in-out focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>

    <!-- Buttons with Hover & Active State -->
    <div class="space-y-2 mb-6">
      <button class="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold py-2.5 rounded-lg transition duration-200 shadow-sm hover:shadow">
        Tombol Utama (Hover & Active)
      </button>

      <button class="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold py-2.5 rounded-lg transition duration-150">
        Tombol Sekunder (Subtle)
      </button>
    </div>

    <!-- Group-Hover Pattern -->
    <div class="group p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition duration-200 cursor-pointer flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition">
          Pola group-hover
        </div>
        <div class="text-[11px] text-slate-500">Sorot kartu ini untuk melihat efek</div>
      </div>
      <span class="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition duration-200">
        →
      </span>
    </div>
  </div>
</body>
</html>`,
    objectivesId: [
      'Menguasai pseudo-class state: hover:, focus:, active:, disabled:',
      'Mengonfigurasi focus ring untuk aksesibilitas form (focus:ring-2 focus:ring-indigo-200)',
      'Menggunakan utilitas transisi CSS: transition, duration-*, ease-*',
      'Menerapkan pola group dan group-hover untuk interaksi turunan',
      'Menerapkan transformasi mikro: hover:translate-x-1, hover:scale-105'
    ],
    objectivesEn: [
      'Master pseudo-class state modifiers: hover:, focus:, active:, disabled:',
      'Configure focus rings for accessible form styling (focus:ring-2)',
      'Use CSS transition utilities: transition, duration-*, ease-*',
      'Implement group and group-hover patterns for nested element transitions',
      'Apply subtle micro-transforms: hover:translate-x-1, hover:scale-105'
    ],
    explanationId: `### State Modifiers di Tailwind
- \`hover:\`: aktif saat kursor berada di atas elemen
- \`focus:\`: aktif saat elemen formulir menerima fokus input
- \`active:\`: aktif saat elemen sedang ditekan klik
- \`disabled:\`: aktif jika elemen form memiliki atribut disabled

### Transisi Halus
- \`transition\`: mengaktifkan transisi properti umum (warna, bayangan, transform)
- \`duration-150\`, \`duration-200\`, \`duration-300\`: waktu durasi transisi (ms)
- \`ease-in-out\`: kurva kecepatan transisi

### Pola Group Hover
Tambahkan class \`group\` pada kontainer induk, lalu gunakan \`group-hover:*\` pada elemen anak agar anak merespons saat kontainer induk disorot.`,
    explanationEn: `### Tailwind State Modifiers
- \`hover:\`: cursor hover trigger
- \`focus:\`: keyboard/input focus trigger
- \`active:\`: mouse press trigger
- \`disabled:\`: disabled state trigger

### Smooth Transitions
- \`transition\`: activates property animations
- \`duration-200\`: transition duration in ms
- \`ease-in-out\`: easing function

### Group Hover Pattern
Apply \`group\` to parent container and \`group-hover:*\` on child nodes to animate children based on parent hover events.`,
    experimentsId: [
      'Ubah hover:bg-indigo-700 menjadi hover:bg-emerald-600',
      'Tambahkan hover:scale-105 pada tombol utama untuk efek membesar',
      'Ubah duration-200 menjadi duration-700 untuk transisi lambat',
      'Ganti focus:ring-indigo-200 menjadi focus:ring-rose-200'
    ],
    experimentsEn: [
      'Switch hover:bg-indigo-700 to hover:bg-emerald-600',
      'Add hover:scale-105 to main button for scaling feedback',
      'Change duration-200 to duration-700 for slow transitions',
      'Change focus:ring-indigo-200 to focus:ring-rose-200'
    ],
    challengeId: 'Buat kartu link yang memiliki panah ikon di kanan, dan saat kartu disorot, ikon panah bergeser ke kanan dan warnanya menjadi biru.',
    challengeEn: 'Build a link card with right arrow icon that translates right and turns blue when card is hovered.',
    summaryId: 'Minggu 7 dari 9: **State Modifiers, Pseudo-Classes & Transisi**. Anda telah menguasai interaktivitas antarmuka. Minggu depan: **Komposisi Komponen UI: Card, Button, Form, Modal**.',
    summaryEn: 'Week 7 of 9: **State Modifiers, Pseudo-Classes & Transitions**. You mastered interactive feedback. Next week: **UI Component Composition: Cards, Buttons, Forms, Modals**.'
  },

  // ── MINGGU 8: Komposisi Komponen UI ───────────────────────────────────────
  {
    week: 8, level: 'advanced', topicId: 'komposisi-komponen-ui',
    titleId: 'Komposisi Komponen UI: Card, Button, Form, Modal', titleEn: 'UI Component Composition: Cards, Buttons, Forms, Modals',
    programId: 'Sistem Komponen Form & Dialog Modal Terpadu', programEn: 'Cohesive Form & Modal Dialog Component System',
    levelNameId: 'Komponen & Proyek Antarmuka', levelNameEn: 'Components & Interface Project',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 min-h-screen flex items-center justify-center">
  <!-- Dialog Modal Container -->
  <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
    <!-- Modal Header -->
    <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-slate-900">Tambah Produk Baru</h3>
        <p class="text-xs text-slate-500">Masukkan rincian item ke katalog</p>
      </div>
      <button class="text-slate-400 hover:text-slate-600 text-lg font-bold">×</button>
    </div>

    <!-- Modal Form Body -->
    <form class="p-6 space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Produk</label>
        <input type="text" value="Mouse Nirkabel Ergonomis" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
          <select class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white">
            <option>Aksesoris</option>
            <option>Komputer</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Harga (IDR)</label>
          <input type="number" value="250000" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Status Publikasi</label>
        <label class="flex items-center gap-2 cursor-pointer mt-1">
          <input type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
          <span class="text-xs text-slate-700 font-medium">Tampilkan langsung di katalog publik</span>
        </label>
      </div>

      <!-- Action Footer -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <button type="button" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg">
          Batal
        </button>
        <button type="submit" class="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition">
          Simpan Data
        </button>
      </div>
    </form>
  </div>
</body>
</html>`,
    objectivesId: [
      'Menyusun komposisi komponen modal terstruktur (header, body form, footer)',
      'Mengatur styling elemen form native: text input, select dropdown, checkbox',
      'Menggunakan grid multi-kolom dalam formulir input',
      'Membangun sistem tombol yang konsisten (primer, sekunder, ghost)',
      'Menjaga konsistensi jarak vertikal menggunakan space-y-*'
    ],
    objectivesEn: [
      'Compose structured modal components (header, form body, action footer)',
      'Style native form elements: inputs, select dropdowns, checkboxes',
      'Use multi-column grid inside form structures',
      'Build cohesive button hierarchies (primary, secondary, ghost)',
      'Maintain vertical rhythm using space-y-* utilities'
    ],
    explanationId: `### Pola Komposisi UI
Alih-alih menulis framework CSS raksasa, Tailwind memungkinkan penyusunan blok UI standar melalui kombinasi utilitas:
1. **Modal / Card**: Kontainer dengan \`rounded-2xl\`, \`shadow-xl\`, \`border\`, dan \`overflow-hidden\`
2. **Form Input**: Konsistensi \`px-3 py-2 text-sm rounded-lg border border-slate-300\`
3. **Button Hierarchy**:
   - Primary: \`bg-indigo-600 text-white hover:bg-indigo-700\`
   - Secondary: \`border border-slate-300 text-slate-700 hover:bg-slate-50\`
   - Ghost: \`text-slate-600 hover:text-slate-800\``,
    explanationEn: `### UI Composition Patterns
Tailwind enables standardized UI blocks through utility pairings:
1. **Cards / Modals**: \`rounded-2xl shadow-xl border overflow-hidden\`
2. **Form Controls**: \`px-3 py-2 text-sm rounded-lg border\`
3. **Button Hierarchy**:
   - Primary: \`bg-indigo-600 text-white\`
   - Secondary: \`border text-slate-700\`
   - Ghost: \`text-slate-600 hover:text-slate-800\``,
    experimentsId: [
      'Ubah tombol Simpan menjadi warna emerald-600',
      'Ganti max-w-md menjadi max-w-lg untuk modal lebih lebar',
      'Tambahkan field textarea untuk deskripsi produk',
      'Ubah shadow-xl menjadi shadow-2xl untuk bayangan lebih tebal'
    ],
    experimentsEn: [
      'Change Save button to emerald-600',
      'Switch max-w-md to max-w-lg for wider modal',
      'Add textarea field for product description',
      'Switch shadow-xl to shadow-2xl for deeper elevation'
    ],
    challengeId: 'Buat komponen kartu notifikasi toast yang melayang di pojok kanan atas dengan ikon centang sukses dan tombol tutup (×).',
    challengeEn: 'Build a floating toast notification card in top right corner with success check icon and dismiss button (×).',
    summaryId: 'Minggu 8 dari 9: **Komposisi Komponen UI**. Anda menguasai pola komponen dialog dan formulir. Minggu depan: **Proyek Akhir: Dashboard Admin Responsif Lengkap**.',
    summaryEn: 'Week 8 of 9: **UI Component Composition**. You mastered modal dialogs and form patterns. Next week: **Final Project: Complete Responsive Admin Dashboard**.'
  },

  // ── MINGGU 9: Proyek Akhir Dashboard Admin Responsif Lengkap ───────────────
  {
    week: 9, level: 'advanced', topicId: 'proyek-akhir-dashboard-admin',
    titleId: 'Proyek Akhir: Dashboard Admin Responsif Lengkap', titleEn: 'Final Project: Complete Responsive Admin Dashboard',
    programId: 'Aplikasi Dashboard Manajemen Toko & Inventaris', programEn: 'Store & Inventory Management Dashboard Application',
    levelNameId: 'Komponen & Proyek Antarmuka', levelNameEn: 'Components & Interface Project',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 font-sans text-slate-800 antialiased min-h-screen flex flex-col md:flex-row">
  <!-- Sidebar Navigasi -->
  <aside class="w-full md:w-64 bg-slate-900 text-slate-300 p-5 flex flex-col justify-between shrink-0">
    <div>
      <!-- Brand -->
      <div class="flex items-center gap-3 mb-8">
        <div class="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-black">
          T
        </div>
        <div>
          <div class="font-bold text-white leading-tight">AdminPanel</div>
          <div class="text-[11px] text-slate-400">Tryngo Dashboard</div>
        </div>
      </div>

      <!-- Menu Items -->
      <nav class="space-y-1 text-sm font-medium">
        <a href="#" class="flex items-center gap-3 px-3 py-2 bg-indigo-600 text-white rounded-lg">
          <span>📊</span>
          <span>Ringkasan</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition">
          <span>📦</span>
          <span>Produk & Stok</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition">
          <span>👥</span>
          <span>Pelanggan</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition">
          <span>⚙️</span>
          <span>Pengaturan</span>
        </a>
      </nav>
    </div>

    <!-- User Profile Badge -->
    <div class="pt-4 border-t border-slate-800 flex items-center gap-3 mt-6">
      <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
        AD
      </div>
      <div class="text-xs">
        <div class="font-semibold text-white">Admin Sistem</div>
        <div class="text-slate-400">admin@tryngo.id</div>
      </div>
    </div>
  </aside>

  <!-- Konten Utama Dashboard -->
  <main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <!-- Header Konten -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Ringkasan Penjualan</h1>
        <p class="text-sm text-slate-500">Statistik performa toko bulan berjalan</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-white border border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-50">
          Unduh Laporan
        </button>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-indigo-700">
          + Tambah Item
        </button>
      </div>
    </div>

    <!-- Kartu Metrik (3 Kolom Grid) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Pendapatan</div>
        <div class="text-2xl font-bold text-slate-900">Rp 48.250.000</div>
        <div class="text-xs text-emerald-600 font-semibold mt-2">↑ 12.5% dibanding bulan lalu</div>
      </div>
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pesanan Selesai</div>
        <div class="text-2xl font-bold text-slate-900">1.240</div>
        <div class="text-xs text-emerald-600 font-semibold mt-2">↑ 8.2% pesanan baru</div>
      </div>
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pelanggan Aktif</div>
        <div class="text-2xl font-bold text-slate-900">324</div>
        <div class="text-xs text-slate-400 font-medium mt-2">98.4% retensi aktif</div>
      </div>
    </div>

    <!-- Tabel Data Transaksi Terbaru -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-bold text-slate-800 text-sm">Pesanan Terbaru</h3>
        <span class="text-xs text-slate-400">5 Transaksi Terakhir</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th class="px-6 py-3">ID Pesanan</th>
              <th class="px-6 py-3">Pelanggan</th>
              <th class="px-6 py-3">Nominal</th>
              <th class="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr class="hover:bg-slate-50/75 transition">
              <td class="px-6 py-3 font-mono font-medium">#ORD-9021</td>
              <td class="px-6 py-3 font-medium">Budi Santoso</td>
              <td class="px-6 py-3 font-semibold">Rp 750.000</td>
              <td class="px-6 py-3">
                <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Selesai</span>
              </td>
            </tr>
            <tr class="hover:bg-slate-50/75 transition">
              <td class="px-6 py-3 font-mono font-medium">#ORD-9022</td>
              <td class="px-6 py-3 font-medium">Siti Rahma</td>
              <td class="px-6 py-3 font-semibold">Rp 320.000</td>
              <td class="px-6 py-3">
                <span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">Diproses</span>
              </td>
            </tr>
            <tr class="hover:bg-slate-50/75 transition">
              <td class="px-6 py-3 font-mono font-medium">#ORD-9023</td>
              <td class="px-6 py-3 font-medium">Ahmad Fauzi</td>
              <td class="px-6 py-3 font-semibold">Rp 1.150.000</td>
              <td class="px-6 py-3">
                <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Selesai</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</body>
</html>`,
    objectivesId: [
      'Menggabungkan semua utilitas: Flexbox, Grid, Responsivitas, Card, Tabel, dan Button',
      'Membangun layout dashboard aplikasi nyata dengan Sidebar navigasi dan Main Content',
      'Mengatur responsivitas mobile-to-desktop secara utuh (flex-col md:flex-row, sm:grid-cols-2 lg:grid-cols-3)',
      'Mengatur tabel data dengan scroll horizontal responsif (overflow-x-auto)',
      'Menyelesaikan satu proyek aplikasi dashboard utuh siap pakai'
    ],
    objectivesEn: [
      'Combine all core utilities: Flexbox, Grid, Responsiveness, Cards, Tables, and Buttons',
      'Build realistic dashboard layout with navigation Sidebar and Main Content area',
      'Implement cohesive mobile-to-desktop responsiveness (flex-col md:flex-row, sm:grid-cols-2 lg:grid-cols-3)',
      'Style responsive data tables with horizontal scroll guards (overflow-x-auto)',
      'Complete one full working admin dashboard project'
    ],
    explanationId: `### Arsitektur Dashboard Nyata
Dashboard terdiri dari dua area utama:
1. **Sidebar Navigation**: Menetap di sisi kiri pada layar besar (\`md:w-64\`), dan berada di atas pada layar HP (\`w-full\`).
2. **Main Content Area**: Mengisi sisa ruang (\`flex-1\`) dengan padding adaptif (\`p-6 md:p-8\`).

### Metrik & Grid Responsif
Kartu metrik menggunakan CSS Grid adaptif:
- 1 kolom pada ponsel (\`grid-cols-1\`)
- 2 kolom pada tablet (\`sm:grid-cols-2\`)
- 3 kolom pada desktop (\`lg:grid-cols-3\`)

### Tabel Responsif
Elemen tabel dibungkus kontainer \`overflow-x-auto\` agar tabel dengan kolom banyak tidak merusak lebar layar ponsel.`,
    explanationEn: `### Real Dashboard Architecture
1. **Sidebar Navigation**: \`md:w-64\` on desktop, \`w-full\` on mobile.
2. **Main Content**: \`flex-1\` with adaptive padding \`p-6 md:p-8\`.

### Responsive Metric Cards
- Mobile: \`grid-cols-1\`
- Tablet: \`sm:grid-cols-2\`
- Desktop: \`lg:grid-cols-3\`

### Responsive Data Table
Wrapped in \`overflow-x-auto\` to protect viewport boundaries on mobile screens.`,
    experimentsId: [
      'Ubah warna sidebar dari slate-900 ke zinc-950 atau indigo-950',
      'Tambahkan baris transaksi baru di dalam tabel pesanan',
      'Tambahkan kartu metrik ke-4 untuk "Tingkat Pembatalan"',
      'Ganti warna aksen utama dari indigo-600 ke emerald-600 atau rose-600'
    ],
    experimentsEn: [
      'Change sidebar color from slate-900 to zinc-950 or indigo-950',
      'Add a new transaction row into the orders table',
      'Add a 4th metric card for "Cancellation Rate"',
      'Switch primary accent color from indigo-600 to emerald-600 or rose-600'
    ],
    challengeId: 'Tambahkan pagination di bawah tabel pesanan (Sebelumnya, 1, 2, 3, Selanjutnya) dengan tombol berukuran rapi dan state hover yang konsisten.',
    challengeEn: 'Add table pagination below the orders table (Previous, 1, 2, 3, Next) with neat sizing and consistent hover states.',
    summaryId: 'Minggu 9 dari 9: **Proyek Akhir: Dashboard Admin Responsif Lengkap**. Selamat! 🎉 Anda telah menyelesaikan kurikulum Tailwind CSS dari fondasi utility-first hingga dashboard manajemen inventaris lengkap.',
    summaryEn: 'Week 9 of 9: **Final Project: Complete Responsive Admin Dashboard**. Congratulations! 🎉 You have completed the Tailwind CSS curriculum from utility-first fundamentals to a complete working inventory management dashboard.'
  }
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
