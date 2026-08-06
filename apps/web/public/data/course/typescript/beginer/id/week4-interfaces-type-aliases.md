# Interfaces & Type Aliases

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 4:** Interfaces & Type Aliases

## Tujuan Pembelajaran

- Interface: definisi bentuk object
- Interface extends untuk inheritance
- Type alias untuk type composition
- Readonly dan optional properties
- Index signatures dan function interfaces

---

## Program: Model Data TypeScript

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

## Konsep Kunci

### Interface
Definisi bentuk object. `interface User { name: string }`.

### Extends
`interface Employee extends User` — tambah property.

### Type Alias
`type ID = string | number` — alias untuk type apapun.

### Interface vs Type
Interface: extends, declaration merge. Type: union, intersection, conditional.

### Readonly & Optional
`readonly id` tidak bisa diubah. `age?` optional.

### Index Signature
`{ [key: string]: type }` — object dengan dynamic keys.

---

## Eksperimen

- Buat interface hierarchy: Animal → Mammal → Dog
- Coba declaration merge: dua interface sama nama
- Eksperimen mapped type dengan type alias
- Buat interface untuk API response
- Coba callable interface untuk constructor

---

## Tantangan

Buat type system untuk e-commerce: User, Product, Order, Cart — dengan interfaces, types, dan relationships.

---

## Ringkasan

Minggu 4 dari 12: **Interfaces & Type Aliases** (Level: TypeScript Lengkap). Model data. Minggu depan: **Generics**.
