# Basic Types

> TypeScript | Module 2

## Learning Objectives

- Master primitive types: string, number, boolean
- Use arrays and tuples
- Distinguish any vs unknown vs never
- Understand null, undefined, and void
- Apply enums for named constants

---

## Program: Basic Types Demo

```typescript
// Primitive types
let name: string = 'Budi';
let age: number = 20;
let isActive: boolean = true;

// Arrays & Tuples
let scores: number[] = [85, 90, 78];
let pair: [string, number] = ['Budi', 20]; // tuple

// any — avoid when possible
let flexible: any = 'bisa apa saja';
flexible = 42;

// unknown — safer than any, must narrow
let input: unknown = 'some data';
if (typeof input === 'string') {
  console.log(input.toUpperCase());
}

// never — function that never returns
function fail(msg: string): never {
  throw new Error(msg);
}

// void — function returns nothing
function log(msg: string): void {
  console.log(msg);
}

// null & undefined
let nullable: string | null = null;
let undef: string | undefined = undefined;

// Enum
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

console.log('Scores:', scores);
console.log('Pair:', pair);
console.log('Color:', c);  // 1

```

---

## Explanation

Primitive types: `string`, `number`, `boolean`. Arrays: `number[]` or `Array<number>`. Tuples: `[string, number]` for fixed-length arrays. `any` disables type checking — avoid it. `unknown` is safe because it must be narrowed first. `never` for functions that never complete. `void` for functions with no return.

---

## Experiments

- Change data types in each function and see compilation errors
- Add new properties to interfaces and update implementations
- Replace `any` with `unknown` and add type guards
- Try different union and intersection type combinations

---

## Challenge

Build a program applying this week's concepts in a real case study. Use explicit type annotations on every variable and function. Ensure no `any`. Add comments explaining the types used.

---

## Summary

Module 2 of 16: **Basic Types**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Functions in TypeScript**.
