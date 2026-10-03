# Interface vs Type Alias, Optional, Readonly & Index Signatures

> **Kategori:** TypeScript | **Level:** Type Foundations & Narrowing | **Minggu 2:** Interface vs Type Alias, Optional, Readonly & Index Signatures
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand structural trade-offs between interface and type alias
- Apply the readonly modifier to enforce immutability at compile time
- Model optional attributes (?) with clean undefined tolerance
- Compose complex domain models via Intersection Types (&) and interface inheritance
- Design dynamic key-value dictionaries safely using Index Signatures

---

## Program: User Account Profile Contract & Dynamic Exchange Dictionary

```typescript
// 1. Interface dengan Properti Opsional (?) dan Readonly
interface ProfilPengguna {
  readonly id: string;         // Tidak bisa diubah setelah dibuat
  nama: string;
  email: string;
  nomorTelepon?: string;      // Opsional (bisa undefined)
  tanggalDaftar: Date;
}

// 2. Type Alias dengan Intersection (&)
type MetadataAudit = {
  diubahTerakhir: Date;
  versi: number;
};

type AkunMember = ProfilPengguna & MetadataAudit & {
  tier: "BRONZE" | "SILVER" | "GOLD" | "PLATINUM";
};

// 3. Index Signature untuk Dictionary Dinamis
interface TabelKursMataUang {
  readonly tanggalKurs: string;
  [kodeMataUang: string]: number | string; // Dinamis menampung kode valas apapun
}

const kursHariIni: TabelKursMataUang = {
  tanggalKurs: "2026-10-03",
  USD: 16250,
  EUR: 17500,
  SGD: 12200,
  JPY: 110.5
};

const user1: AkunMember = {
  id: "USR-001",
  nama: "Budi Pratama",
  email: "budi@nusa.id",
  tanggalDaftar: new Date(),
  diubahTerakhir: new Date(),
  versi: 1,
  tier: "GOLD"
};

console.log("Pengguna Terdaftar:", user1.nama, "| Tier:", user1.tier);
console.log("Kurs USD ke IDR:", kursHariIni["USD"]);
```

---

## Key Concepts

### Interface vs Type Alias
- **`interface`**: Primarily designed to model object shapes and public contracts. Interfaces support declaration merging (can be reopened across modules).
- **`type alias`**: Offers broader compositional power, modeling unions, primitives, tuples, and mapped expressions.
Industry best practice: prefer `interface` for public entity schemas, and `type` for unions, function signatures, and meta-programming utilities.

### Immutability with Readonly & Optionals
- `readonly id: string`: Intercepts `user.id = "mutation"` attempts, guaranteeing identifier permanence.
- `phoneNumber?: string`: Expands domain representation to `string | undefined`.

### Index Signatures
When key names cannot be predetermined at compile time (e.g., currency rate maps, headers, or runtime caches), declare an *index signature*:
```typescript
interface CacheStore {
  [key: string]: string | number;
}
```

---

---

## Beginner Friendly Explanation

### Analogy: Passport Application & Phonebook
1. **Interface** is a standardized passport form: required fields (Legal Name, National ID) alongside optional ones (Middle Name, Alias). National ID is printed in indelible ink (*readonly*).
2. **Index Signature** is a blank address book: you write any contact name on the left (*key*), mapping to their phone number on the right (*value*).

## Experiments

- Attempt user1.id = "USR-999" to witness compiler mutation prevention.
- Delete the email property from user1 to observe missing contract diagnostics.
- Append a new currency code such as "GBP": 20800 to kursHariIni.
- Derive a new interface using the extends keyword.

---

## Challenge

Design interface `InventoryProduct` with readonly SKU, name, price, stock, and optional categories. Derive `DiscountedProduct` adding discount percentage and a net price calculator method.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

You have mastered Interfaces, Type Aliases, Readonly, Optionals, and Index Signatures. Next week, we explore Type Narrowing and Custom Type Guards.
