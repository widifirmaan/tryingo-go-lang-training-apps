# State Modifiers: Hover, Focus-Visible, Active & Group-Hover

> **Kategori:** Tailwind CSS | **Level:** Utility-First & Layout Foundations | **Minggu 4:** State Modifiers: Hover, Focus-Visible, Active & Group-Hover

## Learning Objectives

- Master user interaction variants: hover:*, active:*, and focus:*
- Deploy accessible focus indicators using focus:ring-4 and focus:ring-offset-2
- Implement group-hover patterns to trigger child micro-interactions upon parent hover events
- Produce tactile button depression physics via active:scale-95
- Preserve keyboard accessibility with focus-visible:* while eliminating mouse-click outlines

---

## Program: Interactive Task List with Group Hover & Focus Ring

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind State Modifiers</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen flex items-center justify-center p-6 font-sans">

  <div class="max-w-lg w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
    <div>
      <h2 class="text-xl font-bold text-slate-900">Sprint Backlog Rekayasa</h2>
      <p class="text-sm text-slate-500">Arahkan kursor dan gunakan tombol TAB untuk melihat interaksi state.</p>
    </div>

    <!-- Daftar Item Interaktif dengan group hover -->
    <div class="space-y-3">
      <!-- Item 1 -->
      <div class="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer">
        <div class="flex items-center space-x-3">
          <input type="checkbox" class="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 border-slate-300 cursor-pointer">
          <span class="text-sm font-semibold text-slate-700 group-hover:text-emerald-900 transition-colors">
            Optimasi WASM Compiler Binary Size
          </span>
        </div>
        <button class="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs font-semibold text-slate-400 hover:text-red-600 p-1.5 transition-all">
          Hapus
        </button>
      </div>

      <!-- Item 2 -->
      <div class="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer">
        <div class="flex items-center space-x-3">
          <input type="checkbox" checked class="w-5 h-5 rounded-lg text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 border-slate-300 cursor-pointer">
          <span class="text-sm font-semibold text-slate-400 line-through group-hover:text-emerald-700 transition-colors">
            Audit Aksesibilitas WCAG 2.1 AA
          </span>
        </div>
        <button class="opacity-0 group-hover:opacity-100 focus:opacity-100 text-xs font-semibold text-slate-400 hover:text-red-600 p-1.5 transition-all">
          Hapus
        </button>
      </div>
    </div>

    <!-- Input Form dengan Focus Rings Aksesibel -->
    <div class="pt-4 border-t border-slate-100 flex gap-3">
      <input type="text" placeholder="Tambah tugas sprint baru..." 
             class="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 transition-all">
      <button class="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm">
        Tambah
      </button>
    </div>
  </div>

</body>
</html>
```

---

## Key Concepts

### State Modifiers Mechanics
Tailwind converts complex CSS pseudo-selectors into prefixes:
- `hover:bg-emerald-900`: Adjusts background on cursor hover.
- `active:scale-95`: Simulates tactile mechanical depression on mouse press.
- `focus:ring-4`: Projects an accessible optical ring halo upon keyboard focus.

### The group and group-hover Pattern
Frequently, auxiliary controls (like a delete action) should remain hidden (`opacity-0`) until the parent row is hovered:
1. Declare the `group` class on the bounding parent row.
2. Declare `group-hover:opacity-100` on the nested action button!
Hovering anywhere within the parent row reveals the child control without scripts.

---

---

## Beginner Friendly Explanation

### Analogy: Automatic Porch Sensors
1. **`hover:`** is a front-porch motion sensor light illuminating when a visitor steps near.
2. **`active:scale-95`** is a mechanical keyboard switch physically depressing beneath your fingertip.
3. **`group` and `group-hover`** is an automated estate gate: the moment your vehicle touches the outer gate (`group`), the garage door inside the courtyard (`group-hover`) rolls open synchronously.

## Experiments

- Hover over any task row and watch the delete button emerge gracefully from opacity-0 to 100.
- Click and hold the "Add" button to experience the tactile physical depression (active:scale-95).
- Press the physical TAB key to observe the emerald focus halo ring illuminating the text field.
- Remove the group token from the row container to verify that child hover actions cease responding.

---

## Challenge

Build a course catalog card utilizing `group`: on hover, the thumbnail zooms subtly (`group-hover:scale-105 overflow-hidden`), title shifts to emerald, and the action button illuminates.

---

## Summary

You have mastered state modifiers, accessibility focus rings, and group-hover patterns. Next week we enter Level 2: modern forms, micro-interactive transitions, and the SaaS Dashboard capstone!
