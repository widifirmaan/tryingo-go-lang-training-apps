# Advanced Type Manipulation

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 11:** Advanced Type Manipulation

## Tujuan Pembelajaran

- Template literal types untuk string manipulation
- Conditional types: T extends U ? X : Y
- infer keyword untuk extract types
- Key remapping dengan as clause
- Branded types untuk nominal typing

---

## Program: Template Literals & Conditional

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

## Konsep Kunci

### Template Literal Types
`type T = \`get\${Capitalize<K>}\`` — generate types dari string.

### Conditional Types
`T extends string ? true : false` — type-level if/else.

### infer
Extract type dari structure: `T extends (infer E)[] ? E : never`.

### Key Remapping
`{ [K in keyof T as NewKey]: T[K] }` — rename keys.

### Branded Types
`type USD = number & { __brand: "USD" }` — nominal typing untuk primitives.

### Recursive Types
Type yang reference dirinya sendiri: `DeepReadonly<T>`.

---

## Eksperimen

- Buat type-safe path: type Path<T, K>
- Coba conditional type untuk flatten array
- Eksperimen template literal untuk CSS properties
- Buat type-safe event map dengan template literals
- Coba type-level programming: Fibonacci

---

## Tantangan

Buat type-safe API client: template literal untuk endpoints, conditional types untuk responses, branded types untuk IDs.

---

## Ringkasan

Minggu 11 dari 12: **Advanced Type Manipulation** (Level: TypeScript Lengkap). Type-level programming. Minggu depan: **Capstone Project**!
