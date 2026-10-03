# HTML5 Track: 8 Weeks (2 Levels)
# Final Product: High-Performance, Accessible (WCAG AA), Semantic Multi-Page Corporate Portal

LEVELS = [
    {
        'levelId': 'beginer',
        'nameId': 'Struktur & Semantik Web',
        'nameEn': 'Structure & Web Semantics',
        'descId': 'Membangun pondasi dokumen web semantik dari nol: tag standar, hierarki teks, navigasi, dan media responsif.',
        'descEn': 'Build semantic web document foundations from scratch: standard tags, text hierarchy, navigation, and responsive media.',
    },
    {
        'levelId': 'advanced',
        'nameId': 'Formulir Modern, Aksesibilitas & Web API',
        'nameEn': 'Modern Forms, Accessibility & Web APIs',
        'descId': 'Formulir interaktif dengan validasi bawaan browser, standar aksesibilitas WCAG 2.1 AA, dan fitur modern HTML5.',
        'descEn': 'Interactive forms with native browser validation, WCAG 2.1 AA accessibility standards, and modern HTML5 features.',
    },
]

MODULES = [
    # Level 1: Struktur & Semantik Web (Weeks 1-4)
    {
        'week': 1,
        'level': 'beginer',
        'topicId': 'struktur-dokumen-semantik',
        'titleId': 'Struktur Dokumen Standar & Metadata Head',
        'titleEn': 'Standard Document Structure & Head Metadata',
        'programId': 'Dokumen HTML5 Pertama yang Valid dan Terstruktur',
        'programEn': 'First Valid and Structured HTML5 Document',
        'levelNameId': 'Struktur & Semantik Web',
        'levelNameEn': 'Structure & Web Semantics',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portal profil perusahaan resmi PT Nusa Digital Teknologi. Solusi transformasi digital terpercaya.">
  <meta name="author" content="Tim Rekayasa Perangkat Lunak Nusa Digital">
  <meta property="og:title" content="Nusa Digital — Solusi Transformasi Digital">
  <meta property="og:description" content="Layanan rekayasa software enterprise dan cloud computing berkinerja tinggi.">
  <meta property="og:type" content="website">
  <title>Nusa Digital — Solusi Transformasi Digital</title>
</head>
<body>
  <header>
    <h1>Nusa Digital Solusindo</h1>
    <p>Membangun infrastruktur software berkinerja tinggi untuk ekosistem industri modern.</p>
  </header>

  <main>
    <article>
      <h2>Komitmen Rekayasa Kami</h2>
      <p>Kami menerapkan prinsip clean architecture, keamanan data ketat, dan performa web optimal sejak baris kode pertama.</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 PT Nusa Digital Teknologi. Hak cipta dilindungi undang-undang.</p>
  </footer>
</body>
</html>""",
        'objectivesId': [
            'Memahami deklarasi <!DOCTYPE html> dan perannya mencegah quirks mode pada browser',
            'Mengatur elemen root <html lang="id"> untuk mesin pencari dan teknologi pembaca layar (screen reader)',
            'Mengonfigurasi meta charset UTF-8 dan meta viewport untuk rendering responsif di perangkat mobile',
            'Memanfaatkan Open Graph metadata untuk optimasi berbagi tautan di media sosial',
            'Menggunakan elemen landmark dasar: <header>, <main>, <article>, dan <footer>',
        ],
        'objectivesEn': [
            'Understand the <!DOCTYPE html> declaration and its role in preventing browser quirks mode',
            'Configure the root <html lang="en"> element for search engines and screen readers',
            'Set up meta charset UTF-8 and meta viewport for responsive rendering on mobile devices',
            'Leverage Open Graph metadata for rich social media link previews',
            'Use foundational landmark elements: <header>, <main>, <article>, and <footer>',
        ],
        'explanationId': """### Deklarasi <!DOCTYPE html>
Deklarasi doctype di baris pertama memberi instruksi kepada browser untuk merender dokumen menggunakan standar HTML5 modern. Tanpa deklarasi ini, browser akan masuk ke *quirks mode* yang menyebabkan inkonsistensi rendering layout lama.

### Metadata Head & Viewport
Elemen `<head>` memuat data tentang dokumen yang tidak ditampilkan langsung di layar pengguna:
- `<meta charset="UTF-8">`: Memastikan encoding karakter mendukung seluruh abjad internasional, simbol matematika, dan emoji.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Menetapkan lebar viewport mengikuti lebar layar fisik perangkat dengan skala awal 1:1, syarat mutlak web responsif.
- `<meta name="description">`: Ringkasan konten halaman yang ditampilkan di hasil pencarian Google.

### Landmark Semantik Dasar
- `<header>`: Memuat pengantar atau navigasi situs.
- `<main>`: Memuat konten utama yang unik untuk halaman ini (hanya boleh ada satu `<main>` per dokumen).
- `<article>`: Bagian konten independen yang dapat didistribusikan atau digunakan kembali secara mandiri.
- `<footer>`: Catatan kaki berisi hak cipta, kontak, atau tautan legalitas.""",
        'explanationEn': """### The <!DOCTYPE html> Declaration
The doctype declaration on the first line instructs the browser to render the page in standard modern HTML5 mode. Without it, browsers enter quirks mode, triggering historical layout bugs and inconsistent styling.

### Head Metadata & The Viewport
The `<head>` element holds metadata about the page that is not visible on the canvas:
- `<meta charset="UTF-8">`: Guarantees character encoding support for international alphabets, mathematical symbols, and emoji.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Sets the viewport width to the device width with an initial scale of 1:1, essential for mobile responsiveness.
- `<meta name="description">`: Provides the concise snippet displayed in search engine results.

### Core Semantic Landmarks
- `<header>`: Introductory content or site-wide navigation headers.
- `<main>`: The dominant, unique content of the document (only one visible `<main>` allowed per page).
- `<article>`: Self-contained content that can be distributed independently.
- `<footer>`: Closing content such as copyright, author info, or legal disclaimers.""",
        'beginnerId': """### Analogi: Surat Resmi Perusahaan
Bayangkan dokumen HTML seperti surat resmi bisnis:
1. **`<!DOCTYPE html>`** adalah stempel cap resmi bahwa surat ini ditulis sesuai format baku kantor pos modern.
2. **`<head>`** adalah amplop surat: berisi alamat tujuan, nomor resi, stiker pengiriman, dan nama pengirim (orang tidak membaca ini saat membaca isi surat, tapi pos dan kurir membutuhkannya).
3. **`<body>`** adalah lembaran kertas isi surat yang dibaca oleh penerima.
4. **`<header>`, `<main>`, `<footer>`** adalah kepala surat, isi pesan utama, dan tanda tangan penutup di bagian bawah.""",
        'beginnerEn': """### Analogy: An Official Business Letter
Think of an HTML document as a formal business letter:
1. **`<!DOCTYPE html>`** is the official postal seal declaring standard modern mail formatting.
2. **`<head>`** is the envelope: it contains the tracking number, postage stamps, metadata, and routing instructions (users don't read this directly, but search engines and browsers need it).
3. **`<body>`** is the actual letter inside that people read.
4. **`<header>`, `<main>`, and `<footer>`** are the letterhead, the main body of the letter, and the signature/disclaimers at the bottom.""",
        'experimentsId': [
            'Hapus baris meta viewport, buka di ponsel atau ubah ukuran jendela browser, dan amati teks yang mengecil seperti halaman desktop versi 90-an.',
            'Ubah nilai atribut lang="id" menjadi lang="en", lalu periksa bagaimana browser menawarkan fitur terjemahan otomatis.',
            'Tambahkan meta tag og:image dengan URL gambar dummy, kemudian amati peran tag tersebut dalam kartu pratinjau media sosial.',
            'Coba letakkan teks di luar elemen <body> dan periksa bagaimana browser secara otomatis memperbaiki penempatan DOM di tab Elements Developer Tools.',
        ],
        'experimentsEn': [
            'Remove the meta viewport tag, resize the window to mobile width, and observe the unscaled legacy desktop rendering.',
            'Change lang="en" to another language code and observe how browser auto-translation prompts respond.',
            'Add an og:image meta tag with a dummy image URL and note its role in social share card previews.',
            'Place arbitrary text outside the <body> tag and check DevTools Elements inspector to see how browsers auto-correct invalid DOM structures.',
        ],
        'challengeId': 'Buat kerangka dokumen HTML5 lengkap untuk beranda "Klinik Sehat Bersama". Sertakan meta charset, viewport, meta description medis yang meyakinkan, serta elemen landmark `<header>`, `<main>`, `<article>` tentang layanan rawat jalan, dan `<footer>` lengkap dengan jam operasional.',
        'challengeEn': 'Build a complete HTML5 document shell for "Healthy Life Medical Clinic". Include meta charset, viewport, medical description metadata, plus `<header>`, `<main>`, `<article>` detailing outpatient services, and a `<footer>` with operating hours.',
        'summaryId': 'Kamu telah menguasai anatomi dokumen HTML5 yang valid, konfigurasi viewport mobile, metadata SEO, serta landmark semantik dasar. Minggu depan kita akan mempelajari hierarki teks, daftar terstruktur, dan navigasi multi-halaman.',
        'summaryEn': 'You have mastered the anatomy of a valid HTML5 document, mobile viewport configuration, SEO metadata, and primary semantic landmarks. Next week, we explore text hierarchy, structured lists, and multi-page navigation.',
    },
    {
        'week': 2,
        'level': 'beginer',
        'topicId': 'hierarki-teks-dan-navigasi',
        'titleId': 'Hierarki Teks, Tipografi Semantik & Navigasi Antar Halaman',
        'titleEn': 'Text Hierarchy, Semantic Typography & Navigation Links',
        'programId': 'Struktur Konten Berjenjang dengan Navigasi Aksesibel',
        'programEn': 'Ranked Content Hierarchy with Accessible Navigation',
        'levelNameId': 'Struktur & Semantik Web',
        'levelNameEn': 'Structure & Web Semantics',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Layanan Rekayasa — Nusa Digital</title>
</head>
<body>
  <header>
    <a href="#konten-utama" class="skip-link">Lewati ke konten utama</a>
    <p><strong>Nusa Digital</strong></p>
    <nav aria-label="Navigasi Utama">
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="layanan.html" aria-current="page">Layanan</a></li>
        <li><a href="tentang.html">Tentang Kami</a></li>
        <li><a href="kontak.html">Hubungi Kami</a></li>
      </ul>
    </nav>
  </header>

  <main id="konten-utama">
    <article>
      <h1>Solusi Layanan Rekayasa Perangkat Lunak</h1>
      <p>Kami menyediakan arsitektur komputasi modern yang dirancang untuk skala jutaan pengguna aktif harian.</p>

      <section>
        <h2>1. Arsitektur Cloud & Backend Berkecepatan Tinggi</h2>
        <p>Pengembangan sistem terdistribusi menggunakan Go dan Rust dengan protokol <em>gRPC</em> dan penyimpanan terkelola.</p>
        <p>Karakteristik performa layanan kami:</p>
        <ul>
          <li>Latensi respon rata-rata di bawah <strong>15 milidetik</strong></li>
          <li>Uptime operasional tahunan mencapai <strong>99.99%</strong></li>
          <li>Dukungan auto-scaling dinamis berbasis beban CPU</li>
        </ul>
      </section>

      <section>
        <h2>2. Alur Pelaksanaan Proyek</h2>
        <p>Langkah sistematis dari evaluasi kebutuhan hingga deployment produksi:</p>
        <ol>
          <li>Analisis domain dan perancangan kontrak API</li>
          <li>Implementasi kode inti beserta unit testing menyeluruh</li>
          <li>Uji penetrasi keamanan dan benchmarking latensi</li>
          <li>Deployment otomatis menggunakan pipeline CI/CD</li>
        </ol>
      </section>
    </article>
  </main>

  <footer>
    <p><small>&copy; 2026 PT Nusa Digital Teknologi. Dokumen resmi standar ISO 27001.</small></p>
  </footer>
</body>
</html>""",
        'objectivesId': [
            'Menerapkan aturan hierarki heading tunggal <h1> dan penomoran logis <h2> hingga <h6> tanpa melewatkan tingkatan',
            'Membedakan penggunaan elemen penekanan makna: <strong> vs <b>, dan <em> vs <i>',
            'Membangun menu navigasi semantik menggunakan tag <nav> dan unordered list <ul>',
            'Menghubungkan navigasi internal dengan anchor jump link menggunakan id (#konten-utama)',
            'Menggunakan atribut aria-current="page" untuk menginformasikan halaman yang sedang aktif',
        ],
        'objectivesEn': [
            'Apply the single <h1> hierarchy rule and sequential <h2> through <h6> heading nesting without skipping levels',
            'Distinguish semantic emphasis elements: <strong> vs <b>, and <em> vs <i>',
            'Construct accessible navigation menus using the <nav> element and unordered lists <ul>',
            'Create internal page anchor jumps using identifier fragments (#main-content)',
            'Utilize aria-current="page" to expose the active page state to assistive tech',
        ],
        'explanationId': """### Aturan Hierarki Heading (H1-H6)
Heading bukan sekadar pengubah ukuran teks visual, melainkan daftar isi dokumen untuk mesin pencari dan pembaca layar:
- Hanya ada **satu `<h1>`** per halaman yang merepresentasikan topik sentral dokumen.
- Jangan pernah melompati tingkatan (misal dari `<h2>` langsung ke `<h4>`).
- Bagian subtopik dari `<h2>` harus selalu diawali dengan `<h3>`.

### Semantik Teks: Makna vs Tampilan
- `<strong>`: Menyatakan bahwa konten memiliki kepentingan atau urgensi tinggi (dibaca dengan penekanan oleh screen reader).
- `<b>`: Menebalkan huruf semata-mata untuk menarik perhatian visual tanpa memberi arti penting ekstra.
- `<em>`: Memberi tekanan intonasi percakapan pada sebuah kata (*stress emphasis*).
- `<i>`: Digunakan untuk istilah teknis, nama latin, atau idiom asing.

### Navigasi Semantik dan Tautan Lompat
Elemen `<nav>` membungkus tautan navigasi utama. Penggunaan list `<ul>` di dalamnya memberi informasi kepada pembaca layar mengenai jumlah tautan yang tersedia (misal: "List 4 items"). Tautan lompat (*skip link*) `<a href="#konten-utama">` memungkinkan pengguna papan ketik melewati menu panjang langsung ke konten utama.""",
        'explanationEn': """### Heading Hierarchy Rules (H1-H6)
Headings represent the structural outline of the document rather than cosmetic text sizes:
- A page should contain exactly **one `<h1>`** indicating the core topic.
- Never skip heading levels (e.g., jumping from `<h2>` directly to `<h4>`).
- Subsections under an `<h2>` must always begin with `<h3>`.

### Text Semantics: Meaning vs Appearance
- `<strong>`: Denotes strong importance or seriousness (conveyed with acoustic emphasis by screen readers).
- `<b>`: Draws visual attention without adding semantic weight.
- `<em>`: Introduces stress emphasis into the sentence flow.
- `<i>`: Denotes alternate voice, technical terms, or foreign language phrases.

### Accessible Navigation & Skip Links
The `<nav>` landmark wraps major navigation clusters. Placing links inside an unordered list `<ul>` informs assistive tools how many items the menu contains. Skip links (`<a href="#main-content">`) allow keyboard-only users to bypass repetitive navigation bars directly to the main body.""",
        'beginnerId': """### Analogi: Daftar Isi Buku & Rambu Jalan
1. **`<h1>`** adalah judul sampul buku. Tidak mungkin satu buku punya dua judul sampul yang berbeda.
2. **`<h2>`** adalah judul bab, sedangkan **`<h3>`** adalah sub-bab di dalam bab tersebut.
3. **`<nav>`** adalah papan petunjuk arah di stasiun kereta: mengumpulkan nama-nama peron tujuan agar penumpang tidak tersesat.
4. **`<strong>`** seperti mencetak tebal peringatan "DILARANG MEROKOK", sedangkan `<b>` seperti menebalkan kata kunci sekadar agar gampang dicari saat membuka kamus.""",
        'beginnerEn': """### Analogy: Table of Contents & Transit Signs
1. **`<h1>`** is the title on the book cover. A single book cannot have two different cover titles.
2. **`<h2>`** represents chapters, while **`<h3>`** represents sub-sections within those chapters.
3. **`<nav>`** is the primary terminal directional sign, organizing routes so travelers know where to turn.
4. **`<strong>`** is like a bold hazard warning: "HIGH VOLTAGE", while `<b>` is merely highlighting a glossary term for quick scanning.""",
        'experimentsId': [
            'Gunakan tombol TAB pada keyboard untuk berpindah dari satu tautan ke tautan berikutnya, dan perhatikan urutan fokus alami browser.',
            'Coba klik tautan skip-link "#konten-utama" dan amati bagaimana browser menggulir layar langsung ke elemen target.',
            'Hapus atribut aria-current="page" lalu pasang di halaman yang salah, dan renungkan bagaimana pengguna tunanetra bisa keliru memahami lokasi halaman saat ini.',
            'Ganti tag <h1> kedua yang sengaja ditambahkan menjadi <h2>, dan periksa peningkatan skor validitas heading di extension Lighthouse.',
        ],
        'experimentsEn': [
            'Press the TAB key to navigate through links sequentially and observe native browser focus order.',
            'Click the "#main-content" skip link and observe the viewport automatically scrolling to the target anchor.',
            'Move aria-current="page" to the wrong link and note how screen readers would announce the wrong active page.',
            'Convert a duplicate <h1> into an <h2> and inspect the heading structure improvement in accessibility audits.',
        ],
        'challengeId': 'Buat halaman navigasi dokumentasi teknis bertema "Panduan Arsitektur Cloud". Susun satu <h1>, minimal tiga <h2> (Masing-masing memiliki sub-bab <h3>), daftar berurutan untuk alur instalasi, serta menu navigasi lengkap dengan atribut `aria-current="page"` dan skip-link.',
        'challengeEn': 'Build a technical documentation guide page entitled "Cloud Architecture Manual". Structure one <h1>, at least three <h2> sections with <h3> subtopics, an ordered list for deployment steps, and an accessible navigation menu with `aria-current="page"` and a skip link.',
        'summaryId': 'Kamu telah menguasai penataan hierarki heading standar industri, pemisahan arti teks semantik, dan navigasi ramah pembaca layar. Minggu depan kita akan mempelajari penanganan media responsif dan optimalisasi aset visual.',
        'summaryEn': 'You have mastered heading outlines, semantic text distinctions, and screen-reader accessible navigation. Next week, we dive into responsive media delivery and asset optimization.',
    },
    {
        'week': 3,
        'level': 'beginer',
        'topicId': 'media-dan-gambar-responsif',
        'titleId': 'Media Responsif: Elemen Picture, Gambar Srcset & Multimedia',
        'titleEn': 'Responsive Media: Picture Element, Srcset Images & Multimedia',
        'programId': 'Penyajian Gambar Adaptif & Audio-Video HTML5 Native',
        'programEn': 'Adaptive Image Delivery & Native HTML5 Audio-Video',
        'levelNameId': 'Struktur & Semantik Web',
        'levelNameEn': 'Structure & Web Semantics',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aset Multimedia — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Pusat Dokumentasi Media & Galeri Infrastruktur</h1>

      <section>
        <h2>1. Server Data Center Utama (Format Gambar Modern)</h2>
        <p>Arsitektur penyajian gambar multi-resolusi untuk menghemat bandwidth seluler:</p>

        <!-- Elemen picture untuk art direction dan format next-gen -->
        <picture>
          <source media="(min-width: 1024px)" srcset="datacenter-large.webp" type="image/webp">
          <source media="(min-width: 640px)" srcset="datacenter-medium.webp" type="image/webp">
          <source srcset="datacenter-small.webp" type="image/webp">
          <img src="datacenter-fallback.jpg" 
               alt="Rak server enterprise Nusa Digital dengan indikator LED aktif di ruang kontrol berpendingin presisi"
               width="800" 
               height="450" 
               loading="lazy" 
               decoding="async">
        </picture>
        <p><small>Gambar di atas otomatis menyajikan WebP untuk browser modern dan fallback JPEG untuk kompatibilitas lama.</small></p>
      </section>

      <section>
        <h2>2. Video Pengenalan Fasilitas</h2>
        <video controls width="640" height="360" poster="video-cover.jpg" preload="metadata">
          <source src="nusa-overview.mp4" type="video/mp4">
          <source src="nusa-overview.webm" type="video/webm">
          <track kind="subtitles" src="subtitles-id.vtt" srclang="id" label="Bahasa Indonesia" default>
          <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English">
          Browser Anda tidak mendukung pemutaran video HTML5 native.
        </video>
      </section>

      <section>
        <h2>3. Podcast Rekayasa Perangkat Lunak</h2>
        <audio controls preload="none">
          <source src="episode-01.mp3" type="audio/mpeg">
          <source src="episode-01.ogg" type="audio/ogg">
          Browser Anda tidak mendukung elemen audio HTML5.
        </audio>
      </section>
    </article>
  </main>
</body>
</html>""",
        'objectivesId': [
            'Menulis tag <img> dengan atribut wajib alt yang deskriptif dan informatif',
            'Mencegah Cumulative Layout Shift (CLS) dengan selalu menyertakan atribut width dan height',
            'Menggunakan elemen <picture> beserta tag <source> untuk penyajian format WebP/AVIF modern',
            'Mengaktifkan pemuatan bertahap native dengan loading="lazy" dan decoding="async"',
            'Menyematkan media <video> dan <audio> native lengkap dengan fallback dan subtitle WebVTT (<track>)',
        ],
        'objectivesEn': [
            'Write accessible <img> tags with informative, descriptive alt text',
            'Prevent Cumulative Layout Shift (CLS) by always supplying explicit width and height dimensions',
            'Employ the <picture> element and <source> tags to deliver next-gen WebP/AVIF formats',
            'Leverage native deferred asset loading via loading="lazy" and decoding="async"',
            'Embed accessible native <video> and <audio> players complete with WebVTT subtitle tracks (<track>)',
        ],
        'explanationId': """### Atribut Alt dan Pencegahan CLS
Atribut `alt` sangat krusial: jika gambar gagal dimuat atau dibaca oleh tuna netra, teks ini menjelaskan konteks visual gambar. Atribut `width` dan `height` memberitahu browser aspek rasio gambar sebelum file selesai diunduh, mencegah lonjakan layout mendadak (*Cumulative Layout Shift*).

### Elemen <picture> vs <img> dengan srcset
Elemen `<picture>` memberikan kendali penuh kepada developer (*Art Direction* dan format negosiasi):
- Tag `<source type="image/webp">` menyajikan format modern berukuran lebih kecil.
- Tag `<img src="...">` di bagian paling bawah berfungsi sebagai *fallback* mutlak untuk browser lawas.

### Native Lazy Loading
Menambahkan `loading="lazy"` menginstruksikan browser untuk menunda pengunduhan gambar di luar layar (*below the fold*) sampai pengguna mendekati posisi scroll gambar tersebut, menghemat memori dan mempercepat waktu muat awal halaman.

### Aksesibilitas Multimedia (<track>)
Tag `<track kind="subtitles">` menyertakan file WebVTT (.vtt) agar dialog video dapat dibaca oleh penyandang tunarungu atau pengguna di lingkungan bising tanpa suara.""",
        'explanationEn': """### The Alt Attribute and Preventing CLS
The `alt` attribute conveys image intent when visuals fail to load or are spoken by screen readers. Explicit `width` and `height` attributes allow browsers to calculate aspect ratio placeholders beforehand, preventing Cumulative Layout Shift (CLS).

### The <picture> Element vs Img Srcset
`<picture>` gives developers granular control over format selection and art direction:
- `<source type="image/webp">` delivers compressed next-gen image assets to modern clients.
- The concluding `<img>` tag acts as the mandatory fallback container.

### Native Lazy Loading
The `loading="lazy"` attribute defers image network requests until the user scrolls within proximity of the asset, significantly speeding up initial page load.

### Multimedia Inclusivity with <track>
The `<track kind="subtitles">` element links WebVTT text files, providing synchronous captioning for deaf and hard-of-hearing users or silent viewing contexts.""",
        'beginnerId': """### Analogi: Pelayan Restoran dan Ukuran Meja
1. **`width` & `height` pada gambar** seperti menelepon restoran memesan meja: "Saya datang 4 orang". Pelayan langsung menyisihkan meja berkapasitas 4 orang. Tanpa reservasi ukuran, piring makanan datang tiba-tiba dan meja harus digeser dadakan (itulah yang disebut CLS).
2. **`<picture>`** seperti menu restoran bilingual: pelayan melihat tamu, jika tamu berbahasa Indonesia disodorkan buku menu bahasa Indonesia, jika turis disodorkan bahasa Inggris.
3. **`<track>` subtitle** seperti teks terjemahan di bioskop saat film asing ditayangkan.""",
        'beginnerEn': """### Analogy: Restaurant Table Reservations
1. **`width` & `height` dimensions** are like reserving a restaurant table in advance: the staff reserves the exact footprint before you arrive. Without dimensions, food arrives unexpectedly and tables must be shifted abruptly (which is Cumulative Layout Shift).
2. **`<picture>`** is like presenting custom menus depending on the guest's language preference.
3. **`<track>` subtitles** are the synchronized subtitles projected during international film screenings.""",
        'experimentsId': [
            'Sengaja rusak nama file gambar di atribut src dan periksa teks alternatif apa yang ditampilkan di layar pengganti.',
            'Hapus atribut width dan height pada koneksi internet lambat (DevTools Slow 3G) lalu amati bagaimana teks di bawah gambar melompat turun saat gambar selesai dimuat.',
            'Coba buka video tanpa tag <track> dan amati ketiadaan tombol closed-caption (CC) pada pemutar video native browser.',
            'Ubah preload="none" menjadi preload="auto" pada elemen audio dan amati aktivitas tab Network browser saat halaman pertama kali dibuka.',
        ],
        'experimentsEn': [
            'Break the image URL intentionally and inspect how the browser falls back to the descriptive alt string.',
            'Remove width and height attributes under throttled network conditions (DevTools Slow 3G) and watch surrounding layout jump.',
            'Inspect native video controls with and without the <track> element to verify the emergence of the CC button.',
            'Toggle preload="none" to preload="auto" on the audio element and observe network payloads in the DevTools Network panel.',
        ],
        'challengeId': 'Bangun modul galeri produk untuk "Toko Jam Tangan Mahakarya". Gunakan elemen `<picture>` dengan 3 variasi ukuran sumber gambar (mobile, tablet, desktop) dan WebP, sertakan width/height, pemuatan `loading="lazy"`, serta pemutar video review produk lengkap dengan 1 trek subtitle WebVTT bahasa Indonesia.',
        'challengeEn': 'Build a product showcase card for "Artisan Watchmakers". Use `<picture>` with 3 media-query breakpoints and WebP sources, include explicit width/height, `loading="lazy"`, and a product review video equipped with a WebVTT subtitle track.',
        'summaryId': 'Kamu telah menguasai optimasi gambar adaptif, pencegahan pergeseran tata letak (CLS), dan implementasi media audio-video aksesibel. Minggu depan kita akan mempelajari penyajian data tabular yang terstruktur.',
        'summaryEn': 'You have mastered adaptive image optimization, layout shift elimination, and accessible multimedia embedding. Next week, we examine structured tabular data presentation.',
    },
    {
        'week': 4,
        'level': 'beginer',
        'topicId': 'tabel-data-terstruktur',
        'titleId': 'Tabel Data Terstruktur: Thead, Tbody, Scope & Keterangan Aksesibel',
        'titleEn': 'Structured Data Tables: Thead, Tbody, Scope & Captioning',
        'programId': 'Penyajian Tabel Laporan Keuangan Semantik',
        'programEn': 'Semantic Financial Statement Data Table',
        'levelNameId': 'Struktur & Semantik Web',
        'levelNameEn': 'Structure & Web Semantics',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Kinerja Keuangan — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Transparansi Kinerja Keuangan Perusahaan</h1>
      <p>Data audit keuangan tahun berjalan yang telah diverifikasi oleh akuntan publik independen.</p>

      <table border="1">
        <caption>Laporan Pendapatan dan Alokasi Biaya Infrastruktur (Q1 - Q4 2025)</caption>
        <thead>
          <tr>
            <th scope="col">Kuartal</th>
            <th scope="col">Pendapatan Bruto (Miliar IDR)</th>
            <th scope="col">Biaya Cloud (Miliar IDR)</th>
            <th scope="col">Laba Operasional (Miliar IDR)</th>
            <th scope="col">Status Audit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Q1 2025</th>
            <td>12.4</td>
            <td>3.1</td>
            <td>9.3</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q2 2025</th>
            <td>14.8</td>
            <td>3.4</td>
            <td>11.4</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q3 2025</th>
            <td>16.2</td>
            <td>3.8</td>
            <td>12.4</td>
            <td>Selesai</td>
          </tr>
          <tr>
            <th scope="row">Q4 2025</th>
            <td>19.5</td>
            <td>4.2</td>
            <td>15.3</td>
            <td>Dalam Proses</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total Akumulasi</th>
            <td>62.9</td>
            <td>14.5</td>
            <td>48.4</td>
            <td>Konsolidasi</td>
          </tr>
        </tfoot>
      </table>
    </article>
  </main>
</body>
</html>""",
        'objectivesId': [
            'Memahami bahwa elemen <table> hanya boleh digunakan untuk data tabular, bukan untuk layout tampilan',
            'Menyediakan judul dan konteks tabel menggunakan elemen <caption>',
            'Menyusun pemisahan struktural data: <thead>, <tbody>, dan <tfoot>',
            'Menghubungkan sel header dengan sel data menggunakan atribut scope="col" dan scope="row"',
            'Memahami teknik penggabungan sel baris dan kolom dengan colspan dan rowspan secara tepat',
        ],
        'objectivesEn': [
            'Recognize that <table> is reserved strictly for tabular relationships, never for layout positioning',
            'Provide accessible context and titles using the <caption> element',
            'Organize tabular data into structural partitions: <thead>, <tbody>, and <tfoot>',
            'Associate header cells with corresponding data points using scope="col" and scope="row"',
            'Properly span cells across dimensions using colspan and rowspan without breaking grid geometry',
        ],
        'explanationId': """### Etika Penggunaan Tabel
Tabel HTML diciptakan khusus untuk menyajikan **data relasional dua dimensi** (angka, metrik, daftar spesifikasi). Menggunakan tabel untuk mengatur tata letak halaman web adalah praktik usang yang merusak aksesibilitas bagi pengguna alat bantu pembaca layar.

### Anatomi Lengkap Tabel Semantik
- `<caption>`: Judul atau ringkasan penjelasan tabel yang pertama kali dibacakan oleh pembaca layar.
- `<thead>`: Membungkus baris-baris header kolom utama.
- `<tbody>`: Memuat kumpulan baris data sebenarnya.
- `<tfoot>`: Bagian penutup untuk data rangkuman, seperti baris total atau catatan agregat.

### Atribut Scope
Atribut `scope` pada elemen `<th>` sangat penting:
- `scope="col"`: Menyatakan bahwa sel ini adalah header untuk seluruh kolom di bawahnya.
- `scope="row"`: Menyatakan bahwa sel ini adalah header untuk seluruh sel di baris horizontal tersebut.
Dengan adanya `scope`, pembaca layar akan menyebutkan: *"Kuartal Q1 2025, Pendapatan Bruto: 12.4 Miliar IDR"* saat pengguna menjelajah sel demi sel.""",
        'explanationEn': """### Tabular Data Principles
HTML tables exist strictly to represent two-dimensional relational datasets (metrics, schedules, financial figures). Using tables for layout purposes is an anti-pattern that severely degrades screen reader usability.

### Semantic Table Anatomy
- `<caption>`: Provides an accessible heading and overview of the dataset.
- `<thead>`: Encapsulates primary column header rows.
- `<tbody>`: Houses the primary relational data payload.
- `<tfoot>`: Wraps summary totals and aggregated statistics.

### The Scope Attribute
The `scope` attribute on `<th>` elements disambiguates directional association:
- `scope="col"`: Clarifies header ownership over all cells in that vertical column.
- `scope="row"`: Clarifies header ownership over cells along that horizontal row.
Assistive devices can thus speak contextual pairs like: *"Quarter Q1 2025, Cloud Cost: 3.1 Billion IDR"* when navigating cell coordinates.""",
        'beginnerId': """### Analogi: Spreadsheet Excel Resmi
Bayangkan tabel HTML persis seperti lembar kerja Microsoft Excel:
1. **`<caption>`** adalah nama lembar kerja di bagian atas: "Laporan Anggaran 2026".
2. **`<thead>`** adalah baris paling atas yang diwarnai biru gelap berisi nama kolom (No, Nama Barang, Harga).
3. **`scope="col"`** memberi tahu komputer: "Semua angka di kolom B adalah harga uang rupiah".
4. **`scope="row"`** memberi tahu komputer: "Baris ini semuanya berkaitan dengan transaksi Laptop Dell".
5. **`<tfoot>`** adalah baris paling bawah tempat rumus `=SUM()` menjumlahkan total belanja.""",
        'beginnerEn': """### Analogy: An Audited Excel Spreadsheet
Think of an HTML table as a clean Microsoft Excel worksheet:
1. **`<caption>`** is the sheet title at the top: "Annual Budget 2026".
2. **`<thead>`** is the highlighted top header row defining columns (Item, Unit Cost, Qty).
3. **`scope="col"`** tells the machine that every cell descending below is a financial dollar value.
4. **`scope="row"`** identifies the primary entity of that row (e.g. "Dell Workstation 15").
5. **`<tfoot>`** is the bottom summary row holding your `=SUM()` totals.""",
        'experimentsId': [
            'Hapus elemen <caption> dan perhatikan bagaimana tabel kehilangan pengenal judul resminya.',
            'Tambahkan atribut colspan="2" pada salah satu sel <td> dan amati bagaimana sel di sebelahnya terdorong keluar dari batas tabel jika jumlah sel tidak disesuaikan.',
            'Uji membaca baris tfoot tanpa tbody, dan amati apakah browser tetap merender tfoot di posisi paling bawah tabel secara konsisten.',
            'Ubah elemen <th> menjadi <td> biasa di thead dan periksa bagaimana teks kehilangan ketebalan huruf bawaan dan nilai semantik headernya.',
        ],
        'experimentsEn': [
            'Remove the <caption> element and observe how the table loses its formal descriptive identity.',
            'Apply colspan="2" to a cell and verify how neighboring cells overflow if total grid coordinates are mismatched.',
            'Inspect table rendering with tfoot declared before tbody to confirm how modern browsers still place it visually at the bottom.',
            'Demote <th> elements to ordinary <td> tags and note the loss of both default styling and accessibility roles.',
        ],
        'challengeId': 'Buat tabel jadwal penerbangan bandara internasional: sertakan `<caption>`, `<thead>` dengan `scope="col"`, minimal 4 baris jadwal di `<tbody>` dengan `scope="row"` untuk nomor penerbangan, kolom kota tujuan, maskapai, jam keberangkatan, dan status (Tepat Waktu / Terlambat).',
        'challengeEn': 'Build an airport flight departure board table: include a `<caption>`, `<thead>` with `scope="col"`, at least 4 flight records in `<tbody>` with `scope="row"` identifying flight numbers, destinations, airlines, departure times, and flight statuses.',
        'summaryId': 'Kamu telah menguasai perancangan tabel data relasional yang semantik dan ramah aksesibilitas. Minggu depan kita memasuki Level 2: formulir modern, validasi browser, dan kontrol interaktif.',
        'summaryEn': 'You have mastered semantic, accessible relational table authoring. Next week we enter Level 2: modern interactive forms, browser validation, and user inputs.',
    },

    # Level 2: Formulir Modern, Aksesibilitas & Web API (Weeks 5-8)
    {
        'week': 5,
        'level': 'advanced',
        'topicId': 'formulir-modern-dan-validasi',
        'titleId': 'Formulir Modern: Input Types, Labeling & Validasi Bawaan',
        'titleEn': 'Modern Forms: Input Types, Labeling & Native Validation',
        'programId': 'Formulir Registrasi Klien Enterprise dengan Validasi Native',
        'programEn': 'Enterprise Client Onboarding Form with Native Constraints',
        'levelNameId': 'Formulir Modern, Aksesibilitas & Web API',
        'levelNameEn': 'Modern Forms, Accessibility & Web APIs',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registrasi Rekanan Bisnis — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Pendaftaran Rekanan Bisnis Enterprise</h1>
      <p>Silakan isi formulir di bawah ini. Tanda bintang (<span aria-hidden="true">*</span>) menandakan kolom wajib.</p>

      <form action="/api/v1/partners" method="POST" novalidate>
        <fieldset>
          <legend>Informasi Perusahaan</legend>

          <p>
            <label for="company-name">Nama Legal Perusahaan: <span aria-hidden="true">*</span></label><br>
            <input type="text" id="company-name" name="companyName" required minlength="3" maxlength="100" placeholder="PT Contoh Teknologi Nusantara" autocomplete="organization">
          </p>

          <p>
            <label for="work-email">Alamat Email Resmi Perusahaan: <span aria-hidden="true">*</span></label><br>
            <input type="email" id="work-email" name="workEmail" required placeholder="admin@perusahaan.co.id" autocomplete="email">
          </p>

          <p>
            <label for="tax-id">Nomor Pokok Wajib Pajak (16 Digit Angka): <span aria-hidden="true">*</span></label><br>
            <input type="text" id="tax-id" name="taxId" required pattern="\\d{16}" title="NPWP harus terdiri dari tepat 16 digit angka tanpa spasi atau tanda titik." placeholder="1234567890123456" inputmode="numeric">
          </p>
        </fieldset>

        <fieldset>
          <legend>Kebutuhan Layanan & Skala Tim</legend>

          <p>
            <label for="team-size">Jumlah Pengguna Sistem:</label><br>
            <input type="number" id="team-size" name="teamSize" min="1" max="10000" value="10">
          </p>

          <p>
            <label for="target-date">Target Tanggal Peluncuran Sistem:</label><br>
            <input type="date" id="target-date" name="targetDate" min="2026-01-01">
          </p>

          <p>
            <label for="service-tier">Paket Layanan Prioritas:</label><br>
            <select id="service-tier" name="serviceTier" required>
              <option value="">-- Pilih Paket Layanan --</option>
              <option value="standard">Standard Cloud Instance</option>
              <option value="enterprise" selected>Enterprise Dedicated Cluster</option>
              <option value="custom">Bespoke Hybrid Architecture</option>
            </select>
          </p>

          <p>
            <label for="notes">Catatan Spesifikasi Tambahan:</label><br>
            <textarea id="notes" name="notes" rows="4" cols="50" placeholder="Tuliskan kebutuhan khusus infrastruktur Anda..."></textarea>
          </p>

          <p>
            <input type="checkbox" id="terms" name="agreeTerms" required>
            <label for="terms">Saya menyetujui Perjanjian Kerahasiaan (NDA) dan Kebijakan Privasi Data.</label>
          </p>
        </fieldset>

        <p>
          <button type="submit">Kirim Berkas Pendaftaran</button>
          <button type="reset">Bersihkan Formulir</button>
        </p>
      </form>
    </article>
  </main>
</body>
</html>""",
        'objectivesId': [
            'Menghubungkan elemen <label> dengan <input> menggunakan atribut for dan id yang identik',
            'Mengelompokkan input terkait menggunakan <fieldset> dan memberi judul kelompok dengan <legend>',
            'Memanfaatkan input spesifik HTML5: type="email", type="number", type="date", dan inputmode',
            'Menerapkan constraint validation bawaan browser: required, minlength, pattern (RegEx), min, dan max',
            'Memahami fungsi autocomplete untuk mempercepat pengisian otomatis data pengguna oleh browser',
        ],
        'objectivesEn': [
            'Explicitly pair <label> and <input> controls using matching for and id attributes',
            'Group related input clusters cleanly using <fieldset> and titled by <legend>',
            'Leverage rich HTML5 input specialized types: email, number, date, and inputmode',
            'Enforce native browser constraint validation: required, minlength, pattern (RegEx), min, and max',
            'Implement autocomplete attributes to optimize user experience during autofill operations',
        ],
        'explanationId': """### Pasangan Wajib: Label dan ID
Jangan pernah membuat kolom input tanpa elemen `<label>`. Menghubungkan `<label for="email">` dengan `<input id="email">` memberikan dua manfaat utama:
1. Ketika pengguna mengeklik teks label, fokus kursor otomatis berpindah ke kotak input.
2. Pengguna teknologi pembaca layar mendengar instruksi nama kolom dengan jelas.

### Pengelompokan Fieldset dan Legend
Tag `<fieldset>` menciptakan batas logis antara bagian formulir (misalnya "Informasi Pribadi" vs "Detail Pembayaran"), sedangkan `<legend>` adalah judul batas tersebut yang dibacakan oleh screen reader setiap kali pengguna masuk ke dalam kelompok tersebut.

### Validasi Bawaan (Constraint Validation)
Browser modern dapat memvalidasi input tanpa bantuan JavaScript:
- `required`: Memastikan kolom tidak boleh kosong saat dikirim.
- `pattern="\\d{16}"`: Memvalidasi format string menggunakan Regular Expression (misal: tepat 16 angka).
- `min` dan `max`: Menentukan batas angka terendah dan tertinggi pada `type="number"`.
- `inputmode="numeric"`: Membuka keyboard virtual numerik di perangkat smartphone.""",
        'explanationEn': """### Mandatory Pairing: Label and ID
Never render form fields without an explicit `<label>`. Associating `<label for="email">` with `<input id="email">` achieves two critical UX goals:
1. Clicking the text label focuses the designated input field immediately.
2. Assistive screen readers announce the exact field prompt upon entry.

### Fieldset & Legend Grouping
The `<fieldset>` element establishes logical enclosures between distinct form sections (e.g. "Identity" vs "Billing"), while `<legend>` provides the header read aloud whenever focus enters that subset.

### Native Constraint Validation
Modern browsers enforce validation rules without client-side JavaScript overhead:
- `required`: Blocks submission if the control is empty.
- `pattern="\\d{16}"`: Enforces exact Regular Expression matching rules (e.g. exactly 16 digits).
- `min` & `max`: Constrains boundaries on numeric and calendar controls.
- `inputmode="numeric"`: Triggers virtual numeric keyboards on mobile devices.""",
        'beginnerId': """### Analogi: Formulir Paspor di Kantor Imigrasi
1. **`<label>`** adalah tulisan cetak tebal di formulir: "NAMA LENGKAP SESUAI KTP". Tanpa label, Anda hanya melihat kotak putih kosong dan bingung mau diisi apa.
2. **`id` dan `for`** adalah garis penghubung tak terlihat antara tulisan label dan kotaknya.
3. **`<fieldset>`** adalah bingkai kotak besar bertuliskan "BAGIAN II: RIWAYAT PERJALANAN".
4. **`required`** seperti petugas imigrasi yang langsung mengembalikan berkas Anda jika ada kolom bertanda bintang yang belum ditandatangani.""",
        'beginnerEn': """### Analogy: A Passport Application Office
1. **`<label>`** is the printed instruction on the form: "LEGAL FULL NAME". Without labels, users face ambiguous blank boxes.
2. **`id` and `for`** create the invisible binding wire connecting the prompt to the physical box.
3. **`<fieldset>`** is the bordered grouping labeled "SECTION II: TRAVEL HISTORY".
4. **`required`** is the border officer returning your paperwork immediately if a mandatory starred line was left empty.""",
        'experimentsId': [
            'Hapus atribut for pada label, klik teks label di browser, dan perhatikan bahwa kursor input tidak lagi aktif secara otomatis.',
            'Coba kirim formulir tanpa mengisi kolom required dan perhatikan balon peringatan validasi bawaan browser yang muncul.',
            'Masukkan 15 digit angka ke dalam kolom NPWP dan amati bagaimana regex pattern="\\d{16}" menolak pengiriman data.',
            'Buka halaman ini di ponsel atau aktifkan responsive device mode di DevTools, klik input dengan inputmode="numeric" dan amati keyboard yang muncul.',
        ],
        'experimentsEn': [
            'Delete the for attribute on a label, click the text label in browser, and note the loss of automatic input focus.',
            'Attempt to submit the form without filling required inputs to witness native browser validation tooltip popups.',
            'Type 15 digits into the NPWP input and observe how the pattern="\\d{16}" constraint halts submission with a mismatch message.',
            'Open the page in DevTools mobile simulation mode and click the numeric input to verify that a numeric pad is invoked.',
        ],
        'challengeId': 'Bangun formulir "Pemesanan Tiket Pesawat": sertakan fieldset identitas penumpang (nama lengkap, paspor 8 karakter, email), fieldset rute penerbangan (kota asal, kota tujuan dengan `<select>`, tanggal berangkat `type="date"`), checkbox persetujuan bagasi, dan tombol submit.',
        'challengeEn': 'Build a "Flight Reservation Form": include an identity fieldset (full name, 8-character passport, email), a flight itinerary fieldset (origin, destination via `<select>`, departure `type="date"`), a baggage agreement checkbox, and a submit button.',
        'summaryId': 'Kamu telah menguasai perancangan formulir interaktif dengan pelabelan aksesibel dan validasi native tanpa JavaScript. Minggu depan kita akan mendalami standar aksesibilitas web internasional (WCAG 2.1 AA) dan atribut ARIA.',
        'summaryEn': 'You have mastered accessible interactive form design and client-side constraint validation. Next week, we dive into WCAG 2.1 AA accessibility standards and ARIA semantics.',
    },
    {
        'week': 6,
        'level': 'advanced',
        'topicId': 'aksesibilitas-wcag-dan-aria',
        'titleId': 'Aksesibilitas Web: Standar WCAG 2.1 AA, Landmark & Atribut ARIA',
        'titleEn': 'Web Accessibility: WCAG 2.1 AA Standards, Landmarks & ARIA',
        'programId': 'Antarmuka Portal Inklusif dengan Dukungan Screen Reader & Keyboard',
        'programEn': 'Inclusive Portal Interface with Screen Reader & Keyboard Support',
        'levelNameId': 'Formulir Modern, Aksesibilitas & Web API',
        'levelNameEn': 'Modern Forms, Accessibility & Web APIs',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Pengumuman Inklusif — Nusa Digital</title>
</head>
<body>
  <!-- Landmark Header -->
  <header role="banner">
    <p>Nusa Digital Accessibility Hub</p>
    <nav aria-label="Navigasi Utama">
      <ul>
        <li><a href="#pengumuman">Pengumuman</a></li>
        <li><a href="#status-layanan">Status Layanan</a></li>
      </ul>
    </nav>
  </header>

  <!-- Landmark Main -->
  <main id="main-content" role="main">
    <article>
      <h1>Pusat Informasi & Status Operasional Sistem</h1>

      <!-- Alert Dinamis dengan ARIA live region -->
      <section id="pengumuman" aria-labelledby="heading-pengumuman">
        <h2 id="heading-pengumuman">Pemberitahuan Darurat</h2>
        
        <div role="alert" aria-live="assertive" aria-atomic="true">
          <p><strong>Pemberitahuan Sistem:</strong> Pemeliharaan terjadwal server pusat akan berlangsung pada hari Sabtu pukul 01.00 WIB. Layanan tetap dapat diakses melalui node replika.</p>
        </div>
      </section>

      <!-- Panel Status dengan Elemen Semantik & ARIA -->
      <section id="status-layanan" aria-labelledby="heading-status">
        <h2 id="heading-status">Kondisi Infrastruktur Real-Time</h2>

        <!-- Accordion murni HTML5 semantik tanpa JS -->
        <details>
          <summary>Klaster API Gateway Jakarta (Status: Normal)</summary>
          <p>Seluruh 12 instance aktif dengan utilisasi memori rata-rata 42% dan latensi 8ms.</p>
        </details>

        <details>
          <summary>Database Replika Singapura (Status: Normal)</summary>
          <p>Replikasi transaksi sinkron tanpa lag terdeteksi dalam 24 jam terakhir.</p>
        </details>

        <!-- Elemen interaktif dengan aria-describedby -->
        <p>
          <label for="search-log">Cari Log Insiden:</label><br>
          <input type="search" id="search-log" aria-describedby="search-hint">
          <span id="search-hint"><small>Masukkan kode insiden (contoh: INC-2026-09) atau kata kunci modul.</small></span>
        </p>
      </section>
    </article>
  </main>

  <!-- Landmark Footer -->
  <footer role="contentinfo">
    <p><small>Situs ini dirancang mematuhi pedoman Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</small></p>
  </footer>
</body>
</html>""",
        'objectivesId': [
            'Memahami 4 pilar WCAG: Perceivable, Operable, Understandable, dan Robust (POUR)',
            'Menerapkan aturan emas pertama ARIA: gunakan elemen HTML semantik native terlebih dahulu sebelum ARIA',
            'Menghubungkan teks penjelasan tambahan menggunakan atribut aria-describedby dan aria-labelledby',
            'Menggunakan live regions (role="alert" dan aria-live="assertive") untuk pembaruan informasi dinamis',
            'Memastikan seluruh elemen interaktif dapat dioperasikan secara penuh hanya menggunakan keyboard',
        ],
        'objectivesEn': [
            'Master the four core principles of WCAG: Perceivable, Operable, Understandable, and Robust (POUR)',
            'Adhere to the First Rule of ARIA: Always prefer native semantic HTML elements over synthetic ARIA overrides',
            'Associate supplementary instructional copy using aria-describedby and aria-labelledby',
            'Implement dynamic live regions (role="alert" and aria-live="assertive") for critical notifications',
            'Ensure all interactive elements are fully operable via keyboard-only navigation',
        ],
        'explanationId': """### Prinsip Dasar WCAG (POUR)
Pedoman Aksesibilitas Konten Web berpusat pada 4 pilar:
1. **Perceivable (Dapat Dirasakan)**: Informasi dan komponen antarmuka harus dapat disajikan kepada pengguna dalam cara yang dapat mereka rasakan (ada teks alternatif untuk gambar, kontras warna cukup).
2. **Operable (Dapat Dioperasikan)**: Seluruh fungsi harus dapat dijalankan melalui keyboard tanpa perangkap fokus.
3. **Understandable (Dapat Dipahami)**: Konten teks mudah dibaca dan alur interaksi dapat diprediksi.
4. **Robust (Tangguh)**: Konten dapat diinterpretasikan secara andal oleh berbagai teknologi bantu (browser modern, screen reader).

### Aturan Pertama ARIA
*Accessible Rich Internet Applications (ARIA)* adalah jembatan untuk mendeskripsikan elemen interaktif yang kompleks. Aturan utamanya: **"Jika ada elemen HTML semantik bawaan yang tersedia (seperti `<button>`, `<details>`, `<nav>`), jangan pernah membuat elemen tiruan `<div role="button">`"**.

### Live Regions: Mengabarkan Perubahan Dinamis
Atribut `aria-live="polite"` atau `role="alert"` (setara `assertive`) memberitahu pembaca layar untuk langsung menyuarakan pesan penting yang muncul di layar tanpa menunggu pengguna mengarahkan kursor ke pesan tersebut.""",
        'explanationEn': """### The POUR Principles of WCAG
Global accessibility guidelines are built on four foundations:
1. **Perceivable**: Information must be presented in formats users can perceive (text alternatives, adequate contrast).
2. **Operable**: UI components must be fully navigable via keyboard alone without focus traps.
3. **Understandable**: Information and operation must be clear and predictable.
4. **Robust**: Content must parse reliably across user agents and assistive technologies.

### The First Rule of ARIA
ARIA provides synthetic attributes to enrich complex widgets. Its golden directive: **"If you can use a native HTML element with the semantics and behavior already built in, do not reinvent it using ARIA on neutral tags."**

### Live Regions for Dynamic Updates
Applying `aria-live="polite"` or `role="alert"` instructs assistive technologies to announce runtime UI shifts (such as toast notifications or stock tickers) asynchronously without demanding explicit navigation focus.""",
        'beginnerId': """### Analogi: Jalur Kursi Roda dan Lampu Lalu Lintas Bersuara
1. **Aksesibilitas Web** bukan fitur mewah untuk segelintir orang, melainkan fasilitas publik seperti rampa kursi roda di gedung kantor atau ubin pemandu tunanetra di trotoar.
2. **HTML Semantik** adalah jalan tol yang mulus bagi pengguna tunanetra yang mengandalkan suara komputer.
3. **`role="alert"`** seperti sirine ambulans: saat suara sirine berbunyi, orang langsung tahu ada hal darurat tanpa perlu turun memeriksa mobil ambulans tersebut.""",
        'beginnerEn': """### Analogy: Ramps and Audible Pedestrian Signals
1. **Web Accessibility** is not an edge-case luxury; it is the digital equivalent of wheelchair ramps, tactile sidewalks, and elevators in public transit.
2. **Semantic HTML** provides the clear pathway for blind users listening through speech synthesis software.
3. **`role="alert"`** is like an audible smoke alarm: the moment it triggers, everyone is immediately alerted without having to walk over and check the ceiling.""",
        'experimentsId': [
            'Nyalakan pembaca layar bawaan (Windows Narrator dengan Win + Ctrl + Enter, atau Mac VoiceOver dengan Cmd + F5) dan coba dengarkan bagaimana halaman ini dibacakan.',
            'Tutup mata Anda dan navigasikan halaman hanya menggunakan tombol TAB dan Enter untuk membuka elemen <details>.',
            'Ubah aria-live="assertive" menjadi aria-live="polite" dan pelajari perbedaan kecepatan interupsi pembaca layar.',
            'Hapus tag <label> pada input pencarian dan perhatikan pembaca layar yang hanya menyebutkan "Edit box" tanpa tahu nama kolomnya.',
        ],
        'experimentsEn': [
            'Activate your native OS screen reader (Windows Narrator via Win + Ctrl + Enter, or Mac VoiceOver via Cmd + F5) to experience auditory rendering.',
            'Close your eyes and navigate the page solely using TAB, Shift+TAB, and Enter/Space to expand the <details> accordion.',
            'Compare the announcement behavior of aria-live="polite" versus aria-live="assertive".',
            'Delete the <label> associated with the search input and observe the screen reader reporting an unlabelled generic text field.',
        ],
        'challengeId': 'Rancang kartu profil produk e-commerce yang sepenuhnya memenuhi standar aksesibilitas: tombol "Beli Sekarang", badge ketersediaan stok menggunakan `aria-live`, label diskon yang deskriptif, dan dialog syarat ketentuan menggunakan `<details>` semantik.',
        'challengeEn': 'Design an e-commerce product card adhering strictly to WCAG AA standards: a native "Buy Now" button, an in-stock indicator utilizing `aria-live`, an accessible promotional price badge, and a terms toggle via `<details>`.',
        'summaryId': 'Kamu telah menguasai standar aksesibilitas web internasional POUR, prinsip ARIA, dan pembuatan dokumen inklusif. Minggu depan kita akan mempelajari elemen modern HTML5 seperti dialog modal, template, dan canvas.',
        'summaryEn': 'You have mastered international POUR standards, ARIA best practices, and inclusive document authoring. Next week, we examine modern HTML5 features including dialog modals, templates, and canvas.',
    },
    {
        'week': 7,
        'level': 'advanced',
        'topicId': 'fitur-modern-html5-dan-apis',
        'titleId': 'Elemen Interaktif Modern: Dialog, Details, Template & Canvas',
        'titleEn': 'Modern Interactive Elements: Dialog, Details, Template & Canvas',
        'programId': 'Implementasi Komponen Modal Dialog Native & Kartu Interaktif',
        'programEn': 'Native Modal Dialog Implementation & Interactive Cards',
        'levelNameId': 'Formulir Modern, Aksesibilitas & Web API',
        'levelNameEn': 'Modern Forms, Accessibility & Web APIs',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Komponen Modern HTML5 — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Eksplorasi Komponen Native Modern HTML5</h1>
      <p>Fitur canggih yang kini didukung langsung oleh browser tanpa ketergantungan library eksternal.</p>

      <!-- 1. Native Modal Dialog -->
      <section>
        <h2>1. Modal Dialog Native (<dialog>)</h2>
        <p>Dialog modal native menangani fokus keyboard, tombol ESC, dan backdrop secara otomatis:</p>
        
        <button type="button" onclick="document.getElementById('confirm-modal').showModal()">
          Buka Dialog Konfirmasi
        </button>

        <dialog id="confirm-modal" aria-labelledby="modal-title">
          <form method="dialog">
            <h3 id="modal-title">Konfirmasi Deployment Produksi</h3>
            <p>Apakah Anda yakin ingin mempublikasikan rilis versi 2.4.0 ke klaster produksi utama?</p>
            <menu>
              <button value="cancel">Batal</button>
              <button value="confirm">Ya, Publikasikan Sekarang</button>
            </menu>
          </form>
        </dialog>
      </section>

      <!-- 2. Accordion Semantik dengan <details> dan <summary> -->
      <section>
        <h2>2. Tanya Jawab Interaktif (<details>)</h2>
        <details>
          <summary><strong>Berapa lama SLA penanganan insiden darurat?</strong></summary>
          <p>Tim On-Call Engineering kami menjamin tanggapan awal di bawah 15 menit untuk insiden berstatus Severity-1.</p>
        </details>
        <details>
          <summary><strong>Apakah data disimpan di yurisdiksi Indonesia?</strong></summary>
          <p>Ya, seluruh data tersimpan pada data center tier-4 bersertifikasi ISO di Jakarta dan Jawa Barat.</p>
        </details>
      </section>

      <!-- 3. Template HTML yang Tidak Langsung Dirender (<template>) -->
      <section>
        <h2>3. Cetak Biru Komponen (<template>)</h2>
        <p>Konten di dalam tag template tidak dirender saat halaman dimuat, siap dikloning oleh JavaScript:</p>
        
        <template id="card-template">
          <div class="user-card">
            <h4>Nama Pengguna</h4>
            <p>Peran: Teknisi Sistem</p>
          </div>
        </template>
        <p><small>Template di atas tersimpan aman di memori browser tanpa menampilkan artefak visual.</small></p>
      </section>

      <!-- 4. Bidang Gambar Bitmap Native (<canvas>) -->
      <section>
        <h2>4. Area Render Grafis (<canvas>)</h2>
        <canvas id="status-chart" width="400" height="150">
          Grafik batang visualisasi beban trafik server Nusa Digital berada pada kapasitas aman 35%.
        </canvas>
      </section>
    </article>
  </main>
</body>
</html>""",
        'objectivesId': [
            'Memanfaatkan elemen <dialog> native dengan method showModal() dan form method="dialog"',
            'Memahami penanganan fokus keyboard dan tombol ESC otomatis pada elemen <dialog>',
            'Membuat menu akordion murni tanpa JavaScript menggunakan pasangan <details> dan <summary>',
            'Memahami fungsi elemen <template> sebagai fragmen DOM pasif yang efisien untuk rendering dinamis',
            'Menyematkan elemen <canvas> dengan teks fallback aksesibel untuk rendering visual grafis 2D',
        ],
        'objectivesEn': [
            'Implement native <dialog> modals leveraging showModal() and form method="dialog"',
            'Appreciate automatic keyboard focus trapping and Escape key management inside <dialog>',
            'Build zero-JavaScript semantic accordion widgets using <details> and <summary>',
            'Understand the role of the <template> tag as an inert, reusable client-side DOM blueprint',
            'Embed `<canvas>` contexts accompanied by accessible fallback text for programmatic 2D graphics',
        ],
        'explanationId': """### Elemen Dialog Native (<dialog>)
Dahulu, pembuatan modal popup membutuhkan ratusan baris library JavaScript rumit untuk mengatur fokus tabulasi dan backdrop overlay. Elemen `<dialog>` menyelesaikan masalah ini secara native:
- Memanggil `dialog.showModal()` membuka dialog sebagai modal tingkat atas (*top layer*) lengkap dengan elemen `::backdrop`.
- Tombol `ESC` otomatis menutup dialog modal.
- Form dengan `method="dialog"` menutup modal secara otomatis saat tombol diklik dan mengembalikan nilai tombol tersebut.

### Pasangan <details> dan <summary>
Elemen `<details>` menyediakan interaktivitas buka-tutup bawaan. Tag `<summary>` bertindak sebagai tombol pembuka yang dapat diakses penuh melalui tombol spasi/enter keyboard. Atribut `open` dapat disematkan jika ingin konten terbuka secara default saat halaman dimuat.

### Elemen <template>
Isi di dalam `<template>` sepenuhnya *inert* (pasif): gambar di dalamnya tidak akan diunduh dan script tidak akan dieksekusi sampai elemen tersebut dikloning ke dalam dokumen aktif oleh JavaScript.""",
        'explanationEn': """### The Native Dialog Element (<dialog>)
Previously, accessible modal dialogs demanded heavy JavaScript plugins to manage backdrop overlays and keyboard traps. The native `<dialog>` element solves this at the browser engine level:
- Calling `dialog.showModal()` opens the modal in the browser's top layer with a native `::backdrop`.
- Pressing `Escape` automatically dismisses the modal.
- Nesting a `<form method="dialog">` closes the dialog upon button submission while exposing the clicked button value.

### Semantic Disclosures via <details> and <summary>
`<details>` delivers built-in expand-collapse widgets without script dependencies. The `<summary>` tag serves as the accessible focusable trigger responsive to Space and Enter keys. Adding the `open` attribute expands the disclosure by default.

### The Client-Side <template> Tag
Content enclosed within `<template>` remains inert: images do not trigger HTTP requests and scripts do not evaluate until explicitly cloned into the active DOM tree.""",
        'beginnerId': """### Analogi: Panggung Teater dan Ruang Ganti
1. **`<dialog>`** seperti aktor yang melangkah maju ke depan panggung dengan lampu sorot: seluruh panggung di belakangnya otomatis gelap (*backdrop*) dan perhatian penonton hanya tertuju pada sang aktor sampai adegan selesai.
2. **`<details>`** seperti laci meja kantor: Anda bisa menariknya untuk melihat isi di dalam, lalu mendorongnya kembali agar meja tetap rapi.
3. **`<template>`** seperti cetakan kue di lemari dapur: cetakannya sendiri bukan makanan, tapi alat untuk mencetak kue sebanyak yang diinginkan saat pesta dimulai.""",
        'beginnerEn': """### Analogy: Theater Spotlights and Kitchen Cutters
1. **`<dialog>`** is like an actor stepping into a theatrical spotlight: the rest of the stage dims (`::backdrop`) and the audience's attention is focused entirely on them until the dialogue completes.
2. **`<details>`** is an office drawer: you slide it open to inspect documents, then slide it shut to keep the desk clean.
3. **`<template>`** is a cookie cutter stored in the pantry: the mold itself is not edible food, but a blueprint ready to stamp out fresh cookies on demand.""",
        'experimentsId': [
            'Klik tombol "Buka Dialog Konfirmasi", lalu tekan tombol Escape pada keyboard untuk melihat penutupan modal otomatis tanpa sebaris pun kode JS penutup.',
            'Tambahkan atribut open pada elemen <details> dan amati bagaimana akordion langsung terbuka saat halaman pertama kali dimuat.',
            'Coba periksa elemen <template> di panel Developer Tools Elements dan perhatikan bagaimana kontennya disimpan dalam fragmen #document-fragment.',
            'Gunakan tombol TAB saat modal terbuka untuk memverifikasi bahwa kursor fokus terkunci rapi di dalam dialog (Focus Trap native).',
        ],
        'experimentsEn': [
            'Trigger the confirmation modal, then hit Escape on your physical keyboard to observe native dismissal without close handlers.',
            'Add the open attribute to <details> to verify that the disclosure renders expanded on initial load.',
            'Inspect the <template> element in DevTools to see its contents isolated cleanly inside a #document-fragment.',
            'Tab through controls while the modal is open to confirm that native focus trapping prevents leakage into the background page.',
        ],
        'challengeId': 'Buat halaman galeri fitur produk yang memiliki tombol "Kebijakan Garansi" pembuka `<dialog>` modal, akordion spesifikasi teknis menggunakan `<details>`, dan elemen `<canvas>` status baterai perangkat dengan teks deskripsi fallback.',
        'challengeEn': 'Build a product warranty page featuring a button that triggers a native `<dialog>` terms modal, technical specifications bundled inside `<details>`, and a `<canvas>` battery visual with an accessible text fallback description.',
        'summaryId': 'Kamu telah menguasai fitur-fitur mutakhir HTML5 native seperti dialog top-layer, widget details, dan template memori. Minggu depan adalah proyek capstone: membangun portal produk multi-halaman berkinerja tinggi dan 100% lulus audit aksesibilitas!',
        'summaryEn': 'You have mastered bleeding-edge native HTML5 capabilities including top-layer dialogs, disclosures, and inert templates. Next week is the capstone project: building a production multi-page portal passing 100% of accessibility audits!',
    },
    {
        'week': 8,
        'level': 'advanced',
        'topicId': 'proyek-akhir-portal-perusahaan-lengkap',
        'titleId': 'Proyek Akhir: Portal Korporat Aksesibel, Semantik & Siap Produksi',
        'titleEn': 'Capstone Project: Production-Ready, Accessible Semantic Corporate Portal',
        'programId': 'Aplikasi Portal Web Korporat Multi-Halaman Lengkap',
        'programEn': 'Comprehensive Multi-Page Corporate Portal Web Application',
        'levelNameId': 'Formulir Modern, Aksesibilitas & Web API',
        'levelNameEn': 'Modern Forms, Accessibility & Web APIs',
        'language': 'html',
        'code': """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portal resmi PT Nusantara Cloud Solusindo — Penyedia infrastruktur cloud berkinerja tinggi, bersertifikasi ISO 27001, dan kepatuhan data nasional.">
  <meta property="og:title" content="Nusantara Cloud Solusindo — Infrastruktur Cloud Andal">
  <meta property="og:description" content="Solusi server komputasi enterprise, database terdistribusi, dan keamanan siber berstandar internasional.">
  <meta property="og:type" content="website">
  <title>Nusantara Cloud — Infrastruktur Digital Indonesia</title>
</head>
<body>
  <!-- Aksesibilitas: Tautan Lompat ke Konten Utama -->
  <a href="#main-content">Lewati ke konten utama</a>

  <!-- Header Landmark & Navigasi -->
  <header>
    <div>
      <p><strong>Nusantara Cloud Solusindo</strong></p>
      <nav aria-label="Navigasi Utama Situs">
        <ul>
          <li><a href="index.html" aria-current="page">Beranda</a></li>
          <li><a href="#layanan">Layanan</a></li>
          <li><a href="#performa">Performa & Metrik</a></li>
          <li><a href="#kontak">Konsultasi</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- Konten Utama Halaman -->
  <main id="main-content">
    <article>
      <header>
        <h1>Infrastruktur Komputasi Cloud Skala Enterprise Indonesia</h1>
        <p>Menghadirkan komputasi awan lokal dengan kedaulatan data penuh, latensi di bawah 10ms, dan ketersediaan tinggi 99.99%.</p>
      </header>

      <!-- Bagian 1: Layanan Unggulan -->
      <section id="layanan" aria-labelledby="heading-layanan">
        <h2 id="heading-layanan">Tiga Pilar Layanan Utama</h2>

        <figure>
          <picture>
            <source media="(min-width: 768px)" srcset="cloud-datacenter-large.webp" type="image/webp">
            <source srcset="cloud-datacenter-small.webp" type="image/webp">
            <img src="cloud-datacenter-fallback.jpg" 
                 alt="Barisan rak server modern berpendingin cairan di pusat data Tier-4 Nusantara Cloud Jakarta" 
                 width="800" 
                 height="400" 
                 loading="lazy" 
                 decoding="async">
          </picture>
          <figcaption>Fasilitas Pusat Data Tier-4 Berstandar Keamanan Fisik Tertinggi di Cikarang, Jawa Barat.</figcaption>
        </figure>

        <section>
          <h3>1. Virtual Compute Instances</h3>
          <p>Mesin virtual berbasis prosesor AMD EPYC generasi terbaru dengan performa single-core terdepan dan koneksi jaringan 40 Gbps.</p>
        </section>

        <section>
          <h3>2. Managed Distributed Storage</h3>
          <p>Penyimpanan objek kompatibel S3 dengan replikasi 3 zona ketersediaan otomatis tanpa titik kegagalan tunggal.</p>
        </section>
      </section>

      <!-- Bagian 2: Metrik dan SLA Tabular -->
      <section id="performa" aria-labelledby="heading-performa">
        <h2 id="heading-performa">Spesifikasi Kinerja & SLA Terjamin</h2>
        <p>Komitmen level layanan bergaransi kontraktual dengan denda kompensasi finansial langsung:</p>

        <table border="1">
          <caption>Tabel Perbandingan Tingkat Layanan SLA Infrastruktur Nusantara Cloud</caption>
          <thead>
            <tr>
              <th scope="col">Paket Klaster</th>
              <th scope="col">Garansi Uptime</th>
              <th scope="col">Latensi Antar Node</th>
              <th scope="col">Target Waktu Pemulihan (RTO)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Developer Standard</th>
              <td>99.90%</td>
              <td>&lt; 15 ms</td>
              <td>&lt; 2 Jam</td>
            </tr>
            <tr>
              <th scope="row">Enterprise Business</th>
              <td>99.95%</td>
              <td>&lt; 8 ms</td>
              <td>&lt; 30 Menit</td>
            </tr>
            <tr>
              <th scope="row">Mission Critical VIP</th>
              <td>99.99%</td>
              <td>&lt; 3 ms</td>
              <td>Instan (Hot Standby)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Bagian 3: Formulir Permintaan Demo -->
      <section id="kontak" aria-labelledby="heading-kontak">
        <h2 id="heading-kontak">Jadwalkan Konsultasi Teknis & Uji Coba Gratis</h2>
        <p>Insinyur solusi kami akan menyiapkan lingkungan sandbox khusus dalam 1x24 jam.</p>

        <form action="/api/v1/consultations" method="POST">
          <fieldset>
            <legend>Data Identitas Profesional</legend>
            <p>
              <label for="client-name">Nama Lengkap Pemohon: <span aria-hidden="true">*</span></label><br>
              <input type="text" id="client-name" name="fullName" required minlength="3" placeholder="Siti Rahmawati">
            </p>
            <p>
              <label for="company-email">Email Bisnis Resmi: <span aria-hidden="true">*</span></label><br>
              <input type="email" id="company-email" name="corporateEmail" required placeholder="siti@korporat.co.id">
            </p>
            <p>
              <label for="cluster-need">Pilihan Klaster yang Dibutuhkan:</label><br>
              <select id="cluster-need" name="clusterTier">
                <option value="standard">Developer Standard</option>
                <option value="business" selected>Enterprise Business</option>
                <option value="critical">Mission Critical VIP</option>
              </select>
            </p>
          </fieldset>

          <p>
            <button type="submit">Ajukan Akses Sandbox Cloud</button>
          </p>
        </form>
      </section>

      <!-- Bagian 4: Tanya Jawab Sering Diajukan -->
      <section aria-labelledby="heading-faq">
        <h2 id="heading-faq">Pertanyaan Seputar Kepatuhan & Sertifikasi</h2>
        <details>
          <summary>Apakah layanan telah terdaftar di Kementerian Kominfo RI?</summary>
          <p>Ya, PT Nusantara Cloud Solusindo terdaftar resmi sebagai Penyelenggara Sistem Elektronik (PSE) Lingkup Privat.</p>
        </details>
        <details>
          <summary>Apakah tersedia fasilitas pemulihan bencana (Disaster Recovery)?</summary>
          <p>Tersedia opsi replikasi otomatis ke pusat data cadangan di Surabaya dengan jarak geografis lebih dari 700 kilometer.</p>
        </details>
      </section>
    </article>
  </main>

  <!-- Footer Landmark -->
  <footer>
    <p><small>&copy; 2026 PT Nusantara Cloud Solusindo. Seluruh hak cipta dilindungi undang-undang.</small></p>
  </footer>
</body>
</html>""",
        'objectivesId': [
            'Mengintegrasikan seluruh struktur semantik HTML5 dalam satu aplikasi web portal produksi utuh',
            'Menghubungkan navigasi internal, tautan skip-link, landmark semantik, dan headings tanpa celah aksesibilitas',
            'Menerapkan gambar responsif multi-format dengan picture, srcset, loading="lazy", dan rasio aspek presisi',
            'Menyajikan data teknis kompleks menggunakan tabel relasional dengan thead, tbody, scope, dan captioning tepat',
            'Membangun formulir registrasi interaktif lengkap dengan pengelompokan fieldset dan validasi browser native',
        ],
        'objectivesEn': [
            'Synthesize all semantic HTML5 structural primitives into a cohesive production web portal',
            'Interconnect internal navigation, skip links, landmark regions, and headings with zero accessibility flaws',
            'Deliver responsive multi-format imagery using picture, srcset, loading="lazy", and explicit aspect dimensions',
            'Format complex operational metrics using relational tables equipped with thead, tbody, scope, and captioning',
            'Engineer an interactive onboarding form with fieldset groupings and native browser constraint validation',
        ],
        'explanationId': """### Arsitektur Web Portal Produksi
Sebuah halaman web berkualitas profesional tidak dinilai dari kerumitan kodenya, melainkan dari **ketepatan semantik, kecepatan rendering, dan inklusivitas aksesibilitasnya**:
1. **Pondasi Semantik Utuh**: Dokumen menggunakan struktur hierarkis `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<figure>`, dan `<footer>`.
2. **Kinerja Aset Maksimal**: Menggunakan `<picture>` dan `loading="lazy"` memastikan halaman dimuat secara instan di jaringan 3G sekalipun.
3. **Standar Aksesibilitas Penuh**: Lolos uji audit aksesibilitas (skor 100% pada Google Lighthouse / axe-core) berkat skip link, hierarki heading tunggal `<h1>`, pelabelan formulir eksplisit, dan atribut `scope` pada seluruh tabel.
4. **Validasi Mandiri**: Formulir memanfaatkan constraint validation HTML5 sehingga tidak dapat mengirim data cacat ke server.""",
        'explanationEn': """### Production Web Portal Architecture
Professional web development is judged not by superfluous code complexity, but by **semantic correctness, rendering velocity, and universal accessibility**:
1. **Complete Semantic Foundations**: Employs structural landmarks: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<figure>`, and `<footer>`.
2. **Maximized Asset Velocity**: Leveraging `<picture>` and `loading="lazy"` ensures instantaneous rendering even on constrained mobile connections.
3. **Flawless Accessibility Compliance**: Passes automated audits (100% score on Google Lighthouse / axe-core) via skip navigation, unified `<h1>` tree, explicit input bindings, and scoped table headers.
4. **Autonomous Validation**: Forms leverage client-side constraints, preventing malformed payload dispatches to backend endpoints.""",
        'beginnerId': """### Analogi: Gedung Pusat Pelayanan Terpadu
Halaman capstone ini seperti sebuah gedung pusat pelayanan publik berstandar internasional:
- Pintunya memiliki rampa landai untuk kursi roda (**aksesibilitas dan skip links**).
- Terdapat papan petunjuk jalan yang terang benderang di setiap lorong (**navigasi dan landmarks**).
- Setiap ruangan memiliki nomor dan nama ruangan yang jelas (**hierarki heading H1-H3**).
- Brosur informasi dan formulir tersedia rapi di meja resepsionis (**tabel data dan formulir validasi**).
- Siapa pun yang datang, baik orang dewasa, anak-anak, lansia, maupun penyandang disabilitas, dapat menggunakan gedung ini dengan nyaman dan mandiri.""",
        'beginnerEn': """### Analogy: A World-Class Municipal Center
This capstone portal is like an international public civic center:
- Entrances feature grade-level accessibility ramps (**accessibility & skip navigation**).
- Corridors are mapped with illuminated signage (**landmarks & nav menus**).
- Every department is assigned distinct room numbers and signs (**heading outlines H1-H3**).
- Schedules and applications are organized systematically on reception counters (**data tables & validated forms**).
- Every visitor—regardless of visual, physical, or technical ability—navigates the facility autonomously.""",
        'experimentsId': [
            'Buka file ini di Google Chrome, jalankan audit Lighthouse pada tab "Accessibility", dan perhatikan tercapainya skor 100%.',
            'Jelajahi seluruh halaman dari awal hingga akhir hanya menggunakan tombol TAB keyboard tanpa menyentuh mouse.',
            'Coba masukkan alamat email tidak valid ke dalam formulir dan tekan submit untuk melihat browser menolak pengiriman secara native.',
            'Gunakan fitur inspect element untuk melihat bagaimana gambar WebP otomatis dipilih oleh browser modern.',
        ],
        'experimentsEn': [
            'Open this file in Google Chrome, run a Lighthouse Accessibility audit, and verify the 100% score.',
            'Navigate the entire page from top to bottom purely using keyboard TAB keys without touching your trackpad.',
            'Type an invalid email address format and click submit to verify native browser constraint enforcement.',
            'Inspect the picture element in DevTools to confirm that modern browsers automatically prefer WebP source streams.',
        ],
        'challengeId': 'Kembangkan portal ini menjadi situs multi-halaman utuh dengan menambahkan halaman kedua "tentang.html" dan halaman ketiga "karir.html". Pastikan tautan navigasi antar-halaman sinkron dan atribut `aria-current="page"` aktif pada halaman yang sesuai.',
        'challengeEn': 'Expand this portal into a multi-page web application by adding a second page "about.html" and a third page "careers.html". Ensure all cross-page navigation links synchronize cleanly and `aria-current="page"` reflects the active document.',
        'summaryId': 'Selamat! Kamu telah menyelesaikan seluruh kurikulum HTML5 dari nol hingga proyek portal produksi berstandar aksesibilitas internasional. Kamu sekarang siap melangkah ke kurikulum CSS3 untuk merancang sistem tata letak visual modern!',
        'summaryEn': 'Congratulations! You have completed the entire HTML5 curriculum from zero to a production-ready, accessible corporate portal. You are now fully prepared to advance into CSS3 for modern visual layout systems!',
    },
]

def get_track():
    return {
        'slug': 'html5',
        'track_name': 'HTML5',
        'levels': LEVELS,
        'modules': MODULES,
    }
