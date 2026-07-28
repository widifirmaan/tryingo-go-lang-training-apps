# Utility Types

> TypeScript | Module 9

## Learning Objectives

- Master Partial, Required, Readonly
- Use Pick and Omit
- Apply Record for dictionaries
- Use Exclude, Extract, NonNullable
- Use ReturnType and Parameters

---

## Program: Data Manipulation

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Partial — semua properti opsional
function updateUser(id: number, updates: Partial<User>): void {
  console.log(`Mengupdate user ${id}:`, updates);
}
updateUser(1, { name: 'Budi Updated' });

// Required — semua properti wajib
type CompleteUser = Required<Partial<User>>;

// Readonly — tidak bisa diubah
const frozen: Readonly<User> = {
  id: 1, name: 'Budi', email: 'budi@mail.com',
  password: 'secret', createdAt: new Date(),
};
// frozen.name = 'Baru'; // Error

// Pick & Omit
type PublicUser = Omit<User, 'password'>;
type UserCredentials = Pick<User, 'email' | 'password'>;

function getProfile(): PublicUser {
  return { id: 1, name: 'Budi', email: 'b@m.com', createdAt: new Date() };
}
console.log('Profile:', getProfile());

// Record — dictionary type
const scores: Record<string, number> = {
  Budi: 85, Siti: 92, Alex: 78,
};
console.log('Scores:', scores);

// Exclude, Extract, NonNullable
type T1 = Exclude<'a' | 'b' | 'c', 'a'>;   // 'b' | 'c'
type T2 = Extract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
type T3 = NonNullable<string | null | undefined>; // string

// ReturnType & Parameters
function calc(a: number, b: number): number { return a + b; }
type CalcReturn = ReturnType<typeof calc>;     // number
type CalcParams = Parameters<typeof calc>;      // [number, number]

console.log('Utility types demo completed');

```

---

## Explanation

Built-in TypeScript utility types: `Partial<T>` — all optional, `Required<T>` — all required, `Readonly<T>` — all immutable, `Pick<T,K>` — select properties, `Omit<T,K>` — exclude properties, `Record<K,T>` — dictionary, `Exclude/Extract` — union manipulation.

---

## Experiments

- Change data types in each function and see compilation errors
- Add new properties to interfaces and update implementations
- Replace `any` with `unknown` and add type guards
- Try different union and intersection type combinations

---

## Challenge

Build a program applying this week's concepts in a real case study. Use explicit type annotations on every variable and function. Ensure no `any`. Add comments explaining the types used.

---

## Summary

Module 9 of 16: **Utility Types**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Classes in TypeScript**.
