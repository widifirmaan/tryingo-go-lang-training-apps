# Server Actions & Mutations

> **Kategori:** Next.js | **Level:** Intermediate | **Minggu 6:** Server Actions & Mutations

## Learning Objectives

- Server Actions: "use server" directive
- Form submission with Server Actions
- revalidatePath to invalidate cache after mutation
- Optimistic updates with useOptimistic
- useFormStatus for pending state

---

## Program: Form & Mutation

```jsx
// Server Actions = async functions yang jalan di server
// Untuk form submission, mutations, database operations

// ── Server Action (dalam Server Component) ──
// "use server";
// async function createPost(formData) {
//   const title = formData.get("title");
//   await db.post.create({ data: { title } });
//   revalidatePath("/posts");
// }

// ── app/posts/create/page.js ──
export default function CreatePostPage() {
  return (
    <div>
      <h1>Tambah Post Baru</h1>
      <form>
        <input name="title" placeholder="Judul" />
        <textarea name="content" placeholder="Konten" />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}

// ── Client Component dengan Server Action ──
// "use client";
// import { useFormStatus } from "react-dom";
// import { createPost } from "./actions";

// function SubmitButton() {
//   const { pending } = useFormStatus();
//   return <button disabled={pending}>{pending ? "Menyimpan..." : "Simpan"}</button>;
// }

// ── Actions (app/posts/actions.js) ──
// "use server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// export async function createPost(formData) {
//   const title = formData.get("title");
//   // Simulasi save
//   console.log("Menyimpan post:", title);
//   revalidatePath("/posts");
//   redirect("/posts");
// }

// ── Optimistic Update ──
// "use client";
// import { useOptimistic } from "react";
// function Messages({ messages }) {
//   const [optimisticMessages, addOptimistic] = useOptimistic(
//     messages,
//     (state, newMsg) => [...state, { ...newMsg, sending: true }]
//   );
//   return <MessageList messages={optimisticMessages} />;
// }

console.log("Server Actions siap digunakan");
```

---

## Key Concepts

### Server Actions
Async functions with "use server". Run on server.

### Form Submission
<form action={action}> calls Server Action.

### Revalidation
revalidatePath invalidates cache.

### Optimistic Updates
useOptimistic shows changes immediately.

---

## Experiments

- Create form with Server Action
- Add optimistic update
- Implement form validation
- Create delete action with confirm

---

## Challenge

Build a CRUD app: create, read, update, delete posts. Use Server Actions, revalidatePath, and optimistic updates.

---

## Summary

Week 6 of 12: **Server Actions** (Level: Intermediate). Safe data mutations. Next week: **Loading & Error UI**.
