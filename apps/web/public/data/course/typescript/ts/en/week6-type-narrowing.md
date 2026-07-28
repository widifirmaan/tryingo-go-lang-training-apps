# Type Narrowing & Guards

> TypeScript | Module 6

## Learning Objectives

- Narrow types with typeof guards
- Use instanceof for classes
- Apply discriminated union pattern
- Create custom type predicates
- Use in operator narrowing

---

## Program: Input Validator

```typescript
// typeof narrowing
function processValue(val: string | number): string {
  if (typeof val === 'string') {
    return val.toUpperCase();  // TS knows val is string
  }
  return val.toFixed(2);       // TS knows val is number
}
console.log(processValue('hello'));
console.log(processValue(3.14159));

// instanceof narrowing
class Dog { bark() { return 'Woof!'; } }
class Cat { meow() { return 'Meow!'; } }

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) return animal.bark();
  return animal.meow();
}
console.log(makeSound(new Dog()));

// Discriminated union
type ApiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: string }
  | { status: 'error'; error: string };

function handleState(state: ApiState): string {
  switch (state.status) {
    case 'idle': return 'Menunggu...';
    case 'loading': return 'Memuat...';
    case 'success': return `Data: ${state.data}`;
    case 'error': return `Error: ${state.error}`;
  }
}
console.log(handleState({ status: 'idle' }));
console.log(handleState({ status: 'success', data: 'Halo' }));

// Custom type predicate
interface Fish { swim(): string; }
interface Bird { fly(): string; }
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

```

---

## Explanation

Type narrowing narrows union types based on conditions. `typeof` guards for primitives. `instanceof` for classes. Discriminated unions with switch are powerful. Type predicates (`pet is Fish`) tell TypeScript about function return types.

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

Module 6 of 16: **Type Narrowing & Guards**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Generics Basics**.
