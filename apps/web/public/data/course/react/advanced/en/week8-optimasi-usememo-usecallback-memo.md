# Performance Optimization: React.memo, useMemo, useCallback & Profiling

> **Kategori:** React | **Level:** Performance Optimization, Custom Hooks & Capstone Editor | **Minggu 8:** Performance Optimization: React.memo, useMemo, useCallback & Profiling
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the mechanics and triggers governing React component re-render trees
- Deploy React.memo() to insulate pure presentational children from parent renders
- Leverage useMemo() to memoize expensive computations and data filtering pipelines
- Employ useCallback() to retain stable functional reference equality across renders
- Avoid Premature Optimization pitfalls and recognize overhead costs of memoization wrappers

---

## Program: High-Throughput Document Block Search & Virtualized Filter Engine

```jsx
import { useState, useMemo, useCallback, memo } from "react";

// 1. React.memo: Mencegah re-render komponen anak jika props-nya tidak berubah
const BlokBarisTampilan = memo(function BlokBarisTampilan({ item, onPilih }) {
  console.log(`[Render Baris] Render item: ${item.id}`);

  return (
    <div
      onClick={() => onPilih(item.id)}
      style={{
        padding: "8px 12px",
        borderBottom: "1px solid #e2e8f0",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <span>{item.isi}</span>
      <span style={{ fontSize: "11px", color: "#64748b" }}>{item.kategori}</span>
    </div>
  );
});

export default function WorkspaceSearchOptimizer() {
  const [query, setQuery] = useState("");
  const [temaGelap, setTemaGelap] = useState(false);
  const [terpilih, setTerpilih] = useState(null);

  // Kumpulan 5000 data blok simulasi
  const semuaBlok = useMemo(() => {
    return Array.from({ length: 1000 }, (_, i) => ({
      id: `b-${i}`,
      isi: `Dokumen Catatan Teknis #${i} modul sistem`,
      kategori: i % 2 === 0 ? "Engineering" : "Operasional"
    }));
  }, []); // Hanya dibuat sekali saat mount

  // 2. useMemo: Menyimpan hasil komputasi berat (filter teks) agar tidak dihitung ulang saat state tema berubah
  const hasilFilter = useMemo(() => {
    console.log("[Komputasi Berat] Memfilter daftar blok...");
    return semuaBlok.filter((b) =>
      b.isi.toLowerCase().includes(query.toLowerCase())
    );
  }, [semuaBlok, query]);

  // 3. useCallback: Menjaga referensi fungsi tetap sama agar React.memo pada anak tidak jebol
  const handlePilihItem = useCallback((id) => {
    setTerpilih(id);
  }, []);

  return (
    <div style={{
      maxWidth: "500px",
      margin: "20px auto",
      fontFamily: "sans-serif",
      background: temaGelap ? "#1e293b" : "#ffffff",
      color: temaGelap ? "#ffffff" : "#000000",
      padding: "16px",
      borderRadius: "8px",
      border: "1px solid #cbd5e1"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
        <h3>Pencarian Blok ({hasilFilter.length} ditemukan)</h3>
        <button onClick={() => setTemaGelap(!temaGelap)}>
          Ganti Tema
        </button>
      </div>

      <input
        type="text"
        placeholder="Cari blok catatan..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", boxSizing: "border-box", marginBottom: "12px" }}
      />

      <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid #cbd5e1" }}>
        {hasilFilter.slice(0, 10).map((item) => (
          <BlokBarisTampilan
            key={item.id}
            item={item}
            onPilih={handlePilihItem}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## Key Concepts

### Why React Components Re-render
Default React runtime behavior dictates: **when a parent reconciles, its ENTIRE child tree re-renders unconditionally**, regardless of whether child props changed!
In lightweight pages this is negligible, but within massive data grids, block editors, or canvas visualizations, unnecessary passes induce UI stutter.

### The Triad of React Optimization
1. **`React.memo(Component)`**: High-order component comparing props via shallow reference equality. If incoming props match previous signatures, reconciliation of the child subtree skips.
2. **`useCallback(fn, deps)`**: Pins function instance memory pointers across renders. Crucial because `(() => {}) !== (() => {})`. Inline handler definitions generate fresh references every pass, breaking `React.memo` downstream.
3. **`useMemo(() => compute(), deps)`**: Caches expensive synchronous algorithmic calculations. If the search query is unchanged, avoid re-filtering 10,000 array elements simply because a theme toggle flipped.

### Warning: Avoid Premature Optimization
Both `useMemo` and `useCallback` introduce memory allocation and dependency diffing overhead. Deploy them purposefully when Profiler snapshots indicate tangible rendering bottlenecks.

---

---

## Beginner Friendly Explanation

### Analogy: Theater Usheers & Prepared Recipe Charts
1. **React.memo** is a fast-track cinema usher: if your wristband is already stamped for today, you walk straight into the theater without full identity re-verification.
2. **useMemo** is a master baker's laminated 500-loaf conversion chart: referencing the pre-calculated flour weight avoids hand-calculating arithmetic on every customer order.
3. **useCallback** is an official corporate seal: stamping outgoing documents with a verified immutable stamp rather than scribbling a slightly divergent signature every single minute.

## Experiments

- Open devtools console, click "Ganti Tema", and observe [Komputasi Berat] skips thanks to useMemo!
- Remove useCallback from handlePilihItem and verify BlokBarisTampilan re-renders on theme toggles.
- Enter filter characters to witness the computational pipeline execute only when query mutations occur.
- Profile component render timelines before and after memoization using React DevTools.

---

## Challenge

Build a `useDebounce(value, delay)` custom hook delaying text query evaluation by 300ms to throttle search computation cascades.

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

You have mastered performance profiling, React.memo, useMemo, and useCallback. Next week, we examine authoring reusable Custom Hooks.
