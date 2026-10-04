# Modern Custom Hooks: Reusable Logic Encapsulation & Compound Components

> **Kategori:** React | **Level:** Performance Optimization, Custom Hooks & Capstone Editor | **Minggu 9:** Modern Custom Hooks: Reusable Logic Encapsulation & Compound Components
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Custom Hooks as the primary architectural vehicle for stateful logic encapsulation
- Enforce fundamental hook rules (mandatory `use` naming prefix and top-level invocation)
- Author useLocalStorage featuring lazy state initialization for zero I/O startup overhead
- Construct interactive window-level event hooks handling global keyboard bindings
- Architect Compound Component patterns delivering highly expressive declarative APIs

---

## Program: Custom Hook Suite: useLocalStorage, useDebounce & Keyboard Shortcuts

```jsx
import { useState, useEffect } from "react";

// 1. Custom Hook: Sinkronisasi State Otomatis ke LocalStorage Browser
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// 2. Custom Hook: Shortcut Keyboard Pintas (misal: Ctrl+S untuk Save)
function useKeyboardShortcut(targetKey, callback, modifierCtrl = false) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const isKeyMatch = event.key.toLowerCase() === targetKey.toLowerCase();
      const isCtrlMatch = modifierCtrl ? event.ctrlKey || event.metaKey : true;

      if (isKeyMatch && isCtrlMatch) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetKey, callback, modifierCtrl]);
}

// 3. Implementasi Nyata pada Komponen Editor
export default function ScratchpadApp() {
  const [catatanDraft, setCatatanDraft] = useLocalStorage("draft_workspace_catatan", "Ketik draf di sini...");
  const [pesanStatus, setPesanStatus] = useState("Tersimpan otomatis.");

  // Daftarkan shortcut Ctrl+S
  useKeyboardShortcut("s", () => {
    setPesanStatus("Disimpan manual via shortcut (Ctrl+S)!");
    setTimeout(() => setPesanStatus("Tersimpan otomatis."), 2500);
  }, true);

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Scratchpad Editor</h3>
        <small style={{ color: "#16a34a" }}>{pesanStatus}</small>
      </div>

      <textarea
        value={catatanDraft}
        onChange={(e) => setCatatanDraft(e.target.value)}
        rows={6}
        style={{ width: "100%", padding: "10px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #cbd5e1" }}
      />
      <small style={{ color: "#64748b" }}>* Tekan Ctrl+S untuk memicu simpan instan.</small>
    </div>
  );
}
```

---

## Key Concepts

### Demystifying Custom Hooks
A Custom Hook is **a plain JavaScript function invoking one or more primitive React hooks** (`useState`, `useEffect`, `useRef`).
When LocalStorage serialization logic repeats across 5 distinct components, duplicating `getItem`, `setItem`, and `JSON.parse` blocks is an anti-pattern. Encapsulating this workflow into `useLocalStorage` achieves clean DRY architecture.

### The Inviolable Rules of Hooks
1. **Mandatory `use` Prefix**: Functions must prefix with `use` (`useAuth`, `useDebounce`, `useWindowDimensions`). The React linter analyzes this naming convention to enforce call order invariants.
2. **Top-Level Invocation Only**: Never invoke hooks inside loops, conditionals, or nested callback closures.
3. **Independent State Allocation**: Two components invoking the same custom hook maintain fully isolated internal state slices (unless explicitly unified via Context).

---

---

## Beginner Friendly Explanation

### Analogy: Modular Power Packs & Multitool Attachments
1. **Vanilla JS Functions** are stainless steel spoons: universally useful utility utensils, yet completely inert without electrical power or internal state.
2. **Custom Hooks** are modular external battery packs: plugging into any smartphone chassis supplies reactive electricity (*state*) and adaptive charging circuits (*lifecycle effects*) to whichever device anchors it.

## Experiments

- Type notes, refresh the browser window, and confirm persistence via LocalStorage.
- Trigger Ctrl+S (Cmd+S on macOS) to verify the keyboard shortcut hook executes reactively.
- Inspect Application Storage tabs in Chrome DevTools to view serialized JSON data.
- Author a responsive useWindowSize() hook tracking viewport width and height dynamically.

---

## Challenge

Author a custom `useFetch(url)` hook returning `{ data, loading, error, refetch }` armed with native AbortController teardown semantics.

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

You have mastered Custom Hook authoring, logic encapsulation, and keyboard events. Next week is our Capstone Project: Collaborative Notion-Style Block Editor.
