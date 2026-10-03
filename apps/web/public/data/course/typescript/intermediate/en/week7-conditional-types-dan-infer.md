# Conditional Types, the infer Keyword & Template Literal Types

> **Kategori:** TypeScript | **Level:** Generics & Modern Utility Types | **Minggu 7:** Conditional Types, the infer Keyword & Template Literal Types
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Grasp type branching logic using Conditional Types (T extends U ? X : Y)
- Leverage the `infer` keyword to deduce inner payload types within generic wrappers
- Construct custom unwrapper utilities for nested Promises and Arrays
- Deploy Template Literal Types to constrain dynamic pattern-matched string channels
- Prevent typos across event names within asynchronous pub/sub systems

---

## Program: Async Unwrapper Engine & Strongly-Typed Event Dispatcher

```typescript
// 1. Conditional Types: T extends U ? X : Y
type CekTipeData<T> = T extends string ? "Ini Teks" : "Bukan Teks";

type Uji1 = CekTipeData<string>; // "Ini Teks"
type Uji2 = CekTipeData<number>; // "Bukan Teks"

// 2. infer: Membongkar / Menembus Tipe Dalam Promise (Unwrap Promise)
type BongkarPromise<T> = T extends Promise<infer U> ? U : T;

type DataAsinkron = Promise<{ id: string; saldo: number }>;
type DataBersih = BongkarPromise<DataAsinkron>; // { id: string; saldo: number }

// 3. Template Literal Types (Membangun Format String Dinamis)
type AksiSistem = "buat" | "perbarui" | "hapus";
type EntitasSistem = "pengguna" | "transaksi" | "portofolio";

// Hasil: "buat:pengguna" | "buat:transaksi" | "perbarui:pengguna" | dst...
type NamaEventPublik = `${AksiSistem}:${EntitasSistem}`;

class EventBusKetat {
  private listener: Map<string, Function[]> = new Map();

  on(event: NamaEventPublik, handler: (payload: any) => void) {
    const list = this.listener.get(event) || [];
    list.push(handler);
    this.listener.set(event, list);
  }

  emit(event: NamaEventPublik, payload: any) {
    const list = this.listener.get(event) || [];
    list.forEach(fn => fn(payload));
  }
}

const bus = new EventBusKetat();
bus.on("buat:transaksi", (data) => {
  console.log("Event diterima:", data);
});

bus.emit("buat:transaksi", { id: "TX-77", nominal: 250000 });
```

---

## Key Concepts

### Branching Logic at the Type Level
Conditional Types empower the compiler with structural ternary logic:
```typescript
type NonNullableCustom<T> = T extends null | undefined ? never : T;
```
If `T` satisfies `null | undefined`, it resolves to `never` (filtering it out); otherwise it returns `T`.

### The `infer` Keyword
The `infer` declaration introduces a pattern-matching variable within the conditional check, allowing you to deduce encapsulated inner types.
For example, to strip the outer container from a `Promise<User>` to extract pure `User`:
`T extends Promise<infer U> ? U : T` captures the promised payload into temporary type variable `U`.

### Template Literal Types
TypeScript enables template literal union multiplication:
```typescript
type HttpMethod = 'GET' | 'POST';
type Endpoint = '/users' | '/orders';
type Route = `${HttpMethod} ${Endpoint}`; // "GET /users" | "POST /users" | ...
```

---

---

## Beginner Friendly Explanation

### Analogy: Parcel Unboxers & Immigration Stamps
1. **`infer`** is an automated luggage unboxer: if a package arrives wrapped inside a sealed shipping container (*Promise*), the robotic arm extracts the core payload inside.
2. **Template Literal Types** is an immigration date stamp: combining dynamic days, months, and country codes into an uncompromising verifiable string pattern.

## Experiments

- Attempt bus.emit("invalid:channel" as any) and observe pattern rejection.
- Pass a scalar type into BongkarPromise and observe fallback preservation.
- Construct a Template Literal Type validating CSS Hex codes starting with `#${string}`.
- Author an ExtractArray<T> utility leveraging T extends (infer E)[] ? E : T.

---

## Challenge

Author a recursive conditional type `Flatten<T>` that unwraps multi-dimensional arrays (e.g. `number[][][]` into `number`), preserving primitives cleanly.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. Overusing the 'any' Escape Hatch
- **Symptom / Issue:** Completely disables TypeScript compile-time safety across downstream code.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `unknown` for dynamic values and narrow types using type guards.

### 2. Reckless Non-Null Assertions (!)
- **Symptom / Issue:** Causes runtime `Cannot read property of undefined` crashes when assumptions fail.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Rely on optional chaining (`?.`) or explicit defensive guard statements.

### 3. Inconsistent Type vs Interface Usage
- **Symptom / Issue:** Hinders declaration merging and confuses team conventions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `interface` for extensible object contracts and `type` for unions, primitives, and tuples.

---

## Summary

You have mastered Conditional Types, infer, and Template Literal Types. Next week, we enter Level 3: Mapped Types, keyof, and Immutable State Stores.
