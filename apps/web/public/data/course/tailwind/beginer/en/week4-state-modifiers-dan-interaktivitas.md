# State Modifiers: Hover, Focus-Visible, Active & Group-Hover

> **Kategori:** Tailwind CSS | **Level:** Utility-First & Layout Foundations | **Minggu 4:** State Modifiers: Hover, Focus-Visible, Active & Group-Hover
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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

## Visual Mental Model & Architecture Flow

![Diagram Flexbox & Grid Axis Sumbu Layout](/diagrams/flexbox-axis.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ KONTROL UTILITY TAILWIND                                 │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ flex items-center justify-between (Flexbox)          │ │
│ │ ┌──────────────┐ ┌──────────────┐ ┌────────────────┐ │ │
│ │ │ w-1/3 p-4    │ │ w-1/3 p-4    │ │ w-1/3 p-4      │ │ │
│ │ │ bg-zinc-900  │ │ bg-emerald-600│ │ bg-zinc-800   │ │ │
│ │ │ text-white   │ │ hover:scale-105│ │ rounded-2xl   │ │ │
│ │ └──────────────┘ └──────────────┘ └────────────────┘ │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `flex items-center justify-between`
- **Core Functionality:** Utility tata letak Flexbox instan.
- **Parameters / Attributes:** `Display flex, alignment, distribution`.
- **System Behavior & Return:** Menyusun kontainer fleksibel dengan pemusatan vertikal dan pemisahan horizontal antar elemen..
- **Practical Code Example:**
```html
<div class="flex items-center justify-between p-4 bg-zinc-900 text-white rounded-xl">
  <span>Brand</span>
  <button>Menu</button>
</div>
```
- **Expected Execution Output:**
```text
Elemen tersusun rapi di ujung kiri dan kanan
```

### 2. `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- **Core Functionality:** Grid responsif multi-breakpoint.
- **Parameters / Attributes:** `Breakpoint prefixes (sm:, md:, lg:)`.
- **System Behavior & Return:** Mengubah jumlah kolom secara bertahap saat layar membesar dari ponsel ke desktop..
- **Practical Code Example:**
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="p-4 bg-zinc-100 rounded-lg">Kartu 1</div>
</div>
```
- **Expected Execution Output:**
```text
Grid 1 kolom di HP, 3 kolom di desktop
```

### 3. `hover:bg-emerald-600 active:scale-95 transition-all duration-200`
- **Core Functionality:** State modifiers interaktif & animasi.
- **Parameters / Attributes:** `hover:, active:, focus:, transition`.
- **System Behavior & Return:** Memberikan feedback visual interaktif saat tombol disentuh atau kursor diarahkan..
- **Practical Code Example:**
```html
<button class="bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all px-4 py-2 rounded-lg text-white font-bold">
  Simpan
</button>
```
- **Expected Execution Output:**
```text
Tombol membesar dan berubah warna saat di-hover
```

### 4. `dark:bg-zinc-950 dark:text-zinc-100`
- **Core Functionality:** Dukungan tema gelap (Dark Mode).
- **Parameters / Attributes:** `dark: prefix selector`.
- **System Behavior & Return:** Menentukan warna khusus saat pengguna mengaktifkan mode gelap di peramban atau sistem..
- **Practical Code Example:**
```html
<div class="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 p-6 rounded-2xl">
  Tema Adaptif
</div>
```
- **Expected Execution Output:**
```text
Warna otomatis menyesuaikan mode gelap pengguna
```

---

## Common Pitfalls & Debugging Tips

### 1. Dynamic String Interpolation for Class Names
- **Symptom / Issue:** Classes like `text-${color}-500` get purged from the production CSS bundle.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always write complete class names or declare them explicitly in the Tailwind safelist.

### 2. Conflicting Utility Order
- **Symptom / Issue:** Writing competing rules like `p-4 px-2` creates non-deterministic layout.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use the official Prettier Tailwind plugin to sort classes automatically.

### 3. Excessive Arbitrary Values
- **Symptom / Issue:** Sprinkling `w-[371px]` breaks theme design tokens and visual rhythm.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Stick to theme spacing presets (`w-80`, `w-96`) or extend your design tokens in `theme.extend`.

---

## Summary

You have mastered state modifiers, accessibility focus rings, and group-hover patterns. Next week we enter Level 2: modern forms, micro-interactive transitions, and the SaaS Dashboard capstone!
