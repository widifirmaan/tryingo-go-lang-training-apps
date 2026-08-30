# Testing React — Uji Rasa Komponen

> **Kategori:** React | **Level:** Lanjutan | **Minggu 10:** Testing React

## Tujuan Pembelajaran

- `vitest` + `React Testing Library` — `render(<Card />)` lalu `screen.getByText("Beras")`

---

## Program

```jsx
// Card.jsx
export function Card({ nama }){ return <div>{nama}</div>; }

// Card.test.jsx
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { test, expect } from "vitest";

test("tampil nama", () => {
  render(<Card nama="Beras" />);
  expect(screen.getByText("Beras")).toBeInTheDocument();
});
```

`npm test` → lulus.

---

## Ringkasan

Minggu 10: **Uji Komponen** — `render` + `screen`.
