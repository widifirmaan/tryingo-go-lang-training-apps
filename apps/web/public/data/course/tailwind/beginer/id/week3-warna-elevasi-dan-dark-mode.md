# Warna, Bayangan Elevasi & Arsitektur Dark Mode di Tailwind

> **Kategori:** Tailwind CSS | **Level:** Pondasi Utility-First & Tata Letak | **Minggu 3:** Warna, Bayangan Elevasi & Arsitektur Dark Mode di Tailwind
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami strategi Dark Mode di Tailwind: class strategy (manual toggle) vs media strategy (OS default)
- Menggunakan modifier dark:* untuk memetakan warna latar, teks, dan border khusus mode gelap
- Menerapkan tingkatan bayangan elevasi (shadow-sm, shadow-md, shadow-xl, shadow-2xl)
- Mengonfigurasi palet warna kustom di tailwind.config dengan tingkatan 50 hingga 900
- Menambahkan efek transisi warna latar belakang dan teks yang mulus (transition-colors duration-300)

---

## Program: Kartu Langganan SaaS dengan Transisi Dark Mode Instan

```html
<!DOCTYPE html>
<html lang="id" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Dark Mode & Elevation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class', // Menggunakan strategi class alih-alih media
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#F2F7F4',
              500: '#2E5B44',
              800: '#1D3B2C',
              900: '#12251C',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 font-sans">

  <!-- Tombol Toggle Tema -->
  <button onclick="toggleDarkMode()" class="mb-8 px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 shadow-sm text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-700 transition-all">
    🌓 Ganti Mode Tampilan
  </button>

  <!-- Kartu SaaS Adaptif dengan Dark Mode Prefix -->
  <div class="max-w-sm w-full bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200 dark:border-stone-700 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all">
    <div class="flex justify-between items-center">
      <span class="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-emerald-400 bg-brand-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
        Paket Pro
      </span>
      <span class="text-xs text-stone-400 font-medium">Billed Annually</span>
    </div>

    <h2 class="text-2xl font-black mt-4 text-stone-900 dark:text-white">
      Developer Pro
    </h2>
    <p class="text-sm text-stone-500 dark:text-stone-400 mt-2">
      Akses komputasi performa tinggi untuk tim rekayasa software.
    </p>

    <div class="mt-6 flex items-baseline gap-1">
      <span class="text-4xl font-black text-stone-900 dark:text-white">Rp 299rb</span>
      <span class="text-sm text-stone-400 font-medium">/bulan</span>
    </div>

    <ul class="mt-6 space-y-3 text-sm text-stone-600 dark:text-stone-300">
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Kuota 1.000 Menit Kompilasi WASM
      </li>
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Dukungan 28 Kurikulum Lengkap
      </li>
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Sertifikasi Ujian Interaktif
      </li>
    </ul>

    <button class="w-full mt-8 bg-brand-500 hover:bg-brand-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-brand-500/20 transition-all">
      Langganan Sekarang
    </button>
  </div>

  <script>
    function toggleDarkMode() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
</body>
</html>
```

---

## Konsep Kunci

### Strategi Dark Mode di Tailwind
Tailwind mendukung dua cara pengaktifan mode gelap:
1. **media**: Mengikuti preferensi setelan gelap/terang sistem operasi pengguna (`prefers-color-scheme`).
2. **class**: Memberikan kontrol penuh kepada developer atau tombol pengguna dengan menambahkan class `.dark` pada tag `<html>`.

### Cara Kerja Modifier dark:*
Anda cukup menuliskan kelas default untuk mode terang, lalu menyematkan `dark:` untuk mode gelap pada elemen yang sama:
`class="bg-white dark:bg-stone-800 text-stone-900 dark:text-white"`
Saat class `dark` disematkan di tag `<html>`, browser secara otomatis mengaktifkan seluruh aturan `dark:*`.

### Sistem Elevasi Bayangan (Shadows)
Di mode terang, bayangan gelap tipis (`shadow-xl`) memberikan kesan melayang. Di mode gelap, bayangan standar sering tidak terlihat karena latarnya sudah gelap; oleh karena itu Tailwind memungkinkan pewarnaan bayangan: `dark:shadow-black/40`.

---

---

## Penjelasan untuk Pemula

### Analogi: Mengalihkan Saklar Lampu Ruangan
1. **Mode Terang** seperti siang hari di kantor: dinding dicat putih terang, meja kayu bersih, tulisan di kertas tinta hitam terbaca kontras.
2. **`dark:` modifier** seperti menyalakan lampu proyektor bioskop: dinding ruangan otomatis digelapkan (`dark:bg-stone-800`), dan proyektor menembakkan tulisan putih terang di dinding (`dark:text-white`).
3. **`darkMode: 'class'`** seperti saklar di dinding: Anda bebas menekan tombol klik saklar kapan saja untuk mengubah suasana ruangan.

## Eksperimen

- Klik tombol alihkan mode tampilan dan amati perubahan warna kartu, teks, dan badge secara serentak.
- Ubah shadow-xl menjadi shadow-none pada kartu untuk melihat hilangnya kedalaman elevasi.
- Coba ubah dark:bg-stone-800 menjadi dark:bg-black untuk merasakan gaya kontras tinggi AMOLED.
- Hapus transition-colors duration-300 pada body dan perhatikan bagaimana peralihan tema menjadi patah mendadak.

---

## Tantangan

Rancang kartu ulasan testimoni klien: sertakan kutipan teks, bintang rating kuning, nama klien, dan jabatan. Buat varian mode gelap yang elegan menggunakan `dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100`.

---

## Model Mental & Diagram Alur Visual

![Diagram Flexbox & Grid Axis Sumbu Layout](/diagrams/flexbox-axis.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ KONTROL UTILITY TAILWIND                                 │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ flex items-center justify-between (Flexbox)          │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌────────────────┐ │ │
│ │ │ w-1/3 p-4    │ │ w-1/3 p-4    │ │ w-1/3 p-4      │ │ │
│ │ │ bg-zinc-900  │ │ bg-emerald-600│ │ bg-zinc-800   │ │ │
│ │ │ text-white   │ │ hover:scale-105│ │ rounded-2xl   │ │ │
│ │ └──────────────┘ └──────────────┘ └────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `flex items-center justify-between`
- **Fungsi Utama:** Utility tata letak Flexbox instan.
- **Parameter / Atribut:** `Display flex, alignment, distribution`.
- **Perilaku & Efek Sistem:** Menyusun kontainer fleksibel dengan pemusatan vertikal dan pemisahan horizontal antar elemen..
- **Contoh Penggunaan Praktis:**
```html
<div class="flex items-center justify-between p-4 bg-zinc-900 text-white rounded-xl">
  <span>Brand</span>
  <button>Menu</button>
</div>
```
- **Hasil Output yang Diharapkan:**
```text
Elemen tersusun rapi di ujung kiri dan kanan
```

### 2. `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- **Fungsi Utama:** Grid responsif multi-breakpoint.
- **Parameter / Atribut:** `Breakpoint prefixes (sm:, md:, lg:)`.
- **Perilaku & Efek Sistem:** Mengubah jumlah kolom secara bertahap saat layar membesar dari ponsel ke desktop..
- **Contoh Penggunaan Praktis:**
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="p-4 bg-zinc-100 rounded-lg">Kartu 1</div>
</div>
```
- **Hasil Output yang Diharapkan:**
```text
Grid 1 kolom di HP, 3 kolom di desktop
```

### 3. `hover:bg-emerald-600 active:scale-95 transition-all duration-200`
- **Fungsi Utama:** State modifiers interaktif & animasi.
- **Parameter / Atribut:** `hover:, active:, focus:, transition`.
- **Perilaku & Efek Sistem:** Memberikan feedback visual interaktif saat tombol disentuh atau kursor diarahkan..
- **Contoh Penggunaan Praktis:**
```html
<button class="bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all px-4 py-2 rounded-lg text-white font-bold">
  Simpan
</button>
```
- **Hasil Output yang Diharapkan:**
```text
Tombol membesar dan berubah warna saat di-hover
```

### 4. `dark:bg-zinc-950 dark:text-zinc-100`
- **Fungsi Utama:** Dukungan tema gelap (Dark Mode).
- **Parameter / Atribut:** `dark: prefix selector`.
- **Perilaku & Efek Sistem:** Menentukan warna khusus saat pengguna mengaktifkan mode gelap di peramban atau sistem..
- **Contoh Penggunaan Praktis:**
```html
<div class="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 p-6 rounded-2xl">
  Tema Adaptif
</div>
```
- **Hasil Output yang Diharapkan:**
```text
Warna otomatis menyesuaikan mode gelap pengguna
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. String Interpolation Dinamis pada Nama Class
- **Gejala / Masalah:** Class seperti `text-${color}-500` tidak muncul di hasil build produksi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Tuliskan nama class Tailwind secara utuh atau gunakan `safelist` di konfigurasi.

### 2. Urutan Utilitas yang Saling Menimpa
- **Gejala / Masalah:** Menulis `p-4 px-2` vs `px-2 p-4` menghasilkan specificity bentrok.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan ekstensi resmi Prettier Tailwind Plugin untuk merapikan urutan class secara otomatis.

### 3. Arbitrary Values yang Berlebihan
- **Gejala / Masalah:** Menggunakan `w-[347px]` merusak konsistensi design token tema.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Utamakan skala bawaan Tailwind (`w-80`, `w-96`) atau definisikan custom spacing di `theme.extend`.

---

## Ringkasan

Kamu telah menguasai arsitektur Dark Mode, sistem pewarnaan kustom, dan bayangan elevasi di Tailwind. Minggu depan kita akan mendalami state modifiers interaktif (hover, focus-visible, active, disabled).
