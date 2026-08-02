# useEffect & Side Effects

> React | Effects & Data | Lesson 9

## Learning Objectives

- Understand what a side effect is
- Master the 3 dependency array patterns
- Write correct cleanup functions
- Understand StrictMode double-invoke

---

## Program: useEffect & Side Effects

```jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [name, setName] = useState('');

  // Pattern 3: runs when 'seconds' changes
  useEffect(() => {
    document.title = 'Seconds: ' + seconds;
  }, [seconds]);

  // Pattern 2: runs once after first render — with cleanup
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id); // cleanup runs before next effect or unmount
  }, [running]);

  return (
    <div>
      <h1>useEffect</h1>

      <h2>Timer dengan Cleanup</h2>
      <p>Elapsed: {seconds}s (lihat judul tab!)</p>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? 'Pause' : 'Resume'}
      </button>

      <h2>Effect Mengikuti State</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type to sync title..." />
      <p>Judul tab di-set saat seconds berubah.</p>

      <p style={{ color: '#666', fontSize: '0.85rem' }}>
        3 pola dependency: (fn) tiap render · (fn, []) sekali · (fn, [dep]) saat dep berubah.
        Cleanup mencegah kebocoran interval. StrictMode memanggil effect dua kali di dev
        untuk menampakkan bug.
      </p>
    </div>
  );
}

```

---

## Explanation

## Side Effects
A side effect is anything touching the world outside the component: timers, fetches, subscriptions, document.title, localStorage. `useEffect` is the right place — not the render body (which must stay pure).

## 3 Dependency Patterns
`useEffect(fn)` — runs after every render. `useEffect(fn, [])` — once after the first render. `useEffect(fn, [dep])` — when dep changes. Choosing the wrong pattern = bugs (effects running too often or never).

## Cleanup
The returned function runs before the next effect or on unmount. Intervals/timeouts must be cleaned up — otherwise you leak memory and see weird behavior (e.g. a counter running twice).

## StrictMode
In development, React StrictMode runs effects twice (mount -> cleanup -> mount) to reveal effects that aren't clean. That's normal — not a bug in your code. Production runs it once.

---

## Experiments

1. **Side Effects**
2. **3 Pola Dependency**
3. **Cleanup**
4. **StrictMode**

---

## Challenge

Build a full stopwatch: lap times (array), Start/Stop/Lap/Reset buttons, and mm:ss formatting. Add an effect that saves the last lap to localStorage and reads it on mount.

---

## Summary

useEffect handles side effects. 3 dependency array patterns. Cleanup prevents leaks. StrictMode double-invokes in dev. Next: data fetching.
