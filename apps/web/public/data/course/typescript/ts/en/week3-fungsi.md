# Functions in TypeScript

> TypeScript | Module 3

## Learning Objectives

- Define parameter and return types
- Use optional and default parameters
- Create function overloads
- Understand this type in methods
- Apply rest parameters and spread

---

## Program: Function Collection

```typescript
// Parameter & return types
function add(a: number, b: number): number {
  return a + b;
}

// Optional & default parameters
function greet(name: string, title?: string, prefix: string = 'Halo'): string {
  return `${prefix} ${title ? title + ' ' : ''}${name}!`;
}

console.log(greet('Budi'));           // Halo Budi!
console.log(greet('Siti', 'Dr.'));    // Halo Dr. Siti!

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log('Sum:', sum(1, 2, 3, 4, 5));

// Function overloads
function process(x: string): string;
function process(x: number): number;
function process(x: string | number): string | number {
  if (typeof x === 'string') return x.toUpperCase();
  return x * 10;
}

console.log(process('hello'));  // HELLO
console.log(process(5));        // 50

// Arrow function type
const multiply: (a: number, b: number) => number = (x, y) => x * y;
console.log('Multiply:', multiply(4, 3));

```

---

## Explanation

Function types: `(param: Type) => ReturnType`. Optional params with `?`. Default params: `name = "default"`. Rest params: `...args: number[]`. Function overloads allow multiple signatures for one function. Arrow functions can have explicit types.

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

Module 3 of 16: **Functions in TypeScript**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Objects & Interfaces**.
