# Head, Teks, dan Link

> **Kategori:** HTML5 | **Level:** Dasar HTML | **Minggu 2:** Head, Teks, dan Link
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami konfigurasi elemen <head>: <title>, favicon <link rel="icon">, dan <link rel="stylesheet">
- Menguasai hierarki heading <h1> sampai <h6> secara teratur untuk keterbacaan dan SEO
- Menggunakan tag format teks: <p>, <strong>, <em>, <pre>, <code>, <time>, dan <br>
- Membuat file halaman kedua (layanan.html) di dalam folder proyek
- Menghubungkan halaman menggunakan tag link <a href="...">, path relatif (./, ../), dan bookmark #id

---

## 1. Membedah Elemen <head> Secara Rinci

Elemen `<head>` adalah pusat kendali metadata dokumen yang tidak tampil langsung di kanvas halaman:

1. **`<title>`**: Menentukan teks judul pada tab browser dan hasil pencarian mesin pencari.
2. **`<link rel="icon" href="favicon.ico">`**: Menampilkan ikon logo kecil pada tab browser di sebelah judul.
3. **`<link rel="stylesheet" href="style.css">`**: Menghubungkan file kode CSS eksternal ke dalam dokumen HTML.
4. **`<meta name="description" content="...">`**: Deskripsi ringkas isi halaman untuk hasil pencarian Google.

---

## 2. Tipografi dan Hierarki Teks

HTML menyediakan tag semantik untuk menyusun hierarki tulisan:
- **Heading (`<h1>` s/d `<h6>`):**
  - `<h1>`: Judul utama halaman (hanya boleh ada satu `<h1>` per dokumen).
  - `<h2>`: Judul sub-bab besar.
  - `<h3>` s/d `<h6>`: Sub-bagian yang lebih kecil secara berurutan. Jangan pernah melompati tingkatan (misal dari `<h2>` langsung ke `<h4>`).
- **Paragraf & Format Teks:**
  - `<p>`: Paragraf teks biasa.
  - `<strong>`: Menandai teks penting secara makna (tampil tebal).
  - `<em>`: Memberi penekanan bacaan (*emphasis*, tampil miring).
  - `<code>` & `<pre>`: Menampilkan cuplikan kode komputer dengan font monospace.
  - `<time datetime="2026-10-10">`: Menandai format tanggal agar terbaca oleh mesin crawler.

---

## 3. Struktur File Proyek dan Navigasi Halaman

Dalam proyek website nyata, kita tidak hanya membuat satu file. Kita menyusun beberapa file dalam satu folder:

```text
my-website/
├── index.html        # Halaman Beranda (Halaman Utama)
├── layanan.html      # Halaman Daftar Layanan (Halaman Kedua)
└── css/
    └── style.css     # File CSS Eksternal
```

### Cara Membuat File Baru dan Menghubungkannya:
1. Di VS Code, buat file baru di samping `index.html` dengan nama `layanan.html`.
2. Di dalam file `index.html`, tambahkan link menuju file kedua menggunakan tag `<a>`:
```html
<nav>
  <a href="index.html">Beranda</a> |
  <a href="layanan.html">Layanan</a>
</nav>
```
3. **Jenis-Jenis Link:**
   - **Link Internal:** `<a href="layanan.html">` (berpindah ke file lain di folder yang sama).
   - **Link Eksternal:** `<a href="https://example.com" target="_blank">` (membuka website luar di tab baru).
   - **Link Bookmark:** `<a href="#biaya">` (melompat ke elemen dengan `id="biaya"` di halaman yang sama).

---

## Program: Halaman Layanan dengan Navigasi dan Tipografi Terstruktur

```html
<!DOCTYPE html>
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
</html>
```

---

## Bedah Detail Kode Program

- Line 16-20: `<nav>` menyediakan link navigasi antar file (`index.html` dan `layanan.html`) serta bookmark link `#prosedur`.
- Line 22: Tag `<time datetime="2026-10-10">` memberikan format tanggal yang terbaca mesin.
- Line 31-35: Tag `<pre>` dan `<code>` menampilkan blok kode HTML tanpa dirender oleh browser.
- Line 37: `id="prosedur"` menjadi target lompat untuk link `<a href="#prosedur">`.
- Line 46: Atribut `target="_blank"` membuka tautan di tab baru.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 2 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Menulis path link yang salah (misal: `layanan.htm` alih-alih `layanan.html`).
- Menggunakan lebih dari satu tag `<h1>` pada satu file dokumen.
- Lupa memberikan atribut `datetime` pada tag `<time>`.

---

## Ringkasan

- Modul Minggu 2 (Head, Teks, dan Link) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
