# Testing — Uji Warung Node Sebelum Buka

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 9:** Testing

## Tujuan Pembelajaran

- `npm install --save-dev vitest`, `test("hitung", ()=> expect(hitung(2,3)).toBe(5))` — uji sebelum deploy

---

## Program

```javascript
// hitung.js
export function hitung(a,b){ return a+b; }

// hitung.test.js
import { test, expect } from "vitest";
import { hitung } from "./hitung.js";
test("2+3=5", ()=> expect(hitung(2,3)).toBe(5));
test("0+0=0", ()=> expect(hitung(0,0)).toBe(0));
// npm test
```

---

## Ringkasan

Minggu 9: **Uji Node** — `vitest` sebelum buka.
