# TypeScript Config — Shop Rulebook (typescriptlang.org)

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 8:** TypeScript Config
> **Prerequisites:** Week 7 — **Utility Types**.

## Learning Objectives

- `tsconfig.json` rulebook: `strict: true` strict guard, `target: "ES2020"`, `module: "ESNext"` (source: typescriptlang.org/tsconfig)

---

## Why This Matters (Non-IT)

Without `strict: true`, `name: string | null` lets `null` through → error at `name.length`. With `strict`, red before run.

---

## Program: Shop Rulebook (typescriptlang.org)

```json
// tsconfig.json — rulebook (typescriptlang.org)
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true, // strict guard: null, any, this all checked
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

```bash
npx tsc --init # create tsconfig.json
npx tsc --noEmit # check without emitting js
```

```ts
// tsconfig strict: null canNOT enter a string (uncomment line X -> TS2322 error in editor/CI)
function sapa(nama: string): string {
  return `Halo ${nama}`;
}
const user: string | null = null;
// const salah: string = user;
console.log(sapa("Budi"));
```

**Source:** `typescriptlang.org/tsconfig` — `strict` = 7 strict checks.

---

## Key Concepts

### `strict: true` = Strict Guard
Enables 7 checks: `strictNullChecks`, `noImplicitAny`, etc. Without `strict`, `null` slips through.

### `target`/`module`
`target: ES2020` → `let/const` kept, `module: ESNext` → `import`.

---

## Beginner Friendly Explanation

### Analogy: Shop Rulebook

- **`tsconfig.json` = SOP book**: `strict: true` strict SOP, `target` language.

### Step 0 — Prepare Device

`npx tsc --init` at root, `npx tsc --noEmit` check.

### How the Computer Reads It
1. `npx tsc --noEmit` → type-checks all included files, emits nothing.
2. `function calc(a,b)` under `noImplicitAny` → red, add `: number`.

### 3 Must-Know Terms

1. **tsconfig/strict**: rulebook/guard

---

## Experiments

- **Green:** `strict: false` → `null` bug slips? Re-enable.
- **Yellow:** `npx tsc --noEmit` → errors listed, no js files?
- **Red:** Untyped `function calc(a,b)` → `noImplicitAny` red? Add types.

---

## Challenge

**Complete Ruled Shop:** `strict: true` + `noImplicitAny` errors `function calc(a,b)` without types → add `: number`.
- **Link-up (Week 7 — Utility Types):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **tsconfig/strict/target**: book/guard/target

---

## Summary

Week 8 of 12: **Rulebook** — `tsconfig` + `strict`. Next: **Testing**.
