# Colors, Backgrounds, Borders, and Shadows

> **Kategori:** Tailwind CSS | **Level:** Utility-First Basics & Typography | **Minggu 3:** Colors, Backgrounds, Borders, and Shadows

## Learning Objectives

- Understand Tailwind color palette scales (50 to 950 for each hue)
- Configure background colors (bg-white, bg-indigo-600, bg-slate-100)
- Apply corner radius (rounded, rounded-lg, rounded-xl, rounded-full)
- Set border widths and colors (border, border-2, border-slate-200)
- Apply elevation shadows (shadow-sm, shadow, shadow-md, shadow-lg)

---

## Program: Product Card with Visual Tokens

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 flex justify-center">
  <div class="w-80 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
    <!-- Header Badge Visual -->
    <div class="bg-indigo-600 px-4 py-3 text-white flex justify-between items-center">
      <span class="text-xs uppercase tracking-wider font-semibold">Toko Elektronik</span>
      <span class="bg-indigo-700 text-xs px-2 py-0.5 rounded-full">Stok 12</span>
    </div>

    <!-- Body Info -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-slate-800 mb-1">Keyboard Mekanikal TKL</h3>
      <p class="text-xs text-slate-500 mb-4">Switch red, koneksi USB-C kabel braided.</p>
      
      <!-- Price & Button -->
      <div class="flex items-center justify-between pt-3 border-t border-slate-100">
        <div>
          <span class="text-xs text-slate-400 block">Harga</span>
          <span class="text-lg font-extrabold text-slate-900">Rp 450.000</span>
        </div>
        <button class="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm">
          Beli Sekarang
        </button>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Key Concepts

### Color Palette System
Tailwind color hues range from 50 (lightest) to 950 (deepest).

### Borders & Radius
- Width: `border` (1px), `border-2` (2px), `border-4` (4px)
- Radius: `rounded-sm`, `rounded`, `rounded-lg`, `rounded-full`

### Elevation Shadows
- `shadow-sm`: subtle elevation for inputs and buttons
- `shadow-md`: standard card elevation
- `shadow-lg` / `shadow-xl`: elevated modals and dialogs

---

## Experiments

- Change bg-indigo-600 to bg-rose-600 on top banner
- Switch shadow-md to shadow-xl for deeper floating appearance
- Change rounded-xl to rounded-none for sharp angular corners
- Switch button color from emerald-600 to sky-500

---

## Challenge

Build a coupon voucher card with dashed border (border-dashed), soft yellow background (bg-amber-50), and orange claim button.

---

## Summary

Week 3 of 9: **Colors, Backgrounds, Borders, and Shadows**. You mastered visual design tokens. Next week: **Flexbox Layout with Tailwind**.
