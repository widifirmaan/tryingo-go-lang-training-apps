# Union, Intersection & Literal Types

> TypeScript | Module 5

## Learning Objectives

- Create union types from multiple types
- Use intersection types
- Apply literal types for specific values
- Use template literal types
- Combine union and intersection

---

## Program: Status System

```typescript
// Union type
type Status = 'idle' | 'loading' | 'success' | 'error';
let currentStatus: Status = 'idle';
currentStatus = 'loading';
// currentStatus = 'unknown'; // Error

// Union with different types
type Result = number | string;
const parseInput = (val: string): Result => {
  const n = Number(val);
  return isNaN(n) ? val : n;
};
console.log('Parsed:', parseInput('42'), parseInput('abc'));

// Intersection type
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = { name: 'Budi', age: 20 };

// Literal types
type Direction = 'up' | 'down' | 'left' | 'right';
function move(d: Direction): string {
  return `Moving ${d}`;
}
console.log(move('up'));

// Template literal types
type EventName = `on${Capitalize<string>}`;
type ClickEvent = `onClick`;  // type is "onClick"

// Type alias with union
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(s: Shape): number {
  if (s.kind === 'circle') return Math.PI * s.radius ** 2;
  if (s.kind === 'square') return s.side ** 2;
  return s.width * s.height;
}

console.log('Circle area:', area({ kind: 'circle', radius: 5 }));
console.log('Square area:', area({ kind: 'square', side: 4 }));

```

---

## Explanation

Union `A | B` means either A or B. Intersection `A & B` combines both types. Literal types restrict to specific values like `"active" | "inactive"`. Template literal types create string patterns. Discriminated unions use a `kind` field to distinguish variants.

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

Module 5 of 16: **Union, Intersection & Literal Types**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Type Narrowing & Guards**.
