# Proyek Akhir: Dashboard Admin Responsif Lengkap

> **Kategori:** Tailwind CSS | **Level:** Komponen & Proyek Antarmuka | **Minggu 9:** Proyek Akhir: Dashboard Admin Responsif Lengkap

## Tujuan Pembelajaran

- Menggabungkan semua utilitas: Flexbox, Grid, Responsivitas, Card, Tabel, dan Button
- Membangun layout dashboard aplikasi nyata dengan Sidebar navigasi dan Main Content
- Mengatur responsivitas mobile-to-desktop secara utuh (flex-col md:flex-row, sm:grid-cols-2 lg:grid-cols-3)
- Mengatur tabel data dengan scroll horizontal responsif (overflow-x-auto)
- Menyelesaikan satu proyek aplikasi dashboard utuh siap pakai

---

## Program: Aplikasi Dashboard Manajemen Toko & Inventaris

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 font-sans text-slate-800 antialiased min-h-screen flex flex-col md:flex-row">
  <!-- Sidebar Navigasi -->
  <aside class="w-full md:w-64 bg-slate-900 text-slate-300 p-5 flex flex-col justify-between shrink-0">
    <div>
      <!-- Brand -->
      <div class="flex items-center gap-3 mb-8">
        <div class="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-black">
          T
        </div>
        <div>
          <div class="font-bold text-white leading-tight">AdminPanel</div>
          <div class="text-[11px] text-slate-400">Tryngo Dashboard</div>
        </div>
      </div>

      <!-- Menu Items -->
      <nav class="space-y-1 text-sm font-medium">
        <a href="#" class="flex items-center gap-3 px-3 py-2 bg-indigo-600 text-white rounded-lg">
          <span>📊</span>
          <span>Ringkasan</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition">
          <span>📦</span>
          <span>Produk & Stok</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition">
          <span>👥</span>
          <span>Pelanggan</span>
        </a>
        <a href="#" class="flex items-center gap-3 px-3 py-2 hover:bg-slate-800 rounded-lg transition">
          <span>⚙️</span>
          <span>Pengaturan</span>
        </a>
      </nav>
    </div>

    <!-- User Profile Badge -->
    <div class="pt-4 border-t border-slate-800 flex items-center gap-3 mt-6">
      <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-white">
        AD
      </div>
      <div class="text-xs">
        <div class="font-semibold text-white">Admin Sistem</div>
        <div class="text-slate-400">admin@tryngo.id</div>
      </div>
    </div>
  </aside>

  <!-- Konten Utama Dashboard -->
  <main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <!-- Header Konten -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Ringkasan Penjualan</h1>
        <p class="text-sm text-slate-500">Statistik performa toko bulan berjalan</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="bg-white border border-slate-300 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-50">
          Unduh Laporan
        </button>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:bg-indigo-700">
          + Tambah Item
        </button>
      </div>
    </div>

    <!-- Kartu Metrik (3 Kolom Grid) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Pendapatan</div>
        <div class="text-2xl font-bold text-slate-900">Rp 48.250.000</div>
        <div class="text-xs text-emerald-600 font-semibold mt-2">↑ 12.5% dibanding bulan lalu</div>
      </div>
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pesanan Selesai</div>
        <div class="text-2xl font-bold text-slate-900">1.240</div>
        <div class="text-xs text-emerald-600 font-semibold mt-2">↑ 8.2% pesanan baru</div>
      </div>
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Pelanggan Aktif</div>
        <div class="text-2xl font-bold text-slate-900">324</div>
        <div class="text-xs text-slate-400 font-medium mt-2">98.4% retensi aktif</div>
      </div>
    </div>

    <!-- Tabel Data Transaksi Terbaru -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="font-bold text-slate-800 text-sm">Pesanan Terbaru</h3>
        <span class="text-xs text-slate-400">5 Transaksi Terakhir</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
            <tr>
              <th class="px-6 py-3">ID Pesanan</th>
              <th class="px-6 py-3">Pelanggan</th>
              <th class="px-6 py-3">Nominal</th>
              <th class="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr class="hover:bg-slate-50/75 transition">
              <td class="px-6 py-3 font-mono font-medium">#ORD-9021</td>
              <td class="px-6 py-3 font-medium">Budi Santoso</td>
              <td class="px-6 py-3 font-semibold">Rp 750.000</td>
              <td class="px-6 py-3">
                <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Selesai</span>
              </td>
            </tr>
            <tr class="hover:bg-slate-50/75 transition">
              <td class="px-6 py-3 font-mono font-medium">#ORD-9022</td>
              <td class="px-6 py-3 font-medium">Siti Rahma</td>
              <td class="px-6 py-3 font-semibold">Rp 320.000</td>
              <td class="px-6 py-3">
                <span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">Diproses</span>
              </td>
            </tr>
            <tr class="hover:bg-slate-50/75 transition">
              <td class="px-6 py-3 font-mono font-medium">#ORD-9023</td>
              <td class="px-6 py-3 font-medium">Ahmad Fauzi</td>
              <td class="px-6 py-3 font-semibold">Rp 1.150.000</td>
              <td class="px-6 py-3">
                <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Selesai</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</body>
</html>
```

---

## Konsep Kunci

### Arsitektur Dashboard Nyata
Dashboard terdiri dari dua area utama:
1. **Sidebar Navigation**: Menetap di sisi kiri pada layar besar (`md:w-64`), dan berada di atas pada layar HP (`w-full`).
2. **Main Content Area**: Mengisi sisa ruang (`flex-1`) dengan padding adaptif (`p-6 md:p-8`).

### Metrik & Grid Responsif
Kartu metrik menggunakan CSS Grid adaptif:
- 1 kolom pada ponsel (`grid-cols-1`)
- 2 kolom pada tablet (`sm:grid-cols-2`)
- 3 kolom pada desktop (`lg:grid-cols-3`)

### Tabel Responsif
Elemen tabel dibungkus kontainer `overflow-x-auto` agar tabel dengan kolom banyak tidak merusak lebar layar ponsel.

---

## Eksperimen

- Ubah warna sidebar dari slate-900 ke zinc-950 atau indigo-950
- Tambahkan baris transaksi baru di dalam tabel pesanan
- Tambahkan kartu metrik ke-4 untuk "Tingkat Pembatalan"
- Ganti warna aksen utama dari indigo-600 ke emerald-600 atau rose-600

---

## Tantangan

Tambahkan pagination di bawah tabel pesanan (Sebelumnya, 1, 2, 3, Selanjutnya) dengan tombol berukuran rapi dan state hover yang konsisten.

---

## Ringkasan

Minggu 9 dari 9: **Proyek Akhir: Dashboard Admin Responsif Lengkap**. Selamat! 🎉 Anda telah menyelesaikan kurikulum Tailwind CSS dari fondasi utility-first hingga dashboard manajemen inventaris lengkap.
