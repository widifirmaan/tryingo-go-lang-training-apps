# JSX & Basic Components

## Why This Matters

React is the most popular UI library in the world - used by Facebook, Netflix, and thousands of products. Learning to think in React (components, state, props) is the gateway to the entire modern frontend ecosystem.

Practice program: *"Hello React"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand JSX as JavaScript syntax extension (React Docs)
- Create simple function components returning JSX
- Use curly braces {} for JavaScript expressions in JSX
- Distinguish JSX from HTML: className, htmlFor, camelCase
- Why JSX is not HTML strings - compiled to React.createElement


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

> **Prerequisite Note:** Node.js powers Vite and npm package management.

---

### 2. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
```
- **Details:** Scaffolds an official Vite React TypeScript template with near-instant HMR.
- **Navigate to the project directory:**
```bash
cd my-react-app
```

---

### 3. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
npm run dev
```
Open in browser or terminal: `http://localhost:5173`

> ℹ️ Vite starts your local development server at port 5173 in milliseconds.

**Initial Entry File (`src/App.tsx`):**
```tsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'sans-serif' }}>
      <h1>React + Vite App</h1>
      <p>Klik tombol di bawah untuk menguji state reaktif:</p>
      <button 
        onClick={() => setCount((c) => c + 1)}
        style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer', borderRadius: '8px' }}
      >
        Hitungan: {count}
      </button>
    </div>
  );
}
```
Interactive counter component to test React state reactivity.

---

### 4. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-react-app/
├── src/
│   ├── App.tsx          # Komponen root aplikasi
│   ├── main.tsx         # Entrypoint React DOM render
│   ├── App.css          # Styling komponen
│   └── index.css        # Styling dasar
├── index.html           # File HTML utama (root SPA)
├── vite.config.ts       # Konfigurasi plugin Vite
├── tsconfig.json        # Konfigurasi TypeScript
└── package.json         # Dependensi project
```
index.html lives in the root directory and serves as the direct entry point for Vite.

---

### 5. Beginner Tips & Best Practices
- Add Tailwind CSS quickly via: `npm install -D tailwindcss @tailwindcss/vite`.
- For multi-page routing, install React Router: `npm i react-router-dom`.

---

## Program: Hello React

```jsx
// JSX memungkinkan penulisan HTML-like syntax dalam JavaScript
// Setiap komponen React adalah function yang return JSX

function Welcome() {
  const name = "Tryngo";
  const isDark = true;

  return (
    <div className="card">
      <h1>Halo, {name}!</h1>
      <p>Mode: {isDark ? "Gelap" : "Terang"}</p>
      <ul>
        <li>JSX = JavaScript + XML</li>
        <li>Curly braces {} untuk ekspresi</li>
        <li>className (bukan class)</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}

// Render ke DOM
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
console.log("Komponen App berhasil didefinisikan");
```

---

## Key Concepts

### JSX
JSX = JavaScript XML. Compiled to React.createElement(). Embed JS expressions with {}.

### Components
Functions returning JSX. Must start with uppercase. Reusable.

### JSX Expressions
- Ternary, logical &&, map()
- Single root element
- All tags closed

---

## Experiments

- Create a new component with different data
- Change conditional rendering from ternary to logical &&
- Render list with map() from array of objects
- Create nested components 3 levels deep

---

## Challenge

Build a user profile page with components: Avatar, UserInfo, SkillList. Use conditional rendering for online/offline status.

---

## Summary

Week 1 of 12: **JSX & Basic Components** (Level: Beginner). React foundations. Next week: **Props & Data Flow**.
