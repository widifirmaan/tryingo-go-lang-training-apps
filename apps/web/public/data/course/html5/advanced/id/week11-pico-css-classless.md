# Pico CSS: Classless CSS

> **Kategori:** HTML5 | **Level:** Framework UI | **Minggu 11:** Pico CSS: Classless CSS
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami konsep "Classless CSS" (menghias tag native HTML tanpa perlu menulis class kustom)
- Memasang Pico CSS via CDN link CSS di dalam <head>
- Melihat bagaimana tag standar (<header>, <main>, <article>, <button>, <table>) otomatis tampil rapi dan elegan
- Memanfaatkan fitur dark mode otomatis bawaan Pico CSS berdasarkan prefers-color-scheme sistem
- Mengetahui kasus penggunaan terbaik Pico CSS (web dokumentasi, dashboard internal, dan MVP)

---

## 1. Apa Itu Classless CSS?

Di framework seperti Bootstrap atau Bulma, Anda harus menghafal puluhan nama class seperti `.card`, `.btn`, `.row`.

**Pico CSS** menggunakan pendekatan yang berbeda: **Classless CSS**.
- Anda **tidak perlu menulis class apa pun**.
- Anda cukup menulis tag HTML standar: `<header>`, `<main>`, `<article>`, `<button>`, `<table>`, dan `<form>`.
- Pico CSS secara otomatis memberikan tata letak modern, font yang proporsional, jarak margin yang pas, dan palet warna yang elegan pada tag native tersebut!

### Pemasangan via CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
```

---

## 2. Fitur Unggulan Pico CSS
1. **Mode Terang dan Gelap Otomatis:** Pico CSS otomatis membaca pengaturan sistem operasi pengguna (`prefers-color-scheme`). Jika laptop pengguna disetel dark mode, website otomatis berubah menjadi gelap!
2. **Formulir dan Tabel Otomatis Rapi:** Tag `<input>`, `<select>`, dan `<table>` langsung tampil seperti aplikasi profesional.
3. **Kapan Memilih Pico CSS:** Sangat ideal untuk halaman dokumentasi, blog tulisan, dashboard data internal, atau prototipe cepat.

---

## Program: Penerapan Semantic HTML Murni dengan Pico CSS (Classless)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dokumentasi Proyek — Pico CSS</title>
  <!-- Pico CSS CDN (Classless CSS) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
</head>
<body>

  <header class="container">
    <nav>
      <ul>
        <li><strong>Studio Alex</strong></li>
      </ul>
      <ul>
        <li><a href="#">Dokumentasi</a></li>
        <li><a href="#">Layanan</a></li>
      </ul>
    </nav>
  </header>

  <main class="container">
    <hgroup>
      <h1>Pencatatan Proyek HTML</h1>
      <p>Halaman ini tidak menggunakan class CSS kustom sama sekali.</p>
    </hgroup>

    <article>
      <h2>Data Evaluasi Dokumen</h2>
      <p>Seluruh elemen di dalam artikel ini tampil rapi secara otomatis berkat Pico CSS:</p>

      <table>
        <thead>
          <tr>
            <th>Elemen</th>
            <th>Peran Semantik</th>
            <th>Dukungan Layar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>&lt;header&gt;</code></td>
            <td>Pengantar Situs</td>
            <td>100% Responsif</td>
          </tr>
          <tr>
            <td><code>&lt;article&gt;</code></td>
            <td>Kotak Konten Mandiri</td>
            <td>Auto Dark Mode</td>
          </tr>
        </tbody>
      </table>

      <form>
        <label for="catatan">Catatan Tambahan:</label>
        <input type="text" id="catatan" placeholder="Ketik catatan evaluasi...">
        <button type="submit">Simpan Catatan</button>
      </form>
    </article>
  </main>

  <footer class="container">
    <small>&copy; 2026 Alex Pratama. Dirender dengan Pico CSS murni.</small>
  </footer>

</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 7: Memuat satu file stylesheet Pico CSS CDN yang langsung menghias seluruh tag dokumen.
- Line 12-21: `<nav>`, `<ul>`, dan `<li>` otomatis menjadi navigasi horizontal tanpa menulis class flexbox.
- Line 29-57: `<article>`, `<table>`, dan `<form>` langsung tampil elegan dengan padding dan shadow otomatis.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 11 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Mencoba menambahkan class Bootstrap di dalam Pico CSS (Pico dirancang untuk tag HTML murni tanpa nama class berlebih).
- Lupa menggunakan tag semantik seperti `<article>` atau `<hgroup>` sehingga Pico tidak dapat menerapkan styling optimal.
- Menulis inline style berlebihan yang menimpa kalkulasi font otomatis Pico.

---

## Ringkasan

- Modul Minggu 11 (Pico CSS: Classless CSS) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
