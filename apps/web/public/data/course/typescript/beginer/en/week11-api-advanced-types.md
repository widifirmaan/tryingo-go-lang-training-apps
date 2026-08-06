# Advanced Type Manipulation

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 11:** Advanced Type Manipulation

## Learning Objectives

- Template literal types for string manipulation
- Conditional types: T extends U ? X : Y
- infer keyword for type extraction
- Key remapping with as clause
- Branded types for nominal typing

---

## Program: Template Literals & Conditional Types

```typescript
// Template Literal Types
type EventName = "click" | "focus" | "blur";
type ElementId = "button" | "input" | "form";

// Combine template literals
type EventString = `${ElementId}:${EventName}`;
// "button:click" | "button:focus" | ... | "form:blur"

// Capitalize, Uncapitalize, Uppercase, Lowercase
type Greeting = "hello world";
type Capitalized = Capitalize<Greeting>;  // "Hello world"
type Uppercased = Uppercase<Greeting>;   // "HELLO WORLD"
type Lowercased = Lowercase<Greeting>;   // "hello world"

// Conditional Types
type IsString<T> = T extends string ? true : false;
type Test1 = IsString<"hello">;  // true
type Test2 = IsString<42>;       // false

// infer keyword
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type NumElem = ArrayElement<number[]>;     // number
type StrElem = ArrayElement<string[]>;     // string

// Distributive Conditional Types
type ToArray<T> = T extends any ? T[] : never;
type StringOrNumArray = ToArray<string | number>; // string[] | number[]

// Mapped Types
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

type Partial<T> = {
    [K in keyof T]?: T[K];
};

// Key remapping
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
    name: string;
    age: number;
    email: string;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Recursive types
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Config {
    server: { host: string; port: number };
    database: { url: string; pool: number };
}

type ReadonlyConfig = DeepReadonly<Config>;

// Branded Types (Nominal Typing)
type Brand<T, B> = T & { __brand: B };
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

function usd(amount: number): USD {
    return amount as USD;
}

function eur(amount: number): EUR {
    return amount as EUR;
}

const price1 = usd(100);
const price2 = eur(100);
// price1 === price2 // Error! Different brands

console.log("=== Advanced Types ===");
console.log("Template Literal: combine types into strings");
console.log("Conditional: T extends U ? X : Y");
console.log("infer: extract types from structures");
console.log("Branded: nominal typing for primitives");
console.log("Recursive: deep type transformations");
```

---

## Key Concepts

### Template Literal Types
`type T = \`get\${Capitalize<K>}\`` — generate types from strings.

### Conditional Types
`T extends string ? true : false` — type-level if/else.

### infer
Extract type from structure: `T extends (infer E)[] ? E : never`.

### Key Remapping
`{ [K in keyof T as NewKey]: T[K] }` — rename keys.

### Branded Types
`type USD = number & { __brand: "USD" }` — nominal typing for primitives.

### Recursive Types
Types that reference themselves: `DeepReadonly<T>`.

---

## Experiments

- Create type-safe path: type Path<T, K>
- Try conditional type for flatten array
- Experiment template literal for CSS properties
- Create type-safe event map with template literals
- Try type-level programming: Fibonacci

---

## Challenge

Build a type-safe API client: template literals for endpoints, conditional types for responses, branded types for IDs.

---

## Summary

Week 11 of 12: **Advanced Type Manipulation** (Level: Complete TypeScript). Type-level programming. Next week: **Capstone Project**!
