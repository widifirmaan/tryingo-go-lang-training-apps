# Tautan & Navigasi

> HTML5 | Modul 3

## Tujuan Pembelajaran

- Membuat tautan dengan tag a dan href
- Membedakan URL absolut, relatif, dan internal
- Menggunakan target untuk membuka link di tab baru
- Membuat navigasi menu dengan semantic HTML
- Membuat email link dan bookmark dalam halaman

---

## Program: Navigasi Situs

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navigasi Situs</title>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="index.html">Beranda</a></li>
        <li><a href="about.html">Tentang</a></li>
        <li><a href="services.html">Layanan</a></li>
        <li><a href="contact.html">Kontak</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <h1>Selamat Datang</h1>
    <p>Pelajari berbagai jenis tautan di bawah ini:</p>

    <h2>Tautan Eksternal</h2>
    <p><a href="https://www.w3schools.com" target="_blank">W3Schools (buka tab baru)</a></p>
    <p><a href="https://developer.mozilla.org" target="_blank">MDN (buka tab baru)</a></p>

    <h2>Tautan Internal</h2>
    <p><a href="#services">Langsung ke Layanan</a></p>

    <h2>Tautan Email & Telepon</h2>
    <p><a href="mailto:info@tryngo.com">Kirim Email</a></p>
    <p><a href="tel:+628123456789">Hubungi: +62 812-3456-789</a></p>

    <h2>Tautan Download</h2>
    <p><a href="file.pdf" download>Download PDF</a></p>

    <h2 id="services">Layanan Kami</h2>
    <p>Kursus pemrograman online. Klik <a href="#">kembali ke atas</a>.</p>

    <h2>Tautan dengan Gambar</h2>
    <p><a href="https://tryngo.com"><img src="https://placehold.co/200x60/E34F26/fff?text=Tryngo" alt="Logo Tryngo"></a></p>
  </main>
</body>
</html>
```

---

## Penjelasan

Berikut penjelasan detail materi:

### Tag Anchor
`<a href="url">teks</a>` — elemen tautan. `href` adalah atribut tujuan.

### URL Types
**Absolute** — URL lengkap: `https://example.com/page`. **Relative** — path relatif: `/about` atau `../page.html`. **Internal** — bookmark: `#section`.

### Target
`_self` — buka di tab yang sama (default). `_blank` — buka di tab baru. Selalu tambahkan `rel="noopener"` untuk keamanan jika pakai `_blank`.

### Navigasi
Gunakan `<nav>` untuk menu navigasi. Kombinasikan dengan `<ul>` dan `<li>` untuk struktur yang semantic.

---

## Eksperimen

Buat navigasi menu dengan 5 tautan,Tambah tautan ke halaman web favorit dengan target _blank,Buat bookmark internal yang menuju ke bagian footer,Buat tautan download dengan atribut download

---

## Tantangan

Buat halaman "Sumber Belajar" dengan navigasi yang lengkap: menu navigasi utama dengan 5 item, tautan ke 10 sumber belajar eksternal (buka tab baru), bookmark internal untuk setiap kategori, tautan email untuk kontak, dan tautan download panduan PDF.

---

## Ringkasan

Tautan adalah yang membuat web menjadi "web". Dengan anchor tag, navigasi, email link, dan bookmark, Anda bisa menghubungkan informasi di seluruh dunia. Modul selanjutnya: **Gambar & Figure** — cara menampilkan dan mengoptimalkan gambar.
