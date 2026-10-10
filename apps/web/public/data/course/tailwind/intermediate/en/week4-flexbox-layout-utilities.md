# Flexbox Layout with Tailwind

> **Kategori:** Tailwind CSS | **Level:** Layout & Responsiveness | **Minggu 4:** Flexbox Layout with Tailwind

## Learning Objectives

- Enable flexbox display with the flex class
- Control direction: flex-row vs flex-col
- Align along main axis: justify-start, justify-center, justify-between, justify-around
- Align along cross axis: items-center, items-start, items-end
- Use gap-* for clean gaps between child items without manual margin rules

---

## Program: Navbar and Element Layout with Flexbox

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-6">
  <!-- Navigasi Bar Flexbox -->
  <nav class="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between mb-6">
    <!-- Brand Logo -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
        T
      </div>
      <span class="font-bold text-slate-800 text-lg">Tryngo App</span>
    </div>

    <!-- Nav Links (Center / Right) -->
    <div class="flex items-center gap-6 text-sm text-slate-600 font-medium">
      <a href="#" class="text-indigo-600 font-semibold">Beranda</a>
      <a href="#">Kursus</a>
      <a href="#">Komunitas</a>
    </div>

    <!-- Action Button -->
    <button class="bg-slate-900 text-white text-xs px-4 py-2 rounded-lg font-medium">
      Masuk
    </button>
  </nav>

  <!-- Baris Status dengan Gap -->
  <div class="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-around text-center">
    <div class="flex-1 border-r border-slate-100">
      <div class="text-2xl font-bold text-slate-800">28</div>
      <div class="text-xs text-slate-400">Total Modul</div>
    </div>
    <div class="flex-1 border-r border-slate-100">
      <div class="text-2xl font-bold text-indigo-600">100%</div>
      <div class="text-xs text-slate-400">Dukungan Web</div>
    </div>
    <div class="flex-1">
      <div class="text-2xl font-bold text-emerald-600">Aktif</div>
      <div class="text-xs text-slate-400">Status Server</div>
    </div>
  </div>
</body>
</html>
```

---

## Key Concepts

### Tailwind Flexbox Utilities
- Display: `flex`, `inline-flex`
- Direction: `flex-row`, `flex-col`
- Main Axis: `justify-between`, `justify-center`, `justify-start`
- Cross Axis: `items-center`, `items-start`, `items-end`
- Spacing: `gap-2`, `gap-4`, `gap-6`

---

## Experiments

- Change justify-between on nav to justify-center
- Switch items-center to items-start
- Change flex-1 on metric cards to w-1/3
- Switch flex-row to flex-col on nav for mobile menu simulation

---

## Challenge

Build a comment box with left avatar, middle name and text (flex-1), and right options button.

---

## Summary

Week 4 of 9: **Flexbox Layout with Tailwind**. You mastered horizontal and vertical alignment. Next week: **CSS Grid Layout with Tailwind**.
