## Why This Matters

Svelte compiles reactivity at build time - no virtual DOM, tiny bundles, fast runtime. Its "write HTML, get reactivity" philosophy makes it arguably the most delightful framework to learn.

Practice program: *"Hello Svelte"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand Svelte as compiler framework
- Template syntax: { } for expressions
- Reactive declarations: $: derived = expr
- Event handling: on:click={handler}
- Scoped CSS inside component


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Node.js LTS (v20+))
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

> **Prerequisite Note:** Node.js runs the Svelte compiler and Vite development server.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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
  <h1 style="color: #ff3e00;">Halo dari Svelte 5!</h1>
  <p>Reaktivitas menggunakan Runes ($state):</p>
  <button on:click={() => count++} style="padding: 10px 20px; font-size: 16px; border-radius: 8px;">
    Klik Counter: {count}
  </button>
</main>
```
Svelte 5 component utilizing the modern $state() rune.

---

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
