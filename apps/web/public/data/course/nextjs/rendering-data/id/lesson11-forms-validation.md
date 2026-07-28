# Form Validation & useActionState

> Next.js | Rendering & Data | Pelajaran 11

## Tujuan Pembelajaran

- Menggunakan useActionState untuk form state
- Validasi input di Server Action
- Menampilkan error message di client
- Membuat loading state submit

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

## Penjelasan

## useActionState
Hook: `const [state, formAction, pending] = useActionState(fn, initialState)`. Mengelola state form, error, dan loading secara otomatis.

## Validasi Server
Validasi di Server Action. Return object dengan field errors. Client render ulang berdasarkan state.

## Pending State
Parameter `pending` dari useActionState — true saat action berjalan. Disable button, tampilkan spinner.

## Progressive Enhancement
Form tetap bekerja tanpa JavaScript. Server Action handle submit di server. useActionState hanya enhance UX.

---

## Eksperimen

1. **useActionState**
2. **Validasi Server**
3. **Pending State**
4. **Progressive Enhancement**

---

## Tantangan

Buat form kontak (nama, email, pesan) dengan validasi server menggunakan useActionState. Tampilkan error per-field dan loading state.

---

## Ringkasan

useActionState = form state management + validation. Server Action untuk validasi. Pending untuk loading. Progressive enhancement bawaan.
