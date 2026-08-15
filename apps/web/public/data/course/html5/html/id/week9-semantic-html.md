# Semantic HTML

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 9:** Semantic HTML

## Tujuan Pembelajaran

- Elemen semantic: header, nav, main, article, section, aside, footer
- Perbedaan div (non-semantic) vs elemen semantic
- Hierarki elemen semantic yang benar
- Manfaat semantic: SEO, aksesibilitas, maintainability
- Elemen details dan summary untuk konten collapsible

---

## Program: Struktur Halaman Semantic

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Blog Semantic</title>
</head>
<body>
    <header>
        <h1>Blog Saya</h1>
        <nav>
            <ul>
                <li><a href="#home">Beranda</a></li>
                <li><a href="#artikel">Artikel</a></li>
                <li><a href="#tentang">Tentang</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h2>Belajar Semantic HTML</h2>
                <p>Ditulis <time datetime="2026-08-06">6 Agustus 2026</time></p>
            </header>
            <p>Semantic HTML memberikan makna pada struktur halaman...</p>
            <section>
                <h3>Mengapa Semantic?</h3>
                <p>SEO, aksesibilitas, dan maintainability lebih baik.</p>
            </section>
            <section>
                <h3>Elemen Semantic Utama</h3>
                <p>header, nav, main, article, section, aside, footer.</p>
            </section>
            <footer>
                <p>Kategori: <a href="#html">HTML</a></p>
            </footer>
        </article>

        <aside>
            <h3>Artikel Terkait</h3>
            <ul>
                <li><a href="#">Pengantar CSS</a></li>
                <li><a href="#">Dasar JavaScript</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 Blog Saya. Semua hak dilindungi.</p>
        <address>Email: <a href="mailto:info@blog.com">info@blog.com</a></address>
    </footer>
</body>
</html>
```

---

## Konsep Kunci

### Elemen Semantic
`<header>` intro/navigasi, `<nav>` menu, `<main>` konten utama (1x), `<article>` konten independen, `<section>` bagian tematik, `<aside>` konten sampingan, `<footer>` penutup.

### Div vs Semantic
`<div>` tidak punya makna. Semantic elemen memberitahu browser dan screen reader tentang peran konten.

### Manfaat
- SEO: search engine pahami struktur
- A11y: screen reader navigasi lebih baik
- Maintain: kode lebih readable

---

## Penjelasan untuk Pemula

Semantic = **bermakna**. Elemen semantic memberi tahu pembaca (dan browser/screen reader) bagian apa tiap blok halaman.

- `<header>` = kepala halaman/bagian (biasanya judul + nav).
- `<nav>` = menu navigasi.
- `<main>` = konten utama (dipakai sekali per halaman).
- `<article>` = konten yang berdiri sendiri (berita, postingan).
- `<section>` = bagian tematik di dalam halaman.
- `<aside>` = konten samping (sidebar).
- `<footer>` = kaki halaman (copyright, kontak).

Bandingkan dengan `<div>` yang netral / tanpa makna. Memakai elemen semantic membuat kode rapi, jelas bagi mesin pencari, dan mudah diakses pembaca layar.

**Coba:** Di program minggu ini, ganti `<nav>` dengan `<div>` lalu jalankan — halaman tetap tampak sama, tapi sekarang tidak ada petunjuk bahwa itu menu.

---

## Eksperimen

- Buat halaman dengan multiple article di main
- Tambah details + summary untuk FAQ
- Coba nested section di dalam article
- Buat layout dengan aside di kanan
- Eksperimen address di footer

---

## Tantangan

Buat halaman blog lengkap: header dengan nav, main dengan 2 article, aside dengan widget, footer dengan address.

---

## Ringkasan

Minggu 9 dari 14: **Semantic HTML** (Level: HTML5 Lengkap). Makna dan struktur. Minggu depan: **Multimedia: Audio & Video**.
