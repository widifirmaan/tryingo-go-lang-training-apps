# State & useState

## Why This Matters

React is the most popular UI library in the world - used by Facebook, Netflix, and thousands of products. Learning to think in React (components, state, props) is the gateway to the entire modern frontend ecosystem.

Practice program: *"Counter & Form"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand state as changeable data within components
- useState hook: const [value, setValue] = useState(initial)
- State triggers re-render - UI updates automatically when state changes
- Controlled components: form inputs controlled by React
- Event handling: onChange, onClick, onSubmit

---

## Program: Counter & Form

```jsx
// State = data internal komponen yang bisa berubah
// useState hook = tambahkan state ke function component

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Hitung: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+ Tambah</button>
      <button onClick={() => setCount(count - 1)}>- Kurang</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

function Form() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(name);
    setName("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
        />
        <button type="submit">Kirim</button>
      </form>
      {submitted && <p>Halo, {submitted}!</p>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
      <Form />
    </div>
  );
}

console.log("Counter & Form siap digunakan");
```

---

## Key Concepts

### useState
Hook to add state. Returns [value, setter].

### Re-render
setState triggers re-render with new value.

### Controlled Components
Form inputs controlled by state.

### Event Handling
e.target.value, e.preventDefault().

---

## Experiments

- Create show/hide toggle with useState boolean
- Create input for multiple fields (name, email)
- Use functional update: setCount(prev => prev + 1)
- Create counter with configurable step

---

## Challenge

Build a simple todo list: add task, toggle complete, delete task. Use useState for array of objects.

---

## Summary

Week 3 of 12: **State & useState** (Level: Beginner). Interactivity in components. Next week: **useEffect & Lifecycle**.
