# Struktur Dokumen Standar & Metadata Head

> **Kategori:** HTML5 | **Level:** Struktur & Semantik Web | **Minggu 1:** Struktur Dokumen Standar & Metadata Head
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami deklarasi <!DOCTYPE html> dan perannya mencegah quirks mode pada browser
- Mengatur elemen root <html lang="id"> untuk mesin pencari dan teknologi pembaca layar (screen reader)
- Mengonfigurasi meta charset UTF-8 dan meta viewport untuk rendering responsif di perangkat mobile
- Memanfaatkan Open Graph metadata untuk optimasi berbagi tautan di media sosial
- Menggunakan elemen landmark dasar: <header>, <main>, <article>, dan <footer>

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
  <title>Website Semantik Modern</title>
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

## Program: Dokumen HTML5 Pertama yang Valid dan Terstruktur

```html
<!DOCTYPE html>
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
</html>
```

---

## Konsep Kunci

### Deklarasi <!DOCTYPE html>
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
- `<footer>`: Catatan kaki berisi hak cipta, kontak, atau tautan legalitas.

---

---

## Penjelasan untuk Pemula

### Analogi: Surat Resmi Perusahaan
Bayangkan dokumen HTML seperti surat resmi bisnis:
1. **`<!DOCTYPE html>`** adalah stempel cap resmi bahwa surat ini ditulis sesuai format baku kantor pos modern.
2. **`<head>`** adalah amplop surat: berisi alamat tujuan, nomor resi, stiker pengiriman, dan nama pengirim (orang tidak membaca ini saat membaca isi surat, tapi pos dan kurir membutuhkannya).
3. **`<body>`** adalah lembaran kertas isi surat yang dibaca oleh penerima.
4. **`<header>`, `<main>`, `<footer>`** adalah kepala surat, isi pesan utama, dan tanda tangan penutup di bagian bawah.

## Eksperimen

- Hapus baris meta viewport, buka di ponsel atau ubah ukuran jendela browser, dan amati teks yang mengecil seperti halaman desktop versi 90-an.
- Ubah nilai atribut lang="id" menjadi lang="en", lalu periksa bagaimana browser menawarkan fitur terjemahan otomatis.
- Tambahkan meta tag og:image dengan URL gambar dummy, kemudian amati peran tag tersebut dalam kartu pratinjau media sosial.
- Coba letakkan teks di luar elemen <body> dan periksa bagaimana browser secara otomatis memperbaiki penempatan DOM di tab Elements Developer Tools.

---

## Tantangan

Buat kerangka dokumen HTML5 lengkap untuk beranda "Klinik Sehat Bersama". Sertakan meta charset, viewport, meta description medis yang meyakinkan, serta elemen landmark `<header>`, `<main>`, `<article>` tentang layanan rawat jalan, dan `<footer>` lengkap dengan jam operasional.

---

## Model Mental & Diagram Alur Visual

![Diagram Struktur DOM Tree HTML5](/diagrams/dom-tree.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│                   <!DOCTYPE html>                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ <html lang="id">                                     │ │
│ │  ┌─────────────────────────┐ ┌─────────────────────┐ │ │
│ │  │ <head> (Metadata)       │ │ <body> (Tampilan)   │ │ │
│ │  │ • <meta charset="UTF-8">│ │ • <header>          │ │ │
│ │  │ • <title>Judul Web</title>│ • <main>            │ │ │
│ │  │ • <meta name="viewport">│ │ • <footer>          │ │ │
│ │  └─────────────────────────┘ └─────────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `<!DOCTYPE html>`
- **Fungsi Utama:** Deklarasi standar dokumen HTML5 modern.
- **Parameter / Atribut:** `Wajib di baris paling pertama`.
- **Perilaku & Efek Sistem:** Mengaktifkan rendering Standard Mode pada peramban web modern..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8">
    <title>Standar HTML5</title>
  </head>
  <body style="font-family:system-ui,sans-serif;padding:24px;background:#0f172a;color:white;">
    <h1>Standar Dokumen HTML5 W3C</h1>
    <p>Halaman dirender optimal pada mode peramban modern.</p>
  </body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Halaman dirender sesuai standar W3C
```

### 2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Fungsi Utama:** Pengaturan dimensi dan skala layar mobile.
- **Parameter / Atribut:** `name='viewport', content='...'`.
- **Perilaku & Efek Sistem:** Menyesuaikan skala tampilan 1:1 dengan lebar fisik perangkat agar tidak mengecil di ponsel..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viewport Demo</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: white; margin: 0; }
    .card { background: #1e293b; border: 2px solid #10b981; padding: 20px; border-radius: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h3>Layar Responsif 1:1 Aktif</h3>
    <p>Skala layout menyesuaikan lebar viewport perangkat secara otomatis.</p>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Tampilan responsif di seluruh layar ponsel
```

### 3. `<header>, <main>, <footer>`
- **Fungsi Utama:** Struktur landmark semantik aksesibilitas.
- **Parameter / Atribut:** `Global attributes (class, id, lang)`.
- **Perilaku & Efek Sistem:** Membagi dokumen menjadi banner navigasi, konten unik utama, dan informasi penutup..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Semantic HTML5</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; background: #0f172a; color: white; }
    header, footer { background: #1e293b; padding: 16px 24px; }
    main { padding: 24px; background: #334155; margin: 12px; border-radius: 8px; }
  </style>
</head>
<body>
  <header><h1>Portal Navigasi</h1></header>
  <main><p>Konten utama dokumen HTML5 beraksesibilitas tinggi.</p></main>
  <footer><small>&copy; 2026 Tryngo Platform</small></footer>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Terbaca jelas oleh screen reader & mesin pencari
```

### 4. `<form action="/api" method="POST">`
- **Fungsi Utama:** Kontainer pengumpulan data pengguna.
- **Parameter / Atribut:** `action (URL), method (GET/POST)`.
- **Perilaku & Efek Sistem:** Menyediakan wadah terstruktur untuk memvalidasi dan mengirimkan data input ke server..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Formulir Input</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: white; }
    form { display: flex; flex-direction: column; gap: 12px; max-width: 320px; }
    input { padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: white; }
    button { padding: 10px; background: #10b981; color: #022c22; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <form onsubmit="event.preventDefault(); alert('Data terkirim: ' + this.user.value);">
    <label for="user">Nama Pengguna:</label>
    <input type="text" id="user" name="user" value="Budi Santoso" required />
    <button type="submit">Kirim Formulir</button>
  </form>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Formulir interaktif siap dikirim
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Tag bersarang tidak tertutup (Unclosed/Mismatched Tags)
- **Gejala / Masalah:** Tata letak halaman rusak atau elemen inline menelan elemen block.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu tutup tag berpasangan dan manfaatkan validator HTML5 atau auto-closing tag di VS Code.

### 2. Penggunaan tag <div> berlebihan (Div Soup)
- **Gejala / Masalah:** Website sulit diakses pembaca layar (screen reader) dan skor SEO menurun drastis.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan tag semantik seperti <header>, <nav>, <main>, <article>, dan <footer>.

### 3. Lupa atribut 'alt' pada <img> dan 'for' pada <label>
- **Gejala / Masalah:** Skor aksesibilitas (a11y) merah dan form sulit diklik pada perangkat layar sentuh.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu sertakan deskripsi alt yang bermakna dan hubungkan label dengan id input terkait.

---

## Ringkasan

Kamu telah menguasai anatomi dokumen HTML5 yang valid, konfigurasi viewport mobile, metadata SEO, serta landmark semantik dasar. Minggu depan kita akan mempelajari hierarki teks, daftar terstruktur, dan navigasi multi-halaman.
