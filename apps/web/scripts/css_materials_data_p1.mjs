export const CSS_WEEKS_P1 = [
  // ── MINGGU 1: Pengenalan CSS dan Penghubung Stylesheet ──────────────────────────────
  {
    week: 1,
    topicId: 'sintaks-dan-penghubung-css',
    levelId: 'beginer',
    levelNameId: 'Dasar CSS & Model Kotak',
    levelNameEn: 'CSS Basics & Box Model',
    category: 'CSS3',
    titleId: 'Pengenalan CSS dan Penghubung Stylesheet',
    titleEn: 'CSS Introduction and Linking Stylesheets',
    objectivesId: [
      'Memahami peran CSS (Cascading Style Sheets) dalam memisahkan struktur (HTML) dari tampilan visual',
      'Menguasai anatomi aturan sintaks CSS: selector, property, value, dan tanda kurung kurawal',
      'Mengenal 3 metode penyisipan CSS: external stylesheet, internal style, dan inline style',
      'Menerapkan struktur file proyek web standar (index.html dan styles.css)',
      'Membuat CSS Reset dasar menggunakan universal selector (*) dan box-sizing'
    ],
    objectivesEn: [
      'Understand the role of CSS in separating structure (HTML) from visual presentation',
      'Master the anatomy of CSS rules: selector, property, value, and declaration blocks',
      'Learn 3 CSS inclusion methods: external stylesheet, internal style, and inline style',
      'Set up standard web project file architecture (index.html and styles.css)',
      'Construct a fundamental CSS Reset using universal selector (*) and box-sizing'
    ],
    contentId: `## 1. Apa Itu CSS dan Anatomi Sintaksnya?

CSS (**Cascading Style Sheets**) adalah bahasa aturan deklaratif yang menginstruksikan browser cara merender dan memberi gaya pada elemen HTML.

Setiap deklarasi CSS memiliki struktur baku:

\`\`\`text
   Selector       Declaration Block
   ┌──────┐  ┌─────────────────────────┐
   h1        { color: #2E5B44; font-size: 24px; }
               └─────────────┘ └──────────────┘
                  Property          Value
\`\`\`

- **Selector**: Menunjuk elemen HTML mana yang hendak dihias (misal: \`h1\`, \`p\`, \`.kartu\`).
- **Property**: Aspek gaya yang ingin diatur (misal: \`color\`, \`font-size\`, \`background\`).
- **Value**: Nilai spesifik untuk properti tersebut (misal: \`#2E5B44\`, \`16px\`).
- **Declaration Block**: Blok kurung kurawal \`{ ... }\` yang mengelompokkan satu atau lebih deklarasi yang dipisahkan oleh tanda titik koma (\`;\`).

---

## 2. Struktur File Proyek dan 3 Cara Menghubungkan CSS

Dalam pengembangan proyek nyata, struktur direktori standar memisahkan kode markup dan styling:

\`\`\`text
my-css-project/
├── index.html       # Struktur konten HTML
├── styles.css       # Seluruh aturan presentasi visual
└── images/          # Aset visual pendukung
\`\`\`

Ada 3 metode untuk menerapkan CSS ke halaman HTML:

### A. External Stylesheet (Rekomendasi Standar)
File CSS disimpan terpisah dalam file \`styles.css\` dan dihubungkan pada bagian \`<head>\` dokumen HTML:
\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`
*Kelebihan:* File dapat di-cache oleh browser dan digunakan ulang di puluhan halaman sekaligus.

### B. Internal Style
Ditulis langsung di dalam tag \`<style>\` di dalam elemen \`<head>\`:
\`\`\`html
<head>
  <style>
    body { background-color: #F8FAF9; }
  </style>
</head>
\`\`\`
*Kelebihan:* Cocok untuk prototipe satu halaman atau preview langsung di editor.

### C. Inline Style
Ditulis langsung pada atribut \`style\` milik elemen:
\`\`\`html
<p style="color: #2E5B44; font-weight: bold;">Teks bergaya langsung</p>
\`\`\`
*Catatan:* Hindari inline style untuk proyek skala besar karena mencampur aduk markup dan styling serta sulit dirawat.

---

## 3. CSS Reset Dasar
Browser bawaan (Chrome, Safari, Firefox) menyertakan stylesheet bawaan (*User Agent Stylesheet*) yang memiliki margin dan padding default tidak seragam. Untuk menyamakan tampilan, setiap proyek profesional diawali dengan CSS Reset:

\`\`\`css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
\`\`\``,
    contentEn: `## 1. What is CSS and its Syntax Anatomy?

CSS (**Cascading Style Sheets**) is a declarative styling language directing browsers how to render and visually format HTML elements.

Every CSS rule adheres to a standard anatomy:

\`\`\`text
   Selector       Declaration Block
   ┌──────┐  ┌─────────────────────────┐
   h1        { color: #2E5B44; font-size: 24px; }
               └─────────────┘ └──────────────┘
                  Property          Value
\`\`\`

- **Selector**: Targets the HTML elements to style (e.g., \`h1\`, \`p\`, \`.card\`).
- **Property**: The visual aspect being adjusted (e.g., \`color\`, \`font-size\`, \`background\`).
- **Value**: The specific parameter assigned (e.g., \`#2E5B44\`, \`16px\`).
- **Declaration Block**: Curly braces \`{ ... }\` grouping declarations separated by semicolons (\`;\`).

---

## 2. Project File Architecture and 3 Inclusion Methods

In production development, project structure cleanly separates markup from visual presentation:

\`\`\`text
my-css-project/
├── index.html       # HTML document structure
├── styles.css       # Visual presentation rules
└── images/          # Supplementary assets
\`\`\`

There are 3 standard methods to connect CSS into HTML:

### A. External Stylesheet (Production Standard)
CSS rules reside in an external \`styles.css\` file referenced inside the HTML \`<head>\`:
\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`
*Benefit:* Cached across page visits and reused across hundreds of templates.

### B. Internal Style
Defined directly within \`<style>\` tags inside the document \`<head>\`:
\`\`\`html
<head>
  <style>
    body { background-color: #F8FAF9; }
  </style>
</head>
\`\`\`
*Benefit:* Ideal for single-page isolated prototypes or interactive playgrounds.

### C. Inline Style
Defined directly via the \`style\` attribute on an element:
\`\`\`html
<p style="color: #2E5B44; font-weight: bold;">Directly styled text</p>
\`\`\`
*Warning:* Avoid inline styles in production as they tightly couple layout with markup and break maintainability.

---

## 3. Foundational CSS Reset
Browsers apply built-in user agent stylesheets with inconsistent default margins. To ensure cross-browser uniformity, every professional project initiates with a reset:

\`\`\`css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
\`\`\``,
    programTitleId: 'Struktur Proyek CSS Pertama dengan Reset dan Header Banner',
    programTitleEn: 'First CSS Project Structure with Reset and Header Banner',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Langkah Pertama CSS</title>
  <style>
    /* 1. CSS Reset Dasar */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* 2. Styling Elemen Body */
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F4F6F4;
      color: #2D3748;
      line-height: 1.6;
      padding: 24px;
    }

    /* 3. Header Banner */
    .header-banner {
      background-color: #2E5B44;
      color: #FFFFFF;
      padding: 32px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 24px;
    }

    .header-banner h1 {
      font-size: 28px;
      margin-bottom: 8px;
    }

    .header-banner p {
      font-size: 16px;
      opacity: 0.9;
    }

    /* 4. Kontainer Konten */
    .konten-box {
      background-color: #FFFFFF;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #E2E8F0;
    }

    .konten-box h2 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>

  <header class="header-banner">
    <h1>Studio Web Mandiri</h1>
    <p>Membangun antarmuka terstruktur dengan standar CSS3 murni.</p>
  </header>

  <main class="konten-box">
    <h2>Langkah 1: Memisahkan Struktur dan Gaya</h2>
    <p>HTML menyediakan kerangka semantik, sementara CSS bertugas mengatur tata letak, jarak, tipografi, dan warna dokumen.</p>
  </main>

</body>
</html>`,
    breakdownId: [
      '`* { margin: 0; padding: 0; box-sizing: border-box; }`: Reset universal untuk menghapus jarak bawaan browser dan memastikan perhitungan ukuran elemen akurat.',
      '`body { font-family: ...; line-height: 1.6; }`: Mengatur jenis huruf sistem yang bersih dan keterbacaan baris teks di seluruh dokumen.',
      '`.header-banner`: Class selector untuk membuat kartu header berwarna hijau `#2E5B44` dengan sudut membulat `border-radius: 12px`.',
      '`.konten-box`: Komponen kartu konten berwarna putih dengan garis tepi tipis `#E2E8F0` sebagai batas visual.',
      '`padding` vs `margin`: Padding memberi ruang bernapas di dalam kotak, sementara margin memberi jarak pemisah antar elemen luar.'
    ],
    breakdownEn: [
      '`* { margin: 0; padding: 0; box-sizing: border-box; }`: Universal reset removing default browser margins and securing predictable sizing.',
      '`body { font-family: ...; line-height: 1.6; }`: Configures system typography and vertical reading rhythm across the whole document.',
      '`.header-banner`: Class selector styling the forest green header card with curved 12px corners.',
      '`.konten-box`: White content container with subtle border frame separating text sections.',
      '`padding` vs `margin`: Padding creates breathing room inside containers, while margin establishes external spacing between elements.'
    ],
    pitfallsId: [
      'Lupa tanda titik koma (;): Setiap deklarasi properti wajib diakhiri dengan titik koma, jika tertinggal maka deklarasi berikutnya akan diabaikan oleh browser.',
      'Menulis inline style berlebihan: Mencampur styling di atribut tag HTML membuat pemeliharaan kode sangat sulit saat halaman bertambah banyak.',
      'Lupa menyertakan rel="stylesheet" pada tag <link>: Jika atribut rel tertinggal, browser tidak akan memuat file CSS eksternal.',
      'Salah penulisan kurung kurawal: Seluruh properti wajib berada di dalam blok { } penutup yang cocok.'
    ],
    pitfallsEn: [
      'Missing semicolon (;): Each property declaration must conclude with a semicolon, or subsequent properties will fail to parse.',
      'Excessive inline styles: Embedding style attributes directly into HTML destroys code maintainability as projects expand.',
      'Omitting rel="stylesheet" on <link>: Without the rel attribute, browsers will ignore linked CSS files.',
      'Mismatched curly braces: Every declaration block must be cleanly opened and closed with matching braces { }.'
    ]
  },

  // ── MINGGU 2: Selektor dan Spesifisitas ──────────────────────────────────────
  {
    week: 2,
    topicId: 'selektor-dan-spesifisitas',
    levelId: 'beginer',
    levelNameId: 'Dasar CSS & Model Kotak',
    levelNameEn: 'CSS Basics & Box Model',
    category: 'CSS3',
    titleId: 'Selektor dan Spesifisitas',
    titleEn: 'Selectors and Specificity',
    objectivesId: [
      'Menguasai tipe-tipe selektor dasar: element/tag, class (.), dan ID (#)',
      'Memahami selektor kombinator: descendant selector (spasi) dan direct child selector (>)',
      'Menerapkan pseudo-class interaktif untuk interaksi pengguna (:hover, :focus, :active)',
      'Memahami hierarki kalkulasi spesifisitas CSS dan aturan cascade (tingkat prioritas)',
      'Menghindari penggunaan !important dengan merancang arsitektur selektor yang tertata'
    ],
    objectivesEn: [
      'Master core selector types: element/tag, class (.), and ID (#)',
      'Understand combinator selectors: descendant (space) and direct child (>)',
      'Apply interactive pseudo-classes for user feedback (:hover, :focus, :active)',
      'Understand CSS specificity score calculation and cascade priority rules',
      'Eliminate reliance on !important by organizing structured selector specificity'
    ],
    contentId: `## 1. Jenis-Jenis Selektor CSS

Selektor adalah instrumen utama untuk memilih elemen HTML mana yang hendak diberi aturan gaya.

### A. Selektor Dasar
- **Element Selector**: Memilih berdasarkan nama tag HTML (\`p\`, \`button\`, \`h2\`).
- **Class Selector (\`.\`)**: Memilih elemen yang memiliki atribut \`class\`. Dapat digunakan berulang kali pada banyak elemen.
- **ID Selector (\`#\`)**: Memilih satu elemen spesifik dengan atribut \`id\`. Harus unik per halaman.

### B. Selektor Kombinator
- **Descendant (\`A B\`)**: Memilih semua elemen \`B\` yang berada di dalam elemen \`A\` pada level kedalaman apa pun:
  \`\`\`css
  .navigasi a { color: #2E5B44; }
  \`\`\`
- **Child (\`A > B\`)**: Memilih elemen \`B\` yang merupakan anak langsung (*direct child*) dari elemen \`A\`:
  \`\`\`css
  .daftar-menu > li { list-style: none; }
  \`\`\`

---

## 2. Pseudo-Class Interaksi Pengguna

Pseudo-class menargetkan keadaan khusus dari suatu elemen saat berinteraksi:
- \`:hover\`: Saat kursor mouse berada di atas elemen.
- \`:focus\`: Saat elemen menerima fokus navigasi keyboard atau kursor ketik.
- \`:active\`: Saat elemen sedang ditekan atau diklik.

\`\`\`css
.btn {
  background-color: #2E5B44;
  color: white;
}
.btn:hover {
  background-color: #234634;
}
.btn:active {
  background-color: #1A3427;
}
\`\`\`

---

## 3. Spesifisitas: Cara Browser Menentukan Pemenang Aturan

Jika dua aturan bertentangan menargetkan elemen yang sama, browser menghitung skor spesifisitas:

\`\`\`text
Tingkat Hierarki Spesifisitas:
┌─────────────────┬───────────────────┬──────────────────┬─────────────────┐
│ Inline Style    │ ID Selector       │ Class & Pseudo   │ Element / Tag   │
│ (style="...")   │ (#header)         │ (.btn, :hover)   │ (button, p)     │
│ Skor: 1,0,0,0   │ Skor: 0,1,0,0     │ Skor: 0,0,1,0    │ Skor: 0,0,0,1   │
└─────────────────┴───────────────────┴──────────────────┴─────────────────┘
\`\`\`

- \`button\` = skor \`0,0,0,1\`
- \`.btn\` = skor \`0,0,1,0\` (Menang atas element)
- \`.nav .btn\` = skor \`0,0,2,0\`
- \`#btn-utama\` = skor \`0,1,0,0\` (Menang atas class)`,
    contentEn: `## 1. CSS Selector Types

Selectors target the specific HTML elements to receive formatting rules.

### A. Core Selectors
- **Element Selector**: Selects by tag name (\`p\`, \`button\`, \`h2\`).
- **Class Selector (\`.\`)**: Targets elements bearing a given \`class\` attribute. Reusable across multiple tags.
- **ID Selector (\`#\`)**: Selects an element with a unique \`id\`. Must be singular per page.

### B. Combinators
- **Descendant (\`A B\`)**: Matches all \`B\` elements inside \`A\` regardless of nesting depth:
  \`\`\`css
  .nav a { color: #2E5B44; }
  \`\`\`
- **Direct Child (\`A > B\`)**: Targets \`B\` elements that are direct immediate children of \`A\`:
  \`\`\`css
  .menu-list > li { list-style: none; }
  \`\`\`

---

## 2. Interactive Pseudo-Classes

Pseudo-classes target temporary element states during user interaction:
- \`:hover\`: When the mouse pointer hovers over the element.
- \`:focus\`: When an input or link receives keyboard focus.
- \`:active\`: While the element is actively pressed down.

\`\`\`css
.btn {
  background-color: #2E5B44;
  color: white;
}
.btn:hover {
  background-color: #234634;
}
.btn:active {
  background-color: #1A3427;
}
\`\`\`

---

## 3. Specificity: How Browsers Resolve Conflicts

When competing declarations target the same element, browsers resolve precedence via specificity scores:

\`\`\`text
Specificity Weight Hierarchy:
┌─────────────────┬───────────────────┬──────────────────┬─────────────────┐
│ Inline Style    │ ID Selector       │ Class & Pseudo   │ Element / Tag   │
│ (style="...")   │ (#header)         │ (.btn, :hover)   │ (button, p)     │
│ Score: 1,0,0,0  │ Score: 0,1,0,0    │ Score: 0,0,1,0   │ Score: 0,0,0,1  │
└─────────────────┴───────────────────┴──────────────────┴─────────────────┘
\`\`\``,
    programTitleId: 'Penerapan Selektor Kombinasi dan Tombol Interaktif',
    programTitleEn: 'Applying Combinator Selectors and Interactive Buttons',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Selektor dan Spesifisitas</title>
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
      padding: 32px;
      line-height: 1.5;
    }

    /* 1. Class Selector untuk Kartu */
    .card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      max-width: 480px;
      margin: 0 auto 24px auto;
    }

    /* 2. Descendant Selector */
    .card h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 8px;
    }

    .card p {
      color: #718096;
      font-size: 14px;
      margin-bottom: 20px;
    }

    /* 3. Class Tombol Dasar */
    .btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    /* 4. Modifier Class: Tombol Primer */
    .btn-primer {
      background-color: #2E5B44;
      color: #FFFFFF;
    }

    .btn-primer:hover {
      background-color: #234634;
      transform: translateY(-1px);
    }

    .btn-primer:active {
      background-color: #1A3427;
      transform: translateY(1px);
    }

    /* 5. Modifier Class: Tombol Sekunder */
    .btn-sekunder {
      background-color: #EDF2F7;
      color: #4A5568;
      margin-left: 8px;
    }

    .btn-sekunder:hover {
      background-color: #E2E8F0;
      color: #2D3748;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Pengaturan Notifikasi Akun</h3>
    <p>Pilih preferensi notifikasi Anda untuk menerima pembaruan berkala langsung ke email.</p>
    <div>
      <a href="#" class="btn btn-primer">Simpan Preferensi</a>
      <a href="#" class="btn btn-sekunder">Batal</a>
    </div>
  </div>

</body>
</html>`,
    breakdownId: [
      '`.card`: Class selector yang membungkus komponen dalam panel kartu terisolasi dengan batas abu-abu lembut.',
      '`.card h3`: Descendant selector yang menargetkan hanya judul `h3` yang berada di dalam kontainer `.card`.',
      '`.btn`: Base class yang menentukan ukuran padding, border-radius, dan perilaku cursor umum untuk semua tombol.',
      '`.btn-primer` dan `.btn-sekunder`: Modifier classes yang memberikan skema warna berbeda sesuai fungsinya.',
      '`:hover` dan `:active`: Pseudo-classes yang memberikan umpan balik visual instan saat kursor melayang atau mengklik tombol.'
    ],
    breakdownEn: [
      '`.card`: Class selector isolating component styling within a clean bordered white container.',
      '`.card h3`: Descendant selector styling only `h3` headings that exist inside `.card`.',
      '`.btn`: Base component class providing baseline dimensions, padding, and pointer cursor.',
      '`.btn-primer` and `.btn-sekunder`: Modifier classes applying semantic forest green and light gray color schemes.',
      '`:hover` and `:active`: Pseudo-classes providing immediate feedback during user pointer hover and clicks.'
    ],
    pitfallsId: [
      'Ketergantungan pada !important: Menyisipkan !important merusak aturan cascade alami dan menyebabkan konflik gaya di masa mendatang.',
      'Menggunakan ID selector untuk styling: ID memiliki spesifisitas terlalu tinggi (0,1,0,0) yang sulit ditimpa oleh class lain.',
      'Spesifisitas terlalu dalam: Menulis selektor panjang seperti body div.main ul li a membuat kode kaku dan lambat diproses browser.',
      'Lupa tanda titik pada class selector: Menulis card alih-alih .card akan membuat browser mencari tag kustom <card> bukannya class="card".'
    ],
    pitfallsEn: [
      'Overreliance on !important: Bypassing cascade order causes severe selector collisions down the road.',
      'Using ID selectors for general styling: IDs carry excessive specificity (0,1,0,0) preventing class-based overrides.',
      'Over-nested selector chains: Writing body div.main ul li a creates fragile, tightly-coupled stylesheets.',
      'Omitting the leading dot for classes: Writing card instead of .card causes browsers to query for a custom <card> HTML tag.'
    ]
  },

  // ── MINGGU 3: Box Model dan Kalkulasi Elemen ─────────────────────────────────
  {
    week: 3,
    topicId: 'box-model-dan-kalkulasi',
    levelId: 'beginer',
    levelNameId: 'Dasar CSS & Model Kotak',
    levelNameEn: 'CSS Basics & Box Model',
    category: 'CSS3',
    titleId: 'Box Model dan Kalkulasi Elemen',
    titleEn: 'Box Model and Element Calculation',
    objectivesId: [
      'Memahami anatomi 4 lapisan CSS Box Model: Content, Padding, Border, dan Margin',
      'Membedakan perilaku box-sizing: content-box vs box-sizing: border-box',
      'Menguasai fenomena margin collapsing (penggabungan margin vertikal)',
      'Memahami perbedaan peran antara border dan outline',
      'Mengatur jarak internal dan eksternal secara konsisten pada tata letak antarmuka'
    ],
    objectivesEn: [
      'Understand the 4 anatomical layers of CSS Box Model: Content, Padding, Border, Margin',
      'Distinguish box-sizing: content-box behavior from box-sizing: border-box',
      'Understand the mechanics of vertical margin collapsing',
      'Differentiate visual roles between border and outline',
      'Coordinate internal padding and external margins consistently across layouts'
    ],
    contentId: `## 1. Anatomi CSS Box Model

Setiap elemen HTML yang dirender oleh browser diperlakukan sebagai sebuah kotak persegi panjang (**Box Model**) yang terdiri dari 4 lapisan konsentris:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│  MARGIN (Jarak luar pemisah dengan elemen lain)        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  BORDER (Garis batas fisik di sekeliling elemen) │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  PADDING (Ruang bernapas dalam elemen)     │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │  CONTENT (Area teks, gambar, objek)  │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Content**: Area inti tempat teks, gambar, atau elemen anak berada (diatur via \`width\` & \`height\`).
2. **Padding**: Ruang kosong transparan di antara konten dan garis batas (border). Mengadopsi warna background elemen.
3. **Border**: Garis tepi yang mengelilingi padding dan konten.
4. **Margin**: Jarak transparan di luar border yang memisahkan elemen ini dari elemen sekitarnya.

---

## 2. Kalkulasi Ukuran: content-box vs border-box

Secara default, browser menghitung ukuran elemen menggunakan \`content-box\`:

\`\`\`text
content-box:
Lebar Total = width + padding-left + padding-right + border-left + border-right
Jika width: 300px, padding: 20px, border: 2px
-> Lebar Total Sebenarnya = 300 + 40 + 4 = 344px! (Kotak membesar!)
\`\`\`

Solusi standar industri adalah menggunakan **\`border-box\`**:

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

Dengan \`border-box\`, jika Anda menentukan \`width: 300px\`, browser akan menyusutkan area konten ke dalam sehingga lebar total elemen **tetap tepat 300px**.

---

## 3. Margin Collapsing (Penggabungan Margin Vertikal)

Ketika dua elemen bertumpuk secara vertikal dan masing-masing memiliki margin:
- Elemen atas memiliki \`margin-bottom: 20px\`
- Elemen bawah memiliki \`margin-top: 30px\`

Jarak di antara keduanya **bukan 50px**, melainkan **30px** (margin terbesar yang menang). Fenomena ini hanya terjadi pada sumbu vertikal (*top-bottom*), tidak berlaku pada sumbu horizontal (*left-right*).`,
    contentEn: `## 1. Anatomy of the CSS Box Model

Every rendered HTML element is evaluated as a rectangular bounding box consisting of 4 concentric layers:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│  MARGIN (External spacing separating sibling elements) │
│  ┌──────────────────────────────────────────────────┐  │
│  │  BORDER (Physical frame surrounding padding)    │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │  PADDING (Internal breathing room)         │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │  CONTENT (Area holding text/media)   │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
\`\`\`

1. **Content**: The core area containing text or nested children (\`width\` and \`height\`).
2. **Padding**: Transparent clearance between content and the border frame, displaying element background color.
3. **Border**: The frame wrapping padding and content.
4. **Margin**: Transparent external distance clearing space around the border.

---

## 2. Sizing Calculations: content-box vs border-box

By default, browsers calculate dimensions under \`content-box\`:

\`\`\`text
content-box:
Total Rendered Width = width + padding-left + padding-right + border-left + border-right
Example: width: 300px, padding: 20px, border: 2px
-> Total Width = 300 + 40 + 4 = 344px!
\`\`\`

The universal industry remedy is **\`border-box\`**:

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

Under \`border-box\`, assigning \`width: 300px\` ensures the computed total box width remains strictly 300px.

---

## 3. Vertical Margin Collapsing

When block elements stack vertically with adjoining margins:
- Element A has \`margin-bottom: 20px\`
- Element B has \`margin-top: 30px\`

The gap collapses to the single largest value: **30px** (not 50px). Margin collapsing only affects vertical margins.`,
    programTitleId: 'Visualisasi Interaktif Lapisan Box Model',
    programTitleEn: 'Interactive Box Model Layer Visualizer',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Box Model Visualizer</title>
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
      padding: 32px;
      line-height: 1.5;
    }

    .wrapper {
      max-width: 520px;
      margin: 0 auto;
    }

    h2 {
      color: #2E5B44;
      margin-bottom: 16px;
      text-align: center;
    }

    /* Lapisan 1: Area Margin (Warna Kuning/Oranye) */
    .box-margin {
      background-color: #FEEBC8;
      border: 2px dashed #DD6B20;
      padding: 24px; /* Merepresentasikan margin 24px */
      border-radius: 12px;
      text-align: center;
    }

    .label-layer {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: block;
    }

    /* Lapisan 2: Area Border (Warna Hijau Zaitun) */
    .box-border {
      background-color: #FEFCBF;
      border: 4px solid #D69E2E;
      padding: 20px; /* Merepresentasikan padding 20px */
      border-radius: 8px;
    }

    /* Lapisan 3: Area Padding (Warna Hijau Mint) */
    .box-padding {
      background-color: #C6F6D5;
      border: 1px dashed #38A169;
      padding: 20px;
      border-radius: 6px;
    }

    /* Lapisan 4: Area Content (Warna Biru / Inti) */
    .box-content {
      background-color: #BEE3F8;
      border: 1px solid #3182CE;
      padding: 16px;
      border-radius: 4px;
      color: #2B6CB0;
      font-weight: 600;
      font-size: 14px;
    }
  </style>
</head>
<body>

  <div class="wrapper">
    <h2>Anatomi CSS Box Model</h2>

    <div class="box-margin">
      <span class="label-layer" style="color: #C05621;">Lapisan 1: Margin (Area Eksternal)</span>
      
      <div class="box-border">
        <span class="label-layer" style="color: #B7791F;">Lapisan 2: Border (Garis Batas)</span>
        
        <div class="box-padding">
          <span class="label-layer" style="color: #2F855A;">Lapisan 3: Padding (Jarak Internal)</span>
          
          <div class="box-content">
            Lapisan 4: Content (Teks & Data)
          </div>
        </div>
      </div>
    </div>
  </div>

</body>
</html>`,
    breakdownId: [
      '`box-sizing: border-box`: Memastikan perhitungan dimensi total elemen mencakup padding dan border tanpa mengubah ukuran kotak.',
      '`.box-margin`: Merepresentasikan ruang luar margin yang mengisolasi komponen dari elemen di sekitarnya.',
      '`.box-border`: Garis fisik (`border: 4px solid #D69E2E`) yang membingkai elemen dan membedakannya dari latar belakang.',
      '`.box-padding`: Ruang bernapas internal (`padding: 20px`) yang menjaga agar teks konten tidak menempel pada garis tepi border.',
      '`.box-content`: Area inti tempat informasi aktual dirender oleh browser.'
    ],
    breakdownEn: [
      '`box-sizing: border-box`: Guarantees computed box boundaries encompass inner padding and borders without inflating width.',
      '`.box-margin`: Demonstrates external margin space isolating component boundaries from adjacent containers.',
      '`.box-border`: Demonstrates physical border perimeter framing internal content.',
      '`.box-padding`: Demonstrates inner padding buffer preventing text from colliding with borders.',
      '`.box-content`: Represents the core information payload rendered on screen.'
    ],
    pitfallsId: [
      'Tidak mengaktifkan border-box: Menambahkan padding pada elemen dengan width: 100% tanpa border-box akan menyebabkan overflow horizontal (muncul scrollbar samping).',
      'Bingung antara padding dan margin: Menggunakan margin saat ingin memperluas area latar belakang elemen (background tidak mencakup area margin).',
      'Kebingungan margin collapsing: Mengharapkan margin bertumpuk secara matematis (misal: 20px + 20px = 40px), padahal browser menyatukannya menjadi 20px.',
      'Menggunakan outline untuk membuat ruang: Outline tidak memakan ruang dalam kalkulasi layout dan akan menimpa elemen di dekatnya.'
    ],
    pitfallsEn: [
      'Omitting box-sizing: border-box: Adding padding to a 100% width container without border-box causes horizontal scrollbar overflow.',
      'Confusing padding with margin: Using margin to expand clickable or colored background surface (background color only covers padding, never margin).',
      'Margin collapsing surprises: Expecting 20px + 20px vertical margins to produce 40px gap when browsers collapse it to 20px.',
      'Using outline for spacing: Outlines do not take up box layout space and visually overlap adjacent sibling elements.'
    ]
  },

  // ── MINGGU 4: Tipografi dan Format Teks ───────────────────────────────────────
  {
    week: 4,
    topicId: 'tipografi-dan-format-teks',
    levelId: 'beginer',
    levelNameId: 'Dasar CSS & Model Kotak',
    levelNameEn: 'CSS Basics & Box Model',
    category: 'CSS3',
    titleId: 'Tipografi dan Format Teks',
    titleEn: 'Typography and Text Formatting',
    objectivesId: [
      'Memahami pemilihan font-family dan fallback stack sistem operasi',
      'Menguasai unit ukuran tipografi: px vs rem (root em) vs em untuk aksesibilitas',
      'Mengatur ritme vertikal bacaan menggunakan line-height dan letter-spacing',
      'Mengontrol ketebalan teks (font-weight) dan perataan teks (text-align)',
      'Membangun hierarki artikel yang nyaman dibaca dengan rasio perbandingan ukuran yang konsisten'
    ],
    objectivesEn: [
      'Understand font-family selection and system fallback font stacks',
      'Master typography sizing units: px vs rem (root em) vs em for accessibility',
      'Control vertical reading rhythm with line-height and letter-spacing',
      'Direct typographic weight (font-weight) and paragraph alignment (text-align)',
      'Build readable article hierarchy using consistent type scales'
    ],
    contentId: `## 1. Pemilihan Font Family & Fallback Stack

Ketika menentukan \`font-family\`, selalu sertakan daftar cadangan (*font stack*) dari yang paling spesifik ke kategori generik:

\`\`\`css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
\`\`\`

- Jika San Francisco (Apple) tidak tersedia, browser mencoba Segoe UI (Windows), lalu Roboto (Android), dan terakhir \`sans-serif\` generik.

---

## 2. Unit Ukuran: Mengapa 'rem' Lebih Unggul dari 'px'?

- **\`px\` (Pixel)**: Ukuran statis absolut. Jika pengguna mengubah ukuran teks default di pengaturan browser (misal untuk alasan gangguan penglihatan), teks dengan \`px\` **tidak akan membesar**.
- **\`rem\` (Root EM)**: Ukuran relatif terhadap ukuran font elemen root (\`<html>\`).
  - Secara default pada hampir semua browser: \`1rem = 16px\`.
  - \`1.5rem = 24px\`
  - \`2rem = 32px\`
- **\`em\`**: Relatif terhadap ukuran font elemen induknya (*parent element*). Hati-hati dengan compounding effect saat elemen bersarang bertingkat.

---

## 3. Ritme Vertikal: line-height & letter-spacing

Kenyamanan membaca teks artikel sangat ditentukan oleh dua properti:

\`\`\`css
p {
  font-size: 1rem;       /* 16px */
  line-height: 1.6;      /* Rasio jarak antar baris 1.6x ukuran font */
  letter-spacing: -0.01em; /* Mengatur kerapatan spasi antar huruf */
  color: #374151;        /* Hindari hitam pekat #000 untuk teks panjang */
}
\`\`\`

- Gunakan angka tanpa unit untuk \`line-height\` (misal: \`1.5\` atau \`1.6\`), bukan piksel, agar proporsinya otomatis menyesuaikan ukuran font.`,
    contentEn: `## 1. Font Family & Fallback Stacks

When assigning \`font-family\`, always specify a resilient fallback sequence concluding with a generic family:

\`\`\`css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
\`\`\`

- If San Francisco (Apple) is absent, the browser falls back to Segoe UI (Windows), Roboto (Android), and finally generic \`sans-serif\`.

---

## 2. Sizing Units: Why 'rem' Outperforms 'px' for Accessibility

- **\`px\` (Pixels)**: Static absolute units. If users scale their system browser font size for readability, \`px\` values remain rigid and inaccessible.
- **\`rem\` (Root EM)**: Relative to root (\`<html>\`) font size.
  - Standard browser baseline: \`1rem = 16px\`.
  - \`1.25rem = 20px\`
  - \`2rem = 32px\`
- **\`em\`**: Relative to immediate parent font size. Prone to cascading magnification when deeply nested.

---

## 3. Vertical Rhythm: line-height & letter-spacing

Reading comfort depends heavily on spacing ergonomics:

\`\`\`css
p {
  font-size: 1rem;       /* 16px */
  line-height: 1.6;      /* Unitless multiplier based on font-size */
  letter-spacing: -0.01em;
  color: #374151;        /* Softer charcoal avoiding harsh pure black #000 */
}
\`\`\`

- Always specify unitless values for \`line-height\` (e.g. \`1.5\` or \`1.6\`) so child elements inherit proportional scaling.`,
    programTitleId: 'Tata Letak Tipografi Artikel dengan Skala Hierarki Jelas',
    programTitleEn: 'Editorial Typography Layout with Clear Modular Scale',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Spesimen Tipografi</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #FAFAFA;
      color: #1F2937;
      padding: 40px 20px;
    }

    .article-container {
      max-width: 640px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 40px;
      border-radius: 8px;
      border: 1px solid #E5E7EB;
    }

    .category-tag {
      font-size: 0.75rem; /* 12px */
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #2E5B44;
      margin-bottom: 8px;
      display: inline-block;
    }

    h1 {
      font-size: 2rem; /* 32px */
      line-height: 1.25;
      font-weight: 800;
      color: #111827;
      letter-spacing: -0.025em;
      margin-bottom: 16px;
    }

    .lead-paragraph {
      font-size: 1.125rem; /* 18px */
      line-height: 1.6;
      color: #4B5563;
      margin-bottom: 24px;
    }

    h2 {
      font-size: 1.375rem; /* 22px */
      line-height: 1.35;
      font-weight: 700;
      color: #1F2937;
      margin-top: 32px;
      margin-bottom: 12px;
      letter-spacing: -0.015em;
    }

    p {
      font-size: 1rem; /* 16px */
      line-height: 1.7;
      color: #374151;
      margin-bottom: 16px;
    }

    blockquote {
      border-left: 4px solid #2E5B44;
      padding-left: 16px;
      margin: 24px 0;
      font-style: italic;
      color: #4B5563;
    }
  </style>
</head>
<body>

  <article class="article-container">
    <span class="category-tag">Arsitektur Desain Web</span>
    <h1>Pondasi Tipografi yang Nyaman di Mata Pembaca</h1>
    
    <p class="lead-paragraph">
      Tipografi yang tertata rapi bukan sekadar memilih jenis huruf yang menarik, melainkan membangun hierarki ukuran dan jarak baca yang proporsional.
    </p>

    <h2>Mengapa Rasio Ukuran Penting?</h2>
    <p>
      Mata manusia membutuhkan pembeda visual yang tegas antara judul, subjudul, dan isi paragraf. Penggunaan rasio terukur menggunakan satuan rem membantu pembaca memindai konten dengan cepat.
    </p>

    <blockquote>
      "Desain yang baik membuat teks terasa tidak terlihat, pembaca hanya menikmati informasinya."
    </blockquote>

    <p>
      Hindari penggunaan warna hitam murni (#000000) pada latar belakang putih terang karena menimbulkan kontras berlebih yang melelahkan mata pembaca dalam durasi panjang.
    </p>
  </article>

</body>
</html>`,
    breakdownId: [
      '`font-size: 2rem` vs `1.125rem` vs `1rem`: Skala modular berbasis `rem` yang memberikan hierarki kontras yang jelas antara judul, teks pengantar, dan paragraf biasa.',
      '`line-height: 1.7`: Jarak vertikal yang lapang pada teks paragraf untuk mencegah mata pembaca salah membaca baris saat berpindah kalimat.',
      '`letter-spacing: -0.025em`: Sedikit merapatkan jarak antar huruf pada judul berukuran besar agar terlihat lebih padat dan tegas.',
      '`.category-tag`: Menggunakan `text-transform: uppercase` dan `letter-spacing: 0.1em` untuk badge kategori yang rapi.',
      '`blockquote`: Kutipan dengan aksen garis kiri `border-left: 4px solid #2E5B44` dan gaya miring `font-style: italic`.'
    ],
    breakdownEn: [
      '`font-size: 2rem` vs `1.125rem` vs `1rem`: Modular scale creating crisp contrast hierarchy across title, lead, and body copy.',
      '`line-height: 1.7`: Comfortable reading line spacing preventing reader eye tracking strain across lengthy passages.',
      '`letter-spacing: -0.025em`: Subtle negative tracking on large headlines tightening visual cohesion.',
      '`.category-tag`: Employs uppercase transformation with expanded letter-spacing for refined badge typography.',
      '`blockquote`: Accentuated editorial pullquote featuring forest green left border and italic posture.'
    ],
    pitfallsId: [
      'Line-height terlalu rapat: Menyetel line-height: 1.0 pada paragraf panjang membuat baris teks bertumpuk dan sangat sulit dibaca.',
      'Menggunakan piksel (px) statis untuk semua teks: Menghilangkan kemampuan scaling browser saat pengguna memperbesar ukuran teks demi keterbacaan.',
      'Kontras teks terlalu rendah: Menggunakan abu-abu terlalu terang (misal: #CCCCCC di atas putih) melanggar standar aksesibilitas WCAG karena teks sulit terbaca.',
      'Terlalu banyak variasi font: Menggunakan lebih dari 2 jenis font family dalam satu halaman membuat desain terlihat kacau dan memperlambat loading situs.'
    ],
    pitfallsEn: [
      'Too tight line-height: Setting line-height: 1.0 on multi-line text forces sentences to crash into each other.',
      'Static px sizing across all typography: Strips away browser assistive zoom scaling for low-vision accessibility.',
      'Poor contrast ratios: Light gray text on white backgrounds fails WCAG accessibility compliance standards.',
      'Font sprawl: Loading more than 2 distinct font families degrades visual hierarchy and bloats network performance.'
    ]
  },

  // ── MINGGU 5: Warna, Background, dan Border ─────────────────────────────────
  {
    week: 5,
    topicId: 'warna-background-dan-border',
    levelId: 'beginer',
    levelNameId: 'Dasar CSS & Model Kotak',
    levelNameEn: 'CSS Basics & Box Model',
    category: 'CSS3',
    titleId: 'Warna, Background, dan Border',
    titleEn: 'Colors, Backgrounds, and Borders',
    objectivesId: [
      'Menguasai sistem format warna: Hex, RGB, RGBA (transparansi), dan HSL',
      'Menerapkan background gradasi linier (linear-gradient) dan radial',
      'Mengatur gambar latar belakang dengan background-size: cover dan background-position',
      'Mengontrol sudut membulat dengan border-radius (termasuk bentuk pil dan lingkaran)',
      'Membuat efek kedalaman visual realistis menggunakan box-shadow berlapis (Level 1 Capstone)'
    ],
    objectivesEn: [
      'Master color representations: Hex, RGB, RGBA (alpha transparency), and HSL',
      'Implement linear and radial gradient backgrounds',
      'Configure background imagery with background-size: cover and background-position',
      'Master border-radius curvature (including pill and circle shapes)',
      'Construct realistic visual depth using layered box-shadow elevations (Level 1 Capstone)'
    ],
    contentId: `## 1. Format Warna dalam CSS

CSS mendukung beberapa format representasi warna:

- **Hexadecimal (\`#RRGGBB\`)**: Format paling umum, misal \`#2E5B44\`.
- **RGB / RGBA**: \`rgb(46, 91, 68)\` atau dengan kanal transparansi alpha \`rgba(46, 91, 68, 0.8)\`.
- **HSL**: \`hsl(147, 33%, 27%)\` (Hue, Saturation, Lightness). Sangat intuitif saat ingin membuat variasi warna yang lebih terang atau gelap.

---

## 2. Background: Warna, Gambar, dan Gradasi

CSS memungkinkan pengaturan latar belakang yang sangat fleksibel:

### A. Gradasi Linier (\`linear-gradient\`)
\`\`\`css
.banner {
  background: linear-gradient(135deg, #2E5B44 0%, #1A3427 100%);
}
\`\`\`

### B. Gambar Background dengan Kontrol Ukuran
\`\`\`css
.hero {
  background-image: url('pemandangan.jpg');
  background-size: cover;     /* Menutup seluruh kontainer tanpa distorsi */
  background-position: center; /* Titik fokus gambar selalu di tengah */
  background-repeat: no-repeat;
}
\`\`\`

---

## 3. Sudut Membulat (\`border-radius\`) dan Bayangan (\`box-shadow\`)

### A. Pola Border Radius
- Sudut lembut kartu: \`border-radius: 12px;\`
- Bentuk pil (tombol kapsul): \`border-radius: 9999px;\`
- Lingkaran avatar (jika width & height sama): \`border-radius: 50%;\`

### B. Anatomi Box Shadow Berlapis
\`\`\`text
box-shadow: offset-x offset-y blur-radius spread-radius color;
\`\`\`

Untuk efek bayangan yang halus dan realistis, gabungkan dua lapisan bayangan:
\`\`\`css
.card {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 20px -5px rgba(0, 0, 0, 0.08);
}
\`\`\``,
    contentEn: `## 1. CSS Color Formats

CSS supports multiple color models:

- **Hexadecimal (\`#RRGGBB\`)**: Standard format, e.g. \`#2E5B44\`.
- **RGB / RGBA**: \`rgb(46, 91, 68)\` or with alpha opacity \`rgba(46, 91, 68, 0.8)\`.
- **HSL**: \`hsl(147, 33%, 27%)\` (Hue, Saturation, Lightness). Intuitive for programming lighter or darker shades.

---

## 2. Backgrounds: Colors, Imagery, and Gradients

### A. Linear Gradients
\`\`\`css
.banner {
  background: linear-gradient(135deg, #2E5B44 0%, #1A3427 100%);
}
\`\`\`

### B. Background Images
\`\`\`css
.hero {
  background-image: url('landscape.jpg');
  background-size: cover;      /* Covers entire viewport container without distortion */
  background-position: center; /* Centers visual focal point */
  background-repeat: no-repeat;
}
\`\`\`

---

## 3. Curvature (\`border-radius\`) and Depth (\`box-shadow\`)

### A. Border Radius Patterns
- Card corners: \`border-radius: 12px;\`
- Pill shape badges: \`border-radius: 9999px;\`
- Circle avatar: \`border-radius: 50%;\` (when width equals height).

### B. Layered Box Shadows
\`\`\`css
.card {
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.05),
    0 10px 20px -5px rgba(0, 0, 0, 0.08);
}
\`\`\``,
    programTitleId: 'Kartu Produk Interaktif dengan Gradasi dan Bayangan Bertingkat',
    programTitleEn: 'Interactive Product Card with Gradients and Multi-Layer Elevation',
    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Warna dan Bayangan</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F0F4F2;
      color: #1F2937;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    /* Kartu Produk Utama */
    .product-card {
      background: #FFFFFF;
      width: 100%;
      max-width: 340px;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.05),
        0 10px 15px -3px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 
        0 10px 20px -3px rgba(46, 91, 68, 0.12),
        0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

    /* Header Banner dengan Gradasi Linier */
    .card-banner {
      background: linear-gradient(135deg, #2E5B44 0%, #1C3829 100%);
      color: #FFFFFF;
      padding: 32px 24px;
      text-align: center;
      position: relative;
    }

    /* Badge Bentuk Kapsul/Pil */
    .badge-status {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4px);
      color: #E2F2E9;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 8px;
    }

    .card-banner h3 {
      font-size: 20px;
      font-weight: 700;
    }

    /* Konten Body Kartu */
    .card-body {
      padding: 24px;
    }

    .card-body p {
      font-size: 14px;
      color: #4B5563;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .price-tag {
      font-size: 24px;
      font-weight: 800;
      color: #2E5B44;
      margin-bottom: 20px;
      display: block;
    }

    /* Tombol Pembelian */
    .btn-buy {
      display: block;
      width: 100%;
      background-color: #2E5B44;
      color: #FFFFFF;
      text-align: center;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      text-decoration: none;
      transition: background-color 0.15s ease;
    }

    .btn-buy:hover {
      background-color: #234634;
    }
  </style>
</head>
<body>

  <div class="product-card">
    <div class="card-banner">
      <span class="badge-status">Edisi Terbatas</span>
      <h3>Paket Pelatihan Web</h3>
    </div>
    
    <div class="card-body">
      <p>Kuasai teknik penyusunan antarmuka web mulai dari sintaks dasar hingga tata letak profesional tanpa framework.</p>
      <span class="price-tag">Rp 249.000</span>
      <a href="#" class="btn-buy">Daftar Sekarang</a>
    </div>
  </div>

</body>
</html>`,
    breakdownId: [
      '`background: linear-gradient(135deg, #2E5B44 0%, #1C3829 100%)`: Menghasilkan gradasi warna miring 135 derajat yang memberikan efek pencahayaan dinamis.',
      '`border-radius: 9999px`: Pola untuk membuat elemen kapsul/pil lonjong sempurna pada `.badge-status`.',
      '`box-shadow`: Penggunaan dua lapis bayangan lembut dengan transparansi rgba untuk kedalaman visual realistis tanpa efek kotor.',
      '`.product-card:hover`: Efek transisi halus mengangkat kartu sejauh `translateY(-4px)` saat kursor melayang.',
      '`overflow: hidden`: Memastikan latar belakang gradasi pada `.card-banner` terpotong rapi mengikuti lekukan `border-radius: 16px` kartu induk.'
    ],
    breakdownEn: [
      '`background: linear-gradient(...)`: Renders a 135-degree diagonal dual-stop color transition across the card header.',
      '`border-radius: 9999px`: Standard CSS technique for perfect capsule pill shapes on `.badge-status`.',
      '`box-shadow`: Layered elevation shadow pairing subtle ambient spread with directional falloff.',
      '`.product-card:hover`: Subtle tactile lift via `translateY(-4px)` responding to pointer hover.',
      '`overflow: hidden`: Ensures upper header gradient adheres strictly to the parent container corner curvature.'
    ],
    pitfallsId: [
      'Bayangan terlalu pekat: Menggunakan bayangan hitam solid seperti rgba(0,0,0,0.8) membuat antarmuka terlihat kotor dan kuno.',
      'Lupa overflow: hidden saat menggunakan border-radius: Elemen anak di pojok atas/bawah akan menabrak keluar sudut membulat kontainer induk jika overflow tidak dipotong.',
      'Abaikan kontras teks di atas gradasi: Memilih warna teks yang tidak kontras dengan gradasi latar belakang membuat tulisan tidak terbaca.',
      'Nilai blur-radius terlalu kecil: Menyebabkan bayangan terlihat kaku seperti garis tebal biasa daripada efek kedalaman tiga dimensi yang lembut.'
    ],
    pitfallsEn: [
      'Harsh over-saturated shadows: Pure black high-opacity shadows look muddy and unnatural.',
      'Omitting overflow: hidden on rounded parents: Unclipped child backgrounds spill out beyond curved parent borders.',
      'Poor text contrast over gradients: Ensure typography remains legible across all stops of the gradient spectrum.',
      'Insufficient shadow blur: Produces an abrupt rigid silhouette rather than natural diffused ambient light.'
    ]
  }
];
