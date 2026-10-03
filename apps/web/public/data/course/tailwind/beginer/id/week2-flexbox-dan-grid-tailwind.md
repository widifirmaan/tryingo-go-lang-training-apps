# Tata Letak Flexbox & CSS Grid dengan Utilitas Tailwind

> **Kategori:** Tailwind CSS | **Level:** Pondasi Utility-First & Tata Letak | **Minggu 2:** Tata Letak Flexbox & CSS Grid dengan Utilitas Tailwind

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

## Ringkasan

Kamu telah menguasai pengaturan Flexbox dan CSS Grid yang responsif dengan utilitas Tailwind. Minggu depan kita akan mempelajari penataan warna, bayangan elevasi, dan arsitektur Dark Mode.
