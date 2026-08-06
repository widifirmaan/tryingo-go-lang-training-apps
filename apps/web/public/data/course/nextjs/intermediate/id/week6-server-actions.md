# Server Actions & Mutations

> **Kategori:** Next.js | **Level:** Menengah | **Minggu 6:** Server Actions & Mutations

## Tujuan Pembelajaran

- Server Actions: "use server" directive
- Form submission dengan Server Actions
- revalidatePath untuk invalidate cache setelah mutation
- Optimistic updates dengan useOptimistic
- useFormStatus untuk pending state

---

## Program: Form & Mutasi

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

## Konsep Kunci

### Server Actions
Async function dengan "use server". Jalan di server. Bisa dipanggil dari form.

### Form Submission
<form action={createPost}> → Server Action dipanggil.

### Revalidation
revalidatePath("/posts") = invalidate cache halaman /posts.

### Optimistic Updates
useOptimistic = tampilkan perubahan langsung sebelum server confirm.

---

## Eksperimen

- Buat form dengan Server Action
- Tambah optimistic update
- Implementasikan form validation
- Buat delete action dengan confirm

---

## Tantangan

Buat CRUD app: create, read, update, delete posts. Gunakan Server Actions, revalidatePath, dan optimistic updates.

---

## Ringkasan

Minggu 6 dari 12: **Server Actions** (Level: Menengah). Mutasi data aman. Minggu depan: **Loading & Error UI**.
