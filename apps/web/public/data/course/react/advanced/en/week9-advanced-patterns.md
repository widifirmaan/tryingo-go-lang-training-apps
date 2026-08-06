# Advanced Patterns

> **Kategori:** React | **Level:** Advanced | **Minggu 9:** Advanced Patterns

## Learning Objectives

- Higher-Order Component (HOC): function receiving a component
- Render Props: component with function prop for rendering
- Compound Components: components working together
- When to use these patterns vs custom hooks
- Composition over inheritance in React

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

## Key Concepts

### HOC
Function(Component) → enhanced component.

### Render Props
Component receives render function as prop.

### Compound Components
Components sharing implicit state.

### Modern Alternative
Custom hooks often replace HOC and Render Props.

---

## Experiments

- Create HOC with logging
- Create Toggle component with render props
- Implement compound Tabs component
- Refactor HOC to custom hook

---

## Challenge

Build Modal component with compound pattern: Modal, Modal.Header, Modal.Body, Modal.Footer. Use createContext for state sharing.

---

## Summary

Week 9 of 12: **Advanced Patterns** (Level: Advanced). Reusable component patterns. Next week: **Testing**.
