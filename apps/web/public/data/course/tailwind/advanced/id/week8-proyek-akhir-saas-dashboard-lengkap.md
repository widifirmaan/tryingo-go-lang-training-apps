# Proyek Akhir: Aplikasi SaaS Landing & Interactive Dashboard

> **Kategori:** Tailwind CSS | **Level:** Komponen Kustom, Desain Sistem & Produksi | **Minggu 8:** Proyek Akhir: Aplikasi SaaS Landing & Interactive Dashboard

## Tujuan Pembelajaran

- Mengintegrasikan seluruh kurikulum Tailwind CSS dalam arsitektur SaaS Dashboard produksi lengkap
- Menyusun layout dua kolom (Sidebar Navigasi + Topbar + Main Scroll) yang responsif dan fleksibel
- Menerapkan sistem Dark Mode yang menyeluruh pada tabel data, kartu metrik, sidebar, dan header
- Menata tabel data aktivitas cluster dengan status badge dan bar persentase utilisasi visual
- Memastikan pengalaman pengguna yang mulus di ponsel (sidebar collapse otomatis) hingga desktop lebar

---

## Program: Aplikasi SaaS Dashboard Lengkap dengan Dark Mode & Metrik

```html
<!DOCTYPE html>
<html lang="id" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tryngo Cloud Platform — SaaS Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#F2F7F4',
              500: '#2E5B44',
              600: '#234735',
              800: '#172E22',
              900: '#0F1E16',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300">

  <!-- Layout Utama Dashboard: Sidebar + Main Content -->
  <div class="flex min-h-screen">
    
    <!-- Sidebar Navigasi -->
    <aside class="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hidden md:flex">
      <div class="space-y-8">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-brand-500/20">
            T
          </div>
          <div>
            <h1 class="font-bold text-base text-slate-900 dark:text-white leading-tight">Tryngo Cloud</h1>
            <span class="text-xs text-slate-400">Enterprise v3.8</span>
          </div>
        </div>

        <nav class="space-y-1">
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-brand-50 dark:bg-brand-900/40 text-brand-500 dark:text-emerald-400 font-semibold text-sm">
            <span>📊</span> Ikhtisar
          </a>
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
            <span>⚡</span> Klaster Server
          </a>
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
            <span>📦</span> Deployments
          </a>
          <a href="#" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors">
            <span>⚙️</span> Pengaturan
          </a>
        </nav>
      </div>

      <!-- Info Profil User di Footer Sidebar -->
      <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-xs">BP</div>
          <div class="text-xs">
            <span class="font-bold block text-slate-900 dark:text-white">Budi Pratama</span>
            <span class="text-slate-400">Lead Architect</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Konten Utama Dashboard -->
    <div class="flex-1 flex flex-col min-w-0">
      
      <!-- Topbar Header -->
      <header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between">
        <h2 class="font-bold text-lg text-slate-900 dark:text-white">Ikhtisar Infrastruktur Cloud</h2>
        <div class="flex items-center gap-3">
          <button onclick="toggleDark()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold">
            🌓 Mode Tampilan
          </button>
          <button class="bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95">
            + Tambah Pod Baru
          </button>
        </div>
      </header>

      <!-- Area Scroll Konten -->
      <main class="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto">
        
        <!-- Baris Kartu Metrik Grid Responsif -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Request</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-slate-900 dark:text-white">4.82 Miliar</span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">+18.4%</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata Latensi</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-brand-500 dark:text-emerald-400">6.4 ms</span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">-2.1 ms</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Penggunaan Memori</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-slate-900 dark:text-white">42.8%</span>
              <span class="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">Optimal</span>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Status SLA 2026</span>
            <div class="mt-4 flex items-baseline justify-between">
              <span class="text-2xl font-black text-slate-900 dark:text-white">99.99%</span>
              <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">Tier-4</span>
            </div>
          </div>
        </section>

        <!-- Tabel Aktivitas Cluster Terbaru -->
        <section class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h3 class="font-bold text-base text-slate-900 dark:text-white">Status Klaster Produksi Aktif</h3>
            <span class="text-xs font-semibold text-slate-500">Menampilkan 3 dari 12 node</span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th class="px-6 py-4">Nama Instance</th>
                  <th class="px-6 py-4">Wilayah Data Center</th>
                  <th class="px-6 py-4">Beban CPU</th>
                  <th class="px-6 py-4">Status Layanan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">sgp-worker-node-01</td>
                  <td class="px-6 py-4 text-slate-500 dark:text-slate-400">Singapura (ap-southeast-1)</td>
                  <td class="px-6 py-4">
                    <div class="w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-emerald-500 h-full w-[35%]"></div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Berjalan Normal
                    </span>
                  </td>
                </tr>

                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">jkt-api-gateway-02</td>
                  <td class="px-6 py-4 text-slate-500 dark:text-slate-400">Jakarta (id-jkt-01)</td>
                  <td class="px-6 py-4">
                    <div class="w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-emerald-500 h-full w-[48%]"></div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Berjalan Normal
                    </span>
                  </td>
                </tr>

                <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td class="px-6 py-4 font-semibold text-slate-900 dark:text-white">jkt-db-replica-01</td>
                  <td class="px-6 py-4 text-slate-500 dark:text-slate-400">Jakarta (id-jkt-01)</td>
                  <td class="px-6 py-4">
                    <div class="w-28 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div class="bg-amber-500 h-full w-[82%]"></div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Re-Indexing Data
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  </div>

  <script>
    function toggleDark() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
</body>
</html>
```

---

## Konsep Kunci

### Arsitektur SaaS Dashboard Modern
Aplikasi dashboard produksi ini menggabungkan seluruh keahlian Tailwind yang dipelajari:
1. **Layout Induk Terpadu**: Menggunakan `flex min-h-screen` dengan sidebar `hidden md:flex` yang otomatis tersembunyi rapi di layar ponsel sempit.
2. **Kesesuaian Tema Menyeluruh**: Setiap elemen memiliki pasangan kelas mode terang dan gelap (`bg-white dark:bg-slate-900`, `text-slate-900 dark:text-white`).
3. **Data Grid & Tabular Responsif**: Kartu metrik menggunakan `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` dan tabel dibungkus dengan `overflow-x-auto` agar tidak pernah merusak layout saat dibuka di layar ponsel.
4. **Mikro-Interaksi Tactile**: Tombol dilengkapi `active:scale-95` dan baris tabel memiliki `hover:bg-slate-50 transition-colors`.

---

---

## Penjelasan untuk Pemula

### Analogi: Ruang Kontrol Pusat Penerbangan Antariksa
Dashboard ini seperti ruang pusat kendali misi NASA:
- Di sisi kiri ada panel navigasi utama untuk memilih modul roket (**Sidebar**).
- Di layar depan ada indikator kecepatan, suhu, dan bahan bakar real-time (**Kartu Metrik Grid**).
- Di meja bawah ada daftar log aktivitas seluruh astronot di stasiun luar angkasa (**Tabel Data**).
- Saat lampu ruangan dimatikan untuk mode malam, seluruh layar otomatis meredup nyaman di mata tanpa silau (**Tailwind Dark Mode**).

## Eksperimen

- Buka dashboard ini di browser, klik tombol Mode Tampilan, dan nikmati transformasi tema gelap kelas enterprise.
- Kecilkan jendela browser ke ukuran ponsel dan amati sidebar yang otomatis tersembunyi rapi agar konten tabel tetap nyaman dibaca.
- Arahkan kursor mouse ke baris-baris tabel dan perhatikan efek hover highlight yang sangat halus.
- Coba ubah warna brand di tailwind.config menjadi palet warna ungu atau oranye dan lihat seluruh dashboard berganti identitas seketika.

---

## Tantangan

Tambahkan panel laci notifikasi geser (Notifications Slide-Over) di sisi kanan dashboard: sertakan daftar 4 aktivitas peringatan sistem, tombol "Tandai Semua Sudah Dibaca", dan tombol tutup silang.

---

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh kurikulum Tailwind CSS dari nol hingga menghasilkan aplikasi SaaS Dashboard kelas produksi. Kamu sekarang siap melangkah ke JavaScript untuk menghidupkan seluruh logika aplikasi secara dinamis!
