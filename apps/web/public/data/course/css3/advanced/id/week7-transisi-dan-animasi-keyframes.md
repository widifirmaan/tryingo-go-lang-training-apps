# Transisi Halus, Kurva Cubic-Bezier & Animasi Keyframes 60fps

> **Kategori:** CSS3 | **Level:** Design System, Animasi & Fitur Mutakhir | **Minggu 7:** Transisi Halus, Kurva Cubic-Bezier & Animasi Keyframes 60fps

## Tujuan Pembelajaran

- Menguasai aturan emas performa animasi 60 FPS: hanya transform dan opacity yang diakselerasi GPU (Composite only)
- Membuat kurva pergerakan alami elastis menggunakan cubic-bezier kustom alih-alih linear yang kaku
- Menulis animasi berkelanjutan dan terprogram menggunakan aturan @keyframes
- Mengontrol timing animasi dengan properti animation-fill-mode (forwards, backwards, both)
- Menghormati preferensi pengguna dengan media query @media (prefers-reduced-motion: reduce)

---

## Program: Tombol Interaktif dengan Efek Ripple & Spinner Pemuat Data

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>60fps CSS Transitions & Keyframes</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --primary-hover: #234735;
      --bg: #F8FAFC;
      --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 32px;
    }

    /* 1. Tombol Interaktif dengan Transform GPU & Spring Easing */
    .btn-action {
      background: var(--primary);
      color: white;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      padding: 14px 28px;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(46, 91, 68, 0.2);
      /* Hanya animasikan transform dan opacity untuk 60fps */
      transition: transform 0.25s var(--ease-spring), box-shadow 0.25s ease, background 0.2s ease;
      will-change: transform;
    }

    .btn-action:hover {
      background: var(--primary-hover);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 24px rgba(46, 91, 68, 0.3);
    }

    .btn-action:active {
      transform: translateY(1px) scale(0.98);
      box-shadow: 0 2px 6px rgba(46, 91, 68, 0.2);
    }

    /* 2. Indikator Loading Spinner dengan Keyframes Murni */
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #E2E8F0;
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    /* 3. Badge Denyut (Pulse Ping) */
    .status-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      color: #334155;
    }

    .dot-ping {
      width: 10px;
      height: 10px;
      background: #10B981;
      border-radius: 50%;
      position: relative;
    }

    .dot-ping::after {
      content: '';
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      background: #10B981;
      opacity: 0.75;
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    @keyframes ping {
      0%   { transform: scale(0.8); opacity: 0.8; }
      80%, 100% { transform: scale(2.4); opacity: 0; }
    }

    /* Aksesibilitas: Hormati Pengguna Sensitif Animasi */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  </style>
</head>
<body>
  <button class="btn-action">Jalankan Kompilasi</button>
  <div class="spinner" aria-label="Memuat data"></div>
  <div class="status-badge">
    <span class="dot-ping"></span>
    Cluster Server Aktif
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Mengapa Hanya Transform & Opacity (60 FPS)?
Rendering browser melewati 3 tahap: **Layout (Reflow)** $
ightarrow$ **Paint (Repaint)** $
ightarrow$ **Composite**.
- Menganimasikan properti seperti `width`, `height`, `margin`, atau `top` memaksa browser menghitung ulang layout seluruh halaman (sangat boros CPU, menyebabkan patah-patah/*jank*).
- Menganimasikan `color` atau `background` memicu tahap Paint.
- Menganimasikan `transform` (translate, scale, rotate) dan `opacity` dilempar langsung ke GPU pada tahap **Composite**. Animasi berjalan mulus di 60-120 FPS tanpa membebani thread utama.

### Kurva Cubic-Bezier
Fungsi bawaan seperti `ease` atau `linear` sering terasa kaku seperti robot. Fungsi `cubic-bezier(0.34, 1.56, 0.64, 1)` mensimulasikan hukum fisika pegas nyata di mana tombol sedikit "membal" (*overshoot*) sebelum kembali tenang.

### Aksesibilitas: prefers-reduced-motion
Beberapa pengguna memiliki gangguan vestibular di mana animasi berkedip atau meluncur di layar dapat memicu pusing atau mual. Query `@media (prefers-reduced-motion: reduce)` mendeteksi setelan aksesibilitas sistem operasi pengguna dan wajib digunakan untuk menonaktifkan atau mempercepat animasi secara instan.

---

---

## Penjelasan untuk Pemula

### Analogi: Menggambar Ulang Buku vs Memutar Proyektor
1. **Menganimasikan `width` atau `margin`** seperti menyuruh pelukis menggambar ulang seluruh halaman koran dari awal setiap 1 milidetik: pelukis kelelahan dan gambarnya jadi tersendat-sendat.
2. **Menganimasikan `transform: translate()`** seperti menyorotkan proyektor ke dinding: proyektor hanya perlu digeser sedikit sudutnya oleh GPU tanpa perlu mengecat ulang temboknya sama sekali.
3. **`cubic-bezier`** seperti melempar bola bekel karet ke lantai: bola memantul elastis beberapa kali sebelum berhenti, tidak seperti batu bata yang jatuh gedebuk kaku.

## Eksperimen

- Ubah transisi tombol untuk menganimasikan width alih-alih transform, buka Performance monitor di DevTools, dan amati lonjakan Rendering Layout Reflow.
- Coba ubah timing-function tombol menjadi linear dan rasakan betapa kaku gerakannya dibanding cubic-bezier spring.
- Ubah durasi animasi spinner dari 0.8s menjadi 0.2s untuk melihat efek putaran sangat cepat.
- Aktifkan emulasi "prefers-reduced-motion: reduce" di panel DevTools Rendering dan perhatikan bagaimana semua animasi langsung berhenti total.

---

## Tantangan

Bangun kartu produk interaktif: saat kartu di-hover, kartu terangkat perlahan (`transform: translateY(-8px)`), bayangan membesar lembut, dan tombol keranjang di dalamnya muncul dengan efek fade-in slide-up menggunakan transisi GPU murni.

---

## Ringkasan

Kamu telah menguasai rekayasa animasi performa tinggi 60 FPS dan kurva fisika cubic-bezier. Minggu depan kita akan mendalami ruang warna modern OKLCH dan sistem Dark Mode arsitektural.
