# JSX & Basic Components

> **Kategori:** React | **Level:** Beginner | **Minggu 1:** JSX & Basic Components

## Learning Objectives

- Understand JSX as JavaScript syntax extension (React Docs)
- Create simple function components returning JSX
- Use curly braces {} for JavaScript expressions in JSX
- Distinguish JSX from HTML: className, htmlFor, camelCase
- Why JSX is not HTML strings — compiled to React.createElement

---

## Program: Hello React

```jsx
// JSX memungkinkan penulisan HTML-like syntax dalam JavaScript
// Setiap komponen React adalah function yang return JSX

function Welcome() {
  const name = "Tryngo";
  const isDark = true;

  return (
    <div className="card">
      <h1>Halo, {name}!</h1>
      <p>Mode: {isDark ? "Gelap" : "Terang"}</p>
      <ul>
        <li>JSX = JavaScript + XML</li>
        <li>Curly braces {} untuk ekspresi</li>
        <li>className (bukan class)</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}

// Render ke DOM
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);
console.log("Komponen App berhasil didefinisikan");
```

---

## Key Concepts

### JSX
JSX = JavaScript XML. Compiled to React.createElement(). Embed JS expressions with {}.

### Components
Functions returning JSX. Must start with uppercase. Reusable.

### JSX Expressions
- Ternary, logical &&, map()
- Single root element
- All tags closed

---

## Experiments

- Create a new component with different data
- Change conditional rendering from ternary to logical &&
- Render list with map() from array of objects
- Create nested components 3 levels deep

---

## Challenge

Build a user profile page with components: Avatar, UserInfo, SkillList. Use conditional rendering for online/offline status.

---

## Summary

Week 1 of 12: **JSX & Basic Components** (Level: Beginner). React foundations. Next week: **Props & Data Flow**.
