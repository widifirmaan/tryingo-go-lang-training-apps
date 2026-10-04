# Tata Letak Flexbox & CSS Grid dengan Utilitas Tailwind

> **Kategori:** Tailwind CSS | **Level:** Pondasi Utility-First & Tata Letak | **Minggu 2:** Tata Letak Flexbox & CSS Grid dengan Utilitas Tailwind
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengatur perataan Flexbox di Tailwind: flex, items-center, justify-between, dan space-x-*
- Membangun CSS Grid deklaratif: grid, grid-cols-1, sm:grid-cols-2, lg:grid-cols-4, dan gap-6
- Menyusun layout adaptif mobile-first menggunakan prefix breakpoint bawaan (sm, md, lg, xl)
- Mengontrol visibilitas bersyarat responsif: hidden md:flex untuk menyembunyikan menu navigasi di mobile
- Memanfaatkan utilitas flex-1, flex-shrink-0, dan space-y-* untuk alur vertikal yang konsisten

---

## Program: Header Navigasi & Grid Kartu Statistik Responsif

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Flexbox & Grid</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen p-6 font-sans">
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- 1. Navigation Bar dengan Flexbox -->
    <header class="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-white font-bold">T</div>
        <span class="font-bold text-lg text-slate-900">Tryngo Admin</span>
      </div>
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
        <a href="#" class="text-emerald-800 font-semibold">Ikhtisar</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Pesanan</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Pelanggan</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Analitik</a>
      </nav>
      <div class="flex items-center space-x-3">
        <button class="bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm">
          + Buat Proyek
        </button>
      </div>
    </header>

    <!-- 2. Grid Statistik Metrik Utama -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pendapatan</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">Rp 128.4 Jt</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+14.2%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Siswa Aktif</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">14.820</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+8.1%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kuis Selesai</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">92.4%</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+2.4%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Uptime Server</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">99.98%</span>
          <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Normal</span>
        </div>
      </div>
    </section>

  </div>
</body>
</html>
```

---

## Konsep Kunci

### Flexbox Cepat di Tailwind
Daripada menulis 5 baris CSS, di Tailwind cukup menulis:
`flex items-center justify-between`
- `flex`: `display: flex;`
- `items-center`: `align-items: center;`
- `justify-between`: `justify-content: space-between;`
- `space-x-4`: Menambahkan margin horizontal otomatis di antara elemen anak tanpa perlu repot memilih elemen pertama/terakhir.

### Breakpoint Responsif Mobile-First
Tailwind menerapkan pendekatan mobile-first sejati:
- `grid-cols-1`: Default untuk ponsel layar kecil (1 kolom).
- `sm:grid-cols-2`: Layar $\ge$ 640px beralih ke 2 kolom.
- `lg:grid-cols-4`: Layar $\ge$ 1024px beralih ke 4 kolom.
Tidak ada media query manual yang perlu ditulis. Cukup tambahkan prefix breakpoint di depan nama kelas!

---

---

## Penjelasan untuk Pemula

### Analogi: Konvoi Mobil Patroli
1. **`flex justify-between`** seperti dua mobil patroli polisi: satu mobil mengawal di ujung paling depan konvoi, satu lagi di ujung paling belakang.
2. **`items-center`** memastikan semua penumpang mobil tingginya sejajar pas di jendela tengah.
3. **`sm:` dan `lg:`** seperti komandan lalu lintas yang melihat jalanan: "Jika jalan raya sempit, jalan beriringan 1 jalur. Begitu masuk jalan tol lebar (`lg:`), langsung buka formasi 4 jalur berdampingan!".

## Eksperimen

- Ubah lg:grid-cols-4 menjadi lg:grid-cols-2 dan perhatikan kartu metrik yang berubah menjadi 2x2 di layar desktop.
- Hapus hidden pada nav-links dan perhatikan menu yang muncul berantakan di layar ponsel sempit.
- Ganti gap-6 pada kontainer grid menjadi gap-12 untuk melihat jarak renggang antar kartu.
- Tambahkan items-baseline pada salah satu baris metrik dan amati teks persentase sejajar rapi dengan garis dasar angka nominal.

---

## Tantangan

Bangun layout split hero section: di sisi kiri terdapat judul besar dan dua tombol aksi, di sisi kanan terdapat gambar mock-up kartu preview. Di layar mobile tersusun 1 kolom vertikal, di layar desktop (`md:`) beralih menjadi 2 kolom berdampingan dengan `grid-cols-1 md:grid-cols-2 gap-12 items-center`.

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

Kamu telah menguasai pengaturan Flexbox dan CSS Grid yang responsif dengan utilitas Tailwind. Minggu depan kita akan mempelajari penataan warna, bayangan elevasi, dan arsitektur Dark Mode.
