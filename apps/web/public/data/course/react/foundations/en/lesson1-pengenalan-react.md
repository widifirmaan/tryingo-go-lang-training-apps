# React & JSX Introduction

> React | Foundations | Lesson 1

## Learning Objectives

- Understand React as a UI library
- Learn JSX syntax and embedded expressions
- Create a first function component
- Understand single-page application (SPA) concepts

---

## Program: React & JSX Introduction

```jsx
function Profile() {
  const name = 'Ayu';
  const role = 'React Developer';
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 12, padding: '1.5rem', maxWidth: 320 }}>
      <h1>Hello, {name}!</h1>
      <p>Role: {role}</p>
      <p>2 + 3 = {2 + 3}</p>
      <p>{name.length} characters in name</p>
    </div>
  );
}

export default function App() {
  return <Profile />;
}

```

---

## Explanation

## What is React?
React is a JavaScript library for building user interfaces from components. Unlike a framework, React focuses on the view layer and can be combined with other libraries.

## JSX
JSX is a syntax extension that lets you write markup inside JavaScript. JavaScript expressions are embedded with `{ }` — e.g. `{name}` or `{2 + 3}`. Every expression is evaluated at render time.

## Function Components
A component is a function that returns JSX. Components are reusable. Component names must start with a capital letter so React treats them as components.

## SPA
React apps are single-page applications: one HTML page loads once, then React updates the UI without full reloads. This is the foundation for React Router later.

---

## Experiments

1. **Apa itu React?**
2. **JSX**
3. **Komponen Fungsi**
4. **SPA**

---

## Challenge

Build your own profile card: change name and role values, add new expressions like years of experience ({2026 - 2020}) and a skill list with array.join().

---

## Summary

React = component-based UI library. JSX combines markup + logic. Expressions in {} are evaluated at render. SPAs load once then update dynamically.
