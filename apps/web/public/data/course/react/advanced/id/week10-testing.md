# Testing React

> **Kategori:** React | **Level:** Lanjutan | **Minggu 10:** Testing React

## Tujuan Pembelajaran

- React Testing Library: render, screen, fireEvent
- Test behavior, bukan implementation details
- getBy, queryBy, findBy — kapan pakai masing-masing
- Test user interaction: click, type, submit
- Async testing: waitFor, findBy untuk async operations

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

## Konsep Kunci

### Philosophy
Test dari perspektif user, bukan internal state.

### Queries
- getBy: element harus ada (throw jika tidak)
- queryBy: element mungkin null
- findBy: async, tunggu element muncul

### User Events
fireEvent.click(), fireEvent.change(), userEvent.type().

### Best Practices
- Test behavior, bukan state
- Gunakan accessible queries (getByRole, getByLabelText)

---

## Eksperimen

- Test form submission
- Test async data fetching
- Test custom hook dengan renderHook
- Test dengan mock API

---

## Tantangan

Buat test suite untuk TodoApp: test add todo, toggle complete, delete todo, filter by status. Gunakan userEvent untuk simulasi.

---

## Ringkasan

Minggu 10 dari 12: **Testing React** (Level: Lanjutan). Kualitas kode terjamin. Minggu depan: **Performance Optimization**.
