# Testing — Test Node Shop Before Opening

> **Kategori:** Node.js | **Level:** Advanced | **Minggu 9:** Testing
> **Prerequisites:** Week 8 — **Database**.

## Learning Objectives

- `npm install --save-dev vitest`, `test("calc", ()=> expect(calc(2,3)).toBe(5))` — test before deploy

---

## Why This Matters (Non-IT)

Without `vitest`, formula edits → mistakes found by customers. With 2 tests, edit → red → fix. `npm test` 3 seconds.

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
test("2+3=5", ()=> expect(calc(2,3)).toBe(5));
test("0+0=0", ()=> expect(calc(0,0)).toBe(0));
// npm test
```


---

## Beginner Friendly Explanation

### Analogy: Node Kitchen Taste
- **`test` + `expect` = machine taste**: wrong → RED + line pointed.
- **No tests = blind cooking**: `npm test` tastes ALL recipes in 3 seconds!

### Step 0 — Prepare Device
- Same as Node W1 + this week's package (`vitest`/`pm2`/`vercel`).

### How the Computer Reads It
- `test(name, fn)` + `expect(a).toBe(b)`; `npm test` finds `*.test.js`.

### 3 Must-Know Terms
- 1. **test/expect**: taste/expect

---

## Experiments

- **Green:** Run the Program as-is; note the first output line.
- **Yellow:** Change 1 number/string in the Program → predict first, then run.
- **Red:** Delete the line `import { test, expect } from "vitest";` → what error? Put it back.

## Challenge

**Testing in Your Shop:** re-run it until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in the Program; predict the output BEFORE running, then compare.
- **Red:** Combine with **Database** (Week 8): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 9: **Test Node** — `vitest` before opening. Next: **Performance**.
