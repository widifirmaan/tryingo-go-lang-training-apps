# Utility-First Philosophy, Setup & Typography

> **Kategori:** Tailwind CSS | **Level:** Utility-First Basics & Typography | **Minggu 1:** Utility-First Philosophy, Setup & Typography

## Learning Objectives

- Understand utility-first concept vs component-based classes (BEM)
- Connect Tailwind via CDN for rapid prototyping
- Master typography utilities: size (text-sm, text-lg, text-2xl), weight (font-medium, font-bold)
- Control line heights (leading-relaxed) and font colors (text-slate-700)
- Structure HTML documents with styling applied directly to class attributes

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`): Class name autocomplete, color preview, and CSS linting

Or install all recommended extensions at once via terminal:
```bash
code --install-extension bradlc.vscode-tailwindcss
```

---

### 2. Runtime & Dependency Installation (Node.js LTS)
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
node -v && npm -v
```

Expected output:
```output
v20.x.x
10.x.x
```

> 💡 **Prerequisite Note:** Tailwind v4 features the lightningcss engine with near-zero configuration.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npm create vite@latest my-tailwind-app -- --template vanilla
cd my-tailwind-app
npm install
npm install -D tailwindcss @tailwindcss/vite
```
- **Details:** Sets up Vite with the official Tailwind v4 plugin for lightning-fast builds.
- **Navigate to the project directory:**
```bash
cd my-tailwind-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm run dev
```
Open in browser or terminal: `http://localhost:5173`

> ℹ️ Development server runs with on-demand CSS compilation.

**Initial Entry File (`index.html`):**
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./src/style.css">
  <title>Tailwind v4 Starter</title>
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
  <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
    <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
      Tailwind v4 Ready
    </span>
    <h1 class="text-2xl font-bold tracking-tight">Utility-First Speed</h1>
    <p class="text-slate-400 text-sm leading-relaxed">
      Styling cepat, responsif, dan rapi tanpa meninggalkan dokumen HTML.
    </p>
    <button class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-colors font-medium text-sm">
      Coba Sekarang
    </button>
  </div>
</body>
</html>
```
Modern card component styled purely with Tailwind utilities.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-tailwind-app/
├── index.html           # HTML dengan utility classes Tailwind
├── src/
│   └── style.css        # Cukup sertakan: @import "tailwindcss";
├── vite.config.ts       # Plugin tailwindcss()
└── package.json         # Dependensi Tailwind & Vite
```
In Tailwind v4, simply write `@import "tailwindcss";` in style.css with zero config required.

---

### 6. Beginner Tips & Best Practices
- Use responsive modifiers (`sm:`, `md:`, `lg:`) for adaptive multi-screen layouts.
- Leverage the `dark:` prefix to implement dark mode effortlessly.

---

## Program: Utility-First & Typography Introduction

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-6 text-slate-800 font-sans">
  <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow border border-slate-200">
    <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full mb-3">
      Minggu 1: Fondasi
    </span>
    <h1 class="text-2xl font-bold text-slate-900 tracking-tight mb-2">
      Pengenalan Tailwind CSS
    </h1>
    <p class="text-slate-600 text-sm leading-relaxed mb-4">
      Tailwind CSS adalah utility-first CSS framework yang menyediakan ribuan class kecil untuk menyusun tampilan langsung pada markup HTML.
    </p>
    <div class="flex gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
      <span>Font: text-sm</span>
      <span>•</span>
      <span>Weight: font-bold</span>
      <span>•</span>
      <span>Leading: leading-relaxed</span>
    </div>
  </div>
</body>
</html>
```

---

## Key Concepts

### Utility-First Philosophy
Unlike traditional CSS where custom class names like `.card` or `.btn` are authored in external sheets, Tailwind provides single-purpose utility classes like `text-center`, `p-4`, and `rounded`. This removes the need for naming abstract classes and speeds up interface design.

### Typography Scales
- Sizing: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
- Weight: `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- Line Height: `leading-tight`, `leading-normal`, `leading-relaxed`, `leading-loose`

---

## Experiments

- Change heading size from text-2xl to text-4xl and observe size shift
- Change font color from text-slate-900 to text-indigo-700
- Switch font-bold to font-light or font-extrabold
- Add tracking-wide to increase letter spacing

---

## Challenge

Build an announcement card with bold title, small grey publication date, and relaxed paragraph text.

---

## Summary

Week 1 of 9: **Utility-First Philosophy, Setup & Typography**. You have learned basic utility-first principles and text styling. Next week: **Spacing Scales, Sizing, and Box Model**.
