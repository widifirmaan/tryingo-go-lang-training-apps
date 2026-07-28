# Advanced Types

> TypeScript | Module 12

## Learning Objectives

- Use the satisfies operator
- Create branded types for IDs
- Apply assertion functions
- Use never for exhaustive checks
- Manage covariance and contravariance

---

## Program: Advanced Validation

```typescript
// satisfies operator — check type without widening
type Palette = { [key: string]: string | string[] };

const colors = {
  primary: '#3178C6',
  secondary: ['#fff', '#000'],
} satisfies Palette;

// colors.primary is still string (not string | string[])
console.log(colors.primary.toUpperCase());

// Branded types — nominal typing
type Brand<T, B extends string> = T & { __brand: B };
type UserId = Brand<number, 'UserId'>;
type OrderId = Brand<number, 'OrderId'>;

function getUser(id: UserId): string {
  return `User ${id}`;
}

const uid = 1 as UserId;
const oid = 1 as OrderId;
console.log(getUser(uid));
// getUser(oid); // Error: type mismatch

// Assertion functions
function assertIsString(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw new Error('Not a string');
}

function process(input: unknown): void {
  assertIsString(input);
  console.log(input.toUpperCase()); // TS knows input is string
}

process('hello');
// process(42); // Would throw

// never for exhaustive checks
type Shape2 = 'circle' | 'square' | 'triangle';
function area2(s: Shape2): number {
  if (s === 'circle') return 1;
  if (s === 'square') return 2;
  // if (s === 'triangle') return 3;
  // const _exhaustive: never = s; // Error if unhandled
  return 0;
}

```

---

## Explanation

`satisfies` checks types without changing inferred types. Branded types add nominal typing. Assertion functions: `asserts val is Type`. `never` for exhaustive checking in switches. Covariance/contravariance govern complex type compatibility.

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

Module 12 of 16: **Advanced Types**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Configuration & Tooling**.
