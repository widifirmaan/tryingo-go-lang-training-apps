# Functions & Signatures

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 3:** Functions & Signatures

## Tujuan Pembelajaran

- Function dengan parameter dan return type
- Optional parameters dengan ?
- Default parameter values
- Rest parameters dengan type array
- Function types dan overload signatures

---

## Program: Typed Functions

```typescript
// Function dengan tipe explicit
function add(a: number, b: number): number {
    return a + b;
}
console.log("Add:", add(5, 3));

// Optional parameters
function greet(name: string, greeting?: string): string {
    return (greeting || "Halo") + ", " + name + "!";
}
console.log(greet("Budi"));
console.log(greet("Siti", "Selamat pagi"));

// Default parameters
function createUser(name: string, role: string = "user"): { name: string; role: string } {
    return { name, role };
}
console.log("\nUser default:", createUser("Budi"));
console.log("User custom:", createUser("Siti", "admin"));

// Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((acc, n) => acc + n, 0);
}
console.log("\nSum:", sum(1, 2, 3, 4, 5));

// Function type
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (a, b) => a * b;
const subtract: MathOperation = (a, b) => a - b;

function calculate(a: number, b: number, operation: MathOperation): number {
    return operation(a, b);
}
console.log("\nMultiply:", calculate(4, 3, multiply));
console.log("Subtract:", calculate(10, 4, subtract));

// Overload signatures
function process(input: string): string;
function process(input: number): number;
function process(input: string | number): string | number {
    if (typeof input === "string") {
        return input.toUpperCase();
    }
    return input * 2;
}
console.log("\nOverload string:", process("hello"));
console.log("Overload number:", process(42));

// Generic function identity
function identity<T>(value: T): T {
    return value;
}
console.log("\nIdentity string:", identity("TypeScript"));
console.log("Identity number:", identity(42));
console.log("Identity array:", identity([1, 2, 3]));
```

---

## Konsep Kunci

### Function Types
`function add(a: number, b: number): number` — explicit semua tipe.

### Optional Params
`param?: type` — bisa undefined. Gunakan default value atau cek.

### Rest Params
`...args: number[]` — kumpulkan semua argumen ke array.

### Function Type
`type Fn = (a: number) => string` — definisi tipe fungsi.

### Overloads
Multiple signatures untuk satu function. TypeScript pilih yang sesuai.

### Generic Function
`<T>(value: T): T` — tipe dinamis yang preserved.

---

## Eksperimen

- Buat function overload untuk format date
- Coba callback type: (err: Error | null, data: string) => void
- Eksperimen generic function dengan constraint
- Buat higher-order function type
- Coba this parameter type

---

## Tantangan

Buat math library: overloaded functions untuk add/sub/mul/div dengan dukungan number dan string.

---

## Ringkasan

Minggu 3 dari 12: **Functions & Signatures** (Level: TypeScript Lengkap). Tipe fungsi. Minggu depan: **Interfaces & Type Aliases**.
