# Dasar HTML & Web

> HTML5 | Modul 1

## Tujuan Pembelajaran

- Memahami cara kerja web: client, server, HTTP, DNS
- Menguasai struktur dasar dokumen HTML5
- Mengenal elemen, tag, dan atribut HTML
- Membuat halaman HTML pertama dengan benar
- Menggunakan komentar dan whitespace dalam HTML

---

## Program: Halaman Pertamaku

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Halaman Pertamaku</title>
</head>
<body>
  <h1>Halo, Dunia!</h1>
  <p>Ini adalah halaman HTML pertama saya.</p>
  <p>Saya sedang belajar HTML5 di Tryngo.</p>

  <h2>Apa Itu HTML?</h2>
  <p>HTML adalah bahasa markup untuk membuat struktur halaman web.</p>

  <h2>Elemen & Tag</h2>
  <p>Tag dimulai dengan <code>&lt;</code> dan diakhiri dengan <code>&gt;</code>.</p>
  <p>Contoh: <code>&lt;p&gt;Ini paragraf&lt;/p&gt;</code></p>

  <h3>Atribut</h3>
  <p>Atribut memberikan informasi tambahan pada elemen.</p>
  <p>Contoh: <code>&lt;html lang="id"&gt;</code></p>

  <!-- Ini adalah komentar -- tidak muncul di halaman -->
  <p>Komentar membantu developer memahami kode.</p>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Cara Kerja Web
Browser mengirim HTTP request ke server, server merespon dengan file HTML. DNS menerjemahkan domain ke IP address. HTML adalah bahasa markup — bukan bahasa pemrograman. Ia mendeskripsikan struktur konten.

### Struktur Dokumen
`<!DOCTYPE html>` — deklarasi tipe dokumen (HTML5). `<html>` — elemen root. `<head>` — metadata (charset, viewport, title). `<body>` — konten yang terlihat.

### Elemen, Tag, Atribut
Elemen = tag pembuka + konten + tag penutup. Atribut memberikan informasi tambahan. Contoh: `<html lang="id">` — `lang` adalah atribut.

---

## Eksperimen

Ganti title halaman dengan judul sendiri,Tambahkan satu paragraf lagi tentang hobi Anda,Gunakan atribut lang="en" — apa yang berubah?,Buat struktur halaman dengan 3 level heading

---

## Tantangan

Buat halaman profil pribadi lengkap dengan: struktur HTML5 yang valid, judul halaman, heading bertingkat, paragraf tentang diri Anda, daftar hobi menggunakan unordered list, dan tautan ke media sosial. Pastikan menggunakan semantic HTML dan komentar yang jelas.

---

## Ringkasan

Anda telah memahami cara kerja web dan struktur dasar HTML5. Mulai dari DOCTYPE, elemen root, head, hingga body — semuanya adalah fondasi halaman web. Modul selanjutnya: **Teks & Heading** — cara menulis dan memformat konten teks.
