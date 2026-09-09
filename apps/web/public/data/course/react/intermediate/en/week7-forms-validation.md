# Forms & Validation

> **Kategori:** React | **Level:** Intermediate | **Minggu 7:** Forms & Validasi
> **Prerequisites:** Week 6 — **Context API**.

## Learning Objectives

- Controlled form: every input has value + onChange
- Single handler for multiple inputs (name attribute)
- Real-time validation: errors on submit and while typing
- Error state management and conditional rendering
- Form submission: preventDefault, validate, submit

---

## Why This Matters (Non-IT)

Without validation, empty names enter → reports break. With `react-hook-form` + `zod`, 3 lines of validation + automatic messages.

---

## Program: Registration Form

```jsx
// Controlled forms = every input controlled by React state
// Validation: real-time feedback, error messages, prevent submit

import { useState } from "react";

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Invalid email";
    if (form.password.length < 6) errs.password = "Min 6 characters";
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error when user starts typing
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
    console.log("Data sent:", form);
  }

  if (submitted) {
    return <p>Registration successful! Welcome, {form.name}!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
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
      <button type="submit">Register</button>
    </form>
  );
}

console.log("RegisterForm ready to use");
```

---

## Key Concepts

### Controlled Form
value + onChange = React controls the input.

### Single Handler
e.name as key: setForm({ ...form, [e.target.name]: e.target.value }).

### Validation
Validate on submit. Clear errors when the user starts typing.

### UX Pattern
- Error under the input
- Disable button when invalid
- Success message after submit

---

## Experiments

- Add password strength validation
- Build a confirm-password field
- Add a terms & conditions checkbox
- Implement async validation (check unique email)

---

## Challenge

Build a checkout form with validation: name, address, phone, email, payment method. Show real-time errors.


---

## Beginner Friendly Explanation

### Analogy: Form Security Guard
- **Forms without validation = doors without guards**: empty names pass → reports break.
- **`errors.name` + `validate()` = guard + wrong-list**: checks BEFORE submit, shows EXACTLY under the wrong input (not generic alerts!).

### Step 0 — Prepare Device
- Same as this track's W1 (see week 1 for install).

### How the Computer Reads It
- `register('name', { required: 'Required' })` + `errors.name?.message` shows.

### 3 Must-Know Terms
- 1. **register/errors**: register/wrong

## Summary

Week 7 of 12: **Forms & Validation** (Level: Intermediate). User input handling. Next: **Custom Hooks & Patterns**.
