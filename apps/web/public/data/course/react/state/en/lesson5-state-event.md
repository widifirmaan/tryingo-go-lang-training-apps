# useState & Events

> React | State & Interaction | Lesson 5

## Learning Objectives

- Understand why plain variables fail for changing UI
- Use useState and the setter function
- Handle onClick events with handlers
- Apply functional updates (prev => prev + 1)

---

## Program: useState & Events

```jsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h1>useState & Events</h1>

      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <h2>Toggle</h2>
      <button onClick={() => setIsOn((prev) => !prev)}>
        {isOn ? 'Switch OFF' : 'Switch ON'}
      </button>
      <p>Status: {isOn ? 'ON' : 'OFF'}</p>

      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        Catatan: state update bersifat async. Dua klik +1 berturut-turut dalam satu
        handler tidak menumpuk kecuali memakai functional update (c) => c + 1.
      </p>
    </div>
  );
}

```

---

## Explanation

## Why State?
Plain variables do not trigger re-renders. Only when state changes (via the setter) does React re-render the component with the new value. This is the core difference between variables and state.

## useState
`const [count, setCount] = useState(0)` — the hook returns an array: current value + setter. Always use the setter to change values; never mutate directly.

## Event Handlers
React uses camelCase syntax: `onClick`, `onChange`, `onSubmit`. Handlers receive an event object. Don't call handlers in JSX — pass the function: `onClick={handleClick}`, not `onClick={handleClick()}`.

## Functional Updates
State updates are asynchronous and batched. When an update depends on the previous value, use `setCount((c) => c + 1)` so it is always correct even when called rapidly.

---

## Experiments

1. **Kenapa State?**
2. **useState**
3. **Event Handler**
4. **Functional Updates**

---

## Challenge

Build a Quiz component: question index, score, and selected answer state. An array of 5 multiple-choice questions. Clicking an answer adds score, Next button advances, Reset restarts.

---

## Summary

State = data that re-renders the UI. Setters replace values, functional updates are safe for sequential values. Next: controlled forms.
