# Generics: Generic Functions, Interfaces & Constraints (extends)

> **Kategori:** TypeScript | **Level:** Generics & Modern Utility Types | **Minggu 5:** Generics: Generic Functions, Interfaces & Constraints (extends)
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the purpose of Generics as parameterized type placeholders
- Author reusable generic functions and interfaces spanning varied domain models
- Enforce Type Constraints via `extends` ensuring minimum required structural contracts
- Construct generic Repository abstractions retaining end-to-end compile-time safety
- Eliminate repetitive boilerplates while preserving static type integrity

---

## Program: Generic In-Memory Repository & Paginated Response Pipeline

```typescript
// 1. Generic Interface untuk Kontrak Data Terpaginasi
interface ApiResponse<TData> {
  sukses: boolean;
  data: TData;
  pesan?: string;
  waktuRespon: number;
}

interface EntitasDasar {
  id: string;
  dibuatPada: Date;
}

// 2. Generic Class dengan Constraint (TData extends EntitasDasar)
class RepositoryInMemory<TEntity extends EntitasDasar> {
  private items: Map<string, TEntity> = new Map();

  simpan(item: TEntity): TEntity {
    this.items.set(item.id, item);
    return item;
  }

  cariBerdasarkanId(id: string): TEntity | undefined {
    return this.items.get(id);
  }

  ambilSemua(): TEntity[] {
    return Array.from(this.items.values());
  }
}

// 3. Implementasi Konkret
interface PortofolioSaham extends EntitasDasar {
  simbolEmiten: string;
  jumlahLembar: number;
  hargaRataRata: number;
}

const repoSaham = new RepositoryInMemory<PortofolioSaham>();

repoSaham.simpan({
  id: "PF-01",
  simbolEmiten: "BBCA",
  jumlahLembar: 2500,
  hargaRataRata: 9800,
  dibuatPada: new Date()
});

const hasil = repoSaham.cariBerdasarkanId("PF-01");
console.log("Saham Terdaftar:", hasil?.simbolEmiten, "| Lembar:", hasil?.jumlahLembar);
```

---

## Key Concepts

### Why Generics Are Indispensable
Without generics, engineers face two unsatisfactory compromises:
1. Re-authoring duplicated functions per domain entity (`saveUser`, `saveStock`, `saveProduct`).
2. Reverting to `any`, which forfeits all static validation safeguards.
**Generics** empower you to author component blueprints parameterized by types (`<T>`), just as standard functions are parameterized by runtime arguments.

### Generic Constraints (`<T extends BaseEntity>`)
Frequently, type placeholders must guarantee foundational capabilities. For example, a repository storage engine mandates that any persistable entity must hold an `id: string`.
By stating `<T extends BaseEntity>`, TypeScript guarantees that input types **possess at least the contract of BaseEntity**, while retaining their specific concrete shapes.

---

---

## Beginner Friendly Explanation

### Analogy: Standardized Shipping Containers
1. **Non-generic functions** are custom delivery vans tailored strictly for a single refrigerator model: transporting dishwashers requires manufacturing a brand new vehicle.
2. **Generics** are intermodal ISO shipping containers: container ships transport standardized metal hulls regardless of whether the contents hold motor vehicles, grain, or servers, guaranteeing secure transit.

## Experiments

- Attempt saving an entity without an id property into repoSaham to verify constraint enforcement.
- Define a new CryptoAsset interface extending BaseEntity and instantiate a repository.
- Author a generic utility reverseArray<T>(items: T[]): T[].
- Investigate runtime behavior when force-casting incomplete payloads via any.

---

## Challenge

Implement a generic `StackQueue<T>` with `push(item: T)`, `pop(): T | undefined`, `peek(): T | undefined`, and `size(): number`, guaranteeing strict input-output type alignment.

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

You have mastered Generics and Type Constraints. Next week, we examine built-in Utility Types: Partial, Required, Pick, Omit, and Record.
