# State Modifiers, Pseudo-Classes & Transitions

> **Kategori:** Tailwind CSS | **Level:** Components & Interface Project | **Minggu 7:** State Modifiers, Pseudo-Classes & Transitions

## Learning Objectives

- Master pseudo-class state modifiers: hover:, focus:, active:, disabled:
- Configure focus rings for accessible form styling (focus:ring-2)
- Use CSS transition utilities: transition, duration-*, ease-*
- Implement group and group-hover patterns for nested element transitions
- Apply subtle micro-transforms: hover:translate-x-1, hover:scale-105

---

## Program: Button Interactions, Input Focus, and Smooth Transitions

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 flex justify-center">
  <div class="w-96 bg-white p-6 rounded-xl shadow-md border border-slate-200">
    <h2 class="text-lg font-bold text-slate-800 mb-4">Interaksi & State Modifiers</h2>

    <!-- Form Input with Focus Ring -->
    <div class="mb-4">
      <label class="block text-xs font-semibold text-slate-700 mb-1">Email Pengguna</label>
      <input 
        type="email" 
        placeholder="nama@email.com"
        class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 transition duration-150 ease-in-out focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
    </div>

    <!-- Buttons with Hover & Active State -->
    <div class="space-y-2 mb-6">
      <button class="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold py-2.5 rounded-lg transition duration-200 shadow-sm hover:shadow">
        Tombol Utama (Hover & Active)
      </button>

      <button class="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold py-2.5 rounded-lg transition duration-150">
        Tombol Sekunder (Subtle)
      </button>
    </div>

    <!-- Group-Hover Pattern -->
    <div class="group p-3 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition duration-200 cursor-pointer flex items-center justify-between">
      <div>
        <div class="text-xs font-bold text-slate-800 group-hover:text-indigo-700 transition">
          Pola group-hover
        </div>
        <div class="text-[11px] text-slate-500">Sorot kartu ini untuk melihat efek</div>
      </div>
      <span class="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition duration-200">
        →
      </span>
    </div>
  </div>
</body>
</html>
```

---

## Key Concepts

### Tailwind State Modifiers
- `hover:`: cursor hover trigger
- `focus:`: keyboard/input focus trigger
- `active:`: mouse press trigger
- `disabled:`: disabled state trigger

### Smooth Transitions
- `transition`: activates property animations
- `duration-200`: transition duration in ms
- `ease-in-out`: easing function

### Group Hover Pattern
Apply `group` to parent container and `group-hover:*` on child nodes to animate children based on parent hover events.

---

## Experiments

- Switch hover:bg-indigo-700 to hover:bg-emerald-600
- Add hover:scale-105 to main button for scaling feedback
- Change duration-200 to duration-700 for slow transitions
- Change focus:ring-indigo-200 to focus:ring-rose-200

---

## Challenge

Build a link card with right arrow icon that translates right and turns blue when card is hovered.

---

## Summary

Week 7 of 9: **State Modifiers, Pseudo-Classes & Transitions**. You mastered interactive feedback. Next week: **UI Component Composition: Cards, Buttons, Forms, Modals**.
