# Node.js Basics & Runtime

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 1:** Node.js Basics & Runtime

## Learning Objectives

- Understand what Node.js is and its role as a JavaScript runtime
- Run JavaScript files with the node command
- Learn process object: version, platform, argv
- Variables: const, let, and basic JavaScript data types
- Function declarations vs arrow functions

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **ESLint** (`dbaeumer.vscode-eslint`): Code linting for Node.js
- **Prettier** (`esbenp.prettier-vscode`): Consistent code formatting

Or install all recommended extensions at once via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode
```

---

### 2. Runtime & Dependency Installation (Node.js LTS (v20+ / v22+))
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

### 3. Initializing a Blank Project (Scaffolding)
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

### 4. Running the Local Dev Server & First Entry File
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

### 5. New Project Directory Structure
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

### 6. Beginner Tips & Best Practices
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
