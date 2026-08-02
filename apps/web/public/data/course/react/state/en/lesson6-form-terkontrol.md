# Controlled Forms

> React | State & Interaction | Lesson 6

## Learning Objectives

- Understand the controlled input pattern (value + onChange)
- Manage many fields in one state object
- Handle checkboxes, selects, and simple validation
- Use preventDefault on submit

---

## Program: Controlled Forms

```jsx
import { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', level: 'beginner', agree: false });
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) { alert('Please agree to the terms.'); return; }
    setSubmitted(form);
  };

  const buttonStyle = {
    background: '#2E5B44', color: '#fff', border: 'none',
    padding: '0.5rem 1.2rem', borderRadius: 10, marginTop: '0.8rem', cursor: 'pointer',
  };

  return (
    <div>
      <h1>Controlled Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Name: </label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Email: </label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>Level: </label>
          <select name="level" value={form.level} onChange={handleChange}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div style={{ margin: '0.5rem 0' }}>
          <label>
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            {' '}I agree to the terms
          </label>
        </div>
        <button type="submit" style={buttonStyle}>Register</button>
      </form>

      <h2>Live State Preview</h2>
      <pre style={{ background: '#f6f6f6', padding: '1rem', borderRadius: 10 }}>
        {JSON.stringify(form, null, 2)}
      </pre>

      {submitted && <p style={{ color: '#2E5B44', fontWeight: 'bold' }}>Registered: {submitted.name} ({submitted.email})</p>}
    </div>
  );
}

```

---

## Explanation

## Controlled Input
An input is controlled: the input value always equals state (`value={form.name}`), and every keystroke flows through `onChange` to update state. Cycle: type -> change -> setState -> re-render -> input shows the new value.

## One Object for Many Fields
Combine fields into a single state object. One `handleChange` serves all fields using the `name` attribute as the key: `setForm(prev => ({ ...prev, [name]: value }))`.

## Checkbox & Select
Checkboxes use `checked={state}` + `e.target.checked`, not `value`. Selects use `value` + `onChange` just like text inputs.

## Submit
Always call `e.preventDefault()` so the page doesn't reload. Simple validation can run directly in the submit handler before saving. Note: controlling all inputs means more re-renders — for simple forms this is fine and actually enables real-time validation.

---

## Experiments

1. **Controlled Input**
2. **Satu Object untuk Banyak Field**
3. **Checkbox & Select**
4. **Submit**

---

## Challenge

Add real-time validation: a password field with a strength indicator (>= 6 chars = weak/strong), an age field accepting digits only, and a disabled submit button until the form is complete.

---

## Summary

Controlled forms: value + onChange bind inputs to state. One state object + one handler for all fields. preventDefault on submit. Next: lifting state up.
