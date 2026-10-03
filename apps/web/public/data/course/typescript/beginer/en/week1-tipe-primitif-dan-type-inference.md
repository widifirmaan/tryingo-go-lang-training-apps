# Primitive Type Annotations, Inference & Union Types

> **Kategori:** TypeScript | **Level:** Type Foundations & Narrowing | **Minggu 1:** Primitive Type Annotations, Inference & Union Types

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

## Summary

You have mastered static type checking, primitives, inference, and union types. Next week, we examine Interfaces, Type Aliases, and Index Signatures.
