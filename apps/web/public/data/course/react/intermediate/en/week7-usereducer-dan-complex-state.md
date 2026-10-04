# useReducer: State Machine Architecture & Predictable Transitions

> **Kategori:** React | **Level:** Side Effects, Context & Reducer Architecture | **Minggu 7:** useReducer: State Machine Architecture & Predictable Transitions
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Recognize inflection points favoring useReducer over multiple useState hooks
- Master the Reducer anatomy: deterministic pure functions (State, Action) => NewState
- Standardize Action Object schemas following the `{ type, payload }` convention
- Architect Undo/Redo functionality by capturing state snapshot history stacks
- Decouple business transition logic cleanly from visual UI rendering layers

---

## Program: Notion-Style Document Canvas Block Reducer Engine

```jsx
import { useReducer } from "react";

// 1. Initial State
const stateAwal = {
  dokumenId: "DOC-99",
  judul: "Spesifikasi Fitur v2",
  blokList: [
    { id: "b1", tipe: "HEADING", isi: "Pendahuluan Arsitektur" },
    { id: "b2", tipe: "TEKS", isi: "Sistem menggunakan arsitektur modular terdesentralisasi." }
  ],
  riwayatUndo: []
};

// 2. Reducer Function: Pure function (State, Action) => NewState
function editorReducer(state, action) {
  switch (action.type) {
    case "TAMBAH_BLOK": {
      const blokBaru = {
        id: `b-${Date.now()}`,
        tipe: action.payload.tipe || "TEKS",
        isi: action.payload.isi || ""
      };
      return {
        ...state,
        riwayatUndo: [...state.riwayatUndo, state.blokList],
        blokList: [...state.blokList, blokBaru]
      };
    }

    case "UPDATE_ISI_BLOK": {
      return {
        ...state,
        blokList: state.blokList.map((b) =>
          b.id === action.payload.id ? { ...b, isi: action.payload.isi } : b
        )
      };
    }

    case "HAPUS_BLOK": {
      return {
        ...state,
        riwayatUndo: [...state.riwayatUndo, state.blokList],
        blokList: state.blokList.filter((b) => b.id !== action.payload.id)
      };
    }

    case "UNDO": {
      if (state.riwayatUndo.length === 0) return state;
      const snapshotSebelumnya = state.riwayatUndo[state.riwayatUndo.length - 1];
      return {
        ...state,
        blokList: snapshotSebelumnya,
        riwayatUndo: state.riwayatUndo.slice(0, -1)
      };
    }

    default:
      throw new Error(`Aksi tidak dikenali: ${action.type}`);
  }
}

// 3. Komponen Editor Kanvas
export default function CanvasReducerEditor() {
  const [state, dispatch] = useReducer(editorReducer, stateAwal);

  return (
    <div style={{ maxWidth: "550px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{state.judul}</h3>
        <div>
          <button
            onClick={() => dispatch({ type: "UNDO" })}
            disabled={state.riwayatUndo.length === 0}
            style={{ padding: "6px 12px", cursor: state.riwayatUndo.length > 0 ? "pointer" : "not-allowed" }}
          >
            ↶ Undo ({state.riwayatUndo.length})
          </button>
          <button
            onClick={() => dispatch({ type: "TAMBAH_BLOK", payload: { tipe: "TEKS", isi: "Catatan baru..." } })}
            style={{ marginLeft: "8px", padding: "6px 12px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            + Blok Teks
          </button>
        </div>
      </div>

      <div style={{ marginTop: "16px", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px" }}>
        {state.blokList.map((blok) => (
          <div key={blok.id} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "#64748b", width: "60px" }}>{blok.tipe}</span>
            <input
              type="text"
              value={blok.isi}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_ISI_BLOK",
                  payload: { id: blok.id, isi: e.target.value }
                })
              }
              style={{ flex: 1, padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
            />
            <button
              onClick={() => dispatch({ type: "HAPUS_BLOK", payload: { id: blok.id } })}
              style={{ background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Key Concepts

### Why useReducer Dominates Complex Domain Logic
When application state encompasses:
1. Deeply nested object graph topologies.
2. Interdependent state updates where one mutation pivots upon sibling keys.
3. Complex workflows (insert, prune, splice, reorder, undo, redo stacks).
Managing state via fragmented `useState` setters breeds divergence.
`useReducer` decouples **WHAT occurred (*Action Dispatch*)** from **HOW transitions execute (*Reducer Heuristics*)**.

### Pure Function Tenets
Reducers **must remain strictly deterministic pure functions**:
- Never initiate asynchronous I/O or network calls within reducers.
- Avoid nondeterministic generators (`Math.random()`, `Date.now()`) inside the transition block (pass through payloads).
- Never mutate incoming state references; project fresh immutable snapshots (`...state`).

### The Ultimate Duo: useReducer + useContext
Binding `useReducer` to a root `Context.Provider` allows distributing the `dispatch` handle down arbitrary component layers. This delivers a native lightweight Redux-style store without adding third-party dependencies.

---

---

## Beginner Friendly Explanation

### Analogy: Petty Cash Wallets vs Banking Tellers
1. **useState** is reaching into a petty cash pocket: retrieving bills directly without structured audit slips.
2. **useReducer** is a bank teller transaction: you cannot open the vault doors directly. You complete a deposit slip (*Action Object* typed 'DEPOSIT_FUNDS'), hand it to the teller (*Dispatch*), and the head auditor (*Reducer*) processes the ledger strictly.

## Experiments

- Delete a block, press the "Undo" trigger, and observe the discarded block restore accurately.
- Dispatch an unknown action type to inspect the exhaustive error throwing boundary.
- Author a "MOVE_BLOCK_UP" action swapping adjacent array items immutably.
- Record an append-only action journal in state for telemetry and auditing.

---

## Challenge

Implement a "REDO" action within `editorReducer` allowing users to reverse prior Undo invocations leveraging an isolated `riwayatRedo` stack.

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
```text
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
```text
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
```text
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
```text
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

You have mastered useReducer, deterministic Action-Reducer architectures, and undo snapshots. Next week, we enter Level 3: Performance Optimization with useMemo and useCallback.
