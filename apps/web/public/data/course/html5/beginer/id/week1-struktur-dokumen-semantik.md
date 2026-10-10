# Pengenalan HTML5: Fondasi Web, Anatomi Tag, Struktur Dokumen & Quick Start

> **Kategori:** HTML5 | **Level:** Struktur & Semantik Web | **Minggu 1:** Pengenalan HTML, Anatomi Tag, Struktur Dokumen & Quick Start
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step dari nol)


## Tujuan Pembelajaran

- Memahami apa itu HTML dan perannya sebagai kerangka dasar seluruh halaman web di dunia
- Menguasai anatomi sintaks: kurung sudut (bracket `< >`), tag pembuka, konten, tag penutup, dan self-closing tag
- Memahami konsep atribut, nilai, serta fungsi `class` dan `id` untuk memberi label dan pengelompokan elemen
- Melakukan setup lingkungan kerja lokal dengan VS Code, browser, dan ekstensi Live Server (Quick Start)
- Membedah hierarki file HTML standar: deklarasi `<!DOCTYPE html>`, elemen root `<html>`, blok `<head>`, dan blok `<body>`
- Mengenal elemen-elemen inti penyusun konten: headings, paragraf, daftar, gambar, link, container `<div>`, dan elemen sectioning semantik
- Membangun satu proyek halaman web utuh yang terstruktur, rapi, dan langsung bisa dijalankan di browser maupun Playground

---

## 1. Apa Itu HTML? Pengertian & Filosofi Dasar Web

**HTML** adalah singkatan dari **HyperText Markup Language**:
- **HyperText (Teks Super):** Teks digital yang dapat saling terhubung ke halaman lain melalui tautan (*hyperlink*). Ketika Anda mengklik sebuah link dan berpindah halaman, itulah kekuatan HyperText.
- **Markup (Penandaan):** Cara kita "menandai" teks biasa dengan tanda khusus agar browser komputer tahu perannya—apakah teks tersebut merupakan judul utama, paragraf biasa, gambar, tombol, atau daftar poin.
- **Language (Bahasa):** Kumpulan aturan baku yang dipahami oleh seluruh peramban web (*web browser*) di dunia (seperti Google Chrome, Mozilla Firefox, Safari, dan Microsoft Edge).

> 💡 **Penting untuk Dipahami:**  
> HTML **bukanlah bahasa pemrograman** (*programming language*). HTML tidak memiliki logika komputasi seperti rumus matematika rumit, percabangan kondisi (*if-else*), atau variabel yang berubah-ubah. HTML adalah **bahasa markup struktural** yang bertugas menyusun kerangka dokumen.

### Analogi Tiga Pilar Web: Tubuh Manusia & Gedung Bangunan
Saat Anda membuka website modern apa pun, selalu ada tiga teknologi yang bekerja bersama:
1. **HTML (Kerangka & Dinding):** Tulang rusuk, tengkorak, dan organ tubuh. HTML menentukan ada kepala (`<header>`), ada isi tubuh (`<main>`), ada tangan, dan ada kaki (`<footer>`). Tanpa HTML, tidak ada apa pun yang bisa ditampilkan di layar.
2. **CSS (Wajah, Kulit, & Pakaian):** Warna kulit, gaya rambut, pakaian rapi, sepatu, dan tata letak ruang. CSS bertugas mempercantik kerangka HTML agar enak dipandang.
3. **JavaScript (Otot & Gerak-gerik):** Saraf dan otot yang membuat tubuh bisa melompat, merespons tepukan, membuka jendela popup, atau mengirim data secara langsung tanpa memuat ulang halaman.

---

## 2. Anatomi Sintaks: Kurung Sudut (Bracket), Tag, & Elemen

Semua kode HTML ditulis menggunakan karakter khusus berupa **kurung sudut** atau **bracket** yaitu tanda `<` (*kurang dari*) dan `>` (*lebih dari*).

Browser membaca dokumen dari atas ke bawah. Saat menemukan teks biasa seperti `Halo Dunia`, browser menganggapnya teks biasa. Namun saat browser menemukan kurung sudut seperti `<p>`, browser tahu bahwa itu adalah **instruksi perintah markup**.

```text
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
```

### Komponen Utama Elemen HTML:
1. **Tag Pembuka (`Opening Tag`):** Dimulai dengan `<` diikuti nama tag, lalu ditutup dengan `>`, contohnya `<p>`. Ini menandai dimulainya sebuah elemen paragraf.
2. **Konten (`Content`):** Teks atau elemen lain yang berada di dalam tag pembuka dan penutup.
3. **Tag Penutup (`Closing Tag`):** Mirip dengan tag pembuka, tetapi memiliki tanda garis miring (`/`) sebelum nama tag, contohnya `</p>`. Garis miring ini memberi tahu browser: *"Elemen paragraf ini berakhir di sini!"*
4. **Elemen (`Element`):** Gabungan utuh dari tag pembuka, konten, hingga tag penutup.

### Elemen Tanpa Penutup (Void / Self-Closing Tag)
Tidak semua elemen memiliki teks di dalamnya. Beberapa elemen bertugas menyisipkan objek secara instan, sehingga **tidak membutuhkan tag penutup**:
- `<br>` : Menyisipkan garis baru (*break line* / enter).
- `<hr>` : Menyisipkan garis pemisah horizontal (*horizontal rule*).
- `<img src="..." alt="...">` : Menyisipkan gambar ke halaman.
- `<meta>` : Menyisipkan informasi rahasia atau instruksi browser di dalam `<head>`.

---

## 3. Anatomi Atribut: Memberi Informasi Ekstra, Class, dan ID

Tag sering kali membutuhkan informasi tambahan agar dapat bekerja maksimal. Informasi tambahan ini disebut **Atribut HTML** (*HTML Attributes*).

Atribut **selalu ditulis di dalam tag pembuka** sebelum tanda kurung siku tutup `>`, menggunakan format baku: `nama="nilai"`.

```html
<p class="deskripsi-teks" id="paragraf-satu">Halo semuanya!</p>
```

### Mengapa Kita Butuh Atribut `class`?
Bayangkan Anda memiliki 10 buah tombol di sebuah halaman web. Semua tombol tersebut ingin Anda beri warna hijau dan sudut melengkung.
- Daripada mengatur tombol satu per satu, Anda memberikan **label pengelompokan** yang sama pada setiap tombol, yaitu `class="btn-hijau"`.
- **Atribut `class` dapat digunakan berulang kali** pada banyak elemen yang berbeda.
- Sebuah elemen bahkan boleh memiliki lebih dari satu class, cukup pisahkan dengan spasi: `class="card shadow rounded"`.

### Perbedaan `class` vs `id`:
| Karakteristik | Atribut `class` | Atribut `id` |
|---|---|---|
| **Sifat** | Label kelompok bersama | Tanda pengenal unik (seperti Nomor KTP) |
| **Frekuensi Pemakaian** | Boleh digunakan di ratusan elemen dalam satu halaman | **Hanya boleh ada 1 elemen** dengan ID tersebut per halaman |
| **Tujuan Utama** | Pengelompokan gaya (styling CSS) yang konsisten | Penanda target link anchor (`#tentang`) atau manipulasi khusus JS |
| **Contoh Penulisan** | `<section class="fitur-unggulan">` | `<header id="header-utama">` |

---

## 4. Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai coding, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Live Server** (`ritwickdey.liveserver`): Buka HTML di browser lokal dengan auto-reload saat file disimpan
- **Auto Close Tag** (`formulahendry.auto-close-tag`): Menutup tag HTML otomatis saat diketik

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ritwickdey.liveserver --install-extension formulahendry.auto-close-tag
```

---

### 2. Instalasi Runtime & Dependency (Web Browser)
HTML tidak membutuhkan server khusus, kompilasi, atau instalasi runtime rumit. Anda hanya memerlukan browser modern untuk menjalankan kodenya:

**Windows (PowerShell):**
```powershell
winget install Google.Chrome
```

**macOS (Terminal / Homebrew):**
```bash
brew install --cask google-chrome
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install google-chrome-stable
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
code --version
```

Output yang diharapkan:
```output
1.9x.x
```

> 💡 **Tips Prasyarat:** HTML dijalankan langsung oleh mesin rendering peramban web (*browser engine*). Tidak dibutuhkan compiler atau Node.js untuk halaman web statis pertama Anda.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah terminal atau buat folder manual di File Explorer:

```bash
mkdir my-website && cd my-website
touch index.html
```
- **Keterangan:** Buat folder project baru dan tambahkan file `index.html` sebagai berkas halaman utama.
- **Pindah ke direktori project:**
```bash
cd my-website
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Buka folder `my-website` di VS Code, lalu buka file `index.html`:

```bash
Klik Kanan pada file index.html -> Pilih "Open with Live Server"
```
Akses di browser atau terminal: `http://127.0.0.1:5500/index.html`

> ℹ️ Halaman web akan terbuka otomatis di browser Anda. Setiap kali Anda menekan `Ctrl + S` di VS Code, browser akan memperbarui tampilan seketika (*Hot Reload*).

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-website/
├── index.html       # File utama yang otomatis dicari dan dibuka browser
├── css/             # Folder untuk menyimpan file style (opsional)
│   └── style.css
├── js/              # Folder untuk skrip interaktif JavaScript (opsional)
│   └── script.js
└── images/          # Folder untuk aset gambar (logo, avatar, foto)
    └── foto-profil.png
```
Nama file `index.html` adalah konvensi universal web server. Server akan selalu menyajikan `index.html` sebagai halaman pembuka pertama saat seseorang mengunjungi domain Anda.

---

### 6. Tips & Best Practice untuk Pemula
- **Trik Boilerplate Cepat:** Di VS Code, cukup ketik tanda seru `!` pada file kosong, lalu tekan tombol `Tab` atau `Enter`. VS Code akan otomatis membuatkan struktur lengkap HTML5!
- **Selalu Tutup Tag Anda:** Pastikan setiap tag pembuka memiliki pasangan penutupnya agar struktur dokumen tidak berantakan.
- **Gunakan Huruf Kecil (Lowercase):** Tulis nama tag dan atribut selalu dengan huruf kecil (`<p>`, bukan `<P>`).

---

## 5. Bedah Struktur Berkas HTML (Hierarki Dokumen Langkah demi Langkah)

Mari kita bedah kerangka standar yang wajib ada di setiap file HTML di dunia:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Pertama Saya</title>
</head>
<body>
  <h1>Halo Dunia!</h1>
  <p>Selamat datang di website pertama saya.</p>
</body>
</html>
```

Mari kita telusuri baris per baris apa fungsi masing-masing komponen di atas:

### A. Deklarasi `<!DOCTYPE html>`
- **Apa ini?** Baris paling pertama di setiap file HTML.
- **Fungsinya:** Memberi instruksi resmi kepada browser: *"Tolong baca dan tampilkan file ini menggunakan standar HTML5 modern terbaru!"*
- Tanpa deklarasi ini, browser akan masuk ke mode purba bernama **quirks mode**, yang dapat membuat tampilan website menjadi rusak dan kacau karena menggunakan aturan era 1990-an.

### B. Elemen Root `<html lang="id">`
- **Apa ini?** Wadah induk (*root container*) paling luar yang membungkus seluruh isi halaman.
- Seluruh kode HTML lainnya harus berada di dalam pembuka `<html>` dan penutup `</html>`.
- **Atribut `lang="id"`:** Memberi tahu browser dan mesin pencari (seperti Google) bahwa bahasa utama konten ini adalah **Bahasa Indonesia**. Ini sangat membantu fitur terjemahan otomatis browser dan pembaca layar bagi penyandang disabilitas (*screen reader*).

### C. Blok `<head>`: Otak dan Pengaturan Belakang Layar
Semua hal di dalam `<head>` **TIDAK AKAN DITAMPILKAN SECARA LANGSUNG DI LAYAR HALAMAN WEB**. Blok ini bertindak seperti amplop surat yang memuat informasi konfigurasi teknis:
1. `<meta charset="UTF-8">`: Mengatur sistem pengkodean karakter universal. Berkat UTF-8, website Anda bisa menampilkan huruf Latin, Arab, Kanji, huruf beraksen, simbol matematika, hingga emoji (😀, 🚀, 💻) tanpa menjadi simbol tanda tanya yang rusak.
2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Kunci utama web responsif! Baris ini memerintahkan browser di smartphone untuk menyesuaikan lebar halaman dengan lebar layar ponsel Anda dalam skala 1:1, sehingga tampilan tidak mengecil seperti perangko.
3. `<title>Website Pertama Saya</title>`: Menentukan judul tulisan yang muncul di **tab browser**, serta judul yang muncul saat website Anda terindeks di hasil pencarian Google.

### D. Blok `<body>`: Kanvas Visual Tempat Konten Ditampilkan
Blok `<body>` adalah kanvas panggung utama. **Segala sesuatu yang Anda letakkan di dalam `<body>` adalah hal yang akan dilihat, dibaca, dan diklik oleh pengguna di layar peramban**.

---

## 6. Elemen-Elemen Inti Penyusun Konten di Dalam `<body>`

Di dalam `<body>`, kita menyusun elemen-elemen untuk membentuk tampilan yang utuh:

### 1. Judul Hierarkis (Headings: `<h1>` sampai `<h6>`)
HTML menyediakan 6 tingkat judul berdasarkan tingkat kepentingannya:
- `<h1>`: Judul utama halaman web. **Praktik terbaik:** Hanya boleh ada **satu** `<h1>` per halaman agar SEO Google jelas.
- `<h2>`: Judul bab / sub-bagian besar (misal: "Tentang Saya", "Layanan Kami").
- `<h3>`: Sub-judul di dalam bab `<h2>` (misal: nama proyek atau fitur).
- `<h4>`, `<h5>`, `<h6>`: Sub-judul yang lebih spesifik.

### 2. Paragraf & Pemformatan Teks
- `<p>`: Membungkus paragraf teks biasa. Browser otomatis memberi sedikit jarak atas dan bawah.
- `<strong>`: Menebalkan teks untuk menandakan kata tersebut penting secara makna.
- `<em>`: Memiringkan teks (*emphasis*) untuk memberikan penekanan intonasi baca.

### 3. Wilayah Semantik (Semantic Sectioning)
Daripada membuat seluruh kotak menggunakan tag umum `<div>`, HTML5 memperkenalkan tag yang memiliki makna arti semantik:
- `<header>`: Bagian atas halaman atau bagian pengantar yang memuat logo dan judul situs.
- `<nav>`: Menu navigasi yang memuat daftar tautan untuk berpindah halaman.
- `<main>`: Konten inti dari halaman tersebut. Hanya boleh ada satu `<main>` per dokumen.
- `<section>`: Membagi konten menjadi kelompok bab atau bagian tematik (misal: seksi perkenalan, seksi kontak).
- `<article>`: Bagian konten independen yang bisa berdiri sendiri (misal: kartu profil, kartu artikel berita).
- `<aside>`: Konten pendukung di sisi samping (*sidebar*) seperti daftar link terkait atau kutipan.
- `<footer>`: Kaki halaman yang memuat hak cipta, kontak, atau tautan sosial media.

### 4. Kotak Pembantu (`<div>` dan `<span>`)
- `<div class="...">`: Kotak blok umum tanpa makna khusus. Digunakan sebagai wadah pembungkus ketika kita ingin menata beberapa elemen dengan CSS.
- `<span class="...">`: Wadah inline untuk membungkus satu kata atau kalimat kecil di tengah paragraf tanpa membuat baris baru.

### 5. Media, Link, dan Daftar
- `<a href="https://example.com" target="_blank">`: Tautan yang bisa diklik. Atribut `href` berisi alamat tujuan.
- `<img src="gambar.jpg" alt="Foto Profil">`: Menampilkan gambar. Atribut `src` adalah sumber file gambar, dan `alt` adalah teks keterangan jika gambar gagal dimuat.
- `<ul>` dan `<li>`: Daftar poin tak berurutan (*unordered list* / bullet points).
- `<ol>` dan `<li>`: Daftar angka berurutan (*ordered list* / 1, 2, 3).

---

## Program: Proyek Web Jadi — Halaman Portofolio Personal Lengkap

Berikut adalah satu proyek dokumen HTML5 utuh yang menggabungkan seluruh konsep: mulai dari kurung sudut (bracket), tag pembuka/penutup, metadata `<head>`, semantik sectioning di `<body>`, hingga penerapan atribut `class` yang rapi.

Kode ini langsung dapat Anda coba, edit, dan jalankan di panel Playground sebelah kanan:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio Pengembang Web • Alex Santoso</title>
  <style>
    /* Styling dasar terintegrasi agar pratinjau langsung cantik */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background-color: #0f172a; color: #f8fafc; line-height: 1.6; padding: 24px 16px; }
    .container { max-width: 720px; margin: 0 auto; }
    .site-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 24px; }
    .brand-logo { font-size: 20px; font-weight: bold; color: #10b981; }
    .nav-links { display: flex; gap: 16px; list-style: none; }
    .nav-links a { color: #94a3b8; text-decoration: none; font-size: 14px; font-weight: 500; }
    .nav-links a:hover { color: #38bdf8; }
    .hero-section { background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #334155; border-radius: 16px; padding: 28px; margin-bottom: 24px; }
    .badge { display: inline-block; background: #065f46; color: #34d399; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
    .hero-title { font-size: 28px; font-weight: 800; margin-bottom: 8px; color: #ffffff; }
    .hero-desc { color: #cbd5e1; font-size: 15px; margin-bottom: 18px; }
    .btn-action { display: inline-block; background: #10b981; color: #022c22; font-weight: bold; padding: 8px 18px; border-radius: 8px; text-decoration: none; font-size: 14px; }
    .section-title { font-size: 20px; margin-bottom: 16px; color: #38bdf8; border-left: 4px solid #38bdf8; padding-left: 10px; }
    .content-box { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin-top: 10px; }
    .skills-list li { background: #334155; color: #f1f5f9; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; }
    .project-card { border-left: 3px solid #10b981; padding-left: 14px; margin-bottom: 16px; }
    .project-card h3 { font-size: 16px; color: #f8fafc; }
    .project-card p { font-size: 13px; color: #94a3b8; }
    .site-footer { text-align: center; border-top: 1px solid #334155; padding-top: 20px; color: #64748b; font-size: 13px; }
  </style>
</head>
<body>
  <div class="container">

    <!-- 1. HEADER SITUS & NAVIGASI -->
    <header class="site-header">
      <div class="brand-logo">Alex.dev</div>
      <nav>
        <ul class="nav-links">
          <li><a href="#tentang">Tentang</a></li>
          <li><a href="#keahlian">Keahlian</a></li>
          <li><a href="#proyek">Proyek</a></li>
        </ul>
      </nav>
    </header>

    <!-- 2. KONTEN UTAMA HALAMAN -->
    <main>
      <!-- Hero Banner Perkenalan -->
      <section class="hero-section">
        <span class="badge">Tersedia untuk Pekerjaan Lepas</span>
        <h1 class="hero-title">Halo, Saya Alex Santoso 👋</h1>
        <p class="hero-desc">
          Junior Frontend Developer yang gemar merancang website bersih, cepat, dan aksesibel menggunakan <strong>HTML5 Semantik</strong> dan arsitektur web modern.
        </p>
        <a href="mailto:alex@example.com" class="btn-action">Hubungi Saya</a>
      </section>

      <!-- Seksi Tentang & Keahlian -->
      <section id="keahlian" class="content-box">
        <h2 class="section-title">Keahlian Teknologi</h2>
        <p>Teknologi inti yang saya gunakan untuk mewujudkan ide di web peramban:</p>
        <ul class="skills-list">
          <li>HTML5 Semantik</li>
          <li>CSS3 Modern</li>
          <li>JavaScript ES6</li>
          <li>Git & GitHub</li>
          <li>Responsive Web Design</li>
        </ul>
      </section>

      <!-- Seksi Proyek Pilihan -->
      <section id="proyek" class="content-box">
        <h2 class="section-title">Proyek Pilihan</h2>
        
        <article class="project-card">
          <h3>Portal Edukasi Tryngo</h3>
          <p>Membangun modul materi pemrograman interaktif dengan navigasi yang ramah pembaca layar (screen reader).</p>
        </article>

        <article class="project-card">
          <h3>Katalog Menu Restoran Nusantara</h3>
          <p>Landing page semantik yang menyajikan daftar hidangan daerah dengan struktur konten yang teroptimasi SEO.</p>
        </article>
      </section>
    </main>

    <!-- 3. FOOTER HAK CIPTA & CATATAN KAKI -->
    <footer class="site-footer">
      <p>&copy; 2026 Alex Santoso. Dibuat dengan HTML5 murni di platform Tryngo.</p>
    </footer>

  </div>
</body>
</html>
```

---

## Bedah Detail Kode Proyek (Penjelasan Tag, Bracket, & Class)

Mari kita bedah mengapa setiap bagian dalam kode proyek di atas ditulis seperti itu:

1. **Kurung Sudut & Tag Pembuka/Penutup:**
   - Perhatikan bahwa setiap elemen seperti `<header>` selalu diakhiri dengan pasangannya `</header>`. Ini memastikan elemen navigasi tidak "bocor" ke bagian bawah halaman.
2. **Atribut `class` untuk Desain yang Teratur:**
   - `class="container"` membungkus seluruh isi halaman agar lebarnya tidak melebar ke ujung layar monitor yang lebar.
   - `class="hero-section"` memberikan background gradien elegan khusus untuk kartu profil perkenalan.
   - `class="project-card"` digunakan pada **kedua artikel proyek**. Karena keduanya memiliki class yang sama, kedua proyek otomatis memiliki garis batas hijau (`border-left`) yang seragam tanpa perlu menulis kode berulang kali!
3. **Atribut `id` untuk Navigasi Cepat (Anchor Links):**
   - Perhatikan pada header: `<a href="#keahlian">Keahlian</a>`.
   - Di bagian bawah ada: `<section id="keahlian">`.
   - Saat link tersebut diklik di browser, halaman akan otomatis meluncur (*scroll*) langsung ke elemen yang memiliki `id="keahlian"`. Inilah fungsi ID sebagai penanda unik halaman.
4. **Elemen Semantik (`<header>`, `<main>`, `<article>`, `<footer>`):**
   - Daripada menggunakan tag `<div>` untuk semua kotak, kode ini menggunakan tag semantik asli HTML5 sehingga mesin Google dapat mengidentifikasi mana bagian profil inti dan mana bagian kartu proyek mandiri.

---

## Konsep Kunci

### 1. Perbedaan Tag vs Elemen vs Atribut
- **Tag:** Label sintaks dalam kurung sudut, seperti `<p>` atau `</p>`.
- **Elemen:** Keseluruhan unit dari tag pembuka, isi konten, sampai tag penutup: `<p class="teks">Halo Dunia</p>`.
- **Atribut:** Properti tambahan di dalam tag pembuka: `class="teks"`.

### 2. Aturan Penulisan HTML yang Baik (Best Practices)
- **Nesting yang Benar:** Elemen yang dibuka terakhir harus ditutup terlebih dahulu:
  - ✅ Benar: `<strong><em>Teks Penting</em></strong>`
  - ❌ Salah: `<strong><em>Teks Penting</strong></em>`
- **Gunakan Huruf Kecil:** Selalu tulis `<section>`, bukan `<SECTION>`.
- **Selalu Berikan Kutip pada Atribut:** Tulis `class="kartu"`, bukan `class=kartu`.

---

## Penjelasan untuk Pemula

### Analogi: Formulir Registrasi Kertas Resmi
Bayangkan dokumen HTML seperti formulir kertas yang Anda terima di kantor pos:
1. **`<!DOCTYPE html>`** adalah stempel cap di pojok kiri atas yang menyatakan bahwa formulir ini adalah edisi standar tahun ini.
2. **`<head>`** adalah bagian *"Untuk Kegunaan Kantor Saja"*: ada barcode, stempel tanggal, dan catatan administrasi yang tidak diisi oleh pemohon, tapi penting bagi petugas kantor pos.
3. **`<body>`** adalah kolom data yang diisi dan dibaca langsung oleh Anda.
4. **Tag `<h1>` hingga `<p>`** adalah judul formulir dan instruksi pertanyaan.
5. **Class** adalah kategori warna stabilo: semua bagian penting diwarnai stabilo kuning (`class="highlight"`), dan semua tanda tangan diberi kotak merah (`class="ttd"`).

---

## Eksperimen di Playground

Coba modifikasi kode proyek di panel Playground sebelah kanan untuk menguji pemahaman Anda:
1. **Ubah Judul Utama:** Ganti teks di dalam `<h1>Halo, Saya Alex Santoso 👋</h1>` dengan nama Anda sendiri.
2. **Tambahkan Keahlian Baru:** Tambahkan satu butir `<li>` baru di dalam `<ul class="skills-list">`, misalnya `<li>Figma Design</li>`. Amati bagaimana tag baru tersebut langsung muncul dengan tampilan yang seragam!
3. **Buat Kartu Proyek Ketiga:** Duplikat salah satu blok `<article class="project-card">` dan ubah judul serta deskripsinya menjadi proyek impian Anda.
4. **Eksperimen Tag Rusak:** Coba hapus tanda kurung tutup `>` atau hapus tag penutup `</main>`, lalu perhatikan bagaimana browser merespons kesalahan tersebut.

---

## Tantangan Praktik

Buatlah sebuah dokumen HTML baru yang memiliki struktur:
1. Deklarasi `<!DOCTYPE html>`, elemen `<html>`, `<head>` dengan `<title>` kafe favorit Anda.
2. Di dalam `<body>`, buat sebuah `<header>` yang memiliki `<h1>Nama Kafe</h1>` dan `<p>Slogan kafe Anda</p>`.
3. Buat sebuah `<main>` yang berisi dua `<section>`:
   - Seksi pertama: Daftar menu minuman kopi menggunakan `<ul>` dan `<li>`.
   - Seksi kedua: Alamat dan jam operasional menggunakan `<p>` dan atribut `class="jam-buka"`.
4. Buat sebuah `<footer>` yang memuat teks hak cipta.

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang dipelajari pada modul ini:

### 1. `<!DOCTYPE html>`
- **Fungsi Utama:** Memberi instruksi standar rendering HTML5 modern ke browser.
- **Penempatan:** Harus berada di baris pertama paling atas file sebelum tag apa pun.
- **Efek Sistem:** Mencegah peramban masuk ke quirks mode.

### 2. `<html lang="...">`
- **Fungsi Utama:** Elemen root dokumen pembungkus seluruh konten web.
- **Atribut Penting:** `lang="id"` (Bahasa Indonesia) atau `lang="en"` (Bahasa Inggris).
- **Efek Sistem:** Menentukan bahasa dokumen untuk penerjemah otomatis dan screen reader.

### 3. `<head>` dan `<title>`
- **Fungsi Utama:** Wadah metadata teknis dan judul jendela tab peramban.
- **Elemen Wajib di Dalamnya:** `<meta charset="UTF-8">`, `<meta name="viewport" ...>`, `<title>`.
- **Efek Sistem:** Tidak dirender secara visual di halaman konten utama.

### 4. `<body>`
- **Fungsi Utama:** Kanvas rendering visual untuk seluruh elemen yang dilihat pengguna.
- **Elemen yang Diperbolehkan:** Semua elemen teks, struktur landmark, tabel, gambar, link, formulir, dan tombol.

### 5. Atribut `class` dan `id`
- **Fungsi Utama:** Penandaan dan pengelompokan elemen untuk selektor CSS dan skrip JavaScript.
- **Perbedaan Kunci:** `class` dapat digunakan berulang pada banyak elemen; `id` bersifat unik per dokumen.

---

## Jebakan Umum & Debugging (Common Pitfalls)

1. **Lupa Memberikan Tanda Garis Miring pada Tag Penutup:**
   - Menulis `<p>Halo<p>` alih-alih `<p>Halo</p>` akan membuat browser bingung kapan sebuah paragraf berakhir.
2. **Menggunakan Huruf Besar/Kecil Campuran:**
   - Menulis `<Div Class="Card">` tidak disarankan. Selalu gunakan huruf kecil seragam: `<div class="card">`.
3. **Membuat Lebih dari Satu `<h1>`:**
   - Meskipun browser tidak memunculkan eror, memiliki banyak `<h1>` di satu halaman akan membingungkan mesin pencari Google dan merusak skor SEO halaman web Anda.
4. **Menulis Teks Konten di Dalam Blok `<head>`:**
   - Menaruh paragraf `<p>` atau judul `<h1>` di dalam `<head>` adalah kesalahan fatal. Seluruh konten visual harus selalu diletakkan di dalam `<body>`.

---

## Ringkasan

- **HTML** adalah bahasa markup struktural penata kerangka dokumen web, bekerja bersama **CSS** (tampilan) dan **JavaScript** (perilaku).
- Sintaks HTML tersusun dari **kurung sudut (`< >`)**, **tag pembuka**, **konten**, dan **tag penutup (`</...>`)**.
- Elemen tanpa konten teks seperti `<img>` dan `<br>` disebut **void tags** dan tidak membutuhkan tag penutup.
- Atribut `class` digunakan untuk memberi label kelompok yang bisa dipakai berulang kali, sedangkan atribut `id` bersifat unik untuk satu elemen.
- Setiap berkas HTML valid wajib memiliki hierarki: `<!DOCTYPE html>`, elemen root `<html>`, blok konfigurasi `<head>`, dan blok visual `<body>`.
- Di minggu berikutnya, kita akan mendalami tipografi semantik tingkat lanjut, sistem tautan navigasi antar halaman, dan hierarki teks yang lebih kaya!
