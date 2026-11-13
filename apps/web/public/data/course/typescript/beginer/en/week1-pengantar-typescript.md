## Why This Matters

TypeScript is JavaScript with a type system - now the de facto standard in modern frontend and backend projects. Catching bugs at compile time instead of during the demo is what earns you trust to build large systems.

Practice program: *"Hello TypeScript"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Difference between TypeScript and JavaScript: static typing
- Basic types: string, number, boolean, arrays, tuples
- Type inference: TypeScript automatically detects types
- Enums for fixed sets of values
- Any, unknown, void, never types


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

> **Prerequisite Note:** VS Code provides native, out-of-the-box TypeScript language intelligence.

---

### 2. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-ts-project && cd my-ts-project
npm init -y
npm install -D typescript tsx @types/node
npx tsc --init
```
- **Details:** Configures the official TypeScript compiler (tsc) with strict type checking enabled.
- **Navigate to the project directory:**
```bash
cd my-ts-project
```

---

### 3. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npx tsx src/index.ts
```
Open in browser or terminal: `Terminal Console`

> ℹ️ Code executes and prints directly in the terminal without a separate build step.

**Initial Entry File (`src/index.ts`):**
```ts
interface User {
  id: number;
  name: string;
  role: 'admin' | 'developer' | 'guest';
}

function formatGreeting(user: User): string {
  return `Halo ${user.name}, peran Anda adalah ${user.role.toUpperCase()}.`;
}

const me: User = { id: 1, name: 'Antigravity Dev', role: 'developer' };
console.log(formatGreeting(me));
```
TypeScript program demonstrating interfaces and string literal unions.

---

### 4. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-ts-project/
├── src/
│   ├── index.ts         # Titik masuk eksekusi kode
│   └── types.ts         # Definisi interface & types
├── tsconfig.json        # Konfigurasi compiler TypeScript
└── package.json         # Package configuration
```
The src/ directory holds all typed source files compiled by tsc.

---

### 5. Beginner Tips & Best Practices
- Keep `"strict": true` active in tsconfig.json for maximum type safety.
- Leverage built-in utility types such as `Partial<T>`, `Pick<T, K>`, and `Record<K, T>`.

---

## Program: Hello TypeScript

```typescript
// Dasar Tipe Data
const nama: string = "Budi";
const umur: number = 25;
const aktif: boolean = true;

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Aktif:", aktif);

// Type Inference (TypeScript otomatis deteksi tipe)
const kota = "Jakarta"; // string
const tinggi = 175.5;  // number
const setuju = true;   // boolean

// Array
const angka: number[] = [1, 2, 3, 4, 5];
const buah: Array<string> = ["apel", "mangga"];

// Tuple
const koordinat: [number, number] = [106.8, -6.2];
const userTuple: [string, number, boolean] = ["Budi", 25, true];

// Enum
enum Warna {
    Merah = "red",
    Hijau = "green",
    Biru = "blue"
}
const favColor: Warna = Warna.Hijau;

// Any & Unknown
let flexible: any = "bisa apa saja";
flexible = 42;
flexible = true;

let safeUnknown: unknown = "type-safe any";
if (typeof safeUnknown === "string") {
    console.log("String length:", safeUnknown.length);
}

// Void & Never
function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(msg: string): never {
    throw new Error(msg);
}

console.log("\n=== Enum ===");
console.log("Warna favorit:", favColor);
console.log("Koordinat:", koordinat);
```

---

## Key Concepts

### TypeScript vs JavaScript
TypeScript = JavaScript + Static Types. Compiled to JS. Catch errors at compile-time.

### Basic Types
`string`, `number`, `boolean`, `null`, `undefined`, `symbol`.

### Type Inference
`const x = 10` automatically `number`. Don't always need explicit types.

### Arrays & Tuples
`number[]` or `Array<number>`. Tuple `[string, number]` fixed-length.

### Enums
Named value sets: `enum Warna { Merah = "red" }`.

### Any vs Unknown
`any` bypasses type checking. `unknown` is type-safe - must check before use.

---

## Experiments

- Try assigning string to number variable - see the error
- Create enum for days of the week
- Experiment unknown with type guards
- Create tuple with 4 different elements
- Try union type: string | number

---

## Challenge

Build a temperature converter: function with typed parameters, enum for units, and type-safe output.

---

## Summary

Week 1 of 12: **Introduction to TypeScript** (Level: Complete TypeScript). Type foundation. Next week: **Advanced Types**.
