# Tuples, Const Enums vs As Const & Exhaustive Checks with never

> **Kategori:** TypeScript | **Level:** Type Foundations & Narrowing | **Minggu 4:** Tuples, Const Enums vs As Const & Exhaustive Checks with never

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

## Summary

You have mastered foundation types, narrowing, discriminated unions, and exhaustive checking. Next week, we enter Level 2: Generics & Utility Types.
