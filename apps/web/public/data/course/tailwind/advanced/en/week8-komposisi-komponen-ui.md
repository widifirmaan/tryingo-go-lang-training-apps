# UI Component Composition: Cards, Buttons, Forms, Modals

> **Kategori:** Tailwind CSS | **Level:** Components & Interface Project | **Minggu 8:** UI Component Composition: Cards, Buttons, Forms, Modals

## Learning Objectives

- Compose structured modal components (header, form body, action footer)
- Style native form elements: inputs, select dropdowns, checkboxes
- Use multi-column grid inside form structures
- Build cohesive button hierarchies (primary, secondary, ghost)
- Maintain vertical rhythm using space-y-* utilities

---

## Program: Cohesive Form & Modal Dialog Component System

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 min-h-screen flex items-center justify-center">
  <!-- Dialog Modal Container -->
  <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
    <!-- Modal Header -->
    <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h3 class="text-base font-bold text-slate-900">Tambah Produk Baru</h3>
        <p class="text-xs text-slate-500">Masukkan rincian item ke katalog</p>
      </div>
      <button class="text-slate-400 hover:text-slate-600 text-lg font-bold">×</button>
    </div>

    <!-- Modal Form Body -->
    <form class="p-6 space-y-4">
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Produk</label>
        <input type="text" value="Mouse Nirkabel Ergonomis" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
          <select class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 bg-white">
            <option>Aksesoris</option>
            <option>Komputer</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Harga (IDR)</label>
          <input type="number" value="250000" class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Status Publikasi</label>
        <label class="flex items-center gap-2 cursor-pointer mt-1">
          <input type="checkbox" checked class="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
          <span class="text-xs text-slate-700 font-medium">Tampilkan langsung di katalog publik</span>
        </label>
      </div>

      <!-- Action Footer -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
        <button type="button" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg">
          Batal
        </button>
        <button type="submit" class="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition">
          Simpan Data
        </button>
      </div>
    </form>
  </div>
</body>
</html>
```

---

## Key Concepts

### UI Composition Patterns
Tailwind enables standardized UI blocks through utility pairings:
1. **Cards / Modals**: `rounded-2xl shadow-xl border overflow-hidden`
2. **Form Controls**: `px-3 py-2 text-sm rounded-lg border`
3. **Button Hierarchy**:
   - Primary: `bg-indigo-600 text-white`
   - Secondary: `border text-slate-700`
   - Ghost: `text-slate-600 hover:text-slate-800`

---

## Experiments

- Change Save button to emerald-600
- Switch max-w-md to max-w-lg for wider modal
- Add textarea field for product description
- Switch shadow-xl to shadow-2xl for deeper elevation

---

## Challenge

Build a floating toast notification card in top right corner with success check icon and dismiss button (×).

---

## Summary

Week 8 of 9: **UI Component Composition**. You mastered modal dialogs and form patterns. Next week: **Final Project: Complete Responsive Admin Dashboard**.
