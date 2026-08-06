# Utility Types

> **Kategori:** TypeScript | **Level:** TypeScript Lengkap | **Minggu 7:** Utility Types

## Tujuan Pembelajaran

- Partial<T>, Required<T>, Readonly<T>
- Pick<T, K> dan Omit<T, K>
- Record<K, V> untuk type-safe objects
- Exclude, Extract, NonNullable untuk union types
- ReturnType dan Parameters untuk function types

---

## Program: Built-in Utilities

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

## Konsep Kunci

### Partial<T>
Semua property jadi optional. Cocok untuk update functions.

### Pick & Omit
`Pick<T, "name" | "email">` — ambil sebagian. `Omit<T, "age">` — hapus sebagian.

### Record<K, V>
`Record<string, User>` — object dengan string key dan User value.

### Exclude & Extract
`Exclude<"a" | "b", "a">` = "b". `Extract<"a" | "b", "a" | "c">` = "a".

### ReturnType & Parameters
`ReturnType<typeof fn>` — return type dari function. `Parameters<typeof fn>` — tuple parameter types.

### Custom Utilities
Bisa buat utility type sendiri dengan mapped types dan conditional types.

---

## Eksperimen

- Buat DeepPartial: nested partial
- Coba RequiredDeep: nested required
- Eksperimen custom utility: Nullable<T>
- Buat UnionToIntersection type
- Coba infer dengan conditional types

---

## Tantangan

Buat form state management: Partial untuk updates, Readonly untuk state, Record untuk errors, ReturnType untuk actions.

---

## Ringkasan

Minggu 7 dari 12: **Utility Types** (Level: TypeScript Lengkap). Type transformations. Minggu depan: **TypeScript Config**.
