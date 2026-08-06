# Forms & Validation

> **Kategori:** React | **Level:** undefined | **Minggu 7:** Forms & Validation

## Learning Objectives

- Controlled forms: each input has value + onChange
- Single handler for multiple inputs (name attribute)
- Real-time validation: errors on submit and while typing
- Error state management and conditional rendering
- Form submission: preventDefault, validate, submit

---

## Program: Registration Form

```jsx
// Controlled forms = setiap input dikontrol React state
// Validasi: real-time feedback, error messages, prevent submit

import { useState } from "react";

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Nama wajib diisi";
    if (!form.email.includes("@")) errs.email = "Email tidak valid";
    if (form.password.length < 6) errs.password = "Min 6 karakter";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error saat user mulai mengetik
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    console.log("Data terkirim:", form);
  }

  if (submitted) {
    return <p>Registrasi berhasil! Selamat, {form.name}!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Daftar</button>
    </form>
  );
}

console.log("RegisterForm siap digunakan");
```

---

## Key Concepts

### Controlled Forms
value + onChange = React controls input.

### Single Handler
e.name as key for dynamic updates.

### Validation
Validate on submit, clear on type.

### UX Pattern
Errors below inputs, disable button, success message.

---

## Experiments

- Add password strength validation
- Create password confirmation field
- Add terms & conditions checkbox
- Implement async validation (check unique email)

---

## Challenge

Build a checkout form with validation: name, address, phone, email, payment method. Show real-time errors.

---

## Summary

Week 7 of 12: **Forms & Validation** (Level: Intermediate). User input handling. Next week: **Custom Hooks & Patterns**.
