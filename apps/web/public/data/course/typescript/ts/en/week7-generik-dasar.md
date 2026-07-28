# Generics Basics

> TypeScript | Module 7

## Learning Objectives

- Create generic functions
- Use generic constraints with extends
- Create generic interfaces and types
- Apply generic default types
- Use multiple type parameters

---

## Program: Type-Safe Collections

```typescript
// Generic function — reusable type-safe code
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([1, 2, 3]));           // number
console.log(first(['a', 'b']));           // string
console.log(first<number>([10, 20]));     // explicit

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Budi', age: 20, city: 'Jakarta' };
console.log(getProperty(user, 'name'));   // Budi
// getProperty(user, 'email'); // Error

// Generic interface
interface Repository<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  add(item: T): void;
}

class InMemoryRepo<T> implements Repository<T> {
  private items: T[] = [];
  getAll(): T[] { return this.items; }
  getById(id: number): T | undefined { return this.items[id]; }
  add(item: T): void { this.items.push(item); }
}

const repo = new InMemoryRepo<string>();
repo.add('TypeScript');
repo.add('React');
console.log('All items:', repo.getAll());

// Generic default type
function createArray<T = string>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
console.log(createArray(3, 'a'));  // string[]

```

---

## Explanation

Generics make code reusable without losing type safety. `<T>` captures the type used. `extends` constraints limit usable types. Generic interfaces create type-safe data structures. Default types provide fallback types.

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

Module 7 of 16: **Generics Basics**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Advanced Generics**.
