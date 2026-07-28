# Configuration & Tooling

> TypeScript | Module 13

## Learning Objectives

- Master tsconfig strict flags
- Integrate ESLint with typescript-eslint
- Write unit tests with Vitest + TypeScript
- Use project references
- Optimize compilation with isolatedModules

---

## Program: Project Setup

```typescript
// tsconfig strict mode demo
// strict: true enables: noImplicitAny, strictNullChecks, etc.

// With strictNullChecks:
function greetName(name: string | null): string {
  if (name === null) return 'No name';
  return name.toUpperCase(); // TS knows name is string here
}
console.log(greetName('Budi'));
console.log(greetName(null));

// noImplicitAny — every parameter must be typed
function multiply(a: number, b: number): number {
  return a * b;
}
console.log(multiply(3, 4));

// noUnusedLocals — catches unused variables
function calculate(): number {
  const result = 42;
  // const unused = 'will warn'; // Would cause error with the flag
  return result;
}
console.log(calculate());

// Unit test example (Vitest style)
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

// In a real test file:
// import { describe, it, expect } from 'vitest';
// describe('Calculator', () => {
//   it('should add correctly', () => {
//     expect(calc.add(2, 3)).toBe(5);
//   });
// });

console.log('Calc add:', calc.add(5, 3));
console.log('Calc subtract:', calc.subtract(10, 4));

```

---

## Explanation

`strict: true` enables all strict flags. `noImplicitAny` requires explicit types. `strictNullChecks` distinguishes `T | null`. `noUnusedLocals` cleans up code. `typescript-eslint` enforces TypeScript rules. Vitest supports TypeScript natively.

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

Module 13 of 16: **Configuration & Tooling**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **TypeScript in Frontend**.
