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
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `interface Name { prop: Type; }`
- **Core Functionality:** Strongly typed object contract definition.
- **Parameters / Attributes:** `Field names, Types, Optional (?)`.
- **System Behavior & Return:** Enforces compile-time structural contracts across object literals, classes, and function parameters.
- **Practical Code Example:**
```javascript
interface User {
  id: string;
  name: string;
  role?: string;
}
const u: User = { id: 'u1', name: 'Alex' };
```
- **Expected Execution Output:**
```text
Compile-time validation succeeds with zero type errors
```

### 2. `type Union = TypeA | TypeB`
- **Core Functionality:** Disjoint union type combination.
- **Parameters / Attributes:** `Two or more distinct types`.
- **System Behavior & Return:** Restricts variable assignments strictly to predefined variants or primitive literal choices.
- **Practical Code Example:**
```javascript
type Status = 'idle' | 'loading' | 'success';
let s: Status = 'loading';
```
- **Expected Execution Output:**
```text
Guarantees only one of the 3 specified string literals can be assigned
```

### 3. `function genericFn<T>(arg: T): T`
- **Core Functionality:** Type-safe reusable generic abstraction.
- **Parameters / Attributes:** `Type Parameter T`.
- **System Behavior & Return:** Enables creation of parameterized functions and collections while preserving concrete type information.
- **Practical Code Example:**
```javascript
function wrap<T>(item: T): { data: T } {
  return { data: item };
}
const w = wrap(42); // Type: { data: number }
```
- **Expected Execution Output:**
```text
{ data: 42 }
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Core Functionality:** Built-in utility type transformations.
- **Parameters / Attributes:** `Base Type T, Selected Keys K`.
- **System Behavior & Return:** Transforms existing types into optional variants (`Partial`) or selects field subsets cleanly.
- **Practical Code Example:**
```javascript
interface Item { id: string; name: string; price: number; }
type PatchItem = Partial<Item>;
```
- **Expected Execution Output:**
```text
All properties become optional for update requests
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
