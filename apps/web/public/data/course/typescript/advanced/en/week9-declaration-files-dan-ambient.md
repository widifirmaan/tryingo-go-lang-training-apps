# Declaration Files (.d.ts), Ambient Types & Module Augmentation

> **Kategori:** TypeScript | **Level:** Advanced Type Systems & Portfolio Capstone | **Minggu 9:** Declaration Files (.d.ts), Ambient Types & Module Augmentation
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand declaration files (.d.ts) and how npm @types registries resolve dependencies
- Deploy the `declare` keyword for ambient definitions spanning browser globals and Node runtime
- Execute Module Augmentation to extend third-party vendor interfaces (Express, Next.js)
- Configure critical enterprise tsconfig flags: strict, noImplicitAny, exactOptionalPropertyTypes
- Author ambient typings for legacy JavaScript packages lacking native type definitions

---

## Program: Typing Legacy Vanilla Libraries & Express Session Augmentation

```typescript
// 1. Ambient Declaration untuk Library JavaScript Warisan Tanpa Tipe
declare namespace WindowSDKWarisan {
  function hitungPajakInternasional(nominal: number, negara: string): number;
  const versiEngine: string;
}

// 2. Module Augmentation (Memperluas Tipe Library Tanpa Mengubah Source-nya)
// Bayangkan ini memperluas interface Express Request atau Session bawaan
declare global {
  namespace Express {
    interface Request {
      penggunaTervalidasi?: {
        userId: string;
        tierAkun: "RETAIL" | "INSTITUSI";
        ipAddress: string;
      };
    }
  }
}

// 3. Penggunaan Nyata dalam Handler Middleware
function middlewareAutentikasi(req: any) {
  // Melalui module augmentation, properti penggunaTervalidasi kini dikenal resmi
  req.penggunaTervalidasi = {
    userId: "USR-789",
    tierAkun: "INSTITUSI",
    ipAddress: "103.11.22.33"
  };
  console.log("User terautentikasi:", req.penggunaTervalidasi.userId);
  console.log("Tier Hak Akses:", req.penggunaTervalidasi.tierAkun);
}

const reqMock: any = {};
middlewareAutentikasi(reqMock);
```

---

## Key Concepts

### Demystifying `.d.ts` Declaration Files
Files with extension `.d.ts` hold strictly type metadata without executable logic. They act as **Rosetta stones** between plain JavaScript runtimes and the TypeScript compiler. When installing `@types/node` or `@types/react`, you are acquiring declaration files.

### Module Augmentation in Enterprise Architectures
Third-party HTTP frameworks such as Express expose a baseline `Request` shape. Production systems inject credentials via auth middleware (`req.user`).
Rather than compromising with `(req as any).user`, augment the vendor contract via **Declaration Merging**:
```typescript
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}
```
Your entire engineering org gains autocomplete and compiler guarantees without hacking `node_modules`.

---

---

## Beginner Friendly Explanation

### Analogy: Multilingual Hotel Guides & VIP Access Badges
1. **`.d.ts`** is a multilingual visitor brochure: the physical building operates in the regional tongue (*JavaScript*), while the brochure instructs foreign travelers (*TypeScript*) precisely where elevators and suites reside.
2. **Module Augmentation** is a VIP badge overlay: without altering the hotel keycard's hardware, security attaches an authorization badge granting elevator access to the penthouse suites.

## Experiments

- Declare an ambient variable declare const API_SECRET: string and reference it in console statements.
- Append an additional field to Express.Request and verify intellisense availability.
- Inspect tsconfig.json compiler options and enforce strict: true.
- Observe compilation performance when toggling skipLibCheck across large dependencies.

---

## Challenge

Author ambient declaration `window-env.d.ts` augmenting the global browser `Window` interface with `analyticsTracker: { trackEvent: (name: string, meta?: object) => void }`.

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

You have mastered Declaration Files and Module Augmentation. Next week is our Capstone Project: Strongly-Typed Financial Portfolio Engine.
