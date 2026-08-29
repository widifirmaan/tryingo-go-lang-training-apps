# Testing JavaScript — Uji Sebelum Buka

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 12:** Testing

## Tujuan Pembelajaran

- `npm install --save-dev vitest`, `test("hitung", ()=> expect(hitung(2,3)).toBe(5))`

---

## Program

```javascript
// hitung.js
export function hitung(a,b){ return a+b; }

// hitung.test.js
import { test, expect } from "vitest";
import { hitung } from "./hitung.js";

test("hitung 2+3", () => {
  expect(hitung(2,3)).toBe(5);
});
test("hitung 0+0", () => {
  expect(hitung(0,0)).toBe(0);
});
// npm test
```

---

## Ringkasan

Minggu 12: **Uji** — Vitest sebelum buka warung.
