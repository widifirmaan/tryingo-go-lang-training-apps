# Project: Todo App

> React | State & Interaction | Lesson 8

## Learning Objectives

- Apply all state patterns: controlled forms, lifting, immutability
- Update array state without mutation (map, filter, spread)
- Add filters and derived state
- Handle inputs + keyboard events

---

## Program: Project: Todo App

```jsx
import { useState } from 'react';

const initialTodos = [
  { id: 1, title: 'Belajar useState', done: true },
  { id: 2, title: 'Lifting state up', done: true },
  { id: 3, title: 'Bikin Todo App', done: false },
];

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    const title = text.trim();
    if (!title) return;
    setTodos((prev) => [...prev, { id: Date.now(), title, done: false }]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const visible = todos.filter((t) =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div>
      <h1>Todo App</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ flex: 1 }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div style={{ marginBottom: '0.8rem' }}>
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ marginRight: '0.4rem', background: filter === f ? '#2E5B44' : '#f1f1f1', color: filter === f ? '#fff' : '#222', border: 'none' }}
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {visible.map((t) => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#222' }}>
              {t.title}
            </span>
            <button onClick={() => deleteTodo(t.id)} style={{ border: 'none', background: '#fde8e8', color: '#b00020' }}>Delete</button>
          </li>
        ))}
      </ul>

      <p style={{ color: '#666' }}>{remaining} remaining · {todos.length} total</p>
    </div>
  );
}

```

---

## Explanation

## Immutability
All array updates use immutable patterns: `[...prev, item]` to add, `.map` to update items, `.filter` to remove. React only re-renders when the state reference changes — direct mutation is never detected.

## Derived State
`visible` and `remaining` are computed every render from `todos` — not stored as separate state. Derived state avoids duplicated data that can drift out of sync.

## One State Per Concern
Filter, input, and list each have their own small, clear state. This is the "state colocation" pattern: keep state as close as possible to where it is used.

## Project Milestone
The Todo App is a mandatory project in nearly every React curriculum (Scrimba, Odin, EduRev, Marcy Lab). It proves mastery of state, events, forms, and rendering — the foundation of every app.

---

## Experiments

1. **Immutability**
2. **Derived State**
3. **Satu State Per Concern**
4. **Project Milestone**

---

## Challenge

Add features: edit a todo (double-click to change text), a progress bar counter (done/total), and a "Clear completed" button. Use only state + derived state, no libraries.

---

## Summary

Todo App = state milestone: controlled inputs, immutability, derived state, filters. You are ready for side effects and API data. Next: useEffect.
