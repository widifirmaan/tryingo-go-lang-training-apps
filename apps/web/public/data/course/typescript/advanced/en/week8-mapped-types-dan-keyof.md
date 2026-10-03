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

You have mastered keyof, Mapped Types, Key Remapping, and Deep Readonly. Next week, we examine Declaration Files (.d.ts) and enterprise compilation flags.
