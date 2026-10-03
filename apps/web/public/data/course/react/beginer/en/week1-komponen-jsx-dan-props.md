# Component Architecture, JSX Rules & Unidirectional Data Flow via Props

> **Kategori:** React | **Level:** Component Foundations, JSX & State | **Minggu 1:** Component Architecture, JSX Rules & Unidirectional Data Flow via Props

## Learning Objectives

- Understand the paradigm shift from imperative DOM manipulation to declarative React components
- Master JSX syntactic rules: self-closing tags, camelCase attributes, and curly brace expressions {}
- Implement Unidirectional Data Flow with data streaming from parent to child via props
- Deploy conditional rendering patterns: ternary expressions (?:) and short-circuit guards (&&)
- Author reusable pure functional components cleanly decoupled from side effects

---

## Program: Interactive Workspace Document Card Hierarchy

```jsx
// 1. Komponen Anak (Presentational / Pure Component)
function KartuDokumen({ judul, kategori, jumlahKata, isFavorit }) {
  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "12px",
      background: isFavorit ? "#f0fdf4" : "#ffffff"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0, color: "#1e293b" }}>{judul}</h3>
        {isFavorit && <span style={{ color: "#16a34a", fontSize: "14px", fontWeight: "bold" }}>★ Favorit</span>}
      </div>
      <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: "13px" }}>
        Kategori: <strong>{kategori}</strong> • Estimasi: {Math.ceil(jumlahKata / 200)} menit baca
      </p>
    </div>
  );
}

// 2. Komponen Utama (Parent Tree)
function WorkspaceApp() {
  const namaRuangKerja = "Engineering Core Wiki";

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "480px", margin: "20px auto" }}>
      <header style={{ borderBottom: "2px solid #0f172a", paddingBottom: "8px", marginBottom: "16px" }}>
        <h2 style={{ margin: 0 }}>{namaRuangKerja}</h2>
        <small style={{ color: "#64748b" }}>Notion Workspace Clone • Versi 1.0</small>
      </header>

      <section>
        <KartuDokumen
          judul="Arsitektur Microfrontend 2026"
          kategori="Engineering"
          jumlahKata={1200}
          isFavorit={true}
        />
        <KartuDokumen
          judul="Panduan Onboarding Karyawan Baru"
          kategori="People Ops"
          jumlahKata={450}
          isFavorit={false}
        />
      </section>
    </div>
  );
}

// Export default komponen utama
export default WorkspaceApp;
```

---

## Key Concepts

### Declarative vs Imperative UI
In vanilla imperative JavaScript, you micromanage DOM mutations step-by-step: `createElement`, `setAttribute`, `appendChild`. As applications scale, state diverges from DOM representations.
In **declarative React**, you simply declare the UI target shape given current data: **UI = f(State)**. React orchestrates underlying DOM mutations via its reconciliation engine.

### What JSX Actually Is
JSX is not raw HTML inside JavaScript, but ergonomic syntax sugar over `React.createElement()`.
The markup `<h1 className="title">Hello</h1>` transpiles into `React.createElement('h1', { className: 'title' }, 'Hello')`.
This explains why attributes follow camelCase naming (`className`, `onClick`) and JavaScript expressions interpolate via `{ curly braces }`.

### Unidirectional Data Flow
Props cascade unidirectionally down the component tree (Parent -> Child). Child components **must treat props as immutable contracts**. This guarantees predictable data lineage across large systems.

---

---

## Beginner Friendly Explanation

### Analogy: Lego Modular Bricks & Kitchen Order Slips
1. **Components** are modular Lego bricks: individual door hinges, window frames, and wall panels combine into soaring architectural models.
2. **Props** is a restaurant order ticket passed from the waiter to the chef: "Order #42: Pad Thai, Spicy: True, Extra Lime: 2". The chef respects the immutable slip and renders the dish faithfully.

## Experiments

- Toggle isFavorit on the second card to true and observe the favorite badge render reactively.
- Attempt mutating props inside KartuDokumen (props.judul = "hack") to see read-only protections.
- Introduce a new "author" prop to KartuDokumen and render it beneath the category tag.
- Apply a ternary expression rendering a distinct background badge when category equals "Urgent".

---

## Challenge

Author a `WorkspaceBadge` component accepting `status` ("ACTIVE" | "DRAFT" | "ARCHIVED") rendering colored badges (Green, Yellow, Gray) strictly as a pure component.

---

## Summary

You have mastered declarative component thinking, JSX architecture, and unidirectional props flow. Next week, we examine reactive state with useState.
