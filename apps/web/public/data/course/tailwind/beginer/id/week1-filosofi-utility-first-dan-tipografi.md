# Filosofi Utility-First, Setup & Tipografi

> **Kategori:** Tailwind CSS | **Level:** Dasar Utility-First & Tipografi | **Minggu 1:** Filosofi Utility-First, Setup & Tipografi

## Tujuan Pembelajaran

- Memahami konsep utility-first vs class berbasis komponen (BEM)
- Menghubungkan Tailwind via CDN untuk prototipe cepat
- Menguasai utilitas tipografi: ukuran (text-sm, text-lg, text-2xl), ketebalan (font-medium, font-bold)
- Mengatur jarak antar baris teks (leading-relaxed) dan warna teks (text-slate-700)
- Menyusun dokumen HTML sederhana dengan styling langsung pada class atribut

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Autocomplete nama class, preview warna, dan linting class Tailwind

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension bradlc.vscode-tailwindcss
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v20.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** Tailwind CSS v4 menggunakan engine lightningcss baru yang super cepat tanpa file konfigurasi berat.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
npm create vite@latest my-tailwind-app -- --template vanilla
cd my-tailwind-app
npm install
npm install -D tailwindcss @tailwindcss/vite
```
- **Keterangan:** Setup Vite dengan plugin resmi Tailwind v4 untuk build secepat kilat.
- **Pindah ke direktori project:**
```bash
cd my-tailwind-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npm run dev
```
Akses di browser atau terminal: `http://localhost:5173`

> ℹ️ Dev server aktif dengan kompilasi CSS on-demand.

**File Titik Masuk Utama (`index.html`):**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./src/style.css">
  <title>Tailwind v4 Starter</title>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      Tailwind v4 Ready
    </span>
    <h1 class="text-2xl font-bold tracking-tight">Utility-First Speed</h1>
    <p class="text-slate-400 text-sm leading-relaxed">
      Styling cepat, responsif, dan rapi tanpa meninggalkan dokumen HTML.
    </p>
    <button class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors font-medium text-sm">
      Coba Sekarang
    </button>
  </div>
</body>
</html>
```
Komponen card modern yang di-styling murni dengan Tailwind utility classes.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-tailwind-app/
├── index.html           # HTML dengan utility classes Tailwind
├── src/
│   └── style.css        # Cukup sertakan: @import "tailwindcss";
├── vite.config.ts       # Plugin tailwindcss()
└── package.json         # Dependensi Tailwind & Vite
```
Di Tailwind v4, Anda cukup menulis `@import "tailwindcss";` di style.css tanpa tailwind.config.js rumit.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan modifier responsif (`sm:`, `md:`, `lg:`) untuk tata letak yang adaptif di berbagai ukuran layar.
- Gunakan class `dark:` untuk mendukung dark mode instan.

---

## Program: Pengenalan Utility-First & Tipografi

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-6 text-slate-800 font-sans">
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow border border-slate-200">
    <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full mb-3">
      Minggu 1: Fondasi
    </span>
    <h1 class="text-2xl font-bold text-slate-900 tracking-tight mb-2">
      Pengenalan Tailwind CSS
    </h1>
    <p class="text-slate-600 text-sm leading-relaxed mb-4">
      Tailwind CSS adalah utility-first CSS framework yang menyediakan ribuan class kecil untuk menyusun tampilan langsung pada markup HTML.
    </p>
    <div class="flex gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
      <span>Font: text-sm</span>
      <span>•</span>
      <span>Weight: font-bold</span>
      <span>•</span>
      <span>Leading: leading-relaxed</span>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Filosofi Utility-First
Berbeda dari CSS tradisional yang membuat class bernama khusus seperti `.card` atau `.btn`, Tailwind menyediakan ribuan class utilitas tunggal seperti `text-center`, `p-4`, dan `rounded`. Pendekatan ini menghilangkan kebutuhan menulis file CSS kustom untuk setiap elemen baru.

### Skala Tipografi
- Ukuran: `text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-lg` (18px), `text-xl` (20px), `text-2xl` (24px)
- Ketebalan: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)
- Spasi Baris: `leading-tight`, `leading-normal`, `leading-relaxed`, `leading-loose`

---

## Eksperimen

- Ubah ukuran heading dari text-2xl menjadi text-4xl dan perhatikan perubahannya
- Ganti warna teks dari text-slate-900 ke text-indigo-700
- Ubah font-bold menjadi font-light atau font-extrabold
- Coba tambahkan class tracking-wide untuk menambah jarak antar huruf

---

## Tantangan

Buat kartu pengumuman dengan judul tebal, tanggal publikasi kecil berwarna abu-abu, dan paragraf isi dengan jarak baris renggang.

---

## Ringkasan

Minggu 1 dari 9: **Filosofi Utility-First, Setup & Tipografi**. Anda telah memahami konsep dasar utility-first dan styling teks. Minggu depan: **Sistem Spasi, Ukuran, dan Box Model**.
