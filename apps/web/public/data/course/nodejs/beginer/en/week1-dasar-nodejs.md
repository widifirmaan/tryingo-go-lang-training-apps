# Node.js Basics & Runtime

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 1:** Node.js Basics & Runtime

## Why This Matters

Node.js puts JavaScript on the server: a non-blocking event loop lets one language span browser to database. Understanding the Node runtime means understanding streams, workers, and real-time APIs.

Week 1 — themed **"Node.js Basics & Runtime"** — centers on the practice program *"Hello Node.js"*. Run the program in the Playground first, tweak it little by little, then read through the key concepts.


## Learning Objectives

- Understand what Node.js is and its role as a JavaScript runtime
- Run JavaScript files with the node command
- Learn process object: version, platform, argv
- Variables: const, let, and basic JavaScript data types
- Function declarations vs arrow functions


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language — learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running — fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly — great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write — errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs — more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies — they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live — the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations — it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Node.js LTS (v20+ / v22+))
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
v22.x.x
10.x.x
```

> 💡 **Prerequisite Note:** Node.js bundles the npm package manager by default.

---

### 2. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-node-api && cd my-node-api
npm init -y
npm install express dotenv
npm install -D typescript tsx @types/node @types/express
npx tsc --init
```
- **Details:** Sets up a modern Node.js project powered by TypeScript and tsx fast executor.
- **Navigate to the project directory:**
```bash
cd my-node-api
```

---

### 3. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npx tsx watch src/index.ts
```
Open in browser or terminal: `http://localhost:3000`

> ℹ️ API server runs with live file watching on port 3000.

**Initial Entry File (`src/index.ts`):**
```js
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`⚡ Server Node.js aktif di http://localhost:${PORT}`);
});
```
Simple Express server with health check route.

---

### 4. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-node-api/
├── src/
│   └── index.ts         # Server HTTP Express
├── .env                 # Konfigurasi environment variables
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Dependensi & skrip start
```
Lean and lightweight structure ideal for backend microservices.

---

### 5. Beginner Tips & Best Practices
- Use `tsx` (`npx tsx file.ts`) to execute TypeScript directly without pre-compiling.
- Leverage the built-in Node test runner via `node --test` for zero-dependency tests.

---

## Program: Hello Node.js

```javascript
const nama = "Node.js";
console.log("Selamat datang di " + nama + "!");
console.log("Versi: " + process.version);
console.log("Platform: " + process.platform);

const umur = 25;
const tinggi = 175.5;
const aktif = true;
const hobi = ["ngoding", "baca buku", "musik"];
const profil = { nama: "Budi", kota: "Jakarta" };

console.log("Umur: " + umur + " tahun");
console.log("Hobi: " + hobi.join(", "));
console.log("Profil: " + profil.nama + " dari " + profil.kota);

function sapa(nama) { return "Halo, " + nama + "!"; }
const kali = (a, b) => a * b;

console.log(sapa("Gopher"));
console.log("5 x 3 = " + kali(5, 3));
```

---

## Key Concepts

### What is Node.js
Node.js is a JavaScript runtime powered by V8.

### Process Object
process.version, process.platform, process.argv.

### Variables
const, let, avoid var.

### Functions
Function declarations vs arrow functions.

---

## Experiments

- Change variable values and observe
- Add a new function with different parameters
- Try process.argv with custom arguments
- Create arrow function with multiple parameters

---

## Challenge

Build a CLI greeting: accept name from process.argv, output greeting with timestamp.

---

## Summary

Week 1 of 12: **Node.js Basics & Runtime** (Level: Beginner). Next week: **Modules & NPM**.
