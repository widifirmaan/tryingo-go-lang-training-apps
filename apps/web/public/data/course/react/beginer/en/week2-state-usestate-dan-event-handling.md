# State Reactivity: useState, Immutability & Lifting State Up

> **Kategori:** React | **Level:** Component Foundations, JSX & State | **Minggu 2:** State Reactivity: useState, Immutability & Lifting State Up
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand State as internal component memory triggering reactive re-renders upon mutation
- Deploy the useState hook correctly utilizing functional updater forms (prev => ...)
- Enforce absolute immutability across array and object state (never push or direct assign)
- Handle React Synthetic Events seamlessly: onChange, onClick, onSubmit
- Architect the Lifting State Up pattern when siblings share collaborative data flows

---

## Program: Content Block Counter & Real-Time Document Status Editor

```jsx
import { useState } from "react";

function BlockEditorItem({ nomor, onHapus }) {
  const [isiTeks, setIsiTeks] = useState("");
  const [tipeBlok, setTipeBlok] = useState("PARAGRAF");

  return (
    <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #e2e8f0"
    }}>
      <span style={{ color: "#94a3b8", fontSize: "12px", width: "24px" }}>#{nomor}</span>
      
      <select
        value={tipeBlok}
        onChange={(e) => setTipeBlok(e.target.value)}
        style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
      >
        <option value="PARAGRAF">Teks Biasa</option>
        <option value="HEADING">Judul Besar</option>
        <option value="KODE">Blok Kode</option>
      </select>

      <input
        type="text"
        placeholder="Ketik konten dokumen di sini..."
        value={isiTeks}
        onChange={(e) => setIsiTeks(e.target.value)}
        style={{
          flex: 1,
          padding: "6px 10px",
          borderRadius: "4px",
          border: "1px solid #cbd5e1",
          fontWeight: tipeBlok === "HEADING" ? "bold" : "normal",
          fontFamily: tipeBlok === "KODE" ? "monospace" : "inherit"
        }}
      />

      <button
        onClick={onHapus}
        style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" }}
      >
        ✕
      </button>
    </div>
  );
}

function DocumentCanvas() {
  const [blokList, setBlokList] = useState([
    { id: 1 },
    { id: 2 }
  ]);

  const tambahBlok = () => {
    // Immutability: Selalu buat array baru dengan spread operator
    setBlokList((prev) => [...prev, { id: Date.now() }]);
  };

  const hapusBlok = (idTarget) => {
    // Lifting State Up: Logika penghapusan dikelola di parent
    setBlokList((prev) => prev.filter((b) => b.id !== idTarget));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2>Editor Lembar Kerja ({blokList.length} Blok)</h2>
        <button
          onClick={tambahBlok}
          style={{ background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer" }}
        >
          + Tambah Blok Baru
        </button>
      </div>

      <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", background: "#f8fafc" }}>
        {blokList.map((item, index) => (
          <BlockEditorItem
            key={item.id}
            nomor={index + 1}
            onHapus={() => hapusBlok(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default DocumentCanvas;
```

---

## Key Concepts

### Why Plain Variables Fail in Reactive UIs
Declaring `let count = 0; count++;` increments memory, but **React receives no notification that state mutated, leaving the DOM frozen**.
`useState` provides:
1. The current state snapshot.
2. A setter dispatcher (`setCount`) notifying React: *"State altered, schedule a reconciliation pass!"*.

### The Golden Rule: Immutability
In React, **never mutate objects or arrays in-place**:
`array.push(item)` or `user.name = 'New'` are fatal anti-patterns.
React tracks state transitions via shallow reference equality (`===`). Mutating existing array instances preserves identical pointer addresses, leading React to skip re-renders!
Always project new immutable instances:
- Insert: `setList(prev => [...prev, newItem])`
- Delete: `setList(prev => prev.filter(item => item.id !== targetId))`
- Update: `setList(prev => prev.map(item => item.id === targetId ? { ...item, active: true } : item))`

### Lifting State Up
When sibling components share state dependencies, lift ownership to their nearest mutual parent, passing state and event handler callbacks downward via props.

---

---

## Beginner Friendly Explanation

### Analogy: Smart Light Switches & Immutable Bank Ledgers
1. **useState** is a digital home automation switch: pressing the button (*setter dispatch*) transmits a bus signal to the hub (*React Reconciliation*), illuminating room lighting instantly (*DOM commit*).
2. **Immutability** is an audited banking ledger: when funds transfer, tellers never erase old ink with rubber; they strike a brand-new ledger record on a fresh line.

## Experiments

- Replace setBlokList([...]) with blokList.push({}) to observe the interface fail to re-render.
- Switch block type to HEADING and observe the font weight adapt reactively.
- Delete all canvas blocks down to zero to inspect edge-case handling.
- Enforce functional state updates via setBlokList(prev => [...prev, { id: Date.now() }]).

---

## Challenge

Add a "Duplicate Block" action to `BlockEditorItem` that clones the current text and block type immediately below the active item via immutable array slicing.

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

You have mastered reactive useState, strict immutability, and Lifting State Up. Next week, we examine List Rendering and the critical mechanics of Keys.
