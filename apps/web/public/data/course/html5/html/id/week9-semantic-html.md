# Semantic HTML — Warung dengan Papan Nama Jelas

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 9:** Semantic HTML
> **Prasyarat:** Minggu 8 — **Validasi Form**.

## Tujuan Pembelajaran

- `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` — papan nama jelas, bukan `div` semua (MDN Semantics)

---

## Kenapa Ini Penting Buat Kamu?

`div` semua = warung tanpa papan nama — Google & screen reader bingung. `nav` = papan "Menu", `main` = "Daftar Produk" — SEO & a11y naik.

---

## Program: Warung Semantic

```html
<body>
  <header><h1>Warung Bu Siti</h1><nav><a href="/">Beranda</a> | <a href="/produk">Produk</a></nav></header>
  <main>
    <section><h2>Produk</h2><article><h3>Beras 5kg</h3><p>Rp 62.000</p></article></section>
    <aside><h2>Promo</h2><p>Gratis ongkir >100rb</p></aside>
  </main>
  <footer>© 2026 Warung</footer>
</body>
```

**Jangan:** `<div id="header">` → pakai `<header>`.

---

## Eksperimen

- **Hijau:** Buka `/produk` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Semantic HTML di Warungmu:** pakai `/produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Validasi Form** (Minggu 8): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 9: **Papan Nama Jelas** — `header/nav/main`. Minggu depan: **Multimedia**.
