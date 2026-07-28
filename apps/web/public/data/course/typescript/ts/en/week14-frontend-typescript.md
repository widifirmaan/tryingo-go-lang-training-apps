# TypeScript in Frontend

> TypeScript | Module 14

## Learning Objectives

- Type React props and state
- Use generic components
- Type event handlers
- Create custom hooks with types
- Use Context with TypeScript

---

## Program: Typed Components

```typescript
// React component types (conceptual — for learning)
// This demonstrates TS patterns used in React

// Props type
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: () => void;
}

function Button(props: ButtonProps): string {
  const { label, variant = 'primary', disabled, onClick } = props;
  return `<button class="${variant}" ${disabled ? 'disabled' : ''}>${label}</button>`;
}

console.log(Button({ label: 'Submit', onClick: () => {} }));

// Generic component pattern
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => string;
}

function List<T>(props: ListProps<T>): string {
  return props.items.map(props.renderItem).join('\n');
}

const numbers = [1, 2, 3];
const rendered = List<number>({
  items: numbers,
  renderItem: (n) => `Item: ${n}`,
});
console.log(rendered);

// Custom hook type pattern
function useCounter(initial: number = 0) {
  let count = initial;
  return {
    get count(): number { return count; },
    increment: () => { count++; },
    decrement: () => { count--; },
    reset: () => { count = initial; },
  };
}

const counter = useCounter(10);
counter.increment();
counter.increment();
console.log('Counter:', counter.count);
counter.decrement();
console.log('Counter after dec:', counter.count);
counter.reset();
console.log('Counter after reset:', counter.count);

```

---

## Explanation

TypeScript in React: type props with interfaces. Generic components for reusable UI. Event types: `React.ChangeEvent`, `React.MouseEvent`. Custom hooks can have strict parameter and return types. Context with types reduces runtime errors.

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

Module 14 of 16: **TypeScript in Frontend**. TypeScript provides type safety without sacrificing JavaScript flexibility. Next week: **TypeScript in Backend**.
