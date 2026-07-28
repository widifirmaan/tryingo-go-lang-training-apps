# HTML Semantik

> HTML5 | Modul 8

## Tujuan Pembelajaran

- Menggunakan elemen semantic: header, nav, main, footer
- Membuat struktur halaman dengan section dan article
- Menambahkan konten pendukung dengan aside
- Menggunakan time, figure, details, summary
- Memahami manfaat semantic HTML untuk SEO dan aksesibilitas

---

## Program: Layout Halaman

```html
<!DOCTYPE html>
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
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Mengapa Semantic?
Elemen semantic memberi makna pada konten. Membantu SEO (mesin pencari memahami struktur), aksesibilitas (screen reader navigasi lebih baik), dan maintainability (kode lebih mudah dibaca).

### Structural Elements
`<header>` — kepala halaman/section. `<nav>` — navigasi. `<main>` — konten utama (hanya satu per halaman). `<footer>` — kaki halaman. `<section>` — kelompok tematik. `<article>` — konten independen. `<aside>` — konten pendukung.

### Inline Semantics
`<time>` — waktu. `<figure>` — media dengan caption. `<details>` / `<summary>` — accordion. `<mark>` — teks yang disorot.

### Non-semantic
`<div>` — divisi (tanpa makna). `<span>` — inline container. Gunakan semantic element DULU sebelum div/span.

---

## Eksperimen

Ubah struktur halaman: ganti urutan section dan article,Tambah elemen time dengan datetime untuk jadwal,Gunakan details untuk FAQ section dengan 3 pertanyaan,Buat layout dengan 2 aside di kiri dan kanan

---

## Tantangan

Buat halaman layout website berita dengan: header (logo, navigasi, search form), main content (2 article dengan section, figure, aside untuk sidebar), dan footer (navigasi sekunder, copyright, social media). Gunakan semantic HTML lengkap tanpa div.

---

## Ringkasan

Semantic HTML adalah praktik terbaik untuk menulis kode yang bermakna. Elemen seperti header, nav, main, article, dan section membuat halaman lebih SEO-friendly, aksesibel, dan mudah dipelihara. Modul selanjutnya: **Multimedia & Embed** — cara menambahkan audio, video, dan konten eksternal.
