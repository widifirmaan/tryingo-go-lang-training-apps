# Context API: Eliminating Prop Drilling & Distributed State Architecture

> **Kategori:** React | **Level:** Side Effects, Context & Reducer Architecture | **Minggu 6:** Context API: Eliminating Prop Drilling & Distributed State Architecture
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Diagnose Prop Drilling symptoms (passing attributes down deeply unneeded layers)
- Instantiate and configure Context boundaries via createContext() and Provider components
- Author Custom Providers encapsulating internal reactive state and dispatch APIs
- Author ergonomics-enhancing Custom Hooks (useWorkspace) enforcing Provider parent boundaries
- Recognize Context re-render performance boundaries and apply structural context splitting

---

## Program: Global Workspace Theme & User Authentication State Provider

```jsx
import { createContext, useContext, useState } from "react";

// 1. Buat Context dengan default value
const WorkspaceContext = createContext(null);

// 2. Provider Component: Mengisolasi state global dan menyediakan API ke seluruh anak pohon
export function WorkspaceProvider({ children }) {
  const [tema, setTema] = useState("light");
  const [penggunaAktif, setPenggunaAktif] = useState({
    nama: "Rian Hidayat",
    email: "rian@nusa.dev",
    role: "ADMIN"
  });

  const toggleTema = () => {
    setTema((prev) => (prev === "light" ? "dark" : "light"));
  };

  const logout = () => {
    setPenggunaAktif(null);
  };

  const value = {
    tema,
    toggleTema,
    penggunaAktif,
    logout
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

// 3. Custom Hook untuk mempermudah konsumsi context dan validasi provider
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace harus digunakan di dalam <WorkspaceProvider>!");
  }
  return context;
}

// 4. Komponen Daun Terdalam (Membuktikan tidak ada Prop Drilling)
function ProfilPenggunaHeader() {
  const { penggunaAktif, tema, toggleTema, logout } = useWorkspace();

  const isDark = tema === "dark";

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      background: isDark ? "#0f172a" : "#f8fafc",
      color: isDark ? "#f8fafc" : "#0f172a",
      borderRadius: "8px",
      border: "1px solid #cbd5e1"
    }}>
      <div>
        <strong>{penggunaAktif ? penggunaAktif.nama : "Tamu"}</strong>
        <span style={{ fontSize: "12px", marginLeft: "8px", color: isDark ? "#94a3b8" : "#64748b" }}>
          ({penggunaAktif?.role})
        </span>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={toggleTema} style={{ padding: "6px 12px", cursor: "pointer" }}>
          Mode: {isDark ? "🌙 Gelap" : "☀️ Terang"}
        </button>
        {penggunaAktif && (
          <button onClick={logout} style={{ padding: "6px 12px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Keluar
          </button>
        )}
      </div>
    </div>
  );
}

export default function WorkspaceApp() {
  return (
    <WorkspaceProvider>
      <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
        <h2>Workspace Shell Dashboard</h2>
        <ProfilPenggunaHeader />
      </div>
    </WorkspaceProvider>
  );
}
```

---

## Key Concepts

### The Prop Drilling Bottleneck
When authentication claims or theme tokens originate at the root `App` container but are required deep down within `Sidebar > ProfileCard > MenuButton`, intermediate components must relay attributes through 5 component boundaries. This pollutes intermediate interfaces.

### The Remedy: Context API
Context enables telemetry streaming across arbitrary component subtrees without manual pass-through plumbing.
Anatomy:
1. `createContext()`: Initializes the broadcast channel.
2. `Provider`: Envelops the consumer tree, publishing the mutable `value` payload.
3. `useContext()`: Direct tap allowing any child component to consume tokens instantaneously.

### Production Pattern: Encapsulated Consumer Hooks
Never expose bare Context tokens directly across consumer modules. Always wrap consumption inside dedicated hooks (`useWorkspace()`).
This guarantees runtime verification: omitting the outer Provider triggers explicit human-readable diagnostics rather than cryptic destructuring crashes.

---

---

## Beginner Friendly Explanation

### Analogy: Bucket Brigades vs Municipal Water Mains
1. **Prop Drilling** is a fire bucket brigade: passing water hand-to-hand across 10 people up three flights of stairs; one dropped bucket breaks the entire pipeline.
2. **Context API** is a pressurized municipal water pipe: turning any tap in any suite flows water on-demand without burdening intermediate tenants.

## Experiments

- Toggle Theme mode and observe the child component adapt instantaneously without prop plumbing.
- Relocate ProfilPenggunaHeader outside <WorkspaceProvider> to verify the defensive hook error boundary.
- Inject an updateUserName dispatcher into the Provider and consume from a child element.
- Partition state into ThemeContext and UserContext to insulate theme renders from user claims.

---

## Challenge

Architect a global `NotificationContext` exposing `showNotification(message, type)` enabling any nested application component to trigger transient toast notifications.

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

You have mastered the Context API, prop drilling elimination, and consumer hooks. Next week, we examine useReducer for complex state machines.
