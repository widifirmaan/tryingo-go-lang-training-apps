# HTML5 APIs & Best Practices

> Web Storage, Geolocation, Drag & Drop, Web Components, dan validasi HTML.

## Tujuan Pembelajaran

- Memahami struktur dasar dokumen HTML5
- Menguasai elemen-elemen semantik HTML5
- Menerapkan praktik terbaik penulisan kode HTML
- Membangun halaman web yang terstruktur dan aksesibel

## Materi

### Struktur Dasar Dokumen HTML5

Setiap dokumen HTML5 dimulai dengan deklarasi DOCTYPE dan struktur elemen dasar:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML5 APIs & Best Practices</title>
</head>
<body>
  <!-- Konten halaman -->
</body>
</html>
```

### Penjelasan Detail

Dokumen HTML5 memiliki struktur hierarkis. Elemen `<html>` adalah root, `<head>` berisi metadata, dan `<body>` berisi konten yang ditampilkan.

```html
<!-- Contoh elemen semantik -->
<header>
  <nav>
    <ul>
      <li><a href="#home">Beranda</a></li>
      <li><a href="#about">Tentang</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Judul Artikel</h1>
    <p>Konten paragraf dengan <strong>teks tebal</strong> dan <em>teks miring</em>.</p>
  </article>
</main>

<footer>
  <p>&copy; 2026 Tryngo</p>
</footer>
```

### Praktik Terbaik

1. Selalu gunakan `<!DOCTYPE html>` di awal dokumen
2. Setel atribut `lang` pada elemen `<html>`
3. Gunakan elemen semantik (`<header>`, `<nav>`, `<main>`, dll.)
4. Sertakan `alt` pada semua gambar
5. Validasi HTML menggunakan W3C Validator

## Latihan Praktik

1. **Latihan 1:** Buat halaman HTML sederhana dengan struktur yang benar
2. **Latihan 2:** Terapkan setidaknya 5 elemen baru yang dipelajari
3. **Latihan 3:** Validasi halaman HTML menggunakan W3C Validator

## Tugas Proyek

Buat sebuah halaman web yang menerapkan semua konsep html5 apis & best practices. Halaman harus memiliki struktur HTML5 yang valid, menggunakan elemen semantik yang tepat, dan siap untuk dikembangkan lebih lanjut.

## Ringkasan

Pada sesi ini, kita telah mempelajari dasar-dasar html5 apis & best practices. Pastikan Anda memahami setiap konsep sebelum melanjutkan ke minggu berikutnya.

Terus berlatih dan eksplorasi! 🚀
