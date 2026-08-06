# Advanced Types

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 2:** Advanced Types

## Learning Objectives

- Union types: string | number | boolean
- Literal types: specific values as types
- Intersection types: typeA & typeB
- Type narrowing with typeof, instanceof
- Discriminated unions for state handling

---

## Program: Union, Intersection & Literal Types

```typescript
// Union Types
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log("String ID:", id.toUpperCase());
    } else {
        console.log("Number ID:", id.toFixed(2));
    }
}
printId("ABC123");
printId(42);

// Literal Types
type Direction = "north" | "south" | "east" | "west";
function move(dir: Direction) {
    console.log("Moving:", dir);
}
move("north");
// move("up"); // Error! Bukan valid literal

// Intersection Types
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const person: Person = { name: "Budi", age: 25 };
console.log("\nPerson:", person);

// Type Narrowing
function process(value: string | number | boolean) {
    if (typeof value === "string") {
        return value.length;
    } else if (typeof value === "number") {
        return value * 2;
    }
    return value ? 1 : 0;
}
console.log("\nProcess string:", process("hello"));
console.log("Process number:", process(42));
console.log("Process boolean:", process(true));

// Discriminated Union
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; side: number }
    | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
    switch (shape.kind) {
        case "circle": return Math.PI * shape.radius ** 2;
        case "square": return shape.side ** 2;
        case "rectangle": return shape.width * shape.height;
    }
}

console.log("\n=== Discriminated Union ===");
console.log("Circle area:", area({ kind: "circle", radius: 5 }).toFixed(2));
console.log("Square area:", area({ kind: "square", side: 4 }));
console.log("Rectangle area:", area({ kind: "rectangle", width: 3, height: 6 }));

// Type Guards
function isString(value: unknown): value is string {
    return typeof value === "string";
}

const test: unknown = "hello";
if (isString(test)) {
    console.log("\nType guard result:", test.toUpperCase());
}
```

---

## Key Concepts

### Union Types
`string | number` — can be either. Narrow with typeof.

### Literal Types
`"north" | "south"` — only specific values are valid.

### Intersection
`TypeA & TypeB` — combine all properties from both types.

### Type Narrowing
TypeScript auto-infers type based on conditions (typeof, in, instanceof).

### Discriminated Unions
Each variant has a discriminator (kind). TypeScript knows available properties.

### Type Guards
`value is string` — function returning boolean that narrows type.

---

## Experiments

- Create union type for status: idle | loading | success | error
- Try intersection type for mixin
- Experiment type guard with in operator
- Create discriminated union for API response
- Try exhaustive checking with never

---

## Challenge

Build a type-safe state machine: discriminated union for states, type guards for transitions, exhaustive handling.

---

## Summary

Week 2 of 12: **Advanced Types** (Level: Complete TypeScript). Type flexibility. Next week: **Functions & Signatures**.
