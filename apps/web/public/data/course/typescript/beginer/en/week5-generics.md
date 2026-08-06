# Generics

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 5:** Generics

## Learning Objectives

- Generic functions: <T>(value: T): T
- Generic constraints with extends
- Generic interfaces and classes
- Keyof constraint for type-safe property access
- Built-in generic types: Partial, Required, Readonly

---

## Program: Reusable Generic Types

```typescript
// Generic Function
function identity<T>(value: T): T {
    return value;
}
console.log("Identity string:", identity("TypeScript"));
console.log("Identity number:", identity(42));

// Generic dengan constraint
interface HasLength {
    length: number;
}
function logLength<T extends HasLength>(item: T): void {
    console.log("Length:", item.length);
}
logLength("hello");     // string has length
logLength([1, 2, 3]);   // array has length
// logLength(42);       // Error! number tidak punya length

// Generic Interface
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

const userResponse: ApiResponse<{ name: string }> = {
    data: { name: "Budi" },
    status: 200,
    message: "OK"
};
console.log("\nAPI Response:", userResponse);

// Generic Class
class Storage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return [...this.items];
    }

    find(predicate: (item: T) => boolean): T | undefined {
        return this.items.find(predicate);
    }
}

const stringStorage = new Storage<string>();
stringStorage.add("apel");
stringStorage.add("mangga");
console.log("\nString Storage:", stringStorage.getAll());

const numberStorage = new Storage<number>();
numberStorage.add(1);
numberStorage.add(2);
numberStorage.add(3);
console.log("Number Storage:", numberStorage.getAll());

// Generic Utility
type Nullable<T> = T | null | undefined;
type Partial<T> = { [K in keyof T]?: T[K] };

interface User {
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<User>;
type NullableUser = Nullable<User>;

const partial: PartialUser = { name: "Budi" }; // OK
console.log("\nPartial user:", partial);

// Keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user: User = { name: "Siti", email: "siti@mail.com", age: 30 };
console.log("Name:", getProperty(user, "name"));
console.log("Age:", getProperty(user, "age"));
```

---

## Key Concepts

### Generic Functions
`<T>` — type parameter. Type inferred from argument.

### Constraints
`<T extends HasLength>` — T must have length property.

### Generic Interface/Class
`interface ApiResponse<T>` — dynamic type for various responses.

### Keyof
`K extends keyof T` — K must be a key in T. Type-safe property access.

### Built-in Generics
`Partial<T>` all optional. `Required<T>` all required. `Readonly<T>` all readonly.

---

## Experiments

- Create generic function with multiple type params
- Try conditional type: type IsString<T> = T extends string ? true : false
- Experiment generic class with default type
- Create type-safe event emitter with generics
- Try recursive type: type NestedArray<T> = T | NestedArray<T>[]

---

## Challenge

Build a generic repository class: find, findById, create, update, delete — with type constraints and conditional types.

---

## Summary

Week 5 of 12: **Generics** (Level: Complete TypeScript). Reusable types. Next week: **Classes & OOP**.
