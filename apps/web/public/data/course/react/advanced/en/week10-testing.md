# Testing React

> **Kategori:** React | **Level:** Advanced | **Minggu 10:** Testing React

## Learning Objectives

- React Testing Library: render, screen, fireEvent
- Test behavior, not implementation details
- getBy, queryBy, findBy — when to use each
- Test user interaction: click, type, submit
- Async testing: waitFor, findBy for async operations

---

## Program: Unit & Integration Test

```jsx
// Testing React: Jest + React Testing Library
// Philosophy: test behavior, not implementation

import { render, screen, fireEvent } from "@testing-library/react";
import { useState } from "react";

// ── Component to Test ──
function Counter({ initial = 0 }) {
  const [count, setCount] = useState(initial);
  return (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

function Greeting({ name }) {
  if (!name) return <p>Hello, Guest!</p>;
  return <p>Hello, {name}!</p>;
}

// ── Tests ──
describe("Counter", () => {
  test("renders with initial value", () => {
    render(<Counter initial={5} />);
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 5");
  });

  test("increments on click", () => {
    render(<Counter />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByTestId("count")).toHaveTextContent("Count: 1");
  });
});

describe("Greeting", () => {
  test("renders guest when no name", () => {
    render(<Greeting />);
    expect(screen.getByText("Hello, Guest!")).toBeInTheDocument();
  });

  test("renders name when provided", () => {
    render(<Greeting name="Budi" />);
    expect(screen.getByText("Hello, Budi!")).toBeInTheDocument();
  });
});

console.log("Tests siap dijalankan dengan: npm test");
```

---

## Key Concepts

### Philosophy
Test from user perspective, not internal state.

### Queries
getBy (must exist), queryBy (maybe null), findBy (async).

### User Events
fireEvent for simulating user actions.

### Best Practices
Test behavior, use accessible queries.

---

## Experiments

- Test form submission
- Test async data fetching
- Test custom hook with renderHook
- Test with mock API

---

## Challenge

Build test suite for TodoApp: test add todo, toggle complete, delete todo, filter by status. Use userEvent for simulation.

---

## Summary

Week 10 of 12: **Testing React** (Level: Advanced). Code quality assured. Next week: **Performance Optimization**.
