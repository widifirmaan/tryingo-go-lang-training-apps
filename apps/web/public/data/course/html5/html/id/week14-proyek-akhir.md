# Proyek Akhir — Warung HTML Lengkap Online

> **Kategori:** HTML5 | **Level:** HTML5 Lengkap | **Minggu 14:** Proyek Akhir
> **Prasyarat:** Minggu 13 — **SEO & Meta**.

## Tujuan Pembelajaran

- Gabung W1-W13: `semantic` + `table` + `form` + `img` + `details` + `meta SEO` jadi 1 warung `index.html` + deploy `Netlify` drag-drop

---

## Kenapa Ini Penting Buat Kamu?

13 minggu terpisah — capstone buktikan gabung jadi produk nyata yang bisa dibuka HP + lolos `WAVE` 0 error + Google baca. Ini portfolio "HTML production-ready".

---

## Program: Warung Lengkap Deploy

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Warung Bu Siti — Beras & Sayur Segar</title>
  <meta name="description" content="Warung Bu Siti — beras 5kg Rp 62.000, sayur segar, gratis ongkir. Buka 07.00-20.00.">
</head>
<body>
  <header>
    <h1>Warung Bu Siti</h1>
    <nav><a href="/">Beranda</a> | <a href="/produk.html">Produk</a> | <a href="/kontak.html">Kontak</a></nav>
  </header>
  <main>
    <table>
      <caption>Daftar Harga 25 Agustus 2026</caption>
      <thead><tr><th scope="col">Produk</th><th scope="col">Harga</th></tr></thead>
      <tbody>
        <tr><th scope="row">Beras 5kg</th><td>Rp 62.000</td></tr>
        <tr><th scope="row">Bayam</th><td>Rp 5.000</td></tr>
      </tbody>
    </table>
    <form action="/pesan" method="post">
      <label for="nama">Nama</label>
      <input id="nama" name="nama" required>
      <button>Pesan</button>
    </form>
    <figure>
      <img src="beras.jpg" alt="Karung beras 5kg" width="300">
      <figcaption>Beras pulen</figcaption>
    </figure>
    <details><summary>Ongkir?</summary><p>Gratis &gt;Rp 100.000</p></details>
  </main>
  <footer>© 2026 Warung — WA 0812</footer>
</body>
</html>
```

Deploy: `netlify.com` → drag `index.html` → `warung.netlify.app`. Cek `WAVE` extension = 0 error + `Lighthouse` SEO 90+.

---

## Konsep Kunci

### Capstone = Gabung 13 Minggu
Semantic + tabel + form + gambar + SEO + a11y = 1 warung.

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening
- **W1-W5 fondasi** + **W6-W13 finishing** = toko. **W14 = buka**.

### 3 Istilah Wajib
1. **Capstone/deploy**: gabung/buka cabang online

---

## Eksperimen

- **Hijau:** Buka `/pesan` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Grand Opening:** 3 halaman (`index/produk/kontak`) + nav sama + tabel + form + SEO + deploy + WAVE 0 error + video 1 menit. **Selesai HTML5 0→Ahli!** 🎉

---
- **Checklist integrasi:** **Pengantar HTML** (Minggu 1) + **Format Teks & Tipografi** (Minggu 2) + **Link & Navigasi** (Minggu 3) + **Gambar & Media** (Minggu 4) + **List & Daftar** (Minggu 5) + **Tabel** (Minggu 6) + **Form & Input** (Minggu 7) + **Validasi Form** (Minggu 8) + **Semantic HTML** (Minggu 9) + **Multimedia** (Minggu 10) + **HTML APIs** (Minggu 11) + **Aksesibilitas** (Minggu 12) + **SEO & Meta** (Minggu 13) → semua bagian di atas jalan bareng saat grand opening.
## Glosarium Mini

- **Capstone/WAVE/Lighthouse**: gabung/cek-akses/nilai

---

## Ringkasan

Minggu 14 dari 14: **Grand Opening** (Level: Lengkap). **Selesai HTML5 0→Ahli dari nol!** 🎉
