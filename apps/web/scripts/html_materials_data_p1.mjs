// Data definition for 14 weeks of HTML5 curriculum in Indonesian and English
// Clean, professional, direct, zero gimmick words.

export const HTML_WEEKS_DATA = [
  // ─── WEEK 1 ───
  {
    week: 1,
    levelId: 'beginer',
    topicId: 'struktur-dokumen-semantik',
    titleId: 'Pengenalan HTML dan Struktur Dokumen',
    titleEn: 'HTML Introduction and Document Structure',
    category: 'HTML5',
    levelNameId: 'Dasar HTML',
    levelNameEn: 'HTML Basics',
    objectivesId: [
      'Memahami apa itu HTML dan perannya sebagai kerangka dasar halaman web',
      'Memahami cara kerja browser dalam membaca dan merender dokumen HTML',
      'Menguasai anatomi kurung sudut (< >), tag pembuka, konten, tag penutup, dan void tag',
      'Membedakan penggunaan atribut class (label kelompok) dan id (identitas unik)',
      'Menyiapkan lingkungan kerja lokal dengan VS Code dan Live Server (Quick Start)',
      'Membedah struktur dokumen standar: <!DOCTYPE html>, <html>, <head>, dan <body>',
      'Menggunakan fitur View Page Source (Ctrl + U) dan Inspect Element (F12) untuk melihat kode sumber'
    ],
    objectivesEn: [
      'Understand what HTML is and its role as the foundational skeleton of web pages',
      'Understand how web browsers parse and render HTML documents',
      'Master syntax anatomy: angle brackets (< >), opening tags, content, closing tags, and void tags',
      'Distinguish between class attributes (group labels) and id attributes (unique identifiers)',
      'Set up a local development workspace with VS Code and Live Server (Quick Start)',
      'Deconstruct standard document structure: <!DOCTYPE html>, <html>, <head>, and <body>',
      'Use View Page Source (Ctrl + U) and Inspect Element (F12) to inspect webpage source code'
    ],
    contentId: `## 1. Apa Itu HTML?

**HTML** adalah singkatan dari **HyperText Markup Language**:
- **HyperText:** Teks yang memuat tautan (*link*) untuk berpindah ke dokumen atau halaman web lain saat diklik.
- **Markup:** Penandaan teks biasa menggunakan tag khusus agar browser mengetahui fungsi teks tersebut (sebagai judul, paragraf, daftar, gambar, atau tombol).
- **Language:** Standar aturan baku yang dipahami oleh seluruh web browser (seperti Chrome, Firefox, Safari, dan Edge).

> HTML **bukan bahasa pemrograman**. HTML tidak memiliki logika matematika, variabel memori, atau percabangan (*if-else*). HTML adalah **bahasa markup** yang bertugas menyusun kerangka dan struktur dokumen.

### Cara Kerja Web Browser
Tugas utama web browser adalah membaca dokumen HTML dan menampilkannya ke layar:
1. Browser membaca kode HTML dari baris atas ke baris bawah.
2. **Browser tidak pernah menampilkan tag HTML ke layar**. Browser menggunakan tag tersebut sebagai instruksi format untuk menentukan bagaimana teks dan elemen harus ditampilkan.
3. Contoh: Saat menemukan \`<h1>Judul</h1>\`, browser tidak menampilkan teks \`<h1>\`, melainkan mencetak teks "Judul" dengan ukuran besar dan tebal.

---

## 2. Anatomi Sintaks: Kurung Sudut, Tag, dan Elemen

Semua perintah HTML ditulis di dalam **kurung sudut** (*angle brackets*), yaitu karakter \`<\` dan \`>\`.

\`\`\`text
       Tag Pembuka                  Konten Teks              Tag Penutup
     (Opening Tag)                   (Content)              (Closing Tag)
     ┌───────────┐             ┌───────────────────┐        ┌───────────┐
     │   <p>     │             │ Belajar HTML itu  │        │   </p>    │
     └───────────┘             │  sangat mudah!    │        └───────────┘
           │                   └───────────────────┘              │
           └─────────────────────────────┬────────────────────────┘
                                         ▼
                                Satu Elemen Penuh
                                  (HTML Element)
\`\`\`

### Tabel Anatomi Elemen HTML:
| Start Tag | Content | End Tag | Tipe Elemen |
|---|---|---|---|
| \`<h1>\` | Selamat Datang | \`</h1>\` | Normal Element |
| \`<p>\` | Ini adalah paragraf teks. | \`</p>\` | Normal Element |
| \`<a href="kontak.html">\` | Hubungi Kami | \`</a>\` | Elemen dengan Atribut |
| \`<br>\` | *tidak ada* | *tidak ada* | **Void / Empty Element** |
| \`<hr>\` | *tidak ada* | *tidak ada* | **Void / Empty Element** |

Tag yang tidak memiliki konten dan tidak membutuhkan tag penutup disebut **Void Element** (seperti \`<br>\`, \`<hr>\`, \`<img>\`, dan \`<meta>\`).

---

## 3. Diagram Struktur Dokumen HTML

Dokumen HTML memiliki hierarki bersarang (*nested box structure*):

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ <html> (Root Element - Pembungkus Seluruh Dokumen)     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <head> (Konfigurasi & Data Balik Layar)          │  │
│  │   <meta charset="UTF-8">                         │  │
│  │   <title>Judul Tab Browser</title>               │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <body> (Kanvas Visual yang Tampil di Layar)      │  │
│  │   <h1>Judul Halaman</h1>                         │  │
│  │   <p>Paragraf isi halaman.</p>                   │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
\`\`\`

- **\`<!DOCTYPE html>\`**: Deklarasi di baris pertama yang memberitahu browser bahwa dokumen ini menggunakan standar HTML5.
- **\`<html lang="id">\`**: Elemen induk paling luar. Atribut \`lang="id"\` menyatakan bahasa dokumen adalah Bahasa Indonesia.
- **\`<head>\`**: Memuat metadata dokumen. Konten di dalam head **tidak tampil di layar utama**, melainkan diatur untuk konfigurasi tab browser dan mesin pencari.
- **\`<body>\`**: Wadah utama konten visual. Semua teks, gambar, tabel, dan tombol yang ingin dilihat pengunjung diletakkan di sini.

---

## 4. Atribut: Class dan ID

Atribut memberikan informasi tambahan pada elemen, ditulis di dalam tag pembuka dengan format \`nama="nilai"\`.

### Perbedaan Class dan ID:
- **\`class\`**: Label kelompok. Satu nama class dapat digunakan berulang kali pada banyak elemen di satu halaman. Contoh: \`<p class="keterangan">\`.
- **\`id\`**: Identitas unik. Hanya boleh digunakan **satu kali** per halaman untuk satu elemen spesifik. Contoh: \`<header id="header-utama">\`.

---

## 5. Panduan Mulai Cepat (Quick Start): Setup Proyek

Sebelum menulis kode, siapkan lingkungan kerja di komputer:

### 1. Editor VS Code dan Ekstensi
- Unduh dan pasang [Visual Studio Code](https://code.visualstudio.com/).
- Buka menu Extensions (\`Ctrl + Shift + X\`) dan pasang ekstensi **Live Server** (\`ritwickdey.liveserver\`).
- Ekstensi ini memungkinkan halaman web otomatis me-reload saat file disimpan.

### 2. Membuat Folder dan File Proyek
Buat folder baru bernama \`my-website\` dan file \`index.html\`:
\`\`\`bash
mkdir my-website && cd my-website
touch index.html
\`\`\`

### 3. Menjalankan Proyek
1. Buka folder \`my-website\` di VS Code.
2. Buka file \`index.html\`.
3. Klik kanan di dalam editor, lalu pilih **"Open with Live Server"**.
4. Browser akan terbuka di alamat \`http://127.0.0.1:5500/index.html\`.

---

## 6. Fitur Pengembang di Browser
Anda dapat melihat kode sumber website apa pun di internet:
- **View Page Source (\`Ctrl + U\`):** Menampilkan kode HTML mentah yang dikirim oleh server.
- **Inspect Element (\`F12\` atau Klik Kanan -> Inspect):** Membuka panel Developer Tools untuk memeriksa struktur DOM dan atribut class/id secara langsung.

---

## 7. Sejarah Singkat HTML
- **1989:** Tim Berners-Lee menemukan World Wide Web (WWW).
- **1991:** Tim Berners-Lee merilis spesifikasi pertama HTML.
- **1999:** Standar HTML 4.01 dirilis.
- **2014:** Standar resmi HTML5 disahkan oleh W3C, menyederhanakan deklarasi doctype dan menambahkan tag semantik.`,

    contentEn: `## 1. What is HTML?

**HTML** stands for **HyperText Markup Language**:
- **HyperText:** Text that contains clickable links to navigate to other documents or web pages.
- **Markup:** Annotating plain text with specialized tags so browsers understand their role (heading, paragraph, list, image, or button).
- **Language:** A standardized set of rules understood by all web browsers worldwide (Chrome, Firefox, Safari, Edge).

> HTML **is not a programming language**. It does not perform mathematical computations, memory operations, or conditional branching (*if-else*). HTML is a **markup language** responsible for structuring documents.

### How Web Browsers Work
The primary purpose of a web browser is to read HTML documents and display them correctly:
1. The browser parses HTML code sequentially from top to bottom.
2. **Browsers never display HTML tags directly on screen**. They use tags as layout and formatting instructions.
3. Example: When encountering \`<h1>Title</h1>\`, the browser renders the word "Title" in large, bold text rather than showing the literal \`<h1>\` tag.

---

## 2. Syntax Anatomy: Angle Brackets, Tags, and Elements

All HTML directives are written inside **angle brackets** (\`<\` and \`>\`).

\`\`\`text
       Opening Tag                   Text Content             Closing Tag
     ┌───────────┐             ┌───────────────────┐        ┌───────────┐
     │   <p>     │             │ Learning HTML is  │        │   </p>    │
     └───────────┘             │  super easy!      │        └───────────┘
           │                   └───────────────────┘              │
           └─────────────────────────────┬────────────────────────┘
                                         ▼
                               One Complete Element
                                  (HTML Element)
\`\`\`

### HTML Element Anatomy Table:
| Start Tag | Content | End Tag | Element Type |
|---|---|---|---|
| \`<h1>\` | Welcome | \`</h1>\` | Normal Element |
| \`<p>\` | This is a text paragraph. | \`</p>\` | Normal Element |
| \`<a href="contact.html">\` | Contact Us | \`</a>\` | Element with Attributes |
| \`<br>\` | *none* | *none* | **Void / Empty Element** |
| \`<hr>\` | *none* | *none* | **Void / Empty Element** |

Tags without text content that do not require closing tags are called **Void Elements** (e.g., \`<br>\`, \`<hr>\`, \`<img>\`, \`<meta>\`).

---

## 3. HTML Document Structure Diagram

HTML documents follow a hierarchical nested structure:

\`\`\`text
┌────────────────────────────────────────────────────────┐
│ <html> (Root Element - Encapsulates Whole Document)    │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <head> (Configuration & Behind-the-scenes Data)  │  │
│  │   <meta charset="UTF-8">                         │  │
│  │   <title>Browser Tab Title</title>               │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ <body> (Visible Viewport Canvas)                 │  │
│  │   <h1>Page Heading</h1>                          │  │
│  │   <p>Page body paragraph.</p>                    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
\`\`\`

- **\`<!DOCTYPE html>\`**: First line declaration informing browsers to use modern HTML5 parsing.
- **\`<html lang="en">\`**: Top root element. The \`lang="en"\` attribute specifies English as the primary document language.
- **\`<head>\`**: Houses technical metadata. Content inside head **does not appear on the visible page**, but configures tab titles, charset, and search engine parameters.
- **\`<body>\`**: Visible rendering canvas. All text, images, tables, and buttons visible to users reside inside this tag.

---

## 4. Attributes: Class and ID

Attributes provide extra configuration on elements, placed inside the opening tag using the format \`name="value"\`.

### Differences Between Class and ID:
- **\`class\`**: Reusable grouping label. A class name can be applied to dozens of elements across the same document. Example: \`<p class="note">\`.
- **\`id\`**: Unique identifier. Must be strictly **unique per page** (only 1 element can bear a given ID). Example: \`<header id="main-header">\`.

---

## 5. Quick Start Guide: Project Setup

Before writing code, configure your development environment:

### 1. VS Code Editor and Extensions
- Download and install [Visual Studio Code](https://code.visualstudio.com/).
- Open the Extensions tab (\`Ctrl + Shift + X\`) and install **Live Server** (\`ritwickdey.liveserver\`).
- Live Server automatically refreshes your browser when you save HTML files.

### 2. Scaffold Folder and Files
Create a new directory \`my-website\` and an entrypoint \`index.html\`:
\`\`\`bash
mkdir my-website && cd my-website
touch index.html
\`\`\`

### 3. Running the Project
1. Open the \`my-website\` folder in VS Code.
2. Open \`index.html\`.
3. Right-click inside the editor and choose **"Open with Live Server"**.
4. The page will load at \`http://127.0.0.1:5500/index.html\`.

---

## 6. Developer Tools in Browsers
You can inspect the source code of any live webpage:
- **View Page Source (\`Ctrl + U\`):** Shows raw HTML returned from the web server.
- **Inspect Element (\`F12\` or Right-click -> Inspect):** Opens browser Developer Tools to inspect DOM elements and styles live.

---

## 7. Short History of HTML
- **1989:** Tim Berners-Lee invents the World Wide Web (WWW).
- **1991:** Tim Berners-Lee releases the initial HTML specification.
- **1999:** HTML 4.01 specification released.
- **2014:** W3C formally standardizes HTML5 with cleaner doctypes and semantic elements.`,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Profil Alex</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px; }
    h1 { color: #0f172a; margin-bottom: 6px; }
    .status-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: bold; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header id="header-utama">
    <h1>Alex Pratama</h1>
    <span class="status-badge">Terbuka untuk Proyek Web</span>
  </header>

  <main>
    <section class="card">
      <h2>Tentang Saya</h2>
      <p>Halo! Saya sedang mempelajari dasar-dasar <strong>HTML</strong> untuk membangun website yang rapi dan terstruktur.</p>
    </section>

    <section class="card">
      <h2>Target Pembelajaran Minggu Ini</h2>
      <p>Memahami struktur tag, membedakan class dan id, serta menyiapkan file index.html pertama.</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Dibuat dengan HTML standar.</p>
  </footer>
</body>
</html>`,
    programTitleId: 'Struktur Dasar Dokumen HTML Pertama',
    programTitleEn: 'First Valid HTML Document Structure',
    breakdownId: [
      'Line 1: `<!DOCTYPE html>` memberitahu browser bahwa dokumen mengikuti standar HTML5.',
      'Line 2: `<html lang="id">` membungkus seluruh dokumen dengan deklarasi bahasa Indonesia.',
      'Line 3-15: `<head>` memuat konfigurasi charset UTF-8, viewport seluler, title, dan style.',
      'Line 16-36: `<body>` memuat konten yang tampil di layar: header, main, section, dan footer.',
      'Atribut `id="header-utama"` digunakan sebagai tanda pengenal unik elemen header.',
      'Atribut `class="card"` digunakan dua kali untuk memberi tampilan kotak yang seragam pada kedua section.'
    ],
    breakdownEn: [
      'Line 1: `<!DOCTYPE html>` informs browsers to parse under HTML5 standards.',
      'Line 2: `<html lang="en">` wraps all document content with English language metadata.',
      'Line 3-15: `<head>` defines UTF-8 encoding, mobile viewport, tab title, and styling rules.',
      'Line 16-36: `<body>` contains visual elements: header, main, sections, and footer.',
      'The attribute `id="header-utama"` uniquely identifies the header element.',
      'The attribute `class="card"` is reused across both sections to provide identical container styling.'
    ],
    pitfallsId: [
      'Lupa menulis tag penutup (misalnya menulis `<p>Teks` tanpa `</p>`).',
      'Menulis konten visual di dalam elemen `<head>` (konten visual harus selalu berada di `<body>`).',
      'Menggunakan ID yang sama pada lebih dari satu elemen (ID harus selalu unik per halaman).'
    ],
    pitfallsEn: [
      'Omitting closing tags (e.g. writing `<p>Text` without `</p>`).',
      'Placing visual body content inside `<head>` (all visible elements belong in `<body>`).',
      'Reusing the same ID across multiple elements on one page (IDs must remain unique).'
    ]
  },

  // ─── WEEK 2 ───
  {
    week: 2,
    levelId: 'beginer',
    topicId: 'hierarki-teks-dan-navigasi',
    titleId: 'Head, Teks, dan Link',
    titleEn: 'Head, Text, and Links',
    category: 'HTML5',
    levelNameId: 'Dasar HTML',
    levelNameEn: 'HTML Basics',
    objectivesId: [
      'Memahami konfigurasi elemen <head>: <title>, favicon <link rel="icon">, dan <link rel="stylesheet">',
      'Menguasai hierarki heading <h1> sampai <h6> secara teratur untuk keterbacaan dan SEO',
      'Menggunakan tag format teks: <p>, <strong>, <em>, <pre>, <code>, <time>, dan <br>',
      'Membuat file halaman kedua (layanan.html) di dalam folder proyek',
      'Menghubungkan halaman menggunakan tag link <a href="...">, path relatif (./, ../), dan bookmark #id'
    ],
    objectivesEn: [
      'Understand <head> configurations: <title>, favicon <link rel="icon">, and <link rel="stylesheet">',
      'Master heading hierarchy from <h1> to <h6> for accessibility and search engines',
      'Use text formatting tags: <p>, <strong>, <em>, <pre>, <code>, <time>, and <br>',
      'Create a second webpage file (layanan.html) in your project folder',
      'Link pages together using <a href="...">, relative file paths, and in-page #id bookmarks'
    ],
    contentId: `## 1. Membedah Elemen <head> Secara Rinci

Elemen \`<head>\` adalah pusat kendali metadata dokumen yang tidak tampil langsung di kanvas halaman:

1. **\`<title>\`**: Menentukan teks judul pada tab browser dan hasil pencarian mesin pencari.
2. **\`<link rel="icon" href="favicon.ico">\`**: Menampilkan ikon logo kecil pada tab browser di sebelah judul.
3. **\`<link rel="stylesheet" href="style.css">\`**: Menghubungkan file kode CSS eksternal ke dalam dokumen HTML.
4. **\`<meta name="description" content="...">\`**: Deskripsi ringkas isi halaman untuk hasil pencarian Google.

---

## 2. Tipografi dan Hierarki Teks

HTML menyediakan tag semantik untuk menyusun hierarki tulisan:
- **Heading (\`<h1>\` s/d \`<h6>\`):**
  - \`<h1>\`: Judul utama halaman (hanya boleh ada satu \`<h1>\` per dokumen).
  - \`<h2>\`: Judul sub-bab besar.
  - \`<h3>\` s/d \`<h6>\`: Sub-bagian yang lebih kecil secara berurutan. Jangan pernah melompati tingkatan (misal dari \`<h2>\` langsung ke \`<h4>\`).
- **Paragraf & Format Teks:**
  - \`<p>\`: Paragraf teks biasa.
  - \`<strong>\`: Menandai teks penting secara makna (tampil tebal).
  - \`<em>\`: Memberi penekanan bacaan (*emphasis*, tampil miring).
  - \`<code>\` & \`<pre>\`: Menampilkan cuplikan kode komputer dengan font monospace.
  - \`<time datetime="2026-10-10">\`: Menandai format tanggal agar terbaca oleh mesin crawler.

---

## 3. Struktur File Proyek dan Navigasi Halaman

Dalam proyek website nyata, kita tidak hanya membuat satu file. Kita menyusun beberapa file dalam satu folder:

\`\`\`text
my-website/
├── index.html        # Halaman Beranda (Halaman Utama)
├── layanan.html      # Halaman Daftar Layanan (Halaman Kedua)
└── css/
    └── style.css     # File CSS Eksternal
\`\`\`

### Cara Membuat File Baru dan Menghubungkannya:
1. Di VS Code, buat file baru di samping \`index.html\` dengan nama \`layanan.html\`.
2. Di dalam file \`index.html\`, tambahkan link menuju file kedua menggunakan tag \`<a>\`:
\`\`\`html
<nav>
  <a href="index.html">Beranda</a> |
  <a href="layanan.html">Layanan</a>
</nav>
\`\`\`
3. **Jenis-Jenis Link:**
   - **Link Internal:** \`<a href="layanan.html">\` (berpindah ke file lain di folder yang sama).
   - **Link Eksternal:** \`<a href="https://example.com" target="_blank">\` (membuka website luar di tab baru).
   - **Link Bookmark:** \`<a href="#biaya">\` (melompat ke elemen dengan \`id="biaya"\` di halaman yang sama).`,

    contentEn: `## 1. Deconstructing the <head> Element

The \`<head>\` element manages document metadata not directly rendered on the visual canvas:

1. **\`<title>\`**: Sets text on the browser tab and search engine results.
2. **\`<link rel="icon" href="favicon.ico">\`**: Displays a favicon icon in the tab bar.
3. **\`<link rel="stylesheet" href="style.css">\`**: Links an external stylesheet to your HTML.
4. **\`<meta name="description" content="...">\`**: Provides a page summary for search engine snippet listings.

---

## 2. Text Typography and Headings

HTML provides semantic tags for structuring text hierarchies:
- **Headings (\`<h1>\` to \`<h6>\`):**
  - \`<h1>\`: Primary document topic (strictly one \`<h1>\` per page).
  - \`<h2>\`: Major section topics.
  - \`<h3>\` to \`<h6>\`: Hierarchical subsections. Avoid skipping heading levels (e.g., from \`<h2>\` directly to \`<h4>\`).
- **Text Formatting:**
  - \`<p>\`: Body paragraph.
  - \`<strong>\`: High importance (rendered bold).
  - \`<em>\`: Stress emphasis (rendered italic).
  - \`<code>\` & \`<pre>\`: Monospace code snippets and preformatted text blocks.
  - \`<time datetime="2026-10-10">\`: Machine-readable dates for search engines.

---

## 3. Project File Structure and Page Navigation

Real-world web projects consist of multiple connected files:

\`\`\`text
my-website/
├── index.html        # Home Page (Entrypoint)
├── layanan.html      # Services Page (Second Page)
└── css/
    └── style.css     # External CSS
\`\`\`

### Creating and Linking a Second Page:
1. In VS Code, create a new file named \`layanan.html\` next to \`index.html\`.
2. Inside \`index.html\`, add anchor navigation links:
\`\`\`html
<nav>
  <a href="index.html">Home</a> |
  <a href="layanan.html">Services</a>
</nav>
\`\`\`
3. **Link Types:**
   - **Internal Links:** \`<a href="layanan.html">\` (navigates within the project directory).
   - **External Links:** \`<a href="https://example.com" target="_blank">\` (opens third-party sites in a new tab).
   - **Bookmark Jump Links:** \`<a href="#pricing">\` (smoothly jumps to \`id="pricing"\` on the active page).`,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layanan Web — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    nav a:hover { text-decoration: underline; }
    article { margin-bottom: 24px; }
    .meta-date { color: #64748b; font-size: 13px; }
    .code-box { background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; overflow-x: auto; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="#prosedur">Prosedur Kerja</a>
    </nav>
    <h1>Daftar Layanan Pembuatan Website</h1>
    <p class="meta-date">Diterbitkan pada: <time datetime="2026-10-10">10 Oktober 2026</time></p>
  </header>

  <main>
    <article>
      <h2>1. Pembuatan Website Profil Perusahaan</h2>
      <p>Membangun struktur web menggunakan <strong>HTML semantik</strong> agar halaman cepat dimuat dan mudah ditemukan di mesin pencari.</p>
      <p>Setiap dokumen web dibuat dengan kode bersih seperti berikut:</p>
      
      <pre class="code-box"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="id"&gt;
  &lt;body&gt;Halaman Siap Pakai&lt;/body&gt;
&lt;/html&gt;</code></pre>
    </article>

    <article id="prosedur">
      <h2>2. Prosedur Kerja</h2>
      <p>Pengerjaan proyek mengikuti langkah-langkah terstruktur:</p>
      <ol>
        <li>Diskusi kebutuhan struktur dokumen</li>
        <li>Penyusunan kode HTML dan konten teks</li>
        <li>Uji coba tampilan menggunakan browser</li>
      </ol>
      <p>Ada pertanyaan? Kunjungi <a href="https://example.com" target="_blank">dokumentasi panduan</a>.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. File: <code>layanan.html</code></p>
  </footer>
</body>
</html>`,
    programTitleId: 'Halaman Layanan dengan Navigasi dan Tipografi Terstruktur',
    programTitleEn: 'Services Page with Navigation and Typography Structure',
    breakdownId: [
      'Line 16-20: `<nav>` menyediakan link navigasi antar file (`index.html` dan `layanan.html`) serta bookmark link `#prosedur`.',
      'Line 22: Tag `<time datetime="2026-10-10">` memberikan format tanggal yang terbaca mesin.',
      'Line 31-35: Tag `<pre>` dan `<code>` menampilkan blok kode HTML tanpa dirender oleh browser.',
      'Line 37: `id="prosedur"` menjadi target lompat untuk link `<a href="#prosedur">`.',
      'Line 46: Atribut `target="_blank"` membuka tautan di tab baru.'
    ],
    breakdownEn: [
      'Line 16-20: `<nav>` contains inter-file navigation (`index.html`, `layanan.html`) and an in-page anchor `#prosedur`.',
      'Line 22: `<time datetime="2026-10-10">` outputs machine-readable date metadata.',
      'Line 31-35: `<pre>` and `<code>` display literal HTML code blocks without parsing.',
      'Line 37: `id="prosedur"` serves as the anchor target for `<a href="#prosedur">`.',
      'Line 46: Attribute `target="_blank"` launches the URL in a separate browser tab.'
    ],
    pitfallsId: [
      'Menulis path link yang salah (misal: \`layanan.htm\` alih-alih \`layanan.html\`).',
      'Menggunakan lebih dari satu tag \`<h1>\` pada satu file dokumen.',
      'Lupa memberikan atribut \`datetime\` pada tag \`<time>\`.'
    ],
    pitfallsEn: [
      'Typing inaccurate link targets (e.g. \`layanan.htm\` instead of \`layanan.html\`).',
      'Using multiple \`<h1>\` tags across a single document.',
      'Omitting the required \`datetime\` attribute on the \`<time>\` element.'
    ]
  },

  // ─── WEEK 3 ───
  {
    week: 3,
    levelId: 'beginer',
    topicId: 'media-dan-gambar-responsif',
    titleId: 'Body, Layout Semantik, dan Gambar',
    titleEn: 'Body, Semantic Layout, and Images',
    category: 'HTML5',
    levelNameId: 'Dasar HTML',
    levelNameEn: 'HTML Basics',
    objectivesId: [
      'Memahami arsitektur tag semantik layout: <header>, <nav>, <main>, <section>, <article>, <aside>, dan <footer>',
      'Membedakan elemen Block (<div>, <p>, <section>) dan elemen Inline (<span>, <a>, <strong>)',
      'Menyisipkan media gambar dengan atribut wajib: <img> (src, alt, width, height)',
      'Mengelompokkan gambar dengan keterangan menggunakan tag <figure> dan <figcaption>',
      'Menyusun struktur list tak berurutan (<ul>) dan berurutan (<ol>) dengan item (<li>)'
    ],
    objectivesEn: [
      'Understand semantic layout architecture: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>',
      'Distinguish Block elements (<div>, <p>, <section>) from Inline elements (<span>, <a>, <strong>)',
      'Embed images with essential attributes: <img> (src, alt, width, height)',
      'Group images with captions using <figure> and <figcaption>',
      'Build unordered (<ul>) and ordered (<ol>) lists using list items (<li>)'
    ],
    contentId: `## 1. Arsitektur Layout Semantik di Dalam <body>

Dalam HTML5, kita tidak menyusun seluruh halaman hanya menggunakan kotak \`<div>\`. Kita menggunakan **elemen semantik** yang memiliki makna tujuan:

- **\`<header>\`**: Bagian kepala atau pengantar situs, berisi logo dan nama situs.
- **\`<nav>\`**: Area khusus yang memuat tautan navigasi utama.
- **\`<main>\`**: Area konten inti yang unik untuk halaman tersebut (hanya boleh ada satu \`<main>\` per halaman).
- **\`<section>\`**: Pengelompokan konten tematik atau bab isi (misal: bagian tentang, bagian portofolio).
- **\`<article>\`**: Bagian konten mandiri yang dapat didistribusikan sendiri (misal: satu artikel berita, satu kartu produk).
- **\`<aside>\`**: Konten pelengkap di sisi samping (misal: info tambahan, profil singkat).
- **\`<footer>\`**: Bagian kaki halaman, berisi hak cipta, tautan legalitas, dan info kontak.

---

## 2. Elemen Block vs Elemen Inline

Setiap elemen HTML memiliki perilaku tampilan bawaan:

| Kategori | Karakteristik | Contoh Tag |
|---|---|---|
| **Elemen Block** | Selalu memulai baris baru dan memenuhi lebar halaman 100% | \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<section>\`, \`<header>\`, \`<ul>\` |
| **Elemen Inline** | Berada di dalam baris teks dan hanya selebar kontennya | \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<code>\`, \`<time>\` |

- **\`<div>\`**: Wadah pembungkus block umum tanpa makna khusus, digunakan untuk grouping layout CSS.
- **\`<span>\`**: Wadah pembungkus inline umum, digunakan untuk menandai beberapa kata di tengah kalimat.

---

## 3. Menyisipkan Gambar: <img> dan <figure>

Untuk menampilkan gambar, gunakan tag void \`<img>\`:
\`\`\`html
<img src="images/profil.jpg" alt="Foto profil Alex Pratama" width="300" height="200">
\`\`\`
- **\`src\`**: Alur lokasi file gambar (*Source*).
- **\`alt\`**: Teks alternatif jika gambar gagal dimuat, serta dibaca oleh pembaca layar (*screen reader*). Atribut ini wajib ada demi aksesibilitas dan SEO.
- **\`width\` & \`height\`**: Menentukan ukuran gambar agar browser dapat mengalokasikan ruang sebelum gambar selesai diunduh (*mencegah layout shift*).

### Menggunakan <figure> dan <figcaption>:
Jika gambar memiliki keterangan foto (*caption*), bungkus dengan \`<figure>\`:
\`\`\`html
<figure>
  <img src="images/kantor.jpg" alt="Ruang kerja studio">
  <figcaption>Gambar 1: Suasana ruang kerja studio desain kami.</figcaption>
</figure>
\`\`\``,

    contentEn: `## 1. Semantic Layout Architecture Inside <body>

HTML5 provides **semantic landmark elements** that give structural meaning to web documents:

- **\`<header>\`**: Top introductory bar containing site branding and navigation.
- **\`<nav>\`**: Dedicated container for primary navigation links.
- **\`<main>\`**: Central, unique content of the page (strictly one \`<main>\` per document).
- **\`<section>\`**: Thematic grouping of content (e.g., about section, portfolio section).
- **\`<article>\`**: Self-contained piece of content (e.g., blog card, product card).
- **\`<aside>\`**: Secondary sidebar content (e.g., author bio, related notes).
- **\`<footer>\`**: Document footer containing copyright, contact info, and legal notes.

---

## 2. Block Elements vs Inline Elements

Every HTML element features a default display model:

| Category | Behavior | Examples |
|---|---|---|
| **Block Elements** | Always begins on a new line and spans 100% width | \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<section>\`, \`<header>\`, \`<ul>\` |
| **Inline Elements** | Stays within the text flow and takes only content width | \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<code>\`, \`<time>\` |

- **\`<div>\`**: Generic block wrapper used for structural CSS styling.
- **\`<span>\`**: Generic inline wrapper used to isolate a phrase within a paragraph.

---

## 3. Embedding Images: <img> and <figure>

Use the void tag \`<img>\` to embed images:
\`\`\`html
<img src="images/profile.jpg" alt="Alex Pratama portrait" width="300" height="200">
\`\`\`
- **\`src\`**: Path to the image file (*Source*).
- **\`alt\`**: Alternative text fallback for screen readers and broken image scenarios.
- **\`width\` & \`height\`**: Explicit dimensions preventing Cumulative Layout Shift (CLS).

### Using <figure> and <figcaption>:
When an image includes an accompanying caption, wrap both inside \`<figure>\`:
\`\`\`html
<figure>
  <img src="images/office.jpg" alt="Studio desk setup">
  <figcaption>Figure 1: Our creative workspace studio.</figcaption>
</figure>
\`\`\``,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beranda Portofolio — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 12px; }
    .layout-wrapper { display: flex; gap: 20px; flex-direction: column; }
    section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; }
    figure { margin: 0; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; text-align: center; }
    figcaption { color: #64748b; font-size: 13px; margin-top: 6px; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
    </nav>
    <h1>Studio Web Alex Pratama</h1>
  </header>

  <main class="layout-wrapper">
    <section>
      <h2>Profil Studio</h2>
      <p>Kami menyusun dokumen web menggunakan tag semantik HTML5 yang rapi, aksesibel, dan terstruktur.</p>

      <figure>
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60" 
          alt="Laptop menampilkan baris kode pemrograman di atas meja kerja" 
          width="480" 
          style="max-width: 100%; height: auto; border-radius: 4px;"
        >
        <figcaption>Dokumentasi: Lingkungan kerja perancangan struktur website.</figcaption>
      </figure>
    </section>

    <section>
      <h2>Daftar Keahlian Dasar</h2>
      <ul>
        <li>Struktur Dokumen Semantik (HTML5)</li>
        <li>Format Teks dan Hierarki Heading</li>
        <li>Navigasi Antar Berkas dan Bookmark</li>
        <li>Media Gambar Terstruktur (<figure>)</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Studio Web Alex Pratama. Berkas: <code>index.html</code></p>
  </footer>
</body>
</html>`,
    programTitleId: 'Tata Letak Semantik Halaman Beranda dengan Media Gambar',
    programTitleEn: 'Semantic Home Layout with Embedded Media and Captions',
    breakdownId: [
      'Line 18-24: `<header>` membungkus navigasi `<nav>` dan judul situs `<h1>`.',
      'Line 26-49: `<main>` memuat dua elemen `<section>` tematik: profil studio dan daftar keahlian.',
      'Line 31-38: `<figure>` dan `<figcaption>` menyajikan gambar bersama keterangan foto secara semantik.',
      'Line 41-47: `<ul>` dan `<li>` menampilkan daftar keahlian dasar dalam bentuk poin.',
      'Line 51-53: `<footer>` memuat informasi hak cipta di bagian paling bawah halaman.'
    ],
    breakdownEn: [
      'Line 18-24: `<header>` groups top navigation `<nav>` and branding heading `<h1>`.',
      'Line 26-49: `<main>` houses two thematic `<section>` blocks: studio profile and skills.',
      'Line 31-38: `<figure>` and `<figcaption>` semantically pair an image with its accompanying text.',
      'Line 41-47: `<ul>` and `<li>` structure skills into an accessible bulleted list.',
      'Line 51-53: `<footer>` houses copyright and file attribution at the bottom of the page.'
    ],
    pitfallsId: [
      'Lupa menyertakan atribut `alt` pada tag `<img>`.',
      'Menggunakan tag `<div>` untuk seluruh struktur tanpa memanfaatkan tag semantik seperti `<section>` atau `<header>`.',
      'Memasukkan elemen block di dalam elemen inline (misalnya membungkus `<p>` di dalam `<span>`).'
    ],
    pitfallsEn: [
      'Omitting the `alt` attribute on an `<img>` tag.',
      'Over-relying on generic `<div>` tags without semantic elements like `<section>` or `<header>`.',
      'Nesting block-level elements inside inline elements (e.g. putting a `<p>` inside a `<span>`).'
    ]
  },

  // ─── WEEK 4 ───
  {
    week: 4,
    levelId: 'beginer',
    topicId: 'tabel-data-terstruktur',
    titleId: 'Tabel dan Proyek Pertama',
    titleEn: 'Tables and First Project',
    category: 'HTML5',
    levelNameId: 'Dasar HTML',
    levelNameEn: 'HTML Basics',
    objectivesId: [
      'Memahami aturan baku penggunaan <table> khusus untuk data tabular (bukan untuk layout halaman)',
      'Menyediakan judul dan keterangan ringkasan tabel menggunakan tag <caption>',
      'Menyusun struktur tabel: <thead> (kepala), <tbody> (isi data), dan <tfoot> (catatan/total)',
      'Menghubungkan sel header <th> dengan data sel <td> menggunakan atribut scope="col" dan scope="row"',
      'Menggabungkan sel baris dan kolom dengan atribut colspan dan rowspan',
      'Menyelesaikan proyek website 2 halaman (index.html dan layanan.html) secara utuh'
    ],
    objectivesEn: [
      'Understand that <table> is strictly reserved for tabular data (never for page layout)',
      'Provide accessible table titles and context using the <caption> element',
      'Structure table sections: <thead> (header), <tbody> (data body), and <tfoot> (footer)',
      'Associate <th> header cells with <td> data cells using scope="col" and scope="row"',
      'Merge cells horizontally and vertically with colspan and rowspan attributes',
      'Complete the full 2-page project (index.html and layanan.html) from scratch'
    ],
    contentId: `## 1. Aturan Baku Penggunaan Tabel HTML

Elemen \`<table>\` adalah tag HTML yang khusus digunakan untuk menampilkan **data tabular**—yaitu data yang tersusun dalam bentuk baris dan kolom (seperti spreadsheet, daftar harga, jadwal, atau laporan statistik).

> ⚠️ **Aturan Penting:** Jangan pernah menggunakan \`<table>\` untuk mengatur tata letak (*layout*) halaman website (seperti header di atas, konten di kiri, footer di bawah). Penggunaan tabel untuk layout adalah praktik lama tahun 1990-an yang merusak aksesibilitas pembaca layar dan responsivitas seluler. Gunakan CSS untuk layout, dan gunakan \`<table>\` murni untuk data.

---

## 2. Anatomi Tag Penyusun Tabel

Tabel HTML tersusun dari beberapa tag terstruktur:

- **\`<table>\`**: Elemen pembungkus seluruh tabel.
- **\`<caption>\`**: Judul atau keterangan tabel (diletakkan tepat setelah tag pembuka \`<table>\`).
- **\`<thead>\`**: Bagian kepala tabel yang memuat baris judul kolom.
- **\`<tbody>\`**: Bagian badan tabel yang memuat baris-baris data utama.
- **\`<tfoot>\`**: Bagian kaki tabel untuk baris total, ringkasan, atau catatan kaki.
- **\`<tr>\` (*Table Row*):** Satu baris horizontal di dalam tabel.
- **\`<th>\` (*Table Header*):** Sel judul baris atau kolom (teks tebal dan di tengah). Wajib menyertakan atribut \`scope="col"\` untuk judul kolom atau \`scope="row"\` untuk judul baris.
- **\`<td>\` (*Table Data*):** Sel data standar di dalam tabel.

---

## 3. Menggabungkan Sel: Colspan dan Rowspan

Kadang sebuah sel data harus membentang melewati beberapa kolom atau baris:
- **\`colspan="2"\`**: Menggabungkan 2 kolom ke arah samping (horizontal).
- **\`rowspan="2"\`**: Menggabungkan 2 baris ke arah bawah (vertikal).

\`\`\`html
<tr>
  <td colspan="3">Catatan: Sel ini membentang di 3 kolom sekaligus.</td>
</tr>
\`\`\`

---

## 4. Finalisasi Proyek Level 1
Di akhir Minggu 4 ini, proyek website Anda telah memiliki:
1. **\`index.html\`**: Halaman beranda dengan header, navigasi, seksi profil, gambar \`<figure>\`, dan list keahlian.
2. **\`layanan.html\`**: Halaman daftar layanan yang memuat deskripsi layanan dan **Tabel Paket Harga**.
Kedua halaman saling terhubung dengan navigasi link \`<a href="...">\` yang rapi.`,

    contentEn: `## 1. Rules for Using HTML Tables

The \`<table>\` element is designed strictly for presenting **tabular data**—information organized into rows and columns (such as pricing matrices, schedules, financial audits, or timetables).

> ⚠️ **Key Rule:** Never use \`<table>\` to construct web page layouts (such as placing navbars, sidebars, or headers inside table cells). Table-based layouts are obsolete 1990s patterns that severely degrade mobile responsiveness and screen reader accessibility. Use CSS for layout, and reserve \`<table>\` purely for data.

---

## 2. Table Syntax Anatomy

An accessible HTML table contains structured sub-elements:

- **\`<table>\`**: Wrapper encapsulating the table.
- **\`<caption>\`**: Table title placed immediately after \`<table>\`.
- **\`<thead>\`**: Table header containing column title rows.
- **\`<tbody>\`**: Table body containing core data rows.
- **\`<tfoot>\`**: Table footer containing summaries, totals, or notes.
- **\`<tr>\` (*Table Row*):** A horizontal row.
- **\`<th>\` (*Table Header*):** Header cell with \`scope="col"\` or \`scope="row"\`.
- **\`<td>\` (*Table Data*):** Standard data cell.

---

## 3. Merging Cells: Colspan and Rowspan

When cells span multiple columns or rows:
- **\`colspan="2"\`**: Merges 2 adjacent columns horizontally.
- **\`rowspan="2"\`**: Merges 2 adjacent rows vertically.

\`\`\`html
<tr>
  <td colspan="3">Note: This cell spans across 3 columns.</td>
</tr>
\`\`\`

---

## 4. Completing the Level 1 Project
By Week 4, your starter website project contains:
1. **\`index.html\`**: Home page with semantic layout, \`<figure>\` image, and list.
2. **\`layanan.html\`**: Services page with detailed offerings and a structured **Pricing Table**.
Both files are seamlessly connected using clean relative \`<a href="...">\` navigation.`,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Paket Layanan — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #ffffff; }
    caption { font-weight: bold; margin-bottom: 8px; text-align: left; font-size: 15px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px 12px; text-align: left; font-size: 14px; }
    thead th { background: #0f172a; color: #f8fafc; font-weight: 600; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    tfoot td { background: #f1f5f9; font-size: 13px; color: #64748b; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
    </nav>
    <h1>Daftar Paket Layanan Website</h1>
  </header>

  <main>
    <section>
      <h2>Pilihan Paket Pembuatan Website</h2>
      <p>Berikut adalah perbandingan paket layanan yang tersedia:</p>

      <table>
        <caption>Tabel 1: Rincian Paket Layanan dan Waktu Pengerjaan</caption>
        <thead>
          <tr>
            <th scope="col">Nama Paket</th>
            <th scope="col">Jumlah Halaman</th>
            <th scope="col">Waktu Pengerjaan</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Paket Dasar</th>
            <td>1 - 3 Halaman</td>
            <td>3 Hari Kerja</td>
            <td>Tersedia</td>
          </tr>
          <tr>
            <th scope="row">Paket Bisnis</th>
            <td>4 - 8 Halaman</td>
            <td>7 Hari Kerja</td>
            <td>Tersedia</td>
          </tr>
          <tr>
            <th scope="row">Paket Kustom</th>
            <td>&gt; 8 Halaman</td>
            <td>14 Hari Kerja</td>
            <td>Antrean</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">* Seluruh paket mencakup kode HTML standar valid dan responsif.</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Proyek Dasar Selesai (Berkas: <code>layanan.html</code>).</p>
  </footer>
</body>
</html>`,
    programTitleId: 'Tabel Perbandingan Paket Layanan Semantik',
    programTitleEn: 'Semantic Services and Pricing Comparison Table',
    breakdownId: [
      'Line 26: Elemen `<table>` membungkus seluruh struktur tabel data.',
      'Line 27: `<caption>` memberikan judul keterangan tabel yang terbaca oleh screen reader.',
      'Line 28-36: `<thead>` dan `<th scope="col">` mendefinisikan baris judul untuk setiap kolom.',
      'Line 37-56: `<tbody>` dan `<th scope="row">` mendefinisikan baris data utama dengan sel header baris.',
      'Line 57-61: `<tfoot>` dan atribut `colspan="4"` menggabungkan 4 kolom untuk catatan kaki tabel.'
    ],
    breakdownEn: [
      'Line 26: `<table>` encapsulates the entire data grid.',
      'Line 27: `<caption>` provides an accessible title for screen readers and search engines.',
      'Line 28-36: `<thead>` and `<th scope="col">` declare header cells for each column.',
      'Line 37-56: `<tbody>` and `<th scope="row">` map out data records with accessible row headers.',
      'Line 57-61: `<tfoot>` with `colspan="4"` merges all 4 columns into a single footer cell.'
    ],
    pitfallsId: [
      'Menggunakan `<table>` untuk mengatur tata letak keseluruhan halaman website.',
      'Lupa memberikan tag `<caption>` pada tabel data.',
      'Menulis sel data `<td>` di luar baris `<tr>`.'
    ],
    pitfallsEn: [
      'Using `<table>` for layout positioning rather than tabular data.',
      'Omitting `<caption>` from data tables.',
      'Placing data cells `<td>` outside of a row `<tr>`.'
    ]
  }
];
