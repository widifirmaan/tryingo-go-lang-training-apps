# Proyek Akhir: Portal Korporat Aksesibel, Semantik & Siap Produksi

> **Kategori:** HTML5 | **Level:** Formulir Modern, Aksesibilitas & Web API | **Minggu 8:** Proyek Akhir: Portal Korporat Aksesibel, Semantik & Siap Produksi
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh struktur semantik HTML5 dalam satu aplikasi web portal produksi utuh
- Menghubungkan navigasi internal, tautan skip-link, landmark semantik, dan headings tanpa celah aksesibilitas
- Menerapkan gambar responsif multi-format dengan picture, srcset, loading="lazy", dan rasio aspek presisi
- Menyajikan data teknis kompleks menggunakan tabel relasional dengan thead, tbody, scope, dan captioning tepat
- Membangun formulir registrasi interaktif lengkap dengan pengelompokan fieldset dan validasi browser native

---

## Program: Aplikasi Portal Web Korporat Multi-Halaman Lengkap

```html
<!DOCTYPE html>
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
</html>
```

---

## Konsep Kunci

### Arsitektur Web Portal Produksi
Sebuah halaman web berkualitas profesional tidak dinilai dari kerumitan kodenya, melainkan dari **ketepatan semantik, kecepatan rendering, dan inklusivitas aksesibilitasnya**:
1. **Pondasi Semantik Utuh**: Dokumen menggunakan struktur hierarkis `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<figure>`, dan `<footer>`.
2. **Kinerja Aset Maksimal**: Menggunakan `<picture>` dan `loading="lazy"` memastikan halaman dimuat secara instan di jaringan 3G sekalipun.
3. **Standar Aksesibilitas Penuh**: Lolos uji audit aksesibilitas (skor 100% pada Google Lighthouse / axe-core) berkat skip link, hierarki heading tunggal `<h1>`, pelabelan formulir eksplisit, dan atribut `scope` pada seluruh tabel.
4. **Validasi Mandiri**: Formulir memanfaatkan constraint validation HTML5 sehingga tidak dapat mengirim data cacat ke server.

---

---

## Penjelasan untuk Pemula

### Analogi: Gedung Pusat Pelayanan Terpadu
Halaman capstone ini seperti sebuah gedung pusat pelayanan publik berstandar internasional:
- Pintunya memiliki rampa landai untuk kursi roda (**aksesibilitas dan skip links**).
- Terdapat papan petunjuk jalan yang terang benderang di setiap lorong (**navigasi dan landmarks**).
- Setiap ruangan memiliki nomor dan nama ruangan yang jelas (**hierarki heading H1-H3**).
- Brosur informasi dan formulir tersedia rapi di meja resepsionis (**tabel data dan formulir validasi**).
- Siapa pun yang datang, baik orang dewasa, anak-anak, lansia, maupun penyandang disabilitas, dapat menggunakan gedung ini dengan nyaman dan mandiri.

## Eksperimen

- Buka file ini di Google Chrome, jalankan audit Lighthouse pada tab "Accessibility", dan perhatikan tercapainya skor 100%.
- Jelajahi seluruh halaman dari awal hingga akhir hanya menggunakan tombol TAB keyboard tanpa menyentuh mouse.
- Coba masukkan alamat email tidak valid ke dalam formulir dan tekan submit untuk melihat browser menolak pengiriman secara native.
- Gunakan fitur inspect element untuk melihat bagaimana gambar WebP otomatis dipilih oleh browser modern.

---

## Tantangan

Kembangkan portal ini menjadi situs multi-halaman utuh dengan menambahkan halaman kedua "tentang.html" dan halaman ketiga "karir.html". Pastikan tautan navigasi antar-halaman sinkron dan atribut `aria-current="page"` aktif pada halaman yang sesuai.

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum HTML5 dari nol hingga proyek portal produksi berstandar aksesibilitas internasional. Kamu sekarang siap melangkah ke kurikulum CSS3 untuk merancang sistem tata letak visual modern!
