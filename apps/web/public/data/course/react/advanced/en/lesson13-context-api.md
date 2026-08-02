# Context API

> React | Global State & Advanced | Lesson 13

## Learning Objectives

- Recognize the prop drilling problem
- Create a context with createContext
- Provide values via Provider
- Read context with useContext

---

## Program: Context API

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

function ThemeToggle() {
  const { theme, toggle } = useContext(ThemeContext);
  return <button onClick={toggle}>Switch to {theme === 'light' ? 'dark' : 'light'}</button>;
}

function Toolbar() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <span>Toolbar</span>
      <ThemeToggle />
    </div>
  );
}

function Card() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{ border: '1px solid ' + (theme === 'light' ? '#ddd' : '#555'), borderRadius: 12, padding: '1rem', marginTop: '1rem' }}>
      <h3>Deep component</h3>
      <p>Baca theme dari context — tanpa prop drilling!</p>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')) }}>
      <div style={{ background: theme === 'light' ? '#ffffff' : '#1a1d21', color: theme === 'light' ? '#222' : '#eee', minHeight: '100vh', padding: '2rem', transition: 'all 0.2s' }}>
        <h1>Theme: {theme}</h1>
        <Toolbar />
        <Card />
      </div>
    </ThemeContext.Provider>
  );
}

```

---

## Explanation

## Prop Drilling
When state must travel 3-4 levels down only for one deep component, every intermediate level must forward props it doesn't use. That is prop drilling — context is the fix.

## createContext
`createContext(null)` creates a context object with a default value. The context is imported by the Provider (providing values) and consumers (reading values).

## Provider
`<ThemeContext.Provider value={...}>` wraps the subtree that needs the value. Values can be state, functions, or both. Components inside read it without props.

## useContext
`useContext(ThemeContext)` returns the nearest provider value. Deep components re-render automatically when the value changes. Use context for "scoped global" values: theme, auth, language — not for every state.

---

## Experiments

1. **Prop Drilling**
2. **createContext**
3. **Provider**
4. **useContext**

---

## Challenge

Build a simple auth system: AuthContext holds user (null = logged out). Header shows login/logout, a Dashboard page renders only when a user exists (otherwise: "Please login" message). User is set from a login form.

---

## Summary

Context solves prop drilling: createContext + Provider + useContext. Best for scoped global values. Next: useReducer & custom hooks.
