# DaisyUI: Komponen Utility

> **Kategori:** HTML5 | **Level:** Framework UI | **Minggu 12:** DaisyUI: Komponen Utility
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Memahami konsep framework komponen berbasis utility (DaisyUI dan ekosistem Tailwind CSS)
- Memasang DaisyUI via CDN link di dalam dokumen HTML
- Menggunakan class komponen semantik: .btn, .card, .badge, dan .navbar
- Memanfaatkan sistem tema warna bawaan (theme="dark", theme="light", theme="emerald")
- Membandingkan kapan memilih Bootstrap, Bulma, Pico CSS, atau DaisyUI dalam proyek nyata

---

## 1. Konsep Utility dan DaisyUI

Dalam dunia pengembangan web, ada perdebatan antara:
1. **Component Classes (seperti Bootstrap):** Menulis class `.btn .btn-primary`. Sangat cepat, tetapi tampilannya mirip dengan website orang lain.
2. **Utility Classes (seperti Tailwind):** Menulis class `px-4 py-2 bg-blue-500 rounded`. Sangat fleksibel, tetapi kode HTML menjadi sangat panjang.

**DaisyUI** menjembatani keduanya:
- DaisyUI menambahkan **nama class komponen yang bersih dan semantik** (`.btn`, `.card`, `.badge`) di atas mesin Tailwind CSS.
- Anda mendapatkan komponen siap pakai tanpa membuat HTML menjadi berantakan.

### Pemasangan via CDN:
```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
```

---

## 2. Sistem Tema (Theme) Bawaan
DaisyUI memiliki puluhan tema warna bawaan yang dapat diaktifkan hanya dengan atribut `data-theme` pada tag `<html>`:
```html
<html data-theme="emerald">
```
Pilihan tema populer: `light`, `dark`, `cupcake`, `emerald`, `synthwave`, `forest`.

---

## 3. Matriks Pemilihan Framework HTML/UI:
| Kebutuhan Proyek | Pilihan Framework Terbaik |
|---|---|
| Cepat, enterprise, butuh banyak komponen interaktif | **Bootstrap 5** |
| Ringan, CSS murni, tanpa file JavaScript | **Bulma** |
| Minimalis, tulisan/dokumentasi, tanpa nulis class | **Pico CSS** |
| Modern, tema warna beragam, integrasi Tailwind | **DaisyUI** |

---

## Program: Penerapan Navbar, Card, dan Badge dengan DaisyUI Theme

```html
<!DOCTYPE html>
<html lang="id" data-theme="forest">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio DaisyUI — Alex Pratama</title>
  <!-- DaisyUI CSS & Tailwind CDN -->
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen p-4 max-w-2xl mx-auto">

  <!-- NAVBAR DAISYUI -->
  <div class="navbar bg-base-200 rounded-box mb-6">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Alex.dev</a>
    </div>
    <div class="flex-none">
      <span class="badge badge-primary">Tema: Forest</span>
    </div>
  </div>

  <!-- HERO CARD -->
  <div class="card bg-base-200 shadow-xl mb-6">
    <div class="card-body">
      <h1 class="card-title text-2xl">Studio Web Alex Pratama</h1>
      <p class="text-base-content/80">
        Menggabungkan kekuatan HTML semantik dengan komponen antarmuka DaisyUI.
      </p>
      <div class="card-actions justify-end mt-4">
        <button class="btn btn-primary">Konsultasi</button>
      </div>
    </div>
  </div>

  <!-- BADGES & LIST -->
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-lg">Keahlian Teknologi</h2>
      <div class="flex flex-wrap gap-2 mt-2">
        <div class="badge badge-outline">HTML5 Semantik</div>
        <div class="badge badge-outline">CSS Flexbox</div>
        <div class="badge badge-outline">Bootstrap 5</div>
        <div class="badge badge-outline">DaisyUI</div>
      </div>
    </div>
  </div>

  <footer class="footer footer-center p-4 text-base-content mt-8">
    <aside>
      <p>&copy; 2026 Alex Pratama. Ditenagai oleh DaisyUI.</p>
    </aside>
  </footer>

</body>
</html>
```

---

## Bedah Detail Kode Program

- Line 2: Atribut `data-theme="forest"` mengaktifkan tema gelap kehijauan secara instan.
- Line 7-8: Memuat stylesheet DaisyUI dan runtime script Tailwind CSS.
- Line 13-20: Komponen `.navbar` dengan wadah `.bg-base-200` dan tombol `.btn .btn-ghost`.
- Line 23-33: Komponen `.card` dengan `.card-body` dan `.card-actions`.

---

## Eksperimen di Playground

1. Ubah teks atau data pada kode program di Playground dan amati hasil perubahannya secara instan.
2. Coba tambahkan elemen baru sesuai kebutuhan halaman Anda.
3. Uji tampilan kode di ukuran layar yang berbeda untuk memeriksa kelenturan layout.

---

## Tantangan Praktik

Terapkan konsep Minggu 12 ini pada file proyek Anda sendiri. Pastikan kode memiliki kurung sudut lengkap, tag penutup yang benar, serta penamaan class atau id yang rapi.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa memuat runtime Tailwind CSS CDN saat menggunakan DaisyUI via CDN.
- Salah menuliskan nilai pada atribut `data-theme` sehingga tema warna kembali ke default.
- Menggunakan class DaisyUI yang bertabrakan dengan CSS kustom tanpa spesifisitas yang benar.

---

## Ringkasan

- Modul Minggu 12 (DaisyUI: Komponen Utility) melatih pemahaman struktural secara praktis.
- Seluruh kode yang dipelajari mematuhi standar HTML valid dan dapat langsung dijalankan di browser maupun Playground.
- Di modul berikutnya, kita akan melanjutkan langkah pembangunan proyek ke tingkat materi selanjutnya.
