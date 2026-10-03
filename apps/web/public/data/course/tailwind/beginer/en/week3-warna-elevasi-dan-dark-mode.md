# Colors, Elevation Shadows & Dark Mode Architecture in Tailwind

> **Kategori:** Tailwind CSS | **Level:** Utility-First & Layout Foundations | **Minggu 3:** Colors, Elevation Shadows & Dark Mode Architecture in Tailwind
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Distinguish Tailwind Dark Mode strategies: class strategy (manual state toggle) vs media strategy (OS level)
- Deploy dark:* variant modifiers for backgrounds, typography, and borders in dark contexts
- Calibrate elevation depth using standardized box shadows (shadow-sm, shadow-md, shadow-xl, shadow-2xl)
- Extend custom brand chromatic swatches inside tailwind.config from 50 to 900 tints
- Implement smooth thematic shifts via transition-colors duration-300

---

## Program: SaaS Subscription Card with Instant Dark Mode Toggling

```html
<!DOCTYPE html>
<html lang="id" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Dark Mode & Elevation</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class', // Menggunakan strategi class alih-alih media
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#F2F7F4',
              500: '#2E5B44',
              800: '#1D3B2C',
              900: '#12251C',
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 font-sans">

  <!-- Tombol Toggle Tema -->
  <button onclick="toggleDarkMode()" class="mb-8 px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 shadow-sm text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-700 transition-all">
    🌓 Ganti Mode Tampilan
  </button>

  <!-- Kartu SaaS Adaptif dengan Dark Mode Prefix -->
  <div class="max-w-sm w-full bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200 dark:border-stone-700 shadow-xl dark:shadow-2xl dark:shadow-black/40 transition-all">
    <div class="flex justify-between items-center">
      <span class="text-xs font-bold uppercase tracking-wider text-brand-500 dark:text-emerald-400 bg-brand-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
        Paket Pro
      </span>
      <span class="text-xs text-stone-400 font-medium">Billed Annually</span>
    </div>

    <h2 class="text-2xl font-black mt-4 text-stone-900 dark:text-white">
      Developer Pro
    </h2>
    <p class="text-sm text-stone-500 dark:text-stone-400 mt-2">
      Akses komputasi performa tinggi untuk tim rekayasa software.
    </p>

    <div class="mt-6 flex items-baseline gap-1">
      <span class="text-4xl font-black text-stone-900 dark:text-white">Rp 299rb</span>
      <span class="text-sm text-stone-400 font-medium">/bulan</span>
    </div>

    <ul class="mt-6 space-y-3 text-sm text-stone-600 dark:text-stone-300">
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Kuota 1.000 Menit Kompilasi WASM
      </li>
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Dukungan 28 Kurikulum Lengkap
      </li>
      <li class="flex items-center gap-2">
        <span class="text-emerald-500 font-bold">✓</span> Sertifikasi Ujian Interaktif
      </li>
    </ul>

    <button class="w-full mt-8 bg-brand-500 hover:bg-brand-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-brand-500/20 transition-all">
      Langganan Sekarang
    </button>
  </div>

  <script>
    function toggleDarkMode() {
      document.documentElement.classList.toggle('dark');
    }
  </script>
</body>
</html>
```

---

## Key Concepts

### Dark Mode Deployment Strategies
Tailwind supports two orchestration patterns:
1. **media**: Subscribes automatically to the host operating system's `prefers-color-scheme`.
2. **class**: Empowers application-level toggling by observing the presence of the `.dark` class on `<html>`.

### The dark:* Modifier Paradigm
Declare baseline light properties, then append the `dark:` variant on the same element:
`class="bg-white dark:bg-stone-800 text-stone-900 dark:text-white"`
The instant the `dark` class mounts to `<html>`, the cascade automatically engages the dark variant spectrum.

### Elevation & Shadow Tinting
In light mode, subtle ambient shadows (`shadow-xl`) convey elevation. In dark mode, shadows vanish against dark surfaces; Tailwind enables colored shadow tinting like `dark:shadow-black/40`.

---

---

## Beginner Friendly Explanation

### Analogy: A Theater Lighting Switch
1. **Light Mode** is daylight office hours: bright white walls, natural oak tables, dark black ink providing contrast.
2. **`dark:` modifier** is engaging home-theater mode: walls darken (`dark:bg-stone-800`), while text inverts to illuminated crisp white (`dark:text-white`).
3. **`darkMode: 'class'`** is the wall switch in your hand: you toggle the switch whenever you choose, independent of outdoor weather.

## Experiments

- Click the toggle button and observe the synchronized transition across cards, typography, and borders.
- Remove shadow-xl from the card wrapper to evaluate the flattening of visual elevation.
- Modify dark:bg-stone-800 to dark:bg-black to test high-contrast OLED black themes.
- Delete transition-colors duration-300 to witness jarring, instantaneous theme flashes.

---

## Challenge

Construct an executive testimonial card: include quotation copy, gold star ratings, author name, and company title. Deliver a dark variation utilizing `dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100`.

---

## Visual Mental Model & Architecture Flow

![Diagram Flexbox & Grid Axis Sumbu Layout](/diagrams/flexbox-axis.svg)

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
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

You have mastered Dark Mode mechanics, chromatic custom scales, and elevation shadows. Next week, we examine interactive state modifiers (hover, focus-visible, active, disabled).
