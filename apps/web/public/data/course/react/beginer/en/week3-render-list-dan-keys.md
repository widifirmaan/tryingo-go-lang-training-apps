# List Iteration, Reconciliation & The Danger of Index as Key

> **Kategori:** React | **Level:** Component Foundations, JSX & State | **Minggu 3:** List Iteration, Reconciliation & The Danger of Index as Key
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Leverage Array.prototype.map() to project data collections into dynamic JSX elements
- Understand the Virtual DOM and React Reconciliation Diffing algorithm
- Master the vital role of the `key` prop as element identity across render passes
- Diagnose why using array indices as keys introduces subtle state corruption bugs
- Construct robust list interfaces supporting ordering, sorting, and deletions cleanly

---

## Program: Dynamic Kanban Column Board with Item Reordering

```jsx
import { useState } from "react";

const DATA_KARTU_AWAL = [
  { id: "c-101", judul: "Setup Tailwind v4", tag: "Frontend" },
  { id: "c-102", judul: "Design Database PostgreSQL", tag: "Backend" },
  { id: "c-103", judul: "Implementasi OAuth JWT", tag: "Security" },
  { id: "c-104", judul: "Audit Aksesibilitas WCAG", tag: "QA" }
];

function KanbanTaskCard({ item, onGeserAtas, onHapus }) {
  // Local state untuk mendemonstrasikan bahaya index-as-key jika list di-reorder
  const [catatanCepat, setCatatanCepat] = useState("");

  return (
    <div style={{
      background: "white",
      padding: "12px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "8px",
      borderLeft: "4px solid #3b82f6"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{item.judul}</strong>
        <span style={{ fontSize: "11px", background: "#e0f2fe", color: "#0369a1", padding: "2px 6px", borderRadius: "4px" }}>
          {item.tag}
        </span>
      </div>

      <div style={{ marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Tulis catatan internal..."
          value={catatanCepat}
          onChange={(e) => setCatatanCepat(e.target.value)}
          style={{ width: "90%", padding: "4px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "3px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
        <button onClick={onGeserAtas} style={{ fontSize: "11px", padding: "2px 6px", cursor: "pointer" }}>↑ Naik</button>
        <button onClick={onHapus} style={{ fontSize: "11px", padding: "2px 6px", background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer" }}>Hapus</button>
      </div>
    </div>
  );
}

function KanbanBoard() {
  const [tasks, setTasks] = useState(DATA_KARTU_AWAL);

  const geserKeAtas = (index) => {
    if (index === 0) return;
    setTasks((prev) => {
      const copy = [...prev];
      const target = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = target;
      return copy;
    });
  };

  const hapusTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto", fontFamily: "sans-serif", background: "#f1f5f9", padding: "16px", borderRadius: "8px" }}>
      <h3 style={{ margin: "0 0 12px 0", color: "#0f172a" }}>Sprint Backlog ({tasks.length})</h3>
      
      {/* SELALU gunakan ID unik stabil sebagai KEY, BUKAN index array! */}
      {tasks.map((task, index) => (
        <KanbanTaskCard
          key={task.id}
          item={task}
          onGeserAtas={() => geserKeAtas(index)}
          onHapus={() => hapusTask(task.id)}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
```

---

## Key Concepts

### How React Reconciles Lists
React avoids reconstructing the entire browser DOM on dataset changes. It compares virtual trees via its diffing heuristics.
To discern which elements are appended, pruned, or reordered, React relies on stable identity anchors: the **`key` prop**.

### The Peril of Index as Key (`key={index}`)
Beginners frequently resort to `items.map((item, index) => <Card key={index} />)`.
**This is a disastrous anti-pattern!**
If you delete the first of 3 items:
- Item #2 shifts to index 0.
- Item #3 shifts to index 1.
React concludes item #3 was discarded while item #1 simply received new props! Consequently, uncontrolled inputs, focus rings, and internal child state drift to incorrect elements.
**Production Rule**: Always bind a stable, unique domain identifier (`key={task.id}`).

---

---

## Beginner Friendly Explanation

### Analogy: Marathon Bib Numbers vs Lane Rankings
Imagine 100 runners on a marathon track:
1. **Domain ID as Key** is an official athlete bib number ('BIB-702'): whether runner 702 overtakes into 1st place or drops back to 5th, judges track identity flawlessly.
2. **Index as Key** is identifying runners by current track position: if the leader drops out, the runner behind them inherits their name and score sheet mistakenly!

## Experiments

- Type a note on card 1, click "Naik" on card 2; verify the note stays pinned to card 1 thanks to key={task.id}.
- Temporarily revert to key={index}, enter notes into card 1, delete card 1, and witness note state leak onto card 2!
- Introduce real-time list filtering by category tag.
- Inject two items sharing identical keys to observe the duplicate key runtime console warning.

---

## Challenge

Implement a "Move to Done" action on KanbanTaskCard moving items between `backlog` and `completed` array states while preserving unique identity keys.

---

## Visual Mental Model & Architecture Flow

![Diagram Alur Data Satu Arah React (Props Down, Events Up)](/diagrams/react-data-flow.svg)

```diagram
     ┌────────────────────────┐
     │    PARENT COMPONENT    │ ◄─── Updates State via Setter
     │  (Holds Single State)  │
     └───────────┬────────────┘
                 │ Props Down (Unidirectional Flow ⬇)
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
- **Core Functionality:** Component local reactive state hook.
- **Parameters / Attributes:** `initialValue`.
- **System Behavior & Return:** Maintains local component state and automatically triggers UI re-renders on state setter invocation.
- **Practical Code Example:**
```javascript
const [count, setCount] = useState(0);
// Later: setCount(c => c + 1);
```
- **Expected Execution Output:**
```text
Triggers isolated reactive UI re-render
```

### 2. `useEffect(() => { ... }, [deps])`
- **Core Functionality:** Side-effect lifecycle hook.
- **Parameters / Attributes:** `Effect Callback, Dependency Array`.
- **System Behavior & Return:** Handles API calls, subscriptions, and DOM updates after rendering, running cleanup callbacks on unmount.
- **Practical Code Example:**
```javascript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```
- **Expected Execution Output:**
```text
Updates browser document title whenever count changes
```

### 3. `function Component(props) { return <JSX /> }`
- **Core Functionality:** Pure Functional Component definition.
- **Parameters / Attributes:** `props object`.
- **System Behavior & Return:** Reusable architectural building block mapping incoming property data to declarative UI markup.
- **Practical Code Example:**
```javascript
function Avatar({ url }: { url: string }) {
  return <img src={url} alt="User" className="rounded-full" />;
}
```
- **Expected Execution Output:**
```text
Renders round user avatar image element
```

### 4. `useContext(MyContext)`
- **Core Functionality:** Global context subscription hook.
- **Parameters / Attributes:** `React Context Object`.
- **System Behavior & Return:** Accesses global application state without tedious multi-level property drilling.
- **Practical Code Example:**
```javascript
const { theme } = useContext(ThemeContext);
```
- **Expected Execution Output:**
```text
Reads ambient theme preference directly from provider
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

You have mastered list rendering, reconciliation heuristics, and key integrity. Next week, we examine Controlled Forms and useRef.
