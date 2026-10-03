# Component Architecture: UI Extraction & Composition Patterns

> **Kategori:** Tailwind CSS | **Level:** Custom Components, Design Systems & Production | **Minggu 7:** Component Architecture: UI Extraction & Composition Patterns
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Determine when to extract Tailwind utility abstractions versus retaining inline atomic composition
- Architect a unified button variant system (Primary, Secondary, Danger, Ghost) with consistent interactions
- Construct status badges equipped with colored indicator dots using inline Flexbox
- Build overlapping user avatar stacks utilizing -space-x-2 and ring-2 ring-white
- Assemble component building blocks in preparation for the capstone SaaS Dashboard

---

## Program: Reusable UI Component Kit (Button, Badge, Avatar)

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Component Kit</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen p-8 flex items-center justify-center font-sans">

  <div class="max-w-2xl w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8">
    <div>
      <h2 class="text-2xl font-bold text-slate-900">Tryngo UI Design System Kit</h2>
      <p class="text-sm text-slate-500">Pola komposisi komponen tombol, badge, dan avatar yang konsisten.</p>
    </div>

    <!-- 1. Varian Tombol (Primary, Secondary, Danger, Ghost) -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Varian Tombol</h3>
      <div class="flex flex-wrap gap-3">
        <!-- Primary -->
        <button class="bg-emerald-800 hover:bg-emerald-900 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm">
          Tombol Utama
        </button>
        <!-- Secondary -->
        <button class="bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-semibold text-sm px-5 py-2.5 rounded-xl border border-slate-300 transition-all shadow-sm">
          Sekunder
        </button>
        <!-- Danger -->
        <button class="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-red-600/20">
          Hapus Data
        </button>
        <!-- Ghost -->
        <button class="text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all">
          Batal
        </button>
      </div>
    </div>

    <!-- 2. Varian Badges Status -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Badges Status</h3>
      <div class="flex flex-wrap gap-2.5">
        <span class="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Operasional
        </span>
        <span class="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pemeliharaan
        </span>
        <span class="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 text-xs font-semibold px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Gangguan
        </span>
      </div>
    </div>

    <!-- 3. Avatar Stack Group -->
    <div class="space-y-3">
      <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">Grup Kontributor Aktif</h3>
      <div class="flex items-center -space-x-2 overflow-hidden">
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">BP</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">SR</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">AN</div>
        <div class="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-stone-800 flex items-center justify-center font-bold text-xs text-white">+5</div>
      </div>
    </div>
  </div>

</body>
</html>
```

---

## Key Concepts

### When to Extract Components
A common anti-pattern is prematurely abstracting everything via `@apply` into CSS files. In modern component architectures (React, Vue, Svelte, Blade), component reusability is best achieved via **component abstractions** (`<Button variant="primary">`) rather than stylesheet indirection!

### Overlapping Avatar Stacks (-space-x-*)
To produce overlapping contributor circles common in modern SaaS:
- Apply negative horizontal spacing on the parent via `-space-x-2`.
- Apply `ring-2 ring-white` on circular avatars to carve a clean visual border separating adjacent portraits.

---

---

## Beginner Friendly Explanation

### Analogy: Corporate ID Badges
1. **Component Variants** are corporate security badges: identical dimensions and lamination, but color-coded for Executive (Gold), Staff (Emerald), and Guest (Muted).
2. **Avatar Stacks** are employee ID photo badges fanned out neatly on an office display board.

## Experiments

- Adjust -space-x-2 to -space-x-4 to watch avatar portraits overlap more aggressively.
- Remove ring-2 ring-white to observe the loss of the clean separating border between overlapping circles.
- Author a new Warning button variant using amber tones following existing structural conventions.
- Scale badge typography to text-sm and adjust padding proportionally.

---

## Challenge

Build an alert banner component supporting 3 variants (Success green, Info blue, Danger red): each featuring a left icon, bold headline, descriptive body, and a right-aligned dismiss button.

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

You have mastered component architecture and reusable design kit patterns in Tailwind. Next week is the capstone project: constructing a complete SaaS Landing Page and Interactive Dashboard with Dark Mode!
