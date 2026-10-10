# Component Architecture, JSX Rules & Unidirectional Data Flow via Props

> **Kategori:** React | **Level:** Component Foundations, JSX & State | **Minggu 1:** Component Architecture, JSX Rules & Unidirectional Data Flow via Props
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the paradigm shift from imperative DOM manipulation to declarative React components
- Master JSX syntactic rules: self-closing tags, camelCase attributes, and curly brace expressions {}
- Implement Unidirectional Data Flow with data streaming from parent to child via props
- Deploy conditional rendering patterns: ternary expressions (?:) and short-circuit guards (&&)
- Author reusable pure functional components cleanly decoupled from side effects

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

## Program: Interactive Workspace Document Card Hierarchy

```jsx
// 1. Komponen Anak (Presentational / Pure Component)
function KartuDokumen({ judul, kategori, jumlahKata, isFavorit }) {
  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      background: isFavorit ? "#f0fdf4" : "#ffffff"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#1e293b" }}>{judul}</h3>
        {isFavorit && <span style={{ color: "#16a34a", fontSize: "14px", fontWeight: "bold" }}>★ Favorit</span>}
      </div>
      <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "13px" }}>
        Kategori: <strong>{kategori}</strong> • Estimasi: {Math.ceil(jumlahKata / 200)} menit baca
      </p>
    </div>
  );
}

// 2. Komponen Utama (Parent Tree)
function WorkspaceApp() {
  const namaRuangKerja = "Engineering Core Wiki";

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "480px", margin: "20px auto" }}>
      <header style={{ borderBottom: "2px solid #0f172a", paddingBottom: "8px", marginBottom: "16px" }}>
        <h2 style={{ margin: 0 }}>{namaRuangKerja}</h2>
        <small style={{ color: "#64748b" }}>Notion Workspace Clone • Versi 1.0</small>
      </header>

      <section>
        <KartuDokumen
          judul="Arsitektur Microfrontend 2026"
          kategori="Engineering"
          jumlahKata={1200}
          isFavorit={true}
        />
        <KartuDokumen
          judul="Panduan Onboarding Karyawan Baru"
          kategori="People Ops"
          jumlahKata={450}
          isFavorit={false}
        />
      </section>
    </div>
  );
}

// Export default komponen utama
export default WorkspaceApp;
```

---

## Key Concepts

### Declarative vs Imperative UI
In vanilla imperative JavaScript, you micromanage DOM mutations step-by-step: `createElement`, `setAttribute`, `appendChild`. As applications scale, state diverges from DOM representations.
In **declarative React**, you simply declare the UI target shape given current data: **UI = f(State)**. React orchestrates underlying DOM mutations via its reconciliation engine.

### What JSX Actually Is
JSX is not raw HTML inside JavaScript, but ergonomic syntax sugar over `React.createElement()`.
The markup `<h1 className="title">Hello</h1>` transpiles into `React.createElement('h1', { className: 'title' }, 'Hello')`.
This explains why attributes follow camelCase naming (`className`, `onClick`) and JavaScript expressions interpolate via `{ curly braces }`.

### Unidirectional Data Flow
Props cascade unidirectionally down the component tree (Parent -> Child). Child components **must treat props as immutable contracts**. This guarantees predictable data lineage across large systems.

---

---

## Beginner Friendly Explanation

### Analogy: Lego Modular Bricks & Kitchen Order Slips
1. **Components** are modular Lego bricks: individual door hinges, window frames, and wall panels combine into soaring architectural models.
2. **Props** is a restaurant order ticket passed from the waiter to the chef: "Order #42: Pad Thai, Spicy: True, Extra Lime: 2". The chef respects the immutable slip and renders the dish faithfully.

## Experiments

- Toggle isFavorit on the second card to true and observe the favorite badge render reactively.
- Attempt mutating props inside KartuDokumen (props.judul = "hack") to see read-only protections.
- Introduce a new "author" prop to KartuDokumen and render it beneath the category tag.
- Apply a ternary expression rendering a distinct background badge when category equals "Urgent".

---

## Challenge

Author a `WorkspaceBadge` component accepting `status` ("ACTIVE" | "DRAFT" | "ARCHIVED") rendering colored badges (Green, Yellow, Gray) strictly as a pure component.

---

## Visual Mental Model & Architecture Flow

![Diagram Alur Data Satu Arah React (Props Down, Events Up)](/diagrams/react-data-flow.svg)

```diagram
     ┌────────────────────────┐
     │    PARENT COMPONENT    │ ◄─── Update State via Setter
     │  (Holds Single State)  │
     └───────────┬────────────┘
                 │ Props Down (Data Flow 1 Arah ⬇)
     ┌───────────┴────────────┐
     ▼                        ▼
┌──────────────┐       ┌──────────────┐
│  Child Card  │       │ Action Btn   │ ─── Event Callback Up (⬆)
│ (Reads Props)│       │ (Calls Prop) │
└──────────────┘       └──────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const [state, setState] = useState(initialValue)`
- **Core Functionality:** Hook penyimpanan state lokal komponen.
- **Parameters / Attributes:** `initialValue`.
- **System Behavior & Return:** Persists data reaktif. Memanggil setter memicu re-render UI secara otomatis..
- **Practical Code Example:**
```jsx
const [count, setCount] = useState(0);
// Eksekusi: setCount(prev => prev + 1);
```
- **Expected Execution Output:**
```output
Komponen memperbarui angka count di layar
```

### 2. `useEffect(() => { ... }, [dependencies])`
- **Core Functionality:** Hook efek samping (Lifecycle & Subscriptions).
- **Parameters / Attributes:** `Effect Callback, Dependency Array`.
- **System Behavior & Return:** Menjalankan sinkronisasi data setelah render dan membersihkan resource saat unmount..
- **Practical Code Example:**
```jsx
useEffect(() => {
  console.log('Komponen terpasang ke DOM');
  return () => console.log('Komponen dilepas');
}, []);
```
- **Expected Execution Output:**
```output
Log dicetak saat mount dan unmount
```

### 3. `function Component(props) { return <JSX /> }`
- **Core Functionality:** Declaration of Komponen Fungsi Dasar.
- **Parameters / Attributes:** `props object`.
- **System Behavior & Return:** Blok bangunan UI modular yang mengubah parameter data menjadi tampilan visual..
- **Practical Code Example:**
```jsx
function UserCard({ name }: { name: string }) {
  return <div className="card"><h3>{name}</h3></div>;
}
```
- **Expected Execution Output:**
```output
Elemen kartu ter-render dengan nama pengguna
```

### 4. `useContext(MyContext)`
- **Core Functionality:** Akses state global tanpa prop-drilling.
- **Parameters / Attributes:** `React Context Object`.
- **System Behavior & Return:** Membaca nilai state dari Context Provider terdekat dalam hierarki komponen..
- **Practical Code Example:**
```jsx
const { theme, toggleTheme } = useContext(ThemeContext);
```
- **Expected Execution Output:**
```output
Mendapatkan nilai tema aktif secara instan
```

---

## Common Pitfalls & Debugging Tips

### 1. Mutating State In-Place
- **Symptom / Issue:** React will not trigger a re-render because memory references stay identical.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always supply a new copy or functional updater: `setList(prev => [...prev, newItem])`.

### 2. Incomplete useEffect Dependencies
- **Symptom / Issue:** Causes stale closures reading outdated variable values or infinite re-render loops.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Include every reactive value accessed inside the effect in the dependency array.

### 3. Using Array Indices as Component Keys
- **Symptom / Issue:** Breaks DOM reconciliation and corrupts internal state in list items.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Assign unique database IDs (`item.id`) rather than arbitrary iteration indices.

---

## Summary

You have mastered declarative component thinking, JSX architecture, and unidirectional props flow. Next week, we examine reactive state with useState.
