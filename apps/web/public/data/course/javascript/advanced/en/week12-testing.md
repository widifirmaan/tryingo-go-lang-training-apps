# Testing JavaScript — Test Before Opening

> **Kategori:** JavaScript | **Level:** Advanced | **Minggu 12:** Testing
> **Prerequisites:** Week 11 — **Design Patterns**.

## Learning Objectives

- `npm install --save-dev vitest`, `test("calc", ()=> expect(calc(2,3)).toBe(5))`

---

## Why This Matters (Non-IT)

Without `vitest`, formula changes → mistakes found by customers. With 2 tests, change → red → fix. `vi.fn()` mocks fetch without internet.

---

## Program

```bash
npm install --save-dev vitest
# Add a test script in package.json so `npm test` works:
# { "scripts": { "test": "vitest run" } }
```

```javascript
// calc.js
export function calc(a,b){ return a+b; }

// calc.test.js
import { test, expect } from "vitest";
import { calc } from "./calc.js";

test("calc 2+3", () => {
  expect(calc(2,3)).toBe(5);
});
test("calc 0+0", () => {
  expect(calc(0,0)).toBe(0);
});
// npm test
```


---

## Beginner Friendly Explanation

### Analogy: Kitchen Taste-Test JS
- **`test` = official taste**: `calc(2,3)` MUST be 5 — differs → RED + line pointed (no guessing!).
- **`npm test` = tastes ALL menus in 3 seconds**: change formula → red → fix BEFORE deploy. Without it = customers taste (expensive!).

### Step 0 — Prepare Device
- Same as JS W1: `node -v` / browser + `npm test` for W12.

### How the Computer Reads It
- `test(name, fn)` + `expect(a).toBe(b)`; `npm test` finds `*.test.js`.

### 3 Must-Know Terms
- 1. **test/expect/mock**: taste/expect/fake

---

## Challenge

**Testing JavaScript in Your Shop:** re-run it until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in the Program; predict the output BEFORE running, then compare.
- **Red:** Combine with **Design Patterns** (Week 11): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 12: **Test** — Vitest before opening shop. Next week: **Performance Optimization**.
