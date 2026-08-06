import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// HTML5 CURRICULUM — pure research, zero framework influence
// Sources: MDN, freeCodeCamp, W3Schools, HTML Living Standard
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 1 level, 14 weeks
// Basics → Text → Links → Images → Lists → Tables → Forms → Validation → Semantic → Multimedia → APIs → Accessibility → SEO → Project
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('html5', 'HTML5');

const LEVELS = [
  {
    levelId: 'html',
    nameId: 'HTML5 Lengkap',
    nameEn: 'Complete HTML5',
    descId: 'Dari nol hingga mahir: struktur, elemen, form, semantic, aksesibilitas, dan SEO.',
    descEn: 'From zero to expert: structure, elements, forms, semantics, accessibility, and SEO.',
  },
];

const MODULES = [
  // ── WEEK 1: Pengantar HTML ─────────────────────────────────────────────────
  {
    week: 1, level: 'html', topicId: 'pengantar-html',
    titleId: 'Pengantar HTML', titleEn: 'Introduction to HTML',
    programId: 'Halaman Pertama', programEn: 'First Page',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Pertama Saya</title>
</head>
<body>
    <h1>Selamat Datang di HTML!</h1>
    <p>Ini adalah halaman web pertama saya.</p>
    <p>HTML adalah bahasa markup untuk membuat struktur halaman web.</p>
</body>
</html>`,
    objectivesId: [
      'Memahami peran HTML sebagai bahasa markup struktur web',
      'Mengenal struktur dasar dokumen HTML5: DOCTYPE, html, head, body',
      'Memahami sistem tag: opening tag, closing tag, dan content',
      'Menggunakan elemen heading h1-h6 untuk hierarki judul',
      'Menggunakan elemen paragraf p untuk teks konten',
    ],
    objectivesEn: [
      'Understand HTML as the structural markup language of the web',
      'Learn the basic HTML5 document structure: DOCTYPE, html, head, body',
      'Understand the tag system: opening tag, closing tag, and content',
      'Use heading elements h1-h6 for title hierarchy',
      'Use paragraph elements p for text content',
    ],
    explanationId: '### Struktur Dokumen HTML5\n`<!DOCTYPE html>` memberitahu browser ini dokumen HTML5. `<html>` adalah root element. `<head>` berisi metadata, `<body>` berisi konten visible.\n\n### Tag & Elemen\nTag: `<p>` (opening) dan `</p>` (closing). Elemen = opening + content + closing.\n\n### Heading & Paragraf\n`<h1>` terbesar (utama), `<h6>` terkecil. `<p>` untuk paragraf teks.',
    explanationEn: '### HTML5 Document Structure\n`<!DOCTYPE html>` declares HTML5. `<html>` is root. `<head>` has metadata, `<body>` has visible content.\n\n### Tags & Elements\nTags: `<p>` opening, `</p>` closing. Element = opening + content + closing.\n\n### Headings & Paragraphs\n`<h1>` largest (main), `<h6>` smallest. `<p>` for text paragraphs.',
    experimentsId: [
      'Tambah heading level berbeda (h2, h3) di bawah h1',
      'Buat multiple paragraf dengan teks berbeda',
      'Ubah atribut lang dari "id" ke "en"',
      'Tambah meta description di dalam head',
      'Eksperimen dengan tag self-closing seperti <br> dan <hr>',
    ],
    experimentsEn: [
      'Add different heading levels (h2, h3) below h1',
      'Create multiple paragraphs with different text',
      'Change lang attribute from "id" to "en"',
      'Add meta description inside head',
      'Experiment with self-closing tags like <br> and <hr>',
    ],
    challengeId: 'Buat halaman profil sederhana: nama, foto placeholder, biodata singkat, dan hobi. Gunakan heading, paragraf, br, dan hr.',
    challengeEn: 'Build a simple profile page: name, placeholder photo, short bio, and hobbies. Use headings, paragraphs, br, and hr.',
    summaryId: 'Minggu 1 dari 14: **Pengantar HTML** (Level: HTML5 Lengkap). Fondasi setiap halaman web. Minggu depan: **Format Teks & Tipografi**.',
    summaryEn: 'Week 1 of 14: **Introduction to HTML** (Level: Complete HTML5). Foundation of every web page. Next week: **Text Formatting & Typography**.',
  },
  // ── WEEK 2: Format Teks & Tipografi ────────────────────────────────────────
  {
    week: 2, level: 'html', topicId: 'format-teks-tipografi',
    titleId: 'Format Teks & Tipografi', titleEn: 'Text Formatting & Typography',
    programId: 'Artikel Berita', programEn: 'News Article',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Artikel Berita</title>
</head>
<body>
    <article>
        <h1><strong>Pentingnya</strong> <em>Belajar HTML</em></h1>
        <p>Ditulis oleh <mark>Redaksi</mark> | <time datetime="2026-08-06">6 Agustus 2026</time></p>
        <hr>
        <p>HTML adalah <abbr title="HyperText Markup Language">HTML</abbr> — fondasi web.</p>
        <p>Ini teks <strong>tebal</strong>, <em>miring</em>, <u>garis bawah</u>, dan <s>coret</s>.</p>
        <p>Rumus air: H<sub>2</sub>O. Pangkat: x<sup>2</sup> + y<sup>2</sup> = z<sup>2</sup></p>
        <blockquote>
            <p>"Web adalah untuk semua orang, bukan untuk sebagian orang."</p>
            <footer>— Tim Berners-Lee</footer>
        </blockquote>
        <pre>
function halo() {
    console.log("Halo, Dunia!");
}
        </pre>
        <code>const x = 42;</code>
    </article>
</body>
</html>`,
    objectivesId: [
      'Elemen format inline: strong, em, u, s, mark, code',
      'Elemen semantik teks: blockquote, q, cite, abbr, time',
      'Subscript dan superscript: sub, sup untuk formula',
      'Elemen preformatted: pre untuk kode dan teks terformat',
      'Elemen kutipan: blockquote, q, cite untuk referensi',
    ],
    objectivesEn: [
      'Inline formatting elements: strong, em, u, s, mark, code',
      'Semantic text elements: blockquote, q, cite, abbr, time',
      'Subscript and superscript: sub, sup for formulas',
      'Preformatted element: pre for code and formatted text',
      'Quotation elements: blockquote, q, cite for references',
    ],
    explanationId: '### Format Inline\n`<strong>` penting (bold), `<em>` penekanan (italic), `<mark>` highlight, `<code>` kode inline.\n\n### Kutipan\n`<blockquote>` kutipan blok, `<q>` kutipan inline, `<cite>` sumber.\n\n### Pre & Code\n`<pre>` pertahankan spasi dan line break. `<code>` untuk kode inline.',
    explanationEn: '### Inline Formatting\n`<strong>` important (bold), `<em>` emphasis (italic), `<mark>` highlight, `<code>` inline code.\n\n### Quotations\n`<blockquote>` block quote, `<q>` inline quote, `<cite>` source.\n\n### Pre & Code\n`<pre>` preserves whitespace. `<code>` for inline code.',
    experimentsId: [
      'Buat paragraf dengan semua format inline berbeda',
      'Tambah blockquote dengan cite untuk artikel',
      'Coba pre dengan kode lebih panjang',
      'Eksperimen sub dan sup dengan formula matematika',
      'Buat daftar isi dengan abbr untuk istilah teknis',
    ],
    experimentsEn: [
      'Create paragraph with all different inline formats',
      'Add blockquote with cite for an article',
      'Try pre with longer code',
      'Experiment sub and sup with math formulas',
      'Create table of contents with abbr for technical terms',
    ],
    challengeId: 'Buat halaman artikel blog lengkap: judul, penulis, tanggal, paragraf dengan format, blockquote, kode, dan footer.',
    challengeEn: 'Build a complete blog article page: title, author, date, formatted paragraphs, blockquote, code, and footer.',
    summaryId: 'Minggu 2 dari 14: **Format Teks & Tipografi** (Level: HTML5 Lengkap). Kaya ekspresi dalam teks. Minggu depan: **Link & Navigasi**.',
    summaryEn: 'Week 2 of 14: **Text Formatting & Typography** (Level: Complete HTML5). Rich expression in text. Next week: **Links & Navigation**.',
  },
  // ── WEEK 3: Link & Navigasi ────────────────────────────────────────────────
  {
    week: 3, level: 'html', topicId: 'link-navigasi',
    titleId: 'Link & Navigasi', titleEn: 'Links & Navigation',
    programId: 'Menu Navigasi', programEn: 'Navigation Menu',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Link & Navigasi</title>
</head>
<body>
    <nav>
        <ul>
            <li><a href="#beranda">Beranda</a></li>
            <li><a href="#tentang">Tentang</a></li>
            <li><a href="#kontak">Kontak</a></li>
        </ul>
    </nav>

    <main>
        <section id="beranda">
            <h1>Beranda</h1>
            <p>Selamat datang di halaman utama.</p>
            <p><a href="https://developer.mozilla.org" target="_blank" rel="noopener">Buka MDN (tab baru)</a></p>
        </section>

        <section id="tentang">
            <h2>Tentang Kami</h2>
            <p>Ini halaman tentang. <a href="#beranda">Kembali ke beranda</a></p>
        </section>

        <section id="kontak">
            <h2>Kontak</h2>
            <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
            <p>Telepon: <a href="tel:+628123456789">+62 812-3456-789</a></p>
        </section>
    </main>
</body>
</html>`,
    objectivesId: [
      'Elemen anchor: a dengan atribut href untuk hyperlink',
      'Jenis link: absolute URL, relative URL, fragment (#id)',
      'Navigasi: nav, ul, li untuk menu',
      'Link khusus: mailto:, tel:, target="_blank"',
      'Atribut rel: noopener, noreferer untuk keamanan',
    ],
    objectivesEn: [
      'Anchor element: a with href attribute for hyperlinks',
      'Link types: absolute URL, relative URL, fragment (#id)',
      'Navigation: nav, ul, li for menus',
      'Special links: mailto:, tel:, target="_blank"',
      'Rel attribute: noopener, noreferer for security',
    ],
    explanationId: '### Elemen Anchor\n`<a href="url">text</a>` — hyperlink. `href` bisa absolute, relative, atau fragment.\n\n### Navigasi\n`<nav>` wrapper untuk menu. `<ul><li>` untuk daftar link.\n\n### Link Khusus\n`mailto:` buka email client, `tel:` panggil nomor di mobile.\n\n### Keamanan\n`rel="noopener noreferer"` untuk link external dengan target="_blank".',
    explanationEn: '### Anchor Element\n`<a href="url">text</a>` — hyperlink. `href` can be absolute, relative, or fragment.\n\n### Navigation\n`<nav>` wrapper for menus. `<ul><li>` for link lists.\n\n### Special Links\n`mailto:` opens email client, `tel:` dials number on mobile.\n\n### Security\n`rel="noopener noreferer"` for external links with target="_blank".',
    experimentsId: [
      'Buat menu navigasi dengan 5 link ke section berbeda',
      'Tambah link external ke 3 website berbeda',
      'Coba mailto dengan subject dan body',
      'Buat breadcrumb navigation',
      'Tambah skip-to-content link untuk aksesibilitas',
    ],
    experimentsEn: [
      'Create navigation menu with 5 links to different sections',
      'Add external links to 3 different websites',
      'Try mailto with subject and body',
      'Create breadcrumb navigation',
      'Add skip-to-content link for accessibility',
    ],
    challengeId: 'Buat halaman multi-section lengkap dengan navigasi sticky, smooth scroll, dan semua jenis link.',
    challengeEn: 'Build a complete multi-section page with sticky navigation, smooth scrolling, and all link types.',
    summaryId: 'Minggu 3 dari 14: **Link & Navigasi** (Level: HTML5 Lengkap). Menghubungkan halaman. Minggu depan: **Gambar & Media**.',
    summaryEn: 'Week 3 of 14: **Links & Navigation** (Level: Complete HTML5). Connecting pages. Next week: **Images & Media**.',
  },
  // ── WEEK 4: Gambar & Media ─────────────────────────────────────────────────
  {
    week: 4, level: 'html', topicId: 'gambar-media',
    titleId: 'Gambar & Media', titleEn: 'Images & Media',
    programId: 'Galeri Foto', programEn: 'Photo Gallery',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Galeri Foto</title>
</head>
<body>
    <h1>Galeri Foto</h1>

    <figure>
        <img src="https://picsum.photos/400/300?random=1"
             alt="Pemandangan gunung saat sunrise"
             width="400" height="300"
             loading="lazy">
        <figcaption>Pemandangan gunung saat sunrise</figcaption>
    </figure>

    <figure>
        <img src="https://picsum.photos/400/300?random=2"
             alt="Pantai tropis dengan pasir putih"
             width="400" height="300"
             loading="lazy">
        <figcaption>Pantai tropis dengan pasir putih</figcaption>
    </figure>

    <h2>Responsive Picture</h2>
    <picture>
        <source media="(min-width: 800px)" srcset="https://picsum.photos/800/400?random=3">
        <source media="(min-width: 400px)" srcset="https://picsum.photos/400/300?random=4">
        <img src="https://picsum.photos/300/200?random=5" alt="Gambar responsive">
    </picture>
</body>
</html>`,
    objectivesId: [
      'Elemen img: src, alt, width, height, loading',
      'Pentingnya alt text untuk aksesibilitas dan SEO',
      'Elemen figure dan figcaption untuk caption gambar',
      'Elemen picture untuk responsive images',
      'Atribut loading="lazy" untuk performa',
    ],
    objectivesEn: [
      'Image element: src, alt, width, height, loading',
      'Importance of alt text for accessibility and SEO',
      'Figure and figcaption elements for image captions',
      'Picture element for responsive images',
      'loading="lazy" attribute for performance',
    ],
    explanationId: '### Elemen img\n`<img src="url" alt="deskripsi">` — alt wajib untuk aksesibilitas.\n\n### Figure & Figcaption\n`<figure>` wrapper, `<figcaption>` caption. Lebih semantic dari caption biasa.\n\n### Picture Element\n`<picture>` dengan `<source>` untuk responsive images — browser pilih yang sesuai.\n\n### Performa\n`loading="lazy"` menunda load sampai gambar terlihat di viewport.',
    explanationEn: '### Image Element\n`<img src="url" alt="description">` — alt required for accessibility.\n\n### Figure & Figcaption\n`<figure>` wrapper, `<figcaption>` caption. More semantic.\n\n### Picture Element\n`<picture>` with `<source>` for responsive images — browser picks the right one.\n\n### Performance\n`loading="lazy"` defers loading until image is in viewport.',
    experimentsId: [
      'Tambah 3 gambar dengan alt text berbeda',
      'Coba picture dengan 3 source berbeda',
      'Eksperimen dengan width dan height berbeda',
      'Buat galeri dengan figure dan figcaption',
      'Coba loading="eager" vs "lazy"',
    ],
    experimentsEn: [
      'Add 3 images with different alt text',
      'Try picture with 3 different sources',
      'Experiment with different width and height',
      'Create gallery with figure and figcaption',
      'Try loading="eager" vs "lazy"',
    ],
    challengeId: 'Buat halaman portofolio dengan galeri foto responsive, figure + figcaption, dan lazy loading.',
    challengeEn: 'Build a portfolio page with responsive photo gallery, figure + figcaption, and lazy loading.',
    summaryId: 'Minggu 4 dari 14: **Gambar & Media** (Level: HTML5 Lengkap). Visual yang powerful. Minggu depan: **List & Daftar**.',
    summaryEn: 'Week 4 of 14: **Images & Media** (Level: Complete HTML5). Powerful visuals. Next week: **Lists**.',
  },
  // ── WEEK 5: List & Daftar ──────────────────────────────────────────────────
  {
    week: 5, level: 'html', topicId: 'list-daftar',
    titleId: 'List & Daftar', titleEn: 'Lists',
    programId: 'Daftar Belanja', programEn: 'Shopping List',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Belanja</title>
</head>
<body>
    <h1>Daftar Belanja Mingguan</h1>

    <h2>Yang Harus Dibeli (Ordered)</h2>
    <ol>
        <li>Susu segar 1 liter</li>
        <li>Roti tawar</li>
        <li>Telur 1 lusin</li>
        <li>Buah-buahan</li>
    </ol>

    <h2>Kategori Belanja (Unordered)</h2>
    <ul>
        <li>Sayuran
            <ul>
                <li>Bayam</li>
                <li>Brokoli</li>
                <li>Wortel</li>
            </ul>
        </li>
        <li>Protein
            <ul>
                <li>Ayam</li>
                <li>Ikan</li>
                <li>Tahu & Tempe</li>
            </ul>
        </li>
        <li>Bumbu Dapur</li>
    </ul>

    <h2>Deskripsi Produk (Description List)</h2>
    <dl>
        <dt>Susu</dt>
        <dd>Minuman dari sapi, kaya kalsium dan protein</dd>
        <dt>Roti</dt>
        <dd>Makanan dari tepung terigu yang dipanggang</dd>
        <dt>Telur</dt>
        <dd>Sumber protein hewani yang murah dan bergizi</dd>
    </dl>
</body>
</html>`,
    objectivesId: [
      'Ordered list: ol untuk daftar berurutan',
      'Unordered list: ul untuk daftar tidak berurutan',
      'Description list: dl, dt, dd untuk pasangan istilah-deskripsi',
      'Nested list: list di dalam list untuk hierarki',
      'Styling list dengan CSS list-style-type',
    ],
    objectivesEn: [
      'Ordered list: ol for sequential lists',
      'Unordered list: ul for non-sequential lists',
      'Description list: dl, dt, dd for term-description pairs',
      'Nested lists: lists inside lists for hierarchy',
      'Styling lists with CSS list-style-type',
    ],
    explanationId: '### Ordered List\n`<ol><li>...</li></ol>` — daftar bernomor otomatis.\n\n### Unordered List\n`<ul><li>...</li></ul>` — daftar dengan bullet.\n\n### Description List\n`<dl><dt>istilah</dt><dd>deskripsi</dd></dl>` — pasangan istilah.\n\n### Nested List\nList di dalam list untuk sub-item. Bisa ol di dalam ul atau sebaliknya.',
    explanationEn: '### Ordered List\n`<ol><li>...</li></ol>` — auto-numbered list.\n\n### Unordered List\n`<ul><li>...</li></ul>` — bulleted list.\n\n### Description List\n`<dl><dt>term</dt><dd>description</dd></dl>` — term pairs.\n\n### Nested Lists\nLists inside lists for sub-items.',
    experimentsId: [
      'Buat nested list 3 level dalam',
      'Coba description list untuk FAQ',
      'Buat ordered list dengan start="5"',
      'Eksperimen reversed pada ol',
      'Buat navigasi sidebar dengan nested ul',
    ],
    experimentsEn: [
      'Create nested list 3 levels deep',
      'Try description list for FAQ',
      'Create ordered list with start="5"',
      'Experiment reversed on ol',
      'Create sidebar navigation with nested ul',
    ],
    challengeId: 'Buat halaman resep makanan: bahan (ul), langkah (ol), dan nutrisi (dl).',
    challengeEn: 'Build a food recipe page: ingredients (ul), steps (ol), and nutrition (dl).',
    summaryId: 'Minggu 5 dari 14: **List & Daftar** (Level: HTML5 Lengkap). Struktur data sederhana. Minggu depan: **Tabel**.',
    summaryEn: 'Week 5 of 14: **Lists** (Level: Complete HTML5). Simple data structures. Next week: **Tables**.',
  },
  // ── WEEK 6: Tabel ──────────────────────────────────────────────────────────
  {
    week: 6, level: 'html', topicId: 'tabel',
    titleId: 'Tabel', titleEn: 'Tables',
    programId: 'Jadwal Kuliah', programEn: 'Class Schedule',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Jadwal Kuliah</title>
</head>
<body>
    <h1>Jadwal Kuliah Semester Ganjil</h1>

    <table>
        <caption>Jadwal Kuliah Kelas A - 2026</caption>
        <thead>
            <tr>
                <th>Hari</th>
                <th>Waktu</th>
                <th>Mata Kuliah</th>
                <th>Ruang</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Senin</td>
                <td>08:00 - 10:00</td>
                <td>Algoritma</td>
                <td>R.301</td>
            </tr>
            <tr>
                <td>Selasa</td>
                <td>10:00 - 12:00</td>
                <td>Basis Data</td>
                <td>Lab.2</td>
            </tr>
            <tr>
                <td>Rabu</td>
                <td>08:00 - 10:00</td>
                <td>Web Programming</td>
                <td>Lab.1</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4">Total: 3 mata kuliah</td>
            </tr>
        </tfoot>
    </table>

    <h2>Tabel dengan rowspan & colspan</h2>
    <table>
        <thead>
            <tr>
                <th rowspan="2">Nama</th>
                <th colspan="2">Nilai</th>
            </tr>
            <tr>
                <th>Teori</th>
                <th>Praktek</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Budi</td>
                <td>85</td>
                <td>90</td>
            </tr>
            <tr>
                <td>Siti</td>
                <td>92</td>
                <td>88</td>
            </tr>
        </tbody>
    </table>
</body>
</html>`,
    objectivesId: [
      'Struktur tabel: table, thead, tbody, tfoot',
      'Baris dan sel: tr, th, td',
      'Caption untuk judul tabel',
      'rowspan dan colspan untuk merge sel',
      'Scope atribut untuk aksesibilitas th',
    ],
    objectivesEn: [
      'Table structure: table, thead, tbody, tfoot',
      'Rows and cells: tr, th, td',
      'Caption for table title',
      'rowspan and colspan for cell merging',
      'Scope attribute for th accessibility',
    ],
    explanationId: '### Struktur Tabel\n`<table>` container, `<thead>` header, `<tbody>` data, `<tfoot>` footer.\n\n### Sel & Baris\n`<tr>` baris, `<th>` header cell, `<td>` data cell.\n\n### Merge Sel\n`rowspan="2"` gabung 2 baris, `colspan="2"` gabung 2 kolom.\n\n### Aksesibilitas\n`<th scope="col">` atau `scope="row"` untuk screen reader.',
    explanationEn: '### Table Structure\n`<table>` container, `<thead>` header, `<tbody>` data, `<tfoot>` footer.\n\n### Cells & Rows\n`<tr>` row, `<th>` header cell, `<td>` data cell.\n\n### Cell Merging\n`rowspan="2"` merge 2 rows, `colspan="2"` merge 2 columns.\n\n### Accessibility\n`<th scope="col">` or `scope="row"` for screen readers.',
    experimentsId: [
      'Buat tabel dengan 5 kolom dan 10 baris',
      'Coba rowspan untuk merge baris',
      'Buat tabel dengan caption dan tfoot',
      'Eksperimen scope="row" dan scope="col"',
      'Buat tabel kompleks dengan nested header',
    ],
    experimentsEn: [
      'Create table with 5 columns and 10 rows',
      'Try rowspan for row merging',
      'Create table with caption and tfoot',
      'Experiment scope="row" and scope="col"',
      'Create complex table with nested headers',
    ],
    challengeId: 'Buat halaman dashboard sederhana: tabel data mahasiswa dengan sorting indicator, caption, dan footer.',
    challengeEn: 'Build a simple dashboard page: student data table with sorting indicator, caption, and footer.',
    summaryId: 'Minggu 6 dari 14: **Tabel** (Level: HTML5 Lengkap). Data terstruktur. Minggu depan: **Form & Input**.',
    summaryEn: 'Week 6 of 14: **Tables** (Level: Complete HTML5). Structured data. Next week: **Forms & Inputs**.',
  },
  // ── WEEK 7: Form & Input ───────────────────────────────────────────────────
  {
    week: 7, level: 'html', topicId: 'form-input',
    titleId: 'Form & Input', titleEn: 'Forms & Inputs',
    programId: 'Form Registrasi', programEn: 'Registration Form',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Form Registrasi</title>
</head>
<body>
    <h1>Form Registrasi</h1>

    <form action="/register" method="POST">
        <fieldset>
            <legend>Data Pribadi</legend>

            <p>
                <label for="nama">Nama Lengkap:</label><br>
                <input type="text" id="nama" name="nama" required placeholder="Masukkan nama">
            </p>

            <p>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required placeholder="email@example.com">
            </p>

            <p>
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required minlength="8">
            </p>

            <p>
                <label for="tanggal">Tanggal Lahir:</label><br>
                <input type="date" id="tanggal" name="tanggal_lahir">
            </p>
        </fieldset>

        <fieldset>
            <legend>Preferensi</legend>

            <p>
                <label for="kota">Kota:</label><br>
                <select id="kota" name="kota">
                    <option value="">-- Pilih Kota --</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                    <option value="surabaya">Surabaya</option>
                </select>
            </p>

            <p>
                <label>Jenis Kelamin:</label><br>
                <input type="radio" id="lk" name="gender" value="laki">
                <label for="lk">Laki-laki</label><br>
                <input type="radio" id="pr" name="gender" value="perempuan">
                <label for="pr">Perempuan</label>
            </p>

            <p>
                <label>Hobi:</label><br>
                <input type="checkbox" id="baca" name="hobi" value="baca">
                <label for="baca">Membaca</label><br>
                <input type="checkbox" id="olahraga" name="hobi" value="olahraga">
                <label for="olahraga">Olahraga</label><br>
                <input type="checkbox" id="musik" name="hobi" value="musik">
                <label for="musik">Musik</label>
            </p>

            <p>
                <label for="bio">Bio:</label><br>
                <textarea id="bio" name="bio" rows="4" cols="40" placeholder="Ceritakan tentang Anda..."></textarea>
            </p>

            <p>
                <label for="foto">Foto Profil:</label><br>
                <input type="file" id="foto" name="foto" accept="image/*">
            </p>

            <p>
                <input type="checkbox" id="setuju" name="setuju" required>
                <label for="setuju">Saya setuju dengan syarat dan ketentuan</label>
            </p>

            <p>
                <button type="submit">Daftar</button>
                <button type="reset">Reset</button>
            </p>
        </fieldset>
    </form>
</body>
</html>`,
    objectivesId: [
      'Elemen form: action, method, fieldset, legend',
      'Input types: text, email, password, date, file',
      'Select dan option untuk dropdown',
      'Radio button dan checkbox untuk pilihan',
      'Textarea untuk teks panjang, label untuk aksesibilitas',
    ],
    objectivesEn: [
      'Form elements: action, method, fieldset, legend',
      'Input types: text, email, password, date, file',
      'Select and option for dropdowns',
      'Radio buttons and checkboxes for choices',
      'Textarea for long text, label for accessibility',
    ],
    explanationId: '### Struktur Form\n`<form action="url" method="POST">` — action = tujuan, method = GET/POST.\n\n### Input Types\n`text`, `email`, `password`, `date`, `file`, `number`, `tel`, `url`.\n\n### Select & Option\n`<select><option value="x">Label</option></select>`.\n\n### Radio & Checkbox\nRadio: sama name, beda value. Checkbox: sama name, multiple value.\n\n### Label & Aksesibilitas\n`<label for="id">` terhubung ke input via id.',
    explanationEn: '### Form Structure\n`<form action="url" method="POST">` — action = destination, method = GET/POST.\n\n### Input Types\n`text`, `email`, `password`, `date`, `file`, `number`, `tel`, `url`.\n\n### Select & Option\n`<select><option value="x">Label</option></select>`.\n\n### Radio & Checkbox\nRadio: same name, different value. Checkbox: same name, multiple values.\n\n### Label & Accessibility\n`<label for="id">` connects to input via id.',
    experimentsId: [
      'Tambah input type="range" untuk slider',
      'Buat form dengan autocomplete="off"',
      'Coba input type="color" untuk pilih warna',
      'Tambah datalist untuk autocomplete custom',
      'Buat form multi-step dengan fieldset berbeda',
    ],
    experimentsEn: [
      'Add input type="range" for slider',
      'Create form with autocomplete="off"',
      'Try input type="color" for color picker',
      'Add datalist for custom autocomplete',
      'Create multi-step form with different fieldsets',
    ],
    challengeId: 'Buat form checkout lengkap: alamat, pembayaran, item pesanan, dengan semua jenis input.',
    challengeEn: 'Build a complete checkout form: address, payment, order items, with all input types.',
    summaryId: 'Minggu 7 dari 14: **Form & Input** (Level: HTML5 Lengkap). Interaksi pengguna. Minggu depan: **Validasi Form**.',
    summaryEn: 'Week 7 of 14: **Forms & Inputs** (Level: Complete HTML5). User interaction. Next week: **Form Validation**.',
  },
  // ── WEEK 8: Validasi Form ──────────────────────────────────────────────────
  {
    week: 8, level: 'html', topicId: 'validasi-form',
    titleId: 'Validasi Form', titleEn: 'Form Validation',
    programId: 'Form dengan Validasi', programEn: 'Form with Validation',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Validasi Form</title>
</head>
<body>
    <h1>Form dengan Validasi HTML5</h1>

    <form novalidate>
        <p>
            <label for="username">Username (3-20 karakter):</label><br>
            <input type="text" id="username" name="username"
                   required minlength="3" maxlength="20"
                   pattern="[a-zA-Z0-9_]+"
                   title="Hanya huruf, angka, dan underscore">
            <span class="hint">3-20 karakter, alphanumeric + underscore</span>
        </p>

        <p>
            <label for="email2">Email:</label><br>
            <input type="email" id="email2" name="email"
                   required placeholder="email@example.com">
        </p>

        <p>
            <label for="umur">Umur (13-120):</label><br>
            <input type="number" id="umur" name="umur"
                   required min="13" max="120" step="1">
        </p>

        <p>
            <label for="website">Website:</label><br>
            <input type="url" id="website" name="website"
                   placeholder="https://example.com">
        </p>

        <p>
            <label for="telepon">Telepon:</label><br>
            <input type="tel" id="telepon" name="telepon"
                   pattern="[0-9]{10,13}"
                   placeholder="08123456789">
        </p>

        <p>
            <label for="password2">Password (min 8, ada huruf besar & angka):</label><br>
            <input type="password" id="password2" name="password"
                   required minlength="8"
                   pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
                   title="Min 8 karakter, harus ada huruf besar dan angka">
        </p>

        <p>
            <label for="konfirmasi">Konfirmasi Password:</label><br>
            <input type="password" id="konfirmasi" name="konfirmasi" required>
        </p>

        <p>
            <label for="cari">Cari:</label><br>
            <input type="search" id="cari" name="cari"
                   aria-label="Cari konten">
        </p>

        <button type="submit">Kirim</button>
    </form>
</body>
</html>`,
    objectivesId: [
      'Atribut validasi: required, minlength, maxlength',
      'Validasi angka: min, max, step',
      'Validasi pattern dengan regex',
      'Validasi email, url, tel bawaan HTML5',
      'title attribute untuk pesan error tooltip',
    ],
    objectivesEn: [
      'Validation attributes: required, minlength, maxlength',
      'Number validation: min, max, step',
      'Pattern validation with regex',
      'Built-in HTML5 validation: email, url, tel',
      'title attribute for error tooltip messages',
    ],
    explanationId: '### Required & Length\n`required` wajib diisi. `minlength` dan `maxlength` batas karakter.\n\n### Angka\n`min`, `max`, `step` untuk input number dan range.\n\n### Pattern (Regex)\n`pattern="[a-zA-Z0-9_]+"` validasi dengan regular expression.\n\n### Tipe Bawaan\n`type="email"`, `type="url"`, `type="tel"` punya validasi otomatis.\n\n### Title & Hint\n`title` untuk tooltip error. Tambah span.hint untuk panduan.',
    explanationEn: '### Required & Length\n`required` mandatory. `minlength` and `maxlength` character limits.\n\n### Numbers\n`min`, `max`, `step` for number and range inputs.\n\n### Pattern (Regex)\n`pattern="[a-zA-Z0-9_]+"` validates with regular expression.\n\n### Built-in Types\n`type="email"`, `type="url"`, `type="tel"` have automatic validation.\n\n### Title & Hint\n`title` for error tooltip. Add span.hint for guidance.',
    experimentsId: [
      'Coba pattern untuk validasi NIM/NPM',
      'Buat validasi password dengan pattern kompleks',
      'Eksperimen min dan max pada input date',
      'Tambah input dengan multiple pattern',
      'Buat form dengan semua jenis validasi',
    ],
    experimentsEn: [
      'Try pattern for student ID validation',
      'Create password validation with complex pattern',
      'Experiment min and max on date input',
      'Add input with multiple patterns',
      'Create form with all validation types',
    ],
    challengeId: 'Buat form login dengan validasi lengkap: email format, password strength, dan konfirmasi password.',
    challengeEn: 'Build a login form with complete validation: email format, password strength, and password confirmation.',
    summaryId: 'Minggu 8 dari 14: **Validasi Form** (Level: HTML5 Lengkap). Keamanan input. Minggu depan: **Semantic HTML**.',
    summaryEn: 'Week 8 of 14: **Form Validation** (Level: Complete HTML5). Input security. Next week: **Semantic HTML**.',
  },
  // ── WEEK 9: Semantic HTML ──────────────────────────────────────────────────
  {
    week: 9, level: 'html', topicId: 'semantic-html',
    titleId: 'Semantic HTML', titleEn: 'Semantic HTML',
    programId: 'Struktur Halaman Semantic', programEn: 'Semantic Page Structure',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Blog Semantic</title>
</head>
<body>
    <header>
        <h1>Blog Saya</h1>
        <nav>
            <ul>
                <li><a href="#home">Beranda</a></li>
                <li><a href="#artikel">Artikel</a></li>
                <li><a href="#tentang">Tentang</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h2>Belajar Semantic HTML</h2>
                <p>Ditulis <time datetime="2026-08-06">6 Agustus 2026</time></p>
            </header>
            <p>Semantic HTML memberikan makna pada struktur halaman...</p>
            <section>
                <h3>Mengapa Semantic?</h3>
                <p>SEO, aksesibilitas, dan maintainability lebih baik.</p>
            </section>
            <section>
                <h3>Elemen Semantic Utama</h3>
                <p>header, nav, main, article, section, aside, footer.</p>
            </section>
            <footer>
                <p>Kategori: <a href="#html">HTML</a></p>
            </footer>
        </article>

        <aside>
            <h3>Artikel Terkait</h3>
            <ul>
                <li><a href="#">Pengantar CSS</a></li>
                <li><a href="#">Dasar JavaScript</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 Blog Saya. Semua hak dilindungi.</p>
        <address>Email: <a href="mailto:info@blog.com">info@blog.com</a></address>
    </footer>
</body>
</html>`,
    objectivesId: [
      'Elemen semantic: header, nav, main, article, section, aside, footer',
      'Perbedaan div (non-semantic) vs elemen semantic',
      'Hierarki elemen semantic yang benar',
      'Manfaat semantic: SEO, aksesibilitas, maintainability',
      'Elemen details dan summary untuk konten collapsible',
    ],
    objectivesEn: [
      'Semantic elements: header, nav, main, article, section, aside, footer',
      'Difference between div (non-semantic) and semantic elements',
      'Correct semantic element hierarchy',
      'Semantic benefits: SEO, accessibility, maintainability',
      'Details and summary elements for collapsible content',
    ],
    explanationId: '### Elemen Semantic\n`<header>` intro/navigasi, `<nav>` menu, `<main>` konten utama (1x), `<article>` konten independen, `<section>` bagian tematik, `<aside>` konten sampingan, `<footer>` penutup.\n\n### Div vs Semantic\n`<div>` tidak punya makna. Semantic elemen memberitahu browser dan screen reader tentang peran konten.\n\n### Manfaat\n- SEO: search engine pahami struktur\n- A11y: screen reader navigasi lebih baik\n- Maintain: kode lebih readable',
    explanationEn: '### Semantic Elements\n`<header>` intro/nav, `<nav>` menu, `<main>` main content (1x), `<article>` independent content, `<section>` thematic section, `<aside>` sidebar, `<footer>` closing.\n\n### Div vs Semantic\n`<div>` has no meaning. Semantic elements tell browsers and screen readers about content role.\n\n### Benefits\n- SEO: search engines understand structure\n- A11y: screen reader navigation improved\n- Maintain: more readable code',
    experimentsId: [
      'Buat halaman dengan multiple article di main',
      'Tambah details + summary untuk FAQ',
      'Coba nested section di dalam article',
      'Buat layout dengan aside di kanan',
      'Eksperimen address di footer',
    ],
    experimentsEn: [
      'Create page with multiple articles in main',
      'Add details + summary for FAQ',
      'Try nested section inside article',
      'Create layout with aside on right',
      'Experiment address in footer',
    ],
    challengeId: 'Buat halaman blog lengkap: header dengan nav, main dengan 2 article, aside dengan widget, footer dengan address.',
    challengeEn: 'Build a complete blog page: header with nav, main with 2 articles, aside with widgets, footer with address.',
    summaryId: 'Minggu 9 dari 14: **Semantic HTML** (Level: HTML5 Lengkap). Makna dan struktur. Minggu depan: **Multimedia: Audio & Video**.',
    summaryEn: 'Week 9 of 14: **Semantic HTML** (Level: Complete HTML5). Meaning and structure. Next week: **Multimedia: Audio & Video**.',
  },
  // ── WEEK 10: Multimedia: Audio & Video ─────────────────────────────────────
  {
    week: 10, level: 'html', topicId: 'multimedia-audio-video',
    titleId: 'Multimedia: Audio & Video', titleEn: 'Multimedia: Audio & Video',
    programId: 'Pemutar Media', programEn: 'Media Player',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Pemutar Media</title>
</head>
<body>
    <h1>Pemutar Media HTML5</h1>

    <h2>Video Player</h2>
    <video controls width="640" height="360"
           poster="https://picsum.photos/640/360"
           preload="metadata">
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
        <source src="https://www.w3schools.com/html/mov_bbb.webm" type="video/webm">
        <track kind="subtitles" src="subtitles_id.vtt" srclang="id" label="Indonesia">
        <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English">
        Browser Anda tidak mendukung video HTML5.
    </video>

    <h2>Audio Player</h2>
    <audio controls preload="metadata">
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
        Browser Anda tidak mendukung audio HTML5.
    </audio>

    <h2>Embed YouTube</h2>
    <iframe width="560" height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Video YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>

    <h2>Embed Peta</h2>
    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=106.8,-6.2,106.9,-6.1"
            width="425" height="350"
            title="Peta Jakarta">
    </iframe>
</body>
</html>`,
    objectivesId: [
      'Elemen video: controls, autoplay, loop, muted, poster',
      'Elemen audio: controls, autoplay, loop',
      'Multiple source untuk format fallback',
      'Elemen track untuk subtitle/caption',
      'Elemen iframe untuk embed konten eksternal',
    ],
    objectivesEn: [
      'Video element: controls, autoplay, loop, muted, poster',
      'Audio element: controls, autoplay, loop',
      'Multiple sources for format fallback',
      'Track element for subtitles/captions',
      'Iframe element for embedding external content',
    ],
    explanationId: '### Video\n`<video controls poster="..." preload="metadata">` — controls tampilkan player, poster thumbnail, preload metadata saja.\n\n### Audio\n`<audio controls>` — player audio sederhana.\n\n### Multiple Source\n`<source src="..." type="video/mp4">` — browser pilih format yang didukung.\n\n### Track\n`<track kind="subtitles" src="subs.vtt" srclang="id">` — subtitle file VTT.\n\n### Iframe\nEmbed konten eksternal: YouTube, Maps, dll.',
    explanationEn: '### Video\n`<video controls poster="..." preload="metadata">` — controls show player, poster thumbnail, preload metadata only.\n\n### Audio\n`<audio controls>` — simple audio player.\n\n### Multiple Sources\n`<source src="..." type="video/mp4">` — browser picks supported format.\n\n### Track\n`<track kind="subtitles" src="subs.vtt" srclang="id">` — VTT subtitle file.\n\n### Iframe\nEmbed external content: YouTube, Maps, etc.',
    experimentsId: [
      'Tambah video dengan autoplay dan muted',
      'Coba loop pada audio',
      'Buat playlist video dengan multiple source',
      'Tambah track subtitle dalam 2 bahasa',
      'Embed konten berbeda: Spotify, CodePen',
    ],
    experimentsEn: [
      'Add video with autoplay and muted',
      'Try loop on audio',
      'Create video playlist with multiple sources',
      'Add subtitle track in 2 languages',
      'Embed different content: Spotify, CodePen',
    ],
    challengeId: 'Buat halaman media gallery: 2 video, 2 audio, 1 YouTube embed, dengan kontrol custom.',
    challengeEn: 'Build a media gallery page: 2 videos, 2 audios, 1 YouTube embed, with custom controls.',
    summaryId: 'Minggu 10 dari 14: **Multimedia: Audio & Video** (Level: HTML5 Lengkap). Konten kaya. Minggu depan: **HTML APIs**.',
    summaryEn: 'Week 10 of 14: **Multimedia: Audio & Video** (Level: Complete HTML5). Rich content. Next week: **HTML APIs**.',
  },
  // ── WEEK 11: HTML APIs ─────────────────────────────────────────────────────
  {
    week: 11, level: 'html', topicId: 'html-apis',
    titleId: 'HTML APIs', titleEn: 'HTML APIs',
    programId: 'Drag & Drop + Geolocation', programEn: 'Drag & Drop + Geolocation',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>HTML APIs Demo</title>
</head>
<body>
    <h1>HTML5 APIs</h1>

    <h2>Drag & Drop API</h2>
    <div id="drag-source" draggable="true"
         style="width:100px;height:100px;background:#4CAF50;color:white;
                display:flex;align-items:center;justify-content:center;
                cursor:move;border-radius:8px;">
        Drag saya
    </div>
    <div id="drop-zone"
         style="width:200px;height:150px;border:3px dashed #999;
                display:flex;align-items:center;justify-content:center;
                margin-top:20px;border-radius:8px;">
        Drop di sini
    </div>

    <h2>Geolocation API</h2>
    <button onclick="getLocation()">Dapatkan Lokasi</button>
    <p id="lokasi">Klik tombol untuk mendapatkan lokasi Anda.</p>

    <h2>Local Storage</h2>
    <input type="text" id="nama-input" placeholder="Masukkan nama Anda">
    <button onclick="simpanNama()">Simpan</button>
    <p id="sapaan"></p>

    <script>
    // Drag & Drop
    const dragSource = document.getElementById('drag-source');
    const dropZone = document.getElementById('drop-zone');

    dragSource.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'Element dropped!');
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.background = '#e0f7fa';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.innerHTML = e.dataTransfer.getData('text/plain');
        dropZone.style.background = '#c8e6c9';
    });

    // Geolocation
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                document.getElementById('lokasi').textContent =
                    'Lat: ' + pos.coords.latitude.toFixed(4) +
                    ', Lng: ' + pos.coords.longitude.toFixed(4);
            });
        } else {
            document.getElementById('lokasi').textContent = 'Geolocation tidak didukung.';
        }
    }

    // Local Storage
    function simpanNama() {
        const nama = document.getElementById('nama-input').value;
        localStorage.setItem('nama', nama);
        document.getElementById('sapaan').textContent = 'Halo, ' + nama + '!';
    }

    // Load saved name
    const saved = localStorage.getItem('nama');
    if (saved) {
        document.getElementById('sapaan').textContent = 'Selamat datang kembali, ' + saved + '!';
    }
    </script>
</body>
</html>`,
    objectivesId: [
      'Drag & Drop API: draggable, dragstart, dragover, drop',
      'Geolocation API: navigator.geolocation.getCurrentPosition',
      'Web Storage: localStorage dan sessionStorage',
      'DataTransfer API untuk drag & drop data',
      'Deteksi dukungan API: feature detection',
    ],
    objectivesEn: [
      'Drag & Drop API: draggable, dragstart, dragover, drop',
      'Geolocation API: navigator.geolocation.getCurrentPosition',
      'Web Storage: localStorage and sessionStorage',
      'DataTransfer API for drag & drop data',
      'API support detection: feature detection',
    ],
    explanationId: '### Drag & Drop\n`draggable="true"` pada source. Event: `dragstart`, `dragover`, `drop`. `e.dataTransfer` untuk transfer data.\n\n### Geolocation\n`navigator.geolocation.getCurrentPosition(callback)` — minta izin user, dapat latitude/longitude.\n\n### Web Storage\n`localStorage.setItem(key, value)` — simpan data persisten. `sessionStorage` untuk session saja.\n\n### Feature Detection\nCek `if (navigator.geolocation)` sebelum pakai API.',
    explanationEn: '### Drag & Drop\n`draggable="true"` on source. Events: `dragstart`, `dragover`, `drop`. `e.dataTransfer` for data transfer.\n\n### Geolocation\n`navigator.geolocation.getCurrentPosition(callback)` — request user permission, get lat/lng.\n\n### Web Storage\n`localStorage.setItem(key, value)` — store persistent data. `sessionStorage` for session-only.\n\n### Feature Detection\nCheck `if (navigator.geolocation)` before using API.',
    experimentsId: [
      'Buat multiple drag source ke satu drop zone',
      'Coba sessionStorage vs localStorage',
      'Tambah error handling untuk geolocation',
      'Buat drag & drop file upload',
      'Simpan multiple data di localStorage',
    ],
    experimentsEn: [
      'Create multiple drag sources to one drop zone',
      'Try sessionStorage vs localStorage',
      'Add error handling for geolocation',
      'Create drag & drop file upload',
      'Store multiple data in localStorage',
    ],
    challengeId: 'Buat aplikasi to-do list dengan drag & drop reorder dan localStorage persistence.',
    challengeEn: 'Build a to-do list app with drag & drop reordering and localStorage persistence.',
    summaryId: 'Minggu 11 dari 14: **HTML APIs** (Level: HTML5 Lengkap). Interaktivitas native. Minggu depan: **Aksesibilitas (a11y)**.',
    summaryEn: 'Week 11 of 14: **HTML APIs** (Level: Complete HTML5). Native interactivity. Next week: **Accessibility (a11y)**.',
  },
  // ── WEEK 12: Aksesibilitas (a11y) ───────────────────────────────────────────
  {
    week: 12, level: 'html', topicId: 'aksesibilitas',
    titleId: 'Aksesibilitas (a11y)', titleEn: 'Accessibility (a11y)',
    programId: 'Halaman Aksesibel', programEn: 'Accessible Page',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Halaman Aksesibel</title>
</head>
<body>
    <a href="#main-content" class="skip-link">Skip ke konten utama</a>

    <header role="banner">
        <h1>Website Aksesibel</h1>
        <nav aria-label="Navigasi utama">
            <ul>
                <li><a href="#beranda" aria-current="page">Beranda</a></li>
                <li><a href="#artikel">Artikel</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <main id="main-content" role="main">
        <article>
            <h2>Tips Aksesibilitas Web</h2>

            <img src="https://picsum.photos/400/200"
                 alt="Ilustrasi: orang menggunakan screen reader di laptop"
                 loading="lazy">

            <h3>1. Gunakan Alt Text</h3>
            <p>Setiap gambar harus memiliki alt text yang deskriptif.</p>

            <h3>2. Struktur Heading yang Benar</h3>
            <p>Jangan skip level heading (h1 ke h3).</p>

            <h3>3. Label untuk Form</h3>
            <form>
                <label for="email-input">Email:</label>
                <input type="email" id="email-input"
                       aria-describedby="email-hint"
                       aria-required="true">
                <p id="email-hint">Kami tidak akan membagikan email Anda.</p>

                <button type="submit" aria-label="Kirim formulir">Kirim</button>
            </form>

            <h3>4. ARIA Attributes</h3>
            <div role="alert" aria-live="polite">
                Ini pesan alert untuk screen reader.
            </div>

            <details>
                <summary>Apa itu ARIA?</summary>
                <p>Accessible Rich Internet Applications — atribut tambahan untuk aksesibilitas.</p>
            </details>
        </article>
    </main>

    <footer role="contentinfo">
        <p>&copy; 2026. <a href="#top" aria-label="Kembali ke atas">Kembali ke atas</a></p>
    </footer>

    <style>
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 100;
    }
    .skip-link:focus { top: 0; }
    </style>
</body>
</html>`,
    objectivesId: [
      'Skip navigation link untuk keyboard users',
      'ARIA roles: banner, main, contentinfo, navigation, alert',
      'ARIA attributes: aria-label, aria-current, aria-describedby, aria-live',
      'Alt text yang deskriptif untuk semua gambar',
      'Struktur heading yang benar dan label untuk form',
    ],
    objectivesEn: [
      'Skip navigation link for keyboard users',
      'ARIA roles: banner, main, contentinfo, navigation, alert',
      'ARIA attributes: aria-label, aria-current, aria-describedby, aria-live',
      'Descriptive alt text for all images',
      'Correct heading structure and form labels',
    ],
    explanationId: '### Skip Link\nLink tersembunyi yang muncul saat keyboard focus — langsung ke konten utama.\n\n### ARIA Roles\n`role="banner"`, `role="main"`, `role="navigation"`, `role="alert"` — definisi peran elemen.\n\n### ARIA Attributes\n`aria-label` label untuk screen reader, `aria-current="page"`, `aria-describedby` hint, `aria-live` untuk dynamic content.\n\n### Alt Text & Heading\nAlt text deskriptif. Heading h1→h2→h3 tanpa skip.',
    explanationEn: '### Skip Link\nHidden link that appears on keyboard focus — jumps to main content.\n\n### ARIA Roles\n`role="banner"`, `role="main"`, `role="navigation"`, `role="alert"` — define element roles.\n\n### ARIA Attributes\n`aria-label` screen reader label, `aria-current="page"`, `aria-describedby` hint, `aria-live` for dynamic content.\n\n### Alt Text & Headings\nDescriptive alt text. Headings h1→h2→h3 without skipping.',
    experimentsId: [
      'Tambah skip link untuk navigasi dan konten',
      'Buat form dengan aria-invalid untuk error',
      'Coba aria-expanded pada dropdown',
      'Tambah role="search" pada form pencarian',
      'Eksperimen aria-live dengan dynamic content',
    ],
    experimentsEn: [
      'Add skip links for navigation and content',
      'Create form with aria-invalid for errors',
      'Try aria-expanded on dropdown',
      'Add role="search" on search form',
      'Experiment aria-live with dynamic content',
    ],
    challengeId: 'Buat halaman login yang fully aksesibel: skip link, ARIA roles, label, error announcement, keyboard navigable.',
    challengeEn: 'Build a fully accessible login page: skip link, ARIA roles, labels, error announcement, keyboard navigable.',
    summaryId: 'Minggu 12 dari 14: **Aksesibilitas (a11y)** (Level: HTML5 Lengkap). Web untuk semua. Minggu depan: **SEO & Meta Tags**.',
    summaryEn: 'Week 12 of 14: **Accessibility (a11y)** (Level: Complete HTML5). Web for everyone. Next week: **SEO & Meta Tags**.',
  },
  // ── WEEK 13: SEO & Meta Tags ───────────────────────────────────────────────
  {
    week: 13, level: 'html', topicId: 'seo-meta-tags',
    titleId: 'SEO & Meta Tags', titleEn: 'SEO & Meta Tags',
    programId: 'Halaman SEO-Optimized', programEn: 'SEO-Optimized Page',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO Meta Tags -->
    <title>Belajar HTML5 Panduan Lengkap | Blog Kursus</title>
    <meta name="description" content="Panduan lengkap belajar HTML5 dari nol hingga mahir. 14 minggu interaktif dengan contoh kode.">
    <meta name="keywords" content="belajar HTML, HTML5, web development, tutorial">
    <meta name="author" content="Nama Penulis">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Social Media -->
    <meta property="og:title" content="Belajar HTML5 Panduan Lengkap">
    <meta property="og:description" content="Panduan lengkap belajar HTML5 dari nol hingga mahir.">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://example.com/belajar-html5">
    <meta property="og:image" content="https://example.com/images/html5-cover.jpg">
    <meta property="og:locale" content="id_ID">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Belajar HTML5 Panduan Lengkap">
    <meta name="twitter:description" content="Panduan lengkap belajar HTML5 dari nol hingga mahir.">
    <meta name="twitter:image" content="https://example.com/images/html5-cover.jpg">

    <!-- Canonical -->
    <link rel="canonical" href="https://example.com/belajar-html5">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Belajar HTML5 Panduan Lengkap",
        "author": { "@type": "Person", "name": "Nama Penulis" },
        "datePublished": "2026-08-06",
        "description": "Panduan lengkap belajar HTML5 dari nol hingga mahir."
    }
    </script>
</head>
<body>
    <header>
        <h1>Belajar HTML5 Panduan Lengkap</h1>
    </header>
    <main>
        <article>
            <h2>Apa itu HTML5?</h2>
            <p>HTML5 adalah versi terstandarisasi dari HTML...</p>
        </article>
    </main>
    <footer>
        <p>&copy; 2026 Blog Kursus</p>
    </footer>
</body>
</html>`,
    objectivesId: [
      'Meta tags SEO: title, description, keywords, robots',
      'Open Graph tags untuk social media sharing',
      'Twitter Card tags untuk Twitter preview',
      'Canonical URL untuk hindari duplicate content',
      'Structured data JSON-LD untuk rich snippets',
    ],
    objectivesEn: [
      'SEO meta tags: title, description, keywords, robots',
      'Open Graph tags for social media sharing',
      'Twitter Card tags for Twitter preview',
      'Canonical URL to avoid duplicate content',
      'JSON-LD structured data for rich snippets',
    ],
    explanationId: '### Meta SEO\n`<title>` 50-60 karakter. `<meta name="description">` 150-160 karakter. `robots` index/follow.\n\n### Open Graph\n`og:title`, `og:description`, `og:image`, `og:url` — kontrol tampilan saat di-share di Facebook/LinkedIn.\n\n### Twitter Card\n`twitter:card` summary atau summary_large_image.\n\n### Canonical\n`<link rel="canonical">` hindari duplicate content dari URL berbeda.\n\n### JSON-LD\nStructured data untuk rich snippets di Google.',
    explanationEn: '### SEO Meta\n`<title>` 50-60 chars. `<meta name="description">` 150-160 chars. `robots` index/follow.\n\n### Open Graph\n`og:title`, `og:description`, `og:image`, `og:url` — control display when shared on Facebook/LinkedIn.\n\n### Twitter Card\n`twitter:card` summary or summary_large_image.\n\n### Canonical\n`<link rel="canonical">` avoid duplicate content from different URLs.\n\n### JSON-LD\nStructured data for Google rich snippets.',
    experimentsId: [
      'Buat halaman dengan semua OG tags',
      'Tambah JSON-LD untuk FAQ schema',
      'Coba robots noindex pada halaman tertentu',
      'Buat multiple halaman dengan canonical berbeda',
      'Tambah hreflang untuk multi-bahasa',
    ],
    experimentsEn: [
      'Create page with all OG tags',
      'Add JSON-LD for FAQ schema',
      'Try robots noindex on certain page',
      'Create multiple pages with different canonical',
      'Add hreflang for multi-language',
    ],
    challengeId: 'Buat halaman artikel lengkap dengan semua SEO meta, OG tags, Twitter Card, dan JSON-LD.',
    challengeEn: 'Build a complete article page with all SEO meta, OG tags, Twitter Card, and JSON-LD.',
    summaryId: 'Minggu 13 dari 14: **SEO & Meta Tags** (Level: HTML5 Lengkap). Visibility di search engine. Minggu depan: **Proyek Akhir**!',
    summaryEn: 'Week 13 of 14: **SEO & Meta Tags** (Level: Complete HTML5). Search engine visibility. Next week: **Final Project**!',
  },
  // ── WEEK 14: Proyek Akhir ──────────────────────────────────────────────────
  {
    week: 14, level: 'html', topicId: 'proyek-akhir',
    titleId: 'Proyek Akhir: Website Portfolio', titleEn: 'Final Project: Portfolio Website',
    programId: 'Website Portfolio Lengkap', programEn: 'Complete Portfolio Website',
    levelNameId: 'HTML5 Lengkap', levelNameEn: 'Complete HTML5',
    language: 'html',
    code: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio John Doe | Web Developer</title>
    <meta name="description" content="Portfolio John Doe - Web Developer spesialis HTML5, CSS3, dan JavaScript.">
    <meta property="og:title" content="Portfolio John Doe">
    <meta property="og:description" content="Web Developer Portfolio">
    <meta property="og:type" content="website">
</head>
<body>
    <a href="#main" class="skip-link">Skip ke konten</a>

    <header>
        <h1>John Doe</h1>
        <p>Web Developer &amp; Designer</p>
        <nav aria-label="Navigasi utama">
            <ul>
                <li><a href="#tentang" aria-current="page">Tentang</a></li>
                <li><a href="#proyek">Proyek</a></li>
                <li><a href="#kemampuan">Kemampuan</a></li>
                <li><a href="#kontak">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <main id="main">
        <section id="tentang">
            <h2>Tentang Saya</h2>
            <figure>
                <img src="https://picsum.photos/200/200" alt="Foto John Doe" loading="lazy">
                <figcaption>John Doe, Web Developer</figcaption>
            </figure>
            <p>Saya adalah web developer dengan pengalaman 3 tahun...</p>
        </section>

        <section id="proyek">
            <h2>Proyek</h2>
            <article>
                <h3>E-Commerce App</h3>
                <p>Platform jual beli online dengan HTML5 semantic.</p>
                <a href="#">Lihat detail</a>
            </article>
            <article>
                <h3>Blog Platform</h3>
                <p>Platform blog dengan aksesibilitas tinggi.</p>
                <a href="#">Lihat detail</a>
            </article>
        </section>

        <section id="kemampuan">
            <h2>Kemampuan</h2>
            <ul>
                <li>HTML5 Semantic</li>
                <li>CSS3 &amp; Responsive</li>
                <li>JavaScript ES6+</li>
                <li>Accessibility (a11y)</li>
                <li>SEO Optimization</li>
            </ul>
        </section>

        <section id="kontak">
            <h2>Kontak</h2>
            <form action="#" method="POST">
                <fieldset>
                    <legend>Formulir Kontak</legend>
                    <p>
                        <label for="nama-kontak">Nama:</label><br>
                        <input type="text" id="nama-kontak" name="nama" required>
                    </p>
                    <p>
                        <label for="email-kontak">Email:</label><br>
                        <input type="email" id="email-kontak" name="email" required>
                    </p>
                    <p>
                        <label for="pesan">Pesan:</label><br>
                        <textarea id="pesan" name="pesan" rows="5" required></textarea>
                    </p>
                    <button type="submit">Kirim Pesan</button>
                </fieldset>
            </form>
            <p>Email: <a href="mailto:john@example.com">john@example.com</a></p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 John Doe. <a href="#top" aria-label="Kembali ke atas">Kembali ke atas</a></p>
        <address>Email: <a href="mailto:john@example.com">john@example.com</a></address>
    </footer>

    <style>
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 100;
    }
    .skip-link:focus { top: 0; }
    </style>
</body>
</html>`,
    objectivesId: [
      'Menggabungkan semua konsep: semantic, form, multimedia, a11y, SEO',
      'Struktur website multi-section yang profesional',
      'Navigasi lengkap dengan skip link dan ARIA',
      'Form kontak dengan validasi HTML5',
      'SEO meta tags dan Open Graph',
    ],
    objectivesEn: [
      'Combine all concepts: semantic, forms, multimedia, a11y, SEO',
      'Professional multi-section website structure',
      'Complete navigation with skip link and ARIA',
      'Contact form with HTML5 validation',
      'SEO meta tags and Open Graph',
    ],
    explanationId: '### Proyek Akhir\nGabungan semua 13 minggu sebelumnya dalam satu website portfolio.\n\n### Komponen\n- Header dengan nav\n- Section tentang, proyek, kemampuan, kontak\n- Form dengan validasi\n- Footer dengan address\n- Skip link, ARIA, semantic\n- SEO meta & OG tags',
    explanationEn: '### Final Project\nCombines all 13 previous weeks in one portfolio website.\n\n### Components\n- Header with nav\n- About, projects, skills, contact sections\n- Form with validation\n- Footer with address\n- Skip link, ARIA, semantic\n- SEO meta & OG tags',
    experimentsId: [
      'Tambah section testimoni dengan blockquote',
      'Buat halaman tambahan: blog atau project detail',
      'Tambah video introduction',
      'Buat multi-page website',
      'Tambah dark mode toggle',
    ],
    experimentsEn: [
      'Add testimonial section with blockquote',
      'Create additional page: blog or project detail',
      'Add video introduction',
      'Create multi-page website',
      'Add dark mode toggle',
    ],
    challengeId: 'Buat website portfolio lengkap: 4+ halaman, navigasi konsisten, form kontak, SEO optimized, fully aksesibel.',
    challengeEn: 'Build a complete portfolio website: 4+ pages, consistent navigation, contact form, SEO optimized, fully accessible.',
    summaryId: 'Minggu 14 dari 14: **Proyek Akhir: Website Portfolio** (Level: HTML5 Lengkap). Selesai! 🎉 Anda sudah menguasai HTML5 dari nol hingga mahir.',
    summaryEn: 'Week 14 of 14: **Final Project: Portfolio Website** (Level: Complete HTML5). Complete! 🎉 You\'ve mastered HTML5 from scratch to expert.',
  },
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
