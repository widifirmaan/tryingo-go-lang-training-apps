# Built-in Utility Types: Partial, Required, Pick, Omit, Record & ReturnType

> **Kategori:** TypeScript | **Level:** Generics & Modern Utility Types | **Minggu 6:** Built-in Utility Types: Partial, Required, Pick, Omit, Record & ReturnType
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Apply Partial<T> to model partial mutation payloads (HTTP PATCH workflows)
- Leverage Required<T> to enforce schema completeness before database writes
- Deploy Pick<T, K> and Omit<T, K> to construct secure Data Transfer Objects (DTOs)
- Utilize Record<K, T> to maintain complete typed dictionaries without missed keys
- Extract function signatures dynamically with ReturnType<T> and Parameters<T>

---

## Program: User Schema Transformation Pipeline & Configuration Registry

```typescript
interface AkunNasabah {
  id: string;
  namaLengkap: string;
  email: string;
  nomorKTP: string;
  saldoTabungan: number;
  alamatTinggal?: string;
}

// 1. Partial: Membuat semua properti menjadi opsional (Cocok untuk fitur UPDATE / PATCH)
type PayloadUpdateNasabah = Partial<AkunNasabah>;

// 2. Required: Memaksa semua properti (termasuk yang aslinya opsional) menjadi wajib
type NasabahLengkapValidasi = Required<AkunNasabah>;

// 3. Pick: Mengambil sebagian kecil properti untuk skema publik
type KartuNasabahRingkas = Pick<AkunNasabah, "id" | "namaLengkap" | "saldoTabungan">;

// 4. Omit: Membuang properti sensitif sebelum dikirim ke browser luar
type NasabahPublik = Omit<AkunNasabah, "nomorKTP" | "saldoTabungan">;

// 5. Record: Membuat peta kamus aman berbasis kunci tertentu
type RolePetugas = "SUPER_ADMIN" | "OPERATOR_KASIR" | "AUDITOR";
const izinAksesMenu: Record<RolePetugas, string[]> = {
  SUPER_ADMIN: ["DASHBOARD", "MUTASI", "SETOR", "TARIK", "HAPUS_USER"],
  OPERATOR_KASIR: ["DASHBOARD", "MUTASI", "SETOR"],
  AUDITOR: ["DASHBOARD", "MUTASI"]
};

// 6. ReturnType: Menangkap tipe nilai kembalian dari suatu fungsi
function buatSesiLogin(idUser: string) {
  return { token: "JWT-XYZ-" + idUser, kedaluwarsaDetik: 3600, waktuDibuat: Date.now() };
}
type ResponSesi = ReturnType<typeof buatSesiLogin>;

const kartu: KartuNasabahRingkas = {
  id: "NSB-99",
  namaLengkap: "Siti Rahma",
  saldoTabungan: 15_750_000
};

console.log("Ringkasan Kartu:", kartu);
console.log("Izin Petugas Kasir:", izinAksesMenu.OPERATOR_KASIR);
```

---

## Key Concepts

### The Architecture of Utility Types
In enterprise codebases, **never duplicate near-identical interfaces**. If an entity model comprises 20 database fields, manually creating an `UpdateDto` with 20 optional question marks is an anti-pattern prone to drift.
TypeScript ships with first-class type transformers that dynamically reshape existing schemas at compile time.

### Core Utility Index:
1. `Partial<T>`: Transforms every property into `key?: type`.
2. `Required<T>`: Strips optional markers, mandating presence of every field.
3. `Readonly<T>`: Freezes all properties against mutation.
4. `Pick<T, K>`: Extracts a selective subset of keys from `T`.
5. `Omit<T, K>`: Removes specified keys from `T`.
6. `Record<Keys, Values>`: Constructs a strict dictionary mapping keys to values.

---

---

## Beginner Friendly Explanation

### Analogy: Profile Edit Sheets & Redacted Documents
1. **`Partial`** is an address change slip: you fill only the fields you wish to modify rather than rewriting your entire birth history.
2. **`Omit`** is a government identification photocopy where confidential identifiers are redacted before sharing with external vendors.

## Experiments

- Omit a key from izinAksesMenu to observe how Record enforces exhaustive key coverage.
- Inject nomorKTP into an object typed as NasabahPublik to trigger compile rejection.
- Wrap AkunNasabah in Readonly and attempt modifying saldoTabungan.
- Inspect argument parameter types using Parameters<typeof buatSesiLogin>.

---

## Challenge

Given `ECommerceProduct`, author `DraftProduct` (all optional except title), `DisplayProduct` (omitting wholesalePrice and supplierId), and `StockPerWarehouse` mapping warehouse ids ("JKT-01" | "SBY-02" | "BDG-03") to numbers.

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

You have mastered built-in Utility Types for schema projection. Next week, we examine Conditional Types and the infer keyword.
