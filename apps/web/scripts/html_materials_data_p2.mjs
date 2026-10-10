// HTML Weeks 5 to 8 (Intermediate: Form, Media, and Complete Multi-page Project)
// Zero gimmick words.

export const HTML_WEEKS_P2 = [
  // ─── WEEK 5 ───
  {
    week: 5,
    levelId: 'intermediate',
    topicId: 'formulir-dan-validasi',
    titleId: 'Formulir dan Validasi Input',
    titleEn: 'Forms and Input Validation',
    category: 'HTML5',
    levelNameId: 'Form dan Interaksi',
    levelNameEn: 'Forms and Interaction',
    objectivesId: [
      'Memahami anatomi formulir: <form action="..." method="..."> dan keterkaitan <label for="..."> dengan <input id="...">',
      'Menguasai berbagai tipe input: text, email, password, number, tel, date, radio, checkbox, dan file',
      'Menggunakan tag input pendukung: <select>, <option>, <optgroup>, <textarea>, dan tombol <button type="submit">',
      'Mengelompokkan bagian form menggunakan <fieldset> dan <legend>',
      'Menyediakan fitur autocomplete menggunakan tag <datalist>',
      'Menerapkan validasi bawaan browser: required, min, max, pattern, dan placeholder'
    ],
    objectivesEn: [
      'Understand form anatomy: <form action="..." method="..."> and the link between <label for="..."> and <input id="...">',
      'Master essential input types: text, email, password, number, tel, date, radio, checkbox, and file',
      'Use supplementary form tags: <select>, <option>, <optgroup>, <textarea>, and <button type="submit">',
      'Group related inputs using <fieldset> and <legend>',
      'Provide autocomplete suggestions using <datalist>',
      'Implement native browser validation: required, min, max, pattern, and placeholder'
    ],
    contentId: `## 1. Anatomi Elemen Formulir (<form>)

Formulir digunakan untuk mengumpulkan data dari pengguna dan mengirimkannya ke server:
- **\`<form action="/kirim" method="POST">\`**:
  - \`action\`: Alamat URL server tujuan data dikirim.
  - \`method\`: Metode pengiriman (\`GET\` untuk pencarian, \`POST\` untuk data rahasia/panjang).

### Keterkaitan <label> dan <input>:
Setiap input **wajib memiliki label** agar ramah aksesibilitas. Hubungkan atribut \`for\` pada label dengan \`id\` pada input:
\`\`\`html
<label for="input-email">Alamat Email:</label>
<input type="email" id="input-email" name="email" required>
\`\`\`
Saat pengguna mengklik teks label, kursor otomatis aktif di dalam kotak input.

---

## 2. Beragam Tipe Input (<input>)
- \`type="text"\`: Teks satu baris standar.
- \`type="email"\`: Memvalidasi format email secara otomatis saat disubmit.
- \`type="password"\`: Menyembunyikan karakter teks yang diketik.
- \`type="number"\`: Hanya menerima angka, dapat diberi batas \`min\` dan \`max\`.
- \`type="radio"\`: Pilihan tunggal (harus memiliki atribut \`name\` yang sama).
- \`type="checkbox"\`: Pilihan ganda (centang kotak).
- \`type="date"\`: Pemilih kalender tanggal bawaan browser.

---

## 3. Tag Pendukung: Select, Textarea, Fieldset, dan Datalist
- **\`<select>\` & \`<option>\`**: Dropdown pilihan.
- **\`<textarea rows="4">\`**: Kotak teks panjang untuk pesan atau catatan.
- **\`<fieldset>\` & \`<legend>\`**: Membingkai kelompok input terkait secara rapi dan aksesibel.
- **\`<datalist>\`**: Menampilkan saran dropdown otomatis saat mengetik di input biasa.

---

## 4. Validasi Bawaan Browser
Browser modern dapat memvalidasi form tanpa perlu menulis kode JavaScript:
- \`required\`: Input wajib diisi sebelum form dapat disubmit.
- \`placeholder="..."\`: Teks contoh yang memudar di dalam kotak input.
- \`pattern="[0-9]{10,12}"\`: Memvalidasi format teks menggunakan pola regular expression (misal nomor telepon).`,

    contentEn: `## 1. Form Element Anatomy (<form>)

Forms collect user input and transmit it to a destination endpoint:
- **\`<form action="/submit" method="POST">\`**:
  - \`action\`: Destination URL endpoint.
  - \`method\`: Transmission method (\`GET\` for searches, \`POST\` for private or payload data).

### Linking <label> with <input>:
Every input **must be paired with a label** for accessibility. Connect the label's \`for\` attribute to the input's \`id\`:
\`\`\`html
<label for="email-field">Email Address:</label>
<input type="email" id="email-field" name="email" required>
\`\`\`
Clicking the label immediately focuses the corresponding input element.

---

## 2. Core Input Types (<input>)
- \`type="text"\`: Standard single-line text.
- \`type="email"\`: Automatically validates email formatting upon submit.
- \`type="password"\`: Obscures typed characters.
- \`type="number"\`: Accepts numerical values with optional \`min\` and \`max\` constraints.
- \`type="radio"\`: Single-choice option (must share an identical \`name\` attribute).
- \`type="checkbox"\`: Multi-choice toggle checkbox.
- \`type="date"\`: Native calendar date picker.

---

## 3. Supplementary Form Elements
- **\`<select>\` & \`<option>\`**: Dropdown selector.
- **\`<textarea rows="4">\`**: Multi-line text field for longer messages.
- **\`<fieldset>\` & \`<legend>\`**: Visually and semantically groups related inputs.
- **\`<datalist>\`**: Autocomplete recommendation dropdown for standard text inputs.

---

## 4. Native Browser Validation
Modern browsers validate inputs without requiring JavaScript:
- \`required\`: Prevents submission if the field is empty.
- \`placeholder="..."\`: Ghost hint text displayed inside an empty field.
- \`pattern="..."\`: Validates against a regular expression pattern (e.g. phone numbers).`,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hubungi Kami — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    form { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; margin-top: 16px; }
    fieldset { border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    legend { font-weight: bold; padding: 0 8px; color: #0f172a; }
    .form-group { margin-bottom: 14px; }
    label { display: block; font-weight: 500; font-size: 14px; margin-bottom: 4px; }
    input[type="text"], input[type="email"], select, textarea { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; }
    button { background: #0284c7; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer; }
    button:hover { background: #0369a1; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Formulir Permintaan Proyek</h1>
    <p>Silakan lengkapi formulir di bawah ini untuk konsultasi pembuatan website:</p>
  </header>

  <main>
    <form action="#" method="POST">
      <fieldset>
        <legend>Informasi Kontak</legend>
        <div class="form-group">
          <label for="nama">Nama Lengkap:</label>
          <input type="text" id="nama" name="nama" placeholder="Contoh: Budi Santoso" required>
        </div>

        <div class="form-group">
          <label for="email">Alamat Email:</label>
          <input type="email" id="email" name="email" placeholder="nama@email.com" required>
        </div>
      </fieldset>

      <fieldset>
        <legend>Rincian Proyek</legend>
        <div class="form-group">
          <label for="paket">Pilihan Paket:</label>
          <select id="paket" name="paket" required>
            <option value="">-- Pilih Paket Layanan --</option>
            <option value="dasar">Paket Dasar (1-3 Halaman)</option>
            <option value="bisnis">Paket Bisnis (4-8 Halaman)</option>
            <option value="kustom">Paket Kustom (> 8 Halaman)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="pesan">Deskripsi Kebutuhan:</label>
          <textarea id="pesan" name="pesan" rows="4" placeholder="Ceritakan tujuan dan kebutuhan website Anda..." required></textarea>
        </div>
      </fieldset>

      <button type="submit">Kirim Permintaan</button>
    </form>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Berkas: <code>kontak.html</code></p>
  </footer>
</body>
</html>`,
    programTitleId: 'Formulir Permintaan Layanan dengan Validasi Bawaan',
    programTitleEn: 'Service Inquiry Form with Native Browser Validation',
    breakdownId: [
      'Line 28: `<form action="#" method="POST">` membungkus seluruh input data pengguna.',
      'Line 29-40: `<fieldset>` dan `<legend>` mengelompokkan input informasi kontak.',
      'Line 31: Atribut `for="nama"` terhubung ke input dengan `id="nama"`.',
      'Line 46-54: Tag `<select>` menyediakan menu dropdown dengan nilai opsi `<option>`.',
      'Line 56-59: `<textarea rows="4">` menyediakan kotak input teks multi-baris.',
      'Line 62: `<button type="submit">` memicu proses submit dan validasi form.'
    ],
    breakdownEn: [
      'Line 28: `<form action="#" method="POST">` encloses all interactive inputs.',
      'Line 29-40: `<fieldset>` and `<legend>` logically bundle user contact details.',
      'Line 31: Attribute `for="nama"` explicitly pairs with input `id="nama"`.',
      'Line 46-54: `<select>` presents a dropdown list of `<option>` entries.',
      'Line 56-59: `<textarea rows="4">` delivers a multi-line message field.',
      'Line 62: `<button type="submit">` triggers native browser form validation and submission.'
    ],
    pitfallsId: [
      'Lupa menulis atribut `name` pada input (data input tidak akan terkirim ke server tanpa atribut `name`).',
      'Menulis atribut `for` pada label yang tidak cocok dengan atribut `id` pada input.',
      'Lupa memberikan tag pembuka `<form>` sehingga tombol submit tidak berfungsi.'
    ],
    pitfallsEn: [
      'Omitting the `name` attribute on inputs (servers cannot identify form fields without `name`).',
      'Mismatched label `for` attributes and input `id` attributes.',
      'Placing inputs outside of a `<form>` wrapper, disabling standard submit functionality.'
    ]
  },

  // ─── WEEK 6 ───
  {
    week: 6,
    levelId: 'intermediate',
    topicId: 'media-dan-aksesibilitas',
    titleId: 'Media, Iframe, dan Aksesibilitas',
    titleEn: 'Media, Iframes, and Accessibility',
    category: 'HTML5',
    levelNameId: 'Form dan Interaksi',
    levelNameEn: 'Forms and Interaction',
    objectivesId: [
      'Menyematkan pemutar audio dan video native menggunakan tag <audio> dan <video>',
      'Menyediakan subtitle dan teks transkrip menggunakan tag <track>',
      'Menyematkan konten eksternal atau peta menggunakan tag <iframe> dengan atribut sandbox dan loading="lazy"',
      'Menyisipkan grafis vektor tajam menggunakan elemen <svg>',
      'Menerapkan prinsip aksesibilitas dasar (WCAG 2.1 AA) dengan label ARIA dan atribut semantik'
    ],
    objectivesEn: [
      'Embed native audio and video players using <audio> and <video> tags',
      'Attach closed captions and subtitles using the <track> element',
      'Embed third-party content and maps using <iframe> with sandbox and loading="lazy"',
      'Render vector icons directly in HTML using the <svg> element',
      'Apply core web accessibility guidelines (WCAG 2.1 AA) with ARIA labels and semantic attributes'
    ],
    contentId: `## 1. Pemutar Media: <video> dan <audio>

HTML5 mendukung pemutaran video dan audio secara native tanpa plugin pihak ketiga:
\`\`\`html
<video controls width="640" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track src="subtitle-id.vtt" kind="subtitles" srclang="id" label="Bahasa Indonesia">
  Browser Anda tidak mendukung pemutar video HTML5.
</video>
\`\`\`
- **\`controls\`**: Menampilkan tombol play, pause, volume, dan timeline.
- **\`poster\`**: Gambar thumbnail yang tampil sebelum video diputar.
- **\`<track>\`**: Menyematkan file subtitle (*WebVTT* \`.vtt\`) demi aksesibilitas tunarungu.

---

## 2. Menyematkan Konten dengan <iframe>
Tag \`<iframe>\` menyematkan dokumen web lain ke dalam halaman Anda (misal Google Maps atau video):
\`\`\`html
<iframe 
  src="https://maps.google.com/..." 
  title="Peta Lokasi Kantor Studio" 
  width="600" 
  height="450" 
  loading="lazy" 
  allowfullscreen>
</iframe>
\`\`\`
- **\`title\`**: Wajib ada agar pembaca layar mengetahui isi iframe.
- **\`loading="lazy"\`**: Menunda pemuatan iframe hingga pengguna menggulir ke dekatnya (*menghemat bandwidth*).

---

## 3. Grafis Vektor (<svg>)
Tag \`<svg>\` memungkinkan Anda menggambar bentuk vektor atau ikon tajam langsung di HTML:
\`\`\`html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <circle cx="12" cy="12" r="10" stroke-width="2"/>
</svg>
\`\`\`

---

## 4. Aksesibilitas Web (WCAG dan ARIA)
Website yang baik dapat diakses oleh semua pengguna, termasuk penyandang disabilitas:
- **\`aria-label="..."\`**: Memberi nama label pada tombol yang hanya memiliki ikon tanpa teks.
- **\`aria-hidden="true"\`**: Menyembunyikan ikon dekoratif dari pembaca layar agar tidak dibaca bersuara.
- **Kontras Teks**: Pastikan teks mudah dibaca di atas warna latar belakang.`,

    contentEn: `## 1. Media Players: <video> and <audio>

HTML5 plays video and audio natively without third-party plugins:
\`\`\`html
<video controls width="640" poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track src="subtitles-en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support HTML5 video.
</video>
\`\`\`
- **\`controls\`**: Displays native play, pause, volume, and progress controls.
- **\`poster\`**: Displays a thumbnail preview image prior to playback.
- **\`<track>\`**: Embeds timed subtitle captions (*WebVTT* \`.vtt\`) for deaf and hard-of-hearing users.

---

## 2. Embedding Third-Party Content (<iframe>)
The \`<iframe>\` element embeds foreign web documents (such as map widgets):
\`\`\`html
<iframe 
  src="https://maps.google.com/..." 
  title="Office Location Map" 
  width="600" 
  height="450" 
  loading="lazy" 
  allowfullscreen>
</iframe>
\`\`\`
- **\`title\`**: Mandatory description for screen reader users.
- **\`loading="lazy"\`**: Defers loading until the iframe nears the viewport.

---

## 3. Vector Graphics (<svg>)
The \`<svg>\` tag renders scalable vector icons directly inside HTML markup:
\`\`\`html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
  <circle cx="12" cy="12" r="10" stroke-width="2"/>
</svg>
\`\`\`

---

## 4. Web Accessibility (WCAG and ARIA)
Accessible websites ensure full compatibility for users using screen readers:
- **\`aria-label="..."\`**: Provides programmatic labels for icon-only buttons.
- **\`aria-hidden="true"\`**: Hides decorative graphics from screen readers.
- **Text Contrast**: Ensures color readability across visual viewports.`,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media dan Lokasi — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    .card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .icon-box { display: flex; align-items: center; gap: 8px; font-weight: bold; color: #0f172a; margin-bottom: 12px; }
    svg { color: #0284c7; }
    audio { width: 100%; margin-top: 10px; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Media Informasi dan Dokumentasi</h1>
  </header>

  <main>
    <section class="card">
      <div class="icon-box">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="10 8 16 12 10 16 10 8"/>
        </svg>
        <span>Rekaman Pengantar Proyek</span>
      </div>
      <p>Dengarkan penjelasan ringkas mengenai standar kode HTML yang kami terapkan:</p>
      
      <audio controls aria-label="Audio pengantar proyek pembuatan website">
        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
        Browser Anda tidak mendukung pemutar audio bawaan.
      </audio>
    </section>

    <section class="card">
      <h2>Peta Lokasi Kantor</h2>
      <p>Kunjungi studio kerja kami untuk konsultasi langsung:</p>

      <iframe 
        src="https://www.openstreetmap.org/export/embed.html?bbox=106.8%2C-6.2%2C106.9%2C-6.1&amp;layer=mapnik" 
        title="Peta Lokasi Kantor Studio Alex Pratama" 
        width="100%" 
        height="260" 
        style="border: 1px solid #cbd5e1; border-radius: 6px;" 
        loading="lazy">
      </iframe>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Aksesibilitas Terverifikasi.</p>
  </footer>
</body>
</html>`,
    programTitleId: 'Penyematan Media Audio dan Iframe Peta Aksesibel',
    programTitleEn: 'Accessible Embedded Audio and Interactive Iframe Map',
    breakdownId: [
      'Line 26-29: `<svg>` menyajikan ikon play vektor dengan `aria-hidden="true"` agar tidak membingungkan screen reader.',
      'Line 33-36: `<audio controls>` menyajikan audio native dengan teks fallback.',
      'Line 43-50: `<iframe>` menyematkan peta interaktif dengan atribut wajib `title` dan `loading="lazy"`.'
    ],
    breakdownEn: [
      'Line 26-29: `<svg>` renders a vector play icon equipped with `aria-hidden="true"`.',
      'Line 33-36: `<audio controls>` renders native audio playback with fallback content.',
      'Line 43-50: `<iframe>` embeds an interactive map using mandatory `title` and performance-friendly `loading="lazy"`.'
    ],
    pitfallsId: [
      'Lupa memberikan atribut `title` pada tag `<iframe>` (pelanggaran standar aksesibilitas WCAG).',
      'Lupa menyertakan atribut `controls` pada tag `<video>` atau `<audio>` sehingga pengguna tidak bisa memutar media.',
      'Menggunakan autoplay audio dengan suara keras secara tiba-tiba tanpa izin pengguna.'
    ],
    pitfallsEn: [
      'Omitting the `title` attribute on an `<iframe>` (WCAG compliance violation).',
      'Forgetting the `controls` attribute on `<video>` or `<audio>`, rendering playback impossible.',
      'Enabling audible media autoplay without explicit user interaction.'
    ]
  },

  // ─── WEEK 7 ───
  {
    week: 7,
    levelId: 'intermediate',
    topicId: 'dialog-details-dan-template',
    titleId: 'Dialog, Details, dan Template',
    titleEn: 'Dialog, Details, and Template',
    category: 'HTML5',
    levelNameId: 'Form dan Interaksi',
    levelNameEn: 'Forms and Interaction',
    objectivesId: [
      'Membuat komponen akordeon buka-tutup (FAQ) native tanpa JavaScript menggunakan <details> dan <summary>',
      'Membuat jendela pop-up modal native browser menggunakan tag <dialog>',
      'Mengontrol dialog modal dengan method standar .showModal() dan .close()',
      'Memahami fungsi tag <template> dan <slot> sebagai kerangka cetak biru elemen yang tidak langsung dirender',
      'Mengintegrasikan komponen interaktif ke dalam struktur proyek website'
    ],
    objectivesEn: [
      'Build native toggle accordion components (FAQ) without JavaScript using <details> and <summary>',
      'Create native browser modal dialogs using the <dialog> element',
      'Control dialog states using native .showModal() and .close() JavaScript methods',
      'Understand <template> and <slot> as non-rendered structural blueprints',
      'Integrate native interactive elements into your ongoing website project'
    ],
    contentId: `## 1. Komponen Akordeon Native: <details> dan <summary>

Sering kali kita ingin membuat daftar tanya-jawab (FAQ) yang bisa diklik untuk membuka atau menutup jawabannya. Di HTML5, Anda tidak memerlukan JavaScript untuk fitur ini:
\`\`\`html
<details>
  <summary>Berapa lama proses pembuatan website?</summary>
  <p>Proses pengerjaan berkisar antara 3 hingga 14 hari kerja tergantung jumlah halaman.</p>
</details>
\`\`\`
- **\`<details>\`**: Wadah pembungkus yang secara native dapat membuka dan menutup kontennya.
- **\`<summary>\`**: Teks judul yang selalu terlihat dan bertindak sebagai tombol klik.

---

## 2. Jendela Modal Pop-Up Native: <dialog>

HTML5 menyediakan tag \`<dialog>\` untuk membuat jendela pop-up modal:
\`\`\`html
<dialog id="modal-info">
  <h2>Pemberitahuan</h2>
  <p>Permintaan pesan Anda telah berhasil dikirim!</p>
  <button id="tutup-modal">Tutup</button>
</dialog>
\`\`\`
Untuk membukanya sebagai modal dengan latar belakang gelap (*backdrop*), cukup panggil method native di tombol:
\`\`\`html
<button onclick="document.getElementById('modal-info').showModal()">Buka Info</button>
<button onclick="document.getElementById('modal-info').close()">Tutup</button>
\`\`\`

---

## 3. Tag Cetak Biru: <template> dan <slot>
- **\`<template>\`**: Kode HTML di dalam tag ini **tidak dirender oleh browser saat halaman dimuat**. Tag ini bertindak sebagai cetak biru yang baru ditampilkan saat diduplikasi oleh script.
- **\`<slot>\`**: Tempat penampung isi konten pada Web Components.`,

    contentEn: `## 1. Native Accordions: <details> and <summary>

Frequently Asked Questions (FAQ) components can be built natively without writing any JavaScript:
\`\`\`html
<details>
  <summary>How long does website delivery take?</summary>
  <p>Standard delivery takes between 3 to 14 business days depending on page count.</p>
</details>
\`\`\`
- **\`<details>\`**: Collapsible container that handles toggle state natively.
- **\`<summary>\`**: Clickable header heading that remains permanently visible.

---

## 2. Native Browser Modals: <dialog>

HTML5 includes the \`<dialog>\` element for creating accessible modals:
\`\`\`html
<dialog id="modal-info">
  <h2>Notice</h2>
  <p>Your inquiry has been successfully transmitted!</p>
  <button onclick="this.closest('dialog').close()">Close</button>
</dialog>
\`\`\`
To display the dialog with an automatic dimming backdrop, trigger the native browser method:
\`\`\`html
<button onclick="document.getElementById('modal-info').showModal()">Open Notice</button>
\`\`\`

---

## 3. Blueprint Elements: <template> and <slot>
- **\`<template>\`**: HTML enclosed within this tag is parsed but **not rendered on page load**. It serves as a blueprint duplicated dynamically via scripts.
- **\`<slot>\`**: Content placeholders used inside Web Components.`,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FAQ dan Informasi — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 24px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    details { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px 16px; margin-bottom: 12px; }
    summary { font-weight: bold; cursor: pointer; color: #0f172a; }
    details[open] { background: #ffffff; border-color: #0284c7; }
    details p { margin: 10px 0 0; color: #475569; }
    dialog { border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; max-width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
    dialog::backdrop { background: rgba(15, 23, 42, 0.6); }
    .btn-action { background: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: bold; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Pertanyaan Umum (FAQ)</h1>
  </header>

  <main>
    <section>
      <h2>Tanya Jawab Seputar Layanan</h2>

      <details>
        <summary>Apakah website yang dibuat sudah ramah perangkat seluler?</summary>
        <p>Ya, seluruh dokumen HTML dilengkapi dengan tag meta viewport dan struktur layout yang fleksibel untuk layar ponsel.</p>
      </details>

      <details>
        <summary>Berapa lama estimasi pengerjaan website?</summary>
        <p>Estimasi standar berkisar antara 3 hari untuk paket dasar hingga 14 hari kerja untuk paket kustom.</p>
      </details>

      <details>
        <summary>Apakah kode HTML yang dihasilkan valid dan semantik?</summary>
        <p>Seluruh dokumen mematuhi standar HTML5 resmi W3C dengan struktur tag semantik lengkap.</p>
      </details>
    </section>

    <section style="margin-top: 24px;">
      <h2>Konsultasi Cepat</h2>
      <button class="btn-action" onclick="document.getElementById('modal-kontak').showModal()">
        Buka Kontak Singkat
      </button>

      <dialog id="modal-kontak">
        <h3>Kontak Singkat Studio</h3>
        <p>Anda dapat menghubungi kami langsung melalui email:</p>
        <p><strong>alex@example.com</strong></p>
        <button class="btn-action" onclick="document.getElementById('modal-kontak').close()">Tutup</button>
      </dialog>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Komponen Interaktif Native.</p>
  </footer>
</body>
</html>`,
    programTitleId: 'Akordeon FAQ Native dan Modal Dialog',
    programTitleEn: 'Native FAQ Accordions and Interactive Modal Dialog',
    breakdownId: [
      'Line 28-39: Tag `<details>` dan `<summary>` menghasilkan akordeon buka-tutup tanpa satu baris pun JavaScript.',
      'Line 46-51: Tag `<dialog>` menghasilkan modal popup native lengkap dengan latar backdrop gelap bawaan browser.',
      'Line 43 & 50: Pemanggilan method native `.showModal()` dan `.close()` mengontrol visibilitas dialog.'
    ],
    breakdownEn: [
      'Line 28-39: `<details>` and `<summary>` generate native accordion disclosure widgets without JavaScript.',
      'Line 46-51: `<dialog>` defines a native browser modal with automated backdrop dimming.',
      'Line 43 & 50: Invoking native `.showModal()` and `.close()` methods toggles dialog visibility.'
    ],
    pitfallsId: [
      'Menggunakan method `.show()` alih-alih `.showModal()` pada dialog (method `.show()` tidak mengaktifkan backdrop modal).',
      'Lupa memberikan tag `<summary>` di dalam `<details>` (browser akan menampilkan teks default "Details").',
      'Mencoba menampilkan konten `<template>` langsung tanpa bantuan script kloning DOM.'
    ],
    pitfallsEn: [
      'Calling `.show()` instead of `.showModal()` on a dialog (which skips the backdrop overlay).',
      'Omitting `<summary>` inside `<details>` (causing browsers to default to generic "Details" text).',
      'Expecting `<template>` content to render automatically without script cloning.'
    ]
  },

  // ─── WEEK 8 ───
  {
    week: 8,
    levelId: 'intermediate',
    topicId: 'proyek-website-lengkap',
    titleId: 'Proyek Website Lengkap',
    titleEn: 'Full Website Project',
    category: 'HTML5',
    levelNameId: 'Form dan Interaksi',
    levelNameEn: 'Forms and Interaction',
    objectivesId: [
      'Menyatukan seluruh konsep HTML dari Minggu 1 hingga 7 ke dalam satu arsitektur website multi-halaman utuh',
      'Menyusun struktur folder proyek standar: berkas HTML, folder css/, images/, dan dokumen pendukung',
      'Menghubungkan 3 halaman utama: index.html (Beranda), layanan.html (Layanan & Tabel), dan kontak.html (Formulir & FAQ)',
      'Memvalidasi dokumen HTML menggunakan standar resmi W3C Validator',
      'Menyiapkan proyek untuk dipublikasikan ke layanan hosting statis'
    ],
    objectivesEn: [
      'Synthesize all HTML concepts from Weeks 1 through 7 into a coherent multi-page website project',
      'Organize a production project directory: HTML documents, css/ styles, images/ assets',
      'Interlink 3 core pages: index.html (Home), layanan.html (Services & Tables), and kontak.html (Forms & FAQ)',
      'Validate HTML markup compliance using the official W3C Validator standard',
      'Prepare project deliverables for deployment on static hosting platforms'
    ],
    contentId: `## 1. Arsitektur Proyek Website Multi-Halaman

Di akhir Level 2, seluruh keterampilan HTML Anda dipadukan menjadi satu proyek website lengkap yang terdiri dari 3 berkas halaman:

\`\`\`text
my-website/
├── index.html        # 1. Beranda: Header, Navigasi, Hero Banner, Semantik, dan Gambar
├── layanan.html      # 2. Layanan: Detail Layanan dan Tabel Paket Harga Terstruktur
├── kontak.html       # 3. Kontak: Formulir Permintaan, Akordeon FAQ, dan Dialog Modal
├── css/
│   └── style.css     # File stylesheet bersama
└── images/
    └── studio.jpg    # Aset media foto
\`\`\`

---

## 2. Checklist Standar Kualitas Dokumen HTML
Sebelum meluncurkan website, periksa daftar periksa kualitas berikut:
1. **Deklarasi Standar:** Setiap berkas diawali \`<!DOCTYPE html>\` dan elemen \`<html lang="id">\`.
2. **Metadata Head:** Memiliki \`<meta charset="UTF-8">\`, \`<meta name="viewport">\`, dan tag \`<title>\` unik di setiap halaman.
3. **Struktur Semantik:** Memiliki satu elemen \`<main>\` per halaman, serta pemisahan \`<header>\`, \`<section>\`, \`<article>\`, dan \`<footer>\`.
4. **Teks Aksesibel:** Semua tag \`<img>\` memiliki atribut \`alt\`, semua formulir memiliki \`<label for="...">\`, dan tabel memiliki \`<caption>\`.
5. **Navigasi Terhubung:** Seluruh menu tautan \`<nav>\` berfungsi dengan benar saat diklik untuk berpindah halaman.

---

## 3. Hasil Capstone Proyek
Website ini adalah representasi penuh dari penguasaan HTML murni Anda dari awal hingga akhir, siap dipublikasikan ke hosting statis atau Cloudflare Pages.`,

    contentEn: `## 1. Multi-Page Website Project Architecture

By the conclusion of Level 2, all HTML competencies coalesce into a unified 3-page website project:

\`\`\`text
my-website/
├── index.html        # 1. Home: Branding, Nav, Hero, Semantics, and Media
├── layanan.html      # 2. Services: Service Catalog and Structured Pricing Table
├── kontak.html       # 3. Contact: Inquiry Form, Native FAQ Accordions, and Modal
├── css/
│   └── style.css     # Shared stylesheet
└── images/
    └── studio.jpg    # Media assets
\`\`\`

---

## 2. Production HTML Quality Checklist
Verify this standard checklist before project deployment:
1. **Standard Declarations:** Every file begins with \`<!DOCTYPE html>\` and \`<html lang="en">\`.
2. **Head Metadata:** Each document defines \`<meta charset="UTF-8">\`, \`<meta name="viewport">\`, and unique \`<title>\` text.
3. **Semantic Landmarks:** Strictly one \`<main>\` per page, alongside proper \`<header>\`, \`<section>\`, \`<article>\`, and \`<footer>\` boundaries.
4. **Accessibility Checks:** All \`<img>\` tags contain descriptive \`alt\` text, form controls are paired with \`<label for="...">\`, and tables feature \`<caption>\`.
5. **Navigational Integrity:** Relative anchor links (\`<a href="...">\`) accurately resolve between all documents.

---

## 3. Capstone Deliverable
This project stands as a complete portfolio demonstration of native HTML mastery, ready for deployment on static platforms such as Cloudflare Pages.`,

    programCode: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Studio — Alex Pratama</title>
  <style>
    body { font-family: sans-serif; max-width: 680px; margin: 30px auto; padding: 0 16px; line-height: 1.6; color: #1e293b; }
    header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 24px; }
    nav { background: #f1f5f9; padding: 10px 16px; border-radius: 6px; margin-bottom: 16px; }
    nav a { text-decoration: none; color: #0284c7; font-weight: bold; margin-right: 14px; }
    .hero { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; margin-bottom: 20px; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; margin: 12px 0; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 13px; text-align: left; }
    th { background: #0f172a; color: white; }
    details { margin-top: 12px; }
    footer { margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 12px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="index.html">Beranda</a>
      <a href="layanan.html">Layanan</a>
      <a href="kontak.html">Kontak</a>
    </nav>
    <h1>Studio Web Alex Pratama</h1>
  </header>

  <main>
    <section class="hero">
      <h2>Ringkasan Proyek Website</h2>
      <p>Proyek portal website ini dibangun murni menggunakan <strong>HTML5 semantik</strong> yang terbagi menjadi tiga halaman:</p>
      <ul>
        <li><strong>Halaman Beranda (<code>index.html</code>):</strong> Memuat profil studio, navigasi, dan gambar terstruktur.</li>
        <li><strong>Halaman Layanan (<code>layanan.html</code>):</strong> Memuat rincian paket dan tabel perbandingan spesifikasi.</li>
        <li><strong>Halaman Kontak (<code>kontak.html</code>):</strong> Memuat formulir permintaan proyek dan akordeon FAQ.</li>
      </ul>
    </section>

    <section class="card">
      <h3>Status Validasi Dokumen</h3>
      <table>
        <caption>Tabel Status Dokumen Proyek</caption>
        <thead>
          <tr>
            <th scope="col">Nama Berkas</th>
            <th scope="col">Komponen Utama</th>
            <th scope="col">Status Standar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>index.html</code></td>
            <td>Header, Navigasi, Hero, Gambar</td>
            <td>Valid W3C</td>
          </tr>
          <tr>
            <td><code>layanan.html</code></td>
            <td>Tipografi Teks, Tabel Layanan</td>
            <td>Valid W3C</td>
          </tr>
          <tr>
            <td><code>kontak.html</code></td>
            <td>Formulir Input, Details FAQ, Dialog</td>
            <td>Valid W3C</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Alex Pratama. Proyek Website Selesai.</p>
  </footer>
</body>
</html>`,
    programTitleId: 'Struktur Lengkap Proyek Website Multi-Halaman',
    programTitleEn: 'Complete Multi-Page Production Website Architecture',
    breakdownId: [
      'Line 19-25: Header dan navigasi menyediakan akses ke seluruh halaman proyek.',
      'Line 28-38: Hero section merangkum arsitektur 3 file proyek web.',
      'Line 40-69: Tabel semantik menyajikan status validasi dan komponen dari setiap file proyek.'
    ],
    breakdownEn: [
      'Line 19-25: Header and navigation provide global inter-page navigation.',
      'Line 28-38: Hero section summarizes the 3-page site architecture.',
      'Line 40-69: Semantic table displays audit status and components per project document.'
    ],
    pitfallsId: [
      'Menyalin kode tanpa memperbarui tag `<title>` pada setiap file halaman.',
      'Tautan navigasi putus (*broken link*) karena salah menuliskan nama file tujuan.',
      'Lupa menguji tampilan di layar perangkat seluler sebelum publikasi.'
    ],
    pitfallsEn: [
      'Copying files without updating `<title>` metadata per document.',
      'Broken relative links caused by mismatched target filenames.',
      'Failing to test responsive layout on mobile viewports prior to publishing.'
    ]
  }
];
