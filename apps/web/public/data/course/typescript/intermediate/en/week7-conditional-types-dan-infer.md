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

## Visual Mental Model & Architecture Flow

```diagram
┌───────────────────────────────┐
│     KODE SUMBER TYPESCRIPT    │ (Strict Type Annotations)
│ interface User { id: UUID; }  │
└──────────────┬────────────────┘
               │ TYPE CHECKING (tsc) ──► Menemukan bug sebelum runtime!
               ▼
┌───────────────────────────────┐
│     JAVASCRIPT HASIL COMPILE  │ (Tipe dihapus / Type Erasure)
│ function getUser(user) { ... }│
└───────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `interface Name { prop: Type; }`
- **Core Functionality:** Defines kontrak bentuk objek terstruktur.
- **Parameters / Attributes:** `Field names, Types, Optional (?)`.
- **System Behavior & Return:** Guarantees seluruh objek mematuhi struktur tipe data saat compile-time..
- **Practical Code Example:**
```typescript
interface User {
  id: string;
  name: string;
  isActive?: boolean;
}
const u: User = { id: 'u1', name: 'Alex' };
console.log(u.name);
```
- **Expected Execution Output:**
```output
Alex
```

### 2. `type Union = TypeA | TypeB`
- **Core Functionality:** Tipe gabungan multi-kondisi.
- **Parameters / Attributes:** `Two or more varian tipe data`.
- **System Behavior & Return:** Membatasi variabel hanya boleh menerima salah satu nilai yang sah..
- **Practical Code Example:**
```typescript
type Status = 'idle' | 'loading' | 'success';
let current: Status = 'loading';
console.log(current);
```
- **Expected Execution Output:**
```output
loading
```

### 3. `function genericFn<T>(arg: T): T`
- **Core Functionality:** Fungsi tipe dinamis aman (Generics).
- **Parameters / Attributes:** `Type Parameter T`.
- **System Behavior & Return:** Membuat fungsi yang dapat menangani berbagai tipe data dengan tetap menjaga type safety..
- **Practical Code Example:**
```typescript
function wrap<T>(val: T): { data: T } {
  return { data: val };
}
const box = wrap('Tryngo');
console.log(JSON.stringify(box));
```
- **Expected Execution Output:**
```output
{"data":"Tryngo"}
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Core Functionality:** Tipe utilitas transformasi bawaan.
- **Parameters / Attributes:** `Base Type T, Keys K`.
- **System Behavior & Return:** Mengubah properti menjadi opsional (`Partial`) atau mengambil subset kolom tertentu..
- **Practical Code Example:**
```typescript
interface Task { id: string; title: string; done: boolean; }
type UpdateDto = Partial<Task>;
const update: UpdateDto = { done: true };
console.log(update.done);
```
- **Expected Execution Output:**
```output
true
```

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
