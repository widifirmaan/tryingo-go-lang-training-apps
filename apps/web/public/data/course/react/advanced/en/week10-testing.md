# Testing React — Component Taste-Test

> **Kategori:** React | **Level:** Advanced | **Minggu 10:** Testing React
> **Prerequisites:** Week 9 — **Advanced Patterns**.

## Learning Objectives

- `vitest` + `React Testing Library` — `render(<Card />)` then `screen.getByText("Rice")`

---

## Why This Matters (Non-IT)

Without tests, editing `Card` → missing price found by customers. With `render` + `screen`, edit → red → fix. RTL tests like users see (text), not state content.

---

## Program

```bash
# 1. Install (Vite doesn't ship these!)
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

```javascript
// vitest.config.js — MANDATORY for JSX + fake DOM
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react"; // already in Vite template

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true, // MANDATORY for jest-dom!
    setupFiles: ["./test-setup.js"],
  },
});
```

```javascript
// test-setup.js — MANDATORY so toBeInTheDocument() is known!
import "@testing-library/jest-dom";
```

```json
// package.json — add script:
{ "scripts": { "test": "vitest run" } }
```

```jsx
// Card.jsx
export function Card({ name }){ return <div>{name}</div>; }

// Card.test.jsx
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { test, expect } from "vitest";

test("shows name", () => {
  render(<Card name="Rice" />);
  expect(screen.getByText("Rice")).toBeInTheDocument();
});
```

`npm test` → passes.


---

## Beginner Friendly Explanation

### Analogy: Component Mystery Shopper
- **Manual testing = tasting every outfit change**: exhausting + forgotten.
- **`render` + `screen` = mystery shopper**: visits as a user (finds TEXT, not state!), scores pass/fail. Edit `Card` → red test BEFORE customers see!

### Step 0 — Prepare Device
- Same as React W1: `npm run dev` on `5173` (+ `vitest` for W10).

### How the Computer Reads It
- `render(<Card/>)` mounts in a fake DOM; `screen.getByText` searches like user eyes.

### 3 Must-Know Terms
- 1. **render/screen**: mount/find

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 10: **Test Components** — `render` + `screen`. Next week: **Performance**.
