# Spacing Scales, Sizing, and Box Model

> **Kategori:** Tailwind CSS | **Level:** Utility-First Basics & Typography | **Minggu 2:** Spacing Scales, Sizing, and Box Model

## Learning Objectives

- Understand Tailwind scale system (1 unit = 0.25rem = 4px)
- Master padding utilities (p, px, py, pt, pb, pl, pr)
- Master margin utilities (m, mx, my, mt, mb, ml, mr)
- Configure widths (w-full, w-1/2, max-w-md) and heights (h-12, h-screen)
- Use mx-auto for horizontal centering of block containers

---

## Program: Applying Padding, Margin, Width, and Height

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8">
  <div class="max-w-lg mx-auto bg-white rounded-lg shadow p-6 mb-6">
    <h2 class="text-xl font-bold text-slate-800 mb-4">Demonstrasi Box Model</h2>
    
    <!-- Outer Container (Margin & Padding) -->
    <div class="bg-amber-50 border-2 border-dashed border-amber-300 p-4 mb-4">
      <p class="text-xs font-mono text-amber-700 mb-2">Padding: p-4 (1rem / 16px)</p>
      
      <!-- Inner Element (Width & Height) -->
      <div class="w-full h-16 bg-amber-500 rounded flex items-center justify-center text-white font-medium text-sm">
        Width: w-full | Height: h-16
      </div>
    </div>

    <!-- Sizing Comparison -->
    <div class="grid grid-cols-3 gap-2 text-center text-xs">
      <div class="w-20 h-12 bg-slate-200 rounded flex items-center justify-center mx-auto">w-20</div>
      <div class="w-28 h-12 bg-slate-300 rounded flex items-center justify-center mx-auto">w-28</div>
      <div class="w-36 h-12 bg-slate-400 text-white rounded flex items-center justify-center mx-auto">w-36</div>
    </div>
  </div>
</body>
</html>
```

---

## Key Concepts

### Tailwind Spacing Scale
Each numeric step corresponds to 4px:
- `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, `p-6` = 24px, `p-8` = 32px

### Directional Spacing
- `px-*`: Horizontal (left and right)
- `py-*`: Vertical (top and bottom)
- `pt-*`, `pb-*`, `pl-*`, `pr-*`: Individual sides

---

## Experiments

- Change padding from p-6 to p-10 and inspect internal spacing
- Change max-w-lg to max-w-xs to see container shrink
- Remove mx-auto to see container snap to left
- Add space-y-4 to parent to enforce uniform vertical gaps

---

## Challenge

Build a user profile card with a centered w-24 h-24 square avatar inside uniform padding.

---

## Summary

Week 2 of 9: **Spacing Scales, Sizing, and Box Model**. You learned the 4px scaling system. Next week: **Colors, Backgrounds, Borders, and Shadows**.
