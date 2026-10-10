# JSX & Basic Components

> **Kategori:** React | **Level:** Beginner | **Minggu 1:** JSX & Basic Components

## Learning Objectives

- Understand JSX as JavaScript syntax extension (React Docs)
- Create simple function components returning JSX
- Use curly braces {} for JavaScript expressions in JSX
- Distinguish JSX from HTML: className, htmlFor, camelCase
- Why JSX is not HTML strings — compiled to React.createElement

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **ESLint** (`dbaeumer.vscode-eslint`): Validates React hooks and TS syntax
- **Prettier** (`esbenp.prettier-vscode`): Format code automatically

Or install all recommended extensions at once via terminal:
```bash
code --install-extension dbaeumer.vscode-eslint --install-extension esbenp.prettier-vscode
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

> 💡 **Prerequisite Note:** Node.js powers Vite and npm package management.

---

### 3. Initializing a Blank Project (Scaffolding)
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

### 4. Running the Local Dev Server & First Entry File
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
      <h1>🚀 React + Vite App</h1>
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

### 5. New Project Directory Structure
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

### 6. Beginner Tips & Best Practices
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
