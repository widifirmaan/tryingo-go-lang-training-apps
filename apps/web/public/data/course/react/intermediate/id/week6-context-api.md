# Context API & useReducer

> **Kategori:** React | **Level:** Menengah | **Minggu 6:** Context API & useReducer

## Tujuan Pembelajaran

- createContext dan Provider untuk state global
- useContext hook untuk consume context
- useReducer untuk state management dengan action types
- Kapan pakai Context vs prop drilling vs state library
- Custom hooks: useTheme, useAuth pattern

---

## Program: Tema & Auth

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

## Konsep Kunci

### Context
createContext() → Provider → useContext(). Hindari prop drilling.

### useReducer
State kompleks dengan banyak action. dispatch({ type, payload }).

### Pattern
- Provider wrap app
- Custom hook: useTheme() = useContext(ThemeContext)
- Reducer: switch(action.type)

---

## Eksperimen

- Buat context untuk autentikasi (login/logout)
- Tambah action baru di reducer
- Buat multiple context (Theme + Auth)
- Implementasikan custom hook useLocalStorage

---

## Tantangan

Buat shopping cart dengan Context + useReducer: add item, remove item, update quantity, total price.

---

## Ringkasan

Minggu 6 dari 12: **Context API & useReducer** (Level: Menengah). State management global. Minggu depan: **Forms & Validation**.
