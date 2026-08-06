# Advanced Types

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 2:** Advanced Types

## Tujuan Pembelajaran

- Union types: string | number | boolean
- Literal types: specific value sebagai tipe
- Intersection types: typeA & typeB
- Type narrowing dengan typeof, instanceof
- Discriminated unions untuk state handling

---

## Program: Union, Intersection & Literal

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

## Konsep Kunci

### Union Types
`string | number` — bisa salah satu. Bisa narrow dengan typeof.

### Literal Types
`"north" | "south"` — hanya value tertentu yang valid.

### Intersection
`TypeA & TypeB` — gabung semua property dari kedua type.

### Type Narrowing
TypeScript otosisasi tipe berdasarkan kondisi (typeof, in, instanceof).

### Discriminated Union
Setiap variant punya discriminator (kind). TypeScript tahu property yang tersedia.

### Type Guard
`value is string` — function yang return boolean dan narrow tipe.

---

## Eksperimen

- Buat union type untuk status: idle | loading | success | error
- Coba intersection type untuk mixin
- Eksperimen type guard dengan in operator
- Buat discriminated union untuk API response
- Coba exhaustive checking dengan never

---

## Tantangan

Buat type-safe state machine: discriminated union untuk states, type guards untuk transitions, exhaustive handling.

---

## Ringkasan

Minggu 2 dari 12: **Advanced Types** (Level: TypeScript Lengkap). Fleksibilitas tipe. Minggu depan: **Functions & Signatures**.
