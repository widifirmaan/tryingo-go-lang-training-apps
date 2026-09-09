# Testing TypeScript — Uji Warung TS (vitest.dev)

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 9:** Testing TypeScript
> **Prasyarat:** Minggu 8 — **TypeScript Config**.

## Tujuan Pembelajaran

- `vitest` `test("buat user", () => expect(user).toEqual(...))` — `vitest` jalan di Vite, TS langsung tanpa `ts-jest` (sumber: vitest.dev/guide)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa uji, `hitungTotal` salah → pelanggan rugi tidak ketahuan. Dengan `vitest`, ubah → test merah → perbaiki sebelum deploy.

---

## Program: Uji Warung TS (vitest.dev)

```bash
npm install -D vitest
```

```typescript
// hitung.ts
export function hitung(a: number, b: number): number { return a + b; }

// hitung.test.ts — .test.ts langsung TS
import { test, expect } from "vitest";
import { hitung } from "./hitung";

test("2+3=5", () => {
  expect(hitung(2, 3)).toBe(5);
});

test("buat user", () => {
  interface User { name: string; age: number; }
  function buatUser(name: string, age: number): User { return { name, age }; }
  const user = buatUser("Budi", 25);
  expect(user).toEqual({ name: "Budi", age: 25 });
});
```

```json
// package.json
{ "scripts": { "test": "vitest" } }
```

`npm test` → PASS. `npx vitest --typecheck` untuk cek tipe.

**Sumber:** `vitest.dev/guide` — TS works out of the box.

---

## Konsep Kunci

### `vitest` + `expect` = Uji Warung
`test("nama", () => expect(hitung(2,3)).toBe(5))` — nama, harap, cek.

### `.test.ts` Langsung TS
Tidak perlu `ts-jest`, Vite transform TS on the fly.

---

## Penjelasan untuk Pemula

### Analogi: Uji Rasa Warung

- **`test` = cicip**: `hitung(2,3)` harus `5`, jika `6` → merah.
- **`vitest` = dapur uji**: `npm test` cicip semua.

### Langkah 0 — Device

`npm create vite` + `npm install -D vitest` + `npm test` di terminal.

### 3 Istilah Wajib

1. **test/expect**: cicip/harap
2. **vitest**: dapur uji Vite

---

## Tantangan

**Warung Uji Lengkap:** `hitungTotal` + `test` 2 kasus `2+3=5` dan `buatUser` 1 kasus, `npm test` PASS screenshot.

---

## Glosarium Mini

- **vitest/test/expect**: uji

---

## Ringkasan

Minggu 9 dari 12: **Uji Warung TS** — `vitest`. Minggu depan: **Patterns**.
