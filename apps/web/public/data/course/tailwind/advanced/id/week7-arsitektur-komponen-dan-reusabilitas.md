# Arsitektur Komponen: Ekstraksi UI & Pola Komposisi

> **Kategori:** Tailwind CSS | **Level:** Komponen Kustom, Desain Sistem & Produksi | **Minggu 7:** Arsitektur Komponen: Ekstraksi UI & Pola Komposisi
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami kapan harus mengekstraksi kelas Tailwind dan kapan tetap menggunakan utilitas inline murni
- Membangun sistem varian tombol terpadu (Primary, Secondary, Danger, Ghost) dengan interaksi seragam
- Membuat badge status yang dilengkapi titik indikator bernyawa dengan Flexbox inline
- Membangun tumpukan avatar pengguna yang saling bertumpuk rapi menggunakan -space-x-2 dan ring-2 ring-white
- Mempersiapkan seluruh fondasi komponen untuk proyek akhir SaaS Dashboard

---

## Program: Koleksi Komponen UI Reusable (Button, Badge, Avatar)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Component Kit</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen p-8 flex items-center justify-center font-sans">

  <div class="max-w-2xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-slate-900">Tryngo UI Design System Kit</h2>
      <p class="text-sm text-slate-500">Pola komposisi komponen tombol, badge, dan avatar yang konsisten.</p>
    </div>

    <!-- 1. Varian Tombol (Primary, Secondary, Danger, Ghost) -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Varian Tombol</h3>
      <div class="flex flex-wrap gap-3">
        <!-- Primary -->
        <button class="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm">
          Tombol Utama
        </button>
        <!-- Secondary -->
        <button class="bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl border border-slate-300 transition-all shadow-sm">
          Sekunder
        </button>
        <!-- Danger -->
        <button class="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-red-600/20">
          Hapus Data
        </button>
        <!-- Ghost -->
        <button class="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all">
          Batal
        </button>
      </div>
    </div>

    <!-- 2. Varian Badges Status -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Badges Status</h3>
      <div class="flex flex-wrap gap-2.5">
        <span class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Operasional
        </span>
        <span class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pemeliharaan
        </span>
        <span class="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Gangguan
        </span>
      </div>
    </div>

    <!-- 3. Avatar Stack Group -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Grup Kontributor Aktif</h3>
      <div class="flex items-center -space-x-2 overflow-hidden">
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">BP</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">SR</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">AN</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-stone-800 flex items-center justify-center font-bold text-xs text-white">+5</div>
      </div>
    </div>
  </div>

</body>
</html>
```

---

## Konsep Kunci

### Kapan Harus Mengekstraksi Komponen?
Salah satu kesalahan pemula di Tailwind adalah terlalu cepat membuat class `@apply` untuk setiap tombol. Di ekosistem modern (React, Vue, Svelte, Blade), cara terbaik menduplikasi komponen adalah **mengekstraknya menjadi komponen template atau komponen UI** (misal `<Button variant="primary">`), bukan membuat stylesheet CSS baru!

### Trik Tumpukan Avatar (-space-x-*)
Untuk membuat avatar profil yang saling bertumpuk seperti di GitHub atau Figma:
- Gunakan `-space-x-2` pada kontainer induk untuk memberikan margin horizontal negatif.
- Berikan `ring-2 ring-white` pada setiap avatar bundar agar ada batas garis putih bersih yang memisahkan tiap foto avatar.

---

---

## Penjelasan untuk Pemula

### Analogi: Kartu Nama Perusahaan
1. **Varian Komponen** seperti kartu nama staf kantor: format ukurannya persis sama, jenis kertasnya sama, namun warnanya dibedakan antara Direktur (Emas), Manajer (Hijau), dan Tamu (Abu-abu).
2. **Avatar Stack** seperti barisan foto kartu identitas karyawan yang dijajarkan tumpang-tindih rapi di papan pengumuman lobi kantor.

## Eksperimen

- Ubah -space-x-2 pada grup avatar menjadi -space-x-4 dan amati bagaimana avatar bertumpuk lebih rapat.
- Hapus ring-2 ring-white pada avatar dan perhatikan bagaimana avatar yang bertumpuk kehilangan garis pemisah bersihnya.
- Coba tambahkan varian tombol baru (Warning warna amber) dengan mencocokkan pola tombol yang ada.
- Ubah ukuran teks pada badge status menjadi text-sm dan amati penyesuaian padding yang serasi.

---

## Tantangan

Bangun komponen kartu alert banner yang memiliki 3 varian (Success hijau, Info biru, Danger merah): masing-masing memiliki ikon di sebelah kiri, judul tebal, pesan deskripsi, dan tombol tutup silang di sebelah kanan.

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
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-900">
  <div class="flex items-center justify-between p-4 bg-slate-800 text-white rounded-xl shadow-lg">
    <span class="font-bold text-emerald-400">Tryngo Brand</span>
    <button class="px-4 py-2 bg-emerald-600 rounded-lg text-sm font-semibold">Menu</button>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Elemen tersusun rapi di ujung kiri dan kanan
```

### 2. `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- **Fungsi Utama:** Grid responsif multi-breakpoint.
- **Parameter / Atribut:** `Breakpoint prefixes (sm:, md:, lg:)`.
- **Perilaku & Efek Sistem:** Mengubah jumlah kolom secara bertahap saat layar membesar dari ponsel ke desktop..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-900">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 1</div>
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 2</div>
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 3</div>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Grid 1 kolom di HP, 3 kolom di desktop
```

### 3. `hover:bg-emerald-600 active:scale-95 transition-all duration-200`
- **Fungsi Utama:** State modifiers interaktif & animasi.
- **Parameter / Atribut:** `hover:, active:, focus:, transition`.
- **Perilaku & Efek Sistem:** Memberikan feedback visual interaktif saat tombol disentuh atau kursor diarahkan..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8 bg-slate-900 flex justify-center">
  <button class="bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all px-6 py-3 rounded-xl text-white font-bold shadow-lg">
    Tombol Interaktif Tailwind
  </button>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
Tombol membesar dan berubah warna saat di-hover
```

### 4. `dark:bg-zinc-950 dark:text-zinc-100`
- **Fungsi Utama:** Dukungan tema gelap (Dark Mode).
- **Parameter / Atribut:** `dark: prefix selector`.
- **Perilaku & Efek Sistem:** Menentukan warna khusus saat pengguna mengaktifkan mode gelap di peramban atau sistem..
- **Contoh Penggunaan Praktis:**
```html
<!DOCTYPE html>
<html class="dark">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-950">
  <div class="bg-slate-900 text-white border border-slate-700 p-6 rounded-2xl shadow-xl">
    <h3 class="text-xl font-bold text-emerald-400">Tema Gelap (Dark Mode)</h3>
    <p class="text-slate-300 mt-2">Warna latar dan kontras otomatis menyesuaikan preferensi sistem.</p>
  </div>
</body>
</html>
```
- **Hasil Output yang Diharapkan:**
```output
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

Kamu telah menguasai arsitektur dan pola reusabilitas komponen di Tailwind. Minggu depan adalah proyek capstone: membangun aplikasi SaaS Landing Page & Interactive Dashboard lengkap dengan Dark Mode!
