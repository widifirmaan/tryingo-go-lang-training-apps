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
```
- **Expected Execution Output:**
```text
Validasi kompilasi sukses 100% aman
```

### 2. `type Union = TypeA | TypeB`
- **Core Functionality:** Tipe gabungan multi-kondisi.
- **Parameters / Attributes:** `Two or more varian tipe data`.
- **System Behavior & Return:** Membatasi variabel hanya boleh menerima salah satu nilai yang sah..
- **Practical Code Example:**
```typescript
type Status = 'idle' | 'loading' | 'success';
let current: Status = 'loading';
```
- **Expected Execution Output:**
```text
Menolak nilai di luar 3 opsi literal yang ditentukan
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
```
- **Expected Execution Output:**
```text
{ data: 'Tryngo' }
```

### 4. `Partial<T> / Pick<T, K> / Omit<T, K>`
- **Core Functionality:** Tipe utilitas transformasi bawaan.
- **Parameters / Attributes:** `Base Type T, Keys K`.
- **System Behavior & Return:** Mengubah properti menjadi opsional (`Partial`) atau mengambil subset kolom tertentu..
- **Practical Code Example:**
```typescript
interface Task { id: string; title: string; done: boolean; }
type UpdateDto = Partial<Task>;
```
- **Expected Execution Output:**
```text
Semua kolom Task berubah menjadi opsional
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
