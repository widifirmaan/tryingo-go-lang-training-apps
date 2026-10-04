# Tuples, Const Enums vs As Const & Exhaustive Checks with never

> **Kategori:** TypeScript | **Level:** Type Foundations & Narrowing | **Minggu 4:** Tuples, Const Enums vs As Const & Exhaustive Checks with never
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Deploy Tuples to enforce strict element positioning and fixed-length array schemas
- Understand legacy numeric enum caveats and adopt modern `as const` object dictionaries
- Distinguish void (functions without return values) from never (unreachable terminal states)
- Implement the Exhaustive Checking pattern with never to catch missing switch cases at compile time
- Build future-proof error handling resilient against unhandled union variations

---

## Program: HTTP Response Matrix & Exhaustive State Engine with never

```typescript
// 1. Tuples: Array dengan Panjang & Urutan Tipe Tetap
type KoordinatGeo = [latitude: number, longitude: number];
type RekorTransaksi = [id: string, nominal: number, sukses: boolean];

const kantorPusat: KoordinatGeo = [-6.2088, 106.8456]; // Jakarta
const log1: RekorTransaksi = ["TX-100", 500000, true];

// 2. As Const Object vs Enums (Standar Modern)
export const LogLevel = {
  INFO: "INFO",
  WARN: "WARN",
  ERROR: "ERROR",
  CRITICAL: "CRITICAL"
} as const;

type TipeLogLevel = typeof LogLevel[keyof typeof LogLevel];

// 3. Exhaustive Check Menggunakan Tipe never
type PembayaranKanal = "QRIS" | "VIRTUAL_ACCOUNT" | "KARTU_KREDIT" | "GERAI_TUNAI";

function prosesBiayaAdmin(kanal: PembayaranKanal): number {
  switch (kanal) {
    case "QRIS":
      return 1500;
    case "VIRTUAL_ACCOUNT":
      return 4000;
    case "KARTU_KREDIT":
      return 7500;
    case "GERAI_TUNAI":
      return 2500;
    default:
      // Jika semua case terpenuhi, kode ini mustahil tercapai (bertipe never)
      const _exhaustiveCheck: never = kanal;
      throw new Error(`Kanal tidak dikenali: ${_exhaustiveCheck}`);
  }
}

console.log("Kantor:", kantorPusat[0], kantorPusat[1]);
console.log("Biaya QRIS:", prosesBiayaAdmin("QRIS"), "IDR");
console.log("Biaya Virtual Account:", prosesBiayaAdmin("VIRTUAL_ACCOUNT"), "IDR");
```

---

## Key Concepts

### Why Modern Teams Prefer `as const` over `enum`
Traditional numeric enums in TypeScript generate synthetic runtime boilerplate and allow reverse-lookup pitfalls. Industry consensus favors plain frozen object maps using **`as const`**:
```typescript
const Role = { Admin: "ADMIN", Member: "MEMBER" } as const;
type RoleType = typeof Role[keyof typeof Role];
```
This zero-cost pattern produces pristine JavaScript and guarantees type safety.

### The Exhaustive Check Pattern with `never`
The `never` type models states that should **never happen**. When handling a 4-variant union in a switch statement, exhausting all 4 branches leaves the `default` block with type `never`.
If a teammate later adds a 5th variant to the union (e.g., `"PAYLATER"`), TypeScript produces an immediate compile error in `default`, because `"PAYLATER"` cannot be assigned to `never`!

---

---

## Beginner Friendly Explanation

### Analogy: Lab Chemical Ratios & Safety Sensors
1. **Tuple** is a precise chemical titration: element 0 must be 200ml base, element 1 must be 50ml reagent; reversing positions corrupts the mixture.
2. **Exhaustive Check with never** is an automated fire panel: if an emergency has 4 possible disaster scenarios and your software only accounts for 3, the panel sounds an alert refusing startup until all scenarios have handles.

## Experiments

- Add a new option "PAYLATER" to PembayaranKanal and observe the compile diagnostic in default.
- Attempt appending a 3rd coordinate element to kantorPusat to trigger tuple length violations.
- Assign an arbitrary string to TipeLogLevel and examine compiler rejections.
- Simulate unsafe casting (as any) into prosesBiayaAdmin to verify fallback runtime throwing.

---

## Challenge

Build an order state machine: "CREATED" -> "PAID" -> "SHIPPED" -> "DELIVERED" or "CANCELLED". Write an exhaustive transition resolver preventing illegal status hops.

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

You have mastered foundation types, narrowing, discriminated unions, and exhaustive checking. Next week, we enter Level 2: Generics & Utility Types.
