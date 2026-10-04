# Flexbox & CSS Grid Layouts with Tailwind Utilities

> **Kategori:** Tailwind CSS | **Level:** Utility-First & Layout Foundations | **Minggu 2:** Flexbox & CSS Grid Layouts with Tailwind Utilities
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Coordinate Flexbox alignments with Tailwind: flex, items-center, justify-between, and space-x-*
- Author declarative CSS Grid systems: grid, grid-cols-1, sm:grid-cols-2, lg:grid-cols-4, and gap-6
- Implement mobile-first responsive boundaries using native breakpoint prefixes (sm, md, lg, xl)
- Control conditional responsive visibility: hidden md:flex to collapse mobile menus cleanly
- Deploy flex-1, flex-shrink-0, and space-y-* for rhythmic vertical and horizontal flow

---

## Program: Responsive Navigation Bar & Metric Stat Grid

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Flexbox & Grid</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen p-6 font-sans">
  <div class="max-w-6xl mx-auto space-y-8">

    <!-- 1. Navigation Bar dengan Flexbox -->
    <header class="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-emerald-800 rounded-lg flex items-center justify-center text-white font-bold">T</div>
        <span class="font-bold text-lg text-slate-900">Tryngo Admin</span>
      </div>
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
        <a href="#" class="text-emerald-800 font-semibold">Ikhtisar</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Pesanan</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Pelanggan</a>
        <a href="#" class="hover:text-slate-900 transition-colors">Analitik</a>
      </nav>
      <div class="flex items-center space-x-3">
        <button class="bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm">
          + Buat Proyek
        </button>
      </div>
    </header>

    <!-- 2. Grid Statistik Metrik Utama -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pendapatan</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">Rp 128.4 Jt</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+14.2%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Siswa Aktif</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">14.820</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+8.1%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kuis Selesai</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">92.4%</span>
          <span class="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">+2.4%</span>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Uptime Server</span>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-2xl font-black text-slate-900">99.98%</span>
          <span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Normal</span>
        </div>
      </div>
    </section>

  </div>
</body>
</html>
```

---

## Key Concepts

### Streamlined Flexbox in Tailwind
Rather than authoring five manual CSS declarations, declare:
`flex items-center justify-between`
- `flex`: `display: flex;`
- `items-center`: `align-items: center;`
- `justify-between`: `justify-content: space-between;`
- `space-x-4`: Inserts horizontal spacing between children without targeting `:last-child`.

### Mobile-First Responsive Prefixes
Tailwind is intrinsically mobile-first:
- `grid-cols-1`: Unprefixed baseline for compact mobile viewports (1 column).
- `sm:grid-cols-2`: Screen widths $\ge$ 640px step up to 2 columns.
- `lg:grid-cols-4`: Screen widths $\ge$ 1024px expand into 4 columns.
Zero hand-written media queries required; prefix any utility with breakpoint tags!

---

---

## Beginner Friendly Explanation

### Analogy: A Highway Police Escort
1. **`flex justify-between`** positions two escort cruisers: one pinned to the extreme front, the other guarding the rearmost perimeter.
2. **`items-center`** aligns vehicle windows along a level horizontal trajectory.
3. **`sm:` and `lg:`** act as dynamic highway traffic dispatchers: "On single-lane city alleys, travel in 1 single file. The moment you hit the multi-lane expressway (`lg:`), fan out into 4 side-by-side lanes!".

## Experiments

- Switch lg:grid-cols-4 to lg:grid-cols-2 to view a 2x2 dashboard matrix on desktop screens.
- Remove the hidden utility from navigation links and inspect mobile menu overflow.
- Increase gap-6 to gap-12 on the grid container to evaluate expanded spatial padding.
- Inspect items-baseline to confirm that percentage badges lock to the numeric baseline.

---

## Challenge

Build a split-screen hero section: left column holds headline copy and twin CTAs; right column displays an interactive preview mock-up. Stack vertically on mobile, unlocking a two-column layout on desktop via `grid-cols-1 md:grid-cols-2 gap-12 items-center`.

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

You have mastered responsive Flexbox and Grid composition with Tailwind utilities. Next week, we examine chromatic scales, elevation shadows, and systemic Dark Mode.
