# Pengenalan HTML dan Struktur Dokumen

> **Kategori:** HTML5 | **Level:** Dasar HTML | **Minggu 1:** Pengenalan HTML dan Struktur Dokumen
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami apa itu HTML dan perannya sebagai kerangka dasar halaman web
- Memahami cara kerja browser dalam membaca dan merender dokumen HTML
- Menguasai anatomi kurung sudut (< >), tag pembuka, konten, tag penutup, dan void tag
- Membedakan penggunaan atribut class (label kelompok) dan id (identitas unik)
- Menyiapkan lingkungan kerja lokal dengan VS Code dan Live Server (Quick Start)
- Membedah struktur dokumen standar: <!DOCTYPE html>, <html>, <head>, dan <body>
- Menggunakan fitur View Page Source (Ctrl + U) dan Inspect Element (F12) untuk melihat kode sumber

---

## 1. Apa Itu HTML?

**HTML** adalah singkatan dari **HyperText Markup Language**:
- **HyperText:** Teks yang memuat tautan (*link*) untuk berpindah ke dokumen atau halaman web lain saat diklik.
- **Markup:** Penandaan teks biasa menggunakan tag khusus agar browser mengetahui fungsi teks tersebut (sebagai judul, paragraf, daftar, gambar, atau tombol).
- **Language:** Standar aturan baku yang dipahami oleh seluruh web browser (seperti Chrome, Firefox, Safari, dan Edge).

> HTML **bukan bahasa pemrograman**. HTML tidak memiliki logika matematika, variabel memori, atau percabangan (*if-else*). HTML adalah **bahasa markup** yang bertugas menyusun kerangka dan struktur dokumen.

### Cara Kerja Web Browser
Tugas utama web browser adalah membaca dokumen HTML dan menampilkannya ke layar:
1. Browser membaca kode HTML dari baris atas ke baris bawah.
2. **Browser tidak pernah menampilkan tag HTML ke layar**. Browser menggunakan tag tersebut sebagai instruksi format untuk menentukan bagaimana teks dan elemen harus ditampilkan.
3. Contoh: Saat menemukan `<h1>Judul</h1>`, browser tidak menampilkan teks `<h1>`, melainkan mencetak teks "Judul" dengan ukuran besar dan tebal.

---

## 2. Anatomi Sintaks: Kurung Sudut, Tag, dan Elemen

Semua perintah HTML ditulis di dalam **kurung sudut** (*angle brackets*), yaitu karakter `<` dan `>`.

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

### Tabel Anatomi Elemen HTML:
| Start Tag | Content | End Tag | Tipe Elemen |
|---|---|---|---|
| `<h1>` | Selamat Datang | `</h1>` | Normal Element |
| `<p>` | Ini adalah paragraf teks. | `</p>` | Normal Element |
| `<a href="kontak.html">` | Hubungi Kami | `</a>` | Elemen dengan Atribut |
| `<br>` | *tidak ada* | *tidak ada* | **Void / Empty Element** |
| `<hr>` | *tidak ada* | *tidak ada* | **Void / Empty Element** |

Tag yang tidak memiliki konten dan tidak membutuhkan tag penutup disebut **Void Element** (seperti `<br>`, `<hr>`, `<img>`, dan `<meta>`).

---

## 3. Diagram Struktur Dokumen HTML

Dokumen HTML memiliki hierarki bersarang (*nested box structure*):

```text
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
```

- **`<!DOCTYPE html>`**: Deklarasi di baris pertama yang memberitahu browser bahwa dokumen ini menggunakan standar HTML5.
- **`<html lang="id">`**: Elemen induk paling luar. Atribut `lang="id"` menyatakan bahasa dokumen adalah Bahasa Indonesia.
- **`<head>`**: Memuat metadata dokumen. Konten di dalam head **tidak tampil di layar utama**, melainkan diatur untuk konfigurasi tab browser dan mesin pencari.
- **`<body>`**: Wadah utama konten visual. Semua teks, gambar, tabel, dan tombol yang ingin dilihat pengunjung diletakkan di sini.

---

## 4. Atribut: Class dan ID

Atribut memberikan informasi tambahan pada elemen, ditulis di dalam tag pembuka dengan format `nama="nilai"`.

### Perbedaan Class dan ID:
- **`class`**: Label kelompok. Satu nama class dapat digunakan berulang kali pada banyak elemen di satu halaman. Contoh: `<p class="keterangan">`.
- **`id`**: Identitas unik. Hanya boleh digunakan **satu kali** per halaman untuk satu elemen spesifik. Contoh: `<header id="header-utama">`.

---

## 5. Panduan Mulai Cepat (Quick Start): Setup Proyek

Sebelum menulis kode, siapkan lingkungan kerja di komputer:

### 1. Editor VS Code dan Ekstensi
- Unduh dan pasang [Visual Studio Code](https://code.visualstudio.com/).
- Buka menu Extensions (`Ctrl + Shift + X`) dan pasang ekstensi **Live Server** (`ritwickdey.liveserver`).
- Ekstensi ini memungkinkan halaman web otomatis me-reload saat file disimpan.

### 2. Membuat Folder dan File Proyek
Buat folder baru bernama `my-website` dan file `index.html`:
```bash
mkdir my-website && cd my-website
touch index.html
```

### 3. Menjalankan Proyek
1. Buka folder `my-website` di VS Code.
2. Buka file `index.html`.
3. Klik kanan di dalam editor, lalu pilih **"Open with Live Server"**.
4. Browser akan terbuka di alamat `http://127.0.0.1:5500/index.html`.

---

## 6. Fitur Pengembang di Browser
Anda dapat melihat kode sumber website apa pun di internet:
- **View Page Source (`Ctrl + U`):** Menampilkan kode HTML mentah yang dikirim oleh server.
- **Inspect Element (`F12` atau Klik Kanan -> Inspect):** Membuka panel Developer Tools untuk memeriksa struktur DOM dan atribut class/id secara langsung.

---

## 7. Sejarah Singkat HTML
- **1989:** Tim Berners-Lee menemukan World Wide Web (WWW).
- **1991:** Tim Berners-Lee merilis spesifikasi pertama HTML.
- **1999:** Standar HTML 4.01 dirilis.
- **2014:** Standar resmi HTML5 disahkan oleh W3C, menyederhanakan deklarasi doctype dan menambahkan tag semantik.

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Live Server** (`ritwickdey.liveserver`): Buka HTML di browser lokal dengan auto-reload saat file disimpan
- **Auto Close Tag** (`formulahendry.auto-close-tag`): Menutup tag HTML otomatis saat diketik

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ritwickdey.liveserver --install-extension formulahendry.auto-close-tag
```

---

### 2. Instalasi Runtime & Dependency (Web Browser (Chrome, Firefox, Safari, Edge))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

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

> 💡 **Tips Prasyarat:** HTML tidak membutuhkan compiler atau runtime server khusus untuk dijalankan.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-website && cd my-website
touch index.html
```
- **Keterangan:** Buat folder project baru dan tambahkan file index.html sebagai halaman utama.
- **Pindah ke direktori project:**
```bash
cd my-website
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
Klik Kanan index.html -> "Open with Live Server"
```
Akses di browser atau terminal: `http://127.0.0.1:5500/index.html`

> ℹ️ Halaman web akan terbuka otomatis di browser Anda.

**File Titik Masuk Utama (`index.html`):**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Website Semantik</title>
</head>
<body style="font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 20px;">
  <header>
    <h1>🌐 Selamat Datang di Web Semantik</h1>
  </header>
  <main>
    <article>
      <h2>Mengapa HTML5 Semantik Penting?</h2>
      <p>Tag seperti &lt;header&gt;, &lt;main&gt;, &lt;article&gt;, dan &lt;footer&gt; membuat web ramah SEO dan mudah dibaca oleh screen reader (aksesibilitas).</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2026 - Dibuat dengan Tryngo HTML5 Track</p>
  </footer>
</body>
</html>
```
Struktur dokumen HTML5 semantik lengkap.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-website/
├── index.html       # Dokumen struktur web
├── styles.css       # File stylesheet
└── images/          # Direktori gambar & aset
```
Struktur standar situs web statis.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan shortcut `!` lalu tekan `Tab` di VS Code untuk men-generate boilerplate HTML5 instan.
- Selalu sertakan atribut `alt` pada tag `<img>` demi aksesibilitas dan SEO.

---

## Program: Struktur Dasar Dokumen HTML Pertama

```html
<!DOCTYPE html>
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
</html>
```

---

## Bedah Detail Kode Program

- Line 1: `<!DOCTYPE html>` memberitahu browser bahwa dokumen mengikuti standar HTML5.
- Line 2: `<html lang="id">` membungkus seluruh dokumen dengan deklarasi bahasa Indonesia.
- Line 3-15: `<head>` memuat konfigurasi charset UTF-8, viewport seluler, title, dan style.
- Line 16-36: `<body>` memuat konten yang tampil di layar: header, main, section, dan footer.
- Atribut `id="header-utama"` digunakan sebagai tanda pengenal unik elemen header.
- Atribut `class="card"` digunakan dua kali untuk memberi tampilan kotak yang seragam pada kedua section.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 1 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa menulis tag penutup (misalnya menulis `<p>Teks` tanpa `</p>`).
- Menulis konten visual di dalam elemen `<head>` (konten visual harus selalu berada di `<body>`).
- Menggunakan ID yang sama pada lebih dari satu elemen (ID harus selalu unik per halaman).

---

## Ringkasan

- Modul Minggu 1 (Pengenalan HTML dan Struktur Dokumen) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
