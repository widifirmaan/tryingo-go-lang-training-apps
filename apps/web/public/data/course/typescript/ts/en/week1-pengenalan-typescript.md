# Introduction to TypeScript

> TypeScript | Module 1

## Learning Objectives

- Understand TypeScript as a JavaScript superset
- Install TypeScript and run tsc
- Learn type annotations and type inference
- Configure basic tsconfig.json
- Compile .ts to .js

---

## Program: Hello TypeScript

```typescript
interface Student {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const student: Student = {
  name: 'Budi',
  level: 'beginner',
};

// Type inference — TypeScript guesses the type
const course = 'TypeScript';  // inferred as string
const duration = 16;          // inferred as number

// TypeScript catches type errors at compile time
function greet(s: Student): string {
  return `Halo ${s.name}! Selamat belajar ${course} selama ${duration} minggu.`;
}

console.log(greet(student));

// Try changing 'level' to an invalid value!

```

---

## Explanation

TypeScript is a JavaScript superset that adds static types. TypeScript code compiles to plain JavaScript. Use `tsc filename.ts` to compile. The `tsconfig.json` file configures options like `strict`, `target`, and `module`. Type inference lets TypeScript guess types automatically.

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

Module 1 of 16: **Introduction to TypeScript**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Basic Types**.
