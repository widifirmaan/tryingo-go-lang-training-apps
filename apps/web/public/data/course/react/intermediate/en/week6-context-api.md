# Context API & useReducer

> **Kategori:** React | **Level:** Intermediate | **Minggu 6:** Context API & useReducer

## Learning Objectives

- createContext and Provider for global state
- useContext hook to consume context
- useReducer for state management with action types
- When to use Context vs prop drilling vs state library
- Custom hooks: useTheme, useAuth pattern

---

## Program: Theme & Auth

```jsx
// Context = state global tanpa prop drilling
// useReducer = state management kompleks (alternatif useState)

import { createContext, useContext, useReducer } from "react";

// ── Context Setup ──
const ThemeContext = createContext(null);

// ── Reducer ──
function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, dark: !state.dark };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    default:
      return state;
  }
}

function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, { dark: false, color: "blue" });
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { state, dispatch } = useContext(ThemeContext);
  return (
    <div style={{ background: state.dark ? "#222" : "#fff", padding: 20 }}>
      <p>Mode: {state.dark ? "Gelap" : "Terang"} | Warna: {state.color}</p>
      <button onClick={() => dispatch({ type: "TOGGLE" })}>
        Toggle Tema
      </button>
      <button onClick={() => dispatch({ type: "SET_COLOR", payload: "green" })}>
        Set Green
      </button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

console.log("Context & useReducer siap digunakan");
```

---

## Key Concepts

### Context
createContext → Provider → useContext. Avoid prop drilling.

### useReducer
Complex state with actions. dispatch({ type, payload }).

### Pattern
Provider wraps app, custom hooks, reducer pattern.

---

## Experiments

- Create context for authentication (login/logout)
- Add new action to reducer
- Create multiple contexts (Theme + Auth)
- Implement custom hook useLocalStorage

---

## Challenge

Build a shopping cart with Context + useReducer: add item, remove item, update quantity, total price.

---

## Summary

Week 6 of 12: **Context API & useReducer** (Level: Intermediate). Global state management. Next week: **Forms & Validation**.
