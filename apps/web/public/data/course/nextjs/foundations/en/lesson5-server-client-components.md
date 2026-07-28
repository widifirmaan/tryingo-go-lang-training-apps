# Server vs Client Components

> Next.js | Next.js Foundations | Lesson 5

## Learning Objectives

- Understand Server Components (default)
- Understand Client Components with "use client"
- Know when to use each
- Understand Server + Client composition pattern

---

## Program: Server vs Client Components

```tsx
import Counter from './counter';
async function DataComponent() {
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json());
  return <p>Server data: {data.title}</p>;
}
export default function Home() {
  return (<div><h1>Server vs Client</h1><DataComponent /><Counter /></div>);
}
```

---

## Explanation

## Server Components (Default)
All components in App Router are Server Components. Can be `async`, access databases directly, zero JS sent to browser.

## Client Components
Add `'use client'` at the top for interactivity. Use `useState`, `useEffect`, `onClick`, browser APIs.

## Composition Pattern
Keep parent as Server Component. Extract only interactive parts into small Client Components. Don't wrap entire pages with 'use client'.

## Rules
Server Components CAN import Client Components. Client Components CANNOT import Server Components (only as children/props).

---

## Experiments

1. **Server Components (Default)**
2. **Client Components**
3. **Composition Pattern**
4. **Aturan**

---

## Challenge

Build a dashboard with data from a Server Component (fetch products) and interactive filter from a Client Component. Properly separate client and server parts.

---

## Summary

Server Component = default, zero JS, direct data access. Client Component = 'use client', interactive. Composition: Server parent, Client leaf.
