# Server Actions

> Next.js | Rendering & Data | Lesson 10

## Learning Objectives

- Understand Server Actions ("use server")
- Create forms with action functions
- Use revalidatePath to refresh data
- Handle server-side form validation

---

## Program: Server Actions

```tsx
import { revalidatePath } from 'next/cache';
const todos: string[] = [];
async function addTodo(formData: FormData) {
  'use server';
  const todo = formData.get('todo');
  if (typeof todo === 'string' && todo.trim()) todos.push(todo.trim());
  revalidatePath('/');
}
export default function Home() {
  return (<div><h1>Todo App (Server Actions)</h1><form action={addTodo} style={{marginBottom:'1rem'}}><input type="text" name="todo" placeholder="Add todo..." required style={{padding:'.5rem',marginRight:'.5rem',border:'1px solid #ccc',borderRadius:4}} /><button type="submit" style={{padding:'.5rem 1rem',background:'#333',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Add</button></form><ul>{todos.map((t,i) => <li key={i} style={{padding:'.3rem 0'}}>{t}</li>)}</ul></div>);
}
```

---

## Explanation

## Server Actions
Async functions with `'use server'` at the top. Runs on the server. Can be called from forms (`action` prop) or from Client Components.

## Form Action
`<form action={myAction}>` — works even without JavaScript (progressive enhancement). Data received as FormData.

## revalidatePath
`revalidatePath('/')` — clears cache for specific path. `revalidateTag('posts')` — revalidate by tag. Data is instantly fresh.

## Validation
Use a library like Zod in the Server Action. Return errors as an object. Display errors on the client with `useActionState`.

---

## Experiments

1. **Server Actions**
2. **Form Action**
3. **revalidatePath**
4. **Validation**

---

## Challenge

Build a registration form with Server Action: name, email, password. Validate on the server (email format, password min 6 chars). Show errors.

---

## Summary

Server Actions = server functions called from forms. revalidatePath to refresh cache. Progressive enhancement without JavaScript. Server-side validation.
