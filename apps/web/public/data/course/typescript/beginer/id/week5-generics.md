# Generics

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 5:** Generics

## Tujuan Pembelajaran

- Generic functions: <T>(value: T): T
- Generic constraints dengan extends
- Generic interfaces dan classes
- Keyof constraint untuk type-safe property access
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

## Konsep Kunci

### Generic Function
`<T>` — type parameter. Tipe diinfer dari argumen.

### Constraints
`<T extends HasLength>` — T harus punya property length.

### Generic Interface/Class
`interface ApiResponse<T>` — tipe dinamis untuk berbagai response.

### Keyof
`K extends keyof T` — K harus key yang ada di T. Type-safe property access.

### Built-in Generics
`Partial<T>` semua optional. `Required<T>` semua required. `Readonly<T>` semua readonly.

---

## Eksperimen

- Buat generic function dengan multiple type params
- Coba conditional type: type IsString<T> = T extends string ? true : false
- Eksperimen generic class dengan default type
- Buat type-safe event emitter dengan generics
- Coba recursive type: type NestedArray<T> = T | NestedArray<T>[]

---

## Tantangan

Buat generic repository class: find, findById, create, update, delete — dengan type constraints dan conditional types.

---

## Ringkasan

Minggu 5 dari 12: **Generics** (Level: TypeScript Lengkap). Reusable types. Minggu depan: **Classes & OOP**.
