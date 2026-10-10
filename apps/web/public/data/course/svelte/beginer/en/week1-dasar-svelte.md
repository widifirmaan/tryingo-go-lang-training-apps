# Svelte Basics & Template

> **Kategori:** Svelte | **Level:** Beginner | **Minggu 1:** Svelte Basics & Template

## Learning Objectives

- Understand Svelte as compiler framework
- Template syntax: { } for expressions
- Reactive declarations: $: derived = expr
- Event handling: on:click={handler}
- Scoped CSS inside component

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Svelte for VS Code** (`svelte.svelte-vscode`): Language support and diagnostics for .svelte files

Or install all recommended extensions at once via terminal:
```bash
code --install-extension svelte.svelte-vscode
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+))
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

> 💡 **Prerequisite Note:** Node.js runs the Svelte compiler and Vite development server.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npm create svelte@latest my-svelte-app
cd my-svelte-app
npm install
```
- **Details:** Select "Skeleton project" with TypeScript for a minimal, clean starter structure.
- **Navigate to the project directory:**
```bash
cd my-svelte-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm run dev
```
Open in browser or terminal: `http://localhost:5173`

> ℹ️ SvelteKit dev server runs at http://localhost:5173.

**Initial Entry File (`src/routes/+page.svelte`):**
```svelte
<script lang="ts">
  let count = $state(0);
</script>

<main style="text-align: center; padding: 4rem; font-family: system-ui;">
  <h1 style="color: #ff3e00;">✨ Halo dari Svelte 5!</h1>
  <p>Reaktivitas menggunakan Runes ($state):</p>
  <button on:click={() => count++} style="padding: 10px 20px; font-size: 16px; border-radius: 8px;">
    Klik Counter: {count}
  </button>
</main>
```
Svelte 5 component utilizing the modern $state() rune.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-svelte-app/
├── src/
│   ├── routes/
│   │   ├── +page.svelte     # Halaman utama (/)
│   │   └── +layout.svelte   # Layout pembungkus
│   └── app.html             # Template HTML dasar
├── svelte.config.js         # Konfigurasi adapter Svelte
├── vite.config.ts           # Konfigurasi bundler Vite
└── package.json             # Dependensi project
```
SvelteKit maps files inside src/routes directly to HTTP URL routes.

---

### 6. Beginner Tips & Best Practices
- Svelte 5 introduces Runes (`$state`, `$derived`, `$effect`) for explicit, clean reactivity.
- SvelteKit includes adapters for direct deployment to Cloudflare Pages, Vercel, or Node.

---

## Program: Hello Svelte

```svelte
<!-- Svelte = compiler framework (no virtual DOM) -->
<script>
  let name = "Tryngo";
  let count = 0;
  $: doubled = count * 2;
  $: greeting = "Halo, " + name + "!";
  function increment() { count++; }
</script>
<h1>{greeting}</h1>
<p>Count: {count} | Doubled: {doubled}</p>
<button on:click={increment}>+</button>
<!-- Svelte app siap dijalankan -->
```

---

## Key Concepts

### Svelte
Compiler framework, no virtual DOM.

### Template
{ } = expressions, auto-update.

### Reactive Declarations
$: re-runs on dependency change.

### Scoped CSS
Style scoped to component.

---

## Experiments

- Change state and observe UI update
- Add new reactive declaration
- Create conditional rendering
- Render list with each

---

## Challenge

Build a counter app with increment, decrement, reset. Show different messages based on value.

---

## Summary

Week 1 of 10: **Svelte Basics & Template** (Level: Beginner). Next week: **Reactivity & Statements**.
