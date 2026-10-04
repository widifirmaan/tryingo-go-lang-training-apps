# Primitive Type Annotations, Inference & Union Types

> **Kategori:** TypeScript | **Level:** Type Foundations & Narrowing | **Minggu 1:** Primitive Type Annotations, Inference & Union Types
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand TypeScript as a statically-typed compile-time superset of JavaScript
- Declare explicit primitive annotations for string, number, boolean, bigint, and symbol
- Understand how the TypeScript compiler performs automatic type inference
- Leverage Union Types (|) and Literal Types to constrain domain values
- Eliminate runtime type exceptions before code executes in production

---

## Program: Cashier Register & Financial Type Verifier

```typescript
// 1. Tipe Primitif & Type Inference
const tokoNama: string = "Nusa Investa";
let saldoKas: number = 5_000_000; // Numeric separator readability
const tokoAktif: boolean = true;

// 2. Union Types & Literal Types (Nilai Spesifik)
type StatusTransaksi = "PENDING" | "PAID" | "REFUNDED" | "FAILED";
type MataUang = "IDR" | "USD" | "EUR";

interface TransaksiAwal {
  id: string;
  nominal: number;
  kurs: MataUang;
  status: StatusTransaksi;
}

const tx1: TransaksiAwal = {
  id: "TX-9012",
  nominal: 1_250_000,
  kurs: "IDR",
  status: "PAID"
};

function formatRingkasan(tx: TransaksiAwal): string {
  return `[${tx.status}] ${tx.id}: ${tx.nominal.toLocaleString("id-ID")} ${tx.kurs}`;
}

console.log("=== Profil Toko ===");
console.log(`Nama: ${tokoNama} | Saldo Awal: Rp ${saldoKas.toLocaleString("id-ID")}`);
console.log("Transaksi Pertama:", formatRingkasan(tx1));
```

---

## Key Concepts

### Why TypeScript Dominates Modern Engineering
JavaScript is dynamically typed: types resolve only at runtime. A typo in property names or unexpected `undefined` payloads triggers catastrophic `TypeError: Cannot read properties of undefined` failures in production. TypeScript introduces **static compile-time verification**, intercepting contract mismatches before code ever runs.

### Type Inference vs Explicit Annotations
The TypeScript type checker automatically infers types where unambiguous. Declaring `let balance = 5000000;` infers `number`. Reserve explicit annotations for function signatures, complex interfaces, and exported boundary models.

### Union Types & Literal Types
Instead of brittle arbitrary strings, declare **Literal Unions**:
```typescript
type OrderStatus = "PENDING" | "SUCCESS" | "FAILED";
```
Typing `"PENDINGG"` triggers an immediate compiler diagnostic, preventing bad inputs at development time.

---

---

## Beginner Friendly Explanation

### Analogy: Industrial Electrical Sockets
1. **Plain JavaScript** is an unlabelled electrical outlet: you can plug a 110V appliance into a 220V line, and it only explodes once switched on (runtime crash).
2. **TypeScript** is an engineered mechanical interlocking plug: if your appliance expects 110V, it physically cannot insert into a 220V receptacle. You are protected before current flows.

## Experiments

- Change tx1 status to "SUCCESS" and observe the TypeScript compile diagnostic.
- Assign a string to saldoKas and note the assignment mismatch warning.
- Run typeof in runtime JS to verify that TypeScript types are stripped away upon compilation.
- Expand MataUang union with "JPY" and instantiate a transaction in Japanese Yen.

---

## Challenge

Create a custom type `TicketPriority` ("LOW" | "MEDIUM" | "HIGH" | "CRITICAL") and interface `SupportTicket`. Write a validator that rejects ticket instantiation without priority assignment.

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

You have mastered static type checking, primitives, inference, and union types. Next week, we examine Interfaces, Type Aliases, and Index Signatures.
