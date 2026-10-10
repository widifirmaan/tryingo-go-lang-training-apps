# Responsive Design & Dark Mode Architecture

> **Kategori:** Tailwind CSS | **Level:** Layout & Responsiveness | **Minggu 6:** Responsive Design & Dark Mode Architecture

## Learning Objectives

- Understand mobile-first design philosophy (unprefixed styles target mobile viewports)
- Master built-in breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Apply responsive transformations: flex-col md:flex-row, grid-cols-1 md:grid-cols-3
- Apply dark: modifier for backgrounds, texts, and borders
- Test light and dark mode toggling dynamically

---

## Program: Mobile-First Responsive Component with Dark Mode

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
    }
  </script>
</head>
<body class="bg-slate-100 dark:bg-slate-900 p-6 min-h-screen transition-colors duration-200">
  <div class="max-w-2xl mx-auto">
    <!-- Toggle Button Simulator -->
    <div class="flex justify-end mb-4">
      <button onclick="document.documentElement.classList.toggle('dark')" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm">
        Beralih Mode (Terang / Gelap)
      </button>
    </div>

    <!-- Responsive Card (1 col on mobile, 2 cols on md+) -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">
      <!-- Image / Icon side -->
      <div class="w-full md:w-1/3 bg-indigo-600 dark:bg-indigo-700 p-6 flex flex-col justify-center items-center text-white text-center">
        <div class="text-3xl font-extrabold mb-1">PRO</div>
        <div class="text-xs uppercase tracking-wider text-indigo-200">Paket Langganan</div>
      </div>

      <!-- Content side -->
      <div class="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Akses Penuh Semua Modul
          </h3>
          <p class="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            Layout ini otomatis berubah: 1 kolom tumpuk pada layar HP, dan 2 kolom horizontal berdampingan pada layar tablet/desktop (md:).
          </p>
        </div>
        <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
          <span class="text-xs text-slate-500 dark:text-slate-400 font-mono">md:flex-row dark:bg-slate-800</span>
          <button class="bg-indigo-600 dark:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg font-medium">
            Mulai
          </button>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Key Concepts

### Mobile-First Breakpoints
Unprefixed classes apply to mobile devices. Breakpoint prefixes override them on wider screens:
- `sm:` >= 640px
- `md:` >= 768px
- `lg:` >= 1024px
- `xl:` >= 1280px

### Dark Mode
The `dark:` prefix activates when dark mode is enabled on the document root:
Example: `bg-white dark:bg-slate-900 text-slate-900 dark:text-white`

---

## Experiments

- Switch md:flex-row to lg:flex-row
- Click toggle button to observe instant color theme transitions
- Change dark:bg-slate-800 to dark:bg-slate-950 for deeper contrast
- Add text-center md:text-left to title

---

## Challenge

Build navigation displaying hamburger menu on mobile (block md:hidden) and horizontal menu links on desktop (hidden md:flex).

---

## Summary

Week 6 of 9: **Responsive Design & Dark Mode Architecture**. You mastered breakpoints and theme modes. Next week: **State Modifiers, Pseudo-Classes & Transitions**.
