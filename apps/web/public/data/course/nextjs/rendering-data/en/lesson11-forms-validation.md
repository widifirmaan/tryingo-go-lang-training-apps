# Form Validation & useActionState

> Next.js | Rendering & Data | Lesson 11

## Learning Objectives

- Use useActionState for form state
- Validate input in Server Action
- Display error messages on client
- Create submit loading state

---

## Program: Form Validation & useActionState

```tsx
'use client';
import { useActionState } from 'react';
async function submitForm(prev: any, formData: FormData) {
  'use server';
  const name = formData.get('name');
  const email = formData.get('email');
  const errors: Record<string, string> = {};
  if (!name || typeof name !== 'string' || name.length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email || typeof email !== 'string' || !email.includes('@')) errors.email = 'Invalid email';
  if (Object.keys(errors).length) return { errors, success: false };
  return { success: true, message: 'Form submitted!' };
}
export default function Home() {
  const [state, formAction, pending] = useActionState(submitForm, { errors: {}, success: false });
  return (<div><h1>Registration</h1><form action={formAction} style={{maxWidth:400}}><p><label>Name:</label><input type="text" name="name" style={{display:'block',width:'100%',padding:'.5rem',border:'1px solid #ccc',borderRadius:4}} />{state.errors?.name && <span style={{color:'red',fontSize:'.85em'}}>{state.errors.name}</span>}</p><p><label>Email:</label><input type="email" name="email" style={{display:'block',width:'100%',padding:'.5rem',border:'1px solid #ccc',borderRadius:4}} />{state.errors?.email && <span style={{color:'red',fontSize:'.85em'}}>{state.errors.email}</span>}</p><button type="submit" disabled={pending} style={{padding:'.5rem 1rem',background:'#333',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>{pending ? 'Submitting...' : 'Submit'}</button>{state.success && <p style={{color:'green'}}>{state.message}</p>}</form></div>);
}
```

---

## Explanation

## useActionState
Hook: `const [state, formAction, pending] = useActionState(fn, initialState)`. Manages form state, errors, and loading automatically.

## Server Validation
Validate in Server Action. Return object with errors field. Client re-renders based on state.

## Pending State
`pending` from useActionState — true while action runs. Disable button, show spinner.

## Progressive Enhancement
Form still works without JavaScript. Server Action handles submit on server. useActionState only enhances UX.

---

## Experiments

1. **useActionState**
2. **Validasi Server**
3. **Pending State**
4. **Progressive Enhancement**

---

## Challenge

Build a contact form (name, email, message) with server validation using useActionState. Show per-field errors and loading state.

---

## Summary

useActionState = form state management + validation. Server Action for validation. Pending for loading. Built-in progressive enhancement.
