# Capstone: Modular Notion-Style Block Document Editor & Workspace

> **Kategori:** React | **Level:** Performance Optimization, Custom Hooks & Capstone Editor | **Minggu 10:** Capstone: Modular Notion-Style Block Document Editor & Workspace
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize the comprehensive React 19 curriculum into a production-grade block editor application
- Architect centralized state mutations via useReducer orchestrating multi-variant content blocks
- Optimize dynamic block lists deploying React.memo coupled with stable useCallback handlers
- Implement reactive background autosave semantics with debounced effect cleanups
- Deliver production-grade frontend architecture engineered for future WebSocket collaboration

---

## Program: Interactive Modular Block Editor with Live Markdown Preview & Autosave

```jsx
// ============================================================================
// CAPSTONE PROJECT: NOTION-STYLE MODULAR BLOCK DOCUMENT WORKSPACE
// ============================================================================
import { useState, useReducer, useEffect, useCallback, memo } from "react";

const BLOK_AWAL = [
  { id: "b-1", tipe: "H1", teks: "Tryngo Engineering Workspace 2026" },
  { id: "b-2", tipe: "PARAGRAF", teks: "Selamat datang di editor blok modular berbasis React 19 deklaratif." },
  { id: "b-3", tipe: "KODE", teks: "const stack = ['React 19', 'Vite 6', 'Tailwind 4'];" },
  { id: "b-4", tipe: "TODO", teks: "Selesaikan kurikulum fullstack dari nol", selesai: true },
  { id: "b-5", tipe: "TODO", teks: "Deploy aplikasi ke Cloudflare Pages", selesai: false }
];

function editorReducer(state, action) {
  switch (action.type) {
    case "UPDATE_TEKS":
      return state.map((b) => (b.id === action.id ? { ...b, teks: action.teks } : b));
    case "TOGGLE_TODO":
      return state.map((b) => (b.id === action.id ? { ...b, selesai: !b.selesai } : b));
    case "TAMBAH_BLOK":
      return [...state, { id: `b-${Date.now()}`, tipe: action.tipe, teks: "", selesai: false }];
    case "HAPUS_BLOK":
      return state.filter((b) => b.id !== action.id);
    case "GESER_ATAS": {
      const idx = state.findIndex((b) => b.id === action.id);
      if (idx <= 0) return state;
      const copy = [...state];
      const target = copy[idx];
      copy[idx] = copy[idx - 1];
      copy[idx - 1] = target;
      return copy;
    }
    default:
      return state;
  }
}

const EditorBlockItem = memo(function EditorBlockItem({ blok, onUpdate, onToggle, onHapus, onGeser }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 0",
      borderBottom: "1px solid #f1f5f9"
    }}>
      <button onClick={() => onGeser(blok.id)} style={{ cursor: "pointer", border: "none", background: "none", color: "#94a3b8" }}>▲</button>
      
      {blok.tipe === "TODO" && (
        <input
          type="checkbox"
          checked={blok.selesai || false}
          onChange={() => onToggle(blok.id)}
          style={{ cursor: "pointer" }}
        />
      )}

      <input
        type="text"
        value={blok.teks}
        onChange={(e) => onUpdate(blok.id, e.target.value)}
        placeholder={blok.tipe === "H1" ? "Judul Utama..." : "Ketik isi catatan..."}
        style={{
          flex: 1,
          padding: "6px 8px",
          border: "1px solid transparent",
          borderRadius: "4px",
          fontSize: blok.tipe === "H1" ? "18px" : "14px",
          fontWeight: blok.tipe === "H1" ? "bold" : "normal",
          fontFamily: blok.tipe === "KODE" ? "monospace" : "inherit",
          background: blok.tipe === "KODE" ? "#f8fafc" : "transparent",
          textDecoration: blok.selesai ? "line-through" : "none",
          color: blok.selesai ? "#94a3b8" : "inherit"
        }}
        onFocus={(e) => (e.target.style.borderColor = "#cbd5e1")}
        onBlur={(e) => (e.target.style.borderColor = "transparent")}
      />

      <span style={{ fontSize: "10px", color: "#94a3b8", background: "#f1f5f9", padding: "2px 6px", borderRadius: "3px" }}>
        {blok.tipe}
      </span>

      <button onClick={() => onHapus(blok.id)} style={{ cursor: "pointer", border: "none", background: "none", color: "#ef4444" }}>✕</button>
    </div>
  );
});

export default function NotionCapstoneApp() {
  const [blokList, dispatch] = useReducer(editorReducer, BLOK_AWAL);
  const [statusSimpan, setStatusSimpan] = useState("Tersimpan");

  // Autosave simulation effect
  useEffect(() => {
    setStatusSimpan("Menyimpan perubahan...");
    const t = setTimeout(() => {
      setStatusSimpan("Semua perubahan tersimpan di cloud.");
    }, 800);
    return () => clearTimeout(t);
  }, [blokList]);

  const handleUpdate = useCallback((id, teks) => dispatch({ type: "UPDATE_TEKS", id, teks }), []);
  const handleToggle = useCallback((id) => dispatch({ type: "TOGGLE_TODO", id }), []);
  const handleHapus = useCallback((id) => dispatch({ type: "HAPUS_BLOK", id }), []);
  const handleGeser = useCallback((id) => dispatch({ type: "GESER_ATAS", id }), []);

  return (
    <div style={{ maxWidth: "680px", margin: "24px auto", fontFamily: "system-ui, sans-serif", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
        <div>
          <h2 style={{ margin: 0 }}>Notion Workspace Workspace</h2>
          <small style={{ color: "#64748b" }}>Status: {statusSimpan}</small>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "PARAGRAF" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ Paragraf</button>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "TODO" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ To-Do</button>
          <button onClick={() => dispatch({ type: "TAMBAH_BLOK", tipe: "KODE" })} style={{ padding: "6px 10px", cursor: "pointer" }}>+ Kode</button>
        </div>
      </header>

      <main style={{ marginTop: "16px" }}>
        {blokList.map((b) => (
          <EditorBlockItem
            key={b.id}
            blok={b}
            onUpdate={handleUpdate}
            onToggle={handleToggle}
            onHapus={handleHapus}
            onGeser={handleGeser}
          />
        ))}
      </main>
    </div>
  );
}
```

---

## Key Concepts

### Capstone Notion Block Editor Architecture
This capstone integrates all core tenets of modern declarative React engineering:
1. **Block-Based Content Topologies**: Paragraphs, headers, task checklists, and code snippets model as atomic data entities within an immutable state array.
2. **useReducer State Integrity**: Typing mutations, checkbox toggles, vertical reordering passes, and block additions resolve deterministically via pure reducer transitions.
3. **Per-Block Memoized Isolation**: Each `EditorBlockItem` is shielded with `React.memo` and bound to stable `useCallback` references. Typing inside block #2 incurs zero render passes across siblings #1, #3, #4, and #5!
4. **Reactive Autosave Telemetry**: `useEffect` monitors the `blokList` dependency graph, initiating background persistence timers with automatic debounce cancellations on active keystrokes.

### Next Step: Fullstack Next.js Ecosystem
Mastering these declarative foundations primes you for enterprise Next.js development (App Router, React Server Components, and Server Actions).

---

---

## Beginner Friendly Explanation

### Analogy: Magnetic Bulletin Board Publishing
1. **Block Editors** are magnetic editorial boards: articles, headlines, and photo clippings fasten via independent magnetic pins.
2. **Reordering** is sliding a magnetic headline above a paragraph block without tearing or reconstructing the underlying posterboard canvas.
3. **Autosave** is a documentary camera taking automated archive snapshots whenever staff finish repositioning editorial magnets.

## Experiments

- Append a new To-Do block, check the box, and verify the strikethrough styling executes reactively.
- Enter text and verify the autosave indicator shifts from "Menyimpan..." to "Tersimpan" seamlessly.
- Click the vertical ▲ button to promote an item up the stack and witness smooth array swapping.
- Enable "Highlight updates when components render" in React DevTools to confirm sibling blocks stay completely idle while typing.

---

## Challenge

Implement an export pipeline: add an "Export Markdown" action serializing all canvas blocks into raw Markdown (# for H1, - [ ] for todos, ``` for code) and copying it to the system clipboard.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

Congratulations! You have completed the comprehensive React 19 curriculum, culminating in a high-performance, modular Notion-Style Block Document Workspace.
