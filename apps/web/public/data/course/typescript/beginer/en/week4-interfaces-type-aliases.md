# Interfaces & Type Aliases

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 4:** Interfaces & Type Aliases

## Learning Objectives

- Interfaces: define object shapes
- Interface extends for inheritance
- Type aliases for type composition
- Readonly and optional properties
- Index signatures and function interfaces

---

## Program: TypeScript Data Models

```typescript
// Interface
interface User {
    name: string;
    email: string;
    age?: number; // optional
    readonly id: string; // cannot be changed after creation
}

const user1: User = {
    id: "u1",
    name: "Budi",
    email: "budi@mail.com",
    age: 25
};
console.log("User:", user1);

// Interface extends
interface Employee extends User {
    department: string;
    salary: number;
}

const emp: Employee = {
    id: "e1",
    name: "Siti",
    email: "siti@mail.com",
    department: "Engineering",
    salary: 15000000
};
console.log("Employee:", emp);

// Type Alias
type ID = string | number;
type Status = "active" | "inactive" | "suspended";
type Result<T> = { success: true; data: T } | { success: false; error: string };

// Interface vs Type
// Interface: bisa extends, declaration merge
// Type: bisa union, intersection, mapped types, conditional types

// Index Signature
interface Dictionary {
    [key: string]: string | number;
}
const dict: Dictionary = {
    name: "Budi",
    age: 25,
    city: "Jakarta"
};

// Function Interface
interface SearchFn {
    (query: string, limit?: number): string[];
}

const searchUsers: SearchFn = (query, limit = 10) => {
    return ["Result for: " + query + " (limit: " + limit + ")"];
};

console.log("\nSearch:", searchUsers("john"));
console.log("Search limited:", searchUsers("jane", 5));

// Hybrid Type
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

console.log("\n=== Type vs Interface ===");
console.log("Type: union, intersection, conditional");
console.log("Interface: extends, declaration merge");
```

---

## Key Concepts

### Interfaces
Define object shapes. `interface User { name: string }`.

### Extends
`interface Employee extends User` — add properties.

### Type Aliases
`type ID = string | number` — alias for any type.

### Interface vs Type
Interface: extends, declaration merge. Type: union, intersection, conditional.

### Readonly & Optional
`readonly id` cannot be changed. `age?` optional.

### Index Signatures
`{ [key: string]: type }` — object with dynamic keys.

---

## Experiments

- Create interface hierarchy: Animal → Mammal → Dog
- Try declaration merge: two interfaces same name
- Experiment mapped type with type alias
- Create interface for API response
- Try callable interface for constructor

---

## Challenge

Build a type system for e-commerce: User, Product, Order, Cart — with interfaces, types, and relationships.

---

## Summary

Week 4 of 12: **Interfaces & Type Aliases** (Level: Complete TypeScript). Data modeling. Next week: **Generics**.
