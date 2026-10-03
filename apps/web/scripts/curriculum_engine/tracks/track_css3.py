# CSS3 Track: 10 Weeks (3 Levels)
# Final Product: Modern E-Commerce UI System with Flexbox, CSS Grid, Fluid Typography, Dark Mode Tokens, and Micro-animations

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Pondasi Box Model & Flexbox',
        'nameEn': 'Box Model & Flexbox Foundations',
        'descId': 'Menguasai model kotak kalkulasi browser, spesifisitas CSS, variabel custom properties, dan tata letak satu dimensi dengan Flexbox.',
        'descEn': 'Master the browser box calculation model, CSS specificity, custom properties, and 1D layout styling with Flexbox.',
    },
    {
        'levelId': 'intermediate',
        'nameId': 'CSS Grid & Sistem Responsif Modern',
        'nameEn': 'CSS Grid & Modern Responsive Systems',
        'descId': 'Tata letak dua dimensi tingkat lanjut, fluid typography dengan clamp(), positioning context, dan media queries presisi.',
        'descEn': 'Advanced 2D layout architecture, fluid typography via clamp(), positioning context, and precision media queries.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Design System, Animasi & Fitur Mutakhir',
        'nameEn': 'Design Systems, Animations & Modern Features',
        'descId': 'Arsitektur token warna modern OKLCH, Dark Mode sistemik, animasi keyframes mikro-interaktif, dan container queries.',
        'descEn': 'Modern OKLCH color token architecture, systemic Dark Mode, micro-interactive keyframe animations, and container queries.',
    },
]

MODULES = [
    # Level 1: Pondasi Box Model & Flexbox (Weeks 1-3)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'box-model-dan-variabel-css',
        'titleId': 'Modern Box Model, Spesifisitas & CSS Custom Properties',
        'titleEn': 'Modern Box Model, Specificity & CSS Custom Properties',
        'programId': 'Kartu Komponen UI dengan Perhitungan Dimensi Presisi',
        'programEn': 'UI Component Card with Precision Box Sizing',
        'levelNameId': 'Pondasi Box Model & Flexbox',
        'levelNameEn': 'Box Model & Flexbox Foundations',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pondasi Box Model & Variabel CSS</title>
  <style>
    /* 1. Global Reset & Box Sizing */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* 2. Design Tokens via Custom Properties (:root) */
    :root {
      --color-brand-primary: #2E5B44;
      --color-brand-accent: #E34F26;
      --color-surface-bg: #F4F2ED;
      --color-surface-card: #FFFFFF;
      --color-text-main: #1A1A1A;
      --color-text-muted: #666666;
      --radius-md: 16px;
      --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.08);
      --space-unit: 8px;
    }

    body {
      background-color: var(--color-surface-bg);
      color: var(--color-text-main);
      font-family: system-ui, -apple-system, sans-serif;
      padding: calc(var(--space-unit) * 4);
    }

    /* 3. Komponen Card dengan Box Model Terkendali */
    .pricing-card {
      background-color: var(--color-surface-card);
      border: 2px solid var(--color-brand-primary);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      max-width: 360px;
      padding: calc(var(--space-unit) * 3); /* 24px */
    }

    .pricing-badge {
      display: inline-block;
      background-color: var(--color-brand-primary);
      color: #FFFFFF;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: calc(var(--space-unit) * 2);
    }

    .pricing-card h2 {
      font-size: 1.5rem;
      margin-bottom: var(--space-unit);
    }

    .pricing-price {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-brand-primary);
      margin-bottom: calc(var(--space-unit) * 2);
    }

    .pricing-btn {
      display: block;
      width: 100%;
      background-color: var(--color-brand-primary);
      color: #FFFFFF;
      border: none;
      padding: 12px 20px;
      font-weight: 600;
      border-radius: calc(var(--radius-md) / 2);
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="pricing-card">
    <span class="pricing-badge">Paket Pro</span>
    <h2>Pengembangan Web</h2>
    <p class="pricing-price">Rp 499.000<small>/bln</small></p>
    <p style="color: var(--color-text-muted); margin-bottom: 24px;">Akses penuh ke seluruh 28 kurikulum teknologi dan lingkungan playground interaktif.</p>
    <button class="pricing-btn">Mulai Belajar Sekarang</button>
  </div>
</body>
</html>""",
        'objectivesId': [
            'Menerapkan universal reset box-sizing: border-box untuk mencegah pertambahan ukuran elemen tak terduga',
            'Memahami anatomi 4 lapisan Box Model: Content, Padding, Border, dan Margin (beserta margin collapsing)',
            'Mendefinisikan dan mengonsumsi CSS Custom Properties (Variables) di tingkat :root',
            'Menghitung dimensi dan jarak dinamis menggunakan fungsi kalkulasi calc()',
            'Memahami rumus kalkulasi spesifisitas selektor CSS (Inline > ID > Class/Attr/Pseudo > Elemen)',
        ],
        'objectivesEn': [
            'Enforce the universal box-sizing: border-box reset to eliminate unexpected layout expansions',
            'Master the four Box Model boundaries: Content, Padding, Border, and Margin (including margin collapse)',
            'Declare and consume reusable CSS Custom Properties at the :root scope',
            'Compute responsive dimensions dynamically using CSS calc() functions',
            'Understand CSS selector specificity hierarchy (Inline > ID > Class/Attr/Pseudo > Tag)',
        ],
        'explanationId': """### Revolusi box-sizing: border-box
Secara default, browser menggunakan `content-box`, di mana padding dan border akan **ditambahkan** ke lebar elemen (elemen dengan width 100px + padding 20px + border 2px akan menjadi 144px). Dengan `box-sizing: border-box`, lebar elemen terkunci tepat sesuai nilai `width` yang ditentukan, dan padding/border dihitung ke arah dalam.

### Anatomi 4 Lapisan Box Model
1. **Content**: Area inti tempat teks, gambar, atau elemen anak ditampilkan.
2. **Padding**: Ruang transparan di dalam elemen yang memisahkan konten dari border.
3. **Border**: Garis tepi luar yang membingkai elemen dan padding.
4. **Margin**: Ruang kosong transparan di luar border yang memisahkan elemen ini dari elemen tetangganya. *Catatan:* Margin vertikal pada elemen bertetangga dapat mengalami *margin collapsing* (hanya margin terbesar yang berlaku).

### CSS Custom Properties (:root)
Variabel CSS dideklarasikan dengan awalan dua tanda minus (misal `--color-brand-primary: #2E5B44`). Menempatkannya di pseudo-class `:root` membuatnya dapat diakses secara global di seluruh dokumen melalui fungsi `var(--nama-variabel)`.""",
        'explanationEn': """### The box-sizing: border-box Paradigm
Under the default `content-box` model, padding and borders expand beyond the stated width (a 100px element with 20px padding and 2px border renders at 144px). The universal `box-sizing: border-box` rule locks outer boundaries to stated dimensions, calculating padding and borders inward.

### The Four Box Model Boundaries
1. **Content**: The core bounding rectangle where text and children reside.
2. **Padding**: Transparent inner breathing room separating content from borders.
3. **Border**: The visual frame enclosing content and padding.
4. **Margin**: External clearance separating the element from sibling nodes. Note that adjacent vertical margins collapse into a single shared gap.

### CSS Custom Properties (:root)
Variables are declared with two dashes (e.g. `--color-brand-primary: #2E5B44`). Declaring them on the `:root` pseudo-class grants global cascade availability through the `var()` consumption function.""",
        'beginnerId': """### Analogi: Mengemas Bingkai Foto
Bayangkan elemen HTML seperti lukisan berbingkai:
1. **Content** adalah kanvas lukisannya sendiri.
2. **Padding** adalah bingkai karton putih (*matting*) yang mengelilingi lukisan agar lukisan terlihat lega.
3. **Border** adalah bingkai kayu keras di sekelilingnya.
4. **Margin** adalah jarak kosong di dinding tembok antara bingkai lukisan Anda dengan lukisan tetangga di sebelahnya.
5. **`border-box`** seperti memesan bingkai dengan ukuran pas pigura luar: jika pigura 30x30 cm, maka kayu dan karton dihitung ke dalam, bukan membengkak jadi 40x40 cm.""",
        'beginnerEn': """### Analogy: A Framed Canvas Painting
Think of an HTML element as a framed wall portrait:
1. **Content** is the actual painted artwork canvas.
2. **Padding** is the decorative white matting border between the canvas and the frame.
3. **Border** is the physical wooden frame encasing the artwork.
4. **Margin** is the blank wall space between your painting and the clock hanging next to it.
5. **`border-box`** guarantees that when you purchase a 30x30 cm frame, it fits the designated 30x30 cm shelf space without expanding outward.""",
        'experimentsId': [
            'Hapus aturan global box-sizing: border-box dan amati bagaimana lebar tombol atau kartu melompat bertambah besar dari nilai aslinya.',
            'Ubah nilai --color-brand-primary di :root menjadi warna biru (#1572B6) dan saksikan seluruh komponen berubah serentak dalam satu detik.',
            'Tempatkan dua paragraf bertetangga dengan margin-bottom: 30px dan margin-top: 20px, lalu ukur jarak antar paragraf (hanya 30px karena margin collapse).',
            'Beri nilai fallback pada variabel: var(--warna-palsu, #333333) dan amati bagaimana browser menggunakan warna cadangan.',
        ],
        'experimentsEn': [
            'Remove the universal border-box reset and observe elements unexpectedly overflowing their parent containers.',
            'Change the --color-brand-primary hex value at :root and witness all dependent components re-skin instantly.',
            'Place two sibling paragraphs with margin-bottom: 30px and margin-top: 20px to observe vertical margin collapsing into 30px.',
            'Supply fallback parameters to variables like var(--undefined-token, #333333) and verify fallback resolution.',
        ],
        'challengeId': 'Rancang sistem kartu metrik analitik dashboard: buat variabel untuk warna teks, latar belakang, dan border di `:root`. Terapkan `box-sizing: border-box`, padding 20px, border-radius 12px, serta gunakan `calc()` untuk menghitung margin dinamis.',
        'challengeEn': 'Architect a dashboard analytics metric card: declare tokens for text, background, and borders at `:root`. Enforce `box-sizing: border-box`, 20px padding, 12px border-radius, and utilize `calc()` to compute dynamic spacing.',
        'summaryId': 'Kamu telah menguasai model kotak browser modern, eliminasi bug kalkulasi dimensi, dan pengelolaan variabel desain CSS. Minggu depan kita akan mempelajari Flexbox untuk penataan tata letak satu dimensi.',
        'summaryEn': 'You have mastered the modern browser box model, layout shift elimination, and CSS variable architectures. Next week, we dive into one-dimensional Flexbox layout choreography.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'flexbox-fondasi-dan-penjajaran',
        'titleId': 'Flexbox: Sumbu Utama, Sumbu Silang & Penjajaran Presisi',
        'titleEn': 'Flexbox: Main Axis, Cross Axis & Precision Alignment',
        'programId': 'Bilah Navigasi Responsif & Deretan Kartu Fitur dengan Flexbox',
        'programEn': 'Responsive Navbar & Feature Card Row with Flexbox',
        'levelNameId': 'Pondasi Box Model & Flexbox',
        'levelNameEn': 'Box Model & Flexbox Foundations',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flexbox Alignment Mastery</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F8F9FA;
      --card-bg: #FFFFFF;
      --text: #212529;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
    }

    /* 1. Header dengan Flexbox Auto-Margin Spacing */
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--card-bg);
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      margin-bottom: 32px;
    }

    .nav-links {
      display: flex;
      list-style: none;
      gap: 24px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: var(--text);
      font-weight: 500;
      transition: color 0.2s ease;
    }

    .nav-links a:hover {
      color: var(--primary);
    }

    .btn-login {
      background: var(--primary);
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    /* 2. Flexbox Grid Pembungkus Kartu */
    .features-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
    }

    .feature-card {
      background: var(--card-bg);
      flex: 1 1 calc(33.333% - 20px);
      min-width: 260px;
      padding: 24px;
      border-radius: 12px;
      border-top: 4px solid var(--primary);
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .feature-card h3 { margin-bottom: 8px; font-size: 1.25rem; }
    .feature-card p { color: #6C757D; margin-bottom: 16px; flex-grow: 1; }
    .feature-card a { color: var(--primary); font-weight: 600; text-decoration: none; }
  </style>
</head>
<body>
  <header class="app-header">
    <div class="logo"><strong>Tryngo</strong> Platform</div>
    <ul class="nav-links">
      <li><a href="#">Katalog</a></li>
      <li><a href="#">Kurikulum</a></li>
      <li><a href="#">Roadmap</a></li>
    </ul>
    <button class="btn-login">Masuk Akun</button>
  </header>

  <main>
    <section class="features-container">
      <article class="feature-card">
        <h3>Eksekusi Kode WASM</h3>
        <p>Jalankan kode Go dan compiler modern langsung di dalam browser pengguna tanpa ketergantungan server.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
      <article class="feature-card">
        <h3>Kurikulum Berbasis Produk</h3>
        <p>Setiap modul dirancang dari fundamental hingga menghasilkan produk perangkat lunak kelas produksi.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
      <article class="feature-card">
        <h3>Kuis Interaktif Otomatis</h3>
        <p>Evaluasi pemahaman konsep dengan ribuan bank soal pilihan ganda dan validasi sintaks instan.</p>
        <a href="#">Pelajari Selengkapnya &rarr;</a>
      </article>
    </section>
  </main>
</body>
</html>""",
        'objectivesId': [
            'Memahami konsep Sumbu Utama (Main Axis) dan Sumbu Silang (Cross Axis) pada Flexbox',
            'Mengontrol distribusi ruang di sumbu utama dengan justify-content (center, space-between, space-around)',
            'Mengatur perataan vertikal elemen anak dengan align-items dan align-self',
            'Menerapkan sifat responsive wrapping dengan flex-wrap: wrap dan properti modern gap',
            'Memahami rumus shorthand flex: flex-grow, flex-shrink, dan flex-basis',
        ],
        'objectivesEn': [
            'Differentiate between Main Axis and Cross Axis dynamics across flex-direction variations',
            'Distribute free space along the main axis using justify-content (center, space-between, space-around)',
            'Govern cross-axis alignment using align-items and individual align-self overrides',
            'Enable responsive item wrapping using flex-wrap: wrap paired with the gap property',
            'Master the shorthand flex triplet: flex-grow, flex-shrink, and flex-basis',
        ],
        'explanationId': """### Sumbu Utama (Main Axis) vs Sumbu Silang (Cross Axis)
Saat sebuah container diberi `display: flex`:
- Nilai default `flex-direction: row` menetapkan sumbu utama secara horizontal (kiri ke kanan) dan sumbu silang secara vertikal (atas ke bawah).
- Jika diubah ke `flex-direction: column`, arah sumbu tertukar: sumbu utama menjadi vertikal dan sumbu silang menjadi horizontal.

### Penjajaran Elemen
- `justify-content`: Mengatur posisi dan distribusi sisa ruang di sepanjang **sumbu utama** (misal `space-between` mendorong elemen ke ujung kiri dan kanan).
- `align-items`: Menyelaraskan seluruh elemen anak di sepanjang **sumbu silang** (misal `center` untuk menempatkan pas di tengah vertikal).
- `align-self`: Memungkinkan salah satu elemen anak memiliki perataan sumbu silang yang berbeda dari saudara-saudaranya.

### Shorthand flex: grow, shrink, basis
- `flex-grow`: Seberapa banyak elemen akan meregang untuk mengisi sisa ruang kosong jika ada (default 0).
- `flex-shrink`: Seberapa agresif elemen menyusut saat ruang sempit (default 1).
- `flex-basis`: Ukuran awal elemen sebelum sisa ruang didistribusikan (misal `calc(33.333% - 20px)`).""",
        'explanationEn': """### Main Axis vs Cross Axis Mechanics
Activating `display: flex` establishes two perpendicular axes:
- The default `flex-direction: row` runs the Main Axis horizontally and the Cross Axis vertically.
- Flipping to `flex-direction: column` transposes them: Main Axis becomes vertical, Cross Axis horizontal.

### Alignment Properties
- `justify-content`: Dictates spatial distribution along the **main axis** (e.g. `space-between` pushes first/last items to extreme perimeters).
- `align-items`: Dictates alignment across the **cross axis** (e.g. `center` locks items at mid-height).
- `align-self`: Grants individual children permission to override parent cross-axis alignment.

### The Flex Sizing Triplet: Grow, Shrink, Basis
- `flex-grow`: Proportion of available remaining space absorbed by this item (default 0).
- `flex-shrink`: Willingness to contract when container geometry contracts (default 1).
- `flex-basis`: Initial size threshold prior to free-space allocation.""",
        'beginnerId': """### Analogi: Rak Keranjang Supermarket
1. **`display: flex`** seperti meletakkan satu baris keranjang belanja di ban berjalan kasir.
2. **`flex-direction: row`** menyusun keranjang berjejer ke samping, sedangkan `column` menumpuk keranjang ke atas.
3. **`justify-content: space-between`** seperti kasir yang mendorong barang pertama ke ujung depan dan barang terakhir ke ujung belakang ban berjalan.
4. **`align-items: center`** memastikan barang-barang belanjaan dengan tinggi berbeda (botol sirup dan kotak sabun) dijajarkan tepat di garis tengah ban berjalan.
5. **`gap: 20px`** adalah jarak aman antar barang agar telur tidak bertabrakan dengan semangka.""",
        'beginnerEn': """### Analogy: Supermarket Conveyor Belt
1. **`display: flex`** transforms a container into an automated supermarket conveyor belt.
2. **`flex-direction: row`** arranges items side by side; `column` stacks items vertically.
3. **`justify-content: space-between`** pushes the frontmost cereal box to the cashier and the rearmost carton to the shopper.
4. **`align-items: center`** aligns items of disparate heights (tall soda bottles and flat butter tins) along their exact horizontal centerlines.
5. **`gap: 20px`** is the cushioned gap ensuring eggs do not collide with heavy canned goods.""",
        'experimentsId': [
            'Ubah justify-content: space-between pada header menjadi center, dan amati seluruh menu dan logo berkumpul di tengah layar.',
            'Hapus flex-wrap: wrap pada kontainer fitur, lalu kecilkan jendela browser untuk melihat kartu-kartu terhimpit sempit.',
            'Coba ubah align-items: center menjadi flex-start atau stretch dan amati perubahan tinggi visual antar komponen.',
            'Tambahkan margin-left: auto pada elemen navigasi untuk melihat trik legendaris mendorong elemen ke ujung kanan secara instan.',
        ],
        'experimentsEn': [
            'Change justify-content: space-between to center on the header to see all items collapse into the middle.',
            'Remove flex-wrap: wrap and resize browser to mobile width to watch items compress unnaturally.',
            'Switch align-items: center to stretch and observe how items automatically match the tallest sibling.',
            'Apply margin-left: auto to a navigation item to observe the classic Flexbox right-push behavior.',
        ],
        'challengeId': 'Bangun bilah status pemutar musik (audio player bar) menggunakan Flexbox: di sisi kiri ada info lagu (cover thumbnail + judul), di tengah ada tombol kontrol (play, pause, next) di posisi pas tengah layar, dan di sisi kanan ada pengatur volume suara.',
        'challengeEn': 'Construct an audio player bar with Flexbox: left side houses album art and song title, center houses playback controls precisely centered, and right side holds volume controls.',
        'summaryId': 'Kamu telah menguasai pengaturan sumbu, distribusi ruang, dan penjajaran presisi dengan Flexbox satu dimensi. Minggu depan kita akan mendalami pola tata letak dua dimensi tingkat lanjut dengan CSS Grid.',
        'summaryEn': 'You have mastered axis control, space distribution, and flex item alignment. Next week, we expand into two-dimensional layout orchestration with CSS Grid.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'pola-layout-komponen-lanjutan',
        'titleId': 'Pola Tata Letak Komponen: Sticky, Aspect-Ratio & Flexbox Bertingkat',
        'titleEn': 'Component Layout Patterns: Sticky, Aspect-Ratio & Nested Flex',
        'programId': 'Halaman Detail Produk E-Commerce dengan Sidebar Sticky',
        'programEn': 'E-Commerce Product Detail Page with Sticky Sidebar',
        'levelNameId': 'Pondasi Box Model & Flexbox',
        'levelNameEn': 'Box Model & Flexbox Foundations',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Detail Produk — Nusa Store</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F4F2ED;
      --surface: #FFFFFF;
      --border: #E5E5E5;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      padding: 32px 16px;
    }

    /* Layout 2 Kolom dengan Flexbox */
    .product-page-layout {
      max-width: 1080px;
      margin: 0 auto;
      display: flex;
      gap: 32px;
      align-items: flex-start; /* Syarat mutlak agar sticky berfungsi */
    }

    /* Kolom Utama Konten */
    .main-gallery {
      flex: 1 1 65%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .image-placeholder {
      width: 100%;
      aspect-ratio: 16 / 9; /* Menjaga proporsi visual modern */
      background: #D9D9D9;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #666;
    }

    .product-description {
      background: var(--surface);
      padding: 28px;
      border-radius: 16px;
      line-height: 1.6;
    }

    /* Kolom Sidebar Ringkasan Pembelian Sticky */
    .sticky-checkout-sidebar {
      flex: 1 1 35%;
      position: sticky;
      top: 24px; /* Menempel saat scroll mencapai 24px dari atas */
      background: var(--surface);
      padding: 28px;
      border-radius: 16px;
      border: 1px solid var(--border);
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
    }

    .sticky-checkout-sidebar h2 { font-size: 1.4rem; margin-bottom: 8px; }
    .price-tag { font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 20px; }

    .btn-buy {
      display: block;
      width: 100%;
      background: var(--primary);
      color: white;
      text-align: center;
      padding: 14px;
      font-weight: 700;
      border-radius: 10px;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="product-page-layout">
    <div class="main-gallery">
      <div class="image-placeholder">Foto Produk Utama (16:9 Aspect Ratio)</div>
      <div class="product-description">
        <h1>Laptop Rekayasa Ultralight Pro 14"</h1>
        <p>Dirancang khusus untuk software developer: prosesor 12-core, RAM 32GB LPDDR5X, layar OLED kalibrasi warna 100% DCI-P3, dan bobot hanya 1.1 kilogram.</p>
        <p style="margin-top: 16px;">Sasis aluminium unibody dengan manajemen termal dua kipas mikro untuk pendinginan stabil saat kompilasi proyek besar berlangsung.</p>
      </div>
      <div class="image-placeholder">Foto Detail Port & Keyboard Ergonomis</div>
      <div class="product-description">
        <h3>Ulasan Benchmark</h3>
        <p>Waktu kompilasi Linux kernel 40% lebih kencang dibanding generasi sebelumnya dengan daya tahan baterai hingga 14 jam kerja aktif.</p>
      </div>
    </div>

    <aside class="sticky-checkout-sidebar">
      <h2>Ringkasan Pesanan</h2>
      <div class="price-tag">Rp 19.999.000</div>
      <p style="color: #666; margin-bottom: 24px;">Stok tersedia di gudang Jakarta. Garansi resmi 2 tahun servis dan penggantian suku cadang.</p>
      <a href="#" class="btn-buy">Beli Sekarang</a>
    </aside>
  </div>
</body>
</html>""",
        'objectivesId': [
            'Menguasai position: sticky dan memahami syarat induk kontainer (align-items: flex-start)',
            'Mempertahankan rasio aspek gambar/video tanpa lonjakan layout menggunakan aspect-ratio',
            'Menyusun struktur tata letak bertingkat (nested flexbox) untuk UI aplikasi nyata',
            'Menghindari jebakan overflow: hidden pada kontainer induk yang membatalkan efek sticky',
            'Membuat sidebar e-commerce yang tetap terlihat selama pengguna membaca deskripsi produk',
        ],
        'objectivesEn': [
            'Implement position: sticky while fulfilling layout prerequisites (align-items: flex-start)',
            'Guarantee visual proportions without layout distortion using aspect-ratio',
            'Nest Flexbox hierarchies cleanly to model real-world application views',
            'Avoid overflow: hidden ancestors that break sticky positioning contexts',
            'Construct an e-commerce checkout sidebar that tracks scroll progression alongside long copy',
        ],
        'explanationId': """### Cara Kerja position: sticky
Elemen dengan `position: sticky` berperilaku seperti `position: relative` di dalam alur normal halaman, sampai scroll jendela mencapai batas offset yang ditentukan (`top: 24px`), di mana elemen tersebut berubah menjadi seperti `fixed` di dalam batas kontainer induknya.

### Syarat Wajib Sticky Berfungsi
1. Harus ada nilai offset, minimal `top`, `bottom`, `left`, atau `right`.
2. Kontainer induk harus memiliki tinggi yang lebih besar dari elemen sticky.
3. Pada flex container, nilai default `align-items: stretch` membuat semua kolom sama tinggi sehingga sticky tidak punya ruang geser. Developer harus menyetel `align-items: flex-start`.
4. Tidak boleh ada elemen leluhur dengan `overflow: hidden`, `overflow: auto`, atau `overflow: scroll`.

### Properti aspect-ratio Modern
Properti `aspect-ratio: 16 / 9` memungkinkan elemen mempertahankan rasio aspek lebarnya secara otomatis tanpa trik padding-top persentase jadul.""",
        'explanationEn': """### Mechanics of position: sticky
An element declared `position: sticky` behaves as `position: relative` within standard flow until the scroll boundary reaches a designated threshold (`top: 24px`), at which point it pins within its parent envelope.

### Mandatory Rules for Sticky Execution
1. A directional offset must be declared (at least `top`, `bottom`, `left`, or `right`).
2. The enclosing parent container must have remaining scrollable height beyond the sticky item.
3. In a flex context, default `align-items: stretch` equalizes column heights, preventing sticky travel. Specify `align-items: flex-start`.
4. No ancestor element may declare `overflow: hidden`, `auto`, or `scroll`.

### The Modern aspect-ratio Property
`aspect-ratio: 16 / 9` instructs the browser engine to compute heights from dynamic widths automatically, replacing legacy percentage padding hacks.""",
        'beginnerId': """### Analogi: Magnet Kulkas pada Papan Tulis
1. **`position: sticky`** seperti menempelkan magnet memo belanjaan di papan tulis: saat Anda menggulir kertas papan tulis ke atas, magnet akan diam terbawa sampai menyentuh batas atas bingkai mata Anda, lalu menempel diam di situ selama kertas masih ada di bawahnya.
2. **`aspect-ratio: 16 / 9`** seperti layar televisi bioskop: berapapun lebar tembok kamar Anda, tinggi layar selalu otomatis menyesuaikan proporsional agar gambar tidak gepeng atau lonjong.""",
        'beginnerEn': """### Analogy: A Refrigerator Memo Magnet
1. **`position: sticky`** is like a memo magnet on a whiteboard: as you roll a long canvas upward, the magnet travels with the paper until hitting the top edge, where it pins and stays visible as long as the canvas continues underneath.
2. **`aspect-ratio: 16 / 9`** is a widescreen television: regardless of room dimensions, height calculates proportionally so actors never appear stretched or squashed.""",
        'experimentsId': [
            'Hapus align-items: flex-start pada .product-page-layout dan amati mengapa sidebar sticky mendadak berhenti menempel saat di-scroll.',
            'Ubah nilai top: 24px menjadi top: 0, lalu perhatikan bagaimana sidebar menempel pas di bibir paling atas layar.',
            'Coba ubah aspect-ratio: 16 / 9 menjadi 1 / 1 (bujur sangkar) dan perhatikan placeholder gambar yang langsung menjadi kotak persegi.',
            'Beri overflow: hidden pada body dan amati bagaimana efek sticky seketika lumpuh total.',
        ],
        'experimentsEn': [
            'Delete align-items: flex-start and observe the sticky sidebar failing to pin because parent height equals item height.',
            'Modify top: 24px to top: 0 to observe the element pinning flush against the top edge of the viewport.',
            'Switch aspect-ratio: 16 / 9 to 1 / 1 and watch the placeholder transform into an exact square.',
            'Add overflow: hidden to body and verify that sticky scrolling ceases to function.',
        ],
        'challengeId': 'Buat layout artikel blog: di sisi kiri terdapat artikel panjang dengan beberapa gambar, dan di sisi kanan terdapat bilah "Daftar Isi" (Table of Contents) yang menempel menggunakan `position: sticky; top: 32px` dengan tombol kembali ke atas.',
        'challengeEn': 'Build a blog reading view: left column contains long copy with imagery, right column hosts a "Table of Contents" navigation box pinned with `position: sticky; top: 32px` and a back-to-top button.',
        'summaryId': 'Kamu telah menguasai pola komponen lanjutan, aspek rasio modern, dan mekanisme sticky. Minggu depan kita memasuki Level 2: arsitektur tata letak dua dimensi tingkat lanjut dengan CSS Grid.',
        'summaryEn': 'You have mastered advanced component patterns, modern aspect ratios, and sticky contexts. Next week we enter Level 2: two-dimensional layout orchestration with CSS Grid.',
    },
    # Level 2: CSS Grid & Sistem Responsif Modern (Weeks 4-6)
    {
        'week': 4,
        'level': 'intermediate',
        'topicId': 'css-grid-fondasi-dan-areas',
        'titleId': 'CSS Grid: Tata Letak Dua Dimensi, Unit Fr & Template Areas',
        'titleEn': 'CSS Grid: 2D Layouts, Fr Units & Grid Template Areas',
        'programId': 'Dashboard Kompleks dengan CSS Grid Template Areas',
        'programEn': 'Complex Application Dashboard with Grid Template Areas',
        'levelNameId': 'CSS Grid & Sistem Responsif Modern',
        'levelNameEn': 'CSS Grid & Modern Responsive Systems',
        'language': 'html',
        'code': '''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid Master Dashboard</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F0F2F5;
      --surface: #FFFFFF;
      --text: #1E293B;
      --border: #E2E8F0;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 16px;
    }

    /* Layout Dashboard 2D dengan CSS Grid */
    .dashboard-grid {
      display: grid;
      min-height: calc(100vh - 32px);
      gap: 16px;
      grid-template-columns: 240px 1fr 300px;
      grid-template-rows: 64px 1fr 48px;
      grid-template-areas:
        "header  header  header"
        "sidebar content stats"
        "footer  footer  footer";
    }

    .grid-header  { grid-area: header;  background: var(--surface); border-radius: 12px; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border); }
    .grid-sidebar { grid-area: sidebar; background: var(--surface); border-radius: 12px; padding: 20px; border: 1px solid var(--border); }
    .grid-content { grid-area: content; background: var(--surface); border-radius: 12px; padding: 24px; border: 1px solid var(--border); overflow-y: auto; }
    .grid-stats   { grid-area: stats;   background: var(--surface); border-radius: 12px; padding: 20px; border: 1px solid var(--border); }
    .grid-footer  { grid-area: footer;  background: var(--surface); border-radius: 12px; padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; color: #64748B; border: 1px solid var(--border); }

    /* Nested Grid Responsif untuk Metrik */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }

    .metric-card {
      background: var(--bg);
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid var(--primary);
    }
  </style>
</head>
<body>
  <div class="dashboard-grid">
    <header class="grid-header">
      <h2>Tryngo Cloud Admin</h2>
      <span>Status: Operasional 99.9%</span>
    </header>

    <nav class="grid-sidebar">
      <h3>Navigasi</h3>
      <ul style="list-style: none; margin-top: 12px; line-height: 2;">
        <li><a href="#" style="color: var(--primary); font-weight: 600;">Ringkasan</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Pengguna Aktif</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Database Cluster</a></li>
        <li><a href="#" style="color: inherit; text-decoration: none;">Pengaturan</a></li>
      </ul>
    </nav>

    <main class="grid-content">
      <h1>Kinerja Sistem & Analisis Beban</h1>
      <p style="color: #64748B; margin-top: 4px;">Metrik performa real-time seluruh node server di wilayah Asia Tenggara.</p>

      <div class="metrics-grid">
        <div class="metric-card">
          <small>Total Request / Detik</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px;">42.850</h3>
        </div>
        <div class="metric-card">
          <small>Latensi Rata-rata</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px; color: var(--primary);">8.2 ms</h3>
        </div>
        <div class="metric-card">
          <small>Utilisasi CPU</small>
          <h3 style="font-size: 1.5rem; margin-top: 4px;">34.2%</h3>
        </div>
      </div>
    </main>

    <aside class="grid-stats">
      <h3>Aktivitas Terbaru</h3>
      <p style="margin-top: 12px; font-size: 0.9rem; color: #64748B;">Autoscaling berhasil menambahkan 2 pod baru di zona ap-southeast-1.</p>
    </aside>

    <footer class="grid-footer">
      <span>&copy; 2026 Tryngo Enterprise. Hak cipta dilindungi.</span>
      <span>Versi 3.8.4-prod</span>
    </footer>
  </div>
</body>
</html>''',
        'objectivesId': [
            'Memahami perbedaan fundamental antara Flexbox (satu dimensi) dan CSS Grid (dua dimensi: baris dan kolom simultan)',
            'Menggunakan unit fraksional (fr) untuk pembagian ruang proporsional yang elastis',
            'Membuat arsitektur tata letak visual deklaratif menggunakan grid-template-areas',
            'Membangun kartu responsif otomatis tanpa media queries dengan repeat(auto-fit, minmax(200px, 1fr))',
            'Menempatkan elemen secara eksplisit pada garis koordinat grid (grid-column: 1 / -1)',
        ],
        'objectivesEn': [
            'Contrast one-dimensional Flexbox with two-dimensional simultaneous row-and-column CSS Grid',
            'Harness fractional units (fr) for fluid, proportional free-space apportionment',
            'Declare visual layout architecture mapped intuitively using grid-template-areas',
            'Generate auto-responsive component matrices without media queries via repeat(auto-fit, minmax(200px, 1fr))',
            'Position elements explicitly using directional grid track lines (grid-column: 1 / -1)',
        ],
        'explanationId': '''### Filosofi Dua Dimensi CSS Grid
Sementara Flexbox mengatur tata letak per baris **atau** per kolom secara mandiri, CSS Grid mengendalikan **baris dan kolom secara bersamaan**. Elemen anak terikat pada koordinat horizontal dan vertikal yang seragam.

### Unit Fraksi (fr)
Unit `fr` (*fractional unit*) merepresentasikan pecahan dari sisa ruang yang tersedia di dalam grid container:
- `grid-template-columns: 1fr 2fr 1fr;` membagi ruang menjadi 4 bagian sama besar, di mana kolom tengah mendapatkan 2 bagian (50%) dan kolom kiri-kanan masing-masing 1 bagian (25%).

### Grid Template Areas
Properti `grid-template-areas` memungkinkan developer memetakan layout seperti sketsa visual ASCII di dalam CSS:
```css
grid-template-areas:
  "header  header"
  "sidebar content";
```
Elemen anak cukup dipasangkan dengan `grid-area: header` atau `grid-area: sidebar` untuk langsung menempati zona tersebut.

### Pola Keramat auto-fit & minmax
Sintaks `repeat(auto-fit, minmax(180px, 1fr))` menciptakan tata letak kartu ajaib yang responsif: kolom akan bertambah otomatis saat layar melebar, dan membungkus rapi saat layar mengecil tanpa perlu sebaris pun `@media` query!''',
        'explanationEn': '''### Two-Dimensional Grid Philosophy
Flexbox manages layout strictly per row or per column in isolation. CSS Grid governs **both rows and columns concurrently**, orchestrating synchronized horizontal and vertical coordinate tracks.

### The Fractional Unit (fr)
The `fr` unit represents a fraction of remaining free space within the grid envelope:
- `grid-template-columns: 1fr 2fr 1fr;` allocates 4 equal fractional units: the center column receives 2fr (50%), while flank columns receive 1fr each (25%).

### Semantic Grid Template Areas
`grid-template-areas` enables developers to author visual layout blueprints using declarative ASCII mappings:
```css
grid-template-areas:
  "header  header"
  "sidebar content";
```
Children assign themselves to zones via `grid-area: header`, effortlessly docking into coordinates.

### The Holy Grail auto-fit & minmax Formula
The expression `repeat(auto-fit, minmax(180px, 1fr))` produces autonomously responsive grids: columns populate dynamically when screen space allows and collapse gracefully on mobile screens without a single `@media` rule!''',
        'beginnerId': '''### Analogi: Lemari Rak Bertingkat
1. **Flexbox** seperti menggantung baju di gantungan jemuran: baju tersusun rapi berjejer ke samping, tapi kalau jemuran ditarik ke bawah bajunya tidak otomatis tersusun berpetak-petak.
2. **CSS Grid** seperti lemari rak buku IKEA Kallax: Anda sudah membagi lemari menjadi 3 baris x 3 kolom kotak permanen.
3. **`grid-template-areas`** seperti menempel stiker label di laci rak: "Kotak atas untuk Topi, kotak tengah untuk Baju, kotak bawah untuk Sepatu".
4. **`repeat(auto-fit, minmax(...))`** seperti rak sepatu pintar yang otomatis merapatkan slot jika sepatunya sedikit, dan menambah slot baru begitu ada ruang kosong tersisa.''',
        'beginnerEn': '''### Analogy: An IKEA Modular Grid Shelf
1. **Flexbox** is a clothes drying rack: items align along a single line, but cannot lock into synchronized 2D coordinates across dimensions.
2. **CSS Grid** is an IKEA shelving unit with rigid, perfectly aligned row-and-column cube dividers.
3. **`grid-template-areas`** is labeling each cubby with chalk: "Top shelf = Hats, Center = Books, Bottom = Shoes".
4. **`repeat(auto-fit, minmax(...))`** is an elastic display shelf that expands slots automatically when space permits and contracts when boundaries tighten.''',
        'experimentsId': [
            'Ubah ukuran jendela browser dan amati bagaimana baris kartu metrik auto-fit otomatis berpindah dari 3 kolom menjadi 1 kolom tanpa media query.',
            'Tukar posisi "sidebar" dan "stats" di grid-template-areas dan perhatikan tata letak UI yang langsung bertukar tempat seketika.',
            'Ubah grid-template-columns: 240px 1fr 300px menjadi 1fr 3fr 1fr dan perhatikan bagaimana sidebar kini elastis mengikuti ukuran layar.',
            'Coba berikan grid-column: span 2 pada salah satu kartu metrik untuk melihat kartu tersebut melebar mengambil 2 slot kolom.',
        ],
        'experimentsEn': [
            'Resize your browser window to observe metric cards automatically shifting from 3 columns down to 1 column without media queries.',
            'Swap "sidebar" and "stats" tokens inside grid-template-areas to witness layout sections instantaneously switch positions.',
            'Modify grid-template-columns: 240px 1fr 300px to 1fr 3fr 1fr to turn fixed sidebars into proportional fluid columns.',
            'Apply grid-column: span 2 to a metric card and observe it occupying twice the horizontal width of its peers.',
        ],
        'challengeId': 'Bangun layout galeri foto majalah (editorial mosaic grid): gunakan CSS Grid untuk membuat galeri 6 foto di mana foto pertama berukuran besar (mengambil 2 baris dan 2 kolom menggunakan `grid-column: span 2; grid-row: span 2`), dan 5 foto lainnya mengisi ruang di sekelilingnya.',
        'challengeEn': 'Build an editorial magazine photo mosaic grid: create a 6-photo gallery where the first hero image spans 2 rows and 2 columns via `grid-column: span 2; grid-row: span 2`, with the remaining 5 photos filling the remaining grid spaces.',
        'summaryId': 'Kamu telah menguasai penataan tata letak dua dimensi yang presisi menggunakan CSS Grid dan unit fraksi fr. Minggu depan kita akan mendalami desain responsif modern dan tipografi dinamis fluid dengan clamp().',
        'summaryEn': 'You have mastered precision two-dimensional layout orchestration with CSS Grid and fractional units. Next week, we dive into modern responsive systems and fluid typography with clamp().',
    },
    {
        'week': 5,
        'level': 'intermediate',
        'topicId': 'desain-responsif-fluid-typography',
        'titleId': 'Desain Responsif Modern: Mobile-First & Fluid Typography clamp()',
        'titleEn': 'Modern Responsive Design: Mobile-First & Fluid clamp() Typography',
        'programId': 'Antarmuka Majalah Berita Responsif dengan Tipografi Elastis',
        'programEn': 'Responsive Editorial News Portal with Elastic Typography',
        'levelNameId': 'CSS Grid & Sistem Responsif Modern',
        'levelNameEn': 'CSS Grid & Modern Responsive Systems',
        'language': 'html',
        'code': '''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fluid Responsive Editorial</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* 1. Fluid Typography & Dynamic Spacing via clamp() */
    :root {
      --primary: #2E5B44;
      --bg: #FDFBF7;
      --text: #1C1917;
      --border: #E7E5E4;
      /* clamp(nilai_minimum, nilai_ideal_viewport, nilai_maksimum) */
      --font-hero: clamp(2rem, 1.2rem + 3.5vw, 4rem);
      --font-body: clamp(1rem, 0.95rem + 0.25vw, 1.2rem);
      --padding-fluid: clamp(16px, 4vw, 48px);
    }

    body {
      font-family: Georgia, serif;
      background: var(--bg);
      color: var(--text);
      font-size: var(--font-body);
      line-height: 1.7;
      padding: var(--padding-fluid);
    }

    .container {
      max-width: 1140px;
      margin: 0 auto;
    }

    /* Mobile-First Layout: Default 1 Kolom Vertikal */
    .article-header {
      border-bottom: 2px solid var(--text);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }

    .article-header h1 {
      font-size: var(--font-hero);
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin-bottom: 16px;
    }

    .article-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .article-body {
      max-width: 720px;
    }

    .article-sidebar {
      background: #F5F3EF;
      padding: 24px;
      border-radius: 8px;
    }

    /* Media Query Breakpoint 1: Tablet / Desktop Medium */
    @media (min-width: 768px) {
      .article-layout {
        grid-template-columns: 2fr 1fr;
      }
    }

    /* Media Query Breakpoint 2: Large Desktop */
    @media (min-width: 1200px) {
      .article-layout {
        grid-template-columns: 3fr 1fr;
        gap: 48px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="article-header">
      <small style="text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary); font-weight: bold;">Laporan Khusus Rekayasa</small>
      <h1>Masa Depan WebAssembly dan Akselerasi Komputasi Browser</h1>
      <p style="font-style: italic; color: #78716C;">Dipublikasikan pada 3 Oktober 2026 oleh Tim Riset Nusa Digital</p>
    </header>

    <div class="article-layout">
      <main class="article-body">
        <p>Evolusi komputasi browser telah melampaui batasan rendering teks statis. Hari ini, bahasa pemrograman berkinerja tinggi seperti Go dan Rust dapat dijalankan langsung di sisi klien dengan latensi mendekati binary native mesin.</p>
        <p style="margin-top: 20px;">Melalui kombinasi tipografi fluid menggunakan fungsi <code>clamp()</code> dan desain berbasis mobile-first, tata letak dokumen ini menyajikan kenyamanan membaca yang sempurna mulai dari layar ponsel 360px hingga monitor resolusi 4K tanpa memerlukan puluhan breakpoint kaku.</p>
      </main>

      <aside class="article-sidebar">
        <h3>Ringkasan Eksekutif</h3>
        <ul style="margin-top: 12px; padding-left: 20px;">
          <li>Ukuran binary WebAssembly menyusut hingga 60%.</li>
          <li>Skalabilitas rendering multi-core via Web Workers.</li>
          <li>Adopsi industri enterprise meningkat 300%.</li>
        </ul>
      </aside>
    </div>
  </div>
</body>
</html>''',
        'objectivesId': [
            'Menerapkan filosofi desain Mobile-First: menulis CSS dasar untuk layar kecil terlebih dahulu lalu memperluas dengan min-width',
            'Menghilangkan breakpoint kaku dengan fungsi matematika modern: clamp(min, val, max), min(), dan max()',
            'Membangun Fluid Typography yang membesar mulus secara proporsional sesuai lebar viewport (vw)',
            'Menggunakan properti modern media queries: @media (min-width: ...) dan preferensi pengguna (@media (prefers-color-scheme))',
            'Memastikan keterbacaan teks optimal dengan pembatasan lebar teks bacaan (max-width: 65ch - 75ch)',
        ],
        'objectivesEn': [
            'Apply the Mobile-First philosophy: author baseline CSS for small screens first, then progressively enhance via min-width',
            'Eliminate rigid, jagged breakpoints using modern CSS math: clamp(min, val, max), min(), and max()',
            'Architect fluid typography scaling seamlessly with viewport width (vw) units',
            'Deploy modern media query rules: min-width boundaries and user preference queries (prefers-color-scheme)',
            'Guarantee optimal typographic readability by capping reading line length (max-width: 65ch - 75ch)',
        ],
        'explanationId': '''### Filosofi Desain Mobile-First
Pendekatan *Mobile-First* menulis gaya visual untuk layar terkecil terlebih dahulu tanpa media query. Kemudian, aturan `@media (min-width: 768px)` ditambahkan secara bertahap untuk memperkaya tampilan saat layar semakin lebar. Pendekatan ini menghasilkan kode CSS yang lebih ringkas, performa muat lebih cepat di ponsel, dan menghindari penimpaan gaya (*overrides*) yang berantakan.

### Keajaiban Fungsi clamp()
Fungsi `clamp(MIN, VAL, MAX)` menerima 3 parameter:
- **Batas Bawah (MIN)**: Nilai terkecil yang diizinkan (misal `2rem` di ponsel kecil).
- **Nilai Dinamis (VAL)**: Nilai relatif berbasis viewport yang terus berubah (misal `1.2rem + 3.5vw`).
- **Batas Atas (MAX)**: Nilai tertinggi yang diizinkan (misal `4rem` di layar monitor raksasa).
Browser otomatis menghitung ukuran teks atau padding secara elastis tanpa lompatan ukuran yang mengagetkan pengguna!

### Tipografi Keterbacaan (Unit ch)
Mata manusia membaca paling nyaman saat satu baris teks memuat antara 60 hingga 75 karakter. Properti `max-width: 70ch` (1ch = lebar huruf angka '0') secara matematis mengunci lebar paragraf agar tidak terlalu panjang di layar monitor lebar.''',
        'explanationEn': '''### The Mobile-First Paradigm
The *Mobile-First* philosophy dictates writing baseline styles for constrained mobile viewports first, free of media queries. Progressive enhancements are layered incrementally via `@media (min-width: 768px)`. This yields leaner CSS bundles, faster mobile first-contentful paint, and eliminates spaghetti selector overrides.

### The Power of clamp()
The `clamp(MIN, VAL, MAX)` function takes three mathematical boundaries:
- **Floor (MIN)**: The minimum permissible threshold (e.g. `2rem` on compact phones).
- **Ideal (VAL)**: The viewport-fluid variable scaling with screen width (e.g. `1.2rem + 3.5vw`).
- **Ceiling (MAX)**: The maximum allowable limit (e.g. `4rem` on ultra-wide desktop displays).
Browsers interpolate dimensions smoothly without jarring breakpoint jumps!

### Optimal Typographic Measure (ch unit)
Human eyes read most comfortably when a paragraph line holds between 60 and 75 characters. Declaring `max-width: 70ch` (1ch equals the advance measure of the zero glyph) mathematically bounds line lengths to comfortable ergonomic spans.''',
        'beginnerId': '''### Analogi: Karet Celana Elastis vs Sabuk Lubang Kaku
1. **Breakpoint media query tradisional** seperti sabuk kulit berlubang: celana hanya bisa pas di ukuran lubang 28, 30, atau 32. Di antara ukuran itu, celana terasa kesempitan atau kelonggaran.
2. **`clamp()`** seperti karet celana olahraga elastis: ukurannya menyesuaikan tubuh Anda secara mulus milimeter demi milimeter, dengan batas minimum agar tidak melorot dan batas maksimum agar tidak terlalu kencang.
3. **Mobile-First** seperti membangun rumah dari pondasi tanah terlebih dahulu, bukan merakit atap genteng di udara baru menggali pondasinya.''',
        'beginnerEn': '''### Analogy: Elastic Waistband vs Notched Belt
1. **Legacy fixed breakpoints** are like a notched leather belt: the waist fits only at fixed holes (size 28, 30, 32). In between, the fit is either uncomfortably tight or awkwardly loose.
2. **`clamp()`** is an engineered elastic waistband: it stretches and contracts continuously millimeter by millimeter, bounded by a safe minimum and comfortable maximum.
3. **Mobile-First** is building a house from the ground foundation upward, rather than hanging roof shingles in mid-air and digging the foundation afterward.''',
        'experimentsId': [
            'Buka Developer Tools, tarik perlahan tepi jendela browser dari 320px ke 1400px, dan perhatikan bagaimana ukuran font judul membesar secara kontinu tanpa patahan.',
            'Ubah parameter clamp(2rem, ..., 4rem) menjadi clamp(1rem, ..., 2rem) dan rasakan perbedaannya pada skala judul visual.',
            'Coba ubah media query min-width: 768px menjadi max-width: 768px (gaya desktop-first) dan amati bagaimana logika penulisan kode menjadi terbalik dan rumit.',
            'Tambahkan max-width: 45ch pada paragraf dan perhatikan bagaimana baris teks menjadi sangat pendek seperti kolom surat kabar harian.',
        ],
        'experimentsEn': [
            'Open DevTools, drag the viewport handle continuously from 320px to 1400px, and observe heading typography scaling fluidly without snapping.',
            'Adjust the clamp bounds from clamp(2rem, ..., 4rem) to clamp(1rem, ..., 2rem) to evaluate the visual hierarchy shift.',
            'Invert min-width: 768px to max-width: 768px (desktop-first) to appreciate how overrides quickly complicate cascading logic.',
            'Set max-width: 45ch on paragraphs to see reading measures tighten into traditional newspaper column format.',
        ],
        'challengeId': 'Rancang landing page SaaS dengan judul hero fluid menggunakan `clamp()`, padding kontainer fluid, dan layout 3 kartu harga yang otomatis berpindah dari 1 kolom (di mobile < 640px), 2 kolom (di tablet 640px-1024px), hingga 3 kolom (di desktop > 1024px).',
        'challengeEn': 'Architect a SaaS landing hero section featuring fluid headline scaling via `clamp()`, fluid container padding, and a 3-tier pricing layout shifting from 1 column (< 640px), to 2 columns (640px-1024px), to 3 columns (> 1024px).',
        'summaryId': 'Kamu telah menguasai rekayasa web responsif modern berbasis mobile-first dan tipografi elastis dengan clamp(). Minggu depan kita akan mendalami konteks penumpukan (stacking context) dan koordinat posisi z-index.',
        'summaryEn': 'You have mastered modern mobile-first responsive engineering and fluid mathematical typography. Next week, we examine positioning contexts and the 3D z-index stacking order.',
    },
    {
        'week': 6,
        'level': 'intermediate',
        'topicId': 'positioning-stacking-context',
        'titleId': 'Positioning, Koordinat Z-Index & Stacking Context',
        'titleEn': 'Positioning, Z-Index Coordinates & Stacking Context',
        'programId': 'Sistem Modal Dialog & Toast Notifikasi dengan Stacking Tepat',
        'programEn': 'Modal Dialog & Toast Notification System with Proper Stacking',
        'levelNameId': 'CSS Grid & Sistem Responsif Modern',
        'levelNameEn': 'CSS Grid & Modern Responsive Systems',
        'language': 'html',
        'code': '''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Positioning & Stacking Context</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F4F2ED;
      --surface: #FFFFFF;
      --text: #1E293B;
      /* Stacking Layers System */
      --z-base: 1;
      --z-sticky: 10;
      --z-dropdown: 50;
      --z-backdrop: 100;
      --z-modal: 110;
      --z-toast: 200;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 200vh; /* Memberi ruang scroll */
      padding-top: 80px;
    }

    /* 1. Fixed App Navigation Bar */
    .fixed-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: var(--z-sticky);
    }

    /* 2. Kartu dengan Badge Terposisikan Absolute */
    .card-container {
      max-width: 480px;
      margin: 40px auto;
      background: var(--surface);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      position: relative; /* Anchor wajib bagi absolute children */
    }

    .badge-corner {
      position: absolute;
      top: -12px;
      right: 24px;
      background: var(--primary);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(46,91,68,0.3);
      z-index: var(--z-base);
    }

    /* 3. Toast Notifikasi Mengambang */
    .toast-notification {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: var(--z-toast);
      display: flex;
      align-items: center;
      gap: 12px;
    }
  </style>
</head>
<body>
  <nav class="fixed-navbar">
    <strong>Tryngo Platform</strong>
    <button style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 6px;">Buka Menu</button>
  </nav>

  <div class="card-container">
    <span class="badge-corner">Populer 2026</span>
    <h2>Modul Rekayasa Sistem Go & Rust</h2>
    <p style="margin-top: 12px; color: #64748B; line-height: 1.6;">Pelajari manajemen memori, goroutines, concurrency terdistribusi, dan kompilasi binary langsung di playground interaktif kami.</p>
  </div>

  <div class="toast-notification">
    <span>Progres belajar Minggu 5 tersimpan otomatis ke cloud.</span>
  </div>
</body>
</html>''',
        'objectivesId': [
            'Memahami 5 nilai properti position: static, relative, absolute, fixed, dan sticky',
            'Memahami aturan jangkar: position: absolute mencari leluhur terdekat yang non-static',
            'Memahami Stacking Context: mengapa z-index: 99999 bisa kalah dari z-index: 2 jika berada di konteks berbeda',
            'Membangun sistem tingkatan z-index berbasis variabel terpusat untuk mencegah perang z-index liar',
            'Menerapkan efek visual modern backdrop-filter: blur() pada fixed navigation bar',
        ],
        'objectivesEn': [
            'Distinguish the five position paradigms: static, relative, absolute, fixed, and sticky',
            'Master the anchoring mechanic: position: absolute references the nearest non-static positioned ancestor',
            'Deconstruct the Stacking Context: why z-index: 99999 yields to z-index: 2 across disparate stacking contexts',
            'Architect a centralized z-index layer token system to eliminate arbitrary z-index bidding wars',
            'Apply frosted-glass aesthetics with backdrop-filter: blur() on fixed navigation components',
        ],
        'explanationId': '''### 5 Pilar CSS Positioning
1. **static**: Alur normal default dokumen. Properti `top`, `bottom`, `left`, `right`, dan `z-index` tidak berpengaruh.
2. **relative**: Elemen tetap menempati ruang aslinya, namun posisinya dapat digeser secara visual dan menjadi **titik jangkar** bagi anak yang berstatus `absolute`.
3. **absolute**: Elemen dikeluarkan dari alur normal (tidak memakan tempat) dan memposisikan dirinya relatif terhadap **leluhur non-static terdekat**.
4. **fixed**: Elemen dikunci relatif terhadap viewport layar monitor dan tidak berpindah saat pengguna melakukan scroll.
5. **sticky**: Hibrida antara relative dan fixed tergantung batas scroll.

### Misteri Stacking Context
Banyak developer frustrasi mengapa elemen dengan `z-index: 9999` tetap berada di bawah elemen lain dengan `z-index: 1`. Jawabannya adalah **Stacking Context**. 
Elemen anak berada di dalam "pohon penumpukan" milik induknya. Jika Induk A memiliki stacking context dengan tingkat 1, dan Induk B memiliki tingkat 2, maka seluruh anak di dalam Induk A tidak akan pernah bisa menutupi Induk B, seberapapun besar nilai `z-index` anak tersebut!

Pemicu Stacking Context baru antara lain: elemen berposisi dengan `z-index` bukan auto, `opacity` kurang dari 1, `transform` bukan none, atau `isolation: isolate`.''',
        'explanationEn': '''### The Five Positioning Archetypes
1. **static**: Standard natural document flow. Directional offsets and `z-index` have zero effect.
2. **relative**: Preserves natural footprint, permits visual coordinate offsets, and establishes a **positioning coordinate anchor** for absolute descendants.
3. **absolute**: Removes the item from document flow (consuming zero flow dimensions), anchoring against the **nearest non-static positioned ancestor**.
4. **fixed**: Locks coordinates directly to the screen viewport boundary, remaining stationary across page scroll events.
5. **sticky**: Dynamic hybrid toggling between relative and fixed states based on scroll thresholds.

### The Stacking Context Mystery
Developers frequently encounter scenarios where an element with `z-index: 9999` remains hidden beneath an element with `z-index: 1`. The root cause is the **Stacking Context**.
Child nodes are bound to their parent's localized stacking tree. If Parent A possesses a stacking plane of 1 while Parent B possesses a stacking plane of 2, no child inside Parent A can ever visually layer over Parent B, regardless of how astronomical the child's `z-index` is!

Stacking contexts are instantiated by positioned items with integer `z-index`, `opacity` < 1, active CSS `transform`, or `isolation: isolate`.''',
        'beginnerId': '''### Analogi: Meja Gambar dan Koper Bertingkat
1. **`relative`** seperti meletakkan selembar kertas di atas meja gambar.
2. **`absolute`** seperti menempelkan stiker perangko di sudut kanan atas kertas tersebut. Kemanapun kertas Anda geser, stiker perangko akan tetap menempel di sudut kertas, bukan di meja.
3. **`fixed`** seperti lalat yang menempel di kaca kacamata Anda: kemanapun Anda menoleh atau berjalan (scroll), lalat itu tetap berada di titik yang sama di depan mata Anda.
4. **Stacking Context** seperti koper bertingkat: Koper B ditaruh di atas Koper A. Meskipun Anda memasukkan piala paling tinggi di dunia ke dalam Koper A, piala itu tetap terkurung di dalam Koper A dan tidak akan pernah berada di atas Koper B.''',
        'beginnerEn': '''### Analogy: A Drafting Desk and Stacked Suitcases
1. **`relative`** is placing a sheet of blueprint paper on your drafting desk.
2. **`absolute`** is sticking a postage stamp onto the top-right corner of that blueprint: wherever the paper slides, the stamp tracks the paper's edge.
3. **`fixed`** is a smudge on your eyeglasses: wherever you walk or turn your head (scroll), the smudge remains permanently locked in your line of sight.
4. **Stacking Context** is like stacked luggage trunks: Trunk B sits physically atop Trunk A. Even if Trunk A contains the tallest gold trophy in history, it remains inside Trunk A and can never project above Trunk B.''',
        'experimentsId': [
            'Hapus position: relative pada .card-container dan amati bagaimana badge merah melompat jauh ke pojok atas layar browser (karena kini berpatokan pada body).',
            'Ubah nilai z-index pada toast notification menjadi -1 dan perhatikan bagaimana toast menghilang di balik latar belakang halaman.',
            'Tambahkan opacity: 0.99 pada kontainer kartu dan amati bagaimana stacking context baru terbentuk.',
            'Coba scroll halaman ke bawah untuk memastikan bahwa fixed navbar dan toast notification tetap setia berada di posisinya masing-masing.',
        ],
        'experimentsEn': [
            'Remove position: relative from .card-container and watch the badge fly to the top-right corner of the whole browser window.',
            'Set z-index: -1 on the toast notification and watch it vanish behind the body background layer.',
            'Apply opacity: 0.99 to the card container and inspect the establishment of a brand-new stacking context.',
            'Scroll the viewport vertically to confirm that the fixed navbar and toast stay anchored in screen coordinates.',
        ],
        'challengeId': 'Buat komponen modal popup dengan tombol pemicu: sertakan latar belakang gelap transparan (backdrop overlay dengan `position: fixed; inset: 0; z-index: 100`) dan kotak dialog modal di tengah layar (`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 110`).',
        'challengeEn': 'Construct an overlay modal dialog: build a darkened backdrop (`position: fixed; inset: 0; z-index: 100`) and a centered dialog card (`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 110`).',
        'summaryId': 'Kamu telah menguasai sistem koordinat positioning CSS dan eliminasi bug tumpang tindih dengan Stacking Context. Minggu depan kita memasuki Level 3: animasi mikro-interaktif dan transisi performa tinggi.',
        'summaryEn': 'You have mastered CSS positioning mechanics and conquered stacking context bugs. Next week we enter Level 3: micro-interactive transitions and high-performance keyframe animations.',
    },

    # Level 3: Design System, Animasi & Fitur Mutakhir (Weeks 7-10)
    {
        'week': 7,
        'level': 'advanced',
        'topicId': 'transisi-dan-animasi-keyframes',
        'titleId': 'Transisi Halus, Kurva Cubic-Bezier & Animasi Keyframes 60fps',
        'titleEn': 'Smooth Transitions, Cubic-Bezier Curves & 60fps Keyframes',
        'programId': 'Tombol Interaktif dengan Efek Ripple & Spinner Pemuat Data',
        'programEn': 'Interactive Button with Pulse Ripple & Loading Spinner',
        'levelNameId': 'Design System, Animasi & Fitur Mutakhir',
        'levelNameEn': 'Design Systems, Animations & Modern Features',
        'language': 'html',
        'code': '''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>60fps CSS Transitions & Keyframes</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --primary-hover: #234735;
      --bg: #F8FAFC;
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 32px;
    }

    /* 1. Tombol Interaktif dengan Transform GPU & Spring Easing */
    .btn-action {
      background: var(--primary);
      color: white;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(46, 91, 68, 0.2);
      /* Hanya animasikan transform dan opacity untuk 60fps */
      transition: transform 0.25s var(--ease-spring), box-shadow 0.25s ease, background 0.2s ease;
      will-change: transform;
    }

    .btn-action:hover {
      background: var(--primary-hover);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 24px rgba(46, 91, 68, 0.3);
    }

    .btn-action:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 6px rgba(46, 91, 68, 0.2);
    }

    /* 2. Indikator Loading Spinner dengan Keyframes Murni */
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #E2E8F0;
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* 3. Badge Denyut (Pulse Ping) */
    .status-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #334155;
    }

    .dot-ping {
      width: 10px;
      height: 10px;
      background: #10B981;
      border-radius: 50%;
      position: relative;
    }

    .dot-ping::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: #10B981;
      opacity: 0.75;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      0%   { transform: scale(0.8); opacity: 0.8; }
      80%, 100% { transform: scale(2.4); opacity: 0; }
    }

    /* Aksesibilitas: Hormati Pengguna Sensitif Animasi */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <button class="btn-action">Jalankan Kompilasi</button>
  <div class="spinner" aria-label="Memuat data"></div>
  <div class="status-badge">
    <span class="dot-ping"></span>
    Cluster Server Aktif
  </div>
</body>
</html>''',
        'objectivesId': [
            'Menguasai aturan emas performa animasi 60 FPS: hanya transform dan opacity yang diakselerasi GPU (Composite only)',
            'Membuat kurva pergerakan alami elastis menggunakan cubic-bezier kustom alih-alih linear yang kaku',
            'Menulis animasi berkelanjutan dan terprogram menggunakan aturan @keyframes',
            'Mengontrol timing animasi dengan properti animation-fill-mode (forwards, backwards, both)',
            'Menghormati preferensi pengguna dengan media query @media (prefers-reduced-motion: reduce)',
        ],
        'objectivesEn': [
            'Adhere to the 60 FPS golden rule: animate only transform and opacity to guarantee GPU composite-thread acceleration',
            'Craft organic spring physics curves with custom cubic-bezier timing functions',
            'Author continuous looping and multi-step choreographies using @keyframes directives',
            'Govern end-state frame persistence via animation-fill-mode (forwards, backwards, both)',
            'Respect vestibular-sensitive users using @media (prefers-reduced-motion: reduce)',
        ],
        'explanationId': '''### Mengapa Hanya Transform & Opacity (60 FPS)?
Rendering browser melewati 3 tahap: **Layout (Reflow)** $ightarrow$ **Paint (Repaint)** $ightarrow$ **Composite**.
- Menganimasikan properti seperti `width`, `height`, `margin`, atau `top` memaksa browser menghitung ulang layout seluruh halaman (sangat boros CPU, menyebabkan patah-patah/*jank*).
- Menganimasikan `color` atau `background` memicu tahap Paint.
- Menganimasikan `transform` (translate, scale, rotate) dan `opacity` dilempar langsung ke GPU pada tahap **Composite**. Animasi berjalan mulus di 60-120 FPS tanpa membebani thread utama.

### Kurva Cubic-Bezier
Fungsi bawaan seperti `ease` atau `linear` sering terasa kaku seperti robot. Fungsi `cubic-bezier(0.34, 1.56, 0.64, 1)` mensimulasikan hukum fisika pegas nyata di mana tombol sedikit "membal" (*overshoot*) sebelum kembali tenang.

### Aksesibilitas: prefers-reduced-motion
Beberapa pengguna memiliki gangguan vestibular di mana animasi berkedip atau meluncur di layar dapat memicu pusing atau mual. Query `@media (prefers-reduced-motion: reduce)` mendeteksi setelan aksesibilitas sistem operasi pengguna dan wajib digunakan untuk menonaktifkan atau mempercepat animasi secara instan.''',
        'explanationEn': '''### The 60 FPS Imperative: Transform & Opacity
Browser rendering pipelines traverse three gates: **Layout** $ightarrow$ **Paint** $ightarrow$ **Composite**.
- Animating layout triggers (`width`, `height`, `margin`, `top`) forces CPU geometry recalculation across the DOM tree, causing dropped frames (jank).
- Animating paint properties (`color`, `background`) forces pixel rasterization.
- Animating `transform` and `opacity` bypasses layout and paint entirely, processing on the GPU **Composite thread**. Rendering locks to buttery 60-120 FPS.

### Custom Cubic-Bezier Physics
Standard presets like `linear` feel mechanical. Authoring custom functions like `cubic-bezier(0.34, 1.56, 0.64, 1)` introduces realistic spring dynamics with subtle overshoot before settling.

### Vestibular Inclusivity: prefers-reduced-motion
Users with vestibular motion sensitivity can experience nausea or vertigo from screen animations. Detecting OS accessibility flags via `@media (prefers-reduced-motion: reduce)` is a legal and ethical mandate to eliminate intrusive kinetic movements.''',
        'beginnerId': '''### Analogi: Menggambar Ulang Buku vs Memutar Proyektor
1. **Menganimasikan `width` atau `margin`** seperti menyuruh pelukis menggambar ulang seluruh halaman koran dari awal setiap 1 milidetik: pelukis kelelahan dan gambarnya jadi tersendat-sendat.
2. **Menganimasikan `transform: translate()`** seperti menyorotkan proyektor ke dinding: proyektor hanya perlu digeser sedikit sudutnya oleh GPU tanpa perlu mengecat ulang temboknya sama sekali.
3. **`cubic-bezier`** seperti melempar bola bekel karet ke lantai: bola memantul elastis beberapa kali sebelum berhenti, tidak seperti batu bata yang jatuh gedebuk kaku.''',
        'beginnerEn': '''### Analogy: Repainting Canvases vs Shifting Projector Beams
1. **Animating `width` or `margin`** is ordering an artist to repaint an entire canvas from scratch 60 times a second: the artist drops brushes and frames stutter.
2. **Animating `transform: translate()`** is nudging a flashlight projector beam: the hardware GPU merely shifts the projection angle without re-plastering the wall.
3. **`cubic-bezier`** is bouncing a rubber ball: it compresses and rebounds organically before resting, unlike a dead concrete brick hitting the floor.''',
        'experimentsId': [
            'Ubah transisi tombol untuk menganimasikan width alih-alih transform, buka Performance monitor di DevTools, dan amati lonjakan Rendering Layout Reflow.',
            'Coba ubah timing-function tombol menjadi linear dan rasakan betapa kaku gerakannya dibanding cubic-bezier spring.',
            'Ubah durasi animasi spinner dari 0.8s menjadi 0.2s untuk melihat efek putaran sangat cepat.',
            'Aktifkan emulasi "prefers-reduced-motion: reduce" di panel DevTools Rendering dan perhatikan bagaimana semua animasi langsung berhenti total.',
        ],
        'experimentsEn': [
            'Animate button width instead of transform, record a DevTools Performance trace, and inspect the costly Layout Reflow spikes.',
            'Swap the cubic-bezier curve for linear to feel the mechanical degradation in UI tactility.',
            'Change the spinner animation duration from 0.8s to 0.2s to witness rapid rotation velocity.',
            'Enable "Emulate CSS media feature prefers-reduced-motion" in DevTools Rendering panel to verify graceful animation disarmament.',
        ],
        'challengeId': 'Bangun kartu produk interaktif: saat kartu di-hover, kartu terangkat perlahan (`transform: translateY(-8px)`), bayangan membesar lembut, dan tombol keranjang di dalamnya muncul dengan efek fade-in slide-up menggunakan transisi GPU murni.',
        'challengeEn': 'Engineer an interactive product showcase card: on hover, the card floats upward (`transform: translateY(-8px)`), shadow diffuses softly, and an "Add to Cart" button reveals via a fade-in slide-up transition.',
        'summaryId': 'Kamu telah menguasai rekayasa animasi performa tinggi 60 FPS dan kurva fisika cubic-bezier. Minggu depan kita akan mendalami ruang warna modern OKLCH dan sistem Dark Mode arsitektural.',
        'summaryEn': 'You have mastered 60 FPS GPU-accelerated motion engineering and cubic-bezier physics. Next week, we examine modern OKLCH color spaces and systemic Dark Mode architectures.',
    },
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'color-spaces-oklch-dan-dark-mode',
        'titleId': 'Color Spaces Modern (OKLCH, P3) & Sistem Dark Mode',
        'titleEn': 'Modern Color Spaces (OKLCH, P3) & Systemic Dark Mode',
        'programId': 'Tema Warna Adaptif dengan Ruang Warna Persepsi OKLCH',
        'programEn': 'Perceptual OKLCH Color Space & Adaptive Dark Theme',
        'levelNameId': 'Design System, Animasi & Fitur Mutakhir',
        'levelNameEn': 'Design Systems, Animations & Modern Features',
        'language': 'html',
        'code': '''<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern OKLCH Colors & Dark Mode</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* 1. Design Tokens Berbasis OKLCH (Light Mode Default) */
    :root {
      /* oklch(Luminance Chroma Hue) */
      --color-brand: oklch(0.45 0.12 155);       /* Hijau Hutan Khas Tryngo */
      --color-brand-light: oklch(0.92 0.04 155);
      --color-accent: oklch(0.62 0.22 35);       /* Terracotta Oranye */
      --color-bg: oklch(0.97 0.01 95);           /* Warm Cream Off-White */
      --color-surface: oklch(1 0 0);             /* Pure White */
      --color-text-main: oklch(0.2 0.02 95);     /* Deep Charcoal */
      --color-text-muted: oklch(0.5 0.02 95);
      --color-border: oklch(0.88 0.01 95);
    }

    /* 2. Semantic Dark Mode Override via Data Attribute & OS Preference */
    [data-theme="dark"] {
      --color-brand: oklch(0.65 0.14 155);       /* Disesuaikan agar kontras tinggi di layar gelap */
      --color-brand-light: oklch(0.25 0.05 155);
      --color-bg: oklch(0.14 0.01 260);          /* Deep Obsidian */
      --color-surface: oklch(0.2 0.01 260);      /* Dark Slate Card */
      --color-text-main: oklch(0.96 0.01 95);    /* Crisp Light Gray */
      --color-text-muted: oklch(0.7 0.02 95);
      --color-border: oklch(0.3 0.01 260);
    }

    body {
      background-color: var(--color-bg);
      color: var(--color-text-main);
      font-family: system-ui, sans-serif;
      padding: 32px;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .theme-card {
      max-width: 520px;
      margin: 0 auto;
      background-color: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }

    .theme-badge {
      display: inline-block;
      background: var(--color-brand-light);
      color: var(--color-brand);
      font-weight: 700;
      font-size: 0.8rem;
      padding: 4px 12px;
      border-radius: 999px;
      margin-bottom: 16px;
    }

    .theme-toggle-btn {
      background: var(--color-brand);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="theme-card">
    <span class="theme-badge">Sistem Warna OKLCH</span>
    <h1>Arsitektur Desain Adaptif</h1>
    <p style="color: var(--color-text-muted); margin-top: 12px; line-height: 1.6;">
      Ruang warna OKLCH memisahkan tingkat terang (Luminance), kejenuhan (Chroma), dan rona (Hue) secara perseptual. Mengubah warna tidak lagi merusak rasio kontras aksesibilitas.
    </p>
    <button class="theme-toggle-btn" onclick="toggleTheme()">Alihkan Mode Gelap / Terang</button>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>''',
        'objectivesId': [
            'Memahami keunggulan ruang warna modern OKLCH: keseragaman perseptual kecerahan manusia (perceptual uniformity)',
            'Memahami 3 komponen OKLCH: L (Lightness 0-1), C (Chroma kepekatan warna), dan H (Hue sudut warna 0-360)',
            'Membangun sistem tema Dark Mode yang bersih menggunakan variabel CSS dan atribut data-theme',
            'Menghubungkan tema aplikasi dengan preferensi sistem operasi menggunakan @media (prefers-color-scheme: dark)',
            'Mempertahankan rasio kontras teks minimum WCAG AA (4.5:1) di mode terang maupun gelap',
        ],
        'objectivesEn': [
            'Appreciate the superiority of OKLCH: human perceptual lightness uniformity across spectrums',
            'Master the three OKLCH parameters: L (Lightness 0-1), C (Chroma saturation), and H (Hue angle 0-360)',
            'Engineer clean Dark Mode theme toggling leveraging CSS tokens and data-theme selectors',
            'Synchronize application themes with OS system defaults via @media (prefers-color-scheme: dark)',
            'Maintain strict WCAG AA contrast thresholds (4.5:1) consistently across both themes',
        ],
        'explanationId': '''### Mengapa OKLCH Menggantikan HEX dan HSL?
Format warna lama seperti `rgb()` dan `hsl()` memiliki kelemahan biologis: mata manusia melihat warna kuning jauh lebih terang daripada warna biru pada saturasi yang sama di HSL. 
Di **OKLCH (`Lightness`, `Chroma`, `Hue`)**:
- Tingkat **Lightness 0.7** memiliki kecerahan perseptual yang sama persis bagi mata manusia, baik warnanya biru, hijau, maupun kuning!
- Memudahkan desainer membuat palet warna aksesibel yang dijamin lolos uji kontras WCAG tanpa tebak-tebakan.
- Mendukung gamut warna modern Display-P3 yang lebih luas dan cerah di layar iPhone dan monitor modern.

### Arsitektur Dark Mode Terstruktur
Alih-alih menulis ulang ratusan warna di puluhan class, kita cukup mendefinisikan **Design Tokens Semantik** di `:root` dan menimpanya di selektor `[data-theme="dark"]`. Seluruh tombol, kartu, dan teks akan berganti kulit seketika tanpa duplikasi kode.''',
        'explanationEn': '''### Why OKLCH Supersedes HEX and HSL
Legacy color formats (`rgb`, `hsl`) fail human perceptual biology: human eyes perceive pure yellow as drastically brighter than pure blue at identical HSL lightness values.
In **OKLCH (`Lightness`, `Chroma`, `Hue`)**:
- A **Lightness of 0.7** guarantees identical perceptual luminance to human retinas whether the hue is emerald green, sapphire blue, or amber!
- Developers construct accessible color ramps passing WCAG contrast math deterministically.
- Unlocks the wider Display-P3 color gamut available on modern displays.

### Structured Dark Mode Architecture
Rather than authoring hundreds of inverted color overrides across component classes, declare **Semantic Design Tokens** at `:root` and re-map tokens under `[data-theme="dark"]`. All cards, typography, and borders re-skin synchronously.''',
        'beginnerId': '''### Analogi: Saklar Pengatur Kecerahan Lampu Rumah
1. **HSL tradisional** seperti saklar lampu rusak: jika diputar ke warna kuning lampunya menyilaukan mata, tapi jika diputar ke warna biru lampunya redup gelap gulita padahal saklarnya di angka yang sama.
2. **OKLCH** seperti sistem pencahayaan pintar: angka terang 70% menjamin cahaya yang dipancarkan ke mata Anda sama terangnya, apapun warna lampu yang dipilih.
3. **Sistem Dark Mode** seperti mengganti baju seragam kantor: di siang hari memakai kemeja putih katun sejuk, di malam hari berganti jaket hitam hangat, tanpa mengubah orang yang memakainya.''',
        'beginnerEn': '''### Analogy: Calibrated Studio Lighting
1. **Legacy HSL** is a faulty dimmer switch: at 70% lightness, yellow blinds your eyes while blue is almost completely black.
2. **OKLCH** is a digitally calibrated optical illuminator: 70% Lightness guarantees identical optical energy to the human retina regardless of hue.
3. **Dark Mode Tokens** are like day/night uniform changes: daytime shifts to breathable light fabric, nighttime switches to dark warm jackets, without changing the individual wearing them.''',
        'experimentsId': [
            'Klik tombol alihkan tema dan amati transisi warna yang mulus di seluruh kartu dan teks.',
            'Coba ubah parameter Lightness pada warna brand dari 0.45 menjadi 0.75 dan amati perubahan terangnya warna hijau.',
            'Periksa rasio kontras teks menggunakan DevTools Color Picker dan pastikan status kepatuhan WCAG AA tetap centang hijau di kedua tema.',
            'Ubah data-theme di html menjadi tanpa atribut dan gunakan @media (prefers-color-scheme: dark) untuk mengikuti setelan Windows/Mac Anda.',
        ],
        'experimentsEn': [
            'Click the theme toggle button to witness the smooth color transition across all cards and text.',
            'Adjust the Lightness parameter of the brand token from 0.45 to 0.75 to observe precise perceptual luminance changes.',
            'Inspect contrast ratios using the DevTools Color Picker to verify green checkmarks on WCAG AA compliance across both modes.',
            'Remove the manual data-theme attribute and test @media (prefers-color-scheme: dark) against your operating system theme settings.',
        ],
        'challengeId': 'Buat palet 5 tingkatan warna token OKLCH untuk sistem UI perusahaan (Primary, Surface, Background, Danger, Success) lengkap dengan varian Dark Mode yang lulus uji kontras minimum 4.5:1 untuk teks biasa.',
        'challengeEn': 'Build a 5-step OKLCH design token palette for an enterprise UI (Primary, Surface, Background, Danger, Success) complete with Dark Mode overrides passing minimum 4.5:1 text contrast ratios.',
        'summaryId': 'Kamu telah menguasai ruang warna modern OKLCH dan arsitektur tema Dark Mode sistemik. Minggu depan kita akan mendalami fitur mutakhir CSS: Container Queries dan Subgrid!',
        'summaryEn': 'You have mastered modern OKLCH color science and systemic Dark Mode token architectures. Next week, we examine CSS cutting-edge capabilities: Container Queries and Subgrid!',
    },
    {
        'week': 9,
        'level': 'advanced',
        'topicId': 'container-queries-dan-subgrid',
        'titleId': 'Fitur Mutakhir: Container Queries (@container) & Subgrid',
        'titleEn': 'Modern Frontier: Container Queries (@container) & Subgrid',
        'programId': 'Komponen Kartu Adaptif Berdasarkan Lebar Kontainer',
        'programEn': 'Container-Responsive Card Component via @container',
        'levelNameId': 'Design System, Animasi & Fitur Mutakhir',
        'levelNameEn': 'Design Systems, Animations & Modern Features',
        'language': 'html',
        'code': '''<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Container Queries & Subgrid</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: system-ui, sans-serif;
      background: #F1F5F9;
      padding: 24px;
    }

    /* Layout Induk: Kolom Sempit & Kolom Lebar */
    .showcase-layout {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 32px;
      max-width: 1100px;
      margin: 0 auto;
    }

    /* 1. Mendaftarkan Elemen sebagai Container */
    .card-wrapper {
      container-type: inline-size;
      container-name: product-card;
    }

    /* 2. Komponen Kartu yang Merespon Ukuran Kontainernya Sendiri */
    .product-widget {
      background: #FFFFFF;
      border-radius: 16px;
      padding: 20px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .widget-image {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #CBD5E1;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #475569;
    }

    /* 3. Container Query: Jika lebar kontainer > 450px, ubah jadi horizontal! */
    @container product-card (min-width: 450px) {
      .product-widget {
        flex-direction: row;
        align-items: center;
      }
      .widget-image {
        width: 180px;
        aspect-ratio: 1 / 1;
      }
    }
  </style>
</head>
<body>
  <h1 style="text-align: center; margin-bottom: 24px;">Komponen Identik di Dua Ukuran Kontainer Berbeda</h1>

  <div class="showcase-layout">
    <!-- Slot 1: Di sidebar sempit (320px) -> Merender vertikal otomatis -->
    <div>
      <h3 style="margin-bottom: 12px;">Di Kolom Sempit (Sidebar 320px)</h3>
      <div class="card-wrapper">
        <div class="product-widget">
          <div class="widget-image">Foto Produk</div>
          <div>
            <h4>Paket Mini Cloud</h4>
            <p style="color: #64748B; font-size: 0.9rem;">Cocok untuk proyek uji coba.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Slot 2: Di area utama lebar -> Otomatis beradaptasi horizontal! -->
    <div>
      <h3 style="margin-bottom: 12px;">Di Kolom Lebar (Main Area)</h3>
      <div class="card-wrapper">
        <div class="product-widget">
          <div class="widget-image">Foto Produk</div>
          <div>
            <h4>Paket Mini Cloud</h4>
            <p style="color: #64748B; font-size: 0.9rem;">Komponen yang sama persis secara otomatis beralih menjadi tata letak horizontal karena lebar kontainernya melebihi 450px.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>''',
        'objectivesId': [
            'Memahami paradigma pergeseran dari Media Queries (lebar viewport) ke Container Queries (lebar kontainer induk)',
            'Mendaftarkan konteks kontainer menggunakan properti container-type: inline-size dan container-name',
            'Menulis aturan gaya kondisional modular dengan @container (min-width: ...)',
            'Memahami cara kerja subgrid (grid-template-rows: subgrid) untuk menyelaraskan elemen di dalam kartu berbeda',
            'Membangun komponen UI yang benar-benar modular dan dapat ditempatkan di mana saja (sidebar, modal, main grid)',
        ],
        'objectivesEn': [
            'Appreciate the architectural paradigm shift from viewport-based media queries to parent-bound Container Queries',
            'Register container contexts using container-type: inline-size and container-name',
            'Author modular component-responsive styles using @container (min-width: ...) rules',
            'Understand subgrid mechanics (grid-template-rows: subgrid) to synchronize row heights across card siblings',
            'Build truly portable UI components that adapt autonomously to any placement slot (sidebar, modal, main grid)',
        ],
        'explanationId': '''### Era Baru: Container Queries (@container)
Selama 15 tahun, responsive design terikat pada ukuran layar monitor (`@media (min-width: 768px)`). Kelemahannya: jika sebuah kartu produk diletakkan di sidebar yang sempit pada monitor desktop lebar, kartu tersebut akan dipaksa melebar hancur karena browser mendeteksi layar monitornya lebar.

Dengan **Container Queries (`@container`)**:
- Komponen merespons **lebar induknya sendiri**, bukan lebar layar monitor.
- Komponen yang sama dapat diletakkan di sidebar (merender vertikal) atau di area utama (merender horizontal) tanpa membuat class CSS baru!

### Properti container-type
- `container-type: inline-size`: Menginstruksikan browser untuk memantau perubahan ukuran elemen pada sumbu horizontal (lebar).

### Kekuatan Subgrid
Pada CSS Grid konvensional, elemen anak dari kartu tidak bisa sejajar dengan elemen anak di kartu sebelahnya jika teks judulnya memiliki panjang baris berbeda. Dengan `grid-template-rows: subgrid`, kartu anak mewarisi grid baris induknya sehingga tombol dan judul selalu sejajar rapi di satu garis lurus horizontal.''',
        'explanationEn': '''### The Container Query (@container) Paradigm
For 15 years, responsive design was constrained to global viewport dimensions (`@media (min-width: 768px)`). The fatal limitation: placing a card inside a narrow sidebar on a 4K desktop display caused the card to rupture because the browser only inspected the screen width.

With **Container Queries (`@container`)**:
- Components query **their immediate container footprint**, indifferent to viewport geometry.
- The exact same component markup adapts vertically in a sidebar and horizontally in a hero container without custom class overrides!

### The container-type Property
- `container-type: inline-size`: Designates the container as a queryable boundary along its horizontal inline axis.

### The Subgrid Advantage
In standard nested grids, child elements cannot align with children of neighboring cards when title lengths vary. With `grid-template-rows: subgrid`, cards inherit parent row track coordinates, guaranteeing that action buttons and titles align along a laser-straight horizontal axis.''',
        'beginnerId': '''### Analogi: Air yang Menyesuaikan Bentuk Gelas
1. **Media Query lama** seperti menentukan bentuk air berdasarkan cuaca di luar rumah: "Jika hari ini cerah di kota Jakarta, air harus berbentuk kotak". Padahal airnya sedang dimasukkan ke dalam botol bulat!
2. **Container Query** seperti sifat asli air: air di dalam cangkir kecil otomatis berbentuk cangkir, dan air yang dituang ke dalam baskom lebar otomatis melebar mengikuti baskom tersebut.
3. Komponen Anda menjadi mandiri dan cerdas di manapun Anda meletakkannya.''',
        'beginnerEn': '''### Analogy: Water Conforming to its Glass
1. **Legacy Media Queries** are like commanding water to assume shapes based on outdoor weather: "If the city is sunny, the water must freeze into a square". Even if the water is poured into a round cup!
2. **Container Queries** embody the true physics of water: water poured into a slender glass turns tall and narrow; poured into a wide bowl, it expands horizontally.
3. Your components become truly self-aware and autonomous wherever they are mounted.''',
        'experimentsId': [
            'Ubah lebar kolom sidebar di showcase-layout dari 320px menjadi 500px dan perhatikan kartu di sidebar langsung beralih ke layout horizontal secara mandiri.',
            'Hapus baris container-type: inline-size dan amati bagaimana @container query langsung berhenti bekerja.',
            'Coba letakkan kartu ketiga di dalam kontainer berukuran 600px dan buktikan fleksibilitas modularitasnya.',
            'Uji komponen ini di berbagai browser modern dan periksa dukungan native container queries di panel DevTools.',
        ],
        'experimentsEn': [
            'Widen the sidebar column from 320px to 500px and watch the sidebar card seamlessly snap to horizontal orientation.',
            'Remove container-type: inline-size and verify that the @container conditional halts functioning.',
            'Mount a third instance into an arbitrary 600px wrapper to confirm true component portability.',
            'Inspect the container query pill badge in the DevTools Elements panel.',
        ],
        'challengeId': 'Bangun komponen kartu profil pengguna (User Card) dengan Container Queries: jika lebar kontainer < 350px tampilkan avatar di atas teks, jika 350px-600px tampilkan avatar di samping teks, dan jika > 600px tambahkan bilah tombol aksi lengkap di sisi kanan.',
        'challengeEn': 'Engineer an adaptive User Profile Card with Container Queries: < 350px stacks avatar above text, 350px-600px renders avatar beside text, and > 600px exposes a full action toolbar aligned to the far right.',
        'summaryId': 'Kamu telah menguasai fitur paling mutakhir dalam sejarah CSS: Container Queries dan Subgrid. Minggu depan adalah proyek capstone: membangun E-Commerce Design System & Responsive Storefront kelas dunia!',
        'summaryEn': 'You have mastered the most sophisticated CSS capabilities: Container Queries and Subgrid. Next week is the capstone project: crafting a world-class E-Commerce Design System and Responsive Storefront!',
    },
    {
        'week': 10,
        'level': 'advanced',
        'topicId': 'proyek-akhir-design-system-dan-storefront',
        'titleId': 'Proyek Akhir: Design System & E-Commerce Storefront Responsif',
        'titleEn': 'Capstone Project: Responsive E-Commerce Storefront & Design System',
        'programId': 'Aplikasi Toko Online Responsif dengan Dark Mode & Desain Modular',
        'programEn': 'Responsive Online Storefront App with Dark Mode & Design Tokens',
        'levelNameId': 'Design System, Animasi & Fitur Mutakhir',
        'levelNameEn': 'Design Systems, Animations & Modern Features',
        'language': 'html',
        'code': '''<!DOCTYPE html>
<html lang="id" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tryngo Artisan Storefront</title>
  <style>
    /* 1. Global Reset & Box Model */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    /* 2. Comprehensive Design Tokens (OKLCH Color Palette) */
    :root {
      --brand: oklch(0.45 0.12 155);
      --brand-hover: oklch(0.38 0.12 155);
      --bg: oklch(0.97 0.01 95);
      --surface: oklch(1 0 0);
      --text: oklch(0.2 0.02 95);
      --text-muted: oklch(0.55 0.02 95);
      --border: oklch(0.9 0.01 95);
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-full: 9999px;
      --shadow: 0 4px 20px rgba(0,0,0,0.06);
      --shadow-hover: 0 12px 32px rgba(0,0,0,0.12);
      --ease: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    [data-theme="dark"] {
      --brand: oklch(0.68 0.14 155);
      --brand-hover: oklch(0.75 0.14 155);
      --bg: oklch(0.13 0.01 260);
      --surface: oklch(0.18 0.01 260);
      --text: oklch(0.96 0.01 95);
      --text-muted: oklch(0.68 0.02 95);
      --border: oklch(0.28 0.01 260);
      --shadow: 0 4px 20px rgba(0,0,0,0.3);
      --shadow-hover: 0 12px 32px rgba(0,0,0,0.5);
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* 3. Sticky Glassmorphic Header */
    .site-header {
      position: sticky;
      top: 0;
      background: color-mix(in srgb, var(--surface) 85%, transparent);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      z-index: 50;
      padding: 16px 0;
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand-logo { font-size: 1.3rem; font-weight: 800; color: var(--brand); text-decoration: none; }

    .theme-btn {
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 16px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s var(--ease);
    }
    .theme-btn:active { transform: scale(0.95); }

    /* 4. Hero Section dengan Fluid Typography */
    .hero-banner {
      padding: clamp(40px, 8vw, 96px) 0;
      text-align: center;
    }
    .hero-banner h1 {
      font-size: clamp(2.2rem, 1.5rem + 3.5vw, 4.2rem);
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin-bottom: 16px;
    }

    /* 5. Responsive Product Grid (Auto-Fit & Minmax) */
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 28px;
      margin-bottom: 64px;
    }

    .product-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s var(--ease), box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
    }

    .product-thumb {
      width: 100%;
      aspect-ratio: 4 / 3;
      background: #CBD5E1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #475569;
    }

    .product-info {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    .product-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
    .product-price { font-size: 1.4rem; font-weight: 800; color: var(--brand); margin-bottom: 16px; }

    .btn-cart {
      margin-top: auto;
      background: var(--brand);
      color: white;
      border: none;
      padding: 12px;
      border-radius: var(--radius-sm);
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease;
    }
    .btn-cart:hover { background: var(--brand-hover); }
    .btn-cart:active { transform: scale(0.98); }
  </style>
</head>
<body>
  <header class="site-header">
    <div class="container nav-inner">
      <a href="#" class="brand-logo">Nusa Storefront</a>
      <button class="theme-btn" onclick="toggleTheme()">Alihkan Mode Gelap</button>
    </div>
  </header>

  <main class="container">
    <section class="hero-banner">
      <h1>Koleksi Hardware Dev Terpilih</h1>
      <p style="color: var(--text-muted); font-size: 1.15rem; max-width: 600px; margin: 0 auto;">Peralatan komputasi ergonomis berkinerja tinggi untuk para software architect dan developer profesional.</p>
    </section>

    <section class="product-grid">
      <article class="product-card">
        <div class="product-thumb">Display 4K 144Hz</div>
        <div class="product-info">
          <h3 class="product-title">Monitor OLED Kalibrasi Pro</h3>
          <p class="product-price">Rp 12.499.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>

      <article class="product-card">
        <div class="product-thumb">Keyboard 75% Custom</div>
        <div class="product-info">
          <h3 class="product-title">Mechanical Keyboard Gasket</h3>
          <p class="product-price">Rp 2.899.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>

      <article class="product-card">
        <div class="product-thumb">Ergonomic Chair Pro</div>
        <div class="product-info">
          <h3 class="product-title">Kursi Kerja Lumbar Support</h3>
          <p class="product-price">Rp 6.250.000</p>
          <button class="btn-cart">Tambah ke Keranjang</button>
        </div>
      </article>
    </section>
  </main>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>
</body>
</html>''',
        'objectivesId': [
            'Mengintegrasikan seluruh kurikulum CSS3: Box Model, Flexbox, Grid, Clamp, Positioning, dan Animasi',
            'Membangun sistem Design Tokens terpadu berbasis palet OKLCH dengan Dark Mode adaptif instan',
            'Menerapkan header sticky glassmorphic dengan backdrop-filter dan z-index terisolasi',
            'Menata grid kartu produk yang sepenuhnya responsif tanpa media queries kaku (auto-fit + minmax)',
            'Memberikan pengalaman mikro-interaksi tombol dan kartu yang mulus di 60 FPS menggunakan GPU transitions',
        ],
        'objectivesEn': [
            'Synthesize the full CSS3 curriculum: Box Model, Flexbox, Grid, Clamp, Positioning, and Motion',
            'Architect an integrated Design Token system via OKLCH color science and instant Dark Mode theming',
            'Deploy a sticky glassmorphic header using backdrop-filter and an isolated z-index layer',
            'Orchestrate a fully responsive product grid free of brittle media queries (auto-fit + minmax)',
            'Deliver tactile 60 FPS micro-interactions on cards and buttons via GPU-accelerated transitions',
        ],
        'explanationId': '''### Anatomi Sistem Desain Produksi
Proyek capstone ini mendemonstrasikan bagaimana seluruh prinsip CSS modern bersatu menjadi sebuah produk komersial yang indah, tangguh, dan sangat cepat:
1. **Design Tokens Terpusat**: Seluruh variabel warna, radius sudut, bayangan elevasi, dan kurva pegas dideklarasikan di `:root`.
2. **Kesesuaian Ruang Warna Modern**: Penggunaan `oklch()` menjamin kontras warna teks terhadap background selalu konsisten di mode terang maupun gelap.
3. **Arsitektur Grid Elastis**: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` menjamin kartu tertata rapi di ponsel layar sempit 360px hingga layar desktop 4K tanpa kode bercabang.
4. **Performa Animasi Maksimal**: Transisi hover pada kartu (`translateY` dan `box-shadow`) berjalan pada thread GPU Composite tanpa memicu layout reflow.''',
        'explanationEn': '''### Production Design System Anatomy
This capstone demonstrates how all modern CSS tenets fuse into a resilient, high-velocity digital storefront:
1. **Unified Design Tokens**: Colors, radii, elevation shadows, and physics easing curves are centrally authored at `:root`.
2. **Color Science Rigor**: OKLCH declarations ensure typographic luminance contrast remains WCAG-compliant across light and dark permutations.
3. **Elastic Layout Grid**: `repeat(auto-fit, minmax(280px, 1fr))` effortlessly accommodates viewports from compact 360px devices up to expansive 4K displays with zero brittle breakpoint forks.
4. **Pristine Motion Performance**: Card hover elevations (`translateY` & `box-shadow`) operate on the GPU Composite layer without triggering CPU layout reflows.''',
        'beginnerId': '''### Analogi: Toko Butik Mewah
Capstone storefront ini seperti mendirikan toko butik fisik kelas dunia:
- Fondasinya kokoh dan lantainya rata sempurna (**Box Model**).
- Penataan etalase barang rapi dan mudah dijangkau (**Flexbox & CSS Grid**).
- Tulisan papan nama toko proporsional dan mudah dibaca dari kejauhan maupun dekat (**Fluid Typography**).
- Lampu toko otomatis redup hangat saat malam tiba tanpa harus mengganti perabotannya (**OKLCH Dark Mode**).
- Pintunya terbuka mulus tanpa suara saat didorong pelanggan (**60 FPS Animations**).''',
        'beginnerEn': '''### Analogy: A World-Class Flagship Boutique
This capstone storefront is like walking into an architectural luxury boutique:
- The foundation is laser-level and structural beams are true (**Box Model**).
- Display shelves organize products cleanly within arm's reach (**Flexbox & CSS Grid**).
- Signage scales proportionally whether viewed from the curb or up close (**Fluid Typography**).
- Lighting dims smoothly at twilight without rearranging physical furniture (**OKLCH Dark Mode**).
- Heavy glass doors glide silently on hydraulic dampers when pushed (**60 FPS Animations**).''',
        'experimentsId': [
            'Buka storefront ini di browser, alihkan tema ke Dark Mode, dan nikmati palet warna malam yang elegan dan nyaman di mata.',
            'Ubah ukuran layar dari ponsel ke desktop untuk melihat kartu produk otomatis menata diri dari 1 kolom, 2 kolom, hingga 4 kolom.',
            'Hover mouse di atas kartu produk dan perhatikan elevasi bayangan serta pergeseran posisi kartu yang sangat halus.',
            'Coba ubah warna --brand di :root dan perhatikan seluruh tombol, logo, dan harga berganti tema secara instan.',
        ],
        'experimentsEn': [
            'Load the storefront in browser, toggle to Dark Mode, and evaluate the subdued, eye-friendly night palette.',
            'Resize the screen from mobile to desktop width to watch cards redistribute from 1, to 2, to 3, to 4 columns automatically.',
            'Hover over product cards to test the tactile elevation lift and subtle shadow expansion.',
            'Adjust the --brand OKLCH token at :root to observe all brand accents re-theming synchronously.',
        ],
        'challengeId': 'Tambahkan laci keranjang belanja geser (Shopping Bag Drawer) ke storefront ini: gunakan `position: fixed; right: 0; top: 0; bottom: 0; width: min(400px, 100%); z-index: 100` dengan transisi `transform: translateX(100%)` saat tertutup dan `translateX(0)` saat dibuka.',
        'challengeEn': 'Add a sliding Shopping Bag Drawer to this storefront: implement `position: fixed; right: 0; top: 0; bottom: 0; width: min(400px, 100%); z-index: 100` with a smooth `transform: translateX(100%)` closed state and `translateX(0)` open state.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum CSS3 dari nol hingga menghasilkan sistem desain e-commerce kelas produksi. Kamu kini siap melangkah ke Tailwind CSS atau JavaScript untuk menambahkan interaktivitas dinamis!',
        'summaryEn': 'Congratulations! You have completed the entire CSS3 curriculum from foundational box models to a production-grade e-commerce design system. You are now prepared to advance to Tailwind CSS or JavaScript for dynamic programming logic!',
    },
]

def get_track():
    return {
        'slug': 'css3',
        'track_name': 'CSS3',
        'levels': LEVELS,
        'modules': MODULES,
    }
