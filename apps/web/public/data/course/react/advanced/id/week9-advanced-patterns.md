# Advanced Patterns

> **Kategori:** React | **Level:** Lanjutan | **Minggu 9:** Advanced Patterns

## Tujuan Pembelajaran

- Higher-Order Component (HOC): function yang menerima component
- Render Props: component dengan prop function untuk render
- Compound Components: komponen yang bekerja bersama
- Kapan pakai pattern ini vs custom hooks
- Composition over inheritance di React

---

## Program: HOC & Render Props

```jsx
// Advanced patterns: HOC, Render Props, Compound Components
// Patterns untuk code reuse yang lebih powerful

import { useState } from "react";

// ── Higher-Order Component (HOC) ──
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = true; // simulasi
    if (!isAuthenticated) return <p>Silakan login terlebih dahulu</p>;
    return <Component {...props} />;
  };
}

// ── Render Props ──
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return (
    <div style={{ height: 200, background: "#eee" }}
      onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}>
      {render(position)}
    </div>
  );
}

// ── Compound Components ──
function Select({ children, value, onChange }) {
  return (
    <div className="select" onClick={() => onChange(value)}>
      {children}
    </div>
  );
}
Select.Option = function Option({ value, children }) {
  return <div className="option">{children}</div>;
};

// ── Usage ──
const ProtectedDashboard = withAuth(function Dashboard() {
  return <h1>Dashboard (Protected)</h1>;
});

function App() {
  return (
    <div>
      <ProtectedDashboard />
      <MouseTracker render={({ x, y }) => <p>Mouse: {x}, {y}</p>} />
      <Select value="a" onChange={(v) => console.log(v)}>
        <Select.Option value="a">Option A</Select.Option>
        <Select.Option value="b">Option B</Select.Option>
      </Select>
    </div>
  );
}

console.log("Advanced patterns siap digunakan");
```

---

## Konsep Kunci

### HOC
Function(Component) → Component baru dengan extra behavior.

### Render Props
Component menerima function sebagai prop: render={data => <UI />}.

### Compound Components
<Select><Select.Option /></Select>. Children berbagi state implisit.

### Modern Alternative
Custom hooks sering menggantikan HOC dan Render Props.

---

## Eksperimen

- Buat HOC dengan logging
- Buat Toggle component dengan render props
- Implementasikan compound Tabs component
- Refactor HOC ke custom hook

---

## Tantangan

Buat Modal component dengan compound pattern: Modal, Modal.Header, Modal.Body, Modal.Footer. Gunakan createContext untuk state sharing.

---

## Ringkasan

Minggu 9 dari 12: **Advanced Patterns** (Level: Lanjutan). Reusable component patterns. Minggu depan: **Testing**.
