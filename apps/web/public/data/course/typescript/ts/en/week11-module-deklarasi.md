# Modules & Declarations

> TypeScript | Module 11

## Learning Objectives

- Import and export types
- Create declaration files (.d.ts)
- Use @types packages
- Understand ambient module declarations
- Configure module resolution

---

## Program: Project Structure

```typescript
// ES Module syntax with types
// File: types.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type TodoStatus = 'active' | 'completed';

export function createTodo(title: string): Todo {
  return { id: Date.now(), title, completed: false };
}

// File: store.ts
export class TodoStore {
  private todos: Todo[] = [];

  add(title: string): void {
    this.todos.push(createTodo(title));
  }

  getAll(): Todo[] {
    return [...this.todos];
  }

  toggle(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }
}

// Re-export
export type { Todo as TodoItem } from './types';

// Declaration merging (ambient)
// Normally in a .d.ts file:
declare module 'my-library' {
  export function doSomething(): void;
  export const VERSION: string;
}

```

---

## Explanation

ES6 modules: `export` and `import` for sharing code and types. Declaration files `.d.ts` for JavaScript libraries without types. `@types` packages provide types for popular libraries. Ambient declarations with `declare module` for global code.

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

Module 11 of 16: **Modules & Declarations**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **Advanced Types**.
