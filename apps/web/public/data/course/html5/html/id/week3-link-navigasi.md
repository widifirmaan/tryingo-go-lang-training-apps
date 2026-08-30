# Link & Navigasi — Jalan Antar Warung

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 3:** Link & Navigasi

## Tujuan Pembelajaran

- `href` jalan: `href="/produk"` dalam, `href="https://..."` luar, `href="#promo"` lompat dalam halaman
- `target="_blank"` buka tab baru + `rel="noopener"` aman
- `nav`, `ul>li>a` menu, `a` download `download` dan `mailto:`

---

## Kenapa Ini Penting Buat Kamu?

Warung tanpa jalan = pelanggan di beranda tidak bisa ke produk. Link = **jalan**. `nav` = papan petunjuk.

---

## Program: Menu Warung 3 Halaman

```html
<nav>
  <ul>
    <li><a href="/">Beranda</a></li>
    <li><a href="/produk.html">Produk</a></li>
    <li><a href="/kontak.html">Kontak</a></li>
    <li><a href="https://wa.me/62812" target="_blank" rel="noopener">WA</a></li>
  </ul>
</nav>

<main>
  <h1 id="promo">Promo Hari Ini</h1>
  <p><a href="#promo">Lompat ke promo</a></p>
  <p><a href="katalog.pdf" download>Download Katalog</a></p>
  <p><a href="mailto:warung@email.com">Email</a></p>
</main>
```

---

## Konsep Kunci

### `href` 3 Jalan
- `/produk.html` dalam, `https://` luar, `#promo` lompat, `mailto:` email

### `nav` + `ul`
`nav` bungkus menu, `ul>li>a` daftar jalan.

---

## Penjelasan untuk Pemula

### Analogi: Jalan & Papan Petunjuk
- **`<a href="/produk">` = jalan ke toko sebelah**, **`nav` = papan petunjuk** di depan.

---

## Tantangan

**Warung 3 Halaman:** `index.html` (Beranda), `produk.html` (daftar), `kontak.html` (WA+email) + `nav` sama di 3 file, + link `#promo`.

---

## Ringkasan

Minggu 3: **Link** — jalan antar warung. Minggu depan: **Gambar & Media**.
