# Server Actions

> Next.js | Rendering & Data | Pelajaran 10

## Tujuan Pembelajaran

- Memahami Server Actions ("use server")
- Membuat form dengan action function
- Menggunakan revalidatePath untuk refresh data
- Menangani form validation di server

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

## Penjelasan

## Server Actions
Fungsi async dengan `'use server'` di baris pertama. Jalankan di server. Bisa dipanggil dari form (`action` prop) atau dari Client Component.

## Form Action
`<form action={myAction}>` — tanpa JavaScript pun form tetap bisa submit (progressive enhancement). Data diterima sebagai FormData.

## revalidatePath
`revalidatePath('/')` — bersihkan cache untuk path tertentu. `revalidateTag('posts')` — revalidate berdasarkan tag. Data langsung fresh.

## Validation
Gunakan library seperti Zod di Server Action. Return error sebagai object. Tampilkan error di client dengan `useActionState`.

---

## Eksperimen

1. **Server Actions**
2. **Form Action**
3. **revalidatePath**
4. **Validation**

---

## Tantangan

Buat form pendaftaran dengan Server Action: nama, email, password. Validasi di server (email format, password min 6 chars). Tampilkan error.

---

## Ringkasan

Server Actions = fungsi server dipanggil dari form. revalidatePath untuk refresh cache. Progressive enhancement tanpa JavaScript. Validasi di server.
