# Advanced Generics

> TypeScript | Module 8

## Learning Objectives

- Use conditional types
- Create mapped types
- Use keyof and typeof operators
- Apply indexed access types
- Use infer in conditional types

---

## Program: Type Transformations

```typescript
// Conditional types
type IsString<T> = T extends string ? 'yes' : 'no';
type A = IsString<string>;   // 'yes'
type B = IsString<number>;   // 'no'

// Conditional with infer
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;
function example(): boolean { return true; }
type ExampleReturn = ReturnTypeOf<typeof example>;  // boolean

// Mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Optional<T> = { [K in keyof T]?: T[K] };

interface Person { name: string; age: number; }
type ReadonlyPerson = Readonly<Person>;
type OptionalPerson = Optional<Person>;

// keyof & typeof
type PersonKeys = keyof Person;  // 'name' | 'age'
const personObj = { name: 'Budi', age: 20 };
type PersonType = typeof personObj;

// Indexed access types
type PersonName = Person['name'];  // string

// Practical: pick specific keys
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => result[key] = obj[key]);
  return result;
}

const picked = pick({ name: 'Budi', age: 20, city: 'JKT' }, 'name', 'city');
console.log('Picked:', picked);

```

---

## Explanation

Conditional types: `T extends U ? X : Y`. Mapped types: `{ [K in keyof T]: NewType }`. `keyof` gets key union. `typeof` gets runtime type. Indexed access: `T["key"]`. `infer` captures types inside conditionals for extraction.

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

Module 8 of 16: **Advanced Generics**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Utility Types**.
