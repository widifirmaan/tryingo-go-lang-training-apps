# Form Handling: Controlled Components, Real-Time Validation & useRef

> **Kategori:** React | **Level:** Component Foundations, JSX & State | **Minggu 4:** Form Handling: Controlled Components, Real-Time Validation & useRef

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

## Summary

You have mastered controlled forms, validations, and useRef. Next week, we enter Level 2: useEffect, reactive lifecycles, and API integration.
