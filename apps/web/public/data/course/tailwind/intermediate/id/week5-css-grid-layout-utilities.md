# Tata Letak CSS Grid dengan Tailwind

> **Kategori:** Tailwind CSS | **Level:** Tata Letak & Responsivitas | **Minggu 5:** Tata Letak CSS Grid dengan Tailwind

## Tujuan Pembelajaran

- Mengaktifkan CSS Grid dengan class grid
- Menentukan jumlah kolom dengan grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-12
- Mengatur jarak antar sel grid dengan gap-4, gap-6, gap-x-*, gap-y-*
- Menggabungkan kolom dengan col-span-2 atau col-span-full
- Memahami kapan harus memilih Flexbox (1 dimensi) vs CSS Grid (2 dimensi)

---

## Program: Katalog Grid Produk Multi-Kolom

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-bold text-slate-900 mb-6">Galeri Modul Kursus (CSS Grid)</h2>

    <!-- Grid 3 Kolom dengan Gap -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Item 1: Span 2 Kolom -->
      <div class="col-span-2 bg-indigo-600 text-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
        <div>
          <span class="text-xs bg-indigo-700 px-2.5 py-1 rounded-full font-semibold">Spesial</span>
          <h3 class="text-2xl font-bold mt-3 mb-2">Jalur Fullstack Web</h3>
          <p class="text-indigo-100 text-sm">Pelajari kurikulum terpadu dari HTML5, CSS3, hingga backend database.</p>
        </div>
        <div class="text-xs text-indigo-200 mt-4 font-mono">col-span-2</div>
      </div>

      <!-- Item 2 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <div>
          <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Dasar</span>
          <h4 class="font-bold text-slate-800 mt-2">HTML5 Semantik</h4>
          <p class="text-xs text-slate-500 mt-1">Struktur dokumen dan aksesibilitas.</p>
        </div>
        <div class="text-xs text-slate-400 mt-4 font-mono">grid item</div>
      </div>

      <!-- Item 3 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Gaya</span>
        <h4 class="font-bold text-slate-800 mt-2">CSS3 Layouts</h4>
        <p class="text-xs text-slate-500 mt-1">Flexbox dan Modern Grid.</p>
      </div>

      <!-- Item 4 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Logika</span>
        <h4 class="font-bold text-slate-800 mt-2">JavaScript Murni</h4>
        <p class="text-xs text-slate-500 mt-1">Algoritma dan DOM manipulation.</p>
      </div>

      <!-- Item 5 -->
      <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <span class="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Utilitas</span>
        <h4 class="font-bold text-slate-800 mt-2">Tailwind CSS</h4>
        <p class="text-xs text-slate-500 mt-1">Desain responsif cepat.</p>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### CSS Grid di Tailwind
- Definisi Kolom: `grid-cols-2`, `grid-cols-3`, `grid-cols-4`, dst.
- Penyatuan Sel: `col-span-2` (memanjang 2 kolom), `col-span-full` (sepanjang baris)
- Gap Antar Baris & Kolom: `gap-6` (kedua sumbu), `gap-x-4` (horizontal), `gap-y-8` (vertikal)

---

## Eksperimen

- Ubah grid-cols-3 menjadi grid-cols-4 dan amati penataan item
- Ganti col-span-2 pada kartu pertama menjadi col-span-1
- Ubah gap-6 menjadi gap-2 untuk melihat tampilan yang lebih rapat
- Coba tambahkan row-span-2 pada salah satu kartu

---

## Tantangan

Buat galeri foto dengan grid 4 kolom, di mana foto pertama memiliki ukuran besar dengan col-span-2 dan row-span-2.

---

## Ringkasan

Minggu 5 dari 9: **Tata Letak CSS Grid dengan Tailwind**. Anda telah menguasai pengaturan grid 2 dimensi. Minggu depan: **Desain Responsif & Arsitektur Dark Mode**.
