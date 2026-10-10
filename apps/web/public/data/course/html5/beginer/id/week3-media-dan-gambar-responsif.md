# Body, Layout Semantik, dan Gambar

> **Kategori:** HTML5 | **Level:** Dasar HTML | **Minggu 3:** Body, Layout Semantik, dan Gambar
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami arsitektur tag semantik layout: <header>, <nav>, <main>, <section>, <article>, <aside>, dan <footer>
- Membedakan elemen Block (<div>, <p>, <section>) dan elemen Inline (<span>, <a>, <strong>)
- Menyisipkan media gambar dengan atribut wajib: <img> (src, alt, width, height)
- Mengelompokkan gambar dengan keterangan menggunakan tag <figure> dan <figcaption>
- Menyusun struktur list tak berurutan (<ul>) dan berurutan (<ol>) dengan item (<li>)

---

## 1. Arsitektur Layout Semantik di Dalam <body>

Dalam HTML5, kita tidak menyusun seluruh halaman hanya menggunakan kotak `<div>`. Kita menggunakan **elemen semantik** yang memiliki makna tujuan:

- **`<header>`**: Bagian kepala atau pengantar situs, berisi logo dan nama situs.
- **`<nav>`**: Area khusus yang memuat tautan navigasi utama.
- **`<main>`**: Area konten inti yang unik untuk halaman tersebut (hanya boleh ada satu `<main>` per halaman).
- **`<section>`**: Pengelompokan konten tematik atau bab isi (misal: bagian tentang, bagian portofolio).
- **`<article>`**: Bagian konten mandiri yang dapat didistribusikan sendiri (misal: satu artikel berita, satu kartu produk).
- **`<aside>`**: Konten pelengkap di sisi samping (misal: info tambahan, profil singkat).
- **`<footer>`**: Bagian kaki halaman, berisi hak cipta, tautan legalitas, dan info kontak.

---

## 2. Elemen Block vs Elemen Inline

Setiap elemen HTML memiliki perilaku tampilan bawaan:

| Kategori | Karakteristik | Contoh Tag |
|---|---|---|
| **Elemen Block** | Selalu memulai baris baru dan memenuhi lebar halaman 100% | `<div>`, `<p>`, `<h1>`-`<h6>`, `<section>`, `<header>`, `<ul>` |
| **Elemen Inline** | Berada di dalam baris teks dan hanya selebar kontennya | `<span>`, `<a>`, `<strong>`, `<em>`, `<code>`, `<time>` |

- **`<div>`**: Wadah pembungkus block umum tanpa makna khusus, digunakan untuk grouping layout CSS.
- **`<span>`**: Wadah pembungkus inline umum, digunakan untuk menandai beberapa kata di tengah kalimat.

---

## 3. Menyisipkan Gambar: <img> dan <figure>

Untuk menampilkan gambar, gunakan tag void `<img>`:
```html
<img src="images/profil.jpg" alt="Foto profil Alex Pratama" width="300" height="200">
```
- **`src`**: Alur lokasi file gambar (*Source*).
- **`alt`**: Teks alternatif jika gambar gagal dimuat, serta dibaca oleh pembaca layar (*screen reader*). Atribut ini wajib ada demi aksesibilitas dan SEO.
- **`width` & `height`**: Menentukan ukuran gambar agar browser dapat mengalokasikan ruang sebelum gambar selesai diunduh (*mencegah layout shift*).

### Menggunakan <figure> dan <figcaption>:
Jika gambar memiliki keterangan foto (*caption*), bungkus dengan `<figure>`:
```html
<figure>
  <img src="images/kantor.jpg" alt="Ruang kerja studio">
  <figcaption>Gambar 1: Suasana ruang kerja studio desain kami.</figcaption>
</figure>
```

---

## Program: Tata Letak Semantik Halaman Beranda dengan Media Gambar

```html
<!DOCTYPE html>
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
</html>
```

---

## Bedah Detail Kode Program

- Line 18-24: `<header>` membungkus navigasi `<nav>` dan judul situs `<h1>`.
- Line 26-49: `<main>` memuat dua elemen `<section>` tematik: profil studio dan daftar keahlian.
- Line 31-38: `<figure>` dan `<figcaption>` menyajikan gambar bersama keterangan foto secara semantik.
- Line 41-47: `<ul>` dan `<li>` menampilkan daftar keahlian dasar dalam bentuk poin.
- Line 51-53: `<footer>` memuat informasi hak cipta di bagian paling bawah halaman.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 3 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa menyertakan atribut `alt` pada tag `<img>`.
- Menggunakan tag `<div>` untuk seluruh struktur tanpa memanfaatkan tag semantik seperti `<section>` atau `<header>`.
- Memasukkan elemen block di dalam elemen inline (misalnya membungkus `<p>` di dalam `<span>`).

---

## Ringkasan

- Modul Minggu 3 (Body, Layout Semantik, dan Gambar) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
