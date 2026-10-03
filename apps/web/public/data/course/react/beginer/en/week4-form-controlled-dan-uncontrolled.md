# Form Handling: Controlled Components, Real-Time Validation & useRef

> **Kategori:** React | **Level:** Component Foundations, JSX & State | **Minggu 4:** Form Handling: Controlled Components, Real-Time Validation & useRef
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Controlled Components where React state serves as the single source of truth
- Bind value attributes and onChange dispatchers across inputs, selects, and textareas
- Deploy unified generic input handlers managing multiple schema fields dynamically
- Implement client-side real-time form validation and contextual error messaging
- Leverage useRef to retain imperative DOM handles without causing re-render passes

---

## Program: Workspace Creation Form with Domain Validation & DOM Focus via useRef

```jsx
import { useState, useRef } from "react";

function FormBuatWorkspace({ onWorkspaceDibuat }) {
  // Controlled State: React memegang single source of truth untuk input
  const [formData, setFormData] = useState({
    namaWorkspace: "",
    slugUrl: "",
    visibilitas: "PRIVAT",
    deskripsi: ""
  });

  const [errors, setErrors] = useState({});
  // useRef: Mengakses elemen DOM langsung (misal untuk auto-focus) tanpa re-render
  const inputNamaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const update = { ...prev, [name]: value };
      // Auto-generate slug jika nama berubah
      if (name === "namaWorkspace") {
        update.slugUrl = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      }
      return update;
    });

    // Reset error field saat user mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validasiForm = () => {
    const errs = {};
    if (!formData.namaWorkspace.trim()) {
      errs.namaWorkspace = "Nama workspace wajib diisi!";
    } else if (formData.namaWorkspace.length < 3) {
      errs.namaWorkspace = "Nama workspace minimal 3 karakter.";
    }

    if (!formData.slugUrl.trim()) {
      errs.slugUrl = "Slug URL tidak boleh kosong.";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Cegah reload halaman browser standar
    const hasilValidasi = validasiForm();

    if (Object.keys(hasilValidasi).length > 0) {
      setErrors(hasilValidasi);
      inputNamaRef.current?.focus(); // Kembalikan kursor ke input bermasalah
      return;
    }

    onWorkspaceDibuat(formData);
    // Reset form
    setFormData({ namaWorkspace: "", slugUrl: "", visibilitas: "PRIVAT", deskripsi: "" });
    inputNamaRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "420px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h3>Buat Ruang Kerja Baru</h3>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>Nama Workspace *</label>
        <input
          ref={inputNamaRef}
          type="text"
          name="namaWorkspace"
          value={formData.namaWorkspace}
          onChange={handleInputChange}
          placeholder="contoh: Tim Finansial Core"
          style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: errors.namaWorkspace ? "1px solid red" : "1px solid #cbd5e1", borderRadius: "4px" }}
        />
        {errors.namaWorkspace && <small style={{ color: "#ef4444" }}>{errors.namaWorkspace}</small>}
      </div>

      <div style={{ marginBottom: "12px" }}>
        <label style={{ display: "block", fontSize: "13px", fontWeight: "bold", marginBottom: "4px" }}>Slug URL</label>
        <input
          type="text"
          name="slugUrl"
          value={formData.slugUrl}
          onChange={handleInputChange}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box", border: "1px solid #cbd5e1", borderRadius: "4px", background: "#f8fafc" }}
        />
      </div>

      <button type="submit" style={{ width: "100%", padding: "10px", background: "#0f172a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>
        Buat Workspace Sekarang
      </button>
    </form>
  );
}

export default FormBuatWorkspace;
```

---

## Key Concepts

### Controlled vs Uncontrolled Forms
- **Uncontrolled Components**: The browser DOM maintains native input value state internally; developers read values imperatively via `ref.current.value`.
- **Controlled Components**: React reigns as the single source of truth. Input display is strictly bound to state (`value={state}`), while keystrokes trigger `onChange` reconciling state.
Controlled forms empower instant validation, dynamic input masking (e.g. currency formatting), and conditional submit button state.

### Strategic Deployment of `useRef`
`useRef` returns a mutable `{ current: value }` container persisting across the component lifetime.
Crucially: **mutating `ref.current` NEVER triggers a re-render pass**.
Ideal applications for `useRef`:
1. Managing imperative DOM nodes (e.g., executing `.focus()`, `.scrollIntoView()`).
2. Persisting mutable runtime metadata (timers, intervals, previous state snapshots).

---

---

## Beginner Friendly Explanation

### Analogy: Drive-By-Wire Steering & Glovebox Notepads
1. **Controlled Inputs** resemble drive-by-wire automotive steering: turning the wheel transmits telemetry to the vehicle central processing unit (*state*), which directs the tires (*DOM*), validating against dangerous spinouts (*validation*).
2. **useRef** is a pencil notepad tucked in the glove compartment: the driver writes a gate passcode without restarting the vehicle engine (*zero re-renders*).

## Experiments

- Type a workspace title and observe the slug URL slugify automatically in real-time.
- Submit an empty form to observe autofocus snapping back to the invalid input via ref.
- Add radio inputs toggling visibility between PUBLIC and PRIVATE.
- Attempt mutating formData without the setter to witness inputs freeze.

---

## Challenge

Implement mock asynchronous validation: once the slug is finalized, check if it matches reserved handles ("demo", "admin", "test"), displaying an inline collision warning.

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

You have mastered controlled forms, validations, and useRef. Next week, we enter Level 2: useEffect, reactive lifecycles, and API integration.
