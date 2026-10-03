# useEffect: Reactive Lifecycles, Cleanup Functions & AbortController

> **Kategori:** React | **Level:** Side Effects, Context & Reducer Architecture | **Minggu 5:** useEffect: Reactive Lifecycles, Cleanup Functions & AbortController
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Side Effects in React (operations synchronizing with external browser subsystems)
- Master the useEffect Dependency Array: [] (mount only), [deps] (on mutation), and omitted (every pass)
- Author Cleanup Functions pruning event listeners, intervals, and open sockets
- Intercept async fetch Race Conditions using native AbortController signals
- Prevent infinite re-render cycles caused by unstable object and function dependencies

---

## Program: Cloud Document Synchronization with Race Condition Cancellation

```jsx
import { useState, useEffect } from "react";

function CloudDocumentSync({ documentId }) {
  const [konten, setKonten] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusJaringan, setStatusJaringan] = useState("Online");

  useEffect(() => {
    // 1. AbortController untuk mencegah race conditions saat documentId berganti cepat
    const controller = new AbortController();
    setLoading(true);

    console.log(`[Effect] Memulai pengambilan dokumen ID: ${documentId}`);

    // Simulasi pemanggilan API asinkron
    const timer = setTimeout(() => {
      setKonten({
        id: documentId,
        judul: `Dokumen Spesifikasi Teknis #${documentId}`,
        terakhirDiubah: new Date().toLocaleTimeString()
      });
      setLoading(false);
      console.log(`[Effect] Berhasil memuat dokumen ID: ${documentId}`);
    }, 1000);

    // 2. Event Listener Window dengan Cleanup
    const handleOnline = () => setStatusJaringan("Online");
    const handleOffline = () => setStatusJaringan("Offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. Cleanup Function: Dieksekusi sebelum effect berikutnya berjalan atau saat komponen unmount
    return () => {
      console.log(`[Cleanup] Membatalkan operasi untuk ID: ${documentId}`);
      controller.abort();
      clearTimeout(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [documentId]); // Dependency Array: effect hanya dipicu ulang jika documentId berubah

  if (loading) {
    return <div style={{ padding: "16px", color: "#64748b" }}>Sedang mengambil data dokumen...</div>;
  }

  return (
    <div style={{ padding: "16px", border: "1px solid #cbd5e1", borderRadius: "8px", maxWidth: "450px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <h4 style={{ margin: 0 }}>{konten?.judul}</h4>
        <span style={{ fontSize: "12px", color: statusJaringan === "Online" ? "green" : "red" }}>● {statusJaringan}</span>
      </div>
      <p style={{ fontSize: "13px", color: "#475569" }}>ID: {konten?.id} • Sinkronisasi: {konten?.terakhirDiubah}</p>
    </div>
  );
}

export default CloudDocumentSync;
```

---

## Key Concepts

### Demystifying Side Effects
Ideal React components behave as Pure Functions: mapping inputs to JSX without mutations. Real applications necessitate **Side Effects**: fetching REST APIs, opening WebSockets, updating `document.title`, or listening to window events.
`useEffect` serves as the official lifecycle boundary orchestrating these operations after the DOM commits.

### The Dependency Array Matrix
1. `useEffect(() => { ... })`: Omitted dependency array. Triggers **after every render cycle**. Mutating state within triggers an infinite loop.
2. `useEffect(() => { ... }, [])`: Empty array. Executes strictly **once upon component mount**.
3. `useEffect(() => { ... }, [id, query])`: Re-executes on mount and whenever **dependencies register reference inequality**.

### The Necessity of Cleanup Functions
Registering global subscriptions via `window.addEventListener` without unbinding in a return cleanup callback causes zombie listeners to accumulate across re-renders. This induces catastrophic memory leaks and performance degradation.

---

---

## Beginner Friendly Explanation

### Analogy: Hotel Concierge & Housekeeping Turnover
1. **useEffect** is the hotel room welcome protocol: when a guest checks in (*component mount*), the concierge activates air conditioning and serves welcome tea (*fetch data*).
2. **Cleanup Function** is housekeeping turnover: when the guest checks out (*component unmount* or room switch), staff clear linens and turn off utilities so subsequent guests enter an pristine room (*zero memory leaks*).

## Experiments

- Rapidly cycle documentId between 1 and 2 to verify cleanup cancels the previous fetch sequence.
- Disconnect device network connectivity to observe the reactive Offline indicator flip.
- Omit the dependency array to witness uncontrolled render explosions in the console.
- Update browser document.title dynamically within useEffect to track the active document.

---

## Challenge

Author an effect hook subscribing to `Escape` key events, dismissing active dialog modals while guaranteeing flawless listener deregistration.

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

You have mastered useEffect lifecycles, dependencies, and cleanup mechanics. Next week, we examine the Context API for global state management.
