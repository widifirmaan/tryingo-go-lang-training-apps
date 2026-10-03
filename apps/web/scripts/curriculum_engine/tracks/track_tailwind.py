# Tailwind CSS Track: 8 Weeks (2 Levels)
# Final Product: Production SaaS Landing Page & Interactive Dashboard UI with Dark Mode

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Pondasi Utility-First & Tata Letak',
        'nameEn': 'Utility-First & Layout Foundations',
        'descId': 'Menguasai filosofi utility-first, tipografi, sistem spasi, tata letak Flexbox/Grid, dan responsivitas mobile-first.',
        'descEn': 'Master utility-first philosophy, typography, spacing scales, Flexbox/Grid layouts, and mobile-first responsiveness.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Komponen Kustom, Desain Sistem & Produksi',
        'nameEn': 'Custom Components, Design Systems & Production',
        'descId': 'Form styling, transisi mikro-interaktif, arsitektur Dark Mode terpadu, arbitrary values, dan proyek SaaS dashboard lengkap.',
        'descEn': 'Form styling, micro-interactive transitions, systemic Dark Mode, arbitrary values, and a full SaaS dashboard project.',
    },
]

MODULES = [
    # Level 1: Pondasi Utility-First & Tata Letak (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'filosofi-utility-first-dan-tipografi',
        'titleId': 'Filosofi Utility-First, Konfigurasi & Skala Tipografi',
        'titleEn': 'Utility-First Philosophy, Configuration & Typography Scales',
        'programId': 'Kartu Notifikasi SaaS dengan Kelas Utilitas Murni',
        'programEn': 'SaaS Notification Card with Pure Utility Classes',
        'levelNameId': 'Pondasi Utility-First & Tata Letak',
        'levelNameEn': 'Utility-First & Layout Foundations',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind CSS Utility-First</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-stone-100 text-stone-900 min-h-screen flex items-center justify-center p-6 font-sans">

  <!-- Komponen Notifikasi Berbasis Kelas Utilitas Komposisional -->
  <div class="max-w-md w-full bg-white rounded-2xl shadow-lg border border-stone-200/80 p-6 transition-all hover:shadow-xl">
    <div class="flex items-start space-x-4">
      <div class="flex-shrink-0 w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-xl">
        ✓
      </div>
      <div class="flex-1 min-w-0">
        <span class="inline-block text-xs font-semibold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-1">
          Kompilasi Sukses
        </span>
        <h3 class="text-lg font-bold text-stone-900 truncate">
          Rilis v3.4.0 Aktif di Produksi
        </h3>
        <p class="text-sm text-stone-500 mt-1 leading-relaxed">
          Semua 12 container microservice berhasil di-deploy tanpa downtime. Latensi rata-rata stabil pada 8ms.
        </p>
        <div class="mt-4 flex items-center gap-3">
          <button class="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
            Lihat Log
          </button>
          <button class="text-stone-600 hover:text-stone-900 text-xs font-medium px-3 py-2">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>

</body>
</html>""",
        'objectivesId': [
            'Memahami filosofi Utility-First: membangun UI tanpa berpindah-pindah antara file HTML dan stylesheet CSS terpisah',
            'Menguasai sistem skala spasi matematis Tailwind (p-4 = 1rem = 16px, m-6 = 1.5rem = 24px)',
            'Menerapkan utilitas tipografi inti: text-sm, text-lg, font-bold, leading-relaxed, dan tracking-wide',
            'Memahami sistem palet warna terstandar (emerald-50 hingga emerald-950, stone-100 hingga stone-900)',
            'Menghilangkan kecemasan penamaan class CSS (naming fatigue) dengan utilitas fungsional bawaan',
        ],
        'objectivesEn': [
            'Internalize the Utility-First philosophy: construct bespoke interfaces without context-switching into separate CSS files',
            'Master the mathematical spacing scale (p-4 = 1rem = 16px, m-6 = 1.5rem = 24px)',
            'Apply typography primitives: text-sm, text-lg, font-bold, leading-relaxed, and tracking-wide',
            'Navigate the standardized chromatic palette (emerald-50 to 950, stone-100 to 900)',
            'Eradicate CSS naming fatigue through expressive atomic classes',
        ],
        'explanationId': """### Mengapa Utility-First Mengubah Dunia Web?
Dalam CSS tradisional, setiap tombol baru membutuhkan nama class arbitrer seperti `.custom-success-notification-btn-v2`. Ini memicu *naming fatigue* dan file CSS yang membengkak seiring waktu.

Dengan **Tailwind CSS**:
- Anda menyusun tampilan menggunakan kelas-kelas atomik kecil yang langsung menjelaskan fungsinya: `bg-white`, `rounded-2xl`, `p-6`, `flex`, `items-center`.
- Ukuran bundle CSS produksi tetap kecil karena Tailwind menggunakan compiler JIT (Just-In-Time) yang hanya mengekspor kelas yang benar-benar Anda pakai.
- Desain selalu konsisten karena terikat pada skala spasi, palet warna, dan radius yang terstandarisasi secara matematis.

### Skala Spasi (Spacing Scale)
Skala spasi Tailwind berbasis kelipatan 4:
- `1` = `0.25rem` (4px)
- `2` = `0.5rem` (8px)
- `4` = `1rem` (16px)
- `6` = `1.5rem` (24px)
- `8` = `2rem` (32px)""",
        'explanationEn': """### Why Utility-First Revolutionized Frontend
In semantic CSS, each component demands bespoke class labels like `.success-alert-card-action-btn-final`. This generates acute naming fatigue and uncontrolled stylesheet bloating.

With **Tailwind CSS**:
- You compose UIs directly inside markup via expressive atomic utilities: `bg-white`, `rounded-2xl`, `p-6`, `flex`, `items-center`.
- Production bundle size remains microscopic because the JIT compiler generates only classes actively used in your templates.
- Visual rhythm is enforced through synchronized design tokens governing spacing, chromatic scales, and radii.

### The Mathematical Spacing Scale
Tailwind spacing maps to a base-4 grid:
- `1` = `0.25rem` (4px)
- `2` = `0.5rem` (8px)
- `4` = `1rem` (16px)
- `6` = `1.5rem` (24px)
- `8` = `2rem` (32px)""",
        'beginnerId': """### Analogi: Balok Lego Standar
1. **CSS Tradisional** seperti membuat mainan dari tanah liat: Anda harus membentuk, mengecat, memberi nama, dan membakar setiap cangkir tanah liat baru dari nol.
2. **Tailwind CSS** seperti sekotak balok LEGO: Anda diberikan ribuan balok standar berukuran presisi (balok merah 4 titik, balok sudut lengkung, pelat datar). Anda cukup merakit balok-balok tersebut langsung menjadi istana megah tanpa perlu mencetak balok baru.""",
        'beginnerEn': """### Analogy: A Modular LEGO Box
1. **Traditional CSS** is clay sculpture: you mold, glaze, label, and fire a custom ceramic cup every time you need a new container.
2. **Tailwind CSS** is a bucket of precision LEGO bricks: you are equipped with standardized blocks (red 4-studs, curved arches, smooth caps). You assemble them into an elaborate castle without ever molding custom plastic.""",
        'experimentsId': [
            'Ubah p-6 pada kartu notifikasi menjadi p-10 dan amati bagaimana ruang napas di dalam kartu melebar secara instan.',
            'Ganti bg-emerald-100 dan text-emerald-700 menjadi palet indigo (bg-indigo-100 text-indigo-700) untuk melihat perubahan tema dalam sekejap.',
            'Hapus flex-shrink-0 pada wadah ikon centang, lalu masukkan teks deskripsi yang sangat panjang untuk melihat ikon mengecil gepeng jika tidak diproteksi.',
            'Coba ganti rounded-2xl menjadi rounded-none dan rounded-full untuk mengamati variasi sudut komponen.',
        ],
        'experimentsEn': [
            'Change p-6 to p-10 and observe how internal card breathing room expands proportionally.',
            'Swap emerald tokens for indigo (bg-indigo-100, text-indigo-700) to re-skin the alert state in seconds.',
            'Remove flex-shrink-0 from the icon wrapper, insert long copy, and watch the icon compress if unprotected.',
            'Toggle rounded-2xl to rounded-none and rounded-full to evaluate perimeter radius scales.',
        ],
        'challengeId': 'Rancang kartu profil anggota tim menggunakan kelas utilitas Tailwind: sertakan avatar bundar (`rounded-full w-16 h-16`), badge status online hijau (`bg-emerald-500 rounded-full w-3 h-3`), nama tebal, peran pekerjaan abu-abu, dan tombol "Kirim Pesan" dengan efek hover.',
        'challengeEn': 'Design a team member profile card with Tailwind utilities: include a round avatar (`rounded-full w-16 h-16`), an online indicator dot (`bg-emerald-500 rounded-full w-3 h-3`), bold name, muted job title, and a hoverable "Send Message" button.',
        'summaryId': 'Kamu telah menguasai filosofi utility-first, sistem skala spasi, dan tipografi Tailwind. Minggu depan kita akan mempelajari penataan tata letak kompleks menggunakan Flexbox dan Grid di Tailwind.',
        'summaryEn': 'You have mastered utility-first principles, spacing scales, and typography tokens. Next week, we orchestrate complex Flexbox and Grid layouts using Tailwind utilities.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'flexbox-dan-grid-tailwind',
        'titleId': 'Tata Letak Flexbox & CSS Grid dengan Utilitas Tailwind',
        'titleEn': 'Flexbox & CSS Grid Layouts with Tailwind Utilities',
        'programId': 'Header Navigasi & Grid Kartu Statistik Responsif',
        'programEn': 'Responsive Navigation Bar & Metric Stat Grid',
        'levelNameId': 'Pondasi Utility-First & Tata Letak',
        'levelNameEn': 'Utility-First & Layout Foundations',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Flexbox & Grid</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen p-6 font-sans">
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- 1. Navigation Bar dengan Flexbox -->
    <header class="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-white font-bold">T</div>
        <span class="font-bold text-lg text-slate-900">Tryngo Admin</span>
      </div>
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
        <a href="#" class="text-emerald-800 font-semibold">Ikhtisar</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Pesanan</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Pelanggan</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Analitik</a>
      </nav>
      <div class="flex items-center space-x-3">
        <button class="bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm">
          + Buat Proyek
        </button>
      </div>
    </header>

    <!-- 2. Grid Statistik Metrik Utama -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pendapatan</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">Rp 128.4 Jt</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+14.2%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Siswa Aktif</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">14.820</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+8.1%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kuis Selesai</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">92.4%</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+2.4%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Uptime Server</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">99.98%</span>
          <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Normal</span>
        </div>
      </div>
    </section>

  </div>
</body>
</html>""",
        'objectivesId': [
            'Mengatur perataan Flexbox di Tailwind: flex, items-center, justify-between, dan space-x-*',
            'Membangun CSS Grid deklaratif: grid, grid-cols-1, sm:grid-cols-2, lg:grid-cols-4, dan gap-6',
            'Menyusun layout adaptif mobile-first menggunakan prefix breakpoint bawaan (sm, md, lg, xl)',
            'Mengontrol visibilitas bersyarat responsif: hidden md:flex untuk menyembunyikan menu navigasi di mobile',
            'Memanfaatkan utilitas flex-1, flex-shrink-0, dan space-y-* untuk alur vertikal yang konsisten',
        ],
        'objectivesEn': [
            'Coordinate Flexbox alignments with Tailwind: flex, items-center, justify-between, and space-x-*',
            'Author declarative CSS Grid systems: grid, grid-cols-1, sm:grid-cols-2, lg:grid-cols-4, and gap-6',
            'Implement mobile-first responsive boundaries using native breakpoint prefixes (sm, md, lg, xl)',
            'Control conditional responsive visibility: hidden md:flex to collapse mobile menus cleanly',
            'Deploy flex-1, flex-shrink-0, and space-y-* for rhythmic vertical and horizontal flow',
        ],
        'explanationId': """### Flexbox Cepat di Tailwind
Daripada menulis 5 baris CSS, di Tailwind cukup menulis:
`flex items-center justify-between`
- `flex`: `display: flex;`
- `items-center`: `align-items: center;`
- `justify-between`: `justify-content: space-between;`
- `space-x-4`: Menambahkan margin horizontal otomatis di antara elemen anak tanpa perlu repot memilih elemen pertama/terakhir.

### Breakpoint Responsif Mobile-First
Tailwind menerapkan pendekatan mobile-first sejati:
- `grid-cols-1`: Default untuk ponsel layar kecil (1 kolom).
- `sm:grid-cols-2`: Layar $\ge$ 640px beralih ke 2 kolom.
- `lg:grid-cols-4`: Layar $\ge$ 1024px beralih ke 4 kolom.
Tidak ada media query manual yang perlu ditulis. Cukup tambahkan prefix breakpoint di depan nama kelas!""",
        'explanationEn': """### Streamlined Flexbox in Tailwind
Rather than authoring five manual CSS declarations, declare:
`flex items-center justify-between`
- `flex`: `display: flex;`
- `items-center`: `align-items: center;`
- `justify-between`: `justify-content: space-between;`
- `space-x-4`: Inserts horizontal spacing between children without targeting `:last-child`.

### Mobile-First Responsive Prefixes
Tailwind is intrinsically mobile-first:
- `grid-cols-1`: Unprefixed baseline for compact mobile viewports (1 column).
- `sm:grid-cols-2`: Screen widths $\ge$ 640px step up to 2 columns.
- `lg:grid-cols-4`: Screen widths $\ge$ 1024px expand into 4 columns.
Zero hand-written media queries required; prefix any utility with breakpoint tags!""",
        'beginnerId': """### Analogi: Konvoi Mobil Patroli
1. **`flex justify-between`** seperti dua mobil patroli polisi: satu mobil mengawal di ujung paling depan konvoi, satu lagi di ujung paling belakang.
2. **`items-center`** memastikan semua penumpang mobil tingginya sejajar pas di jendela tengah.
3. **`sm:` dan `lg:`** seperti komandan lalu lintas yang melihat jalanan: "Jika jalan raya sempit, jalan beriringan 1 jalur. Begitu masuk jalan tol lebar (`lg:`), langsung buka formasi 4 jalur berdampingan!".""",
        'beginnerEn': """### Analogy: A Highway Police Escort
1. **`flex justify-between`** positions two escort cruisers: one pinned to the extreme front, the other guarding the rearmost perimeter.
2. **`items-center`** aligns vehicle windows along a level horizontal trajectory.
3. **`sm:` and `lg:`** act as dynamic highway traffic dispatchers: "On single-lane city alleys, travel in 1 single file. The moment you hit the multi-lane expressway (`lg:`), fan out into 4 side-by-side lanes!".""",
        'experimentsId': [
            'Ubah lg:grid-cols-4 menjadi lg:grid-cols-2 dan perhatikan kartu metrik yang berubah menjadi 2x2 di layar desktop.',
            'Hapus hidden pada nav-links dan perhatikan menu yang muncul berantakan di layar ponsel sempit.',
            'Ganti gap-6 pada kontainer grid menjadi gap-12 untuk melihat jarak renggang antar kartu.',
            'Tambahkan items-baseline pada salah satu baris metrik dan amati teks persentase sejajar rapi dengan garis dasar angka nominal.',
        ],
        'experimentsEn': [
            'Switch lg:grid-cols-4 to lg:grid-cols-2 to view a 2x2 dashboard matrix on desktop screens.',
            'Remove the hidden utility from navigation links and inspect mobile menu overflow.',
            'Increase gap-6 to gap-12 on the grid container to evaluate expanded spatial padding.',
            'Inspect items-baseline to confirm that percentage badges lock to the numeric baseline.',
        ],
        'challengeId': 'Bangun layout split hero section: di sisi kiri terdapat judul besar dan dua tombol aksi, di sisi kanan terdapat gambar mock-up kartu preview. Di layar mobile tersusun 1 kolom vertikal, di layar desktop (`md:`) beralih menjadi 2 kolom berdampingan dengan `grid-cols-1 md:grid-cols-2 gap-12 items-center`.',
        'challengeEn': 'Build a split-screen hero section: left column holds headline copy and twin CTAs; right column displays an interactive preview mock-up. Stack vertically on mobile, unlocking a two-column layout on desktop via `grid-cols-1 md:grid-cols-2 gap-12 items-center`.',
        'summaryId': 'Kamu telah menguasai pengaturan Flexbox dan CSS Grid yang responsif dengan utilitas Tailwind. Minggu depan kita akan mempelajari penataan warna, bayangan elevasi, dan arsitektur Dark Mode.',
        'summaryEn': 'You have mastered responsive Flexbox and Grid composition with Tailwind utilities. Next week, we examine chromatic scales, elevation shadows, and systemic Dark Mode.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'warna-elevasi-dan-dark-mode',
        'titleId': 'Warna, Bayangan Elevasi & Arsitektur Dark Mode di Tailwind',
        'titleEn': 'Colors, Elevation Shadows & Dark Mode Architecture in Tailwind',
        'programId': 'Kartu Langganan SaaS dengan Transisi Dark Mode Instan',
        'programEn': 'SaaS Subscription Card with Instant Dark Mode Toggling',
        'levelNameId': 'Pondasi Utility-First & Tata Letak',
        'levelNameEn': 'Utility-First & Layout Foundations',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Dark Mode & Elevation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class', // Menggunakan strategi class alih-alih media
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#F2F7F4',
              500: '#2E5B44',
              800: '#1D3B2C',
              900: '#12251C',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 font-sans">

  <!-- Tombol Toggle Tema -->
  <button onclick="toggleDarkMode()" class="mb-8 px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 shadow-sm text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-700 transition-all">
    🌓 Ganti Mode Tampilan
  </button>

  <!-- Kartu SaaS Adaptif dengan Dark Mode Prefix -->
  <div class="max-w-sm w-full bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200 dark:border-stone-700 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all">
    <div class="flex justify-between items-center">
      <span class="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-emerald-400 bg-brand-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
        Paket Pro
      </span>
      <span class="text-xs text-stone-400 font-medium">Billed Annually</span>
    </div>

    <h2 class="text-2xl font-black mt-4 text-stone-900 dark:text-white">
      Developer Pro
    </h2>
    <p class="text-sm text-stone-500 dark:text-stone-400 mt-2">
      Akses komputasi performa tinggi untuk tim rekayasa software.
    </p>

    <div class="mt-6 flex items-baseline gap-1">
      <span class="text-4xl font-black text-stone-900 dark:text-white">Rp 299rb</span>
      <span class="text-sm text-stone-400 font-medium">/bulan</span>
    </div>

    <ul class="mt-6 space-y-3 text-sm text-stone-600 dark:text-stone-300">
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Kuota 1.000 Menit Kompilasi WASM
      </li>
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Dukungan 28 Kurikulum Lengkap
      </li>
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Sertifikasi Ujian Interaktif
      </li>
    </ul>

    <button class="w-full mt-8 bg-brand-500 hover:bg-brand-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-brand-500/20 transition-all">
      Langganan Sekarang
    </button>
  </div>

  <script>
    function toggleDarkMode() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
</body>
</html>""",
        'objectivesId': [
            'Memahami strategi Dark Mode di Tailwind: class strategy (manual toggle) vs media strategy (OS default)',
            'Menggunakan modifier dark:* untuk memetakan warna latar, teks, dan border khusus mode gelap',
            'Menerapkan tingkatan bayangan elevasi (shadow-sm, shadow-md, shadow-xl, shadow-2xl)',
            'Mengonfigurasi palet warna kustom di tailwind.config dengan tingkatan 50 hingga 900',
            'Menambahkan efek transisi warna latar belakang dan teks yang mulus (transition-colors duration-300)',
        ],
        'objectivesEn': [
            'Distinguish Tailwind Dark Mode strategies: class strategy (manual state toggle) vs media strategy (OS level)',
            'Deploy dark:* variant modifiers for backgrounds, typography, and borders in dark contexts',
            'Calibrate elevation depth using standardized box shadows (shadow-sm, shadow-md, shadow-xl, shadow-2xl)',
            'Extend custom brand chromatic swatches inside tailwind.config from 50 to 900 tints',
            'Implement smooth thematic shifts via transition-colors duration-300',
        ],
        'explanationId': """### Strategi Dark Mode di Tailwind
Tailwind mendukung dua cara pengaktifan mode gelap:
1. **media**: Mengikuti preferensi setelan gelap/terang sistem operasi pengguna (`prefers-color-scheme`).
2. **class**: Memberikan kontrol penuh kepada developer atau tombol pengguna dengan menambahkan class `.dark` pada tag `<html>`.

### Cara Kerja Modifier dark:*
Anda cukup menuliskan kelas default untuk mode terang, lalu menyematkan `dark:` untuk mode gelap pada elemen yang sama:
`class="bg-white dark:bg-stone-800 text-stone-900 dark:text-white"`
Saat class `dark` disematkan di tag `<html>`, browser secara otomatis mengaktifkan seluruh aturan `dark:*`.

### Sistem Elevasi Bayangan (Shadows)
Di mode terang, bayangan gelap tipis (`shadow-xl`) memberikan kesan melayang. Di mode gelap, bayangan standar sering tidak terlihat karena latarnya sudah gelap; oleh karena itu Tailwind memungkinkan pewarnaan bayangan: `dark:shadow-black/40`.""",
        'explanationEn': """### Dark Mode Deployment Strategies
Tailwind supports two orchestration patterns:
1. **media**: Subscribes automatically to the host operating system's `prefers-color-scheme`.
2. **class**: Empowers application-level toggling by observing the presence of the `.dark` class on `<html>`.

### The dark:* Modifier Paradigm
Declare baseline light properties, then append the `dark:` variant on the same element:
`class="bg-white dark:bg-stone-800 text-stone-900 dark:text-white"`
The instant the `dark` class mounts to `<html>`, the cascade automatically engages the dark variant spectrum.

### Elevation & Shadow Tinting
In light mode, subtle ambient shadows (`shadow-xl`) convey elevation. In dark mode, shadows vanish against dark surfaces; Tailwind enables colored shadow tinting like `dark:shadow-black/40`.""",
        'beginnerId': """### Analogi: Mengalihkan Saklar Lampu Ruangan
1. **Mode Terang** seperti siang hari di kantor: dinding dicat putih terang, meja kayu bersih, tulisan di kertas tinta hitam terbaca kontras.
2. **`dark:` modifier** seperti menyalakan lampu proyektor bioskop: dinding ruangan otomatis digelapkan (`dark:bg-stone-800`), dan proyektor menembakkan tulisan putih terang di dinding (`dark:text-white`).
3. **`darkMode: 'class'`** seperti saklar di dinding: Anda bebas menekan tombol klik saklar kapan saja untuk mengubah suasana ruangan.""",
        'beginnerEn': """### Analogy: A Theater Lighting Switch
1. **Light Mode** is daylight office hours: bright white walls, natural oak tables, dark black ink providing contrast.
2. **`dark:` modifier** is engaging home-theater mode: walls darken (`dark:bg-stone-800`), while text inverts to illuminated crisp white (`dark:text-white`).
3. **`darkMode: 'class'`** is the wall switch in your hand: you toggle the switch whenever you choose, independent of outdoor weather.""",
        'experimentsId': [
            'Klik tombol alihkan mode tampilan dan amati perubahan warna kartu, teks, dan badge secara serentak.',
            'Ubah shadow-xl menjadi shadow-none pada kartu untuk melihat hilangnya kedalaman elevasi.',
            'Coba ubah dark:bg-stone-800 menjadi dark:bg-black untuk merasakan gaya kontras tinggi AMOLED.',
            'Hapus transition-colors duration-300 pada body dan perhatikan bagaimana peralihan tema menjadi patah mendadak.',
        ],
        'experimentsEn': [
            'Click the toggle button and observe the synchronized transition across cards, typography, and borders.',
            'Remove shadow-xl from the card wrapper to evaluate the flattening of visual elevation.',
            'Modify dark:bg-stone-800 to dark:bg-black to test high-contrast OLED black themes.',
            'Delete transition-colors duration-300 to witness jarring, instantaneous theme flashes.',
        ],
        'challengeId': 'Rancang kartu ulasan testimoni klien: sertakan kutipan teks, bintang rating kuning, nama klien, dan jabatan. Buat varian mode gelap yang elegan menggunakan `dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100`.',
        'challengeEn': 'Construct an executive testimonial card: include quotation copy, gold star ratings, author name, and company title. Deliver a dark variation utilizing `dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100`.',
        'summaryId': 'Kamu telah menguasai arsitektur Dark Mode, sistem pewarnaan kustom, dan bayangan elevasi di Tailwind. Minggu depan kita akan mendalami state modifiers interaktif (hover, focus-visible, active, disabled).',
        'summaryEn': 'You have mastered Dark Mode mechanics, chromatic custom scales, and elevation shadows. Next week, we examine interactive state modifiers (hover, focus-visible, active, disabled).',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'state-modifiers-dan-interaktivitas',
        'titleId': 'State Modifiers: Hover, Focus-Visible, Active & Group-Hover',
        'titleEn': 'State Modifiers: Hover, Focus-Visible, Active & Group-Hover',
        'programId': 'Daftar Tugas Interaktif dengan Group Hover & Focus Ring',
        'programEn': 'Interactive Task List with Group Hover & Focus Ring',
        'levelNameId': 'Pondasi Utility-First & Tata Letak',
        'levelNameEn': 'Utility-First & Layout Foundations',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind State Modifiers</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen flex items-center justify-center p-6 font-sans">

  <div class="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-900">Sprint Backlog Rekayasa</h2>
      <p class="text-sm text-slate-500">Arahkan kursor dan gunakan tombol TAB untuk melihat interaksi state.</p>
    </div>

    <!-- Daftar Item Interaktif dengan group hover -->
    <div class="space-y-3">
      <!-- Item 1 -->
      <div class="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer">
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 border-slate-300 cursor-pointer">
          <span class="text-sm font-semibold text-slate-700 group-hover:text-emerald-900 transition-colors">
            Optimasi WASM Compiler Binary Size
          </span>
        </div>
        <button class="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs font-semibold text-slate-400 hover:text-red-600 p-1.5 transition-all">
          Hapus
        </button>
      </div>

      <!-- Item 2 -->
      <div class="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer">
        <div class="flex items-center space-x-3">
          <input type="checkbox" checked class="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 border-slate-300 cursor-pointer">
          <span class="text-sm font-semibold text-slate-400 line-through group-hover:text-emerald-700 transition-colors">
            Audit Aksesibilitas WCAG 2.1 AA
          </span>
        </div>
        <button class="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs font-semibold text-slate-400 hover:text-red-600 p-1.5 transition-all">
          Hapus
        </button>
      </div>
    </div>

    <!-- Input Form dengan Focus Rings Aksesibel -->
    <div class="pt-4 border-t border-slate-100 flex gap-3">
      <input type="text" placeholder="Tambah tugas sprint baru..." 
             class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
      <button class="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm">
        Tambah
      </button>
    </div>
  </div>

</body>
</html>""",
        'objectivesId': [
            'Menguasai modifier interaksi pengguna: hover:*, active:*, dan focus:*',
            'Menerapkan cincin fokus aksesibel (focus rings) menggunakan focus:ring-4 dan focus:ring-offset-2',
            'Memahami pola group dan group-hover:* untuk memicu animasi anak saat elemen induk di-hover',
            'Menerapkan efek penekanan tombol tactile menggunakan active:scale-95',
            'Menjaga navigasi keyboard tetap inklusif dengan focus-visible:* tanpa outline kasar saat klik mouse',
        ],
        'objectivesEn': [
            'Master user interaction variants: hover:*, active:*, and focus:*',
            'Deploy accessible focus indicators using focus:ring-4 and focus:ring-offset-2',
            'Implement group-hover patterns to trigger child micro-interactions upon parent hover events',
            'Produce tactile button depression physics via active:scale-95',
            'Preserve keyboard accessibility with focus-visible:* while eliminating mouse-click outlines',
        ],
        'explanationId': """### State Modifiers di Tailwind
Tailwind mengubah pseudo-class CSS menjadi prefix sederhana:
- `hover:bg-emerald-900`: Mengubah warna saat kursor mouse melayang di atas elemen.
- `active:scale-95`: Memberi efek membal mengecil (tactile press) saat tombol ditekan.
- `focus:ring-4`: Menampilkan cincin fokus tebal saat pengguna berpindah menggunakan keyboard.

### Pola Magis group dan group-hover:*
Seringkali kita ingin tombol "Hapus" yang tersembunyi (`opacity-0`) otomatis muncul saat baris tugas di-hover oleh mouse:
1. Berikan kelas `group` pada kontainer baris terluar.
2. Berikan kelas `group-hover:opacity-100` pada tombol anak di dalamnya!
Ketika induk disentuh mouse, elemen anak otomatis merespons tanpa sebaris pun JavaScript.""",
        'explanationEn': """### State Modifiers Mechanics
Tailwind converts complex CSS pseudo-selectors into prefixes:
- `hover:bg-emerald-900`: Adjusts background on cursor hover.
- `active:scale-95`: Simulates tactile mechanical depression on mouse press.
- `focus:ring-4`: Projects an accessible optical ring halo upon keyboard focus.

### The group and group-hover Pattern
Frequently, auxiliary controls (like a delete action) should remain hidden (`opacity-0`) until the parent row is hovered:
1. Declare the `group` class on the bounding parent row.
2. Declare `group-hover:opacity-100` on the nested action button!
Hovering anywhere within the parent row reveals the child control without scripts.""",
        'beginnerId': """### Analogi: Saklar Sensor Pintu Otomatis
1. **`hover:`** seperti lampu beranda rumah yang menyala begitu sensor mendeteksi orang mendekat.
2. **`active:scale-95`** seperti tuts keyboard mekanikal yang terasa membal turun saat jari Anda menekannya ke bawah.
3. **`group` & `group-hover`** seperti pintu gerbang otomatis: begitu mobil Anda menyentuh gerbang depan (`group`), lampu garasi di halaman belakang (`group-hover`) otomatis ikut menyala menyambut Anda.""",
        'beginnerEn': """### Analogy: Automatic Porch Sensors
1. **`hover:`** is a front-porch motion sensor light illuminating when a visitor steps near.
2. **`active:scale-95`** is a mechanical keyboard switch physically depressing beneath your fingertip.
3. **`group` and `group-hover`** is an automated estate gate: the moment your vehicle touches the outer gate (`group`), the garage door inside the courtyard (`group-hover`) rolls open synchronously.""",
        'experimentsId': [
            'Arahkan kursor mouse ke salah satu baris tugas dan perhatikan tombol "Hapus" yang muncul mulus dari transparan ke terlihat (opacity-0 ke 100).',
            'Klik dan tahan tombol "Tambah" untuk merasakan efek membal tombol (active:scale-95).',
            'Tekan tombol TAB pada keyboard dan perhatikan cincin fokus zamrud (ring-4) yang membingkai kotak input teks secara elegan.',
            'Hapus kelas group pada pembungkus baris dan amati bagaimana tombol Hapus berhenti merespons hover induknya.',
        ],
        'experimentsEn': [
            'Hover over any task row and watch the delete button emerge gracefully from opacity-0 to 100.',
            'Click and hold the "Add" button to experience the tactile physical depression (active:scale-95).',
            'Press the physical TAB key to observe the emerald focus halo ring illuminating the text field.',
            'Remove the group token from the row container to verify that child hover actions cease responding.',
        ],
        'challengeId': 'Bangun kartu katalog kursus dengan efek `group`: saat kartu di-hover, gambar thumbnail kursus sedikit membesar (`group-hover:scale-105 overflow-hidden`), judul berubah warna menjadi hijau, dan tombol "Mulai Belajar" bertambah terang.',
        'challengeEn': 'Build a course catalog card utilizing `group`: on hover, the thumbnail zooms subtly (`group-hover:scale-105 overflow-hidden`), title shifts to emerald, and the action button illuminates.',
        'summaryId': 'Kamu telah menguasai state modifiers, cincin fokus aksesibilitas, dan pola group-hover. Minggu depan kita memasuki Level 2: formulir modern, transisi mikro-interaktif, dan proyek capstone SaaS Dashboard!',
        'summaryEn': 'You have mastered state modifiers, accessibility focus rings, and group-hover patterns. Next week we enter Level 2: modern forms, micro-interactive transitions, and the SaaS Dashboard capstone!',
    },

    # Level 2: Komponen Kustom, Desain Sistem & Produksi (Weeks 5-8)
    {
        'week': 5,
        'level': 'advanced',
        'topicId': 'formulir-dan-kontrol-kustom',
        'titleId': 'Formulir Modern, Kontrol Input & Transisi Halus',
        'titleEn': 'Modern Forms, Input Controls & Smooth Transitions',
        'programId': 'Formulir Pengaturan Profil Pengguna dengan Validasi Visual',
        'programEn': 'User Profile Settings Form with Visual Validation',
        'levelNameId': 'Komponen Kustom, Desain Sistem & Produksi',
        'levelNameEn': 'Custom Components, Design Systems & Production',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Form & Input Controls</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen p-8 font-sans flex items-center justify-center">

  <div class="max-w-xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
    <div class="border-b border-slate-100 pb-4">
      <h2 class="text-xl font-bold text-slate-900">Pengaturan Akun Insinyur</h2>
      <p class="text-sm text-slate-500">Perbarui informasi profil dan preferensi notifikasi cloud Anda.</p>
    </div>

    <form class="space-y-5">
      <!-- Input Teks Biasa -->
      <div>
        <label for="name" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Nama Lengkap</label>
        <input type="text" id="name" value="Budi Pratama"
               class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
      </div>

      <!-- Select Dropdown -->
      <div>
        <label for="role" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Spesialisasi Rekayasa</label>
        <select id="role" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
          <option>Backend Systems (Go & Rust)</option>
          <option>Frontend Engineering (React & Tailwind)</option>
          <option>DevOps & Cloud Architecture</option>
        </select>
      </div>

      <!-- Toggle Switch Murni CSS Tailwind -->
      <div class="flex items-center justify-between pt-2">
        <div>
          <span class="text-sm font-semibold text-slate-900 block">Notifikasi Email Deployment</span>
          <span class="text-xs text-slate-500">Terima ringkasan log setiap kali pipeline produksi berhasil.</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked class="sr-only peer">
          <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:width-5 after:transition-all peer-checked:bg-emerald-700"></div>
        </label>
      </div>

      <div class="pt-4 border-t border-slate-100 flex justify-end gap-3">
        <button type="button" class="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
          Batal
        </button>
        <button type="submit" class="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold shadow-md transition-all active:scale-95">
          Simpan Perubahan
        </button>
      </div>
    </form>
  </div>

</body>
</html>""",
        'objectivesId': [
            'Membangun input formulir yang konsisten dan rapi menggunakan utilitas Tailwind murni',
            'Membuat saklar toggle switch interaktif menggunakan modifier peer dan pseudo-elemen peer-checked',
            'Memanfaatkan utilitas sr-only (Screen Reader Only) untuk menjaga aksesibilitas kontrol kustom',
            'Menerapkan transisi visual transparan pada cincin fokus dan border input',
            'Mengatur tombol aksi sekunder dan primer dengan penataan Flexbox rapi',
        ],
        'objectivesEn': [
            'Author uniform form inputs leveraging pure Tailwind utilities',
            'Construct an interactive toggle switch via the peer modifier and peer-checked variants',
            'Employ the sr-only (Screen Reader Only) utility to preserve accessibility on custom controls',
            'Implement transparent transition halos across focus states and border dimensions',
            'Position primary and secondary action toolbars cleanly with Flexbox alignments',
        ],
        'explanationId': """### Kekuatan Modifier peer di Tailwind
Sama seperti `group` yang mendengarkan state elemen induk, modifier `peer` mendengarkan **elemen saudara kandung sebelumnya**:
1. Berikan class `peer` pada input checkbox tersembunyi (`sr-only peer`).
2. Pada elemen visual di sebelahnya, gunakan `peer-checked:bg-emerald-700` dan `peer-checked:after:translate-x-full`.
Ketika pengguna mengklik checkbox, elemen di sebelahnya langsung bergeser mulus menjadi saklar toggle yang aktif tanpa sebaris JavaScript!

### Utilitas Aksesibilitas sr-only
Kelas `sr-only` menyembunyikan elemen secara visual dari layar pengguna, namun **tetap terbaca secara sempurna oleh teknologi pembaca layar**. Ini adalah standar industri untuk membuat tombol kustom yang tetap ramah disabilitas.""",
        'explanationEn': """### The peer Modifier Pattern
While `group` responds to parent triggers, the `peer` modifier tracks **preceding sibling states**:
1. Apply `peer` to the visually hidden native checkbox (`sr-only peer`).
2. Decorate the adjacent sibling visual track with `peer-checked:bg-emerald-700` and `peer-checked:after:translate-x-full`.
When checked, the slider transitions smoothly to the active state with zero JavaScript!

### The sr-only Accessibility Standard
The `sr-only` utility removes elements from visual screen space while **retaining full accessibility for screen readers**. This is the professional standard for custom inputs.""",
        'beginnerId': """### Analogi: Pengungkit Saklar Lampu Rahasia
1. **`sr-only`** seperti menyembunyikan saklar listrik di balik lukisan dinding: saklarnya tetap ada dan terhubung ke kabel listrik, hanya saja matanya tidak melihat kotak plastiknya.
2. **`peer`** seperti memasang tuas kayu yang indah di depan lukisan tersebut: begitu Anda menyenggol tuas kayu, saklar di baliknya ikut tertekan dan lampu menyala hijau.""",
        'beginnerEn': """### Analogy: A Concealed Lever Mechanism
1. **`sr-only`** is concealing a functional electrical breaker behind a painting: the breaker remains wired to the main grid, but the plastic faceplate is out of sight.
2. **`peer`** is mounting an elegant brass lever on the front: flicking the brass lever actuates the concealed switch behind it, lighting the room.""",
        'experimentsId': [
            'Klik tombol toggle switch dan amati bagaimana lingkaran putih bergeser ke kanan dan warna trek berubah hijau.',
            'Hapus kelas sr-only pada checkbox dan perhatikan checkbox kotak native browser yang kini muncul di layar.',
            'Ubah peer-checked:bg-emerald-700 menjadi peer-checked:bg-blue-600 untuk mengubah warna saklar.',
            'Uji navigasi keyboard dengan menekan TAB ke toggle switch dan tekan tombol Spasi untuk mengaktifkannya.',
        ],
        'experimentsEn': [
            'Click the toggle slider to watch the white thumb glide rightward while the track illuminates emerald.',
            'Remove the sr-only class to reveal the raw browser checkbox control.',
            'Change peer-checked:bg-emerald-700 to peer-checked:bg-blue-600 to alter the active accent.',
            'Tab to the toggle switch using your keyboard and hit Space to toggle its state.',
        ],
        'challengeId': 'Bangun formulir "Ubah Kata Sandi": buat input kata sandi lama dan baru, sertakan meteran kekuatan sandi visual (3 baris balok warna yang berubah dari merah, kuning, hingga hijau), dan checkbox "Ingat perangkat ini" dengan toggle kustom.',
        'challengeEn': 'Build a "Change Password" form: author current and new password inputs, a visual password strength bar (3 indicators shifting from red, yellow, to green), and a "Trust this device" custom toggle.',
        'summaryId': 'Kamu telah menguasai pembuatan formulir interaktif dan toggle kustom menggunakan modifier peer. Minggu depan kita akan mendalami kustomisasi tema arbitrer dan konfigurasi Tailwind tingkat lanjut.',
        'summaryEn': 'You have mastered interactive form controls and custom toggle mechanics with the peer modifier. Next week, we examine arbitrary values and advanced Tailwind configuration.',
    },
    {
        'week': 6,
        'level': 'advanced',
        'topicId': 'arbitrary-values-dan-konfigurasi',
        'titleId': 'Arbitrary Values, Desain Token & Ekstensi Konfigurasi',
        'titleEn': 'Arbitrary Values, Design Tokens & Tailwind Configuration',
        'programId': 'Komponen Grafis Kustom dengan Nilai Arbitrer & Desain Token',
        'programEn': 'Bespoke Visual Component with Arbitrary Values & Theme Extensions',
        'levelNameId': 'Komponen Kustom, Desain Sistem & Produksi',
        'levelNameEn': 'Custom Components, Design Systems & Production',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Arbitrary Values & Config</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            display: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
          },
          boxShadow: {
            'glow-emerald': '0 0 25px -5px rgba(46, 91, 68, 0.4)',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-stone-900 text-stone-100 min-h-screen p-8 flex items-center justify-center font-sans">

  <!-- Komponen Menggunakan Nilai Arbitrer ([...]) dan Token Kustom -->
  <div class="max-w-md w-full bg-stone-800/90 backdrop-blur-md rounded-[28px] p-[32px] border border-stone-700 shadow-glow-emerald relative overflow-hidden">
    
    <!-- Elemen Dekoratif dengan Nilai Arbitrer Presisi -->
    <div class="absolute -right-12 -top-12 w-[160px] h-[160px] bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>

    <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/60 inline-block">
      Hardware Cluster
    </span>

    <h2 class="text-[28px] leading-[1.2] font-black mt-4 font-display text-white">
      Node Dedicated Bare-Metal 64-Core
    </h2>

    <p class="text-stone-400 text-[14px] mt-3 leading-[1.6]">
      Server komputasi berperforma tinggi dengan konektivitas jaringan terisolasi 100 Gbps dan latensi sub-milidetik.
    </p>

    <!-- Bar Utilisasi dengan Nilai Arbitrer w-[78%] -->
    <div class="mt-6 space-y-2">
      <div class="flex justify-between text-xs font-semibold">
        <span class="text-stone-300">Kapasitas RAM Terpakai</span>
        <span class="text-emerald-400">78%</span>
      </div>
      <div class="w-full h-[8px] bg-stone-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-emerald-600 to-teal-400 w-[78%] rounded-full transition-all duration-1000"></div>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between pt-6 border-t border-stone-700/60">
      <div>
        <span class="text-[11px] text-stone-400 uppercase tracking-wider block">Biaya Operasional</span>
        <span class="text-xl font-bold text-white">Rp 4.250.000<span class="text-xs text-stone-400 font-normal">/bln</span></span>
      </div>
      <button class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs px-5 py-3 rounded-[14px] transition-all shadow-lg shadow-emerald-900/30">
        Deploy Instance
      </button>
    </div>
  </div>

</body>
</html>""",
        'objectivesId': [
            'Memanfaatkan sintaks Arbitrary Values ([...]) saat membutuhkan nilai presisi di luar skala default',
            'Mengonfigurasi tema kustom di tailwind.config: memperluas fontFamily dan boxShadow kustom',
            'Menerapkan gradient modern: bg-gradient-to-r, from-emerald-600, dan to-teal-400',
            'Menggunakan backdrop-blur-md dan opasitas warna (bg-stone-800/90) untuk efek glassmorphism modern',
            'Mengendalikan interaksi kursor dengan pointer-events-none pada elemen dekoratif latar belakang',
        ],
        'objectivesEn': [
            'Leverage arbitrary value syntax ([...]) when precision requirements fall outside standard scales',
            'Configure custom themes in tailwind.config: extend font families and custom glow shadows',
            'Author modern gradients: bg-gradient-to-r, from-emerald-600, and to-teal-400',
            'Apply backdrop-blur-md and alpha color opacity (bg-stone-800/90) for modern glassmorphism',
            'Neutralize non-interactive decorative overlays using pointer-events-none',
        ],
        'explanationId': """### Sintaks Nilai Arbitrer ([...])
Terkadang desain UI membutuhkan nilai presisi seperti lebar persis 78% atau radius 28px. Alih-alih membuat file CSS baru, Tailwind menyediakan **Arbitrary Values**:
- `w-[78%]`: Menghasilkan CSS `width: 78%;`
- `rounded-[28px]`: Menghasilkan CSS `border-radius: 28px;`
- `bg-[#2E5B44]`: Menghasilkan warna hex spesifik.

### Ekstensi Konfigurasi (theme.extend)
Di file `tailwind.config.js`, Anda dapat memperluas desain token bawaan di dalam objek `extend`:
- Menambahkan font kustom (`font-display`).
- Menambahkan efek bayangan neon glow (`shadow-glow-emerald`).
Dengan cara ini, token baru Anda dapat digunakan seperti kelas Tailwind bawaan lainnya.""",
        'explanationEn': """### Arbitrary Values ([...]) Syntax
When UI specifications call for bespoke dimensions outside standard scales, Tailwind provides **Arbitrary Values**:
- `w-[78%]`: Compiles to `width: 78%;`
- `rounded-[28px]`: Compiles to `border-radius: 28px;`
- `bg-[#2E5B44]`: Emits the precise brand hex tone.

### Theme Extensions (theme.extend)
Within `tailwind.config.js`, preserve defaults while registering bespoke tokens inside `theme.extend`:
- Register display typefaces (`font-display`).
- Declare neon ambient glows (`shadow-glow-emerald`).
Custom tokens integrate natively alongside standard classes.""",
        'beginnerId': """### Analogi: Menjahit Jas Custom
1. **Kelas standar Tailwind** seperti membeli baju ukuran standar (S, M, L, XL).
2. **Arbitrary Values `w-[78%]`** seperti meminta penjahit mengecilkan lengan baju tepat 2.3 sentimeter agar pas di pergelangan tangan Anda.
3. Anda mendapatkan kecepatan pakaian siap pakai, dengan kebebasan penuh baju tailor-made kapan pun dibutuhkan.""",
        'beginnerEn': """### Analogy: Bespoke Tailoring
1. **Standard Tailwind classes** are off-the-rack sizing (Small, Medium, Large).
2. **Arbitrary Values `w-[78%]`** are asking a tailor to take in a sleeve by exactly 2.3 centimeters.
3. You enjoy the speed of off-the-rack modularity without sacrificing bespoke craftsmanship.""",
        'experimentsId': [
            'Ubah w-[78%] menjadi w-[95%] dan amati bagaimana bilah progres RAM meregang lebih panjang.',
            'Coba ubah radius rounded-[28px] menjadi rounded-[8px] untuk melihat perbedaan sudut kartu.',
            'Ganti warna bayangan glow-emerald di config dan saksikan pendaran lampu di belakang kartu berubah warna.',
            'Hapus pointer-events-none pada lingkaran dekorasi blur dan amati apakah lingkaran tersebut menghalangi seleksi teks di bawahnya.',
        ],
        'experimentsEn': [
            'Update w-[78%] to w-[95%] to watch the progress bar scale upward.',
            'Modify rounded-[28px] to rounded-[8px] to evaluate the perimeter geometry.',
            'Adjust the shadow-glow-emerald rgba value in config to alter ambient lighting.',
            'Remove pointer-events-none from the ambient blurred sphere and test text selection beneath it.',
        ],
        'challengeId': 'Bangun kartu statistik bandwidth jaringan: gunakan arbitrary values untuk membuat grafik donat sederhana atau bar progres dengan `w-[64%]`, efek glow warna biru safir (`shadow-glow-blue`), dan tipografi display kustom.',
        'challengeEn': 'Build a network bandwidth stat card: deploy arbitrary values for a `w-[64%]` progress bar, sapphire blue ambient glow (`shadow-glow-blue`), and a custom display font.',
        'summaryId': 'Kamu telah menguasai arbitrary values dan ekstensi konfigurasi tema Tailwind. Minggu depan kita akan mendalami pola abstraksi komponen `@apply` dan persiapan proyek capstone!',
        'summaryEn': 'You have mastered arbitrary value syntax and Tailwind theme extensions. Next week, we explore component abstractions and prepare for our capstone project!',
    },
    {
        'week': 7,
        'level': 'advanced',
        'topicId': 'arsitektur-komponen-dan-reusabilitas',
        'titleId': 'Arsitektur Komponen: Ekstraksi UI & Pola Komposisi',
        'titleEn': 'Component Architecture: UI Extraction & Composition Patterns',
        'programId': 'Koleksi Komponen UI Reusable (Button, Badge, Avatar)',
        'programEn': 'Reusable UI Component Kit (Button, Badge, Avatar)',
        'levelNameId': 'Komponen Kustom, Desain Sistem & Produksi',
        'levelNameEn': 'Custom Components, Design Systems & Production',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Component Kit</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen p-8 flex items-center justify-center font-sans">

  <div class="max-w-2xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-slate-900">Tryngo UI Design System Kit</h2>
      <p class="text-sm text-slate-500">Pola komposisi komponen tombol, badge, dan avatar yang konsisten.</p>
    </div>

    <!-- 1. Varian Tombol (Primary, Secondary, Danger, Ghost) -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Varian Tombol</h3>
      <div class="flex flex-wrap gap-3">
        <!-- Primary -->
        <button class="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm">
          Tombol Utama
        </button>
        <!-- Secondary -->
        <button class="bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl border border-slate-300 transition-all shadow-sm">
          Sekunder
        </button>
        <!-- Danger -->
        <button class="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-red-600/20">
          Hapus Data
        </button>
        <!-- Ghost -->
        <button class="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all">
          Batal
        </button>
      </div>
    </div>

    <!-- 2. Varian Badges Status -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Badges Status</h3>
      <div class="flex flex-wrap gap-2.5">
        <span class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Operasional
        </span>
        <span class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pemeliharaan
        </span>
        <span class="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Gangguan
        </span>
      </div>
    </div>

    <!-- 3. Avatar Stack Group -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Grup Kontributor Aktif</h3>
      <div class="flex items-center -space-x-2 overflow-hidden">
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">BP</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">SR</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">AN</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-stone-800 flex items-center justify-center font-bold text-xs text-white">+5</div>
      </div>
    </div>
  </div>

</body>
</html>""",
        'objectivesId': [
            'Memahami kapan harus mengekstraksi kelas Tailwind dan kapan tetap menggunakan utilitas inline murni',
            'Membangun sistem varian tombol terpadu (Primary, Secondary, Danger, Ghost) dengan interaksi seragam',
            'Membuat badge status yang dilengkapi titik indikator bernyawa dengan Flexbox inline',
            'Membangun tumpukan avatar pengguna yang saling bertumpuk rapi menggunakan -space-x-2 dan ring-2 ring-white',
            'Mempersiapkan seluruh fondasi komponen untuk proyek akhir SaaS Dashboard',
        ],
        'objectivesEn': [
            'Determine when to extract Tailwind utility abstractions versus retaining inline atomic composition',
            'Architect a unified button variant system (Primary, Secondary, Danger, Ghost) with consistent interactions',
            'Construct status badges equipped with colored indicator dots using inline Flexbox',
            'Build overlapping user avatar stacks utilizing -space-x-2 and ring-2 ring-white',
            'Assemble component building blocks in preparation for the capstone SaaS Dashboard',
        ],
        'explanationId': """### Kapan Harus Mengekstraksi Komponen?
Salah satu kesalahan pemula di Tailwind adalah terlalu cepat membuat class `@apply` untuk setiap tombol. Di ekosistem modern (React, Vue, Svelte, Blade), cara terbaik menduplikasi komponen adalah **mengekstraknya menjadi komponen template atau komponen UI** (misal `<Button variant="primary">`), bukan membuat stylesheet CSS baru!

### Trik Tumpukan Avatar (-space-x-*)
Untuk membuat avatar profil yang saling bertumpuk seperti di GitHub atau Figma:
- Gunakan `-space-x-2` pada kontainer induk untuk memberikan margin horizontal negatif.
- Berikan `ring-2 ring-white` pada setiap avatar bundar agar ada batas garis putih bersih yang memisahkan tiap foto avatar.""",
        'explanationEn': """### When to Extract Components
A common anti-pattern is prematurely abstracting everything via `@apply` into CSS files. In modern component architectures (React, Vue, Svelte, Blade), component reusability is best achieved via **component abstractions** (`<Button variant="primary">`) rather than stylesheet indirection!

### Overlapping Avatar Stacks (-space-x-*)
To produce overlapping contributor circles common in modern SaaS:
- Apply negative horizontal spacing on the parent via `-space-x-2`.
- Apply `ring-2 ring-white` on circular avatars to carve a clean visual border separating adjacent portraits.""",
        'beginnerId': """### Analogi: Kartu Nama Perusahaan
1. **Varian Komponen** seperti kartu nama staf kantor: format ukurannya persis sama, jenis kertasnya sama, namun warnanya dibedakan antara Direktur (Emas), Manajer (Hijau), dan Tamu (Abu-abu).
2. **Avatar Stack** seperti barisan foto kartu identitas karyawan yang dijajarkan tumpang-tindih rapi di papan pengumuman lobi kantor.""",
        'beginnerEn': """### Analogy: Corporate ID Badges
1. **Component Variants** are corporate security badges: identical dimensions and lamination, but color-coded for Executive (Gold), Staff (Emerald), and Guest (Muted).
2. **Avatar Stacks** are employee ID photo badges fanned out neatly on an office display board.""",
        'experimentsId': [
            'Ubah -space-x-2 pada grup avatar menjadi -space-x-4 dan amati bagaimana avatar bertumpuk lebih rapat.',
            'Hapus ring-2 ring-white pada avatar dan perhatikan bagaimana avatar yang bertumpuk kehilangan garis pemisah bersihnya.',
            'Coba tambahkan varian tombol baru (Warning warna amber) dengan mencocokkan pola tombol yang ada.',
            'Ubah ukuran teks pada badge status menjadi text-sm dan amati penyesuaian padding yang serasi.',
        ],
        'experimentsEn': [
            'Adjust -space-x-2 to -space-x-4 to watch avatar portraits overlap more aggressively.',
            'Remove ring-2 ring-white to observe the loss of the clean separating border between overlapping circles.',
            'Author a new Warning button variant using amber tones following existing structural conventions.',
            'Scale badge typography to text-sm and adjust padding proportionally.',
        ],
        'challengeId': 'Bangun komponen kartu alert banner yang memiliki 3 varian (Success hijau, Info biru, Danger merah): masing-masing memiliki ikon di sebelah kiri, judul tebal, pesan deskripsi, dan tombol tutup silang di sebelah kanan.',
        'challengeEn': 'Build an alert banner component supporting 3 variants (Success green, Info blue, Danger red): each featuring a left icon, bold headline, descriptive body, and a right-aligned dismiss button.',
        'summaryId': 'Kamu telah menguasai arsitektur dan pola reusabilitas komponen di Tailwind. Minggu depan adalah proyek capstone: membangun aplikasi SaaS Landing Page & Interactive Dashboard lengkap dengan Dark Mode!',
        'summaryEn': 'You have mastered component architecture and reusable design kit patterns in Tailwind. Next week is the capstone project: constructing a complete SaaS Landing Page and Interactive Dashboard with Dark Mode!',
    },
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'proyek-akhir-saas-dashboard-lengkap',
        'titleId': 'Proyek Akhir: Aplikasi SaaS Landing & Interactive Dashboard',
        'titleEn': 'Capstone Project: Full SaaS Landing Page & Interactive Dashboard',
        'programId': 'Aplikasi SaaS Dashboard Lengkap dengan Dark Mode & Metrik',
        'programEn': 'Full-Featured SaaS Dashboard Application with Dark Mode & Analytics',
        'levelNameId': 'Komponen Kustom, Desain Sistem & Produksi',
        'levelNameEn': 'Custom Components, Design Systems & Production',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tryngo Cloud Platform — SaaS Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#F2F7F4',
              500: '#2E5B44',
              600: '#234735',
              800: '#172E22',
              900: '#0F1E16',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300">

  <!-- Layout Utama Dashboard: Sidebar + Main Content -->
  <div class="flex min-h-screen">
    
    <!-- Sidebar Navigasi -->
    <aside class="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
      <div class="space-y-8">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-brand-500/20">
            T
          </div>
          <div>
            <h1 class="font-bold text-base text-slate-900 dark:text-white leading-tight">Tryngo Cloud</h1>
            <span class="text-xs text-slate-400">Enterprise v3.8</span>
          </div>
        </div>

        <nav class="space-y-1">
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/40 text-brand-500 dark:text-emerald-400 font-semibold text-sm">
            <span>📊</span> Ikhtisar
          </a>
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
            <span>⚡</span> Klaster Server
          </a>
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
            <span>📦</span> Deployments
          </a>
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
            <span>⚙️</span> Pengaturan
          </a>
        </nav>
      </div>

      <!-- Info Profil User di Footer Sidebar -->
      <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-xs">BP</div>
          <div class="text-xs">
            <span class="font-bold block text-slate-900 dark:text-white">Budi Pratama</span>
            <span class="text-slate-400">Lead Architect</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Konten Utama Dashboard -->
    <div class="flex-1 flex flex-col min-w-0">
      
      <!-- Topbar Header -->
      <header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white">Ikhtisar Infrastruktur Cloud</h2>
        <div class="flex items-center gap-3">
          <button onclick="toggleDark()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold">
            🌓 Mode Tampilan
          </button>
          <button class="bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95">
            + Tambah Pod Baru
          </button>
        </div>
      </header>

      <!-- Area Scroll Konten -->
      <main class="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto">
        
        <!-- Baris Kartu Metrik Grid Responsif -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Request</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-slate-900 dark:text-white">4.82 Miliar</span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">+18.4%</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata Latensi</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-brand-500 dark:text-emerald-400">6.4 ms</span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">-2.1 ms</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Penggunaan Memori</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-slate-900 dark:text-white">42.8%</span>
              <span class="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">Optimal</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Status SLA 2026</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-slate-900 dark:text-white">99.99%</span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">Tier-4</span>
            </div>
          </div>
        </section>

        <!-- Tabel Aktivitas Cluster Terbaru -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 class="font-bold text-base text-slate-900 dark:text-white">Status Klaster Produksi Aktif</h3>
            <span class="text-xs font-semibold text-slate-500">Menampilkan 3 dari 12 node</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th class="px-6 py-4">Nama Instance</th>
                  <th class="px-6 py-4">Wilayah Data Center</th>
                  <th class="px-6 py-4">Beban CPU</th>
                  <th class="px-6 py-4">Status Layanan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">sgp-worker-node-01</td>
                  <td class="px-6 py-4 text-slate-500 dark:text-slate-400">Singapura (ap-southeast-1)</td>
                  <td class="px-6 py-4">
                    <div class="w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-emerald-500 h-full w-[35%]"></div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Berjalan Normal
                    </span>
                  </td>
                </tr>

                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">jkt-api-gateway-02</td>
                  <td class="px-6 py-4 text-slate-500 dark:text-slate-400">Jakarta (id-jkt-01)</td>
                  <td class="px-6 py-4">
                    <div class="w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-emerald-500 h-full w-[48%]"></div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Berjalan Normal
                    </span>
                  </td>
                </tr>

                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">jkt-db-replica-01</td>
                  <td class="px-6 py-4 text-slate-500 dark:text-slate-400">Jakarta (id-jkt-01)</td>
                  <td class="px-6 py-4">
                    <div class="w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-amber-500 h-full w-[82%]"></div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Re-Indexing Data
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  </div>

  <script>
    function toggleDark() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
</body>
</html>""",
        'objectivesId': [
            'Mengintegrasikan seluruh kurikulum Tailwind CSS dalam arsitektur SaaS Dashboard produksi lengkap',
            'Menyusun layout dua kolom (Sidebar Navigasi + Topbar + Main Scroll) yang responsif dan fleksibel',
            'Menerapkan sistem Dark Mode yang menyeluruh pada tabel data, kartu metrik, sidebar, dan header',
            'Menata tabel data aktivitas cluster dengan status badge dan bar persentase utilisasi visual',
            'Memastikan pengalaman pengguna yang mulus di ponsel (sidebar collapse otomatis) hingga desktop lebar',
        ],
        'objectivesEn': [
            'Synthesize the complete Tailwind CSS curriculum within an enterprise-grade SaaS Dashboard application',
            'Construct a two-column responsive workspace (Sidebar Navigation + Topbar + Scrollable Main Content)',
            'Deploy exhaustive Dark Mode theming across data tables, metric grids, sidebars, and application chrome',
            'Render real-time cluster telemetry tables equipped with status badges and visual capacity bars',
            'Guarantee seamless responsiveness from mobile viewports (collapsing sidebars) up to 4K displays',
        ],
        'explanationId': """### Arsitektur SaaS Dashboard Modern
Aplikasi dashboard produksi ini menggabungkan seluruh keahlian Tailwind yang dipelajari:
1. **Layout Induk Terpadu**: Menggunakan `flex min-h-screen` dengan sidebar `hidden md:flex` yang otomatis tersembunyi rapi di layar ponsel sempit.
2. **Kesesuaian Tema Menyeluruh**: Setiap elemen memiliki pasangan kelas mode terang dan gelap (`bg-white dark:bg-slate-900`, `text-slate-900 dark:text-white`).
3. **Data Grid & Tabular Responsif**: Kartu metrik menggunakan `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` dan tabel dibungkus dengan `overflow-x-auto` agar tidak pernah merusak layout saat dibuka di layar ponsel.
4. **Mikro-Interaksi Tactile**: Tombol dilengkapi `active:scale-95` dan baris tabel memiliki `hover:bg-slate-50 transition-colors`.""",
        'explanationEn': """### Production SaaS Dashboard Architecture
This capstone dashboard unites all core Tailwind competencies:
1. **Master Workspace Shell**: Leverages `flex min-h-screen` paired with `hidden md:flex` to collapse sidebars gracefully on mobile viewports.
2. **Comprehensive Thematic Parity**: Every structural surface defines paired light/dark variants (`bg-white dark:bg-slate-900`, `text-slate-900 dark:text-white`).
3. **Responsive Grids & Overflow Containment**: Metric cards leverage `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, while data tables declare `overflow-x-auto` to protect mobile boundaries.
4. **Tactile Micro-Interactions**: Buttons declare `active:scale-95` depression, while table rows feature buttery `hover:bg-slate-50 transition-colors` feedback.""",
        'beginnerId': """### Analogi: Ruang Kontrol Pusat Penerbangan Antariksa
Dashboard ini seperti ruang pusat kendali misi NASA:
- Di sisi kiri ada panel navigasi utama untuk memilih modul roket (**Sidebar**).
- Di layar depan ada indikator kecepatan, suhu, dan bahan bakar real-time (**Kartu Metrik Grid**).
- Di meja bawah ada daftar log aktivitas seluruh astronot di stasiun luar angkasa (**Tabel Data**).
- Saat lampu ruangan dimatikan untuk mode malam, seluruh layar otomatis meredup nyaman di mata tanpa silau (**Tailwind Dark Mode**).""",
        'beginnerEn': """### Analogy: Mission Control Center
This dashboard is an aerospace flight director's console:
- The left bay houses module flight navigation panels (**Sidebar Navigation**).
- Heads-up displays expose telemetry velocity, temperature, and fuel levels (**Metric Grid Cards**).
- Telemetry consoles stream real-time orbital cluster logs (**Tabular Data Tables**).
- Engaging night-shift lighting smoothly dims all monitors without blinding pilots (**Tailwind Dark Mode**).""",
        'experimentsId': [
            'Buka dashboard ini di browser, klik tombol Mode Tampilan, dan nikmati transformasi tema gelap kelas enterprise.',
            'Kecilkan jendela browser ke ukuran ponsel dan amati sidebar yang otomatis tersembunyi rapi agar konten tabel tetap nyaman dibaca.',
            'Arahkan kursor mouse ke baris-baris tabel dan perhatikan efek hover highlight yang sangat halus.',
            'Coba ubah warna brand di tailwind.config menjadi palet warna ungu atau oranye dan lihat seluruh dashboard berganti identitas seketika.',
        ],
        'experimentsEn': [
            'Open the dashboard in browser, toggle Dark Mode, and evaluate the enterprise dark palette.',
            'Resize down to mobile viewport dimensions and observe the sidebar collapsing cleanly to prioritize data visibility.',
            'Hover over table rows to test the subtle highlight transitions.',
            'Modify the brand palette in tailwind.config to purple or amber to witness instant global brand re-skinning.',
        ],
        'challengeId': 'Tambahkan panel laci notifikasi geser (Notifications Slide-Over) di sisi kanan dashboard: sertakan daftar 4 aktivitas peringatan sistem, tombol "Tandai Semua Sudah Dibaca", dan tombol tutup silang.',
        'challengeEn': 'Add a sliding Notifications Drawer to the right perimeter of this dashboard: feature a 4-item system alert log, a "Mark all as read" button, and an accessible close trigger.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum Tailwind CSS dari nol hingga menghasilkan aplikasi SaaS Dashboard kelas produksi. Kamu sekarang siap melangkah ke JavaScript untuk menghidupkan seluruh logika aplikasi secara dinamis!',
        'summaryEn': 'Congratulations! You have completed the entire Tailwind CSS curriculum from zero to a production SaaS Dashboard application. You are now prepared to advance to JavaScript to power full dynamic application programming logic!',
    },
]

def get_track():
    return {
        'slug': 'tailwind',
        'track_name': 'Tailwind CSS',
        'levels': LEVELS,
        'modules': MODULES,
    }
