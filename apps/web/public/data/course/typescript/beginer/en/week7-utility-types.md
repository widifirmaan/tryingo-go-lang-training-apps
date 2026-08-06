# Utility Types

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 7:** Utility Types

## Learning Objectives

- Partial<T>, Required<T>, Readonly<T>
- Pick<T, K> and Omit<T, K>
- Record<K, V> for type-safe objects
- Exclude, Extract, NonNullable for union types
- ReturnType and Parameters for function types

---

## Program: Built-in Utility Types

```typescript
// Partial<T> — semua property optional
interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}

function updateUser(user: User, updates: Partial<User>): User {
    return { ...user, ...updates };
}

const user: User = { id: "1", name: "Budi", email: "budi@mail.com", age: 25 };
const updated = updateUser(user, { age: 26 });
console.log("Updated:", updated);

// Required<T> — semua property required
type PartialUser = Partial<User>;
type FullUser = Required<PartialUser>;

// Readonly<T> — semua property readonly
const readonlyUser: Readonly<User> = user;
// readonlyUser.name = "Siti"; // Error!

// Pick<T, K> — pilih property tertentu
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: "1", name: "Budi" };

// Omit<T, K> — hapus property tertentu
type UserWithoutAge = Omit<User, "age">;
const noAge: UserWithoutAge = { id: "2", name: "Siti", email: "siti@mail.com" };

// Record<K, T> — object dengan key dan value type
type UserRoles = Record<string, "admin" | "user" | "guest">;
const roles: UserRoles = {
    budi: "admin",
    siti: "user",
    tamu: "guest"
};
console.log("\nRoles:", roles);

// Exclude<T, U> — hapus types dari union
type AllStatus = "active" | "inactive" | "deleted" | "banned";
type ActiveStatus = Exclude<AllStatus, "deleted" | "banned">;

// Extract<T, U> — ambil types yang ada di kedua union
type SuccessStatus = Extract<AllStatus, "active" | "pending">; // "active"

// NonNullable<T> — hapus null dan undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;

// ReturnType<T> — ambil return type dari function
function createUser() {
    return { id: "1", name: "Budi", type: "admin" as const };
}
type NewUser = ReturnType<typeof createUser>;

// Parameters<T> — ambil parameter types dari function
function signup(name: string, email: string, age: number) {}
type SignupParams = Parameters<typeof signup>;

// Custom Utility Types
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Nullable<T> = { [K in keyof T]: T[K] | null };

interface Config {
    host: string;
    port: number;
    ssl: { enabled: boolean; cert: string };
}

type NullableConfig = Nullable<Config>;
// Semua property bisa null

console.log("\nPick:", preview);
console.log("Omit:", noAge);
```

---

## Key Concepts

### Partial<T>
All properties become optional. Great for update functions.

### Pick & Omit
`Pick<T, "name" | "email">` — pick some. `Omit<T, "age">` — remove some.

### Record<K, V>
`Record<string, User>` — object with string keys and User values.

### Exclude & Extract
`Exclude<"a" | "b", "a">` = "b". `Extract<"a" | "b", "a" | "c">` = "a".

### ReturnType & Parameters
`ReturnType<typeof fn>` — return type of function. `Parameters<typeof fn>` — tuple of parameter types.

### Custom Utilities
Can create own utility types with mapped types and conditional types.

---

## Experiments

- Create DeepPartial: nested partial
- Try RequiredDeep: nested required
- Experiment custom utility: Nullable<T>
- Create UnionToIntersection type
- Try infer with conditional types

---

## Challenge

Build form state management: Partial for updates, Readonly for state, Record for errors, ReturnType for actions.

---

## Summary

Week 7 of 12: **Utility Types** (Level: Complete TypeScript). Type transformations. Next week: **TypeScript Config**.
