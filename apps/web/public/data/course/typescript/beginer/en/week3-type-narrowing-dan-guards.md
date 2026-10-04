# Type Narrowing: typeof, instanceof, in & Custom Type Guards

> **Kategori:** TypeScript | **Level:** Type Foundations & Narrowing | **Minggu 3:** Type Narrowing: typeof, instanceof, in & Custom Type Guards
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Control Flow Analysis and Narrowing mechanics in TypeScript
- Deploy runtime guards: typeof, instanceof, and the in operator
- Architect Discriminated Unions (Tagged Unions) with literal discriminant fields
- Author Custom Type Guards using predicate signatures (parameter is T)
- Distinguish unsafe any from strictly safe unknown requiring narrowing

---

## Program: Geometric Shape Area Calculator & Transaction Discriminator

```typescript
// 1. Discriminated Union (Tagged Union)
interface Lingkaran {
  kind: "lingkaran";
  radius: number;
}

interface PersegiPanjang {
  kind: "persegi_panjang";
  panjang: number;
  lebar: number;
}

interface Segitiga {
  kind: "segitiga";
  alas: number;
  tinggi: number;
}

type BentukGeometri = Lingkaran | PersegiPanjang | Segitiga;

// 2. Type Narrowing via Discriminant Property
function hitungLuas(bentuk: BentukGeometri): number {
  switch (bentuk.kind) {
    case "lingkaran":
      return Math.PI * bentuk.radius ** 2;
    case "persegi_panjang":
      return bentuk.panjang * bentuk.lebar;
    case "segitiga":
      return 0.5 * bentuk.alas * bentuk.tinggi;
  }
}

// 3. Custom Type Guard (User-Defined Type Predicate: x is T)
interface PembayaranKredit {
  nomorKartu: string;
  cicilanBulan: number;
}

function isPembayaranKredit(item: any): item is PembayaranKredit {
  return typeof item === "object" && item !== null && "nomorKartu" in item && "cicilanBulan" in item;
}

const inputLuar: unknown = { nomorKartu: "4111-2222-3333-4444", cicilanBulan: 12 };

if (isPembayaranKredit(inputLuar)) {
  console.log("Kartu Terverifikasi. Cicilan:", inputLuar.cicilanBulan, "bulan");
}

const c: Lingkaran = { kind: "lingkaran", radius: 7 };
console.log("Luas Lingkaran (r=7):", hitungLuas(c).toFixed(2));
```

---

## Key Concepts

### Understanding Type Narrowing
Variables frequently hold Union types such as `string | number` or `StateA | StateB`. **Type Narrowing** is the mechanism where the compiler evaluates branching constructs (`if`, `switch`, guards) and narrows the variable's broad union down to a concrete subtype within that execution block.

### Discriminated Unions (The Industry Standard)
Discriminated Unions are the single most robust pattern for modeling complex application state. Each interface shares a common literal discriminant property (e.g. `kind: "circle"` or `status: "success"`).
When evaluating `switch (shape.kind)`, TypeScript refines shape properties automatically per branch.

### Custom Type Guards (`arg is T`)
When validating unknown runtime boundaries (e.g., untyped API payloads), define custom predicates using `parameter is TargetType`:
```typescript
function isUser(val: unknown): val is User {
  return typeof val === 'object' && val !== null && 'id' in val;
}
```

---

---

## Beginner Friendly Explanation

### Analogy: Airport Baggage Sorters
1. **Union type** is the arrivals baggage carousel: luggage, oversized sports gear, and cardboard parcels travel along the same belt.
2. **Type Narrowing** is the barcode scanner gate: if a parcel holds a 'Fragile' tag (*discriminant*), it diverts to manual handling; standard luggage routes directly to baggage claim.

## Experiments

- Remove one switch case from hitungLuas and observe compiler feedback.
- Attempt accessing shape.radius within the "persegi_panjang" branch to see compile errors.
- Mutate inputLuar into a scalar number and verify the guard gracefully ignores execution.
- Add a new shape "trapezoid" to the union and update the discriminant exhaustive switch.

---

## Challenge

Architect a Discriminated Union `ApiResponse<T>` featuring "SUCCESS" (holding payload data and timestamp) or "ERROR" (holding error message and HTTP code). Author a type-safe consumer.

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

You have mastered Control Flow Analysis, Discriminated Unions, and Custom Type Guards. Next week, we examine Tuples, Const Enums, and Exhaustive Checks with never.
