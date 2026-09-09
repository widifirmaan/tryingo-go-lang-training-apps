# Testing TypeScript — Test TS Shop (vitest.dev)

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 9:** Testing TypeScript
> **Prerequisites:** Week 8 — **TypeScript Config**.

## Learning Objectives

- `vitest` `test("make user", () => expect(user).toEqual(...))` — `vitest` runs on Vite, TS directly without `ts-jest` (source: vitest.dev/guide)

---

## Why This Matters (Non-IT)

Without tests, wrong `calcTotal` → customers lose money unnoticed. With `vitest`, change → red test → fix before deploy.

---

## Program: Test TS Shop (vitest.dev)

```bash
npm install -D vitest
```

```typescript
// calc.ts
export function calc(a: number, b: number): number { return a + b; }

// calc.test.ts — .test.ts directly TS
import { test, expect } from "vitest";
import { calc } from "./calc";

test("2+3=5", () => {
  expect(calc(2, 3)).toBe(5);
});

test("make user", () => {
  interface User { name: string; age: number; }
  function makeUser(name: string, age: number): User { return { name, age }; }
  const user = makeUser("Budi", 25);
  expect(user).toEqual({ name: "Budi", age: 25 });
});
```

```json
// package.json
{ "scripts": { "test": "vitest" } }
```

`npm test` → PASS. `npx vitest --typecheck` for type checking.

**Source:** `vitest.dev/guide` — TS works out of the box.

---

## Key Concepts

### `vitest` + `expect` = Shop Test
`test("name", () => expect(calc(2,3)).toBe(5))` — name, expect, check.

### `.test.ts` Directly TS
No `ts-jest` needed, Vite transforms TS on the fly.

---

## Beginner Friendly Explanation

### Analogy: Shop Taste-Test

- **`test` = taste**: `calc(2,3)` must be `5`, if `6` → red.
- **`vitest` = test kitchen**: `npm test` tastes all.

### Step 0 — Prepare Device

`npm create vite` + `npm install -D vitest` + `npm test` in terminal.

### How the Computer Reads It
1. `npm test` → vitest finds `*.test.ts` → runs each `test()`.
2. `expect(6).toBe(5)` → red + diff shown.

### 3 Must-Know Terms

1. **test/expect**: taste/expect
2. **vitest**: Vite test kitchen

---

## Experiments

- **Green:** Break `calc` to `a-b` → test red? Fix back.
- **Yellow:** Add 3rd test → all 3 run?
- **Red:** Delete `expect` → test passes vacuously? Restore assertion.

---

## Challenge

**Complete Tested Shop:** `calcTotal` + 2-case `test` for `2+3=5` and 1-case `makeUser`, `npm test` PASS screenshot.

---

## Mini Glossary

- **vitest/test/expect**: test

---

## Summary

Week 9 of 12: **Test TS Shop** — `vitest`. Next: **Patterns**.
