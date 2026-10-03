# Positioning, Koordinat Z-Index & Stacking Context

> **Kategori:** CSS3 | **Level:** CSS Grid & Sistem Responsif Modern | **Minggu 6:** Positioning, Koordinat Z-Index & Stacking Context

## Tujuan Pembelajaran

- Memahami 5 nilai properti position: static, relative, absolute, fixed, dan sticky
- Memahami aturan jangkar: position: absolute mencari leluhur terdekat yang non-static
- Memahami Stacking Context: mengapa z-index: 99999 bisa kalah dari z-index: 2 jika berada di konteks berbeda
- Membangun sistem tingkatan z-index berbasis variabel terpusat untuk mencegah perang z-index liar
- Menerapkan efek visual modern backdrop-filter: blur() pada fixed navigation bar

---

## Program: Sistem Modal Dialog & Toast Notifikasi dengan Stacking Tepat

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Positioning & Stacking Context</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #2E5B44;
      --bg: #F4F2ED;
      --surface: #FFFFFF;
      --text: #1E293B;
      /* Stacking Layers System */
      --z-base: 1;
      --z-sticky: 10;
      --z-dropdown: 50;
      --z-backdrop: 100;
      --z-modal: 110;
      --z-toast: 200;
    }

    body {
      font-family: system-ui, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 200vh; /* Memberi ruang scroll */
      padding-top: 80px;
    }

    /* 1. Fixed App Navigation Bar */
    .fixed-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      z-index: var(--z-sticky);
    }

    /* 2. Kartu dengan Badge Terposisikan Absolute */
    .card-container {
      max-width: 480px;
      margin: 40px auto;
      background: var(--surface);
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      position: relative; /* Anchor wajib bagi absolute children */
    }

    .badge-corner {
      position: absolute;
      top: -12px;
      right: 24px;
      background: var(--primary);
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 999px;
      box-shadow: 0 2px 8px rgba(46,91,68,0.3);
      z-index: var(--z-base);
    }

    /* 3. Toast Notifikasi Mengambang */
    .toast-notification {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0F172A;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      z-index: var(--z-toast);
      display: flex;
      align-items: center;
      gap: 12px;
    }
  </style>
</head>
<body>
  <nav class="fixed-navbar">
    <strong>Tryngo Platform</strong>
    <button style="background: var(--primary); color: white; border: none; padding: 8px 16px; border-radius: 6px;">Buka Menu</button>
  </nav>

  <div class="card-container">
    <span class="badge-corner">Populer 2026</span>
    <h2>Modul Rekayasa Sistem Go & Rust</h2>
    <p style="margin-top: 12px; color: #64748B; line-height: 1.6;">Pelajari manajemen memori, goroutines, concurrency terdistribusi, dan kompilasi binary langsung di playground interaktif kami.</p>
  </div>

  <div class="toast-notification">
    <span>Progres belajar Minggu 5 tersimpan otomatis ke cloud.</span>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### 5 Pilar CSS Positioning
1. **static**: Alur normal default dokumen. Properti `top`, `bottom`, `left`, `right`, dan `z-index` tidak berpengaruh.
2. **relative**: Elemen tetap menempati ruang aslinya, namun posisinya dapat digeser secara visual dan menjadi **titik jangkar** bagi anak yang berstatus `absolute`.
3. **absolute**: Elemen dikeluarkan dari alur normal (tidak memakan tempat) dan memposisikan dirinya relatif terhadap **leluhur non-static terdekat**.
4. **fixed**: Elemen dikunci relatif terhadap viewport layar monitor dan tidak berpindah saat pengguna melakukan scroll.
5. **sticky**: Hibrida antara relative dan fixed tergantung batas scroll.

### Misteri Stacking Context
Banyak developer frustrasi mengapa elemen dengan `z-index: 9999` tetap berada di bawah elemen lain dengan `z-index: 1`. Jawabannya adalah **Stacking Context**. 
Elemen anak berada di dalam "pohon penumpukan" milik induknya. Jika Induk A memiliki stacking context dengan tingkat 1, dan Induk B memiliki tingkat 2, maka seluruh anak di dalam Induk A tidak akan pernah bisa menutupi Induk B, seberapapun besar nilai `z-index` anak tersebut!

Pemicu Stacking Context baru antara lain: elemen berposisi dengan `z-index` bukan auto, `opacity` kurang dari 1, `transform` bukan none, atau `isolation: isolate`.

---

---

## Penjelasan untuk Pemula

### Analogi: Meja Gambar dan Koper Bertingkat
1. **`relative`** seperti meletakkan selembar kertas di atas meja gambar.
2. **`absolute`** seperti menempelkan stiker perangko di sudut kanan atas kertas tersebut. Kemanapun kertas Anda geser, stiker perangko akan tetap menempel di sudut kertas, bukan di meja.
3. **`fixed`** seperti lalat yang menempel di kaca kacamata Anda: kemanapun Anda menoleh atau berjalan (scroll), lalat itu tetap berada di titik yang sama di depan mata Anda.
4. **Stacking Context** seperti koper bertingkat: Koper B ditaruh di atas Koper A. Meskipun Anda memasukkan piala paling tinggi di dunia ke dalam Koper A, piala itu tetap terkurung di dalam Koper A dan tidak akan pernah berada di atas Koper B.

## Eksperimen

- Hapus position: relative pada .card-container dan amati bagaimana badge merah melompat jauh ke pojok atas layar browser (karena kini berpatokan pada body).
- Ubah nilai z-index pada toast notification menjadi -1 dan perhatikan bagaimana toast menghilang di balik latar belakang halaman.
- Tambahkan opacity: 0.99 pada kontainer kartu dan amati bagaimana stacking context baru terbentuk.
- Coba scroll halaman ke bawah untuk memastikan bahwa fixed navbar dan toast notification tetap setia berada di posisinya masing-masing.

---

## Tantangan

Buat komponen modal popup dengan tombol pemicu: sertakan latar belakang gelap transparan (backdrop overlay dengan `position: fixed; inset: 0; z-index: 100`) dan kotak dialog modal di tengah layar (`position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 110`).

---

## Ringkasan

Kamu telah menguasai sistem koordinat positioning CSS dan eliminasi bug tumpang tindih dengan Stacking Context. Minggu depan kita memasuki Level 3: animasi mikro-interaktif dan transisi performa tinggi.
