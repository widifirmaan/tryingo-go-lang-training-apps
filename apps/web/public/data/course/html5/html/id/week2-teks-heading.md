# Teks & Heading

> HTML5 | Modul 2

## Tujuan Pembelajaran

- Menggunakan heading h1 sampai h6 dengan hierarki yang benar
- Menulis paragraf dan teks dengan berbagai format
- Menguasai elemen teks semantik: strong, em, mark, small
- Menggunakan blockquote, pre, code, dan entities
- Memahami pentingnya hierarki heading untuk SEO dan aksesibilitas

---

## Program: Artikel Blog

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Artikel Blog</title>
</head>
<body>
  <h1>Belajar HTML5</h1>
  <h2>Apa Itu HTML?</h2>
  <p><strong>HTML</strong> adalah bahasa markup untuk struktur web.</p>
  <p>Elemen <em>teks miring</em> dan <mark>teks yang ditandai</mark>.</p>

  <h2>Kutipan</h2>
  <blockquote>
    <p>HTML adalah fondasi dari seluruh World Wide Web.</p>
    <cite>— Tim Berners-Lee</cite>
  </blockquote>

  <h2>Kode Program</h2>
  <pre><code>&lt;h1&gt;Hello World&lt;/h1&gt;
&lt;p&gt;Ini paragraf.&lt;/p&gt;</code></pre>

  <h2>Daftar Istilah</h2>
  <dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
  </dl>

  <p>Teks dengan <small>small print</small>, <del>coret</del>, dan <ins>sisipan</ins>.</p>
  <p>Rumus: E = mc<sup>2</sup> dan H<sub>2</sub>O</p>
  <p>&copy; 2026 Tryngo &mdash; &ldquo;Belajar &amp; Berkreasi&rdquo;</p>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Heading
`<h1>` sampai `<h6>` — hierarki judul. Gunakan satu `<h1>` per halaman untuk SEO. Jangan skip level heading.

### Format Teks
`<strong>` — penting (bold). `<em>` — penekanan (italic). `<mark>` — teks yang ditandai. `<small>` — teks kecil. `<del>` — teks dihapus. `<ins>` — teks disisipkan.

### Kutipan & Kode
`<blockquote>` — kutipan panjang. `<cite>` — sumber kutipan. `<pre>` — teks preformatted. `<code>` — kode program inline.

### Entities
`&amp;` untuk `&`. `&lt;` untuk `<`. `&gt;` untuk `>`. `&copy;` untuk ©. `&mdash;` untuk —.

---

## Eksperimen

Buat heading h1 sampai h4 dengan konten sendiri,Gunakan semua format teks: strong, em, mark, small, del, ins,Buat blockquote dengan kutipan favorit Anda,Tulis rumus matematika menggunakan sup dan sub

---

## Tantangan

Buat halaman artikel blog dengan: judul artikel, penulis dan tanggal, kutipan dari tokoh terkenal, highlight pada kata kunci, daftar istilah, dan kode program. Gunakan minimal 10 elemen format teks yang berbeda.

---

## Ringkasan

Heading dan format teks adalah alat dasar untuk menyajikan konten. Hierarki heading yang benar membantu SEO dan aksesibilitas. Modul selanjutnya: **Tautan & Navigasi** — cara menghubungkan halaman dan sumber daya.
