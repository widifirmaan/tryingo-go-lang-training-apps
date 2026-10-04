# Arbitrary Values, Design Tokens & Tailwind Configuration

> **Kategori:** Tailwind CSS | **Level:** Custom Components, Design Systems & Production | **Minggu 6:** Arbitrary Values, Design Tokens & Tailwind Configuration
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Leverage arbitrary value syntax ([...]) when precision requirements fall outside standard scales
- Configure custom themes in tailwind.config: extend font families and custom glow shadows
- Author modern gradients: bg-gradient-to-r, from-emerald-600, and to-teal-400
- Apply backdrop-blur-md and alpha color opacity (bg-stone-800/90) for modern glassmorphism
- Neutralize non-interactive decorative overlays using pointer-events-none

---

## Program: Bespoke Visual Component with Arbitrary Values & Theme Extensions

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Arbitrary Values & Config</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            display: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
          },
          boxShadow: {
            'glow-emerald': '0 0 25px -5px rgba(46, 91, 68, 0.4)',
          }
        }
      }
    }
  </script>
</head>
<body class="bg-stone-900 text-stone-100 min-h-screen p-8 flex items-center justify-center font-sans">

  <!-- Komponen Menggunakan Nilai Arbitrer ([...]) dan Token Kustom -->
  <div class="max-w-md w-full bg-stone-800/90 backdrop-blur-md rounded-[28px] p-[32px] border border-stone-700 shadow-glow-emerald relative overflow-hidden">
    
    <!-- Elemen Dekoratif dengan Nilai Arbitrer Presisi -->
    <div class="absolute -right-12 -top-12 w-[160px] h-[160px] bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>

    <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/60 inline-block">
      Hardware Cluster
    </span>

    <h2 class="text-[28px] leading-[1.2] font-black mt-4 font-display text-white">
      Node Dedicated Bare-Metal 64-Core
    </h2>

    <p class="text-stone-400 text-[14px] mt-3 leading-[1.6]">
      Server komputasi berperforma tinggi dengan konektivitas jaringan terisolasi 100 Gbps dan latensi sub-milidetik.
    </p>

    <!-- Bar Utilisasi dengan Nilai Arbitrer w-[78%] -->
    <div class="mt-6 space-y-2">
      <div class="flex justify-between text-xs font-semibold">
        <span class="text-stone-300">Kapasitas RAM Terpakai</span>
        <span class="text-emerald-400">78%</span>
      </div>
      <div class="w-full h-[8px] bg-stone-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-emerald-600 to-teal-400 w-[78%] rounded-full transition-all duration-1000"></div>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between pt-6 border-t border-stone-700/60">
      <div>
        <span class="text-[11px] text-stone-400 uppercase tracking-wider block">Biaya Operasional</span>
        <span class="text-xl font-bold text-white">Rp 4.250.000<span class="text-xs text-stone-400 font-normal">/bln</span></span>
      </div>
      <button class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs px-5 py-3 rounded-[14px] transition-all shadow-lg shadow-emerald-900/30">
        Deploy Instance
      </button>
    </div>
  </div>

</body>
</html>
```

---

## Key Concepts

### Arbitrary Values ([...]) Syntax
When UI specifications call for bespoke dimensions outside standard scales, Tailwind provides **Arbitrary Values**:
- `w-[78%]`: Compiles to `width: 78%;`
- `rounded-[28px]`: Compiles to `border-radius: 28px;`
- `bg-[#2E5B44]`: Emits the precise brand hex tone.

### Theme Extensions (theme.extend)
Within `tailwind.config.js`, preserve defaults while registering bespoke tokens inside `theme.extend`:
- Register display typefaces (`font-display`).
- Declare neon ambient glows (`shadow-glow-emerald`).
Custom tokens integrate natively alongside standard classes.

---

---

## Beginner Friendly Explanation

### Analogy: Bespoke Tailoring
1. **Standard Tailwind classes** are off-the-rack sizing (Small, Medium, Large).
2. **Arbitrary Values `w-[78%]`** are asking a tailor to take in a sleeve by exactly 2.3 centimeters.
3. You enjoy the speed of off-the-rack modularity without sacrificing bespoke craftsmanship.

## Experiments

- Update w-[78%] to w-[95%] to watch the progress bar scale upward.
- Modify rounded-[28px] to rounded-[8px] to evaluate the perimeter geometry.
- Adjust the shadow-glow-emerald rgba value in config to alter ambient lighting.
- Remove pointer-events-none from the ambient blurred sphere and test text selection beneath it.

---

## Challenge

Build a network bandwidth stat card: deploy arbitrary values for a `w-[64%]` progress bar, sapphire blue ambient glow (`shadow-glow-blue`), and a custom display font.

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
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-900">
  <div class="flex items-center justify-between p-4 bg-slate-800 text-white rounded-xl shadow-lg">
    <span class="font-bold text-emerald-400">Tryngo Brand</span>
    <button class="px-4 py-2 bg-emerald-600 rounded-lg text-sm font-semibold">Menu</button>
  </div>
</body>
</html>
```
- **Expected Execution Output:**
```output
Elemen tersusun rapi di ujung kiri dan kanan
```

### 2. `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- **Core Functionality:** Grid responsif multi-breakpoint.
- **Parameters / Attributes:** `Breakpoint prefixes (sm:, md:, lg:)`.
- **System Behavior & Return:** Mengubah jumlah kolom secara bertahap saat layar membesar dari ponsel ke desktop..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-900">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 1</div>
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 2</div>
    <div class="p-5 bg-slate-800 text-white rounded-xl">Kolom 3</div>
  </div>
</body>
</html>
```
- **Expected Execution Output:**
```output
Grid 1 kolom di HP, 3 kolom di desktop
```

### 3. `hover:bg-emerald-600 active:scale-95 transition-all duration-200`
- **Core Functionality:** State modifiers interaktif & animasi.
- **Parameters / Attributes:** `hover:, active:, focus:, transition`.
- **System Behavior & Return:** Memberikan feedback visual interaktif saat tombol disentuh atau kursor diarahkan..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-8 bg-slate-900 flex justify-center">
  <button class="bg-emerald-500 hover:bg-emerald-600 active:scale-95 transition-all px-6 py-3 rounded-xl text-white font-bold shadow-lg">
    Tombol Interaktif Tailwind
  </button>
</body>
</html>
```
- **Expected Execution Output:**
```output
Tombol membesar dan berubah warna saat di-hover
```

### 4. `dark:bg-zinc-950 dark:text-zinc-100`
- **Core Functionality:** Dukungan tema gelap (Dark Mode).
- **Parameters / Attributes:** `dark: prefix selector`.
- **System Behavior & Return:** Menentukan warna khusus saat pengguna mengaktifkan mode gelap di peramban atau sistem..
- **Practical Code Example:**
```html
<!DOCTYPE html>
<html class="dark">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-slate-950">
  <div class="bg-slate-900 text-white border border-slate-700 p-6 rounded-2xl shadow-xl">
    <h3 class="text-xl font-bold text-emerald-400">Tema Gelap (Dark Mode)</h3>
    <p class="text-slate-300 mt-2">Warna latar dan kontras otomatis menyesuaikan preferensi sistem.</p>
  </div>
</body>
</html>
```
- **Expected Execution Output:**
```output
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

You have mastered arbitrary value syntax and Tailwind theme extensions. Next week, we explore component abstractions and prepare for our capstone project!
