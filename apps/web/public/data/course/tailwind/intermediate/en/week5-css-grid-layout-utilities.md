# CSS Grid Layout with Tailwind

> **Kategori:** Tailwind CSS | **Level:** Layout & Responsiveness | **Minggu 5:** CSS Grid Layout with Tailwind

## Learning Objectives

- Activate CSS Grid with the grid class
- Define columns with grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-12
- Configure cell spacing with gap-4, gap-6, gap-x-*, gap-y-*
- Span items across columns with col-span-2 or col-span-full
- Know when to choose Flexbox (1D) vs CSS Grid (2D)

---

## Program: Multi-Column Product Grid Catalog

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

## Key Concepts

### CSS Grid in Tailwind
- Column Counts: `grid-cols-2`, `grid-cols-3`, `grid-cols-4`, etc.
- Column Spanning: `col-span-2`, `col-span-full`
- Gap Management: `gap-6` (both axes), `gap-x-4` (columns), `gap-y-8` (rows)

---

## Experiments

- Change grid-cols-3 to grid-cols-4 and observe redistribution
- Switch col-span-2 on first card to col-span-1
- Change gap-6 to gap-2 for compact layout
- Add row-span-2 to create vertical span

---

## Challenge

Build a photo gallery with 4-column grid where the first photo spans 2 columns and 2 rows.

---

## Summary

Week 5 of 9: **CSS Grid Layout with Tailwind**. You mastered 2D grid setups. Next week: **Responsive Design & Dark Mode Architecture**.
