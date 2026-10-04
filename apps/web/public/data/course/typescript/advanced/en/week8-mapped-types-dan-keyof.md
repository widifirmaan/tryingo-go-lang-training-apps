# Mapped Types, the keyof Operator & Immutable State Store

> **Kategori:** TypeScript | **Level:** Advanced Type Systems & Portfolio Capstone | **Minggu 8:** Mapped Types, the keyof Operator & Immutable State Store
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the keyof operator to extract property key unions from any interface
- Construct custom Mapped Types iterating over object keys dynamically
- Deploy Key Remapping (`as`) and string intrinsic primitives (Capitalize, Uppercase)
- Author recursive DeepReadonly utilities enforcing complete state immutability
- Prevent race condition state corruptions in enterprise financial asset management

---

## Program: Reactive Immutable State Store with Deep Readonly Mapped Types

```typescript
// 1. keyof Operator: Mengambil Union dari Semua Kunci Objek
interface PortofolioState {
  totalAset: number;
  simbolAktif: string[];
  sedangSinkronisasi: boolean;
}

type KunciPortofolio = keyof PortofolioState; // "totalAset" | "simbolAktif" | "sedangSinkronisasi"

// 2. Mapped Type: Mengubah Setiap Kunci Properti Menjadi Getter Method
type GetterPortofolio<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// 3. Deep Readonly: Mengunci Objek Bertingkat Sampai Kedalaman Terdalam
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface KonfigurasiInvestasi {
  profilRisiko: string;
  aturanBatas: {
    maksimalAlokasiSatuEmiten: number;
    stopLossPersen: number;
  };
}

const configAman: DeepReadonly<KonfigurasiInvestasi> = {
  profilRisiko: "MODERAT",
  aturanBatas: {
    maksimalAlokasiSatuEmiten: 0.20,
    stopLossPersen: 0.05
  }
};

// configAman.aturanBatas.stopLossPersen = 0.1; // COMPILE ERROR: Deeply locked!

console.log("Status Konfigurasi:", configAman.profilRisiko);
console.log("Stop Loss Terkunci:", configAman.aturanBatas.stopLossPersen * 100, "%");
```

---

## Key Concepts

### The `keyof` Operator
The `keyof` operator extracts all public keys of a type into a string literal union, enabling bulletproof dynamic property lookups:
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Mapped Types (`[K in keyof T]`)
When you need to project an interface schema by transforming its fields (e.g. converting properties into getter methods, nullable values, or promises), deploy Mapped Types:
```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

### Key Remapping via `as`
With Key Remapping, property identifiers can be reshaped during mapping:
`[K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];`
This automatically projects a `name` field into a `getName()` accessor type signature.

---

---

## Beginner Friendly Explanation

### Analogy: Restaurant Menus & Laminated Legal Deeds
1. **`keyof`** is an authorized restaurant menu: you can only order items printed on the menu; ordering off-menu triggers immediate rejection by the kitchen staff.
2. **Deep Readonly** is a tamper-evident laminated legal deed: not only is the outer binder sealed, but every nested sub-page is permanently shielded against alterations.

## Experiments

- Uncomment the mutation line configAman.aturanBatas.stopLossPersen to see deep immutability in action.
- Construct a Mapped Type converting every property value into string representations.
- Execute keyof over an interface with dozens of properties to observe the resulting union.
- Append an array field to KonfigurasiInvestasi and verify DeepReadonly locks mutation methods.

---

## Challenge

Author a Mapped Type `ValidationSchema<T>` projecting every property of `T` into a validation predicate: `(value: T[K]) => boolean | string`. Verify against `UserProfile`.

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

You have mastered keyof, Mapped Types, Key Remapping, and Deep Readonly. Next week, we examine Declaration Files (.d.ts) and enterprise compilation flags.
