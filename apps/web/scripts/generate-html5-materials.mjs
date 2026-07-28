import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/html5/html');

const MODULES = [
  { id: 1,  f: 'dasar-html',       lid: 'Dasar HTML & Web',          len: 'HTML & Web Basics',          cid: 'Halaman Pertamaku',     cen: 'My First Page' },
  { id: 2,  f: 'teks-heading',     lid: 'Teks & Heading',            len: 'Text & Headings',            cid: 'Artikel Blog',          cen: 'Blog Article' },
  { id: 3,  f: 'tautan',           lid: 'Tautan & Navigasi',         len: 'Links & Navigation',         cid: 'Navigasi Situs',        cen: 'Site Navigation' },
  { id: 4,  f: 'gambar',           lid: 'Gambar & Figure',           len: 'Images & Figures',           cid: 'Galeri Foto',           cen: 'Photo Gallery' },
  { id: 5,  f: 'list-table',       lid: 'List & Table',              len: 'Lists & Tables',             cid: 'Jadwal Kelas',          cen: 'Class Schedule' },
  { id: 6,  f: 'form-input',       lid: 'Form & Input',              len: 'Forms & Input',              cid: 'Form Pendaftaran',      cen: 'Registration Form' },
  { id: 7,  f: 'validasi-form',    lid: 'Validasi Form',             len: 'Form Validation',            cid: 'Validasi Cerdas',       cen: 'Smart Validation' },
  { id: 8,  f: 'semantik',         lid: 'HTML Semantik',             len: 'Semantic HTML',              cid: 'Layout Halaman',        cen: 'Page Layout' },
  { id: 9,  f: 'multimedia',       lid: 'Multimedia & Embed',        len: 'Multimedia & Embed',         cid: 'Pemutar Media',         cen: 'Media Player' },
  { id: 10, f: 'metadata-seo',     lid: 'Metadata & SEO',            len: 'Metadata & SEO',             cid: 'Optimasi SEO',          cen: 'SEO Optimization' },
  { id: 11, f: 'aksesibilitas',    lid: 'Aksesibilitas Web',         len: 'Web Accessibility',          cid: 'Halaman Inklusif',      cen: 'Inclusive Page' },
  { id: 12, f: 'html5-api',        lid: 'HTML5 APIs',                len: 'HTML5 APIs',                 cid: 'Aplikasi Browser API',  cen: 'Browser API App' },
  { id: 13, f: 'performa',         lid: 'Performa & Best Practices',  len: 'Performance & Best Practices', cid: 'Audit Halaman',       cen: 'Page Audit' },
  { id: 14, f: 'proyek-akhir',     lid: 'Proyek Akhir',              len: 'Final Project',              cid: 'Portofolio Pribadi',    cen: 'Personal Portfolio' },
];

const OBJ = {
  1: { id: ['Memahami cara kerja web: client, server, HTTP, DNS', 'Menguasai struktur dasar dokumen HTML5', 'Mengenal elemen, tag, dan atribut HTML', 'Membuat halaman HTML pertama dengan benar', 'Menggunakan komentar dan whitespace dalam HTML'], en: ['Understand how the web works: client, server, HTTP, DNS', 'Master the basic structure of an HTML5 document', 'Learn HTML elements, tags, and attributes', 'Create a proper first HTML page', 'Use comments and whitespace in HTML'] },
  2: { id: ['Menggunakan heading h1 sampai h6 dengan hierarki yang benar', 'Menulis paragraf dan teks dengan berbagai format', 'Menguasai elemen teks semantik: strong, em, mark, small', 'Menggunakan blockquote, pre, code, dan entities', 'Memahami pentingnya hierarki heading untuk SEO dan aksesibilitas'], en: ['Use h1 through h6 headings with proper hierarchy', 'Write paragraphs and text with various formatting', 'Master semantic text elements: strong, em, mark, small', 'Use blockquote, pre, code, and entities', 'Understand heading hierarchy importance for SEO and accessibility'] },
  3: { id: ['Membuat tautan dengan tag a dan href', 'Membedakan URL absolut, relatif, dan internal', 'Menggunakan target untuk membuka link di tab baru', 'Membuat navigasi menu dengan semantic HTML', 'Membuat email link dan bookmark dalam halaman'], en: ['Create links with a tag and href', 'Distinguish absolute, relative, and internal URLs', 'Use target to open links in new tabs', 'Create navigation menus with semantic HTML', 'Create email links and page bookmarks'] },
  4: { id: ['Menampilkan gambar dengan tag img dan atribut alt', 'Menggunakan figure dan figcaption untuk konteks', 'Memahami format gambar web: JPEG, PNG, WebP, SVG', 'Menerapkan responsive images dengan srcset dan sizes', 'Menggunakan picture element untuk art direction'], en: ['Display images with img tag and alt attribute', 'Use figure and figcaption for context', 'Understand web image formats: JPEG, PNG, WebP, SVG', 'Apply responsive images with srcset and sizes', 'Use picture element for art direction'] },
  5: { id: ['Membuat unordered list, ordered list, dan description list', 'Menstruktur data tabular dengan table, tr, th, td', 'Menggabungkan sel dengan colspan dan rowspan', 'Menambahkan caption, thead, tbody, tfoot pada tabel', 'Menerapkan aksesibilitas pada tabel dengan scope'], en: ['Create unordered lists, ordered lists, and description lists', 'Structure tabular data with table, tr, th, td', 'Merge cells with colspan and rowspan', 'Add caption, thead, tbody, tfoot to tables', 'Apply table accessibility with scope'] },
  6: { id: ['Membuat form dengan method GET dan POST', 'Menguasai berbagai tipe input: text, email, password, number', 'Menggunakan label untuk aksesibilitas form', 'Membuat dropdown dengan select dan option', 'Mengelompokkan form dengan fieldset dan legend'], en: ['Create forms with GET and POST methods', 'Master various input types: text, email, password, number', 'Use labels for form accessibility', 'Create dropdowns with select and option', 'Group forms with fieldset and legend'] },
  7: { id: ['Menerapkan validasi HTML5 built-in: required, minlength, pattern', 'Menggunakan atribut min, max, step untuk input number', 'Menampilkan pesan error kustom dengan Constraint Validation API', 'Memvalidasi email dan URL secara otomatis', 'Mencegah submit form yang tidak valid'], en: ['Apply HTML5 built-in validation: required, minlength, pattern', 'Use min, max, step attributes for number inputs', 'Show custom error messages with Constraint Validation API', 'Validate email and URLs automatically', 'Prevent invalid form submission'] },
  8: { id: ['Menggunakan elemen semantic: header, nav, main, footer', 'Membuat struktur halaman dengan section dan article', 'Menambahkan konten pendukung dengan aside', 'Menggunakan time, figure, details, summary', 'Memahami manfaat semantic HTML untuk SEO dan aksesibilitas'], en: ['Use semantic elements: header, nav, main, footer', 'Create page structure with section and article', 'Add supporting content with aside', 'Use time, figure, details, summary', 'Understand semantic HTML benefits for SEO and accessibility'] },
  9: { id: ['Menambahkan audio dan video dengan HTML5', 'Menggunakan multiple source formats untuk kompatibilitas', 'Mengatur kontrol, autoplay, dan loop pada media', 'Menyematkan konten eksternal dengan iframe', 'Menambahkan subtitle dengan track element'], en: ['Add audio and video with HTML5', 'Use multiple source formats for compatibility', 'Control playback with controls, autoplay, loop', 'Embed external content with iframe', 'Add subtitles with track element'] },
  10: { id: ['Menguasai meta tags untuk karakter set, viewport, deskripsi', 'Menerapkan Open Graph untuk social media sharing', 'Menggunakan Twitter Cards untuk engagement', 'Memahami canonical URL dan structured data JSON-LD', 'Mengoptimalkan title tag untuk SEO'], en: ['Master meta tags for charset, viewport, description', 'Apply Open Graph for social media sharing', 'Use Twitter Cards for engagement', 'Understand canonical URLs and structured data JSON-LD', 'Optimize title tags for SEO'] },
  11: { id: ['Memahami prinsip WCAG: Perceivable, Operable, Understandable, Robust', 'Menggunakan ARIA roles dan properties dengan benar', 'Memastikan navigasi keyboard yang logis', 'Menerapkan skip link dan focus management', 'Menulis alt text yang deskriptif untuk gambar'], en: ['Understand WCAG principles: Perceivable, Operable, Understandable, Robust', 'Use ARIA roles and properties correctly', 'Ensure logical keyboard navigation', 'Apply skip links and focus management', 'Write descriptive alt text for images'] },
  12: { id: ['Menggambar grafis dengan Canvas API', 'Mendapatkan lokasi pengguna dengan Geolocation API', 'Mengimplementasi Drag & Drop', 'Menyimpan data dengan Web Storage API', 'Memanipulasi riwayat browser dengan History API'], en: ['Draw graphics with Canvas API', 'Get user location with Geolocation API', 'Implement Drag & Drop', 'Store data with Web Storage API', 'Manipulate browser history with History API'] },
  13: { id: ['Menerapkan lazy loading pada gambar dan iframe', 'Menggunakan resource hints: preload, prefetch, preconnect', 'Mengoptimalkan gambar dengan format modern dan responsive', 'Memvalidasi HTML dengan W3C Validator', 'Mengaudit aksesibilitas dan performa halaman'], en: ['Apply lazy loading on images and iframes', 'Use resource hints: preload, prefetch, preconnect', 'Optimize images with modern formats and responsive attributes', 'Validate HTML with W3C Validator', 'Audit page accessibility and performance'] },
  14: { id: ['Menggabungkan semantic HTML dalam struktur multi-halaman', 'Menerapkan form, validasi, dan multimedia', 'Mengoptimalkan SEO dan aksesibilitas', 'Mengimplementasi responsive design melalui HTML', 'Membangun portofolio web yang siap di-deploy'], en: ['Combine semantic HTML in multi-page structures', 'Apply forms, validation, and multimedia', 'Optimize SEO and accessibility', 'Implement responsive design through HTML', 'Build a portfolio-ready website'] },
};

const CODE = {
  1: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertamaku</title>
</head>
<body>
  <h1>Halo, Dunia!</h1>
  <p>Ini adalah halaman HTML pertama saya.</p>
  <p>Saya sedang belajar HTML5 di Tryngo.</p>

  <h2>Apa Itu HTML?</h2>
  <p>HTML adalah bahasa markup untuk membuat struktur halaman web.</p>

  <h2>Elemen & Tag</h2>
  <p>Tag dimulai dengan <code>&lt;</code> dan diakhiri dengan <code>&gt;</code>.</p>
  <p>Contoh: <code>&lt;p&gt;Ini paragraf&lt;/p&gt;</code></p>

  <h3>Atribut</h3>
  <p>Atribut memberikan informasi tambahan pada elemen.</p>
  <p>Contoh: <code>&lt;html lang="id"&gt;</code></p>

  <!-- Ini adalah komentar -- tidak muncul di halaman -->
  <p>Komentar membantu developer memahami kode.</p>
</body>
</html>`,

  2: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artikel Blog</title>
</head>
<body>
  <h1>Belajar HTML5</h1>
  <h2>Apa Itu HTML?</h2>
  <p><strong>HTML</strong> adalah bahasa markup untuk struktur web.</p>
  <p>Elemen <em>teks miring</em> dan <mark>teks yang ditandai</mark>.</p>

  <h2>Kutipan</h2>
  <blockquote>
    <p>HTML adalah fondasi dari seluruh World Wide Web.</p>
    <cite>— Tim Berners-Lee</cite>
  </blockquote>

  <h2>Kode Program</h2>
  <pre><code>&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;p&gt;Ini paragraf.&lt;/p&gt;</code></pre>

  <h2>Daftar Istilah</h2>
  <dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
  </dl>

  <p>Teks dengan <small>small print</small>, <del>coret</del>, dan <ins>sisipan</ins>.</p>
  <p>Rumus: E = mc<sup>2</sup> dan H<sub>2</sub>O</p>
  <p>&copy; 2026 Tryngo &mdash; &ldquo;Belajar &amp; Berkreasi&rdquo;</p>
</body>
</html>`,

  3: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigasi Situs</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="about.html">Tentang</a></li>
        <li><a href="services.html">Layanan</a></li>
        <li><a href="contact.html">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Selamat Datang</h1>
    <p>Pelajari berbagai jenis tautan di bawah ini:</p>

    <h2>Tautan Eksternal</h2>
    <p><a href="https://www.w3schools.com" target="_blank">W3Schools (buka tab baru)</a></p>
    <p><a href="https://developer.mozilla.org" target="_blank">MDN (buka tab baru)</a></p>

    <h2>Tautan Internal</h2>
    <p><a href="#services">Langsung ke Layanan</a></p>

    <h2>Tautan Email & Telepon</h2>
    <p><a href="mailto:info@tryngo.com">Kirim Email</a></p>
    <p><a href="tel:+628123456789">Hubungi: +62 812-3456-789</a></p>

    <h2>Tautan Download</h2>
    <p><a href="file.pdf" download>Download PDF</a></p>

    <h2 id="services">Layanan Kami</h2>
    <p>Kursus pemrograman online. Klik <a href="#">kembali ke atas</a>.</p>

    <h2>Tautan dengan Gambar</h2>
    <p><a href="https://tryngo.com"><img src="https://placehold.co/200x60/E34F26/fff?text=Tryngo" alt="Logo Tryngo"></a></p>
  </main>
</body>
</html>`,

  4: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Galeri Foto</title>
</head>
<body>
  <h1>Galeri Wisata Alam</h1>

  <figure>
    <img src="https://placehold.co/600x400/2E5B44/fff?text=Gunung" alt="Pemandangan gunung dengan latar langit biru" width="600" height="400" loading="lazy">
    <figcaption>Pemandangan Gunung Bromo saat matahari terbit</figcaption>
  </figure>

  <figure>
    <img src="https://placehold.co/600x400/1572B6/fff?text=Pantai" alt="Pantai dengan pasir putih dan air jernih" width="600" height="400" loading="lazy">
    <figcaption>Pantai Kuta, Bali</figcaption>
  </figure>

  <figure>
    <img src="https://placehold.co/600x400/E34F26/fff?text=Hutan" alt="Hutan tropis yang lebat" width="600" height="400" loading="lazy">
    <figcaption>Hutan Hujan Tropis Kalimantan</figcaption>
  </figure>

  <figure>
    <picture>
      <source srcset="https://placehold.co/800x400/333/fff?text=Desktop" media="(min-width: 800px)">
      <source srcset="https://placehold.co/400x400/666/fff?text=Mobile" media="(max-width: 799px)">
      <img src="https://placehold.co/600x400/999/fff?text=Default" alt="Contoh responsive image dengan picture element" style="max-width:100%;height:auto">
    </picture>
    <figcaption>Gambar ini menyesuaikan ukuran layar (responsive image)</figcaption>
  </figure>

  <p>Format gambar yang didukung: JPEG, PNG, WebP, dan SVG.</p>
</body>
</html>`,

  5: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jadwal Kelas</title>
  <style>
    table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
    th, td { border: 1px solid #444; padding: 8px 12px; text-align: left; }
    th { background: #e8e8e8; font-weight: bold; }
    caption { font-weight: bold; margin-bottom: .5rem; }
  </style>
</head>
<body>
  <h1>Data Kelas Pemrograman</h1>

  <h2>Daftar Siswa</h2>
  <ol>
    <li>Budi Santoso</li>
    <li>Siti Rahmawati</li>
    <li>Alex Wijaya</li>
  </ol>

  <h2>Mata Kuliah (unordered)</h2>
  <ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>JavaScript</li>
  </ul>

  <h2>Istilah (description list)</h2>
  <dl>
    <dt>Frontend</dt>
    <dd>Bagian website yang dilihat pengguna</dd>
    <dt>Backend</dt>
    <dd>Bagian server yang memproses data</dd>
  </dl>

  <h2>Jadwal Pelajaran</h2>
  <table>
    <caption>Jadwal Kelas Frontend - Semester 1</caption>
    <thead>
      <tr>
        <th scope="col">Hari</th>
        <th scope="col">08:00-09:30</th>
        <th scope="col">10:00-11:30</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Senin</th>
        <td>HTML5</td>
        <td>CSS3</td>
      </tr>
      <tr>
        <th scope="row">Rabu</th>
        <td>JavaScript</td>
        <td>Praktik</td>
      </tr>
      <tr>
        <th scope="row">Jumat</th>
        <td colspan="2">Proyek Mandiri (gabungan)</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row">Total Jam</th>
        <td>6 jam/minggu</td>
        <td>6 jam/minggu</td>
      </tr>
    </tfoot>
  </table>
</body>
</html>`,

  6: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Pendaftaran</title>
</head>
<body>
  <h1>Pendaftaran Kursus</h1>
  <form onsubmit="event.preventDefault(); alert('Pendaftaran berhasil! (Demo)');">
    <fieldset>
      <legend>Data Pribadi</legend>
      <p><label for="nama">Nama Lengkap:</label> <input type="text" id="nama" name="nama" required></p>
      <p><label for="email">Email:</label> <input type="email" id="email" name="email" required></p>
      <p><label for="telp">Telepon:</label> <input type="tel" id="telp" name="telp" placeholder="0812-xxxx-xxxx"></p>
      <p><label for="tgl">Tanggal Lahir:</label> <input type="date" id="tgl" name="tgl"></p>
    </fieldset>

    <fieldset>
      <legend>Pilihan Kursus</legend>
      <p><label for="kursus">Pilih Kursus:</label>
        <select id="kursus" name="kursus">
          <optgroup label="Frontend">
            <option value="html">HTML5</option>
            <option value="css">CSS3</option>
            <option value="js">JavaScript</option>
          </optgroup>
          <optgroup label="Backend">
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </optgroup>
        </select>
      </p>
      <p>Level:
        <label><input type="radio" name="level" value="beginner" checked> Pemula</label>
        <label><input type="radio" name="level" value="intermediate"> Menengah</label>
        <label><input type="radio" name="level" value="advanced"> Lanjutan</label>
      </p>
      <p>Fitur Tambahan:
        <label><input type="checkbox" name="fitur" value="sertifikat"> Sertifikat</label>
        <label><input type="checkbox" name="fitur" value="mentor"> Mentor Pribadi</label>
      </p>
    </fieldset>

    <fieldset>
      <legend>Informasi Tambahan</legend>
      <p><label for="pesan">Catatan:</label><br>
        <textarea id="pesan" name="pesan" rows="4" cols="50" placeholder="Tulis pesan..."></textarea>
      </p>
      <p><label for="warna">Warna Favorit:</label> <input type="color" id="warna" name="warna" value="#E34F26"></p>
      <p><label for="file">Upload CV:</label> <input type="file" id="file" name="file" accept=".pdf,.docx"></p>
    </fieldset>

    <p>
      <button type="submit">Kirim Pendaftaran</button>
      <button type="reset">Reset</button>
    </p>
  </form>
</body>
</html>`,

  7: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Validasi Form</title>
</head>
<body>
  <h1>Form Validasi HTML5</h1>
  <form id="daftar">
    <fieldset>
      <legend>Validasi Otomatis</legend>
      <p>
        <label for="nama">Nama (min 3 karakter):</label>
        <input type="text" id="nama" name="nama" required minlength="3" maxlength="50" placeholder="Min. 3 huruf">
      </p>
      <p>
        <label for="email">Email (format valid):</label>
        <input type="email" id="email" name="email" required placeholder="contoh@email.com">
      </p>
      <p>
        <label for="website">Website (URL valid):</label>
        <input type="url" id="website" name="website" placeholder="https://contoh.com">
      </p>
      <p>
        <label for="umur">Umur (18-100 tahun):</label>
        <input type="number" id="umur" name="umur" min="18" max="100" required>
      </p>
      <p>
        <label for="telp">Telepon (10-13 digit):</label>
        <input type="tel" id="telp" name="telp" pattern="[0-9]{10,13}" required placeholder="081234567890">
        <small>Hanya angka, 10-13 digit</small>
      </p>
      <p>
        <label for="password">Password (min 8 karakter):</label>
        <input type="password" id="password" name="password" required minlength="8">
      </p>
      <p>
        <label for="tgl">Tanggal Acara:</label>
        <input type="date" id="tgl" name="tgl" required>
      </p>
      <p>
        <label for="kuantitas">Kuantitas (1-10):</label>
        <input type="range" id="kuantitas" name="kuantitas" min="1" max="10" value="1">
        <output id="qtyDisplay">1</output>
      </p>
      <p>
        <label for="warna">Pilih Warna:</label>
        <input type="color" id="warna" name="warna" value="#E34F26">
      </p>
    </fieldset>
    <p>
      <button type="submit">Kirim</button>
      <button type="reset">Reset</button>
    </p>
  </form>
  <p id="errorMsg" style="color:#c00"></p>

  <script>
    document.getElementById("kuantitas").addEventListener("input", function() {
      document.getElementById("qtyDisplay").textContent = this.value;
    });
    document.getElementById("daftar").addEventListener("submit", function(e) {
      if (!this.checkValidity()) {
        document.getElementById("errorMsg").textContent = "Mohon perbaiki input yang tidak valid.";
        e.preventDefault();
      } else {
        document.getElementById("errorMsg").textContent = "✓ Data valid!";
      }
    });
    document.getElementById("daftar").addEventListener("reset", function() {
      document.getElementById("errorMsg").textContent = "";
    });
  </script>
</body>
</html>`,

  8: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layout Semantik</title>
</head>
<body>
  <header>
    <h1>Tryngo Academy</h1>
    <nav>
      <ul>
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#kursus">Kursus</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#kontak">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h2>Belajar HTML5 Semantic</h2>
        <p><time datetime="2026-07-28">28 Juli 2026</time> oleh <strong>Tim Tryngo</strong></p>
      </header>

      <section id="tentang">
        <h3>Apa Itu Semantic HTML?</h3>
        <p>Semantic HTML menggunakan elemen yang memiliki makna, bukan sekadar <code>&lt;div&gt;</code>.</p>
        <aside>
          <h4>Tips</h4>
          <p>Gunakan <a href="https://validator.w3.org">W3C Validator</a> untuk cek semantic HTML.</p>
        </aside>
      </section>

      <section id="kursus">
        <h3>Daftar Kursus</h3>
        <ul>
          <li><del>HTML Dasar</del> <ins>Sekarang: HTML5 Complete</ins></li>
          <li>CSS3 Masterclass</li>
          <li>JavaScript Modern</li>
        </ul>
      </section>

      <figure>
        <img src="https://placehold.co/600x200/E34F26/fff?text=HTML5+Semantic" alt="Ilustrasi HTML5 semantic" style="max-width:100%">
        <figcaption>Struktur halaman dengan elemen semantic HTML5</figcaption>
      </figure>

      <details>
        <summary>Klik untuk melihat detail</summary>
        <p>Elemen <code>&lt;details&gt;</code> dan <code>&lt;summary&gt;</code> membuat accordion tanpa JavaScript!</p>
      </details>
    </article>
  </main>

  <aside>
    <h3>Artikel Terkait</h3>
    <ul>
      <li><a href="#">Panduan CSS Grid</a></li>
      <li><a href="#">Dasar JavaScript</a></li>
    </ul>
  </aside>

  <footer>
    <p>&copy; 2026 Tryngo Academy. All rights reserved.</p>
    <address>
      Email: <a href="mailto:info@tryngo.com">info@tryngo.com</a>
    </address>
  </footer>
</body>
</html>`,

  9: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Multimedia Player</title>
</head>
<body>
  <h1>Pemutar Media HTML5</h1>

  <h2>Audio Player</h2>
  <p>Suara alam untuk relaksasi:</p>
  <audio controls>
    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
    Browser Anda tidak mendukung elemen audio.
  </audio>

  <h2>Video Player</h2>
  <p>Video contoh dengan kontrol:</p>
  <video controls width="560" poster="https://placehold.co/560x315/E34F26/fff?text=Video+Player">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
    <track kind="subtitles" src="subtitles_id.vtt" srclang="id" label="Indonesia">
    Browser Anda tidak mendukung elemen video.
  </video>

  <h2>YouTube Embed (iframe)</h2>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/jNQXAC9IVRw" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  <h2>Google Maps Embed</h2>
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.39822095582!2d115.14099985!3d-8.64701695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd240878731fed1%3A0x4030bfbca7d3a20!2sBali!5e0!3m2!1sid!2sid!4v1" width="560" height="315" style="border:0;" allowfullscreen loading="lazy"></iframe>

  <p><small>Catatan: Beberapa konten mungkin diblokir oleh CORS di lingkungan lokal. Gunakan Live Server untuk hasil maksimal.</small></p>
</body>
</html>`,

  10: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>Tryngo - Belajar Coding Online | Kursus Pemrograman</title>
  <meta name="description" content="Tryngo adalah platform belajar coding online dari nol hingga mahir. Kursus HTML, CSS, JavaScript, Go, dan Rust.">
  <meta name="keywords" content="belajar coding, kursus online, pemrograman, html, css, javascript">
  <meta name="author" content="Tryngo Academy">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://tryngo.com">

  <!-- Open Graph -->
  <meta property="og:title" content="Tryngo - Belajar Coding Online">
  <meta property="og:description" content="Platform belajar coding online dari nol hingga mahir.">
  <meta property="og:image" content="https://placehold.co/1200x630/E34F26/fff?text=Tryngo">
  <meta property="og:url" content="https://tryngo.com">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="id_ID">

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Tryngo - Belajar Coding Online">
  <meta name="twitter:description" content="Platform belajar coding online dari nol hingga mahir.">
  <meta name="twitter:image" content="https://placehold.co/1200x630/E34F26/fff?text=Tryngo">

  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23E34F26'/><text x='16' y='23' font-size='20' text-anchor='middle' fill='white'>T</text></svg>">

  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Tryngo Academy",
    "url": "https://tryngo.com",
    "description": "Platform belajar coding online.",
    "foundingDate": "2026"
  }
  </script>
</head>
<body>
  <h1>Tryngo Academy</h1>
  <p>Platform belajar coding online #1 di Indonesia.</p>

  <h2>Mengapa Meta Tag Penting?</h2>
  <ul>
    <li><strong>SEO:</strong> Membantu mesin pencari memahami halaman Anda</li>
    <li><strong>Social Media:</strong> Mengontrol tampilan saat dibagikan di Facebook, Twitter, LinkedIn</li>
    <li><strong>Aksesibilitas:</strong> Viewport dan charset untuk pengalaman yang lebih baik</li>
    <li><strong>Structured Data:</strong> Rich snippets di hasil pencarian Google</li>
  </ul>

  <p>Lihat source code halaman ini untuk melihat contoh meta tag lengkap!</p>
</body>
</html>`,

  11: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Inklusif - Aksesibilitas Web</title>
</head>
<body>
  <a href="#main" class="skip-link">Langsung ke konten utama</a>

  <header role="banner">
    <h1>Web Untuk Semua</h1>
    <nav role="navigation" aria-label="Navigasi utama">
      <ul>
        <li><a href="#about" aria-current="page">Tentang</a></li>
        <li><a href="#form">Form</a></li>
        <li><a href="#table">Data</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" role="main">
    <section id="about" aria-labelledby="about-heading">
      <h2 id="about-heading">Aksesibilitas Web (A11y)</h2>
      <p>Aksesibilitas memastikan website dapat digunakan oleh <strong>semua orang</strong>, termasuk penyandang disabilitas.</p>

      <article aria-labelledby="wcag-heading">
        <h3 id="wcag-heading">4 Prinsip WCAG</h3>
        <ul>
          <li><strong>Perceivable</strong> — Informasi harus dapat diterima oleh setidaknya satu indra</li>
          <li><strong>Operable</strong> — Komponen UI harus dapat dioperasikan</li>
          <li><strong>Understandable</strong> — Informasi dan UI harus dapat dipahami</li>
          <li><strong>Robust</strong> — Konten harus kompatibel dengan berbagai alat bantu</li>
        </ul>
      </article>

      <article aria-labelledby="aria-heading">
        <h3 id="aria-heading">ARIA Roles & Properties</h3>
        <p>ARIA melengkapi semantic HTML untuk alat bantu seperti <em>screen reader</em>.</p>
        <div role="alert" aria-live="polite">
          <p>💡 Tip: Gunakan elemen semantic HTML dulu sebelum menambahkan ARIA.</p>
        </div>
      </article>
    </section>

    <section id="form" aria-labelledby="form-heading">
      <h2 id="form-heading">Form Aksesibel</h2>
      <form>
        <p>
          <label for="nama">Nama Lengkap <span aria-label="wajib">*</span>:</label>
          <input type="text" id="nama" name="nama" required aria-required="true" autocomplete="name">
        </p>
        <p>
          <label for="pesan">Pesan:</label>
          <textarea id="pesan" name="pesan" aria-describedby="pesan-hint"></textarea>
          <small id="pesan-hint">Tulis pesan Anda di sini.</small>
        </p>
        <p>
          <label for="negara">Negara:</label>
          <input type="text" id="negara" name="negara" list="negara-list" autocomplete="country-name">
          <datalist id="negara-list">
            <option value="Indonesia">
            <option value="Malaysia">
            <option value="Singapura">
          </datalist>
        </p>
        <button type="submit" aria-label="Kirim form">Kirim</button>
      </form>
    </section>

    <section id="table" aria-labelledby="table-heading">
      <h2 id="table-heading">Data dengan Aksesibilitas</h2>
      <table>
        <caption>Nilai Siswa - Semester 1</caption>
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">HTML</th>
            <th scope="col">CSS</th>
            <th scope="col">JS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Budi</th>
            <td>85</td>
            <td>90</td>
            <td>78</td>
          </tr>
          <tr>
            <th scope="row">Siti</th>
            <td>92</td>
            <td>88</td>
            <td>95</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer role="contentinfo">
    <p>&copy; 2026 Tryngo — Web untuk Semua</p>
  </footer>
</body>
</html>`,

  12: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 APIs Demo</title>
</head>
<body>
  <h1>HTML5 Browser APIs</h1>

  <section>
    <h2>🎨 Canvas</h2>
    <canvas id="myCanvas" width="400" height="150"></canvas>
    <p><button onclick="gambarCanvas()">Gambar Ulang</button></p>
  </section>

  <section>
    <h2>📍 Geolocation</h2>
    <p><button onclick="dapatkanLokasi()">Dapatkan Lokasi Saya</button></p>
    <pre id="lokasi" style="background:#eee;padding:.5rem"></pre>
  </section>

  <section>
    <h2>💾 Web Storage</h2>
    <p>
      <label for="catatan">Catatan (tersimpan otomatis):</label><br>
      <textarea id="catatan" rows="4" cols="50" placeholder="Tulis catatan..."></textarea>
    </p>
    <p><button onclick="simpanCatatan()">Simpan</button> <button onclick="hapusCatatan()">Hapus</button></p>
    <p id="storageStatus"></p>
  </section>

  <section>
    <h2>🎯 Drag & Drop</h2>
    <div id="dragSource" style="display:flex;gap:8px;margin:.5rem 0;min-height:50px">
      <div draggable="true" style="background:#E34F26;color:#fff;padding:.5rem 1rem;border-radius:6px;cursor:grab">Item 1</div>
      <div draggable="true" style="background:#1572B6;color:#fff;padding:.5rem 1rem;border-radius:6px;cursor:grab">Item 2</div>
      <div draggable="true" style="background:#2E5B44;color:#fff;padding:.5rem 1rem;border-radius:6px;cursor:grab">Item 3</div>
    </div>
    <div id="dropZone" style="border:2px dashed #ccc;padding:1rem;border-radius:8px;min-height:60px;text-align:center">
      Drop item di sini
    </div>
  </section>

  <script>
    function gambarCanvas() {
      const c = document.getElementById("myCanvas").getContext("2d");
      c.clearRect(0, 0, 400, 150);
      c.fillStyle = "#E34F26"; c.fillRect(20, 30, 100, 80);
      c.fillStyle = "#1572B6"; c.beginPath(); c.arc(200, 70, 40, 0, Math.PI*2); c.fill();
      c.fillStyle = "#2E5B44"; c.beginPath(); c.moveTo(340,110); c.lineTo(380,30); c.lineTo(300,30); c.closePath(); c.fill();
      c.fillStyle = "#fff"; c.font = "bold 14px system-ui"; c.textAlign = "center";
      c.fillText("Canvas API", 200, 140);
    }
    gambarCanvas();

    function dapatkanLokasi() {
      if (!navigator.geolocation) return alert("Geolocation tidak didukung");
      navigator.geolocation.getCurrentPosition(
        p => document.getElementById("lokasi").textContent = "Lat: " + p.coords.latitude + "\\nLng: " + p.coords.longitude,
        e => document.getElementById("lokasi").textContent = "Error: " + e.message
      );
    }

    function simpanCatatan() {
      localStorage.setItem("html5Note", document.getElementById("catatan").value);
      document.getElementById("storageStatus").textContent = "✓ Tersimpan!";
    }
    function hapusCatatan() {
      localStorage.removeItem("html5Note");
      document.getElementById("catatan").value = "";
      document.getElementById("storageStatus").textContent = "🗑️ Dihapus";
    }
    document.getElementById("catatan").value = localStorage.getItem("html5Note") || "";

    // Drag & Drop
    document.querySelectorAll("[draggable=true]").forEach(el => {
      el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", e.target.textContent);
        e.dataTransfer.effectAllowed = "move";
      });
    });
    document.getElementById("dropZone").addEventListener("dragover", e => e.preventDefault());
    document.getElementById("dropZone").addEventListener("drop", e => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain");
      const item = document.createElement("div");
      item.textContent = "✓ " + data;
      item.style.cssText = "background:#2E5B44;color:#fff;padding:.3rem .8rem;border-radius:6px;margin:4px;display:inline-block";
      e.target.appendChild(item);
    });
  </script>
</body>
</html>`,

  13: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Audit Performa HTML</title>
  <link rel="preconnect" href="https://placehold.co">
  <link rel="dns-prefetch" href="//placehold.co">
</head>
<body>
  <h1>Performa & Best Practices HTML</h1>

  <section>
    <h2>1. Resource Hints</h2>
    <p>Gunakan <code>&lt;link rel="preconnect"&gt;</code> untuk mempercepat koneksi ke server eksternal.</p>
    <p>Lihat di <code>&lt;head&gt;</code> halaman ini untuk contoh preconnect dan dns-prefetch.</p>
  </section>

  <section>
    <h2>2. Lazy Loading</h2>
    <p>Gambar di bawah ini menggunakan <code>loading="lazy"</code>:</p>
    <img src="https://placehold.co/300x200/2E5B44/fff?text=Gambar+Lazy" alt="Contoh lazy loading" loading="lazy" width="300" height="200">
    <img src="https://placehold.co/300x200/1572B6/fff?text=Lazy+2" alt="Contoh lazy loading kedua" loading="lazy" width="300" height="200">
  </section>

  <section>
    <h2>3. Responsive Images</h2>
    <img src="https://placehold.co/800x200/E34F26/fff?text=Responsive" alt="Contoh responsive image"
         srcset="https://placehold.co/400x200/E34F26/fff?text=400w 400w,
                 https://placehold.co/800x200/E34F26/fff?text=800w 800w"
         sizes="(max-width: 600px) 400px, 800px"
         style="max-width:100%;height:auto">

    <h2>4. Dekoding Async</h2>
    <img src="https://placehold.co/300x200/666/fff?text=Async+Decode" alt="Async decoding" decoding="async" width="300" height="200">

    <h2>5. Elemen Semantic</h2>
    <p>Gunakan <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code> untuk struktur yang jelas.</p>

    <h2>6. Validasi W3C</h2>
    <p>Selalu validasi HTML Anda di <a href="https://validator.w3.org" target="_blank">W3C Validator</a>.</p>

    <h2>7. Aksesibilitas</h2>
    <p>Tambahkan <code>alt</code> pada semua gambar, gunakan <code>label</code> untuk form.</p>

    <h2>8. Minimalisir HTTP Request</h2>
    <p>Gabungkan file CSS/JS, gunakan sprite untuk ikon kecil, dan manfaatkan cache browser.</p>
  </section>

  <footer>
    <p><small>&copy; 2026 Tryngo — Best Practices HTML5</small></p>
  </footer>
</body>
</html>`,

  14: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio — Nama Anda</title>
  <meta name="description" content="Portofolio pribadi — Web Developer & Designer">
  <meta property="og:title" content="Portofolio | Nama Anda">
  <meta property="og:description" content="Portofolio pribadi website developer.">
  <meta property="og:image" content="https://placehold.co/1200x630/E34F26/fff?text=Portofolio">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%23E34F26'/><text x='16' y='23' font-size='20' text-anchor='middle' fill='white'>P</text></svg>">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Person","name":"Nama Anda","jobTitle":"Web Developer","url":"https://tryngo.com"}
  </script>
</head>
<body>
  <header role="banner">
    <nav aria-label="Navigasi utama">
      <ul>
        <li><a href="#home" aria-current="page">Home</a></li>
        <li><a href="#about">Tentang</a></li>
        <li><a href="#skills">Skill</a></li>
        <li><a href="#projects">Proyek</a></li>
        <li><a href="#contact">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="home" aria-labelledby="home-title">
      <h1 id="home-title">Halo, Saya <strong>Nama Anda</strong></h1>
      <p>Web Developer & Designer</p>
      <figure>
        <img src="https://placehold.co/200x200/333/fff?text=Foto" alt="Foto profil Nama Anda" width="200" height="200" loading="eager">
        <figcaption>Foto profil</figcaption>
      </figure>
    </section>

    <section id="about" aria-labelledby="about-title">
      <h2 id="about-title">Tentang Saya</h2>
      <p>Saya seorang <strong>web developer</strong> yang bersemangat dalam menciptakan <em>pengalaman digital</em> yang inklusif dan mudah diakses.</p>
      <blockquote>
        <p>"Kode adalah puisi yang bisa dijalankan."</p>
      </blockquote>
    </section>

    <section id="skills" aria-labelledby="skills-title">
      <h2 id="skills-title">Keahlian</h2>
      <table>
        <caption>Daftar keahlian teknis</caption>
        <thead>
          <tr>
            <th scope="col">Kategori</th>
            <th scope="col">Teknologi</th>
            <th scope="col">Level</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Frontend</th><td>HTML5, CSS3, JavaScript</td><td>Mahir</td></tr>
          <tr><th scope="row">Backend</th><td>Go, Node.js</td><td>Menengah</td></tr>
          <tr><th scope="row">Tools</th><td>Git, VS Code, Figma</td><td>Mahir</td></tr>
        </tbody>
      </table>

      <h3>Kemampuan Teknis Detail</h3>
      <ul>
        <li><abbr title="HyperText Markup Language">HTML</abbr> — Semantic, Aksesibilitas, SEO</li>
        <li><abbr title="Cascading Style Sheets">CSS</abbr> — Flexbox, Grid, Animasi</li>
        <li>JavaScript — ES6+, DOM, Async</li>
      </ul>
    </section>

    <section id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">Proyek</h2>
      <article>
        <h3>Aplikasi Todo</h3>
        <figure>
          <img src="https://placehold.co/400x250/2E5B44/fff?text=Todo+App" alt="Screenshot aplikasi Todo" loading="lazy" width="400" height="250">
          <figcaption>Aplikasi manajemen tugas berbasis web</figcaption>
        </figure>
        <p>Dibangun dengan HTML5, CSS3, dan JavaScript. Menggunakan <strong>localStorage</strong> untuk persistensi data.</p>
        <ul>
          <li><a href="https://github.com" target="_blank">Lihat Source Code</a></li>
          <li><a href="#" target="_blank">Lihat Demo</a></li>
        </ul>
      </article>
      <article>
        <h3>Website Portofolio</h3>
        <figure>
          <img src="https://placehold.co/400x250/E34F26/fff?text=Portfolio" alt="Screenshot website portofolio" loading="lazy" width="400" height="250">
          <figcaption>Website portofolio pribadi responsif</figcaption>
        </figure>
        <p>Website ini sendiri! Semantic HTML, aksesibel, dan SEO-friendly.</p>
      </article>
    </section>

    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Hubungi Saya</h2>
      <form action="#" method="post">
        <p>
          <label for="contact-name">Nama <span aria-label="wajib">*</span>:</label>
          <input type="text" id="contact-name" name="name" required minlength="3" autocomplete="name">
        </p>
        <p>
          <label for="contact-email">Email <span aria-label="wajib">*</span>:</label>
          <input type="email" id="contact-email" name="email" required autocomplete="email">
        </p>
        <p>
          <label for="contact-subject">Subjek:</label>
          <select id="contact-subject" name="subject">
            <optgroup label="Proyek">
              <option value="web">Pengembangan Web</option>
              <option value="design">Desain</option>
            </optgroup>
            <option value="lain">Lainnya</option>
          </select>
        </p>
        <p>
          <label for="contact-message">Pesan <span aria-label="wajib">*</span>:</label><br>
          <textarea id="contact-message" name="message" rows="5" cols="50" required minlength="10" placeholder="Tulis pesan..."></textarea>
        </p>
        <button type="submit">Kirim Pesan</button>
      </form>
    </section>
  </main>

  <aside>
    <h3>Media Sosial</h3>
    <ul>
      <li><a href="https://github.com" target="_blank" rel="noopener">GitHub</a></li>
      <li><a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="mailto:email@example.com">Email</a></li>
    </ul>
  </aside>

  <footer role="contentinfo">
    <p>&copy; 2026 Nama Anda. Dibangun dengan <strong>HTML5</strong>.</p>
    <p><a href="#home">Kembali ke atas</a></p>
  </footer>
</body>
</html>`,
};

const EXP = {
  1: { id: '### Cara Kerja Web\nBrowser mengirim HTTP request ke server, server merespon dengan file HTML. DNS menerjemahkan domain ke IP address. HTML adalah bahasa markup — bukan bahasa pemrograman. Ia mendeskripsikan struktur konten.\n\n### Struktur Dokumen\n`<!DOCTYPE html>` — deklarasi tipe dokumen (HTML5). `<html>` — elemen root. `<head>` — metadata (charset, viewport, title). `<body>` — konten yang terlihat.\n\n### Elemen, Tag, Atribut\nElemen = tag pembuka + konten + tag penutup. Atribut memberikan informasi tambahan. Contoh: `<html lang="id">` — `lang` adalah atribut.', en: '### How the Web Works\nBrowser sends HTTP requests to a server, the server responds with HTML files. DNS translates domain names to IP addresses. HTML is a markup language — not a programming language. It describes content structure.\n\n### Document Structure\n`<!DOCTYPE html>` — document type declaration (HTML5). `<html>` — root element. `<head>` — metadata (charset, viewport, title). `<body>` — visible content.\n\n### Elements, Tags, Attributes\nElement = opening tag + content + closing tag. Attributes provide additional information. Example: `<html lang="id">` — `lang` is an attribute.' },
  2: { id: '### Heading\n`<h1>` sampai `<h6>` — hierarki judul. Gunakan satu `<h1>` per halaman untuk SEO. Jangan skip level heading.\n\n### Format Teks\n`<strong>` — penting (bold). `<em>` — penekanan (italic). `<mark>` — teks yang ditandai. `<small>` — teks kecil. `<del>` — teks dihapus. `<ins>` — teks disisipkan.\n\n### Kutipan & Kode\n`<blockquote>` — kutipan panjang. `<cite>` — sumber kutipan. `<pre>` — teks preformatted. `<code>` — kode program inline.\n\n### Entities\n`&amp;` untuk `&`. `&lt;` untuk `<`. `&gt;` untuk `>`. `&copy;` untuk ©. `&mdash;` untuk —.', en: '### Headings\n`<h1>` to `<h6>` — heading hierarchy. Use one `<h1>` per page for SEO. Do not skip heading levels.\n\n### Text Formatting\n`<strong>` — important (bold). `<em>` — emphasis (italic). `<mark>` — marked text. `<small>` — small text. `<del>` — deleted text. `<ins>` — inserted text.\n\n### Quotes & Code\n`<blockquote>` — long quotation. `<cite>` — quote source. `<pre>` — preformatted text. `<code>` — inline program code.\n\n### Entities\n`&amp;` for `&`. `&lt;` for `<`. `&gt;` for `>`. `&copy;` for ©. `&mdash;` for —.' },
  3: { id: '### Tag Anchor\n`<a href="url">teks</a>` — elemen tautan. `href` adalah atribut tujuan.\n\n### URL Types\n**Absolute** — URL lengkap: `https://example.com/page`. **Relative** — path relatif: `/about` atau `../page.html`. **Internal** — bookmark: `#section`.\n\n### Target\n`_self` — buka di tab yang sama (default). `_blank` — buka di tab baru. Selalu tambahkan `rel="noopener"` untuk keamanan jika pakai `_blank`.\n\n### Navigasi\nGunakan `<nav>` untuk menu navigasi. Kombinasikan dengan `<ul>` dan `<li>` untuk struktur yang semantic.', en: '### Anchor Tag\n`<a href="url">text</a>` — link element. `href` is the destination attribute.\n\n### URL Types\n**Absolute** — full URL: `https://example.com/page`. **Relative** — relative path: `/about` or `../page.html`. **Internal** — bookmark: `#section`.\n\n### Target\n`_self` — open in same tab (default). `_blank` — open in new tab. Always add `rel="noopener"` for security with `_blank`.\n\n### Navigation\nUse `<nav>` for navigation menus. Combine with `<ul>` and `<li>` for semantic structure.' },
  4: { id: '### Tag Img\n`<img src="url" alt="deskripsi">` — void element (tanpa tag penutup). `alt` penting untuk aksesibilitas dan SEO.\n\n### Figure & Figcaption\n`<figure>` mengelompokkan konten media. `<figcaption>` memberikan keterangan. Lebih semantic daripada div biasa.\n\n### Format Gambar\n**JPEG** — foto, gradasi warna. **PNG** — transparansi, diagram. **WebP** — kompresi lebih baik dari JPEG/PNG. **SVG** — vektor, responsif.\n\n### Responsive Images\n`srcset` — daftar gambar dengan lebar berbeda. `sizes` — aturan ukuran berdasarkan viewport. `<picture>` — art direction (gambar berbeda untuk layar berbeda).', en: '### Img Tag\n`<img src="url" alt="description">` — void element (no closing tag). `alt` is crucial for accessibility and SEO.\n\n### Figure & Figcaption\n`<figure>` groups media content. `<figcaption>` provides captions. More semantic than plain div.\n\n### Image Formats\n**JPEG** — photos, color gradients. **PNG** — transparency, diagrams. **WebP** — better compression than JPEG/PNG. **SVG** — vectors, responsive.\n\n### Responsive Images\n`srcset` — list of images with different widths. `sizes` — size rules based on viewport. `<picture>` — art direction (different images for different screens).' },
  5: { id: '### Unordered List\n`<ul>` — bullet list. `<li>` — list item. Cocok untuk navigasi, daftar fitur.\n\n### Ordered List\n`<ol>` — numbered list. Atribut: `type` (1, A, a, I, i), `start`, `reversed`.\n\n### Description List\n`<dl>` — daftar istilah. `<dt>` — istilah. `<dd>` — deskripsi. Cocok untuk glosarium, metadata.\n\n### Table\n`<table>` — wadah. `<tr>` — baris. `<th>` — header. `<td>` — data. `<colspan>` — gabung kolom. `<rowspan>` — gabung baris. `<caption>` — judul tabel. `<thead>`, `<tbody>`, `<tfoot>` — grouping.\n\n### Aksesibilitas Tabel\n`scope="col"` — header kolom. `scope="row"` — header baris. Penting untuk screen reader.', en: '### Unordered List\n`<ul>` — bullet list. `<li>` — list item. Good for navigation, feature lists.\n\n### Ordered List\n`<ol>` — numbered list. Attributes: `type` (1, A, a, I, i), `start`, `reversed`.\n\n### Description List\n`<dl>` — definition list. `<dt>` — term. `<dd>` — description. Good for glossaries, metadata.\n\n### Table\n`<table>` — container. `<tr>` — row. `<th>` — header. `<td>` — data. `<colspan>` — merge columns. `<rowspan>` — merge rows. `<caption>` — table title. `<thead>`, `<tbody>`, `<tfoot>` — grouping.\n\n### Table Accessibility\n`scope="col"` — column header. `scope="row"` — row header. Important for screen readers.' },
  6: { id: '### Elemen Form\n`<form>` — wadah input. Atribut: `action` (URL tujuan), `method` (GET/POST). GET untuk pencarian, POST untuk data sensitif.\n\n### Input Types\n`text` — teks biasa. `email` — validasi email. `password` — karakter tersembunyi. `number` — angka. `tel` — telepon. `date` — tanggal. `color` — pemilih warna. `file` — upload file. `range` — slider. `radio` — pilihan satu. `checkbox` — pilihan banyak.\n\n### Label\nSelalu gunakan `<label>` untuk aksesibilitas. Hubungkan dengan `for` attribute yang cocok dengan `id` input.\n\n### Select & Textarea\n`<select>` — dropdown. `<optgroup>` — kelompok opsi. `<textarea>` — teks multi-baris.', en: '### Form Element\n`<form>` — input container. Attributes: `action` (target URL), `method` (GET/POST). GET for search, POST for sensitive data.\n\n### Input Types\n`text` — plain text. `email` — email validation. `password` — hidden characters. `number` — numbers. `tel` — phone. `date` — date picker. `color` — color picker. `file` — file upload. `range` — slider. `radio` — single choice. `checkbox` — multiple choice.\n\n### Label\nAlways use `<label>` for accessibility. Connect with `for` attribute matching input `id`.\n\n### Select & Textarea\n`<select>` — dropdown. `<optgroup>` — option groups. `<textarea>` — multi-line text.' },
  7: { id: '### Validasi Built-in\n`required` — field wajib. `minlength` / `maxlength` — panjang teks. `min` / `max` — batas angka. `pattern` — regex. `type` — validasi otomatis (email, url, number).\n\n### Constraint Validation API\n`checkValidity()` — cek semua field. `validationMessage` — pesan error. `setCustomValidity()` — pesan error kustom.\n\n### Pseudoclass CSS\n`:valid` — field valid. `:invalid` — field tidak valid. `:required` — field wajib. Gunakan untuk styling.\n\n### Pesan Error\nBrowser menampilkan pesan otomatis. Gunakan `title` pada `pattern` untuk petunjuk. Kustomisasi dengan JavaScript.', en: '### Built-in Validation\n`required` — mandatory field. `minlength` / `maxlength` — text length. `min` / `max` — number limits. `pattern` — regex. `type` — automatic validation (email, url, number).\n\n### Constraint Validation API\n`checkValidity()` — check all fields. `validationMessage` — error message. `setCustomValidity()` — custom error message.\n\n### CSS Pseudoclasses\n`:valid` — valid field. `:invalid` — invalid field. `:required` — required field. Use for styling.\n\n### Error Messages\nBrowser shows automatic messages. Use `title` on `pattern` for hints. Customize with JavaScript.' },
  8: { id: '### Mengapa Semantic?\nElemen semantic memberi makna pada konten. Membantu SEO (mesin pencari memahami struktur), aksesibilitas (screen reader navigasi lebih baik), dan maintainability (kode lebih mudah dibaca).\n\n### Structural Elements\n`<header>` — kepala halaman/section. `<nav>` — navigasi. `<main>` — konten utama (hanya satu per halaman). `<footer>` — kaki halaman. `<section>` — kelompok tematik. `<article>` — konten independen. `<aside>` — konten pendukung.\n\n### Inline Semantics\n`<time>` — waktu. `<figure>` — media dengan caption. `<details>` / `<summary>` — accordion. `<mark>` — teks yang disorot.\n\n### Non-semantic\n`<div>` — divisi (tanpa makna). `<span>` — inline container. Gunakan semantic element DULU sebelum div/span.', en: '### Why Semantic?\nSemantic elements give meaning to content. They help SEO (search engines understand structure), accessibility (screen readers navigate better), and maintainability (code is easier to read).\n\n### Structural Elements\n`<header>` — page/section head. `<nav>` — navigation. `<main>` — main content (only one per page). `<footer>` — page footer. `<section>` — thematic group. `<article>` — independent content. `<aside>` — supporting content.\n\n### Inline Semantics\n`<time>` — time. `<figure>` — media with caption. `<details>` / `<summary>` — accordion. `<mark>` — highlighted text.\n\n### Non-semantic\n`<div>` — division (no meaning). `<span>` — inline container. Use semantic elements FIRST before div/span.' },
  9: { id: '### Elemen Audio\n`<audio controls>` — pemutar audio. Atribut: `controls` — tampilkan kontrol. `autoplay` — putar otomatis. `loop` — ulang. Sediakan multiple `<source>` untuk format berbeda.\n\n### Elemen Video\n`<video controls>` — pemutar video. Atribut: `width`, `height`, `poster` — thumbnail. `muted` — bisu (diperlukan untuk autoplay).\n\n### Track\n`<track kind="subtitles">` — subtitle. `kind` bisa: subtitles, captions, descriptions, chapters, metadata.\n\n### Iframe\nMenyematkan halaman eksternal. Atribut: `src` — URL, `allowfullscreen`, `loading="lazy"`. Gunakan `sandbox` untuk keamanan.\n\n### Format\n**Audio**: MP3, OGG, WAV, AAC. **Video**: MP4 (H.264), WebM, OGV.', en: '### Audio Element\n`<audio controls>` — audio player. Attributes: `controls` — show controls. `autoplay` — auto-play. `loop` — repeat. Provide multiple `<source>` for different formats.\n\n### Video Element\n`<video controls>` — video player. Attributes: `width`, `height`, `poster` — thumbnail. `muted` — mute (required for autoplay).\n\n### Track\n`<track kind="subtitles">` — subtitles. `kind` can be: subtitles, captions, descriptions, chapters, metadata.\n\n### Iframe\nEmbeds external pages. Attributes: `src` — URL, `allowfullscreen`, `loading="lazy"`. Use `sandbox` for security.\n\n### Formats\n**Audio**: MP3, OGG, WAV, AAC. **Video**: MP4 (H.264), WebM, OGV.' },
  10: { id: '### Meta Tags\n`<meta charset="UTF-8">` — encoding. `<meta name="viewport">` — responsive. `<meta name="description">` — deskripsi di hasil pencarian. `<meta name="robots">` — kontrol indexing.\n\n### Open Graph\n`og:title` — judul saat dibagikan. `og:description` — deskripsi. `og:image` — thumbnail. `og:url` — URL kanonikal. Digunakan oleh Facebook, LinkedIn, WhatsApp.\n\n### Twitter Cards\n`twitter:card` — tipe kartu (summary, summary_large_image, app, player). `twitter:site` — akun Twitter.\n\n### Canonical URL\n`<link rel="canonical">` — URL utama untuk konten duplikat. Penting untuk SEO.\n\n### Structured Data\nJSON-LD format untuk Schema.org. Membantu Google menampilkan rich snippets (review, event, FAQ).', en: '### Meta Tags\n`<meta charset="UTF-8">` — encoding. `<meta name="viewport">` — responsive. `<meta name="description">` — search result description. `<meta name="robots">` — indexing control.\n\n### Open Graph\n`og:title` — title when shared. `og:description` — description. `og:image` — thumbnail. `og:url` — canonical URL. Used by Facebook, LinkedIn, WhatsApp.\n\n### Twitter Cards\n`twitter:card` — card type (summary, summary_large_image, app, player). `twitter:site` — Twitter account.\n\n### Canonical URL\n`<link rel="canonical">` — main URL for duplicate content. Important for SEO.\n\n### Structured Data\nJSON-LD format for Schema.org. Helps Google display rich snippets (review, event, FAQ).' },
  11: { id: '### WCAG 4 Prinsip\n**Perceivable** — informasi harus bisa diterima oleh setidaknya satu indra. **Operable** — UI harus bisa dioperasikan. **Understandable** — informasi dan UI harus bisa dipahami. **Robust** — konten harus kompatibel dengan alat bantu.\n\n### ARIA\n`role` — peran elemen (banner, navigation, main, contentinfo). `aria-label` — label untuk elemen. `aria-labelledby` — hubungkan dengan elemen lain. `aria-describedby` — deskripsi tambahan. `aria-live` — region yang dinamis.\n\n### Skip Link\nTautan tersembunyi yang muncul saat di-focus untuk keyboard user. Memungkinkan lompat ke konten utama langsung.\n\n### Focus Management\nPastikan semua interaktif bisa diakses keyboard. Tab order logis. Focus style terlihat.\n\n### Alt Text\nDeskriptif dan kontekstual. Gambar dekoratif: `alt=""` (kosong). Gambar informatif: deskripsikan fungsi, bukan penampilan.', en: '### WCAG 4 Principles\n**Perceivable** — information must be receivable by at least one sense. **Operable** — UI must be operable. **Understandable** — information and UI must be understandable. **Robust** — content must be compatible with assistive technologies.\n\n### ARIA\n`role` — element role (banner, navigation, main, contentinfo). `aria-label` — element label. `aria-labelledby` — connect with another element. `aria-describedby` — additional description. `aria-live` — dynamic region.\n\n### Skip Link\nHidden link that appears on focus for keyboard users. Allows jumping to main content directly.\n\n### Focus Management\nEnsure all interactive elements are keyboard accessible. Logical tab order. Visible focus styles.\n\n### Alt Text\nDescriptive and contextual. Decorative images: `alt=""` (empty). Informative images: describe function, not appearance.' },
  12: { id: '### Canvas\nElemen untuk menggambar grafis dengan JavaScript. Gunakan `getContext("2d")` untuk rendering. Method: `fillRect`, `arc`, `beginPath`, `fill`, `fillText`. Canvas bagus untuk game, grafik, visualisasi data.\n\n### Geolocation\n`navigator.geolocation.getCurrentPosition()` — dapatkan posisi satu kali. `watchPosition()` — pantau perubahan posisi. Membutuhkan izin user.\n\n### Web Storage\n`localStorage` — data persisten (tidak hilang saat browser ditutup). `sessionStorage` — data sementara (hilang saat tab ditutup). Hanya bisa string. Gunakan `JSON.stringify()` untuk objek.\n\n### Drag & Drop\n`draggable="true"` — buat elemen bisa di-drag. Event: `dragstart`, `dragover`, `drop`. `dataTransfer` — bawa data antar event.\n\n### History API\n`history.pushState()` — tambah state. `history.replaceState()` — ganti state. `popstate` event — tangani navigasi.', en: '### Canvas\nElement for drawing graphics with JavaScript. Use `getContext("2d")` for rendering. Methods: `fillRect`, `arc`, `beginPath`, `fill`, `fillText`. Canvas is great for games, charts, data visualization.\n\n### Geolocation\n`navigator.geolocation.getCurrentPosition()` — get position once. `watchPosition()` — monitor position changes. Requires user permission.\n\n### Web Storage\n`localStorage` — persistent data (survives browser close). `sessionStorage` — temporary data (cleared on tab close). Can only store strings. Use `JSON.stringify()` for objects.\n\n### Drag & Drop\n`draggable="true"` — make element draggable. Events: `dragstart`, `dragover`, `drop`. `dataTransfer` — carry data between events.\n\n### History API\n`history.pushState()` — add state. `history.replaceState()` — replace state. `popstate` event — handle navigation.' },
  13: { id: '### Lazy Loading\n`loading="lazy"` — gambar dimuat saat mendekati viewport. Menghemat bandwidth dan mempercepat initial load. `loading="eager"` — muat segera.\n\n### Resource Hints\n`preconnect` — buka koneksi awal ke origin. `dns-prefetch` — resolve DNS awal. `preload` — muat resource penting lebih awal. `prefetch` — muat resource untuk halaman berikutnya.\n\n### Responsive Images\nGunakan `srcset` + `sizes` untuk mengirim gambar sesuai ukuran layar. `picture` element untuk art direction. Format WebP dengan fallback JPEG/PNG.\n\n### Dekoding\n`decoding="async"` — dekoding gambar asynchronous, tidak memblokir rendering. `decoding="sync"` — default.\n\n### Validasi\nW3C Validator — cek kesalahan HTML. Lighthouse — audit performa, aksesibilitas, SEO. axe DevTools — audit aksesibilitas mendalam.', en: '### Lazy Loading\n`loading="lazy"` — image loads when near viewport. Saves bandwidth and speeds up initial load. `loading="eager"` — load immediately.\n\n### Resource Hints\n`preconnect` — open early connection to origin. `dns-prefetch` — resolve DNS early. `preload` — load critical resources earlier. `prefetch` — load resources for next page.\n\n### Responsive Images\nUse `srcset` + `sizes` to send images matching screen size. `picture` element for art direction. WebP format with JPEG/PNG fallback.\n\n### Decoding\n`decoding="async"` — async image decoding, does not block rendering. `decoding="sync"` — default.\n\n### Validation\nW3C Validator — check HTML errors. Lighthouse — audit performance, accessibility, SEO. axe DevTools — in-depth accessibility audit.' },
  14: { id: '### Arsitektur\nWebsite portofolio menggabungkan SEMUA konsep HTML5: semantic structure, navigation, forms, tables, multimedia, accessibility, SEO meta tags, dan structured data.\n\n### Semantic Structure\nGunakan `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` untuk layout yang jelas. Satu `<h1>` per halaman.\n\n### Aksesibilitas\n`role` attributes, `aria-label`, `aria-labelledby`, `aria-describedby`, skip link, `alt` text, labels pada form.\n\n### SEO\nMeta tags, Open Graph, Twitter Cards, canonical URL, structured data JSON-LD.\n\n### Deploy\nUpload ke GitHub Pages, Netlify, atau Vercel. Pastikan valid HTML dan aksesibel.', en: '### Architecture\nA portfolio website combines ALL HTML5 concepts: semantic structure, navigation, forms, tables, multimedia, accessibility, SEO meta tags, and structured data.\n\n### Semantic Structure\nUse `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>` for clear layout. One `<h1>` per page.\n\n### Accessibility\n`role` attributes, `aria-label`, `aria-labelledby`, `aria-describedby`, skip link, `alt` text, form labels.\n\n### SEO\nMeta tags, Open Graph, Twitter Cards, canonical URL, structured data JSON-LD.\n\n### Deploy\nUpload to GitHub Pages, Netlify, or Vercel. Ensure valid HTML and accessible.' },
};

const EXP_E = {
  1: { id: ['Ganti title halaman dengan judul sendiri', 'Tambahkan satu paragraf lagi tentang hobi Anda', 'Gunakan atribut lang="en" — apa yang berubah?', 'Buat struktur halaman dengan 3 level heading'], en: ['Change the page title to your own', 'Add one more paragraph about your hobby', 'Use lang="en" attribute — what changes?', 'Create a page structure with 3 heading levels'] },
  2: { id: ['Buat heading h1 sampai h4 dengan konten sendiri', 'Gunakan semua format teks: strong, em, mark, small, del, ins', 'Buat blockquote dengan kutipan favorit Anda', 'Tulis rumus matematika menggunakan sup dan sub'], en: ['Create h1 through h4 headings with your own content', 'Use all text formats: strong, em, mark, small, del, ins', 'Create a blockquote with your favorite quote', 'Write a math formula using sup and sub'] },
  3: { id: ['Buat navigasi menu dengan 5 tautan', 'Tambah tautan ke halaman web favorit dengan target _blank', 'Buat bookmark internal yang menuju ke bagian footer', 'Buat tautan download dengan atribut download'], en: ['Create a navigation menu with 5 links', 'Add a link to your favorite website with target _blank', 'Create an internal bookmark pointing to the footer', 'Create a download link with the download attribute'] },
  4: { id: ['Ganti URL gambar placeholder dengan gambar dari internet', 'Tambah gambar SVG menggunakan tag img', 'Buat figure dengan multiple gambar dalam satu figure', 'Implementasi picture element dengan 3 source'], en: ['Replace placeholder image URLs with images from the internet', 'Add an SVG image using the img tag', 'Create a figure with multiple images in one figure', 'Implement picture element with 3 sources'] },
  5: { id: ['Buat ordered list dengan type="A" (huruf kapital)', 'Tambah tabel dengan colspan untuk menggabung 3 kolom', 'Gunakan rowspan untuk menggabung baris pada tabel', 'Tambah thead, tbody, tfoot pada tabel'], en: ['Create an ordered list with type="A" (capital letters)', 'Add a table with colspan merging 3 columns', 'Use rowspan to merge rows in a table', 'Add thead, tbody, tfoot to a table'] },
  6: { id: ['Tambah field input type="range" untuk rating', 'Gunakan method="GET" dan lihat URL setelah submit', 'Tambah atribut autofocus pada input nama', 'Buat form dengan fieldset untuk 3 kategori berbeda'], en: ['Add an input type="range" field for rating', 'Use method="GET" and see the URL after submit', 'Add autofocus attribute to the name input', 'Create a form with fieldsets for 3 different categories'] },
  7: { id: ['Tambah pola regex untuk validasi username (huruf dan angka saja)', 'Gunakan input type="url" untuk validasi website', 'Implementasi validasi password harus mengandung angka', 'Tampilkan pesan error kustom untuk setiap field'], en: ['Add a regex pattern for username validation (letters and numbers only)', 'Use input type="url" for website validation', 'Implement password must contain a number', 'Show custom error messages for each field'] },
  8: { id: ['Ubah struktur halaman: ganti urutan section dan article', 'Tambah elemen time dengan datetime untuk jadwal', 'Gunakan details untuk FAQ section dengan 3 pertanyaan', 'Buat layout dengan 2 aside di kiri dan kanan'], en: ['Change page structure: reorder section and article', 'Add time elements with datetime for schedules', 'Use details for an FAQ section with 3 questions', 'Create a layout with 2 asides on left and right'] },
  9: { id: ['Tambah autoplay (muted) pada video untuk preview', 'Ganti sumber video dengan file lokal', 'Embed peta dari Google Maps dengan lokasi kota Anda', 'Tambah track subtitle ke video (walaupun file tidak ada)'], en: ['Add autoplay (muted) to video for preview', 'Replace video source with local files', 'Embed a Google Map with your city location', 'Add a subtitle track to the video (even if file is missing)'] },
  10: { id: ['Ganti og:image dengan gambar Anda sendiri', 'Tambah meta tag theme-color untuk browser mobile', 'Buat structured data untuk sebuah resep atau event', 'Implementasi favicon dengan format PNG'], en: ['Replace og:image with your own image', 'Add theme-color meta tag for mobile browsers', 'Create structured data for a recipe or event', 'Implement a favicon in PNG format'] },
  11: { id: ['Tambah skip link yang muncul saat di-tab', 'Gunakan aria-expanded pada elemen yang bisa di-toggle', 'Implementasi role="tablist" untuk tab panel', 'Uji halaman dengan screen reader (NVDA atau VoiceOver)'], en: ['Add a skip link that appears on tab focus', 'Use aria-expanded on toggleable elements', 'Implement role="tablist" for a tab panel', 'Test the page with a screen reader (NVDA or VoiceOver)'] },
  12: { id: ['Gambar lingkaran dengan gradien di Canvas', 'Implementasi drag & drop gambar ke drop zone', 'Simpan array objek ke localStorage dan restore', 'Gambar grafik batang sederhana di Canvas'], en: ['Draw a circle with gradient on Canvas', 'Implement drag & drop of images to drop zone', 'Save an array of objects to localStorage and restore', 'Draw a simple bar chart on Canvas'] },
  13: { id: ['Ukur performa halaman dengan Lighthouse di DevTools', 'Tambah preload untuk font atau gambar hero', 'Buat gambar dengan format WebP (konversi online)', 'Implementasi lazy loading pada iframe'], en: ['Measure page performance with Lighthouse in DevTools', 'Add preload for a font or hero image', 'Create a WebP format image (convert online)', 'Implement lazy loading on an iframe'] },
  14: { id: ['Tambah halaman kedua "about.html" dengan konten sendiri', 'Implementasi galeri proyek dengan figure dan figcaption', 'Tambah testimoni menggunakan blockquote dengan cite', 'Validasi halaman dengan W3C Validator'], en: ['Add a second page "about.html" with your own content', 'Implement a project gallery with figure and figcaption', 'Add testimonials using blockquote with cite', 'Validate the page with W3C Validator'] },
};

const CHALL = {
  1: { id: 'Buat halaman profil pribadi lengkap dengan: struktur HTML5 yang valid, judul halaman, heading bertingkat, paragraf tentang diri Anda, daftar hobi menggunakan unordered list, dan tautan ke media sosial. Pastikan menggunakan semantic HTML dan komentar yang jelas.', en: 'Create a complete personal profile page with: valid HTML5 structure, page title, multi-level headings, paragraphs about yourself, an unordered list of hobbies, and social media links. Ensure semantic HTML and clear comments.' },
  2: { id: 'Buat halaman artikel blog dengan: judul artikel, penulis dan tanggal, kutipan dari tokoh terkenal, highlight pada kata kunci, daftar istilah, dan kode program. Gunakan minimal 10 elemen format teks yang berbeda.', en: 'Create a blog article page with: article title, author and date, quote from a famous figure, highlighted keywords, definition list, and code block. Use at least 10 different text formatting elements.' },
  3: { id: 'Buat halaman "Sumber Belajar" dengan navigasi yang lengkap: menu navigasi utama dengan 5 item, tautan ke 10 sumber belajar eksternal (buka tab baru), bookmark internal untuk setiap kategori, tautan email untuk kontak, dan tautan download panduan PDF.', en: 'Create a "Learning Resources" page with complete navigation: main navigation menu with 5 items, links to 10 external learning resources (open in new tab), internal bookmarks for each category, email link for contact, and a download link for a PDF guide.' },
  4: { id: 'Buat galeri portofolio dengan: 6 gambar dalam grid 3x2, masing-masing dengan figure dan figcaption, satu gambar menggunakan picture element dengan 3 ukuran layar, dan gambar SVG inline. Gunakan loading lazy untuk performa.', en: 'Create a portfolio gallery with: 6 images in a 3x2 grid, each with figure and figcaption, one image using picture element with 3 screen sizes, and an inline SVG image. Use lazy loading for performance.' },
  5: { id: 'Buat halaman "Rencana Belajar" yang berisi: jadwal belajar mingguan dalam tabel (senin-jumat, jam, mata pelajaran), daftar prioritas belajar (ordered list dengan type A), glosarium istilah programming (description list), dan daftar buku referensi (unordered list).', en: 'Create a "Study Plan" page containing: weekly study schedule in a table (Monday-Friday, hours, subjects), prioritized learning list (ordered list with type A), programming glossary (description list), and reference book list (unordered list).' },
  6: { id: 'Buat halaman pendaftaran course yang lengkap dengan: data diri (nama, email, telepon, tanggal lahir), pilihan course (checkbox dengan 6 opsi), level keahlian (radio button), kota (dropdown dengan optgroup per provinsi), upload CV, dan catatan tambahan. Gunakan fieldset untuk setiap kategori.', en: 'Create a complete course registration page with: personal data (name, email, phone, date of birth), course selection (checkbox with 6 options), skill level (radio buttons), city (dropdown with optgroup per province), CV upload, and additional notes. Use fieldsets for each category.' },
  7: { id: 'Buat form registrasi dengan validasi ketat: username (huruf kecil dan angka, 5-20 karakter), password (min 8, harus mengandung huruf kapital, huruf kecil, angka), konfirmasi password, nomor telepon (format Indonesia: +62), dan tanggal lahir. Tampilkan pesan error kustom untuk setiap field.', en: 'Create a registration form with strict validation: username (lowercase letters and numbers, 5-20 chars), password (min 8, must contain uppercase, lowercase, number), password confirmation, phone number (Indonesia format: +62), and date of birth. Show custom error messages for each field.' },
  8: { id: 'Buat halaman layout website berita dengan: header (logo, navigasi, search form), main content (2 article dengan section, figure, aside untuk sidebar), dan footer (navigasi sekunder, copyright, social media). Gunakan semantic HTML lengkap tanpa div.', en: 'Create a news website layout with: header (logo, navigation, search form), main content (2 articles with sections, figures, sidebar aside), and footer (secondary navigation, copyright, social media). Use complete semantic HTML without divs.' },
  9: { id: 'Buat halaman multimedia player yang menampilkan: playlist audio dengan 3 lagu (masing-masing dengan source MP3 dan OGG), video tutorial dengan poster image, YouTube embed untuk trailer, dan embed Google Maps untuk lokasi studio. Sertakan kontrol untuk setiap media.', en: 'Create a multimedia player page displaying: audio playlist with 3 songs (each with MP3 and OGG sources), tutorial video with poster image, YouTube embed for trailer, and Google Maps embed for studio location. Include controls for each media.' },
  10: { id: 'Buat halaman artikel blog yang dioptimasi SEO dengan: meta description menarik, Open Graph tags lengkap (title, description, image, url, type), Twitter Cards, canonical URL, structured data JSON-LD untuk artikel (Article schema), dan favicon. Validasi dengan Facebook Sharing Debugger.', en: 'Create an SEO-optimized blog article page with: compelling meta description, complete Open Graph tags (title, description, image, url, type), Twitter Cards, canonical URL, structured data JSON-LD for article (Article schema), and favicon. Validate with Facebook Sharing Debugger.' },
  11: { id: 'Buat halaman form yang sepenuhnya aksesibel dengan: skip link, ARIA roles pada semua section, aria-required pada field wajib, aria-describedby untuk hint, role="alert" untuk error messages, focus management (auto-focus ke field error), dan uji coba navigasi keyboard.', en: 'Create a fully accessible form page with: skip link, ARIA roles on all sections, aria-required on mandatory fields, aria-describedby for hints, role="alert" for error messages, focus management (auto-focus to error field), and keyboard navigation testing.' },
  12: { id: 'Buat halaman "My Dashboard" yang menggabungkan: Canvas untuk grafik batang sederhana, Geolocation untuk menampilkan posisi user, Drag & Drop untuk widget yang bisa diatur ulang, localStorage untuk menyimpan preferensi layout, dan History API untuk navigasi tab.', en: 'Create a "My Dashboard" page combining: Canvas for a simple bar chart, Geolocation to display user position, Drag & Drop for rearrangeable widgets, localStorage to save layout preferences, and History API for tab navigation.' },
  13: { id: 'Audit halaman HTML Anda menggunakan Lighthouse dan W3C Validator. Catat skor dan perbaiki minimal 3 isu. Implementasi: lazy loading pada 3 gambar, preconnect ke Google Fonts, responsive images dengan srcset, dan minimal 2 resource hints. Laporkan perbaikan skor sebelum dan sesudah.', en: 'Audit your HTML page using Lighthouse and W3C Validator. Record scores and fix at least 3 issues. Implement: lazy loading on 3 images, preconnect to Google Fonts, responsive images with srcset, and at least 2 resource hints. Report before and after score improvements.' },
  14: { id: 'Bangun website portofolio pribadi 3 halaman (Beranda, Tentang, Proyek) yang menggabungkan SEMUA konsep HTML5: semantic layout, navigasi konsisten, form kontak dengan validasi, tabel skill, galeri proyek dengan figure, multimedia (video intro atau audio), meta tags SEO, aksesibilitas ARIA, structured data JSON-LD, dan favicon. Deploy ke GitHub Pages.', en: 'Build a 3-page personal portfolio website (Home, About, Projects) combining ALL HTML5 concepts: semantic layout, consistent navigation, contact form with validation, skills table, project gallery with figures, multimedia (intro video or audio), SEO meta tags, ARIA accessibility, structured data JSON-LD, and favicon. Deploy to GitHub Pages.' },
};

const SUM = {
  1: { id: 'Anda telah memahami cara kerja web dan struktur dasar HTML5. Mulai dari DOCTYPE, elemen root, head, hingga body — semuanya adalah fondasi halaman web. Modul selanjutnya: **Teks & Heading** — cara menulis dan memformat konten teks.', en: 'You have understood how the web works and the basic HTML5 structure. From DOCTYPE, root element, head, to body — these are the foundation of every web page. Next module: **Text & Headings** — how to write and format text content.' },
  2: { id: 'Heading dan format teks adalah alat dasar untuk menyajikan konten. Hierarki heading yang benar membantu SEO dan aksesibilitas. Modul selanjutnya: **Tautan & Navigasi** — cara menghubungkan halaman dan sumber daya.', en: 'Headings and text formatting are basic tools for presenting content. Proper heading hierarchy helps SEO and accessibility. Next module: **Links & Navigation** — how to connect pages and resources.' },
  3: { id: 'Tautan adalah yang membuat web menjadi "web". Dengan anchor tag, navigasi, email link, dan bookmark, Anda bisa menghubungkan informasi di seluruh dunia. Modul selanjutnya: **Gambar & Figure** — cara menampilkan dan mengoptimalkan gambar.', en: 'Links are what make the web a "web". With anchor tags, navigation, email links, and bookmarks, you can connect information across the world. Next module: **Images & Figures** — how to display and optimize images.' },
  4: { id: 'Gambar membuat halaman web lebih menarik dan informatif. Dengan alt text, figure, responsive images, dan picture element, Anda bisa menyajikan visual yang optimal di semua perangkat. Modul selanjutnya: **List & Table** — cara mengorganisir data dalam daftar dan tabel.', en: 'Images make web pages more engaging and informative. With alt text, figures, responsive images, and the picture element, you can deliver optimal visuals across all devices. Next module: **Lists & Tables** — how to organize data in lists and tables.' },
  5: { id: 'List dan table adalah cara fundamental untuk mengorganisir informasi. Dari navigasi hingga data tabular, struktur ini membuat konten lebih mudah dibaca dan dipahami. Modul selanjutnya: **Form & Input** — cara mengumpulkan data dari pengguna.', en: 'Lists and tables are fundamental ways to organize information. From navigation to tabular data, these structures make content easier to read and understand. Next module: **Forms & Input** — how to collect data from users.' },
  6: { id: 'Form adalah pintu interaksi pengguna dengan website. Berbagai tipe input, label, select, dan fieldset memungkinkan Anda mengumpulkan data dengan struktur yang baik. Modul selanjutnya: **Validasi Form** — cara memastikan data yang dikirim valid.', en: 'Forms are the gateway for user interaction with websites. Various input types, labels, selects, and fieldsets allow you to collect data with good structure. Next module: **Form Validation** — how to ensure submitted data is valid.' },
  7: { id: 'Validasi form memastikan data yang dikirim sesuai dengan yang diharapkan. HTML5 menyediakan validasi built-in yang kuat tanpa perlu JavaScript. Modul selanjutnya: **HTML Semantik** — elemen yang memberi makna pada struktur halaman.', en: 'Form validation ensures submitted data meets expectations. HTML5 provides powerful built-in validation without needing JavaScript. Next module: **Semantic HTML** — elements that give meaning to page structure.' },
  8: { id: 'Semantic HTML adalah praktik terbaik untuk menulis kode yang bermakna. Elemen seperti header, nav, main, article, dan section membuat halaman lebih SEO-friendly, aksesibel, dan mudah dipelihara. Modul selanjutnya: **Multimedia & Embed** — cara menambahkan audio, video, dan konten eksternal.', en: 'Semantic HTML is a best practice for writing meaningful code. Elements like header, nav, main, article, and section make pages more SEO-friendly, accessible, and maintainable. Next module: **Multimedia & Embed** — how to add audio, video, and external content.' },
  9: { id: 'Multimedia membuat halaman web lebih kaya dan interaktif. Audio, video, iframe, dan track element memungkinkan Anda menyematkan berbagai jenis media. Modul selanjutnya: **Metadata & SEO** — cara mengoptimalkan halaman untuk mesin pencari dan social media.', en: 'Multimedia makes web pages richer and more interactive. Audio, video, iframes, and track elements allow you to embed various media types. Next module: **Metadata & SEO** — how to optimize pages for search engines and social media.' },
  10: { id: 'Meta tag, Open Graph, Twitter Cards, dan structured data adalah alat penting untuk SEO dan social media optimization. Mereka mengontrol bagaimana halaman Anda muncul di hasil pencarian dan dibagikan. Modul selanjutnya: **Aksesibilitas Web** — cara membuat halaman yang dapat digunakan oleh semua orang.', en: 'Meta tags, Open Graph, Twitter Cards, and structured data are essential tools for SEO and social media optimization. They control how your page appears in search results and when shared. Next module: **Web Accessibility** — how to create pages usable by everyone.' },
  11: { id: 'Aksesibilitas web bukan opsional — ini adalah hak. WCAG, ARIA, keyboard navigation, skip link, dan alt text memastikan website Anda dapat digunakan oleh semua orang, termasuk penyandang disabilitas. Modul selanjutnya: **HTML5 APIs** — fitur-fitur modern browser untuk aplikasi web yang lebih powerful.', en: 'Web accessibility is not optional — it is a right. WCAG, ARIA, keyboard navigation, skip links, and alt text ensure your website can be used by everyone, including people with disabilities. Next module: **HTML5 APIs** — modern browser features for more powerful web applications.' },
  12: { id: 'HTML5 APIs membuka pintu ke kemampuan browser modern: Canvas untuk grafis, Geolocation untuk lokasi, Web Storage untuk penyimpanan, Drag & Drop untuk interaksi, dan History API untuk navigasi. Modul selanjutnya: **Performa & Best Practices** — cara mengoptimalkan halaman HTML Anda.', en: 'HTML5 APIs open the door to modern browser capabilities: Canvas for graphics, Geolocation for location, Web Storage for data, Drag & Drop for interaction, and History API for navigation. Next module: **Performance & Best Practices** — how to optimize your HTML pages.' },
  13: { id: 'Performa dan best practices adalah yang membedakan developer biasa dari developer profesional. Lazy loading, resource hints, responsive images, dan validasi memastikan website Anda cepat, efisien, dan berkualitas. Modul selanjutnya: **Proyek Akhir** — gabungkan semua konsep dalam portofolio lengkap.', en: 'Performance and best practices distinguish ordinary developers from professionals. Lazy loading, resource hints, responsive images, and validation ensure your website is fast, efficient, and high-quality. Next module: **Final Project** — combine all concepts in a complete portfolio.' },
  14: { id: 'Selamat! Anda telah menyelesaikan seluruh kurikulum HTML5. Dari struktur dasar hingga semantic HTML, dari form hingga aksesibilitas, dari multimedia hingga performa — Anda kini memiliki fondasi HTML yang kokoh. Langkah selanjutnya: dalami CSS3 dan JavaScript untuk menjadi frontend developer yang handal!', en: 'Congratulations! You have completed the entire HTML5 curriculum. From basic structure to semantic HTML, from forms to accessibility, from multimedia to performance — you now have a solid HTML foundation. Next steps: dive into CSS3 and JavaScript to become a skilled frontend developer!' },
};

function generateFile(mod, lang) {
  const isId = lang === 'id';
  const h = isId ? mod.lid : mod.len;
  const progName = isId ? mod.cid : mod.cen;
  const code = CODE[mod.id];
  const obj = OBJ[mod.id];
  const objList = isId ? obj.id : obj.en;
  const exp = EXP[mod.id];
  const explanation = isId ? exp.id : exp.en;
  const expE = EXP_E[mod.id];
  const experiments = isId ? expE.id : expE.en;
  const challenge = isId ? CHALL[mod.id].id : CHALL[mod.id].en;
  const summary = isId ? SUM[mod.id].id : SUM[mod.id].en;

  const moduleLabel = isId ? `Modul ${mod.id}` : `Module ${mod.id}`;
  const objBullets = objList.map(o => `- ${o}`).join('\n');

  return `# ${h}

> HTML5 | ${moduleLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objBullets}

---

## ${isId ? `Program: ${progName}` : `Program: ${progName}`}

\`\`\`html
${code}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${isId ? 'Berikut penjelasan detail materi:' : 'Here is a detailed explanation of the material:'}

${explanation}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${experiments}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${challenge}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${summary}
`;
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, 'id');
  const enContent = generateFile(mod, 'en');
  fs.writeFileSync(path.join(BASE, 'id', `week${mod.id}-${mod.f}.md`), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', `week${mod.id}-${mod.f}.md`), enContent, 'utf8');
  console.log(`  ${mod.id}. ${mod.lid} / ${mod.len}`);
}

console.log(`\n✓ Generated ${MODULES.length * 2} HTML5 curriculum files (${MODULES.length} modules × 2 languages)`);
console.log(`  Output: ${BASE}`);
