# Responsive Design — Warung Muat HP & Laptop

> **Kategori:** CSS3 | **Level:** Pemula | **Minggu 7:** Responsive Design

## Tujuan Pembelajaran

- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` wajib (tanpa ini HP zoom-out!) (sumber: MDN viewport)
- `@media (max-width: 600px) { ... }` aturan khusus HP, mobile-first vs desktop-first

---

## Kenapa Ini Penting Buat Kamu?

80% pembeli buka di HP. Tanpa `viewport`, HP tampil seperti laptop dikecilkan (tulisan semut). Tanpa `@media`, grid 3 kolom di HP 360px = gepeng tak terbaca.

---

## Program: Warung Responsif HP-Laptop

```html
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .menu { display: flex; gap: 16px; }

    /* HP ≤600px: 1 kolom + menu turun */
    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
      .menu { flex-direction: column; gap: 8px; }
      h1 { font-size: 22px; }
    }
  </style>
</head>
<body>
  <h1>Warung Bu Siti</h1>
  <nav class="menu"><a>Beranda</a><a>Produk</a><a>Kontak</a></nav>
  <div class="grid"><div>Beras</div><div>Bayam</div><div>Telur</div></div>
</body>
```

Test: Chrome `F12` → `Toggle device toolbar` (`Ctrl+Shift+M`) → pilih `iPhone SE` vs `Desktop`.

---

## Konsep Kunci

### `viewport` = Kacamata HP
`width=device-width` = "layar selebar HP". Tanpa ini, HP anggap 980px → zoom-out.

### `@media (max-width: 600px)` = Aturan Khusus HP
Di dalam kurung hanya jalan jika layar ≤600px. `min-width` sebaliknya (khusus besar).

### Mobile-First vs Desktop-First
- Tulis HP dulu + `@media (min-width: 600px)` untuk laptop (modern, disarankan).
- Atau laptop dulu + `max-width` (di atas, mudah dipahami).

---

## Penjelasan untuk Pemula

### Analogi: Baju S-M-L
- **Desktop = L**, **HP = S**: 1 baju (`grid`) muat semua dengan `media` penjahit.

### Langkah 0 — Siapkan Device
- Chrome DevTools `F12` → device toolbar. Test 360px & 1280px.

### Cara Komputer Membaca
1. HP 360px → `@media (max-width: 600px)` cocok → `grid 1fr`.
2. Laptop → tidak cocok → tetap 3 kolom.

### 3 Istilah Wajib
1. **Viewport/media query**: kacamata/aturan-layar
2. **max/min-width**: khusus-kecil/besar

---

## Eksperimen

- **Hijau:** Hapus `viewport` meta → buka di mode HP → semut? Pasang.
- **Kuning:** `600px` → `900px` → tablet ikut 1 kolom?
- **Merah:** Tulis `@media (max-width: 600px)` tanpa kurung tutup → semua CSS bawah rusak? Tutup.

---

## Tantangan

**Warung Responsif Lengkap:** Grid 3→1 kolom + menu baris→kolom + `h1` 28→22px + screenshot HP & laptop berdampingan.

---

## Glosarium Mini

- **viewport/media/max-width**: kacamata/aturan/kecil

---

## Ringkasan

Minggu 7 dari 12: **Muat Semua Layar** (Level: Pemula). HP & laptop rapi. Minggu depan: **Animasi** — gerak halus.
