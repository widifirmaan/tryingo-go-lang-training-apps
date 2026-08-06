# Functions & Signatures

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 3:** Functions & Signatures

## Learning Objectives

- Functions with parameter and return types
- Optional parameters with ?
- Default parameter values
- Rest parameters with array types
- Function types and overload signatures

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

## Key Concepts

### Function Types
`function add(a: number, b: number): number` — explicit all types.

### Optional Params
`param?: type` — can be undefined. Use default value or check.

### Rest Params
`...args: number[]` — collect all arguments to array.

### Function Type
`type Fn = (a: number) => string` — function type definition.

### Overloads
Multiple signatures for one function. TypeScript picks the matching one.

### Generic Function
`<T>(value: T): T` — dynamic type that is preserved.

---

## Experiments

- Create function overload for date formatting
- Try callback type: (err: Error | null, data: string) => void
- Experiment generic function with constraint
- Create higher-order function type
- Try this parameter type

---

## Challenge

Build a math library: overloaded functions for add/sub/mul/div with number and string support.

---

## Summary

Week 3 of 12: **Functions & Signatures** (Level: Complete TypeScript). Function types. Next week: **Interfaces & Type Aliases**.
